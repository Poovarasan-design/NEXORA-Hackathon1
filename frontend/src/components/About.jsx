import React from 'react';
import { ShieldCheck, MapPin, Users, Laptop } from 'lucide-react';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 bg-darkBg border-t border-neonPurple/10">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neonPurple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        <Reveal delay={80} className="text-center space-y-3">
          <span className="font-orbitron text-xs font-bold tracking-widest text-neonCyan uppercase">
            // DISCOVER THE EVENT
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wide">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-neonCyan">NEXORA</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonPurple to-neonCyan mx-auto rounded-full shadow-[0_0_10px_#a855f7]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <Reveal as="div" delay={120} className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-navyBg/70 border border-cyberBorder backdrop-blur-xl shadow-glass-card space-y-5">
            <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-neonCyan">
              A 30-Hour National Level Hackathon for Hardware & Software
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Organized by <strong className="text-white">Nadar Saraswathi College of Engineering & Technology (NSCET)</strong>, NEXORA brings together visionary student innovators, engineers, and creators for an intense 30-hour non-stop innovation marathon.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether your passion lies in software development, IoT systems, robotics, AI, or hardware prototyping, NEXORA provides the ultimate platform to transform ground-breaking ideas into practical high-impact solutions.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-neonPurple/10 border border-neonPurple/30 text-neonPurple">
                ✦ Hardware & Software Tracks
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-neonCyan/10 border border-neonCyan/30 text-neonCyan">
                ✦ 16 Domain Arenas
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                ✦ Expert Mentorship
              </span>
            </div>
          </Reveal>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Reveal as="div" delay={170} className="p-5 rounded-xl bg-navyBg/80 border border-neonPurple/30 hover:border-neonPurple transition-all duration-300 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-neonPurple/20 flex items-center justify-center text-neonPurple">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-orbitron font-semibold text-sm text-white">VENUE</h4>
              <p className="text-xs text-slate-300">To Be Announced (Stay Tuned!)</p>
              <p className="text-[10px] text-slate-400 font-mono">NSCET Campus, Theni</p>
            </Reveal>

            <Reveal as="div" delay={220} className="p-5 rounded-xl bg-navyBg/80 border border-neonCyan/30 hover:border-neonCyan transition-all duration-300 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-neonCyan/20 flex items-center justify-center text-neonCyan">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-orbitron font-semibold text-sm text-white">TEAM SIZE</h4>
              <p className="text-xs text-slate-300">2 – 6 Members</p>
              <p className="text-[10px] text-slate-400 font-mono">Per Team Registration</p>
            </Reveal>

            <Reveal as="div" delay={270} className="p-5 rounded-xl bg-navyBg/80 border border-neonBlue/30 hover:border-neonBlue transition-all duration-300 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-neonBlue/20 flex items-center justify-center text-neonBlue">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-orbitron font-semibold text-sm text-white">REQUIREMENTS</h4>
              <p className="text-xs text-slate-300">Bring Your Laptop,</p>
              <p className="text-[10px] text-slate-400 font-mono">Ideas & Passion!</p>
            </Reveal>

            <Reveal as="div" delay={320} className="p-5 rounded-xl bg-navyBg/80 border border-neonPink/30 hover:border-neonPink transition-all duration-300 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-neonPink/20 flex items-center justify-center text-neonPink">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-orbitron font-semibold text-sm text-white">RECOGNITION</h4>
              <p className="text-xs text-slate-300">Exciting Prizes &</p>
              <p className="text-[10px] text-slate-400 font-mono">Certificates for Best Minds</p>
            </Reveal>

          </div>

        </div>

      </div>
    </section>
  );
}
