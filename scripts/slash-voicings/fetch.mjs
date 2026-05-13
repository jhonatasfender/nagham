#!/usr/bin/env node
// Baixa guitar.json do tombatossals/chords-db (pinado a um SHA) para
// scripts/slash-voicings-cache/_chords-db.json. A pipeline de slash-voicings
// lê desse cache; o SHA fixo garante reprodutibilidade.
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/slash-voicings/fetch.mjs
//   node --import ./scripts/_resolver.mjs scripts/slash-voicings/fetch.mjs --force
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../slash-voicings-cache");
const OUT_FILE = pathResolve(CACHE_DIR, "_chords-db.json");

const PINNED_SHA = "df06fa7b425cf5fd29485ff6591236b3557e3fac";
const URL = `https://raw.githubusercontent.com/tombatossals/chords-db/${PINNED_SHA}/lib/guitar.json`;

const force = process.argv.includes("--force");

if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

if (existsSync(OUT_FILE) && !force) {
  console.log(`✓ cache hit: ${OUT_FILE}`);
  console.log(`  use --force to redownload (pinned SHA ${PINNED_SHA.slice(0, 7)})`);
  process.exit(0);
}

console.log(`↓ fetching ${URL}`);
const res = await fetch(URL);
if (!res.ok) {
  console.error(`✗ HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}
const text = await res.text();
writeFileSync(OUT_FILE, text, "utf8");
const sizeKb = (text.length / 1024).toFixed(1);
console.log(`✓ saved ${OUT_FILE} (${sizeKb} KB, pinned SHA ${PINNED_SHA.slice(0, 7)})`);
