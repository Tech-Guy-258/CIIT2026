/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutTete from './components/AboutTete';
import WhereToInvest from './components/WhereToInvest';
import MineralPotential from './components/MineralPotential';
import FisheriesAquaculture from './components/FisheriesAquaculture';
import OtherPotentials from './components/OtherPotentials';
import EnergyPotential from './components/EnergyPotential';
import ProjectsPortfolio from './components/ProjectsPortfolio';
import InvestorArea from './components/InvestorArea';
import About from './components/About';
import Sectors from './components/Sectors';
import Speakers from './components/Speakers';
import Agenda from './components/Agenda';
import RegistrationForm from './components/RegistrationForm';
import TravelGuide from './components/TravelGuide';
import Partners from './components/Partners';
import { Gallery } from './components/Gallery';
import LiveAttendance from './components/LiveAttendance';
import QrCodeScannerModal from './components/QrCodeScannerModal';
import AdminDashboard from './components/AdminDashboard';
import InvestorChat from './components/InvestorChat';
import TeteProfile from './components/TeteProfile';
import BancoMocFinancialSuite from './components/BancoMocFinancialSuite';
import FloatingLanguageToggle from './components/FloatingLanguageToggle';
import AccessGate from './components/AccessGate';
import AccessStatusBanner from './components/AccessStatusBanner';

import { INITIAL_REGISTRATIONS, TRANSLATIONS, SPONSORS } from './data';
import { Registration, ProjectItem, AccessCodeRecord } from './types';
import { realtimeAttendance } from './services/realtimeAttendance';
import { Mail, Phone, MapPin, ExternalLink, Calendar, ChevronRight, ArrowUp } from 'lucide-react';
import ciitLogoImg from './assets/images/ciit_2026_logo_1787657793393.png';

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [registrations, setRegistrations] = useState<Registration[]>(() => realtimeAttendance.getRegistrations());
  const [showAdmin, setShowAdmin] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedInquiryProject, setSelectedInquiryProject] = useState<ProjectItem | null>(null);

  // Access Control State
  const [activeCodeRecord, setActiveCodeRecord] = useState<AccessCodeRecord | null>(null);
  const [accessRemainingMs, setAccessRemainingMs] = useState<number>(0);

  const t = TRANSLATIONS[lang];

  // Subscribe to real-time attendance singleton
  useEffect(() => {
    const unsubscribe = realtimeAttendance.subscribe((state) => {
      setRegistrations(state.registrations);
    });
    return () => unsubscribe();
  }, []);

  // Force page to start at top header on mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Section Tracking via scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 
        'sobre-tete', 
        'porque-investir', 
        'onde-investir', 
        'potencial-mineral', 
        'pesca-aquacultura', 
        'outros-potenciais', 
        'potencial-energetico', 
        'portfolio-projetos', 
        'area-investidor',
        'about', 
        'tete-profile', 
        'sectors', 
        'speakers', 
        'agenda', 
        'gallery', 
        'attendance', 
        'registration', 
        'travel', 
        'admin'
      ];
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
    realtimeAttendance.addRegistration(newReg);
  };

  const handleAddManualAttendee = (manualAttendee: Registration) => {
    realtimeAttendance.addRegistration(manualAttendee);
  };

  const handleClearRegistrations = () => {
    realtimeAttendance.clearDemoData();
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

  const handleSelectProjectForInquiry = (project: ProjectItem) => {
    setSelectedInquiryProject(project);
    scrollToSection('area-investidor');
  };

  return (
    <AccessGate
      lang={lang}
      onAccessStateChange={(record, remaining) => {
        setActiveCodeRecord(record);
        setAccessRemainingMs(remaining);
      }}
    >
      {({ exitSession }) => (
        <div id="root-layout" className="min-h-screen flex flex-col justify-between bg-neutral-50 text-neutral-900 overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
          
          {/* FIXED STICKY HEADER (NAVBAR + BANCO DE MOÇAMBIQUE TICKER BAR + ACCESS STATUS BANNER) */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950 shadow-2xl border-b border-amber-500/20">
            <Navbar
              lang={lang}
              activeSection={activeSection}
              onRegisterClick={() => scrollToSection('registration')}
            />

            {/* BANCO DE MOÇAMBIQUE EXCHANGE TICKER CAROUSEL */}
            <BancoMocFinancialSuite 
              lang={lang} 
              isAdminUser={activeCodeRecord?.code === 'ADMIN-DIVA' || activeCodeRecord?.isUnlimited === true}
              onAdminToggle={(activeCodeRecord?.code === 'ADMIN-DIVA' || activeCodeRecord?.isUnlimited === true) ? () => {
                setShowAdmin(!showAdmin);
                setTimeout(() => {
                  scrollToSection('admin');
                }, 100);
              } : undefined}
              showAdmin={showAdmin}
            />

            {/* 24-HOUR ACCESS VALIDITY STATUS BANNER */}
            <AccessStatusBanner
              lang={lang}
              codeRecord={activeCodeRecord}
              remainingMs={accessRemainingMs}
              onExitSession={exitSession}
            />
          </header>

      {/* Main Content Sections */}
      <main className="flex-grow pt-[102px] sm:pt-[114px] md:pt-[122px] lg:pt-[128px]">
        
        {/* 1. HERO SECTION (High Impact with new Headline & Subheadline) */}
        <Hero
          lang={lang}
          onRegisterClick={() => scrollToSection('registration')}
          onExploreClick={() => scrollToSection('onde-investir')}
          onPortfolioClick={() => scrollToSection('portfolio-projetos')}
        />

        {/* 2. SOBRE TETE & PORQUÊ INVESTIR (15 Distritos, 5 Municípios, 1.400km Fronteiras, 6 Diferenciais) */}
        <AboutTete 
          lang={lang}
          onExplorePortfolio={() => scrollToSection('portfolio-projetos')}
          onInquireInterest={(subject) => {
            scrollToSection('area-investidor');
          }}
        />

        {/* 3. ONDE INVESTIR (Energia, Indústria Extrativa, Agricultura) */}
        <WhereToInvest 
          lang={lang}
        />

        {/* 4. POTENCIAL MINERAL POR DISTRITO (15 Distritos com todos os minérios mapeados) */}
        <MineralPotential 
          lang={lang}
        />

        {/* 5. PESCA E AQUACULTURA (Espécies exatas, 4.000 ton, 2.700 ton, 12M alevinos, 6.000 ton Kapenta) */}
        <FisheriesAquaculture 
          lang={lang}
        />

        {/* 6. OUTROS POTENCIAIS (Pecuária 5,29M com Cabrito IG, Agricultura 10M acres, Florestas, Turismo, Logística) */}
        <OtherPotentials 
          lang={lang}
        />

        {/* 7. POTENCIAL ENERGÉTICO (HCB 2.925 MW, Mphanda Nkuwa 1.500 MW, Boroma 200 MW, Lupata 600 MW) */}
        <EnergyPotential 
          lang={lang}
          onViewProjectsClick={() => scrollToSection('portfolio-projetos')}
        />

        {/* 8. PORTFÓLIO DE PROJETOS DE INVESTIMENTO (8 Projetos Estratégicos com filtros) */}
        <ProjectsPortfolio 
          lang={lang}
          onSelectProjectForInquiry={handleSelectProjectForInquiry}
        />

        {/* 9. ÁREA DO INVESTIDOR: ENCONTRE A SUA OPORTUNIDADE EM TETE (Formulário Completo) */}
        <InvestorArea 
          lang={lang}
          preSelectedProject={selectedInquiryProject}
        />

        {/* 10. SOBRE A CONFERÊNCIA CIIT 2026 */}
        <About lang={lang} />

        {/* 11. PERFIL DE TETE & PONTOS TURÍSTICOS */}
        <TeteProfile lang={lang} />

        {/* 12. OS 6C'S DE TETE */}
        <Sectors lang={lang} />

        {/* 13. ORADORES CONFIRMADOS */}
        <Speakers lang={lang} />

        {/* 14. PROGRAMA OFICIAL CIIT 2026 */}
        <Agenda lang={lang} />

        {/* 15. GALERIA OFICIAL DE FOTOGRAFIAS */}
        <Gallery lang={lang} />

        {/* 16. PRESENÇAS LIVE & CHECK-IN EM TEMPO REAL */}
        <LiveAttendance
          lang={lang}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenAdmin={(activeCodeRecord?.code === 'ADMIN-DIVA' || activeCodeRecord?.isUnlimited === true) ? () => {
            setShowAdmin(true);
            setTimeout(() => scrollToSection('admin'), 100);
          } : undefined}
        />

        {/* 17. CREDENCIAMENTO E FORMULÁRIO DE INSCRIÇÃO */}
        <RegistrationForm
          lang={lang}
          onRegisterSuccess={handleRegisterSuccess}
        />

        {/* 18. GUIA DE VIAGEM E HOTÉIS */}
        <TravelGuide lang={lang} />

        {/* 19. PARCEIROS E PATROCINADORES */}
        <Partners lang={lang} />

        {/* 20. ASSISTENTE VIRTUAL DE INVESTIMENTO */}
        <InvestorChat lang={lang} />

        {/* 21. PAINEL ADMINISTRATIVO (ACESSO EXCLUSIVO: SUPER USERS / ADMIN-DIVA) */}
        {showAdmin && (activeCodeRecord?.code === 'ADMIN-DIVA' || activeCodeRecord?.isUnlimited === true) && (
          <AdminDashboard
            lang={lang}
            registrations={registrations}
            isSuperUser={activeCodeRecord?.code === 'ADMIN-DIVA' || activeCodeRecord?.isUnlimited === true}
            currentAdminCode={activeCodeRecord?.code}
            onAddManualAttendee={handleAddManualAttendee}
            onClearRegistrations={handleClearRegistrations}
            onCloseAdmin={() => setShowAdmin(false)}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

      </main>

      {/* QR CODE ENTRANCE SCANNER MODAL */}
      <QrCodeScannerModal
        lang={lang}
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      {/* FOOTER */}
      <footer id="footer" className="bg-slate-950 text-white pt-16 pb-12 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Info and Motto */}
            <div className="space-y-4 md:col-span-2">
              <button
                onClick={scrollToTop}
                className="block text-left group focus:outline-none transition-transform hover:opacity-95"
                title="Voltar ao Início"
              >
                <img
                  src={ciitLogoImg}
                  alt="CIIT 2026 Logo"
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </button>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {lang === 'pt'
                  ? 'A Conferência Internacional de Investimentos de Tete impulsiona o desenvolvimento de Moçambique promovendo conexões seguras de investimento privado nos setores de energia, mineração, agricultura, pecuária e infraestrutura.'
                  : 'The Tete International Investment Conference empowers Mozambican commerce by promoting elite foreign private venture connections in energy, mining, agriculture, livestock, and infrastructure.'}
              </p>
              <div className="pt-2 text-xs text-amber-400 font-semibold italic">
                {lang === 'pt' ? '"Invista em Tete. Construa o futuro."' : '"Invest in Tete. Build the future."'}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                {lang === 'pt' ? 'Navegação' : 'Navigation'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => scrollToSection('sobre-tete')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {lang === 'pt' ? 'Sobre Tete' : 'About Tete'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('onde-investir')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {lang === 'pt' ? 'Onde Investir' : 'Where to Invest'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('portfolio-projetos')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {lang === 'pt' ? 'Portfólio de Projetos' : 'Projects Portfolio'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('area-investidor')} className="hover:text-white transition-colors cursor-pointer text-left">
                    {lang === 'pt' ? 'Área do Investidor' : 'Investor Area'}
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
              <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                {lang === 'pt' ? 'Contactos Oficiais' : 'Official Contacts'}
              </h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Av. 25 de Setembro, Cidade de Tete, Província de Tete, Moçambique</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <a href="mailto:invest@tete.gov.mz" className="hover:text-white transition-colors">invest@tete.gov.mz</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>+258 25 220 100 / +258 84 300 1234</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Stamp and Copyright */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
            <div>
              <p>© 2026 {t.footerRights}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-amber-500">República de Moçambique</span>
              <span className="w-1.5 h-1.5 bg-emerald-500" />
              <span>Governo da Província de Tete</span>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING INDEPENDENT LANGUAGE SWITCH BUTTON */}
      <FloatingLanguageToggle
        lang={lang}
        setLang={setLang}
      />

      {/* VOLTAR AO INÍCIO (BACK TO TOP) FLOATING BUTTON */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-40 p-2.5 bg-slate-900/90 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/50 hover:border-amber-400 shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 flex items-center justify-center rounded-full group cursor-pointer"
          title={lang === 'pt' ? 'Voltar ao Início' : 'Back to Top'}
          aria-label={lang === 'pt' ? 'Voltar ao Início' : 'Back to Top'}
        >
          <ArrowUp className="w-4 h-4 text-amber-400 group-hover:text-slate-950 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      </div>
      )}
    </AccessGate>
  );
}
