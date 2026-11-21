import React, { useState } from 'react';
import { Plus, Check, Trash2, Edit, Sparkles, X } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { Package } from '../../types/database.types';
import { formatINR } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';

export function PackageManager() {
  const [packages, setPackages] = useState<Package[]>(() => dataStore.getPackages());
  const [showModal, setShowModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [categorySlug, setCategorySlug] = useState('wedding');
  const [priceInr, setPriceInr] = useState('45000');
  const [duration, setDuration] = useState('1 Full Day (Up to 8 Hours)');
  const [description, setDescription] = useState('');
  const [inclusionsText, setInclusionsText] = useState('1 Senior Candid Photographer\n1 Traditional Cinematographer\n150+ Hand-Retouched Master Frames\nAll Raw Files in Cloud\nPrivate Gallery Access');
  const [isPopular, setIsPopular] = useState(false);

  const refreshList = () => {
    setPackages([...dataStore.getPackages()]);
  };

  const handleOpenCreate = () => {
    setEditingPkg(null);
    setName('');
    setCategorySlug('wedding');
    setPriceInr('45000');
    setDuration('1 Full Day (Up to 8 Hours)');
    setDescription('Essential cinematic coverage for celebrations.');
    setInclusionsText('1 Senior Candid Photographer\n1 Traditional Cinematographer\n150+ Hand-Retouched Frames\nCloud Gallery Access');
    setIsPopular(false);
    setShowModal(true);
  };

  const handleOpenEdit = (pkg: Package) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setCategorySlug(pkg.category_slug);
    setPriceInr(String(pkg.price_inr));
    setDuration(pkg.duration);
    setDescription(pkg.description);
    setInclusionsText(pkg.inclusions.join('\n'));
    setIsPopular(pkg.is_popular);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const inclusions = inclusionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const pkgData: Package = {
      id: editingPkg ? editingPkg.id : `pkg-${Date.now()}`,
      name,
      slug,
      category_slug: categorySlug,
      price_inr: Number(priceInr) || 0,
      duration,
      description,
      inclusions,
      is_popular: isPopular,
      is_enabled: true,
      order_index: editingPkg ? editingPkg.order_index : packages.length + 1,
      created_at: editingPkg ? editingPkg.created_at : new Date().toISOString()
    };

    dataStore.savePackage(pkgData);
    setShowModal(false);
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      dataStore.deletePackage(id);
      refreshList();
    }
  };

  const handleToggleEnabled = (pkg: Package) => {
    const updated = { ...pkg, is_enabled: !pkg.is_enabled };
    dataStore.savePackage(updated);
    refreshList();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Packages & Investment Management</h2>
          <p className="text-xs text-dotpic-muted">Configure pricing tiers in INR (₹), custom inclusions, and popularity badges.</p>
        </div>

        <Button
          size="sm"
          variant="gold"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4 text-dotpic-black" />}
        >
          Create Package
        </Button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-dotpic-charcoal border rounded-sm p-6 flex flex-col justify-between shadow-xl relative ${
              pkg.is_popular ? 'border-dotpic-gold ring-1 ring-dotpic-gold/50' : 'border-dotpic-border'
            }`}
          >
            {pkg.is_popular && (
              <span className="absolute -top-3 right-4 bg-dotpic-gold text-dotpic-black text-[9px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" /> Popular
              </span>
            )}

            <div>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-dotpic-gold mb-2">
                <span>{pkg.category_slug}</span>
                <span className={pkg.is_enabled ? 'text-emerald-400' : 'text-gray-400'}>
                  {pkg.is_enabled ? 'Active' : 'Disabled'}
                </span>
              </div>

              <h3 className="text-xl font-serif text-white mb-1">{pkg.name}</h3>
              <p className="text-xs text-dotpic-muted mb-4">{pkg.duration}</p>

              <div className="text-2xl font-serif text-dotpic-gold font-medium mb-4 pb-4 border-b border-dotpic-border">
                {formatINR(pkg.price_inr)}
              </div>

              <ul className="space-y-2 text-xs text-dotpic-muted mb-6">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-dotpic-gold flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-dotpic-border flex items-center justify-between">
              <button
                onClick={() => handleToggleEnabled(pkg)}
                className="text-xs text-dotpic-muted hover:text-white underline"
              >
                {pkg.is_enabled ? 'Disable' : 'Enable'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="p-1.5 rounded bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border"
                  title="Edit Package"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-1.5 rounded bg-rose-950/30 text-rose-400 hover:bg-rose-900/40 border border-rose-500/30"
                  title="Delete Package"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-white mb-4">
              {editingPkg ? 'Edit Package' : 'Create Package'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Package Name *</label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cinematic Grandeur"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Category Slug</label>
                  <Select
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                  >
                    <option value="wedding" className="bg-dotpic-black text-white">Wedding</option>
                    <option value="pre-wedding" className="bg-dotpic-black text-white">Pre-Wedding</option>
                    <option value="campus-stories" className="bg-dotpic-black text-white">Campus Stories</option>
                    <option value="portrait" className="bg-dotpic-black text-white">Portrait</option>
                    <option value="fashion" className="bg-dotpic-black text-white">Fashion</option>
                    <option value="commercial" className="bg-dotpic-black text-white">Commercial</option>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Price (₹ INR) *</label>
                  <Input
                    type="number"
                    required
                    value={priceInr}
                    onChange={(e) => setPriceInr(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Duration</label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 2 Full Days (Full Festivities)"
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Description</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of what makes this tier distinct..."
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Inclusions (One item per line) *</label>
                <Textarea
                  rows={5}
                  value={inclusionsText}
                  onChange={(e) => setInclusionsText(e.target.value)}
                  placeholder="2 Senior Candid Photographers&#10;2 Cinematic Filmmakers&#10;350+ Retouched Master Frames..."
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-white cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="accent-dotpic-gold w-4 h-4"
                />
                <span>Highlight as "Most Popular Choice" badge</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-dotpic-border">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  {editingPkg ? 'Update Package' : 'Create Package'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
