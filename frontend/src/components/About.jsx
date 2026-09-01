import React from 'react';
import { ShieldCheck, MapPin, Users, Laptop } from 'lucide-react';
import Reveal from './Reveal';

const INFO_CARDS = [
  {
    icon: MapPin,
    label: 'VENUE',
    value: 'Kamarajar Open Auditorium',
    sub: 'NSCET Campus, Theni',
    borderColor: 'rgba(168,85,247,0.35)',
    glowColor: 'rgba(168,85,247,0.15)',
    textColor: '#A855F7',
  },
  {
    icon: Users,
    label: 'TEAM SIZE',
    value: '5 – 6 Members',
    sub: 'Individual participation not allowed',
    borderColor: 'rgba(0,217,255,0.35)',
    glowColor: 'rgba(0,217,255,0.12)',
    textColor: '#00D9FF',
  },
  {
    icon: Laptop,
    label: 'BRING',
    value: 'Laptop + Ideas',
    sub: 'Passion is mandatory',
    borderColor: 'rgba(59,130,246,0.35)',
    glowColor: 'rgba(59,130,246,0.12)',
    textColor: '#3B82F6',
  },
  {
    icon: ShieldCheck,
    label: 'RECOGNITION',
    value: '₹50,000+ Prizes',
    sub: 'Internship Opportunities',
    borderColor: 'rgba(245,158,11,0.35)',
    glowColor: 'rgba(245,158,11,0.12)',
    textColor: '#F59E0B',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden" style={{ background: 'transparent' }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-violet-600/6 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* Section header */}
        <Reveal delay={0} className="text-center space-y-4">
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase">
            // DISCOVER THE EVENT
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #ffffff, #A855F7, #00D9FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ABOUT NEXORA
          </h2>
          <div className="w-28 h-0.5 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #00D9FF)' }} />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main description */}
          <Reveal as="div" delay={80} className="lg:col-span-7">
            <div
              className="rounded-2xl p-7 sm:p-10 shimmer-card"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10), rgba(11,16,38,0.85))',
                border: '1px solid rgba(124,58,237,0.25)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3
                className="font-bebas mb-5"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  letterSpacing: '0.04em',
                  color: '#00D9FF',
                  filter: 'drop-shadow(0 0 15px rgba(0,217,255,0.4))',
                }}
              >
                A 30-Hour National Level Hackathon
              </h3>
              <p className="font-spaceGrotesk text-slate-300 leading-relaxed mb-4" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                Organized by <strong className="text-white">Nadar Saraswathi College of Engineering &amp; Technology (NSCET)</strong>, NEXORA brings together visionary student innovators, engineers, and creators for an intense 30-hour non-stop innovation marathon.
              </p>
              <p className="font-spaceGrotesk text-slate-300 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1rem)' }}>
                Whether your passion lies in software development, IoT systems, robotics, AI, or hardware prototyping, NEXORA provides the ultimate platform to transform ground-breaking ideas into practical high-impact solutions.
              </p>

              {/* Tags */}
              <div className="pt-6 flex flex-wrap gap-2.5">
                {['Hardware & Software Tracks', '16 Domain Arenas', 'Expert Mentorship', 'National Level'].map((tag) => (
                  <span
                    key={tag}
                    className="font-spaceGrotesk font-medium text-xs px-3.5 py-1.5 rounded-full"
                    style={{
                      border: '1px solid rgba(124,58,237,0.35)',
                      background: 'rgba(124,58,237,0.10)',
                      color: '#A855F7',
                    }}
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Info cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFO_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.label} as="div" delay={120 + idx * 60}>
                  <div
                    className="p-5 rounded-2xl shimmer-card h-full transition-all duration-300"
                    style={{
                      border: `1px solid ${card.borderColor}`,
                      background: `radial-gradient(ellipse at top left, ${card.glowColor}, rgba(11,16,38,0.85))`,
                      backdropFilter: 'blur(16px)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 8px 30px ${card.glowColor.replace('0.12', '0.3')}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: card.glowColor, border: `1px solid ${card.borderColor}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.textColor }} />
                    </div>
                    <p className="font-orbitron font-bold text-[10px] tracking-widest mb-1.5 text-slate-400">{card.label}</p>
                    <p className="font-bebas text-white" style={{ fontSize: '1.25rem', letterSpacing: '0.03em', color: card.textColor }}>{card.value}</p>
                    <p className="font-spaceGrotesk text-[11px] text-slate-400 mt-0.5">{card.sub}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Eligibility banner */}
        <Reveal delay={300} className="text-center">
          <div
            className="inline-block rounded-2xl px-8 sm:px-14 py-6 sm:py-8"
            style={{
              border: '1px solid rgba(0,217,255,0.2)',
              background: 'linear-gradient(135deg, rgba(0,217,255,0.05), rgba(124,58,237,0.05))',
              backdropFilter: 'blur(16px)',
            }}
          >
            <p className="font-orbitron text-[10px] tracking-[0.4em] text-slate-500 uppercase mb-3">WHO CAN PARTICIPATE</p>
            <p className="font-spaceGrotesk text-slate-300 text-sm sm:text-base mb-4">
              B.E · B.Tech · M.E · M.C.A · Diploma · Arts &amp; Science — <span className="text-white font-semibold">All Disciplines Welcome</span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <div
                className="px-6 py-2 rounded-full font-bebas text-2xl sm:text-4xl tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,217,255,0.35)',
                  color: '#00D9FF',
                  filter: 'drop-shadow(0 0 15px rgba(0,217,255,0.4))',
                }}
              >
                5 – 6 MEMBERS
              </div>
              <span className="font-spaceGrotesk text-xs text-slate-400">per team · teams only</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
