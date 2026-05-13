# scripts/musicca/ — Importador de voicings do musicca.com

Pipeline em 3 etapas para sincronizar `src/domain/voicings/<Root>.js`
com [musicca.com/pt/dicionario/acordes](https://www.musicca.com/pt/dicionario/acordes/).
Veja [ADR-0011](../../docs/adr/0011-musicca-as-voicings-source.md) e
[a feature spec](../../docs/features/musicca-voicings-import/spec.md).

## Fluxo

```text
fetch.mjs   →   musicca-cache/<slug>.html
                       ↓
                extract.mjs   →   musicca-cache/_extracted.json
                  ↑ (lê _chords-source.json,
                     o JSON estático do React app)
                       ↓
                                   apply.mjs   →   src/domain/voicings/<Root>.js
```

Nota: durante a implementação descobrimos que `musicca.com` é uma React
app — os HTMLs cacheados em `<slug>.html` não contêm os SVGs dos diagramas
inline. Os dados reais estão em
`https://www.musicca.com/files/scripts/finders/chords-guitar-ukulele.json`
e são baixados manualmente para `scripts/musicca-cache/_chords-source.json`
(também commitado). O `extract.mjs` lê desse JSON. O cache de HTMLs serve
como documentação das páginas e ponto de partida caso o JSON mude de URL.

## Comandos

```bash
# 1. Baixar HTMLs do dicionário (idempotente — pula cache existente).
#    Documentação das páginas; não é a fonte direta dos voicings.
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs --force  # força redownload
node --import ./scripts/_resolver.mjs scripts/musicca/fetch.mjs C Maj    # apenas um chord

# 2. Parsear o JSON estático → _extracted.json.
#    (_chords-source.json precisa estar presente em scripts/musicca-cache/.)
node --import ./scripts/_resolver.mjs scripts/musicca/extract.mjs

# 3. Aplicar merge nos voicings.
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs --dry-run
node --import ./scripts/_resolver.mjs scripts/musicca/apply.mjs
```

## Rate limit

`fetch.mjs` dorme 1.1s entre requisições. Não suba isso sem necessidade.

## Atribuição

Os shapes vêm de musicca.com. O cache local em `musicca-cache/` é
commitado para que mudanças upstream apareçam como diffs revisáveis.

## Variações manuais (`manual: true`)

Variações em `<Root>.js` com campo `manual: true` NÃO são sobrescritas
pelo `apply.mjs`. Use isso para preservar correções editoriais que
diferem do musicca.

Exemplo já em uso: `C Maj fret-5 barre` (corrigido em commit dedicado e
marcado como manual em Plan-Task 8 da feature).

## Filtros aplicados em `apply.mjs`

- **Playability**: variações com mais de 4 dedos independentes (após
  considerar pestana) são descartadas. Espelha o algoritmo de
  `scripts/check-playability.mjs`.
- **Fingerprint**: variações nossas que coincidem com alguma do musicca
  por positions + barre são preservadas; demais nossas são descartadas
  (exceto `manual: true`).
