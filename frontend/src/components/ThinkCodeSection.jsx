import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const WORDS = [
  { word: 'THINK',     color: '#A855F7', glow: 'rgba(168,85,247,0.6)' },
  { word: 'CODE',      color: '#00D9FF', glow: 'rgba(0,217,255,0.6)'  },
  { word: 'INNOVATE',  color: '#D946EF', glow: 'rgba(217,70,239,0.6)' },
  { word: 'REPEAT',    color: '#F59E0B', glow: 'rgba(245,158,11,0.6)' },
];

function ManifestoWord({ word, color, glow, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setVisible(true); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-center py-4 sm:py-6 overflow-hidden"
      style={{
        justifyContent: isEven ? 'flex-start' : 'flex-end',
      }}
    >
      {/* Horizontal line accent */}
      <div
        className="absolute h-px"
        style={{
          background: `linear-gradient(${isEven ? '90deg' : '270deg'}, ${color}, transparent)`,
          width: visible ? '60%' : '0%',
          left: isEven ? 0 : 'auto',
          right: isEven ? 'auto' : 0,
          top: '50%',
          opacity: 0.4,
          transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
        }}
      />

      {/* Step number */}
      <span
        className="absolute font-bebas text-white/5"
        style={{
          fontSize: 'clamp(8rem, 25vw, 22rem)',
          lineHeight: 1,
          left: isEven ? 'auto' : '0',
          right: isEven ? '0' : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Word */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateY(0) scale(1)'
            : `translateY(${isEven ? 50 : -50}px) scale(0.85)`,
          transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
          paddingLeft: isEven ? 'clamp(1rem, 5vw, 6rem)' : '0',
          paddingRight: isEven ? '0' : 'clamp(1rem, 5vw, 6rem)',
        }}
      >
        <span
          className="font-bebas block"
          style={{
            fontSize: 'clamp(4rem, 18vw, 16rem)',
            lineHeight: 0.88,
            letterSpacing: '0.02em',
            color,
            filter: `drop-shadow(0 0 30px ${glow}) drop-shadow(0 0 60px ${glow.replace('0.6', '0.25')})`,
          }}
        >
          {word}
        </span>
      </div>
    </div>
  );
}

export default function ThinkCodeSection() {
  return (
    <section
      id="manifesto"
      className="relative py-12 sm:py-20 px-4 sm:px-8 overflow-hidden bg-cyber-grid"
      style={{ background: 'transparent' }}
    >
      {/* Dark scrim — semi-transparent so shader shows through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(5,8,22,0.82)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <Reveal className="text-center mb-8 sm:mb-16" delay={0}>
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase">
            // OUR PHILOSOPHY
          </p>
        </Reveal>

        {/* Words */}
        <div className="space-y-0">
          {WORDS.map(({ word, color, glow }, i) => (
            <ManifestoWord key={word} word={word} color={color} glow={glow} index={i} />
          ))}
        </div>

        {/* Final statement */}
        <Reveal className="text-center mt-12 sm:mt-20" delay={200}>
          <div className="inline-block px-8 py-4 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
            <p
              className="font-bebas tracking-[0.2em]"
              style={{
                fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
                background: 'linear-gradient(90deg, #A855F7, #00D9FF, #D946EF, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              THIS IS NEXORA.
            </p>
          </div>
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
