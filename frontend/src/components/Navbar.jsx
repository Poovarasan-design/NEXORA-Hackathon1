import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Themes', href: '#themes', id: 'themes' },
  { name: 'Highlights', href: '#highlights', id: 'highlights' },
  { name: 'Timeline', href: '#timeline', id: 'timeline' },
  { name: 'FAQ', href: '#faq', id: 'faq' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (isLandingPage) {
        const sections = ['home', 'about', 'themes', 'timeline', 'highlights', 'faq', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  const navLinks = NAV_LINKS;

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (!isLandingPage) {
      navigate('/#' + targetId);
      setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-darkBg/80 backdrop-blur-xl border-b border-neonPurple/20 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.42)]'
          : 'bg-gradient-to-b from-darkBg/85 via-darkBg/55 to-transparent py-4 shadow-[0_0_0_rgba(0,0,0,0)]'
      }`}
      style={{
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: NSCET College Logo */}
          <div className="flex items-center space-x-3">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative p-1 rounded-lg bg-navyBg/60 border border-neonPurple/30 group-hover:border-neonPurple transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <img 
                  src="/assets/college_logo.webp" 
                  alt="NSCET Logo" 
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="font-orbitron font-bold text-xs tracking-wider text-white">NSCET</span>
              </div>
            </a>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-navyBg/65 px-4 py-1.5 rounded-full border border-cyberBorder/80 backdrop-blur-xl shadow-[0_12px_25px_rgba(15,23,42,0.24)] transition-all duration-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && isLandingPage;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-neonPurple/25 to-neonCyan/25 shadow-[0_0_12px_rgba(168,85,247,0.22)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-neonCyan rounded-full shadow-[0_0_6px_#06b6d4]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Kamarajar Emblem */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-navyBg/60 border border-neonCyan/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <img 
                src="/assets/kamarajar_logo.webp" 
                alt="Kamarajar Emblem" 
                className="h-10 sm:h-12 w-auto object-contain rounded-full border border-neonCyan/40"
              />
              <div className="hidden sm:flex flex-col pr-2 text-left">
                <span className="font-orbitron font-semibold text-[10px] text-neonCyan tracking-wider">TMHNU</span>
                <span className="text-[9px] text-slate-400 font-mono">SINCE 1919</span>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-navyBg border border-neonPurple/40 text-slate-200 hover:text-white hover:border-neonPurple focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navyBg/95 border-b border-neonPurple/30 backdrop-blur-xl px-4 pt-4 pb-6 mt-2 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-neonPurple/20 transition-all border border-transparent hover:border-neonPurple/40"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
