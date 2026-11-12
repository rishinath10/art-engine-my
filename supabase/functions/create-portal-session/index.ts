// Opens the Stripe billing portal for the signed-in customer so they can update
// their card, download invoices, or cancel a subscription.
import Stripe from "npm:stripe@17.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
});
const admin = createClient(
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

  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    const email = userData?.user?.email?.toLowerCase();
    if (userErr || !email) return json({ error: "Please sign in" }, 401);

    // Find this customer's Stripe customer id from their own records
    const { data: sub } = await admin.from("subscriptions")
      .select("stripe_customer_id").ilike("customer_email", email).limit(1).maybeSingle();
    let customerId = sub?.stripe_customer_id as string | undefined;
    if (!customerId) {
      const { data: order } = await admin.from("orders")
        .select("stripe_customer_id").ilike("customer_email", email)
        .not("stripe_customer_id", "is", null).limit(1).maybeSingle();
      customerId = order?.stripe_customer_id as string | undefined;
    }
    if (!customerId) return json({ error: "No billing record found for this email" }, 404);

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${SITE_URL}/account/`,
    });
    return json({ url: portal.url });
  } catch (e) {
    console.error("create-portal-session failed", e);
    return json({ error: "Could not open billing portal" }, 500);
  }
});
