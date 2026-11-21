import { useState } from 'react';
import { Calculator, Sparkles, ArrowRight } from 'lucide-react';
import { formatINR } from '../../lib/utils';

interface EstimateCalculatorProps {
  onSelectEstimate?: (amount: number, details: string) => void;
}

export function EstimateCalculator({ onSelectEstimate }: EstimateCalculatorProps) {
  const [eventType, setEventType] = useState<'wedding' | 'prewedding' | 'campus' | 'portrait'>('wedding');
  const [days, setDays] = useState(1);
  const [includeDrone, setIncludeDrone] = useState(true);
  const [includeAlbum, setIncludeAlbum] = useState(true);
  const [includeReelEditor, setIncludeReelEditor] = useState(false);

  // Calculation logic
  const basePrices = {
    wedding: 45000,
    prewedding: 25000,
    campus: 35000,
    portrait: 12000
  };

  const dayMultiplier = days > 1 ? 1 + (days - 1) * 0.85 : 1;
  const droneCost = includeDrone ? 15000 * days : 0;
  const albumCost = includeAlbum ? 12000 : 0;
  const reelCost = includeReelEditor ? 10000 * days : 0;

  const totalEstimate = Math.round((basePrices[eventType] * dayMultiplier) + droneCost + albumCost + reelCost);

  return (
    <div className="bg-dotpic-charcoal border border-dotpic-gold/30 rounded-sm p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-dotpic-gold" />
        <span className="text-xs uppercase font-mono tracking-widest text-dotpic-gold font-semibold">
          INSTANT QUOTE ESTIMATOR
        </span>
      </div>

      <h3 className="text-xl font-serif text-white mb-2">
        Estimate Your Investment
      </h3>
      <p className="text-xs text-dotpic-muted mb-6">
        Configure your event specifics to view an approximate estimate in INR.
      </p>

      <div className="space-y-5">
        {/* Event Type */}
        <div>
          <label className="text-[11px] uppercase tracking-wider text-dotpic-white font-medium block mb-2">
            Coverage Genre
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'wedding', label: 'Wedding' },
              { id: 'prewedding', label: 'Pre-Wedding' },
              { id: 'campus', label: 'Campus Fest' },
              { id: 'portrait', label: 'Portrait' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEventType(item.id as any)}
                className={`py-2 px-3 text-xs uppercase tracking-wider rounded-sm transition-colors text-center ${
                  eventType === item.id
                    ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                    : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Days */}
        {eventType !== 'portrait' && (
          <div>
            <label className="text-[11px] uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Duration (Days): <span className="text-dotpic-gold font-mono">{days} Day{days > 1 ? 's' : ''}</span>
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-dotpic-gold cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-dotpic-muted font-mono mt-1">
              <span>1 Day</span>
              <span>2 Days</span>
              <span>3 Days</span>
              <span>4 Days</span>
            </div>
          </div>
        )}

        {/* Add-on Toggles */}
        <div className="pt-3 border-t border-dotpic-border space-y-3">
          <label className="text-[11px] uppercase tracking-wider text-dotpic-white font-medium block">
            Specialized Add-ons
          </label>

          <label className="flex items-center justify-between p-2.5 rounded bg-dotpic-surface border border-dotpic-border cursor-pointer hover:border-dotpic-gold/30">
            <span className="text-xs text-dotpic-white">4K Cinema Drone Coverage</span>
            <input
              type="checkbox"
              checked={includeDrone}
              onChange={(e) => setIncludeDrone(e.target.checked)}
              className="accent-dotpic-gold w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded bg-dotpic-surface border border-dotpic-border cursor-pointer hover:border-dotpic-gold/30">
            <span className="text-xs text-dotpic-white">Deluxe Leather Photobook Album</span>
            <input
              type="checkbox"
              checked={includeAlbum}
              onChange={(e) => setIncludeAlbum(e.target.checked)}
              className="accent-dotpic-gold w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded bg-dotpic-surface border border-dotpic-border cursor-pointer hover:border-dotpic-gold/30">
            <span className="text-xs text-dotpic-white">Same-Day Instagram Reel Editor</span>
            <input
              type="checkbox"
              checked={includeReelEditor}
              onChange={(e) => setIncludeReelEditor(e.target.checked)}
              className="accent-dotpic-gold w-4 h-4"
            />
          </label>
        </div>

        {/* Result Display */}
        <div className="p-4 rounded-sm bg-black/60 border border-dotpic-gold/40 text-center mt-6">
          <span className="text-[10px] font-mono uppercase text-dotpic-muted tracking-widest block mb-1">
            ESTIMATED INVESTMENT
          </span>
          <div className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-semibold">
            {formatINR(totalEstimate)}
          </div>
          <p className="text-[10px] text-dotpic-muted mt-2 italic">
            *Indicative estimate only. Final quotation may vary depending on outstation travel and customized crew configurations.
          </p>
        </div>
      </div>
    </div>
  );
}
