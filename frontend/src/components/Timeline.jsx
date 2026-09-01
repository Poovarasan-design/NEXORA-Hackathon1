import React from 'react';
import { Calendar, Flag, Rocket } from 'lucide-react';
import Reveal from './Reveal';

export default function Timeline() {
  const events = [
    {
      date: "25th September 2026",
      title: "HACKATHON STARTS",
      badge: "DAY 01",
      description: "Check-in, Opening Ceremony, Problem Statement Alignment & 30-Hour Hacking Launch.",
      icon: Rocket,
      glow: "border-neonPurple shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      badgeBg: "bg-neonPurple text-white"
    },
    {
      date: "26th September 2026",
      title: "HACKATHON ENDS",
      badge: "DAY 02",
      description: "Project Submission Deadline, Final Evaluation Pitch & Valedictory Ceremony.",
      icon: Flag,
      glow: "border-neonCyan shadow-[0_0_20px_rgba(6,182,212,0.3)]",
      badgeBg: "bg-neonCyan text-darkBg"
    }
  ];

  return (
    <section id="timeline" className="relative py-24 px-4 bg-cyber-grid border-t border-neonPurple/10">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        <Reveal delay={80} className="text-center space-y-3">
          <span className="font-orbitron text-xs font-bold tracking-widest text-neonCyan uppercase">
            // OFFICIAL SCHEDULE
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wide">
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-neonCyan">TIMELINE</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">
            30 Hours Non-Stop Innovation & Prototyping Schedule
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neonPurple to-neonCyan mx-auto rounded-full shadow-[0_0_10px_#a855f7]" />
        </Reveal>

        {/* Timeline cards without connector line on desktop */}
        <div className="relative pt-6 md:overflow-visible">
          
          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute top-6 bottom-6 left-6 w-1 bg-gradient-to-b from-neonPurple via-neonCyan to-neonPurple shadow-[0_0_10px_#06b6d4] z-0 pointer-events-none opacity-90" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {events.map((event, index) => {
              const Icon = event.icon;
              return (
                <Reveal
                  key={index}
                  delay={index * 140}
                  as="div"
                  className="relative z-10 flex md:flex-col items-start md:items-center text-left md:text-center pl-14 md:pl-0"
                >
                  <div className={`absolute left-3 md:left-auto md:relative mb-4 w-12 h-12 rounded-full bg-navyBg border-2 ${event.glow} flex items-center justify-center text-white z-30 shadow-[0_0_18px_rgba(6,182,212,0.2)]`}>
                    <Icon className="w-5 h-5 text-neonCyan" />
                  </div>

                  <div className="relative z-20 w-full p-6 rounded-2xl bg-navyBg/90 border border-cyberBorder backdrop-blur-xl shadow-glass-card hover:border-neonCyan transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-orbitron font-bold tracking-widest ${event.badgeBg}`}>
                        {event.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-neonCyan font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </div>
                    </div>
                    <h3 className="font-orbitron font-extrabold text-xl text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
