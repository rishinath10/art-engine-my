/**
 * The catalogue.
 *
 * Supabase's `products` table is the source of truth for what a customer is
 * actually charged — the checkout function reads the price from there and the
 * browser never sends an amount. This list mirrors it so the section can be
 * prerendered into static HTML and still render with no network at all.
 *
 * Keep the two in step: slug, name, amount and interval must match the rows in
 * supabase/migrations/001_schema.sql.
 */

export type ProductKind = 'one_off' | 'subscription';
export type ProductGroup = 'build' | 'care' | 'grow';

export interface Product {
  slug: string;
  name: string;
  group: ProductGroup;
  kind: ProductKind;
  /** Minor units, as the database stores them. RM 750 is 75000 sen. */
  amountSen: number;
  interval: 'month' | null;
  tagline: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: 'single-page-website',
    name: 'Single Page Website',
    group: 'build',
    kind: 'one_off',
    amountSen: 75000,
    interval: null,
    tagline: 'A polished one-page site to get your business online fast.',
    features: [
      'One-page responsive design',
      // Deliberately bounded: "included" with no end date reads as forever,
      // and the arrangement runs for one year.
      'Domain and hosting for the first year',
      'Contact form and WhatsApp button',
      'Basic on-page SEO',
      'SSL security certificate',
    ],
  },
  {
    slug: 'business-website',
    name: 'Business Website',
    group: 'build',
    kind: 'one_off',
    amountSen: 150000,
    interval: null,
    tagline: 'A complete multi-page WordPress website for your company.',
    features: [
      'Multi-page WordPress website',
      'Custom design in your brand colours',
      'Mobile-responsive on every device',
      'Contact form, WhatsApp and Google Maps',
      'Basic SEO setup',
    ],
  },
  {
    slug: 'ecommerce-website',
    name: 'E-Commerce Website',
    group: 'build',
    kind: 'one_off',
    amountSen: 250000,
    interval: null,
    tagline: 'Sell online with a store that is ready to take orders.',
    features: [
      'Online store built on WordPress',
      'Product catalogue and shopping cart',
      'Online payment gateway setup',
      'Mobile-responsive on every device',
      'Basic SEO setup',
    ],
  },
  {
    slug: 'wordpress-support-business',
    name: 'WordPress Support: Business',
    group: 'care',
    kind: 'subscription',
    amountSen: 15000,
    interval: 'month',
    tagline: 'Keep your business website updated, secure and running.',
    features: [
      'Core, plugin and theme updates',
      'Regular backups',
      'Security monitoring',
      'Uptime monitoring',
      'Support via WhatsApp',
    ],
  },
  {
    slug: 'wordpress-support-ecommerce',
    name: 'WordPress Support: E-Commerce',
    group: 'care',
    kind: 'subscription',
    amountSen: 30000,
    interval: 'month',
    tagline: 'Extra care for stores where downtime means lost sales.',
    features: [
      'Everything in Business support',
      'Store and checkout health checks',
      'Order and plugin issue support',
      'Priority response',
      'Support via WhatsApp',
    ],
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    group: 'grow',
    kind: 'subscription',
    amountSen: 50000,
    interval: 'month',
    tagline: 'Consistent, on-brand posting handled for you every month.',
    features: [
      'Content planning and scheduling',
      'Branded post designs',
      'Publishing and page management',
      'Monthly performance summary',
    ],
  },
];

export const productGroups: { key: ProductGroup; title: string; note: string; cadence: string }[] = [
  { key: 'build', title: 'Build', note: 'One-off packages to launch your presence', cadence: 'One-off' },
  { key: 'care', title: 'Care', note: 'Monthly plans to keep your site healthy', cadence: 'Monthly' },
  { key: 'grow', title: 'Grow', note: 'Monthly plans to grow your audience', cadence: 'Monthly' },
];

/** Prices are quoted and charged in ringgit, with no SST line at checkout. */
export function formatPrice(amountSen: number): string {
  const ringgit = amountSen / 100;
  return `RM ${ringgit.toLocaleString('en-MY')}`;
}

/** What the customer picks from on the quote form. */
export const quoteInterests = [
  'Digital Transformation',
  'Agentic AI Solutions',
  'Creative Digital Experiences',
  'Strategy & Consulting',
  'Technology Solutions',
  'Business Digitalization',
  'Something else',
];
