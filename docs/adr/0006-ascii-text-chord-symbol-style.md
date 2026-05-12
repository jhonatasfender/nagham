# 0006 — Renderização de cifras em texto ASCII

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

A renderização de cifras estava espalhada em três módulos com lógicas
independentes e estilos diferentes:

- `chord.js` (`qualityToDisplaySuffix`) e
  `ChordBuilderSection/constants.js` (`extensionChipLabel`) — duplicação
  literal, usando texto ASCII (`dim`, `maj7`, `aug`).
- `scales.js` (`formatTriadLabel`) — usava símbolos brasileiros
  hardcoded (`°` para diminuto, `+` para aumentado).

Era impossível mudar a cifra de um tipo de acorde em um único lugar.
A página `/scales` também ficava visualmente inconsistente com o
construtor de acordes na mesma app.

Era necessário escolher **um** estilo para a app inteira:

1. **Brasileiro tipográfico** — `C°`, `Cø`, `C+`, `CM7`. Mais alinhado
   com cifra Chediak / Cifra Club.
2. **ASCII texto** — `Cdim`, `Cm7(b5)`, `Caug`, `Cmaj7`. Mais legível em
   texto puro, copiável, sem dependências de fonte.
3. **Misto** — símbolos em telas, ASCII em chips/tooltips.

## Decisão

Usamos **ASCII texto** em toda a app. O módulo
`src/domain/chordSymbol.js` é a fonte única da verdade:

- Exporta `QUALITY_SUFFIX` — tabela `quality → suffix string`.
- Exporta `formatQualitySuffix(quality)` — lookup com fallback ao próprio
  nome da quality.
- Exporta `formatChordSymbol({root, quality, bass})` — monta o símbolo
  completo (root + suffix + opcional `/bass`).

`chord.js`, `ChordBuilderSection/constants.js` e `scales.js` delegam
para esse módulo. Mudar a forma como qualquer qualidade é exibida agora
é uma edição de um único arquivo.

Mapeamentos importantes:
- `dim7 → "dim"` (ver [ADR-0003](0003-dim-significa-dim7-cifra-br.md))
- `9+ → "7(#9)"` (cifra explícita do Hendrix chord)
- `maj7 → "maj7"`, `maj9 → "maj9"` (sem encurtar para `M7`/`M9`)
- `aug → "aug"` (não `+`)
- `dim → "dim"` (não `°`)

## Consequências

- ➕ Uma única tabela controla o estilo de cifra. Adicionar qualidade
  nova é uma linha em `QUALITY_SUFFIX`.
- ➕ Página `/scales` e construtor de acordes ficam visualmente
  consistentes (`Bdim` em ambos, não `B°` em um e `Bdim` em outro).
- ➕ Texto ASCII é copiável (botão "copiar" do `ChordLabelBar` produz
  texto que cola em qualquer editor) e renderiza sem dependências de
  fonte musical.
- ➕ Acessível: leitores de tela leem "dim" e "aug" naturalmente; "°" e
  "ø" podem ser pronunciados como "grau" ou nada, dependendo do leitor.
- ➖ Quem está acostumado a songbooks Chediak (`F°`, `Bø`, `CM7`) verá
  uma versão diferente. Aceitamos esse afastamento da convenção
  tipográfica brasileira em troca da consistência e copiabilidade.
- ➖ A grafia ASCII pode parecer mais "americana" para olhos brasileiros.
  Se essa percepção for um problema no campo, podemos revisitar.

## Alternativas consideradas

- **Brasileiro tipográfico** — mais elegante visualmente, alinhado com
  a cultura local; rejeitado pela menor copiabilidade e por mexer com
  fontes especiais (`°`, `ø`, `𝄢`).
- **Misto (símbolos em telas, ASCII em chips)** — viável mas adiciona
  complexidade (dois pontos de decisão). Rejeitado por ora; pode voltar
  se demanda de UX surgir.

## Referências

- `src/domain/chordSymbol.js`
- `docs/features/unified-chord-symbol/spec.md`
- Cifra Club — Padrão de cifragem (sugere símbolos brasileiros, mas
  reconhece variação).
