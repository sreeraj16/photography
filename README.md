# DOTPIC PHOTOGRAPHY: Production Website & Management Platform

> **"Every Frame Tells a Story. Every Moment Becomes Timeless."**

DOTPIC PHOTOGRAPHY is a world-class, premium cinematic photography website and cloud management platform engineered for royal weddings, collegiate festivals, editorial portraits, and high-fashion campaigns.

---

## 📸 Brand Identity & Official Coordinates

- **Brand:** DOTPIC PHOTOGRAPHY
- **Tagline:** Every Frame Tells a Story. Every Moment Becomes Timeless.
- **WhatsApp Business:** `+91 6281392682` ([wa.me/916281392682](https://wa.me/916281392682))
- **Official Instagram:** [@\_dotpic\_](https://www.instagram.com/_dotpic_)
- **Official YouTube:** [@dotpicphotography](https://www.youtube.com/@dotpicphotography)
- **Studio Location:** Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033
- **Currency:** Indian Rupee (₹ INR)

---

## 🏛️ Architecture & Technologies

- **Frontend:** React 18, Vite 6, TypeScript, Tailwind CSS
- **Design Tokens:** Deep black `#0A0A0A`, charcoal `#141414`, champagne gold `#C9A96E`, editorial serif typography (*Cormorant Garamond*), grotesk sans (*Inter*), film-grain overlay, and anamorphic 2.39:1 letterbox masks.
- **Audio Synthesizer:** Mechanical camera focal shutter click synthesized natively with HTML5 Web Audio API (zero external mp3 dependency, offline capable).
- **Smooth Motion & Transitions:** Lenis smooth scrolling with automatic `prefers-reduced-motion` detection, Framer Motion, and interactive before/after split sliders.
- **Data Layer:** Resilient hybrid data store (ready out of the box with persistent local storage, seamlessly synced to Supabase PostgreSQL when credentials are provided in `.env`).
- **Campus Tech:** Instant QR code banner generator (`qrcode`), student portrait downloads, India DPDP Act compliant "Find My Photos" voluntary consent flow.
- **Admin Dashboard:** Executive control center featuring Recharts booking trend analytics, lead management with one-click WhatsApp replies, CSV lead exports, full portfolio CRUD, blackout calendar, review moderation queue, and full JSON database backups.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🔑 Admin Access & Initial Credentials

Visit `/admin/login` on your browser:
- **Default Studio Email:** `admin@dotpic.com`
- **Default Passcode:** `dotpic2026`

Once signed in, you have full owner capabilities across all 14 management modules:
1. **Overview & Analytics:** Pipeline metrics, storage gauges, and 2026 booking trends.
2. **Booking Enquiries:** Workflow statuses (`New` → `Contacted` → `Quoted` → `Confirmed` → `Completed`), internal crew notes, follow-up reminders, CSV export, and one-click WhatsApp reply.
3. **Portfolio Galleries:** Album creation, EXIF data, categories, and cover images.
4. **Campus Stories & QR:** College fests, student portrait count, and print-ready 600px PNG QR code generation.
5. **Availability Calendar:** Blackout dates, busy shoot warnings shown on the booking form.
6. **Packages & Pricing:** ₹ INR pricing tiers, custom inclusions, popular badges.
7. **Private Client Vaults:** PIN-protected client galleries (`1234`), unindexed links, download stats.
8. **Reviews Moderation:** Moderation queue for client testimonials submitted on the site.
9. **YouTube Films Hub:** 4K video showcase, category tags, modal playback.
10. **Socials & /links Hub:** Edit official Instagram/YouTube/WhatsApp links, customize the mobile Instagram bio landing page.
11. **Homepage Content:** Masked headlines, hero imagery, section visibility toggles.
12. **Journal & FAQs:** Shoot stories, SEO articles, and FAQ accordion management.
13. **Security Audit Logs:** Audit trail of all database actions and timestamps.
14. **Settings & JSON Backup:** Studio addresses, announcement bar, and one-click JSON database export.

---

## 🗄️ Supabase PostgreSQL Setup & Migrations

When you are ready to connect a live Supabase project:

1. Create a new project on [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Run the schema file:
   [`supabase/migrations/20261121_initial_schema.sql`](file:///c:/Users/SREERAJ%20GANTIMALL/OneDrive/Desktop/PHOTO/supabase/migrations/20261121_initial_schema.sql)
4. Run the seed data file:
   [`supabase/seed.sql`](file:///c:/Users/SREERAJ%20GANTIMALL/OneDrive/Desktop/PHOTO/supabase/seed.sql)
5. Copy your Project URL and Anon Public Key from **Project Settings → API**.
6. Create or edit `.env` in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
7. Restart the dev server (`npm run dev`). The application will automatically detect your Supabase connection!

---

## 🌐 Public Site Navigation Map

- `/` — Homepage (Hero billboard, preloader, services, masonry portfolio, campus preview, before/after slider, BTS reels, testimonials, YouTube films strip, Instagram grid, CTA)
- `/about` — About Us, Brand philosophy, crew bios, studio location
- `/services` — All photography disciplines
- `/services/:slug` — Individual service breakdown & deliverables
- `/portfolio` — Master portfolio with category filter & masonry/grid toggle
- `/portfolio/:slug` — Individual photo album story & lightbox
- `/campus-stories` — Campus Stories major brand pillar
- `/campus-stories/:slug` — College fest event gallery & QR banner access
- `/campus-stories/colleges` — Institutional partners roster & council booking
- `/packages` — Transparent pricing in ₹ INR with comparison matrix
- `/book` — Booking form with Zod validation, reference ID `DP-2026-XXXX`, and direct WhatsApp URL generator
- `/testimonials` — Verified client reviews & in-site review submission
- `/contact` — Studio address, Google Maps embed, and official social cards
- `/journal` — Shoot stories, tips, and SEO articles
- `/journal/:slug` — Full article reader
- `/faq` — FAQ accordion with JSON-LD schema
- `/client-gallery` — Private client gallery access with 4-digit PIN verification
- `/track` — Track booking enquiry status by Reference ID + phone
- `/find-my-photos` — DPDP Act compliant voluntary consent selfie matcher
- `/films` — Official YouTube 4K cinema hub
- `/links` — Mobile-first Linktree-style bio hub for Instagram & YouTube with UTM tagging
- `/privacy` & `/terms` — Legal terms and India DPDP Act compliance

---

## 🚢 Deployment (Vercel / Netlify / Render)

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if using remote Supabase.
6. Deploy!

---

© 2026 DOTPIC PHOTOGRAPHY. All rights reserved.
