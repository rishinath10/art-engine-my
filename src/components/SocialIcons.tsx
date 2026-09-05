const iconProps = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
} as const;

export function LinkedInIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.2 22 14.4V21h-4v-5.8c0-1.4-.03-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2C1 9 1 12 1 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2C23 15 23 12 23 12s0-3-.5-4.8zM9.8 15.3V8.7l5.7 3.3z" />
    </svg>
  );
}
