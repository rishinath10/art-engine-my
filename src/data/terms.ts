import { legal, company } from './site';
import { products, formatPrice } from './shop';

export interface TermsSection {
  heading: string;
  body: string[];
  points?: string[];
}

const registration = legal.registrationNumber
  ? ` (company registration ${legal.registrationNumber})`
  : '';

const oneOff = products.filter((p) => p.kind === 'one_off');
const monthly = products.filter((p) => p.kind === 'subscription');

const priceLine = (kind: 'one_off' | 'subscription') =>
  (kind === 'one_off' ? oneOff : monthly)
    .map((p) => `${p.name} at ${formatPrice(p.amountSen)}${p.interval ? ' a month' : ''}`)
    .join('; ');

/**
 * Terms of sale for the fixed-price packages. Written against what is actually
 * sold rather than from a template, and deliberately short. This is a draft
 * for the owner to confirm, not legal advice — the cancellation and refund
 * terms in particular commit the business to something.
 */
export const termsSections: TermsSection[] = [
  {
    heading: 'Who you are buying from',
    body: [
      `${legal.entity}${registration}, of ${legal.address}, trading since ${company.founded}. You can reach us at ${legal.email} or ${legal.phone}.`,
      'These terms cover the fixed-price packages and monthly plans bought through this website. Custom work quoted separately is governed by the proposal for that project, not by this page.',
    ],
  },
  {
    heading: 'What you are buying',
    body: [
      `One-off packages: ${priceLine('one_off')}.`,
      `Monthly plans: ${priceLine('subscription')}.`,
      'The features listed on each package are what that package includes. Anything outside them is additional work, and we will tell you the cost before doing it rather than adding it to an invoice afterwards.',
    ],
  },
  {
    heading: 'Prices and payment',
    body: [
      'All prices are in Malaysian ringgit and are the amount you pay. No tax is added at checkout.',
      'Payment is taken by Stripe. We never see or store your full card number. One-off packages are paid in full before work begins; monthly plans are charged on the same date each month until you cancel.',
    ],
  },
  {
    heading: 'Domain and hosting',
    body: [
      'The Single Page Website package includes domain registration and hosting for the first year from launch. After that first year, hosting and the domain renewal are chargeable, and we will tell you the cost before anything renews.',
      'Other packages do not include hosting unless the proposal for your project says so.',
    ],
  },
  {
    heading: 'What we need from you',
    body: [
      'A project cannot start without its content. We will ask you for text, images, logos and any access we need — for example to your domain registrar or existing site.',
      'If we have not heard from you for 60 days on a project in progress, we may treat it as paused and ask to reschedule. Work already done is not refunded in that case.',
    ],
  },
  {
    heading: 'Cancelling a monthly plan',
    body: [
      'You can cancel a monthly plan at any time from your account page, through the billing portal. There is no notice period and no cancellation fee.',
      'Cancelling stops the next payment. The plan stays active until the end of the period you have already paid for, and we do not refund part of a month.',
    ],
  },
  {
    heading: 'Refunds on one-off packages',
    body: [
      'If you change your mind before we have started, tell us and we will refund you in full.',
      'Once work has started, we refund the part we have not yet done. If a package is finished and delivered, it is not refundable — but if something is wrong with it, we will put it right, which is usually what you actually want.',
      'Third-party costs we have already paid on your behalf, such as a domain registration, cannot be refunded.',
    ],
  },
  {
    heading: 'Who owns the work',
    body: [
      'Once a package is paid for in full, the finished work is yours to use, change and keep.',
      'We keep ownership of our own tools, templates and underlying code, and we may show the work in our portfolio unless you ask us not to.',
      'Third-party components — themes, plugins, fonts, stock images — stay under their own licences, which we will tell you about where they matter.',
    ],
  },
  {
    heading: 'What we do not promise',
    body: [
      'We build carefully, but no one can promise a specific search ranking, a level of traffic, or a sales figure. Anyone who does is guessing.',
      'Where something is outside our control — a hosting provider, a payment gateway, a platform changing its rules — we will help you deal with it, but we are not liable for it.',
      'Our liability for any claim is limited to what you paid us for the work the claim relates to.',
    ],
  },
  {
    heading: 'Your data',
    body: [
      `What we collect and why is set out in our privacy notice. In short: we use your details to fulfil your order and reply to you, and nothing else. Write to ${legal.email} to see, correct or delete what we hold.`,
    ],
  },
  {
    heading: 'Changes and governing law',
    body: [
      'If these terms change, the version on this page at the time of your purchase is the one that applies to it. We do not change terms retrospectively.',
      'These terms are governed by the laws of Malaysia, and the courts of Malaysia have jurisdiction over any dispute.',
    ],
  },
];
