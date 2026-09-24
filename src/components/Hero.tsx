/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Clock, 
  ArrowUpRight, 
  CalendarPlus, 
  Navigation, 
  ExternalLink 
} from 'lucide-react';
import { TRANSLATIONS } from '../data';
import ciit2026Logo from "../assets/images/ciit_2026_logo_1787657793393.png";
import mozambiqueEmblem from "../assets/images/Emblema da República/Emblem_of_Mozambique.svg";

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

  // Calendar scheduling handler: opens Google Calendar event with full details
  const handleScheduleCalendar = () => {
    const title = encodeURIComponent("CIIT 2026 - Conferência Internacional de Investimentos de Tete");
    const details = encodeURIComponent(
      "Conferência Internacional de Investimentos de Tete (CIIT 2026).\n" +
      "Local: Horizonte Lodge, Tete, Moçambique.\n" +
      "Lema: Tete no Horizonte de Investimentos: Oportunidades para uma Nova Era de Desenvolvimento.\n" +
      "Invista em Tete, construa o futuro."
    );
    const location = encodeURIComponent("Horizonte Lodge, Tete, Moçambique");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261008T063000Z/20261009T170000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  // Google Maps directions handler: directs straight to Horizonte Lodge, Tete
  const handleGetDirections = () => {
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Horizonte+Lodge+Tete+Mozambique";
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] bg-gradient-to-b from-slate-50 via-white to-amber-50/40 flex flex-col items-center justify-center pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden px-3 sm:px-6 border-b border-slate-200 scroll-mt-28 sm:scroll-mt-36"
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
        {/* Mozambique Government Banner Header badge - STRICT HIERARCHY: Emblema first, República, Governo Provincial */}
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 mt-1 sm:mt-2 w-full px-2">
          {/* Emblema Nacional da República de Moçambique */}
          <div className="mb-3.5 sm:mb-4 relative group">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl scale-125 pointer-events-none" />
            <img 
              src={mozambiqueEmblem} 
              alt="Emblema da República de Moçambique"
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* República de Moçambique (sem bolinha verde conforme solicitado) */}
          <div className="inline-flex items-center bg-slate-900 text-white border border-slate-800 px-5 py-2 shadow-xs mb-3">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase font-mono font-black">
              REPÚBLICA DE MOÇAMBIQUE
            </span>
          </div>

          {/* Governo da Província de Tete com espaçamento aumentado */}
          <div className="inline-flex items-center bg-amber-100/90 border border-amber-300 px-5 py-1.5 shadow-2xs">
            <span className="text-xs sm:text-sm tracking-wider uppercase font-display font-bold text-amber-950">
              {lang === 'pt' ? 'Governo da Província de Tete' : 'Government of Tete Province'}
            </span>
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

        {/* LEMA OFICIAL DA CONFERÊNCIA - "TETE NO HORIZONTE DE INVESTIMENTOS" */}
        <div className="mb-5 sm:mb-6 max-w-2xl mx-auto px-2">
          <div className="inline-block bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-5 sm:px-8 py-2.5 sm:py-3 border-2 border-amber-600 shadow-md">
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-[0.25em] block text-amber-950/90 mb-0.5">
              {lang === 'pt' ? 'LEMA OFICIAL DA CONFERÊNCIA' : 'OFFICIAL CONFERENCE MOTTO'}
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-display font-black tracking-tight uppercase text-slate-950">
              “TETE NO HORIZONTE DE INVESTIMENTOS”
            </h2>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-900 block mt-0.5 tracking-wide">
              {lang === 'pt' ? 'Oportunidades para uma Nova Era de Desenvolvimento' : 'Opportunities for a New Era of Development'}
            </span>
          </div>
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-950 mb-4 max-w-4xl leading-[1.12]">
          {t.heroHeadline || 'Invista em Tete. Construa o futuro.'}
        </h1>

        {/* High-Impact Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl leading-relaxed font-normal mb-8 sm:mb-10 px-2">
          {t.heroSubheadline || 'Descubra as oportunidades de investimento numa das regiões estratégicas de Moçambique, com vastos recursos naturais, potencial energético, agrícola, mineiro, turístico e logístico.'}
        </p>

        {/* Action CTAs: Explorar oportunidades & Ver portfólio de projetos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
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

        {/* Event Date and Location Bar - INTERACTIVE WITH CALENDAR REMINDER & GOOGLE MAPS DIRECTIONS */}
        <div className="w-full max-w-3xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Clickable Date Card -> Triggers Calendar Scheduling */}
            <button
              id="hero-date-calendar-btn"
              onClick={handleScheduleCalendar}
              title={lang === 'pt' ? 'Clique para agendar de imediato no seu calendário' : 'Click to schedule on your calendar'}
              className="group flex items-center justify-between p-4 bg-white border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 shadow-sm transition-all duration-200 cursor-pointer text-left w-full"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-2.5 bg-amber-100 border border-amber-300 text-amber-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">
                      {lang === 'pt' ? 'Data da Conferência' : 'Conference Date'}
                    </span>
                    <span className="inline-flex items-center text-[9px] font-mono font-bold bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded-xs uppercase">
                      Agendar
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-display font-black text-slate-950 block truncate">
                    {lang === 'pt' ? '8 e 9 de Outubro de 2026' : 'October 8-9, 2026'}
                  </span>
                </div>
              </div>
              <CalendarPlus className="w-5 h-5 text-amber-600 group-hover:scale-110 group-hover:text-amber-700 transition-all flex-shrink-0 ml-2" />
            </button>

            {/* Clickable Location Card -> Triggers Google Maps to Horizonte Lodge */}
            <button
              id="hero-location-maps-btn"
              onClick={handleGetDirections}
              title={lang === 'pt' ? 'Clique para obter direções do Horizonte Lodge no Google Maps' : 'Click to get directions on Google Maps'}
              className="group flex items-center justify-between p-4 bg-white border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 shadow-sm transition-all duration-200 cursor-pointer text-left w-full"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-2.5 bg-amber-100 border border-amber-300 text-amber-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">
                      {lang === 'pt' ? 'Local do Evento' : 'Event Venue'}
                    </span>
                    <span className="inline-flex items-center text-[9px] font-mono font-bold bg-emerald-100 text-emerald-950 px-1.5 py-0.2 rounded-xs uppercase">
                      Direções
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-display font-black text-slate-950 block truncate">
                    Horizonte Lodge, Tete
                  </span>
                </div>
              </div>
              <Navigation className="w-5 h-5 text-amber-600 group-hover:scale-110 group-hover:text-amber-700 transition-all flex-shrink-0 ml-2" />
            </button>
          </div>

          {/* Mandatory user-requested note */}
          <div className="mt-3 text-center">
            <p className="inline-flex items-center space-x-2 text-xs text-amber-950 bg-amber-50 border border-amber-200 px-4 py-2 font-mono shadow-2xs">
              <span className="font-extrabold uppercase tracking-wider text-amber-700">
                {lang === 'pt' ? 'Nota:' : 'Note:'}
              </span>
              <span>
                {lang === 'pt'
                  ? 'Clique na data para agendar de imediato no seu calendário e no local para obter direções do Horizonte Lodge a partir do Google Maps.'
                  : 'Click the date to schedule immediately on your calendar, and click the location to get directions to Horizonte Lodge from Google Maps.'}
              </span>
            </p>
          </div>
        </div>

        {/* Countdown Dashboard */}
        {!timeLeft.isOver && (
          <div className="mb-6 w-full max-w-xl">
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

        {/* HIGH-PROMINENCE REGISTRATION BUTTON IMMEDIATELY AFTER COUNTDOWN (USER REQUEST) */}
        <div className="w-full max-w-xl mb-4 flex flex-col items-center">
          <button
            id="hero-register-prominent-cta"
            onClick={onRegisterClick}
            className="w-full py-4 sm:py-5 px-6 sm:px-10 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-display font-black text-base sm:text-xl uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-3 border-2 border-amber-600 group"
          >
            <span className="whitespace-nowrap">{lang === 'pt' ? 'INSCREVA-SE NA CIIT 2026' : 'REGISTER FOR CIIT 2026'}</span>
            <ArrowUpRight className="w-6 h-6 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
          </button>
          <div className="flex items-center space-x-2 text-xs text-slate-600 font-mono mt-2.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {lang === 'pt'
                ? 'Acreditação Oficial Aberta • Lugares Limitados no Horizonte Lodge'
                : 'Official Accreditation Open • Limited Seats at Horizonte Lodge'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
