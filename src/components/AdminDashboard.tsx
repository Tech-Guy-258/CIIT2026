/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { TRANSLATIONS } from '../data';
import { Registration, CategoryAttendanceBreakdown, CheckInRecord } from '../types';
import { realtimeAttendance } from '../services/realtimeAttendance';
import {
  Users, UserCheck, Clock, Percent, ShieldCheck, Lock, Search, Filter,
  FileSpreadsheet, UserPlus, LogOut, Check, X, QrCode, Trash2,
  Briefcase, TrendingUp, Mic, Award, Building, Layers, CheckCircle2,
  BarChart3, Activity, Key
} from 'lucide-react';
import AccessCodeManagement from './AccessCodeManagement';

interface AdminDashboardProps {
  lang: 'pt' | 'en';
  registrations: Registration[];
  isSuperUser?: boolean;
  onAddManualAttendee?: (reg: Registration) => void;
  onAddManualRegistration?: (reg: Registration) => void;
  onClearRegistrations: () => void;
  onCloseAdmin?: () => void;
  onOpenScanner?: () => void;
}

export default function AdminDashboard({
  lang,
  registrations,
  isSuperUser = false,
  onAddManualAttendee,
  onAddManualRegistration,
  onClearRegistrations,
  onCloseAdmin,
  onOpenScanner
}: AdminDashboardProps) {
  const t = TRANSLATIONS[lang];

  // Auth gate - if isSuperUser is true, automatically authenticated directly!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isSuperUser);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [adminTab, setAdminTab] = useState<'attendance' | 'access_codes'>('attendance');

  // If isSuperUser changes to true, automatically authenticate
  useEffect(() => {
    if (isSuperUser) {
      setIsAuthenticated(true);
    }
  }, [isSuperUser]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'pending'>('all');

  // Real-time check-ins and hourly data for Admin analytics
  const [recentCheckIns, setRecentCheckIns] = useState<CheckInRecord[]>(() => realtimeAttendance.getCheckIns().slice(0, 10));
  const [hourlyData, setHourlyData] = useState(() => realtimeAttendance.getHourlyEvolution());

  useEffect(() => {
    const unsubscribe = realtimeAttendance.subscribe((state) => {
      setRecentCheckIns(state.checkIns.slice(0, 10));
      setHourlyData(realtimeAttendance.getHourlyEvolution());
    });
    return () => unsubscribe();
  }, []);

  // Find maximum hourly count for SVG chart scaling
  const maxHourlyCount = Math.max(...hourlyData.map(d => d.count), 5);

  // Manual entry toggle
  const [showManualForm, setShowManualForm] = useState(false);
  const [mName, setMName] = useState('');
  const [mEmail, setMEmail] = useState('');
  const [mCompany, setMCompany] = useState('');
  const [mTitle, setMTitle] = useState('');
  const [mCountry, setMCountry] = useState('Moçambique');
  const [mType, setMType] = useState<Registration['registrationType']>('delegate');
  const [mSector, setMSector] = useState('Geral / Investimentos');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'CIIT2026-ADMIN' || passcode.trim() === 'admin123' || passcode.trim() === 'tete2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(lang === 'pt' ? 'Chave de acesso incorreta. Tente CIIT2026-ADMIN' : 'Invalid admin passcode. Try CIIT2026-ADMIN');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName || !mEmail || !mCompany) return;

    const newReg: Registration = {
      id: `CIIT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: mName,
      email: mEmail,
      phone: '+258 84 000 0000',
      company: mCompany,
      jobTitle: mTitle || 'Representante Executivo',
      country: mCountry || 'Moçambique',
      sectorOfInterest: mSector || 'Energia & Indústria',
      registrationType: mType,
      registeredAt: new Date().toISOString(),
      ticketStatus: 'Confirmed',
      isCheckedIn: false,
      isDemo: false
    };

    if (onAddManualAttendee) {
      onAddManualAttendee(newReg);
    } else if (onAddManualRegistration) {
      onAddManualRegistration(newReg);
    }
    realtimeAttendance.addRegistration(newReg);

    // Reset form
    setMName('');
    setMEmail('');
    setMCompany('');
    setMTitle('');
    setShowManualForm(false);
  };

  // Toggle check-in state manually for any attendee
  const handleToggleCheckIn = (reg: Registration) => {
    if (!reg.isCheckedIn) {
      realtimeAttendance.performCheckIn(reg.id, {
        deviceId: 'PORTAL-ADMIN-MANUAL',
        operatorName: 'Operador Administrativo'
      });
    } else {
      realtimeAttendance.undoCheckIn(reg.id);
    }
  };

  // CSV Exporter logic
  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = 'ID,Full Name,Email,Company,Title,Country,Sector,Registration Type,Registered At,Attendance Status,Check-in Time\n';
    const rows = registrations.map((reg) => {
      const statusText = reg.isCheckedIn ? 'PRESENT' : 'PENDING_ON_THE_WAY';
      const checkInTime = reg.checkedInAt ? new Date(reg.checkedInAt).toLocaleString() : 'N/A';
      return `"${reg.id}","${reg.fullName}","${reg.email}","${reg.company}","${reg.jobTitle}","${reg.country}","${reg.sectorOfInterest}","${reg.registrationType}","${reg.registeredAt}","${statusText}","${checkInTime}"`;
    }).join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
    
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `CIIT2026_Delegates_Attendance_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics calculation
  const totalCount = registrations.length;
  const presentCount = registrations.filter(r => r.isCheckedIn).length;
  const pendingCount = Math.max(0, totalCount - presentCount);
  const attendanceRate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : '0';

  // Category breakdown calculation
  const categoriesList: Array<{
    type: Registration['registrationType'];
    labelPt: string;
    labelEn: string;
    icon: React.ReactNode;
    color: string;
    badgeBg: string;
    badgeBorder: string;
    textColor: string;
  }> = [
    {
      type: 'delegate',
      labelPt: 'Delegados Executivos',
      labelEn: 'Executive Delegates',
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      color: 'blue',
      badgeBg: 'bg-blue-500/10',
      badgeBorder: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    {
      type: 'investor',
      labelPt: 'Investidores',
      labelEn: 'Investors',
      icon: <TrendingUp className="w-4 h-4 text-amber-400" />,
      color: 'amber',
      badgeBg: 'bg-amber-500/10',
      badgeBorder: 'border-amber-500/30',
      textColor: 'text-amber-400'
    },
    {
      type: 'government',
      labelPt: 'Membros do Governo',
      labelEn: 'Government Officials',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      color: 'emerald',
      badgeBg: 'bg-emerald-500/10',
      badgeBorder: 'border-emerald-500/30',
      textColor: 'text-emerald-400'
    },
    {
      type: 'speaker',
      labelPt: 'Oradores & Painelistas',
      labelEn: 'Speakers & Panelists',
      icon: <Mic className="w-4 h-4 text-purple-400" />,
      color: 'purple',
      badgeBg: 'bg-purple-500/10',
      badgeBorder: 'border-purple-500/30',
      textColor: 'text-purple-400'
    },
    {
      type: 'sponsor',
      labelPt: 'Patrocinadores & Parceiros',
      labelEn: 'Sponsors & Partners',
      icon: <Award className="w-4 h-4 text-pink-400" />,
      color: 'pink',
      badgeBg: 'bg-pink-500/10',
      badgeBorder: 'border-pink-500/30',
      textColor: 'text-pink-400'
    }
  ];

  const categoryMetrics = useMemo(() => {
    return categoriesList.map((cat) => {
      const subset = registrations.filter(r => r.registrationType === cat.type);
      const total = subset.length;
      const present = subset.filter(r => r.isCheckedIn).length;
      const pending = Math.max(0, total - present);
      const rate = total > 0 ? ((present / total) * 100).toFixed(1) : '0';
      return {
        ...cat,
        total,
        present,
        pending,
        rate
      };
    });
  }, [registrations]);

  // Filtered participants list
  const filteredList = useMemo(() => {
    return registrations.filter((reg) => {
      // Type filter
      if (selectedType !== 'all' && reg.registrationType !== selectedType) return false;

      // Status filter
      if (statusFilter === 'present' && !reg.isCheckedIn) return false;
      if (statusFilter === 'pending' && reg.isCheckedIn) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const nameMatches = reg.fullName.toLowerCase().includes(q);
        const companyMatches = reg.company.toLowerCase().includes(q);
        const emailMatches = reg.email.toLowerCase().includes(q);
        const titleMatches = reg.jobTitle?.toLowerCase().includes(q);
        const idMatches = reg.id.toLowerCase().includes(q);
        const sectorMatches = reg.sectorOfInterest?.toLowerCase().includes(q);
        return nameMatches || companyMatches || emailMatches || titleMatches || idMatches || sectorMatches;
      }

      return true;
    });
  }, [registrations, selectedType, statusFilter, searchQuery]);

  const filteredPresentCount = filteredList.filter(r => r.isCheckedIn).length;
  const filteredPendingCount = filteredList.length - filteredPresentCount;

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

  if (!isAuthenticated) {
    return (
      <section id="admin" className="py-24 bg-neutral-900 text-white border-b border-gray-800 flex items-center justify-center min-h-[60vh] px-4 relative">
        <div className="bg-corporate-950 border border-gold-600/30 p-8 rounded-none shadow-2xl max-w-md w-full text-center relative overflow-hidden">
          {onCloseAdmin && (
            <button
              id="admin-close-login-btn"
              onClick={onCloseAdmin}
              className="absolute top-3 right-3 p-1.5 rounded-none text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={lang === 'pt' ? 'Fechar' : 'Close'}
            >
              <X className="w-5 h-5 text-gold-400" />
            </button>
          )}

          <div className="absolute top-0 left-0 w-32 h-32 bg-gold-600/5 rounded-none blur-2xl pointer-events-none" />
          
          <div className="w-12 h-12 rounded-none bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-gold-400" />
          </div>

          <h3 className="text-2xl font-display font-light uppercase text-white tracking-widest">
            {t.adminTitle}
          </h3>
          <p className="text-xs text-gray-400 mt-2">
            {lang === 'pt' ? 'Insira a chave de credenciamento administrativo para gerir o evento.' : 'Provide the administrative key log to check registration files.'}
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {authError && (
              <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 p-2.5 rounded-none border border-rose-500/30">
                {authError}
              </p>
            )}

            <input
              type="password"
              id="admin-passcode-input"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="e.g. CIIT2026-ADMIN"
              className="w-full text-center py-3 bg-corporate-900 border border-white/10 rounded-none text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              required
            />

            <button
              type="submit"
              id="admin-login-submit-btn"
              className="w-full py-3 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer"
            >
              {t.adminLoginBtn}
            </button>
            
            <p className="text-[10px] text-gray-500">
              Passcode: <span className="font-mono text-gray-400">CIIT2026-ADMIN</span>
            </p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-24 bg-neutral-900 text-white border-b border-gray-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard panel */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <span className="text-xs font-mono text-gold-400 font-bold tracking-widest uppercase">
                {lang === 'pt' ? 'PAINEL DE CONTROLO & CREDENCIAMENTO' : 'CONTROL PANEL & ACCREDITATION'}
              </span>
            </div>
            <h2 className="text-3xl font-display font-light text-white uppercase tracking-wider mt-1">
              {lang === 'pt' ? 'Gestão de Presenças e Participantes' : 'Attendance & Delegate Management'}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Open Scanner CTA */}
            {onOpenScanner && (
              <button
                id="admin-header-open-scanner-btn"
                onClick={onOpenScanner}
                className="px-4 py-2 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 font-bold uppercase text-xs tracking-widest flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>{lang === 'pt' ? 'Scanner QR' : 'QR Scanner'}</span>
              </button>
            )}

            <button
              id="admin-logout-btn"
              onClick={() => {
                setIsAuthenticated(false);
                if (onCloseAdmin) onCloseAdmin();
              }}
              className="px-3.5 py-2 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-gold-400" />
              <span>{lang === 'pt' ? 'Sair' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex items-center space-x-2 border-b border-white/10 mb-8 pb-3">
          <button
            onClick={() => setAdminTab('attendance')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center space-x-2 rounded-t cursor-pointer ${
              adminTab === 'attendance'
                ? 'bg-gold-500/20 text-gold-300 border-b-2 border-gold-400 font-black'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Presenças & Participantes' : 'Attendance & Delegates'}</span>
          </button>

          <button
            onClick={() => setAdminTab('access_codes')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center space-x-2 rounded-t cursor-pointer ${
              adminTab === 'access_codes'
                ? 'bg-gold-500/20 text-gold-300 border-b-2 border-gold-400 font-black'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>{lang === 'pt' ? 'Códigos de Acesso 24h (Firestore)' : '24h Access Codes (Firestore)'}</span>
          </button>
        </div>

        {/* TAB 1: ACCESS CODES MANAGEMENT (FIRESTORE) */}
        {adminTab === 'access_codes' && (
          <AccessCodeManagement lang={lang} />
        )}

        {/* TAB 2: ATTENDANCE & PARTICIPANTS */}
        {adminTab === 'attendance' && (
          <>
            {/* SECTION: ATTENDANCE DISCRIMINATION BY PARTICIPATION CATEGORY */}
            <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-gold-400" />
              <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-gold-400">
                {lang === 'pt' ? 'DISCRIMINAÇÃO DE PRESENÇAS POR TIPO DE PARTICIPAÇÃO' : 'ATTENDANCE BREAKDOWN BY REGISTRATION TYPE'}
              </h3>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">
              {presentCount} {lang === 'pt' ? 'presentes' : 'present'} • {pendingCount} {lang === 'pt' ? 'a caminho' : 'on the way'} ({attendanceRate}%)
            </span>
          </div>

          {/* 6 CARDS GRID: 1 OVERALL + 5 CATEGORIES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {/* OVERALL CARD */}
            <div
              onClick={() => {
                setSelectedType('all');
                setStatusFilter('all');
              }}
              className={`p-4 rounded-none border transition-all cursor-pointer ${
                selectedType === 'all' && statusFilter === 'all'
                  ? 'bg-corporate-950 border-gold-500 shadow-md shadow-gold-500/10'
                  : 'bg-corporate-950/60 border-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase block font-bold">
                {lang === 'pt' ? 'TOTAL GERAL' : 'ALL DELEGATES'}
              </span>
              <span className="text-2xl sm:text-3xl font-display font-black text-white block mt-1">
                {totalCount}
              </span>
              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-emerald-400 font-bold">{presentCount} pres.</span>
                <span className="text-amber-400 font-bold">{pendingCount} a cam.</span>
              </div>
            </div>

            {/* 5 CATEGORY CARDS */}
            {categoryMetrics.map((cat) => {
              const isSelected = selectedType === cat.type;
              return (
                <div
                  key={cat.type}
                  onClick={() => {
                    setSelectedType(selectedType === cat.type ? 'all' : cat.type);
                  }}
                  className={`p-4 rounded-none border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-corporate-950 border-gold-400 shadow-md shadow-gold-500/15'
                      : 'bg-corporate-950/60 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[9px] font-mono tracking-widest uppercase font-bold ${cat.textColor}`}>
                      {lang === 'pt' ? cat.labelPt : cat.labelEn}
                    </span>
                  </div>

                  <span className="text-2xl sm:text-3xl font-display font-black text-white block">
                    {cat.total}
                  </span>

                  {/* Present vs A Caminho breakdown */}
                  <div className="mt-2 pt-2 border-t border-white/5 grid grid-cols-2 gap-1 text-[10px] font-mono">
                    <span className="text-emerald-400 font-bold" title="Presentes">
                      ✓ {cat.present}
                    </span>
                    <span className="text-amber-400 font-bold text-right" title="A caminho">
                      ⏳ {cat.pending}
                    </span>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-full bg-white/10 h-1 mt-1.5 rounded-none overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${Math.min(100, Math.max(0, Number(cat.rate)))}%` }}
                    />
                    <div
                      className="bg-amber-500/70 h-full"
                      style={{ width: `${Math.min(100, Math.max(0, 100 - Number(cat.rate)))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: TWO-COLUMN REAL-TIME CHECK-IN STREAM & HOURLY EVOLUTION (ADMIN EXCLUSIVE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* LEFT: LATEST CHECK-INS FEED */}
          <div className="lg:col-span-6 bg-corporate-950/70 border border-white/10 p-5 sm:p-6 rounded-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-gold-400" />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    {lang === 'pt' ? 'Últimos Check-ins em Tempo Real' : 'Latest Check-ins Stream'}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-light block">
                    {lang === 'pt' ? 'Registo contínuo de validações de credenciais' : 'Continuous credential validation logs'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-none flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{recentCheckIns.length} {lang === 'pt' ? 'recentes' : 'recent'}</span>
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {recentCheckIns.length > 0 ? (
                recentCheckIns.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-corporate-900/60 border border-white/5 hover:border-gold-500/30 transition-all rounded-none flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-white">
                          {item.participantName}
                        </span>
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 border ${getCategoryBadgeClass(item.registrationType || 'delegate')}`}>
                          {item.registrationType}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-light">
                        {item.jobTitle} • <span className="text-gray-300">{item.company}</span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-gold-400 block">
                        {item.formattedTime}
                      </span>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ✓ Presente
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 text-xs">
                  {lang === 'pt' ? 'Nenhum check-in registado recentemente.' : 'No check-ins recorded recently.'}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: HOURLY DISTRIBUTION CHART */}
          <div className="lg:col-span-6 bg-corporate-950/70 border border-white/10 p-5 sm:p-6 rounded-none flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-2.5">
                  <BarChart3 className="w-4 h-4 text-gold-400" />
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      {lang === 'pt' ? 'Evolução de Entradas por Hora' : 'Hourly Check-in Evolution'}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-light block">
                      {lang === 'pt' ? 'Fluxo de credenciamento ao longo do dia' : 'Accreditation flow throughout the day'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-gold-400 font-bold">
                    {presentCount} {lang === 'pt' ? 'Presentes' : 'Present'}
                  </span>
                </div>
              </div>

              {/* Visual Bars for Hourly Check-ins with animated layout */}
              <div className="pt-2 pb-1">
                <div className="h-36 sm:h-40 flex items-end justify-between gap-1 sm:gap-2 border-b border-white/10 pb-2 relative">
                  
                  {/* Subtle background horizontal grid lines */}
                  <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/5 pointer-events-none" />
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/5 pointer-events-none" />

                  {hourlyData.map((slot) => {
                    const heightPercent = maxHourlyCount > 0 ? (slot.count / maxHourlyCount) * 100 : 0;
                    const hasEntries = slot.count > 0;
                    return (
                      <div key={slot.hour} className="flex-1 h-full flex flex-col items-center justify-end group relative">
                        
                        {/* Interactive Tooltip on hover */}
                        <div className="absolute -top-9 bg-corporate-950/95 border border-gold-500/60 text-gold-300 text-[10px] font-mono px-2 py-0.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 shadow-xl">
                          <span className="font-bold text-white">{slot.hour}:</span> {slot.count} {lang === 'pt' ? 'entradas' : 'entries'} • <span className="text-gold-400 font-bold">{slot.cumulative}</span> {lang === 'pt' ? 'acumulado' : 'cumulative'}
                        </div>

                        {/* Direct Numeric Count above active bars */}
                        <span className={`text-[9px] font-mono font-bold mb-0.5 transition-all ${
                          hasEntries ? 'text-gold-400 opacity-100' : 'text-transparent opacity-0'
                        }`}>
                          {hasEntries ? slot.count : '0'}
                        </span>

                        {/* Bar Track & Dynamic Animated Fill */}
                        <div className="w-full h-24 sm:h-28 bg-white/5 group-hover:bg-white/10 transition-colors rounded-none relative flex items-end justify-center overflow-hidden border border-white/5">
                          <div
                            className={`w-full transition-all duration-700 ease-out relative ${
                              hasEntries
                                ? 'bg-gradient-to-t from-amber-600 via-gold-500 to-amber-300 shadow-sm shadow-gold-500/20'
                                : 'bg-transparent'
                            }`}
                            style={{ height: `${hasEntries ? Math.max(12, heightPercent) : 0}%` }}
                          >
                            {hasEntries && (
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/80" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-Axis Hour Labels */}
                <div className="flex justify-between text-[9px] font-mono text-gray-400 pt-2">
                  {hourlyData.map((slot) => (
                    <span key={slot.hour} className="flex-1 text-center font-medium">
                      {slot.hour}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance Insight Quote */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
              <span className="font-mono flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>{lang === 'pt' ? 'Pico de Entrada: 08h00 — 10h00' : 'Peak Flow: 08:00 — 10:00'}</span>
              </span>
              <span className="font-mono text-gold-400 font-bold">
                {presentCount}/{totalCount} {lang === 'pt' ? 'Presentes' : 'Present'} ({attendanceRate}%)
              </span>
            </div>
          </div>

        </div>

        {/* SEARCH, FILTER & ACTION CONTROLS BAR */}
        <div className="bg-corporate-950/70 p-5 sm:p-6 rounded-none border border-white/10 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input for fast lookup */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                id="admin-search-attendees"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'pt' ? 'Localizar por nome, cargo, empresa ou ID...' : 'Locate by name, title, firm or ID...'}
                className="w-full pl-10 pr-4 py-2 bg-corporate-900 border border-white/15 rounded-none text-xs placeholder-gray-500 text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Category Filter Select */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <select
                id="admin-category-filter-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-corporate-900 text-white border border-white/15 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500 cursor-pointer w-full sm:w-auto"
              >
                <option value="all">{lang === 'pt' ? 'Todas as Categorias' : 'All Categories'} ({totalCount})</option>
                <option value="delegate">{lang === 'pt' ? 'Delegados Executivos' : 'Delegates'} ({categoryMetrics[0].total})</option>
                <option value="investor">{lang === 'pt' ? 'Investidores' : 'Investors'} ({categoryMetrics[1].total})</option>
                <option value="government">{lang === 'pt' ? 'Membros do Governo' : 'Government'} ({categoryMetrics[2].total})</option>
                <option value="speaker">{lang === 'pt' ? 'Oradores & Painelistas' : 'Speakers'} ({categoryMetrics[3].total})</option>
                <option value="sponsor">{lang === 'pt' ? 'Patrocinadores & Parceiros' : 'Sponsors'} ({categoryMetrics[4].total})</option>
              </select>
            </div>

            {/* Status Filter Select (Presentes vs A Caminho) */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                id="admin-status-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-corporate-900 text-white border border-white/15 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500 cursor-pointer w-full sm:w-auto font-medium"
              >
                <option value="all">{lang === 'pt' ? 'Todos os Estados' : 'All Statuses'}</option>
                <option value="present">{lang === 'pt' ? '✓ Apenas Presentes' : '✓ Only Present'} ({presentCount})</option>
                <option value="pending">{lang === 'pt' ? '⏳ Apenas A Caminho (Pendentes)' : '⏳ Only On The Way'} ({pendingCount})</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2.5 justify-end w-full lg:w-auto">
            {/* Button manual entry toggle */}
            <button
              id="admin-manual-entry-toggle"
              onClick={() => setShowManualForm(!showManualForm)}
              className="px-3.5 py-2 rounded-none bg-white/5 border border-white/15 hover:bg-white/10 text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-gold-400" />
              <span>{showManualForm ? (lang === 'pt' ? 'Fechar Formulário' : 'Close Form') : t.adminAddManual}</span>
            </button>

            {/* Export CSV Button */}
            <button
              id="admin-export-csv-btn"
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-none bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-widest flex items-center space-x-1.5 transition-colors cursor-pointer border border-white/20"
            >
              <FileSpreadsheet className="w-4 h-4 text-gold-400" />
              <span>Export CSV</span>
            </button>

            {/* Reset / Clean filters button if active */}
            {(selectedType !== 'all' || statusFilter !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedType('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono rounded-none cursor-pointer"
                title={lang === 'pt' ? 'Limpar todos os filtros' : 'Reset all filters'}
              >
                {lang === 'pt' ? 'Limpar Filtros' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* MANUAL REGISTRATION ACCORDION FORM */}
        {showManualForm && (
          <form
            onSubmit={handleManualSubmit}
            id="admin-manual-attendee-form"
            className="bg-corporate-950/90 border border-gold-600/30 rounded-none p-6 mb-8 space-y-4 max-w-3xl animate-fade-in"
          >
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold-400 flex items-center space-x-2 border-b border-white/10 pb-2">
              <UserPlus className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Credenciamento On-site Manual (Tete 2026)' : 'Onsite Manual Delegate Registration'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Nome Completo</label>
                <input
                  type="text"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  placeholder="e.g. Maria de Lurdes Chapo"
                  className="w-full bg-corporate-900 border border-white/15 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">E-mail Corporativo</label>
                <input
                  type="email"
                  value={mEmail}
                  onChange={(e) => setMEmail(e.target.value)}
                  placeholder="maria@empresa.co.mz"
                  className="w-full bg-corporate-900 border border-white/15 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Empresa / Instituição</label>
                <input
                  type="text"
                  value={mCompany}
                  onChange={(e) => setMCompany(e.target.value)}
                  placeholder="Mozambique Mining & Energy"
                  className="w-full bg-corporate-900 border border-white/15 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Cargo Executivo</label>
                <input
                  type="text"
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  placeholder="Director Executivo / Partner"
                  className="w-full bg-corporate-900 border border-white/15 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tipo de Participação</label>
                <select
                  value={mType}
                  onChange={(e) => setMType(e.target.value as any)}
                  className="w-full bg-corporate-900 text-white border border-white/15 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="delegate">Delegado Executivo</option>
                  <option value="investor">Investidor Internacional</option>
                  <option value="government">Membro do Governo</option>
                  <option value="speaker">Orador / Painelista</option>
                  <option value="sponsor">Patrocinador / Sponsor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">País de Origem</label>
                <input
                  type="text"
                  value={mCountry}
                  onChange={(e) => setMCountry(e.target.value)}
                  className="w-full bg-corporate-900 border border-white/15 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-none bg-gold-500 text-corporate-950 font-bold uppercase text-[10px] tracking-widest cursor-pointer hover:bg-gold-400 transition-colors"
              >
                Confirmar e Emitir Credencial
              </button>
            </div>
          </form>
        )}

        {/* REGISTRATION TABLE OUTPUT WITH INSTANT LOCALIZATION & DETAILS */}
        <div className="bg-corporate-950/50 rounded-none border border-white/10 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-gold-400">
                {t.adminTableTitle}
              </h3>
              <p className="text-[11px] text-gray-400 font-light mt-0.5">
                {lang === 'pt'
                  ? `Exibindo ${filteredList.length} de ${registrations.length} delegados (${filteredPresentCount} presentes, ${filteredPendingCount} a caminho)`
                  : `Showing ${filteredList.length} of ${registrations.length} delegates (${filteredPresentCount} present, ${filteredPendingCount} on the way)`}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-none font-mono font-bold">
                ✓ {filteredPresentCount} {lang === 'pt' ? 'Presentes' : 'Present'}
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-none font-mono font-bold">
                ⏳ {filteredPendingCount} {lang === 'pt' ? 'A Caminho' : 'Pending'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase font-mono tracking-wider text-gray-400 bg-black/30">
                  <th className="py-4 px-5">ID Credencial</th>
                  <th className="py-4 px-5">Participante / Cargo</th>
                  <th className="py-4 px-5">Empresa / Instituição</th>
                  <th className="py-4 px-5">País</th>
                  <th className="py-4 px-5">Categoria de Inscrição</th>
                  <th className="py-4 px-5">Setor de Interesse</th>
                  <th className="py-4 px-5 text-right">{lang === 'pt' ? 'Estado da Presença' : 'Attendance Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {filteredList.length > 0 ? (
                  filteredList.map((reg) => {
                    const isPresent = reg.isCheckedIn;
                    return (
                      <tr key={reg.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-4 px-5 font-mono text-gold-400 font-bold whitespace-nowrap">
                          {reg.id}
                        </td>
                        <td className="py-4 px-5">
                          <div className="font-bold text-white text-sm">{reg.fullName}</div>
                          <div className="text-[11px] text-gray-400 font-light mt-0.5">{reg.jobTitle}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">{reg.email}</div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="font-semibold text-gray-200">{reg.company}</div>
                        </td>
                        <td className="py-4 px-5 font-mono text-gray-400 whitespace-nowrap">
                          {reg.country}
                        </td>
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-none text-[9px] font-bold uppercase ${
                            reg.registrationType === 'delegate' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30' :
                            reg.registrationType === 'investor' ? 'bg-amber-600/10 text-amber-400 border border-amber-500/30' :
                            reg.registrationType === 'government' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/30' :
                            reg.registrationType === 'speaker' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/30' :
                            'bg-pink-600/10 text-pink-400 border border-pink-500/30'
                          }`}>
                            {reg.registrationType === 'delegate' ? (lang === 'pt' ? 'Delegado Executivo' : 'Executive Delegate') :
                             reg.registrationType === 'investor' ? (lang === 'pt' ? 'Investidor' : 'Investor') :
                             reg.registrationType === 'government' ? (lang === 'pt' ? 'Membro Governo' : 'Government') :
                             reg.registrationType === 'speaker' ? (lang === 'pt' ? 'Orador / Painelista' : 'Speaker') :
                             (lang === 'pt' ? 'Patrocinador' : 'Sponsor')}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-gray-400 font-light text-[11px]">
                          {reg.sectorOfInterest}
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-2">
                            {isPresent ? (
                              <div className="flex items-center space-x-2">
                                <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1">
                                  <span>✓ {lang === 'pt' ? 'PRESENTE' : 'PRESENT'}</span>
                                  {reg.checkedInAt && (
                                    <span className="text-emerald-300/70 font-mono text-[9px] ml-1">
                                      ({new Date(reg.checkedInAt).toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' })})
                                    </span>
                                  )}
                                </span>
                                <button
                                  onClick={() => handleToggleCheckIn(reg)}
                                  title={lang === 'pt' ? 'Desfazer check-in' : 'Undo check-in'}
                                  className="p-1 text-gray-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25">
                                  ⏳ {lang === 'pt' ? 'A CAMINHO' : 'ON THE WAY'}
                                </span>
                                <button
                                  onClick={() => handleToggleCheckIn(reg)}
                                  className="px-2.5 py-1 text-[10px] font-bold uppercase bg-gold-600/90 hover:bg-gold-500 text-corporate-950 font-mono font-bold transition-all rounded-none cursor-pointer flex items-center space-x-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>{lang === 'pt' ? 'Check-in' : 'Check-in'}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      {lang === 'pt' ? 'Nenhum participante encontrado com os filtros selecionados.' : 'No delegates match this log search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}

      </div>
    </section>
  );
}
