/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Speaker, AgendaSession, SectorDetail, HotelRecommendation, Registration } from './types';

import cahoraBassaImg from './assets/images/Cahora Bassa.jpg';
import coalImg from './assets/images/moatize_coal_minerals_1784807272754.jpg';
import caprinosImg from './assets/images/tete_caprinos_goats_1784807286233.jpg';
import tchumaTchatoImg from './assets/images/Area_de_Conservacao_Tchuma_Tchato.jpg';
import chicoaImg from './assets/images/Chicoa (2).jpg';
import kapentaImg from './assets/images/KAPENTA.jpg';



export const SPEAKERS: Speaker[] = [
  {
    id: 'sp1',
    name: 'Dr. Valige Tauabo',
    role: 'Governador da Província',
    roleEn: 'Governor of Tete Province',
    company: 'Governo da Província de Tete',
    bio: 'Líder visionário impulsionando o desenvolvimento industrial, agrícola e logístico de Tete, focado em criar um ambiente de negócios favorável para atração de capitais internacionais.',
    bioEn: 'Visionary leader driving the industrial, agricultural, and logistical growth of Tete, dedicated to creating a welcoming investment climate for global capital.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true
  },
  {
    id: 'sp2',
    name: 'Eng. Amélia Tomás',
    role: 'Diretora Executiva de Energia e Projetos',
    roleEn: 'Executive Director of Energy & Infrastructure',
    company: 'Cahora Bassa Energia S.A.',
    bio: 'Especialista em infraestruturas elétricas de grande escala, com mais de 15 anos de liderança na modernização de redes de transmissão regionais na África Austral.',
    bioEn: 'Large-scale electrical grid specialist with over 15 years leading cross-border energy transmission modernization across Southern Africa.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true
  },
  {
    id: 'sp3',
    name: 'Mr. David Harrington',
    role: 'Sócio Gestor de Infraestruturas de África',
    roleEn: 'Managing Partner for Africa Infrastructure',
    company: 'Apex Global Capital',
    bio: 'Investidor internacional focado em capital de risco e infraestruturas logísticas críticas, gerindo mais de $2.5B em ativos nos mercados emergentes de África.',
    bioEn: 'International investor focused on private equity and critical infrastructure logistics, managing over $2.5B in emerging African market assets.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    nationality: 'Reino Unido',
    nationalityEn: 'United Kingdom',
    featured: true
  },
  {
    id: 'sp4',
    name: 'Dra. Isabel Santos',
    role: 'Consultora de Parcerias Público-Privadas',
    roleEn: 'Public-Private Partnerships Advisor',
    company: 'Banco Africano de Desenvolvimento (BAD)',
    bio: 'Economista sênior dedicada a estruturar financiamentos para o setor de energias limpas e de agronegócio de valor acrescentado.',
    bioEn: 'Senior economist specializing in multilateral blended finance for renewable energy and value-added agribusiness developments.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    nationality: 'Portugal',
    nationalityEn: 'Portugal',
    featured: false
  },
  {
    id: 'sp5',
    name: 'Marta Chilaule',
    role: 'Presidente da Associação Industrial de Tete',
    roleEn: 'President of Tete Industrial Association',
    company: 'AIT',
    bio: 'Líder associativa focada na integração de PMEs locais nas cadeias de valor dos megaprojetos minerais e de infraestrutura da província de Tete.',
    bioEn: 'Business advocate driving SME integration into local supply chains of Tete\'s major mining and infrastructure megaprojects.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: false
  },
  {
    id: 'sp6',
    name: 'Dr. Zhang Wei',
    role: 'VP de Operações de Recursos Minerais',
    roleEn: 'VP of Mineral Resource Operations',
    company: 'Sino-Africa Resource Group',
    bio: 'Engenheiro de minas com vasta experiência na descarbonização industrial e logística sustentável de minerais críticos em Moçambique e Zimbábue.',
    bioEn: 'Mining engineer with broad experience in industrial decarbonization and green transport logistics for critical minerals across Southern Africa.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    nationality: 'China',
    nationalityEn: 'China',
    featured: false
  }
];

export const THE_6_CS: SectorDetail[] = [
  {
    id: 'c1',
    title: 'Carvão',
    titleEn: 'Coal',
    subtitle: 'Riqueza Mineral & Mineração',
    subtitleEn: 'Mineral Wealth & Mining',
    description: 'Riqueza mineral abundante que impulsiona a economia e a mineração na região. A bacia carbonífera de Moatize em Tete acolhe reservas de classe mundial de carvão metalúrgico e térmico, ligadas por corredores ferroviários estratégicos aos portos de Nacala e da Beira.',
    descriptionEn: 'Abundant mineral wealth that drives the economy and mining across the region. The Moatize coal basin in Tete hosts world-class metallurgical and thermal coal deposits, connected via strategic railway corridors to Nacala and Beira ports.',
    investmentOpportunities: [
      'Beneficiação de carvão, coque e subprodutos industriais',
      'Tecnologias de mineração verde, segurança e reabilitação ambiental',
      'Logística de transporte ferroviário e infraestruturas industriais'
    ],
    investmentOpportunitiesEn: [
      'Coal washing, coke processing, and industrial by-products',
      'Green mining technologies, industrial safety, and site restoration',
      'Rail transport logistics and dedicated industrial infrastructure'
    ],
    keyData: 'Bacia de Moatize (Reservas Globais)',
    keyDataEn: 'Moatize World-Class Coal Reserve',
    iconName: 'Flame',
    imageUrl: coalImg
  },
  {
    id: 'c2',
    title: 'Cahora Bassa',
    titleEn: 'Cahora Bassa',
    subtitle: 'Hidroelétrica & Energia Vital',
    subtitleEn: 'Hydropower & Vital Energy Source',
    description: 'A grande hidroelétrica e barragem no rio Zambeze, fonte de energia vital. É a maior central geradora da África Austral com 2.075 MW de capacidade instalada, estabelecendo Tete como o coração da matriz energética nacional e o polo exportador de eletricidade para toda a região SADC.',
    descriptionEn: 'The massive hydroelectric dam on the Zambezi River, a vital energy source. It is Southern Africa\'s largest power facility with 2,075 MW of installed capacity, cementing Tete as the core of Mozambique\'s energy matrix and prime electricity exporter for the SADC region.',
    investmentOpportunities: [
      'Instalação de parques solares flutuantes na albufeira de Cahora Bassa',
      'Expansão de linhas de transmissão e subestações de alta tensão',
      'Desenvolvimento de indústrias electro-intensivas e data centers sustentáveis'
    ],
    investmentOpportunitiesEn: [
      'Floating solar PV installations on the Cahora Bassa reservoir',
      'Expansion of high-voltage transmission interconnectors and substations',
      'Development of clean electro-intensive manufacturing and sustainable data centers'
    ],
    keyData: '2.075 MW de Potência Instalada',
    keyDataEn: '2,075 MW Installed Hydropower',
    iconName: 'Zap',
    imageUrl: cahoraBassaImg
  },
  {
    id: 'c3',
    title: 'Calor (ou Crocodilo)',
    titleEn: 'Calor (Heat) / Crocodilo',
    subtitle: 'Clima Radiante, Solar & Tradição Oral',
    subtitleEn: 'Radiant Climate, Solar & Zambezi Legacy',
    description: 'O clima muito quente que caracteriza a província (algumas versões tradicionais referem o crocodilo do rio Zambeze). O elevado índice de insolação anual confere a Tete um potencial extraordinário para energia solar fotovoltaica, enquanto a emblemática presença do crocodilo do Zambeze simboliza a mística, fauna e património natural da região.',
    descriptionEn: 'The high-temperature climate characterizing the province (with folklore traditions referencing the majestic Zambezi crocodile). Abundant year-round sunshine offers immense photovoltaic solar generation capacity, while the Zambezi crocodile represents the untamed biodiversity, fauna, and oral legacy of Tete.',
    investmentOpportunities: [
      'Grandes centrais solares fotovoltaicas e sistemas de armazenamento em bateria (BESS)',
      'Arquitetura bioclimática, materiais térmicos e sistemas eficientes de climatização',
      'Conservação da fauna aquática, parques zoológicos e centros de ecoturismo sustentável'
    ],
    investmentOpportunitiesEn: [
      'Utility-scale solar farms and Battery Energy Storage Systems (BESS)',
      'Bioclimatic architecture, thermal building materials, and efficient HVAC systems',
      'Aquatic wildlife preservation, conservation parks, and sustainable ecotourism'
    ],
    keyData: '+2.200 kWh/m²/ano de Radiação Solar',
    keyDataEn: '+2,200 kWh/m²/year Solar Irradiance',
    iconName: 'Sun',
    imageUrl: tchumaTchatoImg
  },
  {
    id: 'c4',
    title: 'Cabrito',
    titleEn: 'Cabrito (Tete Goat)',
    subtitle: 'Iguaria Gastronómica & Pecuária',
    subtitleEn: 'Gastronomic Delicacy & Livestock',
    description: 'Uma iguaria gastronómica muito famosa e apreciada na culinária local. O prestigiado "Cabrito de Tete" é reconhecido nacional e regionalmente pela textura tenra e sabor inconfundível, proporcionado pelas pastagens de acácias e arbustos do bioma semiárido da província.',
    descriptionEn: 'A celebrated culinary delicacy highly cherished in local gastronomy. The prestigious "Cabrito de Tete" (Tete Goat) is nationally celebrated for its tender texture and exquisite flavor, shaped by natural acacia pastures and indigenous shrubs across the province.',
    investmentOpportunities: [
      'Matadouros industriais modernos com certificação Halal e normas sanitárias ISO',
      'Centros de processamento de carnes, embalamento a vácuo e logística de cadeia de frio',
      'Promoção da Indicação Geográfica Protegida (IGP) e exportação organizada para o Médio Oriente'
    ],
    investmentOpportunitiesEn: [
      'Modern industrial Halal-certified abattoirs and ISO sanitary facilities',
      'Meat packaging plants, vacuum processing, and temperature-controlled cold chains',
      'Protected Geographical Indication (PGI) branding and structured Middle East exports'
    ],
    keyData: '+1.5M de Cabeças de Gado Caprino',
    keyDataEn: '+1.5 Million Goat Livestock Herd',
    iconName: 'UtensilsCrossed',
    imageUrl: caprinosImg
  },
  {
    id: 'c5',
    title: 'Chicoa',
    titleEn: 'Chicoa',
    subtitle: 'Peixe Seco & Região Histórica',
    subtitleEn: 'Traditional Dried Fish & Heritage',
    description: 'O peixe seco tradicional ou a região histórica ligada à identidade local. Famoso produto de conservação artesanal comercializado em todo o país e na África Austral, com raízes na histórica vila de Chicoa às margens do Zambeze, célebre pela sua herança cultural e tradicional.',
    descriptionEn: 'The traditional cured dried fish or the historic region deeply tied to local identity. A famous artisanal preserved staple traded across Mozambique and Southern Africa, originating from the historic riverside town of Chicoa along the Zambezi.',
    investmentOpportunities: [
      'Modernização de unidades de secagem solar, cura higiénica e entrepostos de pescado',
      'Embalamento comercial, certificação alimentar e distribuição para redes de retalho',
      'Projetos de valorização histórico-turística e rotas culturais da vila de Chicoa'
    ],
    investmentOpportunitiesEn: [
      'Modernization of solar fish dryers, hygienic curing units, and fisheries logistics',
      'Commercial packaging, quality certification, and formal retail supply contracts',
      'Heritage tourism development, museum curation, and cultural trails in historic Chicoa'
    ],
    keyData: 'Tradição Centenária de Cura & Comércio',
    keyDataEn: 'Centuries-Old Artisan Curing & Trade',
    iconName: 'Fish',
    imageUrl: chicoaImg
  },
  {
    id: 'c6',
    title: 'Capenta',
    titleEn: 'Capenta',
    subtitle: 'Pesca Abundante no Zambeze',
    subtitleEn: 'Abundant Zambezi Fishery',
    description: 'O pequeno peixe pescado em abundância nas águas do Zambeze e da vasta albufeira de Cahora Bassa. A pesca de capenta sustenta uma próspera indústria pesqueira noturna com frotas de candeios luminosos, sendo fonte primária de nutrição, dinamismo comercial e postos de trabalho.',
    descriptionEn: 'The nutritious small fish caught in great abundance across the waters of the Zambezi River and Lake Cahora Bassa. Capenta fishing powers a thriving nocturnal fishery with light rigs, serving as a pillar of regional protein supply, trade, and community livelihoods.',
    investmentOpportunities: [
      'Modernização de embarcações de pesca com energia solar e sistemas de refrigeração de bordo',
      'Fábricas de processamento, secagem industrial e enlatamento de capenta para exportação',
      'Investimento em projetos de aquacultura sustentável e produção de rações na bacia do Zambeze'
    ],
    investmentOpportunitiesEn: [
      'Modernization of fishing rigs with solar power and onboard cooling systems',
      'Industrial processing, rapid solar dehydration, and canning lines for export markets',
      'Sustainable aquaculture projects, hatcheries, and feed production in the Zambezi basin'
    ],
    keyData: 'Dezenas de Milhares de Toneladas / Ano',
    keyDataEn: 'Tens of Thousands of Tonnes / Year',
    iconName: 'Waves',
    imageUrl: kapentaImg
  }
];

export const AGENDA: AgendaSession[] = [
  // DAY 1 - Oct 8
  {
    id: 'd1s1',
    time: '08:30 - 09:30',
    title: 'Sessão de Abertura Oficial',
    titleEn: 'Official Opening Ceremony',
    description: 'Boas-vindas por Sua Excelência o Governador da Província de Tete, discursos ministeriais e apresentação dos objetivos estratégicos da CIIT2026.',
    descriptionEn: 'Welcome address by His Excellency the Governor of Tete Province, ministerial keynote speeches, and strategic roadmap unveiling for CIIT2026.',
    speakerIds: ['sp1'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'plenary'
  },
  {
    id: 'd1s2',
    time: '09:45 - 11:15',
    title: 'Painel Principal: O Papel de Tete na Transição Energética da África Austral',
    titleEn: 'Keynote Panel: Tete\'s Role in Southern Africa\'s Energy Transition',
    description: 'Como Cahora Bassa e novos projetos de energia solar colocarão Tete na vanguarda da geração sustentável regional.',
    descriptionEn: 'How Cahora Bassa and floating solar power developments position Tete at the forefront of green energy generation across SADC.',
    speakerIds: ['sp2', 'sp4'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'energy'
  },
  {
    id: 'd1s3',
    time: '11:30 - 13:00',
    title: 'Mineração Responsável: Descarbonização e Logística na Bacia de Moatize',
    titleEn: 'Responsible Mining: Decarbonization & Logistics in Moatize Basin',
    description: 'Estratégias de investimento para otimização da logística ferroviária e portuária e adoção de tecnologias limpas na exploração mineral.',
    descriptionEn: 'Investment strategies for greening railway/port logistics corridors and applying clean tech to mineral processing.',
    speakerIds: ['sp6', 'sp5'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'mining'
  },
  {
    id: 'd1s4',
    time: '13:00 - 14:30',
    title: 'Almoço Executivo de Networking',
    titleEn: 'Executive Networking Luncheon',
    description: 'Almoço privado com investidores, delegações internacionais e decisores políticos.',
    descriptionEn: 'Private networking lunch connecting institutional investors, international delegates, and high-level policymakers.',
    speakerIds: [],
    location: 'Terraço dos Baobás',
    locationEn: 'Baobab Terrace',
    category: 'networking'
  },
  {
    id: 'd1s5',
    time: '14:45 - 16:30',
    title: 'Mesa Redonda: Estruturação de Financiamentos para Grandes Infraestruturas',
    titleEn: 'Roundtable: Infrastructure Project Financing & Blended Capital',
    description: 'Parcerias público-privadas e captação de fundos multilaterais para estradas, pontes e redes de telecomunicação na província.',
    descriptionEn: 'Public-Private Partnerships (PPPs) and multilateral funding structures for roads, bridges, and regional telecom grids.',
    speakerIds: ['sp3', 'sp4'],
    location: 'Sala de Conferências VIP',
    locationEn: 'VIP Conference Suite',
    category: 'infrastructure'
  },

  // DAY 2 - Oct 9
  {
    id: 'd2s1',
    time: '09:00 - 10:30',
    title: 'Agronegócio Sustentável: Industrialização dos Citrinos e Pecuária de Tete',
    titleEn: 'Sustainable Agribusiness: Citrus Industrialization & Livestock Export',
    description: 'Oportunidades de agregação de valor local na carne do "Cabrito de Tete" (Indicação Geográfica) e no estabelecimento de explorações de citrinos voltadas para a exportação.',
    descriptionEn: 'Unlocking value addition in protected "Tete Goat" meat exports and establishing export-oriented citrus farms.',
    speakerIds: ['sp5'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'agriculture'
  },
  {
    id: 'd2s2',
    time: '10:45 - 12:30',
    title: 'Sessão B2B: Matchmaking de Investimento Direto Estrangeiro',
    titleEn: 'B2B Session: Foreign Direct Investment Matchmaking',
    description: 'Sessões pré-agendadas de 1-on-1 entre detentores de projetos locais e capitalistas de risco globais.',
    descriptionEn: 'Pre-arranged 1-on-1 executive dealmaking meetings between project sponsors and global venture funds.',
    speakerIds: ['sp3', 'sp1'],
    location: 'Sala Executiva Tete Plaza',
    locationEn: 'Tete Plaza Executive Suite',
    category: 'networking'
  },
  {
    id: 'd2s3',
    time: '14:00 - 15:30',
    title: 'Desenvolvimento Industrial e Zonas Económicas Especiais',
    titleEn: 'Industrial Zones & Special Economic Zone (SEZ) Incentives',
    description: 'Incentivos fiscais, facilidades alfandegárias e infraestrutura logística no corredor de desenvolvimento de Tete.',
    descriptionEn: 'Tax holidays, customs duty exemptions, and logistics facilities in Tete\'s Special Economic Zones.',
    speakerIds: ['sp4', 'sp6'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'infrastructure'
  },
  {
    id: 'd2s4',
    time: '16:00 - 18:00',
    title: 'Cocktail de Gala e Apresentação Cultural',
    titleEn: 'Gala Dinner & Cultural Showcase',
    description: 'Celebração da cultura de Tete com degustação de gastronomia local premium (Cabrito de Tete preparado por chefs de renome) e danças tradicionais.',
    descriptionEn: 'Celebration of Tete culture with tasting of gourmet Tete Goat dishes prepared by top chefs alongside live traditional performances.',
    speakerIds: [],
    location: 'Jardins Fluviais do Zambeze',
    locationEn: 'Zambezi Riverside Gardens',
    category: 'networking'
  },

  // DAY 3 - Oct 10
  {
    id: 'd3s1',
    time: '09:30 - 11:30',
    title: 'Fórum de Jovens Empreendedores e Inovação Local',
    titleEn: 'Youth Entrepreneurship & Local Innovation Forum',
    description: 'Apresentação de startups moçambicanas focadas em soluções agro-tech, fintech e energia solar residencial.',
    descriptionEn: 'Pitching session for innovative Mozambican startups focusing on ag-tech, fintech, and off-grid solar solutions.',
    speakerIds: ['sp5', 'sp2'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'plenary'
  },
  {
    id: 'd3s2',
    time: '11:45 - 13:00',
    title: 'Assinatura de Memorandos de Entendimento (MoU) e Encerramento',
    titleEn: 'MoU Signing Ceremony & Official Closing Statements',
    description: 'Formalização de acordos bilaterais de investimento facilitados durante a conferência e leitura do Comunicado Final de Tete.',
    descriptionEn: 'Formal signing of bilateral investment agreements brokered during the summit and reading of the Official Tete Declaration.',
    speakerIds: ['sp1', 'sp3'],
    location: 'Grande Auditório Zambeze',
    locationEn: 'Grand Zambezi Auditorium',
    category: 'plenary'
  }
];

export const HOTELS: HotelRecommendation[] = [
  {
    name: 'VIP Executive Tete Hotel',
    stars: 4,
    description: 'O hotel de eleição para viajantes de negócios na cidade de Tete. Oferece quartos confortáveis, um centro de conferências totalmente equipado, uma piscina exterior relaxante e um restaurante de alta cozinha internacional.',
    descriptionEn: 'The premier corporate choice in Tete City. Features well-appointed executive suites, a fully equipped conference center, outdoor swimming pool, and fine international dining.',
    address: 'Av. da Liberdade, Tete, Moçambique',
    addressEn: 'Liberdade Avenue, Tete, Mozambique',
    phone: '+258 25 224 800',
    website: 'https://www.viphotels.com',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Baobá Hotel Tete',
    stars: 4,
    description: 'Localizado ao longo das margens cénicas do majestoso Rio Zambeze, rodeado por baobás icónicos. Excelente para relaxar após reuniões executivas intensas, com uma excelente vista sobre a ponte suspensa de Tete.',
    descriptionEn: 'Nestled along the scenic banks of the majestic Zambezi River among ancient baobab trees. Ideal for post-meeting relaxation with sweeping views of the Tete suspension bridge.',
    address: 'Estrada Nacional N7, Tete, Moçambique',
    addressEn: 'National Highway N7, Tete, Mozambique',
    phone: '+258 84 311 0122',
    website: '#',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Hotel Zambeze',
    stars: 3,
    description: 'Um hotel moderno no centro financeiro de Tete, oferecendo acomodações executivas práticas, serviço de transfer gratuito do aeroporto de Tete (TET) e excelente wi-fi corporativo.',
    descriptionEn: 'A modern business hotel in Tete\'s commercial center, offering convenient executive lodging, complimentary Tete Airport (TET) transfers, and high-speed fiber internet.',
    address: 'Rua de Angola, Cidade de Tete',
    addressEn: 'Angola Street, Tete City, Mozambique',
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
    navProfile: 'Perfil de Tete',
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
    navProfile: 'Tete Profile',
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
