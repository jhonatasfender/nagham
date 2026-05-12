// Node ESM resolver hook so we can import the app's domain modules,
// which use Vite-style extensionless imports (e.g. import "./notes").
import { resolve as pathResolve, dirname } from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { register } from "node:module";

const HOOK_URL = new URL("./_resolver-hook.mjs", import.meta.url);
register(HOOK_URL, pathToFileURL("./"));
