# Feature: Renderização unificada de cifras

- **Status:** shipped
- **Owner:** jonatas
- **Atualizado:** 2026-05-12
- **Shipped:** 2026-05-12
- **ADRs gerados:** [ADR-0006](../../adr/0006-ascii-text-chord-symbol-style.md)

## Por quê

A renderização de cifras (`Cmaj7`, `Bdim`, `C7(#9)`, etc.) está espalhada
em três módulos com lógicas independentes:

- `src/domain/chord.js` — `qualityToDisplaySuffix()` (label principal)
- `src/components/ChordBuilderSection/constants.js` — `extensionChipLabel()`
  (chips do picker)
- `src/domain/scales.js` — `formatTriadLabel()` (graus em /scales)

Os dois primeiros fazem **exatamente a mesma coisa** em arquivos diferentes
(duplicação). O terceiro usa **símbolos diferentes** (`°` para diminuto,
`+` para aumentado) — inconsistente com o resto da app.

Consequência: mudar a forma de exibir um tipo de acorde exige editar 2-3
arquivos, e é fácil esquecer um. Também é difícil para colaboradores novos
descobrirem onde a cifra é formatada.

## User story

Como desenvolvedor mantendo o Nagham, quero **uma única fonte da verdade**
para o sufixo de cada qualidade, para que adicionar ou alterar a forma de
exibição seja uma mudança de um local só.

Como usuário da app, quero **consistência visual** entre a tabela de
escalas e o construtor de acordes (um `dim` é `dim` em todo lugar).

## Critérios de aceite

- [ ] Existe `src/domain/chordSymbol.js` com `QUALITY_SUFFIX` (tabela única)
      e funções `formatQualitySuffix(quality)` e
      `formatChordSymbol({root, quality, bass})`.
- [ ] `getChordLabel` (chord.js) chama `formatChordSymbol`.
- [ ] `qualityToDisplaySuffix` (chord.js) deixa de existir ou vira
      re-export do novo módulo.
- [ ] `extensionChipLabel` (constants.js) delega para `formatQualitySuffix`.
- [ ] `formatTriadLabel` (scales.js) usa `formatQualitySuffix`, eliminando
      `°` e `+` hardcoded.
- [ ] Página `/scales` agora mostra `Bdim`, `Caug` (texto), em vez de
      `B°`, `C+`.
- [ ] `maj9` exibido como `maj9` (não `M9`), para consistência ASCII com
      `maj7`.
- [ ] `9+` exibido como `7(#9)` (já era o caso, mantido).
- [ ] `dim7` exibido como `dim` (já era o caso, mantido — ver
      [ADR-0003](../../adr/0003-dim-significa-dim7-cifra-br.md)).
- [ ] Auditorias passam: `audit-spelling.mjs` 0 mismatches,
      `render-notes.mjs --summary` 100 %.
- [ ] `npm run lint` e `npm run build` sem erros.
- [ ] [`docs/domain/notation-conventions.md`](../../domain/notation-conventions.md)
      atualizado com a tabela de suffix.
- [ ] ADR-0006 registrado documentando a decisão de estilo ASCII.

## Fora do escopo

- Componente React `<ChordSymbol>` com tipografia rica (subscript, parens
  estilizados) — fica para uma feature futura se necessário.
- Suporte a estilo alternativo (símbolos brasileiros `°`, `ø`, `+`) — pode
  virar opção em outra feature; este trabalho fixa em ASCII.
- Mudar o nome interno das qualities (continuam sendo `"Maj"`, `"m"`,
  `"dim7"`, etc.).

## Decisões pendentes

- ✅ Estilo ASCII vs símbolos: ASCII (decidido pelo owner em 2026-05-12,
  vira ADR-0006).
- ✅ `maj9` exibido como "maj9" ou "M9": "maj9" para consistência com
  "maj7".

## Termos a adicionar ao glossário

Nenhum novo — todos já cobertos por `domain/glossary.md`.
