/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronRight, Clock, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { TETE_KEY_INDICATORS } from '../teteInvestmentData';
import ciit2026Logo from "../assets/images/ciit_2026_logo_1787657793393.png";

interface HeroProps {
  lang: 'pt' | 'en';
  onRegisterClick: () => void;
  onExploreClick: () => void;
  onPortfolioClick?: () => void;
}

export default function Hero({ lang, onRegisterClick, onExploreClick, onPortfolioClick }: HeroProps) {
  const t = TRANSLATIONS[lang];

  // Countdown timer target: October 8, 2026 08:30:00
  const targetDate = new Date('2026-10-08T08:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isOver: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleScrollToPortfolio = () => {
    if (onPortfolioClick) {
      onPortfolioClick();
    } else {
      const el = document.getElementById('portfolio-projetos') || document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToOpportunities = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('onde-investir') || document.getElementById('about-tete');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] bg-gradient-to-b from-slate-50 via-white to-amber-50/40 flex flex-col items-center justify-center pt-6 pb-12 sm:pt-10 sm:pb-20 overflow-hidden px-3 sm:px-6 border-b border-slate-200 scroll-mt-28 sm:scroll-mt-36"
    >
      {/* Background Stylized Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-slate-50/60 to-white z-0" />
      
      {/* Geometric grid lines for a professional institutional feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gold & warm glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-amber-400/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* Mozambique Government Banner Header badge */}
        <div className="flex flex-col items-center mb-4 sm:mb-6 mt-1 sm:mt-0 w-full px-2">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-amber-100/90 border border-amber-300 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-xs max-w-full text-center">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse flex-shrink-0" />
            <p className="text-[10px] xs:text-[11px] sm:text-xs tracking-wide sm:tracking-widest uppercase font-mono text-amber-950 font-bold leading-tight break-words">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Brand Main Logo */}
        <div className="mb-3">
          <img
            src={ciit2026Logo}
            alt="CIIT 2026"
            className="w-auto h-16 sm:h-22 md:h-26 lg:h-28 object-contain"
          />
        </div>

        {/* High-Impact Headline Requested by User */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-950 mb-4 max-w-4xl leading-[1.12]">
          {t.heroHeadline || 'Invista em Tete. Construa o futuro.'}
        </h1>

        {/* High-Impact Subheadline Requested by User */}
        <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl leading-relaxed font-normal mb-8 sm:mb-10 px-2">
          {t.heroSubheadline || 'Descubra as oportunidades de investimento numa das regiões estratégicas de Moçambique, com vastos recursos naturais, potencial energético, agrícola, mineiro, turístico e logístico.'}
        </p>

        {/* Action CTAs: Explorar oportunidades & Ver portfólio de projetos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12">
          <button
            id="hero-explore-opportunities-btn"
            onClick={handleScrollToOpportunities}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs sm:text-sm tracking-widest shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.heroCtaExplore || 'Explorar oportunidades'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <button
            id="hero-view-portfolio-btn"
            onClick={handleScrollToPortfolio}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm uppercase tracking-widest font-bold shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.heroCtaPortfolio || 'Ver portfólio de projetos'}</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Event Date and Location Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 w-full max-w-2xl">
          <div className="flex items-center space-x-3 bg-white border border-slate-200 shadow-xs px-4 sm:px-5 py-3 rounded-none text-left flex-1 w-full">
            <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-widest font-bold">Data / Date</span>
              <span className="text-sm sm:text-base font-bold text-slate-900">{t.heroDate}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white border border-slate-200 shadow-xs px-4 sm:px-5 py-3 rounded-none text-left flex-1 w-full">
            <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-widest font-bold">Local / Venue</span>
              <span className="text-sm sm:text-base font-bold text-slate-900">{t.heroLocation}</span>
            </div>
          </div>
        </div>

        {/* Countdown Dashboard */}
        {!timeLeft.isOver && (
          <div className="mb-12 w-full max-w-xl">
            <div className="bg-white border-2 border-amber-300 rounded-none p-4 sm:p-6 shadow-sm relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 px-3.5 py-0.5 border border-amber-600 rounded-none flex items-center space-x-1.5 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-slate-950" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-950 font-black">
                  {lang === 'pt' ? 'CONTAGEM REGRESSIVA CIIT 2026' : 'CIIT 2026 COUNTDOWN'}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center mt-2">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-4xl font-display font-black text-slate-950 tracking-tight">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-600 font-bold mt-0.5">
                    {t.countdownDays}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200">
                  <span className="text-2xl sm:text-4xl font-display font-black text-slate-950 tracking-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-600 font-bold mt-0.5">
                    {t.countdownHours}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200">
                  <span className="text-2xl sm:text-4xl font-display font-black text-slate-950 tracking-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-600 font-bold mt-0.5">
                    {t.countdownMinutes}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200">
                  <span className="text-2xl sm:text-4xl font-display font-black text-amber-600 tracking-tight animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-600 font-bold mt-0.5">
                    {t.countdownSeconds}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Highlighted Key Indicators Bar (Area, Terra Arável, População, Distritos, Municípios, Águas Interiores) */}
        <div className="w-full border-t border-slate-200 pt-8 mt-2">
          <p className="text-[11px] uppercase font-mono tracking-widest text-slate-500 font-bold mb-4">
            {lang === 'pt' ? 'Indicadores Estratégicos da Província de Tete' : 'Strategic Indicators of Tete Province'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {TETE_KEY_INDICATORS.map((indicator) => (
              <div
                key={indicator.id}
                className="bg-white p-3.5 sm:p-4 border border-slate-200/90 shadow-xs text-center flex flex-col justify-center transition-all hover:border-amber-400 hover:shadow-sm"
              >
                <span className="text-base sm:text-lg lg:text-xl font-display font-black text-slate-950 tracking-tight">
                  {indicator.value}
                </span>
                <span className="text-xs font-semibold text-slate-700 mt-0.5">
                  {lang === 'pt' ? indicator.label : indicator.labelEn}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-1 hidden sm:block">
                  {lang === 'pt' ? indicator.subtext : indicator.subtextEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
