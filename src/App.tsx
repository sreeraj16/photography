import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FollowRail } from './components/common/FollowRail';
import { CustomCursor } from './components/common/CustomCursor';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { MobileStickyBar } from './components/common/MobileStickyBar';

// Context & Data
import { I18nContext, Language, getTranslations } from './lib/i18n';
import { dataStore } from './lib/dataStore';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { GalleryDetailPage } from './pages/GalleryDetailPage';
import { CampusStoriesPage } from './pages/CampusStoriesPage';
import { CampusEventDetailPage } from './pages/CampusEventDetailPage';
import { CollegePartnerPage } from './pages/CollegePartnerPage';
import { PackagesPage } from './pages/PackagesPage';
import { BookPage } from './pages/BookPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { FAQPage } from './pages/FAQPage';
import { ClientGalleryPage } from './pages/ClientGalleryPage';
import { TrackEnquiryPage } from './pages/TrackEnquiryPage';
import { FindMyPhotosPage } from './pages/FindMyPhotosPage';
import { FilmsPage } from './pages/FilmsPage';
import { LinksBioPage } from './pages/LinksBioPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// App Shell Content with conditional header/footer
function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLinksRoute = location.pathname === '/links';

  const settings = dataStore.getSettings();

  return (
    <>
      <ScrollToTop />
      <CustomCursor />

      {/* Announcement Bar */}
      {!isAdminRoute && !isLinksRoute && settings.show_announcement_bar && (
        <AnnouncementBar text={settings.announcement_text} />
      )}

      {/* Header */}
      {!isAdminRoute && !isLinksRoute && <Header />}

      {/* Desktop Follow Rail */}
      {!isAdminRoute && !isLinksRoute && <FollowRail />}

      {/* Main Routes */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<GalleryDetailPage />} />
          <Route path="/campus-stories" element={<CampusStoriesPage />} />
          <Route path="/campus-stories/:slug" element={<CampusEventDetailPage />} />
          <Route path="/campus-stories/colleges" element={<CollegePartnerPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<JournalDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/client-gallery" element={<ClientGalleryPage />} />
          <Route path="/client-gallery/:id" element={<ClientGalleryPage />} />
          <Route path="/track" element={<TrackEnquiryPage />} />
          <Route path="/find-my-photos" element={<FindMyPhotosPage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/links" element={<LinksBioPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Mobile Sticky Action Bar */}
      {!isAdminRoute && !isLinksRoute && <MobileStickyBar />}

      {/* Footer */}
      {!isAdminRoute && !isLinksRoute && <Footer />}
    </>
  );
}

export function App() {
  const [lang, setLang] = useState<Language>('en');

  // Smooth Lenis Scroll setup
  useEffect(() => {
    // Respect reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    } catch {
      // Lenis optional fallback
    }
  }, []);

  const i18nValue = {
    lang,
    setLang,
    t: (key: any) => ((getTranslations(lang) as any)[key] || key),
  };

  return (
    <I18nContext.Provider value={i18nValue}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </I18nContext.Provider>
  );
}

export default App;
