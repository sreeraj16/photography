import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Share2, Info, Maximize, Check } from 'lucide-react';
import { Photo } from '../../types/database.types';
import { copyToClipboard } from '../../lib/utils';
import { dataStore } from '../../lib/dataStore';

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ photos, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showExif, setShowExif] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    if (!currentPhoto) return;
    const likedPhotos = JSON.parse(localStorage.getItem('dotpic_liked_photos') || '[]');
    setLiked(likedPhotos.includes(currentPhoto.id));
  }, [currentPhoto]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleToggleLike = () => {
    if (!currentPhoto) return;
    const likedPhotos: string[] = JSON.parse(localStorage.getItem('dotpic_liked_photos') || '[]');
    if (liked) {
      const filtered = likedPhotos.filter(id => id !== currentPhoto.id);
      localStorage.setItem('dotpic_liked_photos', JSON.stringify(filtered));
      setLiked(false);
    } else {
      likedPhotos.push(currentPhoto.id);
      localStorage.setItem('dotpic_liked_photos', JSON.stringify(likedPhotos));
      setLiked(true);
      dataStore.likePhoto(currentPhoto.id);
    }
  };

  const handleShare = async () => {
    if (!currentPhoto) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentPhoto.title || 'DOTPIC Photography',
          text: currentPhoto.caption || 'Captured by DOTPIC Photography',
          url: window.location.href,
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      await copyToClipboard(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/98 flex flex-col justify-between backdrop-blur-2xl select-none animate-in fade-in duration-300"
    >
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-20">
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-dotpic-gold font-mono">
            {currentIndex + 1} / {photos.length}
          </span>
          {currentPhoto.title && (
            <h4 className="text-xs sm:text-sm text-dotpic-white font-medium truncate max-w-[200px] sm:max-w-md">
              {currentPhoto.title}
            </h4>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={handleToggleLike}
            className={`p-2 rounded-full border transition-colors ${
              liked
                ? 'bg-rose-500/20 border-rose-500 text-rose-500'
                : 'border-white/10 text-dotpic-muted hover:text-white'
            }`}
            title="Add to Favourites"
            aria-label="Add to favourites"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-full border border-white/10 text-dotpic-muted hover:text-white transition-colors"
            title="Share Photo"
            aria-label="Share photo"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* EXIF Toggle */}
          {(currentPhoto.exif_camera || currentPhoto.exif_lens) && (
            <button
              onClick={() => setShowExif(!showExif)}
              className={`p-2 rounded-full border transition-colors ${
                showExif
                  ? 'bg-dotpic-gold/20 border-dotpic-gold text-dotpic-gold'
                  : 'border-white/10 text-dotpic-muted hover:text-white'
              }`}
              title="Camera Settings EXIF"
              aria-label="Toggle camera settings"
            >
              <Info className="w-4 h-4" />
            </button>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 text-dotpic-muted hover:text-white transition-colors ml-2"
            title="Close (Esc)"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Image Display with Arrow Navigation */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev Arrow */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 p-3 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-black/90 hover:scale-105 transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Hero Photo */}
        <div className="relative max-w-full max-h-[75vh] flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt_text || currentPhoto.title || "DOTPIC Frame"}
            className="max-h-[75vh] max-w-full object-contain shadow-2xl transition-all duration-300 rounded-sm"
          />

          {/* EXIF Overlay Floating Box */}
          {showExif && (currentPhoto.exif_camera || currentPhoto.exif_lens) && (
            <div className="absolute bottom-4 left-4 bg-black/90 border border-dotpic-gold/40 p-4 rounded-sm text-xs backdrop-blur-md max-w-xs space-y-1.5 animate-in fade-in duration-200">
              <span className="text-[10px] uppercase tracking-widest text-dotpic-gold font-bold block mb-1">
                EXIF Metadata
              </span>
              {currentPhoto.exif_camera && (
                <div className="flex justify-between gap-4 text-dotpic-muted">
                  <span>Camera:</span>
                  <span className="text-white font-medium">{currentPhoto.exif_camera}</span>
                </div>
              )}
              {currentPhoto.exif_lens && (
                <div className="flex justify-between gap-4 text-dotpic-muted">
                  <span>Lens:</span>
                  <span className="text-white font-medium">{currentPhoto.exif_lens}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
                {currentPhoto.exif_aperture && (
                  <div className="bg-white/5 p-1 rounded">
                    <span className="text-[9px] text-dotpic-muted block">Aperture</span>
                    <span className="text-dotpic-gold font-mono">{currentPhoto.exif_aperture}</span>
                  </div>
                )}
                {currentPhoto.exif_shutter_speed && (
                  <div className="bg-white/5 p-1 rounded">
                    <span className="text-[9px] text-dotpic-muted block">Shutter</span>
                    <span className="text-dotpic-gold font-mono">{currentPhoto.exif_shutter_speed}</span>
                  </div>
                )}
                {currentPhoto.exif_iso && (
                  <div className="bg-white/5 p-1 rounded">
                    <span className="text-[9px] text-dotpic-muted block">ISO</span>
                    <span className="text-dotpic-gold font-mono">{currentPhoto.exif_iso}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Next Arrow */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 z-20 p-3 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-black/90 hover:scale-105 transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Caption */}
      <div className="px-6 py-3 border-t border-white/10 bg-black/60 backdrop-blur-md">
        {currentPhoto.caption && (
          <p className="text-xs text-center text-dotpic-muted max-w-xl mx-auto mb-3 truncate">
            {currentPhoto.caption}
          </p>
        )}

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-2xl mx-auto">
            {photos.map((p, idx) => (
              <button
                key={p.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-12 h-12 rounded-sm overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-dotpic-gold scale-105 opacity-100'
                    : 'border-transparent opacity-40 hover:opacity-80'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              >
                <img
                  src={p.thumbnail_url || p.url}
                  alt={p.title || `Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
