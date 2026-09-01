import React, { useState, useEffect, useRef } from 'react';

const LETTERS = ['N', 'E', 'X', 'O', 'R', 'A'];

export default function OpeningIntro({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  /* ─── Particle Canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const count = window.innerWidth < 768 ? 60 : 140;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.6
        ? `rgba(168,85,247,${Math.random() * 0.6 + 0.3})`
        : Math.random() > 0.5
          ? `rgba(0,217,255,${Math.random() * 0.6 + 0.3})`
          : `rgba(255,255,255,${Math.random() * 0.5 + 0.2})`,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particlesRef.current.forEach(p => {
        // drift toward center gently
        p.vx += (cx - p.x) * 0.0001;
        p.vy += (cy - p.y) * 0.0001;
        p.x += p.vx;
        p.y += p.vy;

        // wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Energy lines near center
      particlesRef.current.forEach(p => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(168,85,247,${0.04 * (1 - dist / 200)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ─── Staging Timeline ─── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { onComplete(); return; }

    const timers = [];

    // Letter by letter reveal
    LETTERS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLetters(i + 1), 400 + i * 200));
    });

    // Stage transitions
    timers.push(setTimeout(() => setStage(1), 400 + LETTERS.length * 200 + 200));  // tagline
    timers.push(setTimeout(() => setStage(2), 400 + LETTERS.length * 200 + 1000)); // subtitle
    timers.push(setTimeout(() => setStage(3), 400 + LETTERS.length * 200 + 2000)); // glow peak
    timers.push(setTimeout(() => setExiting(true), 400 + LETTERS.length * 200 + 3000));
    timers.push(setTimeout(() => onComplete(), 400 + LETTERS.length * 200 + 3800));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => onComplete(), 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transition-all duration-700 ease-in-out ${
        exiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ background: '#030610' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Cyber grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          zIndex: 1,
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
          zIndex: 2,
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[160px] pointer-events-none animate-pulse-glow" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/15 blur-[140px] pointer-events-none animate-pulse-glow" style={{ zIndex: 1, animationDelay: '1.5s' }} />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-5 py-2 rounded-full bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400/50 text-[11px] font-orbitron font-medium tracking-widest backdrop-blur-md transition-all duration-300"
      >
        SKIP ⟶
      </button>

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 space-y-8">

        {/* Decorative top line */}
        <div className="flex items-center gap-3 opacity-50">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500" />
          <span className="text-violet-400 font-orbitron text-[9px] tracking-[0.3em]">NSCET</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500" />
        </div>

        {/* NEXORA letter-by-letter */}
        <div className="flex items-center justify-center">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(4.5rem, 16vw, 14rem)',
                lineHeight: 0.9,
                letterSpacing: '0.05em',
                display: 'inline-block',
                opacity: visibleLetters > i ? 1 : 0,
                transform: visibleLetters > i ? 'translateY(0) scale(1)' : 'translateY(-30px) scale(1.2)',
                filter: visibleLetters > i ? 'blur(0)' : 'blur(8px)',
                transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease`,
                transitionDelay: `${i * 0.02}s`,
                background: stage >= 3
                  ? 'linear-gradient(180deg, #ffffff, #a855f7 60%, #06b6d4)'
                  : 'linear-gradient(180deg, #ffffff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                willChange: 'transform, opacity, filter',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Glow bar under logo */}
        <div
          style={{
            height: '3px',
            width: visibleLetters >= 6 ? '320px' : '0px',
            background: 'linear-gradient(90deg, transparent, #7C3AED, #00D9FF, #D946EF, transparent)',
            transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: '0 0 20px rgba(0,217,255,0.5)',
            borderRadius: '2px',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <p
            className="font-orbitron font-bold tracking-[0.25em] uppercase"
            style={{
              fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)',
              background: 'linear-gradient(90deg, #A855F7, #00D9FF, #D946EF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THINK. CODE. INNOVATE. REPEAT.
          </p>
        </div>

        {/* Subtitle badge */}
        <div
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <p className="font-orbitron font-semibold text-slate-200 tracking-wider"
              style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}>
              A 30-HOUR HACKATHON — HARDWARE &amp; SOFTWARE — 25–26 SEP 2026
            </p>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
          <span className="text-cyan-400 font-orbitron text-[9px] tracking-[0.3em]">NEXORA 2026</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
      </div>
    </div>
  );
}
