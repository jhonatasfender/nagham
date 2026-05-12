# Feature: Consolidar helpers de domínio (anti-duplicação)

- **Status:** shipped
- **Owner:** jonatas
- **Atualizado:** 2026-05-12
- **Shipped:** 2026-05-12
- **ADRs gerados:** [ADR-0007](../../adr/0007-unificar-piano-staff-voicings.md), [ADR-0008](../../adr/0008-chord-qualities-single-source.md)

## Por quê

Auditoria interna encontrou 12 casos de duplicação no domínio musical e
scripts. As mais críticas:

- **Intervalos por qualidade definidos em 4 lugares** (chord.js,
  audit-spelling.mjs, render-notes.mjs, generate-guitar-voicings.mjs).
  Cada um em um formato; adicionar qualidade nova exige editar todos.
- **`LETTER_PC`** (mapeamento `{C:0, D:2, …}`) definido em 4 arquivos.
- **`pianoVoicings/` e `staffVoicings/`** são 12 pares byte-idênticos —
  já confirmado por `diff`. Duas pastas, mesmo conteúdo.
- **`MIN_WHITE_KEY_PX` inline em drawPiano** vs `MIN_FRET_PX` em
  Guitar/constants — sem padrão de onde colocar constantes UI cross-instrumento.
  Pior: piano importa cores (`TRIAD_FILL`) de `Guitar/constants.js`.

Resultado: cada mudança musical (nova quality, novo intervalo) é uma
caça-ao-tesouro em 4 arquivos. Esta refatoração estabelece **uma fonte
única por categoria de dado**.

## User story

Como desenvolvedor mantendo o Nagham, quero que adicionar uma nova
qualidade de acorde seja uma **edição de um único arquivo**, em vez de
sincronizar 4 lugares manualmente.

## Critérios de aceite

### Helpers de nota exportados (resolve #2, #3, #5, #6, #8)

- [ ] `src/domain/notes.js` exporta: `LETTER_PC`, `LETTERS`,
      `pitchClass(midi)`, `buildAccidental(offset)`,
      `ENHARMONIC_SHARP_TO_FLAT`, `ENHARMONIC_FLAT_TO_SHARP`.
- [ ] `scales.js`, `chord.js`, `audit-spelling.mjs`, `fix-spelling.mjs`,
      `render-notes.mjs`, `generate-guitar-voicings.mjs` importam de
      `notes.js`, sem reimplementação local.

### Tabela única de qualidades (resolve #1)

- [ ] `src/domain/chordQualities.js` é a fonte única, com:
      `CHORD_QUALITIES = { quality: { tonal, degrees: [[degree, semitones]] }, ... }`.
- [ ] Funções: `getQualityTonalType(q)`, `getQualityIntervals(q)`,
      `getQualityDegrees(q)`, `getQualityPitchClasses(q)`.
- [ ] `chord.js` deriva `QUALITY_TO_TONAL` desta tabela (ou usa
      `getQualityTonalType` direto).
- [ ] Scripts (`audit-spelling`, `render-notes`, `generate-guitar-voicings`)
      importam os intervalos da mesma tabela.

### UI constants (resolve #9)

- [ ] `src/constants/ui.js` (novo) tem `MIN_WHITE_KEY_PX`, `MIN_FRET_PX`,
      `TRIAD_FILL`, `TRIAD_STROKE`, `SELECTED_FILL`, `SELECTED_STROKE`.
- [ ] `src/views/Guitar/constants.js` mantém só os específicos do violão
      (PADDING, NUT_WIDTH, etc.) e re-exporta o resto de `ui.js`.
- [ ] `drawPiano.js` importa `MIN_WHITE_KEY_PX` de `ui.js`, não inline.

### Unificar staff e piano voicings (resolve #7)

- [ ] Apagar `src/domain/staffVoicings/` (12 arquivos + index).
- [ ] `pianoVoicings/index.js` também exporta `getStaffChordVoicing` como
      alias de `getPianoChordVoicing`.
- [ ] Callers (Home.jsx, scripts) atualizam o caminho de import.
- [ ] `scripts/fix-spelling.mjs` não tenta mais reescrever
      `staffVoicings/` (não existe).

### Validação

- [ ] `audit-spelling.mjs` retorna 207/207 (sem mismatches).
- [ ] `render-notes.mjs --summary` retorna 100 % piano + 100 % guitar.
- [ ] `npm run lint` e `npm run build` sem erros.

### Docs

- [ ] `docs/domain/chords.md` referencia `chordQualities.js` como fonte.
- [ ] `docs/domain/notation-conventions.md` cita helpers de `notes.js`.
- [ ] ADR-0007 registra a decisão de unificar staff/piano voicings.
- [ ] ADR-0008 registra `chordQualities.js` como single source of truth.

## Fora do escopo

- Renomear `pianoVoicings/` para nome instrumento-neutro (ex.: `noteVoicings/`)
  — quebra mais imports, deixa pra futuro.
- Mudar a estrutura interna das voicings (manter `[{name, octave}]`).
- Refatorar `voicings/` (violão) — formato é diferente e não há duplicação.
- Refatorar `TRIAD_KEYS`/`TRIAD_NOTES` (case #4) e `isTriadNote` (#12) —
  encaixa numa segunda iteração se necessário.

## Termos a adicionar ao glossário

Já cobertos.
