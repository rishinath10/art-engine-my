interface LogoProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size, className = '' }: LogoProps) {
  return (
    <img
      src="/brand/ae-icon.png"
      alt=""
      aria-hidden="true"
      style={size ? { width: size } : undefined}
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}

export function Logo({ size, className = '' }: LogoProps) {
  return (
    <img
      src="/brand/ae-logo.png"
      alt="Art Engine My"
      style={size ? { width: size } : undefined}
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}
