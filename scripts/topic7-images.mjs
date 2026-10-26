import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const root = "public/assets/topic7";
await mkdir(root, { recursive: true });
const records = [];
for (const [id, left, top] of [
  ["glands", 100, 300],
  ["focus", 700, 0],
]) {
  const crop = await sharp("content/source-assets/synthetic-wsi-field.webp")
    .extract({ left, top, width: 512, height: 512 })
    .png()
    .toBuffer();
  for (const [variant, size, format] of [
    ["reference", 512, "png"],
    ["reduced", 128, "png"],
    ["compressed", 512, "jpg"],
  ]) {
    let pipeline = sharp(crop).resize(size, size);
    pipeline =
      format === "jpg"
        ? pipeline.jpeg({ quality: 12, chromaSubsampling: "4:2:0" })
        : pipeline.png();
    const path = `${id}-${variant}.${format}`;
    const result = await pipeline.toFile(`${root}/${path}`);
    records.push({ region: id, variant, path, bytes: result.size, width: size, height: size });
  }
}
await writeFile(
  "content/lessons/pixel-budget/images.json",
  JSON.stringify(records, null, 2) + "\n",
);
