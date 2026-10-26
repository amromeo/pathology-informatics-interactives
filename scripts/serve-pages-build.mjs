import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve("pages-dist");
const base = "/pathology-informatics-interactives";
const port = Number(process.env.PORT ?? 4174);
const mimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname);
  } catch {
    response.writeHead(400).end("Malformed URL");
    return;
  }
  if (pathname !== base && !pathname.startsWith(`${base}/`)) {
    response.writeHead(404).end("Not found");
    return;
  }
  const relative = pathname.slice(base.length).replace(/^\/+/, "");
  let target = normalize(join(root, relative));
  if (target !== root && !target.startsWith(root + sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
  if (!existsSync(target)) {
    response.statusCode = 404;
    target = join(root, "404.html");
  }
  response.setHeader("Content-Type", mimeTypes[extname(target)] ?? "application/octet-stream");
  createReadStream(target).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving the Pages build at http://127.0.0.1:${port}${base}/`);
});
