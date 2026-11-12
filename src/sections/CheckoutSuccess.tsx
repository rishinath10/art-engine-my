import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { SiteFooter } from '../components/SiteFooter';
import { TransitionLink } from '../components/TransitionLink';
import { legal } from '../data/site';

/**
 * Where Stripe returns the customer. Deliberately says nothing a webhook has
 * not confirmed: the order row is written by stripe-webhook, which may land a
 * moment after this page does, so this confirms the payment and points at the
 * account page rather than listing anything.
 */
export function CheckoutSuccess() {
  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-offwhite">
        <AuroraBackground />

        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center outline-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple to-royal text-white"
          >
            <Check size={24} strokeWidth={1.8} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 font-display text-[clamp(2rem,6vw,3.2rem)] font-light leading-[1.06] tracking-[-0.02em] text-navy"
          >
            Thank you —
            <br />
            <span className="bg-gradient-to-r from-purple to-royal bg-clip-text italic text-transparent">
              we're on it.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md font-serif text-[18px] leading-relaxed text-navy/70"
          >
            Your receipt is on its way by email. We will be in touch within one business day
            to get started.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            <TransitionLink
              to="/account"
              data-cursor="OPEN"
              className="rounded-full bg-navy px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-purple"
            >
              View my orders
            </TransitionLink>
            <TransitionLink
              to="/"
              data-cursor="OPEN"
              className="rounded-sm font-sans text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-purple"
            >
              ← Back to the hub
            </TransitionLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-10 font-sans text-[12px] font-light text-muted"
          >
            Anything look wrong? Email{' '}
            <a href={`mailto:${legal.email}`} className="text-purple underline underline-offset-4">
              {legal.email}
            </a>
          </motion.p>
        </main>

        <SiteFooter />
      </div>
    </PageTransition>
  );
}
