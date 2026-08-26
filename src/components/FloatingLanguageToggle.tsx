/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe } from 'lucide-react';

interface FloatingLanguageToggleProps {
  lang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
}

export default function FloatingLanguageToggle({
  lang,
  setLang
}: FloatingLanguageToggleProps) {
  const toggleLanguage = () => {
    setLang(lang === 'pt' ? 'en' : 'pt');
  };

  // If site is PT, display EN; if site is EN, display PT
  const nextLang = lang === 'pt' ? 'EN' : 'PT';
  const tooltipText = lang === 'pt' ? 'Switch to English (EN)' : 'Mudar para Português (PT)';

  return (
    <div
      id="floating-language-toggle-container"
      className="fixed bottom-6 right-6 z-40 select-none group"
    >
      <button
        id="btn-floating-language-toggle"
        onClick={toggleLanguage}
        title={tooltipText}
        aria-label={tooltipText}
        className="flex items-center space-x-1.5 px-3 py-2 bg-corporate-950/95 hover:bg-gold-500 text-gold-400 hover:text-corporate-950 border border-gold-500/50 hover:border-gold-400 shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer rounded-none font-mono font-bold text-xs"
      >
        <Globe className="w-4 h-4 flex-shrink-0" />
        <span className="tracking-wider uppercase font-black">{nextLang}</span>
      </button>

      {/* Suggestive Hover Tooltip */}
      <div className="absolute right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-corporate-950/95 text-gold-300 border border-gold-500/40 text-[11px] font-mono px-2.5 py-1 shadow-xl">
          {tooltipText}
        </div>
      </div>
    </div>
  );
}

