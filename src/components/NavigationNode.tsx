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
  labelMode?: 'auto' | 'above' | 'radial';
  /** distance from node centre to label centre, for radial placement */
  outwardOffset?: number;
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
  outwardOffset = 48,
  onHover,
  onSelect,
}: NavigationNodeProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = node.icon;

  const size = compact ? 54 : 64;
  const gap = size / 2 + (compact ? 13 : 18);
  const horizontal = labelMode === 'auto' && Math.abs(direction.x) > 0.5;
  const radial = labelMode === 'radial';
  // A radial label sits directly outward, so an outward nudge would push the
  // enlarged node over its own first letters — lean it inward instead.
  const pull = radial ? -5 : 6;

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
          isActive
            ? 'border-royal/60 bg-gradient-to-br from-purple to-royal'
            : 'border-white/70 bg-white/55 backdrop-blur-md'
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
          x: isActive ? direction.x * pull : 0,
          y: isActive ? direction.y * pull : 0,
          boxShadow: isActive
            ? '0 20px 45px -14px rgba(38, 63, 159, 0.45), 0 0 0 8px rgba(184, 162, 242, 0.16)'
            : '0 12px 32px -18px rgba(17, 25, 54, 0.4), inset 0 1px 0 0 rgba(255,255,255,0.85)',
        }}
        whileTap={{ scale: 0.92 }}
        onTouchStart={() => onHover(node)}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          animate={{ scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center justify-center transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-royal'
          }`}
        >
          <Icon size={compact ? 19 : 20} strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      <motion.div
        className={`pointer-events-none absolute z-10 ${compact ? 'w-[58px]' : 'w-[132px]'}`}
        style={
          radial
            ? {
                textAlign: 'center',
                left: direction.x * outwardOffset,
                top: direction.y * outwardOffset,
                transform: 'translate(-50%, -50%)',
              }
            : {
                textAlign: horizontal ? (direction.x > 0 ? 'left' : 'right') : 'center',
                left: horizontal ? (direction.x > 0 ? gap : undefined) : 0,
                right: horizontal ? (direction.x < 0 ? gap : undefined) : undefined,
                top: horizontal ? 0 : direction.y > 0 ? gap : undefined,
                bottom: !horizontal && direction.y < 0 ? gap : undefined,
                transform: horizontal
                  ? 'translateY(-50%)'
                  : `translateX(${compact ? '-29px' : '-66px'})`,
              }
        }
        animate={{ opacity: isDimmed ? 0.35 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`font-sans tracking-[0.3em] text-royal/45 ${
            compact ? 'text-[7.5px]' : 'text-[9px]'
          }`}
        >
          {node.index}
        </div>
        <div
          className={`mt-1 font-sans font-medium uppercase leading-tight transition-colors duration-500 ${
            compact ? 'text-[9.5px] tracking-[0.06em]' : 'text-[11px] tracking-[0.18em]'
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
