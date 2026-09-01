import React from 'react';
import { Target, Users, Cpu, Trophy, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScfdQVjDfli7rOIy_emt-gt-sn2rsiDwxNblI9JB2shRTrMwg/viewform';

export default function Highlights() {
  return (
    <section id="highlights" className="relative overflow-hidden py-24 px-4" style={{ background: 'transparent' }}>

      {/* ── PRIZE CLIMAX ────────────────────────────────── */}
      <div
        className="relative py-20 sm:py-28 px-4 mb-20 rounded-3xl overflow-hidden mx-auto max-w-5xl"
        style={{
          background: 'linear-gradient(135deg, #0a0601, #120c00, #0a0601)',
          border: '1px solid rgba(245,158,11,0.25)',
        }}
      >
        {/* Gold ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-500/12 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-yellow-400/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange-500/8 blur-[80px]" />
        </div>

        {/* Gold particle dots */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 10% 20%, rgba(245,158,11,0.6), transparent),' +
              'radial-gradient(1.5px 1.5px at 30% 70%, rgba(252,211,77,0.5), transparent),' +
              'radial-gradient(1px 1px at 60% 30%, rgba(245,158,11,0.55), transparent),' +
              'radial-gradient(1.2px 1.2px at 80% 60%, rgba(252,211,77,0.5), transparent),' +
              'radial-gradient(1px 1px at 50% 85%, rgba(245,158,11,0.5), transparent)',
            backgroundSize: '300px 300px',
          }}
        />

        <div className="relative z-10 text-center space-y-6">
          <Reveal delay={0}>
            <p className="font-orbitron text-[10px] tracking-[0.4em] text-amber-400/60 uppercase">
              // PRIZE POOL
            </p>
          </Reveal>

          {/* ₹50,000 number */}
          <Reveal delay={100}>
            <div className="relative inline-block">
              <span
                className="font-bebas block"
                style={{
                  fontSize: 'clamp(5rem, 22vw, 18rem)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(180deg, #FCD34D 0%, #F59E0B 40%, #D97706 80%, #92400E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 50px rgba(245,158,11,0.6)) drop-shadow(0 0 100px rgba(245,158,11,0.3))',
                }}
              >
                ₹50,000
              </span>
              {/* Glow orb behind number */}
              <div className="absolute inset-0 -z-10 blur-[80px] rounded-full bg-amber-400/20 scale-150 pointer-events-none" />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="font-bebas tracking-widest"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                color: '#FCD34D',
                filter: 'drop-shadow(0 0 15px rgba(252,211,77,0.5))',
                letterSpacing: '0.12em',
              }}
            >
              EXCITING PRIZES
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
              <span className="font-orbitron text-xs text-amber-300/60 tracking-widest">PLUS</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div
              className="inline-block px-8 py-3 rounded-full"
              style={{
                border: '1px solid rgba(245,158,11,0.4)',
                background: 'rgba(245,158,11,0.10)',
              }}
            >
              <p
                className="font-bebas tracking-widest"
                style={{
                  fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                  color: '#F59E0B',
                  letterSpacing: '0.14em',
                }}
              >
                INTERNSHIP OPPORTUNITIES
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── WHY PARTICIPATE CARDS ────────────────────── */}
      <div className="max-w-6xl mx-auto">
        <Reveal delay={0} className="text-center mb-12 space-y-4">
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase">
            // WHY PARTICIPATE
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(2rem, 7vw, 5rem)',
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #ffffff, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EVENT HIGHLIGHTS
          </h2>
          <div className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #00D9FF)' }} />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Target, title: 'Solve Real-World Problems',
              desc: 'Address impactful challenges across 16 specialized domains with cutting-edge engineering solutions.',
              accent: '#A855F7', border: 'rgba(168,85,247,0.3)', bg: 'rgba(168,85,247,0.08)',
            },
            {
              icon: Users, title: 'Collaborate With Bright Minds',
              desc: 'Network and build with passionate student innovators from top institutions across the country.',
              accent: '#00D9FF', border: 'rgba(0,217,255,0.3)', bg: 'rgba(0,217,255,0.06)',
            },
            {
              icon: Cpu, title: 'Build Innovative Solutions',
              desc: 'Bring hardware models and software prototypes to life in a 30-hour non-stop hacking environment.',
              accent: '#3B82F6', border: 'rgba(59,130,246,0.3)', bg: 'rgba(59,130,246,0.06)',
            },
            {
              icon: Trophy, title: 'Win Prizes & Recognition',
              desc: 'Showcase to expert evaluators and earn national recognition for technological excellence.',
              accent: '#F59E0B', border: 'rgba(245,158,11,0.35)', bg: 'rgba(245,158,11,0.08)',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 80} as="div">
                <div
                  className="p-6 rounded-2xl h-full shimmer-card transition-all duration-300"
                  style={{
                    border: `1px solid ${item.border}`,
                    background: `radial-gradient(ellipse at top, ${item.bg}, rgba(11,16,38,0.8))`,
                    backdropFilter: 'blur(16px)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                    <Icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-base mb-3">{item.title}</h3>
                  <p className="font-spaceGrotesk text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Registration fee callout */}
        <Reveal delay={400} className="mt-14">
          <div
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,217,255,0.08))',
              border: '1px solid rgba(124,58,237,0.25)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="text-center sm:text-left">
              <p className="font-orbitron text-[10px] tracking-widest text-slate-400 uppercase mb-2">Registration Fee</p>
              <div className="flex items-baseline gap-3 justify-center sm:justify-start">
                <span
                  className="font-bebas"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    color: '#00D9FF',
                    filter: 'drop-shadow(0 0 20px rgba(0,217,255,0.5))',
                    letterSpacing: '0.02em',
                  }}
                >
                  ₹499
                </span>
                <span className="font-spaceGrotesk text-slate-300 text-sm">per person</span>
              </div>
              <p className="font-spaceGrotesk text-slate-400 text-xs mt-1">Includes Refreshments &amp; Free Food</p>
              <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="text-xs font-mono text-slate-400 px-2 py-1 rounded border border-white/10 bg-white/5">5 members → ₹2,495</span>
                <span className="text-xs font-mono text-slate-400 px-2 py-1 rounded border border-white/10 bg-white/5">6 members → ₹2,994</span>
              </div>
            </div>

            <button
              onClick={() => window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')}
              className="group inline-flex items-center gap-2 font-orbitron font-bold text-white whitespace-nowrap relative overflow-hidden"
              style={{
                padding: '1rem 2.25rem',
                borderRadius: '0.875rem',
                background: 'linear-gradient(135deg, #7C3AED, #4f46e5)',
                boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                border: '1px solid rgba(168,85,247,0.3)',
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(0,217,255,0.5)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.4)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              REGISTER NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
