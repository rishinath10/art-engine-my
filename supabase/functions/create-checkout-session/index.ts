// Creates a Stripe Checkout session for a product. The price is read from the
// database, never from the browser, so it cannot be tampered with.
import Stripe from "npm:stripe@17.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
});
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
const SITE_URL = (Deno.env.get("SITE_URL") ?? "").replace(/\/$/, "");

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const { slug, email } = await req.json();
    if (typeof slug !== "string" || !slug) return json({ error: "Missing product" }, 400);

    const { data: p, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();
    if (error || !p) return json({ error: "Unknown product" }, 404);

    const isSub = p.kind === "subscription";
    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
      currency: "myr",
      unit_amount: p.amount_sen,
      product_data: { name: p.name, description: p.tagline ?? undefined },
      ...(isSub ? { recurring: { interval: p.interval } } : {}),
    };

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: isSub ? "subscription" : "payment",
      line_items: [{ quantity: 1, price_data: priceData }],
      customer_email: typeof email === "string" && email ? email : undefined,
      success_url: `${SITE_URL}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/services/#shop`,
      metadata: { product_slug: p.slug },
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      // No payment_method_types set: Stripe shows the methods you enable in
      // Dashboard > Settings > Payment methods (cards, FPX, GrabPay, ...).
    };

    if (isSub) {
      params.subscription_data = { metadata: { product_slug: p.slug } };
    } else {
      params.customer_creation = "always";
      params.invoice_creation = { enabled: true };
      params.payment_intent_data = { metadata: { product_slug: p.slug } };
    }

    const session = await stripe.checkout.sessions.create(params);
    return json({ url: session.url });
  } catch (e) {
    console.error("create-checkout-session failed", e);
    return json({ error: "Could not create checkout session" }, 500);
  }
});
