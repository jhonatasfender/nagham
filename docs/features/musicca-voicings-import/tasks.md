# Tarefas: Importar voicings de violão a partir do musicca.com

Ver detalhes em [`plan.md`](./plan.md).

## Fundação
1. [x] **Task 1** — ADR-0011 + glossário + dependência `cheerio`
2. [x] **Task 2** — `scripts/musicca/slugs.js` (tabela de slugs)
3. [x] **Task 3** — `scripts/musicca/parseSvgDiagram.mjs` (parser puro)

## Pipeline
4. [x] **Task 4** — `scripts/musicca/fetch.mjs` (downloader com cache)
5. [x] **Task 5** — Popular cache (264+ fetches)
6. [x] **Task 6** — `scripts/musicca/extract.mjs` (orquestrador → `_extracted.json`)

## Integração
7. [x] **Task 7** — `voicings/index.js` preserva flag `manual`
8. [x] **Task 8** — Marcar `C Maj fret-5` como `manual: true`
9. [x] **Task 9** — `scripts/musicca/apply.mjs` (merge por fingerprint)
10. [x] **Task 10** — Rodar apply + validar audits + commit

## Finalização
11. [x] **Task 11** — README + spec shipped
