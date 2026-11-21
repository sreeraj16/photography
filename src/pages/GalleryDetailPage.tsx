import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2, Eye } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatDate } from '../lib/utils';
import { Lightbox } from '../components/common/Lightbox';
import { ShareModal } from '../components/common/ShareModal';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';

export function GalleryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const gallery = dataStore.getGalleryBySlug(slug || '') || dataStore.getGalleries()[0];
  const photos = dataStore.getPhotos(gallery.id);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const handleOpenPhoto = (idx: number) => {
    setPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* Top Navigation Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-dotpic-muted hover:text-dotpic-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <button
          onClick={() => setShareOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-dotpic-surface border border-dotpic-border text-xs text-dotpic-white hover:border-dotpic-gold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-dotpic-gold" />
          <span>Share Album</span>
        </button>
      </div>

      {/* Album Billboard Cover */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[16/9] sm:aspect-cinema rounded-sm overflow-hidden border border-dotpic-border shadow-2xl">
          <img
            src={gallery.cover_image_url}
            alt={gallery.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 max-w-3xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-2">
              ALBUM ARCHIVE • {gallery.category_slug.toUpperCase()}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-light mb-3">
              {gallery.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-dotpic-muted font-mono">
              {gallery.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-dotpic-gold" />
                  {gallery.location}
                </span>
              )}
              {gallery.shoot_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-dotpic-gold" />
                  {formatDate(gallery.shoot_date)}
                </span>
              )}
              {gallery.client_name && (
                <span>Client: <strong className="text-white">{gallery.client_name}</strong></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Album Story Description */}
      {gallery.description && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <p className="text-sm sm:text-base text-dotpic-muted font-serif italic leading-relaxed">
            "{gallery.description}"
          </p>
        </div>
      )}

      {/* Photos Masonry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <TiltCard
              key={photo.id || idx}
              onClick={() => handleOpenPhoto(idx)}
              data-cursor="view"
              maxTilt={7}
              scale={1.03}
              className="rounded-2xl overflow-hidden border border-dotpic-border/80 bg-dotpic-surface cursor-pointer hover:border-dotpic-gold/60 transition-all duration-300 shadow-xl group aspect-[4/5]"
            >
              <img
                src={photo.url}
                alt={photo.title || "Photo"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  {photo.exif_camera && (
                    <span className="text-[10px] font-mono text-dotpic-gold px-2.5 py-1 rounded-full bg-black/80 border border-white/10">
                      {photo.exif_camera} • {photo.exif_aperture || 'f/1.4'}
                    </span>
                  )}
                  <span className="p-2 rounded-full bg-black/80 text-dotpic-gold border border-white/20 ml-auto">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <h5 className="text-base font-serif text-white font-medium truncate">
                    {photo.title || "Master Frame"}
                  </h5>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Book This Style CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center py-16 border-t border-dotpic-border">
        <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">
          Love this visual aesthetic?
        </h3>
        <p className="text-xs text-dotpic-muted mb-6">
          Book our creative team for your celebration or event.
        </p>
        <Link to={`/book?category=${encodeURIComponent(gallery.category_slug)}`}>
          <Button variant="gold" size="lg" withShutterSound>
            Book Similar Shoot With DOTPIC
          </Button>
        </Link>
      </div>

      {/* Lightbox & Share Modals */}
      <Lightbox
        photos={photos}
        initialIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <ShareModal
        title={gallery.title}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
}
