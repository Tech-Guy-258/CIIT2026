/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import ciitLogoImg from '../assets/images/ciit_2026_logo_1787657793393.png';

interface NavbarProps {
  lang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
  activeSection: string;
  onRegisterClick: () => void;
  onAdminToggle: () => void;
  showAdminLink: boolean;
}

export default function Navbar({
  lang,
  setLang,
  activeSection,
  onRegisterClick,
  onAdminToggle,
  showAdminLink
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
    { label: (t as any).navProfile || 'Perfil de Tete', href: '#tete-profile' },
    { label: t.nav6cs, href: '#sectors' },
    { label: t.navSpeakers, href: '#speakers' },
    { label: t.navAgenda, href: '#agenda' },
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
      className="relative w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 py-1.5 sm:py-2 shadow-xs z-50"
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Official CIIT 2026 Logo as Home Button */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#home"
              id="navbar-brand-home-btn"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center py-1 transition-all duration-300 hover:opacity-95 active:scale-95 focus:outline-none"
              title={lang === 'pt' ? 'CIIT 2026 - Voltar ao Início' : 'CIIT 2026 - Return to Home'}
              aria-label="CIIT 2026 Home"
            >
              <img
                src={ciitLogoImg}
                alt="CIIT 2026 - Conferência Internacional de Investimentos de Tete"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Desktop Navigation (visible on lg+ screens) */}
          <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2 2xl:space-x-3 flex-1 px-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  id={`nav-item-${item.href.substring(1)}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-1.5 xl:px-2.5 2xl:px-3 py-1.5 text-[11px] lg:text-xs xl:text-[13px] 2xl:text-sm font-semibold tracking-tight uppercase transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-amber-700 border-b-2 border-amber-500 font-bold bg-amber-50/60'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Actions: Lang, Admin, Register (visible on md+ screens) */}
          <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2 xl:space-x-3 flex-shrink-0">
            {/* Lang Switcher */}
            <button
              id="lang-switcher"
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="h-8 xl:h-9 flex items-center space-x-1 px-2.5 xl:px-3 rounded-none bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs xl:text-sm font-bold text-slate-800 transition-all cursor-pointer whitespace-nowrap"
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            {/* Admin toggle - padlock icon only */}
            <button
              id="admin-dashboard-btn"
              onClick={onAdminToggle}
              title={t.navAdmin}
              aria-label={t.navAdmin}
              className={`h-8 xl:h-9 px-2.5 xl:px-3 rounded-none border transition-all cursor-pointer flex items-center justify-center ${
                showAdminLink
                  ? 'bg-amber-100 text-amber-900 border-amber-500 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:border-slate-400'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            </button>

            {/* CTA Register */}
            <button
              id="nav-cta-register"
              onClick={onRegisterClick}
              className="h-8 xl:h-9 flex items-center justify-center px-3.5 xl:px-4 2xl:px-5 rounded-none bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs xl:text-sm font-bold uppercase tracking-wider shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              {t.navRegister}
            </button>
          </div>

          {/* Mobile & Tablet Menu Trigger button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              id="mobile-lang-switcher"
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="md:hidden h-8 flex items-center space-x-1 px-2.5 rounded-none bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            <button
              id="mobile-header-admin-btn"
              onClick={onAdminToggle}
              title={t.navAdmin}
              aria-label={t.navAdmin}
              className={`md:hidden h-8 px-2.5 rounded-none border transition-all cursor-pointer flex items-center justify-center ${
                showAdminLink
                  ? 'bg-amber-100 text-amber-900 border-amber-500'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8 p-0 flex items-center justify-center rounded-none text-slate-800 hover:bg-slate-100 focus:outline-none border border-slate-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        } bg-white border-b border-slate-200 shadow-lg`}
      >
        <div className="px-3 pt-2 pb-6 space-y-1 sm:px-4 text-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              id={`mobile-nav-item-${item.href.substring(1)}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-3 py-3 rounded-none text-sm font-semibold text-slate-800 hover:text-amber-700 hover:bg-amber-50 transition-colors border-b border-slate-100"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-4 pb-2 px-2 sm:px-4">
            <button
              id="mobile-nav-cta-register"
              onClick={() => {
                setIsOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3 rounded-none bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors cursor-pointer shadow-sm"
            >
              {t.navRegister}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
