import React, { useState } from 'react';
import {
  Plus,
  QrCode,
  Download,
  Copy,
  Check,
  Trash2,
  Sparkles,
  X
} from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { CampusEvent, DownloadPolicy } from '../../types/database.types';
import { formatDate, copyToClipboard } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { QRCodeModal } from '../campus/QRCodeModal';

export function CampusManager() {
  const [events, setEvents] = useState<CampusEvent[]>(() => dataStore.getCampusEvents());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeQrEvent, setActiveQrEvent] = useState<CampusEvent | null>(null);
  const [copiedCaption, setCopiedCaption] = useState<string | null>(null);

  // New event form
  const [title, setTitle] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [category, setCategory] = useState('Cultural & Tech Fest');
  const [desc, setDesc] = useState('');
  const [cover, setCover] = useState('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop');
  const [downloadPolicy, setDownloadPolicy] = useState<DownloadPolicy>('full');
  const [allowFindMyPhotos, setAllowFindMyPhotos] = useState(true);

  const refreshList = () => {
    setEvents([...dataStore.getCampusEvents()]);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !collegeName) return;

    const slug = `${collegeName}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newEvent: CampusEvent = {
      id: `camp-${Date.now()}`,
      title,
      slug,
      college_name: collegeName,
      college_id: collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      event_date: eventDate || new Date().toISOString().slice(0, 10),
      category,
      description: desc,
      cover_image_url: cover,
      photo_count: 350,
      is_featured: true,
      download_policy: downloadPolicy,
      allow_find_my_photos: allowFindMyPhotos,
      order_index: events.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dataStore.saveCampusEvent(newEvent);
    setShowCreateModal(false);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this campus event?")) {
      dataStore.deleteCampusEvent(id);
      refreshList();
    }
  };

  // Section 12.1 feature 7: Caption & hashtag helper
  const generateInstagramCaption = (ev: CampusEvent) => {
    return `Electric energy captured at ${ev.college_name}! ⚡️📸

Highlights from "${ev.title}" are now live on the DOTPIC Campus Stories portal.
Scan the official QR code at your campus or tap the link in our bio to find your portraits!

Tag your friends who lit up the stage! 🔥

Captured with love by @_dotpic_
.
.
#DOTPIC #CampusStories #${ev.college_name.replace(/[^a-zA-Z0-9]/g, '')} #${ev.title.replace(/[^a-zA-Z0-9]/g, '')} #CollegeFest #ConcertPhotography #FestivalVibes #HyderabadPhotographer`;
  };

  const handleCopyCaption = async (ev: CampusEvent) => {
    const caption = generateInstagramCaption(ev);
    await copyToClipboard(caption);
    setCopiedCaption(ev.id);
    setTimeout(() => setCopiedCaption(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Campus Stories & QR Management</h2>
          <p className="text-xs text-dotpic-muted">Manage college events, instant student QR posters, and Instagram captions.</p>
        </div>

        <Button
          size="sm"
          variant="gold"
          onClick={() => setShowCreateModal(true)}
          icon={<Plus className="w-4 h-4 text-dotpic-black" />}
        >
          Add Campus Event
        </Button>
      </div>

      {/* Events Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={ev.cover_image_url}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/80 border border-dotpic-gold/40 text-dotpic-gold px-2 py-0.5 rounded text-[10px] font-mono uppercase">
                  {ev.college_name}
                </span>

                <button
                  onClick={() => setActiveQrEvent(ev)}
                  className="absolute top-3 right-3 p-2 rounded bg-black/80 border border-white/20 text-white hover:text-dotpic-gold hover:border-dotpic-gold transition-colors"
                  title="Generate QR Poster"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-mono text-dotpic-gold uppercase tracking-wider block mb-1">
                  {formatDate(ev.event_date)} • {ev.category}
                </span>
                <h3 className="text-lg font-serif text-white mb-2">
                  {ev.title}
                </h3>
                <p className="text-xs text-dotpic-muted line-clamp-2 mb-4">
                  {ev.description}
                </p>

                {/* Policies Bar */}
                <div className="flex items-center justify-between text-[11px] text-dotpic-muted border-t border-dotpic-border/60 pt-3">
                  <span>Download Policy: <strong className="text-white uppercase">{ev.download_policy}</strong></span>
                  <span>Photos: <strong className="text-dotpic-gold">{ev.photo_count}</strong></span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: QR Code, Copy Caption, Delete */}
            <div className="p-4 bg-dotpic-surface/60 border-t border-dotpic-border flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveQrEvent(ev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-dotpic-surface text-dotpic-white hover:text-dotpic-gold border border-dotpic-border text-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-dotpic-gold" />
                <span>QR Banner</span>
              </button>

              <button
                onClick={() => handleCopyCaption(ev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-dotpic-surface text-pink-300 hover:text-pink-200 border border-pink-500/30 text-xs"
                title="Copy ready-to-post Instagram caption"
              >
                {copiedCaption === ev.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-pink-400" />}
                <span>{copiedCaption === ev.id ? 'Copied!' : 'IG Caption'}</span>
              </button>

              <button
                onClick={() => handleDelete(ev.id)}
                className="p-1.5 rounded text-dotpic-muted hover:text-red-400"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showCreateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-white mb-4">Add College Fest / Event</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Event Name *</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Elan & Envision 2026: Astral Resonance"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">College Name *</label>
                  <Input
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. IIT Hyderabad, BITS Pilani"
                  />
                </div>
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Event Date</label>
                  <Input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Cultural & Tech Fest"
                  />
                </div>
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Download Policy</label>
                  <Select
                    value={downloadPolicy}
                    onChange={(e) => setDownloadPolicy(e.target.value as any)}
                  >
                    <option value="full" className="bg-dotpic-black text-white">Full Resolution (Unrestricted)</option>
                    <option value="low_res" className="bg-dotpic-black text-white">Low-Res (Web Friendly)</option>
                    <option value="none" className="bg-dotpic-black text-white">View Only (No Downloads)</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Cover Image URL</label>
                <Input
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Event Description</label>
                <Textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Details of student attendance, star night artists, competitions..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Publish Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Download Modal */}
      {activeQrEvent && (
        <QRCodeModal
          eventTitle={activeQrEvent.title}
          collegeName={activeQrEvent.college_name}
          eventUrl={`${window.location.origin}/campus-stories/${activeQrEvent.slug}`}
          isOpen={true}
          onClose={() => setActiveQrEvent(null)}
        />
      )}
    </div>
  );
}
