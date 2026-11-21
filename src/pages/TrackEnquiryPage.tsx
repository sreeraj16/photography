import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Calendar, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { Enquiry, EnquiryStatus } from '../types/database.types';
import { formatDate } from '../lib/utils';
import { BRAND } from '../lib/constants';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function TrackEnquiryPage() {
  const [refId, setRefId] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId) return;

    const result = dataStore.getEnquiryByRef(refId.trim(), phone.trim());
    setEnquiry(result || null);
    setSearched(true);
  };

  const steps: EnquiryStatus[] = ['New', 'Contacted', 'Quoted', 'Confirmed', 'Completed'];

  const getStepIndex = (st: EnquiryStatus): number => {
    return steps.indexOf(st);
  };

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          CLIENT STATUS PORTAL
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white font-light tracking-tight max-w-xl mx-auto mb-4">
          Track My Booking Enquiry
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-md mx-auto leading-relaxed">
          Enter your Reference ID (e.g. DP-2026-0042) to check real-time availability confirmation and crew allocation.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <form onSubmit={handleSearch} className="bg-dotpic-charcoal border border-dotpic-border p-6 sm:p-8 rounded-sm shadow-xl space-y-4">
          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Booking Reference ID *</label>
            <Input
              required
              value={refId}
              onChange={(e) => setRefId(e.target.value.toUpperCase())}
              placeholder="e.g. DP-2026-0042"
              className="font-mono uppercase tracking-wider"
            />
          </div>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Phone Number (Last 4 or 10 Digits)</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 3210 or +91 98765 43210"
              className="font-mono"
            />
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full" icon={<Search className="w-4 h-4 text-dotpic-black" />}>
            Search Booking Status
          </Button>

          <span className="text-[11px] text-dotpic-muted/70 text-center block pt-1">
            Demo ID: <code className="text-dotpic-gold">DP-2026-0042</code> (Phone: 3210)
          </span>
        </form>
      </div>

      {/* Results Card */}
      {searched && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-in fade-in duration-300">
          {enquiry ? (
            <div className="bg-dotpic-charcoal border border-dotpic-gold/40 rounded-sm p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dotpic-border gap-4">
                <div>
                  <span className="text-[10px] font-mono text-dotpic-gold uppercase tracking-widest block">
                    REFERENCE: {enquiry.reference_id}
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium">
                    {enquiry.full_name}
                  </h3>
                  <p className="text-xs text-dotpic-muted">
                    {enquiry.category} • {formatDate(enquiry.preferred_date)} • {enquiry.location}
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-dotpic-gold/20 border border-dotpic-gold/40 text-dotpic-gold text-xs font-mono font-bold tracking-wider uppercase text-center">
                  Status: {enquiry.status}
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-8">
                <div className="grid grid-cols-5 gap-2 text-center">
                  {steps.map((st, idx) => {
                    const currentIdx = getStepIndex(enquiry.status);
                    const isDone = idx <= currentIdx;
                    return (
                      <div key={st} className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2 transition-colors ${
                            isDone
                              ? 'bg-dotpic-gold text-dotpic-black font-bold'
                              : 'bg-dotpic-surface border border-dotpic-border text-dotpic-muted'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${isDone ? 'text-dotpic-gold' : 'text-dotpic-muted'}`}>
                          {st}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details & Notes */}
              <div className="p-4 rounded bg-dotpic-surface border border-dotpic-border text-xs text-dotpic-muted space-y-2">
                <p><strong className="text-white">Package Selection:</strong> {enquiry.package_id || 'Custom Schedule'}</p>
                {enquiry.admin_notes && (
                  <p><strong className="text-white">Studio Note:</strong> {enquiry.admin_notes}</p>
                )}
                <p><strong className="text-white">Created At:</strong> {new Date(enquiry.created_at).toLocaleString()}</p>
              </div>

              {/* WhatsApp follow up button */}
              <div className="mt-6 pt-4 border-t border-dotpic-border flex items-center justify-between">
                <span className="text-xs text-dotpic-muted">Need to modify date or requirements?</span>
                <a
                  href={`https://wa.me/916281392682?text=${encodeURIComponent(`Hello DOTPIC, following up on reference ${enquiry.reference_id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider text-dotpic-gold hover:underline font-semibold"
                >
                  Message Studio on WhatsApp →
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-dotpic-charcoal border border-dotpic-border p-8 rounded-sm text-center">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h4 className="text-lg font-serif text-white mb-1">No Booking Found</h4>
              <p className="text-xs text-dotpic-muted max-w-sm mx-auto">
                No active enquiry matched Reference ID <code className="text-dotpic-gold">{refId}</code>. Please verify the code from your WhatsApp confirmation.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
