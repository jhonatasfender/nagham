#!/usr/bin/env node
// Gera src/domain/slashVoicings/<Root>.js a partir de
// scripts/slash-voicings-cache/_extracted.json.
//
// Schema dos arquivos gerados:
//
//   const slashVoicings = {
//     Maj: {
//       G: [ { region, positions, barre }, ... ],
//       E: [ ... ],
//     },
//     m: { G: [...], B: [...] },
//     m9: { ... },
//     7: { G: [...] },
//   };
//   export default slashVoicings;
//
// Variações com `manual: true` em arquivos existentes são preservadas
// (mesma política do scripts/musicca/apply.mjs).
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/slash-voicings/apply.mjs
//   node --import ./scripts/_resolver.mjs scripts/slash-voicings/apply.mjs --dry-run

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../slash-voicings-cache");
const EXTRACTED = pathResolve(CACHE_DIR, "_extracted.json");
const SLASH_DIR = pathResolve(__dirname, "../../src/domain/slashVoicings");

const ROOT_FILE_MAP = {
  C: "C.js",
  "C#": "CSharp.js",
  D: "D.js",
  Eb: "Eb.js",
  E: "E.js",
  F: "F.js",
  "F#": "FSharp.js",
  G: "G.js",
  Ab: "Ab.js",
  A: "A.js",
  Bb: "Bb.js",
  B: "B.js",
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

function countIndependentFingers(v) {
  const fretted = v.positions.filter(([, f]) => f > 0);
  let count = 0;
  if (v.barre) {
    for (const [s, f] of fretted) {
      if (v.barre.strings.includes(s) && f === v.barre.fret) continue;
      count++;
    }
    count += 1;
  } else {
    count = fretted.length;
  }
  return count;
}

function isPlayable(v) {
  return countIndependentFingers(v) <= 4;
}

function mergeBass(existing, fromExtracted) {
  const result = [];
  const seen = new Set();
  const playable = fromExtracted.filter(isPlayable);
  const incoming = new Map();
  for (const v of playable) incoming.set(fingerprint(v), v);

  for (const v of existing) {
    const fp = fingerprint(v);
    if (v.manual === true) {
      result.push(v);
      seen.add(fp);
      continue;
    }
    if (incoming.has(fp)) {
      result.push(v);
      seen.add(fp);
    }
  }
  for (const v of playable) {
    const fp = fingerprint(v);
    if (seen.has(fp)) continue;
    result.push({ region: v.region, positions: v.positions, barre: v.barre });
    seen.add(fp);
  }
  result.sort((a, b) => regionRank(a.region) - regionRank(b.region));
  return result;
}

function formatPositions(positions) {
  if (positions.length === 0) return "        positions: [],";
  return [
    "        positions: [",
    ...positions.map(([s, f]) => `          [${s}, ${f}],`),
    "        ],",
  ].join("\n");
}

function formatBarre(barre) {
  if (!barre) return "        barre: null,";
  return `        barre: { fret: ${barre.fret}, strings: [${barre.strings.join(", ")}] },`;
}

function formatVariation(v) {
  const lines = ["      {"];
  lines.push(`        region: ${JSON.stringify(v.region)},`);
  lines.push(formatPositions(v.positions));
  lines.push(formatBarre(v.barre));
  if (v.manual === true) lines.push("        manual: true,");
  lines.push("      },");
  return lines.join("\n");
}

function safeKey(k) {
  return /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
}

function generateFileContent(qualityToBassMap) {
  const lines = [
    "// Slash chord voicings importados de tombatossals/chords-db (GitHub).",
    "// Veja docs/adr/0012-chords-db-as-slash-voicings-source.md.",
    "// Variações com `manual: true` são editorialmente curadas e imunes à",
    "// sobrescrita por scripts/slash-voicings/apply.mjs.",
    "",
    "const slashVoicings = {",
  ];
  const qualities = Object.keys(qualityToBassMap).sort();
  for (const q of qualities) {
    const basses = qualityToBassMap[q];
    const bassKeys = Object.keys(basses);
    if (bassKeys.length === 0) continue;
    lines.push(`  ${safeKey(q)}: {`);
    for (const bass of bassKeys) {
      const variations = basses[bass];
      if (variations.length === 0) continue;
      lines.push(`    ${safeKey(bass)}: [`);
      for (const v of variations) lines.push(formatVariation(v));
      lines.push("    ],");
    }
    lines.push("  },");
  }
  lines.push("};");
  lines.push("");
  lines.push("export default slashVoicings;");
  return lines.join("\n");
}

async function loadExisting(filePath) {
  if (!existsSync(filePath)) return {};
  const mod = await import(`file://${filePath}?ts=${Date.now()}`);
  return mod.default ?? {};
}

const extracted = JSON.parse(readFileSync(EXTRACTED, "utf8"));

let touched = 0;
let totalVariations = 0;
for (const [rootName, fileName] of Object.entries(ROOT_FILE_MAP)) {
  const filePath = pathResolve(SLASH_DIR, fileName);
  const existing = await loadExisting(filePath);
  const incoming = extracted[rootName] ?? {};
  const merged = {};
  const allQualities = new Set([
    ...Object.keys(existing),
    ...Object.keys(incoming),
  ]);
  for (const q of allQualities) {
    const existingBasses = existing[q] ?? {};
    const incomingBasses = incoming[q] ?? {};
    const allBasses = new Set([
      ...Object.keys(existingBasses),
      ...Object.keys(incomingBasses),
    ]);
    const out = {};
    for (const bass of allBasses) {
      const ex = existingBasses[bass] ?? [];
      const inc = incomingBasses[bass] ?? [];
      const m = mergeBass(ex, inc);
      if (m.length > 0) out[bass] = m;
    }
    if (Object.keys(out).length > 0) merged[q] = out;
  }

  const counts = Object.values(merged).reduce(
    (s, byBass) =>
      s + Object.values(byBass).reduce((ss, vs) => ss + vs.length, 0),
    0
  );
  totalVariations += counts;
  const content = generateFileContent(merged);
  if (dryRun) {
    console.log(`--- would write ${filePath} (${counts} variations) ---`);
  } else {
    writeFileSync(filePath, content + "\n", "utf8");
    console.log(`→ wrote ${filePath} (${counts} variations)`);
    touched++;
  }
}
if (dryRun) {
  console.log(
    `\n(dry run) would touch ${Object.keys(ROOT_FILE_MAP).length} files, total ${totalVariations} variations.`
  );
} else {
  console.log(`\nDone. Wrote ${touched} file(s), total ${totalVariations} variations.`);
}
