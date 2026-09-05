import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { Reveal } from '../components/Reveal';
import { services } from '../data/services';
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
      <div className="border-t border-navy/10">
        {services.map((service, i) => {
          const isActive = active === service.slug;
          return (
            <Reveal key={service.slug} delay={i * 0.05} y={20}>
              <div
                onMouseEnter={() => setActive(service.slug)}
                onMouseLeave={() => setActive(null)}
                data-cursor="VIEW"
                className="group relative cursor-pointer border-b border-navy/10 py-9 md:py-11"
              >
                <motion.span
                  className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-r from-lavender/50 via-lavender/20 to-transparent"
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
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden font-sans text-[14px] font-light leading-[1.85] text-muted"
                        >
                          <span className="mt-3 block">{service.description}</span>
                        </motion.p>
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
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-20">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/70 bg-white/45 p-10 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
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
