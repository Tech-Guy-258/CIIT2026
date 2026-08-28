/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Pickaxe, Search, MapPin } from 'lucide-react';
import { DISTRICT_MINERALS_DATA, MINERAL_FILTER_CATEGORIES } from '../teteInvestmentData';

interface MineralPotentialProps {
  lang: 'pt' | 'en';
}

export default function MineralPotential({ lang }: MineralPotentialProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMineralFilter, setSelectedMineralFilter] = useState<string>('Todos');

  const filteredDistricts = useMemo(() => {
    return DISTRICT_MINERALS_DATA.filter((item) => {
      const text = lang === 'pt' ? item.minerals : item.mineralsEn;
      const matchesSearch = 
        item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.mineralTypes && item.mineralTypes.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesMineral = 
        selectedMineralFilter === 'Todos' ||
        (item.mineralTypes && item.mineralTypes.some(m => m.toLowerCase() === selectedMineralFilter.toLowerCase())) ||
        text.toLowerCase().includes(selectedMineralFilter.toLowerCase());

      return matchesSearch && matchesMineral;
    });
  }, [searchTerm, selectedMineralFilter, lang]);

  return (
    <section id="potencial-mineral" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <Pickaxe className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Mapeamento Geológico' : 'Geological Mapping'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Potencial Mineral por Distrito' : 'Mineral Potential by District'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt'
              ? 'Tete abriga as maiores reservas conhecidas de carvão de alta qualidade do continente e jazigos substanciais de minerais críticos para a transição energética global.'
              : 'Tete holds Africa’s largest high-grade coal reserves alongside substantial deposits of critical minerals required for the global energy transition.'}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-50 border border-slate-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'pt' ? 'Pesquisar distrito ou minério (ex: Ouro, Moatize, Grafite)...' : 'Search district or mineral (e.g. Gold, Moatize, Graphite)...'}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium"
              />
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0">
              {MINERAL_FILTER_CATEGORIES.map((mineral) => (
                <button
                  key={mineral}
                  onClick={() => setSelectedMineralFilter(mineral)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedMineralFilter === mineral
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {mineral === 'Todos' ? (lang === 'pt' ? 'Todos (15)' : 'All (15)') : mineral}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDistricts.map((item) => (
            <div
              key={item.district}
              className="bg-white border-2 border-slate-200 p-5 sm:p-6 hover:border-amber-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <h3 className="font-display font-black text-lg text-slate-950">
                      {item.district}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    {lang === 'pt' ? 'Província de Tete' : 'Tete Province'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-3">
                  {lang === 'pt' ? item.minerals : item.mineralsEn}
                </p>

                {item.mineralTypes && item.mineralTypes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.mineralTypes.map((mineral) => {
                      const isHighlighted = selectedMineralFilter.toLowerCase() === mineral.toLowerCase();
                      return (
                        <span
                          key={mineral}
                          className={`text-xs px-2 py-0.5 font-mono font-semibold border ${
                            isHighlighted
                              ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {mineral}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>{lang === 'pt' ? 'Recurso Documentado' : 'Documented Resource'}</span>
                <span className="text-amber-700 font-bold">{lang === 'pt' ? 'Mapeamento Oficial' : 'Official Mapping'}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredDistricts.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-slate-200">
            <p className="text-sm font-mono text-slate-500">
              {lang === 'pt' ? 'Nenhum distrito encontrado para a pesquisa.' : 'No districts found matching your criteria.'}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
