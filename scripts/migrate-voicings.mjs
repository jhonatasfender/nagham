#!/usr/bin/env node
// Converte src/domain/voicings/<Root>.js do formato achatado
// `[[s,f], ..., {barre, strings}?]` para `[{region, positions, barre}]`.
// Idempotente — pode ser re-executado a qualquer momento; usa o shim
// de normalização em voicings/index.js como fonte de verdade. Audits
// devem continuar 100 % depois.
import { writeFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getChordVariations } from "../src/domain/voicings/index.js";
import { QUALITY_KEYS } from "../src/domain/chordQualities.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ROOT_FILE_MAP = {
  C: "C.js", "C#": "CSharp.js", D: "D.js", "D#": "DSharp.js",
  E: "E.js", F: "F.js", "F#": "FSharp.js", G: "G.js",
  "G#": "GSharp.js", A: "A.js", "A#": "ASharp.js", B: "B.js",
};

function formatPositions(positions) {
  return positions
    .map(([s, f]) => `        [${s}, ${f}],`)
    .join("\n");
}

function formatBarre(barre) {
  if (!barre) return "      barre: null,";
  const strings = barre.strings.join(", ");
  return `      barre: { fret: ${barre.fret}, strings: [${strings}] },`;
}

function formatVariation(v) {
  const positionsBlock =
    v.positions.length === 0
      ? "      positions: [],"
      : [
          "      positions: [",
          formatPositions(v.positions),
          "      ],",
        ].join("\n");
  return [
    "    {",
    `      region: ${JSON.stringify(v.region)},`,
    positionsBlock,
    formatBarre(v.barre),
    "    },",
  ].join("\n");
}

function formatQuality(quality, variations) {
  const key = /^[a-zA-Z_$][\w$]*$/.test(quality)
    ? quality
    : JSON.stringify(quality);
  if (!variations.length) return null;
  const body = variations.map(formatVariation).join("\n");
  return `  ${key}: [\n${body}\n  ],`;
}

function generateFileContent(rootName) {
  const qualities = QUALITY_KEYS.filter((q) => q !== "m5");
  const lines = ["const voicings = {", ""];
  for (const quality of qualities) {
    const variations = getChordVariations(rootName, quality);
    const block = formatQuality(quality, variations);
    if (block) {
      lines.push(block, "");
    }
  }
  lines.push("};\n");
  lines.push("export default voicings;");
  return lines.join("\n");
}

const VOICINGS_DIR = pathResolve(__dirname, "../src/domain/voicings");
let writes = 0;
for (const [rootName, fileName] of Object.entries(ROOT_FILE_MAP)) {
  const filePath = pathResolve(VOICINGS_DIR, fileName);
  const content = generateFileContent(rootName);
  writeFileSync(filePath, content + "\n", "utf8");
  console.log(`→ wrote ${filePath}`);
  writes++;
}
console.log(`\nDone. Migrated ${writes} files.`);
