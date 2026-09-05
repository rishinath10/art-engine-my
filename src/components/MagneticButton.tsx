import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MagneticButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'ref'> {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  showArrow?: boolean;
  cursorLabel?: string;
}

export function MagneticButton({
  children,
  variant = 'solid',
  showArrow = true,
  cursorLabel = 'OPEN',
  className = '',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 200 });
  const springY = useSpring(y, { damping: 18, stiffness: 200 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === 'solid'
      ? 'bg-navy text-white hover:bg-purple'
      : 'border border-navy/20 text-navy hover:border-purple hover:text-purple';

  return (
    <motion.button
      ref={ref}
      data-cursor={cursorLabel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${base} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {showArrow && (
        <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
          <ArrowRight
            size={16}
            className="absolute transition-transform duration-300 ease-out group-hover:translate-x-5"
          />
          <ArrowRight
            size={16}
            className="absolute -translate-x-5 transition-transform duration-300 ease-out group-hover:translate-x-0"
          />
        </span>
      )}
    </motion.button>
  );
}
