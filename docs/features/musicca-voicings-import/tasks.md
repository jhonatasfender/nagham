# Tarefas: Importar voicings de violão a partir do musicca.com

Ver detalhes em [`plan.md`](./plan.md).

## Fundação
1. [ ] **Task 1** — ADR-0011 + glossário + dependência `cheerio`
2. [ ] **Task 2** — `scripts/musicca/slugs.js` (tabela de slugs)
3. [ ] **Task 3** — `scripts/musicca/parseSvgDiagram.mjs` (parser puro)

## Pipeline
4. [ ] **Task 4** — `scripts/musicca/fetch.mjs` (downloader com cache)
5. [ ] **Task 5** — Popular cache (264+ fetches)
6. [ ] **Task 6** — `scripts/musicca/extract.mjs` (orquestrador → `_extracted.json`)

## Integração
7. [ ] **Task 7** — `voicings/index.js` preserva flag `manual`
8. [ ] **Task 8** — Marcar `C Maj fret-5` como `manual: true`
9. [ ] **Task 9** — `scripts/musicca/apply.mjs` (merge por fingerprint)
10. [ ] **Task 10** — Rodar apply + validar audits + commit

## Finalização
11. [ ] **Task 11** — README + spec shipped
