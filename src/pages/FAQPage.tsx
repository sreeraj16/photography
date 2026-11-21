import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowUpRight } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { BRAND } from '../lib/constants';

export function FAQPage() {
  const faqs = dataStore.getFAQs().filter(f => f.is_published);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* FAQ Schema Markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        })}
      </script>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          CLARITY & ASSISTANCE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-2xl mx-auto mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-lg mx-auto leading-relaxed">
          Everything you need to know about booking, delivery timelines, outstation travel, and campus QR posters.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.id}
              className={`rounded-sm border transition-colors ${
                isOpen ? 'bg-dotpic-charcoal border-dotpic-gold/50' : 'bg-dotpic-charcoal/60 border-dotpic-border'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-dotpic-gold font-semibold">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif text-white font-medium">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-dotpic-gold transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-dotpic-border/60 text-xs sm:text-sm text-dotpic-muted leading-relaxed font-light">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="max-w-xl mx-auto px-4 text-center p-8 rounded-sm bg-dotpic-surface border border-dotpic-border">
        <HelpCircle className="w-8 h-8 text-dotpic-gold mx-auto mb-2" />
        <h4 className="text-xl font-serif text-white mb-2">Have a question not listed here?</h4>
        <p className="text-xs text-dotpic-muted mb-6">
          Reach out directly to our team on WhatsApp for an immediate answer.
        </p>
        <a
          href={BRAND.socials.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Ask On WhatsApp (+91 6281392682)</span>
        </a>
      </div>
    </div>
  );
}
