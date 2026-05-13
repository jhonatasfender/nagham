# Feature: Importar voicings de violão a partir do musicca.com

- **Status:** draft
- **Owner:** jonatas
- **Atualizado:** 2026-05-13
- **ADRs previstos:** ADR-0011 (musicca.com como fonte de referência de voicings)

## Por quê

O gerador heurístico de voicings (`scripts/generate-guitar-voicings.mjs`) produz shapes válidos teoricamente (pitch classes corretas, ≤ 4 dedos), mas frequentemente faz escolhas musicalmente subótimas — ex.: prefere shapes sem pestana quando guitarristas brasileiros tipicamente usam a forma com pestana (caso real: `C Maj fret-7` virou `fret-5 barre` após correção manual).

**musicca.com** publica, para cada acorde, várias variações cuidadosamente curadas em formato de chord-card SVG. A estrutura HTML é estável (`<svg viewBox="0 0 235 271">` dentro de `ul.guitar-chord-diagrams > li > .inner-container`), com cordas em coordenadas fixas e finger-dots/barre/markers identificáveis por classe CSS.

Usar musicca como **fonte de referência** elimina a curação manual de 264 (root, quality) pares e dá ao Nagham um conjunto de voicings pedagogicamente alinhado com o material de estudo que estudantes brasileiros já usam.

## User story

> Como mantenedor do Nagham, quero rodar um script que **importa voicings de violão do musicca.com** comparando com o que já temos, **mantém as variações que coincidem**, **substitui as que diferem**, e **adiciona as que faltam**, para que `src/domain/voicings/<Root>.js` reflita uma fonte de referência reconhecida sem precisar de revisão manual por acorde.

## Decisões de design (resolvidas no brainstorm)

- **Estratégia HTTP:** Cache local em duas etapas. Primeiro download bruto pra `scripts/musicca-cache/<slug>.html` (commit-friendly, pode ser inspecionado em PR). Depois parser lê do cache. Evita hits desnecessários, dá determinismo.
- **Mapeamento de slug:** Tabela hardcoded em `scripts/musicca/slugs.js` mapeando `(root, quality)` → slug do musicca (ex.: `{root:"E#", quality:"13"} → "mi-sustenido-de-13a-dominante"`). 264 entradas, reviewable, robusto a mudanças no formato do musicca.
- **Política de merge:** Comparação shape-a-shape com nossa base existente:
  - **Preservar** variações nossas que coincidem com alguma do musicca (fingerprint match em positions + barre).
  - **Substituir** quando o musicca tem variação com região semelhante mas shape diferente.
  - **Adicionar** variações do musicca que não temos.
  - **Remover** variações nossas que não estão no musicca e não passam num teste de validade extra (audits + sanity).
- **Parsing:** `cheerio` (HTML/CSS selectors server-side) + extração via coordenadas fixas do SVG do musicca. Sem headless browser.
- **Atribuição:** ADR-0011 e comentário no header dos `<Root>.js` linkando para musicca como fonte.

## Arquitetura de scripts

Três comandos discretos para isolar etapas e permitir re-execução parcial:

### 1. `scripts/musicca/fetch.mjs` — cache de HTML

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs C Maj   # apenas um chord
```

- Lê `scripts/musicca/slugs.js`.
- Para cada `(root, quality)`, monta URL `https://www.musicca.com/pt/dicionario/acordes/<slug>`.
- Faz fetch (rate-limit: 1 req/s) e salva HTML em `scripts/musicca-cache/<slug>.html`.
- Skip se cache existe (a menos que `--force`).
- Loga falhas em `scripts/musicca-cache/_errors.log`.

### 2. `scripts/musicca/extract.mjs` — parser

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/extract.mjs
```

- Lê arquivos de cache.
- Para cada HTML, encontra `ul.guitar-chord-diagrams`. Para cada `<li>`:
  - Cada `<g class="note-hover">` com `circle.note` cheio → finger dot (mapeia cx,cy → stringIndex, fret).
  - `<circle class="note note-hover">` com `fill="transparent"` e fora do grid (cy ≈ 35) → corda solta (○).
  - `<g stroke="black"><path d="M19 6.41 ...">` → marcador `×` (corda muda).
  - `<rect fill="#72ac51">` → pestana (calcula fret a partir de y, strings a partir de x range).
  - Texto numérico isolado (fret label) à esquerda do grid → casa inicial quando não é open.
- Emite `scripts/musicca-cache/_extracted.json` com estrutura:
  ```json
  {
    "C": {
      "Maj": [
        { "region": "open", "positions": [[4,3],[3,2],...], "barre": null },
        { "region": "fret-3", "positions": [...], "barre": {"fret":3,"strings":[...]} },
        ...
      ],
      "m": [...],
      ...
    },
    "C#": { ... },
    ...
  }
  ```
- Validação interna: pitch classes esperados via `getQualityPitchClasses`; rejeita variação que não bate (provavelmente erro de parsing).

### 3. `scripts/musicca/apply.mjs` — merge com `src/domain/voicings/<Root>.js`

```bash
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs --dry-run
```

- Lê `_extracted.json` + os 12 `<Root>.js` atuais.
- Para cada `(root, quality)`:
  - **Fingerprint** de cada variação: string ordenada de `positions` sortidas + barre `(fret, sorted strings)`.
  - **Mantém** variações nossas com fingerprint == alguma do musicca.
  - **Adiciona** variações do musicca cujo fingerprint não está nas nossas.
  - **Remove** variações nossas sem fingerprint correspondente NO musicca, A MENOS QUE elas tenham o flag `manual: true` (campo opcional novo, default false).
- Reescreve `<Root>.js` no formato novo, ordenado por região (`open` → `fret-N` crescente).
- `--dry-run` imprime o diff sem escrever.

## Estrutura final do diretório

```
scripts/
├── musicca/
│   ├── slugs.js              [NOVO] tabela 264 entradas (root, quality) → slug
│   ├── fetch.mjs             [NOVO] downloader com cache
│   ├── extract.mjs           [NOVO] parser cheerio dos cache HTML
│   ├── apply.mjs             [NOVO] merge com voicings/
│   ├── parseSvgDiagram.mjs   [NOVO] função pura: SVG → {positions, barre, region}
│   └── README.md             [NOVO] instruções de uso + caveats
├── musicca-cache/            [NOVO, commitado] HTML bruto + _extracted.json + _errors.log
│   ├── do-maior.html
│   ├── mi-sustenido-de-13a-dominante.html
│   ├── ...
│   ├── _extracted.json
│   └── _errors.log
```

`scripts/musicca-cache/` **VAI pro git** — facilita diff de mudanças upstream.

## Slugs — mapeamento

Tabela em `scripts/musicca/slugs.js`. Padrões observados em musicca:

| Root | Slug fragment |
|---|---|
| C | `do` |
| C# | `do-sustenido` |
| Db | `re-bemol` |
| D | `re` |
| D# | `re-sustenido` |
| Eb | `mi-bemol` |
| E | `mi` |
| E# | `mi-sustenido` *(raro mas existe — ver `mi-sustenido-de-13a-dominante`)* |
| F | `fa` |
| F# | `fa-sustenido` |
| G | `sol` |
| G# | `sol-sustenido` |
| A | `la` |
| A# | `la-sustenido` |
| B | `si` |

Qualidades:

| Quality | Slug fragment |
|---|---|
| Maj | `maior` |
| m | `menor` |
| 7 | `de-7a-dominante` |
| maj7 | `de-7a-maior` |
| m7 | `menor-com-7a` |
| dim7 (dim) | `diminuto-com-7a` |
| m7(b5) | `meio-diminuto` |
| sus2 | `de-2a-suspensa` |
| sus4 | `de-4a-suspensa` |
| 5 | `power-chord` *(verificar)* |
| 6 | `com-6a` |
| 9 | `com-9a` |
| 11 | `com-11a` |
| 13 | `de-13a-dominante` |
| add9 | `com-9a-adicionada` *(verificar)* |
| aug | `aumentado` |

Slugs completos: `<root>-<quality>` (ex.: `do-maior`, `re-bemol-menor`, `mi-sustenido-de-13a-dominante`).

Mapeamento exato verificado uma vez via `scripts/musicca/fetch.mjs` com `--probe` (modo descoberta: testa cada slug, registra 200 vs 404).

## Estrutura `_extracted.json`

```json
{
  "<root>": {
    "<quality>": [
      {
        "region": "open" | "fret-N",
        "positions": [[stringIndex, fret], ...],
        "barre": { "fret": N, "strings": [stringIndex, ...] } | null,
        "source": "musicca",
        "sourceSlug": "do-maior",
        "sourceIndex": 0
      },
      ...
    ]
  }
}
```

Campos `source`, `sourceSlug`, `sourceIndex` ajudam debugging mas **não** são escritos em `<Root>.js` (mantém o domínio enxuto).

## Campo novo `manual` em variações

Para proteger curações manuais futuras:

```js
Maj: [
  {
    region: "fret-5",
    positions: [[0,8],[4,7],[5,8]],
    barre: { fret: 5, strings: [5,4,3,2,1,0] },
    manual: true,   // <-- protegida do scraper
  },
],
```

`apply.mjs` NUNCA remove variações com `manual: true`. Default `false` (omitido).

A correção do C Maj fret-5 barre (commit `33cd696`) ganha `manual: true` no primeiro run do apply pra preservar a decisão.

## Critérios de aceite

### Scripts e pipeline

- [ ] `scripts/musicca/fetch.mjs` baixa HTML pra todos os 264 slugs com rate-limit ≥ 1s entre requests; salva em `scripts/musicca-cache/<slug>.html`.
- [ ] Rodando `fetch.mjs` 2 vezes seguidas, a segunda não faz requests (cache hit).
- [ ] `fetch.mjs --force` força redownload.
- [ ] `scripts/musicca/extract.mjs` lê todo cache e emite `_extracted.json` com 264 (root, quality) preenchidos.
- [ ] Parsing valida pitch classes — variações com PC set errado vão pra `_errors.log` e NÃO entram no JSON.
- [ ] `scripts/musicca/apply.mjs` reescreve os 12 `<Root>.js` com a política de merge documentada.
- [ ] `--dry-run` imprime diff sem escrever.
- [ ] Variações com `manual: true` são preservadas.

### Documento e atribuição

- [ ] `scripts/musicca/README.md` explica fluxo (fetch → extract → apply), rate limit, atribuição.
- [ ] `<Root>.js` ganha header comment linkando musicca + ADR-0011.
- [ ] ADR-0011 documenta a decisão e termos de uso musicca.

### Auditorias e validação

- [ ] Após `apply.mjs`, audits passam:
  - `audit-spelling.mjs`: inalterado (audit não toca em violão).
  - `check-playability.mjs`: 0 unplayable.
  - `render-notes.mjs --summary`: GUITAR failures não regridem (devem cair, idealmente).
- [ ] `npm run lint` clean.
- [ ] `npm run build` clean.

### Dependências

- [ ] `cheerio` adicionado em `package.json` `devDependencies`.
- [ ] ADR-0011 justifica a nova dependência (constituição §5).

## Fora do escopo

- **Atualização incremental online** — não há watcher que sincronize com mudanças do musicca em tempo real. Re-rodar `fetch` é manual.
- **Outros instrumentos do musicca** — só violão. Piano voicings continuam com nossa fonte; ukulele não suportado.
- **Acordes "raros"** (`E#`, `B#`, `Cb`, etc.) — incluídos no slugs.js mas só processados se musicca tiver páginas pra eles. Se não, marcamos no `_errors.log` e seguem com nossa geração heurística.
- **UI de revisão pré-apply** — `--dry-run` é só texto; sem UI gráfica.
- **Substituição de qualquer voicing manual** — `manual: true` é gate inviolável.

## Decisões pendentes

- [ ] **Versão de musicca a referenciar** — capturar `_cached-at` timestamp + URL hash em cada HTML cache pra rastreamento.
- [ ] **Limite de variações por (root, quality)** — musicca tem até 8-10 em alguns acordes; cap em N para não inflar `<Root>.js`. Sugestão: cap em 5 e ranquear por simplicidade (menor fret span primeiro).

## Termos novos a adicionar ao glossário

- **Fingerprint (de variação)** — hash determinístico do conteúdo de uma variação (`positions` ordenadas + barre normalizado). Usado pra detectar variações equivalentes entre fontes.
- **Variação manual** — variação em `<Root>.js` com flag `manual: true`, protegida de sobrescrita por importadores automáticos.

## Referências

- [musicca.com/pt/dicionario/acordes/](https://www.musicca.com/pt/dicionario/acordes/)
- [Cifra Club](https://www.cifraclub.com.br/) — convenção pt-BR de cifra, base do ADR-0003.
- [`docs/features/chord-variations-guitar/spec.md`](../chord-variations-guitar/spec.md) — feature anterior que introduziu o formato `{region, positions, barre}`.
