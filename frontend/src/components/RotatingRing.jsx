import React from 'react';

export default function RotatingRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
      {/* Outer Glow Energy Ring 1 */}
      <div className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] lg:w-[680px] lg:h-[680px] rounded-full border border-neonPurple/40 shadow-[0_0_60px_rgba(168,85,247,0.3)] animate-[spin_25s_linear_infinite]">
        
        {/* Ring Orbiting Energy Nodes */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neonPurple rounded-full shadow-[0_0_15px_#a855f7]" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neonCyan rounded-full shadow-[0_0_15px_#06b6d4]" />
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 bg-neonBlue rounded-full shadow-[0_0_12px_#3b82f6]" />
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 bg-neonPurple rounded-full shadow-[0_0_12px_#a855f7]" />

        {/* Dashed Sci-fi inner ring */}
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-neonCyan/30 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      {/* Counter-rotating Inner Ring 2 */}
      <div className="absolute w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full border border-neonCyan/40 shadow-[0_0_40px_rgba(6,182,212,0.25)] animate-[spin_18s_linear_infinite_reverse]">
        <div className="absolute top-1/4 left-0 w-2.5 h-2.5 bg-neonCyan rounded-full shadow-[0_0_10px_#06b6d4]" />
        <div className="absolute bottom-1/4 right-0 w-2.5 h-2.5 bg-neonPurple rounded-full shadow-[0_0_10px_#a855f7]" />
      </div>

      {/* Central Ambient Glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-neonPurple/15 via-neonCyan/10 to-transparent blur-3xl animate-pulse-glow" />
    </div>
  );
}
