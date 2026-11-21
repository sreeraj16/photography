import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function CollegePartnerPage() {
  const colleges = [
    { name: "IIT Hyderabad", fest: "Elan & Envision", city: "Kandi, Sangareddy", events: 4, attendees: "18,000+" },
    { name: "BITS Pilani Hyderabad", fest: "Pearl & ATMOS", city: "Jawahar Nagar", events: 3, attendees: "12,000+" },
    { name: "CBIT Hyderabad", fest: "Shruthi", city: "Gandipet", events: 5, attendees: "15,000+" },
    { name: "VNR VJIET", fest: "Sintillashunz", city: "Bachupally", events: 4, attendees: "14,000+" },
    { name: "Osmania University", fest: "Centenary Celebrations", city: "Amberpet", events: 6, attendees: "25,000+" },
    { name: "Mahindra University", fest: "Aether Fest", city: "Bahadurpally", events: 2, attendees: "6,000+" },
    { name: "NIT Warangal", fest: "SpringSpree", city: "Warangal", events: 3, attendees: "10,000+" },
    { name: "JNTU Hyderabad", fest: "Pramana Summit", city: "Kukatpally", events: 4, attendees: "12,000+" },
  ];

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/campus-stories"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-dotpic-muted hover:text-dotpic-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campus Stories</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          INSTITUTIONAL PARTNERSHIPS
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Trusted by 48+ Universities & Institutes
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-xl mx-auto leading-relaxed">
          From premier engineering institutes and university medical fests to youth leadership conventions.
        </p>
      </div>

      {/* College Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colleges.map((col, idx) => (
            <div
              key={idx}
              className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 flex flex-col justify-between hover:border-dotpic-gold/50 transition-colors shadow-xl"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-dotpic-surface border border-dotpic-gold/30 text-dotpic-gold flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif text-white mb-1">{col.name}</h3>
                <p className="text-xs text-dotpic-gold font-mono mb-3">Fest: {col.fest}</p>
                <div className="text-[11px] text-dotpic-muted space-y-1">
                  <p>Location: {col.city}</p>
                  <p>Campus Attendance: <strong className="text-white">{col.attendees}</strong></p>
                </div>
              </div>

              <div className="pt-4 border-t border-dotpic-border/60 mt-6">
                <Link
                  to={`/book?category=Campus+Stories&college=${encodeURIComponent(col.name)}`}
                  className="text-xs uppercase tracking-wider text-dotpic-gold hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Book for {col.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why College Councils Partner With DOTPIC */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-dotpic-charcoal border border-dotpic-gold/30 rounded-sm p-8 sm:p-12 mb-20 shadow-2xl">
        <h3 className="text-2xl font-serif text-white mb-6 text-center">
          What DOTPIC Delivers for College Fest Committees
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-dotpic-muted">
          <div className="space-y-2">
            <CheckCircle2 className="w-5 h-5 text-dotpic-gold" />
            <h4 className="text-sm font-serif text-white">Instant QR Code Banners</h4>
            <p>Custom printed QR code standees deployed across the campus so students can download stage and audience photos with zero waiting.</p>
          </div>
          <div className="space-y-2">
            <CheckCircle2 className="w-5 h-5 text-dotpic-gold" />
            <h4 className="text-sm font-serif text-white">Same-Night Reel Highlights</h4>
            <p>Our mobile editing van delivers trending 9:16 vertical shorts within 3 hours for your student PR handle to go viral on Instagram.</p>
          </div>
          <div className="space-y-2">
            <CheckCircle2 className="w-5 h-5 text-dotpic-gold" />
            <h4 className="text-sm font-serif text-white">Full Commercial & PR Rights</h4>
            <p>High-resolution raw files delivered with permanent rights for college annual reports, prospectuses, magazines, and press releases.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/book?category=Campus+Stories">
            <Button variant="gold" size="lg" withShutterSound>
              Partner With DOTPIC for Your Fest
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
