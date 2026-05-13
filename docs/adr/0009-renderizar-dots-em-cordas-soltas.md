# 0009 — Renderizar dots em cordas soltas no violão

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

`src/views/Guitar/drawDots.js` aplicava o filtro `fret > 0` no modo
não-editor:

```js
const showDot =
  (isEditor && isCustomPosition && !isInBarre) ||
  (!isEditor && isChord && fret > 0 && !isInBarre);
```

Isso descartava silenciosamente qualquer dot em casa 0 (corda solta) ao
renderizar um acorde. Como várias voicings padrão dependem de cordas
soltas, isso quebrava o desenho de:

- **C Maj** — `G` (5ª) vem da corda G solta
- **G Maj** — `D` (5ª) vem da corda D solta
- **E m** e **E dim** — `G`/`G♭` (3ª) vem da corda G solta
- **D sus2** — `E` (2ª) vem da corda E solta
- **A sus2** — `B` (2ª) vem da corda B solta
- **D5**, **A5**, **E5** — power chords abertos clássicos

Os dados de voicing estavam **corretos**: produziam o conjunto de
pitch classes esperado pela fórmula intervalar. A perda das notas
acontecia exclusivamente no momento de desenhar.

## Decisão

Remover o filtro `fret > 0`. Dots em casa 0 passam a ser renderizados
**dentro da coluna da pestana** (à esquerda da 1ª casa), exatamente onde
`getFretCenterX(0, ...)` já posicionava as notas custom no modo editor.

```js
const showDot =
  (isEditor && isCustomPosition && !isInBarre) ||
  (!isEditor && isChord && !isInBarre);
```

## Consequências

- ➕ Voicings com cordas soltas renderizam todos os chord tones.
- ➕ Alinhamento com piano e partitura, que já mostravam todas as notas.
- ➕ Mantém retro-compatibilidade: shapes sem cordas soltas continuam
  iguais.
- ➕ Liberta os voicings da pressão de evitar cordas soltas — formas
  abertas idiomáticas (E open, A open, D open) podem ser usadas como
  fonte primária.
- ➖ A coluna da pestana fica visualmente mais densa em acordes como C
  Maj (3 dots de cordas soltas), mas é a convenção de cifras de violão
  (o símbolo "O" sobre cordas soltas).

## Alternativas consideradas

- **Reescrever cada voicing para evitar cordas soltas** — possível, mas
  enterra a correção em 12 arquivos e força os contribuidores a evitar
  formas abertas naturais. Foi tentado pelo agente que cuidou da
  qualidade `5` (commit `f806dcd` em branch isolado) antes de
  descobrirmos a causa raiz; abandonado em favor desta decisão.
- **Renderer com flag opt-in** — adicionar um boolean para mostrar/ocultar
  cordas soltas. Mais complexo sem ganho prático.

## Referências

- `src/views/Guitar/drawDots.js`
- `src/views/Guitar/layout.js` (`getFretCenterX`)
- [`docs/domain/voicings-audit-2026-05.md`](../domain/voicings-audit-2026-05.md)
