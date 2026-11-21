import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowUpRight, Search } from 'lucide-react';
import { dataStore } from '../lib/dataStore';
import { formatDate } from '../lib/utils';
import { TiltCard } from '../components/ui/TiltCard';

export function JournalPage() {
  const posts = dataStore.getJournalPosts().filter(p => p.is_published);
  const [search, setSearch] = useState('');

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] dark:bg-[#080C0E] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-[10px] uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold block mb-2">
          CHRONICLES & ADVICE
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white font-light tracking-tight max-w-3xl mx-auto mb-4">
          The DOTPIC Journal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Behind-the-scenes shoot breakdowns, lighting tutorials, styling advice, and campus festival archives.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-8 relative">
          <Search className="w-4 h-4 text-dotpic-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shoot stories & guides..."
            className="w-full bg-dotpic-charcoal border border-dotpic-border pl-10 pr-4 py-2.5 rounded-sm text-xs text-white placeholder:text-dotpic-muted/50 focus:outline-none focus:border-dotpic-gold"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <TiltCard
              key={post.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-2xl overflow-hidden bg-dotpic-charcoal border border-dotpic-border/80 flex flex-col justify-between hover:border-dotpic-gold/60 transition-all shadow-xl group"
            >
              <Link to={`/journal/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 px-3 py-1 rounded-full text-[10px] font-mono text-dotpic-gold border border-dotpic-gold/40 uppercase backdrop-blur-md font-bold">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-dotpic-muted font-mono mb-2">
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-dotpic-gold">
                      <Clock className="w-3 h-3 text-dotpic-gold" />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-white group-hover:text-dotpic-gold transition-colors mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-dotpic-muted line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </Link>

              <div className="p-4 bg-dotpic-surface/60 border-t border-dotpic-border flex items-center justify-between text-xs text-dotpic-gold font-semibold">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
