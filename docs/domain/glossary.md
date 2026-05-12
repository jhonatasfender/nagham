# Glossário do domínio musical

> Vocabulário ubíquo do Nagham. Cada termo aqui é usado **exatamente** assim
> no código, nas strings de UI, nos commits e nas demais especificações.
> Quando um termo precisa ser introduzido, registre aqui antes (ou junto com)
> o código que o usa.

## Convenções de notação

- **Cifra (brasileira)** — sistema de rotulagem de acordes com letras (A-G)
  e sufixos. Convenção dominante em MPB e bossa: `C°` = dim7; `Cm7(♭5)` =
  meio-diminuto; alterações entre parênteses.
- **Lead sheet (americana)** — sistema anglófono com convenções ligeiramente
  diferentes (ex.: `Cdim` pode ser tríade; `m7♭5` sem parênteses; `M7` raro).
- **Grafia enarmônica** — duas notas com a mesma altura (MIDI) mas nomes
  diferentes. Ex.: `F#` e `G♭` soam idênticos. Ver
  [`notation-conventions.md`](notation-conventions.md).
- **Grafia teórica estrita** — usar a letra correspondente ao grau (3ª na
  letra do 3º letter step, 5ª no 5º, etc.). Pode exigir double-acidentes.
- **Hard enharmonic** — nome com double-acidente (`F##`, `B♭♭`, `C♭`) ou que
  cruza a oitava (`B#` soa como `C` da próxima oitava).
- **Regra de letras distintas** — cada nota de um acorde ou escala diatônica
  usa uma letra diferente (do conjunto `C D E F G A B`). Aplica-se a tríades,
  tétrades e escalas heptatônicas. Para hexatônicas/pentatônicas existem
  letter-steps explícitos por escala.

## Acordes

- **Acorde (chord)** — conjunto de duas ou mais notas tocadas simultaneamente.
- **Tríade** — acorde de três notas; root + 3ª + 5ª (Maj, m, dim, aug, sus2, sus4).
- **Tétrade** — acorde de quatro notas (7, m7, maj7, dim7, m7♭5, 6, m6, add9, 6/9).
- **Qualidade (quality)** — tipo do acorde (Maj, m, dim, dim7, etc.). No
  Nagham é uma string em `src/domain/chord.js` (`QUALITY_TO_TONAL`).
- **Voicing** — distribuição específica das notas (qual oitava, qual ordem).
  Diferente em piano (`src/domain/pianoVoicings/`), partitura
  (`src/domain/staffVoicings/`) e violão (`src/domain/voicings/` — usa
  pares `[corda, casa]`).
- **Cifra de baixo / slash chord** — acorde com baixo invertido, ex.: `C/E`
  (acorde de C com Mi no baixo). Suportado via parâmetro `bass`.
- **Inversão** — acorde com nota diferente da fundamental como mais grave.
  Atualmente só implementada via `bass` (sem análise automática).
- **Variação (de acorde no violão)** — outra forma do mesmo acorde no
  braço, com mesmas pitch classes mas distribuição de oitavas e/ou
  região do braço diferentes. No Nagham, é uma posição no array de
  variações de `(root, quality)` em `src/domain/voicings/<Root>.js`.
  **Distinto de inversão**: inversão muda a nota mais grave; variação
  pode ou não mudar.
- **Região (de variação)** — chave semântica em cada variação:
  `"open"` (envolve cordas soltas ou começa no traste 1) ou `"fret-N"`
  (começa no traste N, com N de 1 a 12). Define o rótulo i18n pedagógico
  ("Aberto", "3ª casa", etc.).
- **Chord-card** — diagrama vertical compacto de acorde (formato Cifra
  Club / musicca / Songsterr), com nut/badge de casa, marcadores ×/○,
  círculos preenchidos nas casas pressionadas e pílula horizontal para
  pestana. Renderizado por `drawChordCard.js` em SVG via d3. Distinto do
  braço horizontal completo (`drawGuitar.js`).
- **Dominante** — acorde com tétrade `1-3-5-♭7` (`C7`, `G7`). Resolve
  tipicamente para a tônica.
- **Dim / Diminuto** — no Nagham, "dim" no UI = `dim7` (cifra BR). Quem quer
  a tríade diminuta usa `m7(♭5)` sem a 7ª (ainda não exposto como chip
  separado — ver [ADR-0003](../adr/0003-dim-significa-dim7-cifra-br.md)).
- **Meio-diminuto** — `m7(♭5)` ou `ø` ou `ø7`: tríade diminuta + 7ª menor.
- **Power chord** — `5`: só fundamental + 5ª (sem 3ª). `m5` é alias para `5`.
- **6/9** — tétrade (na verdade pentade) `1-3-5-6-9` típica de bossa nova.

## Escalas

- **Escala** — sequência ordenada de notas dentro de uma oitava.
- **Tônica (root)** — nota inicial da escala. Define o nome (`C major`, `D minor`).
- **Grau (degree)** — posição da nota na escala (`I`, `ii`, `iii`, etc.).
- **Modo** — escala derivada da maior começando em outro grau (dórico = ii,
  frígio = iii, etc.).
- **Semitone** — menor intervalo do 12-TET; corresponde a 1 traste no violão.
- **Letter step** — quantos passos de letra cada nota da escala "anda" desde
  a tônica. Para escalas heptatônicas (7 notas) é sempre `[0,1,2,3,4,5,6]`;
  para pentatônicas/hexatônicas é declarado em `SCALE_DEFINITIONS.letterSteps`.
- **Tríade no grau** — tríade construída sobre cada grau da escala. Em maior:
  `I, ii, iii, IV, V, vi, vii°`.
- **Menor harmônica** — natural com 7ª aumentada (ascende sempre).
- **Menor melódica** — natural com 6ª e 7ª aumentadas (forma ascendente; a
  descendente clássica = natural minor). Nagham usa a forma ascendente em
  contexto jazz.

## Intervalos e MIDI

- **Pitch class (pc)** — uma das 12 alturas (0-11); equivalente a `MIDI % 12`.
- **MIDI** — número inteiro 0-127 representando uma altura específica.
  `C4 = 60`. Nagham trata todas as comparações de altura em MIDI.
- **Trítono** — intervalo de 6 semitons. Escrito `#4` (resolve para fora,
  ex.: `F# → G`) ou `♭5` (resolve para dentro, ex.: `G♭ → F` em V7→I).

## Pipeline de renderização

- **`spelling`** — campo no modelo de nota que preserva a grafia original
  (`F##`, `B♭`, etc.) através do `notationMatrix.chord()`. Sem ele, o staff
  rendering perderia a grafia teórica ao converter via MIDI.
- **`spellingOctave`** — oitava casada com `spelling`. Necessária quando o
  nome cruza oitava (`B#4` ↔ `C5`).
- **Verovio** — engine que renderiza partitura via MEI XML em
  `src/views/Staff/drawStaff.js`.

## Mobile e toque

- **Touch target** — área tocável mínima 44 × 44 px (Apple HIG) / 48 dp
  (Material).
- **pointerdown** — evento usado para disparar notas no toque, em vez de
  `click`. Garante que pequenos movimentos do dedo não cancelem a interação.
- **`touch-action: manipulation`** — CSS que remove delay de 300 ms iOS e
  impede gestos de zoom acidentais.
