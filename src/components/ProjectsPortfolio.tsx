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
  LayoutGrid
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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const sectors = ['all', 'Energia', 'Mineração', 'Agricultura', 'Pecuária'];

  const filteredProjects = useMemo(() => {
    return PROJECTS_PORTFOLIO_DATA.filter((proj) => {
      const name = lang === 'pt' ? proj.name : (proj.nameEn || proj.name);
      const desc = lang === 'pt' ? proj.description : (proj.descriptionEn || proj.description);
      const loc = lang === 'pt' ? proj.location : (proj.locationEn || proj.location);
      
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector = selectedSector === 'all' || proj.sector === selectedSector;

      return matchesSearch && matchesSector;
    });
  }, [searchTerm, selectedSector, lang]);

  const handleInquiryClick = (project: ProjectItem) => {
    if (onSelectProjectForInquiry) {
      onSelectProjectForInquiry(project);
    } else {
      const el = document.getElementById('area-investidor') || document.getElementById('registration');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio-projetos" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Pipeline de Oportunidades' : 'Opportunities Pipeline'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Portfólio de Projetos de Investimento' : 'Investment Projects Portfolio'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt'
              ? 'Projetos prioritários de grande escala estruturados para Parcerias Público-Privadas (PPP), concessões e investimento privado direto.'
              : 'Priority large-scale projects structured for Public-Private Partnerships (PPPs), long-term concessions, and private direct investment.'}
          </p>
        </div>

        {/* Search, Sector, and Type Filters */}
        <div className="bg-slate-50 border border-slate-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'pt' ? 'Pesquisar projeto, localização ou setor...' : 'Search project, location, or sector...'}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            {/* Sector Filters */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 lg:pb-0">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold mr-1">
                {lang === 'pt' ? 'Setor:' : 'Sector:'}
              </span>
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSector(s)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedSector === s
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {s === 'all' ? (lang === 'pt' ? 'Todos' : 'All') : s}
                </button>
              ))}
            </div>

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
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-6">
          <span>{filteredProjects.length} {lang === 'pt' ? 'projetos catalogados' : 'cataloged projects'}</span>
          <span>{lang === 'pt' ? 'Governo da Província de Tete' : 'Government of Tete Province'}</span>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border-2 border-slate-200 p-6 flex flex-col justify-between hover:border-amber-500 transition-all duration-200 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-mono font-bold uppercase">
                      {proj.sector}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      {proj.investmentType}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-slate-950 mb-2 leading-snug">
                    {lang === 'pt' ? proj.name : (proj.nameEn || proj.name)}
                  </h3>

                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono mb-4">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{lang === 'pt' ? proj.location : (proj.locationEn || proj.location)}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    {lang === 'pt' ? proj.description : (proj.descriptionEn || proj.description)}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 p-3.5 mb-5 space-y-2 text-xs">
                    {proj.capacity && (
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-500">{lang === 'pt' ? 'Capacidade:' : 'Capacity:'}</span>
                        <span className="font-bold text-slate-900">{proj.capacity}</span>
                      </div>
                    )}
                    {proj.investment && (
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-500">{lang === 'pt' ? 'Investimento Est.:' : 'Est. Investment:'}</span>
                        <span className="font-bold text-amber-800">{proj.investment}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleInquiryClick(proj)}
                  className="w-full py-3 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Manifestar Interesse' : 'Express Interest'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto border-2 border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white font-mono uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Projeto' : 'Project'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Setor' : 'Sector'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Localização' : 'Location'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Capacidade' : 'Capacity'}</th>
                  <th className="p-4 border-b border-slate-800">{lang === 'pt' ? 'Investimento' : 'Investment'}</th>
                  <th className="p-4 border-b border-slate-800 text-right">{lang === 'pt' ? 'Ação' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-950">
                      <span className="text-sm block">{lang === 'pt' ? proj.name : (proj.nameEn || proj.name)}</span>
                      <span className="text-[11px] text-slate-500 font-normal font-mono">{proj.investmentType}</span>
                    </td>
                    <td className="p-4 font-mono font-semibold text-slate-700">{proj.sector}</td>
                    <td className="p-4 text-slate-700">{lang === 'pt' ? proj.location : (proj.locationEn || proj.location)}</td>
                    <td className="p-4 font-mono font-bold text-amber-900">{proj.capacity || '-'}</td>
                    <td className="p-4 font-mono text-slate-800 font-bold">{proj.investment || '-'}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleInquiryClick(proj)}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-mono uppercase text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        {lang === 'pt' ? 'Interesse' : 'Inquire'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
