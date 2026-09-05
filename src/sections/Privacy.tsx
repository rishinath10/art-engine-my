import type { ReactNode } from 'react';
import { PageShell } from '../components/PageShell';
import { Reveal } from '../components/Reveal';
import { privacySections } from '../data/privacy';
import { legal } from '../data/site';

const contactPattern = new RegExp(
  `(${legal.email}|${legal.phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
  'g',
);

/**
 * A notice about exercising your rights should let you act on it in one tap,
 * so the address and number in the prose become real links.
 */
function withContactLinks(text: string): ReactNode[] {
  return text.split(contactPattern).map((part, i) => {
    if (part === legal.email) {
      return (
        <a key={i} href={`mailto:${part}`} data-cursor="OPEN" className="text-purple underline underline-offset-4 decoration-purple/30 transition-colors hover:decoration-purple">
          {part}
        </a>
      );
    }
    if (part === legal.phone) {
      return (
        <a key={i} href={`tel:${part.replace(/[^+\d]/g, '')}`} data-cursor="OPEN" className="text-purple underline underline-offset-4 decoration-purple/30 transition-colors hover:decoration-purple">
          {part}
        </a>
      );
    }
    return part;
  });
}

export function Privacy() {
  return (
    <PageShell
      eyebrow="Legal"
      title={
        <>
          Privacy
          <br />
          <span className="italic">Notice</span>
        </>
      }
      intro="What this site collects, what we do with it, and how to get it back or have it removed."
    >
      <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-muted">
        Last updated {legal.updated}
      </p>

      {/* A single measure throughout — this is a document to be read start to
          finish, not a grid to be scanned. */}
      <div className="glass glass-divide mt-14 max-w-2xl rounded-3xl px-7 py-2 md:px-10">
        {privacySections.map((section, i) => (
          <Reveal key={section.heading} delay={Math.min(i, 4) * 0.05}>
            <section className="py-10">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-light leading-tight text-navy">
                {section.heading}
              </h2>

              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 font-sans text-[15px] font-light leading-[1.85] text-muted"
                >
                  {withContactLinks(paragraph)}
                </p>
              ))}

              {section.points && (
                <ul className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-4 font-sans text-[15px] font-light leading-[1.7] text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] h-px w-4 shrink-0 bg-purple/50"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
