import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Calendar, ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../lib/constants';
import { dataStore } from '../lib/dataStore';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICE_CATEGORIES.find(s => s.slug === slug) || SERVICE_CATEGORIES[0];
  const relatedGalleries = dataStore.getGalleries().filter(g => g.category_slug === service.slug);

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-dotpic-muted hover:text-dotpic-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[16/9] sm:aspect-cinema rounded-sm overflow-hidden border border-dotpic-border shadow-2xl">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 max-w-2xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-2">
              SPECIALISED SERVICE
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-light mb-3">
              {service.name} Photography
            </h1>
            <p className="text-xs sm:text-sm text-dotpic-muted font-light leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Inclusions & Methodology */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-dotpic-charcoal p-8 sm:p-12 border border-dotpic-border rounded-sm">
          <div>
            <h3 className="text-2xl font-serif text-white mb-4">What Makes DOTPIC Different</h3>
            <p className="text-xs text-dotpic-muted leading-relaxed mb-4">
              We approach {service.name.toLowerCase()} photography not as a transactional assignment, but as a fine art collaboration. Every lighting setup, lens choice, and edit is planned to elevate your personal or institutional narrative.
            </p>
            <p className="text-xs text-dotpic-muted leading-relaxed">
              Equipped with prime focal lengths, dual-card memory backup, licensed cinema drones, and proprietary color grading curves.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-white mb-4">Signature Deliverables</h3>
            <ul className="space-y-3">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-xs text-dotpic-white">
                  <Check className="w-4 h-4 text-dotpic-gold flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-xs text-dotpic-white">
                <Check className="w-4 h-4 text-dotpic-gold flex-shrink-0" />
                <span>Private PIN-Protected Cloud Client Vault for 1 Year</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-dotpic-white">
                <Check className="w-4 h-4 text-dotpic-gold flex-shrink-0" />
                <span>48-Hour High-Resolution Instagram Reel Highlights Drop</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-dotpic-border">
              <Link to={`/book?category=${encodeURIComponent(service.name)}`}>
                <Button variant="gold" size="lg" className="w-full" withShutterSound>
                  Book {service.name} Shoot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Galleries */}
      {relatedGalleries.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="mb-8">
            <h3 className="text-2xl font-serif text-white">Related {service.name} Albums</h3>
            <p className="text-xs text-dotpic-muted">Browse real client sessions in this discipline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGalleries.map((gal) => (
              <TiltCard
                key={gal.id}
                maxTilt={6}
                scale={1.03}
                className="rounded-2xl overflow-hidden bg-dotpic-charcoal border border-dotpic-border/80 shadow-2xl group hover:border-dotpic-gold/60 transition-colors"
              >
                <Link to={`/portfolio/${gal.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={gal.cover_image_url}
                      alt={gal.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-serif text-white group-hover:text-dotpic-gold transition-colors truncate">
                      {gal.title}
                    </h4>
                    <p className="text-xs text-dotpic-muted mt-1 font-light">{gal.location}</p>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
