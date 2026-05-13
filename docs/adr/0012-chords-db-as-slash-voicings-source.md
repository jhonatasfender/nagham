# 0012 — chords-db como fonte de slash chord voicings

- **Status:** Accepted
- **Data:** 2026-05-13
- **Supersedes:** —

## Contexto

[ADR-0011](0011-musicca-as-voicings-source.md) adotou musicca.com como
fonte canônica de voicings de violão. Porém o dicionário do musicca **não
indexa slash chords** (acordes com baixo distinto, ex.: `C/G`, `D/F#`,
`Am/G`) — `_chords-source.json` cobre só `(root, quality)` plain.

Slash chords são essenciais em prática real:

- Caminho de baixo melódico (`C → C/B → Am`).
- Inversões idiomáticas (`D/F#`, `G/B`) abundantes em progressões pop/rock.
- Pedais (`Am/G`, `Am/F#` em bossa nova).

Sem fonte de referência, a app desenharia o mesmo shape de `C` para `C/G` —
ignora a função do baixo.

## Decisão

Usar [tombatossals/chords-db](https://github.com/tombatossals/chords-db)
(GitHub, MIT-style) como fonte canônica de slash chord voicings.

- **Por quê:** indexa explicitamente `(root, suffix-com-/)` para 4
  qualidades-base (`Maj`, `m`, `m9`, `7`) cruzadas com 12 baixos
  enarmônicos — ~289 entradas `(root, quality, bass)` e ~1.100 variações
  tocáveis após filtro de playability.
- **Snapshot pinado** a um SHA específico em `scripts/slash-voicings-cache/_chords-db.json`
  para reprodutibilidade.
- **Pipeline paralelo** ao do musicca: `fetch → extract → apply` em
  `scripts/slash-voicings/`. Não compartilha cache nem código com
  `scripts/musicca/` por isolamento.
- **Storage** em `src/domain/slashVoicings/<Root>.js` com schema:

  ```js
  const slashVoicings = {
    Maj: { G: [{ region, positions, barre }], E: [...] },
    m:   { G: [...], B: [...] },
    m9:  { G: [...] },
    7:   { G: [...] },
  };
  ```

- **Aliasing enarmônico** em `slashVoicings/index.js`: chord-db usa só 12
  raízes naturais + bemóis, então `D# ↔ Eb`, `G# ↔ Ab`, etc.

## Conversões necessárias

chord-db usa convenção diferente da nossa:

| Aspecto              | chord-db                       | Nosso                             |
| -------------------- | ------------------------------ | --------------------------------- |
| String index 0       | low E (E2=40)                  | high E (E4=64)                    |
| `frets[i]`           | relativo a `baseFret`          | absoluto                          |
| `positions`          | inclui cordas sob a pestana    | exclui cordas sob a pestana       |
| Acorde mudo          | `frets[i] = -1`                | ausente de `positions`            |

`scripts/slash-voicings/extract.mjs` aplica as conversões e valida que o
pitch class set do voicing seja subconjunto de `qualityPcs ∪ {bassPc}`, e
que a menor corda tocada produza a nota do baixo.

## Consequências

- ➕ Cobertura de ~1.100 slash voicings em 12 raízes, validados contra
  teoria.
- ➕ Pipeline reprodutível: SHA pinado, JSON commitado, audits derivam de
  source.
- ➕ Política `manual: true` herdada do musicca pipeline preserva
  correções editoriais.
- ➖ Cobertura assimétrica vs musicca: só 4 qualidades-base (Maj/m/m9/7);
  acordes como `C7/G` existem mas não `C9/G`, `Cmaj7/E`, etc.
- ➖ Slash chords são objetos novos no domínio — wiring em
  `GuitarView`/`ChordBuilderSection` é trabalho subsequente (ver
  feature spec).

## Alternativas consideradas

- **Curadoria manual** dos ~25 idiomáticos (`C/G`, `D/F#`, `G/B`...) —
  qualidade alta mas cobertura limitada; difícil escalar pra 12 raízes.
- **Geração algorítmica** das voicings existentes (mutar shape pra forçar
  bass na corda mais grave) — cobre tudo mas qualidade musical varia.
- **Crawler de site público** (cifraclub, ultimate-guitar) — todos
  bloqueiam bots ou indexam por música em vez de acorde.

## Referências

- `scripts/slash-voicings/{fetch,extract,apply}.mjs`
- `scripts/slash-voicings-cache/_chords-db.json`
- `src/domain/slashVoicings/`
- [tombatossals/chords-db](https://github.com/tombatossals/chords-db)
