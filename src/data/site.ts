/**
 * Single source for the facts that live outside the page content: where the
 * site is served from, where its social profiles are, and what the hero's
 * story button plays. The build reads the same values when it writes canonical
 * tags, the sitemap and robots.txt, so there is one place to change them.
 */

/** Canonical origin. No trailing slash — every consumer appends the path. */
export const SITE_URL = 'https://artenginemy.com';

export const SITE_NAME = 'Art Engine My Solutions';

/** 1200×630 card used by WhatsApp, LinkedIn, X and iMessage previews. */
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Square-ish brand mark, for the search-result knowledge panel. */
export const LOGO_URL = `${SITE_URL}/logo.png`;

export interface SocialLink {
  id: 'linkedin' | 'instagram' | 'youtube';
  label: string;
  /** Empty until the real profile URL is known — an empty entry is not rendered. */
  url: string;
}

/**
 * Add the real profile URLs here and the icons reappear across the site.
 * They stay hidden while blank rather than linking nowhere.
 */
export const socials: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'youtube', label: 'YouTube', url: '' },
];

export const activeSocials = socials.filter((s) => s.url !== '');

/**
 * Embed URL for the brand film behind "Watch Our Story" — a YouTube or Vimeo
 * embed link, or a direct .mp4. While it is blank the button routes to the
 * About page instead of doing nothing.
 */
export const STORY_VIDEO_URL = '';
