import { motion } from 'framer-motion';

/**
 * Slow-moving abstract purple/blue blobs used as the ambient background
 * "digital energy" layer across the site (spec section 14).
 */
export function OrganicFlow({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute -bottom-1/3 -left-1/4 h-[70vh] w-[70vh] rounded-full opacity-40 blur-[90px]"
        style={{ background: 'radial-gradient(circle, #B8A2F2 0%, #EAE4FA 60%, transparent 75%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/4 h-[55vh] w-[55vh] rounded-full opacity-30 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #263F9F 0%, #6E35C5 55%, transparent 75%)' }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -20, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 46, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full opacity-20 blur-[80px]"
        style={{ background: 'radial-gradient(circle, #6E35C5 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 10, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
