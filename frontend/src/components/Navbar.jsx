import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScfdQVjDfli7rOIy_emt-gt-sn2rsiDwxNblI9JB2shRTrMwg/viewform';

const NAV_LINKS = [
  { name: 'Home',       href: '#home',       id: 'home'       },
  { name: 'About',      href: '#about',      id: 'about'      },
  { name: 'Themes',     href: '#themes',     id: 'themes'     },
  { name: 'Highlights', href: '#highlights', id: 'highlights' },
  { name: 'Timeline',   href: '#timeline',   id: 'timeline'   },
  { name: 'FAQ',        href: '#faq',        id: 'faq'        },
  { name: 'Contact',    href: '#contact',    id: 'contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('home');
  const location  = useLocation();
  const navigate  = useNavigate();

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isLandingPage) {
        const sections = ['home', 'about', 'themes', 'timeline', 'highlights', 'faq', 'contact'];
        const scrollPos = window.scrollY + 200;
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const { offsetTop, offsetHeight } = el;
            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!isLandingPage) {
      navigate('/#' + targetId);
      setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
          : 'py-3'
      }`}
      style={{
        background: scrolled
          ? 'rgba(5, 8, 22, 0.92)'
          : 'linear-gradient(180deg, rgba(5,8,22,0.85) 0%, rgba(5,8,22,0.3) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(124,58,237,0.18)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* LEFT: NSCET Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="relative p-1 rounded-lg border border-violet-500/30 group-hover:border-violet-400/60 bg-white/5 transition-all duration-300 shadow-[0_0_12px_rgba(124,58,237,0.2)]">
              <img
                src="/assets/college_logo.webp"
                alt="NSCET Logo"
                className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
              />
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="font-orbitron font-bold text-[11px] tracking-wider text-white">NSCET</span>
              <span className="font-spaceGrotesk text-[9px] text-slate-400 tracking-wide">NEXORA 2026</span>
            </div>
          </a>

          {/* CENTER: Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-xl">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id && isLandingPage;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-spaceGrotesk font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-violet-600/30 to-cyan-600/20 shadow-[0_0_12px_rgba(124,58,237,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00D9FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Kamarajar + Register */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Kamarajar Emblem */}
            <div className="hidden sm:flex items-center gap-2 p-1 rounded-full border border-cyan-400/25 bg-white/5">
              <img
                src="/assets/kamarajar_logo.webp"
                alt="Kamarajar Emblem"
                className="h-9 sm:h-11 w-auto object-contain rounded-full border border-cyan-400/30"
              />
              <div className="hidden lg:flex flex-col pr-2">
                <span className="font-orbitron font-semibold text-[10px] text-cyan-400 tracking-wider">TMHNU</span>
                <span className="text-[9px] text-slate-400 font-mono">EST. 1919</span>
              </div>
            </div>

            {/* Register CTA button */}
            <button
              onClick={() => window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-orbitron font-bold text-[11px] text-white tracking-widest transition-all duration-300 group relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #4f46e5)',
                boxShadow: '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.1)',
                border: '1px solid rgba(168,85,247,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,217,255,0.5), 0 0 60px rgba(124,58,237,0.2)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #00D9FF, #7C3AED)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #4f46e5)';
              }}
            >
              <span>REGISTER</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-violet-500/40 bg-white/5 text-slate-200 hover:text-white hover:border-violet-400 focus:outline-none transition-all"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t border-violet-500/20 px-4 pt-4 pb-6 mt-1 space-y-1 animate-fadeIn"
          style={{ background: 'rgba(5,8,22,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-spaceGrotesk font-medium text-slate-200 hover:text-white hover:bg-violet-600/15 transition-all border border-transparent hover:border-violet-500/25"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              {link.name}
            </a>
          ))}
          <div className="pt-3 px-2">
            <button
              onClick={() => { window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer'); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl font-orbitron font-bold text-sm text-white tracking-widest transition-all"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #4f46e5)',
                boxShadow: '0 0 20px rgba(124,58,237,0.3)',
              }}
            >
              REGISTER FOR NEXORA →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
