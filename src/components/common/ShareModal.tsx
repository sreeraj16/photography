import { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

interface ShareModalProps {
  title: string;
  url?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ title, url, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  if (!isOpen) return null;

  const handleCopy = async () => {
    await copyToClipboard(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Take a look at "${title}" on DOTPIC PHOTOGRAPHY:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Explore "${title}" by DOTPIC PHOTOGRAPHY`,
          url: shareUrl,
        });
      } catch {
        // user closed native share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-md w-full max-h-[92vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-semibold block mb-1">
          Share Gallery
        </span>
        <h3 className="text-xl font-serif text-dotpic-white mb-4 pr-6 truncate">
          {title}
        </h3>

        <div className="space-y-3">
          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-between p-3.5 rounded-sm bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-xs uppercase tracking-wider font-semibold">Share via WhatsApp</span>
            </div>
            <span className="text-xs text-emerald-400">→</span>
          </button>

          {/* Copy Link */}
          <div className="flex items-center gap-2 p-2 rounded-sm bg-dotpic-surface border border-dotpic-border">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-dotpic-muted flex-1 px-2 focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded bg-dotpic-gold text-dotpic-black text-xs font-semibold hover:bg-dotpic-goldLight flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Native Web Share API */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border border-dotpic-border text-xs uppercase tracking-wider text-dotpic-muted hover:text-white hover:border-dotpic-gold transition-colors"
            >
              <Share className="w-4 h-4" />
              <span>More Share Options</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
