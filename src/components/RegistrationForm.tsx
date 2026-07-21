/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { TRANSLATIONS } from '../data';
import { Registration } from '../types';
import { Check, Download, AlertCircle, FileText, User, Mail, Phone, Globe, Briefcase, ChevronRight, RefreshCw, Printer } from 'lucide-react';

interface RegistrationFormProps {
  lang: 'pt' | 'en';
  onRegisterSuccess: (registration: Registration) => void;
}

export default function RegistrationForm({ lang, onRegisterSuccess }: RegistrationFormProps) {
  const t = TRANSLATIONS[lang];
  const formRef = useRef<HTMLDivElement>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('Moçambique');
  const [sectorOfInterest, setSectorOfInterest] = useState('Cahora Bassa (Energia)');
  const [registrationType, setRegistrationType] = useState<'delegate' | 'investor' | 'speaker' | 'sponsor' | 'government'>('delegate');

  // Error & Status states
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPass, setGeneratedPass] = useState<Registration | null>(null);

  // Sector list based on Tete characteristics
  const sectors = lang === 'pt' ? [
    'Energia & Recursos Hídricos (Cahora Bassa)',
    'Mineração & Recursos Minerais (Carvão/Metais)',
    'Pecuária de Excelência (Cabrito de Tete)',
    'Agronegócio & Citrinos',
    'Indústria Civil & Cimento',
    'Infraestruturas & Diversificação de Negócios'
  ] : [
    'Energy & Water Resources (Cahora Bassa)',
    'Mining & Mineral Resources (Coal/Metals)',
    'Elite Livestock (Tete Goat)',
    'Agribusiness & Citrus',
    'Civil Construction & Cement',
    'Infrastructures & Business Diversification'
  ];

  const participantTypes = [
    { id: 'delegate', label: lang === 'pt' ? 'Delegado Executivo' : 'Executive Delegate', color: 'bg-blue-600' },
    { id: 'investor', label: lang === 'pt' ? 'Investidor Internacional' : 'International Investor', color: 'bg-amber-600' },
    { id: 'speaker', label: lang === 'pt' ? 'Orador Convidado' : 'Invited Speaker', color: 'bg-emerald-600' },
    { id: 'sponsor', label: lang === 'pt' ? 'Patrocinador / Expositor' : 'Sponsor / Exhibitor', color: 'bg-purple-600' },
    { id: 'government', label: lang === 'pt' ? 'Entidade Governamental' : 'Government Official', color: 'bg-indigo-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!fullName.trim() || !email.trim() || !phone.trim() || !company.trim() || !jobTitle.trim()) {
      setErrorMsg(lang === 'pt' ? 'Por favor, preencha todos os campos obrigatórios.' : 'Please fill out all required fields.');
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg(lang === 'pt' ? 'Endereço de e-mail inválido.' : 'Invalid corporate email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate elite processing
    setTimeout(() => {
      const ticketId = `CIIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRegistration: Registration = {
        id: ticketId,
        fullName,
        email,
        phone,
        company,
        jobTitle,
        country,
        sectorOfInterest,
        registrationType,
        registeredAt: new Date().toISOString(),
        ticketStatus: 'Confirmed'
      };

      setGeneratedPass(newRegistration);
      onRegisterSuccess(newRegistration);
      setIsSubmitting(false);

      // Scroll to ticket badge
      setTimeout(() => {
        const ticketElement = document.getElementById('ticket-badge-display');
        if (ticketElement) {
          ticketElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }, 1200);
  };

  const handlePrintBadge = () => {
    window.print();
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setJobTitle('');
    setCountry('Moçambique');
    setSectorOfInterest('Cahora Bassa (Energia)');
    setRegistrationType('delegate');
    setGeneratedPass(null);
  };

  return (
    <section id="registration" className="py-24 bg-neutral-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/5 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Credenciamento Oficial' : 'Event Accreditation'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.registerTitle}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            {t.registerSubtitle}
          </p>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left panel: Info & instructions */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-corporate-950 text-white rounded-none p-8 border border-gold-600/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-600/10 rounded-none blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider">
                {lang === 'pt' ? 'Acesso Executivo Premium' : 'Premium Executive Pass'}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light mb-6">
                {lang === 'pt' 
                  ? 'O credenciamento na CIIT2026 garante acesso integral a todas as conferências plenárias, painéis sectoriais, salas de networking B2B, buffet executivo e certificado de participação validado pelo Governo de Tete.'
                  : 'CIIT2026 accreditation grants comprehensive access to all plenaries, workshops, B2B matchmaking lounges, executive luncheons, and a certified credentials bundle backed by Tete Government.'}
              </p>

              {/* Steps or details checklist */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="p-1 rounded-none bg-gold-500 text-corporate-950 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-gold-400 uppercase tracking-widest text-[9px] font-mono">Passo 1 / Step 1</span>
                    <span className="text-gray-200 block mt-0.5">{lang === 'pt' ? 'Preencha o formulário com dados corporativos válidos.' : 'Complete the registration form with valid business logs.'}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <div className="p-1 rounded-none bg-gold-500 text-corporate-950 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-gold-400 uppercase tracking-widest text-[9px] font-mono">Passo 2 / Step 2</span>
                    <span className="text-gray-200 block mt-0.5">{lang === 'pt' ? 'Escolha o seu perfil de delegado adequado.' : 'Select your relevant delegate classification.'}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <div className="p-1 rounded-none bg-gold-500 text-corporate-950 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-gold-400 uppercase tracking-widest text-[9px] font-mono">Passo 3 / Step 3</span>
                    <span className="text-gray-200 block mt-0.5">{lang === 'pt' ? 'Gere e descarregue a sua Credencial de Acesso Virtual (Pass).' : 'Generate and download your Virtual Event Access Badge (Pass).'}</span>
                  </div>
                </div>
              </div>

              {/* Institutional notice */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <p className="text-[10px] text-gray-400 leading-normal">
                  {lang === 'pt' 
                    ? 'Nota: Não existem taxas de inscrição para delegados corporativos pré-aprovados ou investidores estrangeiros. O acesso é restrito e sujeito a confirmação.'
                    : 'Note: There are no participation fees for pre-approved corporate delegates or foreign investors. Seats are limited.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right panel: Form / Badge Output */}
          <div className="lg:col-span-7">
            
            {/* If badge is NOT generated, show Form */}
            {!generatedPass ? (
              <form
                onSubmit={handleSubmit}
                id="conference-registration-form"
                className="bg-white rounded-none p-8 md:p-10 border border-slate-200 shadow-md space-y-6"
              >
                {/* Form Title */}
                <h3 className="text-xl font-display font-bold text-corporate-950 uppercase tracking-wide border-b border-slate-100 pb-4">
                  {lang === 'pt' ? 'Formulário de Inscrição' : 'Registration Application'}
                </h3>

                {/* Error message box */}
                {errorMsg && (
                  <div className="flex items-center space-x-2 text-rose-700 bg-rose-50 border border-rose-100 p-4 rounded-none text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="fullName" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formName} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <User className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Adriano Moises"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none border border-slate-200 focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Corporate Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formEmail} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@empresa.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none border border-slate-200 focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formPhone} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+258 84 123 4567"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none border border-slate-200 focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formCompany} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="SADC Ventures Ltd"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none border border-slate-200 focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label htmlFor="jobTitle" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formTitle} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        id="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Chief Financial Officer"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none border border-slate-200 focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Country of Origin */}
                  <div className="space-y-1.5">
                    <label htmlFor="country" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formCountry}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <Globe className="w-4 h-4 text-gray-400" />
                      </span>
                      <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="e.g. Moçambique / South Africa"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none border border-slate-200 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Sector of interest */}
                  <div className="space-y-1.5">
                    <label htmlFor="sector" className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formSector}
                    </label>
                    <select
                      id="sector"
                      value={sectorOfInterest}
                      onChange={(e) => setSectorOfInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-none border border-slate-200 bg-white focus:outline-none focus:border-gold-500 cursor-pointer"
                    >
                      {sectors.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Participant Type */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                      {t.formType} *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1.5">
                      {participantTypes.map((type) => (
                        <label
                          key={type.id}
                          id={`type-label-${type.id}`}
                          className={`flex items-center space-x-3 p-4 rounded-none border cursor-pointer transition-all ${
                            registrationType === type.id
                              ? 'bg-corporate-950 border-gold-500 text-white shadow-sm'
                              : 'bg-neutral-50 border-slate-200 text-gray-700 hover:bg-neutral-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="registrationType"
                            id={`radio-${type.id}`}
                            value={type.id}
                            checked={registrationType === type.id}
                            onChange={() => setRegistrationType(type.id as any)}
                            className="text-gold-500 focus:ring-gold-500 h-4 w-4"
                          />
                          <div>
                            <span className="text-xs font-bold block">{type.label}</span>
                            <span className={`inline-block w-2.5 h-2.5 rounded-none ${type.color} mt-1`} />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Form submit CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    id="submit-registration-btn"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-none bg-corporate-950 hover:bg-corporate-900 text-white font-bold uppercase text-xs tracking-widest border border-gold-600/20 hover:border-gold-500 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-gold-500" />
                        <span>{lang === 'pt' ? 'Processando credencial...' : 'Processing credential...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.formSubmit}</span>
                        <ChevronRight className="w-4 h-4 text-gold-400" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* IF BADGE GENERATED, DISPLAY BADGE PREVIEW */
              <div id="ticket-badge-display" className="space-y-6">
                
                {/* Status Notice Success */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-none p-6 flex items-start space-x-4">
                  <div className="p-2 rounded-none bg-emerald-500 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-emerald-950 uppercase tracking-tight">
                      {t.badgeTitle}
                    </h4>
                    <p className="text-xs text-emerald-800 leading-relaxed mt-1 font-light">
                      {t.badgeSubtitle}
                    </p>
                  </div>
                </div>

                {/* VIRTUAL ACCESS PASS BADGE CARD DESIGN */}
                <div
                  id="print-section-badge"
                  className="bg-white rounded-none border border-slate-200 shadow-xl overflow-hidden max-w-md mx-auto print:border-none print:shadow-none"
                >
                  {/* Top Bar (Coat of Arms label) */}
                  <div className="bg-corporate-950 text-white text-center py-4 px-6 border-b border-gold-500/30">
                    <p className="text-[9px] font-mono tracking-widest text-gray-300 block uppercase">
                      REPÚBLICA DE MOÇAMBIQUE • GOVERNO DE TETE
                    </p>
                    <p className="text-sm font-display font-black tracking-widest text-gold-400 uppercase mt-1">
                      CIIT <span className="text-white">2026</span>
                    </p>
                  </div>

                  {/* Main badge content */}
                  <div className="p-8 text-center space-y-6 relative">
                    {/* Watermark Logo block */}
                    <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center select-none pointer-events-none">
                      <span className="text-9xl font-display font-black">TETE</span>
                    </div>

                    <div className="space-y-1 relative z-10">
                      <span className={`inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-none text-white ${
                        generatedPass.registrationType === 'delegate' ? 'bg-blue-600' :
                        generatedPass.registrationType === 'investor' ? 'bg-amber-600' :
                        generatedPass.registrationType === 'speaker' ? 'bg-emerald-600' :
                        generatedPass.registrationType === 'sponsor' ? 'bg-purple-600' :
                        'bg-indigo-600'
                      }`}>
                        {participantTypes.find(t => t.id === generatedPass.registrationType)?.label || 'Delegado'}
                      </span>
                      <p className="text-[10px] font-mono text-gold-700 tracking-widest block uppercase pt-2">
                        {t.badgeRegistered}
                      </p>
                    </div>

                    {/* Participant Name */}
                    <div className="relative z-10">
                      <h4 className="text-2xl font-display font-extrabold text-corporate-950 tracking-tight leading-tight">
                        {generatedPass.fullName}
                      </h4>
                      <p className="text-xs font-mono font-semibold text-gray-400 uppercase mt-1 tracking-wider">
                        {generatedPass.jobTitle}
                      </p>
                      <p className="text-xs font-semibold text-gray-700 uppercase mt-0.5">
                        {generatedPass.company}
                      </p>
                    </div>

                    {/* Country */}
                    <div className="border-t border-b border-slate-100 py-3 relative z-10 flex items-center justify-around text-xs font-semibold text-gray-500">
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 block uppercase">Origem / Origin</span>
                        <span className="text-corporate-950 font-bold mt-0.5 block">{generatedPass.country}</span>
                      </div>
                      <div className="w-px h-6 bg-slate-100" />
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 block uppercase">Setor / Interest</span>
                        <span className="text-corporate-950 font-bold mt-0.5 block line-clamp-1 max-w-[150px]" title={generatedPass.sectorOfInterest}>{generatedPass.sectorOfInterest}</span>
                      </div>
                    </div>

                    {/* Simulated High-Fidelity QR Code */}
                    <div className="flex flex-col items-center space-y-2 py-2 relative z-10">
                      <div className="bg-neutral-50 p-4 border border-slate-200 rounded-none shadow-inner">
                        {/* Elegant custom Vector QR grid representation */}
                        <svg width="100" height="100" viewBox="0 0 100 100" className="text-corporate-950 fill-current">
                          {/* Corner Squares */}
                          <rect x="0" y="0" width="30" height="30" rx="0" />
                          <rect x="5" y="5" width="20" height="20" fill="white" rx="0" />
                          <rect x="10" y="10" width="10" height="10" rx="0" />

                          <rect x="70" y="0" width="30" height="30" rx="0" />
                          <rect x="75" y="5" width="20" height="20" fill="white" rx="0" />
                          <rect x="80" y="10" width="10" height="10" rx="0" />

                          <rect x="0" y="70" width="30" height="30" rx="0" />
                          <rect x="5" y="75" width="20" height="20" fill="white" rx="0" />
                          <rect x="10" y="80" width="10" height="10" rx="0" />

                          {/* Dummy bits */}
                          <rect x="40" y="5" width="10" height="5" />
                          <rect x="40" y="15" width="15" height="10" />
                          <rect x="40" y="30" width="5" height="10" />
                          <rect x="50" y="30" width="10" height="5" />
                          
                          <rect x="15" y="40" width="15" height="5" />
                          <rect x="5" y="50" width="10" height="10" />
                          <rect x="20" y="55" width="10" height="5" />

                          <rect x="70" y="40" width="25" height="5" />
                          <rect x="80" y="50" width="10" height="15" />
                          <rect x="70" y="60" width="5" height="5" />

                          <rect x="40" y="50" width="15" height="15" />
                          <rect x="40" y="75" width="15" height="5" />
                          <rect x="45" y="85" width="5" height="10" />
                          <rect x="55" y="80" width="10" height="15" />
                          
                          <rect x="70" y="75" width="20" height="5" />
                          <rect x="80" y="85" width="15" height="10" />
                          <rect x="70" y="90" width="5" height="5" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest font-black text-corporate-950">
                        {generatedPass.id}
                      </span>
                    </div>

                    {/* Footer text */}
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">
                      8, 9 e 10 Outubro • Cidade de Tete
                    </p>
                  </div>
                </div>

                {/* Printable Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <button
                    id="print-badge-btn"
                    onClick={handlePrintBadge}
                    className="w-full sm:w-auto px-6 py-3 rounded-none bg-corporate-950 text-white hover:bg-corporate-900 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-gold-400" />
                    <span>{t.badgeDownload}</span>
                  </button>

                  <button
                    id="register-another-btn"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-none bg-white border border-slate-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{lang === 'pt' ? 'Nova Inscrição' : 'New Registration'}</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
