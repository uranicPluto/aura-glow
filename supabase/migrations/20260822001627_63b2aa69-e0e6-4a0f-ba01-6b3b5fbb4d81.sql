-- ROLES ---------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "user_roles_select_own" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- SHARED HELPERS ------------------------------------------------------
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- CATALOGUE -----------------------------------------------------------
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  copy TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.collections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT ALL ON public.collections TO service_role;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "collections_public_read" ON public.collections
  FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "collections_admin_all" ON public.collections
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER collections_touch BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  number TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  collection TEXT NOT NULL DEFAULT 'Signature',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  compare_price NUMERIC(10,2),
  rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
  reviews INTEGER NOT NULL DEFAULT 0,
  notes TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  journey_top TEXT NOT NULL DEFAULT '',
  journey_heart TEXT NOT NULL DEFAULT '',
  journey_base TEXT NOT NULL DEFAULT '',
  burn_time TEXT NOT NULL DEFAULT '',
  wax TEXT NOT NULL DEFAULT '',
  dimensions TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  hover_image TEXT NOT NULL DEFAULT '',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 100,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products
  FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "products_admin_all" ON public.products
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.journal_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Fragrance',
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  reading_time TEXT NOT NULL DEFAULT '5 min',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.journal_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_posts TO authenticated;
GRANT ALL ON public.journal_posts TO service_role;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journal_public_read" ON public.journal_posts
  FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "journal_admin_all" ON public.journal_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER journal_touch BEFORE UPDATE ON public.journal_posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  group_name TEXT NOT NULL DEFAULT 'general',
  kind TEXT NOT NULL DEFAULT 'text',
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_content_public_read" ON public.site_content
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "site_content_admin_all" ON public.site_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ORDERS --------------------------------------------------------------
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  address_line1 TEXT NOT NULL DEFAULT '',
  address_line2 TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  postal_code TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT 'India',
  gift_note TEXT NOT NULL DEFAULT '',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT NOT NULL DEFAULT 'upi',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'placed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.orders TO authenticated;
GRANT UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_select_own" ON public.orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "orders_admin_update" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_select_own" ON public.order_items
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id AND o.user_id = auth.uid()
    )
  );

CREATE INDEX orders_user_idx ON public.orders (user_id, created_at DESC);
CREATE INDEX order_items_order_idx ON public.order_items (order_id);
CREATE INDEX products_collection_idx ON public.products (collection);

-- SEED ----------------------------------------------------------------
INSERT INTO public.collections (slug, title, copy, image, sort_order) VALUES
  ('signature', 'Signature Candles', 'Everyday luxury and signature fragrances.', 'productSignature', 1),
  ('luxury', 'Luxury Collection', 'Rare fragrances, premium vessels, elevated craftsmanship.', 'productLuxury', 2),
  ('gift-sets', 'Gift Sets', 'Curated collections designed for unforgettable gifting.', 'giftSet', 3),
  ('limited-editions', 'Limited Editions', 'Exclusive seasonal and limited-production creations.', 'flameMacro', 4),
  ('personalised', 'Personalised Gifts', 'Premium candles customised for special occasions.', 'giftingWrap', 5),
  ('corporate', 'Corporate Gifting', 'Luxury gifting for companies, events and important clients.', 'lifestyleInterior', 6);

INSERT INTO public.products (
  slug, number, name, collection, price, rating, reviews, notes, description,
  journey_top, journey_heart, journey_base, burn_time, wax, dimensions,
  image, hover_image, gallery, is_featured, sort_order
) VALUES
  ('santal-amber', 'No. 01', 'Santal & Amber', 'Signature', 96, 4.9, 412,
   ARRAY['Sandalwood','Amber','Vanilla','Cedar'],
   'A slow, resinous warmth built on Mysore sandalwood and amber, softened with vanilla absolute and dry cedar. The scent of a room that has been lived in beautifully.',
   'Bergamot · Pink Pepper', 'Sandalwood · Amber Resin', 'Vanilla Absolute · Cedarwood',
   '60 hours', 'Coconut-soy blend, cotton wick', '9.5 cm × 8 cm · 320 g',
   'productSignature', 'heroCandle',
   ARRAY['productSignature','heroCandle','ingredients','giftSet','flameMacro'], true, 1),
  ('noir-oud', 'No. 02', 'Noir Oud', 'Luxury', 168, 5.0, 188,
   ARRAY['Oud','Saffron','Leather','Incense'],
   'Our most exclusive composition. Rare oud is layered with saffron and smoked leather, poured into hand-finished smoked glass with a gilded rim.',
   'Saffron · Black Plum', 'Oud · Smoked Leather', 'Frankincense · Patchouli',
   '75 hours', 'Coconut-soy blend, double cotton wick', '11 cm × 9 cm · 420 g',
   'productLuxury', 'flameMacro',
   ARRAY['productLuxury','flameMacro','ingredients','lifestyleInterior'], true, 2),
  ('fig-cassis', 'No. 03', 'Fig & Cassis', 'Signature', 88, 4.8, 306,
   ARRAY['Black Fig','Cassis','Green Leaf','Musk'],
   'Sunlit and quietly green — ripe black fig and cassis over crushed leaves, finished with a clean white musk.',
   'Cassis · Citrus Leaf', 'Black Fig · Violet', 'White Musk · Vetiver',
   '58 hours', 'Coconut-soy blend, cotton wick', '9.5 cm × 8 cm · 320 g',
   'journalRoom', 'journalRitual',
   ARRAY['journalRoom','journalRitual','ingredients','giftSet'], true, 3),
  ('maison-duo', 'No. 04', 'Maison Duo Coffret', 'Gift Sets', 210, 4.9, 143,
   ARRAY['Santal & Amber','Fig & Cassis','Gold Ribbon','Hand-tied'],
   'Two signature candles nested in an espresso lacquer coffret with cream tissue, a gilded ribbon and a hand-written card.',
   'Bergamot · Cassis', 'Sandalwood · Black Fig', 'Vanilla · White Musk',
   '60 hours each', 'Coconut-soy blend, cotton wick', 'Coffret 26 cm × 14 cm',
   'giftSet', 'giftingWrap',
   ARRAY['giftSet','giftingWrap','productSignature','lifestyleInterior'], true, 4);

INSERT INTO public.journal_posts (slug, category, title, excerpt, body, image, reading_time, sort_order) VALUES
  ('how-scent-changes-a-room', 'Fragrance', 'How scent changes the feeling of a room',
   'Light and fragrance do the same work as furniture — quietly, and much faster.',
   'A room is remembered as an atmosphere before it is remembered as a set of objects. Scent is the fastest way to change that atmosphere, and the only one that works while you are looking away.',
   'journalRoom', '6 min', 1),
  ('the-art-of-luxury-gifting', 'Gifting', 'The art of luxury gifting',
   'Why the object matters less than the moment it creates when it is opened.',
   'Luxury gifting is choreography. The weight of the box, the resistance of the ribbon, the first breath of fragrance — each one buys a second of attention, and attention is the actual gift.',
   'giftingWrap', '5 min', 2),
  ('your-perfect-evening-ritual', 'Wellness', 'Creating your perfect evening ritual',
   'A short, repeatable sequence that tells your body the day is finished.',
   'Rituals work because they are short and identical. Lower the lights, trim the wick, light the candle, and let the first fifteen minutes belong to nothing productive at all.',
   'journalRitual', '4 min', 3);

INSERT INTO public.site_content (key, label, group_name, kind, value) VALUES
  ('home.hero.eyebrow', 'Hero eyebrow', 'Home — Hero', 'text', 'Hand-poured in small batches'),
  ('home.hero.title', 'Hero headline', 'Home — Hero', 'text', 'Light that remembers you.'),
  ('home.hero.subtitle', 'Hero subtitle', 'Home — Hero', 'text', 'Rare fragrance, hand-finished vessels and gifting made unforgettable.'),
  ('home.hero.cta', 'Hero button label', 'Home — Hero', 'text', 'Shop the collection'),
  ('home.hero.image', 'Hero image', 'Home — Hero', 'image', 'heroCandle'),
  ('home.story.eyebrow', 'Story eyebrow', 'Home — Story', 'text', 'The atelier'),
  ('home.story.title', 'Story headline', 'Home — Story', 'text', 'Made slowly, by hand, in small batches.'),
  ('home.story.body', 'Story paragraph', 'Home — Story', 'text', 'Every candle is poured at low temperature, cured for ten days and finished by hand before it earns our seal.'),
  ('home.story.image', 'Story image', 'Home — Story', 'image', 'craftAtelier'),
  ('home.gifting.title', 'Gifting headline', 'Home — Gifting', 'text', 'Gifting, considered.'),
  ('home.gifting.body', 'Gifting paragraph', 'Home — Gifting', 'text', 'Hand-wrapped coffrets, handwritten notes and corporate gifting at scale.'),
  ('home.gifting.image', 'Gifting image', 'Home — Gifting', 'image', 'giftingWrap'),
  ('home.cta.title', 'Closing headline', 'Home — Closing', 'text', 'Begin your ritual.'),
  ('home.cta.body', 'Closing paragraph', 'Home — Closing', 'text', 'Join the maison for early access to limited editions and private gifting.'),
  ('shipping.free_threshold', 'Free shipping threshold', 'Commerce', 'text', '150'),
  ('shipping.flat_rate', 'Flat shipping rate', 'Commerce', 'text', '12');