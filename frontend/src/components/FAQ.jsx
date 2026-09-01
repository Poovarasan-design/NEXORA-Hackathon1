import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const FAQS = [
  {
    q: "What is NEXORA?",
    a: "NEXORA is a 30-hour national level hackathon for hardware and software conducted by Nadar Saraswathi College of Engineering & Technology (NSCET), Theni. It aims to empower student innovators to solve real-world technical problems."
  },
  {
    q: "When does the hackathon take place?",
    a: "NEXORA begins on 25th September 2026 and concludes on 26th September 2026. Hacking runs continuously for 30 non-stop hours."
  },
  {
    q: "What is the eligible team size?",
    a: "Teams must consist of 5 to 6 members. Individual participation is NOT allowed. Each participant must be part of a registered team."
  },
  {
    q: "Who can participate in NEXORA?",
    a: "Students from B.E, B.Tech, M.E, M.C.A, Diploma, Arts & Science disciplines — from all branches and departments — are eligible to register and participate."
  },
  {
    q: "What should teams bring to the hackathon?",
    a: "Participants must bring their own laptops, extension cords, hardware components/sensors required for their projects, software development setups, and valid college ID cards."
  },
  {
    q: "How many themes/tracks can a team choose?",
    a: "Teams must select exactly ONE theme out of the 16 official NEXORA tracks during team registration."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 px-4 overflow-hidden" style={{ background: 'transparent' }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/6 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <Reveal delay={0} className="text-center mb-12 space-y-4">
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase">
            // FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #ffffff, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            HACKATHON FAQ
          </h2>
          <div className="w-24 h-0.5 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #00D9FF)' }} />
        </Reveal>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 60} as="div">
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-400"
                  style={{
                    border: isOpen
                      ? '1px solid rgba(0,217,255,0.35)'
                      : '1px solid rgba(124,58,237,0.18)',
                    background: isOpen
                      ? 'linear-gradient(135deg, rgba(0,217,255,0.06), rgba(11,16,38,0.95))'
                      : 'rgba(11,16,38,0.70)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: isOpen ? '0 0 30px rgba(0,217,255,0.08)' : 'none',
                  }}
                >
                  {/* Question button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-bebas text-lg flex-shrink-0 w-8"
                        style={{
                          color: isOpen ? '#00D9FF' : 'rgba(168,85,247,0.5)',
                          lineHeight: 1,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-spaceGrotesk font-semibold text-sm sm:text-base transition-colors"
                        style={{ color: isOpen ? '#ffffff' : '#cbd5e1' }}
                      >
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 transition-all duration-300"
                      style={{
                        color: isOpen ? '#00D9FF' : '#64748b',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {/* Answer */}
                  <div
                    style={{
                      maxHeight: isOpen ? '300px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <div
                      className="px-5 pb-5 pt-0"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <p className="font-spaceGrotesk text-slate-300 text-sm leading-relaxed pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050816, transparent)' }}
      />
    </section>
  );
}
