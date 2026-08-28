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

  // Row 1: Potencial Económico & Visão Provincial (8 items)
  const navRow1 = [
    { label: t.navHome, href: '#home' },
    { label: (t as any).navAboutTete || (lang === 'pt' ? 'Sobre Tete' : 'About Tete'), href: '#sobre-tete' },
    { label: (t as any).navWhyInvest || (lang === 'pt' ? 'Porquê Tete' : 'Why Tete'), href: '#porque-investir' },
    { label: (t as any).navWhereToInvest || (lang === 'pt' ? 'Onde Investir' : 'Where to Invest'), href: '#onde-investir' },
    { label: (t as any).navMinerals || (lang === 'pt' ? 'Minérios' : 'Minerals'), href: '#potencial-mineral' },
    { label: (t as any).navFisheries || (lang === 'pt' ? 'Pesca & Água' : 'Fisheries'), href: '#pesca-aquacultura' },
    { label: (t as any).navOtherPotentials || (lang === 'pt' ? 'Outros Potenciais' : 'Other Potentials'), href: '#outros-potenciais' },
    { label: (t as any).navEnergy || (lang === 'pt' ? 'Energia' : 'Energy'), href: '#potencial-energetico' }
  ];

  // Row 2: Projetos, Investimento & Conferência CIIT (7 items)
  const navRow2 = [
    { label: (t as any).navPortfolio || (lang === 'pt' ? 'Projetos' : 'Projects'), href: '#portfolio-projetos' },
    { label: (t as any).navInvestorArea || (lang === 'pt' ? 'Área do Investidor' : 'Investor Area'), href: '#area-investidor' },
    { label: t.navAgenda, href: '#agenda' },
    { label: t.navSpeakers, href: '#speakers' },
    { label: t.navGallery || (lang === 'pt' ? 'Galeria' : 'Gallery'), href: '#gallery' },
    { label: (t as any).navAttendance || (lang === 'pt' ? 'Presenças LIVE' : 'Live Attendance'), href: '#attendance' },
    { label: t.navTravel, href: '#travel' }
  ];

  const allNavItems = [...navRow1, ...navRow2];

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

  const renderNavLink = (item: { label: string; href: string }, isRow2 = false) => {
    const isActive = activeSection === item.href.substring(1);
    const isAttendance = item.href === '#attendance';
    const isInvestorArea = item.href === '#area-investidor';

    return (
      <a
        key={item.href}
        href={item.href}
        id={`nav-item-${item.href.substring(1)}`}
        onClick={(e) => handleNavClick(e, item.href)}
        className={`px-2 xl:px-2.5 2xl:px-3 py-1 text-[11px] xl:text-[12px] 2xl:text-[12.5px] font-semibold tracking-tight uppercase transition-all duration-150 whitespace-nowrap flex items-center justify-center space-x-1 flex-shrink-0 ${
          isActive
            ? 'text-amber-900 font-black bg-amber-100/80 border-b-2 border-amber-600 shadow-2xs'
            : isInvestorArea
            ? 'text-amber-800 hover:text-amber-950 hover:bg-amber-50 font-bold'
            : isAttendance
            ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/70 font-bold'
            : 'text-slate-700 hover:text-amber-700 hover:bg-slate-100/70'
        }`}
      >
        {isAttendance && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-0.5" />
        )}
        <span>{item.label}</span>
      </a>
    );
  };

  return (
    <nav
      id="navbar"
      className={`sticky top-0 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs z-50 ${
        isScrolled ? 'py-1 shadow-sm' : 'py-1.5'
      }`}
    >
      <div className="w-full max-w-[1780px] mx-auto px-3 sm:px-5 lg:px-7">
        
        {/* FULL SCREEN / DESKTOP LAYOUT: EXTREMITIES PINNED + 2 SYMMETRICAL LINES IN CENTER */}
        <div className="flex items-center justify-between gap-3 lg:gap-6 min-h-[56px] lg:min-h-[64px]">
          
          {/* LEFT EXTREMITY: CIIT 2026 OFFICIAL LOGO */}
          <div className="flex-shrink-0 flex items-center min-w-0">
            <a
              href="#home"
              id="navbar-brand-home-btn"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center py-1 transition-all duration-200 hover:opacity-95 active:scale-95 focus:outline-none"
              title={lang === 'pt' ? 'CIIT 2026 - Início' : 'CIIT 2026 - Home'}
              aria-label="CIIT 2026 Home"
            >
              <img
                src={ciitLogoImg}
                alt="CIIT 2026 - Conferência Internacional de Investimentos de Tete"
                className="h-10 sm:h-11 lg:h-12 xl:h-13 w-auto max-w-[150px] sm:max-w-[190px] xl:max-w-[220px] object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* CENTER NAVIGATION: 2 BALANCED SYMMETRICAL ROWS ON FULLSCREEN/DESKTOP */}
          <div className="hidden lg:flex flex-col items-center justify-center flex-1 mx-auto px-2 py-0.5">
            {/* ROW 1: Economic Potential & Overview */}
            <div className="w-full flex items-center justify-center flex-nowrap gap-0.5 xl:gap-1 2xl:gap-1.5 border-b border-slate-100 pb-0.5 mb-0.5">
              {navRow1.map((item) => renderNavLink(item, false))}
            </div>

            {/* ROW 2: Projects, Investor Gateway & CIIT Conference Details */}
            <div className="w-full flex items-center justify-center flex-nowrap gap-0.5 xl:gap-1 2xl:gap-1.5 pt-0.5">
              {navRow2.map((item) => renderNavLink(item, true))}
            </div>
          </div>

          {/* RIGHT EXTREMITY: REGISTRATION BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* CTA Register - Desktop */}
            <button
              id="nav-cta-register"
              onClick={onRegisterClick}
              className="hidden sm:flex h-10 lg:h-11 xl:h-12 items-center justify-center px-4 xl:px-6 2xl:px-7 rounded-none bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs xl:text-[13px] font-black uppercase tracking-wider shadow-xs active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap border border-amber-600"
            >
              {t.navRegister}
            </button>

            {/* MOBILE MENU TOGGLE (< lg) */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden h-10 w-10 p-0 flex items-center justify-center rounded-none text-slate-800 hover:bg-slate-100 focus:outline-none border border-slate-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5 text-amber-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE & TABLET EXPANDED DRAWER MENU (< lg) */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[90vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        } bg-white border-b border-slate-200 shadow-xl`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1 text-center max-w-lg mx-auto">
          {allNavItems.map((item) => {
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
