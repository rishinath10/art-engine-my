import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NavigationNode } from './NavigationNode';
import { Logo } from './Logo';
import { navNodes, type NavNode } from '../data/navigation';
import { useTransition } from '../context/TransitionContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

const RING_RADIUS = 38;

/** Arc sweep for the mobile layout: left to right across the top of a circle
 *  whose centre sits below the screen, keeping every node in the thumb zone. */
const ARC_START = 168;
const ARC_END = 12;
const ARC_RX = 41;
const ARC_RY = 84;

function HoverPreview({ hovered }: { hovered: NavNode | null }) {
  return (
    <AnimatePresence mode="wait">
      {hovered ? (
        <motion.div
          key={hovered.id}
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-purple">
            {hovered.previewLabel}
          </p>
          <p className="mx-auto mt-3 max-w-sm font-serif text-[17px] leading-relaxed text-navy/70">
            {hovered.previewText}
          </p>
        </motion.div>
      ) : (
        <motion.p
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-[10px] uppercase tracking-[0.34em] text-muted/60"
        >
          Explore the Art Engine world
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function HeroNavigation() {
  const [hovered, setHovered] = useState<NavNode | null>(null);
  const navigate = useNavigate();
  const { runTransition } = useTransition();
  const isCompact = useMediaQuery('(max-width: 1023px)');

  const handleSelect = (node: NavNode, origin: { x: number; y: number }) => {
    runTransition(origin.x, origin.y, () => navigate(node.path));
  };

  if (isCompact) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="flex min-h-[96px] w-full max-w-sm items-start justify-center px-6 text-center">
          <HoverPreview hovered={hovered} />
        </div>

        <div className="relative -mx-6 mt-6 h-[206px] w-screen max-w-[520px] sm:h-[250px] sm:max-w-[660px]">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
            fill="none"
          >
            <motion.ellipse
              cx="50"
              cy="100"
              rx={ARC_RX}
              ry={ARC_RY}
              stroke={hovered ? '#6E35C5' : '#111936'}
              strokeOpacity={hovered ? 0.35 : 0.2}
              strokeWidth="1"
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ transition: 'stroke 0.7s ease, stroke-opacity 0.7s ease' }}
            />
          </svg>

          {navNodes.map((node, i) => {
            const angle =
              ((ARC_START - (i * (ARC_START - ARC_END)) / (navNodes.length - 1)) * Math.PI) / 180;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return (
              <NavigationNode
                key={node.id}
                node={node}
                index={i}
                compact
                labelMode="above"
                wrapperStyle={{
                  left: `${50 + ARC_RX * cos}%`,
                  bottom: `${sin * ARC_RY}%`,
                }}
                direction={{ x: cos, y: -1 }}
                isActive={hovered?.id === node.id}
                isDimmed={!!hovered && hovered.id !== node.id}
                onHover={setHovered}
                onSelect={handleSelect}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative aspect-square w-full max-w-[min(58vw,470px,52vh)]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            stroke={hovered ? '#6E35C5' : '#111936'}
            strokeOpacity={hovered ? 0.32 : 0.13}
            strokeWidth="0.15"
            strokeDasharray="0.5 1.5"
            initial={{ pathLength: 0, rotate: -30 }}
            animate={{ pathLength: 1, rotate: hovered ? 4 : 0 }}
            style={{
              transformOrigin: '50% 50%',
              transition: 'stroke 0.8s ease, stroke-opacity 0.8s ease',
            }}
            transition={{
              pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
              rotate: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r={RING_RADIUS - 8}
            stroke="#B8A2F2"
            strokeOpacity={0.22}
            strokeWidth="0.1"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: hovered ? 1.03 : 1, opacity: 1 }}
            style={{ transformOrigin: '50% 50%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          />
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm"
          style={{
            x: '-50%',
            y: '-50%',
            width: '48%',
            height: '48%',
            boxShadow:
              '0 40px 90px -50px rgba(17,25,54,0.5), inset 0 0 0 1px rgba(231,232,238,0.85)',
          }}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: hovered ? 1.045 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo className="w-[70%]" />
        </motion.div>

        {navNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          return (
            <NavigationNode
              key={node.id}
              node={node}
              index={i}
              wrapperStyle={{
                left: `${50 + RING_RADIUS * cos}%`,
                top: `${50 + RING_RADIUS * sin}%`,
              }}
              direction={{ x: cos, y: sin }}
              isActive={hovered?.id === node.id}
              isDimmed={!!hovered && hovered.id !== node.id}
              onHover={setHovered}
              onSelect={handleSelect}
            />
          );
        })}
      </div>

      <div className="mt-20 flex min-h-[84px] w-full max-w-md items-start justify-center px-4 text-center">
        <HoverPreview hovered={hovered} />
      </div>
    </div>
  );
}
