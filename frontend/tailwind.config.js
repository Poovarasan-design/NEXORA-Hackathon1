/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space base
        darkBg:      "#050816",
        navyBg:      "#0B1026",
        cardBg:      "rgba(11, 16, 38, 0.75)",
        deepSpace:   "#030610",
        // Neon accents
        neonPurple:  "#A855F7",
        neonCyan:    "#06B6D4",
        neonBlue:    "#3B82F6",
        neonPink:    "#EC4899",
        electricBlue:"#00D9FF",
        violet:      "#7C3AED",
        magenta:     "#D946EF",
        // Gold for prize
        gold:        "#F59E0B",
        goldLight:   "#FCD34D",
        // Borders
        cyberBorder: "rgba(168, 85, 247, 0.25)",
        goldBorder:  "rgba(245, 158, 11, 0.4)",
      },
      fontFamily: {
        orbitron:     ['Orbitron', 'sans-serif'],
        inter:        ['Inter', 'sans-serif'],
        bebas:        ['Bebas Neue', 'cursive'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'display':  ['clamp(4rem, 12vw, 14rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'hero':     ['clamp(3rem, 9vw, 10rem)', { lineHeight: '0.95' }],
        'massive':  ['clamp(5rem, 16vw, 18rem)', { lineHeight: '0.85' }],
      },
      boxShadow: {
        'neon-purple': '0 0 25px rgba(168, 85, 247, 0.45)',
        'neon-cyan':   '0 0 25px rgba(6, 182, 212, 0.45)',
        'neon-gold':   '0 0 40px rgba(245, 158, 11, 0.6)',
        'neon-magenta':'0 0 30px rgba(217, 70, 239, 0.5)',
        'glass-card':  '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'glow-purple': '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.1)',
        'glow-cyan':   '0 0 60px rgba(6, 182, 212, 0.3), 0 0 120px rgba(6, 182, 212, 0.1)',
        'glow-gold':   '0 0 80px rgba(245, 158, 11, 0.4), 0 0 160px rgba(245, 158, 11, 0.15)',
      },
      animation: {
        'spin-slow':       'spin 25s linear infinite',
        'spin-reverse':    'spin 18s linear infinite reverse',
        'pulse-glow':      'pulseGlow 3s ease-in-out infinite',
        'float':           'float 6s ease-in-out infinite',
        'float-delayed':   'float 6s ease-in-out 2s infinite',
        'shimmer':         'shimmer 2.5s ease-in-out infinite',
        'border-flow':     'borderFlow 3s linear infinite',
        'scanline':        'scanline 8s linear infinite',
        'energy-pulse':    'energyPulse 2s ease-in-out infinite',
        'text-glow':       'textGlow 3s ease-in-out infinite',
        'slide-up':        'slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right':     'slideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in':        'scaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'number-reveal':   'numberReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fadeIn':          'fadeIn 0.5s ease forwards',
        'glitch':          'glitch 0.4s ease forwards',
        'orbit':           'orbit 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%':      { opacity: '0.9', filter: 'blur(28px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(0.5deg)' },
          '66%':      { transform: 'translateY(-7px) rotate(-0.5deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        borderFlow: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        energyPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.2)' },
          '50%':      { textShadow: '0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(6, 182, 212, 0.3)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        numberReveal: {
          '0%':   { opacity: '0', transform: 'translateY(100%) scale(0.8)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glitch: {
          '0%':   { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-4px, 0)' },
          '25%':  { clipPath: 'inset(92% 0 1% 0)',  transform: 'translate(4px, 0)' },
          '50%':  { clipPath: 'inset(43% 0 1% 0)',  transform: 'translate(0, 0)' },
          '75%':  { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(-2px, 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)', transform: 'translate(2px, 0)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(180px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(180px) rotate(-360deg)' },
        },
      }
    },
  },
  plugins: [],
}
