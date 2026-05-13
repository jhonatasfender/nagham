#!/usr/bin/env node
// Lê scripts/musicca-cache/_chords-source.json (download da API musicca
// /files/scripts/finders/chords-guitar-ukulele.json), extrai todas as
// variações de acordes de guitarra (EADGBE), valida pitch classes contra
// getQualityPitchClasses, e grava JSON consolidado em
// scripts/musicca-cache/_extracted.json.
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/musicca/extract.mjs
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_ROOTS, ALL_QUALITIES } from "./slugs.js";
import { getQualityPitchClasses } from "../../src/domain/chordQualities.js";
import { pitchClass } from "../../src/domain/notes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../musicca-cache");
const SOURCE_FILE = pathResolve(CACHE_DIR, "_chords-source.json");
const OUT_FILE = pathResolve(CACHE_DIR, "_extracted.json");
const ERROR_LOG = pathResolve(CACHE_DIR, "_errors.log");

// Guitar string MIDI values: index 0 = high E (string 0), index 5 = low E (string 5)
// Standard tuning: E2=40, A2=45, D3=50, G3=55, B3=59, E4=64
const STRING_OPEN_MIDI = [64, 59, 55, 50, 45, 40]; // index 0 = high E

// Map from our quality keys to API quality suffixes
const QUALITY_SUFFIX = {
  Maj: "",
  m: "m",
  5: "5",
  aug: "aug",
  sus2: "sus2",
  sus4: "sus4",
  6: "6",
  m6: "m6",
  7: "7",
  m7: "m7",
  maj7: "Maj7",
  "m7(b5)": "m7b5",
  dim7: "dim7",
  "6/9": "69",
  add9: "add9",
  9: "9",
  m9: "m9",
  maj9: "Maj9",
  "9+": "7#9",
  11: "11",
  13: "13",
};

// Map sharps to flats (API only has flats)
const ROOT_TO_API = {
  C: "C",
  "C#": "Db",
  Db: "Db",
  D: "D",
  "D#": "Eb",
  Eb: "Eb",
  E: "E",
  F: "F",
  "F#": "Gb",
  Gb: "Gb",
  G: "G",
  "G#": "Ab",
  Ab: "Ab",
  A: "A",
  "A#": "Bb",
  Bb: "Bb",
  B: "B",
};

const ROOT_PC = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5,
  "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11,
};

function logError(line) {
  appendFileSync(ERROR_LOG, `${new Date().toISOString()} ${line}\n`, "utf8");
}

function expectedPcSet(root, quality) {
  const rootPc = ROOT_PC[root];
  const intervals = getQualityPitchClasses(quality);
  if (rootPc === undefined || !intervals) return null;
  return new Set(intervals.map((i) => (rootPc + i) % 12));
}

// Parse position string "x,3,2,0,1,0" into positions array and muted string set.
// Input: strings in low-E-to-high-E order (API format).
// Output: positions in our domain format [stringIndex, fret] where stringIndex 0=high E, 5=low E.
function parsePositionString(posStr) {
  const parts = posStr.split(",");
  if (parts.length !== 6) throw new Error(`Unexpected position string: ${posStr}`);
  const positions = [];
  const mutedStrings = new Set();
  for (let apiIdx = 0; apiIdx < 6; apiIdx++) {
    const part = parts[apiIdx].trim();
    // API string order: apiIdx 0 = low E = our stringIndex 5
    const stringIndex = 5 - apiIdx;
    if (part === "x" || part === "X") {
      mutedStrings.add(stringIndex);
    } else {
      const fret = parseInt(part, 10);
      if (!Number.isFinite(fret) || fret < 0) {
        throw new Error(`Invalid fret value ${part} in ${posStr}`);
      }
      positions.push([stringIndex, fret]);
    }
  }
  return { positions, mutedStrings };
}

// Detect barre from fingering string and positions.
// A barre is when finger 1 (index) is used across multiple strings at the same fret.
function detectBarre(posStr, fingerStr) {
  if (!fingerStr) return null;
  const parts = posStr.split(",");
  if (parts.length !== 6) return null;

  // Find the lowest fret (non-x, non-0) where finger "1" is assigned.
  // Map each non-x string (in order from low E) to its finger digit.
  const activeParts = parts
    .map((p, i) => ({ apiIdx: i, fret: p === "x" ? null : parseInt(p, 10) }))
    .filter((x) => x.fret !== null && x.fret > 0);

  if (activeParts.length === 0 || !fingerStr) return null;

  // Assign finger digits to active strings in order
  const fingers = fingerStr.split("").map(Number);
  if (fingers.length !== activeParts.length) return null;

  // Find all positions where finger is 1
  const barreParts = activeParts
    .map((x, i) => ({ ...x, finger: fingers[i] }))
    .filter((x) => x.finger === 1);

  if (barreParts.length < 2) return null;

  // All barre positions must be at the same fret
  const barreFret = barreParts[0].fret;
  if (!barreParts.every((x) => x.fret === barreFret)) return null;

  // Convert API string indices to our domain string indices
  // apiIdx 0 = low E = stringIndex 5; apiIdx 5 = high E = stringIndex 0
  const barreStrings = barreParts.map((x) => 5 - x.apiIdx).sort((a, b) => a - b);

  return { fret: barreFret, strings: barreStrings };
}

function computeRegion(positions, barre) {
  const hasOpenFret = positions.some(([, f]) => f === 0);
  const allFrets = positions.map(([, f]) => f).filter((f) => f > 0);
  if (barre) allFrets.push(barre.fret);
  const minFret = allFrets.length ? Math.min(...allFrets) : 1;
  return hasOpenFret || minFret <= 1 ? "open" : `fret-${minFret}`;
}

function pcsFromVariation(positions, barre) {
  const set = new Set();
  const stringFrets = new Map();
  for (const [s, f] of positions) {
    stringFrets.set(s, Math.max(stringFrets.get(s) ?? -1, f));
  }
  if (barre) {
    for (const s of barre.strings) {
      const cur = stringFrets.get(s) ?? -1;
      if (barre.fret > cur) stringFrets.set(s, barre.fret);
    }
  }
  for (const [s, f] of stringFrets) {
    set.add(pitchClass(STRING_OPEN_MIDI[s] + f));
  }
  return set;
}

// Check that actual is a subset of expected (no foreign tones).
// Guitar voicings may omit non-essential tones (5th, 9th, 11th…) but
// must not include notes outside the chord.
function isValidSubset(actual, expected) {
  for (const x of actual) if (!expected.has(x)) return false;
  return true;
}

// Load source data
if (!existsSync(SOURCE_FILE)) {
  console.error(`Source file not found: ${SOURCE_FILE}`);
  console.error("Run: curl -s https://www.musicca.com/files/scripts/finders/chords-guitar-ukulele.json > scripts/musicca-cache/_chords-source.json");
  process.exit(1);
}

const sourceData = JSON.parse(readFileSync(SOURCE_FILE, "utf8"));
const guitarData = sourceData.EADGBE;

const result = {};
let counts = { roots: 0, qualities: 0, variations: 0 };

for (const root of ALL_ROOTS) {
  let added = false;
  for (const quality of ALL_QUALITIES) {
    const qualitySuffix = QUALITY_SUFFIX[quality];
    if (qualitySuffix === undefined) {
      logError(`${root} ${quality}: no API quality suffix mapping`);
      continue;
    }
    const apiRoot = ROOT_TO_API[root];
    if (!apiRoot) {
      logError(`${root} ${quality}: no API root mapping`);
      continue;
    }
    const apiKey = `${apiRoot}${qualitySuffix}`;
    const rawVariations = guitarData[apiKey];
    if (!rawVariations || rawVariations.length === 0) {
      logError(`${root} ${quality}: API key ${apiKey} not found or empty`);
      continue;
    }

    const expected = expectedPcSet(root, quality);
    const variations = [];

    rawVariations.forEach((raw, idx) => {
      try {
        const { positions, mutedStrings } = parsePositionString(raw.p);
        const barre = detectBarre(raw.p, raw.f);
        const region = computeRegion(positions, barre);

        if (expected) {
          const actual = pcsFromVariation(positions, barre);
          if (!isValidSubset(actual, expected)) {
            logError(
              `${root} ${quality} ${apiKey}#${idx}: foreign-note mismatch expected=${[...expected].sort()} actual=${[...actual].sort()} p=${raw.p}`,
            );
            return; // skip this variation
          }
        }

        variations.push({ region, positions, barre });
      } catch (err) {
        logError(`${root} ${quality} ${apiKey}#${idx}: ${err.message}`);
      }
    });

    if (variations.length === 0) continue;

    if (!result[root]) {
      result[root] = {};
      counts.roots++;
    }
    result[root][quality] = variations;
    counts.qualities++;
    counts.variations += variations.length;
    added = true;
  }
  if (added) console.log(`✓ ${root}`);
}

writeFileSync(OUT_FILE, JSON.stringify(result, null, 2), "utf8");
console.log(
  `\nWrote ${OUT_FILE} — ${counts.roots} roots, ${counts.qualities} (root, quality) entries, ${counts.variations} variations.`,
);
