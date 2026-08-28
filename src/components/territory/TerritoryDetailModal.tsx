/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Sprout, 
  Pickaxe, 
  Zap, 
  Fish, 
  Beef, 
  Trees, 
  Compass, 
  Building2, 
  Globe2, 
  Layers, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { DistrictDetail, MunicipalityDetail, BorderDetail } from '../../types';

interface TerritoryDetailModalProps {
  lang: 'pt' | 'en';
  isOpen: boolean;
  onClose: () => void;
  district?: DistrictDetail | null;
  municipality?: MunicipalityDetail | null;
  border?: BorderDetail | null;
  onInquireInterest?: (subjectName: string) => void;
}

export default function TerritoryDetailModal({
  lang,
  isOpen,
  onClose,
  district,
  municipality,
  border,
  onInquireInterest
}: TerritoryDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || (!district && !municipality && !border)) return null;

  const entityType = district ? 'district' : municipality ? 'municipality' : 'border';
  const entityName = district ? district.name : municipality ? municipality.name : border ? border.country : '';

  const handleInquire = () => {
    if (onInquireInterest) {
      onInquireInterest(entityName);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* TOP BAR / BREADCRUMB & CLOSE BUTTON */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-mono text-slate-300 overflow-x-auto whitespace-nowrap">
            <span className="text-slate-400">{lang === 'pt' ? 'Início' : 'Home'}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{lang === 'pt' ? 'Sobre Tete' : 'About Tete'}</span>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400 font-bold uppercase">
              {entityType === 'district' ? (lang === 'pt' ? 'Distritos' : 'Districts') :
               entityType === 'municipality' ? (lang === 'pt' ? 'Municípios' : 'Municipalities') :
               (lang === 'pt' ? 'Fronteiras' : 'Borders')}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-white font-bold">{entityName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors ml-3 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HERO COVER IMAGE & TITLE */}
        <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-slate-950 overflow-hidden">
          <img
            src={district?.heroImage || district?.image || municipality?.heroImage || municipality?.image || border?.flag}
            alt={entityName}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
            <div className="inline-flex items-center space-x-2 bg-amber-500 text-slate-950 px-3 py-1 text-xs font-mono font-black uppercase tracking-widest mb-3">
              {entityType === 'district' ? (
                <>
                  <Compass className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Distrito da Província de Tete' : 'District of Tete Province'}</span>
                </>
              ) : entityType === 'municipality' ? (
                <>
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{municipality?.status}</span>
                </>
              ) : (
                <>
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{border?.borderType}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
              {entityName}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-2xl font-light">
              {district ? (lang === 'pt' ? `Conheça a história, identidade, potencial e oportunidades de investimento de ${district.name}.` : `Discover the history, identity, potential, and investment opportunities of ${district.name}.`) :
               municipality ? (lang === 'pt' ? `Conheça o historial, infraestrutura e potencial de investimento do Município de ${municipality.name}.` : `Discover the history, infrastructure, and investment potential of ${municipality.name}.`) :
               (lang === 'pt' ? `Explore a relação histórica, logística e comercial entre Tete e a República do ${border?.country}.` : `Explore the historical, logistics, and trade partnership between Tete and ${border?.country}.`)}
            </p>
          </div>
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-10 max-h-[70vh] overflow-y-auto bg-slate-50/50">

          {/* =================================================================
              1. DISTRICT CONTENT SECTIONS
              ================================================================= */}
          {district && (
            <>
              {/* 7. DESTAQUES / INDICADORES */}
              <div className="bg-white border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'pt' ? 'Indicadores de Vocação:' : 'Vocational Indicators:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {district.indicators.location && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{district.location}</span>
                    </span>
                  )}
                  {district.indicators.agriculture && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
                      <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'pt' ? '🌾 Agricultura Fértil' : '🌾 Agriculture'}</span>
                    </span>
                  )}
                  {district.indicators.mining && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-medium border border-amber-300">
                      <Pickaxe className="w-3.5 h-3.5 text-amber-700" />
                      <span>{lang === 'pt' ? '⛏ Recursos Minerais' : '⛏ Minerals'}</span>
                    </span>
                  )}
                  {district.indicators.energy && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 text-blue-900 text-xs font-medium border border-blue-200">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span>{lang === 'pt' ? '⚡ Energia' : '⚡ Energy'}</span>
                    </span>
                  )}
                  {district.indicators.fisheries && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-cyan-50 text-cyan-900 text-xs font-medium border border-cyan-200">
                      <Fish className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{lang === 'pt' ? '🐟 Pesca & Aquacultura' : '🐟 Fisheries'}</span>
                    </span>
                  )}
                  {district.indicators.livestock && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-rose-50 text-rose-900 text-xs font-medium border border-rose-200">
                      <Beef className="w-3.5 h-3.5 text-rose-600" />
                      <span>{lang === 'pt' ? '🐄 Pecuária' : '🐄 Livestock'}</span>
                    </span>
                  )}
                  {district.indicators.tourism && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-lime-50 text-lime-900 text-xs font-medium border border-lime-200">
                      <Trees className="w-3.5 h-3.5 text-lime-600" />
                      <span>{lang === 'pt' ? '🌳 Turismo / Conservação' : '🌳 Ecotourism'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 1. VISÃO GERAL */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'pt' ? '1. Visão Geral' : '1. Overview'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950 mb-3">
                  {lang === 'pt' ? `Perfil do Território de ${district.name}` : `Territory Profile of ${district.name}`}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4 font-normal">
                  {lang === 'pt' ? district.overview : district.overviewEn}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs font-mono">
                  <div className="p-2.5 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">{lang === 'pt' ? 'Área:' : 'Area:'}</span>
                    <strong className="text-slate-900">{district.area}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">{lang === 'pt' ? 'População:' : 'Population:'}</span>
                    <strong className="text-slate-900">{district.population}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">{lang === 'pt' ? 'Sede Distrital:' : 'Capital:'}</span>
                    <strong className="text-slate-900">{district.capital}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">{lang === 'pt' ? 'Clima:' : 'Climate:'}</span>
                    <strong className="text-slate-900">{lang === 'pt' ? district.climate : district.climateEn}</strong>
                  </div>
                </div>
              </div>

              {/* 2. BREVE HISTORIAL */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'pt' ? '2. Breve Historial' : '2. Brief History'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950 mb-3">
                  {lang === 'pt' ? 'Origens, Comunidades e Evolução Histórica' : 'Origins, Communities & Historical Evolution'}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                  {lang === 'pt' ? district.history : district.historyEn}
                </p>
                <div className="mt-4 p-3 bg-amber-50/70 border-l-4 border-amber-500 text-xs text-slate-700 font-mono">
                  <strong>{lang === 'pt' ? 'Nota Historiográfica:' : 'Historiographical Note:'}</strong>{' '}
                  {lang === 'pt'
                    ? 'Conteúdo fundamentado nos arquivos da Direção Provincial de Cultura, Instituto Nacional de Estatística (INE) e estudos etno-históricos do Ministério da Administração Estatal.'
                    : 'Information grounded in provincial culture archives, National Statistics Institute (INE), and ethno-historical studies by the Ministry of State Administration.'}
                </div>
              </div>

              {/* 3. GEOGRAFIA */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-3">
                  <Compass className="w-4 h-4" />
                  <span>{lang === 'pt' ? '3. Geografia & Limites' : '3. Geography & Boundaries'}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3 bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block font-mono text-xs uppercase text-amber-900 mb-1">
                        {lang === 'pt' ? 'Distritos Vizinhos e Fronteiras:' : 'Neighboring Districts & Borders:'}
                      </strong>
                      <span className="text-slate-700">{lang === 'pt' ? district.geography.borders : district.geography.bordersEn}</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block font-mono text-xs uppercase text-amber-900 mb-1">
                        {lang === 'pt' ? 'Principais Bacias Hidrográficas:' : 'Main River Basins:'}
                      </strong>
                      <span className="text-slate-700">{district.geography.rivers}</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block font-mono text-xs uppercase text-amber-900 mb-1">
                        {lang === 'pt' ? 'Localidades & Postos Administrativos:' : 'Localities & Administrative Posts:'}
                      </strong>
                      <span className="text-slate-700">{district.geography.localities}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 border border-slate-800 text-white flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                        {lang === 'pt' ? 'Posicionamento Geográfico' : 'Geographic Coordinates'}
                      </span>
                      <p className="text-2xl font-mono font-bold text-white mt-1">
                        {district.geography.coordinates || '16°09′S 33°35′E'}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {lang === 'pt' ? 'Província de Tete • República de Moçambique' : 'Tete Province • Republic of Mozambique'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                      {lang === 'pt' ? 'Conectado à malha viária e bacias hídricas do Zambeze' : 'Integrated into Zambezi transport and hydrological network'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. ECONOMIA */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>{lang === 'pt' ? '4. Principais Atividades Económicas' : '4. Core Economic Activities'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {district.economy.map((act, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200">
                      <div className="flex items-center space-x-2 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <h4 className="font-bold text-slate-900 text-sm">
                          {lang === 'pt' ? act.name : act.nameEn}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {act.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. RECURSOS E POTENCIAL */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-3">
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'pt' ? '5. Recursos e Potencial Documentado' : '5. Resources & Documented Potential'}</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                  {lang === 'pt' ? district.resources : district.resourcesEn}
                </p>
                <div className="p-3.5 bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
                  <strong>[DADOS OFICIAIS INFO.PDF]:</strong> {lang === 'pt' ? 'Recursos validados pelo mapeamento provincial de investimentos de Tete.' : 'Validated by official Tete Provincial Investment Survey.'}
                </div>
              </div>

              {/* 6. OPORTUNIDADES DE INVESTIMENTO NO DISTRITO */}
              <div className="bg-slate-900 text-white p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-3">
                  <Zap className="w-4 h-4" />
                  <span>{lang === 'pt' ? '6. Oportunidades de Investimento no Distrito' : '6. Investment Opportunities in District'}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">
                  {lang === 'pt' ? 'Projetos Estratégicos Estruturados' : 'Structured Strategic Projects'}
                </h3>
                
                <div className="space-y-3">
                  {district.investmentProjects.map((proj, idx) => (
                    <div key={idx} className="bg-slate-800/90 border border-slate-700 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                          {proj.sector}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">{proj.project}</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === 'pt' ? 'Localização:' : 'Location:'} {proj.location} • {lang === 'pt' ? 'Capacidade:' : 'Capacity:'} {proj.capacity}
                        </p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <span className="text-lg font-display font-black text-amber-400 block">{proj.investment}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{lang === 'pt' ? 'Investimento Estimado' : 'Est. Investment'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. GALERIA DE IMAGENS */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-4">
                  <Compass className="w-4 h-4" />
                  <span>{lang === 'pt' ? '8. Galeria do Distrito' : '8. District Gallery'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {district.gallery.map((imgUrl, i) => (
                    <div key={i} className="h-40 bg-slate-100 border border-slate-200 overflow-hidden group">
                      <img
                        src={imgUrl}
                        alt={`${district.name} - ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              2. MUNICIPALITY CONTENT SECTIONS
              ================================================================= */}
          {municipality && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold block mb-2">
                  {municipality.status}
                </span>
                <h3 className="text-2xl font-display font-bold text-slate-950 mb-3">
                  {lang === 'pt' ? 'Breve Historial e Evolução Municipal' : 'History & Municipal Evolution'}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                  {municipality.history}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-6">
                  <h4 className="font-display font-bold text-slate-950 text-base mb-2">
                    {lang === 'pt' ? 'Importância Económica & Atividades' : 'Economic Importance & Activities'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {municipality.economy}
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-6">
                  <h4 className="font-display font-bold text-slate-950 text-base mb-2">
                    {lang === 'pt' ? 'Infraestrutura Urbana & Serviços' : 'Urban Infrastructure & Services'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {municipality.infrastructure}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-6 sm:p-8">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  {lang === 'pt' ? 'Oportunidades Urbanas' : 'Urban Opportunities'}
                </span>
                <h4 className="text-xl font-display font-bold text-white mb-2">
                  {lang === 'pt' ? 'Potencial de Investimento no Município' : 'Investment Potential in Municipality'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {municipality.investmentPotential}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50/70 border border-amber-200 p-5">
                  <h5 className="font-bold text-amber-950 text-xs font-mono uppercase mb-1">
                    {lang === 'pt' ? 'Património & Cultura' : 'Heritage & Culture'}
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">{municipality.heritageCulture}</p>
                </div>
                <div className="bg-slate-100 border border-slate-200 p-5">
                  <h5 className="font-bold text-slate-900 text-xs font-mono uppercase mb-1">
                    {lang === 'pt' ? 'Curiosidades Locais' : 'Local Curiosities'}
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">{municipality.curiosities}</p>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              3. BORDER CONTENT SECTIONS
              ================================================================= */}
          {border && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl">{border.flag}</span>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-950">
                      {lang === 'pt' ? `Relação Estratégica: Tete & ${border.country}` : `Strategic Partnership: Tete & ${border.country}`}
                    </h3>
                    <p className="text-xs font-mono text-slate-500">{border.borderLength} de fronteira • {border.borderType}</p>
                  </div>
                </div>
                
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {border.history}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-6">
                  <h4 className="font-display font-bold text-slate-950 text-base mb-2">
                    {lang === 'pt' ? 'Importância Comercial' : 'Commercial Importance'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {border.commercialImportance}
                  </p>
                  <h4 className="font-display font-bold text-slate-950 text-base mb-2">
                    {lang === 'pt' ? 'Importância Logística' : 'Logistics Importance'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {border.logisticsImportance}
                  </p>
                </div>

                <div className="bg-slate-900 text-white p-6">
                  <h4 className="font-display font-bold text-amber-400 text-base mb-3">
                    {lang === 'pt' ? 'Principais Postos Fronteiriços' : 'Key Border Posts'}
                  </h4>
                  <div className="space-y-3">
                    {border.borderPosts.map((post, idx) => (
                      <div key={idx} className="bg-slate-800 p-3 border border-slate-700 text-xs">
                        <div className="font-bold text-white">{post.name}</div>
                        <div className="text-amber-400 font-mono text-[11px] mt-0.5">{post.type}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">Destino: {post.connectsTo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/40 p-6">
                <h4 className="font-display font-bold text-slate-950 text-base mb-3">
                  {lang === 'pt' ? 'Oportunidades de Comércio e Investimento Regional' : 'Regional Trade & Investment Opportunities'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800">
                  {border.tradeOpportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* =================================================================
              27. FONTES E REFERÊNCIAS
              ================================================================= */}
          <div className="bg-slate-100 border border-slate-200 p-4 sm:p-5 text-xs text-slate-600 font-mono">
            <div className="flex items-center space-x-2 text-slate-800 font-bold uppercase text-[11px] mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'pt' ? 'Fontes e Referências Oficiais:' : 'Official Sources & References:'}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {(district?.sources || municipality?.sources || border?.sources || ['Governo de Moçambique', 'INE', 'Info.pdf']).map((src, i) => (
                <span key={i} className="text-slate-500">• {src}</span>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM CTA FOOTER */}
        <div className="bg-slate-900 px-6 py-4 sm:py-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
            {lang === 'pt' ? 'Canal Oficial do Investidor da Província de Tete' : 'Official Investor Gateway of Tete Province'}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold uppercase cursor-pointer"
            >
              {lang === 'pt' ? 'Voltar' : 'Back'}
            </button>
            <button
              onClick={handleInquire}
              className="w-1/2 sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <span>{lang === 'pt' ? 'Tenho interesse em investir nesta região' : 'I am interested in investing here'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
