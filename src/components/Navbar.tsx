/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock } from 'lucide-react';
import { TRANSLATIONS } from '../data';

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
      className="relative w-full transition-all duration-300 bg-corporate-950/95 backdrop-blur-md border-b border-gold-600/20 py-2 sm:py-2.5 shadow-lg z-50"
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="border border-gold-500/40 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-corporate-900/40 hover:border-gold-400 transition-colors block"
            >
              <span className="font-display font-light text-base sm:text-lg xl:text-xl tracking-widest text-white">
                CIIT<span className="text-gold-500 font-bold">2026</span>
              </span>
            </a>
            <div className="hidden 2xl:block border-l border-white/20 pl-3">
              <span className="text-[9px] text-gray-300 tracking-wider font-mono block leading-tight">
                {lang === 'pt' ? 'CONFERÊNCIA INTERNACIONAL' : 'INTERNATIONAL CONFERENCE'}
              </span>
              <span className="text-[9px] text-gold-400 font-sans block uppercase font-medium leading-tight">
                {lang === 'pt' ? 'DE INVESTIMENTOS DE TETE' : 'ON TETE INVESTMENTS'}
              </span>
            </div>
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
                  className={`px-1.5 xl:px-2.5 2xl:px-3 py-1.5 text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium tracking-tight xl:tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-gold-400 border-b-2 border-gold-500 font-bold'
                      : 'text-gray-300 hover:text-white'
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
              className="h-8 xl:h-9 flex items-center space-x-1 px-2.5 xl:px-3 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] xl:text-xs font-semibold text-white transition-all cursor-pointer whitespace-nowrap"
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
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
                  ? 'bg-gold-500/20 text-gold-300 border-gold-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-gold-500/30'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            </button>

            {/* CTA Register */}
            <button
              id="nav-cta-register"
              onClick={onRegisterClick}
              className="h-8 xl:h-9 flex items-center justify-center px-3 xl:px-4 2xl:px-5 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 text-[11px] xl:text-xs font-bold uppercase tracking-wider xl:tracking-widest shadow-md hover:shadow-gold-500/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              {t.navRegister}
            </button>
          </div>

          {/* Mobile & Tablet Menu Trigger button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              id="mobile-lang-switcher"
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="md:hidden h-8 flex items-center space-x-1 px-2.5 rounded-none bg-white/5 border border-white/10 text-xs text-white"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            <button
              id="mobile-header-admin-btn"
              onClick={onAdminToggle}
              title={t.navAdmin}
              aria-label={t.navAdmin}
              className={`md:hidden h-8 px-2.5 rounded-none border transition-all cursor-pointer flex items-center justify-center ${
                showAdminLink
                  ? 'bg-gold-500/20 text-gold-300 border-gold-500/50'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-gold-400" />
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8 p-0 flex items-center justify-center rounded-none text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none border border-white/10 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6 text-gold-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        } bg-corporate-950 border-b border-gold-600/20`}
      >
        <div className="px-3 pt-2 pb-6 space-y-1 sm:px-4 text-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              id={`mobile-nav-item-${item.href.substring(1)}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-3 py-2.5 rounded-none text-sm font-medium text-gray-200 hover:text-gold-400 hover:bg-white/5 transition-colors border-b border-white/5"
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
              className="w-full py-3 rounded-none bg-gold-600 text-corporate-950 text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors cursor-pointer"
            >
              {t.navRegister}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
