/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import ciit2026Logo from "../assets/images/ciit_2026_logo_1787657793393.png";

interface HeroProps {
  lang: 'pt' | 'en';
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ lang, onRegisterClick, onExploreClick }: HeroProps) {
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

  return (
    <section
      id="home"
      className="relative min-h-[85vh] sm:min-h-[90vh] bg-gradient-to-b from-slate-50 via-white to-amber-50/30 flex items-center justify-center py-10 sm:py-14 md:py-20 overflow-hidden px-4 sm:px-6 border-b border-slate-200"
    >
      {/* Background Stylized Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-slate-50/60 to-white z-0" />
      
      {/* Map watermark or geometric grid lines for a professional feel */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Luxury gold glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* Mozambique Government Banner Header badge */}
        <div className="animate-fade-in flex flex-col items-center mb-4 sm:mb-6 space-y-2">
          {/* Emblem representation */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-amber-100/80 border border-amber-300 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-none shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse flex-shrink-0" />
            <p className="text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase font-mono text-amber-950 font-bold">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/*
        / Brand Main Title /
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-slate-950 mb-2 uppercase leading-[1.1]">
          CIIT<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 font-black">2026</span>
        </h1>
        */}

        {/* Brand Main Logo */}
        <div className="mb-2">
          <img
            src={ciit2026Logo}
            alt="CIIT 2026"
            className="w-auto h-16 sm:h-24 md:h-28 lg:h-32 object-contain"
          />
        </div>

        <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-wider sm:tracking-widest text-slate-700 uppercase mb-6 sm:mb-8 max-w-2xl px-2">
          {lang === 'pt' ? 'Conferência Internacional de Investimentos de Tete' : 'International Conference on Tete Investments'}
        </p>

        {/* Theme Motto Quote Box */}
        <div className="max-w-3xl mb-8 sm:mb-12 border-l-4 border-amber-500 pl-4 sm:pl-6 md:pl-8 py-4 sm:py-5 text-left bg-white border border-slate-200/80 shadow-md w-full">
          <p className="text-lg sm:text-2xl md:text-3xl font-normal text-slate-900 leading-snug sm:leading-relaxed">
            {lang === 'pt' ? (
              <>O <span className="italic font-serif font-bold text-amber-800">Epicentro</span> do Crescimento Económico da África Austral</>
            ) : (
              <>The <span className="italic font-serif font-bold text-amber-800">Epicenter</span> of Southern African Economic Growth</>
            )}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-mono uppercase tracking-wider font-semibold">
            {t.heroMotto}
          </p>
        </div>

        {/* Date and Location Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 w-full max-w-2xl">
          <div className="flex items-center space-x-3 sm:space-x-4 bg-white border-2 border-slate-200 shadow-xs px-4 sm:px-6 py-3.5 sm:py-4.5 rounded-none text-left flex-1 w-full">
            <Calendar className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-widest font-bold">Data / Date</span>
              <span className="text-sm sm:text-base font-bold text-slate-900">{t.heroDate}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 bg-white border-2 border-slate-200 shadow-xs px-4 sm:px-6 py-3.5 sm:py-4.5 rounded-none text-left flex-1 w-full">
            <MapPin className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block font-mono uppercase tracking-widest font-bold">Local / Venue</span>
              <span className="text-sm sm:text-base font-bold text-slate-900">{t.heroLocation}</span>
            </div>
          </div>
        </div>

        {/* Countdown Dashboard */}
        {!timeLeft.isOver && (
          <div className="mb-10 sm:mb-14 w-full max-w-xl">
            <div className="bg-white border-2 border-amber-300 rounded-none p-5 sm:p-7 shadow-md relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 px-4 py-1 border border-amber-600 rounded-none flex items-center space-x-1.5 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-slate-950" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-950 font-black">CONTAGEM REGRESSIVA</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center mt-2">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-950 tracking-tight">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider sm:tracking-widest text-slate-600 font-bold mt-1">
                    {t.countdownDays}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-950 tracking-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider sm:tracking-widest text-slate-600 font-bold mt-1">
                    {t.countdownHours}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-950 tracking-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider sm:tracking-widest text-slate-600 font-bold mt-1">
                    {t.countdownMinutes}
                  </span>
                </div>
                <div className="flex flex-col border-l border-slate-200">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-amber-600 tracking-tight animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider sm:tracking-widest text-slate-600 font-bold mt-1">
                    {t.countdownSeconds}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            id="hero-register-btn"
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-none bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs sm:text-sm tracking-widest shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center"
          >
            {t.registerBtn}
          </button>
          
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-none bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm uppercase tracking-widest font-bold shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.learnMore}</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
