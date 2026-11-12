import { PageShell } from '../components/PageShell';
import { LegalDocument } from '../components/LegalDocument';
import { privacySections } from '../data/privacy';
import { legal } from '../data/site';

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
      <LegalDocument updated={legal.updated} sections={privacySections} />
    </PageShell>
  );
}
