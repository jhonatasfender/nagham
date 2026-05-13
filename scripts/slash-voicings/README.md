# scripts/slash-voicings/ — Importador de slash chords

Pipeline em 3 etapas para sincronizar `src/domain/slashVoicings/<Root>.js`
com [tombatossals/chords-db](https://github.com/tombatossals/chords-db).
Veja [ADR-0012](../../docs/adr/0012-chords-db-as-slash-voicings-source.md).

## Fluxo

```text
fetch.mjs   →   slash-voicings-cache/_chords-db.json
                       ↓
                extract.mjs   →   slash-voicings-cache/_extracted.json
                       ↓
                  apply.mjs   →   src/domain/slashVoicings/<Root>.js
```

`_chords-db.json` é o `guitar.json` do repo `tombatossals/chords-db`,
pinado a um SHA específico (ver `PINNED_SHA` em `fetch.mjs`). Commitamos
o cache pra que mudanças upstream apareçam como diffs revisáveis.

## Comandos

```bash
# 1. Baixar (pula cache existente; --force pra redownload).
node --import ./scripts/_resolver.mjs scripts/slash-voicings/fetch.mjs
node --import ./scripts/_resolver.mjs scripts/slash-voicings/fetch.mjs --force

# 2. Extrair → _extracted.json. Roda validação: pitch classes ⊆ (quality + bass)
#    e bass = corda mais grave que toca. Rejeições vão pra _errors.log.
node --import ./scripts/_resolver.mjs scripts/slash-voicings/extract.mjs

# 3. Aplicar nos arquivos do domínio. Filtro de playability (≤4 dedos)
#    e merge por fingerprint preservando manual:true.
node --import ./scripts/_resolver.mjs scripts/slash-voicings/apply.mjs --dry-run
node --import ./scripts/_resolver.mjs scripts/slash-voicings/apply.mjs
```

## Diferenças vs `scripts/musicca/`

| Aspecto                       | musicca                        | chords-db                          |
| ----------------------------- | ------------------------------ | ---------------------------------- |
| Fonte                         | musicca.com (HTTP cache)       | github.com (JSON pinado a SHA)     |
| Cobertura                     | 21 qualidades                  | 4 qualidades-base × 12 baixos      |
| String index na fonte         | 0 = high E (igual ao nosso)    | 0 = low E (invertido)              |
| `positions` na fonte          | só finger dots (sem pestana)   | inclui cordas sob a pestana        |
| Frets na fonte                | absolutos                      | relativos a `baseFret`             |

## Schema dos arquivos gerados

```js
const slashVoicings = {
  Maj: {
    G: [
      { region: "open",   positions: [...], barre: null },
      { region: "fret-3", positions: [...], barre: { fret: 3, strings: [...] } },
    ],
    E: [...],
  },
  m:  { G: [...], B: [...] },
  m9: { G: [...] },
  7:  { G: [...] },   // só uma entrada 7/G no chord-db
};
```

## Variações manuais (`manual: true`)

Mesma política do musicca pipeline: variações em
`src/domain/slashVoicings/<Root>.js` com `manual: true` não são
sobrescritas por `apply.mjs`. Use pra fixar correções editoriais que
diferem do chord-db.

## Aliasing enarmônico

chord-db indexa só 12 raízes (`C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B`).
`src/domain/slashVoicings/index.js` faz aliasing simétrico:
`D# ↔ Eb`, `G# ↔ Ab`, `A# ↔ Bb`, `Db ↔ C#`, `Gb ↔ F#`.

## Atribuição

Shapes vêm de tombatossals/chords-db (MIT-style). O cache local em
`scripts/slash-voicings-cache/` é commitado.
