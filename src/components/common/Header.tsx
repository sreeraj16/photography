import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Youtube, Menu, X, Volume2, VolumeX, Calendar, Phone } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { useI18n } from '../../lib/i18n';
import { useAudio } from '../../hooks/useAudio';
import { Button } from '../ui/Button';

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useI18n();
  const { soundEnabled, toggleSound, playShutterSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-dotpic-black/95 backdrop-blur-md border-b border-dotpic-border/80 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-dotpic-black/90 via-dotpic-black/40 to-transparent py-5'
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
            >
              <img
                src="/logo.svg"
                alt="DOTPIC PHOTOGRAPHY"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
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
            <div className="hidden lg:flex items-center gap-4">
              {/* Official Social Icons */}
              <div className="flex items-center gap-2 pr-2 border-r border-dotpic-border/60">
                <a
                  href={BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.socials.instagram.label}
                  className="p-2 text-dotpic-muted hover:text-dotpic-gold transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={BRAND.socials.youtube.label}
                  className="p-2 text-dotpic-muted hover:text-dotpic-gold transition-colors duration-200"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              {/* Sound Toggle (Camera shutter) */}
              <button
                onClick={toggleSound}
                className="p-2 text-dotpic-muted hover:text-dotpic-gold transition-colors duration-200 focus:outline-none"
                title={soundEnabled ? "Mute shutter sound" : "Enable camera shutter sound"}
                aria-label="Toggle camera shutter sound effects"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-dotpic-gold" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Language Selector */}
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="px-2.5 py-1 text-[11px] font-semibold border border-dotpic-border rounded-sm text-dotpic-muted hover:text-dotpic-white hover:border-dotpic-gold transition-colors"
                title="Switch Language: English / Telugu"
              >
                {lang === 'en' ? 'తెలుగు' : 'EN'}
              </button>

              {/* Book Slot CTA */}
              <Link to="/book">
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

            {/* Mobile Actions: WhatsApp Icon + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
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

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-dotpic-black/98 flex flex-col justify-between p-6 pt-24 backdrop-blur-xl lg:hidden animate-in fade-in duration-300">
          <div className="flex justify-between items-center absolute top-5 left-6 right-6">
            <img src="/logo.svg" alt="DOTPIC" className="h-9 w-auto" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-dotpic-white hover:text-dotpic-gold"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-4">
            {NAV_LINKS.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-2xl font-serif tracking-wider transition-colors ${
                    isActive ? 'text-dotpic-gold' : 'text-dotpic-white hover:text-dotpic-gold'
                  }`}
                >
                  <span className="text-xs font-sans text-dotpic-gold mr-3 opacity-60">0{idx + 1}</span>
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/links"
              className="text-lg font-sans text-dotpic-muted hover:text-dotpic-gold pt-2 border-t border-dotpic-border"
            >
              Link-in-Bio Hub (/links)
            </Link>
          </nav>

          <div className="flex flex-col gap-4 border-t border-dotpic-border pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-dotpic-muted uppercase tracking-widest">Connect With Us</span>
              <div className="flex items-center gap-4">
                <a
                  href={BRAND.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dotpic-muted hover:text-dotpic-gold"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={BRAND.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dotpic-muted hover:text-dotpic-gold"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <Link to="/book" className="w-full">
              <Button variant="gold" size="lg" className="w-full" withShutterSound>
                Book Your Shoot Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
