'use client';
import HeroSection from '../components/HeroSection';
import IdeaSection from '../components/IdeaSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToActionSection from '../components/CallToActionSection';

export default function HomePage() {

  return (
    <div>
      <HeroSection />
      <IdeaSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
}
