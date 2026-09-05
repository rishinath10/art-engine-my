import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from './Logo';
import { navNodes } from '../data/navigation';

/**
 * Minimal, persistent way to return to the central hub and jump between
 * destinations from any interior page — deliberately not a navbar.
 */
export function SiteDock() {
  const location = useLocation();

  return (
    <>
      <Link
        to="/"
        data-cursor="HUB"
        className="safe-t safe-x fixed left-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-navy/10 bg-white/70 backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95 md:left-10 md:top-8"
        aria-label="Back to home"
      >
        <LogoMark size={28} />
      </Link>

      <nav
        className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-2 md:flex md:bottom-10 md:right-10"
        aria-label="Site destinations"
      >
        {navNodes.map((node) => {
          const active = location.pathname === node.path;
          return (
            <Link
              key={node.id}
              to={node.path}
              data-cursor="OPEN"
              className="group flex items-center gap-3"
            >
              <span
                className={`text-[11px] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  active ? 'text-purple' : 'text-navy'
                }`}
              >
                {node.label}
              </span>
              <motion.span
                className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                  active ? 'bg-purple' : 'bg-navy/25 group-hover:bg-purple'
                }`}
                whileHover={{ scale: 1.6 }}
              />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
