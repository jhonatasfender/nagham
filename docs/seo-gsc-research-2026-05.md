# Pesquisa GSC + indexação Google — maio/2026

> Anotações da pesquisa feita em 2026-05-13 após o GSC retornar
> "Não foi possível ler o sitemap" para a propriedade
> `https://nagham-kappa.vercel.app/` recém-verificada. Sitemap é
> tecnicamente válido (xmllint OK, content-type `application/xml`,
> Googlebot UA recebe 200). O problema é do lado do GSC.

## TL;DR

- O erro **não é por conteúdo** — sitemap está correto em produção.
- Provável causa: **cache interno do GSC** após primeira tentativa de
  fetch que falhou (race-condition com Vercel CDN ou propagação do
  alias).
- Solução de baixo esforço: **re-submeter como `sitemap.xml?retry=1`**
  para que o GSC trate como URL nova e bypass o cache. Múltiplos
  relatos da comunidade confirmam que isso muda status pra "Success"
  em minutos.
- **2026 é o ano em que Google apertou indexação de domínios novos**:
  - 2–4 semanas pra primeiros indexed; 2–3 meses pra cobertura completa.
  - Request Indexing limitado a 10–12 URLs/dia/propriedade.
  - Backlinks externos viraram pré-requisito prático pra entrar no radar.

## Estados possíveis de sitemap no GSC

Segundo a [doc oficial](https://support.google.com/webmasters/answer/7451001):

| Status (en)       | Status (pt-BR)               | O que significa                                                  |
| ----------------- | ---------------------------- | ---------------------------------------------------------------- |
| **Success**       | Êxito / Sucesso              | Buscou e parseou OK; URLs vão pra fila de crawl                  |
| **Has errors**    | Contém erros                 | Buscou mas conteúdo tem erros de parse ou URLs inválidas         |
| **Couldn't fetch** | Não foi possível buscar     | Não conseguiu nem baixar o arquivo (HTTP error, bloqueio, etc.) |

A tradução pt-BR do GSC **mistura** "Couldn't fetch" e "Has errors" em
formas próximas como "Não foi possível buscar" / "Não foi possível ler".
Por isso é importante olhar o texto exato e o detalhe do erro, não só a
tradução.

## A causa real para sites recém-verificados

Vários relatos descrevem o mesmo padrão de comportamento:

1. Submetes o sitemap logo após verificar a propriedade.
2. O Googlebot tenta buscar imediatamente; pega o sitemap **enquanto o
   Vercel CDN ainda está propagando** o último deploy (ou enquanto a
   verificação da propriedade ainda está "fresca" internamente no GSC).
3. A primeira tentativa falha por algum motivo transitório.
4. **O GSC guarda esse resultado em cache** e re-submeter o mesmo URL
   não bypass o cache.

Documentado tanto na [comunidade do Google](https://support.google.com/webmasters/thread/3105916/sitemap-could-not-be-read-in-new-gsc?hl=en)
quanto em [um issue do vercel/next.js (#75836)](https://github.com/vercel/next.js/issues/75836)
com sintomas idênticos.

## Soluções da comunidade

### Opção A — Query string (recomendada, sem código)

```
sitemap.xml?retry=1
```

No GSC → Sitemaps → "Adicionar um novo sitemap", digitar exatamente
isso. O Google trata como URL nova → fetch fresh → bypass do cache.
Reports na comunidade descrevem mudança pra "Success" em minutos.

### Opção B — Renomear o arquivo

Gerar `sitemap-v2.xml` no build (ajustar `vite.config.js`
`seoArtifactsPlugin`) → submeter esse nome no GSC. Equivalente à
Opção A, mas requer code change + deploy.

### Opção C — Esperar

GSC re-tenta sitemaps periodicamente por "alguns dias" segundo a doc.
Eventualmente desiste se a falha persistir. Para sites novos, esperar
24–72h costuma resolver sozinho. Custo: tempo.

## Realidade do indexing em 2026

Coleta de fontes 2026 ([SEO-Hacker](https://seo-hacker.com/google-search-console-guide-2026/),
[ClickRank](https://www.clickrank.ai/search-console-indexing-enhancements/),
[IndexMachine](https://indexmachine.co/blog/google-stopped-indexing-new-sites-2025-2026-what-changed)):

### Linha do tempo típica para domínio novo

| Marco                              | Prazo                |
| ---------------------------------- | -------------------- |
| Primeiras 1–2 páginas indexadas    | 2–4 semanas          |
| Cobertura razoável (60–80%)        | 2–3 meses            |
| Cobertura completa                 | 3–6 meses            |
| Sem backlinks externos             | até 6 meses, ou nada |

### Limites do "Request Indexing"

- **10–12 URLs/dia/propriedade** via URL Inspection Tool.
- Pode variar com idade da propriedade e crawl health.
- Bloqueado nas primeiras horas após verificação (a propriedade precisa
  "amadurecer" no backend do Google).
- Mesmo após aceito, **leva 2–10 dias** pro Google de fato indexar.

### Sinais que aceleram indexação

1. **Backlinks externos**: 1 link de qualquer site existente já no índice
   acelera muito a descoberta. Exemplos práticos:
   - README do GitHub do projeto (público)
   - Post no LinkedIn / Twitter / X
   - Comment em comunidade (Reddit, dev.to, Hacker News) com link
2. **Sitemap submetido** (✅ feito, mas com erro pendente)
3. **Robots.txt com `Sitemap:` directive** (✅ feito)
4. **Internal linking** entre as próprias páginas (a Home já linka
   `/about`, `/chord-builder`, `/scales`)
5. **Core Web Vitals decentes** (LCP, CLS, FID/INP) — Google usa como
   sinal de qualidade. Pra Nagham: bundle de ~8.5MB compromete LCP;
   code-split de verovio/d3 ajudaria a longo prazo.

## Plano de ação ordenado (para Nagham especificamente)

1. **Hoje (5 min)** — Re-submeter no GSC como `sitemap.xml?retry=1`.
2. **Hoje (10 min)** — Adicionar backlink: post no GitHub README do
   `jhonatasfender/nagham` com link público pro deploy. Se já existir,
   confirmar que está visível na página inicial do repo.
3. **24–48h depois** — Voltar ao GSC → URL Inspection → Request
   Indexing pras 4 rotas:
   - `/`
   - `/about`
   - `/chord-builder`
   - `/scales`
4. **1 semana depois** — Rodar `site:nagham-kappa.vercel.app` no Google
   pra ver quantas páginas estão indexadas. Acompanhar GSC → Coverage.
5. **2–4 semanas depois** — Reavaliação. Se ainda 0 indexed, investigar:
   - Site tem conteúdo único o suficiente? (Páginas SPA podem parecer
     "thin content" pro Google)
   - Páginas pré-renderizadas têm texto suficiente? (Hoje só title +
     meta + noscript fallback — Googlebot roda JS mas devagar)
   - Considerar adicionar conteúdo textual estático em
     `dist/<rota>.html` (descrição da feature, exemplos) que continue
     sendo renderizado por React mas exista no HTML inicial.

## Para investigar depois (se necessário)

- **Pre-render do conteúdo principal** (não só meta tags) usando algo
  como [`vite-plugin-prerender`](https://www.npmjs.com/package/vite-plugin-prerender),
  `puppeteer-render`, ou migrar pra Astro/SvelteKit/Vike pra SSR real.
- **Code-splitting** do bundle: `verovio` (~2MB) e `d3` (~500kb)
  podem ir pra chunks dinâmicos carregados sob demanda.
- **Schema.org JSON-LD** mais rico — hoje só temos `WebApplication` na
  home. Cada rota poderia ter o seu (`AboutPage`, `WebPage`, etc.).
- **OpenGraph image dedicada** — hoje usa `/icons.svg`. Uma PNG/WebP
  1200×630 fica melhor no link preview de redes sociais.

## Fontes consultadas

### Documentação oficial

- [Sitemaps report — Google Search Console docs](https://support.google.com/webmasters/answer/7451001?hl=en)
- [Sitemap could not be read — community thread (GSC)](https://support.google.com/webmasters/thread/3105916/sitemap-could-not-be-read-in-new-gsc?hl=en)
- [Couldn't fetch sitemap(s) — community thread (GSC)](https://support.google.com/webmasters/thread/3280971/couldn-t-fetch-sitemap-s?hl=en)
- [Google Search Console error: Couldn't fetch XML sitemap — community thread](https://support.google.com/webmasters/thread/9766981/google-search-console-error-couldn-t-fetch-xml-sitemap?hl=en)
- [Sitemap couldn't fetch — community thread](https://support.google.com/webmasters/thread/205687657/sitemap-couldn-t-fetch?hl=en)

### Vercel-específico

- [vercel/next.js issue #75836 — "Sitemap couldn't fetch"](https://github.com/vercel/next.js/issues/75836)

### Tutoriais com a técnica do query-string

- [Sitemap couldn't fetch in Google Search Console - fix (dev.to)](https://dev.to/chocoscoding/sitemap-couldnt-fetch-in-google-search-console-fix-4983)
- [How to Fix the "Couldn't Fetch Sitemap" Error (Brand Activator)](https://www.brand-activator.eu/blog/how-to-fix-the-couldnt-fetch-sitemap-error-in-google-search-console)
- [Troubleshooting the "Couldn't Fetch" Error — Rank Math](https://rankmath.com/kb/couldnt-fetch-error-google-search-console/)
- [Couldn't Fetch Sitemap error Solved — Contenteum](https://contenteum.io/couldnt-fetch-sitemap-error-on-google-search-console-solved/)

### Diagnóstico "Couldn't read"

- [Fix "Sitemap could not be read" Error — WPAssist](https://wpassist.me/fix-search-console-sitemap-could-not-be-read-error/)
- ["Sitemap could not be read" error — w3tutorials.net](https://www.w3tutorials.net/blog/google-search-console-fails-to-fetch-sitemaps-sitemap-could-not-be-read/)
- [Sitemap Not Read — WooHelpDesk](https://www.woohelpdesk.com/blog/how-to-resolve-sitemap-not-read-error-in-google-search-console/)
- [Fixing the "Sitemap Could Not Be Read" Error — The Digital Hub](https://www.thedigitalhub.com.au/blog/fixing-the-sitemap-could-not-be-read-error-in-google-search-console/)
- [How to resolve sitemap.xml issues in GSC — SEO with EWE](https://seowithewe.co.uk/blog/how-to-resolve-sitemap-xml-issues-in-google-search-console/)
- [[Solved] sitemap could not be read — Medium](https://medium.com/@zahidbashirkhan/solved-sitemap-could-not-be-read-google-search-8380f54573d4)

### Timeline e mudanças 2026

- [How Long Before Google Index a New Website & Page? (CrawlWP)](https://crawlwp.com/how-long-before-google-index-new-website-page/)
- [Why Google Stopped Indexing New Sites in 2025–2026 (IndexMachine)](https://indexmachine.co/blog/google-stopped-indexing-new-sites-2025-2026-what-changed)
- [Search Console & Indexing Enhancements: Complete 2026 Guide (ClickRank)](https://www.clickrank.ai/search-console-indexing-enhancements/)
- [Google Search Console Request Indexing: Limits, Time, Steps & Fixes 2026 — Alev Digital](https://alevdigital.com/blog/google-search-console-request-indexing/)
- [Google Search Console: The Ultimate Guide for 2026 — SEO Hacker](https://seo-hacker.com/google-search-console-guide-2026/)
- [Google Reindex Time in 2026: 7 Triggers That Force Faster Indexing](https://www.masterseotool.com/blog/google-reindex-time-2026/)
- [Google Search Console News & Updates for April 2026](https://web.swipeinsight.app/topics/google-search-console)
