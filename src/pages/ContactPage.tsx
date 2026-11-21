import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Youtube, Send, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../lib/constants';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';

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
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          DIRECT LINE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Connect With DOTPIC
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-xl mx-auto leading-relaxed">
          Drop by our Jubilee Hills studio for coffee and moodboard planning, or reach out directly on WhatsApp.
        </p>
      </div>

      {/* 3 Official Social Cards (Section 12.1 Requirement) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <a
            href={BRAND.socials.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-sm bg-gradient-to-br from-emerald-950/40 via-dotpic-charcoal to-dotpic-charcoal border border-emerald-500/40 hover:border-emerald-500 transition-all duration-300 shadow-xl group block"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block mb-1">
              FASTEST RESPONSE
            </span>
            <h3 className="text-xl font-serif text-white mb-1">WhatsApp Business</h3>
            <p className="text-xs text-dotpic-muted mb-4">Daily coordination, instant availability & bespoke quotes.</p>
            <span className="text-sm font-mono text-emerald-300 font-semibold">{BRAND.phone}</span>
          </a>

          {/* Instagram Card */}
          <a
            href={BRAND.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-sm bg-gradient-to-br from-pink-950/40 via-dotpic-charcoal to-dotpic-charcoal border border-pink-500/40 hover:border-pink-500 transition-all duration-300 shadow-xl group block"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Instagram className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-pink-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-semibold block mb-1">
              DAILY VISUAL FEED
            </span>
            <h3 className="text-xl font-serif text-white mb-1">Instagram Profile</h3>
            <p className="text-xs text-dotpic-muted mb-4">Behind the scenes, fresh reel drops & client stories.</p>
            <span className="text-sm font-mono text-pink-300 font-semibold">{BRAND.socials.instagram.handle}</span>
          </a>

          {/* YouTube Card */}
          <a
            href={BRAND.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-sm bg-gradient-to-br from-red-950/40 via-dotpic-charcoal to-dotpic-charcoal border border-red-500/40 hover:border-red-500 transition-all duration-300 shadow-xl group block"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <Youtube className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-red-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-semibold block mb-1">
              4K CINEMA FILMS
            </span>
            <h3 className="text-xl font-serif text-white mb-1">YouTube Channel</h3>
            <p className="text-xs text-dotpic-muted mb-4">Full wedding films, campus aftermovies & teasers.</p>
            <span className="text-sm font-mono text-red-300 font-semibold">{BRAND.socials.youtube.handle}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Form (6 cols) & Studio Map Details (6 cols) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Message Form */}
          <div className="lg:col-span-6 bg-dotpic-charcoal border border-dotpic-border rounded-sm p-8 sm:p-10 shadow-2xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-2">
              GENERAL INQUIRY
            </span>
            <h2 className="text-2xl font-serif text-white mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-dotpic-muted mb-6">Looking for commercial collaborations, workshop inquiries, or custom assignments?</p>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-serif text-white">Dispatched to WhatsApp!</h4>
                <p className="text-xs text-dotpic-muted">Our studio desk is reviewing your message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Your Name *</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-dotpic-muted block mb-1">WhatsApp Phone *</label>
                    <Input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dotpic-muted block mb-1">Email Address</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Message *</label>
                  <Textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you have in mind..."
                  />
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full" withShutterSound icon={<Send className="w-4 h-4 text-dotpic-black" />}>
                  Dispatch to Studio WhatsApp
                </Button>
              </form>
            )}
          </div>

          {/* Studio Map Embed & Address */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-8 shadow-xl">
              <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-2">
                STUDIO HEADQUARTERS
              </span>
              <h3 className="text-2xl font-serif text-white mb-4">Hyderabad Studio</h3>

              <div className="space-y-3 text-xs text-dotpic-muted">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-dotpic-gold flex-shrink-0 mt-0.5" />
                  <span>{BRAND.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-dotpic-gold flex-shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 8:00 PM | Sun: By Appointment</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-dotpic-gold flex-shrink-0" />
                  <span>{BRAND.email}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-dotpic-border">
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-dotpic-gold hover:underline font-semibold"
                >
                  <span>Open in Google Maps / Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Responsive Map */}
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-dotpic-border">
              <iframe
                title="DOTPIC Hyderabad Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4950796366113!2d78.40114637516606!3d17.436029383458694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9137d57a26f7%3A0xc3cf9c9f4d36e2f1!2sRoad%20No.%2036%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125 invert-[0.9] opacity-80"
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
