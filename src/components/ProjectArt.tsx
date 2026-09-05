import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type ProjectArtVariant = 'brand';

const NAVY = '#111936';
const PURPLE = '#6E35C5';
const ROYAL = '#263F9F';
const LAVENDER = '#EAE4FA';

/**
 * Minimal editorial illustration for a project thumbnail — thin line work,
 * one or two solid accents, and a lot of quiet ground. Each variant is drawn
 * around what the project actually was, rather than being decorative.
 */
export function ProjectArt({
  variant,
  className = '',
}: {
  variant: ProjectArtVariant;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pa-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#FBFAFE" />
          <stop offset="100%" stopColor={LAVENDER} />
        </linearGradient>
        <linearGradient id="pa-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={ROYAL} />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#pa-ground)" />

      {/* type-specimen grid, barely there */}
      <g stroke={NAVY} strokeOpacity="0.07" strokeWidth="1">
        {[160, 320, 480, 640].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="600" />
        ))}
        <line x1="0" y1="300" x2="800" y2="300" />
      </g>

      {variant === 'brand' && (
        <>
          {/* the mark: an outlined circle with a slow dashed orbit */}
          <circle cx="400" cy="300" r="150" fill="none" stroke={NAVY} strokeOpacity="0.16" />
          <motion.circle
            cx="400"
            cy="300"
            r="182"
            fill="none"
            stroke={PURPLE}
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="2 10"
            style={{ transformOrigin: '400px 300px' }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />

          {/* brand system: stacked plates, offset like a layout grid */}
          <rect x="286" y="196" width="150" height="188" rx="10" fill="none" stroke={NAVY} strokeOpacity="0.22" />
          <rect x="312" y="222" width="150" height="188" rx="10" fill="#FFFFFF" fillOpacity="0.85" stroke={NAVY} strokeOpacity="0.14" />

          {/* the one solid accent — the mark itself */}
          <circle cx="387" cy="288" r="30" fill="url(#pa-accent)" />

          {/* typographic rules inside the plate */}
          <g stroke={NAVY} strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round">
            <line x1="336" y1="340" x2="424" y2="340" />
            <line x1="336" y1="358" x2="392" y2="358" />
          </g>

          {/* the swash, echoing the logo */}
          <motion.path
            d="M150 430c96 62 214 66 320 10 78-42 132-118 224-104"
            fill="none"
            stroke={ROYAL}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* colour chips */}
          <g>
            <circle cx="560" cy="180" r="9" fill={PURPLE} fillOpacity="0.85" />
            <circle cx="590" cy="180" r="9" fill={ROYAL} fillOpacity="0.7" />
            <circle cx="620" cy="180" r="9" fill={LAVENDER} />
          </g>
        </>
      )}
    </svg>
  );
}
