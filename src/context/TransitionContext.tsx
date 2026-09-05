import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionState {
  active: boolean;
  x: number;
  y: number;
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

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>({ active: false, x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runTransition = useCallback((x: number, y: number, onCovered: () => void) => {
    setState({ active: true, x, y });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onCovered();
      setTimeout(() => setState((s) => ({ ...s, active: false })), 550);
    }, 420);
  }, []);

  const maxDim =
    typeof window !== 'undefined'
      ? Math.hypot(Math.max(state.x, window.innerWidth - state.x), Math.max(state.y, window.innerHeight - state.y)) * 2.2
      : 2000;

  return (
    <TransitionContext.Provider value={{ runTransition }}>
      {children}
      <AnimatePresence>
        {state.active && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[900]"
            style={{
              background: 'radial-gradient(circle, #6E35C5 0%, #263F9F 55%, #111936 100%)',
            }}
            initial={{ clipPath: `circle(0px at ${state.x}px ${state.y}px)` }}
            animate={{ clipPath: `circle(${maxDim}px at ${state.x}px ${state.y}px)` }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
