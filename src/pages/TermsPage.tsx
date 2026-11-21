import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-xs text-teal-600 dark:text-teal-400 font-orbitron mb-8">
          Standard Engagement Terms • DOTPIC PHOTOGRAPHY (Hyderabad, India)
        </p>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-6 leading-relaxed">
          <h3 className="text-lg font-serif text-white">1. Bookings & Confirmation</h3>
          <p>
            Submission of an enquiry on this website does NOT constitute a confirmed booking. Bookings are legally binding only once our studio issues an official quotation, the dates are locked on our availability roster, and the agreed advance deposit is received.
          </p>

          <h3 className="text-lg font-serif text-white">2. Copyright & Intellectual Property</h3>
          <p>
            DOTPIC PHOTOGRAPHY retains the moral copyright in all original raw artistic works. Clients receive non-exclusive, perpetual personal usage rights to print, share, and post delivered master retouched photographs. Commercial usage rights for corporate campaigns are provided under explicit licensing terms.
          </p>

          <h3 className="text-lg font-serif text-white">3. Deliverables & Timelines</h3>
          <p>
            Sneak peek highlights are typically issued within 48 to 72 hours for social media sharing. Complete retouched high-resolution galleries and cinematic films are delivered within 2 to 3 weeks via the private client vault.
          </p>

          <h3 className="text-lg font-serif text-white">4. Force Majeure & Weather</h3>
          <p>
            In the event of severe adverse weather, festival cancellations, or unforeseen circumstances, the team will cooperate in good faith to reschedule coverage dates.
          </p>
        </div>
      </div>
    </div>
  );
}
