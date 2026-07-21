/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Speaker, AgendaSession, SectorDetail, HotelRecommendation, Registration } from './types';

export const SPEAKERS: Speaker[] = [
  {
    id: 'sp1',
    name: 'Dr. Valige Tauabo',
    role: 'Governador da Província',
    company: 'Governo da Província de Tete',
    bio: 'Líder visionário impulsionando o desenvolvimento industrial, agrícola e logístico de Tete, focado em criar um ambiente de negócios favorável para atração de capitais internacionais.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    nationality: 'Moçambique',
    featured: true
  },
  {
    id: 'sp2',
    name: 'Eng. Amélia Tomás',
    role: 'Diretora Executiva de Energia e Projetos',
    company: 'Cahora Bassa Energia S.A.',
    bio: 'Especialista em infraestruturas elétricas de grande escala, com mais de 15 anos de liderança na modernização de redes de transmissão regionais na África Austral.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    nationality: 'Moçambique',
    featured: true
  },
  {
    id: 'sp3',
    name: 'Mr. David Harrington',
    role: 'Sócio Gestor de Infraestruturas de África',
    company: 'Apex Global Capital',
    bio: 'Investidor internacional focado em capital de risco e infraestruturas logísticas críticas, gerindo mais de $2.5B em ativos nos mercados emergentes de África.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    nationality: 'Reino Unido',
    featured: true
  },
  {
    id: 'sp4',
    name: 'Dra. Isabel Santos',
    role: 'Consultora de Parcerias Público-Privadas',
    company: 'Banco Africano de Desenvolvimento (BAD)',
    bio: 'Economista sênior dedicada a estruturar financiamentos para o setor de energias limpas e de agronegócio de valor acrescentado.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    nationality: 'Portugal',
    featured: false
  },
  {
    id: 'sp5',
    name: 'Marta Chilaule',
    role: 'Presidente da Associação Industrial de Tete',
    company: 'AIT',
    bio: 'Líder associativa focada na integração de PMEs locais nas cadeias de valor dos megaprojetos minerais e de infraestrutura da província de Tete.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    nationality: 'Moçambique',
    featured: false
  },
  {
    id: 'sp6',
    name: 'Dr. Zhang Wei',
    role: 'VP de Operações de Recursos Minerais',
    company: 'Sino-Africa Resource Group',
    bio: 'Engenheiro de minas com vasta experiência na descarbonização industrial e logística sustentável de minerais críticos em Moçambique e Zimbábue.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    nationality: 'China',
    featured: false
  }
];

export const THE_6_CS: SectorDetail[] = [
  {
    id: 'c1',
    title: 'Cahora Bassa',
    subtitle: 'Energia & Recursos Hídricos',
    description: 'A maior central hidroelétrica da África Austral, gerando mais de 2.075 MW de energia limpa. Tete assume-se como o hub energético regional, exportando energia para a África do Sul, Zimbábue e toda a região SADC.',
    investmentOpportunities: [
      'Projetos de energia solar flutuante na albufeira',
      'Redes de transmissão de média e alta tensão',
      'Desenvolvimento de mini-hídricas de suporte comunitário'
    ],
    keyData: '2.075 MW de Potência Instalada',
    iconName: 'Zap'
  },
  {
    id: 'c2',
    title: 'Carvão',
    subtitle: 'Mineração & Recursos Minerais',
    description: 'Tete alberga uma das maiores bacias de carvão metalúrgico e térmico não exploradas do mundo (bacia de Moatize). Atualmente, a mineração é um dos principais pilares das exportações de Moçambique, ligada por ferrovia ao Porto de Nacala e Porto da Beira.',
    investmentOpportunities: [
      'Beneficiação de carvão e subprodutos',
      'Tecnologias de mineração verde e reabilitação ambiental',
      'Mineração complementar de ferro, fosfatos e minerais industriais'
    ],
    keyData: 'Bacia de Moatize (Reservas Globais)',
    iconName: 'Gem'
  },
  {
    id: 'c3',
    title: 'Cabrito',
    subtitle: 'Pecuária de Excelência',
    description: 'O famoso "Cabrito de Tete" é reconhecido nacionalmente pela sua qualidade gastronómica única, impulsionada pelo pasto natural específico da província. Uma marca com indicação geográfica protegida em desenvolvimento.',
    investmentOpportunities: [
      'Matadouros industriais modernos com certificação Halal',
      'Unidades de processamento de carne e cadeias de frio',
      'Exportação organizada para mercados do Médio Oriente'
    ],
    keyData: '+1.5M de Cabeças de Gado Caprino',
    iconName: 'Beef'
  },
  {
    id: 'c4',
    title: 'Citrinos',
    subtitle: 'Agronegócio & Culturas de Rendimento',
    description: 'Com condições climáticas excecionais e as águas do majestoso Rio Zambeze, Tete apresenta um solo altamente fértil ideal para a produção em larga escala de laranjas, limões e outras frutas cítricas de qualidade superior.',
    investmentOpportunities: [
      'Sistemas de irrigação de alta eficiência',
      'Fábricas de sumos, polpas e embalamento para exportação',
      'Criação de marcas próprias de citrinos para o mercado regional'
    ],
    keyData: 'Milhares de hectares de solos férteis irrigáveis',
    iconName: 'Sprout'
  },
  {
    id: 'c5',
    title: 'Cimento',
    subtitle: 'Indústria Civil & Construção',
    description: 'Ricas jazidas de calcário e gesso alimentam uma indústria de cimento e cal em forte expansão, servindo não apenas os megaprojetos locais mas também as necessidades de infraestrutura dos países vizinhos como Malawi e Zimbábue.',
    investmentOpportunities: [
      'Fábricas de clínquer e aditivos sustentáveis',
      'Expansão da capacidade de fornecimento regional de cal industrial',
      'Materiais de construção pré-fabricados de alto desempenho'
    ],
    keyData: 'Proximidade estratégica com mercados SADC encravados',
    iconName: 'Building'
  },
  {
    id: 'c6',
    title: 'Cobre & Algodão',
    subtitle: 'Metais Críticos & Têxteis (Diversificação)',
    description: 'Tete diversifica o seu portfólio de exportação com reservas comprovadas de cobre e ferro, bem como uma tradição agrícola vibrante na produção de algodão (o "ouro branco"), tabaco e castanha de caju.',
    investmentOpportunities: [
      'Pesquisa e extração de cobre e minerais críticos para transição energética',
      'Processamento local de algodão e indústria de fiação/têxtil',
      'Unidades de processamento e refinação de castanha de caju'
    ],
    keyData: 'Minerais de transição e culturas de alto rendimento',
    iconName: 'Cpu'
  }
];

export const AGENDA: AgendaSession[] = [
  // DAY 1 - Oct 8
  {
    id: 'd1s1',
    time: '08:30 - 09:30',
    title: 'Sessão de Abertura Oficial',
    description: 'Boas-vindas por Sua Excelência o Governador da Província de Tete, discursos ministeriais e apresentação dos objetivos estratégicos da CIIT2026.',
    speakerIds: ['sp1'],
    location: 'Grande Auditório Zambeze',
    category: 'plenary'
  },
  {
    id: 'd1s2',
    time: '09:45 - 11:15',
    title: 'Painel Principal: O Papel de Tete na Transição Energética da África Austral',
    description: 'Como Cahora Bassa e novos projetos de energia solar colocarão Tete na vanguarda da geração sustentável regional.',
    speakerIds: ['sp2', 'sp4'],
    location: 'Grande Auditório Zambeze',
    category: 'energy'
  },
  {
    id: 'd1s3',
    time: '11:30 - 13:00',
    title: 'Mineração Responsável: Descarbonização e Logística na Bacia de Moatize',
    description: 'Estratégias de investimento para otimização da logística ferroviária e portuária e adoção de tecnologias limpas na exploração mineral.',
    speakerIds: ['sp6', 'sp5'],
    location: 'Grande Auditório Zambeze',
    category: 'mining'
  },
  {
    id: 'd1s4',
    time: '13:00 - 14:30',
    title: 'Almoço Executivo de Networking',
    description: 'Almoço privado com investidores, delegações internacionais e decisores políticos.',
    speakerIds: [],
    location: 'Terraço dos Baobás',
    category: 'networking'
  },
  {
    id: 'd1s5',
    time: '14:45 - 16:30',
    title: 'Mesa Redonda: Estruturação de Financiamentos para Grandes Infraestruturas',
    description: 'Parcerias público-privadas e captação de fundos multilaterais para estradas, pontes e redes de telecomunicação na província.',
    speakerIds: ['sp3', 'sp4'],
    location: 'Sala de Conferências VIP',
    category: 'infrastructure'
  },

  // DAY 2 - Oct 9
  {
    id: 'd2s1',
    time: '09:00 - 10:30',
    title: 'Agronegócio Sustentável: Industrialização dos Citrinos e Pecuária de Tete',
    description: 'Oportunidades de agregação de valor local na carne do "Cabrito de Tete" (Indicação Geográfica) e no estabelecimento de explorações de citrinos voltadas para a exportação.',
    speakerIds: ['sp5'],
    location: 'Grande Auditório Zambeze',
    category: 'agriculture'
  },
  {
    id: 'd2s2',
    time: '10:45 - 12:30',
    title: 'Sessão B2B: Matchmaking de Investimento Direto Estrangeiro',
    description: 'Sessões pré-agendadas de 1-on-1 entre detentores de projetos locais e capitalistas de risco globais.',
    speakerIds: ['sp3', 'sp1'],
    location: 'Sala Executiva Tete Plaza',
    category: 'networking'
  },
  {
    id: 'd2s3',
    time: '14:00 - 15:30',
    title: 'Desenvolvimento Industrial e Zonas Económicas Especiais',
    description: 'Incentivos fiscais, facilidades alfandegárias e infraestrutura logística no corredor de desenvolvimento de Tete.',
    speakerIds: ['sp4', 'sp6'],
    location: 'Grande Auditório Zambeze',
    category: 'infrastructure'
  },
  {
    id: 'd2s4',
    time: '16:00 - 18:00',
    title: 'Cocktail de Gala e Apresentação Cultural',
    description: 'Celebração da cultura de Tete com degustação de gastronomia local premium (Cabrito de Tete preparado por chefs de renome) e danças tradicionais.',
    speakerIds: [],
    location: 'Jardins Fluviais do Zambeze',
    category: 'networking'
  },

  // DAY 3 - Oct 10
  {
    id: 'd3s1',
    time: '09:30 - 11:30',
    title: 'Fórum de Jovens Empreendedores e Inovação Local',
    description: 'Apresentação de startups moçambicanas focadas em soluções agro-tech, fintech e energia solar residencial.',
    speakerIds: ['sp5', 'sp2'],
    location: 'Grande Auditório Zambeze',
    category: 'plenary'
  },
  {
    id: 'd3s2',
    time: '11:45 - 13:00',
    title: 'Assinatura de Memorandos de Entendimento (MoU) e Encerramento',
    description: 'Formalização de acordos bilaterais de investimento facilitados durante a conferência e leitura do Comunicado Final de Tete.',
    speakerIds: ['sp1', 'sp3'],
    location: 'Grande Auditório Zambeze',
    category: 'plenary'
  }
];

export const HOTELS: HotelRecommendation[] = [
  {
    name: 'VIP Executive Tete Hotel',
    stars: 4,
    description: 'O hotel de eleição para viajantes de negócios na cidade de Tete. Oferece quartos confortáveis, um centro de conferências totalmente equipado, uma piscina exterior relaxante e um restaurante de alta cozinha internacional.',
    address: 'Av. da Liberdade, Tete, Moçambique',
    phone: '+258 25 224 800',
    website: 'https://www.viphotels.com',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Baobá Hotel Tete',
    stars: 4,
    description: 'Localizado ao longo das margens cénicas do majestoso Rio Zambeze, rodeado por baobás icónicos. Excelente para relaxar após reuniões executivas intensas, com uma excelente vista sobre a ponte suspensa de Tete.',
    address: 'Estrada Nacional N7, Tete, Moçambique',
    phone: '+258 84 311 0122',
    website: '#',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Hotel Zambeze',
    stars: 3,
    description: 'Um hotel moderno no centro financeiro de Tete, oferecendo acomodações executivas práticas, serviço de transfer gratuito do aeroporto de Tete (TET) e excelente wi-fi corporativo.',
    address: 'Rua de Angola, Cidade de Tete',
    phone: '+258 25 223 900',
    website: '#',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'CIIT-2026-1024',
    fullName: 'Armando Alírio Guila',
    email: 'armando.guila@invest.gov.mz',
    phone: '+258 82 455 1200',
    company: 'Agência de Promoção de Investimentos e Exportações (APIEX)',
    jobTitle: 'Diretor de Operações de IDE',
    country: 'Moçambique',
    sectorOfInterest: 'Energia & Recursos Hídricos',
    registrationType: 'government',
    registeredAt: '2026-07-15T10:30:00Z',
    ticketStatus: 'Confirmed'
  },
  {
    id: 'CIIT-2026-1188',
    fullName: 'Sophia Van Der Merwe',
    email: 's.vandermerwe@capricornenergy.co.za',
    phone: '+27 11 889 4522',
    company: 'Capricorn Energy Partners',
    jobTitle: 'Analista Principal de Investimento',
    country: 'África do Sul',
    sectorOfInterest: 'Energia & Recursos Hídricos',
    registrationType: 'investor',
    registeredAt: '2026-07-18T14:22:00Z',
    ticketStatus: 'Confirmed'
  },
  {
    id: 'CIIT-2026-1309',
    fullName: 'Eng. Carlos Pinto',
    email: 'carlos.pinto@valetete.co.mz',
    phone: '+258 84 900 1234',
    company: 'Mineradora Vale Tete S.A.',
    jobTitle: 'Superintendente de Sustentabilidade',
    country: 'Moçambique',
    sectorOfInterest: 'Mineração & Recursos Minerais',
    registrationType: 'delegate',
    registeredAt: '2026-07-20T08:15:00Z',
    ticketStatus: 'Confirmed'
  },
  {
    id: 'CIIT-2026-1412',
    fullName: 'Al-Farabi Al-Mansoori',
    email: 'almansoori@gulfventures.ae',
    phone: '+971 4 550 9011',
    company: 'Gulf Coast Sovereign Fund',
    jobTitle: 'Diretor de Projetos de Agronegócios para África',
    country: 'Emirados Árabes Unidos',
    sectorOfInterest: 'Pecuária (Cabrito de Tete)',
    registrationType: 'investor',
    registeredAt: '2026-07-21T05:10:00Z',
    ticketStatus: 'Confirmed'
  }
];

export const SPONSORS = {
  platinum: [
    { name: 'Cahora Bassa Energia', logo: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80&w=150' },
    { name: 'Moçambique Mineral Group', logo: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=150' }
  ],
  gold: [
    { name: 'Banco Comercial de Moçambique', logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=150' },
    { name: 'Zambeze Logística S.A.', logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=150' }
  ],
  institutional: [
    { name: 'Governo de Tete', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150' },
    { name: 'APIEX Moçambique', logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150' }
  ]
};

export const TRANSLATIONS = {
  pt: {
    navHome: 'Início',
    navAbout: 'Sobre',
    nav6cs: 'Os 6C\'s de Tete',
    navSpeakers: 'Oradores',
    navAgenda: 'Programa',
    navTravel: 'Viagem & Guia',
    navAdmin: 'Painel Admin',
    navRegister: 'Inscreva-se Já',
    heroSubtitle: 'Governo da Província de Tete • República de Moçambique',
    heroDate: '8, 9 e 10 de Outubro de 2026',
    heroMotto: '"TETE NO HORIZONTE DE INVESTIMENTOS: OPORTUNIDADES PARA UMA NOVA ERA DE DESENVOLVIMENTO"',
    heroLocation: 'Cidade de Tete, Moçambique',
    countdownDays: 'Dias',
    countdownHours: 'Horas',
    countdownMinutes: 'Min',
    countdownSeconds: 'Seg',
    registerBtn: 'Efetuar Inscrição',
    learnMore: 'Saber Mais',
    aboutTitle: 'Sobre a CIIT 2026',
    aboutSubtitle: 'A Plataforma de Investimento Mais Relevante do Vale do Zambeze',
    aboutText1: 'A Conferência Internacional de Investimentos de Tete 2026 (CIIT2026) representa o principal evento económico e corporativo do ano na região central de Moçambique. Organizada pelo Governo da Província de Tete, a conferência serve como uma plataforma internacional onde investidores, decisores políticos, banqueiros e grandes operadores económicos reúnem-se para explorar e materializar oportunidades no dinâmico vale do Zambeze.',
    aboutText2: 'A nossa província, abençoada com riquezas minerais substanciais, o maior rio da África Austral e um clima propício à agricultura comercial, está preparada para uma nova era de industrialização. O evento promove debates focados em desenvolvimento sustentável, parcerias público-privadas e atração de investimento direto estrangeiro (IDE) com impactos reais de longo prazo.',
    sectTitle: 'Os 6C\'s da Riqueza de Tete',
    sectSubtitle: 'Pilares Estratégicos de Desenvolvimento e Oportunidades de Investimento',
    sectOppTitle: 'Oportunidades de Investimento:',
    sectDataLabel: 'Métrica Chave:',
    speakersTitle: 'Oradores Confirmados',
    speakersSubtitle: 'Líderes de Governo, Executivos Globais e Especialistas Industriais',
    agendaTitle: 'Programa Oficial',
    agendaSubtitle: 'Três dias de discussões estratégicas, mesas redondas setoriais e matchmaking executivo',
    day: 'Dia',
    registerTitle: 'Inscrição Credenciada',
    registerSubtitle: 'Garanta a sua credencial para o evento económico mais importante de Moçambique',
    formName: 'Nome Completo',
    formEmail: 'E-mail Corporativo',
    formPhone: 'Telefone / WhatsApp (com indicativo)',
    formCompany: 'Empresa / Organização',
    formTitle: 'Cargo Executivo',
    formCountry: 'País de Origem',
    formSector: 'Setor de Principal Interesse',
    formType: 'Tipo de Participação',
    formSubmit: 'Confirmar Inscrição & Gerar Credencial',
    badgeTitle: 'A sua Credencial de Acesso Virtual está Pronta',
    badgeSubtitle: 'Por favor, guarde esta credencial para apresentar na entrada do evento em Tete.',
    badgeDownload: 'Descarregar Credencial (Imprimir)',
    badgeRegistered: 'Inscrição Confirmada',
    travelTitle: 'Viagem e Estadia',
    travelSubtitle: 'Informações logísticas indispensáveis para participantes internacionais e nacionais',
    travelAirportTitle: 'Como Chegar (Aeroporto de Tete - TET)',
    travelAirportText: 'O Aeroporto de Chingozi (TET), situado a apenas 10 minutos do centro da cidade de Tete, recebe voos diários de Maputo operados pelas Linhas Aéreas de Moçambique (LAM) e conexões regionais regulares a partir de Joanesburgo (África do Sul) e Harare (Zimbábue).',
    travelVisasTitle: 'Vistos de Entrada',
    travelVisasText: 'Moçambique implementou facilidades para investidores com a introdução do visto eletrónico (e-Visa). Cidadãos de diversos países agora possuem isenção de vistos para estadias curtas de negócios ou turismo. Consulte o site evisa.gov.mz antes de viajar.',
    travelHotelsTitle: 'Acomodação de Prestígio Recomendada',
    travelHotelsBtn: 'Ver Website / Reservar',
    adminTitle: 'Painel Administrativo da Conferência',
    adminSubtitle: 'Monitorização em tempo real de inscrições, estatísticas setoriais e relatórios executivos',
    adminLoginPlaceholder: 'Insira a palavra-passe de administrador...',
    adminLoginBtn: 'Aceder ao Painel',
    adminTotal: 'Total de Inscritos',
    adminStatusConfirmed: 'Confirmados',
    adminStatsTitle: 'Métricas e Distribuição de Delegados',
    adminTableTitle: 'Lista de Participantes Cadastrados',
    adminAddManual: 'Registar Manualmente',
    footerRights: 'Todos os direitos reservados. Governo da Província de Tete, Moçambique.'
  },
  en: {
    navHome: 'Home',
    navAbout: 'About',
    nav6cs: 'Tete 6 C\'s',
    navSpeakers: 'Speakers',
    navAgenda: 'Agenda',
    navTravel: 'Travel Guide',
    navAdmin: 'Admin Dashboard',
    navRegister: 'Register Now',
    heroSubtitle: 'Government of Tete Province • Republic of Mozambique',
    heroDate: 'October 8, 9, & 10, 2026',
    heroMotto: '"TETE ON THE INVESTMENT HORIZON: OPPORTUNIDADES FOR A NEW ERA OF DEVELOPMENT"',
    heroLocation: 'Tete City, Mozambique',
    countdownDays: 'Days',
    countdownHours: 'Hours',
    countdownMinutes: 'Min',
    countdownSeconds: 'Sec',
    registerBtn: 'Register For Conference',
    learnMore: 'Learn More',
    aboutTitle: 'About CIIT 2026',
    aboutSubtitle: 'The Most Crucial Investment Forum in the Zambezi Valley',
    aboutText1: 'The Tete International Investment Conference 2026 (CIIT2026) is the leading economic and corporate event of the year in central Mozambique. Organized by the Government of Tete Province, the conference serves as an international platform where global investors, policymakers, finance executives, and leading industry operators gather to unlock opportunities in the highly dynamic Zambezi basin.',
    aboutText2: 'Our province, rich with world-class mineral resources, home to the largest river in Southern Africa, and endowed with fertile soils for commercial farming, is primed for a new era of clean industrialization. The event fosters discussions on sustainable growth, public-private partnerships (PPPs), and the attraction of high-impact Foreign Direct Investment (FDI).',
    sectTitle: 'The 6 C\'s of Tete\'s Abundance',
    sectSubtitle: 'Strategic Growth Pillars & Lucrative Investment Opportunities',
    sectOppTitle: 'Investment Opportunities:',
    sectDataLabel: 'Key Metric:',
    speakersTitle: 'Confirmed Speakers',
    speakersSubtitle: 'Government Leaders, Global Executives, and Industry Specialists',
    agendaTitle: 'Official Program',
    agendaSubtitle: 'Three days of strategic debates, keynotes, sector-focused workshops, and B2B matchmaking',
    day: 'Day',
    registerTitle: 'Accredited Registration',
    registerSubtitle: 'Secure your executive pass to the most critical economic summit in Mozambique',
    formName: 'Full Name',
    formEmail: 'Corporate E-mail',
    formPhone: 'Phone / WhatsApp (with country code)',
    formCompany: 'Company / Organization',
    formTitle: 'Executive Job Title',
    formCountry: 'Country of Origin',
    formSector: 'Primary Sector of Interest',
    formType: 'Registration Type',
    formSubmit: 'Confirm Registration & Generate Badge',
    badgeTitle: 'Your Virtual Access Pass is Ready',
    badgeSubtitle: 'Please save or print this credential. Present it at the venue entrance in Tete.',
    badgeDownload: 'Download Pass (Printable)',
    badgeRegistered: 'Confirmed Registration',
    travelTitle: 'Travel & Accommodation',
    travelSubtitle: 'Essential logistical information for international and domestic delegates',
    travelAirportTitle: 'Getting Here (Tete Airport - TET)',
    travelAirportText: 'Chingozi Airport (TET) is located just 10 minutes from Tete city center, offering daily domestic flights from Maputo via Linhas Aéreas de Moçambique (LAM), and regular regional connections from Johannesburg (South Africa) and Harare (Zimbabwe).',
    travelVisasTitle: 'Visa Requirements',
    travelVisasText: 'Mozambique has simplified investment entry with the introduction of the e-Visa portal. Citizens of various countries now enjoy visa exemptions for short-term business or tourism visits. Review evisa.gov.mz prior to your flight.',
    travelHotelsTitle: 'Recommended Elite Accommodations',
    travelHotelsBtn: 'Visit Website / Book',
    adminTitle: 'Conference Administration Portal',
    adminSubtitle: 'Real-time tracking of registration metrics, sector interest charts, and delegate logs',
    adminLoginPlaceholder: 'Enter administrator passcode...',
    adminLoginBtn: 'Access Portal',
    adminTotal: 'Total Delegates',
    adminStatusConfirmed: 'Confirmed',
    adminStatsTitle: 'Key Metrics & Attendance Distribution',
    adminTableTitle: 'Registered Delegates Database',
    adminAddManual: 'Register Manual Attendee',
    footerRights: 'All rights reserved. Government of Tete Province, Mozambique.'
  }
};
