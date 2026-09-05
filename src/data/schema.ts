import { projects } from './projects';
import { insights } from './insights';
import { metaForPath } from './meta';
import { SITE_URL, SITE_NAME, OG_IMAGE, LOGO_URL, company } from './site';

/**
 * Structured data for the prerenderer. Imported only by the SSR entry, so none
 * of it reaches the browser bundle.
 */

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/** "August 2026" -> "2026-08-01". Returns undefined for anything unexpected. */
function isoDate(human: string): string | undefined {
  const [month, year] = human.trim().toLowerCase().split(/\s+/);
  const index = MONTHS.indexOf(month);
  if (index === -1 || !/^\d{4}$/.test(year ?? '')) return undefined;
  return `${year}-${String(index + 1).padStart(2, '0')}-01`;
}

const absolute = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
};

const organisation = {
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
  foundingDate: String(company.founded),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuala Lumpur',
    addressCountry: 'MY',
  },
  areaServed: company.countries.map((name) => ({ '@type': 'Country', name })),
};

/** Section a nested page hangs off, for the breadcrumb trail. */
const SECTIONS: Record<string, { path: string; name: string }> = {
  work: { path: '/work', name: 'Our Work' },
  insights: { path: '/insights', name: 'Insights' },
};

function breadcrumbs(path: string) {
  if (path === '/') return null;

  const trail: { name: string; item: string }[] = [{ name: 'Home', item: `${SITE_URL}/` }];
  const [section, slug] = path.replace(/^\//, '').split('/');
  const parent = SECTIONS[section];

  if (slug && parent) {
    trail.push({ name: parent.name, item: absolute(parent.path) });
  }

  const leaf = metaForPath(path).title.split(' — ')[0].replace(/ \| .*$/, '');
  trail.push({ name: leaf, item: absolute(path) });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/** Every JSON-LD block a given route should carry. */
export function schemasForPath(path: string): unknown[] {
  const blocks: unknown[] = [];

  if (path === '/') blocks.push(organisation);

  const article = insights.find((a) => `/insights/${a.slug}` === path);
  if (article) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      articleSection: article.category,
      datePublished: isoDate(article.date),
      author: publisher,
      publisher,
      image: OG_IMAGE,
      mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(path) },
    });
  }

  const project = projects.find((p) => `/work/${p.slug}` === path);
  if (project) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.name,
      description: project.description,
      genre: project.category,
      dateCreated: project.year,
      creator: publisher,
      image: OG_IMAGE,
      url: absolute(path),
    });
  }

  const crumbs = breadcrumbs(path);
  if (crumbs) blocks.push(crumbs);

  return blocks;
}
