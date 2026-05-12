# Convenções de grafia musical

> Como o Nagham escolhe o nome de cada nota e cifra. Mudanças aqui
> normalmente exigem um ADR.

## Princípio: letras distintas por grau

Toda tríade, tétrade e escala heptatônica deve usar **uma letra diferente
por grau**, na sequência `C → D → E → F → G → A → B` (cíclica).

- Tríade: 3 letras (R, R+2, R+4)
- Tétrade: 4 letras (R, R+2, R+4, R+6)
- Pentade (9): 5 letras (R, R+2, R+4, R+6, R+1)
- Hexade (11): 6 letras
- Heptade (13): 7 letras

Quando uma altura precisa de acidente duplo para se encaixar na letra
correta, é assim que escrevemos:

| Acorde | Grafia teórica estrita | Grafia popular |
|---|---|---|
| **D# maior** | D# – F𝄪 – A# | D# – G – A# |
| **C# maior** | C# – E# – G# | C# – F – G# |
| **C dim7** | C – E♭ – G♭ – B𝄫 | C – E♭ – G♭ – A |
| **F dim7** | F – A♭ – C♭ – E𝄫 | F – A♭ – B – D |
| **G dim7** | G – B♭ – D♭ – F♭ | G – B♭ – D♭ – E |
| **C 7♯9** | C – E – G – B♭ – D# | C – E – G – A# – D# |

O Nagham usa a coluna estrita. Ver
[ADR-0002](../adr/0002-grafia-teorica-estrita.md) para o porquê.

## Toggle `useFlats`

O toggle "sustenidos / bemóis" no construtor de acordes só afeta:

- **Quais tônicas aparecem na picker** (`NOTE_NAMES` × `NOTE_NAMES_FLATS`).
- **A grafia da própria tônica** quando o usuário escolhe uma equivalente
  enarmônica simples (C# ↔ D♭).

Ele **não** simplifica double-acidentes para naturais (F𝄪 não vira G). Isso
quebraria a regra de letras distintas. Acordes que precisam de double-acidente
para serem teoricamente corretos continuam usando o double-acidente
independentemente do toggle.

A exceção é o caminho `parseTonalNote(useFlats=true)` em `src/domain/chord.js`:
quando o usuário explicitamente prefere bemóis, hard enharmonics (F𝄪, B#)
são colapsados para o equivalente natural com letra do conjunto de bemóis
(`G`, `C`). Isso é o que faz `Eb major` aparecer como `Eb-G-Bb` em vez de
`Eb-F𝄪-Bb` quando o usuário pediu para ver em bemóis.

## Convenção brasileira para qualidades

| Cifra brasileira | Significado | Mapeamento interno |
|---|---|---|
| `C°` / `Cdim` | Tétrade `dim7` | `dim7` |
| `Cm7(♭5)` / `Cø` | Meio-diminuto | `m7(b5)` |
| `C7M` / `Cmaj7` | Maior com 7ª maior | `maj7` |
| `CM9` / `Cmaj9` | Maior com 7ª maior e 9ª | `maj9` |
| `C7(♯9)` | Hendrix chord | `9+` internamente, exibido `7(#9)` |
| `C6/9` | Sextina com nona | `6/9` |
| `C(♭5)` | Tríade com 5ª diminuta | usar `m7(b5)` sem 7ª (não exposto separado) |
| `C5` | Power chord | `5` (alias: `m5`) |

Detalhes da decisão de `dim = dim7` em
[ADR-0003](../adr/0003-dim-significa-dim7-cifra-br.md).

## Escalas: `letterSteps`

Para escalas com menos de 7 notas (pentatônica, blues, hirajoshi), o
`SCALE_DEFINITIONS` declara um array `letterSteps` que mapeia cada nota a
um passo de letra. Isso evita que `C-Eb-F-Gb-G-Bb` (blues) seja escrito
errado com letras saltando ou repetindo de forma inadequada:

```js
{
  id: "blues",
  semitones:   [0, 3, 5, 6, 7, 10],
  letterSteps: [0, 2, 3, 3, 4, 6],  // F e F# ambos na letra F+G; G e G na G
}
```

Ver `src/domain/scales.js`.

## Onde o pipeline preserva grafia

```
voicings (pianoVoicings/staffVoicings/voicings)
        ↓
  notationMatrix.chord()    ← grava { midi, spelling, spellingOctave }
        ↓
  drawStaff.midiToMeiPitch()  ← usa spelling se presente, senão midiToNote
        ↓
  Verovio (MEI XML)            ← renderiza letra + acidente correto
```

Para o piano, a grafia importa só como label/tooltip (o destaque é por MIDI).

## Auditoria

Dois scripts validam estas convenções automaticamente:

- `scripts/audit-spelling.mjs` — para cada (root × quality), gera a grafia
  esperada e compara com `pianoVoicings`/`staffVoicings`. **Deve retornar
  0 mismatches.**
- `scripts/render-notes.mjs --summary` — valida pitch classes (não a grafia).
