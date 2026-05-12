#!/usr/bin/env node
// Auto-generate guitar chord voicings based on expected pitch-class sets.
// Strategy: for each (root, quality) pair, search the fretboard for a
// fingerable shape (≤4-fret span, root in the bass, every required pitch
// class present). Existing shapes that already match the theory are kept.
import { writeFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pitchClass } from "../src/domain/notes.js";
import {
  QUALITY_KEYS,
  getQualityPitchClasses,
} from "../src/domain/chordQualities.js";
import { getChordVoicing, getBarreFromVoicing } from "../src/domain/voicings/index.js";
import CDefault from "../src/domain/voicings/C.js";
import CSharpDefault from "../src/domain/voicings/CSharp.js";
import DDefault from "../src/domain/voicings/D.js";
import DSharpDefault from "../src/domain/voicings/DSharp.js";
import EDefault from "../src/domain/voicings/E.js";
import FDefault from "../src/domain/voicings/F.js";
import FSharpDefault from "../src/domain/voicings/FSharp.js";
import GDefault from "../src/domain/voicings/G.js";
import GSharpDefault from "../src/domain/voicings/GSharp.js";
import ADefault from "../src/domain/voicings/A.js";
import ASharpDefault from "../src/domain/voicings/ASharp.js";
import BDefault from "../src/domain/voicings/B.js";

// Alias used internally by searchShape (pre-existing convention).
const pc = pitchClass;

const RAW_VOICINGS = {
  C: CDefault,
  "C#": CSharpDefault,
  D: DDefault,
  "D#": DSharpDefault,
  E: EDefault,
  F: FDefault,
  "F#": FSharpDefault,
  G: GDefault,
  "G#": GSharpDefault,
  A: ADefault,
  "A#": ASharpDefault,
  B: BDefault,
};

const __dirname = dirname(fileURLToPath(import.meta.url));

const ALL_ROOTS = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
  "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};

const ROOT_FILE_MAP = {
  C: "C.js", "C#": "CSharp.js", D: "D.js", "D#": "DSharp.js",
  E: "E.js", F: "F.js", "F#": "FSharp.js", G: "G.js",
  "G#": "GSharp.js", A: "A.js", "A#": "ASharp.js", B: "B.js",
};

const STRING_OPEN_MIDI = [64, 59, 55, 50, 45, 40]; // index 0 = high E
const MAX_FRET = 15;
const MAX_SPAN = 4;

const REGIONS = [
  { name: "open", range: [0, 4] },
  { name: "mid", range: [3, 8] },
  { name: "high", range: [7, 12] },
];

function expectedPcSet(rootName, quality) {
  const rootPc = ALL_ROOTS[rootName];
  const intervals = getQualityPitchClasses(quality);
  if (rootPc === undefined || !intervals) return null;
  return new Set(intervals.map((i) => (rootPc + i) % 12));
}

function pcSetFromPositions(positions) {
  const set = new Set();
  for (const [s, f] of positions) {
    if (s < 0 || s > 5 || f < 0 || f > MAX_FRET) continue;
    set.add(pitchClass(STRING_OPEN_MIDI[s] + f));
  }
  return set;
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function searchShape(rootName, expected, rootPc, fretRange) {
  let best = null;
  const bassStringPreference = [5, 4, 3];
  for (const bassString of bassStringPreference) {
    const openMidi = STRING_OPEN_MIDI[bassString];
    for (let bassFret = fretRange[0]; bassFret <= fretRange[1]; bassFret++) {
      if (pc(openMidi + bassFret) !== rootPc) continue;
      const minFret = Math.max(0, bassFret - 1);
      const maxFret = bassFret + MAX_SPAN - 1;

      const stringFretOptions = [];
      for (let s = bassString - 1; s >= 0; s--) {
        const opts = [];
        const sOpenMidi = STRING_OPEN_MIDI[s];
        for (let f = minFret; f <= maxFret; f++) {
          if (expected.has(pc(sOpenMidi + f))) {
            opts.push(f);
          }
        }
        opts.push(null);
        stringFretOptions.push({ stringIndex: s, opts });
      }

      const stack = [];
      function recurse(level) {
        if (level === stringFretOptions.length) {
          const positions = [[bassString, bassFret]];
          for (let i = 0; i < stack.length; i++) {
            if (stack[i] != null) {
              positions.push([stringFretOptions[i].stringIndex, stack[i]]);
            }
          }
          if (positions.length < Math.min(expected.size, 3)) return;
          const pcs = pcSetFromPositions(positions);
          if (!setsEqual(pcs, expected)) return;
          const frets = positions.map(([, f]) => f).filter((f) => f > 0);
          const span = frets.length ? Math.max(...frets) - Math.min(...frets) : 0;
          if (span > MAX_SPAN - 1) return;
          // Playability: at most 4 independent fingers (non-open fretted positions).
          if (frets.length > 4) return;
          // Score (higher = better):
          //  +10000 for being at fret 0..3 (open-ish position)
          //  +1000 per played string
          //  -10 per bass fret height
          //  -5 per non-zero fret used
          //  +span discount
          const openBonus = bassFret <= 3 ? 10000 : 0;
          const fretSum = positions.reduce((s, [, f]) => s + f, 0);
          const score =
            openBonus +
            positions.length * 1000 -
            bassFret * 10 -
            fretSum * 2 +
            (MAX_SPAN - span) * 3;
          if (!best || score > best.score) {
            best = {
              positions: positions.sort((a, b) => a[0] - b[0]),
              score,
            };
          }
          return;
        }
        const { opts } = stringFretOptions[level];
        for (const f of opts) {
          stack.push(f);
          recurse(level + 1);
          stack.pop();
        }
      }
      recurse(0);
    }
  }
  return best;
}

function findVariations(rootName, quality, target) {
  const expected = expectedPcSet(rootName, quality);
  if (!expected) return [];
  const rootPc = ALL_ROOTS[rootName];

  const results = [];
  const fingerprints = new Set();
  for (const region of REGIONS) {
    if (results.length >= target) break;
    const result = searchShape(rootName, expected, rootPc, region.range);
    if (!result?.positions?.length) continue;
    const fingerprint = result.positions
      .map(([s, f]) => `${s}:${f}`)
      .sort()
      .join("|");
    if (fingerprints.has(fingerprint)) continue;
    fingerprints.add(fingerprint);
    results.push(result.positions);
  }
  return results;
}

function isExistingVoicingValid(rootName, quality) {
  const existing = getChordVoicing(rootName, quality);
  if (!existing || !existing.length) return false;
  const expected = expectedPcSet(rootName, quality);
  if (!expected) return false;
  const positions = existing.map((p) => [p.stringIndex, p.fret]);
  // Include barre notes when checking pitch classes.
  const barre = getBarreFromVoicing(rootName, quality);
  if (barre) {
    for (const s of barre.strings) {
      // Only add if not already overridden by a fingered position on same string.
      if (!positions.some(([ps]) => ps === s)) {
        positions.push([s, barre.fret]);
      }
    }
  }
  const pcs = pcSetFromPositions(positions);
  return setsEqual(pcs, expected);
}

function computeRegionForPositions(positions) {
  const fretted = positions
    .filter((p) => Array.isArray(p))
    .map(([, f]) => f);
  const hasOpen = fretted.some((f) => f === 0);
  const nonZero = fretted.filter((f) => f > 0);
  const barreItem = positions.find(
    (p) => p && typeof p === "object" && p.barre != null,
  );
  const minBarre = barreItem ? barreItem.barre : Infinity;
  const minFretted = nonZero.length ? Math.min(...nonZero) : Infinity;
  const minOverall = Math.min(minFretted, minBarre);
  if (hasOpen || minOverall <= 1 || minOverall === Infinity) return "open";
  return `fret-${minOverall}`;
}

function splitPosBarre(items) {
  const positions = [];
  let barre = null;
  for (const item of items) {
    if (Array.isArray(item)) positions.push(item);
    else if (item && item.barre != null)
      barre = { fret: item.barre, strings: item.strings ?? [] };
  }
  return { positions, barre };
}

function formatVariation(items) {
  const { positions, barre } = splitPosBarre(items);
  const region = computeRegionForPositions(items);
  const lines = ["    {"];
  lines.push(`      region: ${JSON.stringify(region)},`);
  if (positions.length === 0) {
    lines.push("      positions: [],");
  } else {
    lines.push("      positions: [");
    for (const [s, f] of positions) {
      lines.push(`        [${s}, ${f}],`);
    }
    lines.push("      ],");
  }
  if (barre) {
    const strings = barre.strings.join(", ");
    lines.push(`      barre: { fret: ${barre.fret}, strings: [${strings}] },`);
  } else {
    lines.push("      barre: null,");
  }
  lines.push("    },");
  return lines.join("\n");
}

function generateFileContent(rootName) {
  const qualities = QUALITY_KEYS.filter((q) => q !== "m5");
  const lines = ["const voicings = {", ""];
  for (const quality of qualities) {
    const variationsItems = [];

    // 1. Preserve existing primary variation if valid
    if (isExistingVoicingValid(rootName, quality)) {
      const existing = getChordVoicing(rootName, quality);
      if (existing) {
        const positions = existing.map((p) => [p.stringIndex, p.fret]);
        const barre = getBarreFromVoicing(rootName, quality);
        const merged = [
          ...positions,
          ...(barre
            ? [{ barre: barre.fret, strings: barre.strings }]
            : []),
        ];
        variationsItems.push(merged);
      }
    }

    // 2. Search additional variations in distinct regions
    if (variationsItems.length < TARGET_VARIATIONS) {
      const extras = findVariations(
        rootName,
        quality,
        TARGET_VARIATIONS - variationsItems.length,
      );
      for (const ex of extras) {
        const fp = ex.map(([s, f]) => `${s}:${f}`).sort().join("|");
        const dup = variationsItems.some((items) => {
          const fv = items
            .filter((p) => Array.isArray(p))
            .map(([s, f]) => `${s}:${f}`)
            .sort()
            .join("|");
          return fv === fp;
        });
        if (!dup) variationsItems.push(ex);
      }
    }

    if (!variationsItems.length) {
      lines.push(`  // ${quality}: unable to generate a valid shape`);
      continue;
    }

    const key = /^[a-zA-Z_$][\w$]*$/.test(quality)
      ? quality
      : JSON.stringify(quality);
    const body = variationsItems.map(formatVariation).join("\n");
    lines.push(`  ${key}: [\n${body}\n  ],`);
    lines.push("");
  }
  lines.push("};\n");
  lines.push("export default voicings;");
  return lines.join("\n");
}

// ─── CLI ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const variationsArg = args.find((a) => a.startsWith("--variations="));
const TARGET_VARIATIONS = variationsArg
  ? Math.max(1, parseInt(variationsArg.split("=")[1], 10) || 1)
  : 3;
const onlyRoot = args.find((a) => !a.startsWith("--"));

const VOICINGS_DIR = pathResolve(__dirname, "../src/domain/voicings");

let writes = 0;
let drySkips = 0;

if (TARGET_VARIATIONS > REGIONS.length) {
  console.warn(
    `! --variations=${TARGET_VARIATIONS} requested, but only ${REGIONS.length} regions are defined; capped to ${REGIONS.length}.`,
  );
}

for (const rootName of Object.keys(ROOT_FILE_MAP)) {
  if (onlyRoot && onlyRoot !== rootName) continue;
  const filePath = pathResolve(VOICINGS_DIR, ROOT_FILE_MAP[rootName]);
  const content = generateFileContent(rootName);
  if (dryRun) {
    console.log(`--- would rewrite ${filePath} ---`);
    console.log(content);
    drySkips++;
  } else {
    writeFileSync(filePath, content + "\n", "utf8");
    writes++;
    console.log(`→ wrote ${filePath}`);
  }
}

if (dryRun) {
  console.log(`\nDry run: would rewrite ${drySkips} file(s).`);
} else {
  console.log(`\nDone. Wrote ${writes} file(s).`);
}
