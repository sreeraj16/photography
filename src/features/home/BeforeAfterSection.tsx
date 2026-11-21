import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';

export function BeforeAfterSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F1E8] dark:bg-[#0B1014] relative border-t border-b border-[#E4DCD0] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="text-2xl sm:text-3xl font-orbitron text-teal-600 dark:text-teal-400 font-bold">07</span>
            <div className="h-[2px] w-12 bg-teal-500/50" />
            <span className="text-xs uppercase font-orbitron tracking-[0.25em] text-teal-600 dark:text-teal-400 font-semibold">
              ARTISAN COLOR SCIENCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-100 font-light mt-1">
            The Retouching Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-3 leading-relaxed">
            Drag the teal divider to inspect our signature color science. We balance film-like skin tones with rich, non-destructive dynamic range.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
            afterImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
            beforeLabel="Flat Raw Capture"
            afterLabel="Signature DOTPIC Film Grade"
            className="aspect-[16/10] sm:aspect-cinema"
          />
        </div>

        {/* Retouching Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8 text-center text-xs text-slate-600 dark:text-slate-400">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 shadow-sm">
            <span className="text-teal-600 dark:text-teal-400 font-orbitron font-semibold block mb-1 uppercase tracking-wider">Natural Textures</span>
            Pores, eyelash depth and organic fabric details are strictly preserved—no plastic smoothing.
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 shadow-sm">
            <span className="text-teal-600 dark:text-teal-400 font-orbitron font-semibold block mb-1 uppercase tracking-wider">Film Emulation</span>
            Warm, subtle highlight rolloff inspired by Kodak Portra and Fuji 400H stocks.
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2DCD0] dark:border-slate-800 shadow-sm">
            <span className="text-teal-600 dark:text-teal-400 font-orbitron font-semibold block mb-1 uppercase tracking-wider">Shadow Depth</span>
            Inky, true blacks without muddy crush, preserving Nizami architectural details.
          </div>
        </div>
      </div>
    </section>
  );
}
