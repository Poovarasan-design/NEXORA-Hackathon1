import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-09-25T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'DAYS',    value: timeLeft.days },
    { label: 'HOURS',   value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-4 px-2">
      {/* Countdown grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {units.map((unit, i) => (
          <div
            key={unit.label}
            className="relative p-4 sm:p-5 rounded-2xl text-center overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(11,16,38,0.85))',
              border: '1px solid rgba(124,58,237,0.25)',
              backdropFilter: 'blur(16px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = '1px solid rgba(0,217,255,0.4)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0,217,255,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid rgba(124,58,237,0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)' }}
            />
            <span
              className="font-bebas block"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                background: 'linear-gradient(180deg, #ffffff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.4))',
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <span
              className="font-orbitron font-semibold block mt-2 tracking-widest text-cyan-400"
              style={{ fontSize: '0.6rem' }}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Date details */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-spaceGrotesk text-slate-400">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ border: '1px solid rgba(168,85,247,0.2)', background: 'rgba(168,85,247,0.06)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
          <span className="text-white font-medium">Starts:</span> 25th September 2026
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ border: '1px solid rgba(0,217,255,0.2)', background: 'rgba(0,217,255,0.05)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-white font-medium">Ends:</span> 26th September 2026
        </div>
      </div>
    </div>
  );
}
