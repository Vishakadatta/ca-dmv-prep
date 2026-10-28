/* Tiny static file server for local preview and tests.
   Node's http handles parallel requests reliably, which python3 -m http.server
   does not under several Playwright workers. No dependencies.
   Usage: node scripts/serve.mjs [port]                                      */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize, extname, sep } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2] || process.env.PORT || 8000);

const TYPES = {
  ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8", ".mjs":"text/javascript; charset=utf-8",
  ".json":"application/json; charset=utf-8", ".svg":"image/svg+xml",
  ".png":"image/png", ".jpg":"image/jpeg", ".ico":"image/x-icon",
  ".woff2":"font/woff2", ".txt":"text/plain; charset=utf-8", ".md":"text/markdown; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    // Strip the query (cache-busting ?v=) and decode, then resolve inside ROOT only.
    const raw = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let rel = normalize(raw).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
    let file = join(ROOT, rel);

    // Refuse anything that escapes the project directory.
    if (file !== ROOT && !file.startsWith(ROOT + sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) { file = join(file, "index.html"); info = await stat(file).catch(() => null); }
    if (!info) { res.writeHead(404, {"Content-Type":"text/plain"}).end("Not found"); return; }

    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
    }).end(body);
  } catch (err) {
    res.writeHead(500, {"Content-Type":"text/plain"}).end("Server error");
  }
});

server.listen(PORT, "127.0.0.1", () => console.log(`serving ${ROOT} on http://127.0.0.1:${PORT}`));
