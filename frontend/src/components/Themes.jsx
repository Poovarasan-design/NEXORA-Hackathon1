import React, { useState } from 'react';
import { 
  Sprout, 
  Car, 
  Truck, 
  Bot, 
  Leaf, 
  Compass, 
  Zap, 
  ShieldCheck, 
  GraduationCap, 
  Coins, 
  Cpu, 
  Activity, 
  Rocket, 
  Landmark, 
  HeartPulse, 
  Lightbulb,
  RotateCw,
  Sparkles
} from 'lucide-react';
import Reveal from './Reveal';

export const THEMES_LIST = [
  { 
    id: '01', 
    title: 'Agriculture, Foodtech & Rural Development', 
    icon: Sprout, 
    color: 'from-emerald-500/20 to-green-500/10', 
    border: 'hover:border-emerald-500', 
    text: 'text-emerald-400',
    description: 'Developing solutions,keeping in mind the need to enhance the primary sector of India-Agriculture and to manage and process our agriculture produce.' 
  },
  { 
    id: '02', 
    title: 'Smart Vehicles', 
    icon: Car, 
    color: 'from-blue-500/20 to-indigo-500/10', 
    border: 'hover:border-blue-500', 
    text: 'text-blue-400',
    description: 'Creating intelligent devices to improve commutation sector.' 
  },
  { 
    id: '03', 
    title: 'Transportation & Logistics', 
    icon: Truck, 
    color: 'from-amber-500/20 to-orange-500/10', 
    border: 'hover:border-amber-500', 
    text: 'text-amber-400',
    description: 'Submit your ideas to address the growing pressures on the city’s resources, transport networks, and logistic infrastructure.' 
  },
  { 
    id: '04', 
    title: 'Robotics and Drones', 
    icon: Bot, 
    color: 'from-cyan-500/20 to-teal-500/10', 
    border: 'hover:border-cyan-500', 
    text: 'text-cyan-400',
    description: 'There is a need to design drones and robots that can solve some of the pressing challenges of India such as handling medical emergencies, search and rescue operations ,etc.,' 
  },
  { 
    id: '05', 
    title: 'Clean & Green Technology', 
    icon: Leaf, 
    color: 'from-green-500/20 to-emerald-500/10', 
    border: 'hover:border-green-500', 
    text: 'text-green-400',
    description: 'Solutions could be in the form of waste segregation, disposal, and improve sanitization system.' 
  },
  { 
    id: '06', 
    title: 'Tourism', 
    icon: Compass, 
    color: 'from-purple-500/20 to-violet-500/10', 
    border: 'hover:border-purple-500', 
    text: 'text-purple-400',
    description: 'A Solution/idea that can boost the current situation of the tourism industries including hotels,travel and others.' 
  },
  { 
    id: '07', 
    title: 'Renewable / Sustainable Energy', 
    icon: Zap, 
    color: 'from-yellow-500/20 to-amber-500/10', 
    border: 'hover:border-yellow-500', 
    text: 'text-yellow-400',
    description: 'Innovative ideas that help manage and generate renewable/sustainable sources more efficiently.' 
  },
  { 
    id: '08', 
    title: 'Blockchain & Cybersecurity', 
    icon: ShieldCheck, 
    color: 'from-indigo-500/20 to-blue-500/10', 
    border: 'hover:border-indigo-500', 
    text: 'text-indigo-400',
    description: 'Provide ideas in a decentralized and distributed ledger technology used to store digital information that powers cryptocurrencies and NFTs and can radically change multiple sectors.' 
  },
  { 
    id: '09', 
    title: 'Smart Education', 
    icon: GraduationCap, 
    color: 'from-sky-500/20 to-blue-500/10', 
    border: 'hover:border-sky-500', 
    text: 'text-sky-400',
    description: 'Smart education a concept that describes learning in digital age. It enables learners to learn more effectively, efficiently, flexibly and comfortably.' 
  },
  { 
    id: '10', 
    title: 'FinTech', 
    icon: Coins, 
    color: 'from-teal-500/20 to-emerald-500/10', 
    border: 'hover:border-teal-500', 
    text: 'text-teal-400',
    description: 'Challenges related to the financial services.' 
  },
  { 
    id: '11', 
    title: 'Smart Automation', 
    icon: Cpu, 
    color: 'from-violet-500/20 to-fuchsia-500/10', 
    border: 'hover:border-violet-500', 
    text: 'text-violet-400',
    description: 'Ideas focused on the intelligent use of resources for transforming and advancements of technology with combining the artificial intelligence to explore more various sources and get valuable insights.' 
  },
  { 
    id: '12', 
    title: 'Fitness & Sports', 
    icon: Activity, 
    color: 'from-rose-500/20 to-pink-500/10', 
    border: 'hover:border-rose-500', 
    text: 'text-rose-400',
    description: 'Ideas that can boost fitness activities and assist in keeping fit.' 
  },
  { 
    id: '13', 
    title: 'Space Technology', 
    icon: Rocket, 
    color: 'from-fuchsia-500/20 to-purple-500/10', 
    border: 'hover:border-fuchsia-500', 
    text: 'text-fuchsia-400',
    description: 'For use in travel or activities beyond Earths atmosphere, for purposes such as spaceflight or space exploration.' 
  },
  { 
    id: '14', 
    title: 'Heritage & Culture', 
    icon: Landmark, 
    color: 'from-orange-500/20 to-amber-500/10', 
    border: 'hover:border-orange-500', 
    text: 'text-orange-400',
    description: 'Ideas that showcase the rich cultural heritage and traditions of India.' 
  },
  { 
    id: '15', 
    title: 'MedTech / BioTech / HealthTech', 
    icon: HeartPulse, 
    color: 'from-pink-500/20 to-rose-500/10', 
    border: 'hover:border-pink-500', 
    text: 'text-pink-400',
    description: 'Cutting edge technology in these sectors continues to be in demand. Recent shifts in healthcare trends, growing populations also present an array of opportunities for innovation.' 
  },
  { 
    id: '16', 
    title: 'Open Innovation', 
    icon: Lightbulb, 
    color: 'from-cyan-500/20 to-blue-500/10', 
    border: 'hover:border-neonCyan', 
    text: 'text-neonCyan',
    description: 'If your idea is unique and does not exactly fit into the other categories, you can submit it under Open Innovation.' 
  },
];

export default function Themes() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="themes" className="relative py-24 px-4 bg-cyber-grid border-t border-neonPurple/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-neonCyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-neonPurple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        <Reveal delay={80} className="text-center space-y-3">
          <span className="font-orbitron text-xs font-bold tracking-widest text-neonCyan uppercase">
            // HACKATHON DOMAINS
          </span>
          <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            CHOOSE YOUR ARENA — <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple via-neonCyan to-white">16 THEMES, ENDLESS POSSIBILITIES</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-neonCyan inline animate-pulse" />
            <span>Click or tap any track card to reveal its official challenge description</span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neonPurple to-neonCyan mx-auto rounded-full shadow-[0_0_10px_#a855f7]" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {THEMES_LIST.map((theme, idx) => {
            const Icon = theme.icon;
            const isFlipped = !!flippedCards[theme.id];

            return (
              <Reveal key={theme.id} delay={idx * 50} className="h-full min-h-[278px]">
                <div className="theme-card-shell perspective-1000 h-full min-h-[278px] w-full">
                  <div
                    onClick={() => toggleFlip(theme.id)}
                    className={`group relative w-full h-full transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-style-3d cursor-pointer rounded-2xl ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    <div className={`theme-face theme-front absolute inset-0 backface-hidden p-5 sm:p-6 rounded-2xl bg-navyBg/90 border border-neonPurple/25 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 overflow-hidden ${theme.border}`}>
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
                        <div className="absolute inset-y-0 left-[-30%] w-[45%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/20 via-white/35 to-transparent translate-x-[-180%] group-hover:translate-x-[330%] transition-transform duration-700 ease-out" />
                      </div>

                      <div className="flex items-center justify-between relative z-10 gap-3">
                        <span className={`font-orbitron font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-md bg-white/5 border border-white/10 ${theme.text}`}>
                          TRACK {theme.id}
                        </span>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${theme.color} border border-white/10 shadow-inner shrink-0`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.text}`} />
                        </div>
                      </div>

                      <div className="relative z-10 flex-1 flex items-center py-2">
                        <h3 className="font-orbitron font-bold text-base sm:text-lg text-white leading-snug tracking-[0.02em] line-clamp-4">
                          {theme.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 border-t border-white/5 pt-3 relative z-10">
                        <span className="text-neonCyan flex items-center gap-1">
                          <RotateCw className="w-3 h-3" /> Tap to view details
                        </span>
                        <span className="text-white/20">3D FLIP ✦</span>
                      </div>
                    </div>

                    <div className={`theme-face theme-back absolute inset-0 backface-hidden rotate-y-180 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-navyBg via-slate-900 to-navyBg border border-neonCyan/60 backdrop-blur-2xl flex flex-col justify-between ${theme.border}`}>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-orbitron font-extrabold text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-neonCyan">
                          TRACK {theme.id} // DETAILS
                        </span>
                        <div className="p-1.5 rounded-lg bg-neonCyan/20 text-neonCyan">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="my-auto py-2">
                        <p className="text-[11px] sm:text-xs text-slate-200 font-sans leading-relaxed tracking-[0.01em] [text-wrap:balance]">
                          {theme.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2">
                        <span className="text-neonPurple font-semibold flex items-center gap-1">
                          <RotateCw className="w-3 h-3" /> Click to flip back
                        </span>
                        <span className="text-neonCyan font-bold">NEXORA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
