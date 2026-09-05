import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsFinePointer } from '../hooks/useIsFinePointer';

export function CustomCursor() {
  const isFine = useIsFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (!isFine) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null;
      setLabel(target?.getAttribute('data-cursor') || null);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerover', handleOver);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [isFine, visible, x, y]);

  if (!isFine) return null;

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full ${
        label ? 'border border-purple/60 bg-white/25 backdrop-blur-[2px]' : 'bg-navy'
      }`}
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: label ? 72 : 9,
        height: label ? 72 : 9,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
    >
      {label && (
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-purple">
          {label}
        </span>
      )}
    </motion.div>
  );
}
