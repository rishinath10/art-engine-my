import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { legal } from '../data/site';

export interface LegalSection {
  heading: string;
  body: string[];
  points?: string[];
}

const contactPattern = new RegExp(
  `(${legal.email}|${legal.phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
  'g',
);

const linkClass =
  'text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple';

/**
 * A document about exercising your rights, or about getting your money back,
 * should let you act on it in one tap — so the address and number in the prose
 * become real links wherever they appear.
 */
function withContactLinks(text: string): ReactNode[] {
  return text.split(contactPattern).map((part, i) => {
    if (part === legal.email) {
      return (
        <a key={i} href={`mailto:${part}`} data-cursor="OPEN" className={linkClass}>
          {part}
        </a>
      );
    }
    if (part === legal.phone) {
      return (
        <a key={i} href={`tel:${part.replace(/[^+\d]/g, '')}`} data-cursor="OPEN" className={linkClass}>
          {part}
        </a>
      );
    }
    return part;
  });
}

/**
 * Shared body for the privacy notice and the terms of sale. One measure
 * throughout: these are documents read start to finish, not grids to scan.
 */
export function LegalDocument({
  updated,
  sections,
}: {
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-muted">
        Last updated {updated}
      </p>

      <div className="glass glass-divide mt-14 max-w-2xl rounded-3xl px-7 py-2 md:px-10">
        {sections.map((section, i) => (
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
                      <span aria-hidden="true" className="mt-[0.65em] h-px w-4 shrink-0 bg-purple/50" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>
    </>
  );
}
