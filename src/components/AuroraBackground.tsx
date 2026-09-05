import { motion } from 'framer-motion';

interface Cloud {
  gradient: string;
  size: string;
  position: string;
  opacity: number;
  blur: string;
  path: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}

const clouds: Cloud[] = [
  {
    gradient: 'radial-gradient(circle at 40% 40%, #B8A2F2 0%, #EAE4FA 45%, transparent 72%)',
    size: 'h-[85vh] w-[85vh]',
    position: '-bottom-[30vh] -left-[20vh]',
    opacity: 0.28,
    blur: 'blur-[110px]',
    path: { x: [0, 70, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.12, 0.94, 1] },
    duration: 52,
  },
  {
    gradient: 'radial-gradient(circle at 50% 50%, #6E35C5 0%, #B8A2F2 40%, transparent 70%)',
    size: 'h-[65vh] w-[65vh]',
    position: '-bottom-[22vh] left-[22vw]',
    opacity: 0.15,
    blur: 'blur-[120px]',
    path: { x: [0, -60, 45, 0], y: [0, 35, -35, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 61,
  },
  {
    gradient: 'radial-gradient(circle at 50% 50%, #263F9F 0%, #6E35C5 45%, transparent 72%)',
    size: 'h-[55vh] w-[55vh]',
    position: 'bottom-[-15vh] right-[8vw]',
    opacity: 0.13,
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
    gradient: 'radial-gradient(circle at 50% 50%, #B8A2F2 0%, transparent 68%)',
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
export function AuroraBackground({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${cloud.size} ${cloud.position} ${cloud.blur}`}
          style={{ background: cloud.gradient, opacity: cloud.opacity }}
          animate={{
            x: cloud.path.x,
            y: cloud.path.y,
            scale: cloud.path.scale,
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[80px]"
        style={{
          background:
            'conic-gradient(from 0deg, #6E35C5, #263F9F, #B8A2F2, #EAE4FA, #6E35C5)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
