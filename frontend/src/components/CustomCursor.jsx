import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
      setIsMobile(isTouch);
      if (!isTouch) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('interactive-element');

      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;

    let frameId;
    const tick = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [position, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-neonCyan shadow-[0_0_18px_rgba(6,182,212,0.5)] transition-all duration-150 ease-out ${
          isHovered
            ? 'w-12 h-12 -translate-x-6 -translate-y-6 bg-neonCyan/10 border-neonPurple shadow-[0_0_24px_rgba(168,85,247,0.5)]'
            : 'w-8 h-8 -translate-x-4 -translate-y-4 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) ${isHovered ? 'scale(1.25)' : 'scale(1)'}`,
        }}
      />
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-neonPurple shadow-[0_0_14px_rgba(168,85,247,0.8)] transition-all duration-150 ease-out ${
          isHovered ? 'w-3 h-3 -translate-x-1.5 -translate-y-1.5 bg-neonCyan shadow-[0_0_16px_rgba(6,182,212,0.8)]' : 'w-2 h-2 -translate-x-1 -translate-y-1'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
}
