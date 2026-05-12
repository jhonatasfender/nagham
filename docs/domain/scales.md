# Domínio: escalas

> Como o Nagham modela escalas. Para terminologia, ver
> [`glossary.md`](glossary.md); para grafia,
> [`notation-conventions.md`](notation-conventions.md).

## Modelo

Cada escala em `SCALE_DEFINITIONS` (em `src/domain/scales.js`) tem:

```js
{
  id: "major-ionian",
  semitones: [0, 2, 4, 5, 7, 9, 11],  // intervalos em semitons desde a tônica
  letterSteps: [0, 1, 2, 3, 4, 5, 6], // opcional; default = 0..N-1 para N=7
  approximate12Tet: false,             // true para escalas microtonais (maqam, hirajoshi)
  conceptualOnly: false,               // true para sistemas (raga, pelog, slendro)
}
```

- **`semitones`** define a **altura** de cada nota.
- **`letterSteps`** define a **letra** de cada nota — fundamental para a
  grafia correta em escalas não-heptatônicas. Sem `letterSteps`, o pipeline
  assume `[0, 1, …, semitones.length-1]` (que só está certo para escalas de
  7 notas).

## Escalas registradas

### Heptatônicas
| ID | Semitones | Notas (a partir de C) |
|---|---|---|
| `major-ionian` | [0,2,4,5,7,9,11] | C D E F G A B |
| `natural-minor` | [0,2,3,5,7,8,10] | C D E♭ F G A♭ B♭ |
| `harmonic-minor` | [0,2,3,5,7,8,11] | C D E♭ F G A♭ B |
| `melodic-minor` | [0,2,3,5,7,9,11] | C D E♭ F G A B (ascendente jazz) |
| `dorian` | [0,2,3,5,7,9,10] | C D E♭ F G A B♭ |
| `phrygian` | [0,1,3,5,7,8,10] | C D♭ E♭ F G A♭ B♭ |
| `lydian` | [0,2,4,6,7,9,11] | C D E F# G A B |
| `mixolydian` | [0,2,4,5,7,9,10] | C D E F G A B♭ |
| `locrian` | [0,1,3,5,6,8,10] | C D♭ E♭ F G♭ A♭ B♭ |
| `hungarian-minor` | [0,2,3,6,7,8,11] | C D E♭ F# G A♭ B |
| `arabic-maqam` | [0,1,3,5,7,8,10] | C D♭ E♭ F G A♭ B♭ (aproximação) |

### Não-heptatônicas (têm `letterSteps`)
| ID | Semitones | letterSteps | Notas (C) |
|---|---|---|---|
| `major-pentatonic` | [0,2,4,7,9] | [0,1,2,4,5] | C D E G A |
| `minor-pentatonic` | [0,3,5,7,10] | [0,2,3,4,6] | C E♭ F G B♭ |
| `blues` | [0,3,5,6,7,10] | [0,2,3,3,4,6] | C E♭ F F# G B♭ |
| `chinese-pentatonic` | [0,2,4,7,9] | [0,1,2,4,5] | C D E G A |
| `hirajoshi` | [0,2,3,7,8] | [0,1,2,4,5] | C D E♭ G A♭ |

### Conceituais (sem semitones — só rótulos)
- `thaat-raga-framework`, `pelog`, `slendro`

## Funções públicas

| Função | Saída | Quando usar |
|---|---|---|
| `buildScaleNotes(root, semitones, useFlats, opts)` | array de strings (`["C", "D", ...]`) | renderizar lista de notas |
| `buildScaleDegreeTriads(root, semitones, useFlats, opts)` | array de strings (`["C", "Dm", "Em", ...]`) | mostrar tríades por grau |
| `buildNaturalMinorTriadsWithBorrowedSixth(root, useFlats)` | idem | menor natural com II especial (ver tooltip i18n) |
| `buildScalesTableTriads(root, options)` | dispatcher | usado pela página `/scales` |
| `buildStepPattern(semitones)` | array de `"T"`, `"S"`, `"T+S"` | padrão de intervalos em escala |

`opts.letterSteps` deve ser passado em `buildScaleNotes` e
`buildScaleDegreeTriads` quando a escala tiver `letterSteps` declarado em
`SCALE_DEFINITIONS`. A página `/scales` faz isso automaticamente.

## Regra de grafia em escalas

Cada nota usa a **letra** correspondente ao `letterStep`. O acidente é
calculado para que a altura final bata com o `semitone`:

```
F# major:
  letter step 0 → letter F → +1 semitom → F#
  letter step 1 → letter G → +1 → G#
  letter step 2 → letter A → +1 → A#
  letter step 3 → letter B → +0 → B
  letter step 4 → letter C → +1 → C#
  letter step 5 → letter D → +1 → D#
  letter step 6 → letter E → +1 → E# ← (não "F"!)
```

A versão antiga colapsava `E#` em `F`, quebrando a regra de letras
distintas. Hoje a regra é honrada para qualquer tônica.

## Tríades nos graus

`buildScaleDegreeTriads` pega cada nota da escala como root e empilha as
notas dos índices `+2` e `+4` (mod `degreeCount`). Classifica como Maj, m,
dim ou aug a partir dos semitons resultantes.

**Caso especial:** `natural-minor` na função
`buildNaturalMinorTriadsWithBorrowedSixth` empresta a 6ª maior da menor
melódica ascendente **apenas no II grau**, para gerar `Dm` em vez de `D°` em
A menor. Convenção pedagógica brasileira (Ian Guest); documentada no
tooltip `scales.table.triadsNaturalMinorHybridHint`.
