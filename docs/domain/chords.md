# Domínio: acordes

> Como o Nagham modela acordes. Para terminologia, ver
> [`glossary.md`](glossary.md); para grafia,
> [`notation-conventions.md`](notation-conventions.md).

## Modelo

Um acorde é uma combinação `(root, quality, bass?)`:

- **`root`** — string como `"C"`, `"F#"`, `"Bb"`. Aceita acidentes simples
  e double-acidentes (`"C##"`, `"Fb"`).
- **`quality`** — uma das chaves de `QUALITY_TO_TONAL` em
  `src/domain/chord.js`.
- **`bass`** — opcional; nota grave invertida (slash chord).

A partir disso, três funções extraem as notas:

| Função | Saída | Uso |
|---|---|---|
| `getChordNotes(root, quality, options)` | array de `{name, octave}` | dados dinâmicos (sidebar, áudio, fallback) |
| `getPianoChordVoicing(root, quality)` | array de `{name, octave}` | shape específica para piano |
| `getStaffChordVoicing(root, quality)` | idem | shape específica para partitura |
| `getChordVoicing(root, quality)` | array de `{stringIndex, fret}` | shape específica para violão |

Quando a voicing específica não existe, o fallback é o `chordNotes` dinâmico
(via `@tonaljs/chord`).

## Qualidades disponíveis

Listadas no chip do `ChordBuilderSection`:

### Tríades (3 notas)
| Chip | Quality | Intervalos | Exemplo (C) |
|---|---|---|---|
| `5` | `5` | 1-5 | C-G |
| `Maj` (triad) | `Maj` | 1-3-5 | C-E-G |
| `m` (triad) | `m` | 1-♭3-5 | C-E♭-G |
| `aug` | `aug` | 1-3-♯5 | C-E-G# |
| `sus2` | `sus2` | 1-2-5 | C-D-G |
| `sus4` | `sus4` | 1-4-5 | C-F-G |

### Tétrades (4 notas)
| Chip | Quality | Intervalos | Exemplo (C) |
|---|---|---|---|
| `6` | `6` | 1-3-5-6 | C-E-G-A |
| `m6` | `m6` | 1-♭3-5-6 | C-E♭-G-A |
| `7` | `7` | 1-3-5-♭7 | C-E-G-B♭ |
| `m7` | `m7` | 1-♭3-5-♭7 | C-E♭-G-B♭ |
| `maj7` | `maj7` | 1-3-5-7 | C-E-G-B |
| `m7(b5)` | `m7(b5)` | 1-♭3-♭5-♭7 | C-E♭-G♭-B♭ |
| `dim` (cifra BR) | `dim7` | 1-♭3-♭5-𝄫7 | C-E♭-G♭-B𝄫 |
| `add9` | `add9` | 1-3-5-9 | C-E-G-D |

### Pentades+
| Chip | Quality | Intervalos | Exemplo (C) |
|---|---|---|---|
| `6/9` | `6/9` | 1-3-5-6-9 | C-E-G-A-D |
| `9` | `9` | 1-3-5-♭7-9 | C-E-G-B♭-D |
| `m9` | `m9` | 1-♭3-5-♭7-9 | C-E♭-G-B♭-D |
| `M9` | `maj9` | 1-3-5-7-9 | C-E-G-B-D |
| `7(#9)` | `9+` | 1-3-5-♭7-♯9 | C-E-G-B♭-D# |
| `11` | `11` | 1-3-5-♭7-9-11 | C-E-G-B♭-D-F |
| `13` | `13` | 1-3-5-♭7-9-11-13 | C-E-G-B♭-D-F-A |

### Triade-major / Triade-minor compostos

O `ChordBuilderSection` permite combinar `Maj/m` + uma das extensões abaixo
(via `EXTENSION_COMPOSABLE_MAP` em `chord.js`): `5`, `6`, `7`, `9`. Resultado:
`m6`, `m7`, `m9`, `m5`, etc.

## Voicings: três representações paralelas

Para cada `(root, quality)` há até três entries (uma por instrumento):

| Diretório | Formato | Quem desenha |
|---|---|---|
| `src/domain/pianoVoicings/<Root>.js` | `[{name, octave}]` | `PianoView` (highlights por MIDI) |
| `src/domain/staffVoicings/<Root>.js` | `[{name, octave}]` | `StaffView` (renderiza grafia via `spelling`) |
| `src/domain/voicings/<Root>.js` | `[[string, fret]]` ou positions array | `GuitarView` |

**Roots cobertos** (piano + staff): C, C#, D, D#, E, F, G, A, B.
**Roots cobertos** (violão): + F#, G#, A# (aliases Db/Eb/Gb/Ab/Bb dirigem para os sharps).

Quando o usuário escolhe uma tônica sem voicing dedicado (ex.: `Db` no piano),
o fallback é o `chordNotes` dinâmico. A grafia ainda fica correta porque
`parseTonalNote` preserva a grafia teórica do `@tonaljs/chord`.

## Validação automática

Toda PR que toca em voicings deve passar:

```bash
node --import ./scripts/_resolver.mjs scripts/audit-spelling.mjs
node --import ./scripts/_resolver.mjs scripts/render-notes.mjs --summary
```

O primeiro valida grafia (regra letras distintas). O segundo valida pitch
classes (a altura está correta independente do nome).

## Geração assistida de voicings de violão

Se precisar adicionar uma nova qualidade ou refazer shapes de violão:

```bash
node --import ./scripts/_resolver.mjs scripts/generate-guitar-voicings.mjs
```

O script tenta encontrar um shape `fingerable` (span ≤ 4 trastes, com a
fundamental na corda mais grave) que cubra os pitch classes esperados.
Pseudocódigo: força bruta nas três cordas baixas como bass, busca os outros
trastes para cobrir os intervalos restantes. Shapes válidos preexistentes
são preservados.
