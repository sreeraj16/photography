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
    <footer className="bg-[#F5F1E8] dark:bg-[#070A0D] border-t border-[#E4DCD0] dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* 1. "FOLLOW THE FRAMES" Marquee & Action Band */}
      <div className="border-b border-[#E4DCD0] dark:border-slate-800/80 bg-[#EFE9DD]/50 dark:bg-black/50 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold block mb-1">
                Official Channels
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-white">
                Follow The Frames: <span className="text-teal-600 dark:text-teal-400 italic font-normal">@_dotpic_</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BRAND.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white text-xs font-orbitron uppercase tracking-wider font-semibold hover:border-pink-500 hover:text-pink-600 transition-all shadow-sm"
                aria-label={BRAND.socials.instagram.label}
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={BRAND.socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-white text-xs font-orbitron uppercase tracking-wider font-semibold hover:border-red-500 hover:text-red-600 transition-all shadow-sm"
                aria-label={BRAND.socials.youtube.label}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={BRAND.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-orbitron uppercase tracking-wider font-semibold shadow-md transition-all"
                aria-label={BRAND.socials.whatsapp.label}
              >
                <Phone className="w-4 h-4 text-white" />
                <span>WhatsApp Us</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
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
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-sans">
              {BRAND.tagline}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-sans">
              Based in Jubilee Hills, Hyderabad. Available worldwide for royal weddings, campus festivals, and commercial campaigns.
            </p>

            {/* Newsletter signup */}
            <div className="pt-2 max-w-sm">
              <span className="text-[10px] uppercase font-orbitron tracking-widest text-teal-600 dark:text-teal-400 font-semibold block mb-2">
                Join The VIP Journal
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-teal-700 dark:text-teal-300 bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/30">
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
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-4 py-2.5 rounded-full text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                  />
                  <Button type="submit" size="sm" variant="primary" icon={<Send className="w-3 h-3" />}>
                    Join
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 dark:text-teal-400 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/links" className="text-teal-600 dark:text-teal-400 hover:underline font-orbitron text-[11px] block py-0.5">
                  Link-in-Bio Hub (/links)
                </Link>
              </li>
              <li>
                <Link to="/client-gallery" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 block py-0.5">
                  Client Gallery Access
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 block py-0.5">
                  Track My Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Signature Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 dark:text-teal-400 font-semibold">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {SERVICE_CATEGORIES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block py-0.5"
                  >
                    {service.name} Photography
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-orbitron tracking-[0.2em] text-teal-600 dark:text-teal-400 font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-sans">
              <p>
                <span className="block text-slate-900 dark:text-slate-200 font-medium">WhatsApp Business</span>
                <a href={BRAND.socials.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline font-orbitron text-[11px]">
                  +91 6281392682
                </a>
              </p>
              <p>
                <span className="block text-slate-900 dark:text-slate-200 font-medium">Email Inquiries</span>
                <a href={`mailto:${BRAND.email}`} className="hover:text-teal-600 dark:hover:text-teal-400">
                  {BRAND.email}
                </a>
              </p>
              <p>
                <span className="block text-slate-900 dark:text-slate-200 font-medium">Studio Location</span>
                <span>{BRAND.fullAddress}</span>
              </p>
              <div className="pt-2">
                <Link to="/admin/login" className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-orbitron">
                  Studio Staff Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#E4DCD0] dark:border-slate-800/60 py-6 pb-24 lg:pb-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} DOTPIC PHOTOGRAPHY. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQ
            </Link>
            <Link to="/admin/login" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-orbitron font-medium">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
