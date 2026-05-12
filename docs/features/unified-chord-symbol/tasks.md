# Tarefas: renderização unificada de cifras

1. [ ] Criar `src/domain/chordSymbol.js` com `QUALITY_SUFFIX`,
       `formatQualitySuffix`, `formatChordSymbol`.
2. [ ] Refatorar `src/domain/chord.js`:
       - `getChordLabel` chama `formatChordSymbol`.
       - Remover `qualityToDisplaySuffix` (não usado fora).
3. [ ] Refatorar `src/components/ChordBuilderSection/constants.js`:
       - `extensionChipLabel = formatQualitySuffix`.
4. [ ] Refatorar `src/domain/scales.js`:
       - `formatTriadLabel` mapeia `TriadQuality` enum → string de quality
         e delega para `formatQualitySuffix`.
       - Remover símbolos `°` e `+` hardcoded.
5. [ ] Rodar audits, lint, build.
6. [ ] Escrever `docs/adr/0006-ascii-text-chord-symbol-style.md`.
7. [ ] Atualizar `docs/adr/README.md` (índice).
8. [ ] Atualizar `docs/domain/notation-conventions.md` com a tabela de
       suffix.
9. [ ] Marcar `spec.md` como `Status: shipped`.
10. [ ] Commit único; push para main.
