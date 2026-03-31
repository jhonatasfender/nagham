# Guia para agentes (Nota / Nagham)

Este ficheiro resume o projeto para assistentes de código e ferramentas de IA. O pacote npm chama-se **nota**; o produto e textos públicos (por exemplo `public/llms.txt`) usam o nome **Nagham** — aplicação web para estudar notas e acordes com vistas sincronizadas (partitura, piano, violão).

## Stack

- **Runtime:** React 19, Vite 8, ES modules (`"type": "module"`).
- **Routing:** `react-router-dom` 7 (`BrowserRouter` em `src/main.jsx`).
- **Estilo:** Tailwind CSS 4 + PostCSS; classes compostas com `clsx` + `tailwind-merge` via `src/utils/cn.js`.
- **i18n:** `i18next` / `react-i18next`; idioma por defeito **pt-BR**, fallback pt-BR; ficheiros em `src/i18n/locales/*.json`; persistência em `localStorage` (`i18nextLng`).
- **SEO no cliente:** `react-helmet-async` (`HelmetProvider` em `main.jsx`); componente `src/components/Seo.jsx`.
- **Teoria musical:** `@tonaljs/chord` em `src/domain/chord.js`; notas/MIDI em `src/domain/notes.js`.
- **Gráficos:** D3 nas vistas em `src/views/*/` (desenho em `draw*.js`, componente React em `*View.jsx`).
- **Qualidade:** ESLint 9 (flat config), Prettier.

Não há script de testes no `package.json` (não assumir Jest/Vitest até ser adicionado).

## Estrutura de pastas (resumo)

| Área                | Caminho                              | Função                                                                                                   |
| ------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Entrada             | `src/main.jsx`, `src/App.jsx`        | Bootstrap, rotas de alto nível                                                                           |
| Páginas             | `src/pages/`                         | `Home` (visor principal sincronizado), `About`, `ChordBuilder`, `Scales`                                 |
| UI reutilizável     | `src/components/`                    | Cabeçalho, SEO, listas, secção do construtor de acordes na home, etc.                                    |
| Domínio             | `src/domain/`                        | Lógica pura: notas, acordes, braço, matrizes, _voicings_ (piano/partitura/violão). **Sem React nem D3.** |
| Vistas D3           | `src/views/Staff`, `Piano`, `Guitar` | Um componente `*View.jsx` + módulos `draw*.js` e auxiliares                                              |
| D3 partilhado       | `src/d3/`                            | Escalas e helpers reutilizáveis entre vistas                                                             |
| Estado global       | `src/context/`                       | Por exemplo nota selecionada (`SelectedNoteProvider`)                                                    |
| i18n                | `src/i18n/`                          | Inicialização + JSON por língua                                                                          |
| Scripts de build    | `scripts/`                           | Geração de artefactos estáticos (ver abaixo)                                                             |
| Documentação humana | `docs/`                              | `frontend-architecture.md` descreve convenções de pastas e D3 em detalhe                                 |

## Rotas e SEO — manter alinhado

Ao adicionar ou alterar uma rota:

1. **`src/App.jsx`** — `<Route path="..." />`.
2. **`src/components/Seo.jsx`** — mapa `ROUTE_PAGE_KEY` e chaves `seo.pages.*` nos JSON de `src/i18n/locales/` (título, descrição).
3. **`vite.config.js`** — plugin `seoArtifactsPlugin`: array `routes` em `closeBundle` (usado para `sitemap.xml` em produção).
4. **`public/llms.txt`** — secção “Aplicação (páginas)” se quiseres consistência com documentação para LLMs.

A home (`/`) concentra o fluxo principal com `ChordBuilderSection` e as três vistas; `/chord-builder` é uma página separada focada no diagrama do braço (estado local, não o mesmo reducer da home).

## Build e artefactos

- **`npm run generate:notes-xml`** — executa `scripts/generate-notes-index.mjs`, que importa `src/domain/notes.js` e grava `public/notes-index.xml`.
- **`prebuild`** chama `generate:notes-xml` antes de `vite build`.
- **Sitemap / robots em `dist`:** o plugin Vite só escreve `dist/sitemap.xml` e anexa `Sitemap:` a `robots.txt` quando existe URL base: variável **`VITE_SITE_URL`** ou **`VERCEL_URL`** (ver `resolveSiteUrl()` em `vite.config.js`).

## Comandos úteis

```bash
npm run dev              # servidor de desenvolvimento
npm run build            # gera XML de notas + build de produção
npm run lint             # ESLint
npm run lint:fix
npm run format           # Prettier
npm run preview          # pré-visualizar dist
```

## Convenções de código

- **`domain/`:** apenas JS puro; pode importar `@tonaljs/*` e outros utilitários; não importar React/D3.
- **Views:** padrão documentado em `docs/frontend-architecture.md` — `*View.jsx` com `ref`/`useEffect`, desenho em `draw*.js` sem estado React.
- **Classes CSS:** preferir `cn(...)` para fundir classes Tailwind condicionais.
- **Novas strings visíveis ao utilizador:** adicionar entradas nos três ficheiros de locale (pt-BR, en, es), não só num deles.

## Layout responsivo e breakpoints

- **Tailwind 4** usa os breakpoints por defeito (`sm` 640px, `md` 768px, `lg` 1024px, etc.); não há `tailwind.config.js` — personalizações em [`src/index.css`](src/index.css) com `@theme` se necessário.
- **Âncora principal:** `lg` (1024px) = layout “desktop”: duas colunas na home, navegação horizontal no cabeçalho. Abaixo de `lg`, coluna única e menu móvel.
- **Classes partilhadas** (definidas em `index.css`, `@layer components`): `shell-page` (contentor principal com padding responsivo), `home-layout`, `home-sidebar`.
- **Vistas D3** (partitura, piano, violão): largura máxima de desenho partilhada em `src/constants/layout.js` (`VIEW_MAX_WIDTH`); o contentor é medido com `useContainerSize` para redesenhar ao redimensionar.

## Ficheiros estáticos relevantes

- `public/robots.txt`, `public/llms.txt` — política de crawlers e resumo do site.
- `public/notes-index.xml` — gerado; não editar à mão de forma duradoura sem alterar o script ou o domínio em `notes.js`.

Para decisões de arquitetura mais profundas (fluxo da nota selecionada, D3, escalas), seguir `docs/frontend-architecture.md` e, se existir, `docs/braco-do-violao.md`.
