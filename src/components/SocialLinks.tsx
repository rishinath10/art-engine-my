import { InstagramIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons';
import { activeSocials, type SocialLink } from '../data/site';

const icons: Record<SocialLink['id'], () => React.JSX.Element> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};

/**
 * Renders only the profiles that have a real URL in src/data/site.ts. An icon
 * that links nowhere is worse than no icon, so blanks are left out entirely
 * and reappear the moment a URL is filled in.
 */
export function SocialLinks({ className = '' }: { className?: string }) {
  if (activeSocials.length === 0) return null;

  return (
    <div className={`flex items-center ${className}`}>
      {activeSocials.map((social) => {
        const Icon = icons[social.id];
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="VISIT"
            aria-label={social.label}
            className="rounded-sm transition-colors hover:text-purple"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
