#!/usr/bin/env node
// Merge scripts/musicca-cache/_extracted.json into src/domain/voicings/<Root>.js
// via fingerprint matching. Preserva variações com manual:true.
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs
//   node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs --dry-run
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { QUALITY_KEYS } from "../../src/domain/chordQualities.js";
import { getChordVariations } from "../../src/domain/voicings/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../musicca-cache");
const EXTRACTED = pathResolve(CACHE_DIR, "_extracted.json");
const VOICINGS_DIR = pathResolve(__dirname, "../../src/domain/voicings");

const ROOT_FILE_MAP = {
  C: "C.js", "C#": "CSharp.js", D: "D.js", "D#": "DSharp.js",
  E: "E.js", F: "F.js", "F#": "FSharp.js", G: "G.js",
  "G#": "GSharp.js", A: "A.js", "A#": "ASharp.js", B: "B.js",
};

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

function fingerprint(v) {
  const posStr = v.positions
    .map(([s, f]) => `${s}:${f}`)
    .sort()
    .join("|");
  const barreStr = v.barre
    ? `B${v.barre.fret}-${[...v.barre.strings].sort((a, b) => a - b).join(",")}`
    : "B-";
  return `${posStr}/${barreStr}`;
}

function regionRank(region) {
  if (region === "open") return 0;
  const m = /^fret-(\d+)$/.exec(region);
  return m ? parseInt(m[1], 10) : 999;
}

function mergeQuality(existing, musicca) {
  const result = [];
  const seenFingerprints = new Set();
  const musiccaFps = new Map();
  for (const v of musicca) musiccaFps.set(fingerprint(v), v);

  // Pass 1: existing variations
  for (const v of existing) {
    const fp = fingerprint(v);
    if (v.manual === true) {
      result.push(v);
      seenFingerprints.add(fp);
      continue;
    }
    if (musiccaFps.has(fp)) {
      result.push(v);
      seenFingerprints.add(fp);
    }
  }

  // Pass 2: musicca variations not in result yet
  for (const v of musicca) {
    const fp = fingerprint(v);
    if (seenFingerprints.has(fp)) continue;
    result.push({ region: v.region, positions: v.positions, barre: v.barre });
    seenFingerprints.add(fp);
  }

  result.sort((a, b) => regionRank(a.region) - regionRank(b.region));
  return result;
}

function formatPositions(positions) {
  if (positions.length === 0) return "      positions: [],";
  return [
    "      positions: [",
    ...positions.map(([s, f]) => `        [${s}, ${f}],`),
    "      ],",
  ].join("\n");
}

function formatBarre(barre) {
  if (!barre) return "      barre: null,";
  return `      barre: { fret: ${barre.fret}, strings: [${barre.strings.join(", ")}] },`;
}

function formatVariation(v) {
  const lines = ["    {"];
  lines.push(`      region: ${JSON.stringify(v.region)},`);
  lines.push(formatPositions(v.positions));
  lines.push(formatBarre(v.barre));
  if (v.manual === true) lines.push("      manual: true,");
  lines.push("    },");
  return lines.join("\n");
}

function generateFileContent(rootName, qualityToVariations) {
  const qualities = QUALITY_KEYS.filter((q) => q !== "m5");
  const lines = [
    "// Voicings de violão importados de musicca.com.",
    "// Veja docs/adr/0011-musicca-as-voicings-source.md.",
    "// Variações com `manual: true` são editorialmente curadas e imunes à",
    "// sobrescrita por scripts/musicca/apply.mjs.",
    "",
    "const voicings = {",
    "",
  ];
  for (const quality of qualities) {
    const variations = qualityToVariations[quality];
    if (!variations || variations.length === 0) continue;
    const key = /^[a-zA-Z_$][\w$]*$/.test(quality)
      ? quality
      : JSON.stringify(quality);
    lines.push(`  ${key}: [`);
    for (const v of variations) lines.push(formatVariation(v));
    lines.push("  ],");
    lines.push("");
  }
  lines.push("};\n");
  lines.push("export default voicings;");
  return lines.join("\n");
}

const extracted = JSON.parse(readFileSync(EXTRACTED, "utf8"));

let touched = 0;
for (const [rootName, fileName] of Object.entries(ROOT_FILE_MAP)) {
  const filePath = pathResolve(VOICINGS_DIR, fileName);
  const qualityToVariations = {};
  for (const quality of QUALITY_KEYS) {
    if (quality === "m5") continue;
    const existing = getChordVariations(rootName, quality);
    const musicca = extracted?.[rootName]?.[quality] ?? [];
    const merged = mergeQuality(existing, musicca);
    if (merged.length > 0) qualityToVariations[quality] = merged;
  }
  const content = generateFileContent(rootName, qualityToVariations);
  if (dryRun) {
    console.log(`--- would write ${filePath} ---`);
    console.log(content);
  } else {
    writeFileSync(filePath, content + "\n", "utf8");
    console.log(`→ wrote ${filePath}`);
    touched++;
  }
}
if (dryRun) console.log(`\n(dry run) would touch ${Object.keys(ROOT_FILE_MAP).length} files.`);
else console.log(`\nDone. Wrote ${touched} file(s).`);
