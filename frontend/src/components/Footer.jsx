import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-darkBg border-t border-neonPurple/20 pt-16 pb-8 px-4 text-slate-300">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-t from-neonPurple/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: NEXORA & College Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/college_logo.webp" 
                  alt="NSCET Logo" 
                  className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
                <img 
                  src="/assets/kamarajar_logo.webp" 
                  alt="Kamarajar Emblem" 
                  className="h-10 w-auto object-contain rounded-full border border-neonCyan/40"
                />
              </div>

              <h3 className="font-orbitron font-black text-2xl text-white tracking-wider drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
                NEXORA
              </h3>

              <p className="text-[10px] text-neonCyan font-mono tracking-widest uppercase">
                30-HOUR HACKATHON FOR HARDWARE & SOFTWARE
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              Nadar Saraswathi College of Engineering & Technology (NSCET), Vadapudupatti, Annanji (P.O.), Theni, Tamil Nadu.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navyBg border border-cyberBorder text-slate-300 hover:text-white hover:border-neonCyan hover:shadow-[0_0_15px_#06b6d4] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navyBg border border-cyberBorder text-slate-300 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_#ef4444] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-navyBg border border-cyberBorder text-slate-300 hover:text-white hover:border-pink-500 hover:shadow-[0_0_15px_#ec4899] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-orbitron font-bold text-sm text-white tracking-wider border-l-2 border-neonPurple pl-2">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#home" className="hover:text-neonCyan transition-colors">✦ Home</a></li>
              <li><a href="#about" className="hover:text-neonCyan transition-colors">✦ About Nexora</a></li>
              <li><a href="#themes" className="hover:text-neonCyan transition-colors">✦ 16 Arenas & Themes</a></li>
              <li><a href="#timeline" className="hover:text-neonCyan transition-colors">✦ Schedule & Timeline</a></li>
              <li><a href="#highlights" className="hover:text-neonCyan transition-colors">✦ Key Highlights</a></li>
              <li><a href="#faq" className="hover:text-neonCyan transition-colors">✦ FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Official Approved Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-orbitron font-bold text-sm text-white tracking-wider border-l-2 border-neonCyan pl-2">
              OFFICIAL CONTACT
            </h4>

            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neonPurple flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">NSCET</strong>,<br />
                  Postbox No: 60,<br />
                  Annanji (P.O.), Vadapudupatti,<br />
                  Theni – 625531
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neonCyan flex-shrink-0" />
                <p className="text-slate-300 font-mono">
                  04546-263900, 901, 902
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neonBlue flex-shrink-0" />
                <a href="mailto:principal@nscet.org" className="text-neonCyan font-mono hover:underline">
                  principal@nscet.org
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-4">
          <p>© 2026 NEXORA — Nadar Saraswathi College of Engineering & Technology. All rights reserved.</p>
          <p className="text-slate-400">THINK. CODE. INNOVATE. REPEAT.</p>
        </div>

      </div>
    </footer>
  );
}
