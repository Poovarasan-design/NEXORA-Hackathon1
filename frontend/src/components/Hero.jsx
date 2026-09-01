import React from 'react';
import { ArrowRight, Sparkles, Cpu } from 'lucide-react';
import Countdown from './Countdown';
import RotatingRing from './RotatingRing';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScfdQVjDfli7rOIy_emt-gt-sn2rsiDwxNblI9JB2shRTrMwg/viewform';

export default function Hero() {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden bg-cyber-grid">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-neonPurple/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-neonCyan/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Rotating Ring (NO PLANETS / NO JUPITER) */}
      <RotatingRing />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        
        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navyBg/80 border border-neonPurple/40 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.25)]">
          <Sparkles className="w-4 h-4 text-neonCyan" />
          <span className="font-orbitron font-medium text-xs tracking-widest text-slate-200 uppercase">
            WELCOME TO
          </span>
        </div>

        {/* College Identity Banner */}
        <div className="space-y-2 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <img 
              src="/assets/college_logo.webp" 
              alt="NSCET Logo" 
              className="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]"
            />
          </div>
          <h2 className="font-orbitron font-extrabold text-sm sm:text-base lg:text-lg text-neonCyan tracking-widest uppercase">
            Nadar Saraswathi College of Engineering & Technology
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 font-mono tracking-tight max-w-xl mx-auto">
            Approved by AICTE, New Delhi | Affiliated to Anna University | NAAC "A" Grade | An ISO 9001:2015 Certified Institution
          </p>
        </div>

        {/* Futuristic NEXORA Wordmark (Exact same style as Intro) */}
        <div className="py-2 flex flex-col items-center justify-center">
          <h1 className="group relative inline-block overflow-hidden font-orbitron font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.08em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]">
            <span className="relative z-10">NEXORA</span>
            <span className="pointer-events-none absolute inset-y-0 left-[-30%] w-[45%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/20 via-white/35 to-transparent translate-x-[-220%] opacity-80 group-hover:opacity-100 transition-transform duration-[1400ms] ease-in-out infinite" />
          </h1>
          
          <div className="mt-3 flex items-center justify-center gap-2 text-neonPurple">
            <Cpu className="w-5 h-5 text-neonCyan animate-pulse" />
            <p className="font-orbitron font-bold text-lg sm:text-2xl lg:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neonPurple via-neonCyan to-neonBlue">
              CODE. INNOVATE. ELEVATE.
            </p>
          </div>
        </div>

        {/* Event Subtitle Badge */}
        <div className="inline-block px-6 py-2.5 rounded-xl bg-navyBg/90 border border-cyberBorder backdrop-blur-md shadow-glass-card">
          <p className="font-orbitron font-semibold text-xs sm:text-sm lg:text-base text-slate-200 tracking-wider">
            A 30-HOUR HACKATHON FOR HARDWARE & SOFTWARE
          </p>
        </div>

        {/* Real JS Countdown Timer */}
        <Countdown />

        {/* STRICT REQUIREMENT: ONLY ONE REGISTER NOW BUTTON ON LANDING PAGE */}
        <div className="pt-4 flex flex-col items-center">
          <button
            onClick={() => window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-orbitron font-bold text-base sm:text-lg text-white bg-gradient-to-r from-neonPurple via-indigo-600 to-neonCyan shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          >
            <span className="relative z-10 tracking-widest">REGISTER NOW</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
            
            {/* Ambient pulse effect behind button */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-neonPurple to-neonCyan opacity-50 blur-lg group-hover:opacity-100 transition-opacity" />
          </button>
          
          <span className="mt-3 text-xs text-slate-400 font-mono">
            * Limited Team Spots Available • Registration Open
          </span>
        </div>

      </div>
    </section>
  );
}
