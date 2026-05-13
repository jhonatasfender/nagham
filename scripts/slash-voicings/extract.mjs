#!/usr/bin/env node
// Lê scripts/slash-voicings-cache/_chords-db.json (snapshot pinado de
// tombatossals/chords-db) e converte os entries de slash chord (suffix
// contém "/") para nosso schema:
//
//   {
//     [ourRoot]: {
//       [baseQuality]: {
//         [bass]: [ { region, positions, barre }, ... ]
//       }
//     }
//   }
//
// chords-db usa stringIndex 0 = low E. Nós usamos 0 = high E. Convertemos.
// chords-db usa frets relativos a baseFret (1 = baseFret). Convertemos
// para frets absolutos.
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/slash-voicings/extract.mjs

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getQualityPitchClasses } from "../../src/domain/chordQualities.js";
import { pitchClass } from "../../src/domain/notes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../slash-voicings-cache");
const SOURCE_FILE = pathResolve(CACHE_DIR, "_chords-db.json");
const OUT_FILE = pathResolve(CACHE_DIR, "_extracted.json");
const ERROR_LOG = pathResolve(CACHE_DIR, "_errors.log");

// stringIndex 0 = high E (E4=64), 5 = low E (E2=40). Mesmo schema do
// musicca extract.
const STRING_OPEN_MIDI = [64, 59, 55, 50, 45, 40];

// chord-db usa "Csharp" / "Fsharp"; nosso é "C#"/"F#". Os sustenidos só
// existem em C#/F# no chord-db; mapeamos pra nossa raiz e depois deixamos
// o alias (D#=Eb, G#=Ab, A#=Bb) ser feito no slashVoicings/index.js.
const CDB_KEY_TO_ROOT = {
  C: "C",
  Csharp: "C#",
  D: "D",
  Eb: "Eb",
  E: "E",
  F: "F",
  Fsharp: "F#",
  G: "G",
  Ab: "Ab",
  A: "A",
  Bb: "Bb",
  B: "B",
};

const ROOT_PC = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

// chord-db usa "C#" e "Db" como nomes de bass — mas nosso domain usa
// preferencialmente sharps. Mantemos o nome chord-db.
// chord-db base suffixes:
//   "" → Maj (e.g. "/G")
//   "m" → m
//   "m9" → m9
//   "7" → 7 (only "7/G" exists)
const BASE_TO_QUALITY = { "": "Maj", m: "m", m9: "m9", 7: "7" };

function parseSuffix(suffix) {
  const slash = suffix.indexOf("/");
  if (slash < 0) return null;
  const base = suffix.slice(0, slash);
  const bass = suffix.slice(slash + 1);
  const quality = BASE_TO_QUALITY[base];
  if (!quality) return null;
  if (!(bass in ROOT_PC)) return null;
  return { quality, bass };
}

function logError(line) {
  appendFileSync(ERROR_LOG, `${new Date().toISOString()} ${line}\n`, "utf8");
}

// chord-db schema: frets[6] low-E→high-E, baseFret, barres[]
// retorna { positions: [[stringIdx, fret], ...], barre: {fret, strings} | null }
// Nossa convenção (igual ao musicca extract): cordas tocadas pela pestana
// NÃO aparecem em positions — só em barre.strings. As demais cordas ficam
// em positions (incluindo cordas soltas, fret 0).
function convertPosition(pos) {
  const { frets, baseFret = 1, barres = [] } = pos;
  if (!Array.isArray(frets) || frets.length !== 6) return null;

  let barre = null;
  let relBarre = null;
  if (barres.length > 0) {
    relBarre = barres[0];
    const absBarre = baseFret > 1 ? baseFret + relBarre - 1 : relBarre;
    const barredCdb = [];
    for (let cdbStr = 0; cdbStr < 6; cdbStr++) {
      if (frets[cdbStr] === relBarre) barredCdb.push(cdbStr);
    }
    if (barredCdb.length >= 2) {
      const strings = barredCdb.map((i) => 5 - i).sort((a, b) => a - b);
      barre = { fret: absBarre, strings };
    } else {
      // pestana de uma corda só não é pestana — deixa virar dot normal
      relBarre = null;
    }
  }

  const positions = [];
  for (let cdbStr = 0; cdbStr < 6; cdbStr++) {
    const rel = frets[cdbStr];
    if (rel === -1) continue;
    if (barre && rel === relBarre) continue;
    let absFret;
    if (rel === 0) absFret = 0;
    else absFret = baseFret > 1 ? baseFret + rel - 1 : rel;
    const ourStr = 5 - cdbStr;
    positions.push([ourStr, absFret]);
  }
  return { positions, barre };
}

function computeRegion(positions, barre) {
  const hasOpenFret = positions.some(([, f]) => f === 0);
  const allFrets = positions.map(([, f]) => f).filter((f) => f > 0);
  if (barre) allFrets.push(barre.fret);
  const minFret = allFrets.length ? Math.min(...allFrets) : 1;
  return hasOpenFret || minFret <= 1 ? "open" : `fret-${minFret}`;
}

function pcsFromVariation(positions, barre) {
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
  const pcs = new Set();
  for (const [s, f] of stringFrets) {
    pcs.add(pitchClass(STRING_OPEN_MIDI[s] + f));
  }
  return pcs;
}

function expectedPcSet(root, quality, bass) {
  const rootPc = ROOT_PC[root];
  if (rootPc === undefined) return null;
  const qPcs = getQualityPitchClasses(quality);
  if (!qPcs) return null;
  const set = new Set(qPcs.map((d) => (rootPc + d) % 12));
  set.add(ROOT_PC[bass]);
  return set;
}

function lowestSoundingPc(positions, barre) {
  // a "menor" string idx = índice mais alto (low E = 5). Procura o
  // maior stringIdx que toca e calcula o pitch class.
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
  let maxStr = -1;
  for (const s of stringFrets.keys()) if (s > maxStr) maxStr = s;
  if (maxStr < 0) return null;
  return pitchClass(STRING_OPEN_MIDI[maxStr] + stringFrets.get(maxStr));
}

if (!existsSync(SOURCE_FILE)) {
  console.error(`Source file not found: ${SOURCE_FILE}`);
  console.error("Run: node --import ./scripts/_resolver.mjs scripts/slash-voicings/fetch.mjs");
  process.exit(1);
}

const source = JSON.parse(readFileSync(SOURCE_FILE, "utf8"));
const chords = source.chords;

const result = {};
const stats = {
  roots: 0,
  bassNotes: 0,
  variations: 0,
  rejected: 0,
  bassMismatch: 0,
  pcMismatch: 0,
};

for (const cdbKey of Object.keys(chords)) {
  const ourRoot = CDB_KEY_TO_ROOT[cdbKey];
  if (!ourRoot) {
    logError(`unknown chord-db key: ${cdbKey}`);
    continue;
  }
  const entries = chords[cdbKey];
  let added = false;
  for (const entry of entries) {
    const parsed = parseSuffix(entry.suffix);
    if (!parsed) continue;
    const { quality, bass } = parsed;
    const expected = expectedPcSet(ourRoot, quality, bass);
    const bassPc = ROOT_PC[bass];

    for (const pos of entry.positions ?? []) {
      const converted = convertPosition(pos);
      if (!converted) {
        stats.rejected++;
        logError(`${ourRoot} ${quality}/${bass}: bad position`);
        continue;
      }
      const { positions, barre } = converted;
      const region = computeRegion(positions, barre);

      const actualPcs = pcsFromVariation(positions, barre);
      let ok = true;
      if (expected) {
        for (const pc of actualPcs) {
          if (!expected.has(pc)) {
            ok = false;
            break;
          }
        }
      }
      if (!ok) {
        stats.pcMismatch++;
        stats.rejected++;
        logError(`${ourRoot} ${quality}/${bass}: foreign tone in voicing`);
        continue;
      }

      const lowPc = lowestSoundingPc(positions, barre);
      if (lowPc !== bassPc) {
        stats.bassMismatch++;
        stats.rejected++;
        logError(`${ourRoot} ${quality}/${bass}: lowest sounding pc=${lowPc}, expected ${bassPc}`);
        continue;
      }

      result[ourRoot] ??= {};
      result[ourRoot][quality] ??= {};
      result[ourRoot][quality][bass] ??= [];
      result[ourRoot][quality][bass].push({ region, positions, barre });
      stats.variations++;
      added = true;
    }
  }
  if (added) stats.roots++;
}

// count unique bass-notes
for (const r of Object.keys(result)) {
  for (const q of Object.keys(result[r])) {
    stats.bassNotes += Object.keys(result[r][q]).length;
  }
}

writeFileSync(OUT_FILE, JSON.stringify(result, null, 2), "utf8");
console.log(`✓ wrote ${OUT_FILE}`);
console.log(`  roots=${stats.roots}  bass entries=${stats.bassNotes}  variations=${stats.variations}`);
console.log(`  rejected=${stats.rejected} (bassMismatch=${stats.bassMismatch}, pcMismatch=${stats.pcMismatch})`);
