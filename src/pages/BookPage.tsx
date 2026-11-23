import { useState } from 'react';
import { MessageCircle, Instagram, Phone, Calendar, MapPin, Sparkles, Clock, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { BRAND } from '../lib/constants';
import { useI18n } from '../lib/i18n';
import { Button } from '../components/ui/Button';

export function BookPage() {
  const { t, lang } = useI18n();

  // Quick message builder state
  const [shootType, setShootType] = useState('Wedding');
  const [clientName, setClientName] = useState('');
  const [shootDate, setShootDate] = useState('');
  const [location, setLocation] = useState('Hyderabad');
  const [notes, setNotes] = useState('');

  const shootTypes = [
    'Wedding',
    'Pre-Wedding',
    'Campus Festival',
    'Portrait / Fashion',
    'Birthday / Baby',
    'Commercial / Brand'
  ];

  const handleLaunchWhatsApp = () => {
    let messageText = `Hello DOTPIC PHOTOGRAPHY! 👋\n\nI would like to enquire about booking a slot:`;
    if (clientName) messageText += `\n• Name: ${clientName}`;
    messageText += `\n• Shoot Type: ${shootType}`;
    if (shootDate) messageText += `\n• Preferred Date: ${shootDate}`;
    if (location) messageText += `\n• Location: ${location}`;
    if (notes) messageText += `\n• Notes: ${notes}`;
    messageText += `\n\nPlease let me know your availability and packages!`;

    const url = `https://wa.me/916281392682?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  const handleLaunchInstagram = () => {
    window.open(BRAND.socials.instagram.url, '_blank');
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-orbitron tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL RESERVATION DESK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white font-light tracking-tight mb-4">
            {t('bookingTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {t('bookingSubtitle')}
          </p>
        </div>

        {/* 2 Primary Action Cards (WhatsApp & Instagram) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Direct WhatsApp */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/40 hover:border-emerald-500 shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7" />
              </div>

              <span className="text-[10px] uppercase font-orbitron tracking-widest text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                FASTEST RESPONSE • INSTANT AVAILABILITY
              </span>
              <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">
                Book via WhatsApp
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Chat directly with our lead creative directors. Share dates, references, or ask for custom packages on our official WhatsApp business line.
              </p>
            </div>

            <button
              onClick={handleLaunchWhatsApp}
              className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-orbitron text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('chatWhatsAppBtn')}</span>
            </button>
          </div>

          {/* Card 2: Direct Instagram */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-pink-500/30 hover:border-pink-500 shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <Instagram className="w-7 h-7" />
              </div>

              <span className="text-[10px] uppercase font-orbitron tracking-widest text-pink-600 dark:text-pink-400 font-bold block mb-1">
                OFFICIAL INSTAGRAM HANDLE • @_dotpic_
              </span>
              <h2 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">
                DM on Instagram
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Browse our reels, story highlights, and recent wedding stories, then send a direct message to lock in your shoot date.
              </p>
            </div>

            <button
              onClick={handleLaunchInstagram}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 text-white font-orbitron text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>{t('messageInstaBtn')}</span>
            </button>
          </div>
        </div>

        {/* Quick Shoot Details Composer (Prefills WhatsApp) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 shadow-md">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase font-orbitron tracking-widest text-teal-600 dark:text-teal-400 font-bold block mb-1">
                OPTIONAL CUSTOM MESSAGE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-white">
                Customize Your Enquiry Before Launching
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                Select your details below and click send to launch a pre-composed WhatsApp enquiry.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-orbitron uppercase text-slate-700 dark:text-slate-300 font-medium block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sreeraj"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron uppercase text-slate-700 dark:text-slate-300 font-medium block mb-1.5">
                  Select Shoot Discipline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {shootTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setShootType(type)}
                      className={`px-3 py-2 rounded-xl text-xs font-orbitron transition-all text-center ${
                        shootType === type
                          ? 'bg-teal-600 text-white font-semibold shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 border border-transparent'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-orbitron uppercase text-slate-700 dark:text-slate-300 font-medium block mb-1.5">
                    Estimated Date
                  </label>
                  <input
                    type="date"
                    value={shootDate}
                    onChange={(e) => setShootDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-orbitron uppercase text-slate-700 dark:text-slate-300 font-medium block mb-1.5">
                    City / Venue Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad / Vijayawada"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-orbitron uppercase text-slate-700 dark:text-slate-300 font-medium block mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about the vibe, hours, or any specific requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg"
                  onClick={handleLaunchWhatsApp}
                  icon={<Send className="w-4 h-4 text-white" />}
                >
                  Send Enquiry via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Credibility Strip */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 font-orbitron flex flex-wrap justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Direct Studio Response Within 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Jubilee Hills, Hyderabad Studio
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Official Line: +91 6281392682
          </span>
        </div>
      </div>
    </div>
  );
}
