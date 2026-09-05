import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { OrganicFlow } from '../components/OrganicFlow';
import { MagneticButton } from '../components/MagneticButton';

export function Contact() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-offwhite px-6 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <OrganicFlow />
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-purple">Let's Create</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.1] text-navy sm:text-5xl md:text-6xl">
            Let's Create
            <br />What's Next
          </h1>
          <p className="mt-6 text-lg text-muted">
            Have a project in mind? We'd love to hear from you.
          </p>

          <div className="mt-10 flex flex-col gap-3 text-navy">
            <a href="mailto:hello@artengine.my" className="flex items-center gap-3 hover:text-purple">
              <Mail size={18} /> hello@artengine.my
            </a>
            <a href="tel:+60173921219" className="flex items-center gap-3 hover:text-purple">
              <Phone size={18} /> +60 17-392 1219
            </a>
            <span className="flex items-center gap-3 text-muted">
              <MapPin size={18} /> Kuala Lumpur, Malaysia
            </span>
          </div>

          <div className="mt-12">
            {!open && (
              <MagneticButton onClick={() => setOpen(true)}>Get in Touch</MagneticButton>
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 overflow-hidden"
              >
                {sent ? (
                  <div className="rounded-3xl border border-purple-light/40 bg-white p-10 text-center">
                    <p className="font-display text-2xl text-navy">Thank you.</p>
                    <p className="mt-2 text-muted">We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <div className="space-y-5 rounded-3xl border border-navy/10 bg-white p-8">
                    <input
                      required
                      placeholder="Your name"
                      className="w-full border-b border-navy/10 bg-transparent py-3 outline-none placeholder:text-muted/70 focus:border-purple"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      className="w-full border-b border-navy/10 bg-transparent py-3 outline-none placeholder:text-muted/70 focus:border-purple"
                    />
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us a little about your project"
                      className="w-full resize-none border-b border-navy/10 bg-transparent py-3 outline-none placeholder:text-muted/70 focus:border-purple"
                    />
                    <MagneticButton type="submit">Send Message</MagneticButton>
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
