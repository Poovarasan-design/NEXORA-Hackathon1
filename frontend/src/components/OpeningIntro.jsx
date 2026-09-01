import React, { useState, useEffect } from 'react';

export default function OpeningIntro({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 1000);  // 1.0s: Reveal Futuristic NEXORA Wordmark
    const t2 = setTimeout(() => setStage(2), 2500);  // 2.5s: Reveal Tagline
    const t3 = setTimeout(() => setStage(3), 3500);  // 3.5s: Reveal Subtitle
    const t4 = setTimeout(() => setStage(4), 4500);  // 4.5s: Fade out
    const t5 = setTimeout(() => onComplete(), 5000); // 5.0s: Finish intro

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage(4);
    setTimeout(() => onComplete(), 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-darkBg flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        stage === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cyber Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neonPurple/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neonCyan/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-full bg-navyBg/80 border border-cyberBorder text-slate-300 hover:text-white hover:border-neonCyan text-xs font-orbitron font-medium tracking-widest backdrop-blur-md transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
      >
        SKIP INTRO ➔
      </button>

      {/* Intro Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 flex flex-col items-center justify-center">
        
        {/* Stage 1+: NEXORA Futuristic Wordmark */}
        <div 
          className={`transition-all duration-1000 ease-out transform ${
            stage >= 1 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          <h1 className="font-orbitron font-black text-6xl sm:text-8xl lg:text-9xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]">
            NEXORA
          </h1>
        </div>

        {/* Stage 2+: Tagline "CODE. INNOVATE. ELEVATE." */}
        <div 
          className={`transition-all duration-700 ease-out transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-orbitron font-bold text-lg sm:text-2xl lg:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neonPurple via-neonCyan to-neonBlue drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            CODE. INNOVATE. ELEVATE.
          </p>
        </div>

        {/* Stage 3+: Subtitle "A 30-HOUR HACKATHON FOR HARDWARE & SOFTWARE" */}
        <div 
          className={`transition-all duration-700 ease-out transform ${
            stage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <div className="inline-block px-5 py-2 rounded-xl bg-navyBg/90 border border-cyberBorder backdrop-blur-md shadow-glass-card">
            <p className="font-orbitron font-semibold text-xs sm:text-sm text-slate-200 tracking-wider">
              A 30-HOUR HACKATHON FOR HARDWARE & SOFTWARE
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
