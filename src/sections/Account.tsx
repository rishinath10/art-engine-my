import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { MagneticButton } from '../components/MagneticButton';
import { formatPrice } from '../data/shop';
import { getSupabase } from '../lib/supabase';
import { legal, SITE_URL } from '../data/site';

interface Order {
  id: string;
  product_name: string | null;
  amount_total: number | null;
  currency: string | null;
  status: string | null;
  created_at: string | null;
}

interface Subscription {
  id: string;
  product_name: string | null;
  amount: number | null;
  status: string | null;
  current_period_end: string | null;
}

const rowBase =
  'flex flex-wrap items-center gap-x-4 gap-y-2 bg-white/95 px-6 py-5 font-sans text-[14px] font-light text-muted';

function Pill({ state }: { state: string }) {
  const good = /paid|active|complete|succeeded|trialing/i.test(state);
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.18em] ${
        good ? 'bg-[#e5f2ea] text-[#2b6a4a]' : 'bg-lavender text-purple'
      }`}
    >
      {state}
    </span>
  );
}

/**
 * Client-only. Prerendered as static HTML so a direct visit and Stripe's
 * redirect both resolve on a static host, but everything below the heading
 * waits for the browser — the server render shows the signed-out state.
 */
export function Account() {
  const [email, setEmail] = useState('');
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [phase, setPhase] = useState<'booting' | 'anon' | 'sent' | 'loading' | 'ready' | 'off'>(
    'booting',
  );
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setPhase('loading');
    const [o, s] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
    ]);
    setOrders((o.data as Order[]) ?? []);
    setSubs((s.data as Subscription[]) ?? []);
    setPhase('ready');
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setPhase('off');
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email) {
        setSessionEmail(data.session.user.email);
        void load();
      } else {
        setPhase('anon');
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setSessionEmail(session.user.email);
        void load();
      } else {
        setSessionEmail(null);
        setPhase('anon');
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const sendLink = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setError('');
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${SITE_URL}/account` },
    });
    if (authError) {
      setError('We could not send that link. Check the address and try again.');
      return;
    }
    setPhase('sent');
  };

  const manageBilling = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error: fnError } = await supabase.functions.invoke('create-portal-session', {});
    if (fnError || !data?.url) {
      setError('We could not open the billing portal. Please try again shortly.');
      return;
    }
    window.location.href = data.url;
  };

  const signOut = async () => {
    await getSupabase()?.auth.signOut();
    setOrders([]);
    setSubs([]);
  };

  return (
    <PageShell
      eyebrow="Your account"
      title={
        <>
          Orders and
          <br />
          <span className="italic">plans</span>
        </>
      }
      intro="Sign in with your email and we will send a link — no password to remember."
    >
      {phase === 'off' && (
        <p className="max-w-lg font-sans text-[15px] font-light leading-[1.85] text-muted">
          Accounts are not switched on yet. If you have bought something, email{' '}
          <a href={`mailto:${legal.email}`} className="text-purple underline underline-offset-4">
            {legal.email}
          </a>{' '}
          and we will send your records directly.
        </p>
      )}

      {phase === 'anon' && (
        <form onSubmit={sendLink} className="max-w-sm">
          <label htmlFor="account-email" className="font-sans text-[10px] uppercase tracking-[0.26em] text-muted">
            Email address
          </label>
          <input
            id="account-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-3 w-full border-b border-navy/12 bg-transparent py-4 font-sans text-[15px] font-light text-navy outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-purple"
          />
          <div className="mt-8">
            <MagneticButton type="submit">Email me a link</MagneticButton>
          </div>
          {error && (
            <p role="alert" className="mt-4 font-sans text-[13px] font-light text-navy/70">
              {error}
            </p>
          )}
        </form>
      )}

      {phase === 'sent' && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg font-serif text-[17px] leading-relaxed text-navy/70"
        >
          Check your inbox — we have sent a sign-in link to{' '}
          <span className="text-navy">{email}</span>. It opens this page, signed in.
        </motion.p>
      )}

      {(phase === 'loading' || phase === 'ready') && (
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-sans text-[13px] font-light text-muted">
              Signed in as <span className="text-navy">{sessionEmail}</span>
            </p>
            <button
              onClick={signOut}
              className="rounded-sm font-sans text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-purple"
            >
              Sign out
            </button>
          </div>

          <h2 className="mt-12 font-sans text-[10px] uppercase tracking-[0.26em] text-muted">Orders</h2>
          {phase === 'loading' ? (
            <p className="mt-4 font-sans text-[14px] font-light text-muted">Loading…</p>
          ) : orders.length === 0 ? (
            <p className="mt-4 font-sans text-[14px] font-light text-muted">
              Nothing here yet. Anything you buy will appear on this page.
            </p>
          ) : (
            <div className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-navy/10 bg-navy/[0.09]">
              {orders.map((order) => (
                <div key={order.id} className={rowBase}>
                  <b className="min-w-0 font-display text-[1.1rem] font-normal text-navy">
                    {order.product_name ?? 'Order'}
                  </b>
                  {order.status && <Pill state={order.status} />}
                  <span className="ml-auto tabular-nums text-navy">
                    {order.amount_total != null ? formatPrice(order.amount_total) : '—'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h2 className="mt-14 font-sans text-[10px] uppercase tracking-[0.26em] text-muted">
            Subscriptions
          </h2>
          {phase === 'ready' && subs.length === 0 ? (
            <p className="mt-4 font-sans text-[14px] font-light text-muted">No active plans.</p>
          ) : (
            <div className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-navy/10 bg-navy/[0.09]">
              {subs.map((sub) => (
                <div key={sub.id} className={rowBase}>
                  <b className="min-w-0 font-display text-[1.1rem] font-normal text-navy">
                    {sub.product_name ?? 'Plan'}
                  </b>
                  {sub.status && <Pill state={sub.status} />}
                  <span className="ml-auto tabular-nums text-navy">
                    {sub.amount != null ? `${formatPrice(sub.amount)} / mo` : '—'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {subs.length > 0 && (
            <div className="mt-10">
              <MagneticButton variant="outline" onClick={manageBilling}>
                Manage billing
              </MagneticButton>
            </div>
          )}
          {error && (
            <p role="alert" className="mt-4 font-sans text-[13px] font-light text-navy/70">
              {error}
            </p>
          )}
        </div>
      )}
    </PageShell>
  );
}
