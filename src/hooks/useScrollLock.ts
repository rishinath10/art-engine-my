import { useEffect } from 'react';

/**
 * Freezes page scrolling while active.
 *
 * Refcounted, because more than one thing wants the page still at once — the
 * preloader holds a lock while it covers the screen, and the hub holds one for
 * as long as it is on screen. Without counting, whichever released first would
 * hand scrolling back while the other still needed it held.
 */
let locks = 0;
let saved: { bodyOverflow: string; bodyOverscroll: string; htmlOverflow: string } | null = null;

function acquire() {
  if (typeof document === 'undefined') return;
  locks += 1;
  if (locks > 1) return;

  const { body, documentElement: html } = document;
  saved = {
    bodyOverflow: body.style.overflow,
    bodyOverscroll: body.style.overscrollBehavior,
    htmlOverflow: html.style.overflow,
  };
  body.style.overflow = 'hidden';
  body.style.overscrollBehavior = 'none';
  html.style.overflow = 'hidden';
}

function release() {
  if (typeof document === 'undefined') return;
  locks = Math.max(0, locks - 1);
  if (locks > 0 || !saved) return;

  const { body, documentElement: html } = document;
  body.style.overflow = saved.bodyOverflow;
  body.style.overscrollBehavior = saved.bodyOverscroll;
  html.style.overflow = saved.htmlOverflow;
  saved = null;
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    acquire();
    return release;
  }, [active]);
}
