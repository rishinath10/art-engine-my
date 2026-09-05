import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { Reveal } from '../components/Reveal';
import { services } from '../data/services';
import { ToolMark } from '../components/ToolMark';
import { TransitionLink } from '../components/TransitionLink';

export function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <PageShell
      eyebrow="02 — What We Do"
      title={
        <>
          Digital solutions built
          <br />
          <span className="italic">to move you forward</span>
        </>
      }
      intro="Six practices that work as one. Most engagements start in a single lane and grow across several as the picture gets clearer."
      nextId="work"
    >
      {/* Six rows, one pane — the hairlines between them come from
          .glass-divide rather than a border on each row. */}
      <div className="glass glass-divide overflow-hidden rounded-3xl px-6 md:px-9">
        {services.map((service, i) => {
          const isActive = active === service.slug;
          return (
            <Reveal key={service.slug} delay={i * 0.05} y={20}>
              <div
                onMouseEnter={() => setActive(service.slug)}
                onMouseLeave={() => setActive(null)}
                data-cursor="VIEW"
                className="group relative cursor-pointer py-9 md:py-11"
              >
                <motion.span
                  className="pointer-events-none absolute -inset-x-6 top-0 h-full bg-gradient-to-r from-lavender/50 via-lavender/20 to-transparent md:-inset-x-9"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
                  <span className="w-10 shrink-0 font-sans text-[10px] tracking-[0.3em] text-royal/50">
                    0{i + 1}
                  </span>

                  <motion.h2
                    animate={{ x: isActive ? 10 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-tight transition-colors duration-500 md:w-[42%] ${
                      isActive ? 'text-purple' : 'text-navy'
                    }`}
                  >
                    {service.title}
                  </motion.h2>

                  <div className="md:flex-1">
                    <p className="font-serif text-[15px] italic text-navy/60 md:text-base">
                      {service.tagline}
                    </p>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 font-sans text-[14px] font-light leading-[1.85] text-muted">
                            {service.description}
                          </p>

                          <p className="mt-5 font-sans text-[9px] uppercase tracking-[0.26em] text-royal/70">
                            Specialisms
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                            {service.specialisms.map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 font-sans text-[12.5px] font-light text-navy/75"
                              >
                                <span className="h-1 w-1 rounded-full bg-purple/60" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <ArrowUpRight
                    size={22}
                    className={`hidden shrink-0 transition-all duration-500 md:block ${
                      isActive
                        ? 'translate-x-1 -translate-y-1 text-purple'
                        : 'text-navy/40'
                    }`}
                  />
                </div>

                <div className="relative mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 md:ml-[calc(2.5rem+2.5rem)]">
                  {service.tools.map((tool, ti) => (
                    <ToolMark key={tool} id={tool} index={ti} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-20">
        <div className="glass flex flex-col items-start gap-6 rounded-3xl p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light text-navy">
              Not sure which you need?
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted">
              Tell us the problem. We'll tell you the shortest route through it.
            </p>
          </div>
          <TransitionLink
            to="/start-a-project"
            data-cursor="OPEN"
            className="group inline-flex items-center gap-3 rounded-full bg-navy px-8 py-4 font-sans text-[10px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-purple"
          >
            Start a Project
            <ArrowUpRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </TransitionLink>
        </div>
      </Reveal>
    </PageShell>
  );
}
