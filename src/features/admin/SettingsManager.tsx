import React, { useState } from 'react';
import { Save, Download, Check, ShieldAlert } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { WebsiteSettings } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function SettingsManager() {
  const [settings, setSettings] = useState<WebsiteSettings>(() => dataStore.getSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDownloadBackup = () => {
    const json = dataStore.exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DOTPIC_FULL_DATABASE_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Website Settings & JSON Export</h2>
          <p className="text-xs text-dotpic-muted">Studio contact parameters, announcement notification bar, and complete data backup.</p>
        </div>

        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadBackup}
            icon={<Download className="w-3.5 h-3.5 text-dotpic-gold" />}
          >
            Export All Data JSON
          </Button>

          <Button
            size="sm"
            variant="gold"
            onClick={handleSave}
            icon={saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5 text-dotpic-black" />}
          >
            {saved ? 'Saved!' : 'Save Settings'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
            STUDIO CONTACT DETAILS
          </span>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Official Brand Name</label>
            <Input
              value={settings.brand_name}
              onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Studio Address</label>
            <Input
              value={settings.contact_address}
              onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Google Maps Direct URL</label>
            <Input
              value={settings.contact_maps_url}
              onChange={(e) => setSettings({ ...settings, contact_maps_url: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Phone</label>
              <Input
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Email</label>
              <Input
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar & Business Hours */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
            OPERATIONS & ANNOUNCEMENTS
          </span>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Studio Business Hours</label>
            <Input
              value={settings.business_hours}
              onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs text-dotpic-muted block mb-1">Announcement Bar Text</label>
            <Input
              value={settings.announcement_text}
              onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-white cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={settings.show_announcement_bar}
              onChange={(e) => setSettings({ ...settings, show_announcement_bar: e.target.checked })}
              className="accent-dotpic-gold w-4 h-4"
            />
            <span>Show Announcement Banner at Top of Site</span>
          </label>

          {/* Backup Box */}
          <div className="mt-8 p-4 rounded bg-dotpic-surface border border-dotpic-border">
            <h4 className="text-xs text-white font-medium mb-1">Instant JSON Database Export</h4>
            <p className="text-[11px] text-dotpic-muted mb-3">
              Download your entire website database: packages, enquiries, client albums, videos, FAQs, and settings.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadBackup}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Download Backup JSON
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
