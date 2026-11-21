import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, LayoutGrid, Eye, ArrowUpRight } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { Lightbox } from '../components/common/Lightbox';

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid'>('masonry');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const galleries = dataStore.getGalleries();
  const categories = dataStore.getCategories();
  const photos = dataStore.getPhotos();

  const filteredGalleries = selectedCategory === 'all'
    ? galleries
    : galleries.filter(g => g.category_slug === selectedCategory);

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(p => {
        const gal = galleries.find(g => g.id === p.gallery_id);
        return gal?.category_slug === selectedCategory;
      });

  const handleOpenPhoto = (idx: number) => {
    setPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-dotpic-gold font-semibold block mb-2">
          MASTER ARCHIVE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          Signature Frames & Albums
        </h1>
        <p className="text-xs sm:text-sm text-dotpic-muted max-w-xl mx-auto leading-relaxed">
          Filter through our royal wedding celebrations, collegiate memories, and editorial portrait archives.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Filter & Layout Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dotpic-border">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                  : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
              }`}
            >
              All Works
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
                  selectedCategory === c.slug
                    ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                    : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Grid Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayoutMode('masonry')}
              className={`p-2 rounded border transition-colors ${
                layoutMode === 'masonry'
                  ? 'bg-dotpic-gold text-dotpic-black border-dotpic-gold'
                  : 'bg-dotpic-surface text-dotpic-muted border-dotpic-border hover:text-white'
              }`}
              title="Masonry Mode"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded border transition-colors ${
                layoutMode === 'grid'
                  ? 'bg-dotpic-gold text-dotpic-black border-dotpic-gold'
                  : 'bg-dotpic-surface text-dotpic-muted border-dotpic-border hover:text-white'
              }`}
              title="Uniform Square Grid Mode"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Albums Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h3 className="text-xl font-serif text-white mb-6">
          Curated Photo Albums ({filteredGalleries.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGalleries.map((gal) => (
            <Link
              key={gal.id}
              to={`/portfolio/${gal.slug}`}
              className="group bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden block hover:border-dotpic-gold/50 transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={gal.cover_image_url}
                  alt={gal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-black/80 px-2.5 py-0.5 rounded text-[10px] font-mono text-dotpic-gold border border-dotpic-gold/40 uppercase">
                  {gal.category_slug}
                </span>
              </div>

              <div className="p-6">
                <h4 className="text-lg font-serif text-white group-hover:text-dotpic-gold transition-colors mb-1 truncate">
                  {gal.title}
                </h4>
                <p className="text-xs text-dotpic-muted mb-4">{gal.location}</p>
                <span className="text-xs uppercase tracking-wider text-dotpic-gold flex items-center gap-1 font-medium">
                  View Full Album <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Individual Photo Lightbox Feed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-serif text-white mb-6">
          Standalone Master Frames ({filteredPhotos.length})
        </h3>

        <div className={
          layoutMode === 'masonry'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
        }>
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => handleOpenPhoto(idx)}
              className={`group relative overflow-hidden rounded-sm cursor-pointer border border-dotpic-border bg-dotpic-surface hover:border-dotpic-gold/50 transition-all duration-300 ${
                layoutMode === 'masonry'
                  ? (idx % 4 === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]')
                  : 'aspect-square'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title || "DOTPIC Frame"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/80 text-dotpic-gold border border-white/20">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  {photo.exif_camera && (
                    <span className="text-[10px] font-mono text-dotpic-gold block">
                      {photo.exif_camera} • {photo.exif_aperture || 'f/1.4'}
                    </span>
                  )}
                  <h5 className="text-sm font-serif text-white font-medium truncate">
                    {photo.title || "Signature Frame"}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        photos={filteredPhotos}
        initialIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
