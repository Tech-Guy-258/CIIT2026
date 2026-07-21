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
    { label: t.navAbout, href: '#about' },
    { label: t.nav6cs, href: '#sectors' },
    { label: t.navSpeakers, href: '#speakers' },
    { label: t.navAgenda, href: '#agenda' },
    { label: t.navTravel, href: '#travel' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-corporate-950/95 backdrop-blur-md border-b border-gold-600/20 py-3 shadow-lg'
          : 'bg-gradient-to-b from-corporate-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="border border-gold-500/40 px-2.5 py-1.5 rounded-none bg-corporate-900/40">
              <span className="font-display font-light text-xl tracking-widest text-white">
                CIIT<span className="text-gold-500 font-bold">2026</span>
              </span>
            </div>
            <div className="hidden lg:block border-l border-white/20 pl-3">
              <span className="text-[10px] text-gray-300 tracking-wider font-mono block">
                CONFERÊNCIA INTERNACIONAL
              </span>
              <span className="text-[10px] text-gold-400 font-sans block uppercase font-medium">
                DE INVESTIMENTOS DE TETE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  id={`nav-item-${item.href.substring(1)}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-xs lg:text-sm font-medium tracking-widest uppercase transition-all duration-200 ${
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

          {/* Actions: Lang, Admin, Register */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Lang Switcher */}
            <button
              id="lang-switcher"
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            {/* Admin toggle */}
            <button
              id="admin-dashboard-btn"
              onClick={onAdminToggle}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-none text-xs font-semibold border transition-all cursor-pointer ${
                showAdminLink
                  ? 'bg-gold-500/20 text-gold-300 border-gold-500/40'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span>{t.navAdmin}</span>
            </button>

            {/* CTA Register */}
            <button
              id="nav-cta-register"
              onClick={onRegisterClick}
              className="px-5 py-2.5 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-gold-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.navRegister}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="mobile-lang-switcher"
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="flex items-center space-x-1 p-2 rounded-none bg-white/5 border border-white/10 text-xs text-white"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-none text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-corporate-950 border-b border-gold-600/20`}
      >
        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              id={`mobile-nav-item-${item.href.substring(1)}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-3 py-3 rounded-none text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-4 pb-2 border-t border-white/10 flex flex-col items-center space-y-3 px-4">
            <button
              id="mobile-admin-dashboard-btn"
              onClick={() => {
                setIsOpen(false);
                onAdminToggle();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-none bg-white/5 text-gray-300 border border-white/10 text-sm font-semibold"
            >
              <Lock className="w-4 h-4 text-gold-500" />
              <span>{t.navAdmin}</span>
            </button>

            <button
              id="mobile-nav-cta-register"
              onClick={() => {
                setIsOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3 rounded-none bg-gold-600 text-corporate-950 text-sm font-bold uppercase tracking-widest"
            >
              {t.navRegister}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
