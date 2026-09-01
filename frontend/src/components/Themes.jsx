import React, { useState } from 'react';
import {
  Sprout, Car, Truck, Bot, Leaf, Compass, Zap, ShieldCheck,
  GraduationCap, Coins, Cpu, Activity, Rocket, Landmark, HeartPulse, Lightbulb,
  RotateCw, Sparkles
} from 'lucide-react';
import Reveal from './Reveal';

export const THEMES_LIST = [
  { id: '01', title: 'Agriculture, Foodtech & Rural Development', icon: Sprout,      color: '#10B981', border: 'rgba(16,185,129,0.4)',  bg: 'rgba(16,185,129,0.08)',  description: 'Developing solutions, keeping in mind the need to enhance the primary sector of India—Agriculture and to manage and process our agriculture produce.' },
  { id: '02', title: 'Smart Vehicles',                            icon: Car,         color: '#3B82F6', border: 'rgba(59,130,246,0.4)',   bg: 'rgba(59,130,246,0.08)',  description: 'Creating intelligent devices to improve commutation sector.' },
  { id: '03', title: 'Transportation & Logistics',                icon: Truck,       color: '#F59E0B', border: 'rgba(245,158,11,0.4)',   bg: 'rgba(245,158,11,0.08)',  description: 'Submit your ideas to address the growing pressures on the city\'s resources, transport networks, and logistic infrastructure.' },
  { id: '04', title: 'Robotics and Drones',                      icon: Bot,         color: '#06B6D4', border: 'rgba(6,182,212,0.4)',    bg: 'rgba(6,182,212,0.08)',   description: 'There is a need to design drones and robots that can solve some of the pressing challenges of India such as handling medical emergencies, search and rescue operations.' },
  { id: '05', title: 'Clean & Green Technology',                 icon: Leaf,        color: '#22C55E', border: 'rgba(34,197,94,0.4)',    bg: 'rgba(34,197,94,0.08)',   description: 'Solutions could be in the form of waste segregation, disposal, and improve sanitization system.' },
  { id: '06', title: 'Tourism',                                  icon: Compass,     color: '#A855F7', border: 'rgba(168,85,247,0.4)',   bg: 'rgba(168,85,247,0.08)',  description: 'A Solution/idea that can boost the current situation of the tourism industries including hotels, travel and others.' },
  { id: '07', title: 'Renewable / Sustainable Energy',           icon: Zap,         color: '#EAB308', border: 'rgba(234,179,8,0.4)',    bg: 'rgba(234,179,8,0.08)',   description: 'Innovative ideas that help manage and generate renewable/sustainable sources more efficiently.' },
  { id: '08', title: 'Blockchain & Cybersecurity',               icon: ShieldCheck, color: '#6366F1', border: 'rgba(99,102,241,0.4)',   bg: 'rgba(99,102,241,0.08)',  description: 'Provide ideas in a decentralized and distributed ledger technology used to store digital information.' },
  { id: '09', title: 'Smart Education',                          icon: GraduationCap,color:'#0EA5E9', border: 'rgba(14,165,233,0.4)',   bg: 'rgba(14,165,233,0.08)',  description: 'Smart education—a concept that describes learning in the digital age. It enables learners to learn more effectively, efficiently, flexibly and comfortably.' },
  { id: '10', title: 'FinTech',                                  icon: Coins,       color: '#14B8A6', border: 'rgba(20,184,166,0.4)',   bg: 'rgba(20,184,166,0.08)',  description: 'Challenges related to the financial services.' },
  { id: '11', title: 'Smart Automation',                         icon: Cpu,         color: '#8B5CF6', border: 'rgba(139,92,246,0.4)',   bg: 'rgba(139,92,246,0.08)',  description: 'Ideas focused on the intelligent use of resources for transforming and advancements of technology with AI.' },
  { id: '12', title: 'Fitness & Sports',                         icon: Activity,    color: '#F43F5E', border: 'rgba(244,63,94,0.4)',    bg: 'rgba(244,63,94,0.08)',   description: 'Ideas that can boost fitness activities and assist in keeping fit.' },
  { id: '13', title: 'Space Technology',                         icon: Rocket,      color: '#D946EF', border: 'rgba(217,70,239,0.4)',   bg: 'rgba(217,70,239,0.08)',  description: 'For use in travel or activities beyond Earth\'s atmosphere, for purposes such as spaceflight or space exploration.' },
  { id: '14', title: 'Heritage & Culture',                       icon: Landmark,    color: '#FB923C', border: 'rgba(251,146,60,0.4)',   bg: 'rgba(251,146,60,0.08)',  description: 'Ideas that showcase the rich cultural heritage and traditions of India.' },
  { id: '15', title: 'MedTech / BioTech / HealthTech',          icon: HeartPulse,  color: '#EC4899', border: 'rgba(236,72,153,0.4)',   bg: 'rgba(236,72,153,0.08)',  description: 'Cutting edge technology in healthcare. Recent shifts in healthcare trends, growing populations also present an array of opportunities for innovation.' },
  { id: '16', title: 'Open Innovation',                          icon: Lightbulb,   color: '#00D9FF', border: 'rgba(0,217,255,0.4)',    bg: 'rgba(0,217,255,0.08)',   description: 'If your idea is unique and does not exactly fit into the other categories, you can submit it under Open Innovation.' },
];

export default function Themes() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="themes" className="relative py-24 px-4 overflow-hidden" style={{ background: 'transparent' }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-violet-600/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <Reveal delay={0} className="text-center mb-14 space-y-4">
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-violet-400 uppercase">
            // HACKATHON DOMAINS
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(2rem, 7vw, 5.5rem)',
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #ffffff, #A855F7, #00D9FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            16 THEMES — ENDLESS POSSIBILITIES
          </h2>
          <p className="font-spaceGrotesk text-slate-400 text-sm max-w-xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Tap any track to reveal its challenge description</span>
          </p>
          <div className="w-28 h-0.5 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #00D9FF)' }} />
        </Reveal>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {THEMES_LIST.map((theme, idx) => {
            const Icon = theme.icon;
            const isFlipped = !!flippedCards[theme.id];

            return (
              <Reveal key={theme.id} delay={idx * 40} className="h-full min-h-[260px]">
                <div className="theme-card-shell perspective-1000 h-full min-h-[260px] w-full">
                  <div
                    onClick={() => toggleFlip(theme.id)}
                    className={`relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-style-3d cursor-pointer rounded-2xl ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT */}
                    <div
                      className="theme-face theme-front absolute inset-0 backface-hidden p-5 sm:p-6 rounded-2xl flex flex-col justify-between overflow-hidden shimmer-card"
                      style={{
                        background: `linear-gradient(135deg, ${theme.bg}, rgba(11,16,38,0.90))`,
                        border: `1px solid ${theme.border}`,
                        backdropFilter: 'blur(16px)',
                      }}
                    >
                      {/* Track number & Icon */}
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="font-bebas text-4xl sm:text-5xl leading-none"
                          style={{
                            color: theme.color,
                            opacity: 0.2,
                            letterSpacing: '0.02em',
                            lineHeight: 1,
                          }}
                        >
                          {theme.id}
                        </span>
                        <div
                          className="p-3 rounded-xl flex-shrink-0"
                          style={{
                            background: theme.bg,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.color }} />
                        </div>
                      </div>

                      {/* Title */}
                      <div className="flex-1 flex items-center py-2">
                        <h3
                          className="font-orbitron font-bold text-white leading-snug text-sm sm:text-base"
                        >
                          {theme.title}
                        </h3>
                      </div>

                      {/* Flip hint */}
                      <div
                        className="flex items-center gap-1.5 text-[10px] font-mono border-t pt-3"
                        style={{ borderColor: 'rgba(255,255,255,0.06)', color: theme.color }}
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Tap to reveal details</span>
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="theme-face theme-back absolute inset-0 backface-hidden rotate-y-180 p-5 sm:p-6 rounded-2xl flex flex-col justify-between overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, rgba(11,16,38,0.95), ${theme.bg})`,
                        border: `1px solid ${theme.border}`,
                        backdropFilter: 'blur(16px)',
                        boxShadow: `0 0 30px ${theme.bg.replace('0.08', '0.2')}`,
                      }}
                    >
                      <div
                        className="flex items-center justify-between pb-2 mb-2 border-b"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <span className="font-orbitron font-extrabold text-[9px] uppercase tracking-[0.18em]" style={{ color: theme.color }}>
                          TRACK {theme.id}
                        </span>
                        <Icon className="w-4 h-4" style={{ color: theme.color }} />
                      </div>

                      <div className="flex-1 flex items-center py-2">
                        <p className="font-spaceGrotesk text-slate-200 text-[12px] sm:text-sm leading-relaxed">
                          {theme.description}
                        </p>
                      </div>

                      <div
                        className="flex items-center justify-between text-[10px] font-mono border-t pt-2"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <span className="flex items-center gap-1" style={{ color: '#A855F7' }}>
                          <RotateCw className="w-3 h-3" /> Flip back
                        </span>
                        <span className="font-orbitron font-bold text-[9px]" style={{ color: '#00D9FF' }}>NEXORA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Theme count */}
        <Reveal delay={300} className="mt-12 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            <span className="font-bebas text-2xl" style={{ color: '#A855F7' }}>16</span>
            <span className="font-spaceGrotesk text-slate-300 text-sm">Innovation Tracks · Pick the one that excites you most</span>
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
