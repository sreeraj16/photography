-- ============================================================================
-- DOTPIC PHOTOGRAPHY: Production Database Schema & RLS Policies
-- Target: Supabase PostgreSQL
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOM ENUMS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('owner', 'editor', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE enquiry_status AS ENUM ('New', 'Contacted', 'Quoted', 'Confirmed', 'Completed', 'Cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE download_policy_type AS ENUM ('none', 'low_res', 'full');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE availability_status AS ENUM ('busy', 'blocked', 'tentative');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'viewer',
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover_url TEXT,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. GALLERIES (Albums)
CREATE TABLE IF NOT EXISTS public.galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  client_name TEXT,
  location TEXT,
  shoot_date DATE,
  description TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. PHOTOS
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gallery_id UUID REFERENCES public.galleries(id) ON DELETE CASCADE,
  storage_path TEXT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  caption TEXT,
  alt_text TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  exif_camera TEXT,
  exif_lens TEXT,
  exif_focal_length TEXT,
  exif_aperture TEXT,
  exif_shutter_speed TEXT,
  exif_iso TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. CAMPUS STORIES
CREATE TABLE IF NOT EXISTS public.campus_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  college_name TEXT NOT NULL,
  college_id TEXT,
  event_date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  photo_count INTEGER NOT NULL DEFAULT 0,
  video_highlight_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  download_policy download_policy_type NOT NULL DEFAULT 'low_res',
  allow_find_my_photos BOOLEAN NOT NULL DEFAULT false,
  qr_code_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.campus_event_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.campus_events(id) ON DELETE CASCADE,
  storage_path TEXT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. PACKAGES
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_slug TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  duration TEXT,
  description TEXT,
  inclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. BOOKING ENQUIRIES
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  category TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  location TEXT NOT NULL,
  package_id TEXT,
  event_details TEXT NOT NULL,
  additional_requirements TEXT,
  guest_count TEXT,
  duration_hours TEXT,
  budget_range TEXT,
  referral_code TEXT,
  source TEXT DEFAULT 'website',
  status enquiry_status NOT NULL DEFAULT 'New',
  admin_notes TEXT,
  follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  role_or_event TEXT NOT NULL,
  college_or_location TEXT,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  avatar_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. HOMEPAGE CONTENT & STATS
CREATE TABLE IF NOT EXISTS public.homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_headline TEXT NOT NULL DEFAULT 'CAPTURING MOMENTS. CREATING MEMORIES.',
  hero_subheadline TEXT NOT NULL DEFAULT 'Every Frame Tells a Story. Every Moment Becomes Timeless.',
  hero_media_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  hero_media_type TEXT NOT NULL DEFAULT 'image',
  hero_poster_url TEXT DEFAULT 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  showreel_youtube_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@dotpicphotography',
  cta_title TEXT NOT NULL DEFAULT 'LET''S CREATE SOMETHING TIMELESS.',
  cta_subtitle TEXT NOT NULL DEFAULT 'Book your shoot today or talk to our creative team directly on WhatsApp.',
  stats_events_shot INTEGER NOT NULL DEFAULT 250,
  stats_photos_delivered INTEGER NOT NULL DEFAULT 150000,
  stats_colleges_covered INTEGER NOT NULL DEFAULT 45,
  stats_years_experience INTEGER NOT NULL DEFAULT 6,
  section_visibility JSONB NOT NULL DEFAULT '{"hero": true, "intro": true, "services": true, "portfolio": true, "campus": true, "horizontal": true, "beforeAfter": true, "whyChoose": true, "bts": true, "testimonials": true, "packages": true, "instagram": true, "youtube": true, "cta": true}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. WEBSITE SETTINGS (Key-Value)
CREATE TABLE IF NOT EXISTS public.website_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. JOURNAL / BLOG
CREATE TABLE IF NOT EXISTS public.journal_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  author_name TEXT NOT NULL DEFAULT 'DOTPIC Team',
  is_published BOOLEAN NOT NULL DEFAULT true,
  read_time TEXT DEFAULT '5 min read',
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. PRIVATE CLIENT GALLERIES
CREATE TABLE IF NOT EXISTS public.client_galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  pin_hash TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  event_date DATE,
  expiry_date DATE,
  allow_downloads BOOLEAN NOT NULL DEFAULT true,
  watermark_previews BOOLEAN NOT NULL DEFAULT true,
  download_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.client_gallery_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_gallery_id UUID NOT NULL REFERENCES public.client_galleries(id) ON DELETE CASCADE,
  storage_path TEXT,
  url TEXT NOT NULL,
  watermarked_url TEXT,
  caption TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.client_favourites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_gallery_id UUID NOT NULL REFERENCES public.client_galleries(id) ON DELETE CASCADE,
  photo_id UUID NOT NULL REFERENCES public.client_gallery_photos(id) ON DELETE CASCADE,
  client_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(client_gallery_id, photo_id)
);

-- 16. AVAILABILITY CALENDAR
CREATE TABLE IF NOT EXISTS public.availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  status availability_status NOT NULL DEFAULT 'busy',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 17. VIDEOS (YouTube Hub)
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL DEFAULT 'Showreel',
  description TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 18. SOCIAL POSTS & LINKS HUB
CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL DEFAULT 'instagram',
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  caption TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.links_page_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Globe',
  badge_text TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 19. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 20. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_event_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links_page_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('owner', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public READ for published content
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public galleries are viewable by everyone" ON public.galleries FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public photos are viewable by everyone" ON public.photos FOR SELECT USING (true);
CREATE POLICY "Public campus events are viewable by everyone" ON public.campus_events FOR SELECT USING (true);
CREATE POLICY "Public campus photos are viewable by everyone" ON public.campus_event_photos FOR SELECT USING (true);
CREATE POLICY "Public packages are viewable by everyone" ON public.packages FOR SELECT USING (is_enabled = true OR public.is_admin());
CREATE POLICY "Public testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (is_approved = true OR public.is_admin());
CREATE POLICY "Homepage content is viewable by everyone" ON public.homepage_content FOR SELECT USING (true);
CREATE POLICY "Website settings are viewable by everyone" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public journal posts are viewable by everyone" ON public.journal_posts FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public faqs are viewable by everyone" ON public.faqs FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public videos are viewable by everyone" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public social posts are viewable by everyone" ON public.social_posts FOR SELECT USING (true);
CREATE POLICY "Public links items are viewable by everyone" ON public.links_page_items FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public availability is viewable by everyone" ON public.availability FOR SELECT USING (true);

-- Public INSERT for enquiries and newsletters
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit a testimonial for review" ON public.testimonials FOR INSERT WITH CHECK (is_approved = false);

-- Enquiries viewable and manageable by admin only
CREATE POLICY "Enquiries visible to admin only" ON public.enquiries FOR SELECT USING (public.is_admin());
CREATE POLICY "Enquiries updateable by admin only" ON public.enquiries FOR UPDATE USING (public.is_admin());
CREATE POLICY "Enquiries deletable by admin only" ON public.enquiries FOR DELETE USING (public.is_admin());

-- Admin write policies for all content
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage galleries" ON public.galleries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage photos" ON public.photos FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage campus_events" ON public.campus_events FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage campus_photos" ON public.campus_event_photos FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage packages" ON public.packages FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage homepage" ON public.homepage_content FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage settings" ON public.website_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage journal" ON public.journal_posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage faqs" ON public.faqs FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage videos" ON public.videos FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage social_posts" ON public.social_posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage links_items" ON public.links_page_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage availability" ON public.availability FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage subscribers" ON public.newsletter_subscribers FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage activity logs" ON public.admin_activity_logs FOR ALL USING (public.is_admin());

-- Private client galleries (Admin full access, clients access via Edge Function or PIN verification)
CREATE POLICY "Admin manage client galleries" ON public.client_galleries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage client gallery photos" ON public.client_gallery_photos FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage client favourites" ON public.client_favourites FOR ALL USING (public.is_admin());
