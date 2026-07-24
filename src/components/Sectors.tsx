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
                className="group relative bg-corporate-950 overflow-hidden rounded-none p-8 border border-slate-200/80 hover:border-gold-500 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[350px]"
              >
                {/* Background Illustration / Image with Overlay */}
                {sector.imageUrl && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={sector.imageUrl}
                      alt={sector.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-50 scale-100 group-hover:scale-110 transition-all duration-700 ease-out filter brightness-90 saturate-125"
                    />
                    {/* Dark Gradient Overlay for optimal legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-corporate-950 via-corporate-950/85 to-corporate-950/40 group-hover:from-corporate-950 group-hover:via-corporate-950/75 group-hover:to-corporate-950/25 transition-all duration-500" />
                  </div>
                )}

                {/* Decorative floating letter background */}
                <span className="absolute top-4 right-6 text-7xl font-display font-black text-white/10 group-hover:text-gold-400/25 select-none pointer-events-none transition-colors z-10">
                  {sector.title.substring(0, 2).toUpperCase()}
                </span>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-none bg-gold-500/20 group-hover:bg-gold-500 border border-gold-500/40 flex items-center justify-center mb-6 transition-all duration-300 shadow-lg">
                    {renderIcon(sector.iconName, "w-6 h-6 text-gold-400 group-hover:text-corporate-950 transition-colors")}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase group-hover:text-gold-300 transition-colors">
                    {lang === 'pt' ? sector.title : (sector.titleEn || sector.title)}
                  </h3>
                  <p className="text-xs font-mono font-bold text-gold-400 mt-1 uppercase tracking-wider">
                    {lang === 'pt' ? sector.subtitle : (sector.subtitleEn || sector.subtitle)}
                  </p>

                  {/* Short Description */}
                  <p className="text-sm text-gray-200 mt-4 line-clamp-3 leading-relaxed font-light">
                    {lang === 'pt' ? sector.description : (sector.descriptionEn || sector.description)}
                  </p>
                </div>

                {/* Card Footer actions */}
                <div className="relative z-10 mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-mono text-gray-300">
                      {t.sectDataLabel}
                    </span>
                    <span className="text-gold-300 font-bold block mt-0.5 text-sm">
                      {lang === 'pt' ? sector.keyData : (sector.keyDataEn || sector.keyData)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-none bg-gold-500/20 text-gold-300 group-hover:bg-gold-500 group-hover:text-corporate-950 transition-all duration-300 border border-gold-500/40">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedSector(null)}
          >
            <div
              className="bg-white rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold-600/30 relative animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header with illustration background */}
              <div className="bg-corporate-950 text-white p-8 relative overflow-hidden">
                {selectedSector.imageUrl && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={selectedSector.imageUrl}
                      alt={selectedSector.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-40 filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-corporate-950 via-corporate-950/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  <button
                    id="close-sector-modal-btn"
                    onClick={() => setSelectedSector(null)}
                    className="absolute top-0 right-0 p-2 rounded-none bg-black/40 hover:bg-gold-500 hover:text-corporate-950 border border-white/20 text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-none bg-gold-500/20 border border-gold-500/40 backdrop-blur-md">
                      {renderIcon(selectedSector.iconName, "w-6 h-6 text-gold-400")}
                    </div>
                    <span className="text-xs font-mono text-gold-400 tracking-widest uppercase font-bold">
                      {lang === 'pt' ? 'Pilar' : 'Pillar'} {lang === 'pt' ? selectedSector.title : (selectedSector.titleEn || selectedSector.title)}
                    </span>
                  </div>

                  <h3 className="text-3xl font-display font-light text-white uppercase tracking-tight">
                    {lang === 'pt' ? selectedSector.title : (selectedSector.titleEn || selectedSector.title)}
                  </h3>
                  <p className="text-sm font-mono text-gold-300 uppercase tracking-widest mt-1">
                    {lang === 'pt' ? selectedSector.subtitle : (selectedSector.subtitleEn || selectedSector.subtitle)}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    {lang === 'pt' ? 'Contexto de Investimento' : 'Investment Context'}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-light">
                    {lang === 'pt' ? selectedSector.description : (selectedSector.descriptionEn || selectedSector.description)}
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
                      {lang === 'pt' ? selectedSector.keyData : (selectedSector.keyDataEn || selectedSector.keyData)}
                    </span>
                  </div>
                </div>

                {/* Opportunities Bullet Points */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                    {t.sectOppTitle}
                  </h4>
                  <ul className="space-y-3">
                    {(lang === 'pt' ? selectedSector.investmentOpportunities : (selectedSector.investmentOpportunitiesEn || selectedSector.investmentOpportunities)).map((opportunity, i) => (
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
