import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'te';

interface Translations {
  tagline: string;
  explorePortfolio: string;
  bookShoot: string;
  watchShowreel: string;
  servicesTitle: string;
  campusStoriesTitle: string;
  contactUs: string;
  whyChooseUs: string;
  testimonialsTitle: string;
  viewAll: string;
  referenceId: string;
}

const translations: Record<Language, Translations> = {
  en: {
    tagline: "Every Frame Tells a Story. Every Moment Becomes Timeless.",
    explorePortfolio: "Explore Portfolio",
    bookShoot: "Book Your Shoot",
    watchShowreel: "Watch Showreel",
    servicesTitle: "Featured Services",
    campusStoriesTitle: "Campus Stories",
    contactUs: "Contact Us",
    whyChooseUs: "Why Choose DOTPIC",
    testimonialsTitle: "Words of Love",
    viewAll: "View All",
    referenceId: "Reference ID"
  },
  te: {
    tagline: "ప్రతి ఫ్రేమ్ ఒక కథ చెబుతుంది. ప్రతి క్షణం శాశ్వతమవుతుంది.",
    explorePortfolio: "పోర్ట్‌ఫోలియో చూడండి",
    bookShoot: "షూట్ బుక్ చేసుకోండి",
    watchShowreel: "షోరీల్ చూడండి",
    servicesTitle: "ప్రత్యేక సేవలు",
    campusStoriesTitle: "క్యాంపస్ కథలు",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    whyChooseUs: "డాట్‌పిక్ ఎందుకు?",
    testimonialsTitle: "క్లయింట్ సమీక్షలు",
    viewAll: "అన్నీ చూడండి",
    referenceId: "రిఫరెన్స్ ఐడీ"
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
