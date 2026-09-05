import { legal } from './site';

export interface PrivacySection {
  heading: string;
  /** Paragraphs. Plain text — no markup, so the page controls all styling. */
  body: string[];
  /** Optional bulleted points shown under the paragraphs. */
  points?: string[];
}

const registration = legal.registrationNumber
  ? ` (company registration ${legal.registrationNumber})`
  : '';

/**
 * The privacy notice, written against what this site actually does rather
 * than a generic template. It is deliberately short: the site sets no
 * cookies, loads nothing from third parties, and collects nothing at all
 * unless someone chooses to send an enquiry.
 */
export const privacySections: PrivacySection[] = [
  {
    heading: 'Who we are',
    body: [
      `${legal.entity}${registration} is a creative technology and digitalization studio based in ${legal.address}. We are responsible for the personal data described in this notice, and you can reach us about any of it at ${legal.email}.`,
    ],
  },
  {
    heading: 'What this site collects',
    body: [
      'Browsing this site collects nothing. There is no account to create, no profile built in the background, and nothing stored on your device.',
      'The only personal data we receive is what you type into the contact form or the project brief and choose to send. That is:',
    ],
    points: [
      'your name',
      'your email address',
      'your company or organisation, if you give one',
      'whatever you tell us about the project — budget range, timeline, and the description in your own words',
    ],
  },
  {
    heading: 'Cookies and tracking',
    body: [
      'This site sets no cookies. It stores nothing in your browser, uses no advertising or social media pixels, and does not fingerprint your device.',
      'It also makes no requests to third parties as you browse. Typefaces are served from our own domain rather than a font network, so no outside company learns that you visited — a detail most sites get wrong by default.',
    ],
  },
  ...(legal.usesAnalytics
    ? [
        {
          heading: 'Measurement',
          body: [
            'We use privacy-respecting analytics to count visits and see which pages get read. It records the page, the referring site, and a coarse country — never an identifier that follows you between sites, and never anything that identifies you personally.',
          ],
        },
      ]
    : []),
  {
    heading: 'What we do with your enquiry',
    body: [
      'We read it and reply. If a project follows, the details become part of our working correspondence with you. That is the whole purpose — we do not add you to a marketing list, profile you, or send you anything you did not ask for.',
      'We do not sell personal data, and we do not share it with anyone for their own use.',
    ],
  },
  {
    heading: 'Who else handles it',
    body: [
      'Two suppliers necessarily touch an enquiry on its way to us, and both act on our instructions only:',
    ],
    points: [
      'our web host, which runs the server this site is served from and passes the form submission on',
      'our email provider, which delivers and stores the message we receive',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      `If a project goes ahead, we keep the correspondence for as long as we are working together and for a reasonable period afterwards, as business records require. If it does not, we keep the enquiry for ${legal.retention} and then delete it.`,
      'You can ask us to delete it sooner at any point, and we will.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      "Malaysia's Personal Data Protection Act 2010 gives you rights over the personal data we hold about you. You can:",
    ],
    points: [
      'ask what we hold and get a copy of it',
      'have anything inaccurate corrected',
      'withdraw your consent and ask us to stop using it',
      'ask us to delete it',
    ],
  },
  {
    heading: 'Security',
    body: [
      'The site is served over HTTPS, so anything you send is encrypted in transit. Enquiries are stored in our email, protected by the access controls on those accounts.',
      'No system is perfect, and we would rather say so than promise otherwise. If something goes wrong that affects your data, we will tell you.',
    ],
  },
  {
    heading: 'Changes to this notice',
    body: [
      'If what we do with personal data changes, we will update this page and change the date at the top. There is no separate archive of previous versions — the page you are reading is always the current one.',
    ],
  },
  {
    heading: 'Contact us',
    body: [
      `For anything in this notice — a question, a request to see what we hold, or a complaint — write to ${legal.email} or call ${legal.phone}. We aim to reply within five business days.`,
      "If you are not satisfied with how we handle it, you can raise the matter with Malaysia's Personal Data Protection Department (Jabatan Perlindungan Data Peribadi).",
    ],
  },
];
