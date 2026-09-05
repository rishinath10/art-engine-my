import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SiteFooter } from '../components/SiteFooter';
import { AuroraBackground } from '../components/AuroraBackground';
import { MagneticButton } from '../components/MagneticButton';
import { PrivacyNote } from '../components/PrivacyNote';
import { TransitionLink } from '../components/TransitionLink';

const projectTypes = [
  'Digital Transformation',
  'AI / Automation',
  'Website / Platform',
  'Branding',
  'Digital Campaign',
  'Other',
];

const budgets = ['Under RM20k', 'RM20k – RM50k', 'RM50k – RM150k', 'RM150k+'];
const timelines = ['As soon as possible', 'Next quarter', 'This year', 'Still exploring'];

interface FormState {
  type: string;
  details: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
}

const steps = [
  { label: 'Direction', question: 'What are you looking to build?' },
  { label: 'Context', question: 'Tell us about your project.' },
  { label: 'Shape', question: 'Budget and timeline.' },
  { label: 'You', question: 'How do we reach you?' },
];

const field =
  'w-full border-b border-navy/12 bg-transparent py-4 font-sans text-[15px] font-light text-navy outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-purple';

function Choice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-cursor="SELECT"
      onClick={onClick}
      className={`glass-chip rounded-2xl px-6 py-4 text-left font-sans text-[14px] font-light transition-all duration-500 ${
        selected
          ? 'border-purple/50 bg-gradient-to-br from-lavender/85 to-white/50 text-navy'
          : 'text-muted hover:border-purple-light hover:text-navy'
      }`}
    >
      {label}
    </button>
  );
}

export function StartProject() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>({
    type: '',
    details: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
  });

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const canAdvance = [
    !!form.type,
    form.details.trim().length > 0,
    !!form.budget && !!form.timeline,
    form.name.trim().length > 0 && form.email.trim().length > 0,
  ][step];

  const next = () => (step === steps.length - 1 ? setDone(true) : setStep((s) => s + 1));

  return (
    <PageTransition>
      <div className="relative flex min-h-dvh items-center overflow-hidden bg-offwhite px-6 py-28 md:px-14 lg:px-24">
        <AuroraBackground />

        <main id="main" tabIndex={-1} className="relative z-10 mx-auto w-full max-w-2xl outline-none">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/50 backdrop-blur-2xl">
                  <Check className="text-purple" size={26} strokeWidth={1.5} />
                </div>
                <h1 className="mt-10 font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.1] text-navy">
                  Let's build something
                  <br />
                  <span className="italic">meaningful.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-md font-sans text-[15px] font-light leading-[1.85] text-muted">
                  Thank you, {form.name.split(' ')[0] || 'there'}. We've got your{' '}
                  {form.type.toLowerCase()} enquiry and will reach out to {form.email} within one
                  business day.
                </p>
                <TransitionLink
                  to="/"
                  data-cursor="HUB"
                  className="mt-10 inline-block font-sans text-[10px] uppercase tracking-[0.24em] text-navy underline decoration-purple-light underline-offset-8 transition-colors hover:text-purple"
                >
                  Back to the hub
                </TransitionLink>
              </motion.div>
            ) : (
              <motion.div key="flow" exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3">
                  {steps.map((s, i) => (
                    <div key={s.label} className="flex flex-1 flex-col gap-2">
                      <div className="h-[2px] w-full overflow-hidden rounded-full bg-navy/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-purple to-royal"
                          initial={false}
                          animate={{ width: i <= step ? '100%' : '0%' }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span
                        className={`font-sans text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                          i === step ? 'text-purple' : 'text-muted/60'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-12 font-sans text-[10px] uppercase tracking-[0.3em] text-purple">
                  Step 0{step + 1} — 0{steps.length}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 28, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -28, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6"
                  >
                    <h1 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-[1.1] text-navy">
                      {steps[step].question}
                    </h1>

                    {step === 0 && (
                      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {projectTypes.map((t) => (
                          <Choice
                            key={t}
                            label={t}
                            selected={form.type === t}
                            onClick={() => set({ type: t })}
                          />
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <textarea
                        rows={6}
                        value={form.details}
                        onChange={(e) => set({ details: e.target.value })}
                        placeholder="What are you trying to achieve? Who is it for? What does success look like?"
                        className={`mt-10 ${field} resize-none`}
                      />
                    )}

                    {step === 2 && (
                      <div className="mt-10 space-y-10">
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">
                            Budget
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            {budgets.map((b) => (
                              <Choice
                                key={b}
                                label={b}
                                selected={form.budget === b}
                                onClick={() => set({ budget: b })}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">
                            Timeline
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            {timelines.map((t) => (
                              <Choice
                                key={t}
                                label={t}
                                selected={form.timeline === t}
                                onClick={() => set({ timeline: t })}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="mt-10 space-y-2">
                        <input
                          value={form.name}
                          onChange={(e) => set({ name: e.target.value })}
                          placeholder="Your name"
                          className={field}
                        />
                        <input
                          value={form.email}
                          onChange={(e) => set({ email: e.target.value })}
                          type="email"
                          placeholder="Email address"
                          className={field}
                        />
                        <input
                          value={form.company}
                          onChange={(e) => set({ company: e.target.value })}
                          placeholder="Company (optional)"
                          className={field}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-12 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={`group inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-purple ${
                      step === 0 ? 'pointer-events-none opacity-0' : ''
                    }`}
                  >
                    <ArrowLeft
                      size={14}
                      className="transition-transform duration-500 group-hover:-translate-x-1"
                    />
                    Back
                  </button>
                  <MagneticButton
                    onClick={next}
                    disabled={!canAdvance}
                    className={canAdvance ? '' : 'pointer-events-none opacity-35'}
                  >
                    {step === steps.length - 1 ? 'Send Enquiry' : 'Continue'}
                  </MagneticButton>
                </div>
                {step === steps.length - 1 && <PrivacyNote className="mt-8 max-w-sm" />}
              </motion.div>
            )}
          </AnimatePresence>
        <SiteFooter />
        </main>
      </div>
    </PageTransition>
  );
}
