import { useRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import type { NavNode } from '../data/navigation';

interface NavigationNodeProps {
  node: NavNode;
  index: number;
  wrapperStyle: CSSProperties;
  direction: { x: number; y: number };
  isActive: boolean;
  isDimmed: boolean;
  compact?: boolean;
  labelMode?: 'auto' | 'above';
  onHover: (node: NavNode | null) => void;
  onSelect: (node: NavNode, origin: { x: number; y: number }) => void;
}

export function NavigationNode({
  node,
  index,
  wrapperStyle,
  direction,
  isActive,
  isDimmed,
  compact = false,
  labelMode = 'auto',
  onHover,
  onSelect,
}: NavigationNodeProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = node.icon;

  const size = compact ? 46 : 64;
  const gap = size / 2 + (compact ? 12 : 18);
  const horizontal = labelMode === 'auto' && Math.abs(direction.x) > 0.5;

  const handleSelect = () => {
    const rect = ref.current?.getBoundingClientRect();
    onSelect(
      node,
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    );
  };

  return (
    <motion.div
      className="absolute h-0 w-0"
      style={wrapperStyle}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.45 + index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.button
        ref={ref}
        aria-label={`${node.label} — ${node.subtitle}`}
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(node)}
        onBlur={() => onHover(null)}
        onClick={handleSelect}
        className={`z-20 flex items-center justify-center rounded-full border transition-colors duration-500 ${
          isActive ? 'border-purple bg-purple' : 'border-navy/10 bg-white/90 backdrop-blur-sm'
        }`}
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          position: 'absolute',
        }}
        animate={{
          scale: isActive ? 1.16 : 1,
          opacity: isDimmed ? 0.4 : 1,
          x: isActive ? direction.x * 6 : 0,
          y: isActive ? direction.y * 6 : 0,
          boxShadow: isActive
            ? '0 20px 45px -14px rgba(110, 53, 197, 0.5), 0 0 0 8px rgba(184, 162, 242, 0.16)'
            : '0 12px 32px -20px rgba(17, 25, 54, 0.45)',
        }}
        whileTap={{ scale: 1.04 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          animate={{ scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center justify-center transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-royal'
          }`}
        >
          <Icon size={compact ? 17 : 20} strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      <motion.div
        className={`pointer-events-none absolute z-10 ${compact ? 'w-[58px]' : 'w-[132px]'}`}
        style={{
          textAlign: horizontal ? (direction.x > 0 ? 'left' : 'right') : 'center',
          left: horizontal ? (direction.x > 0 ? gap : undefined) : 0,
          right: horizontal ? (direction.x < 0 ? gap : undefined) : undefined,
          top: horizontal ? 0 : direction.y > 0 ? gap : undefined,
          bottom: !horizontal && direction.y < 0 ? gap : undefined,
          transform: horizontal
            ? 'translateY(-50%)'
            : `translateX(${compact ? '-29px' : '-66px'})`,
        }}
        animate={{ opacity: isDimmed ? 0.35 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`font-sans tracking-[0.3em] text-purple-light ${
            compact ? 'text-[8px]' : 'text-[9px]'
          }`}
        >
          {node.index}
        </div>
        <div
          className={`mt-1 font-sans font-medium uppercase leading-tight transition-colors duration-500 ${
            compact ? 'text-[9.5px] tracking-[0.12em]' : 'text-[11px] tracking-[0.18em]'
          } ${isActive ? 'text-purple' : 'text-navy'}`}
        >
          {compact ? node.shortLabel : node.label}
        </div>
        {!compact && (
          <div className="mt-1 font-serif text-[11px] italic tracking-wide text-muted">
            {node.subtitle}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
