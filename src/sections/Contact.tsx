import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { Reveal } from '../components/Reveal';
import { MagneticButton } from '../components/MagneticButton';
import { PrivacyNote } from '../components/PrivacyNote';
import { SocialLinks } from '../components/SocialLinks';
import { activeSocials } from '../data/site';

const details = [
  { icon: Mail, label: 'hello@artengine.my', href: 'mailto:hello@artengine.my' },
  { icon: Phone, label: '+60 17-392 1219', href: 'tel:+60173921219' },
  { icon: MapPin, label: 'Kuala Lumpur, Malaysia' },
];

const field =
  'w-full border-b border-navy/12 bg-transparent py-4 font-sans text-[15px] font-light text-navy outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-purple';

export function Contact() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <PageShell
      eyebrow="05 — Let's Create"
      title={
        <>
          Let's Create
          <br />
          <span className="italic">What's Next</span>
        </>
      }
      intro="Have a project in mind? We'd love to hear from you."
      nextId="start-a-project"
    >
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <div className="space-y-7">
            {details.map(({ icon: Icon, label, href }) => {
              const content = (
                <span className="flex items-center gap-4">
                  <span className="glass-chip flex h-11 w-11 items-center justify-center rounded-full text-royal transition-colors duration-500 group-hover:text-purple">
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                  <span className="font-sans text-[15px] font-light text-navy transition-colors duration-500 group-hover:text-purple">
                    {label}
                  </span>
                </span>
              );
              return href ? (
                <a key={label} href={href} data-cursor="OPEN" className="group block">
                  {content}
                </a>
              ) : (
                <div key={label} className="group block">
                  {content}
                </div>
              );
            })}
          </div>

          {activeSocials.length > 0 && (
            <div className="mt-14 border-t border-navy/10 pt-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-muted">
                Elsewhere
              </p>
              <SocialLinks className="mt-5 gap-5 text-navy" />
            </div>
          )}
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass rounded-[2.5rem] p-9 md:p-12">
            <AnimatePresence mode="wait">
              {!open && !sent && (
                <motion.div
                  key="invite"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-tight text-navy">
                    Tell us what you're
                    <br />
                    <span className="italic">thinking about</span>
                  </h2>
                  <p className="mt-4 max-w-sm font-sans text-[14px] font-light leading-[1.85] text-muted">
                    A sentence is enough to start. We'll come back with questions, not a
                    boilerplate proposal.
                  </p>
                  <div className="mt-9">
                    <MagneticButton onClick={() => setOpen(true)}>Get in Touch</MagneticButton>
                  </div>
                </motion.div>
              )}

              {open && !sent && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-6"
                >
                  {[
                    { placeholder: 'Your name', type: 'text' },
                    { placeholder: 'Email address', type: 'email' },
                    { placeholder: 'Company (optional)', type: 'text', optional: true },
                  ].map((f, i) => (
                    <motion.input
                      key={f.placeholder}
                      required={!f.optional}
                      type={f.type}
                      placeholder={f.placeholder}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                      className={field}
                    />
                  ))}
                  <motion.textarea
                    required
                    rows={4}
                    placeholder="Tell us a little about your project"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className={`${field} resize-none`}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.32 }}
                    className="pt-2"
                  >
                    <MagneticButton type="submit">Send Message</MagneticButton>
                    <PrivacyNote className="mt-6 max-w-sm" />
                  </motion.div>
                </motion.form>
              )}

              {sent && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 text-center"
                >
                  <div className="glass-chip mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                    <Check className="text-purple" />
                  </div>
                  <h2 className="mt-8 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-light text-navy">
                    Thank you.
                  </h2>
                  <p className="mt-3 font-serif text-base italic text-muted">
                    We'll be in touch within one business day.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
