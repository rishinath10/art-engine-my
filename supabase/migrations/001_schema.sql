-- Art Engine My Solutions: online shop schema
-- Run in the Supabase SQL editor, or with `supabase db push`.

-- ---------------------------------------------------------------
-- Products (single source of truth for what is sold and charged)
-- Prices are stored in sen (RM 750 = 75000).
-- ---------------------------------------------------------------
create table if not exists public.products (
  slug         text primary key,
  name         text not null,
  tagline      text,
  category     text not null check (category in ('build','care','grow')),
  kind         text not null check (kind in ('one_off','subscription')),
  amount_sen   integer not null check (amount_sen > 0),
  interval     text check (interval in ('month','year')),
  features     jsonb not null default '[]'::jsonb,
  active       boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  constraint kind_interval_match check ((kind = 'subscription') = (interval is not null))
);

-- ---------------------------------------------------------------
-- Orders: one row per completed Stripe Checkout session
-- ---------------------------------------------------------------
create table if not exists public.orders (
  id                      uuid primary key default gen_random_uuid(),
  stripe_session_id       text not null unique,
  stripe_customer_id      text,
  stripe_subscription_id  text,
  customer_email          text not null,
  customer_name           text,
  product_slug            text references public.products(slug),
  product_name            text not null,
  kind                    text not null,
  amount_sen              integer not null,
  currency                text not null default 'myr',
  status                  text not null default 'paid',
  created_at              timestamptz not null default now()
);
create index if not exists orders_email_idx on public.orders (lower(customer_email));

-- ---------------------------------------------------------------
-- Subscriptions: kept in sync by the Stripe webhook
-- ---------------------------------------------------------------
create table if not exists public.subscriptions (
  stripe_subscription_id  text primary key,
  stripe_customer_id      text not null,
  customer_email          text not null,
  product_slug            text references public.products(slug),
  product_name            text not null,
  amount_sen              integer not null,
  interval                text not null,
  status                  text not null,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index if not exists subs_email_idx on public.subscriptions (lower(customer_email));

-- ---------------------------------------------------------------
-- Quote requests from the website form
-- ---------------------------------------------------------------
create table if not exists public.quote_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 160),
  phone       text check (phone is null or char_length(phone) <= 40),
  interest    text check (interest is null or char_length(interest) <= 120),
  message     text not null check (char_length(message) between 1 and 3000),
  status      text not null default 'new',
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------
alter table public.products        enable row level security;
alter table public.orders          enable row level security;
alter table public.subscriptions   enable row level security;
alter table public.quote_requests  enable row level security;

-- Anyone can read active products
create policy "products are public" on public.products
  for select to anon, authenticated using (active = true);

-- A signed-in customer can read only their own orders and subscriptions
create policy "customers read own orders" on public.orders
  for select to authenticated
  using (lower(customer_email) = lower(auth.jwt() ->> 'email'));

create policy "customers read own subscriptions" on public.subscriptions
  for select to authenticated
  using (lower(customer_email) = lower(auth.jwt() ->> 'email'));

-- Anyone can submit a quote request, nobody can read them from the browser
create policy "anyone can request a quote" on public.quote_requests
  for insert to anon, authenticated with check (true);

-- Writes to orders/subscriptions happen only from edge functions using the
-- service role key, which bypasses RLS. No client write policies exist.

-- ---------------------------------------------------------------
-- Seed products
-- ---------------------------------------------------------------
insert into public.products (slug, name, tagline, category, kind, amount_sen, interval, features, sort_order) values
('single-page-website', 'Single Page Website',
 'A polished one-page site to get your business online fast.',
 'build', 'one_off', 75000, null,
 '["One-page responsive design","Domain and hosting included","Contact form and WhatsApp button","Basic on-page SEO","SSL security certificate"]', 10),
('business-website', 'Business Website',
 'A complete multi-page WordPress website for your company.',
 'build', 'one_off', 150000, null,
 '["Multi-page WordPress website","Custom design in your brand colours","Mobile-responsive on every device","Contact form, WhatsApp and Google Maps","Basic SEO setup"]', 20),
('ecommerce-website', 'E-Commerce Website',
 'Sell online with a store that is ready to take orders.',
 'build', 'one_off', 250000, null,
 '["Online store built on WordPress","Product catalogue and shopping cart","Online payment gateway setup","Mobile-responsive on every device","Basic SEO setup"]', 30),
('wordpress-support-business', 'WordPress Support: Business',
 'Keep your business website updated, secure and running.',
 'care', 'subscription', 15000, 'month',
 '["Core, plugin and theme updates","Regular backups","Security monitoring","Uptime monitoring","Support via WhatsApp"]', 40),
('wordpress-support-ecommerce', 'WordPress Support: E-Commerce',
 'Extra care for stores where downtime means lost sales.',
 'care', 'subscription', 30000, 'month',
 '["Everything in Business support","Store and checkout health checks","Order and plugin issue support","Priority response","Support via WhatsApp"]', 50),
('social-media-management', 'Social Media Management',
 'Consistent, on-brand posting handled for you every month.',
 'grow', 'subscription', 50000, 'month',
 '["Content planning and scheduling","Branded post designs","Publishing and page management","Monthly performance summary"]', 60)
on conflict (slug) do nothing;
