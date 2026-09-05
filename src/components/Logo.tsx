interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function LogoMark({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="0 0 100 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ae-a" x1="0" y1="0" x2="45" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6E35C5" />
          <stop offset="1" stopColor="#B8A2F2" />
        </linearGradient>
        <linearGradient id="ae-e" x1="55" y1="0" x2="100" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#111936" />
          <stop offset="1" stopColor="#263F9F" />
        </linearGradient>
      </defs>
      <text
        x="30"
        y="47"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="52"
        fontStyle="italic"
        fill="url(#ae-a)"
      >
        a
      </text>
      <text
        x="68"
        y="47"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="52"
        fontStyle="italic"
        fill="url(#ae-e)"
      >
        e
      </text>
      <path
        d="M6 46c14 13 32 15 47 6 9-5 15-13 24-13 9 0 14 7 22 4"
        stroke="url(#ae-a)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

export function Logo({ size = 56, showWordmark = true, className = '' }: LogoProps) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <div className="text-center">
          <div
            className="font-display tracking-[0.35em] text-navy"
            style={{ fontSize: size * 0.24 }}
          >
            ART ENGINE
          </div>
          <div
            className="mt-0.5 tracking-[0.4em] text-muted"
            style={{ fontSize: size * 0.11 }}
          >
            MY SOLUTIONS
          </div>
        </div>
      )}
    </div>
  );
}
