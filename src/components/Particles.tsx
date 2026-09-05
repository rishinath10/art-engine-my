import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  r: number;
  drift: number;
  speed: number;
  phase: number;
  wander: number;
  alpha: number;
  tint: number;
}

const TINTS = ['110, 53, 197', '38, 63, 159', '184, 162, 242'];

/**
 * Drifting particle field. Canvas rather than DOM nodes — 40 animated elements
 * would cost 40 composited layers; here it's one.
 */
export function Particles({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isSmall = useMediaQuery('(max-width: 767px)');
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const count = isSmall ? 24 : 52;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.9 + 0.7,
        drift: Math.random() * 0.16 + 0.04,
        speed: Math.random() * 0.22 + 0.06,
        phase: Math.random() * Math.PI * 2,
        wander: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.34 + 0.2,
        tint: Math.floor(Math.random() * TINTS.length),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduced) {
          p.y -= p.speed;
          p.x += Math.sin(t * 0.0004 + p.phase) * p.wander * 0.35;
          if (p.y < -12) {
            p.y = height + 12;
            p.x = Math.random() * width;
          }
        }

        // gentle push away from the cursor
        let px = p.x;
        let py = p.y;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const push = (1 - dist / 130) * 26;
          px += (dx / (dist || 1)) * push;
          py += (dy / (dist || 1)) * push;
        }

        const twinkle = reduced ? 1 : 0.65 + Math.sin(t * 0.0012 + p.phase) * 0.35;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TINTS[p.tint]}, ${p.alpha * twinkle})`;
        ctx.fill();
      }

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    resize();
    draw(0);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    if (!isSmall) window.addEventListener('pointermove', handlePointer, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isSmall, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
