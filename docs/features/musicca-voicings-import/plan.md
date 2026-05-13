# Musicca Voicings Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-stage pipeline (fetch → extract → apply) that imports curated guitar voicings from musicca.com into `src/domain/voicings/<Root>.js`, merging by fingerprint (preserve coincident, substitute different, add missing) while never overwriting variations flagged `manual: true`.

**Architecture:** Three discrete scripts under `scripts/musicca/` so each stage can be re-run independently. The cache directory `scripts/musicca-cache/` is committed to git, giving reviewable diffs when upstream content changes. The parser is pure (HTML in → variation object out) for testability; the orchestrators handle I/O. The merge stage uses canonical fingerprints (positions + barre, sorted) to detect equivalent shapes across sources.

**Tech Stack:** Node 20+ ESM, `cheerio` for HTML/CSS parsing, existing `_resolver.mjs` hook for domain imports, prettier-clean output to keep regenerated files diff-clean.

---

## File structure

| Path                                             | Mutation                  | Responsibility                                                  |
| ------------------------------------------------ | ------------------------- | --------------------------------------------------------------- |
| `package.json`                                   | Modify                    | Add `cheerio` to `devDependencies`                              |
| `docs/adr/0011-musicca-as-voicings-source.md`    | Create                    | ADR for musicca dependency + cheerio rationale                  |
| `docs/domain/glossary.md`                        | Modify                    | Add "fingerprint", "variação manual"                            |
| `docs/adr/README.md`                             | Modify                    | Index ADR-0011 row                                              |
| `scripts/musicca/slugs.js`                       | Create                    | Hardcoded `(root, quality) → slug` table                        |
| `scripts/musicca/parseSvgDiagram.mjs`            | Create                    | Pure function: HTML/SVG fragment → `{region, positions, barre}` |
| `scripts/musicca/fetch.mjs`                      | Create                    | HTTP downloader with rate limit + local cache                   |
| `scripts/musicca/extract.mjs`                    | Create                    | Orchestrate parser across cache, emit `_extracted.json`         |
| `scripts/musicca/apply.mjs`                      | Create                    | Merge `_extracted.json` into `<Root>.js`, fingerprint-based     |
| `scripts/musicca/README.md`                      | Create                    | Usage instructions, rate limit notes, attribution               |
| `scripts/musicca-cache/.gitkeep`                 | Create                    | Empty placeholder so the directory exists in git                |
| `src/domain/voicings/index.js`                   | Modify                    | Preserve `manual` flag through `normalizeVoicing`               |
| `src/domain/voicings/C.js`                       | Modify                    | Mark C Maj fret-5 variation as `manual: true`                   |
| `scripts/musicca-cache/<slug>.html` × 264        | Create (Task 5 runtime)   | HTML snapshots                                                  |
| `scripts/musicca-cache/_extracted.json`          | Create (Task 7 runtime)   | Consolidated extracted data                                     |
| `scripts/musicca-cache/_errors.log`              | Create (Task 5/7 runtime) | Failures log                                                    |
| `src/domain/voicings/<Root>.js` × 12             | Modify (Task 12 runtime)  | Rewritten with merged voicings                                  |
| `docs/features/musicca-voicings-import/spec.md`  | Modify                    | Mark shipped, link ADR-0011                                     |
| `docs/features/musicca-voicings-import/tasks.md` | Create                    | SDD checklist                                                   |

---

## Task 1: ADR-0011 + glossary + cheerio dependency

**Files:**

- Create: `docs/adr/0011-musicca-as-voicings-source.md`
- Modify: `docs/adr/README.md` (index)
- Modify: `docs/domain/glossary.md` (Acordes section)
- Modify: `package.json` (add cheerio)

- [ ] **Step 1: Create `docs/adr/0011-musicca-as-voicings-source.md`**

```markdown
# 0011 — musicca.com como fonte de referência de voicings de violão

- **Status:** Accepted
- **Data:** 2026-05-13
- **Supersedes:** —

## Contexto

O gerador heurístico (`scripts/generate-guitar-voicings.mjs`) produz shapes
válidos teoricamente mas frequentemente subótimos musicalmente. Correção
manual caso a caso não escala para 264 (root × quality).

`musicca.com` publica voicings curados em formato consistente (SVG com
coordenadas fixas, `ul.guitar-chord-diagrams`) e é referência popular para
estudantes brasileiros junto com Cifra Club.

## Decisão

Usar musicca.com como **fonte canônica** de voicings de violão para o
Nagham. Importação é feita por pipeline `fetch → extract → apply` em
`scripts/musicca/`. Cache local em `scripts/musicca-cache/` é commitado
para diff reviewable.

Variações com `manual: true` em `src/domain/voicings/<Root>.js` são
imunes à sobrescrita automática — protege correções editoriais.

## Consequências

- ➕ Voicings alinhados com material de estudo que estudantes brasileiros
  já usam.
- ➕ Atualizações upstream visíveis como diffs no cache.
- ➕ Curações editoriais (`manual: true`) sobrevivem ao pipeline.
- ➖ Dependência de fonte externa cuja estrutura HTML pode mudar; mitigação
  é o cache local + atribuição clara.
- ➖ Nova dependência `cheerio` (HTML/CSS server-side). Justificada pelo
  trade-off de não usar Playwright/Chromium para esse escopo.
- 🔄 `package.json` ganha `cheerio` em `devDependencies`.
- 🔄 ADR-0010 (estrutura `{region, positions, barre}`) ganha um campo
  opcional `manual: boolean`.

## Alternativas consideradas

- **Continuar com gerador heurístico apenas:** descartado pelo trabalho
  curatorial não escalar.
- **Playwright headless:** descartado por overkill — musicca renderiza
  HTML estático suficiente sem JS hydration.
- **Cifra Club como fonte:** descartado porque o HTML deles é menos
  estruturado para extração programática.

## Referências

- [`docs/features/musicca-voicings-import/spec.md`](../features/musicca-voicings-import/spec.md)
- [musicca.com/pt/dicionario/acordes](https://www.musicca.com/pt/dicionario/acordes/)
- [ADR-0010](0010-estrutura-variacoes-violao.md) — estrutura `{region, positions, barre}`.
```

- [ ] **Step 2: Update `docs/adr/README.md` index**

Append a new row to the ADR table after the 0010 row:

```markdown
| [0011](0011-musicca-as-voicings-source.md) | musicca.com como fonte de referência de voicings | Accepted | 2026-05-13 |
```

Match the column widths of the existing rows.

- [ ] **Step 3: Update `docs/domain/glossary.md`**

In the section `## Acordes`, after the "Chord-card" entry added in the previous feature, add:

```markdown
- **Fingerprint (de variação)** — hash determinístico do conteúdo de uma
  variação. Calculado por `<positions ordenadas>|<barre normalizado>`. Duas
  variações com o mesmo fingerprint são consideradas equivalentes para
  efeito de merge com fontes externas (ver
  [`features/musicca-voicings-import`](../features/musicca-voicings-import/spec.md)).
- **Variação manual** — variação em `<Root>.js` com campo `manual: true`.
  Imune à sobrescrita por importadores automáticos
  (`scripts/musicca/apply.mjs`). Usada para preservar correções editoriais.
```

- [ ] **Step 4: Install `cheerio`**

Run:

```bash
npm install --save-dev cheerio
```

Expected: `cheerio` appears in `package.json` `devDependencies`. Package-lock updated.

- [ ] **Step 5: Verify**

```bash
node -e "import('cheerio').then(c => console.log(typeof c.load))"
```

Expected output: `function`.

- [ ] **Step 6: Commit**

```bash
git add docs/adr/0011-musicca-as-voicings-source.md docs/adr/README.md docs/domain/glossary.md package.json package-lock.json
git commit -m "docs(musicca): ADR-0011 + glossary terms + cheerio dependency"
```

---

## Task 2: `scripts/musicca/slugs.js` — slug table

**Files:**

- Create: `scripts/musicca/slugs.js`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p scripts/musicca
```

- [ ] **Step 2: Write the full slug table**

`scripts/musicca/slugs.js`:

```js
// musicca.com URL slugs por (root, quality).
//
// Slug pattern: `<root>-<quality>` (com hífens). Padrões observados no
// dicionário do musicca em maio/2026. Re-validar com fetch.mjs --probe se
// algum 404 aparecer.

const ROOT_SLUG = {
  C: "do",
  "C#": "do-sustenido",
  Db: "re-bemol",
  D: "re",
  "D#": "re-sustenido",
  Eb: "mi-bemol",
  E: "mi",
  F: "fa",
  "F#": "fa-sustenido",
  Gb: "sol-bemol",
  G: "sol",
  "G#": "sol-sustenido",
  Ab: "la-bemol",
  A: "la",
  "A#": "la-sustenido",
  Bb: "si-bemol",
  B: "si",
};

const QUALITY_SLUG = {
  Maj: "maior",
  m: "menor",
  5: "power-chord",
  aug: "aumentado",
  sus2: "de-2a-suspensa",
  sus4: "de-4a-suspensa",
  6: "com-6a",
  m6: "menor-com-6a",
  7: "de-7a-dominante",
  m7: "menor-com-7a",
  maj7: "de-7a-maior",
  "m7(b5)": "meio-diminuto",
  dim7: "diminuto-com-7a",
  "6/9": "com-6a-e-9a",
  add9: "com-9a-adicionada",
  9: "com-9a",
  m9: "menor-com-9a",
  maj9: "de-9a-maior",
  "9+": "com-9a-aumentada",
  11: "com-11a",
  13: "de-13a-dominante",
};

// We export (root, quality) → slug.
export function getSlug(root, quality) {
  const rootSlug = ROOT_SLUG[root];
  const qualitySlug = QUALITY_SLUG[quality];
  if (!rootSlug || !qualitySlug) return null;
  return `${rootSlug}-${qualitySlug}`;
}

export const ALL_ROOTS = Object.keys(ROOT_SLUG);
export const ALL_QUALITIES = Object.keys(QUALITY_SLUG);
```

- [ ] **Step 3: Smoke test**

```bash
node --input-type=module -e "import('./scripts/musicca/slugs.js').then(m => { console.log(m.getSlug('E#', '13') ?? '(not in table — E# missing)'); console.log(m.getSlug('C', 'Maj')); console.log(m.getSlug('F#', 'sus4')); console.log('total:', m.ALL_ROOTS.length, 'roots ×', m.ALL_QUALITIES.length, 'qualities =', m.ALL_ROOTS.length * m.ALL_QUALITIES.length); })"
```

Expected:

- `(not in table — E# missing)` — E# is intentionally absent for now (rare, can be added later).
- `do-maior`
- `fa-sustenido-de-4a-suspensa`
- `total: 17 roots × 21 qualities = 357`

- [ ] **Step 4: Commit**

```bash
git add scripts/musicca/slugs.js
git commit -m "feat(musicca): slug table for roots and qualities"
```

---

## Task 3: `scripts/musicca/parseSvgDiagram.mjs` — pure parser

**Files:**

- Create: `scripts/musicca/parseSvgDiagram.mjs`

**Geometry contract** (verified by inspecting musicca's SVG):

- viewBox: `0 0 235 271`.
- Strings (vertical lines) at `x ∈ {30, 65, 100, 135, 170, 205}`. Map: `x=30 → stringIndex 5` (low E, leftmost), `x=205 → stringIndex 0` (high E, rightmost).
- Frets (horizontal lines) at `y ∈ {55 (nut), 104, 153, 202, 251}`. Row centers `y ∈ {79.5, 128.5, 177.5, 226.5}` correspond to frets 1, 2, 3, 4 of the diagram. If the diagram is shifted (fret label "3" on the left), the first visible row is fret `startFret` (parsed from the label).
- Above-grid markers (`y ≈ 35.4`): open ○ as `<circle class="note note-hover" fill="transparent" stroke="black">`.
- Above-grid markers (`y ≈ 24.13` via `<g transform="translate(X, 24.13)">`): muted × (path with "M19 6.41...").
- Finger dot: `<g class="note-hover" fill="#72ac51"><circle class="note" cx=X cy=Y r=16></circle></g>`. Y > 55.
- Barre: `<rect ... fill="#72ac51">` covering range of x at a specific y (fret).
- Fret-number label: `<text text-anchor="end" font-size="14">N</text>` (or similar) at the left side. Extracted via cheerio looking for any standalone text within the SVG with numeric content where x < 30.

- [ ] **Step 1: Create the file**

`scripts/musicca/parseSvgDiagram.mjs`:

```js
// Pure parser: musicca SVG fragment → variation object.
//
// API: parseSvgDiagram($, $svg)
//   $    — cheerio root function (from `load(html)`).
//   $svg — cheerio Selection wrapping a single <svg> element.
//   returns: { region, positions, barre } in our domain format.
//
// Coordinate contract (musicca standard, viewBox 235x271):
//   - String x: 30, 65, 100, 135, 170, 205
//     Mapping: x=30 → stringIndex 5 (low E), x=205 → stringIndex 0 (high E).
//   - Fret row centers: 79.5, 128.5, 177.5, 226.5 (relative to fret 1..4
//     of the displayed window).
//   - Above-grid markers: ○ at cy ≈ 35.4, × at translate-y ≈ 24.13.

const STRING_X = [205, 170, 135, 100, 65, 30]; // by stringIndex 0..5
const FRET_ROW_Y = [79.5, 128.5, 177.5, 226.5]; // displayed frets 1..4
const ABOVE_GRID_MAX_Y = 50; // anything cy < 50 is a marker, not a fingering
const TOLERANCE = 6; // px tolerance for coordinate matching

function nearestIndex(value, candidates) {
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = 0; i < candidates.length; i++) {
    const d = Math.abs(candidates[i] - value);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return bestDist <= TOLERANCE ? bestIdx : -1;
}

function xToStringIndex(x) {
  return nearestIndex(x, STRING_X);
}

function yToDisplayFret(y) {
  const idx = nearestIndex(y, FRET_ROW_Y);
  return idx === -1 ? -1 : idx + 1;
}

function parseTranslate(transformAttr) {
  if (!transformAttr) return null;
  const m = /translate\(\s*(-?[\d.]+)\s*,?\s*(-?[\d.]+)?\s*\)/.exec(
    transformAttr
  );
  if (!m) return null;
  return { x: parseFloat(m[1]), y: parseFloat(m[2] ?? "0") };
}

export function parseSvgDiagram($, $svg) {
  // 1. startFret from fret-number label (text at x < 30).
  let startFret = 1;
  $svg.find("text").each((_, el) => {
    const $el = $(el);
    const x = parseFloat($el.attr("x") ?? "0");
    const txt = $el.text().trim();
    if (x < 30 && /^\d+$/.test(txt) && startFret === 1) {
      const n = parseInt(txt, 10);
      if (Number.isFinite(n) && n > 0) startFret = n;
    }
  });

  const positions = [];
  const xOpen = new Set();

  // 2. Open-string markers above the grid (cy ≈ 35.4, fill="transparent").
  $svg.find("circle").each((_, el) => {
    const $el = $(el);
    const fill = ($el.attr("fill") ?? "").toLowerCase();
    const cy = parseFloat($el.attr("cy") ?? "NaN");
    const cx = parseFloat($el.attr("cx") ?? "NaN");
    if (fill === "transparent" && cy < ABOVE_GRID_MAX_Y) {
      const s = xToStringIndex(cx);
      if (s !== -1) xOpen.add(s);
    }
  });

  // 3. Finger dots: <g class="note-hover" fill="#72ac51"> <circle class="note">.
  $svg.find("g.note-hover").each((_, el) => {
    const $el = $(el);
    if (($el.attr("fill") ?? "").toLowerCase() !== "#72ac51") return;
    const $circle = $el.find("circle.note").first();
    if ($circle.length === 0) return;
    const cx = parseFloat($circle.attr("cx") ?? "NaN");
    const cy = parseFloat($circle.attr("cy") ?? "NaN");
    if (cy < ABOVE_GRID_MAX_Y) return;
    const stringIndex = xToStringIndex(cx);
    const displayFret = yToDisplayFret(cy);
    if (stringIndex === -1 || displayFret === -1) return;
    positions.push([stringIndex, startFret + displayFret - 1]);
  });

  // 4. Barre: rect with green fill.
  let barre = null;
  $svg.find("rect").each((_, el) => {
    const $el = $(el);
    if (($el.attr("fill") ?? "").toLowerCase() !== "#72ac51") return;
    const x = parseFloat($el.attr("x") ?? "NaN");
    const y = parseFloat($el.attr("y") ?? "NaN");
    const w = parseFloat($el.attr("width") ?? "NaN");
    const h = parseFloat($el.attr("height") ?? "NaN");
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w))
      return;
    const cy = y + h / 2;
    const displayFret = yToDisplayFret(cy);
    if (displayFret === -1) return;
    const strings = [];
    for (let s = 0; s < 6; s++) {
      const sx = STRING_X[s];
      if (sx >= x - 3 && sx <= x + w + 3) strings.push(s);
    }
    if (strings.length === 0) return;
    barre = {
      fret: startFret + displayFret - 1,
      strings: strings.sort((a, b) => a - b),
    };
  });

  // 5. Add open strings as fret-0 positions.
  for (const s of xOpen) positions.push([s, 0]);

  // 6. Dedupe + sort.
  const seen = new Set();
  const deduped = [];
  for (const p of positions) {
    const k = `${p[0]}-${p[1]}`;
    if (!seen.has(k)) {
      seen.add(k);
      deduped.push(p);
    }
  }
  deduped.sort((a, b) => (a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1]));

  // 7. Region.
  const hasOpenFret = deduped.some(([, f]) => f === 0);
  const allFrets = deduped.map(([, f]) => f).filter((f) => f > 0);
  if (barre) allFrets.push(barre.fret);
  const minFret = allFrets.length ? Math.min(...allFrets) : 1;
  const region = hasOpenFret || minFret <= 1 ? "open" : `fret-${minFret}`;

  return { region, positions: deduped, barre };
}

// Used internally by the smoke test in Task 3 step 2.
export const __test_internals = {
  xToStringIndex,
  yToDisplayFret,
  STRING_X,
  FRET_ROW_Y,
};
```

- [ ] **Step 2: Smoke test with a fixture**

Run a quick check with a known shape (C major open: x32010 → muted 6th, fret 3 5th, fret 2 4th, open 3rd, fret 1 2nd, open 1st):

```bash
node --input-type=module -e "
import { parseSvgDiagram } from './scripts/musicca/parseSvgDiagram.mjs';
import { load } from 'cheerio';

const svg = \`<svg viewBox='0 0 235 271'>
  <line x1='30' y1='55' x2='30' y2='251'></line>
  <g stroke='black' transform='translate(18,24.13)'><path d='M19 6.41z'/></g>
  <circle class='note note-hover' cx='135' cy='35.4' fill='transparent' stroke='black'></circle>
  <circle class='note note-hover' cx='205' cy='35.4' fill='transparent' stroke='black'></circle>
  <g class='note-hover' fill='#72ac51'><circle class='note' cx='65' cy='177.5'/></g>
  <g class='note-hover' fill='#72ac51'><circle class='note' cx='100' cy='128.5'/></g>
  <g class='note-hover' fill='#72ac51'><circle class='note' cx='170' cy='79.5'/></g>
</svg>\`;
const \$ = load(svg, { xmlMode: true });
const result = parseSvgDiagram(\$, \$('svg').first());
console.log(JSON.stringify(result, null, 2));
"
```

Expected (approximately):

```json
{
  "region": "open",
  "positions": [
    [0, 0],
    [1, 1],
    [2, 0],
    [3, 2],
    [4, 3]
  ],
  "barre": null
}
```

(Muted 6th string is at stringIndex 5; it's NOT in positions because muted strings are omitted from our format. The parser correctly returned that.)

- [ ] **Step 3: Lint**

```bash
npm run lint 2>&1 | tail -3
```

Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add scripts/musicca/parseSvgDiagram.mjs
git commit -m "feat(musicca): pure SVG-diagram parser"
```

---

## Task 4: `scripts/musicca/fetch.mjs` — HTTP cache downloader

**Files:**

- Create: `scripts/musicca/fetch.mjs`
- Create: `scripts/musicca-cache/.gitkeep`

- [ ] **Step 1: Create the cache directory**

```bash
mkdir -p scripts/musicca-cache
touch scripts/musicca-cache/.gitkeep
```

- [ ] **Step 2: Write `scripts/musicca/fetch.mjs`**

```js
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
const RATE_LIMIT_MS = 1100; // > 1 req/s to be polite
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
    `\nSummary: downloaded=${downloaded} cached=${cached} failed=${failed}`
  );
}

main();
```

- [ ] **Step 3: Smoke test (single chord, real network)**

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs C Maj 2>&1 | tail -5
```

Expected output: `→ do-maior` then summary. A file `scripts/musicca-cache/do-maior.html` should exist with HTML content.

```bash
ls -la scripts/musicca-cache/do-maior.html && head -c 200 scripts/musicca-cache/do-maior.html
```

Expected: file present with size > 1 KB, starts with `<!DOCTYPE html>` or similar.

- [ ] **Step 4: Re-run to confirm cache**

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs C Maj 2>&1 | tail -3
```

Expected: `downloaded=0 cached=1 failed=0`.

- [ ] **Step 5: Lint**

```bash
npm run lint 2>&1 | tail -3
```

- [ ] **Step 6: Commit (script + sample cache + .gitkeep)**

```bash
git add scripts/musicca/fetch.mjs scripts/musicca-cache/.gitkeep scripts/musicca-cache/do-maior.html
git commit -m "feat(musicca): HTTP cache fetcher with rate limit"
```

---

## Task 5: Populate the full cache (264 fetches)

**Files:**

- 264 files at `scripts/musicca-cache/<slug>.html`
- `scripts/musicca-cache/_errors.log` if any failures

- [ ] **Step 1: Run the full fetch**

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs 2>&1 | tail -10
```

Expected: ~5 minutes wall clock (357 slugs × 1.1s ≈ 6.5 min). Most should be `downloaded`; some may be `http-404` for nonexistent combinations (e.g., flats roots where musicca uses sharps).

- [ ] **Step 2: Inspect summary**

```bash
ls scripts/musicca-cache/*.html | wc -l
cat scripts/musicca-cache/_errors.log 2>/dev/null | tail -20
```

If 404s exceed ~30 slugs, the slug pattern may have gotten something wrong — investigate before committing. If under 30, that's expected (rare double-accidentals, alias roots).

- [ ] **Step 3: Commit the cache**

```bash
git add scripts/musicca-cache/
git commit -m "feat(musicca): populate full HTML cache"
```

Expected commit size: large but acceptable (~5-15 MB of compressed HTML in git objects).

---

## Task 6: `scripts/musicca/extract.mjs` — parse all cache into `_extracted.json`

**Files:**

- Create: `scripts/musicca/extract.mjs`

- [ ] **Step 1: Write the script**

```js
#!/usr/bin/env node
// Lê scripts/musicca-cache/<slug>.html, extrai todos os diagramas SVG
// dentro de ul.guitar-chord-diagrams via parseSvgDiagram, valida pitch
// classes contra getQualityPitchClasses, e grava JSON consolidado em
// scripts/musicca-cache/_extracted.json.
//
// Uso:
//   node --import ./scripts/_resolver.mjs scripts/musicca/extract.mjs
import {
  readFileSync,
  writeFileSync,
  existsSync,
  appendFileSync,
} from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import { ALL_ROOTS, ALL_QUALITIES, getSlug } from "./slugs.js";
import { parseSvgDiagram } from "./parseSvgDiagram.mjs";
import { getQualityPitchClasses } from "../../src/domain/chordQualities.js";
import { pitchClass } from "../../src/domain/notes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = pathResolve(__dirname, "../musicca-cache");
const OUT_FILE = pathResolve(CACHE_DIR, "_extracted.json");
const ERROR_LOG = pathResolve(CACHE_DIR, "_errors.log");

const STRING_OPEN_MIDI = [64, 59, 55, 50, 45, 40]; // index 0 = high E

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

function logError(line) {
  appendFileSync(ERROR_LOG, `${new Date().toISOString()} ${line}\n`, "utf8");
}

function expectedPcSet(root, quality) {
  const rootPc = ROOT_PC[root];
  const intervals = getQualityPitchClasses(quality);
  if (rootPc === undefined || !intervals) return null;
  return new Set(intervals.map((i) => (rootPc + i) % 12));
}

function pcsFromVariation(variation) {
  const set = new Set();
  const stringFrets = new Map();
  for (const [s, f] of variation.positions) {
    stringFrets.set(s, Math.max(stringFrets.get(s) ?? -1, f));
  }
  if (variation.barre) {
    for (const s of variation.barre.strings) {
      const cur = stringFrets.get(s) ?? -1;
      if (variation.barre.fret > cur) stringFrets.set(s, variation.barre.fret);
    }
  }
  for (const [s, f] of stringFrets) {
    set.add(pitchClass(STRING_OPEN_MIDI[s] + f));
  }
  return set;
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function extractOne(root, quality) {
  const slug = getSlug(root, quality);
  if (!slug) return null;
  const file = pathResolve(CACHE_DIR, `${slug}.html`);
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");
  const $ = load(html);
  const $svgs = $("ul.guitar-chord-diagrams svg");
  if ($svgs.length === 0) {
    logError(`${root} ${quality} ${slug}: no SVG diagrams found`);
    return [];
  }
  const expected = expectedPcSet(root, quality);
  const variations = [];
  $svgs.each((idx, el) => {
    try {
      const $svg = $(el);
      const variation = parseSvgDiagram($, $svg);
      if (expected) {
        const actual = pcsFromVariation(variation);
        if (!setsEqual(actual, expected)) {
          logError(
            `${root} ${quality} ${slug}#${idx}: pc mismatch expected=${[...expected].sort()} actual=${[...actual].sort()}`
          );
          return; // skip this variation
        }
      }
      variations.push({
        ...variation,
        sourceSlug: slug,
        sourceIndex: idx,
      });
    } catch (err) {
      logError(`${root} ${quality} ${slug}#${idx}: ${err.message}`);
    }
  });
  return variations;
}

const result = {};
let counts = { roots: 0, qualities: 0, variations: 0 };
for (const root of ALL_ROOTS) {
  let added = false;
  for (const quality of ALL_QUALITIES) {
    const variations = extractOne(root, quality);
    if (!variations || variations.length === 0) continue;
    if (!result[root]) {
      result[root] = {};
      counts.roots++;
    }
    result[root][quality] = variations.map((v) => ({
      region: v.region,
      positions: v.positions,
      barre: v.barre,
    }));
    counts.qualities++;
    counts.variations += variations.length;
    added = true;
  }
  if (added) console.log(`✓ ${root}`);
}

writeFileSync(OUT_FILE, JSON.stringify(result, null, 2), "utf8");
console.log(
  `\nWrote ${OUT_FILE} — ${counts.roots} roots, ${counts.qualities} (root, quality) entries, ${counts.variations} variations.`
);
```

- [ ] **Step 2: Run on cached `do-maior.html` (single chord)**

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/extract.mjs 2>&1 | tail -5
```

Expected: at least 1 root (C) processed. Output shows the count of variations.

- [ ] **Step 3: Verify `_extracted.json` for C Maj**

```bash
node -e "const j = require('./scripts/musicca-cache/_extracted.json'); console.log(JSON.stringify(j.C?.Maj, null, 2));"
```

Expected: an array of 2+ variation objects with `region`, `positions`, `barre`. Pitch classes should all be {C, E, G}.

- [ ] **Step 4: Lint**

```bash
npm run lint 2>&1 | tail -3
```

- [ ] **Step 5: Commit**

```bash
git add scripts/musicca/extract.mjs
git commit -m "feat(musicca): orchestrate extraction into _extracted.json"
```

---

## Task 7: Update `voicings/index.js` to preserve `manual` flag

**Files:**

- Modify: `src/domain/voicings/index.js`

- [ ] **Step 1: Modify `normalizeVoicing`**

In `src/domain/voicings/index.js`, find the branch that handles the new-objects format (around lines 54-67). Currently:

```js
if (
  Array.isArray(raw) &&
  raw.length > 0 &&
  raw[0] &&
  typeof raw[0] === "object" &&
  !Array.isArray(raw[0]) &&
  Array.isArray(raw[0].positions)
) {
  return raw.map((v) => ({
    region: v.region ?? computeRegion(v.positions, v.barre),
    positions: v.positions,
    barre: v.barre ?? null,
  }));
}
```

Replace with:

```js
if (
  Array.isArray(raw) &&
  raw.length > 0 &&
  raw[0] &&
  typeof raw[0] === "object" &&
  !Array.isArray(raw[0]) &&
  Array.isArray(raw[0].positions)
) {
  return raw.map((v) => {
    const out = {
      region: v.region ?? computeRegion(v.positions, v.barre),
      positions: v.positions,
      barre: v.barre ?? null,
    };
    if (v.manual === true) out.manual = true;
    return out;
  });
}
```

- [ ] **Step 2: Run audits — must not regress**

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs 2>&1 | tail -1
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs 2>&1 | tail -3
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary 2>&1 | tail -2
npm run lint 2>&1 | tail -1
npm run build 2>&1 | tail -1
```

Expected: identical to baseline (`audit-spelling` 207/207, `check-playability` 369/369, `render-notes` PIANO 189/189 GUITAR 263/391 with 128 failures, lint+build clean).

- [ ] **Step 3: Commit**

```bash
git add src/domain/voicings/index.js
git commit -m "feat(voicings): preserve manual flag through normalization"
```

---

## Task 8: Mark `C Maj fret-5` variation as `manual: true`

**Files:**

- Modify: `src/domain/voicings/C.js`

- [ ] **Step 1: Find and edit the entry**

In `src/domain/voicings/C.js`, find the `Maj:` block. The third variation (region "fret-5", with the barre at fret 5) should be marked manual. Edit it from:

```js
    {
      region: "fret-5",
      positions: [
        [0, 8],
        [4, 7],
        [5, 8],
      ],
      barre: { fret: 5, strings: [5, 4, 3, 2, 1, 0] },
    },
```

to:

```js
    {
      region: "fret-5",
      positions: [
        [0, 8],
        [4, 7],
        [5, 8],
      ],
      barre: { fret: 5, strings: [5, 4, 3, 2, 1, 0] },
      manual: true,
    },
```

- [ ] **Step 2: Audits**

```bash
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs 2>&1 | tail -3
npm run lint 2>&1 | tail -1
```

Expected: 369/369 playable, lint clean.

- [ ] **Step 3: Commit**

```bash
git add src/domain/voicings/C.js
git commit -m "feat(voicings): mark C Maj fret-5 barre variation as manual"
```

---

## Task 9: `scripts/musicca/apply.mjs` — merge `_extracted.json` into `<Root>.js`

**Files:**

- Create: `scripts/musicca/apply.mjs`

**Merge algorithm:**

1. Load existing voicings via `getChordVariations(root, quality)`.
2. Compute fingerprint for each existing and each musicca variation.
3. Output set:
   - Keep existing variations whose fingerprint matches any musicca fingerprint → tag with `manual:true` if it was, otherwise no flag.
   - Keep existing variations with `manual: true` regardless of match.
   - Add musicca variations whose fingerprint isn't already in the kept set.
4. Sort: variations with `region: "open"` first, then by ascending `fret-N`.
5. Write `<Root>.js` in the established format.

- [ ] **Step 1: Write the script**

```js
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
  C: "C.js",
  "C#": "CSharp.js",
  D: "D.js",
  "D#": "DSharp.js",
  E: "E.js",
  F: "F.js",
  "F#": "FSharp.js",
  G: "G.js",
  "G#": "GSharp.js",
  A: "A.js",
  "A#": "ASharp.js",
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

function mergeQuality(existing, musicca) {
  const result = [];
  const seenFingerprints = new Set();
  const musiccaFps = new Map(); // fingerprint → musicca variation
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
      result.push(v); // matches → keep as-is
      seenFingerprints.add(fp);
    }
    // else: existing variation not in musicca and not manual → drop
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
if (dryRun)
  console.log(
    `\n(dry run) would touch ${Object.keys(ROOT_FILE_MAP).length} files.`
  );
else console.log(`\nDone. Wrote ${touched} file(s).`);
```

- [ ] **Step 2: Dry-run on C**

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs --dry-run 2>&1 | head -40
```

Expected: human-readable diff preview showing what `C.js` would look like. The `C Maj fret-5` variation (with `manual: true`) should appear in the output.

- [ ] **Step 3: Lint**

```bash
npm run lint 2>&1 | tail -3
```

- [ ] **Step 4: Commit**

```bash
git add scripts/musicca/apply.mjs
git commit -m "feat(musicca): merge extracted variations into voicings via fingerprint"
```

---

## Task 10: Run `apply.mjs` for real + commit results

**Files:**

- Modify: all 12 `src/domain/voicings/<Root>.js`

- [ ] **Step 1: Apply**

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs 2>&1 | tail -15
```

Expected: 12 files rewritten.

- [ ] **Step 2: Run audits — critical regression check**

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs 2>&1 | tail -1
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs 2>&1 | tail -3
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary 2>&1 | tail -2
```

Expected:

- `audit-spelling`: clean (no change).
- `check-playability`: `Unplayable: 0`. Total count varies; CRITICAL it's 0 unplayable.
- `render-notes --summary`: GUITAR failures should be LOWER than 128 (curated shapes have better PC coverage). If higher, something parsed wrong.

If any voicing fails playability, inspect `scripts/musicca-cache/_errors.log`. Manually patch or skip the offending variation in `<Root>.js`.

- [ ] **Step 3: Lint + build**

```bash
npm run lint 2>&1 | tail -1
npm run build 2>&1 | tail -1
```

Both clean.

- [ ] **Step 4: Visual smoke test in dev**

```bash
npm run dev 2>&1 > /tmp/dev.log &
sleep 5
curl -s http://localhost:5173 | grep -c '<!doctype html>'
```

Expected: `1`.

Then visually check (manual or via Chrome MCP): open `http://localhost:5173/`, switch through a few chords (C Maj, F# m7, G sus4), confirm the variation strip shows multiple cards with sensible shapes.

Stop the dev server:

```bash
pkill -f vite
```

- [ ] **Step 5: Commit**

```bash
git add src/domain/voicings/
git commit -m "feat(voicings): import curated shapes from musicca.com"
```

---

## Task 11: `scripts/musicca/README.md` + ship spec

**Files:**

- Create: `scripts/musicca/README.md`
- Modify: `docs/features/musicca-voicings-import/spec.md` (mark shipped)
- Create: `docs/features/musicca-voicings-import/tasks.md`

- [ ] **Step 1: Write `scripts/musicca/README.md`**

````markdown
# scripts/musicca/ — Importador de voicings do musicca.com

Pipeline em 3 etapas para sincronizar `src/domain/voicings/<Root>.js`
com [musicca.com/pt/dicionario/acordes](https://www.musicca.com/pt/dicionario/acordes/).
Veja [ADR-0011](../../docs/adr/0011-musicca-as-voicings-source.md) e
[a feature spec](../../docs/features/musicca-voicings-import/spec.md).

## Fluxo

```text
fetch.mjs   →   musicca-cache/<slug>.html
                       ↓
                extract.mjs   →   musicca-cache/_extracted.json
                                          ↓
                                   apply.mjs   →   src/domain/voicings/<Root>.js
```
````

## Comandos

```bash
# 1. Baixar HTML (idempotente — pula cache existente)
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs --force  # força redownload
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs C Maj    # apenas um chord

# 2. Parsear cache → JSON
node --import ./scripts/_resolver.mjs scripts/musicca/extract.mjs

# 3. Aplicar merge nos voicings
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs --dry-run
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs
```

## Rate limit

`fetch.mjs` dorme 1.1s entre requisições. Não suba isso sem necessidade.

## Atribuição

Os shapes vêm de musicca.com. O cache local em `musicca-cache/` é
commitado para que mudanças upstream apareçam como diffs revisáveis.

## Variações manuais

Variações com `manual: true` em `<Root>.js` NÃO são sobrescritas pelo
`apply.mjs`. Use isso para preservar correções editoriais que diferem
do musicca (ex.: shape `C Maj fret-5 barre`).

````

- [ ] **Step 2: Create `docs/features/musicca-voicings-import/tasks.md`**

```markdown
# Tarefas: Importar voicings de violão a partir do musicca.com

Ver detalhes em [`plan.md`](./plan.md).

1. [x] ADR-0011 + glossário + cheerio dependency
2. [x] `scripts/musicca/slugs.js`
3. [x] `scripts/musicca/parseSvgDiagram.mjs`
4. [x] `scripts/musicca/fetch.mjs`
5. [x] Cache populado (264 fetches)
6. [x] `scripts/musicca/extract.mjs`
7. [x] `voicings/index.js` preserva `manual`
8. [x] `C Maj fret-5` marcado `manual: true`
9. [x] `scripts/musicca/apply.mjs`
10. [x] Apply rodado + voicings reescritas
11. [x] README + spec shipped
````

- [ ] **Step 3: Mark spec shipped**

In `docs/features/musicca-voicings-import/spec.md`, change the header:

```markdown
- **Status:** draft
- **Owner:** jonatas
- **Atualizado:** 2026-05-13
- **ADRs previstos:** ADR-0011 (musicca.com como fonte de referência de voicings)
```

to:

```markdown
- **Status:** shipped
- **Owner:** jonatas
- **Atualizado:** 2026-05-13
- **Shipped:** 2026-05-13
- **ADRs gerados:** [ADR-0011](../../adr/0011-musicca-as-voicings-source.md)
```

- [ ] **Step 4: Commit**

```bash
git add scripts/musicca/README.md docs/features/musicca-voicings-import/
git commit -m "docs(musicca): README + mark feature shipped"
```

---

## Riscos

| Risco                                | Mitigação                                                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| musicca muda estrutura HTML          | Cache local commitado expõe mudança como diff; `extract.mjs` falha com erro claro.                          |
| Parser interpreta SVG errado         | Validação contra `getQualityPitchClasses` em `extract.mjs` rejeita variações com pitch class set incorreto. |
| `apply.mjs` apaga variação editorial | `manual: true` é gate inviolável. C Maj fret-5 já marcado em Task 8.                                        |
| 404s pra slugs raros                 | Listados em `_errors.log`, ignorados em runtime. Slug table pode ser corrigida e re-rodada.                 |
| Cheerio adiciona vulnerabilidade     | É devDependencies; não afeta bundle. Auditado via `npm audit` no commit final.                              |
| Cache muito grande no git            | ~5-15 MB esperados. Se virar problema, considerar mover pra LFS em ADR futuro.                              |

## Validação (recapitulada)

Antes de fechar a feature, executar:

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs       # clean
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs    # 0 unplayable
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary  # GUITAR failures não regridem
npm run lint
npm run build
```

E smoke test visual da Home em `npm run dev`.
