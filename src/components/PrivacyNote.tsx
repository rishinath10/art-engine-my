import { TransitionLink } from './TransitionLink';

/**
 * Sits with the submit control on both forms. Someone deciding whether to
 * hand over their details should be able to check what happens to them
 * without leaving the page they are filling in.
 */
export function PrivacyNote({ className = '' }: { className?: string }) {
  return (
    <p className={`font-sans text-[11px] font-light leading-relaxed text-muted ${className}`}>
      We use these details only to reply to you — never for a mailing list. See our{' '}
      <TransitionLink
        to="/privacy"
        data-cursor="OPEN"
        className="rounded-sm text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
      >
        privacy notice
      </TransitionLink>
      .
    </p>
  );
}
