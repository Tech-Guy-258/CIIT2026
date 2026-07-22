/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../data';

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
      className="relative min-h-[90vh] bg-corporate-950 flex items-center justify-center pt-12 pb-16 overflow-hidden px-4"
    >
      {/* Background Stylized Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-corporate-900 via-corporate-950 to-black z-0" />
      
      {/* Map watermark or geometric grid lines for a professional tech feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Luxury gold glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-corporate-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Mozambique Government Banner Header badge */}
        <div className="animate-fade-in flex flex-col items-center mb-6 space-y-2">
          {/* Emblem representation */}
          <div className="flex items-center space-x-3 bg-gold-500/5 border border-gold-500/20 px-4 py-1.5 rounded-none backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            <p className="text-[10px] tracking-widest uppercase font-mono text-gold-400 font-bold">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Brand Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight text-white mb-2 uppercase leading-[1.1]">
          CIIT<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 font-black">2026</span>
        </h1>

        <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-gray-400 uppercase mb-8">
          Conferência Internacional de Investimentos de Tete
        </p>

        {/* Theme Motto Quote Box */}
        <div className="max-w-3xl mb-12 border-l-2 border-gold-600 pl-6 md:pl-8 py-4 text-left bg-corporate-900/40 backdrop-blur-sm">
          <p className="text-lg md:text-3xl font-light text-gray-100 leading-relaxed">
            {lang === 'pt' ? (
              <>O <span className="italic font-serif text-gold-400">Epicentro</span> do Crescimento Económico da África Austral</>
            ) : (
              <>The <span className="italic font-serif text-gold-400">Epicenter</span> of Southern African Economic Growth</>
            )}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-mono uppercase tracking-widest">
            {t.heroMotto}
          </p>
        </div>

        {/* Date and Location Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 w-full max-w-2xl">
          <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-4 rounded-none backdrop-blur-sm text-left flex-1 w-full">
            <Calendar className="w-5 h-5 text-gold-500 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-gray-500 block font-mono uppercase tracking-widest font-bold">Data / Date</span>
              <span className="text-sm font-medium text-white">{t.heroDate}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-4 rounded-none backdrop-blur-sm text-left flex-1 w-full">
            <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-gray-500 block font-mono uppercase tracking-widest font-bold">Local / Venue</span>
              <span className="text-sm font-medium text-white">{t.heroLocation}</span>
            </div>
          </div>
        </div>

        {/* Countdown Dashboard */}
        {!timeLeft.isOver && (
          <div className="mb-14 w-full max-w-xl">
            <div className="bg-corporate-900/60 border border-gold-500/20 rounded-none p-6 backdrop-blur-md shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-corporate-950 px-4 py-1 border border-gold-500/25 rounded-none flex items-center space-x-1">
                <Clock className="w-3 h-3 text-gold-500" />
                <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 font-bold">COUNTDOWN</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center mt-2">
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-display font-light text-white tracking-tight">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 mt-1">
                    {t.countdownDays}
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10">
                  <span className="text-3xl md:text-4xl font-display font-light text-white tracking-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 mt-1">
                    {t.countdownHours}
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10">
                  <span className="text-3xl md:text-4xl font-display font-light text-white tracking-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 mt-1">
                    {t.countdownMinutes}
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10">
                  <span className="text-3xl md:text-4xl font-display font-bold text-gold-500 tracking-tight animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 mt-1">
                    {t.countdownSeconds}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-register-btn"
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-10 py-4 rounded-none bg-slate-900 text-white font-bold uppercase text-xs tracking-widest border border-gold-500 hover:bg-gold-500 hover:text-slate-950 transition-colors duration-200 cursor-pointer text-center"
          >
            {t.registerBtn}
          </button>
          
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-10 py-4 rounded-none bg-white/5 hover:bg-white/10 text-white border border-white/20 text-xs uppercase tracking-widest font-bold hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.learnMore}</span>
            <ChevronRight className="w-4 h-4 text-gold-400" />
          </button>
        </div>
      </div>

      {/* Decorative Wave/Transition Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-fafafa to-transparent pointer-events-none" />
    </section>
  );
}
