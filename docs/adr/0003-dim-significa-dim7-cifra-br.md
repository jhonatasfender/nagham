# 0003 — "dim" no UI significa dim7 (cifra brasileira)

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

A notação para acordes diminutos varia entre tradições:

- **Cifra brasileira (MPB, Almir Chediak, Cifra Club):** `F°` ou `Fdim`
  sozinho refere-se à **tétrade dim7** (`F – A♭ – C♭ – E♭♭`). Para a
  tríade diminuta, usa-se `Fm(♭5)`, `F-5` ou `Fm5−`. Símbolo dominante
  entre estudantes brasileiros de violão.
- **Berklee / lead sheet americano:** `Fdim` sem `7` é, estritamente, a
  tríade diminuta (`F – A♭ – C♭`). Para a tétrade, escreve-se `Fdim7` ou
  `F°7`.
- **Real Books (jazz):** prática descuidada; muitos usam `F°` querendo
  dizer `F°7`.
- **Análise clássica (algarismos romanos):** `vii°` sempre é tríade; `vii°7`
  é tétrade.

A app é em PT-BR e mira público brasileiro. Antes desta ADR, oferecia
**dois chips separados**: `dim` (tríade, 3 notas) e `dim7` (tétrade, 4
notas). Usuários reportaram que esperavam 4 notas ao clicar em `dim`.

## Decisão

No UI, oferecemos **apenas o chip `dim`** mapeado para a tétrade `dim7`
internamente. Quem precisa da tríade diminuta de 3 notas usa `m7(♭5)` (que
é o meio-diminuto, 4 notas) — a tríade pura tem uso muito limitado em
cifra popular e pode ser readicionada como chip separado se demanda surgir.

Mudanças concretas:

1. `CHORD_QUALITIES_REST` em `src/components/ChordBuilderSection/constants.js`
   não inclui mais `"dim"`.
2. `extensionChipLabel("dim7") → "dim"` (chip mostra "dim" no botão).
3. `qualityToDisplaySuffix("dim7") → "dim"` (label do acorde mostra `Cdim`,
   não `Cdim7`).
4. Tooltip explicativo em `chordBuilder.qualityHintDim` (PT-BR/EN/ES).

A entrada `dim` (tríade) **ainda existe nos arquivos de voicing** — não
foi apagada, apenas escondida do UI. Pode ser reexposta no futuro.

## Consequências

- ➕ Alinha com expectativa do público brasileiro (cifra Chediak / Cifra Club).
- ➕ Reduz confusão: um único chip "dim", um único significado.
- ➕ O label `Fdim` na barra de acorde fica claro: tem 4 notas.
- ➖ Estudantes acostumados à convenção americana podem se surpreender.
  Mitigação: tooltip explica explicitamente, com exemplo de notas.
- ➖ A tríade diminuta pura ficou inacessível pelo UI (mas continua
  acessível pelo código se necessário).

## Alternativas consideradas

- **Manter os dois chips** — `dim` (tríade) e `dim7` (tétrade). Usuários
  reportaram que isso é confuso para o público brasileiro.
- **Renomear chips para `m(♭5)` e `°7`** — mais explícito mas raramente
  visto na cifra popular; pioraria a usabilidade.

## Referências

- [Cifra Club — Padrão de cifragem](https://suporte.cifraclub.com.br/pt-BR/support/solutions/articles/64000308284-conheca-o-padr%C3%A3o-de-cifragem-de-acordes-do-cifra-club)
- [Wikipedia — Acorde diminuto (pt)](https://pt.wikipedia.org/wiki/Acorde_diminuto)
- Commit: `fix(chord-builder): align 'dim' label with Brazilian cifra convention`
