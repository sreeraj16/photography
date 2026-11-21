import React, { useState } from 'react';
import { Plus, Lock, Key, Download, Trash2, Eye, X } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { ClientGallery } from '../../types/database.types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function ClientGalleriesManager() {
  const [galleries, setGalleries] = useState<ClientGallery[]>(() => dataStore.getClientGalleries());
  const [showModal, setShowModal] = useState(false);

  // New gallery state
  const [clientName, setClientName] = useState('');
  const [title, setTitle] = useState('');
  const [pin, setPin] = useState('1234');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop');
  const [allowDownloads, setAllowDownloads] = useState(true);

  const refreshList = () => {
    setGalleries([...dataStore.getClientGalleries()]);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !title || !pin) return;

    const slug = `${clientName}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newG: ClientGallery = {
      id: `cg-${Date.now()}`,
      client_name: clientName,
      title,
      slug,
      pin_hash: pin,
      cover_image_url: coverUrl,
      event_date: new Date().toISOString().slice(0, 10),
      allow_downloads: allowDownloads,
      watermark_previews: false,
      download_count: 0,
      created_at: new Date().toISOString()
    };

    dataStore.saveClientGallery(newG);
    setShowModal(false);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this private client vault?")) {
      dataStore.deleteClientGallery(id);
      refreshList();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Private Client Photo Vaults</h2>
          <p className="text-xs text-dotpic-muted">Manage unindexed PIN-protected galleries for delivering wedding and fest deliveries.</p>
        </div>

        <Button
          size="sm"
          variant="gold"
          onClick={() => setShowModal(true)}
          icon={<Plus className="w-4 h-4 text-dotpic-black" />}
        >
          Create Client Vault
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((g) => (
          <div key={g.id} className="bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden flex flex-col justify-between shadow-xl">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={g.cover_image_url} alt={g.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-black/80 text-dotpic-gold px-2 py-0.5 rounded text-[10px] font-mono border border-dotpic-gold/40">
                  PIN: {g.pin_hash}
                </span>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold block mb-1">
                  CLIENT: {g.client_name}
                </span>
                <h3 className="text-lg font-serif text-white mb-2">{g.title}</h3>

                <div className="text-xs text-dotpic-muted space-y-1">
                  <p>Downloads: <strong className="text-white">{g.download_count}</strong></p>
                  <p>Direct Link: <code className="text-dotpic-gold">/client-gallery/{g.slug}</code></p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-dotpic-surface/60 border-t border-dotpic-border flex items-center justify-between text-xs">
              <a
                href={`/client-gallery/${g.slug}`}
                target="_blank"
                className="text-dotpic-gold hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> View Portal
              </a>

              <button
                onClick={() => handleDelete(g.id)}
                className="p-1 text-dotpic-muted hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-white mb-4">Create Private Client Vault</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Client Name *</label>
                <Input
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Vikram & Ananya"
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Vault Title *</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Royal Falaknuma Wedding Collection"
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">4-Digit Access PIN *</label>
                <Input
                  required
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="1234"
                  className="font-mono text-center tracking-widest text-lg"
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Cover Image URL</label>
                <Input
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-white cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={allowDownloads}
                  onChange={(e) => setAllowDownloads(e.target.checked)}
                  className="accent-dotpic-gold w-4 h-4"
                />
                <span>Allow Full Resolution ZIP Downloads</span>
              </label>

              <div className="flex justify-end gap-3 pt-3">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Create Vault
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
