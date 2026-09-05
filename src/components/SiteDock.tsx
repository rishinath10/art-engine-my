import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from './Logo';
import { navNodes } from '../data/navigation';
import { TransitionLink } from './TransitionLink';

/**
 * Minimal, persistent way to return to the central hub and jump between
 * destinations from any interior page — deliberately not a navbar.
 */
export function SiteDock() {
  const location = useLocation();

  return (
    <>
      {/* The glass treatment disappeared against the white sections, so the
          home button carries the brand gradient and a white mark instead —
          the one element on an interior page that must always be findable. */}
      <TransitionLink
        to="/"
        data-cursor="HUB"
        className="safe-t safe-x fixed left-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-purple to-royal transition-transform duration-300 hover:scale-105 active:scale-95 md:left-10 md:top-8"
        style={{
          boxShadow:
            '0 16px 36px -14px rgba(38, 63, 159, 0.55), inset 0 1px 0 0 rgba(255,255,255,0.25)',
        }}
        aria-label="Back to home"
      >
        {/* brightness(0) flattens the mark to black, invert(1) lifts it to
            white — the alpha channel, and so the letterforms, survive both. */}
        <LogoMark size={28} className="brightness-0 invert" />
      </TransitionLink>

      <nav
        className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-2 md:flex md:bottom-10 md:right-10"
        aria-label="Site destinations"
      >
        {navNodes.map((node) => {
          const active = location.pathname === node.path;
          return (
            <TransitionLink
              key={node.id}
              to={node.path}
              data-cursor="OPEN"
              className="group flex items-center gap-3"
            >
              <span
                className={`text-[11px] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                  active ? 'text-purple' : 'text-navy'
                }`}
              >
                {node.label}
              </span>
              <motion.span
                className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                  active ? 'bg-purple' : 'bg-navy/25 group-hover:bg-purple group-focus-visible:bg-purple'
                }`}
                whileHover={{ scale: 1.6 }}
              />
            </TransitionLink>
          );
        })}
      </nav>
    </>
  );
}
