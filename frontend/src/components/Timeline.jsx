import React from 'react';
import Reveal from './Reveal';

const TIMELINE_EVENTS = [
  {
    day: 'DAY 01',
    date: '25 SEPTEMBER 2026',
    title: 'HACKATHON BEGINS',
    events: ['Check-In & Registration', 'Opening Ceremony', 'Problem Statement Reveal', '30-Hour Clock Starts'],
    color: '#A855F7',
    border: 'rgba(168,85,247,0.4)',
    glow: 'rgba(168,85,247,0.25)',
    dotColor: '#A855F7',
  },
  {
    day: 'DAY 02',
    date: '26 SEPTEMBER 2026',
    title: 'HACKATHON ENDS',
    events: ['Final Submission Deadline', 'Judging & Evaluation', 'Project Pitches', 'Winners Announced'],
    color: '#00D9FF',
    border: 'rgba(0,217,255,0.4)',
    glow: 'rgba(0,217,255,0.2)',
    dotColor: '#00D9FF',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 px-4 overflow-hidden" style={{ background: 'transparent' }}>
      {/* Semi-transparent dark scrim for readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(5,8,22,0.80)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <Reveal className="text-center mb-16 space-y-4" delay={0}>
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase">
            // OFFICIAL SCHEDULE
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
            EVENT TIMELINE
          </h2>
          <p className="font-spaceGrotesk text-slate-400 text-sm">
            30 Hours Non-Stop Innovation &amp; Prototyping
          </p>
          <div className="w-28 h-0.5 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #00D9FF)' }} />
        </Reveal>

        {/* 30 HOURS display */}
        <Reveal delay={100} className="text-center mb-16">
          <div className="inline-block relative">
            <span
              className="font-bebas"
              style={{
                fontSize: 'clamp(4rem, 16vw, 12rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #A855F7, #00D9FF, #D946EF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.4))',
              }}
            >
              30 HOURS
            </span>
            <span
              className="font-bebas block text-center"
              style={{
                fontSize: 'clamp(1rem, 3vw, 2rem)',
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '-0.4em',
              }}
            >
              NON-STOP
            </span>
          </div>
        </Reveal>

        {/* Timeline cards */}
        <div className="relative">
          {/* Center line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(180deg, #7C3AED, #00D9FF, #D946EF)',
              boxShadow: '0 0 15px rgba(124,58,237,0.4)',
            }}
          />

          <div className="space-y-10 md:space-y-0">
            {TIMELINE_EVENTS.map((event, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150}
                as="div"
                className={`relative md:flex ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:mb-16`}
              >
                {/* Center dot */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white/20 items-center justify-center z-10"
                  style={{
                    background: event.dotColor,
                    boxShadow: `0 0 15px ${event.glow}, 0 0 30px ${event.glow}`,
                  }}
                />

                {/* Card */}
                <div
                  className={`md:w-[46%] rounded-2xl p-6 sm:p-8 shimmer-card`}
                  style={{
                    border: `1px solid ${event.border}`,
                    background: `linear-gradient(135deg, ${event.glow.replace('0.25', '0.10')}, rgba(11,16,38,0.9))`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 0 30px ${event.glow}`,
                  }}
                >
                  {/* Day badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="font-orbitron font-bold text-xs tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: event.color,
                        color: event.color === '#00D9FF' ? '#050816' : 'white',
                      }}
                    >
                      {event.day}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{event.date}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bebas mb-4"
                    style={{
                      fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                      letterSpacing: '0.04em',
                      color: event.color,
                      filter: `drop-shadow(0 0 15px ${event.glow})`,
                    }}
                  >
                    {event.title}
                  </h3>

                  {/* Sub-events */}
                  <ul className="space-y-2">
                    {event.events.map((ev, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: event.color, boxShadow: `0 0 6px ${event.color}` }}
                        />
                        <span className="font-spaceGrotesk text-slate-200 text-sm">{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Venue reveal */}
        <Reveal delay={400} className="mt-16">
          <div
            className="rounded-2xl p-8 sm:p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(217,70,239,0.08), rgba(11,16,38,0.9), rgba(0,217,255,0.06))',
              border: '1px solid rgba(217,70,239,0.2)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <p className="font-orbitron text-[10px] tracking-[0.4em] text-slate-500 uppercase mb-4">LOCATION</p>
            <h3
              className="font-bebas mb-2"
              style={{
                fontSize: 'clamp(2rem, 7vw, 5rem)',
                letterSpacing: '0.04em',
                background: 'linear-gradient(90deg, #D946EF, #ffffff, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              KAMARAJAR OPEN AUDITORIUM
            </h3>
            <p className="font-spaceGrotesk text-slate-400 text-sm">NSCET Campus · Theni, Tamil Nadu</p>

            {/* Map-style decorative lines */}
            <div className="mt-6 flex items-center justify-center gap-3 opacity-40">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-magenta" />
              <div className="w-2 h-2 rounded-full bg-magenta animate-ping" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-magenta" />
            </div>
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
