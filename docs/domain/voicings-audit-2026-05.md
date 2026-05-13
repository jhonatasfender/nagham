# Auditoria de voicings — maio/2026

> Registro de uma auditoria abrangente das voicings (violão, piano,
> partitura) feita em 2026-05-12. Captura a metodologia, os achados
> sistêmicos e referências para futuras revisões.

## Escopo

Conferência cruzada de **288 voicings de violão** (24 qualidades × 12
roots) em `src/domain/voicings/<Root>.js`, mais validação das voicings
correspondentes de piano/partitura em
`src/domain/pianoVoicings/<Root>.js`.

## Metodologia

Para cada par `(root, quality)`:

1. **Cálculo das pitch classes esperadas** a partir da fórmula intervalar
   em `src/domain/chordQualities.js`.
2. **Cálculo das pitch classes produzidas** pela voicing, mapeando cada
   `[stringIndex, fret]` para uma nota usando a afinação padrão:

   | stringIndex | Corda    | Nota solta |
   | ----------- | -------- | ---------- |
   | 0           | 1ª aguda | E4         |
   | 1           | 2ª       | B3         |
   | 2           | 3ª       | G3         |
   | 3           | 4ª       | D3         |
   | 4           | 5ª       | A2 (E3)    |
   | 5           | 6ª grave | E2         |

3. **Verificação de idiomaticidade** comparando contra formas canônicas
   (CAGED, jazz drop-2, etc.).

Scripts disponíveis no repositório:

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
```

## Achados sistêmicos

### 1. Causa raiz dos "muitos desenhos errados": renderer, não dados

A vasta maioria dos voicings produzia o **conjunto correto de chord
tones**. O problema era o filtro `fret > 0` em `drawDots.js`, que
descartava silenciosamente notas em cordas soltas. Detalhes em
[`docs/adr/0009-renderizar-dots-em-cordas-soltas.md`](../adr/0009-renderizar-dots-em-cordas-soltas.md).

### 2. Voicings de 7ª que precisaram de retoque

13 entradas de 60 (das qualidades `7`, `maj7`, `m7`, `m7(b5)`, `dim7`)
estavam em formatos ad-hoc não-idiomáticos. Substituídos por shapes
CAGED padrão:

- C7 → `x32310` (open), Cmaj7 → `x32000`
- E7 → `020100`, Em7 → `020000`, Emaj7 → `021100`
- F7 → `131211`, Fmaj7 → `132210`
- F#7/F#maj7, G#7, C#7 → E-shape barre nas casas corretas
- G7 → `320001` (open)
- Bmaj7 → `x24342` (A-shape barre)

Commit `0de79c6`.

### 3. Power chord `5`: 2 pitch classes é correto

Por teoria, `X5` = **só tônica + 5ª justa**, sem terça (não é tríade).
Isso é o que define power chord — a ausência da 3ª garante som limpo
sob distorção. A confusão "deveria ser uma tríade?" não procede:

- C5 = C + G (não C-E-G)
- A app render isso corretamente em todos os 3 visualizadores
- O tooltip do botão `5` já diz "power chord (só tônica e quinta)"

**Detalhe idiomático**: no piano/partitura, é comum usar a forma
`1-5-1′` (tônica + quinta + tônica oitava acima) — três teclas, duas
pitch classes. A app atual mostra `1-5` apenas (duas teclas). Tecnicamente
correto, mas pode parecer ralo. Mudança opcional para o futuro.

### 4. Augmented: sem mudanças necessárias

Todos os 12 voicings `aug` produziam as pitch classes corretas
(root + M3 + ♯5). A grafia teórica também estava certa nos piano
voicings (incluindo double-sharps como `B♯`, `F𝄪`, `D𝄪`). A
"impressão" de erro vinha do mesmo filtro de drawDots.

### 5. `6/9` faltando em todos os 12 roots

`getChordVoicing(root, "6/9")` retornava `null` em todas as tônicas — a
qualidade existia no domínio (`chordQualities.js`) e no chord-builder,
mas não tinha voicing de violão. Adicionados 12 voicings idiomáticos
(A-string root ou low-E root barre/moveable). Commit `f282737` + parte
do trabalho anterior.

### 6. Buracos em `7(#9)`, `11`, `13` — três famílias inteiras

- **`7(#9)` (key interna `9+`)**: nenhum voicing de violão nem piano em
  nenhum dos 12 roots. Adicionados 12 voicings Drop-2 com fórmula
  R-3-♭7-♯9 (5th omitida, como manda a tradição jazz). Adicionadas
  também 9 voicings de piano nos roots cobertos.
- **`13`**: sem voicing de violão em nenhum root (`// 13: unable to
generate a valid shape`). Adicionados 12 voicings com fórmula
  R-3-♭7-13 (omitindo 5ª, 9ª e 11ª como tradição).
- **`11`**: tinha voicing em todos os roots, mas com **conflito
  estrutural**: terça maior e 11ª juntas (sonoridade dissonante que
  guitarristas evitam). Reescritos como **9sus4** (R-♭7-9-11, sem 3ª)
  — convenção universal pra 11 em jazz/funk. Commit `03829ae`.

### 7. Decisão sobre a 5ª na família 9 (piano/partitura)

Acordes da família 9 (`maj9`, `9`, `m9`, `add9`, `7(#9)`) têm a fórmula
completa **1-3-5-7-9** (cinco notas). Na prática jazz/comercial, a 5ª
justa costuma ser omitida — vira um "rootless/no-5 drop voicing" de 4
notas, mais compacto e idiomático em comping moderno.

**Decisão do projeto (2026-05)**: manter o **voicing teórico estrito de
5 notas** nas representações de piano e partitura. Justificativas:

- A app é primariamente educacional — mostrar a fórmula completa ajuda
  o estudante a ver os 5 graus empilhados.
- A grafia teórica estrita já é o padrão do projeto (ver
  [ADR 0002](../adr/0002-grafia-teorica-estrita.md)) — coerência.
- O cluster de 5 notas em distância de 9ª (ex.: Bmaj9 = B4 a C#6) **é
  denso na pauta**, mas isso é uma propriedade da harmonia, não bug.

**No violão a história é diferente**: a 5ª é omitida nos voicings de
9-family porque (a) impraticável caber 5 notas em ≤4 dedos e (b) é
exatamente a forma que guitarristas tocam. Ver achado #6 acima.

### 8. Key `2:` era código morto

Existia em todos os 12 voicings de violão e 9 de piano. As notas eram
idênticas a `add9` (R-3-5-9). Nenhum botão UI, nenhuma definição de
qualidade, nenhum alias, nenhum caller no código. **Removida** dos 21
arquivos. Commit `03829ae`.

## Convenção do formato de voicing

```js
// src/domain/voicings/<Root>.js
const voicings = {
  Maj: [
    [4, 3], // par [stringIndex, fret]
    [3, 3],
    [2, 2],
    { barre: 1, strings: [5, 4, 3, 2, 1, 0] }, // pestana opcional (inline)
  ],

  // Múltiplas posições: array-de-arrays
  m: [
    [
      [0, 8],
      [1, 8],
      [2, 9],
      [3, 10],
    ], // 1ª posição
    [
      [1, 4],
      [2, 5],
      [3, 5], // 2ª posição
      { barre: 3, strings: [4, 3, 2, 1, 0] },
    ],
  ],
};
```

`stringIndex` segue a tabela acima (0 = aguda, 5 = grave). `fret = 0`
é corda solta.

## Conversão pitch class

Para descobrir que nota uma posição `[s, f]` produz:

```
nota = (nota_solta(s) + f) mod 12
```

Onde `nota_solta`: `0→E, 1→B, 2→G, 3→D, 4→A, 5→E`.

## Reproduzir auditoria

Para auditar uma qualidade específica (ex.: `7(#9)` em todos os roots):

1. Lista os pitch classes esperados por `chordQualities.js`.
2. Para cada root, leia o voicing de `src/domain/voicings/<Root>.js`.
3. Compute o pitch class de cada `[s, f]` via fórmula acima.
4. Conjunto produzido deve **conter** o esperado (dobramentos são OK).

## Convenção de pestana

Quando uma voicing usa barre, declare o objeto **inline no array** de
posições, com formato `{ barre: <casa>, strings: [<idx>, ...] }`. O
renderer (`drawBarre.js`) consome esses dois campos. As cordas listadas
em `barre.strings` são cobertas pela linha vertical da pestana e
suprimidas em `drawDots.js` (evita ponto duplicado).

Exemplo F Maj (pestana casa 1, todas as 6 cordas):

```js
Maj: [
  [4, 3],                                       // C — corda A, casa 3
  [3, 3],                                       // F — corda D, casa 3
  [2, 2],                                       // A — corda G, casa 2
  { barre: 1, strings: [5, 4, 3, 2, 1, 0] },    // pestana 1ª casa
],
```

## Referências externas usadas na auditoria

- [Power Chord — Wikipedia](https://en.wikipedia.org/wiki/Power_chord)
- [Sus Chords on Guitar — Applied Guitar Theory](https://appliedguitartheory.com/lessons/sus-chords/)
- [Diminished Triad Shapes — Learn Jazz Standards](https://www.learnjazzstandards.com/blog/diminished-triad-shapes-guitar/)
- [Augmented Chords — guitar-chord.org](https://www.guitar-chord.org/aug.html)
- [CAGED Seventh Chords — Fingerstyle Guitar Rocks](https://www.fingerstyleguitar.rocks/movable-chords/caged-seventh/)

## ADRs relacionadas

- [0007 — Unificar piano e staff voicings](../adr/0007-unificar-piano-staff-voicings.md)
- [0008 — Chord qualities single-source](../adr/0008-chord-qualities-single-source.md)
- [0009 — Renderizar dots em cordas soltas](../adr/0009-renderizar-dots-em-cordas-soltas.md)
