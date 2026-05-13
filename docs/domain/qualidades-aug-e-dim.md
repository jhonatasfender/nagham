# Qualidades `aug` e `dim`: tríade × tétrade

> Por que o botão `aug` mostra 3 notas e o botão `dim` mostra 4, e como
> isso se relaciona com a cifra brasileira. Para o histórico da decisão
> sobre `dim`, ver [ADR 0003](../adr/0003-dim-significa-dim7-cifra-br.md).

## Resumo de uma frase

`aug` é tríade aumentada (3 notas, padrão internacional). `dim` é tétrade
diminuta (4 notas, cifra brasileira) — convenções diferentes que
**coexistem propositalmente** na UI.

## Mapeamento botão → qualidade interna

| Botão UI | Qualidade interna | Fórmula          | Exemplo (C)      | Notas |
| -------- | ----------------- | ---------------- | ---------------- | ----- |
| `aug`    | `aug`             | T + 3M + 5♯      | C – E – G♯       | 3     |
| `dim`    | `dim7`            | T + 3m + 5♭ + 7𝄫 | C – E♭ – G♭ – B𝄫 | 4     |
| `m7(b5)` | `m7(b5)`          | T + 3m + 5♭ + 7m | C – E♭ – G♭ – B♭ | 4     |

A **tríade diminuta pura** (T + 3m + 5♭, 3 notas) existe nos arquivos de
voicing mas **não tem botão dedicado** na UI (ver ADR 0003). Para o caso
raro em que se precisa dela, usa-se `m7(b5)` ignorando a 7ª ou edita
diretamente.

## Por que `aug` é tríade

A tríade aumentada é a forma canônica do acorde aumentado em **todas as
tradições** (cifra brasileira, Berklee, jazz, análise clássica). Não há
ambiguidade — `Caug` ou `C+` significa C-E-G♯, três notas.

A versão tétrade existe — **`C7(♯5)` ou `Caug7`** (T + 3M + 5♯ + 7m,
ex.: C-E-G♯-B♭) — comum em jazz/blues como dominante alterado. Mas é
sempre escrito com o `7` explícito; nunca o `aug` sozinho refere-se a
ela. Por isso a UI mantém `aug` = 3 notas.

## Por que `dim` é tétrade

Convenção da cifra brasileira (Chediak, Cifra Club): `C°` ou `Cdim`
sozinhos referem-se à **tétrade dim7**, não à tríade. Decisão tomada
para alinhar com a expectativa do público brasileiro — ver
[ADR 0003](../adr/0003-dim-significa-dim7-cifra-br.md) para o
contexto completo.

Isso gera uma **assimetria intencional** na UI:

- `aug` segue padrão internacional (tríade, 3 notas).
- `dim` segue cifra brasileira (tétrade, 4 notas).

A assimetria não é bug — é tradução fiel das duas convenções que coexistem
no idioma de cifra que a app fala.

## O que **falta** na app (futuro possível)

| Acorde teórico             | Cifra comum        | Notas (C)       | Status na app |
| -------------------------- | ------------------ | --------------- | ------------- |
| Tríade diminuta            | `Cm(♭5)` / `C°`    | C – E♭ – G♭     | Sem botão     |
| Tétrade aumentada (dom7♯5) | `C7(♯5)` / `Caug7` | C – E – G♯ – B♭ | Sem botão     |
| Aug-major-7                | `Cmaj7(♯5)`        | C – E – G♯ – B  | Sem botão     |

Todas essas existem na teoria; se demanda surgir, podem virar botões
dedicados via `EXTENSION_COMPOSABLE_WITH_TRIAD` em `src/domain/chord.js`
ou expandindo `CHORD_QUALITIES_REST` em
`src/components/ChordBuilderSection/constants.js`. Por enquanto, ficam de
fora para não poluir a UI com casos raros.

## Cifras equivalentes — referência rápida

```
aug              =  +     =  ♯5
dim (cifra BR)   =  °     =  ° 7   (tétrade)
m7(b5)           =  ø     =  ½ ° 7 (meio-diminuto)
```

## Referências

- [ADR 0003 — "dim" no UI significa dim7 (cifra brasileira)](../adr/0003-dim-significa-dim7-cifra-br.md)
- [`docs/domain/chords.md`](chords.md) — modelo geral
- [`docs/domain/notation-conventions.md`](notation-conventions.md) — grafia
- [Wikipedia — Acorde aumentado](https://pt.wikipedia.org/wiki/Acorde_aumentado)
- [Wikipedia — Acorde diminuto](https://pt.wikipedia.org/wiki/Acorde_diminuto)
