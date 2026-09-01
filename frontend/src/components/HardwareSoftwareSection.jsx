import React, { useRef, useState, useEffect } from 'react';
import Reveal from './Reveal';

const HW_ITEMS = ['Robotics', 'IoT & Embedded', 'Smart Devices', 'Automation', 'Drones', 'PCB Design'];
const SW_ITEMS = ['Web & Mobile Apps', 'AI / ML', 'Cloud Computing', 'Cybersecurity', 'Blockchain', 'FinTech'];

function SideReveal({ children, from }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0)'
          : `translateX(${from === 'left' ? '-80px' : '80px'})`,
        transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  );
}

export default function HardwareSoftwareSection() {
  return (
    <section
      id="challenge"
      className="relative py-20 sm:py-32 px-4 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Dark scrim */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(5,8,22,0.78)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <Reveal className="text-center mb-14" delay={0}>
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase mb-3">
            // THE CHALLENGE
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              background: 'linear-gradient(90deg, #ffffff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.04em',
            }}
          >
            BUILD WHAT MATTERS
          </h2>
          <div className="w-32 h-0.5 mx-auto mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #00D9FF)' }} />
        </Reveal>

        {/* Split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-center">

          {/* HARDWARE */}
          <SideReveal from="left">
            <div
              className="rounded-2xl p-6 sm:p-10 border border-violet-500/25 shimmer-card"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(11,16,38,0.8))',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="mb-6">
                <span
                  className="font-bebas block"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                    lineHeight: 0.88,
                    color: '#A855F7',
                    filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.6))',
                    letterSpacing: '0.04em',
                  }}
                >
                  HARD
                </span>
                <span
                  className="font-bebas block"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                    lineHeight: 0.88,
                    color: '#A855F7',
                    filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.6))',
                    letterSpacing: '0.04em',
                  }}
                >
                  WARE
                </span>
              </div>

              <ul className="space-y-2.5">
                {HW_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 shadow-[0_0_6px_#A855F7]" />
                    <span className="font-spaceGrotesk font-medium text-slate-200 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SideReveal>

          {/* Center connector — NEXORA × */}
          <Reveal className="flex flex-col items-center justify-center py-8 lg:py-0" delay={200}>
            <div className="flex flex-col items-center gap-4">
              {/* Vertical line top */}
              <div className="hidden lg:block w-px h-20 bg-gradient-to-b from-transparent to-violet-500/50" />

              <div
                className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,217,255,0.3))',
                  boxShadow: '0 0 40px rgba(124,58,237,0.3), 0 0 80px rgba(0,217,255,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  className="font-bebas text-white"
                  style={{ fontSize: '2rem', letterSpacing: '0.05em' }}
                >
                  ×
                </span>
              </div>

              <span
                className="font-bebas text-center"
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.75rem)',
                  letterSpacing: '0.12em',
                  background: 'linear-gradient(90deg, #A855F7, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NEXORA
              </span>

              {/* Vertical line bottom */}
              <div className="hidden lg:block w-px h-20 bg-gradient-to-t from-transparent to-cyan-400/50" />
            </div>
          </Reveal>

          {/* SOFTWARE */}
          <SideReveal from="right">
            <div
              className="rounded-2xl p-6 sm:p-10 border border-cyan-400/25 shimmer-card"
              style={{
                background: 'linear-gradient(225deg, rgba(0,217,255,0.12), rgba(11,16,38,0.8))',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="mb-6">
                <span
                  className="font-bebas block"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                    lineHeight: 0.88,
                    color: '#00D9FF',
                    filter: 'drop-shadow(0 0 30px rgba(0,217,255,0.6))',
                    letterSpacing: '0.04em',
                  }}
                >
                  SOFT
                </span>
                <span
                  className="font-bebas block"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                    lineHeight: 0.88,
                    color: '#00D9FF',
                    filter: 'drop-shadow(0 0 30px rgba(0,217,255,0.6))',
                    letterSpacing: '0.04em',
                  }}
                >
                  WARE
                </span>
              </div>

              <ul className="space-y-2.5">
                {SW_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_6px_#00D9FF]" />
                    <span className="font-spaceGrotesk font-medium text-slate-200 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SideReveal>
        </div>

        {/* Bottom tagline */}
        <Reveal className="text-center mt-16" delay={400}>
          <p
            className="font-bebas tracking-[0.15em]"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
              background: 'linear-gradient(90deg, #A855F7, #ffffff, #00D9FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            HARDWARE MEETS SOFTWARE. IDEAS MEET REALITY.
          </p>
        </Reveal>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050816, transparent)' }}
      />
    </section>
  );
}
