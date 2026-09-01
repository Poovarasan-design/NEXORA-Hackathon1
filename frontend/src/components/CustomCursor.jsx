import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const posRef   = useRef({ x: -200, y: -200 });
  const trailRef = useRef({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile]   = useState(true);
  const frameRef  = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
      setIsMobile(isTouch);
      if (!isTouch) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const interactive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('interactive-element');
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  // Smooth trailing cursor via RAF (no React re-renders for performance)
  useEffect(() => {
    if (isMobile) return;

    const tick = () => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.14;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.14;

      if (outerRef.current) {
        const size   = isHovered ? 44 : 32;
        const offset = size / 2;
        outerRef.current.style.transform = `translate3d(${trailRef.current.x - offset}px, ${trailRef.current.y - offset}px, 0)`;
        outerRef.current.style.width  = `${size}px`;
        outerRef.current.style.height = `${size}px`;
        outerRef.current.style.borderColor = isHovered ? '#A855F7' : '#00D9FF';
        outerRef.current.style.boxShadow   = isHovered
          ? '0 0 20px rgba(168,85,247,0.5)'
          : '0 0 14px rgba(0,217,255,0.4)';
        outerRef.current.style.background  = isHovered ? 'rgba(168,85,247,0.08)' : 'transparent';
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${posRef.current.x - 4}px, ${posRef.current.y - 4}px, 0)`;
        innerRef.current.style.background = isHovered ? '#A855F7' : '#00D9FF';
        innerRef.current.style.boxShadow  = isHovered
          ? '0 0 12px #A855F7'
          : '0 0 10px #00D9FF';
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isMobile, isHovered]);

  if (isMobile) return null;

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          width: '32px',
          height: '32px',
          borderColor: '#00D9FF',
          boxShadow: '0 0 14px rgba(0,217,255,0.4)',
          background: 'transparent',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Sharp dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          width: '8px',
          height: '8px',
          background: '#00D9FF',
          boxShadow: '0 0 10px #00D9FF',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
