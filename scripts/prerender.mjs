import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, staticPaths, metaForPath } = await import(ssrEntry);

const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let written = 0;

for (const path of staticPaths) {
  const html = render(path);
  const meta = metaForPath(path);

  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  page = page
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    );

  // canonical + og tags give link previews something to work with
  const canonical = `<link rel="canonical" href="${path}" />`;
  const og =
    `<meta property="og:title" content="${escape(meta.title)}" />` +
    `<meta property="og:description" content="${escape(meta.description)}" />` +
    `<meta property="og:type" content="website" />`;
  page = page.replace('</head>', `${canonical}${og}</head>`);

  const outDir = path === '/' ? dist : join(dist, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page);
  written += 1;
}

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${written} pages`);
