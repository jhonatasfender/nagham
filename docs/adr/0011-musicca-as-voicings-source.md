# 0011 — musicca.com como fonte de referência de voicings de violão

- **Status:** Accepted
- **Data:** 2026-05-13
- **Supersedes:** —

## Contexto

O gerador heurístico (`scripts/generate-guitar-voicings.mjs`) produz shapes
válidos teoricamente mas frequentemente subótimos musicalmente. Correção
manual caso a caso não escala para 264 (root × quality).

`musicca.com` publica voicings curados em formato consistente (SVG com
coordenadas fixas, `ul.guitar-chord-diagrams`) e é referência popular para
estudantes brasileiros junto com Cifra Club.

## Decisão

Usar musicca.com como **fonte canônica** de voicings de violão para o
Nagham. Importação é feita por pipeline `fetch → extract → apply` em
`scripts/musicca/`. Cache local em `scripts/musicca-cache/` é commitado
para diff reviewable.

Variações com `manual: true` em `src/domain/voicings/<Root>.js` são
imunes à sobrescrita automática — protege correções editoriais.

## Consequências

- ➕ Voicings alinhados com material de estudo que estudantes brasileiros
  já usam.
- ➕ Atualizações upstream visíveis como diffs no cache.
- ➕ Curações editoriais (`manual: true`) sobrevivem ao pipeline.
- ➖ Dependência de fonte externa cuja estrutura HTML pode mudar; mitigação
  é o cache local + atribuição clara.
- ➖ Nova dependência `cheerio` (HTML/CSS server-side). Justificada pelo
  trade-off de não usar Playwright/Chromium para esse escopo.
- 🔄 `package.json` ganha `cheerio` em `devDependencies`.
- 🔄 ADR-0010 (estrutura `{region, positions, barre}`) ganha um campo
  opcional `manual: boolean`.

## Alternativas consideradas

- **Continuar com gerador heurístico apenas:** descartado pelo trabalho
  curatorial não escalar.
- **Playwright headless:** descartado por overkill — musicca renderiza
  HTML estático suficiente sem JS hydration.
- **Cifra Club como fonte:** descartado porque o HTML deles é menos
  estruturado para extração programática.

## Referências

- [`docs/features/musicca-voicings-import/spec.md`](../features/musicca-voicings-import/spec.md)
- [musicca.com/pt/dicionario/acordes](https://www.musicca.com/pt/dicionario/acordes/)
- [ADR-0010](0010-estrutura-variacoes-violao.md) — estrutura `{region, positions, barre}`.
