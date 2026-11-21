import { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, Instagram, Youtube } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';
import { BRAND } from '../../lib/constants';
import { Button } from '../../components/ui/Button';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  refId: string;
  whatsappUrl: string;
  rawMessage: string;
  customerName: string;
}

export function BookingSuccessModal({
  isOpen,
  onClose,
  refId,
  whatsappUrl,
  rawMessage,
  customerName
}: BookingSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await copyToClipboard(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
    >
      <div className="bg-dotpic-charcoal border border-dotpic-gold/50 rounded-sm max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-1">
            ENQUIRY RECORDED IN SYSTEM
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
            Ready to Connect, {customerName}!
          </h3>

          <div className="inline-block mt-3 px-3 py-1 rounded bg-black/60 border border-dotpic-gold/30 text-dotpic-gold font-mono text-xs font-semibold tracking-wider">
            Booking Reference: {refId}
          </div>
        </div>

        {/* Status Disclaimer Notice */}
        <div className="p-4 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed mb-6">
          <p className="font-semibold mb-1">⚠️ Important Confirmation Notice:</p>
          Your enquiry is saved in our studio system with Reference ID <span className="font-mono text-white">{refId}</span>. Your booking is <span className="underline">not confirmed</span> until the DOTPIC creative team reviews dates, discusses requirements, and issues an official confirmation note.
        </div>

        {/* Primary Action: Open WhatsApp */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs uppercase tracking-wider hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/30"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Open WhatsApp to Send Enquiry</span>
          </a>

          {/* Fallback: Copy Message Text */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-dotpic-surface border border-dotpic-border text-dotpic-white hover:border-dotpic-gold text-xs uppercase tracking-wider font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-dotpic-gold" />}
            <span>{copied ? 'Message Copied to Clipboard!' : 'WhatsApp Not Opening? Copy Text'}</span>
          </button>
        </div>

        {/* Soft Follow Us While You Wait (Section 12.1) */}
        <div className="mt-8 pt-6 border-t border-dotpic-border text-center">
          <p className="text-xs text-dotpic-muted mb-3 font-light">
            Follow us while you wait for our reply:
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={BRAND.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-pink-950/30 border border-pink-500/30 text-pink-300 text-xs hover:border-pink-500 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@_dotpic_</span>
            </a>
            <a
              href={BRAND.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/30 border border-red-500/30 text-red-300 text-xs hover:border-red-500 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>@dotpicphotography</span>
            </a>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
