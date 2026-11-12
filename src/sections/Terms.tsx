import { PageShell } from '../components/PageShell';
import { LegalDocument } from '../components/LegalDocument';
import { termsSections } from '../data/terms';
import { legal } from '../data/site';

export function Terms() {
  return (
    <PageShell
      eyebrow="Legal"
      title={
        <>
          Terms of
          <br />
          <span className="italic">Sale</span>
        </>
      }
      intro="What you get, what it costs, how to cancel, and when we refund."
    >
      <LegalDocument updated={legal.updated} sections={termsSections} />
    </PageShell>
  );
}
