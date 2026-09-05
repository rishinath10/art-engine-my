import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionState {
  active: boolean;
  x: number;
  y: number;
  size: number;
}

interface TransitionContextValue {
  runTransition: (x: number, y: number, onCovered: () => void) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used within TransitionProvider');
  return ctx;
}

const idle: TransitionState = { active: false, x: 0, y: 0, size: 0 };

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>(idle);
  const pending = useRef<(() => void) | null>(null);

  const runTransition = useCallback((x: number, y: number, onCovered: () => void) => {
    if (typeof window === 'undefined') {
      onCovered();
      return;
    }
    // the circle has to reach the furthest corner from the click point
    const reach = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    pending.current = onCovered;
    setState({ active: true, x, y, size: Math.ceil(reach * 2) + 40 });
  }, []);

  // Fires the moment the veil actually covers the screen, so the route swap is
  // never visible — the old timing-based guess could change the page mid-sweep.
  const handleCovered = () => {
    if (!pending.current) return;
    pending.current();
    pending.current = null;
    requestAnimationFrame(() => setState((s) => ({ ...s, active: false })));
  };

  return (
    <TransitionContext.Provider value={{ runTransition }}>
      {children}
      <AnimatePresence>
        {state.active && (
          <motion.div
            key="veil"
            aria-hidden="true"
            className="pointer-events-none fixed z-[900] rounded-full"
            style={{
              left: state.x,
              top: state.y,
              width: state.size,
              height: state.size,
              marginLeft: -state.size / 2,
              marginTop: -state.size / 2,
              willChange: 'transform, opacity',
              background:
                'radial-gradient(circle at 50% 45%, #6E35C5 0%, #3B4BAE 48%, #111936 100%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.62, ease: [0.33, 1, 0.68, 1] } }}
            transition={{ duration: 0.66, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleCovered}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
