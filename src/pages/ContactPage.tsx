import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Youtube, Send, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../lib/constants';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { TiltCard } from '../components/ui/TiltCard';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Send directly via WhatsApp
    const text = `Hello DOTPIC!

New General Message from ${name}
Phone: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}

Message:
${message}`;

    window.open(`https://wa.me/916281392682?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold block mb-2">
          DIRECT LINE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Connect With DOTPIC
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Drop by our Jubilee Hills studio for coffee and moodboard planning, or reach out directly on WhatsApp.
        </p>
      </div>

      {/* 3 Official Social Cards (Section 12.1 Requirement) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <TiltCard maxTilt={6} scale={1.03} className="rounded-3xl overflow-hidden shadow-md dark:shadow-2xl">
            <a
              href={BRAND.socials.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 shadow-md group block h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="text-[10px] uppercase font-orbitron tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
                FASTEST RESPONSE
              </span>
              <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-1">WhatsApp Business</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 font-sans leading-relaxed">Daily coordination, instant availability & bespoke quotes.</p>
              <span className="text-sm font-orbitron text-emerald-600 dark:text-emerald-400 font-bold">{BRAND.phone}</span>
            </a>
          </TiltCard>

          {/* Instagram Card */}
          <TiltCard maxTilt={6} scale={1.03} className="rounded-3xl overflow-hidden shadow-md dark:shadow-2xl">
            <a
              href={BRAND.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-pink-500/30 hover:border-pink-500 transition-all duration-300 shadow-md group block h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                  <Instagram className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-pink-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="text-[10px] uppercase font-orbitron tracking-widest text-pink-600 dark:text-pink-400 font-semibold block mb-1">
                DAILY VISUAL FEED
              </span>
              <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-1">Instagram Profile</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 font-sans leading-relaxed">Behind the scenes, fresh reel drops & client stories.</p>
              <span className="text-sm font-orbitron text-pink-600 dark:text-pink-400 font-bold">{BRAND.socials.instagram.handle}</span>
            </a>
          </TiltCard>

          {/* YouTube Card */}
          <TiltCard maxTilt={6} scale={1.03} className="rounded-3xl overflow-hidden shadow-md dark:shadow-2xl">
            <a
              href={BRAND.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 shadow-md group block h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <Youtube className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="text-[10px] uppercase font-orbitron tracking-widest text-red-600 dark:text-red-400 font-semibold block mb-1">
                4K CINEMA FILMS
              </span>
              <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-1">YouTube Channel</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 font-sans leading-relaxed">Full wedding films, campus aftermovies & teasers.</p>
              <span className="text-sm font-orbitron text-red-600 dark:text-red-400 font-bold">{BRAND.socials.youtube.handle}</span>
            </a>
          </TiltCard>
        </div>
      </div>

      {/* Main Grid: Form (6 cols) & Studio Map Details (6 cols) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Message Form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-md dark:shadow-2xl">
            <span className="text-[10px] uppercase font-orbitron tracking-widest text-teal-600 dark:text-teal-400 font-semibold block mb-2">
              GENERAL INQUIRY
            </span>
            <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 font-sans">Looking for commercial collaborations, workshop inquiries, or custom assignments?</p>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-xl font-serif text-slate-900 dark:text-white">Dispatched to WhatsApp!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">Our studio desk is reviewing your message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Your Name *</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 dark:text-slate-300 block mb-1">WhatsApp Phone *</label>
                    <Input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 block mb-1">Message *</label>
                  <Textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you have in mind..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" withShutterSound icon={<Send className="w-4 h-4 text-white" />}>
                  Dispatch to Studio WhatsApp
                </Button>
              </form>
            )}
          </div>

          {/* Studio Map Embed & Address */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 rounded-3xl p-8 shadow-md dark:shadow-2xl">
              <span className="text-[10px] uppercase font-orbitron tracking-widest text-teal-600 dark:text-teal-400 font-semibold block mb-2">
                STUDIO HEADQUARTERS
              </span>
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Hyderabad Studio</h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-sans">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>{BRAND.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 8:00 PM | Sun: By Appointment</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>{BRAND.email}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E2D6] dark:border-slate-800">
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase font-orbitron tracking-wider text-teal-600 dark:text-teal-400 hover:underline font-semibold"
                >
                  <span>Open in Google Maps / Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Responsive Map */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-[#E2DCD0] dark:border-slate-800 shadow-md">
              <iframe
                title="DOTPIC Hyderabad Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4950796366113!2d78.40114637516606!3d17.436029383458694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9137d57a26f7%3A0xc3cf9c9f4d36e2f1!2sRoad%20No.%2036%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 filter grayscale-[0.3] contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
