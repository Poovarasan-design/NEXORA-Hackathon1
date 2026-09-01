import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Reveal from './Reveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
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
      a: "Teams can consist of 2 to 6 members. Individual participants must form or join a team of at least 2 members."
    },
    {
      q: "Who can participate in NEXORA?",
      a: "Students from engineering, polytechnic, and technology institutions are eligible to register and participate."
    },
    {
      q: "What should teams bring to the hackathon?",
      a: "Participants must bring their own laptops, extension cords, hardware components/sensors required for their projects, software development setups, and valid college ID cards."
    },
    {
      q: "How many themes/tracks can a team choose?",
      a: "Teams must select exactly ONE theme out of the 16 official NEXORA tracks during team registration."
    }
  ];

  return (
    <section id="faq" className="relative py-24 px-4 bg-cyber-grid border-t border-neonPurple/10">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        <Reveal delay={80} className="text-center space-y-3">
          <span className="font-orbitron text-xs font-bold tracking-widest text-neonCyan uppercase">
            // FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wide">
            HACKATHON <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-neonCyan">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonPurple to-neonCyan mx-auto rounded-full shadow-[0_0_10px_#a855f7]" />
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 80} as="div" className="rounded-2xl bg-navyBg/80 border border-cyberBorder overflow-hidden transition-all duration-300 shadow-glass-card">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left font-orbitron font-bold text-sm sm:text-base text-white hover:text-neonCyan transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-neonPurple flex-shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-neonCyan transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-sans animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
