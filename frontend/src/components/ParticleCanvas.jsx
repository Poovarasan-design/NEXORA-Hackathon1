import React, { useEffect, useRef } from 'react';

/**
 * Reusable canvas-based particle system.
 * Mouse-reactive. GPU-friendly. Auto-scales density on mobile.
 */
export default function ParticleCanvas({
  count = 120,
  colors = ['rgba(168,85,247,VAL)', 'rgba(0,217,255,VAL)', 'rgba(255,255,255,VAL)'],
  mouseReact = true,
  style = {},
  className = '',
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.innerWidth < 768;
    const density = isMobile ? Math.floor(count * 0.4) : count;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Create particles
    particlesRef.current = Array.from({ length: density }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.4,
      vy:    (Math.random() - 0.5) * 0.4,
      r:     Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.5 + 0.15,
      colorIdx: Math.floor(Math.random() * 3),
    }));

    const getColor = (idx, alpha) => {
      const palettes = [
        `rgba(168,85,247,${alpha})`,
        `rgba(0,217,255,${alpha})`,
        `rgba(255,255,255,${alpha * 0.7})`,
      ];
      return palettes[idx % palettes.length];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        // Mouse repulsion
        if (mouseReact && !isMobile) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0)              p.x = canvas.width;
        if (p.x > canvas.width)   p.x = 0;
        if (p.y < 0)              p.y = canvas.height;
        if (p.y > canvas.height)  p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = getColor(p.colorIdx, p.alpha);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    if (mouseReact) {
      canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      if (mouseReact) canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [count, mouseReact]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ ...style }}
    />
  );
}
