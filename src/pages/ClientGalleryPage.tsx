import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataStore } from '../lib/dataStore';
import { PINVerification } from '../features/client-gallery/PINVerification';
import { ClientGalleryView } from '../features/client-gallery/ClientGalleryView';
import { ClientGallery, ClientGalleryPhoto } from '../types/database.types';

export function ClientGalleryPage() {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<ClientGallery | undefined>(() => {
    if (id) return dataStore.getClientGallery(id);
    return dataStore.getClientGalleries()[0];
  });

  const [photos, setPhotos] = useState<ClientGalleryPhoto[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (id) {
      const g = dataStore.getClientGallery(id);
      setGallery(g);
    } else {
      setGallery(dataStore.getClientGalleries()[0]);
    }
  }, [id]);

  useEffect(() => {
    if (gallery && isUnlocked) {
      const p = dataStore.getClientGalleryPhotos(gallery.id);
      setPhotos(p);
    }
  }, [gallery, isUnlocked]);

  const handleVerify = (enteredPin: string): boolean => {
    if (!gallery) return false;
    const isValid = gallery.pin_hash === enteredPin;
    if (isValid) {
      setIsUnlocked(true);
    }
    return isValid;
  };

  if (!gallery) {
    return (
      <div className="min-h-screen bg-dotpic-black text-dotpic-white flex items-center justify-center pt-24 pb-20 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-serif text-white mb-2">Vault Not Found</h2>
          <p className="text-xs text-dotpic-muted">
            The private gallery link you requested does not exist or may have expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dotpic-black text-dotpic-white pt-24 pb-20">
      {isUnlocked ? (
        <ClientGalleryView gallery={gallery} photos={photos} />
      ) : (
        <PINVerification
          galleryTitle={gallery.title}
          clientName={gallery.client_name}
          onVerify={handleVerify}
        />
      )}
    </div>
  );
}
