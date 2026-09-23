/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  MapPin, 
  Plane, 
  ShieldCheck, 
  Briefcase, 
  Hotel, 
  ArrowUpRight,
  ExternalLink,
  CalendarPlus,
  Navigation,
  Mail,
  Phone
} from 'lucide-react';

interface FAQProps {
  lang: 'pt' | 'en';
  onRegisterClick?: () => void;
}

interface FAQItem {
  id: string;
  category: 'inscricao' | 'local' | 'viagem' | 'investimento' | 'hospedagem';
  questionPt: string;
  questionEn: string;
  answerPt: string;
  answerEn: string;
  hasCalendarAction?: boolean;
  hasMapsAction?: boolean;
  hasRegisterAction?: boolean;
}

export default function FAQ({ lang, onRegisterClick }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Keep first open by default
    'faq-2': true  // Keep venue open by default
  });

  const categories = [
    { id: 'all', labelPt: 'Todas as Perguntas', labelEn: 'All Questions' },
    { id: 'inscricao', labelPt: 'Inscrição & Credenciais', labelEn: 'Registration & Badges' },
    { id: 'local', labelPt: 'Local & Datas', labelEn: 'Venue & Dates' },
    { id: 'viagem', labelPt: 'Voos, Vistos & Transfers', labelEn: 'Flights, Visas & Transfers' },
    { id: 'investimento', labelPt: 'Negócios B2B & Projetos', labelEn: 'B2B Deals & Projects' },
    { id: 'hospedagem', labelPt: 'Hotéis & Alojamento', labelEn: 'Hotels & Lodging' }
  ];

  const faqData: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'inscricao',
      questionPt: 'Como efetuar a inscrição na CIIT 2026 e quais são os passos?',
      questionEn: 'How do I register for CIIT 2026 and what are the steps?',
      answerPt: 'A inscrição na Conferência Internacional de Investimentos de Tete é feita de forma 100% digital e segura através do portal oficial. Basta clicar no botão de inscrição, preencher os seus dados profissionais (nome, instituição/empresa, cargo, setor de interesse nos 6C\'s de Tete e país de origem). Após a submissão, a comissão de acreditação do Governo da Província de Tete valida o registo e emite o seu Digital Conference Pass oficial com QR Code único para controlo de acesso rápido no dia do evento.',
      answerEn: 'Registration for the Tete International Investment Conference is completed 100% digitally through the official portal. Click on the registration button, complete your professional profile (name, organization, role, area of interest in Tete\'s 6C sectors, and country). Upon submission, the accreditation committee reviews your application and issues your official Digital Conference Pass with a secure QR Code for expedited check-in at the venue.',
      hasRegisterAction: true
    },
    {
      id: 'faq-2',
      category: 'local',
      questionPt: 'Onde e quando se realiza o evento? Como chego ao local?',
      questionEn: 'Where and when does the conference take place? How do I get there?',
      answerPt: 'A CIIT 2026 terá lugar nos dias 8 e 9 de Outubro de 2026 no prestigiado Horizonte Lodge em Tete, Moçambique. O lodge está situado estrategicamente na margem do Rio Zambeze, com excelentes acessos viários e instalações modernas de conferência. Pode clicar no botão abaixo para obter de imediato as direções no Google Maps ou agendar o lembrete direto no calendário do seu dispositivo.',
      answerEn: 'CIIT 2026 takes place on October 8 and 9, 2026 at the prestigious Horizonte Lodge in Tete, Mozambique. The lodge is strategically situated along the Zambezi River with prime road connectivity and executive conference pavilions. You can click below to get direct Google Maps directions or schedule an instant reminder on your device\'s calendar.',
      hasCalendarAction: true,
      hasMapsAction: true
    },
    {
      id: 'faq-3',
      category: 'viagem',
      questionPt: 'Como funciona a logística de voos e transfers para a Cidade de Tete?',
      questionEn: 'What are the flight options and airport transfers to Tete City?',
      answerPt: 'A Província de Tete é servida pelo Aeroporto Internacional de Chingozi (código IATA: TET), com voos diários regulares operados pela LAM (Linhas Aéreas de Moçambique) com ligações convenientes a partir de Maputo, Beira, Joanesburgo (África do Sul) e Harare (Zimbabwe). A organização da CIIT 2026 disponibiliza transfers executivos oficiais gratuitos entre o Aeroporto de Chingozi e o Horizonte Lodge, bem como para os principais hotéis parceiros credenciados.',
      answerEn: 'Tete Province is served by the Chingozi International Airport (IATA: TET), offering daily scheduled flights operated by LAM (Mozambique Airlines) connecting smoothly with Maputo, Beira, Johannesburg (South Africa), and Harare (Zimbabwe). The CIIT 2026 secretariat provides complimentary executive shuttles between Chingozi Airport and Horizonte Lodge, as well as designated accredited partner hotels.'
    },
    {
      id: 'faq-4',
      category: 'viagem',
      questionPt: 'Preciso de visto de entrada para Moçambique? Como funciona o regime de isenção?',
      questionEn: 'Do I need a visa to enter Mozambique? How does the exemption policy work?',
      answerPt: 'Cidadãos de 29 países (incluindo Portugal, Reino Unido, Estados Unidos, Alemanha, França, Itália, Espanha, Canadá, Japão e membros da SADC) beneficiam de isenção de vistos para estadias de turismo e negócios até 30 dias, necessitando apenas de efetuar o pré-registo online na plataforma oficial de migração (evisa.gov.mz) com pagamento da taxa de processamento de 650 MZN (~USD 10). Para delegados de outras nacionalidades, o eVisa pode ser solicitado online com emissão rápida.',
      answerEn: 'Citizens from 29 countries (including Portugal, UK, USA, Germany, France, Italy, Spain, Canada, Japan, and SADC member states) enjoy visa waiver exemptions for business and tourism visits up to 30 days, requiring only a straightforward online pre-registration at the official migration portal (evisa.gov.mz) and payment of an administrative fee of 650 MZN (~USD 10). For other nationalities, standard electronic business visas can be applied for online.'
    },
    {
      id: 'faq-5',
      category: 'hospedagem',
      questionPt: 'Quais são as opções de hotelaria recomendadas e tarifas corporativas?',
      questionEn: 'What are the recommended accommodation options and corporate partner rates?',
      answerPt: 'Além das acomodações executivas disponíveis no próprio Horizonte Lodge (local oficial do evento), a comissão organizadora estabeleceu acordos com tarifas corporativas especiais nos hotéis VIP Executive Tete, Park Inn by Radisson Tete e Hotel Baía do Zambeze. Ao efetuar a sua reserva, indique o código promocional "CIIT2026" para aceder a descontos exclusivos de até 25% e serviço de transfer dedicado.',
      answerEn: 'In addition to executive chalets available on-site at Horizonte Lodge (the official venue), the organizing committee has secured preferential corporate rates at VIP Executive Tete, Park Inn by Radisson Tete, and Hotel Baía do Zambeze. Use the booking code "CIIT2026" when making your reservation to unlock exclusive delegate discounts of up to 25% and shuttle access.'
    },
    {
      id: 'faq-6',
      category: 'investimento',
      questionPt: 'Como agendar reuniões bilaterais B2B e B2G com o Governo de Tete e investidores?',
      questionEn: 'How can I schedule bilateral B2B and B2G meetings with the Government and investors?',
      answerPt: 'A CIIT 2026 disponibiliza uma Sala de Negócios VIP e um serviço de Matchmaking Corporativo dedicado no Horizonte Lodge. Os delegados credenciados podem solicitar antecipadamente reuniões com membros do Governo da Província de Tete, direções provinciais, agências reguladoras (APIEX) e líderes do setor privado nacional e internacional através do formulário de Manifestação de Interesse no portal da conferência.',
      answerEn: 'CIIT 2026 features dedicated VIP Deal Rooms and an exclusive Corporate Matchmaking secretariat at Horizonte Lodge. Accredited delegates can pre-book bilateral meetings with Tete Provincial Government leaders, regional directors, national investment agencies (APIEX), and prominent private-sector operators via the online Letter of Intent (LOI) portal.'
    },
    {
      id: 'faq-7',
      category: 'investimento',
      questionPt: 'Que oportunidades de investimento estarão em foco na conferência?',
      questionEn: 'What key investment opportunities will be highlighted at the conference?',
      answerPt: 'A conferência dá foco prioritário aos setores estruturantes da província: Energia (hidroelétrica, solar e gás), Mineração e Industrialização (carvão, ferro, grafite, fosfatos), Agricultura & Pecuária (mais de 10 milhões de hectares de terra arável e o prestigiado Cabrito de Tete), Pesca e Aquacultura (Albufeira de Cahora Bassa) e Turismo Sustentável (Eco-lodges de luxo, Safaris no Parque Nacional de Mágoè e pesca desportiva).',
      answerEn: 'The conference spotlights key regional pillars: Clean & Baseload Energy (hydroelectric, utility solar, transmission), Mining & Beneficiation (coking coal, iron ore, graphite, phosphates), Agriculture & Livestock (over 10 million hectares of fertile arable land, Tete goat), Fisheries & Aquaculture (Lake Cahora Bassa), and Eco-Tourism (luxury eco-lodges, Mágoè National Park safaris, and sport-fishing).'
    },
    {
      id: 'faq-8',
      category: 'inscricao',
      questionPt: 'Haverá transmissão online ou acesso remoto às sessões da conferência?',
      questionEn: 'Will there be live streaming or remote virtual access to conference sessions?',
      answerPt: 'Sim. Todas as sessões plenárias, painéis temáticos ministeriais e apresentações do Portfólio de Projetos terão transmissão ao vivo em alta definição no portal oficial da CIIT 2026, com tradução simultânea em Português e Inglês para delegados e investidores internacionais impossibilitados de viajar presencialmente.',
      answerEn: 'Yes. All plenary sessions, ministerial keynote panels, and Investment Project Portfolio pitches will be streamed live in HD on the official CIIT 2026 platform, featuring real-time simultaneous interpretation in English and Portuguese for global remote delegates.'
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const q = lang === 'pt' ? item.questionPt : item.questionEn;
      const a = lang === 'pt' ? item.answerPt : item.answerEn;
      const matchesSearch = 
        q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [faqData, searchTerm, selectedCategory, lang]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScheduleCalendar = () => {
    const title = encodeURIComponent("CIIT 2026 - Conferência Internacional de Investimentos de Tete");
    const details = encodeURIComponent(
      "Conferência Internacional de Investimentos de Tete (CIIT 2026).\n" +
      "Local: Horizonte Lodge, Tete, Moçambique.\n" +
      "Lema: Tete no Horizonte de Investimentos: Oportunidades para uma Nova Era de Desenvolvimento.\n" +
      "Invista em Tete, construa o futuro."
    );
    const location = encodeURIComponent("Horizonte Lodge, Tete, Moçambique");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261008T063000Z/20261009T160000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGetDirections = () => {
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Horizonte+Lodge+Tete+Mozambique";
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Esclarecimento de Dúvidas' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Perguntas Frequentes (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt'
              ? 'Tudo o que precisa saber sobre a inscrição, localização no Horizonte Lodge, logística de viagem e oportunidades de investimento na CIIT 2026.'
              : 'Everything you need to know about conference registration, Horizonte Lodge venue, travel logistics, and investment opportunities at CIIT 2026.'}
          </p>
        </div>

        {/* Quick Action Reminder Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-amber-500 text-slate-950 font-bold flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider font-black text-amber-950 block">
                {lang === 'pt' ? 'Horizonte Lodge, Tete • 8 e 9 de Outubro de 2026' : 'Horizonte Lodge, Tete • October 8-9, 2026'}
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                {lang === 'pt' 
                  ? 'Agende o evento diretamente no seu dispositivo ou trace a rota no Google Maps.'
                  : 'Add event directly to your calendar or map directions to Horizonte Lodge.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={handleScheduleCalendar}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-1.5 transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'pt' ? 'Agendar Calendário' : 'Add to Calendar'}</span>
            </button>
            <button
              onClick={handleGetDirections}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'pt' ? 'Google Maps' : 'Directions'}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'pt' ? 'Pesquisar dúvidas, credenciação, voos ou hotéis...' : 'Search questions, credentials, flights, or hotels...'}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent'
                } border`}
              >
                {lang === 'pt' ? cat.labelPt : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-500">
                {lang === 'pt' ? 'Nenhuma pergunta encontrada para os critérios de busca.' : 'No questions found matching your criteria.'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isExpanded = !!expandedItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`bg-white border transition-all duration-200 ${
                    isExpanded ? 'border-amber-400 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer space-x-4"
                  >
                    <span className="font-display font-bold text-slate-950 text-sm sm:text-base leading-snug">
                      {lang === 'pt' ? item.questionPt : item.questionEn}
                    </span>
                    <div className="p-1 bg-slate-100 text-slate-700 flex-shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-sm text-slate-600 leading-relaxed space-y-3">
                      <p>{lang === 'pt' ? item.answerPt : item.answerEn}</p>
                      
                      {/* Contextual Quick Action buttons inside answer */}
                      {(item.hasRegisterAction || item.hasCalendarAction || item.hasMapsAction) && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {item.hasRegisterAction && onRegisterClick && (
                            <button
                              onClick={onRegisterClick}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-black uppercase tracking-wider cursor-pointer inline-flex items-center space-x-1.5 transition-colors"
                            >
                              <span>{lang === 'pt' ? 'Fazer Inscrição Agora' : 'Register Now'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {item.hasCalendarAction && (
                            <button
                              onClick={handleScheduleCalendar}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center space-x-1.5 border border-slate-300 transition-colors"
                            >
                              <CalendarPlus className="w-3.5 h-3.5 text-amber-700" />
                              <span>{lang === 'pt' ? 'Agendar no Calendário' : 'Add to Calendar'}</span>
                            </button>
                          )}
                          {item.hasMapsAction && (
                            <button
                              onClick={handleGetDirections}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center space-x-1.5 border border-slate-300 transition-colors"
                            >
                              <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{lang === 'pt' ? 'Direções Horizonte Lodge (Maps)' : 'Directions to Horizonte Lodge'}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support & Contact Card */}
        <div className="mt-12 bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t-4 border-amber-500">
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              {lang === 'pt' ? 'Ainda tem dúvidas ou necessita de apoio protocolar?' : 'Still have questions or require protocol assistance?'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {lang === 'pt'
                ? 'O Secretariado Executivo da CIIT 2026 está disponível para apoiar delegações internacionais, investidores e participantes na preparação da sua viagem a Tete.'
                : 'The CIIT 2026 Executive Secretariat is available to assist international delegations, investors, and attendees preparing their mission to Tete.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center space-x-1.5">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>ciit2026@governotete.gov.mz</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+258 252 20120 / +258 84 310 2026</span>
              </span>
            </div>
          </div>

          {onRegisterClick && (
            <button
              onClick={onRegisterClick}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all shadow-md active:scale-95 flex-shrink-0"
            >
              {lang === 'pt' ? 'Garantir Acreditação' : 'Secure Accreditation'}
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
