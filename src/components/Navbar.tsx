/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import ciitLogoImg from '../assets/images/ciit_2026_logo_1787657793393.png';

interface NavbarProps {
  lang: 'pt' | 'en';
  activeSection: string;
  onRegisterClick: () => void;
}

export default function Navbar({
  lang,
  activeSection,
  onRegisterClick
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.navHome, href: '#home' },
    { label: lang === 'pt' ? 'Câmbio & Mercado' : 'Market & Rates', href: '#banco-moc-economic-dashboard' },
    { label: t.navAbout, href: '#about' },
    { label: (t as any).navProfile || (lang === 'pt' ? 'Perfil de Tete' : 'Tete Profile'), href: '#tete-profile' },
    { label: t.nav6cs, href: '#sectors' },
    { label: t.navSpeakers, href: '#speakers' },
    { label: t.navAgenda, href: '#agenda' },
    { label: t.navGallery || (lang === 'pt' ? 'Galeria' : 'Gallery'), href: '#gallery' },
    { label: (t as any).navAttendance || (lang === 'pt' ? 'Presenças LIVE' : 'Live Attendance'), href: '#attendance' },
    { label: t.navTravel, href: '#travel' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === '#banco-moc-economic-dashboard') {
      const btn = document.getElementById('btn-open-sidebar-market') || document.getElementById('btn-float-sidebar-toggle');
      if (btn) {
        btn.click();
        return;
      }
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="navbar"
      className="sticky top-0 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 py-1.5 shadow-xs z-50"
    >
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* BALANCED 3-ZONE LAYOUT: LEFT BRAND | PERFECTLY CENTERED NAVIGATION | RIGHT REGISTER CTA */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* ZONE 1: BRAND / LOGO (LEFT-ALIGNED) */}
          <div className="flex-shrink-0 flex items-center min-w-0">
            <a
              href="#home"
              id="navbar-brand-home-btn"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center py-0.5 transition-all duration-300 hover:opacity-95 active:scale-95 focus:outline-none"
              title={lang === 'pt' ? 'CIIT 2026 - Início' : 'CIIT 2026 - Home'}
              aria-label="CIIT 2026 Home"
            >
              <img
                src={ciitLogoImg}
                alt="CIIT 2026 - Conferência Internacional de Investimentos de Tete"
                className="h-9 sm:h-10 md:h-11 xl:h-12 w-auto max-w-[150px] sm:max-w-[190px] xl:max-w-[220px] object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* ZONE 2: PERFECTLY CENTERED NAVIGATION LINKS (DESKTOP) */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-auto px-2">
            <div className="flex items-center justify-center flex-nowrap gap-1 xl:gap-1.5 2xl:gap-2 whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                const isAttendance = item.href === '#attendance';
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    id={`nav-item-${item.href.substring(1)}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 text-[11px] xl:text-[12px] 2xl:text-[13px] font-semibold tracking-tight uppercase transition-all duration-200 whitespace-nowrap rounded-none flex items-center space-x-1 flex-shrink-0 ${
                      isActive
                        ? 'text-amber-800 border-b-2 border-amber-600 font-bold bg-amber-50/80 shadow-2xs'
                        : isAttendance
                        ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/60 font-bold'
                        : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50/80'
                    }`}
                  >
                    {isAttendance && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-0.5" />
                    )}
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ZONE 3: ACTIONS (ONLY REGISTRATION BUTTON & MOBILE MENU TOGGLE) */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* CTA Register - Desktop */}
            <button
              id="nav-cta-register"
              onClick={onRegisterClick}
              className="hidden sm:flex h-9 xl:h-10 items-center justify-center px-4 xl:px-5 2xl:px-6 rounded-none bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs xl:text-[13px] font-bold uppercase tracking-wider shadow-xs active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              {t.navRegister}
            </button>

            {/* MOBILE MENU TOGGLE TRIGGER (< lg) */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden h-9 w-9 p-0 flex items-center justify-center rounded-none text-slate-800 hover:bg-slate-100 focus:outline-none border border-slate-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5 text-amber-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE & TABLET EXPANDED DRAWER MENU WITH CENTERED ELEMENTS */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[90vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        } bg-white border-b border-slate-200 shadow-xl`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1 text-center max-w-lg mx-auto">
          {navItems.map((item) => {
            const isAttendance = item.href === '#attendance';
            const isActive = activeSection === item.href.substring(1);

            return (
              <a
                key={item.href}
                href={item.href}
                id={`mobile-nav-item-${item.href.substring(1)}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-2.5 rounded-none text-xs sm:text-sm font-semibold tracking-tight uppercase transition-colors border-b border-slate-100 ${
                  isActive
                    ? 'bg-amber-50 text-amber-800 font-bold border-amber-300'
                    : isAttendance
                    ? 'text-emerald-700 font-bold bg-emerald-50/50'
                    : 'text-slate-800 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
              >
                {isAttendance ? `🔴 ${item.label}` : item.label}
              </a>
            );
          })}

          <div className="pt-4 pb-2 px-2">
            <button
              id="mobile-nav-cta-register"
              onClick={() => {
                setIsOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3 rounded-none bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors cursor-pointer shadow-sm active:scale-[0.98]"
            >
              {t.navRegister}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
