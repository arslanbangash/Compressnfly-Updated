// Build step: renders every route in src/seo/meta.ts to static HTML,
// writes a real 404.html, and generates sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
const { render, pages, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

function writePage(url, outFile) {
  const { html, head } = render(url);
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
}

// "/" -> dist/index.html, "/blog/x" -> dist/blog/x.html
// (Netlify serves /blog/x from blog/x.html without adding a trailing slash.)
const paths = Object.keys(pages);
for (const p of paths) {
  const out = p === "/" ? path.join(dist, "index.html") : path.join(dist, `${p.slice(1)}.html`);
  writePage(p, out);
  console.log(`prerendered ${p}`);
}

// Netlify serves this with a real 404 status for any unknown URL.
writePage("/__not-found__", path.join(dist, "404.html"));
console.log("prerendered 404.html");

const urls = paths
  .map((p) => {
    const m = pages[p];
    const loc = p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      m.dateModified ? `    <lastmod>${m.dateModified}</lastmod>` : null,
      m.priority != null ? `    <priority>${m.priority.toFixed(1)}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`sitemap.xml written (${paths.length} URLs)`);

fs.rmSync(ssrDir, { recursive: true, force: true });
