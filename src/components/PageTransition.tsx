import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * The veil covers the screen while the route swaps, so this only has to carry
 * the page in and out gently. Transform + opacity only — animating `filter`
 * here forced a full-page repaint every frame and made the sweep stutter.
 */
const variants = {
  initial: { opacity: 0, scale: 1.012 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.996 },
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        opacity: { duration: 0.55, ease: [0.33, 1, 0.68, 1] },
        scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ willChange: 'opacity, transform' }}
      className="min-h-dvh"
    >
      {children}
    </motion.div>
  );
}
