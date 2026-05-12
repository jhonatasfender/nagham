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

```js
Maj: [
  { region: "open", positions: [[4,3],[3,2],[2,0],[1,1],[0,0]], barre: null },
  { region: "fret-3", positions: [[4,3],[3,5],[2,5],[1,5]], barre: { fret: 3, strings: [4,3,2,1,0] } },
]
```

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
