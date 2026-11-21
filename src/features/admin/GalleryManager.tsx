import React, { useState } from 'react';
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  Eye,
  Star,
  Check,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { Gallery, Photo } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';

export function GalleryManager() {
  const [galleries, setGalleries] = useState<Gallery[]>(() => dataStore.getGalleries());
  const [photos, setPhotos] = useState<Photo[]>(() => dataStore.getPhotos());
  const categories = dataStore.getCategories();

  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(galleries[0]?.id || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);

  // Form states for new gallery
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.slug || 'wedding');
  const [newClient, setNewClient] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop');

  // Form states for photo upload
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCamera, setUploadCamera] = useState('Sony Alpha 1');
  const [uploadLens, setUploadLens] = useState('FE 50mm f/1.2 GM');
  const [uploadShutter, setUploadShutter] = useState('1/500s');
  const [uploadIso, setUploadIso] = useState('400');
  const [uploadAperture, setUploadAperture] = useState('f/1.4');

  const refreshData = () => {
    setGalleries([...dataStore.getGalleries()]);
    setPhotos([...dataStore.getPhotos()]);
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newGal: Gallery = {
      id: `gal-${Date.now()}`,
      title: newTitle,
      slug,
      category_slug: newCategory,
      cover_image_url: newCover,
      client_name: newClient,
      location: newLocation,
      shoot_date: newDate || new Date().toISOString().slice(0, 10),
      description: newDesc,
      is_featured: false,
      is_published: true,
      order_index: galleries.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dataStore.saveGallery(newGal);
    setShowCreateModal(false);
    setActiveGalleryId(newGal.id);
    refreshData();
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl || !activeGalleryId) return;

    const newPh: Photo = {
      id: `ph-${Date.now()}`,
      gallery_id: activeGalleryId,
      url: uploadUrl,
      thumbnail_url: uploadUrl,
      title: uploadTitle || "Master Frame",
      caption: uploadCaption,
      order_index: photos.length + 1,
      is_featured: false,
      exif_camera: uploadCamera,
      exif_lens: uploadLens,
      exif_aperture: uploadAperture,
      exif_shutter_speed: uploadShutter,
      exif_iso: uploadIso,
      likes_count: 0,
      created_at: new Date().toISOString()
    };

    dataStore.savePhoto(newPh);
    setShowPhotoUploadModal(false);
    setUploadUrl('');
    setUploadTitle('');
    setUploadCaption('');
    refreshData();
  };

  const handleDeleteGallery = (id: string) => {
    if (window.confirm("Are you sure? This will delete the album and its photo links.")) {
      dataStore.deleteGallery(id);
      if (activeGalleryId === id) setActiveGalleryId(null);
      refreshData();
    }
  };

  const handleDeletePhoto = (id: string) => {
    dataStore.deletePhoto(id);
    refreshData();
  };

  const handleTogglePublish = (gal: Gallery) => {
    const updated = { ...gal, is_published: !gal.is_published };
    dataStore.saveGallery(updated);
    refreshData();
  };

  const activeGallery = galleries.find(g => g.id === activeGalleryId) || galleries[0];
  const galleryPhotos = photos.filter(p => p.gallery_id === activeGallery?.id);

  return (
    <div className="space-y-6">
      {/* Title & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Portfolio Galleries & Albums</h2>
          <p className="text-xs text-dotpic-muted">Create albums, manage EXIF metadata, and publish signature frames.</p>
        </div>

        <Button
          size="sm"
          variant="gold"
          onClick={() => setShowCreateModal(true)}
          icon={<Plus className="w-4 h-4 text-dotpic-black" />}
        >
          New Album
        </Button>
      </div>

      {/* Main Grid: Albums List (Left 4 cols) & Photos Editor (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Albums List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
            Albums ({galleries.length})
          </span>

          <div className="space-y-2">
            {galleries.map((gal) => (
              <div
                key={gal.id}
                onClick={() => setActiveGalleryId(gal.id)}
                className={`p-3 rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                  activeGallery?.id === gal.id
                    ? 'bg-dotpic-surface border-dotpic-gold'
                    : 'bg-dotpic-charcoal border-dotpic-border hover:border-dotpic-gold/40'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={gal.cover_image_url}
                    alt={gal.title}
                    className="w-10 h-10 rounded-sm object-cover flex-shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-serif text-white truncate font-medium">
                      {gal.title}
                    </h4>
                    <span className="text-[10px] text-dotpic-muted capitalize font-sans">
                      {gal.category_slug} • {photos.filter(p => p.gallery_id === gal.id).length} photos
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublish(gal);
                    }}
                    className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                      gal.is_published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {gal.is_published ? 'Live' : 'Draft'}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGallery(gal.id);
                    }}
                    className="p-1 text-dotpic-muted hover:text-red-400"
                    title="Delete Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Album Details & Photos Manager */}
        <div className="lg:col-span-8 bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl">
          {activeGallery ? (
            <div>
              {/* Active Album Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dotpic-border mb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono text-dotpic-gold font-semibold">
                    SELECTED ALBUM
                  </span>
                  <h3 className="text-xl font-serif text-white">
                    {activeGallery.title}
                  </h3>
                  <p className="text-xs text-dotpic-muted">
                    {activeGallery.location || 'Studio'} • Slug: <code className="text-dotpic-gold">/portfolio/{activeGallery.slug}</code>
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => setShowPhotoUploadModal(true)}
                  icon={<Upload className="w-3.5 h-3.5 text-dotpic-black" />}
                >
                  Upload Photo
                </Button>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-[4/5] rounded-sm overflow-hidden border border-dotpic-border bg-dotpic-surface"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || "Photo"}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1 rounded bg-rose-500/80 text-white hover:bg-rose-600"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-dotpic-gold block">
                          {photo.exif_camera || 'Sony'} • {photo.exif_aperture || 'f/1.4'}
                        </span>
                        <h5 className="text-xs font-serif text-white truncate">
                          {photo.title}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}

                {galleryPhotos.length === 0 && (
                  <div className="col-span-full py-16 text-center text-dotpic-muted border border-dashed border-dotpic-border rounded-sm">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">This album has no photos yet.</p>
                    <button
                      onClick={() => setShowPhotoUploadModal(true)}
                      className="text-xs text-dotpic-gold underline mt-2"
                    >
                      Click to upload photos to this album
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-dotpic-muted">
              Select or create an album to manage its photos.
            </div>
          )}
        </div>
      </div>

      {/* Create Album Modal */}
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

            <h3 className="text-xl font-serif text-white mb-4">Create New Album</h3>

            <form onSubmit={handleCreateGallery} className="space-y-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Album Title *</label>
                <Input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Royal Falaknuma Wedding: Vikram & Ananya"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Category</label>
                  <Select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug} className="bg-dotpic-black text-white">
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Client Name</label>
                  <Input
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="e.g. Vikram & Ananya"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Location</label>
                  <Input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Hyderabad / Goa"
                  />
                </div>
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Shoot Date</label>
                  <Input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Cover Image URL</label>
                <Input
                  value={newCover}
                  onChange={(e) => setNewCover(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Description</label>
                <Textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Story of the shoot, rituals, aesthetics..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Create Album
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showPhotoUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowPhotoUploadModal(false)}
              className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-white mb-4">Add Photo to Album</h3>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Image URL *</label>
                <Input
                  required
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Title</label>
                  <Input
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. The First Glance"
                  />
                </div>
                <div>
                  <label className="text-xs text-dotpic-muted block mb-1">Camera Body</label>
                  <Input
                    value={uploadCamera}
                    onChange={(e) => setUploadCamera(e.target.value)}
                    placeholder="e.g. Sony Alpha 1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-dotpic-muted block mb-1">Lens</label>
                  <Input
                    value={uploadLens}
                    onChange={(e) => setUploadLens(e.target.value)}
                    placeholder="50mm f/1.2"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-dotpic-muted block mb-1">Aperture</label>
                  <Input
                    value={uploadAperture}
                    onChange={(e) => setUploadAperture(e.target.value)}
                    placeholder="f/1.4"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-dotpic-muted block mb-1">Shutter</label>
                  <Input
                    value={uploadShutter}
                    onChange={(e) => setUploadShutter(e.target.value)}
                    placeholder="1/500s"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Caption / Story</label>
                <Input
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Brief note about the light, emotion, or moment..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowPhotoUploadModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Add to Album
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
