export interface Insight {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
}

export const insights: Insight[] = [
  {
    slug: 'rise-of-agentic-ai-in-business',
    title: 'The Rise of Agentic AI in Business',
    category: 'Artificial Intelligence',
    date: 'August 2026',
    excerpt:
      'Agentic AI is moving from experiment to infrastructure. Here’s what that shift actually means for how businesses operate.',
    body: [
      'For years, "AI in business" meant a chatbot bolted onto a support page. That era is ending. Agentic AI — systems capable of planning, acting and adapting toward a goal with minimal supervision — is beginning to sit inside real operational workflows, not beside them.',
      'The businesses seeing the clearest returns are not the ones chasing the newest model. They are the ones who have mapped their processes clearly enough to hand a well-defined slice of them to an agent, with the right guardrails in place.',
      'The opportunity is not replacing people. It is removing the friction between intention and execution — so teams spend their time on judgment, creativity and relationships, and let agents handle the rest.',
    ],
  },
  {
    slug: 'why-digitalization-matters-more-than-ever',
    title: 'Why Digitalization Matters More Than Ever',
    category: 'Digital Transformation',
    date: 'July 2026',
    excerpt:
      'Digitalization is no longer a competitive advantage. It is the baseline cost of staying relevant.',
    body: [
      'Every industry now runs on data, and every customer now expects a digital-first experience. Businesses that still route core processes through spreadsheets, printed forms or manual handoffs are not just slower — they are structurally unable to compete.',
      'Digitalization is not a single project with an end date. It is an ongoing discipline: continuously replacing friction with flow, and manual steps with connected systems.',
      'The businesses that treat digitalization as infrastructure, rather than an initiative, are the ones still standing when the market shifts again.',
    ],
  },
  {
    slug: 'creating-digital-experiences-that-last',
    title: 'Creating Digital Experiences That Last',
    category: 'Design & Strategy',
    date: 'June 2026',
    excerpt:
      'Trends fade. The digital experiences that endure are built on clarity, craft and a real understanding of the people using them.',
    body: [
      'A beautiful interface is not the same as a good digital experience. The experiences that last are the ones designed around a genuine understanding of the person on the other end — their goals, their context, their patience.',
      'Craft matters because it signals care, and care builds trust. But craft without clarity is decoration. The strongest digital products say one thing clearly before they say ten things beautifully.',
      'Longevity comes from designing systems, not one-off screens — so the experience can grow with the business instead of being rebuilt every time the business changes.',
    ],
  },
];
