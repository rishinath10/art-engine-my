import logoLockup from '../assets/brand/ae-logo.png';
import logoIcon from '../assets/brand/ae-icon.png';

interface LogoProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size, className = '' }: LogoProps) {
  return (
    <img
      src={logoIcon}
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
      src={logoLockup}
      alt="Art Engine My"
      style={size ? { width: size } : undefined}
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}
