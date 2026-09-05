import { TransitionLink } from './TransitionLink';
import { SocialLinks } from './SocialLinks';
import { activeSocials, legal } from '../data/site';

/**
 * A quiet rule at the foot of every interior page. The homepage carries its
 * own bottom bar instead, so this deliberately stays out of the hub.
 */
export function SiteFooter() {
  return (
    <footer className="safe-b safe-x relative z-10 mx-6 border-t border-navy/10 py-8 md:mx-14 lg:mx-24">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
        <span>
          © {new Date().getFullYear()} {legal.entity}
        </span>

        <div className="flex items-center gap-6">
          {activeSocials.length > 0 && <SocialLinks className="gap-4 text-navy" />}
          <TransitionLink
            to="/privacy"
            data-cursor="OPEN"
            className="rounded-sm transition-colors hover:text-purple"
          >
            Privacy
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
