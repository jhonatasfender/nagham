# Feature: Variações de acordes no violão

- **Status:** shipped
- **Owner:** jonatas
- **Atualizado:** 2026-05-12
- **Shipped:** 2026-05-12
- **ADRs gerados:** [ADR-0010](../../adr/0010-estrutura-variacoes-violao.md)

## Por quê

Hoje a Home (`/`) exibe **uma única forma** para cada acorde no violão. Na
prática, todo estudante de violão precisa conhecer várias formas do mesmo
acorde — abertas, com pestana na 3ª, na 5ª, na 8ª — porque o contexto
musical (próximo acorde, melodia, baixo) define qual usar. Sem esse recurso
no Nagham, o estudante precisa abrir outra aba (Cifra Club, musicca,
Songsterr) e quebra o fluxo de estudo.

A engenharia do domínio **já suporta múltiplos voicings** por (root, quality)
— `getChordVoicing(root, quality, positionIndex)` e
`getChordVoicingCount(root, quality)` em `src/domain/voicings/index.js`
foram escritos com esse parâmetro desde o início. Falta:

1. Estrutura de dados que carregue **metadado por variação** (região do
   braço, pestana separada das posições).
2. UI que mostre o **acorde principal em destaque** e permita **navegar
   pelas variações** sem poluir o layout sincronizado de
   `staff + piano + violão`.
3. Gerador de variações capaz de enumerar shapes em regiões distintas do
   braço (hoje gera 1 só).

Inversões do teclado são feature **separada** (próximo ciclo), porque a
semântica e a estrutura de dados são diferentes — registrado em
[`glossary.md`](../../domain/glossary.md): variação ≠ inversão.

## User story

> Como estudante de violão estudando o acorde **C maior** no Nagham, quero
> ver **a forma principal** (aberto) imediatamente, mas também quero
> **navegar entre outras formas** (3ª casa, 5ª casa, 8ª casa) clicando em
> miniaturas embaixo do braço, para aprender as várias maneiras de tocar o
> mesmo acorde no instrumento.

## Decisões de design (resolvidas no brainstorm)

- **Página alvo:** Home (`/`). ChordBuilder (`/chord-builder`) **não muda**
  nesta entrega.
- **Sincronização:** staff e piano **não acompanham** a variação selecionada
  do violão — continuam renderizando o acorde canônico. Só o violão expõe
  variações (igual ao padrão musicca.com).
- **Origem dos dados:** geração automática + curadoria. Estender
  `scripts/generate-guitar-voicings.mjs` pra enumerar N shapes; revisar diff;
  commit.
- **Persistência do índice:** reseta para 0 quando muda `root`, `triad` ou
  `extension`. Mantém quando muda `bass` (slash) ou `useFlats` (grafia).
- **Áudio:** clique em miniatura **não** toca áudio — só destaca
  visualmente. Botão de tocar acorde continua atrelado ao braço grande.
- **Rótulos:** "Aberto" / "Nª casa" (pedagógicos, traduzíveis). Não usamos
  CAGED (`forma C`, `forma E`) — exige conhecimento prévio fora do escopo
  pedagógico atual.
- **Acordes com 1 voicing só:** tira de miniaturas é **escondida**.
- **Renderização:** miniaturas são SVG via d3 (não HTML/CSS), seguindo o
  pattern existente `*View.jsx` + `draw*.js`.

## Estrutura de dados — variações no domínio

Hoje (`src/domain/voicings/C.js`):

```js
Maj: [
  [4, 3], [3, 2], [2, 0], [1, 1], [0, 0],
],

m: [[1, 4], [2, 5], [3, 5], { barre: 3, strings: [4, 3, 2, 1, 0] }],
```

Depois (mesma chave `Maj`, agora array de objetos):

```js
Maj: [
  {
    region: "open",
    positions: [
      [4, 3], [3, 2], [2, 0], [1, 1], [0, 0],
    ],
    barre: null,
  },
  {
    region: "fret-3",
    positions: [
      [4, 3], [3, 5], [2, 5], [1, 5],
    ],
    barre: { fret: 3, strings: [4, 3, 2, 1, 0] },
  },
  {
    region: "fret-8",
    positions: [
      [5, 8], [4, 10], [3, 10], [2, 9], [1, 8],
    ],
    barre: { fret: 8, strings: [5, 4, 3, 2, 1] },
  },
],
```

**Campos:**

- `region` — chave semântica. Valores aceitos:
  - `"open"` quando existe alguma posição com `fret === 0` ou a pestana/posições
    começam no traste 1.
  - `"fret-N"` (N entre 1 e 12) caso contrário; N é o menor traste tocado
    (considerando pestana).
- `positions` — array de pares `[stringIndex, fret]`. Sem mistura com pestana.
- `barre` — `{ fret: number, strings: number[] }` ou `null`.

**Ordem do array** define a ordem de exibição. Posição 0 = "principal". Por
convenção curatorial, da casa mais baixa para a mais alta.

## API do domínio (mudanças em `src/domain/voicings/index.js`)

| Função | Antes | Depois |
| --- | --- | --- |
| `getChordVoicing(root, quality, idx=0)` | retorna `[{stringIndex, fret}]` da default | mesma assinatura; usa o `positions` da variação `idx` |
| `getBarreFromVoicing(root, quality, idx=0)` | retorna `{fret, strings}` da default; **não aceita idx** | mesma assinatura, aceita `idx` |
| `getChordVoicingCount(root, quality)` | conta voicings (já existe) | retorna `variations.length` |
| **NOVA** `getChordVariations(root, quality)` | — | retorna `[{region, positions: [{stringIndex,fret}], barre}]` (lista completa, pronta pra UI iterar) |
| **NOVA** `getVariationRegionLabelKey(region)` | — | `"open"` → `{ key: "voicings.region.open" }`; `"fret-N"` → `{ key: "voicings.region.fret", params: { n: N } }` |

Assinaturas atuais permanecem retro-compatíveis para `idx === 0`.

### Shim de leitura

`voicings/index.js` aceita 3 formatos durante a migração:

1. **Legado A (achatado):** `[[s,f], ..., {barre, strings}?]` → vira 1 variação no formato novo.
2. **Legado B (arrays aninhadas):** `[[[s,f],...], [[s,f],...]]` — já suportado parcialmente — convertido para N variações.
3. **Novo (objetos):** consumido direto.

Depois da migração descrita na seção "Migração de dados", o shim continua
existindo para robustez.

## Componentes d3 (novos em `src/views/Guitar/`)

- **`drawChordCard.js`** — função d3 pura `(el, { variation, isSelected }, options)`. Desenha um chord-card compacto vertical, 92×110 padrão, 4 trastes visíveis. Convenção universal: Mi grave à esquerda, Mi agudo à direita; pestana no topo quando `region === "open"`; badge do número da casa à esquerda quando `region === "fret-N"`. Cores reutilizadas de `constants.js`.
- **`ChordCard.jsx`** — wrapper React. `<button>` envolvendo o SVG (acessibilidade); `aria-pressed`, `aria-label` com `t("voicings.variation_label", {n, total}) + " — " + label`. Usa `useRef`/`useEffect`/`drawChordCard` igual `GuitarView.jsx`.
- **`ChordVariationStrip.jsx`** — lista horizontal scrollável. Retorna `null` quando `variations.length < 2`. Cada item é um `ChordCard`; rótulo abaixo do SVG em texto (i18n).

## Integração na Home

- `chordReducer` em `src/pages/Home.jsx` ganha campo `variationIndex` (default 0). Persiste via `usePersistedReducer` existente (`CHORD_STATE_STORAGE_KEY`).
- Ações `SET_ROOT`, `SET_TRIAD`, `SET_EXTENSION` resetam `variationIndex` para 0.
- Ação nova `SET_VARIATION_INDEX` atualiza só o índice.
- JSX do bloco de violão recebe `<ChordVariationStrip>` abaixo do `<GuitarView>` no mesmo card.
- `GuitarView` ganha prop `variationIndex`; repassa para `getChordVoicing` / `getBarreFromVoicing`.
- `guitarDebug.modal` mostra `variations`, `variationIndex`, voicing e pestana resultantes.

ChordBuilder (`/chord-builder`) e sidebar (`ChordBuilderSection`) **não mudam**.

## Migração de dados e geração

### Script novo `scripts/migrate-voicings.mjs`

Converte os 12 arquivos `<Root>.js` do formato achatado para o novo, **preservando semântica**. Cada voicing existente vira 1 variação. Roda uma vez, gera diff revisável.

### Extensão de `scripts/generate-guitar-voicings.mjs`

- Argumento novo `--variations=N` (default 3).
- Enumera shapes em 3 regiões: `[0,4]` (aberto), `[3,8]` (médio), `[7,12]` (alto).
- Rejeita duplicatas (mesmo pitch-class por corda + casa).
- Preserva variações pré-existentes que validam.
- Escreve no formato novo.

### Conteúdo inicial do PR desta feature

- Migração: 12 arquivos para formato novo (1 variação cada).
- Geração curada: **5 roots (C, D, E, G, A) × 5 qualities (Maj, m, 7, m7, maj7) = 25 combinações** recebem 2-3 variações cada.
- As 239 combinações restantes ficam com 1 variação (`ChordVariationStrip` esconde-se nelas).
- Expansão para mais qualidades vira PR separado, sem mexer em UI/domínio.

## Critérios de aceite

### Domínio e dados

- [ ] `src/domain/voicings/index.js` aceita os 3 formatos (legado A, legado B, novo).
- [ ] Função nova `getChordVariations(root, quality)` exportada e retorna `[{region, positions, barre}]`.
- [ ] Função nova `getVariationRegionLabelKey(region)` exportada.
- [ ] `getChordVoicing(root, quality, idx)` retorna o voicing da variação `idx`; cai para `idx=0` quando out-of-range.
- [ ] `getBarreFromVoicing(root, quality, idx)` aceita `idx` com mesma semântica.
- [ ] `scripts/migrate-voicings.mjs` roda; os 12 `<Root>.js` ficam no formato novo.
- [ ] `scripts/generate-guitar-voicings.mjs --variations=3` aceita o flag e produz N variações por (root, quality).
- [ ] Diff curado: 25 combinações pedagógicas (C/D/E/G/A × Maj/m/7/m7/maj7) têm ≥ 2 variações commitadas.

### Auditorias (constituição §6)

- [ ] `scripts/audit-spelling.mjs` itera **todas** as variações e termina em 0 mismatches.
- [ ] `scripts/render-notes.mjs --summary` cobre todas as variações; 100%.
- [ ] `scripts/check-playability.mjs` itera todas; nenhuma variação exige > 4 dedos.
- [ ] `npm run lint` sem erros.
- [ ] `npm run build` sem erros.

### UI

- [ ] `src/views/Guitar/drawChordCard.js` desenha o chord-card compacto em d3, 92×110 default.
- [ ] `src/views/Guitar/ChordCard.jsx` renderiza botão semântico envolvendo o SVG, com `aria-pressed`/`aria-label` corretos.
- [ ] `src/views/Guitar/ChordVariationStrip.jsx` rola horizontalmente, retorna `null` quando `< 2` variações.
- [ ] `GuitarView` aceita prop `variationIndex` e reflete a variação selecionada no braço grande.
- [ ] Em C maior na Home: a tira aparece com ≥ 2 miniaturas; clique troca o braço.
- [ ] Em C `m9` (1 voicing): tira **não** aparece.
- [ ] Troca de root/quality reseta `variationIndex` para 0.
- [ ] `variationIndex` persiste em `localStorage` (via `usePersistedReducer`).
- [ ] Em mobile (375 px): tira rola horizontalmente; tap em miniatura funciona; tap target ≥ 44 px.
- [ ] Teclado: Tab/Shift+Tab entre miniaturas; Enter/Space seleciona; foco visível com ring amber.
- [ ] Tema escuro: cores das miniaturas batem com o braço grande (`constants.js` compartilhado).

### i18n (constituição §1)

- [ ] `voicings.region.open`, `voicings.region.fret` (`{{n}}`), `voicings.variation_label` (`{{n}}`, `{{total}}`), `voicings.variations_strip_title`, `voicings.no_variations` existem nos 3 locales (`pt-BR.json`, `en.json`, `es.json`).

### Documentação (constituição §7)

- [ ] `docs/domain/chords.md` descreve o formato novo (`region`, `positions`, `barre`).
- [ ] `docs/domain/glossary.md` adiciona termo **"variação (de acorde no violão)"** distinguindo de **"inversão"**.
- [ ] ADR-0010 criado: "Estrutura de variações de violão".
- [ ] `docs/features/chord-variations-guitar/plan.md` e `tasks.md` criados (via skill `writing-plans`).

## Fora do escopo

- **Inversões de teclado** — feature seguinte; estrutura de dados diferente, semântica diferente.
- **ChordBuilder (`/chord-builder`)** — não suporta variações nesta entrega; continua editor de 1 shape.
- **Áudio em variações** — sem playback no clique da miniatura.
- **`customLabel` em variações** — campo documentado mas não usado nesta entrega (ex.: "Drop2", "CAGED-C").
- **Geração massiva** — só 25 combinações pedagógicas. As outras 239 ficam com 1 variação até PRs futuros.
- **Modo "comparar variações" lado a lado** — não previsto.
- **Sincronização staff/piano com variação** — staff e piano continuam canônicos.
- **Sistema CAGED como rótulo** — usamos "Aberto/Nª casa", não "forma C/A/G/E/D".

## Decisões pendentes

- [ ] **Largura do chord-card em mobile estreito (< 360 px)** — manter 92 px (3 cards visíveis com scroll) ou reduzir para 80 px (4 cards visíveis)? **Tática**, define na implementação.
- [ ] **Ordem da geração quando regiões empatam em score** — preferência por shapes com raiz no baixo da corda mais grave possível. Já é o caso no gerador atual; só confirmar no novo modo `--variations`.
- [ ] **Como representar pestana parcial vs total nas miniaturas** — pílula com largura proporcional às `strings` cobertas. Detalhe de `drawChordCard.js`.

## Termos a adicionar ao glossário

- **Variação (de acorde no violão)** — outra forma do mesmo acorde no braço, com mesmas pitch classes mas distribuição de oitavas e/ou região do braço diferentes. No Nagham, é uma posição no array de `variations` de um (root, quality). **Distinto de inversão**: inversão muda a nota mais grave; variação pode ou não mudar.
- **Região (de variação)** — chave semântica que identifica onde no braço a variação fica: `"open"` (envolve cordas soltas ou começa no traste 1) ou `"fret-N"` (começa no traste N).
- **Chord-card** — diagrama vertical compacto de acorde (formato Cifra Club / musicca / Songsterr), distinto do braço horizontal completo.

## Referências externas consultadas

- musicca.com — padrão de carrossel de chord-cards por instrumento, piano/staff únicos.
- Convenção CAGED — descartada como rótulo, mas o gerador implicitamente produz shapes equivalentes a CAGED.
