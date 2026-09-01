import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ThinkCodeSection from '../components/ThinkCodeSection';
import HardwareSoftwareSection from '../components/HardwareSoftwareSection';
import About from '../components/About';
import Themes from '../components/Themes';
import Highlights from '../components/Highlights';
import Timeline from '../components/Timeline';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import OpeningIntro from '../components/OpeningIntro';

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(() => {
    // Play intro once per session
    const hasSeenIntro = sessionStorage.getItem('nexora_intro_seen');
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('nexora_intro_seen', 'true');
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative overflow-x-hidden bg-transparent">
      {/* Cinematic Opening Intro — shown once per session */}
      {showIntro && <OpeningIntro onComplete={handleIntroComplete} />}

      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero — NEXORA grand entrance */}
        <Hero />

        {/* 2. THINK → CODE → INNOVATE → REPEAT — philosophy statement */}
        <ThinkCodeSection />

        {/* 3. About — what is NEXORA, eligibility */}
        <About />

        {/* 4. Hardware × Software — the challenge */}
        <HardwareSoftwareSection />

        {/* 5. Themes — 16 innovation tracks */}
        <Themes />

        {/* 6. Highlights — ₹50,000 prize climax + why participate */}
        <Highlights />

        {/* 7. Timeline — event schedule + venue */}
        <Timeline />

        {/* 8. FAQ */}
        <FAQ />
      </main>

      {/* Footer with final CTA climax */}
      <Footer />
    </div>
  );
}
