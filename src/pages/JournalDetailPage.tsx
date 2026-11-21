import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, User } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatDate } from '../lib/utils';
import { Button } from '../components/ui/Button';

export function JournalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = dataStore.getJournalPostBySlug(slug || '') || dataStore.getJournalPosts()[0];

  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-dotpic-muted hover:text-dotpic-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Post Metadata Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase font-mono tracking-widest text-dotpic-gold font-semibold block mb-3">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-dotpic-muted font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-dotpic-gold" />
              {post.author_name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-dotpic-gold" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-dotpic-gold" />
              {post.read_time}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-[16/9] rounded-sm overflow-hidden border border-dotpic-border mb-12 shadow-2xl">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-dotpic-muted leading-relaxed font-light space-y-6">
          <p className="text-base sm:text-lg text-white font-serif italic border-l-2 border-dotpic-gold pl-4 my-6">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-wrap space-y-4">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 mt-12 border-t border-dotpic-border flex flex-wrap items-center gap-2">
            <span className="text-xs text-dotpic-muted">Tagged:</span>
            {post.tags.map(t => (
              <span key={t} className="px-2.5 py-1 rounded bg-dotpic-surface text-[10px] text-dotpic-gold font-mono">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Article Bottom Booking CTA */}
        <div className="mt-16 p-8 rounded-sm bg-dotpic-charcoal border border-dotpic-gold/30 text-center">
          <h3 className="text-2xl font-serif text-white mb-2">Planning Your Shoot?</h3>
          <p className="text-xs text-dotpic-muted mb-6">
            Consult directly with our creative team on WhatsApp for customized packages.
          </p>
          <Link to="/book">
            <Button variant="gold" size="md" withShutterSound>
              Book Your Slot Now
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
