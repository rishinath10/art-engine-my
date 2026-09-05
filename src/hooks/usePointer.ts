import { useEffect, useState } from 'react';

export interface PointerState {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

const initial: PointerState = { x: 0, y: 0, nx: 0, ny: 0 };

export function usePointer() {
  const [pointer, setPointer] = useState<PointerState>(initial);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x: e.clientX, y: e.clientY, nx, ny });
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return pointer;
}
