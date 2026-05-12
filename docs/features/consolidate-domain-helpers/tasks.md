# Tarefas: consolidar helpers de domínio

## Etapa 1 — Helpers de nota

1. [ ] Exportar de `src/domain/notes.js`: `LETTER_PC`, `LETTERS`,
       `pitchClass`, `buildAccidental`, `ENHARMONIC_SHARP_TO_FLAT`,
       `ENHARMONIC_FLAT_TO_SHARP`.
2. [ ] Refatorar `scales.js` para importar `LETTERS`, `LETTER_PC`,
       `buildAccidental` de notes.js.
3. [ ] Refatorar `chord.js` para usar `ENHARMONIC_*` em vez de objects locais.
4. [ ] Refatorar `scripts/audit-spelling.mjs` e `scripts/fix-spelling.mjs`
       para importar de notes.js.
5. [ ] Refatorar `scripts/render-notes.mjs` e
       `scripts/generate-guitar-voicings.mjs` para usar `pitchClass`.

## Etapa 2 — chordQualities

6. [ ] Criar `src/domain/chordQualities.js` com `CHORD_QUALITIES` table
       e helpers (`getQualityTonalType`, `getQualityIntervals`,
       `getQualityDegrees`, `getQualityPitchClasses`).
7. [ ] Em `chord.js`, derivar `QUALITY_TO_TONAL` de `getQualityTonalType`
       (ou simplesmente usar a tabela direto).
8. [ ] Substituir `QUALITY_INTERVALS` em `audit-spelling.mjs` por import.
9. [ ] Substituir `INTERVAL_BY_QUALITY` em `generate-guitar-voicings.mjs`.
10. [ ] Substituir `EXPECTED_INTERVALS_PC` em `render-notes.mjs`.

## Etapa 3 — UI constants

11. [ ] Criar `src/constants/ui.js` com `MIN_WHITE_KEY_PX`, `MIN_FRET_PX`,
        cores `TRIAD_FILL/STROKE`, `SELECTED_FILL/STROKE`.
12. [ ] `drawPiano.js` importa `MIN_WHITE_KEY_PX` de ui.js.
13. [ ] `Guitar/constants.js` mantém só PADDING/NUT_WIDTH/etc. e
        re-exporta o resto de ui.js para back-compat.

## Etapa 4 — Unificar voicings

14. [ ] `pianoVoicings/index.js` exporta `getStaffChordVoicing` como alias.
15. [ ] Atualizar imports em `Home.jsx`, `render-notes.mjs`,
        `audit-spelling.mjs`.
16. [ ] Apagar `src/domain/staffVoicings/` (todos os 10 arquivos).
17. [ ] Atualizar `fix-spelling.mjs` para não tocar em staffVoicings.

## Etapa 5 — Validação e docs

18. [ ] Rodar audit-spelling, render-notes, lint, build.
19. [ ] Escrever ADR-0007 (unificar staff/piano voicings).
20. [ ] Escrever ADR-0008 (chordQualities single source of truth).
21. [ ] Atualizar `docs/adr/README.md`.
22. [ ] Atualizar `docs/domain/chords.md` e `docs/domain/notation-conventions.md`.
23. [ ] Marcar spec.md como `Status: shipped`.
24. [ ] Commit único; push.
