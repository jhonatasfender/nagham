# 0008 — `chordQualities.js` como fonte única dos intervalos de acorde

- **Status:** Accepted
- **Data:** 2026-05-12
- **Supersedes:** —

## Contexto

A definição de intervalos por qualidade de acorde estava replicada em
quatro arquivos, com formatos ligeiramente diferentes:

| Arquivo                                | Estrutura                                                         |
| -------------------------------------- | ----------------------------------------------------------------- |
| `src/domain/chord.js`                  | `QUALITY_TO_TONAL` — mapeia para nome usado pelo `@tonaljs/chord` |
| `scripts/audit-spelling.mjs`           | `QUALITY_INTERVALS` — `[[scaleDegree, semitones], ...]`           |
| `scripts/render-notes.mjs`             | `EXPECTED_INTERVALS_PC` — `[semitones, ...]`                      |
| `scripts/generate-guitar-voicings.mjs` | `INTERVAL_BY_QUALITY` — `[semitones, ...]`                        |

Adicionar uma nova qualidade (ex.: `6/9` recentemente) exigia mexer
em todos os quatro. Era trivial esquecer um — e quando esquecia, a
auditoria silenciosamente ignorava a qualidade nova.

O caso é idêntico ao da
[refatoração de cifras unificadas (ADR-0006)](0006-ascii-text-chord-symbol-style.md):
mesma informação modelada em 4 formatos.

## Decisão

`src/domain/chordQualities.js` é a fonte única. Para cada qualidade
declara:

```js
{
  tonal: "maj7",
  degrees: [[1, 0], [3, 4], [5, 7], [7, 11]],
}
```

Onde `degrees` é uma lista de `[scaleDegree, semitones-from-root]`.
Tudo o mais é derivado:

- `getQualityTonalType(q)` → tonal type string (usado por chord.js).
- `getQualityDegrees(q)` → original `[degree, semitones]` (usado por
  audit-spelling para inferir letter-step).
- `getQualityIntervals(q)` → só os semitons (`generate-guitar-voicings`).
- `getQualityPitchClasses(q)` → semitons mod 12 (`render-notes` e
  `generate-guitar-voicings`).
- `QUALITY_KEYS` → lista das qualidades disponíveis.

Os 4 arquivos antes mencionados agora importam destes helpers. Nenhuma
tabela local persiste.

## Consequências

- ➕ Adicionar qualidade nova = uma linha em `CHORD_QUALITIES`. Todos
  os scripts e o domínio passam a reconhecer imediatamente.
- ➕ Impossível ter intervalos divergentes entre o que o builder cria
  e o que a auditoria espera.
- ➕ Habilita futuras features (inversões, análise harmônica, mostrar
  o nome de cada intervalo de um acorde clicado) lendo direto da
  mesma tabela.
- ➖ A tabela vira "ponto de pressão" — qualquer erro nela contamina
  tudo. Mitigação: os audits validam que cada (root × quality) ainda
  produz o resultado esperado.
- 🔄 Caso surja necessidade de definir "qualidades alternativas"
  (ex.: voicings drop-2), a estrutura pode receber campos extras
  (`drop2`, `display`, etc.) sem quebrar o que existe.

## Alternativas consideradas

- **Deixar `QUALITY_TO_TONAL` no chord.js e exportar dali** — possível,
  mas mistura "como chamar no tonal" com "quais são os intervalos da
  qualidade". Separar deixa cada coisa no lugar certo.
- **Gerar a tabela em runtime via `@tonaljs/chord`** — tonal não expõe
  diretamente os semitons em formato compacto e isso adicionaria
  carga de runtime sem ganho.

## Referências

- `src/domain/chordQualities.js`.
- `docs/features/consolidate-domain-helpers/spec.md`.
- [ADR-0006](0006-ascii-text-chord-symbol-style.md) — mesmo padrão para cifras.
