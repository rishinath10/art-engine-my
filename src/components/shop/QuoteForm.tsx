import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { MagneticButton } from '../MagneticButton';
import { PrivacyNote } from '../PrivacyNote';
import { quoteInterests } from '../../data/shop';
import { getSupabase } from '../../lib/supabase';
import { legal } from '../../data/site';

const field =
  'w-full border-b border-navy/12 bg-transparent py-4 font-sans text-[15px] font-light text-navy outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-purple';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Custom work does not have a fixed price, so it takes a brief rather than a
 * checkout. Writes straight to the `quote_requests` table — anonymous insert
 * is allowed, reading back is not.
 */
export function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Honeypot. A real person never sees this field, so anything in it is a bot.
    // Report success either way, so the bot learns nothing.
    if (String(form.get('website') || '').trim()) {
      setStatus('sent');
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setStatus('error');
      setError(`This form is not connected yet. Please email ${legal.email} and we will reply the same way.`);
      return;
    }

    setStatus('sending');
    const { error: insertError } = await supabase.from('quote_requests').insert({
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim() || null,
      interest: String(form.get('interest') || '').trim() || null,
      message: String(form.get('message') || '').trim(),
    });

    if (insertError) {
      setStatus('error');
      setError(`We could not send that. Please email ${legal.email} instead.`);
      return;
    }
    setStatus('sent');
  };

  return (
    <div
      className="rounded-[1.75rem] border border-navy/10 p-8 backdrop-blur-[22px] backdrop-saturate-150 md:p-10"
      style={{
        backgroundImage:
          'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.91) 52%, rgba(255,255,255,0.85) 100%)',
        boxShadow: '0 26px 50px -30px rgba(17,25,54,0.42), inset 0 1px 0 0 rgba(255,255,255,1)',
      }}
    >
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="py-6 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/70 text-purple">
              <Check size={20} />
            </div>
            <h3 className="mt-6 font-display text-[1.7rem] font-light text-navy">Request received.</h3>
            <p className="mt-3 font-serif text-base italic text-muted">
              We will come back to you within one business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-purple">
              Something bigger in mind?
            </p>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-light leading-tight text-navy">
              Tell us what you're <span className="italic text-purple">building</span>
            </h3>
            <p className="mt-4 max-w-md font-sans text-[14px] font-light leading-[1.85] text-muted">
              Systems, AI, mobile apps and digitalization are scoped to the problem, so they
              start with a conversation rather than a checkout.
            </p>

            <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <input name="name" required maxLength={120} placeholder="Name" className={field} />
              <input name="email" type="email" required maxLength={160} placeholder="Email" className={field} />
              <input name="phone" maxLength={40} placeholder="Phone (optional)" className={field} />
              <select name="interest" defaultValue="" className={`${field} cursor-pointer`}>
                <option value="" disabled>
                  I am interested in…
                </option>
                {quoteInterests.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                required
                maxLength={3000}
                rows={3}
                placeholder="Tell us about your project"
                className={`${field} resize-none sm:col-span-2`}
              />
            </div>

            {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-9">
              <MagneticButton type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send request'}
              </MagneticButton>
              <PrivacyNote className="mt-6 max-w-sm" />
              {status === 'error' && (
                <p role="alert" className="mt-4 max-w-sm font-sans text-[12.5px] font-light leading-relaxed text-navy/70">
                  {error}
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
