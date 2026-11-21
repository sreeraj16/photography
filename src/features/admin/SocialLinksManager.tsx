import React, { useState } from 'react';
import { Instagram, Youtube, Phone, Check, Plus, Trash2, ArrowUpDown } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { WebsiteSettings, LinksPageItem } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function SocialLinksManager() {
  const [settings, setSettings] = useState<WebsiteSettings>(() => dataStore.getSettings());
  const [linksItems, setLinksItems] = useState<LinksPageItem[]>(() => dataStore.getLinksItems());
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Linktree item modal
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newBadge, setNewBadge] = useState('');

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddLinkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const newItem: LinksPageItem = {
      id: `lnk-${Date.now()}`,
      title: newTitle,
      url: newUrl,
      icon_name: 'Globe',
      badge_text: newBadge,
      is_active: true,
      order_index: linksItems.length + 1,
      created_at: new Date().toISOString()
    };

    dataStore.saveLinksItem(newItem);
    setLinksItems([...dataStore.getLinksItems()]);
    setNewTitle('');
    setNewUrl('');
    setNewBadge('');
  };

  const handleDeleteLinkItem = (id: string) => {
    dataStore.deleteLinksItem(id);
    setLinksItems([...dataStore.getLinksItems()]);
  };

  const handleToggleLinkActive = (item: LinksPageItem) => {
    const updated = { ...item, is_active: !item.is_active };
    dataStore.saveLinksItem(updated);
    setLinksItems([...dataStore.getLinksItems()]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-white">Social Channels & /links Hub Control</h2>
        <p className="text-xs text-dotpic-muted">Manage the official Instagram, YouTube and WhatsApp connections, plus your Linktree-style bio page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Official Social Links Config (6 cols) */}
        <div className="lg:col-span-6 bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block mb-4">
            OFFICIAL PLATFORM CONNECTIONS
          </span>

          <form onSubmit={handleSaveSocials} className="space-y-5">
            {/* Instagram */}
            <div>
              <label className="text-xs text-white font-medium flex items-center gap-2 mb-1">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram Profile URL</span>
              </label>
              <Input
                required
                value={settings.social_instagram}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                placeholder="https://www.instagram.com/_dotpic_"
              />
              <span className="text-[10px] text-dotpic-muted font-mono mt-1 block">
                Official handle: @_dotpic_
              </span>
            </div>

            {/* YouTube */}
            <div>
              <label className="text-xs text-white font-medium flex items-center gap-2 mb-1">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube Channel URL</span>
              </label>
              <Input
                required
                value={settings.social_youtube}
                onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                placeholder="https://www.youtube.com/@dotpicphotography"
              />
              <span className="text-[10px] text-dotpic-muted font-mono mt-1 block">
                Official handle: @dotpicphotography
              </span>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="text-xs text-white font-medium flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Business Number</span>
              </label>
              <Input
                required
                value={settings.contact_whatsapp}
                onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value, social_whatsapp: `https://wa.me/${e.target.value.replace(/[^0-9]/g, '')}` })}
                placeholder="+91 6281392682"
              />
              <span className="text-[10px] text-dotpic-muted font-mono mt-1 block">
                Direct chat link: https://wa.me/916281392682
              </span>
            </div>

            <Button type="submit" variant="gold" size="md" className="w-full">
              {saveSuccess ? 'Changes Saved!' : 'Save Social Channels'}
            </Button>
          </form>
        </div>

        {/* Right: /links Hub (Linktree in Bio) (6 cols) */}
        <div className="lg:col-span-6 bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
                LINK-IN-BIO HUB (/links)
              </span>
              <p className="text-xs text-dotpic-muted">Buttons appearing on the mobile Instagram bio landing page.</p>
            </div>
            <a
              href="/links"
              target="_blank"
              className="text-xs text-dotpic-gold hover:underline"
            >
              Preview /links →
            </a>
          </div>

          {/* Add item */}
          <form onSubmit={handleAddLinkItem} className="p-3 rounded bg-dotpic-surface border border-dotpic-border space-y-3 mb-4">
            <span className="text-[11px] font-medium text-white block">Add Link Button</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Button Label"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-black/60 border border-dotpic-border p-2 text-xs rounded text-white"
              />
              <input
                type="text"
                placeholder="Target URL (e.g. /book)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="bg-black/60 border border-dotpic-border p-2 text-xs rounded text-white"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Badge text (optional, e.g. Instant)"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="flex-1 bg-black/60 border border-dotpic-border p-2 text-xs rounded text-white"
              />
              <Button type="submit" variant="gold" size="sm">
                Add
              </Button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {linksItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded bg-dotpic-surface border border-dotpic-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{item.title}</span>
                    {item.badge_text && (
                      <span className="text-[9px] bg-dotpic-gold/20 text-dotpic-gold px-1.5 py-0.5 rounded">
                        {item.badge_text}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-dotpic-muted font-mono">{item.url}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleLinkActive(item)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {item.is_active ? 'Active' : 'Off'}
                  </button>

                  <button
                    onClick={() => handleDeleteLinkItem(item.id)}
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
    </div>
  );
}
