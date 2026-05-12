// ESM resolver hook: append ".js" to extensionless relative specifiers
// (and resolve "./foo" to "./foo/index.js" when needed) so Node can run
// the app's domain modules without changes.
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !/\.[a-zA-Z]+$/.test(specifier)
  ) {
    const parentURL = context.parentURL;
    if (parentURL && parentURL.startsWith("file://")) {
      const parentPath = fileURLToPath(parentURL);
      const baseDir = parentPath.substring(0, parentPath.lastIndexOf("/"));
      const candidates = [
        `${baseDir}/${specifier}.js`,
        `${baseDir}/${specifier}.mjs`,
        `${baseDir}/${specifier}/index.js`,
      ];
      for (const candidate of candidates) {
        const normalized = new URL(`file://${candidate}`).pathname;
        if (existsSync(normalized)) {
          let suffix;
          if (candidate.endsWith("/index.js")) suffix = "/index.js";
          else if (candidate.endsWith(".mjs")) suffix = ".mjs";
          else suffix = ".js";
          return nextResolve(specifier + suffix, context);
        }
      }
    }
  }
  return nextResolve(specifier, context);
}
