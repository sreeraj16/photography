import { useState } from 'react';
import { Download, Heart, Check, Share2, Eye, ShieldCheck } from 'lucide-react';
import { ClientGallery, ClientGalleryPhoto } from '../../types/database.types';
import { dataStore } from '../../lib/dataStore';
import { Lightbox } from '../../components/common/Lightbox';
import { Button } from '../../components/ui/Button';

interface ClientGalleryViewProps {
  gallery: ClientGallery;
  photos: ClientGalleryPhoto[];
}

export function ClientGalleryView({ gallery, photos }: ClientGalleryViewProps) {
  const [selectedFavourites, setSelectedFavourites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem(`dotpic_favs_${gallery.id}`) || '[]');
  });
  const [downloadWatermarked, setDownloadWatermarked] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const toggleFavourite = (photoId: string) => {
    setSelectedFavourites(prev => {
      const next = prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId];
      localStorage.setItem(`dotpic_favs_${gallery.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleDownloadAll = () => {
    dataStore.incrementGalleryDownload(gallery.id);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

    // Trigger download of the first photo as representative file
    if (photos.length > 0) {
      const link = document.createElement('a');
      link.href = photos[0].url;
      link.download = `${gallery.title.replace(/[^a-zA-Z0-9]/g, '_')}_Master_Files.jpg`;
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Gallery Header */}
      <div className="bg-dotpic-charcoal border border-dotpic-border p-6 sm:p-10 rounded-sm mb-12 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold">
                ACTIVE CLIENT VAULT • PIN VERIFIED
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white mb-2">
              {gallery.title}
            </h1>
            <p className="text-xs text-dotpic-muted">
              Client: <span className="text-white font-medium">{gallery.client_name}</span> • Total Delivered: {photos.length} High-Res Frames
            </p>
          </div>

          {/* Action Buttons: Favourites Count & Download All */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded bg-dotpic-surface border border-dotpic-border text-xs text-dotpic-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{selectedFavourites.length} Selected for Album</span>
            </div>

            {gallery.allow_downloads && (
              <Button
                variant="gold"
                size="md"
                onClick={handleDownloadAll}
                icon={<Download className="w-4 h-4 text-dotpic-black" />}
              >
                {downloadSuccess ? 'Download Started!' : 'Download All High-Res'}
              </Button>
            )}
          </div>
        </div>

        {/* Security watermark toggle hint */}
        <div className="mt-6 pt-4 border-t border-dotpic-border/60 flex items-center justify-between text-xs text-dotpic-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-dotpic-gold" />
            <span>Private Link (Unindexed by Google) • Clean unwatermarked files unlocked</span>
          </div>
          <span className="text-[10px] font-mono text-dotpic-gold">
            Downloads Logged: {gallery.download_count || 0}
          </span>
        </div>
      </div>

      {/* Photos Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, idx) => {
          const isFav = selectedFavourites.includes(photo.id);
          return (
            <div
              key={photo.id || idx}
              className={`group relative rounded-sm overflow-hidden border bg-dotpic-surface transition-all duration-300 ${
                isFav ? 'border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'border-dotpic-border hover:border-dotpic-gold/50'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption || `Client Photo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Actions: Favourite Heart & Zoom */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={() => toggleFavourite(photo.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isFav
                        ? 'bg-rose-500 text-white shadow-lg'
                        : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/90'
                    }`}
                    title={isFav ? "Remove from Album Selections" : "Mark as Album Favourite"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                  </button>

                  <button
                    onClick={() => setLightboxIndex(idx)}
                    className="p-2 rounded-full bg-black/60 text-white/80 hover:text-white backdrop-blur-md"
                    title="Fullscreen Lightbox"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white font-medium block">
                    {photo.caption || `Frame #${idx + 1}`}
                  </span>
                  <span className="text-[10px] text-dotpic-gold font-mono">
                    Full Resolution Print Ready
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for Private Gallery */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos.map(p => ({
            id: p.id,
            url: p.url,
            title: p.caption || "Private Frame",
            caption: gallery.title,
            order_index: p.order_index,
            is_featured: false,
            likes_count: 0,
            created_at: p.created_at
          }))}
          initialIndex={lightboxIndex}
          isOpen={true}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
