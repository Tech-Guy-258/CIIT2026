/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SPEAKERS, TRANSLATIONS } from '../data';
import { Speaker } from '../types';
import { User, Award, ArrowUpRight, X, GraduationCap, Briefcase, Building2, CheckCircle2, Globe, Sparkles } from 'lucide-react';

interface SpeakersProps {
  lang: 'pt' | 'en';
}

export default function Speakers({ lang }: SpeakersProps) {
  const t = TRANSLATIONS[lang];
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const openSpeakerModal = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    document.body.style.overflow = 'hidden';
  };

  const closeSpeakerModal = () => {
    setSelectedSpeaker(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="speakers" className="py-24 bg-neutral-50 border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/10 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Mesa de Honra & Oradores' : 'Honour Panel & Keynotes'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.speakersTitle}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            {t.speakersSubtitle}
          </p>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        {/* Featured Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              id={`speaker-card-${speaker.id}`}
              onClick={() => openSpeakerModal(speaker)}
              className="bg-white rounded-none overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-gold-500/40 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Speaker Headshot Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-corporate-900">
                <img
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-950/90 via-corporate-950/20 to-transparent" />
                
                {/* Nationality badge */}
                <span className="absolute top-4 right-4 bg-corporate-950/85 backdrop-blur-sm border border-white/10 text-[9px] text-gray-200 px-2.5 py-1 rounded-none font-mono font-bold tracking-wider uppercase">
                  {lang === 'pt' ? speaker.nationality : (speaker.nationalityEn || speaker.nationality)}
                </span>

                {/* Featured speaker indicator badge */}
                {speaker.featured && (
                  <span className="absolute bottom-4 left-4 bg-gold-500 text-corporate-950 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none flex items-center space-x-1 shadow-sm">
                    <Award className="w-3 h-3" />
                    <span>{lang === 'pt' ? 'Mesa de Honra' : 'Keynote Speaker'}</span>
                  </span>
                )}
              </div>

              {/* Speaker Metadata */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-corporate-950 group-hover:text-gold-700 transition-colors tracking-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-gold-700 mt-1 uppercase tracking-wider">
                    {lang === 'pt' ? speaker.role : (speaker.roleEn || speaker.role)}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
                    {lang === 'pt' ? (speaker.institution || speaker.company) : (speaker.institutionEn || speaker.company)}
                  </p>

                  <p className="text-xs text-gray-600 leading-relaxed mt-4 font-normal line-clamp-3">
                    {lang === 'pt' ? speaker.bio : (speaker.bioEn || speaker.bio)}
                  </p>
                </div>

                {/* Open Modal Trigger Button */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-corporate-900 group-hover:text-gold-700 transition-colors">
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gold-600" />
                    <span className="text-[11px] uppercase font-mono tracking-wider font-bold">
                      {lang === 'pt' ? 'Ver Perfil Executivo' : 'View Executive Profile'}
                    </span>
                  </span>
                  <div className="w-7 h-7 rounded-none bg-neutral-100 group-hover:bg-gold-500 group-hover:text-corporate-950 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* EXPANDED EXECUTIVE PROFILE MODAL */}
      {selectedSpeaker && (
        <div
          id="speaker-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-corporate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeSpeakerModal}
        >
          <div
            id="speaker-modal-content"
            className="bg-white border border-gray-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none relative z-10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header / Banner */}
            <div className="relative bg-corporate-950 text-white p-6 md:p-8 border-b-4 border-gold-500">
              <button
                id="btn-close-speaker-modal"
                onClick={closeSpeakerModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-none transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-none border-2 border-gold-500/80 overflow-hidden shrink-0 shadow-lg bg-corporate-900">
                  <img
                    src={selectedSpeaker.imageUrl}
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center md:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="bg-gold-500 text-corporate-950 text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5">
                      {lang === 'pt' ? 'Mesa de Honra CIIT 2026' : 'CIIT 2026 Keynote'}
                    </span>
                    <span className="bg-white/10 text-gray-200 text-[10px] font-mono uppercase px-2.5 py-0.5">
                      {lang === 'pt' ? selectedSpeaker.nationality : (selectedSpeaker.nationalityEn || selectedSpeaker.nationality)}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                    {selectedSpeaker.name}
                  </h2>

                  <p className="text-sm md:text-base font-mono font-medium text-gold-400 mt-1 uppercase tracking-wide">
                    {lang === 'pt' ? selectedSpeaker.role : (selectedSpeaker.roleEn || selectedSpeaker.role)}
                  </p>

                  <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-gray-300 mt-1 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-gold-500" />
                    <span>{lang === 'pt' ? (selectedSpeaker.institution || selectedSpeaker.company) : (selectedSpeaker.institutionEn || selectedSpeaker.company)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-8 bg-neutral-50/50">
              
              {/* Biografia Oficial */}
              <div>
                <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-4">
                  <User className="w-4 h-4 text-gold-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-corporate-950 font-mono">
                    {lang === 'pt' ? 'Biografia Oficial' : 'Official Biography'}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-light bg-white p-5 border border-gray-200 shadow-sm">
                  {lang === 'pt' ? selectedSpeaker.bio : (selectedSpeaker.bioEn || selectedSpeaker.bio)}
                </p>
              </div>

              {/* Formação Académica */}
              {selectedSpeaker.education && selectedSpeaker.education.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-4">
                    <GraduationCap className="w-4 h-4 text-gold-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-corporate-950 font-mono">
                      {lang === 'pt' ? 'Formação Académica' : 'Academic Background & Qualifications'}
                    </h3>
                  </div>
                  <div className="bg-white p-5 border border-gray-200 shadow-sm space-y-3">
                    {(lang === 'pt' ? selectedSpeaker.education : (selectedSpeaker.educationEn || selectedSpeaker.education)).map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Funções Anteriormente Exercidas */}
              {selectedSpeaker.previousRoles && selectedSpeaker.previousRoles.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-4">
                    <Briefcase className="w-4 h-4 text-gold-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-corporate-950 font-mono">
                      {lang === 'pt' ? 'Funções Anteriormente Exercidas' : 'Previous Positions & Leadership Roles'}
                    </h3>
                  </div>
                  <div className="bg-white p-5 border border-gray-200 shadow-sm space-y-3">
                    {(lang === 'pt' ? selectedSpeaker.previousRoles : (selectedSpeaker.previousRolesEn || selectedSpeaker.previousRoles)).map((roleItem, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gold-600 rounded-none shrink-0 mt-2" />
                        <span className="leading-snug">{roleItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiência Profissional & Liderança */}
              {selectedSpeaker.experience && selectedSpeaker.experience.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-4">
                    <Globe className="w-4 h-4 text-gold-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-corporate-950 font-mono">
                      {lang === 'pt' ? 'Experiência & Áreas de Atuação' : 'Professional Experience & Focus Areas'}
                    </h3>
                  </div>
                  <div className="bg-white p-5 border border-gray-200 shadow-sm space-y-3">
                    {(lang === 'pt' ? selectedSpeaker.experience : (selectedSpeaker.experienceEn || selectedSpeaker.experience)).map((expItem, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-corporate-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{expItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tópicos de Destaque na CIIT 2026 */}
              {selectedSpeaker.keyTopics && selectedSpeaker.keyTopics.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-4">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-corporate-950 font-mono">
                      {lang === 'pt' ? 'Participação na CIIT 2026' : 'Highlights at CIIT 2026'}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(lang === 'pt' ? selectedSpeaker.keyTopics : (selectedSpeaker.keyTopicsEn || selectedSpeaker.keyTopics)).map((topic, idx) => (
                      <span
                        key={idx}
                        className="bg-corporate-950 text-gold-400 border border-corporate-800 text-xs font-mono px-3 py-1.5 rounded-none font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
              <button
                id="btn-modal-close-bottom"
                onClick={closeSpeakerModal}
                className="px-6 py-2 bg-corporate-950 text-white hover:bg-gold-600 hover:text-corporate-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                {lang === 'pt' ? 'Fechar Perfil' : 'Close Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
