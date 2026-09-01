import React from 'react';
import { X, Check } from 'lucide-react';
import { THEMES_LIST } from './Themes';

export default function ThemeSelectorModal({ isOpen, onClose, onSelectTheme, selectedTheme }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-darkBg/80 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-navyBg/95 border border-neonPurple/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyberBorder mb-6">
          <div>
            <span className="font-orbitron text-xs font-bold text-neonCyan tracking-widest uppercase">
              // 16 ARENAS GRID
            </span>
            <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
              SELECT YOUR HACKATHON THEME
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Choose exactly ONE track for your team registration
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-neonPurple hover:bg-neonPurple/20 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16 Track Grid: 4x4 on Desktop, 2-col on Mobile/Tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {THEMES_LIST.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.title;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onSelectTheme(theme.title);
                  onClose();
                }}
                className={`group relative text-left p-4 rounded-xl transition-all duration-200 border flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-gradient-to-br from-neonPurple/30 to-neonCyan/30 border-neonCyan shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-[1.02]'
                    : 'bg-navyBg/90 border-white/10 hover:border-neonPurple hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:-translate-y-1'
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between w-full">
                  <span className={`font-orbitron font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded ${
                    isSelected ? 'bg-neonCyan text-darkBg' : 'bg-white/10 text-slate-300'
                  }`}>
                    TRACK {theme.id}
                  </span>

                  {isSelected ? (
                    <div className="p-1 rounded-full bg-neonCyan text-darkBg shadow-[0_0_8px_#06b6d4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <Icon className={`w-4 h-4 ${theme.text} group-hover:scale-110 transition-transform`} />
                  )}
                </div>

                {/* Track Title */}
                <span className="font-orbitron font-semibold text-xs sm:text-sm text-white line-clamp-3 leading-snug">
                  {theme.title}
                </span>

                {/* Bottom sci-fi border decor */}
                <div className={`h-0.5 w-full rounded-full transition-colors ${
                  isSelected ? 'bg-neonCyan' : 'bg-transparent group-hover:bg-neonPurple/40'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>16 Official Domains Available</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-orbitron transition-all"
          >
            CANCEL
          </button>
        </div>

      </div>
    </div>
  );
}
