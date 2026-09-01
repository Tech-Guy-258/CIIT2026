/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from '../data';
import { realtimeAttendance } from '../services/realtimeAttendance';
import { AttendanceMetrics, CheckInRecord, Registration, CategoryAttendanceBreakdown } from '../types';
import {
  Users, UserCheck, Clock, Percent, QrCode, Sparkles,
  TrendingUp, ShieldCheck, CheckCircle2, Trash2,
  Briefcase, Mic, Award, Filter, Search, ChevronRight, Check,
  X, Layers, Activity
} from 'lucide-react';

interface LiveAttendanceProps {
  lang: 'pt' | 'en';
  onOpenScanner: () => void;
  onOpenAdmin: () => void;
}

export default function LiveAttendance({
  lang,
  onOpenScanner,
  onOpenAdmin
}: LiveAttendanceProps) {
  const t = TRANSLATIONS[lang];

  const [metrics, setMetrics] = useState<AttendanceMetrics>(() => realtimeAttendance.getMetrics());
  const [registrations, setRegistrations] = useState<Registration[]>(() => realtimeAttendance.getRegistrations());
  const [isOnline, setIsOnline] = useState<boolean>(() => realtimeAttendance.getOnlineStatus());
  const [hasDemoData, setHasDemoData] = useState<boolean>(() => {
    return realtimeAttendance.getRegistrations().some(r => r.isDemo);
  });
  const [newCheckInAlert, setNewCheckInAlert] = useState<CheckInRecord | null>(null);

  // Category filter state for live attendees explorer
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'present' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInspectorExpanded, setIsInspectorExpanded] = useState(false);

  // Subscribe to real-time events across any tabs/devices
  useEffect(() => {
    const unsubscribe = realtimeAttendance.subscribe((state) => {
      setMetrics(state.metrics);
      setRegistrations(state.registrations);
      setIsOnline(realtimeAttendance.getOnlineStatus());
      setHasDemoData(state.registrations.some(r => r.isDemo));

      if (state.lastEvent?.type === 'NEW_CHECKIN') {
        setNewCheckInAlert(state.lastEvent.checkInRecord);
        // Clear flash alert after 4 seconds
        setTimeout(() => {
          setNewCheckInAlert(null);
        }, 4000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLoadDemo = () => {
    realtimeAttendance.loadDemoData();
  };

  const handleClearDemo = () => {
    realtimeAttendance.clearDemoData();
  };

  const categoriesData = useMemo(() => {
    return metrics.categoryBreakdown || realtimeAttendance.getCategoryBreakdown();
  }, [metrics, registrations]);

  // Filtered attendees for the interactive category explorer
  const filteredAttendees = useMemo(() => {
    return registrations.filter((reg) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && reg.registrationType !== selectedCategoryFilter) {
        return false;
      }
      // Status filter
      if (selectedStatusFilter === 'present' && !reg.isCheckedIn) return false;
      if (selectedStatusFilter === 'pending' && reg.isCheckedIn) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const nameMatches = reg.fullName.toLowerCase().includes(q);
        const compMatches = reg.company.toLowerCase().includes(q);
        const titleMatches = reg.jobTitle.toLowerCase().includes(q);
        const idMatches = reg.id.toLowerCase().includes(q);
        return nameMatches || compMatches || titleMatches || idMatches;
      }

      return true;
    });
  }, [registrations, selectedCategoryFilter, selectedStatusFilter, searchQuery]);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'delegate':
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'investor':
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
      case 'government':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'speaker':
        return <Mic className="w-4 h-4 text-purple-400" />;
      case 'sponsor':
        return <Award className="w-4 h-4 text-pink-400" />;
      default:
        return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryBadgeClass = (type: string) => {
    switch (type) {
      case 'delegate':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'investor':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'government':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'speaker':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'sponsor':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      default:
        return 'bg-white/10 text-gray-300 border-white/20';
    }
  };

  return (
    <section id="attendance" className="py-24 bg-corporate-950 text-white border-b border-gold-600/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/5 rounded-none blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-none blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER & REALTIME STATUS BADGE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded-none flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'pt' ? 'SISTEMA LIVE • TEMPO REAL' : 'LIVE ACCREDITATION STREAM'}</span>
              </span>

              {/* Online / Offline Sync indicator */}
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-none border flex items-center space-x-1.5 ${
                isOnline
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span>{isOnline ? t.liveOnline : t.liveOffline}</span>
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight text-white mt-2">
              {t.liveAttendanceTitle}
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-2xl font-light">
              {t.liveAttendanceSubtitle}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Launch QR Scanner Button */}
            <button
              id="live-open-scanner-btn"
              onClick={onOpenScanner}
              className="px-5 py-3 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 font-bold uppercase text-xs tracking-widest flex items-center space-x-2 shadow-lg hover:shadow-gold-500/20 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{t.liveOpenScanner}</span>
            </button>

            {/* Admin Console shortcut */}
            <button
              id="live-open-admin-btn"
              onClick={onOpenAdmin}
              className="px-4 py-3 rounded-none bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold uppercase text-xs tracking-widest flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>{lang === 'pt' ? 'Console Admin' : 'Admin Area'}</span>
            </button>

            {/* Demo test toggle */}
            {!hasDemoData ? (
              <button
                id="live-load-demo-btn"
                onClick={handleLoadDemo}
                title={lang === 'pt' ? 'Carregar participantes de teste para simulação ao vivo' : 'Load sample attendees for live simulation'}
                className="p-3 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-gold-400 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="live-clear-demo-btn"
                onClick={handleClearDemo}
                title={lang === 'pt' ? 'Remover dados de demonstração' : 'Clear demo records'}
                className="p-3 rounded-none bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* RECENT REAL-TIME CHECK-IN POPUP FLASH BANNER */}
        {newCheckInAlert && (
          <div
            id="live-checkin-flash-banner"
            className="mb-8 p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-none flex items-center justify-between shadow-xl animate-fade-in"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-none bg-emerald-500 text-corporate-950 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  {lang === 'pt' ? 'NOVO CHECK-IN REGISTADO AGORA' : 'NEW CHECK-IN CONFIRMED'}
                </span>
                <span className="text-sm font-bold text-white">
                  {newCheckInAlert.participantName}
                </span>
                <span className="text-xs text-emerald-200 ml-2 font-light">
                  ({newCheckInAlert.jobTitle} • {newCheckInAlert.company})
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-300 font-bold">
              {newCheckInAlert.formattedTime}
            </span>
          </div>
        )}

        {/* SECTION 1: QUADRO GERAL DE PRESENÇAS (TOTAL GERAL, NO LOCAL E A CAMINHO) */}
        <div className="mb-10 bg-gradient-to-br from-corporate-900/90 via-corporate-950/90 to-corporate-900/90 border border-gold-600/30 p-6 sm:p-8 rounded-none shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-none blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-2.5">
              <Activity className="w-5 h-5 text-gold-400" />
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gold-400 block">
                  {lang === 'pt' ? 'CONTROLO GERAL CONSOLIDADO' : 'CONSOLIDATED GENERAL ATTENDANCE'}
                </span>
                <h3 className="text-lg sm:text-xl font-display font-light uppercase text-white tracking-wider">
                  {t.liveOverviewTitle}
                </h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{metrics.totalPresent} {lang === 'pt' ? 'Já no Local' : 'On Site'}</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                <span>⏳ {metrics.totalPending} {lang === 'pt' ? 'A Caminho' : 'On The Way'}</span>
              </span>
            </div>
          </div>

          {/* 4 GLOBAL OVERVIEW KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Total Geral de Inscritos */}
            <div className="p-5 bg-corporate-950/70 border border-white/10 rounded-none relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                  {t.liveTotalRegistered}
                </span>
                <div className="p-2 bg-white/5 border border-white/10 rounded-none text-gold-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-display font-black text-white block tracking-tight">
                {metrics.totalRegistered}
              </span>
              <p className="text-[11px] text-gray-400 font-light mt-1">
                {lang === 'pt' ? 'Delegados, Investidores & Convidados' : 'Delegates, Investors & Guests'}
              </p>
            </div>

            {/* 2. Total Já no Local (Presenças Confirmadas) */}
            <div className="p-5 bg-corporate-950/70 border border-emerald-500/40 rounded-none relative overflow-hidden shadow-lg shadow-emerald-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.livePresent}</span>
                </span>
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-none text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-display font-black text-emerald-400 block tracking-tight">
                {metrics.totalPresent}
              </span>
              <p className="text-[11px] text-emerald-300/80 font-light mt-1">
                {lang === 'pt' ? 'Check-ins validados na entrada' : 'Validated check-ins at entrance'}
              </p>
            </div>

            {/* 3. Total A Caminho (Pendentes) */}
            <div className="p-5 bg-corporate-950/70 border border-amber-500/40 rounded-none relative overflow-hidden shadow-lg shadow-amber-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  {t.livePending}
                </span>
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-none text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-display font-black text-amber-400 block tracking-tight">
                {metrics.totalPending}
              </span>
              <p className="text-[11px] text-amber-300/80 font-light mt-1">
                {lang === 'pt' ? 'Participantes aguardados no recinto' : 'Delegates expected at venue'}
              </p>
            </div>

            {/* 4. Taxa Global de Presença */}
            <div className="p-5 bg-corporate-950/70 border border-gold-500/40 rounded-none relative overflow-hidden shadow-lg shadow-gold-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold">
                  {t.liveAttendanceRate}
                </span>
                <div className="p-2 bg-gold-500/10 border border-gold-500/30 rounded-none text-gold-400">
                  <Percent className="w-4 h-4" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-display font-black text-gold-400 block tracking-tight">
                {metrics.attendanceRate}%
              </span>
              {/* Dual-bar visualization */}
              <div className="w-full bg-white/10 h-2 mt-2 rounded-none overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-700"
                  style={{ width: `${Math.min(100, Math.max(0, metrics.attendanceRate))}%` }}
                  title={`${metrics.totalPresent} Presentes`}
                />
                <div
                  className="bg-amber-500/80 h-full transition-all duration-700"
                  style={{ width: `${Math.min(100, Math.max(0, 100 - metrics.attendanceRate))}%` }}
                  title={`${metrics.totalPending} A caminho`}
                />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: ATTENDANCE DISCRIMINATED BY PARTICIPATION TYPE */}
        <div className="mb-12 bg-corporate-900/40 border border-gold-600/30 p-6 sm:p-8 rounded-none relative">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Layers className="w-4 h-4 text-gold-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gold-400">
                  {lang === 'pt' ? 'SEGMENTAÇÃO EXCLUSIVA POR CATEGORIA DE INSCRIÇÃO' : 'BREAKDOWN BY REGISTRATION CATEGORY'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-light uppercase text-white tracking-wide">
                {t.attendanceByTypeTitle}
              </h3>
              <p className="text-xs text-gray-400 font-light mt-1 max-w-3xl">
                {t.attendanceByTypeSubtitle}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                id="live-toggle-inspector-btn"
                onClick={() => setIsInspectorExpanded(!isInspectorExpanded)}
                className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-gray-200 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-gold-400" />
                <span>{isInspectorExpanded ? (lang === 'pt' ? 'Recolher Lista' : 'Collapse List') : (lang === 'pt' ? 'Explorar Participantes' : 'Explore Delegates')}</span>
              </button>
            </div>
          </div>

          {/* 5 CATEGORY CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoriesData.map((cat) => {
              const isSelected = selectedCategoryFilter === cat.type;
              return (
                <div
                  key={cat.type}
                  onClick={() => {
                    if (selectedCategoryFilter === cat.type && isInspectorExpanded) {
                      setSelectedCategoryFilter('all');
                    } else {
                      setSelectedCategoryFilter(cat.type);
                      setIsInspectorExpanded(true);
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-none border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-corporate-900 border-gold-400 shadow-lg shadow-gold-500/10 scale-[1.02]'
                      : 'bg-corporate-950/70 border-white/10 hover:border-white/25 hover:bg-corporate-900/60'
                  }`}
                >
                  {/* Top: Icon + Label */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-none border ${cat.badgeBg} ${cat.badgeBorder}`}>
                      {getCategoryIcon(cat.type)}
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      {cat.total} {lang === 'pt' ? 'inscritos' : 'total'}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-white mb-3 group-hover:text-gold-300 transition-colors">
                    {lang === 'pt' ? cat.label : cat.labelEn}
                  </h4>

                  {/* Split Counter: Já no Local (Presentes) vs A Caminho */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/5 my-2">
                    <div>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase block font-semibold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{t.statusPresent}</span>
                      </span>
                      <span className="text-xl font-display font-black text-emerald-400 block mt-0.5">
                        {cat.present}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-amber-400 uppercase block font-semibold">
                        ⏳ {t.statusOnTheWay}
                      </span>
                      <span className="text-xl font-display font-black text-amber-400 block mt-0.5">
                        {cat.pending}
                      </span>
                    </div>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                      <span>{lang === 'pt' ? 'Presença' : 'Rate'}</span>
                      <span className="text-white font-bold">{cat.rate}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, cat.rate))}%` }}
                        title={`${cat.present} Presentes no local`}
                      />
                      <div
                        className="bg-amber-500/70 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, 100 - cat.rate))}%` }}
                        title={`${cat.pending} A caminho`}
                      />
                    </div>
                  </div>

                  {/* Click hint footer */}
                  <div className="mt-3 pt-2 text-right">
                    <span className="text-[9px] font-mono text-gold-400 group-hover:underline flex items-center justify-end space-x-1">
                      <span>{isSelected ? (lang === 'pt' ? 'Filtro Ativo' : 'Filter Active') : (lang === 'pt' ? 'Ver Lista' : 'View List')}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* EXPANDABLE DELEGATES LOOKUP INSPECTOR */}
          {isInspectorExpanded && (
            <div
              id="live-attendance-inspector-box"
              className="mt-8 pt-6 border-t border-white/10 bg-corporate-950/80 p-5 sm:p-6 border border-white/10 rounded-none animate-fade-in"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-display font-bold text-base text-white uppercase flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gold-400" />
                    <span>
                      {selectedCategoryFilter === 'all'
                        ? (lang === 'pt' ? 'Todos os Participantes Cadastrados' : 'All Registered Delegates')
                        : `${lang === 'pt' ? 'Participantes: ' : 'Delegates: '} ${categoriesData.find(c => c.type === selectedCategoryFilter)?.label || selectedCategoryFilter}`}
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    {lang === 'pt'
                      ? `Mostrando ${filteredAttendees.length} de ${registrations.length} participantes (${filteredAttendees.filter(a => a.isCheckedIn).length} já no local, ${filteredAttendees.filter(a => !a.isCheckedIn).length} a caminho)`
                      : `Showing ${filteredAttendees.length} of ${registrations.length} attendees (${filteredAttendees.filter(a => a.isCheckedIn).length} on site, ${filteredAttendees.filter(a => !a.isCheckedIn).length} on the way)`}
                  </p>
                </div>

                {/* Filters & Search controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Category dropdown */}
                  <select
                    id="live-inspector-category-select"
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="bg-corporate-900 text-white text-xs border border-white/15 px-3 py-2 rounded-none focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    <option value="all">{lang === 'pt' ? 'Todas as Categorias' : 'All Categories'}</option>
                    <option value="delegate">{lang === 'pt' ? 'Delegados Executivos' : 'Executive Delegates'}</option>
                    <option value="investor">{lang === 'pt' ? 'Investidores' : 'Investors'}</option>
                    <option value="government">{lang === 'pt' ? 'Membros do Governo' : 'Government'}</option>
                    <option value="speaker">{lang === 'pt' ? 'Oradores & Painelistas' : 'Speakers'}</option>
                    <option value="sponsor">{lang === 'pt' ? 'Patrocinadores' : 'Sponsors'}</option>
                  </select>

                  {/* Status dropdown */}
                  <select
                    id="live-inspector-status-select"
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                    className="bg-corporate-900 text-white text-xs border border-white/15 px-3 py-2 rounded-none focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    <option value="all">{lang === 'pt' ? 'Todos os Estados' : 'All Statuses'}</option>
                    <option value="present">{lang === 'pt' ? '✓ Já no Local' : '✓ On Site (Present)'}</option>
                    <option value="pending">{lang === 'pt' ? '⏳ Apenas A Caminho' : '⏳ On The Way'}</option>
                  </select>

                  {/* Search input */}
                  <div className="relative min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      id="live-inspector-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === 'pt' ? 'Pesquisar nome/empresa/código...' : 'Search name/company/ID...'}
                      className="w-full pl-9 pr-3 py-1.5 bg-corporate-900 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 rounded-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategoryFilter('all');
                      setSelectedStatusFilter('all');
                      setSearchQuery('');
                    }}
                    className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-none transition-colors cursor-pointer"
                    title={lang === 'pt' ? 'Limpar filtros' : 'Reset filters'}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ATTENDEES TABLE / LIST */}
              <div className="overflow-x-auto max-h-96 overflow-y-auto border border-white/10 rounded-none">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-corporate-900/90 sticky top-0 uppercase font-mono text-[10px] text-gray-400 tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Código / ID</th>
                      <th className="py-3 px-4">Participante</th>
                      <th className="py-3 px-4">Instituição / Empresa</th>
                      <th className="py-3 px-4">País</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4 text-right">Estado da Presença</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAttendees.length > 0 ? (
                      filteredAttendees.map((reg) => (
                        <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-gold-400">
                            {reg.id}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block">{reg.fullName}</span>
                            <span className="text-[11px] text-gray-400 font-light">{reg.jobTitle}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-300 font-light">
                            {reg.company}
                          </td>
                          <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                            {reg.country}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-none border ${getCategoryBadgeClass(reg.registrationType)}`}>
                              {reg.registrationType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {reg.isCheckedIn ? (
                              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <span>✓ {t.statusPresent}</span>
                                {reg.checkedInAt && (
                                  <span className="text-emerald-300/70 font-mono">
                                    {new Date(reg.checkedInAt).toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25">
                                <span>⏳ {t.statusOnTheWay}</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500 text-xs">
                          {lang === 'pt' ? 'Nenhum participante encontrado com os filtros selecionados.' : 'No attendees match the selected category/search filters.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

