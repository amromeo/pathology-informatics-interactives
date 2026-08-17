import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const source = resolve("content/source-assets/synthetic-wsi-field.png");
const output = resolve("public/assets/synthetic-wsi-field.webp");

await mkdir(dirname(output), { recursive: true });
await sharp(source)
  .resize({ width: 1280, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(output);

console.log(`Optimized ${source} -> ${output}`);
