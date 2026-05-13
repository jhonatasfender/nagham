# SEO do Nagham

Resumo das peças que fazem o site ser indexado pelo Google e por outros
buscadores, e o que precisa ser feito fora do repo (Vercel + Google
Search Console).

## Como o pre-render funciona

Como o Nagham é uma SPA (Vite + React + react-router-dom), o HTML servido
pelo Vercel só tem `<div id="root">` — Googlebot precisa renderizar JS
pra ver o conteúdo, o que reduz a qualidade da indexação.

A solução implementada: `vite.config.js` (plugin `seoArtifactsPlugin`)
gera 4 arquivos `.html` no `dist/`, um por rota indexável, cada um com
`<title>`, `<meta description>`, `<link rel="canonical">` e tags `og:*`
/ `twitter:*` corretos:

| Rota             | Arquivo gerado          | Origem das strings (i18n key)         |
| ---------------- | ----------------------- | ------------------------------------- |
| `/`              | `dist/index.html`       | `seo.pages.home.*` (pt-BR)            |
| `/about`         | `dist/about.html`       | `seo.pages.about.*`                   |
| `/chord-builder` | `dist/chord-builder.html` | `seo.pages.chordBuilder.*`          |
| `/scales`        | `dist/scales.html`      | `seo.pages.scales.*`                  |

`vercel.json` aplica rewrites pra cada rota antes do catch-all SPA:

```json
{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/about", "destination": "/about.html" },
    { "source": "/chord-builder", "destination": "/chord-builder.html" },
    { "source": "/scales", "destination": "/scales.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

URL no navegador permanece sem `.html`; o Vercel serve o conteúdo do
arquivo correto. Após hidratação, `react-helmet-async` (em `src/components/Seo.jsx`)
atualiza title/meta em navegações client-side.

## Estratégia de idioma

O pre-render usa as strings **pt-BR** como default (idioma principal do
projeto). Após hidratação, o usuário pode trocar para `en` ou `es`; o
Helmet atualiza tags em runtime mas o que vai pra indexação inicial é
pt-BR. Não há rotas por idioma (`/en/about`, `/es/about`) — se for
necessário no futuro, considerar geração de variantes hreflang.

## Variáveis de ambiente

`resolveSiteUrl()` em `vite.config.js` resolve a URL base na seguinte
ordem:

1. `VITE_SITE_URL` (env explícita; recomendado)
2. `VERCEL_PROJECT_PRODUCTION_URL` (alias estável do Vercel)
3. `VERCEL_URL` (URL do deployment, muda a cada deploy — fallback ruim)
4. `http://127.0.0.1:4173` (warning durante `vite preview`)

**No painel Vercel → Settings → Environment Variables**:

- Adicionar `VITE_SITE_URL=https://nagham-kappa.vercel.app` (ou o
  domínio custom quando houver) com escopo **Production**.

Se mudar pra domínio custom, atualizar essa variável no Vercel — todos
os canonical/sitemap/og:url vão regerar no próximo build.

## Google Search Console: passo a passo

1. Acesse https://search.google.com/search-console.
2. **Add property** → escolha **URL prefix** → cole
   `https://nagham-kappa.vercel.app/` (ou o domínio custom).
3. Métodos de verificação suportados:
   - **HTML tag** (mais simples) — Google dá uma `<meta name="google-site-verification" content="...">`.
     Cole **dentro de `<head>`** em `index.html` deste repo, faça commit/deploy,
     volte ao GSC e clique **Verify**.
   - **HTML file** — Google dá um arquivo `googleXXXXXXX.html`. Coloque
     em `public/` (Vite copia pro `dist/` no build).
   - **DNS** — só se você tiver controle do DNS do domínio custom.
4. Depois de verificado, em **Sitemaps** → adicione
   `https://nagham-kappa.vercel.app/sitemap.xml`.
5. Em **URL Inspection** → cole cada URL (`/`, `/about`, `/chord-builder`,
   `/scales`) → clique **Request indexing** para acelerar a primeira
   coleta.
6. Acompanhar em **Coverage** depois de 2–7 dias.

## Checklist de auditoria local

Antes de cada deploy importante:

```bash
VITE_SITE_URL=https://nagham-kappa.vercel.app npm run build
ls dist/*.html                # devem aparecer 4 HTMLs
grep '<title>' dist/scales.html
grep canonical dist/about.html
cat dist/sitemap.xml          # URLs devem usar o domínio canônico
cat dist/robots.txt           # `Sitemap:` no final deve apontar pro domínio canônico
```

## O que ainda não está coberto

- **hreflang** por idioma (a app troca i18n no client, sem rotas por
  idioma). Se quiser indexar versões `en`/`es` separadamente, precisa
  reestruturar as rotas.
- **Bundle de ~8.5 MB** afeta Core Web Vitals (sinal de ranking).
  Code-split de `verovio` e do d3 ajudaria.
- **Server-side rendering**: nada que o pre-render não cubra para as
  4 rotas atuais. Se a quantidade de rotas crescer, considerar Astro
  ou Vike.
