/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SPEAKERS, TRANSLATIONS } from '../data';
import { Speaker } from '../types';
import { User, Briefcase, Building2, ArrowUpRight, X, ChevronDown, Award, Landmark, Building, BriefcaseBusiness } from 'lucide-react';

interface SpeakersProps {
  lang: 'pt' | 'en';
}

export default function Speakers({ lang }: SpeakersProps) {
  const t = TRANSLATIONS[lang];
  const [selectedGuest, setSelectedGuest] = useState<Speaker | null>(null);

  // Hierarchy segmentation
  const president = SPEAKERS.find((s) => s.id === 'sp1'); // Daniel Francisco Chapo
  const minister = SPEAKERS.find((s) => s.id === 'sp2'); // Basílio Zefanias Muhate
  const provincialLeaders = SPEAKERS.filter((s) => ['sp3', 'sp4', 'sp5'].includes(s.id)); // Viola, Mafumo, Carvalho
  const ctaPresident = SPEAKERS.find((s) => s.id === 'sp6'); // Álvaro Massingue

  const openGuestModal = (guest: Speaker) => {
    setSelectedGuest(guest);
    document.body.style.overflow = 'hidden';
  };

  const closeGuestModal = () => {
    setSelectedGuest(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section 
      id="convidados-honra" 
      className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative scroll-mt-28"
    >
      {/* Anchor for backward compatibility */}
      <div id="speakers" className="absolute -top-28" />

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'CIIT 2026 • Protocolo de Estado & Alta Representação' : 'CIIT 2026 • State Protocol & High Dignitaries'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {t.speakersTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t.speakersSubtitle}
          </p>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4" />

          {/* Hierarchical Pyramid Legend */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono font-bold uppercase text-slate-600 bg-white border border-slate-200 p-2 shadow-2xs">
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950">
              {lang === 'pt' ? '1. Cúpula de Estado' : '1. Apex of State'}
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-2.5 py-1 bg-slate-900 text-amber-300">
              {lang === 'pt' ? '2. Executivo Central' : '2. Central Executive'}
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200">
              {lang === 'pt' ? '3. Governação Territorial & Municipal' : '3. Provincial & Municipal'}
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300">
              {lang === 'pt' ? '4. Sector Privado (CTA)' : '4. Private Sector (CTA)'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PYRAMID LEVEL 1: O PRESIDENTE DA REPÚBLICA (ISOLADO NO TOPO) */}
        {/* ======================================================== */}
        {president && (
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-px bg-amber-400 w-12 sm:w-20" />
              <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-mono font-black uppercase tracking-widest shadow-xs">
                {lang === 'pt' ? 'Nível I • Cúpula de Estado' : 'Level I • Apex of State'}
              </span>
              <div className="h-px bg-amber-400 w-12 sm:w-20" />
            </div>

            <div 
              id="guest-card-sp1"
              onClick={() => openGuestModal(president)}
              className="max-w-4xl mx-auto bg-white border-2 border-amber-500 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-6 py-2.5 flex items-center justify-between text-slate-950">
                <span className="text-xs font-mono font-bold tracking-wider uppercase flex items-center space-x-2">
                  <Landmark className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'Chefe de Estado & Mais Alta Magistratura da Nação' : 'Head of State & Supreme Leadership of Mozambique'}</span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase bg-slate-950 text-amber-300 px-2.5 py-0.5">
                  {lang === 'pt' ? 'Moçambique' : 'Mozambique'}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                {/* Photo */}
                <div className="w-full md:w-56 shrink-0 flex flex-col items-center">
                  <div className="w-44 h-56 sm:w-52 sm:h-64 border-2 border-amber-400 overflow-hidden shadow-md bg-slate-900 relative">
                    <img 
                      src={president.imageUrl} 
                      alt={president.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-slate-900/90 py-0.5 border border-amber-500/50">
                      {lang === 'pt' ? 'Convidado de Honra' : 'Guest of Honor'}
                    </span>
                  </div>
                </div>

                {/* Content: Biografia + Funções Exercidas Anteriormente */}
                <div className="flex-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-1">
                    {lang === 'pt' ? 'Sua Excelência' : 'His Excellency'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950 leading-tight group-hover:text-amber-700 transition-colors mb-1">
                    {president.name}
                  </h3>
                  <p className="text-sm font-mono font-bold text-amber-800 uppercase tracking-wide mb-1">
                    {lang === 'pt' ? president.role : (president.roleEn || president.role)}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5 mb-5 pb-4 border-b border-slate-200">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'pt' ? president.institution : (president.institutionEn || president.institution)}</span>
                  </p>

                  {/* 1. Biografia */}
                  <div className="mb-5">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'pt' ? 'Biografia Oficial' : 'Official Biography'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-amber-50/60 p-4 border-l-4 border-amber-500">
                      {lang === 'pt' ? president.bio : (president.bioEn || president.bio)}
                    </p>
                  </div>

                  {/* 2. Funções Exercidas Anteriormente */}
                  {president.previousRoles && president.previousRoles.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'pt' ? 'Funções Exercidas Anteriormente' : 'Previously Held Positions'}</span>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 space-y-2">
                        {(lang === 'pt' ? president.previousRoles : (president.previousRolesEn || president.previousRoles)).map((role, idx) => (
                          <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-none shrink-0 mt-1.5" />
                            <span className="font-medium leading-snug">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action prompt */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end text-xs font-mono font-bold uppercase text-amber-700 group-hover:text-amber-800 transition-colors">
                    <span className="mr-1">{lang === 'pt' ? 'Ver Perfil Detalhado' : 'View Full Profile'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pyramid Connector 1 -> 2 */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-0.5 h-8 bg-amber-400" />
          <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-amber-500 -mt-1" />
        </div>

        {/* ======================================================== */}
        {/* PYRAMID LEVEL 2: O MINISTRO (ISOLADO POR BAIXO) */}
        {/* ======================================================== */}
        {minister && (
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-px bg-slate-300 w-12 sm:w-20" />
              <span className="px-3 py-1 bg-slate-900 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
                {lang === 'pt' ? 'Nível II • Executivo Central' : 'Level II • Central Executive'}
              </span>
              <div className="h-px bg-slate-300 w-12 sm:w-20" />
            </div>

            <div 
              id="guest-card-sp2"
              onClick={() => openGuestModal(minister)}
              className="max-w-4xl mx-auto bg-white border-2 border-slate-300 hover:border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="bg-slate-900 px-6 py-2 flex items-center justify-between text-white">
                <span className="text-xs font-mono font-bold tracking-wider uppercase flex items-center space-x-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'pt' ? 'Governo Central • Ministério da Economia' : 'Central Government • Ministry of Economy'}</span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase bg-amber-500 text-slate-950 px-2 py-0.5">
                  {lang === 'pt' ? 'Moçambique' : 'Mozambique'}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                {/* Photo */}
                <div className="w-full md:w-52 shrink-0 flex flex-col items-center">
                  <div className="w-40 h-52 sm:w-48 sm:h-60 border-2 border-slate-300 group-hover:border-amber-400 overflow-hidden shadow-sm bg-slate-900 relative transition-colors">
                    <img 
                      src={minister.imageUrl} 
                      alt={minister.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-slate-900/90 py-0.5 border border-slate-700">
                      {lang === 'pt' ? 'Convidado de Honra' : 'Guest of Honor'}
                    </span>
                  </div>
                </div>

                {/* Content: Biografia + Funções Exercidas Anteriormente */}
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-black text-slate-950 leading-tight group-hover:text-amber-700 transition-colors mb-1">
                    {minister.name}
                  </h3>
                  <p className="text-sm font-mono font-bold text-amber-700 uppercase tracking-wide mb-1">
                    {lang === 'pt' ? minister.role : (minister.roleEn || minister.role)}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5 mb-5 pb-4 border-b border-slate-200">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'pt' ? minister.institution : (minister.institutionEn || minister.institution)}</span>
                  </p>

                  {/* 1. Biografia */}
                  <div className="mb-5">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'pt' ? 'Biografia Oficial' : 'Official Biography'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 border-l-4 border-slate-800">
                      {lang === 'pt' ? minister.bio : (minister.bioEn || minister.bio)}
                    </p>
                  </div>

                  {/* 2. Funções Exercidas Anteriormente */}
                  {minister.previousRoles && minister.previousRoles.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'pt' ? 'Funções Exercidas Anteriormente' : 'Previously Held Positions'}</span>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 space-y-2">
                        {(lang === 'pt' ? minister.previousRoles : (minister.previousRolesEn || minister.previousRoles)).map((role, idx) => (
                          <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 bg-slate-800 rounded-none shrink-0 mt-1.5" />
                            <span className="font-medium leading-snug">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action prompt */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end text-xs font-mono font-bold uppercase text-slate-700 group-hover:text-amber-700 transition-colors">
                    <span className="mr-1">{lang === 'pt' ? 'Ver Perfil Detalhado' : 'View Full Profile'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pyramid Connector 2 -> 3 */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-0.5 h-8 bg-slate-400" />
          <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-slate-500 -mt-1" />
        </div>

        {/* ======================================================== */}
        {/* PYRAMID LEVEL 3: GOVERNADORES, SECRETÁRIOS E PRESIDENTE DO MUNICÍPIO */}
        {/* ======================================================== */}
        <div className="mb-10">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px bg-slate-300 w-12 sm:w-20" />
            <span className="px-3.5 py-1 bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold uppercase tracking-widest shadow-2xs">
              {lang === 'pt' ? 'Nível III • Governação Territorial & Municipal' : 'Level III • Territorial & Municipal Governance'}
            </span>
            <div className="h-px bg-slate-300 w-12 sm:w-20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {provincialLeaders.map((leader) => {
              // Custom badge per authority
              let tierBadgePt = 'Governo Provincial';
              let tierBadgeEn = 'Provincial Government';
              let icon = Building;
              if (leader.id === 'sp3') {
                tierBadgePt = 'Governo Provincial de Tete';
                tierBadgeEn = 'Provincial Government of Tete';
                icon = Building;
              } else if (leader.id === 'sp4') {
                tierBadgePt = 'Representação do Estado em Tete';
                tierBadgeEn = 'State Representation in Tete';
                icon = Landmark;
              } else if (leader.id === 'sp5') {
                tierBadgePt = 'Poder Local • Município de Tete';
                tierBadgeEn = 'Local Government • Tete Municipality';
                icon = Building2;
              }
              const IconComp = icon;

              return (
                <div
                  key={leader.id}
                  id={`guest-card-${leader.id}`}
                  onClick={() => openGuestModal(leader)}
                  className="bg-white border-2 border-slate-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
                >
                  <div>
                    {/* Header bar */}
                    <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-slate-800">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase flex items-center space-x-1.5">
                        <IconComp className="w-3.5 h-3.5 text-amber-600" />
                        <span className="truncate">{lang === 'pt' ? tierBadgePt : tierBadgeEn}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase bg-slate-900 text-amber-300 px-2 py-0.5">
                        {lang === 'pt' ? 'Convidado de Honra' : 'Guest of Honor'}
                      </span>
                    </div>

                    {/* Photo + Identification */}
                    <div className="p-5 border-b border-slate-100 flex items-center space-x-4">
                      <div className="w-20 h-24 sm:w-24 sm:h-28 border border-slate-300 group-hover:border-amber-400 overflow-hidden shrink-0 shadow-xs bg-slate-900">
                        <img 
                          src={leader.imageUrl} 
                          alt={leader.name} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-display font-bold text-slate-950 leading-snug group-hover:text-amber-700 transition-colors">
                          {leader.name}
                        </h4>
                        <p className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wide mt-1">
                          {lang === 'pt' ? leader.role : (leader.roleEn || leader.role)}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                          {lang === 'pt' ? leader.institution : (leader.institutionEn || leader.institution)}
                        </p>
                      </div>
                    </div>

                    {/* Biografia */}
                    <div className="p-5">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                        <User className="w-3.5 h-3.5 text-amber-600" />
                        <span>{lang === 'pt' ? 'Biografia' : 'Biography'}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-3 border-l-2 border-slate-400 line-clamp-4">
                        {lang === 'pt' ? leader.bio : (leader.bioEn || leader.bio)}
                      </p>

                      {/* Funções Exercidas Anteriormente */}
                      {leader.previousRoles && leader.previousRoles.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                            <span>{lang === 'pt' ? 'Funções Exercidas Anteriormente' : 'Previous Positions'}</span>
                          </div>
                          <ul className="bg-white border border-slate-200 p-3 space-y-1.5">
                            {(lang === 'pt' ? leader.previousRoles : (leader.previousRolesEn || leader.previousRoles)).map((role, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-[11px] text-slate-700">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-none shrink-0 mt-1.5" />
                                <span className="font-medium leading-snug">{role}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-700 group-hover:text-amber-700 transition-colors">
                    <span>{lang === 'pt' ? 'Ver Perfil Completo' : 'View Full Profile'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pyramid Connector 3 -> 4 */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-0.5 h-8 bg-slate-400" />
          <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-slate-500 -mt-1" />
        </div>

        {/* ======================================================== */}
        {/* PYRAMID LEVEL 4: PRESIDENTE DA CTA (BASE DA PIRÂMIDE) */}
        {/* ======================================================== */}
        {ctaPresident && (
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-px bg-slate-300 w-12 sm:w-20" />
              <span className="px-3.5 py-1 bg-amber-100 border border-amber-300 text-amber-950 text-xs font-mono font-bold uppercase tracking-widest shadow-2xs">
                {lang === 'pt' ? 'Nível IV • Liderança do Sector Privado Nacional' : 'Level IV • National Private Sector Leadership'}
              </span>
              <div className="h-px bg-slate-300 w-12 sm:w-20" />
            </div>

            <div 
              id="guest-card-sp6"
              onClick={() => openGuestModal(ctaPresident)}
              className="max-w-4xl mx-auto bg-white border-2 border-slate-300 hover:border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-2 flex items-center justify-between text-white">
                <span className="text-xs font-mono font-bold tracking-wider uppercase flex items-center space-x-2">
                  <BriefcaseBusiness className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'pt' ? 'Sector Privado Nacional • Parceria Público-Privada (CTA)' : 'National Private Sector • Public-Private Partnership (CTA)'}</span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase bg-amber-500 text-slate-950 px-2 py-0.5">
                  {lang === 'pt' ? 'Convidado de Honra' : 'Guest of Honor'}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                {/* Photo */}
                <div className="w-full md:w-52 shrink-0 flex flex-col items-center">
                  <div className="w-40 h-52 sm:w-48 sm:h-60 border-2 border-slate-300 group-hover:border-amber-400 overflow-hidden shadow-sm bg-slate-900 relative transition-colors">
                    <img 
                      src={ctaPresident.imageUrl} 
                      alt={ctaPresident.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-slate-900/90 py-0.5 border border-slate-700">
                      {lang === 'pt' ? 'Presidente da CTA' : 'President of CTA'}
                    </span>
                  </div>
                </div>

                {/* Content: Biografia + Funções Exercidas Anteriormente */}
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-black text-slate-950 leading-tight group-hover:text-amber-700 transition-colors mb-1">
                    {ctaPresident.name}
                  </h3>
                  <p className="text-sm font-mono font-bold text-amber-700 uppercase tracking-wide mb-1">
                    {lang === 'pt' ? ctaPresident.role : (ctaPresident.roleEn || ctaPresident.role)}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5 mb-5 pb-4 border-b border-slate-200">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'pt' ? ctaPresident.institution : (ctaPresident.institutionEn || ctaPresident.institution)}</span>
                  </p>

                  {/* 1. Biografia */}
                  <div className="mb-5">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'pt' ? 'Biografia Oficial' : 'Official Biography'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-amber-50/40 p-4 border-l-4 border-amber-500">
                      {lang === 'pt' ? ctaPresident.bio : (ctaPresident.bioEn || ctaPresident.bio)}
                    </p>
                  </div>

                  {/* 2. Funções Exercidas Anteriormente */}
                  {ctaPresident.previousRoles && ctaPresident.previousRoles.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'pt' ? 'Funções Exercidas Anteriormente' : 'Previously Held Positions'}</span>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 space-y-2">
                        {(lang === 'pt' ? ctaPresident.previousRoles : (ctaPresident.previousRolesEn || ctaPresident.previousRoles)).map((role, idx) => (
                          <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-none shrink-0 mt-1.5" />
                            <span className="font-medium leading-snug">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action prompt */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end text-xs font-mono font-bold uppercase text-slate-700 group-hover:text-amber-700 transition-colors">
                    <span className="mr-1">{lang === 'pt' ? 'Ver Perfil Detalhado' : 'View Full Profile'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* EXPANDED PROFILE MODAL (SOMENTE BIOGRAFIA E FUNÇÕES ANTERIORES) */}
      {/* ======================================================== */}
      {selectedGuest && (
        <div
          id="guest-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeGuestModal}
        >
          <div
            id="guest-modal-content"
            className="bg-white border border-slate-300 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-none relative z-10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-slate-950 text-white p-6 sm:p-8 border-b-4 border-amber-500">
              <button
                id="btn-close-guest-modal"
                onClick={closeGuestModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-none transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-none border-2 border-amber-500 overflow-hidden shrink-0 shadow-lg bg-slate-900">
                  <img
                    src={selectedGuest.imageUrl}
                    alt={selectedGuest.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5">
                      {lang === 'pt' ? 'Convidado de Honra CIIT 2026' : 'CIIT 2026 Guest of Honor'}
                    </span>
                    <span className="bg-white/10 text-slate-200 text-[10px] font-mono uppercase px-2.5 py-0.5">
                      {lang === 'pt' ? selectedGuest.nationality : (selectedGuest.nationalityEn || selectedGuest.nationality)}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                    {selectedGuest.name}
                  </h2>

                  <p className="text-sm sm:text-base font-mono font-semibold text-amber-400 mt-1 uppercase tracking-wide">
                    {lang === 'pt' ? selectedGuest.role : (selectedGuest.roleEn || selectedGuest.role)}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-slate-300 mt-1 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'pt' ? selectedGuest.institution : (selectedGuest.institutionEn || selectedGuest.institution)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body: SOMENTE BIOGRAFIA E FUNÇÕES EXERCIDAS ANTERIORMENTE */}
            <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
              
              {/* 1. Biografia Oficial */}
              <div>
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                  <User className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    {lang === 'pt' ? 'Biografia Oficial' : 'Official Biography'}
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal bg-white p-5 border border-slate-200 shadow-xs">
                  {lang === 'pt' ? selectedGuest.bio : (selectedGuest.bioEn || selectedGuest.bio)}
                </p>
              </div>

              {/* 2. Funções Exercidas Anteriormente */}
              {selectedGuest.previousRoles && selectedGuest.previousRoles.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                      {lang === 'pt' ? 'Funções Exercidas Anteriormente' : 'Previously Held Positions'}
                    </h3>
                  </div>
                  <div className="bg-white p-5 border border-slate-200 shadow-xs space-y-2.5">
                    {(lang === 'pt' ? selectedGuest.previousRoles : (selectedGuest.previousRolesEn || selectedGuest.previousRoles)).map((roleItem, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-none shrink-0 mt-2" />
                        <span className="leading-snug font-medium">{roleItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                id="btn-modal-close-bottom"
                onClick={closeGuestModal}
                className="px-6 py-2.5 bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {lang === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
