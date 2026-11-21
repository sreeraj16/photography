import { useState } from 'react';
import { HeroSection } from '../features/home/HeroSection';
import { IntroSection } from '../features/home/IntroSection';
import { ServicesGrid } from '../features/home/ServicesGrid';
import { PortfolioPreview } from '../features/home/PortfolioPreview';
import { CampusStoriesPreview } from '../features/home/CampusStoriesPreview';
import { VisualStorytelling } from '../features/home/VisualStorytelling';
import { HorizontalScroll } from '../features/home/HorizontalScroll';
import { BeforeAfterSection } from '../features/home/BeforeAfterSection';
import { WhyChooseUs } from '../features/home/WhyChooseUs';
import { BTSReels } from '../features/home/BTSReels';
import { TestimonialsSection } from '../features/home/TestimonialsSection';
import { PackagesPreview } from '../features/home/PackagesPreview';
import { SocialShowcase } from '../features/home/SocialShowcase';
import { CTASection } from '../features/home/CTASection';
import { CinematicPreloader } from '../components/common/CinematicPreloader';
import { dataStore } from '../lib/dataStore';

export function HomePage() {
  const content = dataStore.getHomepageContent();
  const visibility = content.section_visibility || {};

  return (
    <>
      <CinematicPreloader />
      <main id="main-content">
        <HeroSection
          headline={content.hero_headline}
          subheadline={content.hero_subheadline}
          mediaUrl={content.hero_media_url}
          showreelUrl={content.showreel_youtube_url}
        />
        {visibility.intro !== false && <IntroSection />}
        {visibility.services !== false && <ServicesGrid />}
        {visibility.portfolio !== false && <PortfolioPreview />}
        {visibility.campus !== false && <CampusStoriesPreview />}
        {visibility.horizontal !== false && <VisualStorytelling />}
        {visibility.horizontal !== false && <HorizontalScroll />}
        {visibility.beforeAfter !== false && <BeforeAfterSection />}
        {visibility.whyChoose !== false && <WhyChooseUs />}
        {visibility.bts !== false && <BTSReels />}
        {visibility.testimonials !== false && <TestimonialsSection />}
        {visibility.packages !== false && <PackagesPreview />}
        {visibility.instagram !== false && <SocialShowcase />}
        {visibility.cta !== false && <CTASection />}
      </main>
    </>
  );
}
