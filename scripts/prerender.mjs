import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, staticPaths, errorPath, metaForPath, SITE_URL, SITE_NAME, OG_IMAGE, LOGO_URL } =
  await import(ssrEntry);

const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Absolute URL for a route. Search engines and link unfurlers both need one. */
const absolute = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/**
 * Tells Google this is one organisation with one set of contact details,
 * rather than leaving it to infer them from the page text.
 */
const organisationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'Art Engine',
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: OG_IMAGE,
  description: metaForPath('/').description,
  email: 'hello@artengine.my',
  telephone: '+60173921219',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuala Lumpur',
    addressCountry: 'MY',
  },
});

function buildHead(path, meta, { indexable }) {
  const url = absolute(path);
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    indexable
      ? '<meta name="robots" content="index, follow, max-image-preview:large" />'
      : '<meta name="robots" content="noindex, follow" />',
    `<meta property="og:site_name" content="${escape(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_MY" />`,
    `<meta property="og:type" content="${path === '/' ? 'website' : 'article'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(SITE_NAME)} — Creativity. Technology. Digitalization." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  if (path === '/') {
    tags.push(`<script type="application/ld+json">${organisationJsonLd}</script>`);
  }
  return tags.join('');
}

function writePage(path, { indexable = true } = {}) {
  const meta = metaForPath(path);
  let page = template.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);

  page = page
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    )
    .replace('</head>', `${buildHead(path, meta, { indexable })}</head>`);

  return page;
}

let written = 0;

for (const path of staticPaths) {
  const outDir = path === '/' ? dist : join(dist, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), writePage(path));
  written += 1;
}

// The server's ErrorDocument. Kept out of the sitemap and marked noindex.
writeFileSync(join(dist, '404.html'), writePage(errorPath, { indexable: false }));

// --- sitemap.xml -----------------------------------------------------------
// Priority follows the hub-and-spoke shape of the site: the hub, then the six
// destinations, then the individual case studies and articles.
const lastmod = new Date().toISOString().slice(0, 10);
const priorityFor = (path) => {
  if (path === '/') return '1.0';
  return path.split('/').length > 2 ? '0.6' : '0.8';
};

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  staticPaths
    .map(
      (path) =>
        `  <url>\n` +
        `    <loc>${absolute(path)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>\n` +
        `    <priority>${priorityFor(path)}</priority>\n` +
        `  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(dist, 'sitemap.xml'), sitemap);

// --- robots.txt ------------------------------------------------------------
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${written} pages + 404.html, sitemap.xml, robots.txt`);
