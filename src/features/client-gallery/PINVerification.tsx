import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface PINVerificationProps {
  galleryTitle?: string;
  clientName?: string;
  onVerify: (pin: string) => boolean;
}

export function PINVerification({ galleryTitle, clientName, onVerify }: PINVerificationProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    const isValid = onVerify(pin.trim());
    if (!isValid) {
      setError(true);
      setAttempts(prev => prev + 1);
    } else {
      setError(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="bg-dotpic-charcoal border border-dotpic-border max-w-md w-full p-8 rounded-sm text-center shadow-2xl relative">
        <div className="w-16 h-16 rounded-full bg-dotpic-gold/10 border border-dotpic-gold/30 text-dotpic-gold flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>

        <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-1">
          SECURE CLIENT PORTAL
        </span>
        <h2 className="text-2xl font-serif text-white mb-2">
          {galleryTitle || "Private Client Vault"}
        </h2>
        {clientName && (
          <p className="text-xs text-dotpic-muted mb-6">
            Prepared exclusively for <span className="text-white font-medium">{clientName}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-dotpic-muted block mb-2">
              Enter 4-Digit Access PIN
            </label>
            <div className="relative max-w-[200px] mx-auto">
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 bg-dotpic-surface border border-dotpic-border rounded-sm text-dotpic-white focus:outline-none focus:border-dotpic-gold focus:ring-1 focus:ring-dotpic-gold"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-center gap-1.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Invalid PIN. (Demo gallery PIN is 1234)</span>
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            size="md"
            className="w-full max-w-[200px] mx-auto"
            icon={<KeyRound className="w-4 h-4 text-dotpic-black" />}
          >
            Unlock Gallery
          </Button>
        </form>

        <p className="text-[11px] text-dotpic-muted/60 mt-6 leading-relaxed">
          Need assistance or misplaced your PIN? Contact the DOTPIC Studio manager directly on WhatsApp (+91 6281392682).
        </p>
      </div>
    </div>
  );
}
