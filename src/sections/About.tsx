import { PageShell } from '../components/PageShell';
import { ParallaxPanel } from '../components/ParallaxPanel';
import { Reveal } from '../components/Reveal';
import { company } from '../data/site';

// The founding year rather than a count of years, so the figure never needs
// updating and never quietly goes stale.
const stats = [
  { value: String(company.founded), label: 'Working Since' },
  { value: company.projects, label: 'Projects Delivered' },
  { value: company.clients, label: 'Clients Served' },
  { value: String(company.countries.length), label: 'Countries' },
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
            <div className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light tabular-nums text-navy">
              {stat.value}
            </div>
            <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
              {stat.label}
            </div>
          </Reveal>
        ))}

        {/* The count above is the headline; naming them is what makes it
            credible, so they get a full-width row rather than a tooltip. */}
        <Reveal
          delay={0.32}
          className="col-span-2 bg-white/40 px-7 py-8 md:col-span-4 md:px-8"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
            Where we have worked
          </p>
          {/* Chips rather than dot-separated text: the list wraps to two lines
              on a phone, and a separator dot stranded at the start of a line
              reads as a mistake. */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {company.countries.map((country) => (
              <li
                key={country}
                className="rounded-full border border-white/75 bg-white/55 px-3.5 py-1.5 font-sans text-[13px] font-light text-navy"
              >
                {country}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </PageShell>
  );
}
