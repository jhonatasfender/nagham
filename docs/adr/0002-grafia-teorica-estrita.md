# 0002 — Grafia teórica estrita por padrão

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

Notas musicais têm múltiplas representações enarmônicas: `F#` e `G♭` soam
idênticos, `F𝄪` e `G` também. A teoria clássica/jazz exige que cada nota
de um acorde ou escala diatônica ocupe **uma letra distinta** da sequência
`C-D-E-F-G-A-B`. Isso obriga, em alguns contextos, a usar **double
accidentals** (`F##`, `B♭♭`, `C♭`):

- D# major: D# – **F##** – A# (não D# – G – A#).
- C dim7: C – E♭ – G♭ – **B♭♭** (não C – E♭ – G♭ – A).
- F dim7: F – A♭ – C♭ – **E♭♭** (não F – A♭ – B – D).

Cifras populares brasileiras simplificam estes casos com enarmônicos
"naturais" (G no lugar de F##, A no lugar de B♭♭). Em partitura clássica
ou jazz formal, isso é incorreto: a leitura visual quebra (intervalos
ficam ambíguos) e a teoria perde rigor.

A app declara missão pedagógica ("evoluir para uma plataforma completa de
teoria musical"). Aceitar simplificações enarmônicas conflita com isso.

## Decisão

Por padrão, todas as voicings (piano, partitura, violão) e funções de
domínio usam **grafia teórica estrita**: cada nota usa a letra
correspondente ao seu grau, com o acidente necessário (inclusive duplo).

Implementação:

1. `noteToMidi` em `src/domain/notes.js` aceita acidentes duplos e nomes
   que cruzam oitava (`B#`, `C♭`), via `pitchNameToSignedOffset`.
2. `notationMatrix.chord()` preserva `spelling` e `spellingOctave` ao
   construir a matriz para o Verovio.
3. `drawStaff.midiToMeiPitch` usa esses campos para renderizar a letra e
   acidente corretos (em vez de derivar tudo de MIDI).
4. `pianoVoicings/*`, `staffVoicings/*` foram reescritos com grafia estrita
   (ver commits da branch principal entre 2026-05-11 e 2026-05-12).
5. `scripts/audit-spelling.mjs` valida que toda voicing está consistente
   com a grafia esperada; deve retornar 0 mismatches.

## Consequências

- ➕ Partitura coerente e pedagogicamente correta em todas as tonalidades,
  incluindo as raras (D# major, F# major, C# major, Gb major).
- ➕ A app pode ser usada como referência teórica sem ressalvas.
- ➕ Eliminamos uma fonte de inconsistência: piano voicing e staff voicing
  agora sempre concordam.
- ➖ Usuários iniciantes podem estranhar ver `F##` em vez de `G`. Mitigação:
  o piano só destaca a tecla; a estranheza fica restrita ao texto e ao
  pentagrama, onde a notação estrita é a esperada.
- ➖ Cifras impressas em songbooks populares podem usar grafia mais simples.
  A app não tenta "imitar" exatamente o que o usuário viu no songbook — ela
  é uma referência teórica.

## Alternativas consideradas

- **Grafia popular (simplificada)** — usar G no lugar de F##, A no lugar
  de B♭♭. Mais fácil de ler, mas perde rigor pedagógico e cria inconsistência
  visual no pentagrama (acidente "errado" para a leitura).
- **Toggle global "estrita vs popular"** — possível no futuro, mas adiciona
  complexidade. O toggle `useFlats` já existente continua funcionando para
  a escolha sustenidos/bemóis simples.

## Referências

- `scripts/audit-spelling.mjs`
- [Wikipedia — Enharmonic equivalence](https://en.wikipedia.org/wiki/Enharmonic)
- Commits: `fix: strict theoretical spelling for chord notes across all qualities`,
  `fix: theoretical spelling for scales, chord notes, and quality cleanup`.
