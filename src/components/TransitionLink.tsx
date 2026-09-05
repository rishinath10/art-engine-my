import type { MouseEvent } from 'react';
import { Link, useNavigate, type LinkProps } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

/**
 * A Link that plays the circular expansion before changing route, so every
 * navigation in the site feels like the hub's, not a page swap.
 */
export function TransitionLink({ to, onClick, children, ...rest }: LinkProps) {
  const navigate = useNavigate();
  const { runTransition } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // let the browser handle modified clicks (new tab, etc.)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    runTransition(e.clientX, e.clientY, () => navigate(to));
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
