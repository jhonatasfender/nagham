#!/usr/bin/env node
// Baixa páginas de acordes do musicca.com e salva HTML cru em
// scripts/musicca-cache/<slug>.html. Idempotente: pula slugs já cacheados
// a menos que --force seja passado.
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs
//   node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs C Maj
//   node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs --force
import { existsSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_ROOTS, ALL_QUALITIES, getSlug } from "./slugs.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../musicca-cache");
const ERROR_LOG = pathResolve(CACHE_DIR, "_errors.log");
const RATE_LIMIT_MS = 1100;
const USER_AGENT =
  "Nagham/0.1 (+https://github.com/jhonatasfender/nagham) musicca-import";

const args = process.argv.slice(2);
const force = args.includes("--force");
const positional = args.filter((a) => !a.startsWith("--"));
const [filterRoot, filterQuality] = positional;

function logError(line) {
  appendFileSync(ERROR_LOG, `${new Date().toISOString()} ${line}\n`, "utf8");
}

async function fetchOne(root, quality) {
  const slug = getSlug(root, quality);
  if (!slug) {
    logError(`no slug for (${root}, ${quality})`);
    return { status: "no-slug", root, quality };
  }
  const dest = pathResolve(CACHE_DIR, `${slug}.html`);
  if (existsSync(dest) && !force) {
    return { status: "cached", root, quality, slug };
  }
  const url = `https://www.musicca.com/pt/dicionario/acordes/${slug}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok) {
      logError(`${res.status} ${url}`);
      return { status: `http-${res.status}`, root, quality, slug };
    }
    const html = await res.text();
    writeFileSync(dest, html, "utf8");
    return { status: "downloaded", root, quality, slug };
  } catch (err) {
    logError(`fetch ${url} failed: ${err.message}`);
    return { status: "error", root, quality, slug, error: err.message };
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  let downloaded = 0;
  let cached = 0;
  let failed = 0;
  for (const root of ALL_ROOTS) {
    if (filterRoot && filterRoot !== root) continue;
    for (const quality of ALL_QUALITIES) {
      if (filterQuality && filterQuality !== quality) continue;
      const result = await fetchOne(root, quality);
      if (result.status === "downloaded") {
        downloaded++;
        console.log(`→ ${result.slug}`);
        await sleep(RATE_LIMIT_MS);
      } else if (result.status === "cached") {
        cached++;
      } else {
        failed++;
        console.warn(`! ${root} ${quality}: ${result.status}`);
      }
    }
  }
  console.log(
    `\nSummary: downloaded=${downloaded} cached=${cached} failed=${failed}`,
  );
}

main();
