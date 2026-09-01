import React from 'react';
import { Target, Users, Cpu, Trophy } from 'lucide-react';
import Reveal from './Reveal';

export default function Highlights() {
  const highlights = [
    {
      icon: Target,
      title: "Solve Real-World Problems",
      description: "Address impactful industry and societal challenges with cutting-edge engineering solutions across 16 specialized domains.",
      glow: "hover:border-neonPurple hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      iconBg: "bg-neonPurple/20 text-neonPurple"
    },
    {
      icon: Users,
      title: "Collaborate With Bright Minds",
      description: "Network, brainstorm, and build side-by-side with passionate student innovators, developers, and makers from top institutions.",
      glow: "hover:border-neonCyan hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
      iconBg: "bg-neonCyan/20 text-neonCyan"
    },
    {
      icon: Cpu,
      title: "Build Innovative Solutions",
      description: "Bring hardware models and software prototypes to life in a intense 30-hour non-stop hacking environment.",
      glow: "hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
      iconBg: "bg-blue-500/20 text-blue-400"
    },
    {
      icon: Trophy,
      title: "Win Exciting Prizes & Recognition",
      description: "Showcase your project to expert domain evaluators and gain national recognition for technological excellence.",
      glow: "hover:border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]",
      iconBg: "bg-pink-500/20 text-pink-400"
    }
  ];

  return (
    <section id="highlights" className="relative py-20 px-4 bg-darkBg border-t border-neonPurple/10">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        <Reveal delay={80} className="text-center space-y-3">
          <span className="font-orbitron text-xs font-bold tracking-widest text-neonCyan uppercase">
            // WHY PARTICIPATE
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wide">
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-neonCyan">HIGHLIGHTS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonPurple to-neonCyan mx-auto rounded-full shadow-[0_0_10px_#a855f7]" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 90} as="div" className={`p-6 rounded-2xl bg-navyBg/80 border border-cyberBorder backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${item.glow}`}>
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-5 shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
