import { useState } from 'react';
import { Star, Check, X, Trash2, Heart } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { Testimonial } from '../../types/database.types';

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => dataStore.getTestimonials(false));

  const refreshList = () => {
    setTestimonials([...dataStore.getTestimonials(false)]);
  };

  const handleApprove = (t: Testimonial) => {
    const updated = { ...t, is_approved: true };
    dataStore.saveTestimonial(updated);
    refreshList();
  };

  const handleToggleFeature = (t: Testimonial) => {
    const updated = { ...t, is_featured: !t.is_featured };
    dataStore.saveTestimonial(updated);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this review?")) {
      dataStore.deleteTestimonial(id);
      refreshList();
    }
  };

  const pending = testimonials.filter(t => !t.is_approved);
  const approved = testimonials.filter(t => t.is_approved);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-white">Client Reviews & Testimonials Moderation</h2>
        <p className="text-xs text-dotpic-muted">Approve public client submissions, feature top quotes, and manage testimonials.</p>
      </div>

      {/* Moderation Queue */}
      {pending.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-sm p-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold block mb-4">
            ⚠️ PENDING MODERATION QUEUE ({pending.length})
          </span>

          <div className="space-y-4">
            {pending.map((t) => (
              <div key={t.id} className="p-4 rounded bg-dotpic-charcoal border border-dotpic-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-serif text-white font-medium">{t.client_name}</span>
                    <span className="text-xs text-dotpic-muted">• {t.role_or_event} ({t.college_or_location})</span>
                  </div>
                  <p className="text-xs text-dotpic-muted italic">"{t.quote}"</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(t)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-500 text-black text-xs font-semibold hover:bg-emerald-400"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded text-dotpic-muted hover:text-red-400 border border-dotpic-border"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews List */}
      <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl">
        <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-4">
          LIVE APPROVED REVIEWS ({approved.length})
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approved.map((t) => (
            <div key={t.id} className="p-4 rounded bg-dotpic-surface border border-dotpic-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <button
                    onClick={() => handleToggleFeature(t)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                      t.is_featured
                        ? 'bg-dotpic-gold/20 text-dotpic-gold border-dotpic-gold/40'
                        : 'border-white/10 text-dotpic-muted hover:text-white'
                    }`}
                  >
                    {t.is_featured ? 'Featured' : 'Not Featured'}
                  </button>
                </div>

                <p className="text-xs text-dotpic-white italic mb-3">"{t.quote}"</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-dotpic-border/60 text-xs text-dotpic-muted">
                <span>{t.client_name} • {t.college_or_location}</span>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1 text-dotpic-muted hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
