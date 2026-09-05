import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type MinimalArtVariant =
  | 'brand'
  | 'invitation'
  | 'automation'
  | 'campaign'
  | 'agentic-ai'
  | 'digitalization'
  | 'experience';

const NAVY = '#111936';
const PURPLE = '#6E35C5';
const ROYAL = '#263F9F';
const LAVENDER = '#EAE4FA';

/**
 * Minimal editorial illustrations for thumbnails and feature panels. Thin line
 * work, one or two solid accents, a lot of quiet ground — each drawn around
 * what the piece is actually about rather than being decorative.
 */
export function MinimalArt({
  variant,
  className = '',
}: {
  variant: MinimalArtVariant;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const id = `ma-${variant}`;

  /** a line that draws itself in on first paint */
  const drawn = (delay = 0, duration = 2) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const spin = (duration: number, origin: string) =>
    reduced
      ? {}
      : {
          animate: { rotate: 360 },
          transition: { duration, repeat: Infinity, ease: 'linear' as const },
          style: { transformOrigin: origin },
        };

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#FBFAFE" />
          <stop offset="100%" stopColor={LAVENDER} />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PURPLE} />
          <stop offset="100%" stopColor={ROYAL} />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-ground)`} />

      {/* shared layout grid, barely there */}
      <g stroke={NAVY} strokeOpacity="0.07" strokeWidth="1">
        {[160, 320, 480, 640].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="600" />
        ))}
        <line x1="0" y1="300" x2="800" y2="300" />
      </g>

      {variant === 'brand' && (
        <>
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
            {...spin(90, '400px 300px')}
          />
          <rect x="286" y="196" width="150" height="188" rx="10" fill="none" stroke={NAVY} strokeOpacity="0.22" />
          <rect x="312" y="222" width="150" height="188" rx="10" fill="#FFFFFF" fillOpacity="0.85" stroke={NAVY} strokeOpacity="0.14" />
          <circle cx="387" cy="288" r="30" fill={`url(#${id}-accent)`} />
          <g stroke={NAVY} strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round">
            <line x1="336" y1="340" x2="424" y2="340" />
            <line x1="336" y1="358" x2="392" y2="358" />
          </g>
          <motion.path
            d="M150 430c96 62 214 66 320 10 78-42 132-118 224-104"
            fill="none"
            stroke={ROYAL}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            {...drawn(0.2, 2.2)}
          />
          <g>
            <circle cx="560" cy="180" r="9" fill={PURPLE} fillOpacity="0.85" />
            <circle cx="590" cy="180" r="9" fill={ROYAL} fillOpacity="0.7" />
            <circle cx="620" cy="180" r="9" fill={LAVENDER} />
          </g>
        </>
      )}

      {variant === 'invitation' && (
        <>
          {/* envelope, behind */}
          <g stroke={NAVY} strokeOpacity="0.18" fill="none">
            <rect x="232" y="212" width="248" height="176" rx="8" />
            <path d="M232 224l124 88 124-88" />
          </g>

          {/* the invitation card, lifting out and opening */}
          <g transform="rotate(-6 420 290)">
            <rect x="332" y="150" width="176" height="240" rx="10" fill="#FFFFFF" fillOpacity="0.94" stroke={NAVY} strokeOpacity="0.2" />
            <line x1="420" y1="150" x2="420" y2="390" stroke={NAVY} strokeOpacity="0.12" strokeDasharray="3 6" />
            <circle cx="420" cy="212" r="22" fill="none" stroke={PURPLE} strokeOpacity="0.55" />
            <circle cx="420" cy="212" r="7" fill={`url(#${id}-accent)`} />
            <g stroke={NAVY} strokeOpacity="0.24" strokeWidth="3" strokeLinecap="round">
              <line x1="372" y1="268" x2="468" y2="268" />
              <line x1="386" y1="288" x2="454" y2="288" />
              <line x1="396" y1="330" x2="444" y2="330" />
            </g>
          </g>

          {/* sent — one arc out to the guests */}
          <motion.path
            d="M508 300c92-16 150 22 196 84"
            fill="none"
            stroke={ROYAL}
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            strokeLinecap="round"
            {...drawn(0.3, 1.8)}
          />
          <g fill={PURPLE}>
            <circle cx="712" cy="392" r="7" fillOpacity="0.9" />
            <circle cx="742" cy="352" r="5" fillOpacity="0.6" />
            <circle cx="676" cy="428" r="5" fillOpacity="0.45" />
          </g>
        </>
      )}

      {variant === 'automation' && (
        <>
          {/* intake → agent → outputs */}
          <g stroke={NAVY} strokeOpacity="0.2" fill="none" strokeWidth="1.5">
            <path d="M196 300h108" />
            <path d="M400 244V180h140" />
            <path d="M400 356v64h140" />
            <path d="M496 300h104" />
          </g>

          {/* the agent, solid */}
          <rect x="344" y="244" width="112" height="112" rx="24" fill={`url(#${id}-accent)`} />
          <g stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="2.5" strokeLinecap="round">
            <line x1="376" y1="286" x2="424" y2="286" />
            <line x1="376" y1="306" x2="410" y2="306" />
          </g>

          {/* inbox */}
          <rect x="132" y="264" width="72" height="72" rx="10" fill="#FFFFFF" fillOpacity="0.9" stroke={NAVY} strokeOpacity="0.22" />
          <g stroke={NAVY} strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round">
            <line x1="150" y1="288" x2="186" y2="288" />
            <line x1="150" y1="302" x2="174" y2="302" />
            <line x1="150" y1="316" x2="180" y2="316" />
          </g>

          {/* handled outputs */}
          <g>
            <rect x="540" y="152" width="72" height="56" rx="8" fill="#FFFFFF" fillOpacity="0.9" stroke={NAVY} strokeOpacity="0.2" />
            <path d="M560 180l12 12 22-24" stroke={PURPLE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="540" y="392" width="72" height="56" rx="8" fill="#FFFFFF" fillOpacity="0.9" stroke={NAVY} strokeOpacity="0.2" />
            <path d="M560 420l12 12 22-24" stroke={PURPLE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="600" y="272" width="72" height="56" rx="8" fill="#FFFFFF" fillOpacity="0.9" stroke={NAVY} strokeOpacity="0.2" />
            <path d="M620 300l12 12 22-24" stroke={PURPLE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* a task moving down the line */}
          {!reduced && (
            <motion.circle
              r="5"
              fill={ROYAL}
              animate={{ cx: [200, 340, 340], cy: [300, 300, 300], opacity: [0, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
            />
          )}
        </>
      )}

      {variant === 'campaign' && (
        <>
          {/* broadcast arcs from one idea */}
          <g fill="none" stroke={NAVY} strokeOpacity="0.16">
            {[80, 140, 200, 260].map((r, i) => (
              <motion.circle
                key={r}
                cx="220"
                cy="300"
                r={r}
                strokeDasharray={i % 2 ? '3 9' : undefined}
                {...drawn(0.15 * i, 1.6)}
              />
            ))}
          </g>
          <circle cx="220" cy="300" r="26" fill={`url(#${id}-accent)`} />

          {/* four markets picking it up */}
          <g>
            {[
              { x: 470, y: 168 },
              { x: 560, y: 268 },
              { x: 540, y: 392 },
              { x: 428, y: 452 },
            ].map((m, i) => (
              <g key={i}>
                <circle cx={m.x} cy={m.y} r="13" fill="#FFFFFF" stroke={PURPLE} strokeOpacity="0.55" />
                <circle cx={m.x} cy={m.y} r="5" fill={PURPLE} fillOpacity="0.8" />
              </g>
            ))}
          </g>

          {/* reach, rising */}
          <motion.path
            d="M600 470c40-8 62-40 78-92 14-46 22-92 46-118"
            fill="none"
            stroke={ROYAL}
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="round"
            {...drawn(0.5, 2)}
          />
          <g stroke={NAVY} strokeOpacity="0.14" strokeWidth="1">
            <line x1="600" y1="500" x2="770" y2="500" />
          </g>
        </>
      )}

      {variant === 'agentic-ai' && (
        <>
          {/* a network that decides for itself */}
          <g stroke={NAVY} strokeOpacity="0.18" fill="none" strokeWidth="1.2">
            <path d="M280 220l120 80-120 80M520 220L400 300l120 80M280 220h240M280 380h240" />
          </g>
          <g>
            {[
              { x: 280, y: 220 },
              { x: 520, y: 220 },
              { x: 280, y: 380 },
              { x: 520, y: 380 },
            ].map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r="14" fill="#FFFFFF" stroke={NAVY} strokeOpacity="0.28" />
            ))}
          </g>
          <circle cx="400" cy="300" r="38" fill={`url(#${id}-accent)`} />

          {/* the loop it runs on its own */}
          <motion.path
            d="M400 190a110 110 0 1 1-78 32"
            fill="none"
            stroke={PURPLE}
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="4 9"
            strokeLinecap="round"
            {...drawn(0.2, 2.2)}
          />
          <path d="M322 222l-6 26 26-8" fill="none" stroke={PURPLE} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {variant === 'digitalization' && (
        <>
          {/* paper on the left */}
          <g transform="rotate(-4 300 300)">
            <rect x="200" y="180" width="176" height="232" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke={NAVY} strokeOpacity="0.2" />
            <g stroke={NAVY} strokeOpacity="0.24" strokeWidth="3" strokeLinecap="round">
              {[224, 250, 276, 302, 328].map((y) => (
                <line key={y} x1="228" y1={y} x2={y % 52 === 0 ? 320 : 348} y2={y} />
              ))}
            </g>
          </g>

          {/* becoming a system on the right */}
          <g>
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={480 + col * 62}
                  y={214 + row * 62}
                  width="44"
                  height="44"
                  rx="10"
                  fill={row === 1 && col === 1 ? `url(#${id}-accent)` : '#FFFFFF'}
                  fillOpacity={row === 1 && col === 1 ? 1 : 0.9}
                  stroke={NAVY}
                  strokeOpacity={row === 1 && col === 1 ? 0 : 0.18}
                />
              )),
            )}
          </g>

          {/* the crossing */}
          <motion.path
            d="M396 300h60"
            fill="none"
            stroke={ROYAL}
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
            {...drawn(0.4, 1.2)}
          />
          <path d="M444 290l14 10-14 10" fill="none" stroke={ROYAL} strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {variant === 'experience' && (
        <>
          {/* layered screens, receding */}
          <g>
            <rect x="240" y="150" width="300" height="200" rx="14" fill="#FFFFFF" fillOpacity="0.55" stroke={NAVY} strokeOpacity="0.14" />
            <rect x="270" y="190" width="300" height="200" rx="14" fill="#FFFFFF" fillOpacity="0.75" stroke={NAVY} strokeOpacity="0.16" />
            <rect x="300" y="230" width="300" height="200" rx="14" fill="#FFFFFF" fillOpacity="0.95" stroke={NAVY} strokeOpacity="0.2" />
          </g>

          {/* the composition inside the front frame */}
          <circle cx="348" cy="278" r="18" fill={`url(#${id}-accent)`} />
          <g stroke={NAVY} strokeOpacity="0.26" strokeWidth="3" strokeLinecap="round">
            <line x1="384" y1="270" x2="500" y2="270" />
            <line x1="384" y1="288" x2="456" y2="288" />
            <line x1="330" y1="340" x2="560" y2="340" />
            <line x1="330" y1="362" x2="500" y2="362" />
            <line x1="330" y1="384" x2="536" y2="384" />
          </g>

          {/* a baseline that keeps going */}
          <motion.path
            d="M140 470h520"
            fill="none"
            stroke={PURPLE}
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeLinecap="round"
            {...drawn(0.3, 1.8)}
          />
        </>
      )}
    </svg>
  );
}
