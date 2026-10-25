import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
const output = resolve("pages-dist"),
  base = process.env.PAGES_BASE ?? "/pathology-informatics-interactives/";
const origin = "https://amromeo.github.io",
  root = origin + base;
const shell = await readFile(resolve(output, "index.html"), "utf8");
const coverage = JSON.parse(await readFile(resolve(output, "curriculum-coverage.json"), "utf8"));
const routes = [
  {
    path: "",
    title: "Pathology Informatics Interactives",
    summary:
      "Laboratory cases for pathology residents: inspect records, test decisions and discuss informatics practice.",
  },
];
for (const topic of coverage.topics) {
  routes.push({
    path: "topics/" + topic.slug + "/",
    title: topic.title,
    summary: "Laboratory case lessons in " + topic.title + ".",
  });
  for (const lesson of topic.lessons) {
    for (const kind of ["lessons", "faculty"])
      routes.push({
        path: kind + "/" + lesson.slug + "/",
        title: lesson.title + (kind === "faculty" ? " — Facilitator guide" : ""),
        summary: lesson.summary,
      });
  }
}
const escape = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
for (const r of routes) {
  if (r.path && !/^(topics|lessons|faculty)\/[a-z0-9-]+\/$/.test(r.path))
    throw Error("Unsafe route " + r.path);
  const title = r.path ? r.title + " | Pathology Informatics Interactives" : r.title,
    url = root + r.path;
  const tags =
    '<meta name="description" content="' +
    escape(r.summary) +
    '"><link rel="canonical" href="' +
    url +
    '"><meta property="og:type" content="website"><meta property="og:title" content="' +
    escape(title) +
    '"><meta property="og:description" content="' +
    escape(r.summary) +
    '"><meta property="og:url" content="' +
    url +
    '"><meta property="og:image" content="' +
    root +
    'preview.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' +
    escape(title) +
    '"><meta name="twitter:description" content="' +
    escape(r.summary) +
    '"><meta name="twitter:image" content="' +
    root +
    'preview.png"><link rel="apple-touch-icon" href="' +
    base +
    'apple-touch-icon.png"><link rel="manifest" href="' +
    base +
    'site.webmanifest">';
  const html = shell
    .replace(/<title>.*?<\/title>/s, "<title>" + escape(title) + "</title>")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/g, "")
    .replace("</head>", tags + "</head>");
  const dir = resolve(output, r.path);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "index.html"), html);
}
await writeFile(resolve(output, "404.html"), shell);
await writeFile(
  resolve(output, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    routes.map((r) => "<url><loc>" + root + r.path + "</loc></url>").join("") +
    "</urlset>",
);
await writeFile(
  resolve(output, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: " + root + "sitemap.xml\n",
);
await writeFile(
  resolve(output, "site.webmanifest"),
  JSON.stringify({
    name: "Pathology Informatics Interactives",
    short_name: "Pathology Informatics",
    start_url: base,
    display: "browser",
    background_color: "#f7f3e9",
    theme_color: "#143d3a",
    icons: [{ src: base + "apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  }),
);
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#143d3a"/><text x="80" y="210" fill="#ffffff" font-family="sans-serif" font-size="68">Pathology Informatics</text><text x="80" y="300" fill="#ffffff" font-family="sans-serif" font-size="58">Interactive curriculum</text><text x="80" y="440" fill="#d3e8dd" font-family="sans-serif" font-size="32">Laboratory cases for pathology residents</text></svg>';
await sharp(Buffer.from(svg)).png().toFile(resolve(output, "preview.png"));
await sharp(
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" rx="25" fill="#143d3a"/><text x="35" y="120" fill="white" font-family="sans-serif" font-size="86">PI</text></svg>',
  ),
)
  .png()
  .toFile(resolve(output, "apple-touch-icon.png"));
console.log("Created " + routes.length + " route pages with metadata, sitemap and preview image.");
