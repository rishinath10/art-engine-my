export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  summary: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    slug: 'premium-lifestyle-brand',
    name: 'Premium Lifestyle Brand',
    category: 'Branding / Digital Experience',
    description: 'A full brand and digital identity system for a premium lifestyle house entering the regional market.',
    summary:
      'We built a cohesive visual identity and digital presence — from brand system to e-commerce experience — positioning the brand for a discerning, design-led audience.',
    gradient: 'from-purple to-royal',
  },
  {
    slug: 'e-invitation-platform',
    name: 'E-Invitation Platform',
    category: 'Web & App',
    description: 'A digital invitation platform reimagining how modern events are planned, sent and celebrated.',
    summary:
      'A web and mobile platform that lets hosts design, send and track beautiful digital invitations — replacing print with a faster, greener, more personal experience.',
    gradient: 'from-royal to-navy',
  },
  {
    slug: 'business-automation',
    name: 'Business Automation',
    category: 'AI Solutions',
    description: 'An agentic AI system automating operational workflows for a fast-growing services company.',
    summary:
      'We deployed intelligent agents across intake, scheduling and reporting — cutting manual admin time and giving the team room to focus on clients, not paperwork.',
    gradient: 'from-navy to-purple',
  },
  {
    slug: 'digital-campaign',
    name: 'Digital Campaign',
    category: 'Creative / Marketing',
    description: 'A multi-channel digital campaign built to launch a new product line across Southeast Asia.',
    summary:
      'From creative concept to cross-platform execution, we delivered a campaign system that scaled across markets while staying true to a single creative idea.',
    gradient: 'from-purple-light to-purple',
  },
];
