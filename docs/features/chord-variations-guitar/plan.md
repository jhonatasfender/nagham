# Variações de acordes no violão — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar suporte a múltiplas variações de violão por (root, quality) na Home, com tira de miniaturas d3 navegável abaixo do braço, e estrutura de dados curável + gerável automaticamente.

**Architecture:** O domínio (`src/domain/voicings/<Root>.js`) passa do formato achatado de pares `[s,f]` para um array de objetos `{region, positions, barre}`. Um shim de leitura garante compatibilidade durante a migração. A UI ganha `drawChordCard` (d3 puro, vertical, 92×110) e dois wrappers React (`ChordCard`, `ChordVariationStrip`). A Home reseta `variationIndex` no `chordReducer` quando root/quality muda. ChordBuilder não muda.

**Tech Stack:** React 19, Vite 8, D3 7, Tailwind 4, i18next, `@tonaljs/*`. Sem framework de testes — validação é via audits (`scripts/`), lint, build, e checklist manual de UI.

---

## File structure

| Caminho                                          | Mudança   | Responsabilidade                                                                                                      |
| ------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------- |
| `docs/adr/0010-estrutura-variacoes-violao.md`    | Criar     | ADR registrando a decisão de migrar pro formato objeto                                                                |
| `docs/domain/chords.md`                          | Modificar | Atualizar seção "Voicings" descrevendo formato novo                                                                   |
| `docs/domain/glossary.md`                        | Modificar | + termos "Variação", "Região", "Chord-card"                                                                           |
| `src/domain/voicings/index.js`                   | Modificar | Shim de leitura + `getChordVariations` + `getVariationRegionLabelKey` + `idx` em getBarreFromVoicing                  |
| `src/domain/voicings/<12 files>.js`              | Modificar | Migrar pro formato `[{region, positions, barre}]`                                                                     |
| `scripts/migrate-voicings.mjs`                   | Criar     | One-shot: lê arquivos no formato achatado, reescreve no objeto                                                        |
| `scripts/generate-guitar-voicings.mjs`           | Modificar | + flag `--variations=N`, busca por região, deduplicação                                                               |
| `scripts/render-notes.mjs`                       | Modificar | Iterar `variations[]` por (root, quality)                                                                             |
| `scripts/check-playability.mjs`                  | Modificar | Iterar `variations[]` por (root, quality)                                                                             |
| `src/views/Guitar/constants.js`                  | Modificar | + `CHORD_CARD_*` dimensions                                                                                           |
| `src/views/Guitar/drawChordCard.js`              | Criar     | d3 puro: chord-card compacto vertical                                                                                 |
| `src/views/Guitar/ChordCard.jsx`                 | Criar     | Wrapper React: `<button>` + `drawChordCard` no useEffect                                                              |
| `src/views/Guitar/ChordVariationStrip.jsx`       | Criar     | Lista horizontal scrollável; oculta se < 2 variações                                                                  |
| `src/views/Guitar/GuitarView.jsx`                | Modificar | + prop `variationIndex`, repassa para domain                                                                          |
| `src/pages/Home.jsx`                             | Modificar | `chordReducer` ganha `variationIndex`, reset em root/quality/extension; render `<ChordVariationStrip>`                |
| `src/i18n/locales/{pt-BR,en,es}.json`            | Modificar | + chaves `voicings.region.*`, `voicings.variation_label`, `voicings.variations_strip_title`, `voicings.no_variations` |
| `docs/features/chord-variations-guitar/tasks.md` | Criar     | Checklist por convenção SDD do Nagham                                                                                 |

---

## Task 1: ADR-0010 + atualização da documentação do domínio

**Files:**

- Create: `docs/adr/0010-estrutura-variacoes-violao.md`
- Modify: `docs/domain/chords.md` (seção "Voicings: três representações paralelas")
- Modify: `docs/domain/glossary.md` (seção "Acordes")

**Por que primeiro:** estabelece o vocabulário antes de qualquer código.

- [ ] **Step 1: Criar ADR-0010**

Conteúdo:

```markdown
# ADR-0010: Estrutura de variações de voicing de violão

- **Status:** accepted
- **Data:** 2026-05-12
- **Decisão:** Migrar `src/domain/voicings/<Root>.js` do formato achatado `[[s,f], {barre, strings}?]` para `[{region, positions, barre}]` (array de objetos por qualidade).

## Contexto

O guitarrista precisa conhecer várias formas do mesmo acorde no braço — abertas, com pestana em diferentes casas, voicings em string sets distintos. A infraestrutura do domínio já antecipava isso (`getChordVoicing(root, quality, positionIndex)`), mas o formato achatado:

1. Mistura pares `[s,f]` com objeto `barre` no mesmo array, frágil para N shapes.
2. Não carrega metadado por variação (rótulo didático, região).

## Decisão

Adotar formato:

\`\`\`js
Maj: [
{ region: "open", positions: [[4,3],[3,2],[2,0],[1,1],[0,0]], barre: null },
{ region: "fret-3", positions: [[4,3],[3,5],[2,5],[1,5]], barre: { fret: 3, strings: [4,3,2,1,0] } },
]
\`\`\`

Campos: `region` (semântica `"open"` | `"fret-N"`), `positions` (pares `[s,f]` puros), `barre` (objeto ou `null`).

## Consequências

**Boas:**

- Cada variação carrega seu próprio metadado; rótulos i18n derivam de `region`.
- Iteração consistente sobre todas as variações para audits.
- Sem mistura de tipos no array; código de consumo mais simples.

**Custos:**

- Migração one-shot dos 12 arquivos `<Root>.js`.
- Shim de leitura em `voicings/index.js` cobre formato antigo e novo durante a transição.
- Auditorias `render-notes.mjs` e `check-playability.mjs` reescritas pra iterar `variations[]`.

## Supersedes

Nenhum.

## Alternativas consideradas

- Manter formato achatado em arrays aninhadas (`[[[s,f],…], [[s,f],…]]`) — já parcialmente suportado, mas sem espaço pra `region`/rótulo.
- Wrap por qualidade em objeto (`Maj: { variations: [...] }`) — mais um nível de aninhamento sem ganho concreto agora.
```

- [ ] **Step 2: Atualizar `docs/domain/chords.md` — seção "Voicings: três representações paralelas"**

Substituir a tabela do violão (linha que diz `src/domain/voicings/<Root>.js | [[string, fret]] ou positions array | GuitarView`) por:

```markdown
| `src/domain/voicings/<Root>.js` | `[{region, positions, barre}]` (array de variações) | `GuitarView` |
```

Adicionar parágrafo logo abaixo da tabela:

```markdown
**Variações no violão (a partir de 2026-05):** cada `(root, quality)` tem
um array de variações. Cada variação carrega `region` (`"open"` ou
`"fret-N"`), `positions` (pares `[stringIndex, fret]`) e `barre`
(objeto `{fret, strings}` ou `null`). Ordem do array define ordem de
exibição (posição 0 = "principal"). Ver
[ADR-0010](../adr/0010-estrutura-variacoes-violao.md) e
[feature spec](../features/chord-variations-guitar/spec.md).
```

- [ ] **Step 3: Atualizar `docs/domain/glossary.md` — seção "Acordes"**

Adicionar (mantendo a ordem alfabética interna ou após o termo "Inversão"):

```markdown
- **Variação (de acorde no violão)** — outra forma do mesmo acorde no
  braço, com mesmas pitch classes mas distribuição de oitavas e/ou
  região do braço diferentes. No Nagham, é uma posição no array de
  variações de `(root, quality)` em `src/domain/voicings/<Root>.js`.
  **Distinto de inversão**: inversão muda a nota mais grave; variação
  pode ou não mudar.
- **Região (de variação)** — chave semântica em cada variação:
  `"open"` (envolve cordas soltas ou começa no traste 1) ou `"fret-N"`
  (começa no traste N, com N de 1 a 12). Define o rótulo i18n pedagógico
  ("Aberto", "3ª casa", etc.).
- **Chord-card** — diagrama vertical compacto de acorde (formato Cifra
  Club / musicca / Songsterr), com nut/badge de casa, marcadores ×/○,
  círculos preenchidos nas casas pressionadas e pílula horizontal para
  pestana. Renderizado por `drawChordCard.js` em SVG via d3. Distinto do
  braço horizontal completo (`drawGuitar.js`).
```

- [ ] **Step 4: Commit**

```bash
git add docs/adr/0010-estrutura-variacoes-violao.md docs/domain/chords.md docs/domain/glossary.md
git commit -m "docs(variations): ADR-0010 + glossary + chords.md for guitar variations"
```

---

## Task 2: API do domínio + shim de leitura

**Files:**

- Modify: `src/domain/voicings/index.js`

**Objetivo:** aceitar 3 formatos (legado achatado, legado aninhado, novo objeto) e expor `getChordVariations` + `getVariationRegionLabelKey`. Os 12 arquivos `<Root>.js` continuam no formato antigo até Task 3.

- [ ] **Step 1: Reescrever `src/domain/voicings/index.js`**

Substituir o conteúdo inteiro por:

```js
import CDefault from "./C.js";
const C = CDefault;
import DDefault from "./D.js";
const D = DDefault;
import EDefault from "./E.js";
const E = EDefault;
import FDefault from "./F.js";
const F = FDefault;
import FSharpDefault from "./FSharp.js";
const FSharp = FSharpDefault;
import GDefault from "./G.js";
const G = GDefault;
import GSharpDefault from "./GSharp.js";
const GSharp = GSharpDefault;
import ADefault from "./A.js";
const A = ADefault;
import ASharpDefault from "./ASharp.js";
const ASharp = ASharpDefault;
import BDefault from "./B.js";
const B = BDefault;
import CSharpDefault from "./CSharp.js";
const CSharp = CSharpDefault;
import DSharpDefault from "./DSharp.js";
const DSharp = DSharpDefault;
import { resolveVoicingQuality } from "../voicingQualityAlias.js";

const VOICINGS_BY_ROOT = {
  C,
  "C#": CSharp,
  D,
  "D#": DSharp,
  E,
  F,
  "F#": FSharp,
  Gb: FSharp,
  G,
  "G#": GSharp,
  Ab: GSharp,
  A,
  "A#": ASharp,
  Bb: ASharp,
  B,
};

// ─── Shim de leitura ──────────────────────────────────────────────────
// Aceita 3 formatos para cada `voicings[quality]`:
//   1. Legado achatado:    [[s,f], ..., {barre, strings}?]
//   2. Legado aninhado:    [[[s,f],...], [[s,f],...]]
//   3. Novo (objetos):     [{region, positions, barre}, ...]
// Retorna sempre o formato normalizado: [{region, positions, barre}].
function normalizeVoicing(raw) {
  if (!raw) return [];

  // Formato 3 (novo): array de objetos com `positions`
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

  // Formato 2 (legado aninhado): array de arrays de pares
  if (Array.isArray(raw) && Array.isArray(raw[0]) && Array.isArray(raw[0][0])) {
    return raw.map((inner) => splitPositionsAndBarre(inner));
  }

  // Formato 1 (legado achatado): array misto de pares + objeto barre
  if (Array.isArray(raw)) {
    return [splitPositionsAndBarre(raw)];
  }

  return [];
}

function splitPositionsAndBarre(items) {
  const positions = [];
  let barre = null;
  for (const item of items) {
    if (Array.isArray(item)) {
      positions.push(item);
    } else if (item && typeof item === "object" && item.barre != null) {
      barre = { fret: item.barre, strings: item.strings ?? [] };
    }
  }
  return {
    region: computeRegion(positions, barre),
    positions,
    barre,
  };
}

function computeRegion(positions, barre) {
  const frettedFrets = positions.map(([, f]) => f).filter((f) => f > 0);
  const hasOpenString = positions.some(([, f]) => f === 0);
  const minFretted = frettedFrets.length ? Math.min(...frettedFrets) : Infinity;
  const minBarre = barre?.fret ?? Infinity;
  const minOverall = Math.min(minFretted, minBarre);
  if (hasOpenString || minOverall <= 1) return "open";
  return `fret-${minOverall}`;
}

// ─── API pública ──────────────────────────────────────────────────────

export function getChordVariations(root, quality) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return [];
  const raw = rootVoicings[resolveVoicingQuality(quality)];
  return normalizeVoicing(raw);
}

export function getChordVoicing(root, quality, variationIndex = 0) {
  const variations = getChordVariations(root, quality);
  if (!variations.length) return null;
  const idx =
    variationIndex >= 0 && variationIndex < variations.length
      ? variationIndex
      : 0;
  return variations[idx].positions.map(([stringIndex, fret]) => ({
    stringIndex,
    fret,
  }));
}

export function getBarreFromVoicing(root, quality, variationIndex = 0) {
  const variations = getChordVariations(root, quality);
  if (!variations.length) return null;
  const idx =
    variationIndex >= 0 && variationIndex < variations.length
      ? variationIndex
      : 0;
  return variations[idx].barre ?? null;
}

export function getChordVoicingCount(root, quality) {
  return getChordVariations(root, quality).length;
}

export function getVariationRegionLabelKey(region) {
  if (region === "open") return { key: "voicings.region.open", params: {} };
  const m = /^fret-(\d+)$/.exec(region ?? "");
  if (m)
    return { key: "voicings.region.fret", params: { n: parseInt(m[1], 10) } };
  return { key: "voicings.region.open", params: {} };
}
```

- [ ] **Step 2: Rodar audits para garantir que nada quebrou**

```bash
cd /home/jonatas/projects/github/nagham
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs
```

Expected: `audit-spelling` 0 mismatches, `render-notes --summary` 100 %, `check-playability` Unplayable: 0. (Os 3 mantêm o mesmo resultado de antes — o shim normaliza o formato antigo de forma transparente.)

- [ ] **Step 3: Rodar lint + build**

```bash
npm run lint
npm run build
```

Expected: ambos sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/domain/voicings/index.js
git commit -m "feat(voicings): add variations API + multi-format read shim"
```

---

## Task 3: Script de migração + executar nos 12 arquivos `<Root>.js`

**Files:**

- Create: `scripts/migrate-voicings.mjs`
- Modify: `src/domain/voicings/{A,ASharp,B,C,CSharp,D,DSharp,E,F,FSharp,G,GSharp}.js`

- [ ] **Step 1: Criar `scripts/migrate-voicings.mjs`**

```js
#!/usr/bin/env node
// One-shot: converte src/domain/voicings/<Root>.js do formato achatado
// `[[s,f], ..., {barre, strings}?]` para `[{region, positions, barre}]`.
// Roda uma vez. Audits devem continuar 100 % depois.
import { writeFileSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getChordVariations } from "../src/domain/voicings/index.js";
import { QUALITY_KEYS } from "../src/domain/chordQualities.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

function formatPositions(positions) {
  return positions.map(([s, f]) => `    [${s}, ${f}],`).join("\n");
}

function formatBarre(barre) {
  if (!barre) return "    barre: null,";
  const strings = barre.strings.join(", ");
  return `    barre: { fret: ${barre.fret}, strings: [${strings}] },`;
}

function formatVariation(v) {
  return [
    "  {",
    `    region: ${JSON.stringify(v.region)},`,
    "    positions: [",
    formatPositions(v.positions),
    "    ],",
    formatBarre(v.barre),
    "  },",
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
```

- [ ] **Step 2: Rodar o script de migração**

```bash
cd /home/jonatas/projects/github/nagham
node --import ./scripts/_resolver.mjs scripts/migrate-voicings.mjs
```

Expected output: `→ wrote .../A.js` (× 12) + `Done. Migrated 12 files.`

- [ ] **Step 3: Verificar diff manualmente em um arquivo**

```bash
git diff src/domain/voicings/C.js | head -60
```

Expected: cada quality (`5`, `6`, `7`, `Maj`, `m`, `dim`, etc.) virou um array com **um** objeto `{ region, positions, barre }`. Por exemplo:

```js
Maj: [
  {
    region: "open",
    positions: [
      [4, 3],
      [3, 2],
      [2, 0],
      [1, 1],
      [0, 0],
    ],
    barre: null,
  },
],
```

- [ ] **Step 4: Rodar audits — semântica deve estar preservada**

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs
```

Expected: mesmos resultados de antes (0 mismatches, 100 %, Unplayable: 0). Se algum quebrar, o shim ou o gerador tem bug — investigar antes de commitar.

- [ ] **Step 5: Lint + build**

```bash
npm run lint
npm run build
```

Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git add scripts/migrate-voicings.mjs src/domain/voicings/
git commit -m "refactor(voicings): migrate 12 root files to {region, positions, barre} format"
```

---

## Task 4: Atualizar `render-notes.mjs` e `check-playability.mjs` para iterar variações

**Files:**

- Modify: `scripts/render-notes.mjs`
- Modify: `scripts/check-playability.mjs`

**Nota:** `audit-spelling.mjs` audita só piano e staff voicings; **não** precisa mudança nesta task.

- [ ] **Step 1: Modificar `scripts/check-playability.mjs`**

Substituir o loop principal (a partir de `for (const [rootName, voicings] of Object.entries(ROOTS))`) por:

```js
import { getChordVariations } from "../src/domain/voicings/index.js";

// ... (mantém analyze, pitchClassSet, checkPlayability inalteradas) ...

const results = [];
let total = 0,
  pass = 0,
  fail = 0;
const failList = [];

const QUALITIES_TO_CHECK = [
  "5",
  "6",
  "7",
  "9",
  "11",
  "13",
  "9+",
  "Maj",
  "m",
  "dim",
  "aug",
  "sus2",
  "sus4",
  "m7",
  "maj7",
  "m7(b5)",
  "dim7",
  "m6",
  "6/9",
  "maj9",
  "m9",
  "add9",
];

for (const rootName of Object.keys(ROOTS)) {
  for (const quality of QUALITIES_TO_CHECK) {
    const variations = getChordVariations(rootName, quality);
    for (let idx = 0; idx < variations.length; idx++) {
      total++;
      // Reconstituir o array misto antigo (positions + objeto barre) para
      // reutilizar `checkPlayability` sem refatorar:
      const v = variations[idx];
      const merged = [...v.positions];
      if (v.barre) {
        merged.push({ barre: v.barre.fret, strings: v.barre.strings });
      }
      const res = checkPlayability(merged);
      const pcs = pitchClassSet(merged);
      if (res.playable) pass++;
      else {
        fail++;
        failList.push({
          root: rootName,
          quality: `${quality}#${idx}`,
          ...res,
          pcs: [...pcs].sort((a, b) => a - b),
        });
      }
    }
  }
}
```

Manter o resto do script (impressões, `--dump-pcs`) intacto.

- [ ] **Step 2: Modificar `scripts/render-notes.mjs`**

Achar todas as chamadas `getChordVoicing(root, quality)` (sem idx) e envolvê-las num loop sobre `getChordVoicingCount`. Pattern típico:

```js
// Antes:
const voicing = getChordVoicing(root, quality);
// ... processa voicing ...

// Depois:
import { getChordVoicingCount } from "../src/domain/voicings/index.js";
const count = getChordVoicingCount(root, quality);
for (let idx = 0; idx < count; idx++) {
  const voicing = getChordVoicing(root, quality, idx);
  // ... processa voicing ...
}
```

Para o modo `--summary`, contar cada variação como uma entrada separada (cada (root, quality, idx) é um shape independente que precisa cobrir o pitch-class set esperado). Ao imprimir falhas, incluir `idx` no identificador.

- [ ] **Step 3: Rodar os 3 audits — devem manter 100 %**

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs
```

Expected: continua 100 %, mas agora `check-playability` reporta "Total voicings" igual ao número de combinações × variações (em vez de só roots × qualities).

- [ ] **Step 4: Lint + build**

```bash
npm run lint
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add scripts/render-notes.mjs scripts/check-playability.mjs
git commit -m "refactor(audits): iterate guitar variations in render-notes and check-playability"
```

---

## Task 5: Estender `generate-guitar-voicings.mjs` para N variações

**Files:**

- Modify: `scripts/generate-guitar-voicings.mjs`

**Não executar ainda** — só commitar a extensão. Geração curada vem em Task 6.

- [ ] **Step 1: Adicionar parsing do flag `--variations=N`**

No bloco `// ─── CLI ───` (linha ~232), substituir:

```js
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyRoot = args.find((a) => !a.startsWith("--"));
```

por:

```js
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const variationsArg = args.find((a) => a.startsWith("--variations="));
const TARGET_VARIATIONS = variationsArg
  ? Math.max(1, parseInt(variationsArg.split("=")[1], 10) || 1)
  : 3;
const onlyRoot = args.find((a) => !a.startsWith("--"));
```

- [ ] **Step 2: Adicionar função `findVariations` que enumera shapes em 3 regiões**

Após a função `findShape` (linha ~155), adicionar:

```js
function findVariations(rootName, quality, target) {
  const expected = expectedPcSet(rootName, quality);
  if (!expected) return [];
  const rootPc = ALL_ROOTS[rootName];

  const REGIONS = [
    { name: "open", range: [0, 4] },
    { name: "mid", range: [3, 8] },
    { name: "high", range: [7, 12] },
  ];

  const variations = [];
  const seen = new Set(); // fingerprint = sorted "s:f" of positions
  for (const region of REGIONS) {
    if (variations.length >= target) break;
    const result = searchShape(rootName, expected, rootPc, region.range);
    if (!result?.positions?.length) continue;
    const fingerprint = result.positions
      .map(([s, f]) => `${s}:${f}`)
      .sort()
      .join("|");
    if (seen.has(fingerprint)) continue;
    seen.add(fingerprint);
    variations.push(result.positions);
  }
  return variations;
}
```

- [ ] **Step 3: Substituir o bloco que escreve o arquivo para gerar o formato novo**

Substituir a função `generateFileContent` (linha ~197) por:

```js
function computeRegionForPositions(positions) {
  const fretted = positions.filter((p) => Array.isArray(p)).map(([, f]) => f);
  const hasOpen = fretted.some((f) => f === 0);
  const nonZero = fretted.filter((f) => f > 0);
  const barreItem = positions.find(
    (p) => p && typeof p === "object" && p.barre != null
  );
  const minBarre = barreItem ? barreItem.barre : Infinity;
  const minFretted = nonZero.length ? Math.min(...nonZero) : Infinity;
  const minOverall = Math.min(minFretted, minBarre);
  if (hasOpen || minOverall <= 1) return "open";
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
  const lines = ["  {"];
  lines.push(`    region: ${JSON.stringify(region)},`);
  lines.push("    positions: [");
  for (const [s, f] of positions) {
    lines.push(`      [${s}, ${f}],`);
  }
  lines.push("    ],");
  if (barre) {
    const strings = barre.strings.join(", ");
    lines.push(`    barre: { fret: ${barre.fret}, strings: [${strings}] },`);
  } else {
    lines.push("    barre: null,");
  }
  lines.push("  },");
  return lines.join("\n");
}

function generateFileContent(rootName) {
  const qualities = QUALITY_KEYS.filter((q) => q !== "m5");
  const lines = ["const voicings = {", ""];
  for (const quality of qualities) {
    const variations = [];

    // 1. Preservar primeira variação existente se válida
    if (isExistingVoicingValid(rootName, quality)) {
      const existing = getChordVoicing(rootName, quality);
      if (existing) {
        const positions = existing.map((p) => [p.stringIndex, p.fret]);
        // Pestana existente?
        const rootVoicings = RAW_VOICINGS[rootName];
        const orig = rootVoicings?.[quality];
        let origArr = null;
        if (Array.isArray(orig?.[0]?.[0])) origArr = orig[0];
        else if (Array.isArray(orig)) origArr = orig;
        else if (Array.isArray(orig?.[0]?.positions))
          origArr = [
            ...orig[0].positions,
            ...(orig[0].barre
              ? [{ barre: orig[0].barre.fret, strings: orig[0].barre.strings }]
              : []),
          ];
        if (origArr) variations.push(origArr);
        else variations.push(positions);
      }
    }

    // 2. Buscar variações adicionais em regiões distintas
    if (variations.length < TARGET_VARIATIONS) {
      const extras = findVariations(
        rootName,
        quality,
        TARGET_VARIATIONS - variations.length
      );
      for (const ex of extras) {
        const fp = ex
          .map(([s, f]) => `${s}:${f}`)
          .sort()
          .join("|");
        const dup = variations.some((v) => {
          const fv = v
            .filter((p) => Array.isArray(p))
            .map(([s, f]) => `${s}:${f}`)
            .sort()
            .join("|");
          return fv === fp;
        });
        if (!dup) variations.push(ex);
      }
    }

    if (!variations.length) {
      lines.push(`  // ${quality}: unable to generate a valid shape`);
      continue;
    }

    const key = /^[a-zA-Z_$][\w$]*$/.test(quality)
      ? quality
      : JSON.stringify(quality);
    const body = variations.map(formatVariation).join("\n");
    lines.push(`  ${key}: [\n${body}\n  ],`);
    lines.push("");
  }
  lines.push("};\n");
  lines.push("export default voicings;");
  return lines.join("\n");
}
```

- [ ] **Step 4: Atualizar `isExistingVoicingValid` para o formato novo**

A função em `generate-guitar-voicings.mjs` continua funcionando porque chama `getChordVoicing(rootName, quality)` que vem do shim — nenhuma mudança necessária.

- [ ] **Step 5: Rodar dry-run para uma root (não persistir)**

```bash
node --import ./scripts/_resolver.mjs scripts/generate-guitar-voicings.mjs --dry-run --variations=3 C 2>&1 | head -60
```

Expected: output preview mostra `Maj: [ { region: "open", ... }, { region: "fret-3", ... }, ... ]`.

- [ ] **Step 6: Lint**

```bash
npm run lint
```

- [ ] **Step 7: Commit**

```bash
git add scripts/generate-guitar-voicings.mjs
git commit -m "feat(generator): support --variations=N for guitar voicings"
```

---

## Task 6: Gerar variações curadas para 25 combinações pedagógicas

**Files:**

- Modify: `src/domain/voicings/{C,D,E,G,A}.js` (variações para Maj, m, 7, m7, maj7)

**Por que limitar:** PR enxuto e revisável; expansão pra outras qualidades vira PRs incrementais.

- [ ] **Step 1: Rodar gerador para cada um dos 5 roots**

```bash
cd /home/jonatas/projects/github/nagham
for root in C D E G A; do
  node --import ./scripts/_resolver.mjs scripts/generate-guitar-voicings.mjs --variations=3 "$root"
done
```

Expected: 5 arquivos reescritos com variações adicionais nas qualidades onde o gerador encontrou shapes em regiões distintas.

- [ ] **Step 2: Inspecionar diff de cada arquivo manualmente**

```bash
git diff src/domain/voicings/C.js
```

Para cada quality em `Maj, m, 7, m7, maj7`: confirmar que existem 2-3 variações com `region` diferente (ex: `"open"`, `"fret-3"`, `"fret-8"`). Variações com `region` duplicada ou que parecem "feias" (digitação esquisita, span > 4) podem ser **removidas manualmente** — o gerador é heurístico, não infalível.

- [ ] **Step 3: Rodar os 3 audits**

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs
```

Expected: todos 100 %. Se algum quebrar, identificar a variação ofensora e remover manualmente do arquivo.

- [ ] **Step 4: Lint + build**

```bash
npm run lint
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/domain/voicings/C.js src/domain/voicings/D.js src/domain/voicings/E.js src/domain/voicings/G.js src/domain/voicings/A.js
git commit -m "feat(voicings): curated variations for C/D/E/G/A × Maj/m/7/m7/maj7"
```

---

## Task 7: `drawChordCard.js` — função d3 pura

**Files:**

- Modify: `src/views/Guitar/constants.js`
- Create: `src/views/Guitar/drawChordCard.js`

- [ ] **Step 1: Adicionar dimensões em `src/views/Guitar/constants.js`**

Ler `src/views/Guitar/constants.js`. Adicionar ao final do arquivo (antes da última linha):

```js
export const CHORD_CARD_WIDTH = 92;
export const CHORD_CARD_HEIGHT = 110;
export const CHORD_CARD_VISIBLE_FRETS = 4;
export const CHORD_CARD_MARGIN = { top: 16, right: 8, bottom: 10, left: 12 };
```

- [ ] **Step 2: Criar `src/views/Guitar/drawChordCard.js`**

```js
import * as d3 from "d3";
import {
  CHORD_CARD_WIDTH,
  CHORD_CARD_HEIGHT,
  CHORD_CARD_VISIBLE_FRETS,
  CHORD_CARD_MARGIN,
  TRIAD_FILL,
} from "./constants.js";

// stringIndex 0 = high E (right side of card)
// stringIndex 5 = low E  (left side of card)
const STRING_COUNT = 6;

function buildLayout(variation) {
  const { positions, barre } = variation;
  const allFrets = positions
    .map(([, f]) => f)
    .filter((f) => f > 0)
    .concat(barre ? [barre.fret] : []);
  const minPlayed = allFrets.length ? Math.min(...allFrets) : 1;
  const maxPlayed = allFrets.length ? Math.max(...allFrets) : 1;

  const region = (() => {
    const hasOpen = positions.some(([, f]) => f === 0);
    if (hasOpen || minPlayed <= 1) return "open";
    return `fret-${minPlayed}`;
  })();

  const startFret = region === "open" ? 1 : minPlayed;
  const visible = CHORD_CARD_VISIBLE_FRETS;
  const endFret = Math.max(startFret + visible - 1, maxPlayed);

  return {
    region,
    startFret,
    endFret,
    span: endFret - startFret + 1,
  };
}

function stringX(stringIndex, gridWidth, marginLeft) {
  const col = STRING_COUNT - 1 - stringIndex; // low E on left
  const step = gridWidth / (STRING_COUNT - 1);
  return marginLeft + col * step;
}

function fretY(fretNumber, layout, gridTop, gridHeight) {
  // fretNumber=1 -> just below nut (or top of card if not open)
  const row = fretNumber - layout.startFret + 1;
  const step = gridHeight / layout.span;
  return gridTop + (row - 0.5) * step;
}

function fretLineY(fretIndex, gridTop, gridHeight, span) {
  const step = gridHeight / span;
  return gridTop + fretIndex * step;
}

export function drawChordCard(el, { variation, isSelected }, options = {}) {
  const width = options.width ?? CHORD_CARD_WIDTH;
  const height = options.height ?? CHORD_CARD_HEIGHT;
  const M = CHORD_CARD_MARGIN;

  d3.select(el).selectAll("svg").remove();
  if (!variation) return;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("aria-hidden", "true");

  if (isSelected) {
    svg
      .append("rect")
      .attr("x", 0.5)
      .attr("y", 0.5)
      .attr("width", width - 1)
      .attr("height", height - 1)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "none")
      .attr("stroke", TRIAD_FILL)
      .attr("stroke-width", 2);
  }

  const layout = buildLayout(variation);
  const gridLeft = M.left;
  const gridRight = width - M.right;
  const gridTop = M.top;
  const gridBottom = height - M.bottom;
  const gridWidth = gridRight - gridLeft;
  const gridHeight = gridBottom - gridTop;

  // x/o markers above strings
  const markerY = M.top - 6;
  for (let s = 0; s < STRING_COUNT; s++) {
    const played = variation.positions.some(([ps]) => ps === s);
    const onBarre = variation.barre?.strings?.includes(s);
    const fret = variation.positions
      .filter(([ps]) => ps === s)
      .map(([, f]) => f)[0];
    const x = stringX(s, gridWidth, gridLeft);
    if (!played && !onBarre) {
      svg
        .append("text")
        .attr("x", x)
        .attr("y", markerY)
        .attr("text-anchor", "middle")
        .attr("font-size", 9)
        .attr("fill", "#888")
        .text("×");
    } else if (fret === 0) {
      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", markerY - 2)
        .attr("r", 3.5)
        .attr("fill", "none")
        .attr("stroke", "#888")
        .attr("stroke-width", 1);
    }
  }

  // Strings (vertical)
  for (let s = 0; s < STRING_COUNT; s++) {
    const x = stringX(s, gridWidth, gridLeft);
    svg
      .append("line")
      .attr("x1", x)
      .attr("y1", gridTop)
      .attr("x2", x)
      .attr("y2", gridBottom)
      .attr("stroke", "#666")
      .attr("stroke-width", 1);
  }

  // Frets (horizontal)
  for (let i = 0; i <= layout.span; i++) {
    const y = fretLineY(i, gridTop, gridHeight, layout.span);
    const isNutLine = i === 0 && layout.region === "open";
    svg
      .append("line")
      .attr("x1", gridLeft)
      .attr("y1", y)
      .attr("x2", gridRight)
      .attr("y2", y)
      .attr("stroke", isNutLine ? "#ccc" : "#555")
      .attr("stroke-width", isNutLine ? 3 : 1);
  }

  // Badge da casa (quando region !== "open")
  if (layout.region !== "open") {
    svg
      .append("text")
      .attr("x", gridLeft - 4)
      .attr("y", fretLineY(0.5, gridTop, gridHeight, layout.span) + 4)
      .attr("text-anchor", "end")
      .attr("font-size", 9)
      .attr("fill", "#aaa")
      .text(String(layout.startFret));
  }

  // Pestana
  if (variation.barre) {
    const strings = variation.barre.strings;
    if (strings.length >= 1) {
      const xs = strings.map((s) => stringX(s, gridWidth, gridLeft));
      const xMin = Math.min(...xs);
      const xMax = Math.max(...xs);
      const y = fretY(variation.barre.fret, layout, gridTop, gridHeight);
      const r = 5;
      svg
        .append("rect")
        .attr("x", xMin - r)
        .attr("y", y - r)
        .attr("width", xMax - xMin + 2 * r)
        .attr("height", 2 * r)
        .attr("rx", r)
        .attr("ry", r)
        .attr("fill", TRIAD_FILL);
    }
  }

  // Casas pressionadas (círculos cheios)
  for (const [s, f] of variation.positions) {
    if (f === 0) continue;
    const x = stringX(s, gridWidth, gridLeft);
    const y = fretY(f, layout, gridTop, gridHeight);
    svg
      .append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 5)
      .attr("fill", TRIAD_FILL);
  }
}
```

- [ ] **Step 3: Lint + build**

```bash
npm run lint
npm run build
```

Expected: sem erros. `drawChordCard` ainda não está sendo importado por ninguém, mas o bundle deve aceitar.

- [ ] **Step 4: Commit**

```bash
git add src/views/Guitar/drawChordCard.js src/views/Guitar/constants.js
git commit -m "feat(guitar): d3 drawChordCard for compact vertical chord diagrams"
```

---

## Task 8: `ChordCard.jsx` — React wrapper

**Files:**

- Create: `src/views/Guitar/ChordCard.jsx`

- [ ] **Step 1: Criar `src/views/Guitar/ChordCard.jsx`**

```jsx
import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { drawChordCard } from "./drawChordCard";
import { CHORD_CARD_WIDTH, CHORD_CARD_HEIGHT } from "./constants.js";

export function ChordCard({
  variation,
  isSelected,
  onClick,
  ariaLabel,
  label,
  width = CHORD_CARD_WIDTH,
  height = CHORD_CARD_HEIGHT,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    drawChordCard(svgRef.current, { variation, isSelected }, { width, height });
  }, [variation, isSelected, width, height]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      className={cn(
        "flex shrink-0 flex-col items-center rounded-md p-1.5",
        "touch-action-manipulation cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
        isSelected ? "bg-amber-500/5" : "hover:bg-zinc-700/30"
      )}
      style={{ touchAction: "manipulation" }}
    >
      <div ref={svgRef} aria-hidden="true" />
      <div
        className={cn(
          "mt-1 text-[10px] leading-tight",
          isSelected ? "text-amber-400" : "text-zinc-400"
        )}
      >
        {label}
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Lint + build**

```bash
npm run lint
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/views/Guitar/ChordCard.jsx
git commit -m "feat(guitar): ChordCard React wrapper for chord diagrams"
```

---

## Task 9: `ChordVariationStrip.jsx`

**Files:**

- Create: `src/views/Guitar/ChordVariationStrip.jsx`

- [ ] **Step 1: Criar `src/views/Guitar/ChordVariationStrip.jsx`**

```jsx
import { useTranslation } from "react-i18next";
import { ChordCard } from "./ChordCard.jsx";
import { getVariationRegionLabelKey } from "../../domain/voicings";

function regionLabel(region, t) {
  const { key, params } = getVariationRegionLabelKey(region);
  return t(key, params);
}

export function ChordVariationStrip({ variations, selectedIndex, onSelect }) {
  const { t } = useTranslation();
  if (!variations || variations.length < 2) return null;

  return (
    <div className="space-y-2 select-none">
      <div className="text-xs font-medium text-zinc-400">
        {t("voicings.variations_strip_title")}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
        {variations.map((v, idx) => {
          const label = regionLabel(v.region, t);
          const ariaLabel =
            t("voicings.variation_label", {
              n: idx + 1,
              total: variations.length,
            }) +
            " — " +
            label;
          return (
            <ChordCard
              key={idx}
              variation={v}
              isSelected={idx === selectedIndex}
              onClick={() => onSelect(idx)}
              label={label}
              ariaLabel={ariaLabel}
            />
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint + build**

```bash
npm run lint
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/views/Guitar/ChordVariationStrip.jsx
git commit -m "feat(guitar): ChordVariationStrip horizontal scroller"
```

---

## Task 10: i18n — adicionar strings nos 3 locales

**Files:**

- Modify: `src/i18n/locales/pt-BR.json`
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/es.json`

- [ ] **Step 1: pt-BR.json**

Adicionar ao objeto raiz (ou no nível apropriado se houver agrupamento existente):

```json
"voicings": {
  "region": {
    "open": "Aberto",
    "fret": "{{n}}ª casa"
  },
  "variation_label": "Variação {{n}} de {{total}}",
  "variations_strip_title": "Variações",
  "no_variations": "Apenas uma forma conhecida"
}
```

- [ ] **Step 2: en.json**

```json
"voicings": {
  "region": {
    "open": "Open",
    "fret": "Fret {{n}}"
  },
  "variation_label": "Variation {{n}} of {{total}}",
  "variations_strip_title": "Variations",
  "no_variations": "Only one shape known"
}
```

- [ ] **Step 3: es.json**

```json
"voicings": {
  "region": {
    "open": "Abierto",
    "fret": "Traste {{n}}"
  },
  "variation_label": "Variación {{n}} de {{total}}",
  "variations_strip_title": "Variaciones",
  "no_variations": "Sólo una forma conocida"
}
```

- [ ] **Step 4: Validar JSON**

```bash
node -e "['pt-BR','en','es'].forEach(l => JSON.parse(require('fs').readFileSync('src/i18n/locales/'+l+'.json','utf8')))"
```

Expected: sem erro.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/pt-BR.json src/i18n/locales/en.json src/i18n/locales/es.json
git commit -m "i18n: add voicings.region/variation_label keys"
```

---

## Task 11: `GuitarView.jsx` aceita `variationIndex`

**Files:**

- Modify: `src/views/Guitar/GuitarView.jsx`

- [ ] **Step 1: Adicionar prop `variationIndex` (default 0)**

Ler `src/views/Guitar/GuitarView.jsx`. Localizar a desestruturação de props (linha ~35) e adicionar `variationIndex = 0`.

Localizar `computeCenterFret` (linha 10-33): trocar `getChordVoicing(root, quality)` por `getChordVoicing(root, quality, variationIndex)` e `getBarreFromVoicing(root, quality)` por `getBarreFromVoicing(root, quality, variationIndex)`. Aceitar `variationIndex` como parâmetro adicional da função.

Localizar a chamada `drawGuitar` (linha ~56): garantir que o `chordNotes` / `root` / `quality` recebem o voicing correto via shim — como o `drawGuitar` chama internamente os helpers ou recebe os dados via prop, verificar fluxo. Se `drawGuitar` aceita `root`/`quality` direto, passar também `variationIndex` no objeto:

```js
drawGuitar(
  el,
  {
    selectedNote,
    chordNotes,
    root,
    quality,
    variationIndex,
    customPositions,
    customBarre,
  }
  // ...
);
```

E em `drawGuitar.js` (não vai mudar aqui — Task separada se necessário), passar `variationIndex` para `getChordVoicing` se ele já chama.

**Se `drawGuitar.js` chamar `getChordVoicing(root, quality)` internamente,** ela precisa aceitar `variationIndex`. Inspecionar primeiro:

```bash
grep -n "getChordVoicing\|getBarreFromVoicing" src/views/Guitar/drawGuitar.js src/views/Guitar/drawDots.js src/views/Guitar/drawBarre.js
```

Atualizar cada chamada para receber `variationIndex` via parâmetro options/data.

Adicionar `variationIndex` ao `useEffect` deps array.

- [ ] **Step 2: Lint + build**

```bash
npm run lint
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/views/Guitar/GuitarView.jsx src/views/Guitar/drawGuitar.js src/views/Guitar/drawDots.js src/views/Guitar/drawBarre.js
git commit -m "feat(guitar): GuitarView accepts variationIndex prop"
```

(Ajuste a lista de arquivos no `git add` para o que efetivamente foi modificado.)

---

## Task 12: Integração na Home

**Files:**

- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Atualizar `initialChordState` e `chordReducer`**

Em `src/pages/Home.jsx`, linha ~24-64. Substituir:

```js
const initialChordState = {
  root: "C",
  triad: "Maj",
  extension: null,
  bass: null,
  useFlats: false,
};
```

por:

```js
const initialChordState = {
  root: "C",
  triad: "Maj",
  extension: null,
  bass: null,
  useFlats: false,
  variationIndex: 0,
};
```

Adicionar ao `chordReducer`:

- Em `SET_ROOT`: `return { ...state, root: action.payload, variationIndex: 0 };`
- Em `SET_TRIAD` (no return final): adicionar `variationIndex: 0,` ao objeto retornado.
- Em `SET_EXTENSION`: nos dois branches (ext null e ext setado), adicionar `variationIndex: 0,`.
- Adicionar `case "SET_VARIATION_INDEX": return { ...state, variationIndex: action.payload };`

- [ ] **Step 2: Importar `ChordVariationStrip` e `getChordVariations`**

No topo do arquivo, adicionar:

```js
import { ChordVariationStrip } from "../views/Guitar/ChordVariationStrip.jsx";
import { getChordVariations } from "../domain/voicings";
```

(Verifique se `getChordVoicing` já está importado de `../domain/voicings` para juntar.)

- [ ] **Step 3: Computar `variations` com `useMemo` e desestruturar `variationIndex`**

Após `const { root, triad, extension, bass, useFlats } = chordState;` (linha ~75), trocar para:

```js
const { root, triad, extension, bass, useFlats, variationIndex } = chordState;
```

Após `chordNotes` `useMemo` (linha ~94-97), adicionar:

```js
const variations = useMemo(
  () => getChordVariations(root, quality),
  [root, quality]
);
```

- [ ] **Step 4: Atualizar `guitarDebug`**

Em `useDebugView` do `guitarDebug` (linha ~125-134), adicionar `variations`, `variationIndex`:

```js
const guitarDebug = useDebugView({
  title: t("debug.title.guitar"),
  data: {
    root,
    quality,
    chordNotes,
    variationIndex,
    variations,
    guitarVoicing: getChordVoicing(root, quality, variationIndex),
    barre: getBarreFromVoicing(root, quality, variationIndex),
  },
});
```

- [ ] **Step 5: Passar `variationIndex` para `GuitarView` e renderizar `ChordVariationStrip`**

Trocar o bloco do violão (linha ~204-219) por:

```jsx
<div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
  <div className="mb-3 flex items-center justify-between">
    <h3 className="text-sm font-medium text-zinc-400">
      {t("app.sections.guitar")}
    </h3>
    {guitarDebug.trigger}
  </div>
  <div className="space-y-6">
    <GuitarView
      selectedNote={selectedNote}
      onSelectNote={handleSelectNote}
      syncGlobalSelection={false}
      chordNotes={chordNotes}
      root={root}
      quality={quality}
      variationIndex={variationIndex}
    />
    <ChordVariationStrip
      variations={variations}
      selectedIndex={variationIndex}
      onSelect={(idx) =>
        dispatchChord({ type: "SET_VARIATION_INDEX", payload: idx })
      }
    />
  </div>
</div>
```

- [ ] **Step 6: Lint + build**

```bash
npm run lint
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat(home): integrate ChordVariationStrip and variationIndex state"
```

---

## Task 13: Validação manual de UI + marcar feature como shipped

**Files:**

- Modify: `docs/features/chord-variations-guitar/spec.md`

- [ ] **Step 1: Subir dev server**

```bash
cd /home/jonatas/projects/github/nagham
npm run dev
```

Abrir `http://localhost:5173` no navegador.

- [ ] **Step 2: Checklist de UI**

Marcar cada item conforme verificar:

- [ ] Home carrega; troca de acorde via sidebar funciona.
- [ ] Acorde **C maior**: tira de miniaturas aparece com ≥ 2 cards. A primeira está selecionada (border amber). Braço grande mostra a forma aberta.
- [ ] Clicar na 2ª miniatura: muda o braço grande pra essa variação; border amber move pra ela.
- [ ] Acorde **C m9** (ou outra qualidade com 1 só voicing): tira **não** aparece; layout fica igual ao antigo.
- [ ] Trocar root C → G: `variationIndex` reseta pra 0; tira reflete G (se G tiver variações curadas).
- [ ] Trocar quality Maj → m7: `variationIndex` reseta pra 0.
- [ ] Refresh do navegador: `variationIndex` mantém o valor (persistido).
- [ ] DevTools, mobile 375 px: tira rola horizontalmente; tap em miniatura funciona.
- [ ] Tab/Shift+Tab navega entre miniaturas; Enter/Space seleciona; ring de foco visível.
- [ ] Tela debug do violão: `variations`, `variationIndex`, `guitarVoicing`, `barre` aparecem coerentes.
- [ ] i18n: trocar para EN → rótulos "Open", "Fret 3", "Variations"; para ES → "Abierto", "Traste 3", "Variaciones".

- [ ] **Step 3: Audits + lint + build finais**

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs
npm run lint
npm run build
```

Expected: todos passam.

- [ ] **Step 4: Atualizar status do spec**

Editar `docs/features/chord-variations-guitar/spec.md`. Trocar:

```
- **Status:** draft
- **Atualizado:** 2026-05-12
- **ADRs previstos:** ADR-0010 (estrutura de variações de violão)
```

por:

```
- **Status:** shipped
- **Atualizado:** YYYY-MM-DD   <!-- data do shipping -->
- **Shipped:** YYYY-MM-DD
- **ADRs gerados:** [ADR-0010](../../adr/0010-estrutura-variacoes-violao.md)
```

- [ ] **Step 5: Commit final**

```bash
git add docs/features/chord-variations-guitar/spec.md
git commit -m "docs(variations): mark feature shipped"
```

---

## Riscos

| Risco                                                                  | Mitigação                                                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Shim falha em algum formato edge case                                  | Task 2 inclui audits após mudança; se quebrar, o shim pode ser ajustado antes do commit.    |
| Migração perde semântica                                               | Task 3 step 4 roda os 3 audits depois da migração.                                          |
| Gerador produz shape inválido                                          | `check-playability` bloqueia commit; Task 6 step 2 inspeciona diff manualmente.             |
| Estado persistido velho (`variationIndex` >= novo `variations.length`) | `getChordVoicing` cai pra `idx=0` automaticamente (já tratado na API).                      |
| `drawGuitar` interno usa `getChordVoicing` sem `variationIndex`        | Task 11 step 1 inspeciona e atualiza chamadas internas.                                     |
| Tap target em mobile com 92×110 ainda funciona?                        | Excede 44×44 obrigatório (constituição §4); confirmado em Task 13 step 2.                   |
| `variations` array vazio causa null no GuitarView                      | `getChordVoicing` retorna `null`; `GuitarView` cai no fallback `chordNotes` (já existente). |

## Validação (recapitulada)

Antes de fechar a feature:

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs      # 0 mismatches
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary  # 100 %
node --import ./scripts/_resolver.mjs scripts/check-playability.mjs   # Unplayable: 0
npm run lint
npm run build
```

E o checklist manual de UI em Task 13 step 2.
