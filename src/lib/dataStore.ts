import {
  Category,
  Gallery,
  Photo,
  CampusEvent,
  Package,
  Enquiry,
  Testimonial,
  HomepageContent,
  WebsiteSettings,
  JournalPost,
  FAQ,
  ClientGallery,
  ClientGalleryPhoto,
  VideoHubItem,
  SocialPost,
  LinksPageItem,
  AvailabilityItem,
  ActivityLog
} from '../types/database.types';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY_PREFIX = 'dotpic_data_v5_';

// Initial Seed Data
const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Wedding",
    slug: "wedding",
    cover_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    description: "Cinematic royal rituals, candid emotions and timeless vows.",
    order_index: 1,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "cat-2",
    name: "Pre-Wedding",
    slug: "pre-wedding",
    cover_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    description: "Romantic conceptual storytelling in scenic locations.",
    order_index: 2,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "cat-3",
    name: "Campus Stories",
    slug: "campus-stories",
    cover_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    description: "Electric fests, concerts, hackathons and collegiate memories.",
    order_index: 3,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "cat-4",
    name: "Portrait",
    slug: "portrait",
    cover_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    description: "Expressive editorial lighting capturing true personality.",
    order_index: 4,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "cat-5",
    name: "Fashion",
    slug: "fashion",
    cover_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    description: "High-fashion lookbooks and runway aesthetics.",
    order_index: 5,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "cat-6",
    name: "Commercial",
    slug: "commercial",
    cover_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    description: "Impactful brand imagery for marketing campaigns.",
    order_index: 6,
    is_published: true,
    created_at: new Date().toISOString()
  }
];

const initialGalleries: Gallery[] = [
  {
    id: "gal-1",
    title: "A Royal Hyderabad Union: Vikram & Ananya",
    slug: "vikram-ananya-royal-wedding",
    category_slug: "wedding",
    cover_image_url: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=1200&auto=format&fit=crop",
    client_name: "Ananya & Vikram",
    location: "Taj Falaknuma Palace, Hyderabad",
    shoot_date: "2026-02-14",
    description: "A breathtaking three-day wedding celebration steeped in Nizami heritage, warm golden candlelights, and deeply intimate family vows.",
    is_featured: true,
    is_published: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "gal-2",
    title: "Golden Hour Reverie in Araku Valley",
    slug: "golden-hour-araku-prewedding",
    category_slug: "pre-wedding",
    cover_image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    client_name: "Dr. Sneha & Rohit",
    location: "Araku Valley, Andhra Pradesh",
    shoot_date: "2026-01-20",
    description: "Misty mornings, lush coffee plantation walks, and sunset silhouetted portraits celebrating tender intimacy before their big day.",
    is_featured: true,
    is_published: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "gal-3",
    title: "Editorial Noir: Shreya Sen",
    slug: "editorial-noir-shreya",
    category_slug: "portrait",
    cover_image_url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1200&auto=format&fit=crop",
    client_name: "Shreya Sen",
    location: "DOTPIC Studio, Jubilee Hills",
    shoot_date: "2026-03-05",
    description: "High-contrast chiaroscuro lighting capturing strength, vulnerability, and poise for an international model portfolio.",
    is_featured: true,
    is_published: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "gal-4",
    title: "Runway Symphony: Haute Couture 2026",
    slug: "runway-symphony-couture",
    category_slug: "fashion",
    cover_image_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    client_name: "Raw Mango x Sabyasachi Showcase",
    location: "Hitex Exhibition Centre, Hyderabad",
    shoot_date: "2026-02-28",
    description: "Silks, zardozi craft, and flowing textiles captured mid-motion on the runway with high-speed strobe synchronisation.",
    is_featured: true,
    is_published: true,
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "gal-5",
    title: "Intimate Haldi & Mehendi Celebration",
    slug: "mehendi-sunflower-celebration",
    category_slug: "wedding",
    cover_image_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
    client_name: "Pooja & Harsha",
    location: "Golkonda Resorts, Gandipet",
    shoot_date: "2026-03-10",
    description: "Bursts of marigold yellow, fragrant jasmine, energetic dhol beats, and spontaneous laughter shared among close childhood friends.",
    is_featured: false,
    is_published: true,
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "gal-6",
    title: "Urban Architecture & Minimalism",
    slug: "urban-architecture-minimalism",
    category_slug: "commercial",
    cover_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    client_name: "Skyview Tech Park",
    location: "Hitec City, Hyderabad",
    shoot_date: "2026-01-15",
    description: "Sleek glass geometry, dramatic angles, and dusk illumination capturing modern Indian corporate architecture.",
    is_featured: false,
    is_published: true,
    order_index: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const initialPhotos: Photo[] = [
  {
    id: "ph-1",
    gallery_id: "gal-1",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop",
    title: "Bridal Radiance",
    caption: "Heritage polki gold and hand-embroidered raw silk in soft directional morning illumination.",
    alt_text: "Traditional Indian bride wearing bridal lehenga and royal gold jewelry",
    order_index: 1,
    is_featured: true,
    exif_camera: "Sony Alpha 1",
    exif_lens: "FE 50mm f/1.2 GM",
    exif_focal_length: "50mm",
    exif_aperture: "f/1.4",
    exif_shutter_speed: "1/500s",
    exif_iso: "400",
    likes_count: 142,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-2",
    gallery_id: "gal-1",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",
    title: "Confetti Shower Vows",
    caption: "The joyous moment of floral celebration as vows are sealed.",
    alt_text: "Bride and groom under festive rose petal confetti celebration",
    order_index: 2,
    is_featured: true,
    exif_camera: "Sony Alpha 7R V",
    exif_lens: "FE 24-70mm f/2.8 GM II",
    exif_focal_length: "35mm",
    exif_aperture: "f/2.8",
    exif_shutter_speed: "1/320s",
    exif_iso: "640",
    likes_count: 119,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-3",
    gallery_id: "gal-2",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop",
    title: "Misty Whispers",
    caption: "Quiet embrace overlooking the morning clouds above the hills.",
    alt_text: "Romantic couple silhouette in mountain valley",
    order_index: 3,
    is_featured: true,
    exif_camera: "Canon EOS R5",
    exif_lens: "RF 85mm f/1.2L USM",
    exif_focal_length: "85mm",
    exif_aperture: "f/1.8",
    exif_shutter_speed: "1/1000s",
    exif_iso: "100",
    likes_count: 215,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-4",
    gallery_id: "gal-2",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&auto=format&fit=crop",
    title: "Golden Hour Drift",
    caption: "Sun rays cascading through the pine trees during an unposed stroll.",
    alt_text: "Pre-wedding couple holding hands in evening golden hour light",
    order_index: 4,
    is_featured: true,
    exif_camera: "Sony Alpha 7R V",
    exif_lens: "FE 35mm f/1.4 GM",
    exif_focal_length: "35mm",
    exif_aperture: "f/1.6",
    exif_shutter_speed: "1/800s",
    exif_iso: "160",
    likes_count: 184,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-5",
    gallery_id: "gal-3",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    title: "Soul in Directional Light",
    caption: "Dramatic rim light sculpting expressive cheekbones and natural skin texture.",
    alt_text: "High-contrast fine art editorial portrait photograph",
    order_index: 5,
    is_featured: true,
    exif_camera: "Sony Alpha 7R V",
    exif_lens: "FE 85mm f/1.4 GM",
    exif_focal_length: "85mm",
    exif_aperture: "f/2.0",
    exif_shutter_speed: "1/200s",
    exif_iso: "100",
    likes_count: 178,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-6",
    gallery_id: "gal-3",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    title: "Executive Character",
    caption: "Controlled studio Rembrandt lighting highlighting charisma and poise.",
    alt_text: "Professional corporate and creative studio headshot",
    order_index: 6,
    is_featured: true,
    exif_camera: "Sony Alpha 1",
    exif_lens: "FE 135mm f/1.8 GM",
    exif_focal_length: "135mm",
    exif_aperture: "f/2.2",
    exif_shutter_speed: "1/250s",
    exif_iso: "100",
    likes_count: 156,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-7",
    gallery_id: "gal-4",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop",
    title: "Runway Velvet Motion",
    caption: "Capturing kinetic motion blur and draped couture velvet under high-speed strobe.",
    alt_text: "High-fashion model in flowing velvet dress walking the runway",
    order_index: 7,
    is_featured: true,
    exif_camera: "Sony Alpha 1",
    exif_lens: "FE 70-200mm f/2.8 GM II",
    exif_focal_length: "135mm",
    exif_aperture: "f/2.8",
    exif_shutter_speed: "1/800s",
    exif_iso: "640",
    likes_count: 134,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-8",
    gallery_id: "gal-4",
    url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop",
    title: "Vogue Meadow Glow",
    caption: "Editorial outdoor couture campaign captured in diffused evening light.",
    alt_text: "Fashion lookbook model posing in bohemian meadow scenery",
    order_index: 8,
    is_featured: true,
    exif_camera: "Canon EOS R5",
    exif_lens: "RF 50mm f/1.2L",
    exif_focal_length: "50mm",
    exif_aperture: "f/1.4",
    exif_shutter_speed: "1/1200s",
    exif_iso: "100",
    likes_count: 162,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-9",
    gallery_id: "gal-6",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop",
    title: "Atrium Geometry",
    caption: "Modern glass minimalism, clean lines and architectural corporate grandeur.",
    alt_text: "Corporate office atrium interior architecture with glass reflections",
    order_index: 9,
    is_featured: true,
    exif_camera: "Sony Alpha 7R V",
    exif_lens: "FE 16-35mm f/2.8 GM II",
    exif_focal_length: "18mm",
    exif_aperture: "f/8.0",
    exif_shutter_speed: "1/60s",
    exif_iso: "200",
    likes_count: 94,
    created_at: new Date().toISOString()
  },
  {
    id: "ph-10",
    gallery_id: "gal-1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
    title: "The Heritage Ballroom",
    caption: "Warm candlelight chandeliers and historic architectural arches at Falaknuma.",
    alt_text: "Luxury wedding couple under grand palace chandeliers",
    order_index: 10,
    is_featured: true,
    exif_camera: "Sony Alpha 1",
    exif_lens: "FE 24-70mm f/2.8 GM II",
    exif_focal_length: "28mm",
    exif_aperture: "f/2.8",
    exif_shutter_speed: "1/160s",
    exif_iso: "800",
    likes_count: 203,
    created_at: new Date().toISOString()
  }
];

const initialCampusEvents: CampusEvent[] = [
  {
    id: "camp-1",
    title: "Elan & Envision 2026: The Astral Resonance",
    slug: "iit-hyderabad-elan-envision-2026",
    college_name: "IIT Hyderabad",
    college_id: "iit-hyd",
    event_date: "2026-02-21",
    category: "Cultural & Tech Fest",
    description: "South India's premier techno-cultural festival. 3 days of EDM concert madness, national rock bands, celebrity pro-nites, robotics battles, and 18,000 passionate students.",
    cover_image_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    photo_count: 640,
    video_highlight_url: "https://www.youtube.com/@dotpicphotography",
    is_featured: true,
    download_policy: "full",
    allow_find_my_photos: true,
    qr_code_url: "",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "camp-2",
    title: "Pearl 2026: Kaleidoscope Nights",
    slug: "bits-pilani-hyderabad-pearl-2026",
    college_name: "BITS Pilani Hyderabad",
    college_id: "bits-hyd",
    event_date: "2026-03-08",
    category: "Annual Cultural Fest",
    description: "Spectacular lighting, Bollywood star night, international choreo competitions, and electrifying campus vibes across BITS Hyderabad's amphitheatre.",
    cover_image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    photo_count: 520,
    video_highlight_url: "https://www.youtube.com/@dotpicphotography",
    is_featured: true,
    download_policy: "full",
    allow_find_my_photos: true,
    qr_code_url: "",
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "camp-3",
    title: "Shruthi 2026: Youth Unplugged",
    slug: "cbit-shruthi-2026",
    college_name: "CBIT Hyderabad",
    college_id: "cbit-hyd",
    event_date: "2026-02-12",
    category: "Inter-College Fest",
    description: "CBIT's flagship youth fest filled with street plays, battle of the bands, flashmobs, and pure unadulterated youthful excitement.",
    cover_image_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    photo_count: 410,
    is_featured: false,
    download_policy: "low_res",
    allow_find_my_photos: true,
    qr_code_url: "",
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "camp-4",
    title: "Sintillashunz 2026: Sonic Waves",
    slug: "vnr-vjiet-sintillashunz-2026",
    college_name: "VNR VJIET Hyderabad",
    college_id: "vnr-hyd",
    event_date: "2026-01-28",
    category: "Cultural Extravaganza",
    description: "One of Hyderabad's biggest engineering campus fests, featuring neon rave nights, fashion pageants, and high-energy music.",
    cover_image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    photo_count: 380,
    is_featured: true,
    download_policy: "full",
    allow_find_my_photos: true,
    qr_code_url: "",
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const initialPackages: Package[] = [
  {
    id: "pkg-1",
    name: "Classic Storyteller",
    slug: "classic-storyteller",
    category_slug: "wedding",
    price_inr: 0,
    duration: "1 Full Day (Up to 8 Hours)",
    description: "Essential cinematic coverage for intimate weddings, engagements, and temple ceremonies.",
    inclusions: [
      "1 Senior Candid Photographer",
      "1 Traditional Cinematographer",
      "150+ Hand-Retouched Master Frames",
      "All Raw High-Resolution Files in Cloud",
      "1 Cinematic Teaser (60 seconds)",
      "Online Private Gallery Access for 1 Year"
    ],
    is_popular: false,
    is_enabled: true,
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "pkg-2",
    name: "Cinematic Grandeur",
    slug: "cinematic-grandeur",
    category_slug: "wedding",
    price_inr: 0,
    duration: "2 Full Days (Full Festivities)",
    description: "Our signature luxury wedding package covering all rituals, ceremonies, and grand celebrations.",
    inclusions: [
      "2 Senior Candid Photographers",
      "2 Cinematic Filmmakers + Drone Pilot",
      "350+ Signature Edited Art Frames",
      "Full Wedding Film (15-20 mins) + 4K Teaser",
      "Deluxe Handcrafted Leather Photobook (40 Sheets)",
      "Same-Day Teaser Edit for Instagram Reels",
      "Lifetime Private Client Cloud Gallery"
    ],
    is_popular: true,
    is_enabled: true,
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "pkg-3",
    name: "Heritage Royal",
    slug: "heritage-royal",
    category_slug: "wedding",
    price_inr: 0,
    duration: "3 Days (Pre-Wedding + Wedding + Reception)",
    description: "The ultimate bespoke experience for grand celebrations and multi-day destination weddings.",
    inclusions: [
      "Full 6-Member Creative Crew with Director",
      "Pre-Wedding Conceptual Shoot Included",
      "Dual 4K Cinema Drones (Indoor & Outdoor)",
      "500+ Master Retouched Art Prints",
      "2 Deluxe Handcrafted Coffee Table Albums",
      "Live Webcast Setup for Global Relatives",
      "Dedicated VIP Express Delivery in 14 Days"
    ],
    is_popular: false,
    is_enabled: true,
    order_index: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "pkg-4",
    name: "Campus Fest Anthem",
    slug: "campus-fest-anthem",
    category_slug: "campus-stories",
    price_inr: 0,
    duration: "1 Day Fest (Morning to Night)",
    description: "High-voltage coverage of cultural fests, star nights, and college technical summits.",
    inclusions: [
      "2 High-Energy Event Photographers",
      "1 Dynamic Reel Videographer for Trending Shorts",
      "Instant 24-Hour Highlights Drop for College PR",
      "500+ High-Res Crowd & Stage Photos",
      "Custom QR Code Posters for Student Downloads",
      "Full Rights for College Social Media & Annual Magazines"
    ],
    is_popular: true,
    is_enabled: true,
    order_index: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "pkg-5",
    name: "Editorial Portrait Session",
    slug: "editorial-portrait",
    category_slug: "portrait",
    price_inr: 0,
    duration: "2-3 Hours Studio or Outdoor",
    description: "Bespoke personal branding, artist portraits and high-fashion modeling portfolios.",
    inclusions: [
      "Creative Lighting & Studio Consultation",
      "3 Outfit Changes",
      "20 Magazine-Grade Retouched Frames",
      "All Digital Proofs Delivered in 48 Hours",
      "Commercial Usage Rights Included"
    ],
    is_popular: false,
    is_enabled: true,
    order_index: 5,
    created_at: new Date().toISOString()
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: "t-1",
    client_name: "Ananya & Vikram",
    role_or_event: "Falaknuma Palace Wedding",
    college_or_location: "Hyderabad",
    quote: "DOTPIC did not just photograph our wedding; they immortalized our deepest emotions. Looking through our album brings happy tears every single time. The cinematic color tones and unobtrusive documentary approach are truly world-class.",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    is_featured: true,
    is_approved: true,
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "t-2",
    client_name: "Karthik Reddy",
    role_or_event: "Student Convener",
    college_or_location: "IIT Hyderabad (Elan & Envision)",
    quote: "The energy DOTPIC captured at our star night was absolutely insane! Thousands of students got their festival portraits via their instant QR gallery. Best campus photography team in South India, period.",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    is_featured: true,
    is_approved: true,
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "t-3",
    client_name: "Dr. Sneha & Rohit",
    role_or_event: "Pre-Wedding Shoot",
    college_or_location: "Araku Valley",
    quote: "Working with DOTPIC felt like hanging out with good friends who happen to be artistic geniuses. They guided our poses naturally and made us feel like movie stars. Their prompt WhatsApp communication and professionalism made everything seamless.",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    is_featured: true,
    is_approved: true,
    order_index: 3,
    created_at: new Date().toISOString()
  }
];

const initialEnquiries: Enquiry[] = [];

const initialVideos: VideoHubItem[] = [
  {
    id: "vid-1",
    title: "DOTPIC Official Cinematic Showreel",
    youtube_url: "https://www.youtube.com/@dotpicphotography",
    youtube_id: "LXb3EKWsInQ",
    thumbnail_url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop",
    category: "Showreel",
    description: "Experience the visual poetry, emotion, and cinematic craftsmanship that define DOTPIC PHOTOGRAPHY.",
    is_featured: true,
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "vid-2",
    title: "Royal Heritage Wedding Film Highlights",
    youtube_url: "https://www.youtube.com/@dotpicphotography",
    youtube_id: "LXb3EKWsInQ",
    thumbnail_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    category: "Weddings",
    description: "Grand royal wedding celebration captured in 4K anamorphic cinema.",
    is_featured: true,
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "vid-3",
    title: "Electric Campus Fest Aftermovie",
    youtube_url: "https://www.youtube.com/@dotpicphotography",
    youtube_id: "LXb3EKWsInQ",
    thumbnail_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    category: "Campus",
    description: "Students celebrating art, music, stage lasers, and collegiate camaraderie.",
    is_featured: true,
    order_index: 3,
    created_at: new Date().toISOString()
  }
];

const initialSocialPosts: SocialPost[] = [
  {
    id: "sp-1",
    platform: "instagram",
    url: "https://www.instagram.com/_dotpic_",
    thumbnail_url: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1a2?q=80&w=600&auto=format&fit=crop",
    caption: "Royal palace heritage portrait. Stitched silk and antique gold jewelry in soft sidelight. #DOTPIC #RoyalWedding #HyderabadWedding",
    is_featured: true,
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "sp-2",
    platform: "instagram",
    url: "https://www.instagram.com/_dotpic_",
    thumbnail_url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
    caption: "Sea of 12,000 flashlights swaying during the star night! Pure adrenaline. #CampusStories #DOTPIC #IITHyderabad",
    is_featured: true,
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "sp-3",
    platform: "instagram",
    url: "https://www.instagram.com/_dotpic_",
    thumbnail_url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
    caption: "Golden morning mist over rolling tea hills. Quiet promises. #PreWedding #DOTPIC #Cinematic",
    is_featured: true,
    order_index: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "sp-4",
    platform: "instagram",
    url: "https://www.instagram.com/_dotpic_",
    thumbnail_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    caption: "Fine-art studio lighting study. Pure symmetry and soul. #Editorial #PortraitPhotography #DOTPIC",
    is_featured: true,
    order_index: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "sp-5",
    platform: "instagram",
    url: "https://www.instagram.com/_dotpic_",
    thumbnail_url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
    caption: "Avant-garde fashion editorial shot on 35mm prime. #HauteCouture #DOTPIC #Runway",
    is_featured: true,
    order_index: 5,
    created_at: new Date().toISOString()
  },
  {
    id: "sp-6",
    platform: "instagram",
    url: "https://www.instagram.com/_dotpic_",
    thumbnail_url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
    caption: "Candid laughter during the Phoolon Ki Holi. Real unposed joy. #HaldiCeremony #CandidWedding",
    is_featured: true,
    order_index: 6,
    created_at: new Date().toISOString()
  }
];

const initialLinksItems: LinksPageItem[] = [
  { id: "lnk-1", title: "Book Your Photography Slot", url: "/book", icon_name: "Calendar", badge_text: "Fast Response", is_active: true, order_index: 1, created_at: new Date().toISOString() },
  { id: "lnk-2", title: "Chat Directly on WhatsApp (+91 6281392682)", url: "https://wa.me/916281392682", icon_name: "MessageCircle", badge_text: "Instant", is_active: true, order_index: 2, created_at: new Date().toISOString() },
  { id: "lnk-3", title: "Follow Us on Instagram (@_dotpic_)", url: "https://www.instagram.com/_dotpic_", icon_name: "Instagram", badge_text: "Daily Reels", is_active: true, order_index: 3, created_at: new Date().toISOString() },
  { id: "lnk-4", title: "Subscribe on YouTube (@dotpicphotography)", url: "https://www.youtube.com/@dotpicphotography", icon_name: "Youtube", badge_text: "4K Films", is_active: true, order_index: 4, created_at: new Date().toISOString() },
  { id: "lnk-5", title: "Explore Campus Stories & College Fests", url: "/campus-stories", icon_name: "GraduationCap", badge_text: "Popular", is_active: true, order_index: 5, created_at: new Date().toISOString() },
  { id: "lnk-6", title: "Browse Signature Wedding Portfolio", url: "/portfolio", icon_name: "Camera", badge_text: "Artistic", is_active: true, order_index: 6, created_at: new Date().toISOString() },
  { id: "lnk-7", title: "View Packages & Pricing (₹)", url: "/packages", icon_name: "Sparkles", badge_text: "Transparent", is_active: true, order_index: 7, created_at: new Date().toISOString() }
];

const initialFAQs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I book a shoot with DOTPIC PHOTOGRAPHY?",
    answer: "Simply click any 'Book Your Slot' button on our website! Complete your session details, and our system immediately generates a formatted WhatsApp message to +91 6281392682 with your unique reference ID. Our team reviews your requirements and replies with availability and an official quote promptly.",
    category: "Booking",
    order_index: 1,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "faq-2",
    question: "Do you travel for outstation and destination weddings?",
    answer: "Yes! While we are based in Jubilee Hills, Hyderabad, our team travels across India (Goa, Udaipur, Jaipur, Kerala, Bengaluru) and abroad for destination weddings, fashion campaigns, and collegiate festivals.",
    category: "Travel",
    order_index: 2,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "faq-3",
    question: "What is your turnaround time for photo and video delivery?",
    answer: "We deliver a curated 'Sneak Peek' teaser within 48 to 72 hours of your event for social media. The complete collection of high-resolution master retouched photographs and cinematic films is delivered in 2 to 3 weeks via your private cloud client gallery.",
    category: "Deliverables",
    order_index: 3,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "faq-4",
    question: "How does the Campus Stories QR Code photo delivery work?",
    answer: "For college fests and institutional events, we provide customized QR code display banners across your venue. Students and attendees can scan the QR code with any phone camera to access the live event gallery and download their stage and crowd pictures immediately.",
    category: "Campus",
    order_index: 4,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "faq-5",
    question: "How do private client galleries work?",
    answer: "Private client galleries are secure, unindexed portals protected by a secret 4-digit PIN or direct private token link. You can view full-resolution photographs, mark your personal favourites for physical album printing, write notes, and download high-res files directly.",
    category: "Client Galleries",
    order_index: 5,
    is_published: true,
    created_at: new Date().toISOString()
  }
];

const initialJournalPosts: JournalPost[] = [
  {
    id: "jrn-1",
    title: "10 Timeless Tips for Your Pre-Wedding Photography Session",
    slug: "10-timeless-pre-wedding-tips",
    excerpt: "From coordinating color palettes to choosing golden hour timing, here is how to create poetic memories without feeling awkward.",
    content: `A pre-wedding photography session is not merely about posing against scenic backdrops; it is about documenting the natural intimacy and quiet glances that make your relationship unique.

### 1. Choose Locations That Resonate With Your Story
Rather than picking a generic studio set, select a destination that holds sentimental value. Whether it is where you first had coffee, a misty morning in Araku Valley, or heritage architecture in Hyderabad, personal context always breathes life into your photos.

### 2. Coordinate, Do Not Match
Avoid wearing identical colors. Instead, select complementary tonal palettes—such as ivory and champagne gold, sage green and beige, or classic navy. This allows both personalities to stand out harmoniously.

### 3. Trust the Golden Hour
The hour directly following sunrise and the sixty minutes before sunset provide soft, warm, diffused light that gently flatters skin tones and introduces natural cinematic lens flares.

### 4. Move, Laugh, and Interact
The best frames happen in between the poses. Walk hand-in-hand, share an inside joke, or dance without music. When you forget the lens is watching, the emotion becomes timeless.`,
    cover_image_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    category: "Tips & Guides",
    tags: ["Pre-Wedding", "Posing", "Lighting", "Hyderabad"],
    author_name: "DOTPIC Creative Director",
    is_published: true,
    read_time: "5 min read",
    published_at: "2026-02-10T12:00:00Z",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "jrn-2",
    title: "Behind the Lens: Capturing High-Voltage Campus Fests",
    slug: "behind-the-lens-campus-fests",
    excerpt: "What does it take to document 18,000 college students singing their hearts out under strobe lasers? Here is our festival playbook.",
    content: `College festivals possess a raw, electric kineticism that few other events can rival. From soundchecks in scorching midday heat to celebrity concert crescendos at midnight, our crew operates with relentless energy.

### Anticipating the Drop
Concert photography requires anticipating the musical beat. When the DJ or rock band builds toward the crescendo, our photographers position themselves both on stage wings and atop front-row barrier trusses to capture the synchronous explosion of crowd confetti and light beams.

### Delivering in Real Time
In modern collegiate culture, memories move at the speed of social media. With DOTPIC Campus Stories, our editing technicians operate live on-site, delivering curated highlights within hours for college PR councils and student Instagram reels.`,
    cover_image_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    category: "Campus Life",
    tags: ["Campus Stories", "IIT Hyderabad", "Concerts", "Events"],
    author_name: "DOTPIC Campus Team",
    is_published: true,
    read_time: "4 min read",
    published_at: "2026-03-01T15:00:00Z",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const initialClientGalleries: ClientGallery[] = [];

const initialClientPhotos: ClientGalleryPhoto[] = [];

const initialSettings: WebsiteSettings = {
  brand_name: "DOTPIC PHOTOGRAPHY",
  brand_tagline: "Every Frame Tells a Story. Every Moment Becomes Timeless.",
  contact_whatsapp: "+91 6281392682",
  contact_phone: "+91 6281392682",
  contact_email: "dotpicphotography@gmail.com",
  contact_address: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
  contact_maps_url: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
  social_instagram: "https://www.instagram.com/_dotpic_",
  social_instagram_handle: "@_dotpic_",
  social_youtube: "https://www.youtube.com/@dotpicphotography",
  social_youtube_handle: "@dotpicphotography",
  social_whatsapp: "https://wa.me/916281392682",
  show_announcement_bar: true,
  announcement_text: "Now booking 2026 wedding & campus fest season • Contact +91 6281392682",
  business_hours: "Mon - Sat: 9:00 AM - 8:00 PM | Sun: By Appointment"
};

const initialHomepage: HomepageContent = {
  id: "home-1",
  hero_headline: "CAPTURING MOMENTS. CREATING MEMORIES.",
  hero_subheadline: "Every Frame Tells a Story. Every Moment Becomes Timeless.",
  hero_media_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  hero_media_type: "image",
  hero_poster_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  showreel_youtube_url: "https://www.youtube.com/@dotpicphotography",
  cta_title: "LET'S CREATE SOMETHING TIMELESS.",
  cta_subtitle: "Book your shoot today or talk to our creative team directly on WhatsApp.",
  stats_events_shot: 280,
  stats_photos_delivered: 165000,
  stats_colleges_covered: 48,
  stats_years_experience: 6,
  section_visibility: {
    hero: true,
    intro: true,
    services: true,
    portfolio: true,
    campus: true,
    horizontal: true,
    beforeAfter: true,
    whyChoose: true,
    bts: true,
    testimonials: true,
    packages: true,
    instagram: true,
    youtube: true,
    cta: true
  },
  updated_at: new Date().toISOString()
};

// Resilient Helper functions
function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(val));
  } catch (err) {
    console.error(`Error saving ${key} to storage`, err);
  }
}

// Master DataStore Class
export const dataStore = {
  // Website Settings
  getSettings(): WebsiteSettings {
    return getStorage<WebsiteSettings>('settings', initialSettings);
  },
  updateSettings(newSettings: Partial<WebsiteSettings>): WebsiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    setStorage('settings', updated);
    this.logActivity('UPDATE', 'settings', 'website_settings', updated);
    return updated;
  },

  // Homepage
  getHomepageContent(): HomepageContent {
    return getStorage<HomepageContent>('homepage', initialHomepage);
  },
  updateHomepageContent(content: Partial<HomepageContent>): HomepageContent {
    const current = this.getHomepageContent();
    const updated = { ...current, ...content, updated_at: new Date().toISOString() };
    setStorage('homepage', updated);
    this.logActivity('UPDATE', 'homepage', 'homepage_content', updated);
    return updated;
  },

  // Categories
  getCategories(): Category[] {
    return getStorage<Category[]>('categories', initialCategories);
  },
  saveCategory(cat: Category): void {
    const list = this.getCategories();
    const idx = list.findIndex(c => c.id === cat.id);
    if (idx >= 0) list[idx] = cat;
    else list.push(cat);
    setStorage('categories', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'category', cat.id, cat);
  },
  deleteCategory(id: string): void {
    const list = this.getCategories().filter(c => c.id !== id);
    setStorage('categories', list);
    this.logActivity('DELETE', 'category', id);
  },

  // Galleries (Albums)
  getGalleries(): Gallery[] {
    return getStorage<Gallery[]>('galleries', initialGalleries);
  },
  getGalleryBySlug(slug: string): Gallery | undefined {
    return this.getGalleries().find(g => g.slug === slug);
  },
  saveGallery(gallery: Gallery): void {
    const list = this.getGalleries();
    const idx = list.findIndex(g => g.id === gallery.id);
    if (idx >= 0) list[idx] = { ...gallery, updated_at: new Date().toISOString() };
    else list.push({ ...gallery, updated_at: new Date().toISOString() });
    setStorage('galleries', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'gallery', gallery.id, gallery);
  },
  deleteGallery(id: string): void {
    const list = this.getGalleries().filter(g => g.id !== id);
    setStorage('galleries', list);
    this.logActivity('DELETE', 'gallery', id);
  },

  // Photos
  getPhotos(galleryId?: string): Photo[] {
    const photos = getStorage<Photo[]>('photos', initialPhotos);
    if (galleryId) return photos.filter(p => p.gallery_id === galleryId);
    return photos;
  },
  savePhoto(photo: Photo): void {
    const list = getStorage<Photo[]>('photos', initialPhotos);
    const idx = list.findIndex(p => p.id === photo.id);
    if (idx >= 0) list[idx] = photo;
    else list.push(photo);
    setStorage('photos', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'photo', photo.id, photo);
  },
  deletePhoto(id: string): void {
    const list = getStorage<Photo[]>('photos', initialPhotos).filter(p => p.id !== id);
    setStorage('photos', list);
    this.logActivity('DELETE', 'photo', id);
  },
  likePhoto(id: string): void {
    const list = getStorage<Photo[]>('photos', initialPhotos);
    const item = list.find(p => p.id === id);
    if (item) {
      item.likes_count = (item.likes_count || 0) + 1;
      setStorage('photos', list);
    }
  },

  // Campus Events
  getCampusEvents(): CampusEvent[] {
    return getStorage<CampusEvent[]>('campus_events', initialCampusEvents);
  },
  getCampusEventBySlug(slug: string): CampusEvent | undefined {
    return this.getCampusEvents().find(e => e.slug === slug);
  },
  saveCampusEvent(event: CampusEvent): void {
    const list = this.getCampusEvents();
    const idx = list.findIndex(e => e.id === event.id);
    if (idx >= 0) list[idx] = { ...event, updated_at: new Date().toISOString() };
    else list.push({ ...event, updated_at: new Date().toISOString() });
    setStorage('campus_events', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'campus_event', event.id, event);
  },
  deleteCampusEvent(id: string): void {
    const list = this.getCampusEvents().filter(e => e.id !== id);
    setStorage('campus_events', list);
    this.logActivity('DELETE', 'campus_event', id);
  },

  // Packages
  getPackages(): Package[] {
    return getStorage<Package[]>('packages', initialPackages);
  },
  savePackage(pkg: Package): void {
    const list = this.getPackages();
    const idx = list.findIndex(p => p.id === pkg.id);
    if (idx >= 0) list[idx] = pkg;
    else list.push(pkg);
    setStorage('packages', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'package', pkg.id, pkg);
  },
  deletePackage(id: string): void {
    const list = this.getPackages().filter(p => p.id !== id);
    setStorage('packages', list);
    this.logActivity('DELETE', 'package', id);
  },

  // Testimonials
  getTestimonials(onlyApproved: boolean = true): Testimonial[] {
    const list = getStorage<Testimonial[]>('testimonials', initialTestimonials);
    if (onlyApproved) return list.filter(t => t.is_approved);
    return list;
  },
  saveTestimonial(t: Testimonial): void {
    const list = getStorage<Testimonial[]>('testimonials', initialTestimonials);
    const idx = list.findIndex(item => item.id === t.id);
    if (idx >= 0) list[idx] = t;
    else list.push(t);
    setStorage('testimonials', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'testimonial', t.id, t);
  },
  deleteTestimonial(id: string): void {
    const list = getStorage<Testimonial[]>('testimonials', initialTestimonials).filter(t => t.id !== id);
    setStorage('testimonials', list);
    this.logActivity('DELETE', 'testimonial', id);
  },

  // Enquiries (Booking Workflow)
  getEnquiries(): Enquiry[] {
    return getStorage<Enquiry[]>('enquiries', initialEnquiries);
  },
  getEnquiryByRef(refId: string, phoneEnding?: string): Enquiry | undefined {
    const list = this.getEnquiries();
    return list.find(e => {
      const matchRef = e.reference_id.trim().toUpperCase() === refId.trim().toUpperCase();
      if (!matchRef) return false;
      if (!phoneEnding) return true;
      const cleanInputPhone = phoneEnding.replace(/[^0-9]/g, '');
      const cleanStoredPhone = e.phone_number.replace(/[^0-9]/g, '');
      return cleanStoredPhone.endsWith(cleanInputPhone);
    });
  },
  saveEnquiry(enquiry: Enquiry): void {
    const list = this.getEnquiries();
    const idx = list.findIndex(e => e.id === enquiry.id);
    if (idx >= 0) list[idx] = { ...enquiry, updated_at: new Date().toISOString() };
    else list.unshift({ ...enquiry, updated_at: new Date().toISOString() });
    setStorage('enquiries', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'enquiry', enquiry.id, enquiry);

    // If Supabase is connected, also persist to Supabase
    if (isSupabaseConfigured && supabase) {
      supabase.from('enquiries').insert([enquiry]).then(({ error }) => {
        if (error) console.error('Failed to sync enquiry to Supabase', error);
      });
    }
  },
  deleteEnquiry(id: string): void {
    const list = this.getEnquiries().filter(e => e.id !== id);
    setStorage('enquiries', list);
    this.logActivity('DELETE', 'enquiry', id);
  },

  // Videos
  getVideos(): VideoHubItem[] {
    return getStorage<VideoHubItem[]>('videos', initialVideos);
  },
  saveVideo(v: VideoHubItem): void {
    const list = this.getVideos();
    const idx = list.findIndex(item => item.id === v.id);
    if (idx >= 0) list[idx] = v;
    else list.push(v);
    setStorage('videos', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'video', v.id, v);
  },
  deleteVideo(id: string): void {
    const list = this.getVideos().filter(v => v.id !== id);
    setStorage('videos', list);
    this.logActivity('DELETE', 'video', id);
  },

  // Social Posts
  getSocialPosts(): SocialPost[] {
    return getStorage<SocialPost[]>('social_posts', initialSocialPosts);
  },
  saveSocialPost(sp: SocialPost): void {
    const list = this.getSocialPosts();
    const idx = list.findIndex(p => p.id === sp.id);
    if (idx >= 0) list[idx] = sp;
    else list.push(sp);
    setStorage('social_posts', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'social_post', sp.id, sp);
  },
  deleteSocialPost(id: string): void {
    const list = this.getSocialPosts().filter(p => p.id !== id);
    setStorage('social_posts', list);
    this.logActivity('DELETE', 'social_post', id);
  },

  // Links Page Items (/links)
  getLinksItems(): LinksPageItem[] {
    return getStorage<LinksPageItem[]>('links_items', initialLinksItems);
  },
  saveLinksItem(item: LinksPageItem): void {
    const list = this.getLinksItems();
    const idx = list.findIndex(l => l.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.push(item);
    setStorage('links_items', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'links_item', item.id, item);
  },
  deleteLinksItem(id: string): void {
    const list = this.getLinksItems().filter(l => l.id !== id);
    setStorage('links_items', list);
    this.logActivity('DELETE', 'links_item', id);
  },

  // FAQs
  getFAQs(): FAQ[] {
    return getStorage<FAQ[]>('faqs', initialFAQs);
  },
  saveFAQ(faq: FAQ): void {
    const list = this.getFAQs();
    const idx = list.findIndex(f => f.id === faq.id);
    if (idx >= 0) list[idx] = faq;
    else list.push(faq);
    setStorage('faqs', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'faq', faq.id, faq);
  },
  deleteFAQ(id: string): void {
    const list = this.getFAQs().filter(f => f.id !== id);
    setStorage('faqs', list);
    this.logActivity('DELETE', 'faq', id);
  },

  // Journal Posts
  getJournalPosts(): JournalPost[] {
    return getStorage<JournalPost[]>('journal_posts', initialJournalPosts);
  },
  getJournalPostBySlug(slug: string): JournalPost | undefined {
    return this.getJournalPosts().find(j => j.slug === slug);
  },
  saveJournalPost(post: JournalPost): void {
    const list = this.getJournalPosts();
    const idx = list.findIndex(j => j.id === post.id);
    if (idx >= 0) list[idx] = { ...post, updated_at: new Date().toISOString() };
    else list.push({ ...post, updated_at: new Date().toISOString() });
    setStorage('journal_posts', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'journal_post', post.id, post);
  },
  deleteJournalPost(id: string): void {
    const list = this.getJournalPosts().filter(j => j.id !== id);
    setStorage('journal_posts', list);
    this.logActivity('DELETE', 'journal_post', id);
  },

  // Client Galleries
  getClientGalleries(): ClientGallery[] {
    return getStorage<ClientGallery[]>('client_galleries', initialClientGalleries);
  },
  getClientGallery(idOrSlug: string): ClientGallery | undefined {
    return this.getClientGalleries().find(cg => cg.id === idOrSlug || cg.slug === idOrSlug);
  },
  getClientGalleryPhotos(galleryId: string): ClientGalleryPhoto[] {
    const photos = getStorage<ClientGalleryPhoto[]>('client_photos', initialClientPhotos);
    return photos.filter(p => p.client_gallery_id === galleryId);
  },
  verifyClientGalleryPIN(galleryId: string, enteredPin: string): boolean {
    const gallery = this.getClientGalleries().find(g => g.id === galleryId || g.slug === galleryId);
    if (!gallery) return false;
    return gallery.pin_hash === enteredPin;
  },
  incrementGalleryDownload(galleryId: string): void {
    const list = this.getClientGalleries();
    const gallery = list.find(g => g.id === galleryId);
    if (gallery) {
      gallery.download_count = (gallery.download_count || 0) + 1;
      setStorage('client_galleries', list);
    }
  },
  saveClientGallery(cg: ClientGallery): void {
    const list = this.getClientGalleries();
    const idx = list.findIndex(g => g.id === cg.id);
    if (idx >= 0) list[idx] = cg;
    else list.push(cg);
    setStorage('client_galleries', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'client_gallery', cg.id, cg);
  },
  deleteClientGallery(id: string): void {
    const list = this.getClientGalleries().filter(g => g.id !== id);
    setStorage('client_galleries', list);
    this.logActivity('DELETE', 'client_gallery', id);
  },

  // Availability Calendar
  getAvailability(): AvailabilityItem[] {
    return getStorage<AvailabilityItem[]>('availability', [
      { id: "av-1", date: "2026-12-10", status: "blocked", notes: "Siddharth Rao Royal Wedding", created_at: new Date().toISOString() },
      { id: "av-2", date: "2026-12-11", status: "blocked", notes: "Siddharth Rao Royal Wedding", created_at: new Date().toISOString() },
      { id: "av-3", date: "2026-12-12", status: "blocked", notes: "Siddharth Rao Royal Wedding", created_at: new Date().toISOString() },
      { id: "av-4", date: "2026-12-28", status: "busy", notes: "NIT Warangal Fest Coverage", created_at: new Date().toISOString() }
    ]);
  },
  saveAvailability(item: AvailabilityItem): void {
    const list = this.getAvailability();
    const idx = list.findIndex(a => a.date === item.date);
    if (idx >= 0) list[idx] = item;
    else list.push(item);
    setStorage('availability', list);
    this.logActivity(idx >= 0 ? 'UPDATE' : 'CREATE', 'availability', item.date, item);
  },
  deleteAvailability(id: string): void {
    const list = this.getAvailability().filter(a => a.id !== id);
    setStorage('availability', list);
    this.logActivity('DELETE', 'availability', id);
  },

  // Audit Logs
  getActivityLogs(): ActivityLog[] {
    return getStorage<ActivityLog[]>('activity_logs', [
      { id: "log-1", action: "SYSTEM_INIT", entity_type: "system", entity_id: "init", details: { message: "DOTPIC Production Platform initialized" }, created_at: new Date().toISOString() }
    ]);
  },
  logActivity(action: string, entity_type: string, entity_id: string, details?: any): void {
    const logs = this.getActivityLogs();
    logs.unshift({
      id: "log-" + Date.now(),
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString()
    });
    // keep max 100 logs
    if (logs.length > 100) logs.pop();
    setStorage('activity_logs', logs);
  },

  // Export & Backup
  exportAllData(): string {
    const data = {
      settings: this.getSettings(),
      homepage: this.getHomepageContent(),
      categories: this.getCategories(),
      galleries: this.getGalleries(),
      photos: this.getPhotos(),
      campus_events: this.getCampusEvents(),
      packages: this.getPackages(),
      testimonials: this.getTestimonials(false),
      enquiries: this.getEnquiries(),
      videos: this.getVideos(),
      social_posts: this.getSocialPosts(),
      links_items: this.getLinksItems(),
      faqs: this.getFAQs(),
      journal_posts: this.getJournalPosts(),
      client_galleries: this.getClientGalleries(),
      availability: this.getAvailability(),
      exported_at: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }
};
