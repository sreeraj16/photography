-- ============================================================================
-- DOTPIC PHOTOGRAPHY: Production Seed Data
-- ============================================================================

-- 1. WEBSITE SETTINGS
INSERT INTO public.website_settings (key, value, description) VALUES
('brand_name', '"DOTPIC PHOTOGRAPHY"', 'Official brand name'),
('brand_tagline', '"Every Frame Tells a Story. Every Moment Becomes Timeless."', 'Brand tagline'),
('contact_whatsapp', '"+916281392682"', 'Primary WhatsApp Business number'),
('contact_phone', '"+916281392682"', 'Primary phone number'),
('contact_email', '"dotpicphotography@gmail.com"', 'Primary business email'),
('contact_address', '"Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033"', 'Studio address'),
('contact_maps_url', '"https://maps.google.com/?q=Jubilee+Hills+Hyderabad"', 'Google Maps studio link'),
('social_instagram', '"https://www.instagram.com/_dotpic_"', 'Official Instagram link'),
('social_instagram_handle', '"@_dotpic_"', 'Official Instagram handle'),
('social_youtube', '"https://www.youtube.com/@dotpicphotography"', 'Official YouTube link'),
('social_youtube_handle', '"@dotpicphotography"', 'Official YouTube handle'),
('social_whatsapp', '"https://wa.me/916281392682"', 'Direct WhatsApp chat link'),
('show_announcement_bar', 'true', 'Announcement bar toggle'),
('announcement_text', '"Now booking 2026 wedding & campus fest season • Contact +91 6281392682"', 'Announcement bar text'),
('business_hours', '"Mon - Sat: 9:00 AM - 8:00 PM | Sun: By Appointment"', 'Studio business hours')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. HOMEPAGE CONTENT
INSERT INTO public.homepage_content (
  hero_headline, hero_subheadline, hero_media_url, hero_media_type, hero_poster_url,
  showreel_youtube_url, cta_title, cta_subtitle,
  stats_events_shot, stats_photos_delivered, stats_colleges_covered, stats_years_experience
) VALUES (
  'CAPTURING MOMENTS. CREATING MEMORIES.',
  'Every Frame Tells a Story. Every Moment Becomes Timeless.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  'image',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  'https://www.youtube.com/@dotpicphotography',
  'LET''S CREATE SOMETHING TIMELESS.',
  'Book your shoot today or talk to our creative team directly on WhatsApp.',
  280, 165000, 48, 6
) ON CONFLICT DO NOTHING;

-- 3. CATEGORIES
INSERT INTO public.categories (name, slug, cover_url, description, order_index, is_published) VALUES
('Wedding', 'wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', 'Cinematic royal rituals, candid emotions and timeless vows.', 1, true),
('Pre-Wedding', 'pre-wedding', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop', 'Romantic conceptual storytelling in scenic locations.', 2, true),
('Campus Stories', 'campus-stories', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop', 'Electric fests, concerts, hackathons and collegiate memories.', 3, true),
('Portrait', 'portrait', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop', 'Expressive editorial lighting capturing true personality.', 4, true),
('Fashion', 'fashion', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop', 'High-fashion lookbooks and runway aesthetics.', 5, true),
('Events & Celebrations', 'event', 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop', 'Corporate conferences, gala galas and milestone birthdays.', 6, true),
('Commercial & Brand', 'commercial', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop', 'Impactful brand imagery for marketing campaigns.', 7, true),
('Product', 'product', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop', 'Crisp studio photography crafted for e-commerce and luxury.', 8, true),
('Nature & Travel', 'nature-travel', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop', 'Expansive landscapes and cultural wanderlust.', 9, true),
('Maternity & Newborn', 'maternity', 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop', 'Gentle, heartwarming beginnings and pure innocence.', 10, true),
('Drone & Aerial', 'drone-aerial', 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop', 'Breathtaking bird''s-eye views in 4K resolution.', 11, true)
ON CONFLICT (slug) DO NOTHING;

-- 4. PACKAGES
INSERT INTO public.packages (name, slug, category_slug, price_inr, duration, description, inclusions, is_popular, is_enabled, order_index) VALUES
('Classic Storyteller', 'classic-storyteller', 'wedding', 45000, '1 Full Day (Up to 8 Hours)', 'Essential cinematic coverage for intimate weddings and ceremonies.', '["1 Senior Candid Photographer", "1 Traditional Cinematographer", "150+ Hand-Retouched Master Frames", "All Raw High-Resolution Files in Cloud", "1 Cinematic Teaser (60 seconds)", "Online Private Gallery Access for 1 Year"]'::jsonb, false, true, 1),
('Cinematic Grandeur', 'cinematic-grandeur', 'wedding', 95000, '2 Days (Full Festivities)', 'Our signature luxury wedding package covering all rituals and grand celebrations.', '["2 Senior Candid Photographers", "2 Cinematic Filmmakers + Drone Pilot", "350+ Signature Edited Art Frames", "Full Wedding Film (15-20 mins) + 4K Teaser", "Deluxe Handcrafted Leather Photobook (40 Sheets)", "Same-Day Teaser Edit for Instagram Reels", "Lifetime Private Client Cloud Gallery"]'::jsonb, true, true, 2),
('Heritage Royal', 'heritage-royal', 'wedding', 165000, '3 Days (Pre-Wedding + Wedding + Reception)', 'The ultimate bespoke experience for grand celebrations and multi-day destination weddings.', '["Full 6-Member Creative Crew with Director", "Pre-Wedding Conceptual Shoot Included", "Dual 4K Cinema Drones (Indoor & Outdoor)", "500+ Master Retouched Art Prints", "2 Deluxe Handcrafted Coffee Table Albums", "Live Webcast Setup for Global Relatives", "Dedicated VIP Express Delivery in 14 Days"]'::jsonb, false, true, 3),
('Campus Fest Anthem', 'campus-fest-anthem', 'campus-stories', 35000, '1 Day Fest (Morning to Night)', 'High-voltage coverage of cultural fests, star nights, and college technical summits.', '["2 High-Energy Event Photographers", "1 Dynamic Reel Videographer for Trending Shorts", "Instant 24-Hour Highlights Drop for College PR", "500+ High-Res Crowd & Stage Photos", "Custom QR Code Posters for Student Downloads", "Full Rights for College Social Media & Annual Magazines"]'::jsonb, true, true, 4),
('Editorial Portrait Session', 'editorial-portrait', 'portrait', 12000, '2-3 Hours Studio or Outdoor', 'Bespoke personal branding, artist portraits and high-fashion modeling portfolios.', '["Creative Lighting & Studio Consultation", "3 Outfit Changes", "20 Magazine-Grade Retouched Frames", "All Digital Proofs Delivered in 48 Hours", "Commercial Usage Rights Included"]'::jsonb, false, true, 5);

-- 5. TESTIMONIALS
INSERT INTO public.testimonials (client_name, role_or_event, college_or_location, quote, rating, avatar_url, is_featured, is_approved, order_index) VALUES
('Ananya & Vikram', 'Wedding', 'Hyderabad Royal Palace', 'DOTPIC did not just photograph our wedding; they immortalized our deepest emotions. Looking through our album brings happy tears every single time. The cinematic color tones are truly world-class.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', true, true, 1),
('Karthik Reddy', 'Student President', 'IIT Hyderabad Elan & Envision', 'The energy DOTPIC captured at our star night was absolutely insane! Thousands of students got their festival portraits via their instant QR gallery. Best campus photography team in South India.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', true, true, 2),
('Dr. Sneha & Rohit', 'Pre-Wedding Shoot', 'Ramoji Film City', 'Working with DOTPIC felt effortless. They guided our poses naturally and made us feel like movie stars. Their prompt WhatsApp communication and professionalism made everything seamless.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', true, true, 3);

-- 6. FAQS
INSERT INTO public.faqs (question, answer, category, order_index, is_published) VALUES
('How do I book a shoot with DOTPIC PHOTOGRAPHY?', 'Simply click any "Book Your Slot" button on our website! Fill in your session details, and our system will instantly prepare a formatted WhatsApp message to +91 6281392682 with your unique reference ID. Our team confirms availability and sends you an official quote within a few hours.', 'Booking', 1, true),
('Do you travel for outstation and destination weddings?', 'Yes! While we are based in Hyderabad, we travel across India and internationally for destination weddings, college fests, and bespoke projects. Travel and accommodation are arranged in transparent consultation with you.', 'Travel', 2, true),
('How quickly do we receive our photos and films?', 'We deliver an expedited "Sneak Peek" within 48 to 72 hours so you can share highlights on Instagram. The complete set of high-resolution retouched photographs is delivered via your private client gallery within 2 to 3 weeks.', 'Deliverables', 3, true),
('What is the Campus Stories QR Code feature?', 'For college festivals and university summits, we provide custom printed QR codes for banners. Attendees can simply scan the QR code with their phones to access the live event gallery and download their moments instantly.', 'Campus', 4, true),
('Can we customize our photography package?', 'Absolutely! Every celebration is distinct. We offer flexible add-ons including drone cinematography, instant photo booths, traditional video webcasts, and handcrafted luxury albums.', 'Packages', 5, true);

-- 7. VIDEOS (YouTube Hub)
INSERT INTO public.videos (title, youtube_url, youtube_id, thumbnail_url, category, description, is_featured, order_index) VALUES
('DOTPIC 2026 Official Cinematic Showreel', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop', 'Showreel', 'Experience the visual poetry and passion that defines DOTPIC PHOTOGRAPHY.', true, 1),
('Ananya & Vikram: Royal Heritage Wedding Film', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', 'Weddings', 'A grand 3-day royal celebration captured in 4K anamorphic cinema.', true, 2),
('IIT Hyderabad Elan & Envision: Electric Aftermovie', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop', 'Campus', 'Over 15,000 students celebrating art, music, and collegiate spirit.', true, 3);

-- 8. LINKS PAGE ITEMS (/links Linktree Bio Hub)
INSERT INTO public.links_page_items (title, url, icon_name, badge_text, is_active, order_index) VALUES
('Book Your Photography Slot', '/book', 'Calendar', 'Fast Response', true, 1),
('Chat Directly on WhatsApp (+91 6281392682)', 'https://wa.me/916281392682', 'MessageCircle', 'Online', true, 2),
('Follow Us on Instagram (@_dotpic_)', 'https://www.instagram.com/_dotpic_', 'Instagram', 'Daily Reels', true, 3),
('Subscribe on YouTube (@dotpicphotography)', 'https://www.youtube.com/@dotpicphotography', 'Youtube', '4K Films', true, 4),
('Explore Campus Stories & Fests', '/campus-stories', 'GraduationCap', 'Popular', true, 5),
('Browse Signature Wedding Portfolio', '/portfolio', 'Camera', 'Featured', true, 6),
('View Transparent Packages & Pricing', '/packages', 'Sparkles', '2026 Rates', true, 7);
