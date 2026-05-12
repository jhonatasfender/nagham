# Tarefas: Variações de acordes no violão

Ver detalhes técnicos em [`plan.md`](./plan.md). Cada item aqui aponta para uma tarefa numerada.

## Documentação e domínio (estrutural)

1. [ ] **Task 1** — ADR-0010 + atualizar `docs/domain/chords.md` e `glossary.md`.
2. [ ] **Task 2** — Estender `src/domain/voicings/index.js` com shim, `getChordVariations`, `idx` em getBarreFromVoicing.
3. [ ] **Task 3** — `scripts/migrate-voicings.mjs` + executar nos 12 `<Root>.js`.

## Auditorias

4. [ ] **Task 4** — Atualizar `scripts/render-notes.mjs` e `scripts/check-playability.mjs` para iterar `variations[]`.

## Gerador de conteúdo

5. [ ] **Task 5** — Estender `scripts/generate-guitar-voicings.mjs` com `--variations=N` e busca por região.
6. [ ] **Task 6** — Rodar gerador em C, D, E, G, A × Maj, m, 7, m7, maj7. Curadoria manual.

## UI (d3 + React)

7. [ ] **Task 7** — `src/views/Guitar/drawChordCard.js` + constantes.
8. [ ] **Task 8** — `src/views/Guitar/ChordCard.jsx`.
9. [ ] **Task 9** — `src/views/Guitar/ChordVariationStrip.jsx`.

## i18n

10. [ ] **Task 10** — `voicings.*` em pt-BR, en, es.

## Integração

11. [ ] **Task 11** — `GuitarView.jsx` aceita `variationIndex` (cascateia pra `drawGuitar`).
12. [ ] **Task 12** — `Home.jsx` integra `chordReducer.variationIndex` + render `<ChordVariationStrip>`.

## Validação final

13. [ ] **Task 13** — Checklist manual de UI + audits 100 % + marcar spec como `shipped` + ADR-0010 linkada.
