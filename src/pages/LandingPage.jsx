import React from 'react';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default LandingPage;