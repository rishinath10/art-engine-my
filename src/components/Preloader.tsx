import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { useScrollLock } from '../hooks/useScrollLock';

const MIN_DURATION = 700;

/**
 * First-load curtain. Waits for the two faces the first screen paints in — not
 * every face on the site — plus a floor duration, then lifts.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const started = performance.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => !cancelled && setDone(true), wait);
    };

    // document.fonts.ready waits for all twelve faces; the curtain only exists
    // so the title does not swap weight in view, and the build already
    // preloads exactly these two. Waiting on the rest cost seconds.
    const critical = document.fonts
      ? Promise.all([
          document.fonts.load('300 1rem "Cormorant Garamond"'),
          document.fonts.load('300 1rem "Jost"'),
        ])
      : Promise.resolve(null);
    Promise.race([critical, new Promise((r) => setTimeout(r, 1200))])
      .catch(() => undefined)
      .then(finish);

    return () => {
      cancelled = true;
    };
  }, []);

  // shares the refcounted lock with the hub, so neither releases the other's
  useScrollLock(!done);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-offwhite"
          // pointerEvents goes with the exit: the curtain stays mounted for
          // the length of the fade, and without this it keeps swallowing taps
          // on the hub behind it long after it has become invisible.
          exit={{ opacity: 0, filter: 'blur(12px)', pointerEvents: 'none' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo className="w-[168px] md:w-[210px]" />
          </motion.div>

          <div className="mt-12 h-px w-32 overflow-hidden bg-navy/10">
            <motion.div
              className="h-full bg-gradient-to-r from-purple to-royal"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: MIN_DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 font-sans text-[9px] uppercase tracking-[0.34em] text-muted"
          >
            Creativity · Technology · Digitalization
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
