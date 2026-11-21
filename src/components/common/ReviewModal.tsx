import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { dataStore } from '../../lib/dataStore';
import { Testimonial } from '../../types/database.types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    setLoading(true);
    setTimeout(() => {
      const newReview: Testimonial = {
        id: `t-${Date.now()}`,
        client_name: name,
        role_or_event: eventType || 'Client Experience',
        college_or_location: location || 'Hyderabad',
        quote,
        rating,
        avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop`,
        is_featured: false,
        is_approved: false, // Enters moderation queue
        order_index: 99,
        created_at: new Date().toISOString()
      };

      dataStore.saveTestimonial(newReview);
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-white">Thank You for Sharing!</h3>
            <p className="text-xs text-dotpic-muted max-w-sm mx-auto leading-relaxed">
              Your kind words mean the world to our creative team. Your testimonial has been received and will be featured after verification.
            </p>
            <Button variant="gold" size="sm" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-semibold block mb-1">
                Client Feedback
              </span>
              <h3 className="text-2xl font-serif text-dotpic-white">
                Share Your Experience
              </h3>
              <p className="text-xs text-dotpic-muted mt-1">
                Tell us about your shoot with DOTPIC PHOTOGRAPHY.
              </p>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="text-xs text-dotpic-muted block mb-1.5">Rating</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                    aria-label={`${star} Stars`}
                  >
                    <Star
                      className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-dotpic-muted/40'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Your Name *</label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram & Ananya"
                />
              </div>
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Event / Shoot Type</label>
                <Input
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g. Royal Wedding, Campus Fest"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-dotpic-muted block mb-1">College or City</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. IIT Hyderabad, Falaknuma Palace"
              />
            </div>

            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Your Review *</label>
              <Textarea
                required
                rows={4}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Describe your moments, the team's creative direction, and how you felt seeing the final frames..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="gold" size="sm" isLoading={loading}>
                Submit Review
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
