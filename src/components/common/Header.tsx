import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Menu, X, Volume2, VolumeX, Calendar, Phone, ArrowUpRight, Globe, Sun, Moon } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { useI18n } from '../../lib/i18n';
import { useAudio } from '../../hooks/useAudio';
import { useTheme } from '../../lib/theme';
import { Button } from '../ui/Button';
import { DotpicLogo } from './DotpicLogo';

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useI18n();
  const { soundEnabled, toggleSound, playShutterSound } = useAudio();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 dark:bg-[#080C0E]/95 backdrop-blur-md border-b border-[#E2DCD0] dark:border-[#1E293B] py-2.5 sm:py-3 shadow-md'
            : 'bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/50 to-transparent dark:from-[#080C0E]/90 dark:via-[#080C0E]/50 dark:to-transparent py-3.5 sm:py-4'
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
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-cursor="hover"
                    className={`font-orbitron text-[11px] tracking-wider uppercase transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-teal-600 dark:text-teal-400 font-semibold'
                        : 'text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Dark/Light Mode, Socials, Sound, Lang, Book CTA */}
            <div className="hidden lg:flex items-center gap-2.5 sm:gap-3">
              {/* Theme Toggle (Dark / Light) */}
              <button
                onClick={toggleTheme}
                data-cursor="hover"
                className="p-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300 shadow-sm"
                title={isDark ? "Switch to Cream Light Mode" : "Switch to Noir Dark Mode"}
                aria-label="Toggle theme mode"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
                ) : (
                  <Moon className="w-4 h-4 text-teal-600 transition-transform duration-500 rotate-0 hover:-rotate-45" />
                )}
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                data-cursor="hover"
                className="p-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-sm focus:outline-none"
                title={soundEnabled ? "Mute shutter sound" : "Enable camera shutter sound"}
                aria-label="Toggle camera shutter sound effects"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Official Social Icons */}
              <div className="flex items-center gap-1 px-1.5 border-l border-r border-slate-300 dark:border-slate-800">
                <a
                  href={BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.socials.instagram.label}
                  data-cursor="hover"
                  className="p-1.5 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.socials.youtube.label}
                  data-cursor="hover"
                  className="p-1.5 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              {/* Language Selector */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                data-cursor="hover"
                className="px-2.5 py-1 text-[11px] font-orbitron font-semibold border border-slate-300 dark:border-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1 bg-white/60 dark:bg-slate-900/60"
                title="Switch Language: English / Telugu"
              >
                <Globe className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                <span>{lang === 'en' ? 'తెలుగు' : 'EN'}</span>
              </button>

              {/* Book Slot CTA */}
              <Link to="/book" data-cursor="hover">
                <Button
                  size="sm"
                  variant="primary"
                  withShutterSound
                  icon={<Calendar className="w-3.5 h-3.5 text-white" />}
                >
                  Book Slot
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-600" />}
              </button>

              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="px-2 py-1 text-[10px] font-orbitron font-semibold border border-slate-300 dark:border-slate-800 rounded-full text-teal-600 dark:text-teal-400"
                aria-label="Switch Language"
              >
                {lang === 'en' ? 'తెలుగు' : 'EN'}
              </button>

              <a
                href={BRAND.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-teal-600 dark:text-teal-400"
                aria-label="Direct WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#FAF7F2]/98 dark:bg-[#080C0E]/98 flex flex-col justify-between p-6 pt-20 backdrop-blur-2xl lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center absolute top-4 left-6 right-6 pb-3 border-b border-slate-200 dark:border-slate-800">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <DotpicLogo size="sm" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
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
                      className={`text-xl font-orbitron tracking-wider flex items-center justify-between py-1 transition-colors ${
                        isActive ? 'text-teal-600 dark:text-teal-400 font-semibold' : 'text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-orbitron text-teal-600/70 dark:text-teal-400/70">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <span>{link.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-50 text-teal-600 dark:text-teal-400" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3"
              >
                <Link
                  to="/links"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-orbitron uppercase tracking-widest text-teal-600 dark:text-teal-400 block py-1"
                >
                  Link-in-Bio Hub (/links) →
                </Link>
                <Link
                  to="/client-gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-orbitron uppercase tracking-widest text-slate-500 dark:text-slate-400 block py-1"
                >
                  Client Gallery Vault →
                </Link>
              </motion.div>
            </nav>

            {/* Bottom Actions: Theme, Socials, Book CTA */}
            <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-4 pb-6 mt-auto">
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-xs font-orbitron text-slate-700 dark:text-slate-300"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-600" />}
                  <span>{isDark ? 'Light (Cream)' : 'Dark (Noir)'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={BRAND.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={BRAND.socials.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <Link to="/book" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="primary" size="lg" className="w-full" withShutterSound>
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
