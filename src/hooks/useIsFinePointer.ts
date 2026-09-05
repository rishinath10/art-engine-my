import { useEffect, useState } from 'react';

export function useIsFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isFine;
}
