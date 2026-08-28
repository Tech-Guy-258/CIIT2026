/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Send, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  User, 
  MessageSquare,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { PROJECTS_PORTFOLIO_DATA } from '../teteInvestmentData';
import { InvestorInquiry, ProjectItem } from '../types';

interface InvestorAreaProps {
  lang: 'pt' | 'en';
  preSelectedProject?: ProjectItem | null;
}

export default function InvestorArea({ lang, preSelectedProject }: InvestorAreaProps) {
  const t = TRANSLATIONS[lang];

  const [formData, setFormData] = useState<InvestorInquiry>({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    sector: 'Energia',
    project: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  useEffect(() => {
    if (preSelectedProject) {
      setFormData(prev => ({
        ...prev,
        sector: preSelectedProject.sector,
        project: lang === 'pt' ? preSelectedProject.name : (preSelectedProject.nameEn || preSelectedProject.name)
      }));
    }
  }, [preSelectedProject, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    // Generate inquiry reference code
    const refCode = `TET-INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryCode(refCode);

    // Save to local storage for persistent administrative tracking
    try {
      const existing = JSON.parse(localStorage.getItem('ciit_investor_inquiries') || '[]');
      existing.unshift({
        ...formData,
        id: refCode,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('ciit_investor_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      company: '',
      country: '',
      email: '',
      phone: '',
      sector: 'Energia',
      project: '',
      message: ''
    });
  };

  return (
    <section id="area-investidor" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/40 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'pt' ? 'Canal Oficial do Investidor' : 'Official Investor Gateway'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase mb-4">
            {t.investorAreaTitle || (lang === 'pt' ? 'Encontre a sua oportunidade em Tete' : 'Find Your Opportunity in Tete')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            {t.investorAreaSubtitle || (lang === 'pt' 
              ? 'Explore os setores estratégicos, conheça os projetos disponíveis e descubra oportunidades para investir na Província de Tete.'
              : 'Explore strategic sectors, review available projects, and discover opportunities to invest in Tete Province.')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-800/90 border-2 border-amber-500/50 p-6 sm:p-10 shadow-2xl">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-slate-700 pb-4 mb-6">
                <h3 className="text-xl font-display font-bold text-white">
                  {lang === 'pt' ? 'Formulário de Manifestação de Interesse' : 'Expression of Interest Form'}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {lang === 'pt' 
                    ? 'Registe os seus dados corporativos para agendamento de reuniões B2B e atendimento pelo Governo Provincial.' 
                    : 'Submit your corporate credentials to schedule dedicated B2B meetings and government facilitation.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Nome */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    {lang === 'pt' ? 'Nome Completo *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'pt' ? 'Ex: Carlos Silva' : 'e.g. John Doe'}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* 2. Empresa */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    {lang === 'pt' ? 'Empresa / Organização *' : 'Company / Organization *'}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={lang === 'pt' ? 'Ex: Grupo Industrial Lusófono' : 'e.g. Global Energy Corp'}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* 3. País */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    {lang === 'pt' ? 'País de Origem *' : 'Country *'}
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder={lang === 'pt' ? 'Ex: Moçambique, África do Sul, Portugal...' : 'e.g. Mozambique, UAE, UK...'}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* 4. E-mail */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    {lang === 'pt' ? 'E-mail Corporativo *' : 'Corporate Email *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="investor@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* 5. Telefone */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    {lang === 'pt' ? 'Telefone / WhatsApp *' : 'Phone / WhatsApp *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+258 84 000 0000"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* 6. Setor de Interesse */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    {lang === 'pt' ? 'Setor de Interesse *' : 'Sector of Interest *'}
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="Energia">{lang === 'pt' ? 'Energia & Renováveis' : 'Energy & Renewables'}</option>
                      <option value="Mineração">{lang === 'pt' ? 'Indústria Extrativa & Mineração' : 'Extractive Industry & Mining'}</option>
                      <option value="Agricultura">{lang === 'pt' ? 'Agricultura & Agroprocessamento' : 'Agriculture & Agribusiness'}</option>
                      <option value="Pecuária">{lang === 'pt' ? 'Pecuária & Matadouros' : 'Livestock & Processing'}</option>
                      <option value="Pesca">{lang === 'pt' ? 'Pesca & Aquacultura' : 'Fisheries & Aquaculture'}</option>
                      <option value="Turismo">{lang === 'pt' ? 'Turismo & Hotelaria' : 'Tourism & Hospitality'}</option>
                      <option value="Logística">{lang === 'pt' ? 'Logística & Infraestrutura' : 'Logistics & Infrastructure'}</option>
                      <option value="Outro">{lang === 'pt' ? 'Outro Setor' : 'Other Sector'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 7. Projeto de Interesse */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  {lang === 'pt' ? 'Projeto Específico de Interesse (Opcional)' : 'Specific Project of Interest (Optional)'}
                </label>
                <select
                  value={formData.project || ''}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="">{lang === 'pt' ? '-- Selecionar projeto do portfólio --' : '-- Select project from portfolio --'}</option>
                  {PROJECTS_PORTFOLIO_DATA.map((p) => (
                    <option key={p.id} value={lang === 'pt' ? p.name : (p.nameEn || p.name)}>
                      {lang === 'pt' ? p.name : (p.nameEn || p.name)} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Mensagem */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  {lang === 'pt' ? 'Mensagem / Descrição do Interesse de Investimento' : 'Message / Investment Objective'}
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'pt' ? 'Descreva o volume de capital previsto, requisitos de localização ou dúvidas para o Governo Provincial...' : 'Describe anticipated capital allocation, location preferences, or specific inquiry...'}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs sm:text-sm tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <span>{t.investorFormSend || (lang === 'pt' ? 'Enviar manifestação de interesse' : 'Submit expression of interest')}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs font-mono text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{lang === 'pt' ? 'Gabinete de Apoio ao Investidor • Governo da Província de Tete' : 'Investor Support Office • Government of Tete Province'}</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {lang === 'pt' ? 'Manifestação de Interesse Registada' : 'Expression of Interest Registered'}
              </h3>
              <p className="text-xs font-mono text-amber-400 font-bold mb-4">
                {lang === 'pt' ? `Código de Referência: ${inquiryCode}` : `Reference Code: ${inquiryCode}`}
              </p>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
                {lang === 'pt'
                  ? `Obrigado, ${formData.name}. A equipa técnica do Governo da Província de Tete entrará em contacto através de ${formData.email} para fornecer os dossiês de investimento e agendar reuniões bilaterais.`
                  : `Thank you, ${formData.name}. The technical team of the Government of Tete Province will contact you at ${formData.email} with dedicated project dossiers.`}
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-mono uppercase tracking-wider text-slate-200 cursor-pointer"
              >
                {lang === 'pt' ? 'Submeter Nova Manifestação' : 'Submit Another Inquiry'}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
