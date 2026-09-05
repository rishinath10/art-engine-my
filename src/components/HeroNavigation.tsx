import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NavigationNode } from './NavigationNode';
import { Logo } from './Logo';
import { navNodes, type NavNode } from '../data/navigation';
import { useTransition } from '../context/TransitionContext';

const NODE_RADIUS = 38;

export function HeroNavigation() {
  const [hovered, setHovered] = useState<NavNode | null>(null);
  const navigate = useNavigate();
  const { runTransition } = useTransition();

  const handleSelect = (node: NavNode, origin: { x: number; y: number }) => {
    runTransition(origin.x, origin.y, () => navigate(node.path));
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative aspect-square w-full max-w-[min(62vw,440px,48vh)]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r={NODE_RADIUS}
            stroke={hovered ? '#6E35C5' : '#111936'}
            strokeOpacity={hovered ? 0.35 : 0.14}
            strokeWidth="0.15"
            strokeDasharray="0.6 1.4"
            animate={{ rotate: hovered ? 6 : 0 }}
            style={{ transformOrigin: '50% 50%', transition: 'stroke 0.7s ease, stroke-opacity 0.7s ease' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r={NODE_RADIUS - 9}
            stroke="#B8A2F2"
            strokeOpacity={0.25}
            strokeWidth="0.1"
            animate={{ scale: hovered ? 1.04 : 1 }}
            style={{ transformOrigin: '50% 50%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center rounded-full bg-white"
          style={{
            x: '-50%',
            y: '-50%',
            width: '46%',
            height: '46%',
            boxShadow: '0 30px 80px -40px rgba(17,25,54,0.45), inset 0 0 0 1px rgba(231,232,238,0.9)',
          }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo size={72} />
        </motion.div>

        {navNodes.map((node) => (
          <NavigationNode
            key={node.id}
            node={node}
            radius={NODE_RADIUS}
            isActive={hovered?.id === node.id}
            isDimmed={!!hovered && hovered.id !== node.id}
            onHover={setHovered}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="mt-16 flex min-h-[76px] w-full max-w-md items-start justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-purple">
                {hovered.previewLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{hovered.previewText}</p>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] uppercase tracking-[0.3em] text-muted/70"
            >
              Explore the Art Engine world
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
