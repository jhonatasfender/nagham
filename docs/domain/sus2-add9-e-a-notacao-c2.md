# `sus2`, `add9` e a notação ambígua `C2`

> Três notações que se confundem na prática: `Csus2`, `Cadd9` e `C2`.
> Esta nota documenta o que cada uma significa, por que `C2` é
> ambíguo, e como a app trata isso.

## Resumo de uma frase

`sus2` **substitui** a 3ª pela 2ª (3 notas). `add9` **mantém** a 3ª e
**adiciona** a 9ª (4 notas). `C2` não tem definição padrão — pode ser
qualquer um dos dois dependendo da tradição.

## O essencial: substituir × adicionar

| Acorde    | Fórmula | Notas em C    | Tem a 3ª? | Caráter         |
| --------- | ------- | ------------- | --------- | --------------- |
| C (maior) | 1-3-5   | C – E – G     | sim       | maior, resoluto |
| Csus2     | 1-2-5   | C – D – G     | **não**   | suspenso, aéreo |
| Csus4     | 1-4-5   | C – F – G     | **não**   | suspenso, tenso |
| Cadd9     | 1-3-5-9 | C – E – G – D | sim       | maior + cor     |

A **regra do "sus"** é: a terça é **substituída**, não complementada.
Sem isso o acorde não é "suspenso" — fica sendo outra coisa. Por
exemplo, `C + D + E + G` **não é Csus2** (porque a 3ª, `E`, está lá);
isso é `Cadd9`.

## Por que existe a distinção sonora

A 2ª e a 3ª maior são notas **vizinhas** (1 semitom de distância no
caso de Csus2/C — `D` para `E`). Tocadas juntas geram um cluster
dissonante. Por isso:

- **`sus2`** evita o atrito removendo a 3ª. Som "aberto", ambíguo —
  nem maior nem menor (como o aug não é nenhuma das duas porque a 5ª
  está alterada, o sus não é nenhuma porque a 3ª está ausente).
- **`add9`** mantém o atrito mas **distancia as duas notas em
  oitavas** (D agudo em cima, E médio embaixo). O som fica colorido,
  rico, mas claramente **maior** por causa da 3ª.

Ambos são válidos — são paletas diferentes.

## A ambiguidade da notação `C2`

`C2` **não tem definição padronizada**. Duas tradições coexistem:

| Tradição                  | `C2` significa    | Onde aparece                                           |
| ------------------------- | ----------------- | ------------------------------------------------------ |
| Jazz / lead sheet moderno | `Csus2` (C-D-G)   | Berklee, Real Books contemporâneos, cifrários atuais   |
| Rock/folk antigo          | `Cadd9` (C-D-E-G) | Songbooks Hal Leonard anos 70-80, James Taylor, Eagles |

O motivo histórico: violonistas tocavam `x32030` (forma fácil de
Cadd9) e abreviavam como "C2" no cifrário; transcribers de jazz
adotaram "C2" como sinônimo de Csus2 porque o "sus2" ainda não era
padrão. Hoje as duas convenções convivem e a notação `C2` puro **deve
ser evitada** — sempre prefira `Csus2` ou `Cadd9` para deixar claro.

Se você se deparar com `C2` em uma cifra:

1. Sem mais contexto, presuma `Cadd9` (interpretação histórica mais
   comum em songbooks populares).
2. Se a cifra vier de jazz/lead sheet moderno, presuma `Csus2`.
3. Quando der, **toque os dois** e veja qual encaixa na progressão.

## Como a app trata isso

A app **propositadamente não oferece** um botão `C2`. Em vez disso:

- Botão `sus2` → quality `sus2` → `Csus2` = C-D-G (sem 3ª)
- Botão `add9` → quality `add9` → `Cadd9` = C-D-E-G (com 3ª)

Os dois botões existem lado a lado no `ChordBuilderSection` e
produzem acordes claramente diferentes. Não há ambiguidade — o
usuário escolhe explicitamente entre substituir ou adicionar.

> **Nota histórica**: até a auditoria de 2026-05-12, existia uma chave
> `2:` em todos os arquivos de voicing (`src/domain/voicings/*.js` e
> `src/domain/pianoVoicings/*.js`) com as mesmas notas de `add9`. Era
> resíduo da convenção antiga "C2 = Cadd9". Como não havia botão UI,
> alias, nem caller no código, foi removida como código morto (ver
> [`voicings-audit-2026-05.md`, achado #7](voicings-audit-2026-05.md#7-key-2-era-código-morto)).

## Tabela de equivalências (referência rápida)

```
sus2          ≡  "sus²"  ≡  remove 3ª, põe 2ª
sus4          ≡  "sus⁴"  ≡  remove 3ª, põe 4ª
add9          ≡  add2    ≡  mantém 3ª, adiciona 2ª/9ª
C2 (jazz)     ≡  Csus2
C2 (rock/folk) ≡  Cadd9
```

## Referências externas

- [Csus2 chord — Musicca](https://www.musicca.com/dictionary/chords/c-suspended-second)
- [Csus2 vs Cadd9 — Blitz Guitar](https://www.blitzguitar.com/10-beautiful-c-major-chord-shapes-guitar/the-difference-between-the-csus2-and-cadd9-chord-on-guitar/)
- [C2 or Cadd2 or Cadd9? — Chase Norris](https://chasenorris.wordpress.com/2011/11/27/c2-or-cadd2-or-cadd9/)
- [C vs Csus2 chords — Acoustic Guitar Forum](https://www.acousticguitarforum.com/forums/showthread.php?t=425651)
- [Is C2 and Cadd9 the same? — Soulful Guitar](https://www.soulfulguitar.com/is-c2-and-cadd9-the-same/)
- [Suspended Chords on Piano — pianoin21days](https://pianoin21days.com/suspended-chords-on-the-piano-simplified/)

## Documentos relacionados

- [`chords.md`](chords.md) — modelo geral de acordes
- [`qualidades-aug-e-dim.md`](qualidades-aug-e-dim.md) — outra
  comparação de qualidades (tríade × tétrade)
- [`voicings-audit-2026-05.md`](voicings-audit-2026-05.md) — auditoria
  de 2026-05, incluindo a remoção da chave morta `2:`
