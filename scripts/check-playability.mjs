// Playability audit for guitar voicings in src/domain/voicings/.
// A voicing is "playable" if it requires at most 4 independent fingers
// (a barre counts as 1 finger; open strings cost 0).
//
// Usage:
//   node scripts/check-playability.mjs           # summary + list of failures
//   node scripts/check-playability.mjs --dump-pcs  # emit pitch-class snapshot (JSON); shape: {root: {quality: [[pc,...], ...]}} (one pc-set per variation)
import C from "../src/domain/voicings/C.js";
import CSharp from "../src/domain/voicings/CSharp.js";
import D from "../src/domain/voicings/D.js";
import DSharp from "../src/domain/voicings/DSharp.js";
import E from "../src/domain/voicings/E.js";
import F from "../src/domain/voicings/F.js";
import FSharp from "../src/domain/voicings/FSharp.js";
import G from "../src/domain/voicings/G.js";
import GSharp from "../src/domain/voicings/GSharp.js";
import A from "../src/domain/voicings/A.js";
import ASharp from "../src/domain/voicings/ASharp.js";
import B from "../src/domain/voicings/B.js";

// Standard tuning string pitch classes (idx 0..5): E B G D A E
// 0 -> high E -> 4, 1 -> B -> 11, 2 -> G -> 7, 3 -> D -> 2, 4 -> A -> 9, 5 -> low E -> 4
const STRING_PC = [4, 11, 7, 2, 9, 4];

const ROOTS = {
  C, "C#": CSharp, D, "D#": DSharp, E, F, "F#": FSharp, G,
  "G#": GSharp, A, "A#": ASharp, B,
};

function analyze(voicing) {
  // Returns: { fretted: [[s,f]...], barre: {fret, strings} | null }
  const fretted = [];
  let barre = null;
  for (const item of voicing) {
    if (Array.isArray(item)) {
      const [s, f] = item;
      // fret 0 = open string => no finger needed
      if (f > 0) fretted.push([s, f]);
    } else if (item && typeof item === "object" && item.barre) {
      barre = { fret: item.barre, strings: item.strings || [] };
    }
  }
  return { fretted, barre };
}

function pitchClassSet(voicing) {
  // Compute pitch class set. For each string, the pitch sounds at the
  // highest fret pressed (finger > barre). Strings not in voicing at all
  // are not played (muted).
  const set = new Set();
  const stringFrets = new Map(); // stringIndex -> fret (highest)
  let barreInfo = null;
  for (const item of voicing) {
    if (Array.isArray(item)) {
      const [s, f] = item;
      // Use max if multiple entries on same string (unusual but defensive).
      stringFrets.set(s, Math.max(stringFrets.get(s) ?? -1, f));
    } else if (item && typeof item === "object" && item.barre) {
      barreInfo = { fret: item.barre, strings: item.strings || [] };
    }
  }
  if (barreInfo) {
    for (const s of barreInfo.strings) {
      const cur = stringFrets.get(s) ?? -1;
      if (barreInfo.fret > cur) stringFrets.set(s, barreInfo.fret);
    }
  }
  for (const [s, f] of stringFrets) {
    set.add((STRING_PC[s] + f) % 12);
  }
  return set;
}

function checkPlayability(voicing) {
  const { fretted, barre } = analyze(voicing);

  // Build a per-string mapping for fretted entries (string -> fret).
  // Frets covered by the barre at barre.fret are "free" (don't count).
  let independentFingers = 0;
  let issues = [];

  if (barre) {
    // The barre covers all strings in barre.strings at barre.fret.
    // For a string s in barre.strings, if there's a fretted entry [s, f]
    // with f > barre.fret, that entry needs a finger above the barre.
    // If [s, barre.fret] also exists (redundant), it doesn't need a separate finger.
    for (const [s, f] of fretted) {
      if (barre.strings.includes(s) && f === barre.fret) continue; // covered by barre
      independentFingers++;
    }
    // The barre itself uses 1 finger (the index).
    independentFingers += 1;
  } else {
    // No barre: every fretted position is an individual finger.
    independentFingers = fretted.length;
  }

  // Max 4 fingers + 1 thumb is unusual; convention is 4 fingers max.
  // If a barre exists, it counts as 1 (typically the index).
  const playable = independentFingers <= 4;
  return { playable, fretted: fretted.length, barre, independentFingers, issues };
}

const results = [];
let total = 0, pass = 0, fail = 0;
const failList = [];

/**
 * Bridge from the new {region, positions, barre} variation object to the
 * legacy mixed array `[[s,f], ..., {barre, strings}?]` that the helpers
 * `analyze` and `pitchClassSet` were originally written against.
 */
function flattenVariation(v) {
  const positions = v.positions ?? [];
  const barre = v.barre
    ? [{ barre: v.barre.fret, strings: v.barre.strings }]
    : [];
  return [...positions, ...barre];
}

for (const [rootName, voicings] of Object.entries(ROOTS)) {
  for (const [quality, variations] of Object.entries(voicings)) {
    if (!Array.isArray(variations)) continue;
    for (let idx = 0; idx < variations.length; idx++) {
      const flat = flattenVariation(variations[idx]);
      total++;
      const res = checkPlayability(flat);
      const pcs = pitchClassSet(flat);
      if (res.playable) {
        pass++;
      } else {
        fail++;
        const id = variations.length > 1 ? `${quality}#${idx}` : quality;
        failList.push({
          root: rootName,
          quality: id,
          ...res,
          pcs: [...pcs].sort((a, b) => a - b),
        });
      }
    }
  }
}

console.log(`Total voicings: ${total}`);
console.log(`Playable: ${pass}`);
console.log(`Unplayable: ${fail}`);
if (failList.length > 0) {
  console.log(`\nUnplayable voicings:`);
  for (const f of failList) {
    console.log(`  ${f.root}${f.quality}: fretted=${f.fretted}, barre=${f.barre ? `at ${f.barre.fret} over [${f.barre.strings}]` : 'none'}, fingers=${f.independentFingers}, pcs=[${f.pcs}]`);
  }
}

// Also export pitch class snapshot for cross-checks.
const pcSnapshot = {};
for (const [rootName, voicings] of Object.entries(ROOTS)) {
  pcSnapshot[rootName] = {};
  for (const [quality, variations] of Object.entries(voicings)) {
    if (!Array.isArray(variations)) continue;
    pcSnapshot[rootName][quality] = variations.map((v) =>
      [...pitchClassSet(flattenVariation(v))].sort((a, b) => a - b),
    );
  }
}

if (process.argv.includes("--dump-pcs")) {
  console.log("\nPitch class snapshot (JSON):");
  console.log(JSON.stringify(pcSnapshot));
}
