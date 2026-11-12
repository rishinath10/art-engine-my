import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { formatPrice, type Product } from '../../data/shop';
import { getSupabase, isShopLive } from '../../lib/supabase';

/**
 * A denser pane than the site's .glass: a card you are meant to act on has to
 * read as a distinct object, and the translucent recipe dissolved into the
 * aurora behind it. The navy hairline and the inset top highlight keep the
 * glass character without the washed-out fill.
 */
const SURFACE =
  'relative flex min-w-0 flex-col rounded-[1.75rem] border border-navy/10 p-7 ' +
  'backdrop-blur-[22px] backdrop-saturate-150';

const surfaceStyle = {
  backgroundImage:
    'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.91) 52%, rgba(255,255,255,0.85) 100%)',
  boxShadow:
    '0 26px 50px -30px rgba(17,25,54,0.42), 0 2px 6px -2px rgba(17,25,54,0.07), inset 0 1px 0 0 rgba(255,255,255,1)',
} as const;

type Status = 'idle' | 'loading' | 'error';

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const subscription = product.kind === 'subscription';

  const checkout = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setStatus('error');
      setMessage('Online checkout is not switched on yet. Email us and we will invoice you.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      // Only the slug goes up. The edge function reads the price from the
      // products table, so a tampered request cannot change what is charged.
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { slug: product.slug },
      });
      if (error) throw error;
      if (!data?.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;
    } catch {
      setStatus('error');
      setMessage('We could not open checkout. Please try again, or email us to arrange payment.');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: Math.min(index, 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={SURFACE}
      style={surfaceStyle}
    >
      <h3 className="max-w-[10em] font-display text-[1.6rem] font-light leading-tight text-navy">
        {product.name}
      </h3>
      <p className="mt-2 font-serif text-[15px] italic leading-relaxed text-muted">
        {product.tagline}
      </p>

      {/* Jost, not the display serif: Cormorant's old-style figures sit below
          the cap line and read as editorial, where a price has to read as a
          number. Tabular so the column lines up across cards. */}
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-sans text-[1.85rem] font-normal leading-none tracking-[-0.015em] tabular-nums text-navy">
          {formatPrice(product.amountSen)}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
          {subscription ? 'per month' : 'one-off'}
        </span>
      </p>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-navy/10 pt-6">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-3 font-sans text-[13.5px] font-light leading-[1.55] text-muted">
            <span aria-hidden="true" className="mt-[0.62em] h-px w-3.5 shrink-0 bg-purple/50" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <button
          type="button"
          onClick={checkout}
          disabled={status === 'loading'}
          data-cursor={subscription ? 'SUBSCRIBE' : 'BUY'}
          className="group inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-purple disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Opening checkout
            </>
          ) : (
            <>
              {subscription ? 'Subscribe' : 'Buy now'}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        {status === 'error' && (
          <p role="status" className="mt-4 max-w-[22rem] font-sans text-[12.5px] font-light leading-relaxed text-navy/70">
            {message}
          </p>
        )}
        {!isShopLive() && status === 'idle' && (
          <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted/80">
            Preview — checkout not connected
          </p>
        )}
      </div>
    </motion.article>
  );
}
