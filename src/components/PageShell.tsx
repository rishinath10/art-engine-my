import type { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PageTransition } from './PageTransition';
import { SiteFooter } from './SiteFooter';
import { AuroraBackground } from './AuroraBackground';
import { navNodes } from '../data/navigation';
import { TransitionLink } from './TransitionLink';

interface PageShellProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** id of the destination offered at the foot of the page */
  nextId?: string;
}

export function PageShell({ eyebrow, title, intro, children, nextId }: PageShellProps) {
  const next = navNodes.find((n) => n.id === nextId);

  return (
    <PageTransition>
      <div className="relative min-h-dvh overflow-hidden bg-offwhite">
        <AuroraBackground />

        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 px-6 pb-28 pt-28 outline-none md:px-14 md:pt-32 lg:px-24 lg:pt-36"
        >
          <header className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[10px] uppercase tracking-[0.34em] text-purple"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-[clamp(2.4rem,6.5vw,4.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-navy"
            >
              {title}
            </motion.h1>

            {intro && (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 max-w-xl font-serif text-[18px] leading-relaxed text-navy/70 md:text-[20px]"
              >
                {intro}
              </motion.div>
            )}
          </header>

          <div className="mt-20 md:mt-24">{children}</div>

          {next && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-28 border-t border-navy/10 pt-10"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                Next
              </p>
              <TransitionLink
                to={next.path}
                data-cursor="OPEN"
                className="group mt-4 flex items-baseline gap-5"
              >
                <span className="font-display text-[clamp(1.9rem,4vw,3rem)] font-light text-navy transition-colors duration-500 group-hover:text-purple">
                  {next.label}
                </span>
                <ArrowRight
                  size={26}
                  className="shrink-0 self-center text-navy transition-transform duration-500 group-hover:translate-x-2 group-hover:text-purple"
                />
              </TransitionLink>
              <p className="mt-2 font-serif text-sm italic text-muted">{next.previewText}</p>
            </motion.div>
          )}
        <SiteFooter />
        </main>
      </div>
    </PageTransition>
  );
}
