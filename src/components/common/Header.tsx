import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Menu, X, Calendar, Phone, ArrowUpRight, Globe, Sun, Moon, LogIn } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { useI18n } from '../../lib/i18n';
import { useAudio } from '../../hooks/useAudio';
import { useTheme } from '../../lib/theme';
import { Button } from '../ui/Button';
import { DotpicLogo } from './DotpicLogo';

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { playShutterSound } = useAudio();
  const { theme, toggleTheme, isDark } = useTheme();
  const isAdmin = typeof window !== 'undefined' && Boolean(localStorage.getItem('dotpic_admin_auth'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navServices'), path: '/services' },
    { name: t('navPortfolio'), path: '/portfolio' },
    { name: t('navCampus'), path: '/campus-stories' },
    { name: t('navPackages'), path: '/packages' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 dark:bg-[#080C0E]/95 backdrop-blur-md border-b border-[#E2DCD0] dark:border-[#1E293B] py-2.5 sm:py-3 shadow-md'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* 1. Official Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
              onClick={playShutterSound}
              aria-label="DOTPIC Photography Home"
              data-cursor="hover"
            >
              <DotpicLogo size="md" />
            </Link>

            {/* 2. Desktop Navigation Bar (Cleanly centered & evenly spaced) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-cursor="hover"
                    className={`font-orbitron text-[11px] xl:text-xs tracking-wider uppercase transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-teal-600 dark:text-teal-400 font-semibold'
                        : isScrolled
                        ? 'text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400 font-medium'
                        : 'text-white/90 hover:text-teal-300 font-medium'
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

            {/* 3. Right Utility Cluster: Language, Theme, Login, Book Slot */}
            <div className="hidden lg:flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              {/* Language Switcher (EN / తెలుగు) */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                data-cursor="hover"
                className={`px-2.5 py-1 text-[11px] font-orbitron font-semibold border rounded-full transition-all flex items-center gap-1 shadow-sm ${
                  isScrolled
                    ? 'border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 bg-white/70 dark:bg-slate-900/70'
                    : 'border-white/20 text-white hover:border-teal-400 hover:text-teal-300 bg-black/40 backdrop-blur-md'
                }`}
                title="Switch Language: English / తెలుగు"
              >
                <Globe className="w-3.5 h-3.5 text-teal-500" />
                <span>{lang === 'en' ? 'తెలుగు' : 'EN'}</span>
              </button>

              {/* Theme Toggle (Dark / Light) */}
              <button
                onClick={toggleTheme}
                data-cursor="hover"
                className={`p-2 rounded-full border transition-all duration-300 shadow-sm ${
                  isScrolled
                    ? 'border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50'
                    : 'border-white/20 bg-black/40 backdrop-blur-md text-white hover:text-teal-300 hover:border-teal-400'
                }`}
                title={isDark ? "Switch to Cream Light Mode" : "Switch to Noir Dark Mode"}
                aria-label="Toggle theme mode"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
                ) : (
                  <Moon className="w-4 h-4 text-teal-600 transition-transform duration-500 rotate-0 hover:-rotate-45" />
                )}
              </button>

              {/* Login / Admin Studio Button at the Top */}
              <Link
                to={isAdmin ? "/admin" : "/admin/login"}
                data-cursor="hover"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-orbitron font-semibold uppercase tracking-wider rounded-full border transition-all shadow-sm ${
                  isScrolled
                    ? 'border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600'
                    : 'border-white/20 bg-black/40 backdrop-blur-md text-white hover:border-teal-400 hover:text-teal-300'
                }`}
                title={isAdmin ? "Open Admin Studio Dashboard" : "Admin & Studio Portal Login"}
              >
                <LogIn className="w-3.5 h-3.5 text-teal-500" />
                <span>{isAdmin ? "Admin Studio" : t('navLogin')}</span>
              </Link>

              {/* Direct Book Slot Action */}
              <Link to="/book" data-cursor="hover">
                <Button
                  size="sm"
                  variant="primary"
                  withShutterSound
                  icon={<Calendar className="w-3.5 h-3.5 text-white" />}
                >
                  {t('navBookSlot')}
                </Button>
              </Link>
            </div>

            {/* Mobile Actions: Language, Theme, Login, Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="px-2 py-1 text-[10px] font-orbitron font-semibold border border-slate-300 dark:border-slate-800 rounded-full text-teal-600 dark:text-teal-400 bg-white/80 dark:bg-slate-900/80 shadow-sm"
                aria-label="Switch Language"
              >
                {lang === 'en' ? 'తెలుగు' : 'EN'}
              </button>

              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 shadow-sm"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-600" />}
              </button>

              <Link
                to={isAdmin ? "/admin" : "/admin/login"}
                className="p-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-teal-600 dark:text-teal-400 bg-white/80 dark:bg-slate-900/80 shadow-sm"
                aria-label="Admin Portal"
              >
                <LogIn className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-slate-800 dark:text-slate-100 hover:text-teal-600'
                    : 'text-white hover:text-teal-300'
                }`}
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
              {navLinks.map((link, idx) => {
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
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-orbitron uppercase tracking-widest text-teal-600 dark:text-teal-400 block py-1 font-semibold"
                >
                  {t('navLogin')} →
                </Link>
                <Link
                  to="/links"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-orbitron uppercase tracking-widest text-slate-600 dark:text-slate-400 block py-1"
                >
                  Link-in-Bio Hub (/links) →
                </Link>
              </motion.div>
            </nav>

            {/* Bottom Actions */}
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
                  {t('navBookSlot')}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
