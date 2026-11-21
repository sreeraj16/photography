import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-dotpic-black relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Numeral 07 */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="text-3xl sm:text-4xl font-serif text-dotpic-gold font-light">07</span>
            <div className="h-[1px] w-12 bg-dotpic-gold/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-dotpic-gold font-semibold">
              ARTISAN COLOR SCIENCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-dotpic-white font-light mt-1">
            The Retouching Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-dotpic-muted font-light mt-3 leading-relaxed">
            Drag the gold divider to inspect our signature color science. We balance film-like skin tones with rich, non-destructive dynamic range.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto shadow-2xl">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
            afterImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
            beforeLabel="Flat Raw Capture"
            afterLabel="Signature DOTPIC Film Grade"
            className="aspect-[16/10] sm:aspect-cinema"
          />
        </div>

        {/* Retouching Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8 text-center text-xs text-dotpic-muted">
          <div className="p-4 rounded bg-dotpic-surface/60 border border-dotpic-border">
            <span className="text-dotpic-gold font-mono block mb-1 uppercase tracking-wider">Natural Textures</span>
            Pores, eyelash depth and organic fabric details are strictly preserved—no plastic smoothing.
          </div>
          <div className="p-4 rounded bg-dotpic-surface/60 border border-dotpic-border">
            <span className="text-dotpic-gold font-mono block mb-1 uppercase tracking-wider">Film Emulation</span>
            Warm, subtle highlight rolloff inspired by Kodak Portra and Fuji 400H stocks.
          </div>
          <div className="p-4 rounded bg-dotpic-surface/60 border border-dotpic-border">
            <span className="text-dotpic-gold font-mono block mb-1 uppercase tracking-wider">Shadow Depth</span>
            Inky, true blacks without muddy crush, preserving Nizami architectural details.
          </div>
        </div>
      </div>
    </section>
  );
}
