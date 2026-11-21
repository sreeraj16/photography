import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { HomepageContent } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';

export function HomepageManager() {
  const [content, setContent] = useState<HomepageContent>(() => dataStore.getHomepageContent());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateHomepageContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleToggleSection = (sectionKey: string) => {
    setContent(prev => ({
      ...prev,
      section_visibility: {
        ...prev.section_visibility,
        [sectionKey]: !prev.section_visibility[sectionKey]
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">Homepage & Hero Configuration</h2>
          <p className="text-xs text-dotpic-muted">Update masked headlines, hero photography, stats counters, and toggle section visibility.</p>
        </div>

        <Button
          size="sm"
          variant="gold"
          onClick={handleSave}
          icon={saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5 text-dotpic-black" />}
        >
          {saved ? 'Saved Successfully!' : 'Save Homepage Changes'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section Card */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
            HERO BILLBOARD SECTION
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Masked Headline *</label>
              <Input
                required
                value={content.hero_headline}
                onChange={(e) => setContent({ ...content, hero_headline: e.target.value })}
                placeholder="CAPTURING MOMENTS. CREATING MEMORIES."
              />
            </div>

            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Subheadline / Tagline</label>
              <Input
                value={content.hero_subheadline}
                onChange={(e) => setContent({ ...content, hero_subheadline: e.target.value })}
                placeholder="Every Frame Tells a Story..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Hero Background Image/Video URL</label>
              <Input
                value={content.hero_media_url}
                onChange={(e) => setContent({ ...content, hero_media_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Showreel YouTube URL (Modal)</label>
              <Input
                value={content.showreel_youtube_url}
                onChange={(e) => setContent({ ...content, showreel_youtube_url: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>
        </div>

        {/* Stats Counters Card */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
            ANIMATED SOCIAL PROOF STATS COUNTERS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Events Shot</label>
              <Input
                type="number"
                value={content.stats_events_shot}
                onChange={(e) => setContent({ ...content, stats_events_shot: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Photos Delivered</label>
              <Input
                type="number"
                value={content.stats_photos_delivered}
                onChange={(e) => setContent({ ...content, stats_photos_delivered: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Colleges Covered</label>
              <Input
                type="number"
                value={content.stats_colleges_covered}
                onChange={(e) => setContent({ ...content, stats_colleges_covered: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-xs text-dotpic-muted block mb-1">Years Experience</label>
              <Input
                type="number"
                value={content.stats_years_experience}
                onChange={(e) => setContent({ ...content, stats_years_experience: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Section Visibility Toggles Card */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dotpic-gold font-semibold block">
            HOMEPAGE SECTION TOGGLES
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {Object.entries(content.section_visibility || {}).map(([key, isVisible]) => (
              <label
                key={key}
                className="flex items-center justify-between p-3 rounded bg-dotpic-surface border border-dotpic-border cursor-pointer hover:border-dotpic-gold/40"
              >
                <span className="capitalize text-white font-medium">{key}</span>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => handleToggleSection(key)}
                  className="accent-dotpic-gold w-4 h-4"
                />
              </label>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
