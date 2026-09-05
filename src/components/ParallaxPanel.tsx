import { motion } from 'framer-motion';
import { usePointer } from '../hooks/usePointer';
import { AbstractForm } from './AbstractForm';

interface ParallaxPanelProps {
  imageUrl?: string;
  className?: string;
  strength?: number;
  radius?: string;
  seed?: number;
}

/**
 * Curved panel holding the abstract rendered form (or a photograph once one is
 * supplied), drifting against the pointer for depth.
 */
export function ParallaxPanel({
  imageUrl,
  className = '',
  strength = 16,
  radius = '46% 52% 38% 60% / 52% 44% 56% 48%',
  seed = 0,
}: ParallaxPanelProps) {
  const pointer = usePointer();

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: radius }}>
      <motion.div
        className="absolute inset-[-8%]"
        animate={{ x: -pointer.nx * strength, y: pointer.ny * strength * 0.6 }}
        transition={{ type: 'spring', damping: 26, stiffness: 55, mass: 0.7 }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <AbstractForm className="h-full w-full" seed={seed} />
        )}
      </motion.div>
    </div>
  );
}
