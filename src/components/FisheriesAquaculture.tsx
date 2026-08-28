/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Fish, 
  Anchor, 
  Waves, 
  CheckCircle2, 
  Factory,
  ArrowRight
} from 'lucide-react';
import { 
  FISHERIES_SPECIES_DISTRIBUTION, 
  FISHERIES_CAPACITY_HIGHLIGHTS, 
  FISHERIES_GALLERY_CARDS 
} from '../teteInvestmentData';

interface FisheriesAquacultureProps {
  lang: 'pt' | 'en';
}

export default function FisheriesAquaculture({ lang }: FisheriesAquacultureProps) {
  return (
    <section id="pesca-aquacultura" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <Waves className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Economia Azul do Zambeze' : 'Zambezi Blue Economy'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Pesca e Aquacultura' : 'Fisheries & Aquaculture'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt'
              ? 'A Albufeira de Cahora Bassa (2.700 km²) e a bacia do Rio Zambeze constituem o maior manancial de pesca continental de Moçambique, com enorme potencial em aquacultura industrial e captura sustentável.'
              : 'The Cahora Bassa Reservoir (2,700 km²) and the Zambezi River basin form Mozambique’s largest inland fishery, with immense potential in industrial aquaculture and sustainable capture.'}
          </p>
        </div>

        {/* 4 Official Core Stat Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {FISHERIES_CAPACITY_HIGHLIGHTS.map((stat, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">
                {lang === 'pt' ? stat.label : stat.labelEn}
              </span>
              <div className="text-3xl sm:text-4xl font-display font-black text-slate-950 tracking-tight my-1">
                {stat.value}
              </div>
              <span className="text-xs text-amber-800 font-semibold mt-2 pt-2 border-t border-slate-100">
                {lang === 'pt' ? stat.subtext : stat.subtextEn}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Exact Species Breakdown (93% Tilápia / Oreochromis niloticus, 2% Tigerfish, 2% Nchenga, etc.) */}
          <div className="lg:col-span-6 bg-white border-2 border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-950">
                    {lang === 'pt' ? 'Composição de Espécies Comerciais' : 'Commercial Species Breakdown'}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {lang === 'pt' ? 'Levantamento ictiológico da Albufeira de Cahora Bassa' : 'Ichthyological survey of Lake Cahora Bassa'}
                  </p>
                </div>
                <Fish className="w-6 h-6 text-amber-600" />
              </div>

              {/* Graphical Stacked Distribution Bar */}
              <div className="w-full h-8 flex rounded-none overflow-hidden mb-6 border border-slate-300">
                {FISHERIES_SPECIES_DISTRIBUTION.map((species, i) => (
                  <div
                    key={i}
                    style={{ width: `${species.percentage}%`, backgroundColor: species.color }}
                    className="h-full relative group cursor-pointer"
                    title={`${species.commonName}: ${species.percentage}%`}
                  />
                ))}
              </div>

              {/* Species Breakdown List */}
              <div className="space-y-3">
                {FISHERIES_SPECIES_DISTRIBUTION.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center space-x-3">
                      <span className="w-3.5 h-3.5 rounded-none flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="font-bold text-sm text-slate-900">{lang === 'pt' ? item.commonName : item.commonNameEn}</p>
                        <p className="text-[11px] text-slate-500 italic font-mono">{item.scientificName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-display font-black text-slate-950">{item.percentage}%</span>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'pt' ? 'Biomassa' : 'Biomass'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600 bg-amber-50/60 p-3 border border-amber-200/60">
              <strong>{lang === 'pt' ? 'Destaque de Mercado:' : 'Market Highlight:'}</strong>{' '}
              {lang === 'pt'
                ? 'A tilápia representa 93% do potencial piscícola, permitindo operações em gaiolas flutuantes de alto rendimento com ciclo curto de engorda e mercado garantido na SADC.'
                : 'Tilapia represents 93% of commercial fish biomass, enabling high-yield cage culture with fast growth cycles and guaranteed regional SADC demand.'}
            </div>
          </div>

          {/* Investment Opportunities Cards in Fisheries & Aquaculture */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
                <Anchor className="w-4 h-4 text-amber-400" />
                <span>{lang === 'pt' ? 'Oportunidades em Cadeia de Valor' : 'Value Chain Opportunities'}</span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {lang === 'pt' ? 'Aquacultura, Processamento & Exportação' : 'Aquaculture, Processing & Export'}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {lang === 'pt'
                  ? 'Frentes estratégicas prontas para atração de capitais privados com apoio governamental para concessões de águas e incentivos fiscais.'
                  : 'Strategic investment windows ready for private capital deployment with streamlined water concession permitting and fiscal incentives.'}
              </p>

              <div className="space-y-4">
                {FISHERIES_GALLERY_CARDS.map((opp, idx) => (
                  <div key={idx} className="bg-slate-800/80 border border-slate-700 p-4">
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {lang === 'pt' ? opp.title : opp.titleEn}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6.5">
                      {lang === 'pt' ? opp.description : opp.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {lang === 'pt' ? 'Mercados: Moçambique, Zâmbia, Zimbábue, RDC, Malawi' : 'Target Markets: Mozambique, Zambia, Zimbabwe, DRC, Malawi'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
