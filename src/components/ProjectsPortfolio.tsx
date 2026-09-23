/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  ArrowUpRight, 
  Table as TableIcon,
  LayoutGrid,
  FileText,
  Building,
  Phone,
  DollarSign,
  X,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PROJECTS_PORTFOLIO_DATA } from '../teteInvestmentData';
import { ProjectItem } from '../types';

interface ProjectsPortfolioProps {
  lang: 'pt' | 'en';
  onSelectProjectForInquiry?: (project: ProjectItem) => void;
}

export default function ProjectsPortfolio({ lang, onSelectProjectForInquiry }: ProjectsPortfolioProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

  const sectors = [
    'all', 
    'Energia', 
    'Mineração', 
    'Agricultura', 
    'Pecuária', 
    'Indústria', 
    'Infraestrutura', 
    'Turismo'
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS_PORTFOLIO_DATA.filter((proj) => {
      const name = lang === 'pt' ? proj.name : (proj.nameEn || proj.name);
      const desc = lang === 'pt' ? proj.description : (proj.descriptionEn || proj.description);
      const loc = lang === 'pt' ? proj.location : (proj.locationEn || proj.location);
      const prop = proj.proponent || '';
      
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector = selectedSector === 'all' || proj.sector === selectedSector;
      const matchesOfficial = !onlyOfficial || proj.isOfficialForm;

      return matchesSearch && matchesSector && matchesOfficial;
    });
  }, [searchTerm, selectedSector, onlyOfficial, lang]);

  const handleInquiryClick = (project: ProjectItem) => {
    if (selectedProjectForModal) {
      setSelectedProjectForModal(null);
    }
    if (onSelectProjectForInquiry) {
      onSelectProjectForInquiry(project);
    } else {
      const el = document.getElementById('area-investidor') || document.getElementById('registration');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const officialProjectsCount = useMemo(() => {
    return PROJECTS_PORTFOLIO_DATA.filter(p => p.isOfficialForm).length;
  }, []);

  return (
    <section id="portfolio-projetos" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Pipeline de Oportunidades Oficiais' : 'Official Opportunities Pipeline'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Portfólio de Projetos de Investimento' : 'Investment Projects Portfolio'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt'
              ? 'Oportunidades concretas e estruturadas recolhidas pela APIEX e pelo Ministério da Economia, prontas para investimento direto, parcerias e concessões estratégicas em Tete.'
              : 'Concrete and structured opportunities collected by APIEX and the Ministry of Economy, ready for direct investment, partnerships, and strategic concessions in Tete.'}
          </p>
        </div>

        {/* Highlight Banner / Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-slate-900 text-white p-4 border-l-4 border-amber-500">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'pt' ? 'FONTE OFICIAL' : 'OFFICIAL SOURCE'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-black">{officialProjectsCount} {lang === 'pt' ? 'Dossiês APIEX' : 'APIEX Dossiers'}</div>
            <p className="text-[11px] text-slate-400 mt-1">{lang === 'pt' ? 'Ministério da Economia / Província de Tete' : 'Ministry of Economy / Tete Province'}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'pt' ? 'CAPEX TOTAL ESTIMADO' : 'TOTAL ESTIMATED CAPEX'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-slate-900">+USD 2,5B</div>
            <p className="text-[11px] text-slate-500 mt-1">{lang === 'pt' ? 'Em grandes centrais & indústria transformadora' : 'In mega utilities & manufacturing'}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{lang === 'pt' ? 'DIVERSIDADE SETORIAL' : 'SECTOR DIVERSITY'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-slate-900">7 {lang === 'pt' ? 'Setores-Chave' : 'Key Sectors'}</div>
            <p className="text-[11px] text-slate-500 mt-1">{lang === 'pt' ? 'Energia, Agroindústria, Mineração, Infraestruturas...' : 'Energy, Agro-industry, Mining, Infrastructure...'}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
              <Landmark className="w-4 h-4 text-amber-600" />
              <span>{lang === 'pt' ? 'MODALIDADES' : 'STRUCTURE'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-slate-900">Privado & PPP</div>
            <p className="text-[11px] text-slate-500 mt-1">{lang === 'pt' ? 'Investimento direto, joint-ventures e concessões' : 'Direct equity, joint-ventures & concessions'}</p>
          </div>
        </div>

        {/* Search, Sector, and Type Filters */}
        <div className="bg-slate-50 border border-slate-200 p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'pt' ? 'Pesquisar por projeto, proponente, localização, setor ou capacidade...' : 'Search by project, proponent, location, sector, or capacity...'}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            {/* Official Filter Toggle */}
            <button
              onClick={() => setOnlyOfficial(!onlyOfficial)}
              className={`px-3 py-2 text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                onlyOfficial
                  ? 'bg-amber-500 text-slate-950 border border-amber-600 shadow-sm'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Apenas Formulários APIEX' : 'Only APIEX Dossiers'}</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-900 text-white text-[10px]">
                {officialProjectsCount}
              </span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-white border border-slate-200 p-1 self-end lg:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-slate-900'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 cursor-pointer ${viewMode === 'table' ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-slate-900'}`}
                title="Table view"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sector Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 border-t border-slate-200/60">
            <span className="text-xs font-mono uppercase text-slate-500 font-bold flex-shrink-0">
              {lang === 'pt' ? 'Filtrar Setor:' : 'Filter Sector:'}
            </span>
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1.5">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSector(s)}
                  className={`px-3 py-1 text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedSector === s
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {s === 'all' ? (lang === 'pt' ? 'Todos os Setores' : 'All Sectors') : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-6">
          <span className="font-semibold text-slate-800">
            {filteredProjects.length} {lang === 'pt' ? 'projetos encontrados' : 'projects found'}
            {onlyOfficial && (lang === 'pt' ? ' (filtrado por formulários oficiais APIEX)' : ' (filtered by official APIEX forms)')}
          </span>
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'pt' ? 'Validação: APIEX / República de Moçambique' : 'Validation: APIEX / Republic of Mozambique'}</span>
          </span>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border-2 border-slate-200 p-6 flex flex-col justify-between hover:border-amber-500 transition-all duration-200 shadow-xs hover:shadow-md relative"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-mono font-bold uppercase">
                        {proj.sector}
                      </span>
                      {proj.projectType && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                          {proj.projectType}
                        </span>
                      )}
                    </div>
                    {proj.isOfficialForm && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>APIEX</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-950 mb-2 leading-snug">
                    {lang === 'pt' ? proj.name : (proj.nameEn || proj.name)}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{lang === 'pt' ? proj.location : (proj.locationEn || proj.location)}</span>
                  </div>

                  {/* Proponent if available */}
                  {proj.proponent && (
                    <div className="mb-3 p-2 bg-slate-50 border border-slate-200 text-xs">
                      <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                        {lang === 'pt' ? 'Proponente:' : 'Proponent:'}
                      </div>
                      <div className="font-bold text-slate-900 truncate">
                        {proj.proponent}
                        {proj.proponentType && (
                          <span className="ml-1 text-[10px] font-normal text-slate-500">
                            ({proj.proponentType})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5 line-clamp-3">
                    {lang === 'pt' ? proj.description : (proj.descriptionEn || proj.description)}
                  </p>

                  {/* Capacity & Investment Card */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 mb-5 space-y-2 text-xs">
                    {proj.capacity && (
                      <div className="flex justify-between font-mono gap-2">
                        <span className="text-slate-500 flex-shrink-0">{lang === 'pt' ? 'Capacidade:' : 'Capacity:'}</span>
                        <span className="font-bold text-slate-900 text-right truncate">{proj.capacity}</span>
                      </div>
                    )}
                    {proj.investment && (
                      <div className="flex justify-between font-mono gap-2">
                        <span className="text-slate-500 flex-shrink-0">{lang === 'pt' ? 'Investimento:' : 'Investment:'}</span>
                        <span className="font-bold text-amber-800 text-right truncate">{proj.investment}</span>
                      </div>
                    )}
                    {proj.financingMode && (
                      <div className="flex justify-between font-mono gap-2 border-t border-slate-200/60 pt-1.5">
                        <span className="text-slate-500 flex-shrink-0">{lang === 'pt' ? 'Modalidade:' : 'Mode:'}</span>
                        <span className="text-slate-700 font-medium text-right truncate">{proj.financingMode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProjectForModal(proj)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-mono uppercase tracking-wider font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'pt' ? 'Ver Ficha Completa' : 'View Full Dossier'}</span>
                  </button>

                  <button
                    onClick={() => handleInquiryClick(proj)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{lang === 'pt' ? 'Manifestar Interesse' : 'Express Interest'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto border-2 border-slate-200 bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white font-mono uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Projeto' : 'Project'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Setor' : 'Sector'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Localização' : 'Location'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Proponente / Tipo' : 'Proponent / Type'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Capacidade' : 'Capacity'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Investimento' : 'Investment'}</th>
                  <th className="p-4 border-b border-slate-800 text-right">{lang === 'pt' ? 'Ações' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-950">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm block">{lang === 'pt' ? proj.name : (proj.nameEn || proj.name)}</span>
                        {proj.isOfficialForm && (
                          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                            APIEX
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-normal font-mono">{proj.investmentType}</span>
                    </td>
                    <td className="p-4 font-mono font-semibold text-slate-700">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-mono text-[10px]">
                        {proj.sector}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 max-w-[200px]">
                      <span className="block truncate">{lang === 'pt' ? proj.location : (proj.locationEn || proj.location)}</span>
                    </td>
                    <td className="p-4 text-slate-700 font-mono text-[11px]">
                      {proj.proponent ? (
                        <div>
                          <div className="font-bold text-slate-900 truncate max-w-[180px]">{proj.proponent}</div>
                          <div className="text-slate-500">{proj.proponentType || proj.projectType}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-900">{proj.capacity || '-'}</td>
                    <td className="p-4 font-mono text-slate-800 font-bold">{proj.investment || '-'}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedProjectForModal(proj)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[10px] font-bold transition-colors cursor-pointer"
                          title="Ver Ficha Completa"
                        >
                          {lang === 'pt' ? 'Ficha' : 'Dossier'}
                        </button>
                        <button
                          onClick={() => handleInquiryClick(proj)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-mono uppercase text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          {lang === 'pt' ? 'Interesse' : 'Inquire'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal: Full Official Project Dossier */}
        {selectedProjectForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-fade-in">
            <div className="bg-white border-2 border-slate-900 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
              
              {/* Modal Header */}
              <div className="bg-slate-900 text-white p-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-widest">
                      {selectedProjectForModal.isOfficialForm ? 'FICHA OFICIAL APIEX' : 'PORTFÓLIO DE TETE'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300">
                      REPÚBLICA DE MOÇAMBIQUE • MINISTÉRIO DA ECONOMIA
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProjectForModal(null)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-2 leading-tight">
                  {lang === 'pt' ? selectedProjectForModal.name : (selectedProjectForModal.nameEn || selectedProjectForModal.name)}
                </h3>

                <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mt-2">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{lang === 'pt' ? selectedProjectForModal.location : (selectedProjectForModal.locationEn || selectedProjectForModal.location)}</span>
                </div>
              </div>

              {/* Modal Body / Dossier Content */}
              <div className="p-6 space-y-6 text-sm">
                
                {/* Highlights Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 p-4">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">{lang === 'pt' ? 'Setor & Ramo' : 'Sector & Branch'}</span>
                    <span className="font-bold text-slate-900">{selectedProjectForModal.sector} ({selectedProjectForModal.investmentType})</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">{lang === 'pt' ? 'Tipo de Projeto' : 'Project Type'}</span>
                    <span className="font-bold text-slate-900">{selectedProjectForModal.projectType || 'Novo'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">{lang === 'pt' ? 'Investimento Estimado' : 'Est. Investment'}</span>
                    <span className="font-bold text-amber-700">{selectedProjectForModal.investment || 'A estruturar'}</span>
                  </div>
                </div>

                {/* Proponent Information */}
                {selectedProjectForModal.proponent && (
                  <div className="border border-slate-200 p-4 bg-amber-50/40">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-900 uppercase mb-2">
                      <Building className="w-4 h-4 text-amber-700" />
                      <span>{lang === 'pt' ? 'Dados do Proponente' : 'Proponent Details'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block font-mono">{lang === 'pt' ? 'Nome do Proponente:' : 'Proponent Name:'}</span>
                        <span className="font-bold text-slate-900">{selectedProjectForModal.proponent}</span>
                        {selectedProjectForModal.proponentType && (
                          <span className="text-slate-600 block mt-0.5">({lang === 'pt' ? 'Regime:' : 'Regime:'} {selectedProjectForModal.proponentType})</span>
                        )}
                      </div>
                      {selectedProjectForModal.proponentContact && (
                        <div>
                          <span className="text-slate-500 block font-mono">{lang === 'pt' ? 'Contacto Direto / Representante:' : 'Direct Contact:'}</span>
                          <span className="font-bold text-slate-900 flex items-center space-x-1 mt-0.5">
                            <Phone className="w-3.5 h-3.5 text-amber-600" />
                            <span>{selectedProjectForModal.proponentContact}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Detailed Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-950 mb-2 border-b border-slate-200 pb-1">
                    {lang === 'pt' ? 'Descrição e Âmbito do Projeto' : 'Project Scope & Description'}
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                    {lang === 'pt' ? selectedProjectForModal.description : (selectedProjectForModal.descriptionEn || selectedProjectForModal.description)}
                  </p>
                </div>

                {/* Capacity & Target Market */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProjectForModal.capacity && (
                    <div className="bg-slate-50 p-3.5 border border-slate-200">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                        {lang === 'pt' ? 'Tamanho / Capacidade Prevista' : 'Capacity / Size'}
                      </span>
                      <span className="text-slate-900 font-mono font-bold text-xs sm:text-sm">{selectedProjectForModal.capacity}</span>
                    </div>
                  )}

                  {selectedProjectForModal.targetMarket && (
                    <div className="bg-slate-50 p-3.5 border border-slate-200">
                      <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                        {lang === 'pt' ? 'Mercado Alvo' : 'Target Market'}
                      </span>
                      <span className="text-slate-900 text-xs sm:text-sm">{selectedProjectForModal.targetMarket}</span>
                    </div>
                  )}
                </div>

                {/* Financing Mode */}
                {selectedProjectForModal.financingMode && (
                  <div className="bg-slate-50 p-3.5 border border-slate-200">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                      {lang === 'pt' ? 'Modalidade de Financiamento' : 'Financing Structure'}
                    </span>
                    <span className="text-slate-900 text-xs sm:text-sm font-semibold">{selectedProjectForModal.financingMode}</span>
                  </div>
                )}

                {/* Feasibility & Readiness */}
                {selectedProjectForModal.feasibilityStudy && (
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-950 mb-1">
                      {lang === 'pt' ? 'Ponto de Situação & Estudos' : 'Status & Feasibility'}
                    </h4>
                    <p className="text-xs text-slate-700 bg-emerald-50/70 border border-emerald-200 p-2.5">
                      {selectedProjectForModal.feasibilityStudy}
                    </p>
                  </div>
                )}

                {/* Basic Infrastructure */}
                {selectedProjectForModal.basicInfrastructure && (
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-950 mb-1">
                      {lang === 'pt' ? 'Infraestruturas Básicas de Apoio' : 'Infrastructure Support'}
                    </h4>
                    <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-2.5">
                      {selectedProjectForModal.basicInfrastructure}
                    </p>
                  </div>
                )}

                {/* Social and Economic Benefits */}
                {selectedProjectForModal.socialEconomicBenefits && (
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold text-slate-950 mb-1">
                      {lang === 'pt' ? 'Benefícios Sociais e Económicos' : 'Socioeconomic Benefits'}
                    </h4>
                    <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-2.5">
                      {selectedProjectForModal.socialEconomicBenefits}
                    </p>
                  </div>
                )}

              </div>

              {/* Modal Footer / Direct Inquiry */}
              <div className="bg-slate-100 border-t border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600 font-mono text-center sm:text-left">
                  {lang === 'pt' ? 'Interessado em investir ou obter informações adicionais?' : 'Interested in investing or requesting more details?'}
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProjectForModal(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    {lang === 'pt' ? 'Fechar' : 'Close'}
                  </button>
                  <button
                    onClick={() => handleInquiryClick(selectedProjectForModal)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>{lang === 'pt' ? 'Manifestar Interesse' : 'Express Interest'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
