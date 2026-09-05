export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    tagline: 'Modernize your business for the future.',
    description:
      'We help organizations rethink how they operate, replacing legacy processes with connected, scalable digital foundations built for what comes next.',
  },
  {
    slug: 'agentic-ai-solutions',
    title: 'Agentic AI Solutions',
    tagline: 'Intelligent automation and AI agents for smarter operations.',
    description:
      'From autonomous agents to intelligent workflows, we design AI systems that take on real work — reducing manual effort and unlocking new capacity.',
  },
  {
    slug: 'creative-digital-experiences',
    title: 'Creative Digital Experiences',
    tagline: 'Web, apps, branding and immersive digital experiences.',
    description:
      'We craft digital products and brand experiences that feel considered in every detail — from the first impression to the smallest interaction.',
  },
  {
    slug: 'strategy-consulting',
    title: 'Strategy & Consulting',
    tagline: 'From ideas to execution, we create measurable impact.',
    description:
      'We partner with leadership teams to turn ambition into a roadmap, and a roadmap into results — grounded in data, not guesswork.',
  },
  {
    slug: 'technology-solutions',
    title: 'Technology Solutions',
    tagline: 'Custom tools, integrations and technology tailored to business needs.',
    description:
      'When off-the-shelf isn’t enough, we build the custom systems and integrations that fit the way your business actually works.',
  },
  {
    slug: 'business-digitalization',
    title: 'Business Digitalization',
    tagline: 'Turn manual processes into connected digital workflows.',
    description:
      'We digitize the paper trails and disconnected spreadsheets standing between your team and real operational clarity.',
  },
];
