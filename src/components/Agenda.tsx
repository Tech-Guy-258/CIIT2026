/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AGENDA, SPEAKERS, TRANSLATIONS } from '../data';
import { Clock, MapPin, Search, Calendar, ChevronRight, Sparkles, User, Tag } from 'lucide-react';

interface AgendaProps {
  lang: 'pt' | 'en';
}

export default function Agenda({ lang }: AgendaProps) {
  const t = TRANSLATIONS[lang];
  const [selectedDay, setSelectedDay] = useState<number>(1); // 1, 2, 3
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const daysInfo = [
    { num: 1, date: lang === 'pt' ? 'Quinta-feira, 8 Outubro' : 'Thursday, Oct 8', tag: lang === 'pt' ? 'Abertura de Estado & Keynotes Plenárias' : 'State Opening & Plenary Keynotes' },
    { num: 2, date: lang === 'pt' ? 'Sexta-feira, 9 Outubro' : 'Friday, Oct 9', tag: lang === 'pt' ? 'Energia, Mineração & Agronegócio' : 'Energy, Mining & Agribusiness' },
    { num: 3, date: lang === 'pt' ? 'Sábado, 10 Outubro' : 'Saturday, Oct 10', tag: lang === 'pt' ? 'Inovação, Assinatura de MoU & Encerramento' : 'Innovation, MoU Signings & Closing' }
  ];

  const categories = [
    { id: 'all', label: lang === 'pt' ? 'Todas as Sessões' : 'All Sessions' },
    { id: 'plenary', label: lang === 'pt' ? 'Sessões Plenárias' : 'Plenary' },
    { id: 'energy', label: lang === 'pt' ? 'Energia' : 'Energy' },
    { id: 'mining', label: lang === 'pt' ? 'Mineração & Logística' : 'Mining & Logistics' },
    { id: 'agriculture', label: lang === 'pt' ? 'Agronegócio (6C\'s)' : 'Agribusiness' },
    { id: 'economy', label: lang === 'pt' ? 'Sector Privado' : 'Private Sector' },
    { id: 'infrastructure', label: lang === 'pt' ? 'Infraestrutura' : 'Infrastructure' },
    { id: 'networking', label: lang === 'pt' ? 'Almoços & Networking' : 'Networking' }
  ];

  // Filtering agenda items
  const filteredAgenda = AGENDA.filter((session) => {
    // Filter by day
    const isDayOne = session.id.startsWith('d1') && selectedDay === 1;
    const isDayTwo = session.id.startsWith('d2') && selectedDay === 2;
    const isDayThree = session.id.startsWith('d3') && selectedDay === 3;
    if (!isDayOne && !isDayTwo && !isDayThree) return false;

    // Filter by category
    if (activeCategory !== 'all' && session.category !== activeCategory) return false;

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const titleMatches = (session.title.toLowerCase().includes(query)) || (session.titleEn?.toLowerCase().includes(query) || false);
      const descMatches = (session.description?.toLowerCase().includes(query) || false) || (session.descriptionEn?.toLowerCase().includes(query) || false);
      const themeMatches = (session.theme?.toLowerCase().includes(query) || false) || (session.themeEn?.toLowerCase().includes(query) || false);
      const locMatches = (session.location.toLowerCase().includes(query)) || (session.locationEn?.toLowerCase().includes(query) || false);
      return titleMatches || descMatches || themeMatches || locMatches;
    }

    return true;
  });

  return (
    <section id="agenda" className="py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/10 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Programa Oficial da Conferência' : 'Official Conference Schedule'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.agendaTitle}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            {t.agendaSubtitle}
          </p>
          
          {/* Note about plenary venue */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-corporate-950 text-gold-400 px-4 py-1.5 text-xs font-mono font-medium">
            <MapPin className="w-3.5 h-3.5 text-gold-500" />
            <span>{lang === 'pt' ? 'Local Único e Central: SALA PLENÁRIA OFICIAL' : 'Central Venue: MAIN PLENARY HALL'}</span>
          </div>

          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-6" />
        </div>

        {/* Day Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {daysInfo.map((day) => (
            <button
              key={day.num}
              id={`day-select-btn-${day.num}`}
              onClick={() => {
                setSelectedDay(day.num);
                setSearchQuery(''); // reset search
              }}
              className={`p-5 rounded-none border text-left transition-all relative overflow-hidden cursor-pointer ${
                selectedDay === day.num
                  ? 'bg-corporate-950 border-gold-500 text-white shadow-xl shadow-corporate-950/20 scale-[1.02]'
                  : 'bg-neutral-50 border-slate-200 text-corporate-950 hover:bg-neutral-100'
              }`}
            >
              {/* Floating big day number watermark */}
              <span className={`absolute right-4 bottom-2 text-6xl font-display font-black select-none pointer-events-none opacity-5 ${
                selectedDay === day.num ? 'text-white' : 'text-corporate-950'
              }`}>
                0{day.num}
              </span>

              <div className="relative z-10">
                <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${
                  selectedDay === day.num ? 'text-gold-400' : 'text-gold-700'
                }`}>
                  {t.day} 0{day.num}
                </span>
                <span className="text-base font-semibold block mt-1 font-display">
                  {day.date}
                </span>
                <span className={`text-[11px] block mt-1 font-light leading-snug ${
                  selectedDay === day.num ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {day.tag}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Filters and Search Dashboard */}
        <div className="bg-neutral-50 border border-slate-200 rounded-none p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-none text-xs font-semibold tracking-wider uppercase transition-colors border cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-corporate-950 text-gold-400 border-corporate-950 font-bold shadow-sm'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <input
              type="text"
              id="agenda-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'pt' ? 'Pesquisar sessões e temas...' : 'Search sessions and topics...'}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-none border border-slate-200 bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* Sessions Timetable Output List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredAgenda.length > 0 ? (
            filteredAgenda.map((session) => (
              <div
                key={session.id}
                id={`agenda-session-${session.id}`}
                className="bg-white border border-slate-200 hover:border-gold-500/50 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start gap-6 relative group"
              >
                {/* Category colored left-border bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  session.category === 'plenary' ? 'bg-indigo-600' :
                  session.category === 'energy' ? 'bg-amber-500' :
                  session.category === 'mining' ? 'bg-zinc-700' :
                  session.category === 'agriculture' ? 'bg-emerald-600' :
                  session.category === 'infrastructure' ? 'bg-blue-600' :
                  session.category === 'economy' ? 'bg-purple-600' :
                  'bg-rose-500' // networking
                }`} />

                {/* Left block: Time column */}
                <div className="flex-shrink-0 md:w-44">
                  <div className="flex items-center space-x-2 text-corporate-950">
                    <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                    <span className="text-sm font-bold tracking-tight font-mono">{session.time}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className={`inline-block text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-none text-white ${
                      session.category === 'plenary' ? 'bg-indigo-600' :
                      session.category === 'energy' ? 'bg-amber-600' :
                      session.category === 'mining' ? 'bg-zinc-700' :
                      session.category === 'agriculture' ? 'bg-emerald-700' :
                      session.category === 'infrastructure' ? 'bg-blue-600' :
                      session.category === 'economy' ? 'bg-purple-700' :
                      'bg-rose-600'
                    }`}>
                      {session.category}
                    </span>

                    {session.isPreliminary && (
                      <span className="inline-block text-[8px] uppercase tracking-wider font-mono px-1.5 py-0.5 bg-neutral-100 text-gray-500 border border-slate-200">
                        {lang === 'pt' ? 'Plenária' : 'Plenary'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right block: Content column */}
                <div className="flex-grow space-y-3">
                  {/* Activity Tag */}
                  {session.activity && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-700 block">
                      {lang === 'pt' ? session.activity : (session.activityEn || session.activity)}
                    </span>
                  )}

                  <h3 className="text-lg md:text-xl font-display font-bold text-corporate-950 group-hover:text-gold-700 transition-colors tracking-tight leading-snug">
                    {lang === 'pt' ? session.title : (session.titleEn || session.title)}
                  </h3>

                  {/* Thematic subtitle if present */}
                  {session.theme && (
                    <div className="bg-neutral-50 border-l-2 border-gold-500 p-2.5 text-xs text-corporate-900 font-medium leading-relaxed">
                      <span className="text-[10px] font-mono uppercase text-gray-500 block font-bold">
                        {lang === 'pt' ? 'Tema em Discussão:' : 'Thematic Focus:'}
                      </span>
                      {lang === 'pt' ? session.theme : (session.themeEn || session.theme)}
                    </div>
                  )}

                  {session.description && (
                    <p className="text-xs md:text-sm text-gray-600 font-normal leading-relaxed">
                      {lang === 'pt' ? session.description : (session.descriptionEn || session.description)}
                    </p>
                  )}

                  {/* Render Assigned Speakers */}
                  {session.speakerIds && session.speakerIds.length > 0 && (
                    <div className="pt-3 flex flex-wrap gap-3 items-center border-t border-gray-100">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-gray-500 flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-gold-600" />
                        <span>{lang === 'pt' ? 'Intervenientes / Oradores:' : 'Speakers / Panelists:'}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {session.speakerIds.map((speakerId) => {
                          const speaker = SPEAKERS.find((s) => s.id === speakerId);
                          if (!speaker) return null;
                          return (
                            <div key={speaker.id} className="flex items-center space-x-2 bg-neutral-50 px-2.5 py-1 rounded-none border border-slate-200 text-xs font-medium text-gray-800">
                              <img
                                src={speaker.imageUrl}
                                alt={speaker.name}
                                className="w-5 h-5 rounded-none object-cover border border-slate-300"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-[11px] font-sans font-bold text-corporate-950">{speaker.name}</span>
                              <span className="text-[9px] text-gray-500 font-mono">({speaker.company})</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Location display - Always PLENÁRIA */}
                  <div className="flex items-center space-x-2 pt-2 text-[11px] text-corporate-900 font-mono font-bold">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span className="text-gold-700 bg-gold-500/10 px-2 py-0.5 border border-gold-500/20">
                      {lang === 'pt' ? session.location : (session.locationEn || session.location)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-neutral-50 border border-dashed border-slate-200 rounded-none p-12 text-center">
              <p className="text-gray-500 text-sm">
                {lang === 'pt'
                  ? 'Nenhuma sessão encontrada para a sua pesquisa ou filtros.'
                  : 'No sessions match your search or filter requirements.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
