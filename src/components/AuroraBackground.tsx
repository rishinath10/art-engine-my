import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Particles } from './Particles';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Cloud {
  gradient: string;
  size: string;
  position: string;
  opacity: number;
  blur: string;
  path: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}

/** royal blue lifted toward white — reads as blue without going navy */
const SOFT_BLUE = '#93A8E8';

const clouds: Cloud[] = [
  {
    gradient: 'radial-gradient(circle at 40% 40%, #A882F0 0%, #D8CCF7 46%, transparent 74%)',
    size: 'h-[85vh] w-[85vh]',
    position: '-bottom-[30vh] -left-[20vh]',
    opacity: 0.28,
    blur: 'blur-[110px]',
    path: { x: [0, 70, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.12, 0.94, 1] },
    duration: 52,
  },
  {
    gradient: `radial-gradient(circle at 50% 50%, ${SOFT_BLUE} 0%, #A9B6EE 40%, transparent 70%)`,
    size: 'h-[65vh] w-[65vh]',
    position: '-bottom-[22vh] left-[22vw]',
    opacity: 0.22,
    blur: 'blur-[120px]',
    path: { x: [0, -60, 45, 0], y: [0, 35, -35, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 61,
  },
  {
    gradient: `radial-gradient(circle at 50% 50%, ${SOFT_BLUE} 0%, #A9B6EE 46%, transparent 74%)`,
    size: 'h-[55vh] w-[55vh]',
    position: 'bottom-[-15vh] right-[8vw]',
    opacity: 0.18,
    blur: 'blur-[110px]',
    path: { x: [0, -45, 25, 0], y: [0, 40, -25, 0], scale: [1, 1.08, 0.95, 1] },
    duration: 47,
  },
  {
    gradient: 'radial-gradient(circle at 50% 50%, #EAE4FA 0%, #B8A2F2 50%, transparent 75%)',
    size: 'h-[50vh] w-[50vh]',
    position: '-top-[18vh] left-[35vw]',
    opacity: 0.17,
    blur: 'blur-[100px]',
    path: { x: [0, 50, -30, 0], y: [0, 25, -15, 0], scale: [1, 1.05, 0.92, 1] },
    duration: 58,
  },
  {
    gradient: 'radial-gradient(circle at 50% 50%, #263F9F 0%, #B8A2F2 55%, transparent 72%)',
    size: 'h-[45vh] w-[45vh]',
    position: 'top-[12vh] -left-[15vh]',
    opacity: 0.12,
    blur: 'blur-[95px]',
    path: { x: [0, 35, -20, 0], y: [0, -30, 20, 0], scale: [1, 0.95, 1.08, 1] },
    duration: 44,
  },
];

/**
 * Ambient aurora: large colour clouds drifting and morphing behind the whole
 * interface. Animates transform/opacity only so it stays cheap to composite.
 */
export function AuroraBackground({
  className = '',
  particles = true,
}: {
  className?: string;
  particles?: boolean;
}) {
  const isSmall = useMediaQuery('(max-width: 767px)');
  const reduced = useReducedMotion();

  // Large blur radii are the expensive part; small screens get fewer, lighter
  // layers and static positioning so mid-range phones stay at 60fps.
  const active = isSmall ? clouds.slice(0, 3) : clouds;
  const animateClouds = !isSmall && !reduced;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {active.map((cloud, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${cloud.size} ${cloud.position} ${
            isSmall ? 'blur-[60px]' : cloud.blur
          }`}
          style={{ background: cloud.gradient, opacity: cloud.opacity }}
          animate={
            animateClouds
              ? { x: cloud.path.x, y: cloud.path.y, scale: cloud.path.scale }
              : undefined
          }
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
      {/* The foot of the page. On phones the two colours are anchored to their
          own corners — purple bottom-left, soft blue bottom-right — where the
          screen is narrow enough to read them as distinct. Wider screens get a
          single blend across instead, which suits the longer run. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[48vh]"
        style={{
          background: isSmall
            ? `radial-gradient(92% 62% at 0% 100%, rgba(126,58,214,0.58) 0%, rgba(150,104,226,0.26) 42%, transparent 74%),
               radial-gradient(92% 62% at 100% 100%, rgba(96,132,224,0.58) 0%, rgba(147,168,232,0.26) 44%, transparent 76%)`
            : `linear-gradient(to top, rgba(147,168,232,0.34) 0%, rgba(147,168,232,0.14) 38%, transparent 78%),
               linear-gradient(102deg, rgba(110,53,197,0.30) 0%, rgba(147,168,232,0.30) 52%, rgba(184,162,242,0.32) 100%)`,
          maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 92%)',
        }}
        animate={reduced || isSmall ? undefined : { x: [0, 26, -18, 0], opacity: [0.9, 1, 0.86, 0.9] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut', times: [0, 0.34, 0.68, 1] }}
      />

      {particles && <Particles />}
      {!isSmall && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[80px]"
          style={{
            background:
              'conic-gradient(from 0deg, #6E35C5, #263F9F, #B8A2F2, #EAE4FA, #6E35C5)',
          }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}
