import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import Countdown from './Countdown';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScfdQVjDfli7rOIy_emt-gt-sn2rsiDwxNblI9JB2shRTrMwg/viewform';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);

    // Subtle content parallax on mouse — reduced from before
    const onMouseMove = (e) => {
      if (!parallaxRef.current || window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      parallaxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '4rem' }}
    >
      {/* Dark center scrim — ensures NEXORA is readable over shader */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(5,8,22,0.78) 0%, rgba(5,8,22,0.45) 55%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Subtle horizontal accent line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '50%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,217,255,0.08) 20%, rgba(124,58,237,0.12) 50%, rgba(0,217,255,0.08) 80%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Main hero content */}
      <div
        ref={parallaxRef}
        className="relative max-w-5xl mx-auto text-center px-4"
        style={{
          zIndex: 2,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      >
        {/* College identity — minimal, not heavy */}
        <div
          className="mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="/assets/college_logo.webp"
              alt="NSCET Logo"
              className="object-contain"
              style={{
                height: 'clamp(2.5rem, 4vw, 3.5rem)',
                filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.4))',
              }}
            />
            <div
              className="w-px self-stretch"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            />
            <img
              src="/assets/kamarajar_logo.webp"
              alt="Kamarajar Emblem"
              className="object-contain rounded-full"
              style={{
                height: 'clamp(2.5rem, 4vw, 3.5rem)',
                filter: 'drop-shadow(0 0 6px rgba(0,217,255,0.3))',
              }}
            />
          </div>
          <p
            className="font-orbitron font-bold text-cyan-400 tracking-widest uppercase"
            style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.8rem)', letterSpacing: '0.22em' }}
          >
            Nadar Saraswathi College of Engineering &amp; Technology
          </p>
        </div>

        {/* NEXORA — the centrepiece. Let it breathe. */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease 0.25s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.25s',
          }}
        >
          <h1
            className="font-bebas leading-none select-none"
            style={{
              fontSize: 'clamp(5.5rem, 22vw, 18rem)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(175deg, #ffffff 0%, #e2d9ff 30%, #A855F7 70%, #00D9FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 30px rgba(124,58,237,0.45))',
            }}
          >
            NEXORA
          </h1>

          {/* Horizontal divider with tagline — single clean line */}
          <div className="flex items-center justify-center gap-4 mt-2 mb-1">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(168,85,247,0.4)' }} />
            <span
              className="font-orbitron font-semibold tracking-widest text-slate-300"
              style={{ fontSize: 'clamp(0.6rem, 1.6vw, 0.85rem)', letterSpacing: '0.18em' }}
            >
              30-HOUR HARDWARE &amp; SOFTWARE HACKATHON
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(0,217,255,0.4)' }} />
          </div>
        </div>

        {/* Date + prize row — badges, but only 2, keep it tight */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-5"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.45s',
          }}
        >
          <span
            className="inline-flex items-center gap-2 font-orbitron font-semibold text-violet-300"
            style={{
              fontSize: 'clamp(0.6rem, 1.4vw, 0.75rem)',
              letterSpacing: '0.14em',
              padding: '0.4rem 1rem',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: '4px',
              background: 'rgba(124,58,237,0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
            25 – 26 SEPTEMBER 2026
          </span>
          <span
            className="font-bebas tracking-wider"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.4rem)',
              color: '#F59E0B',
              letterSpacing: '0.04em',
              filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.4))',
            }}
          >
            ₹50,000 PRIZES
          </span>
          <span
            className="font-mono text-slate-400"
            style={{ fontSize: 'clamp(0.6rem, 1.3vw, 0.72rem)' }}
          >
            TEAM: 5 – 6 MEMBERS
          </span>
        </div>

        {/* Countdown */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.6s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s',
          }}
        >
          <Countdown />
        </div>

        {/* CTA */}
        <div
          className="flex flex-col items-center gap-3 mt-4"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.8s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s',
          }}
        >
          <button
            onClick={() => window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')}
            className="group inline-flex items-center gap-3 font-orbitron font-bold text-white"
            style={{
              padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(2rem, 5vw, 3rem)',
              fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
              letterSpacing: '0.16em',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 60%, #0284c7 100%)',
              boxShadow: '0 0 32px rgba(109,40,217,0.45), 0 1px 0 rgba(255,255,255,0.08) inset',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'box-shadow 0.25s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 48px rgba(0,217,255,0.45), 0 1px 0 rgba(255,255,255,0.1) inset';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(109,40,217,0.45), 0 1px 0 rgba(255,255,255,0.08) inset';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ENTER NEXORA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="text-slate-500 font-mono" style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.68rem)' }}>
            ₹499 per person · refreshments &amp; food included
          </p>
        </div>
      </div>

      {/* Gradient fade at bottom — blends into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(5,8,22,0.95), transparent)',
          zIndex: 3,
        }}
      />
    </section>
  );
}
