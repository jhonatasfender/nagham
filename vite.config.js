import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolveSiteUrl() {
  const fromEnv = process.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return null;
}

function seoArtifactsPlugin() {
  return {
    name: "seo-artifacts",
    closeBundle() {
      const base = resolveSiteUrl();
      if (!base) return;

      const outDir = resolve(process.cwd(), "dist");
      const routes = [
        "/",
        "/about",
        "/chord-builder",
        "/notes-index.xml",
      ];
      const locs = routes.map((path) => {
        const loc = path === "/" ? `${base}/` : `${base}${path}`;
        return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
      });

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.join("\n")}
</urlset>
`;
      writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);

      const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
      writeFileSync(resolve(outDir, "robots.txt"), robots);
    },
  };
}

export default defineConfig({
  plugins: [react(), seoArtifactsPlugin()],
});
