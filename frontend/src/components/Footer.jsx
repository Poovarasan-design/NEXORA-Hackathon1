import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Youtube, Instagram, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScfdQVjDfli7rOIy_emt-gt-sn2rsiDwxNblI9JB2shRTrMwg/viewform';

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: 'transparent' }}>

      {/* ── FINAL CTA CLIMAX ──────────────────────────────── */}
      <div className="relative py-24 sm:py-36 px-4 overflow-hidden">
        {/* Subtle dark gradient scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(5,8,22,0.7) 0%, rgba(3,6,16,0.92) 80%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">

          <Reveal delay={0}>
            <p className="font-orbitron text-[10px] tracking-[0.4em] text-violet-400/60 uppercase">
              // ARE YOU READY
            </p>
          </Reveal>

          {/* "READY TO BUILD THE FUTURE?" */}
          <Reveal delay={80}>
            <h2
              className="font-bebas"
              style={{
                fontSize: 'clamp(3rem, 14vw, 11rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
                background: 'linear-gradient(180deg, #ffffff 0%, #c4b5fd 40%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.5))',
              }}
            >
              READY TO BUILD<br />THE FUTURE?
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <div className="space-y-1">
              <p
                className="font-bebas tracking-widest"
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                  background: 'linear-gradient(90deg, #A855F7, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.08em',
                }}
              >
                NEXORA 2026
              </p>
              <p className="font-spaceGrotesk text-slate-400 text-sm">
                30-Hour Hardware &amp; Software Hackathon · 25–26 September 2026
              </p>
            </div>
          </Reveal>

          {/* Prize badges */}
          <Reveal delay={260}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div
                className="px-5 py-2 rounded-full font-bebas tracking-widest"
                style={{
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(245,158,11,0.4)',
                  background: 'rgba(245,158,11,0.10)',
                  color: '#F59E0B',
                  filter: 'drop-shadow(0 0 15px rgba(245,158,11,0.3))',
                }}
              >
                ₹50,000 PRIZES
              </div>
              <span className="text-slate-500 font-orbitron text-xs">+</span>
              <div
                className="px-5 py-2 rounded-full font-orbitron font-bold text-xs tracking-widest"
                style={{
                  border: '1px solid rgba(0,217,255,0.3)',
                  background: 'rgba(0,217,255,0.08)',
                  color: '#00D9FF',
                }}
              >
                INTERNSHIP OPPORTUNITIES
              </div>
            </div>
          </Reveal>

          {/* REGISTER NOW button */}
          <Reveal delay={340}>
            <div className="pt-4">
              <button
                onClick={() => window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')}
                className="group relative inline-flex items-center gap-3 font-orbitron font-bold text-white overflow-hidden"
                style={{
                  padding: 'clamp(1rem, 2.5vw, 1.4rem) clamp(2.5rem, 6vw, 4.5rem)',
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                  letterSpacing: '0.16em',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #7C3AED, #4f46e5, #00D9FF)',
                  boxShadow: '0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.15)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 80px rgba(0,217,255,0.6), 0 0 160px rgba(124,58,237,0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.15)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <span className="relative z-10 tracking-widest">REGISTER NOW</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </Reveal>

          {/* Closing mantra */}
          <Reveal delay={440}>
            <div className="pt-4">
              <p
                className="font-bebas tracking-[0.2em]"
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                  background: 'linear-gradient(90deg, #A855F7 0%, #00D9FF 33%, #D946EF 66%, #F59E0B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                THINK. CODE. INNOVATE. REPEAT.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FOOTER INFO ───────────────────────────────────── */}
      <div
        className="relative border-t px-4 pt-12 pb-8"
        style={{ borderColor: 'rgba(124,58,237,0.15)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

            {/* Col 1: Identity */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/college_logo.webp"
                  alt="NSCET Logo"
                  className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
                <img
                  src="/assets/kamarajar_logo.webp"
                  alt="Kamarajar Emblem"
                  className="h-10 w-auto object-contain rounded-full border border-cyan-400/30"
                />
              </div>

              <div>
                <h3
                  className="font-bebas text-4xl text-white tracking-wider"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.5))', letterSpacing: '0.06em' }}
                >
                  NEXORA
                </h3>
                <p className="font-orbitron text-[9px] text-cyan-400 tracking-[0.25em] uppercase mt-1">
                  30-Hour Hackathon — Hardware &amp; Software
                </p>
              </div>

              <p className="font-spaceGrotesk text-slate-400 text-xs leading-relaxed max-w-sm">
                Nadar Saraswathi College of Engineering &amp; Technology (NSCET),
                Vadapudupatti, Annanji (P.O.), Theni, Tamil Nadu.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn', hover: '#0EA5E9' },
                  { href: 'https://youtube.com',  icon: Youtube,  label: 'YouTube',  hover: '#EF4444' },
                  { href: 'https://instagram.com',icon: Instagram, label: 'Instagram',hover: '#EC4899' },
                ].map(({ href, icon: Icon, label, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300"
                    onMouseEnter={e => {
                      e.currentTarget.style.color = hover;
                      e.currentTarget.style.borderColor = hover;
                      e.currentTarget.style.boxShadow = `0 0 15px ${hover}55`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#cbd5e1';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="md:col-span-3 space-y-3">
              <h4
                className="font-orbitron font-bold text-xs text-white tracking-wider pl-3"
                style={{ borderLeft: '2px solid #7C3AED' }}
              >
                NAVIGATION
              </h4>
              <ul className="space-y-2 text-xs font-spaceGrotesk">
                {['Home', 'About', 'Themes', 'Timeline', 'Highlights', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-violet-500" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="md:col-span-4 space-y-4">
              <h4
                className="font-orbitron font-bold text-xs text-white tracking-wider pl-3"
                style={{ borderLeft: '2px solid #00D9FF' }}
              >
                OFFICIAL CONTACT
              </h4>

              <div className="space-y-3 text-xs font-spaceGrotesk">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">NSCET</strong>,<br />
                    Postbox No: 60, Annanji (P.O.),<br />
                    Vadapudupatti, Theni – 625531
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <p className="text-slate-300 font-mono">04546-263900, 901, 902</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href="mailto:principal@nscet.org" className="text-cyan-400 font-mono hover:underline">
                    principal@nscet.org
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-[11px] font-mono text-slate-500"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p>© 2026 NEXORA — Nadar Saraswathi College of Engineering &amp; Technology. All rights reserved.</p>
            <p
              className="font-bebas tracking-widest"
              style={{
                fontSize: '0.875rem',
                background: 'linear-gradient(90deg, #A855F7, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              THINK. CODE. INNOVATE. REPEAT.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
