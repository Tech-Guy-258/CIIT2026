/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Truck, 
  Trees, 
  Sprout, 
  Zap, 
  Gem, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Compass,
  ArrowRight,
  Pickaxe,
  Fish,
  Beef,
  Globe2
} from 'lucide-react';
import { 
  TETE_ABOUT_METRICS, 
  WHY_INVEST_TETE 
} from '../teteInvestmentData';
import { 
  DISTRICTS_DETAILED_DATA, 
  MUNICIPALITIES_DETAILED_DATA, 
  BORDERS_DETAILED_DATA 
} from '../data/teteTerritoryData';
import { DistrictDetail, MunicipalityDetail, BorderDetail } from '../types';
import TeteHistoryTimeline from './territory/TeteHistoryTimeline';
import TerritoryDetailModal from './territory/TerritoryDetailModal';

interface AboutTeteProps {
  lang: 'pt' | 'en';
  onExplorePortfolio?: () => void;
  onInquireInterest?: (subjectName: string) => void;
}

export default function AboutTete({ lang, onExplorePortfolio, onInquireInterest }: AboutTeteProps) {
  const [activeTab, setActiveTab] = useState<'districts' | 'municipalities' | 'borders'>('districts');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictDetail | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityDetail | null>(null);
  const [selectedBorder, setSelectedBorder] = useState<BorderDetail | null>(null);

  const handleOpenDistrict = (dist: DistrictDetail) => {
    setSelectedDistrict(dist);
    setSelectedMunicipality(null);
    setSelectedBorder(null);
    setIsModalOpen(true);
  };

  const handleOpenMunicipality = (mun: MunicipalityDetail) => {
    setSelectedMunicipality(mun);
    setSelectedDistrict(null);
    setSelectedBorder(null);
    setIsModalOpen(true);
  };

  const handleOpenBorder = (bor: BorderDetail) => {
    setSelectedBorder(bor);
    setSelectedDistrict(null);
    setSelectedMunicipality(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-6 h-6 text-amber-600" />;
      case 'Truck': return <Truck className="w-6 h-6 text-amber-600" />;
      case 'Trees': return <Trees className="w-6 h-6 text-amber-600" />;
      case 'Sprout': return <Sprout className="w-6 h-6 text-amber-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-600" />;
      case 'Gem': return <Gem className="w-6 h-6 text-amber-600" />;
      default: return <Compass className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="sobre-tete" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION HEADER: SOBRE TETE */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-900 uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'pt' ? 'Província Estratégica' : 'Strategic Province'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Sobre a Província de Tete' : 'About Tete Province'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {lang === 'pt' 
              ? 'Localizada no centro-oeste de Moçambique, a Província de Tete é o coração energético e mineral do país, com uma localização geográfica privilegiada ligando os principais mercados da região austral.' 
              : 'Located in west-central Mozambique, Tete Province represents the national energy and mineral hub, endowed with a privileged geographic positioning linking major Southern African markets.'}
          </p>
        </div>

        {/* RIGOROUS PROVINCIAL METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-50 border border-slate-200 p-5 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              {lang === 'pt' ? 'Área Territorial' : 'Land Area'}
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              {TETE_ABOUT_METRICS.area}
            </div>
            <span className="text-xs text-amber-700 font-semibold mt-1 block">
              {lang === 'pt' ? TETE_ABOUT_METRICS.areaRank : '3rd largest by area'}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              {lang === 'pt' ? 'Terra Arável' : 'Arable Land'}
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              {TETE_ABOUT_METRICS.arableLand}
            </div>
            <span className="text-xs text-slate-600 mt-1 block">
              {lang === 'pt' ? 'Elevada fertilidade e regadio' : 'High fertility & irrigation'}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              {lang === 'pt' ? 'População Total' : 'Total Population'}
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              {TETE_ABOUT_METRICS.population}
            </div>
            <span className="text-xs text-amber-700 font-semibold mt-1 block">
              {lang === 'pt' ? `${TETE_ABOUT_METRICS.activePopulation} ativa (PEA)` : `${TETE_ABOUT_METRICS.activePopulation} active pop`}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              {lang === 'pt' ? 'Águas Interiores' : 'Inland Waters'}
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-slate-950">
              {TETE_ABOUT_METRICS.inlandWaters}
            </div>
            <span className="text-xs text-slate-600 mt-1 block">
              {lang === 'pt' ? `${TETE_ABOUT_METRICS.cahoraBassaWaters} na Albufeira HCB` : `${TETE_ABOUT_METRICS.cahoraBassaWaters} in HCB reservoir`}
            </span>
          </div>
        </div>

        {/* 18, 21, 26. EXPERIÊNCIA INTERATIVA DOS DISTRITOS, MUNICÍPIOS E FRONTEIRAS */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
                {lang === 'pt' ? 'Divisão Territorial & Oportunidades Locais' : 'Territorial Division & Local Opportunities'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                {lang === 'pt' ? 'Distritos, Municípios e Fronteiras' : 'Districts, Municipalities & Borders'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-light">
                {lang === 'pt'
                  ? 'Clique em qualquer território para abrir a ficha técnica detalhada com história, dados económicos e projetos.'
                  : 'Click on any territory to view the full detailed profile with history, economic data, and projects.'}
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setActiveTab('districts')}
                className={`px-3 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'districts' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {lang === 'pt' ? '15 Distritos' : '15 Districts'}
              </button>
              <button
                onClick={() => setActiveTab('municipalities')}
                className={`px-3 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'municipalities' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {lang === 'pt' ? '5 Municípios' : '5 Municipalities'}
              </button>
              <button
                onClick={() => setActiveTab('borders')}
                className={`px-3 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'borders' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {lang === 'pt' ? '3 Fronteiras' : '3 Borders'}
              </button>
            </div>
          </div>

          {/* TAB 1: 15 DISTRITOS CARDS */}
          {activeTab === 'districts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISTRICTS_DETAILED_DATA.map((dist) => (
                <div
                  key={dist.id}
                  className="bg-white border-2 border-slate-200 overflow-hidden flex flex-col justify-between hover:border-amber-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* District Image with overlay */}
                  <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={dist.image}
                      alt={dist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider">
                      Distrito #{dist.id}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="text-xl font-display font-black text-white group-hover:text-amber-400 transition-colors uppercase">
                        {dist.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-slate-300 mt-0.5 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Sede: {dist.capital}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Location Badge */}
                      <div className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono mb-2.5 border border-slate-200">
                        <Compass className="w-3 h-3 text-amber-600" />
                        <span>{dist.location}</span>
                      </div>

                      {/* Tagline / Short description */}
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {dist.tagline}
                      </p>
                    </div>

                    {/* Main Economic Activities */}
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1.5">
                        {lang === 'pt' ? 'Atividades Económicas:' : 'Economic Activities:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dist.economy.slice(0, 3).map((act, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-amber-50/70 border border-amber-200 text-amber-900 text-[10px] font-mono font-medium"
                          >
                            {act.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleOpenDistrict(dist)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      <span>{lang === 'pt' ? 'Conhecer Distrito' : 'Explore District'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: 5 MUNICÍPIOS CARDS */}
          {activeTab === 'municipalities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MUNICIPALITIES_DETAILED_DATA.map((mun) => (
                <div
                  key={mun.id}
                  className="bg-white border-2 border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={mun.image}
                      alt={mun.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider">
                      {mun.status}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="text-xl font-display font-black text-white group-hover:text-emerald-400 transition-colors uppercase">
                        {mun.name}
                      </h4>
                      <p className="text-xs text-slate-300 font-mono">{mun.population}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {mun.overview}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                        {lang === 'pt' ? 'Vetor Económico Principal:' : 'Primary Economic Vector:'}
                      </span>
                      <p className="text-xs text-slate-800 line-clamp-2">
                        {mun.economy}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenMunicipality(mun)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      <span>{lang === 'pt' ? 'Conhecer Município' : 'Explore Municipality'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: 3 FRONTEIRAS CARDS */}
          {activeTab === 'borders' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BORDERS_DETAILED_DATA.map((bor) => (
                <div
                  key={bor.id}
                  className="bg-white border-2 border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-slate-950 p-6 text-white relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{bor.flag}</span>
                      <span className="text-xs font-mono text-amber-400 font-bold">{bor.borderLength}</span>
                    </div>
                    <h4 className="text-2xl font-display font-bold text-white mt-4 uppercase">
                      {bor.country}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 mt-1">{bor.borderType}</p>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {bor.commercialImportance}
                      </p>
                      <div className="bg-slate-50 border border-slate-200 p-3 text-[11px] font-mono text-slate-700">
                        <strong className="block text-slate-900 mb-1">Postos Oficiais:</strong>
                        {bor.borderPosts.map(p => p.name).join(', ')}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBorder(bor)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      <span>{lang === 'pt' ? 'Conhecer Fronteira' : 'Explore Border'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 24. CRONOLOGIA HISTÓRICA E IDENTIDADE TERRITORIAL */}
        <TeteHistoryTimeline lang={lang} />

        {/* PORQUÊ INVESTIR EM TETE */}
        <div id="porque-investir" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-amber-100/80 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'pt' ? 'Diferenciais Competitivos' : 'Competitive Advantages'}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
              {lang === 'pt' ? 'Porquê Investir em Tete' : 'Why Invest in Tete'}
            </h3>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              {lang === 'pt' 
                ? 'Seis pilares estratégicos de oportunidade e crescimento económico documentados para investidores de alto impacto.' 
                : 'Six documented strategic growth pillars and competitive advantages for high-impact investors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_INVEST_TETE.map((card) => (
              <div
                key={card.id}
                className="bg-white border-2 border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500 transition-all duration-200 shadow-xs hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                      {getIcon(card.iconName)}
                    </div>
                    <span className="text-2xl sm:text-3xl font-display font-black text-slate-300 group-hover:text-amber-500/50 transition-colors">
                      #{String(card.number).padStart(2, '0')}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-display font-black text-slate-950 mb-3 tracking-tight">
                    {lang === 'pt' ? card.title : card.titleEn}
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                    {lang === 'pt' ? card.description : card.descriptionEn}
                  </p>

                  {card.keyPoints && (
                    <ul className="space-y-2 border-t border-slate-100 pt-4 mb-4">
                      {(lang === 'pt' ? card.keyPoints : (card.keyPointsEn || card.keyPoints)).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-mono font-bold text-amber-800 uppercase">
                  <span>{lang === 'pt' ? 'Oportunidade Estruturada' : 'Structured Opportunity'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULL-SCREEN DETAIL MODAL */}
      <TerritoryDetailModal
        lang={lang}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        district={selectedDistrict}
        municipality={selectedMunicipality}
        border={selectedBorder}
        onInquireInterest={onInquireInterest}
      />
    </section>
  );
}
