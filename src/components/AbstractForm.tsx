import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AbstractFormProps {
  className?: string;
  seed?: number;
}

/**
 * Procedurally rendered abstract object — layered translucent ribbons with
 * specular highlights, standing in for photography. Two variants (seed) so
 * pages don't repeat the same composition.
 */
export function AbstractForm({ className = '', seed = 0 }: AbstractFormProps) {
  const reduced = useReducedMotion();
  const id = `af${seed}`;
  const flip = seed % 2 === 1;

  const drift = (range: number, duration: number) =>
    reduced
      ? undefined
      : {
          animate: { y: [0, -range, range * 0.6, 0], x: [0, range * 0.4, -range * 0.3, 0] },
          transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
        };

  return (
    <svg
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-core`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#EAE4FA" />
          <stop offset="26%" stopColor="#B8A2F2" />
          <stop offset="55%" stopColor="#6E35C5" />
          <stop offset="82%" stopColor="#263F9F" />
          <stop offset="100%" stopColor="#111936" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#B8A2F2" stopOpacity="0.5" />
          <stop offset="78%" stopColor="#263F9F" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#111936" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}-deep`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#263F9F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#111936" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`${id}-spec`} cx="0.34" cy="0.26" r="0.42">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-sheen`} cx="0.7" cy="0.75" r="0.5">
          <stop offset="0%" stopColor="#EAE4FA" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#EAE4FA" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={`${id}-edge`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <g transform={flip ? 'translate(600,0) scale(-1,1)' : undefined}>
        {/* deep shadow mass */}
        <motion.ellipse
          cx="330"
          cy="500"
          rx="230"
          ry="330"
          fill={`url(#${id}-deep)`}
          filter={`url(#${id}-soft)`}
          opacity="0.55"
          {...drift(26, 34)}
        />

        {/* core body */}
        <motion.path
          d="M300 90c118 0 214 92 214 214 0 96-52 150-92 214-42 68-32 174-122 174-92 0-140-96-176-166-32-62-52-118-52-186C72 208 176 90 300 90z"
          fill={`url(#${id}-core)`}
          {...drift(18, 29)}
        />

        {/* translucent ribbon sweeping across the body */}
        <motion.path
          d="M40 470c110 84 214 66 300-6 62-52 108-132 214-150-26 108-90 186-176 240-96 60-214 74-338 34z"
          fill={`url(#${id}-ribbon)`}
          filter={`url(#${id}-edge)`}
          opacity="0.85"
          {...drift(22, 24)}
        />

        {/* second, thinner ribbon */}
        <motion.path
          d="M96 640c96 52 196 44 286-16 54-36 92-88 168-112-14 78-64 142-134 186-84 52-198 62-320-58z"
          fill="#FFFFFF"
          opacity="0.22"
          filter={`url(#${id}-edge)`}
          {...drift(14, 21)}
        />

        {/* specular highlight + lower sheen */}
        <ellipse cx="300" cy="420" rx="250" ry="340" fill={`url(#${id}-spec)`} />
        <ellipse cx="330" cy="620" rx="240" ry="260" fill={`url(#${id}-sheen)`} />

        {/* glass rim light */}
        <motion.path
          d="M300 92c-118 4-216 96-222 212"
          stroke="#FFFFFF"
          strokeOpacity="0.6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          {...drift(10, 27)}
        />
      </g>
    </svg>
  );
}
