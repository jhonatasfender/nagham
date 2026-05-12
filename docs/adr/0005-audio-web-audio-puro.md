# 0005 — Áudio via Web Audio puro (sem Tone.js)

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

A app passou a oferecer reprodução sonora: clicar em uma nota toca a
altura correspondente, e há um botão "tocar acorde" no card de cifra. As
opções eram:

1. **[Tone.js](https://tonejs.github.io/)** — biblioteca completa para
   áudio musical, ~150 KB minified+gzip. Tem instrumentos, efeitos,
   transports, sequenciamento.
2. **[howler.js](https://howlerjs.com/)** — focado em playback de
   samples; precisaria fornecer arquivos de áudio.
3. **Web Audio API direto** — sem dependências; ~80 linhas de código
   produzem um sintetizador simples (triangle wave + lowpass + ADSR).

O uso atual da app é muito modesto: tocar uma nota individual ao clicar,
e fazer "strum" do acorde inteiro. Não há sequenciamento, automação,
síntese complexa nem necessidade de samples reais.

## Decisão

Implementamos áudio com **Web Audio API puro**, em
`src/audio/player.js` e `src/audio/useAudio.js`. Sem dependências externas.

Características:
- `AudioContext` criado lazy (no primeiro clique do usuário), atendendo
  a política de autoplay dos navegadores.
- Oscillator `triangle` → BiquadFilter lowpass → GainNode com ADSR
  (attack 5 ms, decay 80 ms, sustain 55 %, release 180 ms).
- `playNote(midi)` para nota única, `playChord(midis, {strumMs})` com
  strum opcional para acordes.
- Mute persistido em `localStorage`.
- Hook `useAudio()` expõe `playNote`, `playChord`, `muted`, `toggleMuted`.

## Consequências

- ➕ Bundle não cresce (≠ dos ~150 KB do Tone.js).
- ➕ Controle total sobre o timbre, fácil de evoluir (mudar wave, adicionar
  reverb, etc.).
- ➕ Sem manutenção de versões de lib externa.
- ➕ Política de autoplay respeitada por construção (context lazy, primeiro
  uso vem de gesture do usuário).
- ➖ Timbre simples (síntese subtrativa básica). Se quisermos sons mais
  realistas (piano de cauda etc.), teremos que adicionar samples ou
  migrar para Tone.js.
- ➖ Implementamos ADSR e strum manualmente — código a manter, embora
  pequeno.
- 🔄 Eventual instrumentação avançada (volume por nota, layer harmônicos)
  pode justificar revisitar esta decisão.

## Alternativas consideradas

- **Tone.js** — overkill para o caso atual; bundle pesado. Bom candidato
  se evoluirmos para sequenciamento.
- **Howler.js + samples** — qualidade tímbrica boa, mas adiciona ~5 MB
  em samples para cobrir 88 notas. Custo de download injustificável
  para app educacional simples.

## Referências

- [MDN — Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Tone.js](https://tonejs.github.io/) — alternativa não escolhida.
- `src/audio/player.js`, `src/audio/useAudio.js`
- Commit: `feat: guitar mobile scroll and audio playback on click`
