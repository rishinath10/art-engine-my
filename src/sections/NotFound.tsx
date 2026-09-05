import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { TransitionLink } from '../components/TransitionLink';
import { navNodes } from '../data/navigation';

/**
 * Served for any URL that isn't a real page. The server answers a genuine 404
 * status (see public/.htaccess) so search engines drop the address rather than
 * indexing it as a copy of the homepage.
 */
export function NotFound() {
  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-offwhite px-6 py-24 text-center">
        <AuroraBackground />

        <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[10px] uppercase tracking-[0.34em] text-purple"
          >
            404 — Page Not Found
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[clamp(2.4rem,7vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-navy"
          >
            This page has
            <br />
            <span className="bg-gradient-to-r from-purple to-royal bg-clip-text italic text-transparent">
              wandered off.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md font-serif text-[18px] leading-relaxed text-navy/70"
          >
            The address you followed doesn't lead anywhere on this site. Here is everything that
            does.
          </motion.p>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Site sections"
            className="mt-14 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-3"
          >
            {navNodes.map((node) => (
              <TransitionLink
                key={node.id}
                to={node.path}
                data-cursor="OPEN"
                className="group flex flex-col items-center gap-2 bg-offwhite/80 px-4 py-6 backdrop-blur-xl transition-colors duration-500 hover:bg-white"
              >
                <span className="font-sans text-[9px] tracking-[0.3em] text-royal/45">
                  {node.index}
                </span>
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-navy transition-colors duration-500 group-hover:text-purple">
                  {node.shortLabel}
                </span>
              </TransitionLink>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <TransitionLink
              to="/"
              data-cursor="OPEN"
              className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-purple"
            >
              ← Back to the hub
            </TransitionLink>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
