/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Pickaxe, 
  Sprout, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  Building2,
  ShieldCheck
} from 'lucide-react';
import { WHERE_TO_INVEST_SECTORS } from '../teteInvestmentData';

interface WhereToInvestProps {
  lang: 'pt' | 'en';
  onSelectProjectSector?: (sector: string) => void;
}

export default function WhereToInvest({ lang, onSelectProjectSector }: WhereToInvestProps) {
  const [activeSectorId, setActiveSectorId] = useState<string>('energia');

  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'energia':
        return <Zap className="w-6 h-6 text-amber-600" />;
      case 'extrativa':
        return <Pickaxe className="w-6 h-6 text-amber-600" />;
      case 'agricultura':
        return <Sprout className="w-6 h-6 text-amber-600" />;
      default:
        return <Layers className="w-6 h-6 text-amber-600" />;
    }
  };

  const activeSector = WHERE_TO_INVEST_SECTORS.find((s) => s.id === activeSectorId) || WHERE_TO_INVEST_SECTORS[0];

  return (
    <section id="onde-investir" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Setores Prioritários' : 'Priority Sectors'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Onde Investir em Tete' : 'Where to Invest in Tete'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt' 
              ? 'Conheça os três principais vetores de atração de capital com retorno estruturado, projetos prioritários e apoio institucional contínuo.' 
              : 'Explore the three main capital attraction engines featuring structured returns, priority pipelines, and dedicated institutional backing.'}
          </p>
        </div>

        {/* Sector Nav Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {WHERE_TO_INVEST_SECTORS.map((sector) => {
            const isSelected = activeSectorId === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`p-5 text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-500'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 ${isSelected ? 'bg-amber-100' : 'bg-slate-100'}`}>
                    {getSectorIcon(sector.id)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-950">
                      {lang === 'pt' ? sector.title : sector.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {sector.opportunities.length} {lang === 'pt' ? 'frentes prioritárias' : 'priority fronts'}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Active Sector Detailed Presentation */}
        <div className="bg-white border-2 border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 mb-8">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-700 font-bold mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{lang === 'pt' ? 'Vetor Estratégico de Investimento' : 'Strategic Investment Vector'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                {lang === 'pt' ? activeSector.title : activeSector.titleEn}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {lang === 'pt' ? activeSector.description : activeSector.descriptionEn}
              </p>
            </div>
            
            <a
              href="#portfolio-projetos"
              className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-bold self-start lg:self-center transition-colors"
            >
              <span>{lang === 'pt' ? 'Ver Projetos Deste Setor' : 'View Sector Projects'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* Sub-opportunities grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-4">
              {lang === 'pt' ? 'Oportunidades Específicas de Investimento:' : 'Specific Investment Opportunities:'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(lang === 'pt' ? activeSector.opportunities : (activeSector.opportunitiesEn || activeSector.opportunities)).map((opp, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 border border-slate-200/90 p-4 sm:p-5 flex items-start space-x-3.5 hover:bg-amber-50/40 hover:border-amber-300 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    {opp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
