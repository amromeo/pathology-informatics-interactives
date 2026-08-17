import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

await copyFile(resolve("pages-dist/index.html"), resolve("pages-dist/404.html"));
console.log("Created GitHub Pages SPA fallback: pages-dist/404.html");
