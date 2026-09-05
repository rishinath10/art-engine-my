import { Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { MinimalArt } from '../components/MinimalArt';
import { Reveal } from '../components/Reveal';
import { projects } from '../data/projects';
import { TransitionLink } from '../components/TransitionLink';

export function WorkCaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];


  if (!project) return <Navigate to="/work" replace />;

  const next = projects[(index + 1) % projects.length];
  const chapters = [
    { label: 'The challenge', body: project.challenge },
    { label: 'Our approach', body: project.approach },
    { label: 'The outcome', body: project.outcome },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-dvh overflow-hidden bg-offwhite">
        <AuroraBackground />

        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 px-6 pb-28 pt-28 outline-none md:px-14 md:pt-32 lg:px-24 lg:pt-36"
        >
          <TransitionLink
            to="/work"
            data-cursor="BACK"
            className="group inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-purple"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-500 group-hover:-translate-x-1"
            />
            All Work
          </TransitionLink>

          <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-purple">
                {project.category} · {project.year}
              </p>
              <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[1.05] tracking-[-0.02em] text-navy">
                {project.name}
              </h1>
              <p className="mt-8 max-w-lg font-serif text-[18px] leading-relaxed text-navy/70 md:text-[20px]">
                {project.summary}
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-navy/12 bg-white/50 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-navy/70 backdrop-blur-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-[340px] w-full overflow-hidden rounded-[2.5rem] border border-white/70 lg:h-[520px]">
              <MinimalArt className="h-full w-full" variant={project.art} />
            </div>
          </div>

          <div className="mt-24 grid gap-3 border-t border-navy/10 pt-14 sm:grid-cols-3 sm:gap-10">
            {project.results.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08}>
                <div className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-navy">
                  {r.value}
                </div>
                <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                  {r.label}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 max-w-3xl space-y-16">
            {chapters.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <div className="grid gap-4 border-t border-navy/10 pt-8 md:grid-cols-[180px_1fr] md:gap-10">
                  <h2 className="font-sans text-[10px] uppercase tracking-[0.26em] text-royal/70">
                    {c.label}
                  </h2>
                  <p className="font-sans text-[15px] font-light leading-[1.95] text-muted">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-28 border-t border-navy/10 pt-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
              Next Project
            </p>
            <TransitionLink
              to={`/work/${next.slug}`}
              data-cursor="OPEN"
              className="group mt-4 flex items-baseline gap-5"
            >
              <span className="font-display text-[clamp(1.9rem,4vw,3rem)] font-light text-navy transition-colors duration-500 group-hover:text-purple">
                {next.name}
              </span>
              <ArrowRight
                size={26}
                className="shrink-0 self-center text-navy transition-transform duration-500 group-hover:translate-x-2 group-hover:text-purple"
              />
            </TransitionLink>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
