import React, { useState } from 'react';
import { Camera, ShieldCheck, Check, AlertTriangle, Upload, Eye, Trash2 } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { Lightbox } from '../components/common/Lightbox';
import { Button } from '../components/ui/Button';

export function FindMyPhotosPage() {
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchedPhotos, setMatchedPhotos] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Takedown request form state
  const [showTakedown, setShowTakedown] = useState(false);
  const [takedownUrl, setTakedownUrl] = useState('');
  const [takedownReason, setTakedownReason] = useState('');
  const [takedownSuccess, setTakedownSuccess] = useState(false);

  const handleSimulateSelfieSearch = () => {
    if (!consentAccepted) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Return student portraits from Campus Stories
      const photos = dataStore.getPhotos();
      setMatchedPhotos(photos.slice(0, 4));
    }, 1800);
  };

  const handleTakedownSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!takedownUrl) return;
    setTakedownSuccess(true);
    setTimeout(() => {
      setShowTakedown(false);
      setTakedownSuccess(false);
      setTakedownUrl('');
      setTakedownReason('');
    }, 2500);
  };

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>INDIA DPDP ACT COMPLIANT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight max-w-2xl mx-auto mb-4">
          Find My Campus Photos
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-lg mx-auto leading-relaxed">
          Instantly locate your photos from college fests, concerts, and tech symposiums using client-side facial feature detection.
        </p>
      </div>

      {/* DPDP Act Explicit Consent Screen */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-dotpic-charcoal border border-dotpic-gold/40 rounded-sm p-6 sm:p-8 shadow-2xl">
          <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-dotpic-gold" />
            <span>Privacy & Voluntary Consent Notice</span>
          </h3>

          <div className="text-xs text-dotpic-muted space-y-2 mb-6 p-4 rounded bg-dotpic-surface border border-dotpic-border">
            <p>• <strong>Zero Selfie Storage:</strong> Your selfie is processed purely in your browser memory for mathematical feature comparison and is never uploaded or saved to DOTPIC servers.</p>
            <p>• <strong>Strict Festival Scope:</strong> Matches only public stage and audience photography from approved college fests.</p>
            <p>• <strong>India Digital Personal Data Protection (DPDP) Act Compliance:</strong> You maintain full rights to request immediate takedown of any photograph containing your likeness.</p>
          </div>

          <label className="flex items-start gap-3 text-xs text-white cursor-pointer select-none mb-6">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="accent-dotpic-gold w-4 h-4 mt-0.5"
            />
            <span>
              I voluntarily consent to temporary in-browser face feature detection to locate my photos from DOTPIC Campus Stories.
            </span>
          </label>

          <Button
            size="lg"
            variant="gold"
            className="w-full"
            disabled={!consentAccepted || isProcessing}
            isLoading={isProcessing}
            onClick={handleSimulateSelfieSearch}
            icon={<Camera className="w-4 h-4 text-dotpic-black" />}
          >
            {isProcessing ? 'Analyzing Festival Frames...' : 'Take or Upload Quick Selfie'}
          </Button>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowTakedown(!showTakedown)}
              className="text-[11px] text-dotpic-muted hover:text-red-400 underline"
            >
              Want an image taken down? Submit a removal request
            </button>
          </div>
        </div>
      </div>

      {/* Matched Results */}
      {matchedPhotos.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-in fade-in duration-300">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono uppercase text-dotpic-gold tracking-widest block mb-1">
              MATCH RESULTS
            </span>
            <h3 className="text-2xl font-serif text-white">
              We Found {matchedPhotos.length} Frames Matching Your Likeness!
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {matchedPhotos.map((p, idx) => (
              <div
                key={p.id || idx}
                onClick={() => {
                  setSelectedPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative aspect-square rounded-sm overflow-hidden border border-dotpic-border bg-dotpic-surface cursor-pointer hover:border-dotpic-gold transition-all"
              >
                <img src={p.url} alt="Match" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-dotpic-gold bg-black/80 px-2 py-0.5 rounded self-start">
                    98.4% Match
                  </span>
                  <span className="text-xs text-white truncate font-medium">Click to View High-Res</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Takedown Request Modal */}
      {showTakedown && (
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-in fade-in duration-200">
          <div className="bg-dotpic-charcoal border border-red-500/40 p-6 rounded-sm">
            <h4 className="text-base font-serif text-white mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Submit Image Takedown / Removal Request</span>
            </h4>
            <p className="text-xs text-dotpic-muted mb-4">
              In accordance with privacy standards, we promptly remove any photo upon receipt of an authentic request from the person photographed.
            </p>

            {takedownSuccess ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded">
                Takedown request logged. Our studio privacy officer will remove this file within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleTakedownSubmit} className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Photo Link or Event Name *"
                  value={takedownUrl}
                  onChange={(e) => setTakedownUrl(e.target.value)}
                  className="w-full bg-dotpic-surface border border-dotpic-border p-2.5 rounded text-xs text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Reason / Notes..."
                  value={takedownReason}
                  onChange={(e) => setTakedownReason(e.target.value)}
                  className="w-full bg-dotpic-surface border border-dotpic-border p-2.5 rounded text-xs text-white"
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowTakedown(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" size="sm">
                    Submit Takedown
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Lightbox
        photos={matchedPhotos}
        initialIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
