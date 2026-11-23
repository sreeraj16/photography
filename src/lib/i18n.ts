import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'te';

export interface Translations {
  // Navigation
  navHome: string;
  navAbout: string;
  navServices: string;
  navPortfolio: string;
  navCampus: string;
  navPackages: string;
  navContact: string;
  navLogin: string;
  navBookSlot: string;

  // Hero Section
  heroEyebrow: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroTagline: string;
  explorePortfolio: string;
  bookShoot: string;
  watchShowreel: string;
  statWeddings: string;
  statFestivals: string;
  statFrames: string;
  statSatisfaction: string;

  // Philosophy / Intro
  philosophyTag: string;
  philosophyHeading1: string;
  philosophyHeading2: string;
  philosophyHeading3: string;
  philosophyDesc1: string;
  philosophyDesc2: string;
  readStory: string;
  instaFrames: string;

  // Services
  disciplinesTag: string;
  disciplinesHeading: string;
  disciplinesDesc: string;
  exploreService: string;
  bookShootDirect: string;
  viewAllDisciplines: string;

  // Portfolio
  portfolioTag: string;
  portfolioHeading: string;
  allFrames: string;
  browseArchive: string;

  // Campus Stories
  campusTag: string;
  campusHeading: string;
  campusDesc: string;
  viewEventGallery: string;
  bookFest: string;
  exploreAllCampuses: string;

  // Horizontal Stream
  streamTag: string;
  streamHeading: string;

  // Why Choose Us
  benchmarkTag: string;
  benchmarkHeading: string;
  benchmarkDesc: string;
  eventsShot: string;
  framesDelivered: string;
  collegesCovered: string;
  yearsExperience: string;

  // Testimonials
  reviewsTag: string;
  reviewsHeading: string;
  reviewsDesc: string;
  leaveReview: string;

  // Cinema & Social
  cinemaTag: string;
  cinemaHeading: string;
  subscribeYouTube: string;
  followInstagram: string;

  // CTA
  ctaTag: string;
  ctaHeading1: string;
  ctaHeading2: string;
  ctaDesc: string;
  bookShootNow: string;
  whatsappChat: string;

  // Booking Page
  bookingTitle: string;
  bookingSubtitle: string;
  chatWhatsAppBtn: string;
  messageInstaBtn: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navPortfolio: "Portfolio",
    navCampus: "Campus Stories",
    navPackages: "Packages",
    navContact: "Contact",
    navLogin: "Admin Login",
    navBookSlot: "Book Slot",

    // Hero Section
    heroEyebrow: "DOTPIC PHOTOGRAPHY // CINEMATIC STUDIO",
    heroHeadline1: "CAPTURING MOMENTS.",
    heroHeadline2: "CREATING MEMORIES.",
    heroTagline: "Every Frame Tells a Story. Every Moment Becomes Timeless.",
    explorePortfolio: "Explore Portfolio",
    bookShoot: "Book Your Shoot",
    watchShowreel: "Watch Showreel",
    statWeddings: "Royal Weddings",
    statFestivals: "Campus Festivals",
    statFrames: "Frames Delivered",
    statSatisfaction: "Client Satisfaction",

    // Philosophy / Intro
    philosophyTag: "PHILOSOPHY & ARTISTRY",
    philosophyHeading1: "We do not just press the shutter; we capture the",
    philosophyHeading2: "unspoken poetry",
    philosophyHeading3: "of the moment.",
    philosophyDesc1: "Founded on the belief that photography is modern visual cinema, DOTPIC blends documentary authenticity with high-fashion editorial polish. From royal Hyderabad weddings to high-voltage campus festivals with 18,000 students, every frame is treated like a classic cinematic still.",
    philosophyDesc2: "We reject rigid, artificial poses. Our focus is natural light, human vulnerability, kinetic joy, and deep emotional resonance.",
    readStory: "Read The DOTPIC Story",
    instaFrames: "Frames on Instagram @_dotpic_ →",

    // Services
    disciplinesTag: "CURATED DISCIPLINES",
    disciplinesHeading: "Signature Disciplines",
    disciplinesDesc: "Every genre demands distinct creative direction, lighting ratios, and narrative pacing. Explore our dedicated disciplines.",
    exploreService: "Explore Service",
    bookShootDirect: "Book Shoot →",
    viewAllDisciplines: "View All Specialized Packages & Disciplines",

    // Portfolio
    portfolioTag: "SIGNATURE ARCHIVE",
    portfolioHeading: "Masterpiece Frames",
    allFrames: "All Frames",
    browseArchive: "Browse Master Archive & Albums",

    // Campus Stories
    campusTag: "COLLEGE ARCHIVES",
    campusHeading: "Campus Stories",
    campusDesc: "South India's most trusted college fest photography team. Covering collegiate concerts, technical symposiums, and cultural milestones with instant QR access for students.",
    viewEventGallery: "View Event Gallery",
    bookFest: "Book Fest →",
    exploreAllCampuses: "Explore All 45+ College Festival Archives",

    // Horizontal Stream
    streamTag: "CURATED STREAM",
    streamHeading: "Signature Panoramic Stream",

    // Why Choose Us
    benchmarkTag: "THE BENCHMARK",
    benchmarkHeading: "Why Choose DOTPIC",
    benchmarkDesc: "Our numbers reflect trust earned across five years of documenting memorable weddings, summits, and youth fests.",
    eventsShot: "Events Shot",
    framesDelivered: "Frames Delivered",
    collegesCovered: "Colleges Covered",
    yearsExperience: "Years Experience",

    // Testimonials
    reviewsTag: "KUDOS & VOICES",
    reviewsHeading: "Words of Love",
    reviewsDesc: "Stories shared by our wedding couples, university conveners, and commercial collaborators.",
    leaveReview: "Have You Worked With DOTPIC? Leave a Review",

    // Cinema & Social
    cinemaTag: "YOUTUBE • @dotpicphotography",
    cinemaHeading: "Cinema in Motion",
    subscribeYouTube: "Subscribe on YouTube",
    followInstagram: "Follow on Instagram",

    // CTA
    ctaTag: "TIMELESS CRAFTSMANSHIP",
    ctaHeading1: "LET'S CREATE SOMETHING",
    ctaHeading2: "TIMELESS.",
    ctaDesc: "Whether you are planning a grand royal wedding, an unforgettable college fest, or an editorial fashion collection—our calendar fills up months in advance.",
    bookShootNow: "BOOK YOUR SHOOT NOW",
    whatsappChat: "DIRECT WHATSAPP CHAT",

    // Booking Page
    bookingTitle: "Book Your Slot with DOTPIC",
    bookingSubtitle: "Connect directly with our creative directors on WhatsApp or Instagram for instant availability and personalized quotations.",
    chatWhatsAppBtn: "Chat on WhatsApp (+91 6281392682)",
    messageInstaBtn: "Message on Instagram (@_dotpic_)",
  },
  te: {
    // Navigation
    navHome: "హోమ్",
    navAbout: "మా గురించి",
    navServices: "సేవలు",
    navPortfolio: "పోర్ట్‌ఫోలియో",
    navCampus: "క్యాంపస్ కథలు",
    navPackages: "ప్యాకేజీలు",
    navContact: "సంప్రదించండి",
    navLogin: "అడ్మిన్ లాగిన్",
    navBookSlot: "స్లాట్ బుక్ చేయండి",

    // Hero Section
    heroEyebrow: "డాట్‌పిక్ ఫోటోగ్రఫీ // సినిమాటిక్ స్టూడియో",
    heroHeadline1: "అద్భుత క్షణాలను బంధిస్తూ.",
    heroHeadline2: "జ్ఞాపకాలను సృష్టిస్తూ.",
    heroTagline: "ప్రతి ఫ్రేమ్ ఒక కథ చెబుతుంది. ప్రతి క్షణం శాశ్వతమవుతుంది.",
    explorePortfolio: "పోర్ట్‌ఫోలియో చూడండి",
    bookShoot: "షూట్ బుక్ చేసుకోండి",
    watchShowreel: "షోరీల్ చూడండి",
    statWeddings: "రాయల్ వివాహాలు",
    statFestivals: "క్యాంపస్ పండుగలు",
    statFrames: "అందించిన ఫోటోలు",
    statSatisfaction: "క్లయింట్ సంతృప్తి",

    // Philosophy / Intro
    philosophyTag: "మా తాత్వికత & కళ",
    philosophyHeading1: "మేము కేవలం షట్టర్ నొక్కము; ఆ క్షణం యొక్క",
    philosophyHeading2: "మౌన కవిత్వాన్ని",
    philosophyHeading3: "ఫ్రేమ్‌లో బంధిస్తాము.",
    philosophyDesc1: "ఫోటోగ్రఫీ అనేది ఆధునిక విజువల్ సినిమా అనే నమ్మకంతో, డాట్‌పిక్ వాస్తవికతను హై-ఫ్యాషన్ ఎడిటోరియల్ సొగసుతో మిళితం చేస్తుంది. హైదరాబాదీ రాయల్ వివాహాల నుండి 18,000 మంది విద్యార్థుల క్యాంపస్ ఫెస్ట్‌ల వరకు, ప్రతి ఫ్రేమ్‌ను ఒక క్లాసిక్ సినిమా స్టిల్‌లా మలుస్తాము.",
    philosophyDesc2: "మేము కృత్రిమ భంగిమలను తిరస్కరిస్తాము. సహజ కాంతి, మానవ స్పందనలు మరియు లోతైన భావోద్వేగాలనే మేము చిత్రీకరిస్తాము.",
    readStory: "డాట్‌పిక్ కథ చదవండి",
    instaFrames: "ఇన్‌స్టాగ్రామ్‌లో ఫ్రేమ్‌లు @_dotpic_ →",

    // Services
    disciplinesTag: "ప్రత్యేక విభాగాలు",
    disciplinesHeading: "మా సేవా విభాగాలు",
    disciplinesDesc: "ప్రతి రంగానికి ప్రత్యేక సృజనాత్మక శైలి, లైటింగ్ మరియు కథా నిర్మాణం అవసరం. మా విభాగాలను అన్వేషించండి.",
    exploreService: "సేవను చూడండి",
    bookShootDirect: "షూట్ బుక్ చేయండి →",
    viewAllDisciplines: "అన్ని ప్రత్యేక ప్యాకేజీలను చూడండి",

    // Portfolio
    portfolioTag: "సిగ్నేచర్ ఆర్కైవ్",
    portfolioHeading: "మాస్టర్‌పీస్ ఫ్రేమ్‌లు",
    allFrames: "అన్ని ఫ్రేమ్‌లు",
    browseArchive: "పూర్తి ఆర్కైవ్ & ఆల్బమ్‌లు చూడండి",

    // Campus Stories
    campusTag: "కళాశాల ఆర్కైవ్స్",
    campusHeading: "క్యాంపస్ కథలు",
    campusDesc: "దక్షిణ భారతదేశంలో అత్యంత విశ్వసనీయమైన కాలేజ్ ఫెస్ట్ ఫోటోగ్రఫీ బృందం. లైవ్ కాన్సర్ట్‌లు, సాంకేతిక సదస్సులు మరియు విద్యార్థులకు తక్షణ క్యూఆర్ యాక్సెస్.",
    viewEventGallery: "ఈవెంట్ గ్యాలరీ చూడండి",
    bookFest: "ఫెస్ట్ బుక్ చేయండి →",
    exploreAllCampuses: "45+ కళాశాల ఫెస్ట్ ఆర్కైవ్స్ చూడండి",

    // Horizontal Stream
    streamTag: "పనోరమిక్ స్ట్రీమ్",
    streamHeading: "సిగ్నేచర్ పనోరమిక్ స్ట్రీమ్",

    // Why Choose Us
    benchmarkTag: "మా ప్రమాణం",
    benchmarkHeading: "డాట్‌పిక్ ఎందుకు?",
    benchmarkDesc: "ఐదు సంవత్సరాల పాటు గుర్తుండిపోయే వివాహాలు, సదస్సులు మరియు యువజన పండుగలను డాక్యుమెంట్ చేయడం ద్వారా సంపాదించిన నమ్మకం.",
    eventsShot: "చిత్రీకరించిన ఈవెంట్లు",
    framesDelivered: "అందించిన ఫ్రేమ్‌లు",
    collegesCovered: "కవర్ చేసిన కాలేజీలు",
    yearsExperience: "ఏళ్ల అనుభవం",

    // Testimonials
    reviewsTag: "క్లయింట్ అనుభవాలు",
    reviewsHeading: "ప్రేమపూర్వక మాటలు",
    reviewsDesc: "మా వివాహ జంటలు, విశ్వవిద్యాలయ నిర్వాహకులు మరియు వ్యాపార భాగస్వాములు పంచుకున్న అనుభవాలు.",
    leaveReview: "మీరు డాట్‌పిక్‌తో పనిచేశారా? సమీక్ష ఇవ్వండి",

    // Cinema & Social
    cinemaTag: "యూట్యూబ్ • @dotpicphotography",
    cinemaHeading: "చలనంలో సినిమా",
    subscribeYouTube: "యూట్యూబ్‌లో సబ్‌స్క్రైబ్ చేయండి",
    followInstagram: "ఇన్‌స్టాగ్రామ్‌లో ఫాలో అవ్వండి",

    // CTA
    ctaTag: "శాశ్వత కళానైపుణ్యం",
    ctaHeading1: "రండి, అద్భుతాన్ని",
    ctaHeading2: "సృష్టిద్దాం.",
    ctaDesc: "మీరు రాయల్ వివాహం, క్యాంపస్ ఫెస్ట్ లేదా ఫ్యాషన్ షూట్ ప్లాన్ చేస్తున్నట్లయితే—మా క్యాలెండర్ నెలల ముందే బుక్ అవుతుంది.",
    bookShootNow: "ఇప్పుడే మీ షూట్ బుక్ చేసుకోండి",
    whatsappChat: "వాట్సాప్‌లో చాట్ చేయండి",

    // Booking Page
    bookingTitle: "డాట్‌పిక్‌తో మీ స్లాట్ బుక్ చేసుకోండి",
    bookingSubtitle: "తక్షణ లభ్యత మరియు వ్యక్తిగతీకరించిన వివరాల కోసం వాట్సాప్ లేదా ఇన్‌స్టాగ్రామ్‌లో నేరుగా మా క్రియేటివ్ డైరెక్టర్‌లను సంప్రదించండి.",
    chatWhatsAppBtn: "వాట్సాప్‌లో సంప్రదించండి (+91 6281392682)",
    messageInstaBtn: "ఇన్‌స్టాగ్రామ్‌లో మెసేజ్ చేయండి (@_dotpic_)",
  }
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

export const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (k) => translations.en[k] || k,
});

export function useI18n() {
  return useContext(I18nContext);
}

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.en;
}
