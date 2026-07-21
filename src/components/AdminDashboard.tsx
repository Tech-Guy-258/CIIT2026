/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Registration } from '../types';
import { TRANSLATIONS } from '../data';
import { Lock, FileSpreadsheet, Search, RefreshCw, Trash2, ShieldCheck, UserPlus, TrendingUp, Briefcase, Globe, Mail, Filter, LogOut } from 'lucide-react';

interface AdminDashboardProps {
  lang: 'pt' | 'en';
  registrations: Registration[];
  onAddManualAttendee: (attendee: Registration) => void;
  onClearRegistrations: () => void;
}

export default function AdminDashboard({
  lang,
  registrations,
  onAddManualAttendee,
  onClearRegistrations
}: AdminDashboardProps) {
  const t = TRANSLATIONS[lang];

  // Auth state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Manual attendee form state
  const [showManualForm, setShowManualForm] = useState(false);
  const [mName, setMName] = useState('');
  const [mEmail, setMEmail] = useState('');
  const [mCompany, setMCompany] = useState('');
  const [mTitle, setMTitle] = useState('');
  const [mCountry, setMCountry] = useState('Moçambique');
  const [mSector, setMSector] = useState('Cahora Bassa (Energia)');
  const [mType, setMType] = useState<'delegate' | 'investor' | 'speaker' | 'sponsor' | 'government'>('delegate');

  const CORRECT_PASSCODE = 'CIIT2026-ADMIN';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (passcode === CORRECT_PASSCODE || passcode === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setAuthError(lang === 'pt' ? 'Palavra-passe incorreta.' : 'Incorrect passcode.');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim() || !mEmail.trim() || !mCompany.trim()) return;

    const manualReg: Registration = {
      id: `CIIT-MAN-${Math.floor(2000 + Math.random() * 8000)}`,
      fullName: mName,
      email: mEmail,
      phone: '+258 00 000 0000',
      company: mCompany,
      jobTitle: mTitle,
      country: mCountry,
      sectorOfInterest: mSector,
      registrationType: mType,
      registeredAt: new Date().toISOString(),
      ticketStatus: 'Confirmed'
    };

    onAddManualAttendee(manualReg);
    setShowManualForm(false);
    
    // Reset form
    setMName('');
    setMEmail('');
    setMCompany('');
    setMTitle('');
    setMCountry('Moçambique');
  };

  // CSV Exporter logic
  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    // Build CSV content
    const headers = 'ID,Full Name,Email,Company,Title,Country,Sector,Type,Registered At,Status\n';
    const rows = registrations.map((reg) => {
      return `"${reg.id}","${reg.fullName}","${reg.email}","${reg.company}","${reg.jobTitle}","${reg.country}","${reg.sectorOfInterest}","${reg.registrationType}","${reg.registeredAt}","${reg.ticketStatus}"`;
    }).join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
    
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `CIIT2026_Delegates_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics counting
  const totalCount = registrations.length;
  const investorsCount = registrations.filter(r => r.registrationType === 'investor').length;
  const govCount = registrations.filter(r => r.registrationType === 'government').length;
  const delegatesCount = registrations.filter(r => r.registrationType === 'delegate').length;
  const speakersCount = registrations.filter(r => r.registrationType === 'speaker').length;
  const sponsorCount = registrations.filter(r => r.registrationType === 'sponsor').length;

  // Filter lists
  const filteredList = registrations.filter((reg) => {
    // type filter
    if (selectedType !== 'all' && reg.registrationType !== selectedType) return false;

    // query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatches = reg.fullName.toLowerCase().includes(q);
      const companyMatches = reg.company.toLowerCase().includes(q);
      const emailMatches = reg.email.toLowerCase().includes(q);
      return nameMatches || companyMatches || emailMatches;
    }

    return true;
  });

  if (!isAuthenticated) {
    return (
      <section id="admin" className="py-24 bg-neutral-900 text-white border-b border-gray-800 flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-corporate-950 border border-gold-600/30 p-8 rounded-none shadow-2xl max-w-md w-full text-center relative overflow-hidden">
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
              Passcode: <span className="font-mono text-gray-400">CIIT2026-ADMIN</span> or <span className="font-mono text-gray-400">admin123</span>
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
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <span className="text-xs font-mono text-gold-400 font-bold tracking-widest uppercase">Console Administrativo</span>
            </div>
            <h2 className="text-3xl font-display font-light text-white uppercase tracking-wider mt-1">
              {lang === 'pt' ? 'Sistema de Credenciamento CIIT' : 'CIIT Accreditation Management'}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="admin-logout-btn"
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'pt' ? 'Sair' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* STATS COUNT GRID CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          {/* Total */}
          <div className="bg-corporate-950/60 p-5 rounded-none border border-white/5">
            <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase block">{lang === 'pt' ? 'Total Geral' : 'Total Delegates'}</span>
            <span className="text-3xl font-display font-black text-white block mt-1">{totalCount}</span>
          </div>
          {/* Investors */}
          <div className="bg-corporate-950/60 p-5 rounded-none border border-amber-500/20">
            <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase block">Investors</span>
            <span className="text-3xl font-display font-black text-amber-400 block mt-1">{investorsCount}</span>
          </div>
          {/* Gov */}
          <div className="bg-corporate-950/60 p-5 rounded-none border border-indigo-500/20">
            <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase block">Government</span>
            <span className="text-3xl font-display font-black text-indigo-400 block mt-1">{govCount}</span>
          </div>
          {/* Delegates */}
          <div className="bg-corporate-950/60 p-5 rounded-none border border-blue-500/20">
            <span className="text-[9px] font-mono tracking-widest text-blue-400 uppercase block">Delegates</span>
            <span className="text-3xl font-display font-black text-blue-400 block mt-1">{delegatesCount}</span>
          </div>
          {/* Speakers */}
          <div className="bg-corporate-950/60 p-5 rounded-none border border-emerald-500/20">
            <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase block">Speakers</span>
            <span className="text-3xl font-display font-black text-emerald-400 block mt-1">{speakersCount}</span>
          </div>
          {/* Sponsors */}
          <div className="bg-corporate-950/60 p-5 rounded-none border border-purple-500/20">
            <span className="text-[9px] font-mono tracking-widest text-purple-400 uppercase block">Sponsors</span>
            <span className="text-3xl font-display font-black text-purple-400 block mt-1">{sponsorCount}</span>
          </div>
        </div>

        {/* SEARCH, FILTER & ACTION BUTTONS */}
        <div className="bg-corporate-950/40 p-6 rounded-none border border-white/5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="text"
                id="admin-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'pt' ? 'Filtrar por nome/empresa...' : 'Filter name/firm...'}
                className="w-full pl-10 pr-4 py-2 bg-corporate-900 border border-white/10 rounded-none text-xs placeholder-gray-500 text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Type selector */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <select
                id="admin-type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-corporate-900 text-white border border-white/10 rounded-none px-2.5 py-1.5 text-xs focus:outline-none focus:border-gold-500 cursor-pointer w-full sm:w-auto"
              >
                <option value="all">{lang === 'pt' ? 'Todos Perfis' : 'All Profiles'}</option>
                <option value="delegate">{lang === 'pt' ? 'Delegado' : 'Delegate'}</option>
                <option value="investor">{lang === 'pt' ? 'Investidor' : 'Investor'}</option>
                <option value="speaker">{lang === 'pt' ? 'Orador' : 'Speaker'}</option>
                <option value="sponsor">{lang === 'pt' ? 'Sponsor' : 'Sponsor'}</option>
                <option value="government">{lang === 'pt' ? 'Governo' : 'Government'}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-end w-full md:w-auto">
            {/* Button manual entry toggle */}
            <button
              id="admin-manual-entry-toggle"
              onClick={() => setShowManualForm(!showManualForm)}
              className="px-4 py-2 rounded-none bg-white/5 border border-white/15 hover:bg-white/10 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-gold-400" />
              <span>{showManualForm ? (lang === 'pt' ? 'Fechar Registo' : 'Close Registry') : t.adminAddManual}</span>
            </button>

            {/* Export CSV Button */}
            <button
              id="admin-export-csv-btn"
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 font-bold uppercase text-xs tracking-widest flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel (CSV)</span>
            </button>

            {/* Reset mock database */}
            <button
              id="admin-clear-registrations-btn"
              onClick={() => {
                if (window.confirm(lang === 'pt' ? 'Tem a certeza que quer redefinir a lista de inscrições para o padrão?' : 'Are you sure you want to restore standard registrations?')) {
                  onClearRegistrations();
                }
              }}
              title={lang === 'pt' ? 'Redefinir banco de dados local' : 'Restore local simulation records'}
              className="p-2 rounded-none bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/20 text-rose-400 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MANUAL REGISTRATION ACCORDION FORM */}
        {showManualForm && (
          <form
            onSubmit={handleManualSubmit}
            id="admin-manual-attendee-form"
            className="bg-corporate-950/80 border border-gold-600/20 rounded-none p-6 mb-8 space-y-4 max-w-2xl animate-fade-in"
          >
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold-400 flex items-center space-x-2 border-b border-white/5 pb-2">
              <UserPlus className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Novo Cadastro Executivo (Onsite Tete)' : 'Onsite Manual Registration'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
                <input
                  type="text"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  placeholder="e.g. Maria de Lurdes"
                  className="w-full bg-corporate-900 border border-white/10 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email</label>
                <input
                  type="email"
                  value={mEmail}
                  onChange={(e) => setMEmail(e.target.value)}
                  placeholder="maria@empresa.com"
                  className="w-full bg-corporate-900 border border-white/10 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Company</label>
                <input
                  type="text"
                  value={mCompany}
                  onChange={(e) => setMCompany(e.target.value)}
                  placeholder="Mozambique Logistics Ltd"
                  className="w-full bg-corporate-900 border border-white/10 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Job Title</label>
                <input
                  type="text"
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  placeholder="Investment Partner"
                  className="w-full bg-corporate-900 border border-white/10 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Profile Type</label>
                <select
                  value={mType}
                  onChange={(e) => setMType(e.target.value as any)}
                  className="w-full bg-corporate-900 text-white border border-white/10 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="delegate">Executive Delegate</option>
                  <option value="investor">International Investor</option>
                  <option value="speaker">Invited Speaker</option>
                  <option value="sponsor">Sponsor / Exhibitor</option>
                  <option value="government">Government Official</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Country</label>
                <input
                  type="text"
                  value={mCountry}
                  onChange={(e) => setMCountry(e.target.value)}
                  className="w-full bg-corporate-900 border border-white/10 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-none bg-gold-500 text-corporate-950 font-bold uppercase text-[10px] tracking-widest cursor-pointer hover:bg-gold-400 transition-colors"
            >
              Adicionar Delegado / Add Attendee
            </button>
          </form>
        )}

        {/* REGISTRATION TABLE OUTPUT */}
        <div className="bg-corporate-950/40 rounded-none border border-white/5 overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-gold-400">
              {t.adminTableTitle}
            </h3>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-none text-gray-300 font-mono">
              {filteredList.length} {lang === 'pt' ? 'Resultados' : 'Records'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-mono tracking-wider text-gray-400 bg-black/20">
                  <th className="py-4 px-6">ID Pass</th>
                  <th className="py-4 px-6">Delegado / Delegate</th>
                  <th className="py-4 px-6">Empresa / Organization</th>
                  <th className="py-4 px-6">País / Origin</th>
                  <th className="py-4 px-6">Setor / Industry</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {filteredList.length > 0 ? (
                  filteredList.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-mono text-gold-400 font-bold">{reg.id}</td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{reg.fullName}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{reg.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold">{reg.company}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{reg.jobTitle}</div>
                      </td>
                      <td className="py-4 px-6 font-mono text-gray-400">{reg.country}</td>
                      <td className="py-4 px-6 font-light">{reg.sectorOfInterest}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-0.5 rounded-none text-[9px] font-bold uppercase ${
                          reg.registrationType === 'delegate' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' :
                          reg.registrationType === 'investor' ? 'bg-amber-600/10 text-amber-400 border border-amber-500/20' :
                          reg.registrationType === 'speaker' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' :
                          reg.registrationType === 'sponsor' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' :
                          'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {reg.registrationType}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      {lang === 'pt' ? 'Nenhuma credencial cadastrada na consulta.' : 'No delegates match this log search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
