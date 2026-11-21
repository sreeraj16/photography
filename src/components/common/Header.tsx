import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Menu, X, Volume2, VolumeX, Calendar, Phone, ArrowUpRight, Globe } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { useI18n } from '../../lib/i18n';
import { useAudio } from '../../hooks/useAudio';
import { Button } from '../ui/Button';
import { DotpicLogo } from './DotpicLogo';

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useI18n();
  const { soundEnabled, toggleSound, playShutterSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-dotpic-black/95 backdrop-blur-md border-b border-dotpic-border/80 py-3 shadow-2xl shadow-black/90'
            : 'bg-gradient-to-b from-dotpic-black/90 via-dotpic-black/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={playShutterSound}
              aria-label="DOTPIC Photography Home"
              data-cursor="hover"
            >
              <DotpicLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-cursor="hover"
                    className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 ${
                      isActive
                        ? 'text-dotpic-gold font-medium'
                        : 'text-dotpic-muted hover:text-dotpic-white'
                    } ${link.highlight ? 'text-amber-300 hover:text-amber-200' : ''}`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-dotpic-gold animate-in fade-in duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Socials, Sound, Lang, Book CTA */}
            <div className="hidden lg:flex items-center gap-3 sm:gap-4">
              {/* Official Social Icons */}
              <div className="flex items-center gap-1.5 pr-2 border-r border-dotpic-border/60">
                <a
                  href={BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.socials.instagram.label}
                  data-cursor="hover"
                  className="p-2 text-dotpic-muted hover:text-dotpic-gold transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.socials.youtube.label}
                  data-cursor="hover"
                  className="p-2 text-dotpic-muted hover:text-dotpic-gold transition-colors duration-200"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              {/* Sound Toggle (Camera shutter) */}
              <button
                onClick={toggleSound}
                data-cursor="hover"
                className="p-2 text-dotpic-muted hover:text-dotpic-gold transition-colors duration-200 focus:outline-none"
                title={soundEnabled ? "Mute shutter sound" : "Enable camera shutter sound"}
                aria-label="Toggle camera shutter sound effects"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-dotpic-gold" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Language Selector */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                data-cursor="hover"
                className="px-2.5 py-1 text-[11px] font-semibold border border-dotpic-border rounded-sm text-dotpic-muted hover:text-dotpic-white hover:border-dotpic-gold transition-colors flex items-center gap-1"
                title="Switch Language: English / Telugu"
              >
                <Globe className="w-3 h-3 text-dotpic-gold" />
                <span>{lang === 'en' ? 'తెలుగు' : 'EN'}</span>
              </button>

              {/* Book Slot CTA */}
              <Link to="/book" data-cursor="hover">
                <Button
                  size="sm"
                  variant="gold"
                  withShutterSound
                  icon={<Calendar className="w-3.5 h-3.5 text-dotpic-black" />}
                >
                  Book Slot
                </Button>
              </Link>
            </div>

            {/* Mobile Actions: Language + WhatsApp + Hamburger */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="px-2 py-1 text-[10px] font-semibold border border-dotpic-border rounded-sm text-dotpic-gold"
                aria-label="Switch Language"
              >
                {lang === 'en' ? 'తెలుగు' : 'EN'}
              </button>

              <a
                href={BRAND.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-emerald-400 hover:text-emerald-300"
                aria-label="Direct WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-dotpic-white hover:text-dotpic-gold focus:outline-none"
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-dotpic-black/98 flex flex-col justify-between p-6 pt-20 backdrop-blur-2xl lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center absolute top-4 left-6 right-6 pb-3 border-b border-dotpic-border/60">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <DotpicLogo size="sm" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full border border-dotpic-border text-dotpic-white hover:text-dotpic-gold focus:outline-none"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <nav className="flex flex-col gap-4 py-6 mt-4">
              {NAV_LINKS.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 + 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-serif tracking-wider flex items-center justify-between py-1 transition-colors ${
                        isActive ? 'text-dotpic-gold' : 'text-dotpic-white hover:text-dotpic-gold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-dotpic-gold/70">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <span>{link.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-40 text-dotpic-gold" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-dotpic-border/60 space-y-3"
              >
                <Link
                  to="/links"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-sans uppercase tracking-widest text-amber-400 hover:text-amber-300 block py-1"
                >
                  Link-in-Bio Hub (/links) →
                </Link>
                <Link
                  to="/client-gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-sans uppercase tracking-widest text-dotpic-muted hover:text-dotpic-gold block py-1"
                >
                  Client Gallery Vault →
                </Link>
              </motion.div>
            </nav>

            {/* Bottom Actions: Socials, Shutter Sound, Book CTA */}
            <div className="flex flex-col gap-4 border-t border-dotpic-border pt-4 pb-6 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-dotpic-muted uppercase tracking-widest font-mono">
                  Official Channels
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-dotpic-surface border border-dotpic-border text-[11px] text-dotpic-muted hover:text-dotpic-gold"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-dotpic-gold" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{soundEnabled ? 'FX On' : 'FX Off'}</span>
                  </button>

                  <a
                    href={BRAND.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-dotpic-muted hover:text-dotpic-gold"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={BRAND.socials.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-dotpic-muted hover:text-dotpic-gold"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <Link to="/book" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="gold" size="lg" className="w-full shadow-lg shadow-dotpic-gold/20" withShutterSound>
                  Book Your Shoot Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
