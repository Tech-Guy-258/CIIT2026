/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sectors from './components/Sectors';
import Speakers from './components/Speakers';
import Agenda from './components/Agenda';
import RegistrationForm from './components/RegistrationForm';
import TravelGuide from './components/TravelGuide';
import AdminDashboard from './components/AdminDashboard';
import InvestorChat from './components/InvestorChat';
import TeteProfile from './components/TeteProfile';
import BancoMocFinancialSuite from './components/BancoMocFinancialSuite';

import { INITIAL_REGISTRATIONS, TRANSLATIONS, SPONSORS } from './data';
import { Registration } from './types';
import { Mail, Phone, MapPin, ExternalLink, Calendar, ChevronRight, ArrowUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [registrations, setRegistrations] = useState<Registration[]>(INITIAL_REGISTRATIONS);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const t = TRANSLATIONS[lang];

  // Section Tracking via scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'tete-profile', 'sectors', 'speakers', 'agenda', 'registration', 'travel', 'admin'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for Registrations Database updates
  const handleRegisterSuccess = (newReg: Registration) => {
    setRegistrations((prev) => [newReg, ...prev]);
  };

  const handleAddManualAttendee = (manualAttendee: Registration) => {
    setRegistrations((prev) => [manualAttendee, ...prev]);
  };

  const handleClearRegistrations = () => {
    setRegistrations(INITIAL_REGISTRATIONS);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="root-layout" className="min-h-screen flex flex-col justify-between bg-neutral-50 text-neutral-900 overflow-x-hidden selection:bg-gold-500 selection:text-corporate-950">
      
      {/* FIXED STICKY HEADER (NAVBAR + BANCO DE MOÇAMBIQUE TICKER BAR) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-corporate-950 shadow-2xl border-b border-gold-500/20">
        <Navbar
          lang={lang}
          setLang={setLang}
          activeSection={activeSection}
          onRegisterClick={() => scrollToSection('registration')}
          onAdminToggle={() => {
            setShowAdmin(!showAdmin);
            setTimeout(() => {
              scrollToSection('admin');
            }, 100);
          }}
          showAdminLink={showAdmin}
        />

        {/* BANCO DE MOÇAMBIQUE EXCHANGE TICKER CAROUSEL */}
        <BancoMocFinancialSuite lang={lang} />
      </header>

      {/* Main Sections */}
      <main className="flex-grow pt-[115px] sm:pt-[120px]">
        
        {/* HERO SECTION */}
        <Hero
          lang={lang}
          onRegisterClick={() => scrollToSection('registration')}
          onExploreClick={() => scrollToSection('about')}
        />

        {/* ABOUT CONFERENCE SECTION */}
        <About lang={lang} />

        {/* TETE PROVINCE PROFILE & TOURIST ATTRACTIONS SECTION */}
        <TeteProfile lang={lang} />

        {/* THE 6 CS OF TETE SECTORS GRID */}
        <Sectors lang={lang} />

        {/* KEYNOTE SPEAKERS GRID PANEL */}
        <Speakers lang={lang} />

        {/* INTERACTIVE TIMETABLE AGENDA */}
        <Agenda lang={lang} />

        {/* CLIENT REGISTRATION FORM & PASS BADGE CARD GENERATOR */}
        <RegistrationForm
          lang={lang}
          onRegisterSuccess={handleRegisterSuccess}
        />

        {/* VISITORS TRAVEL GUIDE & HOTELS */}
        <TravelGuide lang={lang} />

        {/* INTERACTIVE INTEGRATED INVESTOR CHATBOT */}
        <InvestorChat lang={lang} />

        {/* ADMINISTRATION PORTAL LOGS TABLE */}
        {showAdmin && (
          <AdminDashboard
            lang={lang}
            registrations={registrations}
            onAddManualAttendee={handleAddManualAttendee}
            onClearRegistrations={handleClearRegistrations}
          />
        )}

      </main>

      {/* Sponsor / Partnership logos grid */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-8">
            {lang === 'pt' ? 'Parceiros Institucionais & Patrocinadores' : 'Institutional Partners & Sponsors'}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            {SPONSORS.platinum.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display font-black text-gray-500 text-sm tracking-tight">{item.name}</span>
                <span className="text-[8px] font-mono text-gold-600 font-bold uppercase mt-1">Platinum Partner</span>
              </div>
            ))}
            {SPONSORS.gold.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display font-bold text-gray-400 text-xs tracking-tight">{item.name}</span>
                <span className="text-[8px] font-mono text-gray-400 font-bold uppercase mt-1">Gold Partner</span>
              </div>
            ))}
            {SPONSORS.institutional.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display font-semibold text-gray-400 text-xs tracking-tight">{item.name}</span>
                <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase mt-1">Institutional</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-corporate-950 text-white pt-16 pb-12 border-t border-gold-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Info and Motto */}
            <div className="space-y-4 md:col-span-2">
              <span className="font-display font-black text-2xl tracking-wider text-white">
                CIIT<span className="text-gold-500">2026</span>
              </span>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {lang === 'pt'
                  ? 'A Conferência Internacional de Investimentos de Tete impulsiona o desenvolvimento de Moçambique promovendo conexões seguras de investimento privado.'
                  : 'The Tete International Investment Conference empowers Mozambican commerce by promoting elite foreign private venture connections.'}
              </p>
              <div className="pt-2 text-xs text-gold-400 font-semibold italic">
                "Tete, Terra dos 6C's e da Diversidade"
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-gold-400 uppercase">
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {t.navAbout}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('sectors')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {t.nav6cs}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('agenda')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {t.navAgenda}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('registration')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {t.navRegister}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-gold-400 uppercase">
                Contactos / Inquiries
              </h4>
              <ul className="space-y-3 text-xs text-gray-400">
                <li className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>Av. 25 de Setembro, Cidade de Tete, Moçambique</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <a href="mailto:info@ciit-tete.gov.mz" className="hover:text-white transition-colors">info@ciit-tete.gov.mz</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>+258 25 220 100</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Stamp and Copyright */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-mono">
            <div>
              <p>© 2026 {t.footerRights}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gold-500">República de Moçambique</span>
              <span className="w-1.5 h-1.5 rounded-none bg-emerald-500" />
              <span>Governo Provincial</span>
            </div>
          </div>

        </div>
      </footer>

      {/* VOLTAR AO INÍCIO (BACK TO TOP) FLOATING BUTTON */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-corporate-900/90 hover:bg-gold-500 text-gold-300 hover:text-corporate-950 border border-gold-500/50 hover:border-gold-400 shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 flex items-center justify-center rounded-full group cursor-pointer"
          title={lang === 'pt' ? 'Voltar ao Início' : 'Back to Top'}
          aria-label={lang === 'pt' ? 'Voltar ao Início' : 'Back to Top'}
        >
          <ArrowUp className="w-5 h-5 text-gold-400 group-hover:text-corporate-950 transition-transform group-hover:-translate-y-1" />
        </button>
      )}

    </div>
  );
}
