import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Download, QrCode as QrIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface QRCodeModalProps {
  eventTitle: string;
  collegeName: string;
  eventUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({
  eventTitle,
  collegeName,
  eventUrl,
  isOpen,
  onClose
}: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (!isOpen || !eventUrl) return;

    QRCode.toDataURL(
      eventUrl,
      {
        width: 600,
        margin: 2,
        color: {
          dark: '#0A0A0A',
          light: '#F5F3EE',
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [isOpen, eventUrl]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `DOTPIC-QR-${eventTitle.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
    link.click();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="bg-dotpic-charcoal border border-dotpic-gold/50 rounded-sm max-w-md w-full p-6 sm:p-8 relative text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-dotpic-gold/10 border border-dotpic-gold/30 text-dotpic-gold flex items-center justify-center mx-auto mb-3">
          <QrIcon className="w-6 h-6" />
        </div>

        <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold block mb-1">
          OFFICIAL CAMPUS FEST QR
        </span>
        <h3 className="text-xl font-serif text-white mb-1">
          {eventTitle}
        </h3>
        <p className="text-xs text-dotpic-muted mb-6">
          {collegeName}
        </p>

        {/* QR Code Poster Preview */}
        <div className="p-4 bg-white rounded-sm inline-block shadow-xl mb-6">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code for ${eventTitle}`}
              className="w-48 h-48 object-contain"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-xs text-black">
              Generating QR...
            </div>
          )}
          <span className="text-[9px] uppercase tracking-widest font-mono text-black font-bold block mt-2 text-center">
            SCAN FOR STUDENT PORTRAITS
          </span>
        </div>

        <p className="text-[11px] text-dotpic-muted mb-6 leading-relaxed">
          High-resolution 600px PNG format ready for stage banners, identity badges, and college Instagram stories.
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={handleDownload}
            icon={<Download className="w-4 h-4 text-dotpic-black" />}
          >
            Download Print-Ready PNG
          </Button>
        </div>
      </div>
    </div>
  );
}
