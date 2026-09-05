import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { NavNode } from '../data/navigation';

interface NavigationNodeProps {
  node: NavNode;
  radius: number;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (node: NavNode | null) => void;
  onSelect: (node: NavNode, origin: { x: number; y: number }) => void;
}

const NODE_SIZE = 'clamp(48px, 5.2vw, 68px)';
const GAP = `calc(${NODE_SIZE} / 2 + 16px)`;

export function NavigationNode({
  node,
  radius,
  isActive,
  isDimmed,
  onHover,
  onSelect,
}: NavigationNodeProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const rad = (node.angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const isHorizontal = Math.abs(cos) > 0.5;
  const Icon = node.icon;

  const handleSelect = () => {
    const rect = ref.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    onSelect(node, origin);
  };

  return (
    <>
      <motion.button
        ref={ref}
        aria-label={`${node.label} — ${node.subtitle}`}
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(node)}
        onBlur={() => onHover(null)}
        onClick={handleSelect}
        className={`absolute z-20 flex items-center justify-center rounded-full border transition-colors duration-500 ${
          isActive ? 'border-purple bg-purple' : 'border-navy/10 bg-white'
        }`}
        style={{
          left: `${50 + radius * cos}%`,
          top: `${50 + radius * sin}%`,
          x: '-50%',
          y: '-50%',
          width: NODE_SIZE,
          height: NODE_SIZE,
        }}
        animate={{
          scale: isActive ? 1.18 : 1,
          opacity: isDimmed ? 0.45 : 1,
          boxShadow: isActive
            ? '0 18px 40px -12px rgba(110, 53, 197, 0.55), 0 0 0 6px rgba(184, 162, 242, 0.18)'
            : '0 10px 30px -18px rgba(17, 25, 54, 0.5)',
        }}
        whileTap={{ scale: 1.06 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center justify-center transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-royal'
          }`}
        >
          <Icon size={20} strokeWidth={1.6} />
        </motion.span>
      </motion.button>

      <motion.div
        className="pointer-events-none absolute z-10 w-[140px]"
        style={{
          left: `${50 + radius * cos}%`,
          top: `${50 + radius * sin}%`,
          textAlign: isHorizontal ? (cos > 0 ? 'left' : 'right') : 'center',
          paddingLeft: isHorizontal && cos > 0 ? GAP : undefined,
          paddingRight: isHorizontal && cos < 0 ? GAP : undefined,
          paddingTop: !isHorizontal && sin > 0 ? GAP : undefined,
          paddingBottom: !isHorizontal && sin < 0 ? GAP : undefined,
          translateX: isHorizontal ? (cos > 0 ? '0%' : '-100%') : '-50%',
          translateY: isHorizontal ? '-50%' : sin > 0 ? '0%' : '-100%',
        }}
        animate={{ opacity: isDimmed ? 0.4 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-[10px] tracking-[0.25em] text-purple-light">{node.index}</div>
        <div
          className={`mt-1 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
            isActive ? 'text-purple' : 'text-navy'
          }`}
        >
          {node.label}
        </div>
        <div className="mt-0.5 text-[10px] tracking-wide text-muted">{node.subtitle}</div>
      </motion.div>
    </>
  );
}
