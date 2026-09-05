import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { MagneticButton } from '../components/MagneticButton';

const projectTypes = [
  'Digital Transformation',
  'AI / Automation',
  'Website / Platform',
  'Branding',
  'Digital Campaign',
  'Other',
];

const budgets = ['Under RM20k', 'RM20k – RM50k', 'RM50k – RM150k', 'RM150k+'];

interface FormState {
  type: string;
  details: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
}

const steps = ['What', 'Details', 'Budget', 'Contact'];

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
  });

  const canAdvance = [
    !!form.type,
    form.details.trim().length > 0,
    !!form.budget,
    form.name.trim().length > 0 && form.email.trim().length > 0,
  ][step];

  const next = () => {
    if (step === steps.length - 1) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <PageTransition>
      <div className="relative flex min-h-screen items-center bg-offwhite px-6 py-32 md:px-16 lg:px-24">
        <AuroraBackground />
        <div className="relative z-10 mx-auto w-full max-w-2xl">
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lavender">
                <Check className="text-purple" />
              </div>
              <h1 className="mt-8 font-display text-3xl text-navy sm:text-4xl">
                Let's build something meaningful.
              </h1>
              <p className="mt-4 text-muted">
                Thank you, {form.name.split(' ')[0] || 'there'}. Our team will reach out to{' '}
                {form.email} within one business day.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-12 flex items-center gap-2">
                {steps.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div
                      className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                        i <= step ? 'bg-purple' : 'bg-navy/10'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.3em] text-purple">
                Step 0{step + 1} / 0{steps.length}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6"
                >
                  {step === 0 && (
                    <>
                      <h1 className="font-display text-3xl text-navy sm:text-4xl">
                        What are you looking to build?
                      </h1>
                      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {projectTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            data-cursor="SELECT"
                            onClick={() => setForm((f) => ({ ...f, type }))}
                            className={`rounded-2xl border px-6 py-4 text-left text-sm transition-colors duration-300 ${
                              form.type === type
                                ? 'border-purple bg-lavender text-navy'
                                : 'border-navy/10 bg-white text-muted hover:border-purple-light'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h1 className="font-display text-3xl text-navy sm:text-4xl">
                        Tell us about your project.
                      </h1>
                      <textarea
                        rows={6}
                        value={form.details}
                        onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
                        placeholder="What are you trying to achieve? Who is it for?"
                        className="mt-8 w-full resize-none rounded-2xl border border-navy/10 bg-white p-5 outline-none placeholder:text-muted/70 focus:border-purple"
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h1 className="font-display text-3xl text-navy sm:text-4xl">
                        Budget & timeline.
                      </h1>
                      <div className="mt-8 grid grid-cols-2 gap-3">
                        {budgets.map((b) => (
                          <button
                            key={b}
                            type="button"
                            data-cursor="SELECT"
                            onClick={() => setForm((f) => ({ ...f, budget: b }))}
                            className={`rounded-2xl border px-5 py-4 text-sm transition-colors duration-300 ${
                              form.budget === b
                                ? 'border-purple bg-lavender text-navy'
                                : 'border-navy/10 bg-white text-muted hover:border-purple-light'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      <input
                        value={form.timeline}
                        onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
                        placeholder="Ideal timeline (optional)"
                        className="mt-4 w-full rounded-2xl border border-navy/10 bg-white p-5 outline-none placeholder:text-muted/70 focus:border-purple"
                      />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h1 className="font-display text-3xl text-navy sm:text-4xl">
                        Contact details.
                      </h1>
                      <div className="mt-8 space-y-4">
                        <input
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          className="w-full rounded-2xl border border-navy/10 bg-white p-5 outline-none placeholder:text-muted/70 focus:border-purple"
                        />
                        <input
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          type="email"
                          placeholder="Email address"
                          className="w-full rounded-2xl border border-navy/10 bg-white p-5 outline-none placeholder:text-muted/70 focus:border-purple"
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`text-sm uppercase tracking-[0.15em] text-muted hover:text-purple ${
                    step === 0 ? 'invisible' : ''
                  }`}
                >
                  Back
                </button>
                <MagneticButton
                  onClick={next}
                  disabled={!canAdvance}
                  className={!canAdvance ? 'opacity-40' : ''}
                  showArrow
                >
                  {step === steps.length - 1 ? 'Submit' : 'Continue'}
                </MagneticButton>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
