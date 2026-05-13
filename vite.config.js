import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SITEMAP_ROUTES = [
  "/",
  "/about",
  "/chord-builder",
  "/scales",
  "/notes-index.xml",
  "/llms.txt",
];

// Pre-render targets: path → (i18n key under seo.pages, output file).
// Each entry receives a copy of index.html with route-specific title,
// description, canonical, og:* and twitter:* baked in so crawlers see the
// right metadata before JS runs. React Helmet still updates everything on
// client-side navigation after hydration.
const PRERENDER_ROUTES = [
  { path: "/", pageKey: "home", out: "index.html" },
  { path: "/about", pageKey: "about", out: "about.html" },
  {
    path: "/chord-builder",
    pageKey: "chordBuilder",
    out: "chord-builder.html",
  },
  { path: "/scales", pageKey: "scales", out: "scales.html" },
];

function resolveSiteUrl() {
  const fromEnv = process.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  // Prefer the production alias over the per-deployment URL so canonical
  // URLs survive across deploys.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/^https?:\/\//, "")}`;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return null;
}

function escapeXmlLoc(loc) {
  return loc.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function escapeHtmlAttr(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSitemapXml(base) {
  const root = base.replace(/\/$/, "");
  const locs = SITEMAP_ROUTES.map((path) => {
    const loc = path === "/" ? `${root}/` : `${root}${path}`;
    return `  <url>\n    <loc>${escapeXmlLoc(loc)}</loc>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.join("\n")}
</urlset>
`;
}

function buildPrerenderTags({ title, description, canonical, siteName }) {
  const docTitle = `${title} | ${siteName}`;
  const ogImage = `${canonical.replace(/\/$/, "").split("/").slice(0, 3).join("/")}/icons.svg`;
  const tags = [
    `<title>${escapeHtmlAttr(docTitle)}</title>`,
    `<meta name="description" content="${escapeHtmlAttr(description)}" />`,
    `<link rel="canonical" href="${escapeHtmlAttr(canonical)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtmlAttr(siteName)}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(docTitle)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(description)}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtmlAttr(ogImage)}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(docTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(ogImage)}" />`,
  ];
  return tags.join("\n    ");
}

// Replace the title + meta block in index.html with route-specific tags.
// Matches everything from the first <meta name="description"> up through
// the closing </title>, leaving the rest of <head> untouched.
function injectPrerenderTags(html, tagsHtml) {
  const start = html.indexOf('<meta\n      name="description"');
  const fallbackStart = start === -1 ? html.indexOf('<meta name="description"') : start;
  const titleEnd = html.indexOf("</title>");
  if (fallbackStart === -1 || titleEnd === -1) {
    throw new Error(
      "[seo-artifacts] could not find description...</title> block in index.html"
    );
  }
  return (
    html.slice(0, fallbackStart) +
    tagsHtml +
    html.slice(titleEnd + "</title>".length)
  );
}

function seoArtifactsPlugin() {
  return {
    name: "seo-artifacts",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (pathname !== "/sitemap.xml") {
          next();
          return;
        }
        const port = server.config.server.port ?? 5173;
        const base = `http://localhost:${port}`;
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.end(buildSitemapXml(base));
      });
    },
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      const explicit = resolveSiteUrl();
      const base = explicit || "http://127.0.0.1:4173";
      if (!explicit) {
        console.warn(
          "[seo-artifacts] VITE_SITE_URL e VERCEL_PROJECT_PRODUCTION_URL ausentes: sitemap/canonical usam http://127.0.0.1:4173 (vite preview). Defina VITE_SITE_URL no build de produção."
        );
      }

      writeFileSync(resolve(outDir, "sitemap.xml"), buildSitemapXml(base));

      const robotsBase = readFileSync(
        resolve(process.cwd(), "public/robots.txt"),
        "utf8"
      ).trimEnd();
      const robots = `${robotsBase}\n\nSitemap: ${base.replace(/\/$/, "")}/sitemap.xml\n`;
      writeFileSync(resolve(outDir, "robots.txt"), robots);

      // Pre-render the 4 route HTMLs from pt-BR i18n strings.
      const ptBr = JSON.parse(
        readFileSync(
          resolve(process.cwd(), "src/i18n/locales/pt-BR.json"),
          "utf8"
        )
      );
      const seoStrings = ptBr.seo;
      const indexHtml = readFileSync(resolve(outDir, "index.html"), "utf8");
      for (const { path, pageKey, out } of PRERENDER_ROUTES) {
        const page = seoStrings?.pages?.[pageKey];
        if (!page) continue;
        const canonical =
          path === "/"
            ? `${base.replace(/\/$/, "")}/`
            : `${base.replace(/\/$/, "")}${path}`;
        const tagsHtml = buildPrerenderTags({
          title: page.title,
          description: page.description,
          canonical,
          siteName: seoStrings.siteName,
        });
        const html = injectPrerenderTags(indexHtml, tagsHtml);
        writeFileSync(resolve(outDir, out), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), seoArtifactsPlugin()],
});
