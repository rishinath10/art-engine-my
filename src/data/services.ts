import type { ToolId } from './tools';

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** what we actually do inside this practice */
  specialisms: string[];
  /** the stack we work in */
  tools: ToolId[];
}

export const services: Service[] = [
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    tagline: 'Modernize your business for the future.',
    description:
      'We help organizations rethink how they operate, replacing legacy processes with connected, scalable digital foundations built for what comes next.',
    specialisms: [
      'Process mapping & audit',
      'Systems architecture',
      'Data migration',
      'Team enablement',
    ],
    tools: ['notion', 'airtable', 'make', 'hubspot', 'retool'],
  },
  {
    slug: 'agentic-ai-solutions',
    title: 'Agentic AI Solutions',
    tagline: 'Intelligent automation and AI agents for smarter operations.',
    description:
      'From autonomous agents to intelligent workflows, we design AI systems that take on real work — reducing manual effort and unlocking new capacity.',
    specialisms: [
      'Autonomous agent design',
      'Workflow orchestration',
      'Model selection & evaluation',
      'Human-in-the-loop guardrails',
    ],
    tools: [
      'claudeCode',
      'codex',
      'deepseek',
      'hermes',
      'openClaw',
      'metaMuse',
      'langchain',
      'cursor',
      'n8n',
    ],
  },
  {
    slug: 'creative-digital-experiences',
    title: 'Creative Digital Experiences',
    tagline: 'Web, apps, branding and immersive digital experiences.',
    description:
      'We craft digital products and brand experiences that feel considered in every detail — from the first impression to the smallest interaction.',
    specialisms: [
      'Brand identity & art direction',
      'Web & product design',
      'Motion & 3D',
      'Campaign content',
    ],
    tools: [
      'photoshop',
      'illustrator',
      'indesign',
      'afterEffects',
      'canva',
      'blender',
      'cinema4d',
      'figma',
    ],
  },
  {
    slug: 'strategy-consulting',
    title: 'Strategy & Consulting',
    tagline: 'From ideas to execution, we create measurable impact.',
    description:
      'We partner with leadership teams to turn ambition into a roadmap, and a roadmap into results — grounded in data, not guesswork.',
    specialisms: [
      'Digital roadmapping',
      'Market & user research',
      'Measurement frameworks',
      'Operating model design',
    ],
    tools: ['notion', 'figma', 'airtable', 'hubspot'],
  },
  {
    slug: 'technology-solutions',
    title: 'Technology Solutions',
    tagline: 'Custom tools, integrations and technology tailored to business needs.',
    description:
      'When off-the-shelf isn’t enough, we build the custom systems and integrations that fit the way your business actually works.',
    specialisms: [
      'Custom internal tools',
      'API & systems integration',
      'Dashboards & reporting',
      'Maintenance & support',
    ],
    tools: ['retool', 'n8n', 'langchain', 'cursor', 'claude', 'airtable'],
  },
  {
    slug: 'business-digitalization',
    title: 'Business Digitalization',
    tagline: 'Turn manual processes into connected digital workflows.',
    description:
      'We digitize the paper trails and disconnected spreadsheets standing between your team and real operational clarity.',
    specialisms: [
      'Workflow automation',
      'CRM & messaging setup',
      'Document digitization',
      'Ops dashboards',
    ],
    tools: ['n8n', 'zapier', 'make', 'sleekflow', 'powerAutomate', 'airtable'],
  },
];
