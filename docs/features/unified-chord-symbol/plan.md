# Plano: renderização unificada de cifras

## Arquivos que vão mudar

| Arquivo | Mudança |
|---|---|
| `src/domain/chordSymbol.js` | **novo** — `QUALITY_SUFFIX`, `formatQualitySuffix`, `formatChordSymbol` |
| `src/domain/chord.js` | `getChordLabel` delega para `formatChordSymbol`; `qualityToDisplaySuffix` removida |
| `src/components/ChordBuilderSection/constants.js` | `extensionChipLabel` delega para `formatQualitySuffix` |
| `src/domain/scales.js` | `formatTriadLabel` mapeia `TriadQuality` enum → quality string e usa `formatQualitySuffix` |
| `docs/adr/0006-ascii-text-chord-symbol-style.md` | **novo** — registra decisão de estilo |
| `docs/adr/README.md` | adicionar entrada 0006 no índice |
| `docs/domain/notation-conventions.md` | adicionar tabela de suffix |
| `docs/features/unified-chord-symbol/spec.md` | marcar Status: shipped no fim |

## Riscos

- **Mudança visual em `/scales`**: triads diminutas/aumentadas passam de
  `B°`/`C+` para `Bdim`/`Caug`. Usuário pode estranhar. Mitigação: documentar
  no ADR e i18n explica a convenção.
- **`maj9` muda de `M9` para `maj9`** — cosmético, mas é diferença visível.
  Quem estava acostumado com `M9` (estilo Berklee) vai ver mudança.
- **Quebra de import**: se houver código fora dos 3 arquivos listados que
  importe `qualityToDisplaySuffix`, vai falhar. Validar com lint+build.

## Validação

```bash
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
npm run lint
npm run build
```

Plus smoke test manual: abrir `/scales`, verificar que `Bdim` aparece em
vez de `B°`. Abrir `/`, escolher `dim` chip, verificar que o chord label
mostra `Cdim`. Pegar `aug` chip, verificar que mostra `Caug`.
