import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Phone, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { BRAND, NAV_LINKS, SERVICE_CATEGORIES } from '../../lib/constants';
import { Button } from '../ui/Button';
import { DotpicLogo } from './DotpicLogo';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      const existing = JSON.parse(localStorage.getItem('dotpic_subscribers') || '[]');
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem('dotpic_subscribers', JSON.stringify(existing));
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-dotpic-charcoal border-t border-dotpic-border relative overflow-hidden">
      {/* 1. "FOLLOW THE FRAMES" Marquee & Magnetic Action Band */}
      <div className="border-b border-dotpic-border/80 bg-dotpic-black/60 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-dotpic-gold font-semibold block mb-1">
                Official Channels
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-dotpic-white">
                Follow The Frames: <span className="text-dotpic-gold italic font-light">@_dotpic_</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/30 border border-pink-500/30 text-white text-xs uppercase tracking-widest font-semibold hover:border-pink-500/80 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300"
                aria-label={BRAND.socials.instagram.label}
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram @_dotpic_</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={BRAND.socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-red-950/40 border border-red-500/30 text-white text-xs uppercase tracking-widest font-semibold hover:border-red-500/80 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
                aria-label={BRAND.socials.youtube.label}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube @dotpicphotography</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={BRAND.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-sm bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs uppercase tracking-widest font-semibold hover:border-emerald-500/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300"
                aria-label={BRAND.socials.whatsapp.label}
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <DotpicLogo size="lg" />
            </Link>
            <p className="text-dotpic-muted text-sm leading-relaxed max-w-sm">
              {BRAND.tagline}
            </p>
            <p className="text-xs text-dotpic-muted/80 leading-relaxed max-w-sm">
              Based in Jubilee Hills, Hyderabad. Available worldwide for royal weddings, campus festivals, and commercial campaigns.
            </p>

            {/* Newsletter signup */}
            <div className="pt-2 max-w-sm">
              <span className="text-[11px] uppercase tracking-widest text-dotpic-gold font-semibold block mb-2">
                Join The VIP Journal
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-sm border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Thank you for subscribing! We share shoot stories & tips.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-dotpic-surface border border-dotpic-border px-3.5 py-2.5 rounded-sm text-xs text-dotpic-white placeholder:text-dotpic-muted/50 focus:outline-none focus:border-dotpic-gold"
                  />
                  <Button type="submit" size="sm" variant="gold" icon={<Send className="w-3 h-3" />}>
                    Join
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-dotpic-gold font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dotpic-muted hover:text-dotpic-white transition-colors duration-200 block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/links" className="text-amber-400 hover:text-amber-300 font-medium block py-0.5">
                  Link-in-Bio Hub (/links)
                </Link>
              </li>
              <li>
                <Link to="/client-gallery" className="text-dotpic-gold hover:underline block py-0.5">
                  Client Gallery Access
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-dotpic-muted hover:text-dotpic-white block py-0.5">
                  Track My Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Signature Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-dotpic-gold font-semibold">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICE_CATEGORIES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-dotpic-muted hover:text-dotpic-white transition-colors duration-200 block py-0.5"
                  >
                    {service.name} Photography
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-dotpic-gold font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-dotpic-muted">
              <p>
                <span className="block text-dotpic-white font-medium">WhatsApp Business</span>
                <a href={BRAND.socials.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-dotpic-gold hover:underline">
                  +91 6281392682
                </a>
              </p>
              <p>
                <span className="block text-dotpic-white font-medium">Email Inquiries</span>
                <a href={`mailto:${BRAND.email}`} className="hover:text-dotpic-white">
                  {BRAND.email}
                </a>
              </p>
              <p>
                <span className="block text-dotpic-white font-medium">Studio Location</span>
                <span>{BRAND.fullAddress}</span>
              </p>
              <div className="pt-2">
                <Link to="/admin/login" className="text-[11px] text-dotpic-muted/60 hover:text-dotpic-gold transition-colors">
                  Studio Staff Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-dotpic-border/60 py-6 pb-24 lg:pb-6 text-xs text-dotpic-muted/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} DOTPIC PHOTOGRAPHY. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-dotpic-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-dotpic-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="hover:text-dotpic-white transition-colors">
              FAQ
            </Link>
            <Link to="/admin/login" className="hover:text-dotpic-gold transition-colors font-medium">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
