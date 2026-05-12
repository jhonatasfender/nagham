# 0001 — Uso do Verovio para renderizar partitura

- **Status:** Accepted
- **Data:** 2025 (decisão original; ADR retroativo registrado em 2026-05-12)
- **Supersedes:** —

## Contexto

A app precisa renderizar partitura em clave de sol com notas individuais,
acidentes corretos, linhas suplementares e ligaduras eventuais. As opções
mainstream eram:

1. Desenhar tudo manualmente com D3 (como fizemos no piano e violão).
2. Usar [VexFlow](https://vexflow.com/) — render JS via Canvas/SVG.
3. Usar [Verovio](https://www.verovio.org/) (WASM) — render MEI XML para SVG.

Como a app é educacional e há expectativa de partitura formal (não apenas
"piano roll"), a qualidade do desenho importa, especialmente para
acidentes duplos (`F##`, `B♭♭`) que apps menos rigorosos renderizam mal.

## Decisão

Renderizamos a partitura com **Verovio** (WASM) a partir de MEI XML gerado
em `src/views/Staff/drawStaff.js`. O MEI é construído a partir da matriz
gerada por `src/domain/notationMatrix.js`.

## Consequências

- ➕ Renderização tipográfica profissional (notação clássica).
- ➕ Suporte nativo a acidentes duplos (`ss`, `ff` na escala MEI).
- ➕ Layout responsivo via `pageWidth` no toolkit.
- ➖ Verovio é grande (~4 MB minificado, ~1 MB gzip) — domina o bundle.
- ➖ MEI é mais verboso que outras notações; precisamos construir XML manualmente.
- 🔄 `drawStaff.js` precisa mapear `{midi, spelling, spellingOctave}` →
  MEI pname/oct/accid. Já implementado.

## Alternativas consideradas

- **VexFlow** — bundle menor mas qualidade tipográfica inferior; suporte a
  double accidentals exige workarounds. Não escolhido.
- **Desenhar com D3 manualmente** — controle total mas trabalho enorme
  para coisas que Verovio já resolve (ledger lines, beams, etc.). Não
  escolhido.

## Referências

- [Verovio](https://www.verovio.org/)
- [MEI Schema](https://music-encoding.org/)
- `src/views/Staff/drawStaff.js`
