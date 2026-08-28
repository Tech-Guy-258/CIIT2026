/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, History, ShieldCheck, ChevronRight, Bookmark } from 'lucide-react';
import { TETE_HISTORY_TIMELINE } from '../../data/teteTerritoryData';
import { TimelineEvent } from '../../types';

interface TeteHistoryTimelineProps {
  lang: 'pt' | 'en';
}

export default function TeteHistoryTimeline({ lang }: TeteHistoryTimelineProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(TETE_HISTORY_TIMELINE[0].id);

  const selectedEvent = TETE_HISTORY_TIMELINE.find(e => e.id === selectedEventId) || TETE_HISTORY_TIMELINE[0];

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-10 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-2">
            <History className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Cronologia Histórica e Identidade Territorial' : 'Historical Chronology & Territorial Identity'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
            {lang === 'pt' ? 'Evolução Histórica da Província de Tete' : 'Historical Evolution of Tete Province'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            {lang === 'pt'
              ? 'Dos reinos ancestrais do Mutapa e Marave, à feitoria do Zambeze, Cahora Bassa e o atual coração energético e industrial da África Austral.'
              : 'From ancestral Mutapa and Marave kingdoms to the Zambezi trading post, Cahora Bassa, and Southern Africa’s energy hub.'}
          </p>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 text-[11px] font-mono text-slate-700 max-w-xs">
          <strong>{lang === 'pt' ? 'Rigor Histórico:' : 'Historical Rigor:'}</strong>{' '}
          {lang === 'pt' ? 'Cronologia verificada com base em documentação arquivística e académica.' : 'Timeline verified against archival and academic sources.'}
        </div>
      </div>

      {/* HORIZONTAL / VERTICAL MILESTONE NAVIGATOR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
        {TETE_HISTORY_TIMELINE.map((evt, idx) => {
          const isSelected = evt.id === selectedEventId;
          return (
            <button
              key={evt.id}
              onClick={() => setSelectedEventId(evt.id)}
              className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                isSelected 
                  ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-amber-500' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div>
                <span className={`text-[10px] font-mono font-bold block ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                  0{idx + 1}. {evt.period}
                </span>
                <span className="text-xs font-display font-bold line-clamp-2 mt-1">
                  {lang === 'pt' ? evt.title : evt.titleEn}
                </span>
              </div>
              <span className={`text-[9px] font-mono mt-2 uppercase ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                {evt.highlight}
              </span>
            </button>
          );
        })}
      </div>

      {/* SELECTED ERA DETAIL CARD */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 border border-slate-900 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500 text-slate-950 font-mono font-black text-xs uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>{selectedEvent.period}</span>
          </span>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            {lang === 'pt' ? 'Marco Histórico Documentado' : 'Documented Historical Era'}
          </span>
        </div>

        <h4 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
          {lang === 'pt' ? selectedEvent.title : selectedEvent.titleEn}
        </h4>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl font-light">
          {lang === 'pt' ? selectedEvent.description : selectedEvent.descriptionEn}
        </p>

        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>{lang === 'pt' ? 'Conexão Territorial:' : 'Territorial Connection:'} <strong className="text-slate-200">{selectedEvent.highlight}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Arquivo Histórico de Moçambique & MAE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
