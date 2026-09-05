import { PageShell } from '../components/PageShell';
import { ParallaxPanel } from '../components/ParallaxPanel';
import { Reveal } from '../components/Reveal';

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '5+', label: 'Years of Experience' },
  { value: '∞', label: 'Bigger Possibilities' },
];

const principles = [
  {
    index: '01',
    title: 'Creativity with intent',
    body: 'Every idea is measured against the outcome it is meant to create. Beauty and purpose are not a trade-off.',
  },
  {
    index: '02',
    title: 'Technology that serves',
    body: 'We choose tools for what they let your business do, never for novelty. The right stack is the one your team can live with.',
  },
  {
    index: '03',
    title: 'Partnership over delivery',
    body: 'We stay close after launch. The work that matters is the work that keeps performing a year later.',
  },
];

export function About() {
  return (
    <PageShell
      eyebrow="01 — Who We Are"
      title={
        <>
          More Than
          <br />
          <span className="italic">a Digital Studio</span>
        </>
      }
      intro="We are a creative technology partner dedicated to helping brands, businesses and people thrive in a digital world."
      nextId="services"
    >
      <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal>
          <p className="max-w-lg font-sans text-[15px] font-light leading-[1.9] text-muted">
            At Art Engine My Solutions, we combine creativity, technology and strategy to create
            meaningful digital experiences that drive real impact. We work with businesses ready to
            change how they operate — not to chase trends, but to build something that holds up.
          </p>

          {/* One pane rather than four: a single backdrop-filter, and the
              principles read as one set instead of four loose cards. */}
          <div className="glass glass-divide mt-14 rounded-3xl px-8 py-2 md:px-10">
            {principles.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.08}>
                <div className="flex gap-6 py-8">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-royal/50">
                    {p.index}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl text-navy">{p.title}</h2>
                    <p className="mt-2 max-w-md font-sans text-[14px] font-light leading-[1.85] text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ParallaxPanel className="h-[380px] w-full lg:h-[600px]" seed={1} strength={20} />
        </Reveal>
      </div>

      {/* The hairline grid does the dividing, so the panel needs no internal
          borders — the gap colour shows through as the rule. */}
      <div className="glass mt-28 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy/[0.07] md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="bg-white/40 px-7 py-10 md:px-8">
            <div className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light text-navy">
              {stat.value}
            </div>
            <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
