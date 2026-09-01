import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-09-25T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      {/* 30-Hour Non-stop hacking badge */}
      <div className="flex justify-center mb-5">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-orbitron font-semibold tracking-widest bg-gradient-to-r from-neonPurple/20 via-neonCyan/20 to-neonPurple/20 border border-neonCyan/40 text-neonCyan shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse">
          ⚡ 30 HOURS NON-STOP HACKING
        </span>
      </div>

      <div className="flex justify-center mb-6">
        <div className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2.5 shadow-[0_0_18px_rgba(168,85,247,0.18)] backdrop-blur-md">
          <div className="pointer-events-none absolute inset-y-0 left-[-30%] w-[45%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 via-white/40 to-transparent translate-x-[-220%] transition-transform duration-700 ease-out group-hover:translate-x-[300%]" />
          <span className="relative z-10 font-orbitron text-sm sm:text-base font-black tracking-[0.22em] text-transparent bg-gradient-to-r from-white via-slate-100 to-neonPurple bg-clip-text uppercase">
            NEXORA
          </span>
        </div>
      </div>

      {/* Glassmorphism Countdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="relative group p-4 sm:p-6 rounded-2xl bg-navyBg/80 border border-neonPurple/30 backdrop-blur-xl shadow-glass-card hover:border-neonCyan hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            {/* Top subtle glow bar */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-neonCyan to-transparent" />
            
            <div className="text-center">
              <span className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="block mt-2 font-orbitron font-semibold text-[10px] sm:text-xs text-neonCyan tracking-widest">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Official Date Details */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm text-slate-300 font-mono">
        <div className="flex items-center gap-2 bg-navyBg/60 px-4 py-2 rounded-xl border border-neonPurple/20">
          <span className="w-2 h-2 rounded-full bg-neonPurple animate-ping" />
          <span className="text-white font-medium">Starts:</span> 25th September 2026
        </div>
        <div className="flex items-center gap-2 bg-navyBg/60 px-4 py-2 rounded-xl border border-neonCyan/20">
          <span className="w-2 h-2 rounded-full bg-neonCyan" />
          <span className="text-white font-medium">Ends:</span> 26th September 2026
        </div>
      </div>
    </div>
  );
}
