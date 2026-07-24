/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SPEAKERS, TRANSLATIONS } from '../data';
import { User, Award, ArrowUpRight } from 'lucide-react';

interface SpeakersProps {
  lang: 'pt' | 'en';
}

export default function Speakers({ lang }: SpeakersProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="speakers" className="py-24 bg-neutral-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/5 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Painel de Especialistas' : 'Expert Panel'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.speakersTitle}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            {t.speakersSubtitle}
          </p>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        {/* Featured Speakers Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              id={`speaker-card-${speaker.id}`}
              className="bg-white rounded-none overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Speaker Headshot Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-corporate-900">
                <img
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-950/90 via-transparent to-transparent" />
                
                {/* Nationality badge */}
                <span className="absolute top-4 right-4 bg-corporate-950/85 backdrop-blur-sm border border-white/10 text-[9px] text-gray-200 px-2.5 py-1 rounded-none font-mono font-bold tracking-wider uppercase">
                  {lang === 'pt' ? speaker.nationality : (speaker.nationalityEn || speaker.nationality)}
                </span>

                {/* Featured speaker indicator badge */}
                {speaker.featured && (
                  <span className="absolute bottom-4 left-4 bg-gold-500 text-corporate-950 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none flex items-center space-x-1 shadow-sm">
                    <Award className="w-3 h-3" />
                    <span>{lang === 'pt' ? 'Destaque Plenário' : 'Featured Keynote'}</span>
                  </span>
                )}
              </div>

              {/* Speaker Metadata */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-corporate-950 group-hover:text-gold-700 transition-colors tracking-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-mono font-medium text-gold-700 mt-1 uppercase tracking-wider">
                    {lang === 'pt' ? speaker.role : (speaker.roleEn || speaker.role)}
                  </p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">
                    {speaker.company}
                  </p>

                  <p className="text-xs text-gray-500 leading-relaxed mt-4 font-light line-clamp-3">
                    {lang === 'pt' ? speaker.bio : (speaker.bioEn || speaker.bio)}
                  </p>
                </div>

                {/* Simulated professional link (LinkedIn indicator) */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-corporate-950 transition-colors">
                  <span className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-gold-500" />
                    <span className="text-[10px] uppercase font-mono tracking-wider">
                      {lang === 'pt' ? 'Ver Perfil Executivo' : 'View Executive Profile'}
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gold-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
