export interface Project {
  slug: string;
  name: string;
  category: string;
  year: string;
  description: string;
  summary: string;
  gradient: string;
  seed: number;
  /** minimal illustration variant; falls back to the rendered form when unset */
  art?: 'brand';
  services: string[];
  challenge: string;
  approach: string;
  outcome: string;
  results: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: 'premium-lifestyle-brand',
    name: 'Premium Lifestyle Brand',
    category: 'Branding / Digital Experience',
    year: '2025',
    description:
      'A full brand and digital identity system for a premium lifestyle house entering the regional market.',
    summary:
      'We built a cohesive visual identity and digital presence — from brand system to commerce experience — positioning the brand for a discerning, design-led audience.',
    gradient: 'from-purple to-royal',
    seed: 0,
    art: 'brand',
    services: ['Brand Identity', 'Creative Direction', 'E-Commerce', 'Content System'],
    challenge:
      'The house had a strong product but no coherent identity. Every touchpoint — packaging, social, retail — spoke a different visual language, and the digital storefront read as a generic template rather than a premium destination.',
    approach:
      'We started with the brand system: typography, palette, photographic direction and a set of composition rules that could survive being applied by different teams. Then we rebuilt the storefront around editorial storytelling instead of grid-of-products merchandising.',
    outcome:
      'A single identity that holds together from packaging to campaign, and a storefront that gives the product room to be desired rather than merely listed.',
    results: [
      { value: '2.4×', label: 'Time on site' },
      { value: '+68%', label: 'Conversion rate' },
      { value: '4 wks', label: 'To first launch' },
    ],
  },
  {
    slug: 'e-invitation-platform',
    name: 'E-Invitation Platform',
    category: 'Web & App',
    year: '2025',
    description:
      'A digital invitation platform reimagining how modern events are planned, sent and celebrated.',
    summary:
      'A web and mobile platform that lets hosts design, send and track beautiful digital invitations — replacing print with something faster, greener and more personal.',
    gradient: 'from-royal to-navy',
    seed: 1,
    services: ['Product Design', 'Web Platform', 'Mobile App', 'Design System'],
    challenge:
      'Digital invitations had a reputation problem: they felt cheap next to print. The platform needed to make a sent invitation feel like an occasion, while handling the unglamorous work of RSVPs, reminders and guest lists.',
    approach:
      'We designed a template system with real typographic craft, then built the reveal experience — how an invitation opens on a guest phone — as the centrepiece rather than an afterthought. Host tooling sits behind it, deliberately plain.',
    outcome:
      'Hosts send something they are proud of, and guests respond faster because replying takes one tap rather than a phone call.',
    results: [
      { value: '92%', label: 'RSVP completion' },
      { value: '3 days', label: 'Faster responses' },
      { value: '40k+', label: 'Invitations sent' },
    ],
  },
  {
    slug: 'business-automation',
    name: 'Business Automation',
    category: 'AI Solutions',
    year: '2026',
    description:
      'An agentic AI system automating operational workflows for a fast-growing services company.',
    summary:
      'Intelligent agents deployed across intake, scheduling and reporting — cutting manual admin and giving the team room to focus on clients, not paperwork.',
    gradient: 'from-navy to-purple',
    seed: 2,
    services: ['AI Strategy', 'Agent Development', 'Systems Integration', 'Team Enablement'],
    challenge:
      'Growth had outpaced process. Client intake ran through a shared inbox, scheduling through a spreadsheet, and reporting through whoever remembered to do it. Adding headcount would only add coordination.',
    approach:
      'We mapped the workflows before writing a line of code, then handed well-defined slices to agents with clear guardrails and a human check where judgment mattered. Everything else stayed exactly where the team already worked.',
    outcome:
      'The same team now handles roughly double the intake volume, and reporting arrives on schedule without anyone chasing it.',
    results: [
      { value: '−31 hrs', label: 'Admin per week' },
      { value: '2×', label: 'Intake capacity' },
      { value: '99.2%', label: 'Routing accuracy' },
    ],
  },
  {
    slug: 'digital-campaign',
    name: 'Digital Campaign',
    category: 'Creative / Marketing',
    year: '2026',
    description:
      'A multi-channel digital campaign built to launch a new product line across Southeast Asia.',
    summary:
      'From creative concept to cross-platform execution, a campaign system that scaled across markets while staying true to a single creative idea.',
    gradient: 'from-purple-light to-purple',
    seed: 3,
    services: ['Campaign Strategy', 'Creative Direction', 'Content Production', 'Performance'],
    challenge:
      'One launch, four markets, four languages — and a budget that would not stretch to four separate campaigns. The creative had to travel without flattening into something generic.',
    approach:
      'We built one idea with deliberate room in it: a fixed creative spine with market-specific casting, copy and cultural detail layered on top. Production was designed as a system so each market could assemble assets without a new shoot.',
    outcome:
      'A launch that read as local in every market while remaining unmistakably one campaign, produced at roughly the cost of one and a half.',
    results: [
      { value: '4', label: 'Markets launched' },
      { value: '+142%', label: 'Engagement vs. prior' },
      { value: '−38%', label: 'Cost per acquisition' },
    ],
  },
];
