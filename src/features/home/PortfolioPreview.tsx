import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, Camera, Aperture } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { Lightbox } from '../../components/common/Lightbox';
import { TiltCard } from '../../components/ui/TiltCard';

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
    <section className="py-28 bg-dotpic-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Numeral 03 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">03</span>
              <div className="h-[1px] w-12 bg-dotpic-gold/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
                SIGNATURE ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-dotpic-white font-light">
              Masterpiece Frames
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-dotpic-gold text-dotpic-black font-bold shadow-[0_0_15px_rgba(201,169,110,0.4)]'
                  : 'bg-dotpic-surface/80 text-dotpic-muted hover:text-white border border-dotpic-border'
              }`}
            >
              All Frames
            </button>
            {categories.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === c.slug
                    ? 'bg-dotpic-gold text-dotpic-black font-bold shadow-[0_0_15px_rgba(201,169,110,0.4)]'
                    : 'bg-dotpic-surface/80 text-dotpic-muted hover:text-white border border-dotpic-border'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Artistic 3D Masonry Tilt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <TiltCard
                key={photo.id || idx}
                onClick={() => handleOpenLightbox(idx)}
                data-cursor="view"
                maxTilt={7}
                scale={1.02}
                className={`rounded-xl overflow-hidden cursor-pointer border border-dotpic-border/80 bg-dotpic-surface group shadow-2xl transition-colors duration-500 hover:border-dotpic-gold/70 ${
                  isWide ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt_text || photo.title || "DOTPIC Frame"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Subtle Lens Vignette & Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-dotpic-black via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Top Corner Camera Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-dotpic-gold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-3 h-3 text-dotpic-gold" />
                  <span>{photo.exif_camera || "SONY G MASTER"}</span>
                </div>

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end">
                    <span className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-dotpic-gold/50 text-dotpic-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    {photo.exif_aperture && (
                      <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-1">
                        {photo.exif_aperture} • ISO {photo.exif_iso || 400} • {photo.exif_shutter_speed || "1/500s"}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                      {photo.title || "Signature Moment"}
                    </h3>
                    {photo.caption && (
                      <p className="text-xs text-dotpic-muted mt-1 line-clamp-1 font-light">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Explore Full Portfolio Button */}
        <div className="mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-transparent border border-dotpic-gold/60 text-dotpic-white hover:text-dotpic-black hover:bg-dotpic-gold text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_20px_rgba(201,169,110,0.15)] hover:shadow-[0_0_30px_rgba(201,169,110,0.5)]"
          >
            <span>Browse Master Archive & Albums</span>
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
