/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { ENERGY_PROJECTS_DATA, ENERGY_OPPORTUNITIES_LIST } from '../teteInvestmentData';

interface EnergyPotentialProps {
  lang: 'pt' | 'en';
  onViewProjectsClick?: () => void;
}

export default function EnergyPotential({ lang, onViewProjectsClick }: EnergyPotentialProps) {
  return (
    <section id="potencial-energetico" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/40 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'pt' ? 'Polo Energético da África Austral' : 'Southern Africa Powerhouse'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase mb-4">
            {lang === 'pt' ? 'Potencial Energético de Tete' : 'Energy Potential of Tete'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            {lang === 'pt'
              ? 'Tete gera a vasta maioria da eletricidade de Moçambique através da HCB (2.925 MW) e ancora a nova geração de megaprojetos hidroelétricos e solares para exportação regional no SAPP.'
              : 'Tete generates the vast majority of Mozambique’s power through HCB (2,925 MW) and anchors a new generation of hydro and solar megaprojects for SAPP export.'}
          </p>
        </div>

        {/* Flagship Energy Projects Grid (HCB, Mphanda Nkuwa, Boroma, Lupata) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ENERGY_PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-800/90 border border-slate-700 p-6 flex flex-col justify-between hover:border-amber-500 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border bg-amber-950 text-amber-300 border-amber-700">
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {proj.name}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-display font-black text-amber-400">
                    {proj.capacity}
                  </span>
                  <span className="text-xs text-slate-400 block font-mono mt-0.5">
                    {proj.type}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 text-[11px] font-mono text-amber-400 flex items-center justify-between">
                <span>{lang === 'pt' ? 'Rede SAPP & EDM' : 'SAPP & EDM Grid'}</span>
                <span>{proj.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sectoral Energy Opportunities List */}
        <div className="bg-slate-800/60 border border-slate-700 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                {lang === 'pt' ? 'Frentes de Expansão e Transição' : 'Expansion & Clean Transition'}
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                {lang === 'pt' ? 'Oportunidades em Renováveis, Redes & Armazenamento' : 'Opportunities in Renewables, Grids & Storage'}
              </h3>
            </div>

            <a
              href="#portfolio-projetos"
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 text-xs font-mono uppercase tracking-widest font-black transition-colors"
            >
              <span>{lang === 'pt' ? 'Consultar Projetos' : 'Review Projects'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENERGY_OPPORTUNITIES_LIST.map((opp, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-700/80 p-5">
                <div className="flex items-center space-x-2.5 mb-2">
                  <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <h4 className="font-bold text-white text-base">
                    {opp.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6.5">
                  {opp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
