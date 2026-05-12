# Plano: consolidar helpers de domínio

## Ordem de execução (dependências)

1. **Helpers em notes.js** — base; nada depende dele, mas habilita os outros.
2. **`chordQualities.js`** — usa helpers; vira fonte única.
3. **UI constants em ui.js** — independente; pode entrar a qualquer momento.
4. **Unificar voicings** — usa chordQualities indiretamente via callers.
5. **Atualizar scripts** — após cada etapa, refatorar scripts.
6. **ADRs 0007 + 0008** — registrar decisões.

## Arquivos que vão mudar

### Novos

- `src/domain/chordQualities.js` — tabela única `CHORD_QUALITIES` + helpers.
- `src/constants/ui.js` — `MIN_WHITE_KEY_PX`, `MIN_FRET_PX`, cores.
- `docs/adr/0007-unificar-piano-staff-voicings.md`
- `docs/adr/0008-chord-qualities-single-source.md`

### Modificados

- `src/domain/notes.js` — exportar helpers.
- `src/domain/chord.js` — `QUALITY_TO_TONAL` deriva de `chordQualities`.
- `src/domain/scales.js` — importa helpers de notes.
- `src/domain/pianoVoicings/index.js` — re-exporta `getStaffChordVoicing`.
- `src/views/Guitar/constants.js` — re-export de ui.js.
- `src/views/Piano/drawPiano.js` — importa MIN_WHITE_KEY_PX de ui.js.
- `src/pages/Home.jsx` — import path do staff voicing.
- `scripts/audit-spelling.mjs` — usa chordQualities + helpers.
- `scripts/render-notes.mjs` — idem.
- `scripts/generate-guitar-voicings.mjs` — idem.
- `scripts/fix-spelling.mjs` — não toca em staffVoicings.

### Apagados

- `src/domain/staffVoicings/*.js` (10 arquivos).

## Riscos

- **Renomear/deletar pasta** — quem tinha o caminho memorizado vai
  precisar atualizar. Mitigação: `getStaffChordVoicing` alias mantido.
- **Tabela única pode ficar pesada** — 23 qualities × ~5 intervalos cada.
  Mitigação: helpers retornam slices conforme uso.
- **Scripts já estão em produção** — após mudança, rodar todos os audits
  pra garantir 100 % match antes de commitar.

## Validação

Após cada etapa do plano:

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
npm run lint
npm run build
```
