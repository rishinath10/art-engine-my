import { TransitionLink } from './TransitionLink';
import { SocialLinks } from './SocialLinks';
import { activeSocials, legal } from '../data/site';

/**
 * A quiet rule at the foot of every interior page. The homepage carries its
 * own bottom bar instead, so this deliberately stays out of the hub.
 */
const link = 'rounded-sm transition-colors hover:text-purple';

export function SiteFooter() {
  return (
    <footer className="safe-b safe-x relative z-10 mx-6 border-t border-navy/10 py-8 md:mx-14 lg:mx-24">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
        <span>
          © {new Date().getFullYear()} {legal.entity}
        </span>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {activeSocials.length > 0 && <SocialLinks className="gap-4 text-navy" />}
          <TransitionLink to="/account" data-cursor="OPEN" className={link}>
            My account
          </TransitionLink>
          <TransitionLink to="/terms" data-cursor="OPEN" className={link}>
            Terms
          </TransitionLink>
          <TransitionLink to="/privacy" data-cursor="OPEN" className={link}>
            Privacy
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
