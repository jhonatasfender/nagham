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

function resolveSiteUrl() {
  const fromEnv = process.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return null;
}

function escapeXmlLoc(loc) {
  return loc.replace(/&/g, "&amp;").replace(/</g, "&lt;");
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
          "[seo-artifacts] VITE_SITE_URL e VERCEL_URL ausentes: sitemap.xml usa http://127.0.0.1:4173 (vite preview). Defina VITE_SITE_URL no build de produção."
        );
      }

      writeFileSync(resolve(outDir, "sitemap.xml"), buildSitemapXml(base));

      const robotsBase = readFileSync(
        resolve(process.cwd(), "public/robots.txt"),
        "utf8"
      ).trimEnd();
      const robots = `${robotsBase}\n\nSitemap: ${base.replace(/\/$/, "")}/sitemap.xml\n`;
      writeFileSync(resolve(outDir, "robots.txt"), robots);
    },
  };
}

export default defineConfig({
  plugins: [react(), seoArtifactsPlugin()],
});
