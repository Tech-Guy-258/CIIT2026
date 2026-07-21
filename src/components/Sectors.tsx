/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { THE_6_CS, TRANSLATIONS } from '../data';
import { Zap, Gem, Milk, Sprout, Building, Cpu, ArrowRight, X, TrendingUp } from 'lucide-react';
import { SectorDetail } from '../types';

interface SectorsProps {
  lang: 'pt' | 'en';
}

export default function Sectors({ lang }: SectorsProps) {
  const t = TRANSLATIONS[lang];
  const [selectedSector, setSelectedSector] = useState<SectorDetail | null>(null);

  // Map icon names to lucide icons
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className={className} />;
      case 'Gem':
        return <Gem className={className} />;
      case 'Beef':
        return <Milk className={className} />; // Goat is represented beautifully by Milk (livestock) or custom premium animal icon representation.
      case 'Sprout':
        return <Sprout className={className} />;
      case 'Building':
        return <Building className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      default:
        return <TrendingUp className={className} />;
    }
  };

  return (
    <section id="sectors" className="py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/5 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? "Oportunidades de Negócio" : "Business Opportunities"}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.sectTitle}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            {t.sectSubtitle}
          </p>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        {/* 6C's Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {THE_6_CS.map((sector) => {
            const localizedSector = THE_6_CS.find(item => item.id === sector.id) || sector;
            return (
              <div
                key={sector.id}
                id={`sector-card-${sector.id}`}
                onClick={() => setSelectedSector(localizedSector)}
                className="group relative bg-neutral-50 rounded-none p-8 border border-slate-200 hover:border-gold-500/50 hover:bg-corporate-950 hover:text-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Decorative floating letter/number background */}
                <span className="absolute top-4 right-6 text-7xl font-display font-black text-gray-200/40 group-hover:text-white/5 select-none pointer-events-none transition-colors">
                  {sector.title.substring(0, 2).toUpperCase()}
                </span>

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-none bg-gold-500/10 group-hover:bg-gold-500/20 border border-gold-600/10 group-hover:border-gold-500/40 flex items-center justify-center mb-6 transition-all">
                    {renderIcon(sector.iconName, "w-6 h-6 text-gold-600 group-hover:text-gold-400")}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-display font-bold text-corporate-950 group-hover:text-white tracking-tight uppercase">
                    {sector.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-gold-700 group-hover:text-gold-300 mt-1 uppercase tracking-wider">
                    {sector.subtitle}
                  </p>

                  {/* Short Description */}
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 mt-4 line-clamp-3 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                {/* Card Footer actions */}
                <div className="mt-8 pt-4 border-t border-gray-100 group-hover:border-white/10 flex items-center justify-between text-xs font-semibold">
                  <div className="text-gray-400 group-hover:text-gray-400">
                    <span className="block text-[10px] uppercase tracking-widest font-mono">
                      {t.sectDataLabel}
                    </span>
                    <span className="text-corporate-950 group-hover:text-gold-300 font-bold block mt-0.5">
                      {sector.keyData}
                    </span>
                  </div>
                  <div className="p-2 rounded-none bg-gold-500/10 text-gold-700 group-hover:bg-gold-500 group-hover:text-corporate-950 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Details Drawer / Modal Dialog */}
        {selectedSector && (
          <div
            id="sector-details-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedSector(null)}
          >
            <div
              className="bg-white rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold-600/20 relative animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header with colored badge */}
              <div className="bg-corporate-950 text-white p-8 relative">
                <button
                  id="close-sector-modal-btn"
                  onClick={() => setSelectedSector(null)}
                  className="absolute top-6 right-6 p-2 rounded-none bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
 
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-none bg-gold-500/20 border border-gold-500/40">
                    {renderIcon(selectedSector.iconName, "w-6 h-6 text-gold-400")}
                  </div>
                  <span className="text-xs font-mono text-gold-400 tracking-widest uppercase font-bold">
                    Pilar {selectedSector.title}
                  </span>
                </div>

                <h3 className="text-3xl font-display font-light text-white uppercase tracking-tight">
                  {selectedSector.title}
                </h3>
                <p className="text-sm font-mono text-gold-300 uppercase tracking-widest mt-1">
                  {selectedSector.subtitle}
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    {lang === 'pt' ? 'Contexto de Investimento' : 'Investment Context'}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-light">
                    {selectedSector.description}
                  </p>
                </div>

                {/* Highlight metric box */}
                <div className="bg-gold-50 border border-gold-500/20 rounded-none p-5 flex items-center space-x-4">
                  <TrendingUp className="w-8 h-8 text-gold-700 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gold-900/60 uppercase font-mono tracking-wider block">
                      {t.sectDataLabel}
                    </span>
                    <span className="text-base font-display font-black text-corporate-950 block">
                      {selectedSector.keyData}
                    </span>
                  </div>
                </div>

                {/* Opportunities Bullet Points */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                    {t.sectOppTitle}
                  </h4>
                  <ul className="space-y-3">
                    {selectedSector.investmentOpportunities.map((opportunity, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 flex-shrink-0" />
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Action footer */}
              <div className="bg-neutral-50 px-8 py-5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">CIIT 2026 • Tete, Moçambique</span>
                <button
                  onClick={() => setSelectedSector(null)}
                  className="px-5 py-2.5 rounded-none bg-corporate-950 text-white hover:bg-corporate-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  {lang === 'pt' ? 'Fechar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
