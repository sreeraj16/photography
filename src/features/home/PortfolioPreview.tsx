import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { Lightbox } from '../../components/common/Lightbox';

export function PortfolioPreview() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const photos = dataStore.getPhotos();
  const categories = dataStore.getCategories();

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => {
        const gallery = dataStore.getGalleries().find(g => g.id === p.gallery_id);
        return gallery?.category_slug === activeCategory;
      });

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-24 bg-dotpic-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Numeral 03 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">03</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                SIGNATURE ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Featured Portfolio
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
                activeCategory === 'all'
                  ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                  : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
              }`}
            >
              All Frames
            </button>
            {categories.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${
                  activeCategory === c.slug
                    ? 'bg-dotpic-gold text-dotpic-black font-semibold'
                    : 'bg-dotpic-surface text-dotpic-muted hover:text-white border border-dotpic-border'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Artistic Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <div
                key={photo.id || idx}
                onClick={() => handleOpenLightbox(idx)}
                data-cursor="view"
                className={`group relative overflow-hidden rounded-sm cursor-pointer border border-dotpic-border bg-dotpic-surface transition-all duration-500 hover:border-dotpic-gold/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
                  isWide ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt_text || photo.title || "DOTPIC Frame"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-black/60 border border-white/20 text-dotpic-gold">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    {photo.exif_camera && (
                      <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-1">
                        {photo.exif_camera} • {photo.exif_aperture || 'f/1.4'}
                      </span>
                    )}
                    <h3 className="text-xl font-serif text-white font-medium">
                      {photo.title || "Signature Moment"}
                    </h3>
                    {photo.caption && (
                      <p className="text-xs text-dotpic-muted mt-1 line-clamp-1">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Full Portfolio Button */}
        <div className="mt-14 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-transparent border border-dotpic-gold/50 text-dotpic-white hover:text-dotpic-gold hover:border-dotpic-gold text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-dotpic-gold/10"
          >
            <span>Browse Full Gallery & Albums</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        photos={filteredPhotos}
        initialIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
