export const BRAND = {
  name: "DOTPIC PHOTOGRAPHY",
  shortName: "DOTPIC",
  tagline: "Every Frame Tells a Story. Every Moment Becomes Timeless.",
  phone: "+91 6281392682",
  phoneRaw: "916281392682",
  email: "dotpicphotography@gmail.com",
  location: "Hyderabad, India",
  fullAddress: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
  mapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
  socials: {
    instagram: {
      handle: "@_dotpic_",
      url: "https://www.instagram.com/_dotpic_",
      label: "Follow DOTPIC on Instagram"
    },
    youtube: {
      handle: "@dotpicphotography",
      url: "https://www.youtube.com/@dotpicphotography",
      label: "Subscribe to DOTPIC on YouTube"
    },
    whatsapp: {
      display: "+91 6281392682",
      url: "https://wa.me/916281392682",
      label: "Chat with DOTPIC on WhatsApp"
    }
  }
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Campus Stories", path: "/campus-stories", highlight: true },
  { name: "Films", path: "/films" },
  { name: "Packages", path: "/packages" },
  { name: "Journal", path: "/journal" },
  { name: "Contact", path: "/contact" },
];

export const SERVICE_CATEGORIES = [
  {
    id: "wedding",
    name: "Wedding",
    slug: "wedding",
    tagline: "Royal rituals and timeless vows",
    description: "Multi-day ceremonial coverage, grand entries, heartfelt pheras, and regal receptions documented with cinematic poise.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    features: ["Candid & Traditional Coverage", "Cinematic 4K Highlights Film", "Deluxe Handcrafted Leather Album", "Drone & Aerial Perspectives"]
  },
  {
    id: "pre-wedding",
    name: "Pre-Wedding",
    slug: "pre-wedding",
    tagline: "Romantic conceptual storytelling",
    description: "Scenic destination journeys, natural chemistry, and editorial aesthetics designed around your unique couple story.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    features: ["Scenic Destination Shoots", "Styling & Moodboard Guidance", "Save-the-Date Teaser Video", "Multiple Signature Looks"]
  },
  {
    id: "campus-stories",
    name: "Campus Stories",
    slug: "campus-stories",
    tagline: "Electric college fests & summits",
    description: "High-octane concert energy, celebrity performances, hackathon milestones, and unforgettable university memories.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    features: ["Instant QR Code Photo Access", "Dynamic Instagram Reel Delivery", "Stage & Crowd Action Captures", "University Partner Discounts"]
  },
  {
    id: "portrait",
    name: "Portrait",
    slug: "portrait",
    tagline: "Expressive editorial character",
    description: "Mastery of light and shadows, capturing raw soul, personal branding, and high-fashion modeling portfolios.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    features: ["Studio & Outdoor Creative Lighting", "High-End Beauty Retouching", "Model & Actor Portfolios", "Corporate Executive Headshots"]
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    tagline: "Lookbooks & editorial runways",
    description: "Designer couture, seasonal collections, lookbooks, and high-energy runway showcases.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    features: ["Lookbook & Campaign Direction", "Editorial Lighting Setups", "Model Coordination Support", "Magazine-Ready Color Grading"]
  },
  {
    id: "event",
    name: "Events & Celebrations",
    slug: "event",
    tagline: "Corporate galas & milestone milestones",
    description: "Conferences, product launches, VIP galas, anniversaries, and lavish milestone birthday celebrations.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    features: ["VIP & Stage Keynote Coverage", "Rapid Press & PR Photo Drops", "Guest Portraits & Photo Booths", "Multi-Angle Video Feeds"]
  },
  {
    id: "commercial",
    name: "Commercial & Brand",
    slug: "commercial",
    tagline: "Architectural & lifestyle brand identity",
    description: "Visual assets that elevate brand equity, luxury spaces, interior design, and corporate advertising.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    features: ["Commercial Licensing", "Architectural & Interior Staging", "Advertising Asset Creation", "Billboard-Ready Resolution"]
  },
  {
    id: "product",
    name: "Product & E-Commerce",
    slug: "product",
    tagline: "Crisp studio perfection",
    description: "Clean tabletop and stylized lifestyle product photography optimized for high conversion and luxury catalogues.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop",
    features: ["White Background Studio Shots", "Creative Contextual Styling", "Macro & Texture Details", "Amazon & Shopify Ready Exports"]
  },
  {
    id: "maternity",
    name: "Maternity & Newborn",
    slug: "maternity",
    tagline: "Heartwarming new beginnings",
    description: "Tender, peaceful portraits celebrating pregnancy milestones, gentle bonding, and precious newborn innocence.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop",
    features: ["Comfort-First Studio Sessions", "Gentle Props & Neutral Tones", "Parent & Sibling Portraits", "Sanitized Safe Environment"]
  },
  {
    id: "drone-aerial",
    name: "Drone & Aerial",
    slug: "drone-aerial",
    tagline: "Breathtaking bird's-eye spectacles",
    description: "Cinematic 4K aerial vistas of grand venues, outdoor college arenas, scenic landscapes, and real estate estates.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop",
    features: ["Licensed Drone Operators", "4K HDR Aerial Video", "Wide-Angle Panoramic Landscapes", "Dynamic Fly-Through Shots"]
  }
];
