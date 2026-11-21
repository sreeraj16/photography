import { useState } from 'react';
import { Calendar, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BookingForm } from '../features/booking/BookingForm';
import { EstimateCalculator } from '../features/booking/EstimateCalculator';
import { BRAND } from '../lib/constants';

export function BookPage() {
  const [showEstimator, setShowEstimator] = useState(false);

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-[10px] font-orbitron tracking-widest uppercase mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>OFFICIAL RESERVATION DESK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white font-light tracking-tight max-w-2xl mx-auto mb-4">
          Book Your Photography Slot
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Fill out your session requirements. We will immediately generate your unique Reference ID and prepare a direct WhatsApp booking enquiry to our creative directors.
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowEstimator(!showEstimator)}
            className="text-xs text-teal-600 dark:text-teal-400 underline hover:text-teal-500 font-orbitron"
          >
            {showEstimator ? 'Hide Calculator' : 'Need a price estimate first? Open Price Calculator'}
          </button>
        </div>
      </div>

      {showEstimator && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-in fade-in duration-300">
          <EstimateCalculator />
        </div>
      )}

      {/* Main Booking Form Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 sm:p-12 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-dotpic-border gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block">
                STEP 1 OF 2 • INSTANT DISPATCH
              </span>
              <h2 className="text-xl font-serif text-white">Event & Client Details</h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-sm border border-emerald-500/30">
              <Clock className="w-4 h-4" />
              <span>Studio Response within 2 hours</span>
            </div>
          </div>

          <BookingForm />
        </div>

        {/* Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center text-xs text-dotpic-muted">
          <div className="p-4 rounded bg-dotpic-charcoal/50 border border-dotpic-border">
            <ShieldCheck className="w-5 h-5 text-dotpic-gold mx-auto mb-2" />
            <span className="text-white font-medium block mb-1">Zero Spam Guarantee</span>
            Your phone number is used strictly for booking coordination and quotation.
          </div>
          <div className="p-4 rounded bg-dotpic-charcoal/50 border border-dotpic-border">
            <MessageCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <span className="text-white font-medium block mb-1">Direct WhatsApp Link</span>
            Generates copy-ready formatted message with reference ID DP-2026-XXXX.
          </div>
          <div className="p-4 rounded bg-dotpic-charcoal/50 border border-dotpic-border">
            <CheckCircle2 className="w-5 h-5 text-dotpic-gold mx-auto mb-2" />
            <span className="text-white font-medium block mb-1">Transparent Pricing</span>
            Custom estimates tailored to your shoot duration without surprise charges.
          </div>
        </div>
      </div>
    </div>
  );
}
