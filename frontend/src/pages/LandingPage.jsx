import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
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
    <div className="min-h-screen bg-darkBg text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* 4-5 Second Opening Intro Animation */}
      {showIntro && <OpeningIntro onComplete={handleIntroComplete} />}

      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Themes />
        <Highlights />
        <Timeline />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
