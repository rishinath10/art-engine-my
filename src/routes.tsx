import type { ReactElement } from 'react';
import { Home } from './sections/Home';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Work } from './sections/Work';
import { WorkCaseStudy } from './sections/WorkCaseStudy';
import { Insights } from './sections/Insights';
import { InsightsArticle } from './sections/InsightsArticle';
import { Contact } from './sections/Contact';
import { StartProject } from './sections/StartProject';
import { Privacy } from './sections/Privacy';
import { Terms } from './sections/Terms';
import { Account } from './sections/Account';
import { CheckoutSuccess } from './sections/CheckoutSuccess';
import { NotFound } from './sections/NotFound';
import { projects } from './data/projects';
import { insights } from './data/insights';

export interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/work', element: <Work /> },
  { path: '/work/:slug', element: <WorkCaseStudy /> },
  { path: '/insights', element: <Insights /> },
  { path: '/insights/:slug', element: <InsightsArticle /> },
  { path: '/contact', element: <Contact /> },
  { path: '/start-a-project', element: <StartProject /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
  { path: '/account', element: <Account /> },
  { path: '/checkout/success', element: <CheckoutSuccess /> },
  // anything else — the server answers 404 and this is what it renders
  { path: '*', element: <NotFound /> },
];

/** Concrete URLs the build turns into real HTML files. */
export const staticPaths: string[] = [
  '/',
  '/about',
  '/services',
  '/work',
  '/insights',
  '/contact',
  '/start-a-project',
  '/privacy',
  '/terms',
  ...projects.map((p) => `/work/${p.slug}`),
  ...insights.map((p) => `/insights/${p.slug}`),
];

/**
 * Rendered to dist/404.html for the server's ErrorDocument. Deliberately kept
 * out of staticPaths so it never reaches the sitemap.
 */
export const errorPath = '/404';

/**
 * Prerendered so a direct visit and Stripe's redirect both resolve on a static
 * host — without a file on disk the server answers 404. Their content is
 * account-specific, so they are marked noindex and kept out of the sitemap.
 */
export const clientPaths: string[] = ['/account', '/checkout/success'];
