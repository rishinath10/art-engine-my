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
  ...projects.map((p) => `/work/${p.slug}`),
  ...insights.map((p) => `/insights/${p.slug}`),
];
