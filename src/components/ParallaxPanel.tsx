import { motion } from 'framer-motion';
import { usePointer } from '../hooks/usePointer';

interface ParallaxPanelProps {
  imageUrl?: string;
  className?: string;
  strength?: number;
  radius?: string;
}

/**
 * Large curved image panel for the cinematic architectural imagery called for
 * in the spec. Renders a placeholder gradient + line-art skyline until a real
 * photograph (imageUrl) is supplied.
 */
export function ParallaxPanel({
  imageUrl,
  className = '',
  strength = 16,
  radius = '46% 52% 38% 60% / 52% 44% 56% 48%',
}: ParallaxPanelProps) {
  const pointer = usePointer();
  const offsetX = -pointer.nx * strength;
  const offsetY = pointer.ny * strength * 0.6;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: radius }}>
      <motion.div
        className="absolute inset-[-6%]"
        animate={{ x: offsetX, y: offsetY }}
        transition={{ type: 'spring', damping: 24, stiffness: 60, mass: 0.6 }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="relative h-full w-full bg-gradient-to-br from-lavender via-purple-light to-royal">
            <svg
              viewBox="0 0 400 600"
              className="absolute inset-0 h-full w-full opacity-20"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <g stroke="#FFFFFF" strokeWidth="1" fill="none">
                <path d="M-40 420C80 340 200 380 300 300S460 180 520 200" />
                <path d="M-40 470C80 390 200 430 300 350S460 230 520 250" />
                <path d="M-40 520C80 440 200 480 300 400S460 280 520 300" />
              </g>
              <g stroke="#111936" strokeWidth="0.75" fill="none" opacity="0.5">
                <circle cx="300" cy="180" r="120" />
                <circle cx="300" cy="180" r="170" />
              </g>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/10" />
      </motion.div>
    </div>
  );
}
