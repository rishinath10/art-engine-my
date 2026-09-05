import { projects } from './projects';
import { insights } from './insights';

export interface PageMeta {
  title: string;
  description: string;
}

const SITE = 'Art Engine My';
const TAGLINE = 'Creativity. Technology. Digitalization.';

const staticMeta: Record<string, PageMeta> = {
  '/': {
    title: `${SITE} | ${TAGLINE}`,
    description:
      'A creative technology and digitalization partner in Kuala Lumpur, helping businesses transform ideas into meaningful digital experiences.',
  },
  '/about': {
    title: `About Us — ${SITE}`,
    description:
      'Art Engine My Solutions is a creative technology partner combining creativity, technology and strategy to create digital experiences that drive real impact.',
  },
  '/services': {
    title: `Services — ${SITE}`,
    description:
      'Digital transformation, agentic AI solutions, creative digital experiences, strategy and consulting, technology solutions and business digitalization.',
  },
  '/work': {
    title: `Our Work — ${SITE}`,
    description:
      'Selected projects across branding, platforms, AI automation and digital campaigns — and the outcomes they delivered.',
  },
  '/insights': {
    title: `Insights — ${SITE}`,
    description:
      'Perspectives on agentic AI, digitalization and the craft of building digital experiences that last.',
  },
  '/contact': {
    title: `Contact — ${SITE}`,
    description:
      'Have a project in mind? Talk to Art Engine My Solutions in Kuala Lumpur about what you want to build.',
  },
  '/start-a-project': {
    title: `Start a Project — ${SITE}`,
    description:
      'Tell us what you are looking to build and we will come back to you within one business day.',
  },
};

const fallback: PageMeta = staticMeta['/'];

export function metaForPath(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (staticMeta[path]) return staticMeta[path];

  const project = projects.find((p) => `/work/${p.slug}` === path);
  if (project) {
    return {
      title: `${project.name} — ${SITE}`,
      description: project.description,
    };
  }

  const article = insights.find((p) => `/insights/${p.slug}` === path);
  if (article) {
    return { title: `${article.title} — ${SITE}`, description: article.excerpt };
  }

  return fallback;
}
