# 0004 — Captura de toque mobile via pointerdown + touch-action

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

Usuário reportou que no celular muitos toques no piano, partitura ou
violão "não eram registrados". Investigação revelou três causas:

1. **300ms tap delay no iOS Safari** ainda dispara em contextos sem
   `touch-action: manipulation`, atrasando ou cancelando o `click`.
2. **Movimento durante o toque** (5-10px) é interpretado pelo navegador
   como scroll/pan e cancela o `click`. Dedo escorregando ≠ click.
3. **Targets pequenos** — teclas pretas do piano tinham ~22 px (com
   `MIN_WHITE_KEY_PX=38`), bem abaixo dos 44 px recomendados (Apple HIG)
   e 48 dp (Material Design).

O problema é especialmente sensível porque os elementos interativos são
SVG dentro de containers com `overflow-x-auto` (necessário para o
scroll horizontal mobile descrito em
[ADR-0005 — ainda a escrever sobre scroll horizontal — se aplicável]).

## Decisão

Três mudanças combinadas:

1. **Substituir `click` por `pointerdown`** em todos os handlers de
   notas/cells:
   - `src/views/Piano/drawPiano.js` (teclas brancas + pretas)
   - `src/views/Guitar/drawCells.js` (rects de cell)
   - `src/views/Guitar/drawDots.js` (círculos)
   - `src/views/Staff/drawStaff.js` (noteheads do Verovio)
     Dispara no momento que o dedo toca, antes do navegador decidir se é
     tap ou pan.
2. **`touch-action: manipulation`** no SVG raiz de cada vista (piano, guitar,
   staff). Elimina o delay de 300 ms e impede double-tap-zoom de engolir
   o toque.
3. **Aumentar `MIN_WHITE_KEY_PX` de 38 → 48** em `drawPiano.js`. Teclas
   pretas passam a ~28 px (ainda estreitas, mas tocáveis).

## Consequências

- ➕ Notas respondem instantaneamente ao toque, mesmo se o dedo escorregar.
- ➕ Não há mais perda de eventos quando o usuário tenta tocar em sequência
  rapidamente.
- ➕ Feel de "instrumento real" — som no touchdown, não no touchup
  (comportamento esperado em apps tipo GarageBand).
- ➖ Toque acidental enquanto o usuário arrasta para fazer scroll dispara
  a nota. Aceitável: é o que apps musicais fazem.
- ➖ Sem teste real no celular durante o desenvolvimento (Claude Code não
  tem acesso a navegador). Decisão baseada em literatura de UX mobile.
- 🔄 Notas da partitura ainda são pequenas (path do Verovio). Para melhorar
  precisão sem mexer no Verovio, há a opção futura de adicionar `<rect>`
  invisível maior em volta de cada nota. Não bloqueia o ADR atual.

## Alternativas consideradas

- **Apenas `touch-action: manipulation` sem pointerdown** — melhora mas
  não resolve o problema de cancelamento por movimento.
- **Pointer events com threshold (movimento < 10 px = click)** — viável,
  mas mais código. Pointerdown direto é mais simples e adequado para apps
  musicais.
- **Aumentar drasticamente os keys (MIN_WHITE_KEY_PX=64)** — torna o piano
  largo demais; usuário precisa rolar mais.

## Referências

- [Apple HIG — Layout (touch targets)](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Material Design — Layout (touch targets)](https://m3.material.io/foundations/layout/applying-layout/window-size-classes)
- [MDN — touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
- [MDN — Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- Commit: `fix(mobile): use pointerdown for note taps and larger touch targets`
