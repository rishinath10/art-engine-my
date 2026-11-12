// Receives Stripe webhooks and records orders and subscriptions.
// Deploy with: supabase functions deploy stripe-webhook --no-verify-jwt
import Stripe from "npm:stripe@17.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const toIso = (unix?: number | null) => (unix ? new Date(unix * 1000).toISOString() : null);

async function recordCheckout(session: Stripe.Checkout.Session) {
  const slug = session.metadata?.product_slug ?? null;
  const { data: product } = slug
    ? await supabase.from("products").select("name, kind, amount_sen, interval").eq("slug", slug).maybeSingle()
    : { data: null };

  const email = (session.customer_details?.email ?? session.customer_email ?? "").toLowerCase();
  if (!email) throw new Error(`No customer email on session ${session.id}`);

  const isSub = session.mode === "subscription";
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
  const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id ?? null;

  const { error } = await supabase.from("orders").upsert({
    stripe_session_id: session.id,
    stripe_customer_id: customerId,
    stripe_subscription_id: subId,
    customer_email: email,
    customer_name: session.customer_details?.name ?? null,
    product_slug: slug,
    product_name: product?.name ?? "Art Engine order",
    kind: isSub ? "subscription" : "one_off",
    amount_sen: session.amount_total ?? product?.amount_sen ?? 0,
    currency: session.currency ?? "myr",
    status: "paid",
  }, { onConflict: "stripe_session_id" });
  if (error) throw error;

  if (isSub && subId && customerId) {
    // deno-lint-ignore no-explicit-any
    const sub: any = await stripe.subscriptions.retrieve(subId);
    const periodEnd = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
    const { error: e2 } = await supabase.from("subscriptions").upsert({
      stripe_subscription_id: subId,
      stripe_customer_id: customerId,
      customer_email: email,
      product_slug: slug,
      product_name: product?.name ?? "Subscription",
      amount_sen: product?.amount_sen ?? session.amount_total ?? 0,
      interval: product?.interval ?? "month",
      status: sub.status,
      current_period_end: toIso(periodEnd),
      cancel_at_period_end: !!sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    }, { onConflict: "stripe_subscription_id" });
    if (e2) throw e2;
  }
}

// deno-lint-ignore no-explicit-any
async function syncSubscription(sub: any) {
  const periodEnd = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
  const { error } = await supabase.from("subscriptions").update({
    status: sub.status,
    current_period_end: toIso(periodEnd),
    cancel_at_period_end: !!sub.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }).eq("stripe_subscription_id", sub.id);
  if (error) throw error;
}

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, WEBHOOK_SECRET, undefined, cryptoProvider);
  } catch (e) {
    console.error("Bad webhook signature", e);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        // Delayed payment methods complete later via async_payment_succeeded
        if (s.payment_status === "paid" || s.payment_status === "no_payment_required") await recordCheckout(s);
        break;
      }
      case "checkout.session.async_payment_succeeded":
        await recordCheckout(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscription(event.data.object);
        break;
      default:
        break;
    }
  } catch (e) {
    console.error(`Webhook handler failed for ${event.type}`, e);
    return new Response("Handler error", { status: 500 }); // Stripe will retry
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
