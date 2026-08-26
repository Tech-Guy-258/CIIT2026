/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Speaker, AgendaSession, SectorDetail, HotelRecommendation, Registration, InstitutionalPartner, GalleryItem } from './types';

import cahoraBassaImg from './assets/images/Cahora Bassa.jpg';
import coalImg from './assets/images/moatize_coal_minerals_1784807272754.jpg';
import caprinosImg from './assets/images/tete_caprinos_goats_1784807286233.jpg';
import tchumaTchatoImg from './assets/images/Area_de_Conservacao_Tchuma_Tchato.jpg';
import chicoaImg from './assets/images/Chicoa (2).jpg';
import kapentaImg from './assets/images/KAPENTA.jpg';
import PRImg from './assets/images/PR_Daniel_Francisco_Chapo.png';
import MEFImg from './assets/images/MEF_Basilio_Muhate_.jpg';
import GPTImg from './assets/images/GPT_Domingo_Viola.jpg';
import PCMTImg from './assets/images/PCMT_Cesar_Carvalho.jpg';
import SEPTImg from './assets/images/SEPT_CRISTINA_MAFUMO.jpg';
import PCTAImg from './assets/images/PCTA_Alvaro.massingue.jpg';
import hcbLogoImg from './assets/images/HCB.jpg';
import ponteKassuendeImg from './assets/images/Ponte_Kassuende.jpg';
import ponteSamoraImg from './assets/images/ponte samora machel em tete.jpg';
import ponteDonaAnaImg from './assets/images/Ponte dona ana.jpg';
import brmImg from './assets/images/BRM.jpg';
import abcbImg from './assets/images/ABCB.jpg';
import damWideImg from './assets/images/cahora_bassa_dam_1784807259669.jpg';
import lakeImg from './assets/images/cahora_bassa_lake_1784808062238.jpg';

// Official Photographic Gallery from CIIT LANÇAMENTO
import ciitGalAlvaro1 from './assets/images/CIIT LANÇAMENTO/Alvaro Massingue 1.jpeg';
import ciitGalAlvaro2 from './assets/images/CIIT LANÇAMENTO/Alvaro Massingue 2.jpeg';
import ciitGalAlvaro3 from './assets/images/CIIT LANÇAMENTO/Alvaro Massingue 3.jpeg';
import ciitGalBasilio from './assets/images/CIIT LANÇAMENTO/Basílio Muhate.jpeg';
import ciitGalBasilio1 from './assets/images/CIIT LANÇAMENTO/Basílio Muhate1.jpeg';
import ciitGalCristina from './assets/images/CIIT LANÇAMENTO/Cristina Muchanga.jpeg';
import ciitGalDomingos from './assets/images/CIIT LANÇAMENTO/Domingos Viola.jpeg';
import ciitGalGovernorSpeech from './assets/images/CIIT LANÇAMENTO/gallery_governor_speech_1787582265650.jpeg';
import ciitGalIntlDelegates from './assets/images/CIIT LANÇAMENTO/gallery_international_delegates_1787582303946.jpeg';
import ciitGalPanelVip from './assets/images/CIIT LANÇAMENTO/gallery_panel_vip_1787582288582.jpeg';
import ciitGalPlenaryAudience from './assets/images/CIIT LANÇAMENTO/gallery_plenary_audience_1787582252434.jpeg';
import ciitGalPlenaryWide from './assets/images/CIIT LANÇAMENTO/gallery_plenary_wide_1787582222862.jpeg';
import ciitGalWa1 from './assets/images/CIIT LANÇAMENTO/WhatsApp Image 2026-08-24 at 10.47.01.jpeg';
import ciitGalWa2 from './assets/images/CIIT LANÇAMENTO/WhatsApp Image 2026-08-24 at 10.47.02 (2).jpeg';
import ciitGalWa3_1 from './assets/images/CIIT LANÇAMENTO/WhatsApp Image 2026-08-24 at 10.47.03 (1).jpeg';
import ciitGalWa3 from './assets/images/CIIT LANÇAMENTO/WhatsApp Image 2026-08-24 at 10.47.03.jpeg';
import ciitGalWa4_1 from './assets/images/CIIT LANÇAMENTO/WhatsApp Image 2026-08-24 at 10.47.04 (1).jpeg';
import ciitGalWa9_2 from './assets/images/CIIT LANÇAMENTO/WhatsApp Image 2026-08-24 at 10.47.09 (2).jpeg';

export const SPEAKERS: Speaker[] = [
  {
    id: 'sp1',
    name: 'Daniel Francisco Chapo',
    role: 'Presidente da República de Moçambique',
    roleEn: 'President of the Republic of Mozambique',
    company: 'Presidência da República de Moçambique',
    institution: 'Presidência da República de Moçambique',
    institutionEn: 'Presidency of the Republic of Mozambique',
    bio: 'Daniel Francisco Chapo é o atual Presidente da República de Moçambique, tendo assumido o cargo a 15 de janeiro de 2025. É jurista, advogado, docente universitário e político moçambicano, com uma distinta carreira na administração pública e na liderança governativa provincial e nacional.',
    bioEn: 'Daniel Francisco Chapo is the President of the Republic of Mozambique, having assumed office on January 15, 2025. He is a jurist, attorney, university lecturer, and Mozambican statesman with an accomplished career in public administration and executive governance.',
    imageUrl: PRImg,
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true,
    education: [
      'Licenciatura em Direito pela Faculdade de Direito da Universidade Eduardo Mondlane (UEM), Maputo (2000–2004)',
      'Mestrado em Gestão do Desenvolvimento pela Universidade Católica de Moçambique (UCM) (2013–2014)',
      'Curso de Formação de Conservadores e Notários pelo Centro de Formação Jurídica e Judiciária (CFJJ) (2004)'
    ],
    educationEn: [
      'Bachelor of Laws (LL.B.) from the Faculty of Law, Eduardo Mondlane University (UEM), Maputo (2000–2004)',
      'Master of Science (M.Sc.) in Development Management from Catholic University of Mozambique (UCM) (2013–2014)',
      'Postgraduate Notary & Legal Training from the Legal and Judicial Training Center (CFJJ) (2004)'
    ],
    previousRoles: [
      'Governador da Província de Inhambane (2016–2024)',
      'Administrador do Distrito de Palma, Província de Cabo Delgado (2015–2016)',
      'Administrador do Distrito de Nacala-a-Velha, Província de Nampula (2009–2015)',
      'Conservador dos Registos e Notário da Cidade de Nacala-Porto (2005–2009)',
      'Docente Universitário de Direito Constitucional e Ciência Política na Universidade Pedagógica (Nampula)'
    ],
    previousRolesEn: [
      'Governor of Inhambane Province (2016–2024)',
      'District Administrator of Palma, Cabo Delgado Province (2015–2016)',
      'District Administrator of Nacala-a-Velha, Nampula Province (2009–2015)',
      'Registrar and Public Notary for the City of Nacala-Porto (2005–2009)',
      'University Lecturer of Constitutional Law and Political Science at Pedagogical University (Nampula)'
    ],
    experience: [
      'Liderança e condução de políticas de desenvolvimento socioeconómico sustentável e atração de investimento direto estrangeiro.',
      'Gestão territorial e coordenação de grandes projetos de infraestruturas, energia e turismo costeiro em Moçambique.',
      'Diálogo institucional e promoção da coesão e pacificação nacional e cooperação regional no âmbito da SADC e CPLP.'
    ],
    experienceEn: [
      'Executive leadership in sustainable socio-economic development policies and foreign direct investment attraction.',
      'Territorial governance and steering large-scale infrastructure, energy, and ecotourism megaprojects across Mozambique.',
      'High-level institutional diplomacy, regional cooperation within SADC and CPLP, and national economic modernization.'
    ],
    keyTopics: [
      'Abertura Oficial da CIIT 2026',
      'Visão Estratégica Nacional de Investimentos',
      'Industrialização e Transição Energética Sustentável'
    ],
    keyTopicsEn: [
      'Official Opening Keynote CIIT 2026',
      'National Strategic Investment Vision',
      'Industrialization and Sustainable Energy Transition'
    ]
  },
  {
    id: 'sp2',
    name: 'Basílio Zefanias Muhate',
    role: 'Ministro da Economia',
    roleEn: 'Minister of Economy',
    company: 'Ministério da Economia',
    institution: 'Ministério da Economia / Governo de Moçambique',
    institutionEn: 'Ministry of Economy / Government of Mozambique',
    bio: 'Economista e dirigente governamental moçambicano, nascido em 1979 em Chimoio. Possui sólida trajetória nos sectores económico, financeiro, bancário e empresarial do país. Foi nomeado Ministro da Economia em janeiro de 2025, liderando as políticas de crescimento, atração de capitais e competitividade empresarial.',
    bioEn: 'Mozambican economist and cabinet official, born in 1979 in Chimoio. He possesses a distinguished record across Mozambique\'s economic, financial, banking, and corporate sectors. Appointed Minister of Economy in January 2025, overseeing national growth and competitiveness.',
    imageUrl: MEFImg,
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true,
    education: [
      'Licenciatura em Economia pela Faculdade de Economia da Universidade Eduardo Mondlane (UEM)',
      'Especialização em Gestão Financeira, Análise Macroeconómica e Políticas de Desenvolvimento'
    ],
    educationEn: [
      'Bachelor of Science (B.Sc.) in Economics from Eduardo Mondlane University (UEM)',
      'Specialization in Financial Management, Macroeconomic Analysis, and Development Policies'
    ],
    previousRoles: [
      'Presidente do Conselho de Administração da Empresa Nacional de Parques de Ciência e Tecnologia (ENPCT)',
      'Quadros Executivos e Técnicos no sector financeiro e bancário moçambicano (incluindo Banco de Moçambique)',
      'Secretário-Geral da Organização da Juventude Moçambicana (OJM)',
      'Consultor e analista de projetos económicos e parcerias empresariais público-privadas'
    ],
    previousRolesEn: [
      'Chairman of the Board at the National Science and Technology Parks Company (ENPCT)',
      'Executive and Advisory roles across the Mozambican banking and financial sectors (including Bank of Mozambique)',
      'Secretary-General of the Mozambican Youth Organization (OJM)',
      'Senior advisor on macroeconomic policies and public-private business partnerships'
    ],
    experience: [
      'Desenho de reformas estruturais para estímulo do ambiente de negócios e atração de capitais privados.',
      'Planeamento económico, diversificação produtiva e promoção do investimento industrial e tecnológico.',
      'Supervisão da integração das cadeias de valor nacionais nos megaprojetos energéticos e mineiros.'
    ],
    experienceEn: [
      'Design of structural economic reforms to enhance ease of doing business and mobilize private capital.',
      'Macroeconomic planning, production diversification, and industrial innovation promotion.',
      'Supervising local content integration within national energy and mining megaprojects.'
    ],
    keyTopics: [
      'Políticas Económicas para o Crescimento e Competitividade',
      'Incentivos Fiscais e Financiamento Estruturado',
      'Ambiente de Negócios e Parcerias Público-Privadas'
    ],
    keyTopicsEn: [
      'Economic Policies for Growth and Competitiveness',
      'Fiscal Incentives and Structured Project Financing',
      'Business Climate and Public-Private Partnerships'
    ]
  },
  {
    id: 'sp3',
    name: 'Domingos Juliasse Viola',
    role: 'Governador da Província de Tete',
    roleEn: 'Governor of Tete Province',
    company: 'Governo da Província de Tete',
    institution: 'Governo da Província de Tete',
    institutionEn: 'Government of Tete Province',
    bio: 'Domingos Juliasse Viola é o Governador da Província de Tete, responsável pela condução do executivo provincial descentralizado. Lidera a coordenação estratégica das políticas de desenvolvimento socioeconómico, infraestruturas e aproveitamento dos recursos energéticos, minerais e agropecuários da província.',
    bioEn: 'Domingos Juliasse Viola is the Governor of Tete Province, heading the provincial executive administration. He oversees regional socio-economic development, infrastructure modernization, and sustainable exploitation of Tete\'s vast mineral, energy, and agricultural potential.',
    imageUrl: GPTImg,
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true,
    education: [
      'Formação Superior em Gestão Pública, Planeamento Comunitário e Desenvolvimento Regional',
      'Especialização em Administração Territorial e Governação Local'
    ],
    educationEn: [
      'Higher Education in Public Governance, Community Planning, and Regional Development',
      'Advanced Specialization in Territorial Administration and Local Government'
    ],
    previousRoles: [
      'Administrador do Distrito de Doa, Província de Tete',
      'Administrador do Distrito de Cahora Bassa, Província de Tete',
      'Dirigente em diversos escalões da administração pública e coordenação distrital em Tete'
    ],
    previousRolesEn: [
      'District Administrator of Doa, Tete Province',
      'District Administrator of Cahora Bassa, Tete Province',
      'Executive administrative officer in provincial territorial administration across Tete'
    ],
    experience: [
      'Coordenação governativa provincial e promoção da província de Tete como polo energético e mineiro da África Austral.',
      'Implementação do plano de valorização dos "6C\'s de Tete" (Carvão, Cahora Bassa, Calor, Cabrito, Chicoa e Capenta).',
      'Diálogo contínuo com as comunidades locais, sector privado e operadores de megaprojetos.'
    ],
    experienceEn: [
      'Provincial governance and championing Tete as the premier energy and mining powerhouse of Southern Africa.',
      'Spearheading the strategic promotion of Tete\'s "6 Cs" (Coal, Cahora Bassa, Sun/Crocodile, Goat, Chicoa, and Capenta).',
      'Sustained engagement with local communities, private enterprise, and megaproject concessionaires.'
    ],
    keyTopics: [
      'Tete como Corredor de Desenvolvimento e Energia',
      'Infraestruturas Estratégicas e Conectividade Regional',
      'Oportunidades de Investimento nos 6C\'s de Tete'
    ],
    keyTopicsEn: [
      'Tete as a Regional Corridor for Development & Power',
      'Strategic Infrastructure and SADC Connectivity',
      'Investment Opportunities across Tete\'s 6 Cs'
    ]
  },
  {
    id: 'sp4',
    name: 'Cristina de Jesus Xavier Mafumo',
    role: 'Secretária de Estado na Província de Tete',
    roleEn: 'Secretary of State in Tete Province',
    company: 'Governo da Província de Tete',
    institution: 'Governo da Província de Tete / Representação do Estado',
    institutionEn: 'Government of Tete Province / State Representation',
    bio: 'Dirigente e gestora pública moçambicana com extensa experiência na governação territorial e administração pública. Exerce o cargo de Secretária de Estado na Província de Tete, representando o Governo Central e assegurando a articulação dos serviços descentralizados e a eficácia das políticas públicas na província.',
    bioEn: 'Mozambican executive and public manager with extensive governance experience. She serves as Secretary of State in Tete Province, representing the Central Government and ensuring seamless operational efficiency of public services and state programs.',
    imageUrl: SEPTImg,
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true,
    education: [
      'Formação Superior em Gestão Pública, Ciências Sociais e Administração do Estado',
      'Cursos de Alta Direção em Políticas Públicas e Gestão Territorial'
    ],
    educationEn: [
      'Higher Education in Public Management, Social Sciences, and State Administration',
      'Executive Leadership Programs in Public Policy and Territorial Governance'
    ],
    previousRoles: [
      'Secretária de Estado na Província da Zambézia (2023–2025)',
      'Administradora Distrital em diversos distritos da República de Moçambique',
      'Responsável de programas governamentais de desenvolvimento comunitário e serviços sociais'
    ],
    previousRolesEn: [
      'Secretary of State in Zambézia Province (2023–2025)',
      'District Administrator in multiple districts across the Republic of Mozambique',
      'Director of state community development, public service, and social welfare programs'
    ],
    experience: [
      'Supervisão dos serviços de representação do Estado, garantia da segurança institucional e coordenação intersectorial.',
      'Modernização da prestação de serviços públicos, simplificação administrativa e apoio ao investimento estruturante.',
      'Gestão de crises territoriais, resiliência climática e inclusão socioeconómica das populações rurais e urbanas.'
    ],
    experienceEn: [
      'Supervision of central state representation, institutional security, and inter-sectoral alignment.',
      'Modernizing public service delivery, bureaucratic simplification, and enabling structured private investment.',
      'Territorial resilience, climate adaptation programs, and socio-economic integration in the Zambezi basin.'
    ],
    keyTopics: [
      'Desenvolvimento Territorial e Governação Pública',
      'Melhoria da Prestação de Serviços Públicos',
      'Articulação Institucional para o Investimento Seguro'
    ],
    keyTopicsEn: [
      'Territorial Development and Public Governance',
      'Public Service Delivery Modernization',
      'Institutional Coordination for Secure Investment'
    ]
  },
  {
    id: 'sp5',
    name: 'César de Carvalho',
    role: 'Presidente do Conselho Municipal da Cidade de Tete',
    roleEn: 'Mayor of the City of Tete',
    company: 'Conselho Municipal da Cidade de Tete',
    institution: 'Conselho Municipal da Cidade de Tete',
    institutionEn: 'Municipal Council of the City of Tete',
    bio: 'César de Carvalho é o Presidente do Conselho Municipal da Cidade de Tete (Edil de Tete). Lidera a administração municipal da capital provincial, focando-se na requalificação urbana, expansão das infraestruturas de saneamento e vias de acesso, e na dinamização do ambiente urbano para acolhimento de empresas e conferências.',
    bioEn: 'César de Carvalho is the Mayor of the City of Tete. He leads the municipal governance of the provincial capital, prioritizing urban modernization, access road paving, sanitation infrastructure, and positioning Tete as a prime hub for commerce and summits.',
    imageUrl: PCMTImg,
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true,
    education: [
      'Formação Superior em Gestão, Engenharia e Administração Autárquica',
      'Especialização em Planeamento Urbano e Gestão de Serviços Municipais'
    ],
    educationEn: [
      'Higher Education in Management, Engineering, and Municipal Administration',
      'Specialization in Urban Spatial Planning and Municipal Utility Management'
    ],
    previousRoles: [
      'Gestor e técnico sénior em instituições públicas e comissões municipais de Tete',
      'Coordenador de projetos de infraestruturas urbanas e requalificação viária na Cidade de Tete',
      'Dirigente de iniciativas de dinamização económica local e ordenamento do território'
    ],
    previousRolesEn: [
      'Senior executive in public utility authorities and municipal commissions of Tete',
      'Coordinator of urban infrastructure, road paving, and city drainage masterplans',
      'Leader of local economic development initiatives and municipal land management'
    ],
    experience: [
      'Gestão executiva da Cidade de Tete, planeamento de expansão urbana e requalificação das margens do Zambeze.',
      'Melhoria das vias de acesso, mobilidade urbana, recolha de resíduos e saneamento integrado.',
      'Parcerias com operadores privados nos sectores da hotelaria, comércio, logística urbana e habitação.'
    ],
    experienceEn: [
      'Executive governance of Tete City, urban spatial expansion, and Zambezi riverbank revitalisation.',
      'Enhancing city roads, urban mobility corridors, solid waste management, and municipal water sanitation.',
      'Facilitating private sector partnerships in hospitality, retail, urban logistics, and housing.'
    ],
    keyTopics: [
      'Desenvolvimento Urbano e Oportunidades na Cidade de Tete',
      'Infraestruturas Municipais, Saneamento e Vias de Acesso',
      'Atrair Investimento para o Comércio, Hotelaria e Serviços Urbanos'
    ],
    keyTopicsEn: [
      'Urban Development and Opportunities in Tete City',
      'Municipal Infrastructure, Sanitation, and Road Access',
      'Mobilizing Investment in Hospitality, Commerce, and Urban Services'
    ]
  },
  {
    id: 'sp6',
    name: 'Álvaro Massingue',
    role: 'Presidente da CTA',
    roleEn: 'President of the CTA',
    company: 'Confederação das Associações Económicas de Moçambique (CTA)',
    institution: 'Confederação das Associações Económicas de Moçambique (CTA)',
    institutionEn: 'Confederation of Economic Associations of Mozambique (CTA)',
    bio: 'Empresário moçambicano de destacada liderança no sector privado nacional. Foi Presidente da Câmara de Comércio de Moçambique (CCM) e, em maio de 2025, foi eleito Presidente da CTA, assumindo a liderança da principal confederação empresarial de Moçambique e parceiro oficial do diálogo público-privado com o Governo.',
    bioEn: 'Prominent Mozambican business leader and corporate executive. He served as President of the Mozambique Chamber of Commerce (CCM) and was elected President of the CTA in May 2025, leading Mozambique\'s primary private sector confederation in dialogue with the Government.',
    imageUrl: PCTAImg,
    nationality: 'Moçambique',
    nationalityEn: 'Mozambique',
    featured: true,
    education: [
      'Formação Superior em Gestão de Empresas e Economia',
      'Especialização em Comércio Internacional, Liderança Associativa e Negociação Corporativa'
    ],
    educationEn: [
      'Higher Education in Business Administration and Economics',
      'Specialization in International Trade, Corporate Governance, and Association Leadership'
    ],
    previousRoles: [
      'Presidente da Câmara de Comércio de Moçambique (CCM)',
      'Membro do Conselho Diretivo da CTA e líder de associações empresariais sectoriais',
      'Fundador e administrador de empresas nos sectores do comércio, logística e serviços industriais'
    ],
    previousRolesEn: [
      'President of the Mozambique Chamber of Commerce (CCM)',
      'Board Member of CTA and head of industrial business councils',
      'Founder and Managing Director of commercial trading, logistics, and industrial service enterprises'
    ],
    experience: [
      'Liderança do diálogo público-privado nacional através da CASP (Conferência Anual do Sector Privado).',
      'Promoção de políticas de Conteúdo Local e capacitação de PMEs moçambicanas nas cadeias de megaprojetos.',
      'Internacionalização de empresas moçambicanas e atração de parcerias e investimento direto estrangeiro.'
    ],
    experienceEn: [
      'Steering the national public-private dialogue through CASP (Annual Private Sector Conference).',
      'Championing Local Content policies and empowering Mozambican SMEs across megaproject supply chains.',
      'Internationalization of Mozambican enterprises, cross-border trade facilitation, and FDI matchmaking.'
    ],
    keyTopics: [
      'O Papel do Sector Privado na Aceleração do Investimento',
      'Integração de PMEs Locais nas Cadeias de Megaprojetos',
      'Ambiente de Negócios e Competitividade Nacional'
    ],
    keyTopicsEn: [
      'Private Sector as a Catalyst for Investment and Growth',
      'Integrating Local SMEs into Megaproject Supply Chains',
      'Business Climate and National Competitiveness'
    ]
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

// PROGRAMA OFICIAL - TODOS OS EVENTOS DECORREM NA SALA: "PLENÁRIA"
export const AGENDA: AgendaSession[] = [
  // DAY 1 - Oct 8
  {
    id: 'd1s1',
    time: '08:00 – 09:00',
    activity: 'Credenciamento e Recepção dos Participantes',
    activityEn: 'Accreditation & Delegate Reception',
    title: 'Credenciamento, Boas-Vindas e Acolhimento dos Participantes',
    titleEn: 'Delegate Accreditation and Registration Welcome',
    description: 'Recepção de altas entidades, delegações internacionais, investidores e participantes credenciados. Entrega das pastas do conferencista e café de boas-vindas.',
    descriptionEn: 'Reception of dignitaries, international delegations, investors, and registered delegates. Delivery of conference kits and welcome coffee.',
    speakerIds: [],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },
  {
    id: 'd1s2',
    time: '09:00 – 09:30',
    activity: 'Abertura Oficial da Conferência',
    activityEn: 'Official Summit Opening Ceremony',
    title: 'Abertura Oficial da CIIT 2026 por Sua Excelência o Presidente da República',
    titleEn: 'Official Opening of CIIT 2026 by H.E. The President of the Republic',
    theme: 'A visão de Moçambique para o desenvolvimento económico sustentável, investimento e transformação nacional',
    themeEn: 'Mozambique\'s vision for sustainable economic development, investment, and national transformation',
    description: 'Discurso Solene de Abertura proferido por Sua Excelência Daniel Francisco Chapo, Presidente da República de Moçambique, delineando a estratégia de atração de capitais e modernização económica nacional.',
    descriptionEn: 'Keynote opening address by H.E. Daniel Francisco Chapo, President of the Republic of Mozambique, outlining the national strategy for capital mobilization and structural transformation.',
    speakerIds: ['sp1'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },
  {
    id: 'd1s3',
    time: '09:30 – 10:15',
    activity: 'Sessão Temática Provincial',
    activityEn: 'Provincial Keynote Session',
    title: 'Tete no Centro da Estratégia de Desenvolvimento Regional',
    titleEn: 'Tete at the Core of Regional Development Strategy',
    theme: 'Tete como corredor de desenvolvimento: oportunidades, infraestruturas e investimento',
    themeEn: 'Tete as a development corridor: opportunities, infrastructure, and investment',
    description: 'Apresentação detalhada por Sua Excelência Domingos Juliasse Viola, Governador da Província de Tete, evidenciando os pilares estratégicos de crescimento, projetos estruturantes e a riqueza dos 6C\'s.',
    descriptionEn: 'Presentation by H.E. Domingos Juliasse Viola, Governor of Tete Province, highlighting strategic growth pillars, critical infrastructure, and Tete\'s 6 Cs value chains.',
    speakerIds: ['sp3'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'infrastructure',
    isPreliminary: true
  },
  {
    id: 'd1s4',
    time: '10:15 – 11:00',
    activity: 'Sessão Temática Ministerial',
    activityEn: 'Ministerial Keynote Session',
    title: 'Políticas Macroeconómicas, Competitividade e Clima de Negócios',
    titleEn: 'Macroeconomic Policies, Competitiveness, and Business Climate',
    theme: 'Políticas económicas para o crescimento, investimento e competitividade de Moçambique',
    themeEn: 'Economic policies for growth, investment, and competitiveness of Mozambique',
    description: 'Intervenção de Sua Excelência Basílio Zefanias Muhate, Ministro da Economia, sobre reformas fiscais, instrumentos de financiamento, promoção do IDE e sustentabilidade macroeconómica.',
    descriptionEn: 'Address by H.E. Basílio Zefanias Muhate, Minister of Economy, discussing fiscal reforms, blended financing instruments, FDI promotion, and macroeconomic stability.',
    speakerIds: ['sp2'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'economy',
    isPreliminary: true
  },
  {
    id: 'd1s5',
    time: '11:00 – 11:30',
    activity: 'Intervalo para Café & Networking',
    activityEn: 'Coffee Break & Executive Networking',
    title: 'Pausa para Café e Networking Institucional',
    titleEn: 'Coffee Break & Institutional Networking',
    description: 'Momento de interação e intercâmbio direto entre delegações ministeriais, diplomatas, investidores e participantes.',
    descriptionEn: 'Interactive networking session connecting ministerial delegations, diplomats, investors, and business leaders.',
    speakerIds: [],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'networking',
    isPreliminary: true
  },
  {
    id: 'd1s6',
    time: '11:30 – 12:15',
    activity: 'Sessão Temática de Governação Territorial',
    activityEn: 'Territorial Governance Session',
    title: 'Governação Territorial, Serviços Públicos e Coesão Social em Tete',
    titleEn: 'Territorial Governance, Public Services, and Social Cohesion in Tete',
    theme: 'Desenvolvimento territorial, governação e melhoria dos serviços públicos na Província de Tete',
    themeEn: 'Territorial development, governance, and public service improvement in Tete Province',
    description: 'Apresentação de Sua Excelência Cristina de Jesus Xavier Mafumo, Secretária de Estado na Província de Tete, sobre a articulação do Estado central, infraestruturas sociais e segurança institucional.',
    descriptionEn: 'Presentation by H.E. Cristina de Jesus Xavier Mafumo, Secretary of State in Tete Province, on state service alignment, social infrastructure, and regulatory certainty.',
    speakerIds: ['sp4'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },
  {
    id: 'd1s7',
    time: '12:15 – 13:00',
    activity: 'Sessão Temática Municipal',
    activityEn: 'Municipal Development Session',
    title: 'Planeamento Urbano e Oportunidades na Capital Provincial',
    titleEn: 'Urban Planning and Opportunities in the Provincial Capital',
    theme: 'Desenvolvimento urbano e oportunidades de investimento na Cidade de Tete',
    themeEn: 'Urban development and investment opportunities in the City of Tete',
    description: 'Apresentação pelo Engenheiro César de Carvalho, Presidente do Conselho Municipal da Cidade de Tete, sobre requalificação urbana, vias de comunicação, saneamento e parcerias imobiliárias e comerciais.',
    descriptionEn: 'Presentation by Mayor César de Carvalho on urban renewal, road connectivity, water and sanitation systems, and private municipal partnerships.',
    speakerIds: ['sp5'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'infrastructure',
    isPreliminary: true
  },
  {
    id: 'd1s8',
    time: '13:00 – 14:30',
    activity: 'Almoço Oficial da Conferência',
    activityEn: 'Official Conference Luncheon',
    title: 'Almoço Oficial & Degustação Gastronómica dos 6C\'s',
    titleEn: 'Official Summit Luncheon & Gastronomic Showcase',
    description: 'Almoço oficial oferecido a todos os delegados com destaque para a gastronomia local (Cabrito de Tete e peixe do Zambeze).',
    descriptionEn: 'Official luncheon for delegates featuring regional gastronomy (Tete Goat and fresh Zambezi fish specialties).',
    speakerIds: [],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'networking',
    isPreliminary: true
  },
  {
    id: 'd1s9',
    time: '14:30 – 15:30',
    activity: 'Sessão Temática do Sector Privado',
    activityEn: 'Private Sector Keynote Session',
    title: 'O Sector Privado como Catalisador do Investimento e Competitividade',
    titleEn: 'The Private Sector as a Catalyst for Investment and Competitiveness',
    theme: 'O papel do sector privado na aceleração do investimento e crescimento económico de Moçambique',
    themeEn: 'The role of the private sector in accelerating investment and economic growth in Mozambique',
    description: 'Intervenção do Presidente Álvaro Massingue, Presidente da CTA, analisando o papel das empresas nacionais, conteúdo local, ligação às cadeias de megaprojetos e financiamento corporativo.',
    descriptionEn: 'Keynote by President Álvaro Massingue, head of CTA, exploring local enterprise empowerment, domestic content, supply chain integration, and private equity.',
    speakerIds: ['sp6'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'economy',
    isPreliminary: true
  },
  {
    id: 'd1s10',
    time: '15:30 – 17:00',
    activity: 'Painel Plenário de Alto Nível & Debate com Investidores',
    activityEn: 'High-Level Plenary Panel & Investor Q&A',
    title: 'Mesa Redonda: Sinergias entre Governo, Setor Privado e Grandes Projetos',
    titleEn: 'High-Level Roundtable: Synergies between Government, Private Sector & Megaprojects',
    theme: 'Construindo pontes sólidas para a materialização de parcerias de investimento de longo prazo no Vale do Zambeze',
    themeEn: 'Building robust bridges for long-term investment partnerships in the Zambezi Valley',
    description: 'Painel conjunto e sessão de perguntas e respostas com investidores nacionais e internacionais, com a participação dos membros da mesa plenária.',
    descriptionEn: 'Interactive plenary panel and Q&A session uniting government dignitaries, international fund managers, and industry executives.',
    speakerIds: ['sp2', 'sp3', 'sp4', 'sp5', 'sp6'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },

  // DAY 2 - Oct 9
  {
    id: 'd2s1',
    time: '08:30 – 09:00',
    activity: 'Recepção e Introdução do Dia 2',
    activityEn: 'Day 2 Reception & Plenary Opening',
    title: 'Abertura dos Trabalhos Plenários do Segundo Dia',
    titleEn: 'Opening of Day 2 Plenary Working Sessions',
    description: 'Apresentação do alinhamento temático focado nos clusters de energia renovável, mineração sustentável e agronegócio de Tete.',
    descriptionEn: 'Overview of plenary focus areas dedicated to renewable power, green mining, and agro-industrial chains in Tete.',
    speakerIds: [],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },
  {
    id: 'd2s2',
    time: '09:00 – 10:45',
    activity: 'Painel Plenário de Energia e Recursos Naturais',
    activityEn: 'Energy & Natural Resources Plenary Panel',
    title: 'Tete como Capital Energética: Cahora Bassa, Mphanda Nkuwa e Renováveis',
    titleEn: 'Tete as Energy Capital: Cahora Bassa, Mphanda Nkuwa & Renewables',
    theme: 'Geração hidrelétrica, solar flutuante e linhas de interconexão regional para a África Austral',
    themeEn: 'Hydropower, floating solar, and regional grid interconnectors across Southern Africa',
    description: 'Debate plenário sobre a expansão da capacidade geradora de Cahora Bassa (2.075 MW), o avanço do projeto Mphanda Nkuwa (1.500 MW) e a transição para energias limpas.',
    descriptionEn: 'Plenary debate on Cahora Bassa expansion (2,075 MW), Mphanda Nkuwa milestone development (1,500 MW), and clean power integration.',
    speakerIds: ['sp3', 'sp2'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'energy',
    isPreliminary: true
  },
  {
    id: 'd2s3',
    time: '11:00 – 12:45',
    activity: 'Painel Plenário de Mineração, Logística e Indústria',
    activityEn: 'Mining, Logistics & Industry Plenary Panel',
    title: 'Bacia Carbonífera de Moatize, Corredores Logísticos e Industrialização Local',
    titleEn: 'Moatize Coal Basin, Transport Corridors, and Local Industrialization',
    theme: 'Descarbonização, corredores ferroviários de Nacala e Beira e beneficiação mineral no país',
    themeEn: 'Decarbonization, rail logistics corridors to Nacala and Beira, and domestic value addition',
    description: 'Estratégias para potenciar a logística integrada, garantir transporte eficiente de minérios e desenvolver parques industriais transformadores em Tete.',
    descriptionEn: 'Strategic roadmap to optimize railway corridors, green bulk logistics, and establish value-adding industrial processing zones in Tete.',
    speakerIds: ['sp6', 'sp3'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'mining',
    isPreliminary: true
  },
  {
    id: 'd2s4',
    time: '13:00 – 14:30',
    activity: 'Almoço de Negócios & B2B Plenário',
    activityEn: 'Business Luncheon & Plenary Dealmaking',
    title: 'Almoço de Matchmaking e Encontros Bilaterais de Investimento',
    titleEn: 'Matchmaking Luncheon and Bilateral Investment Exchanges',
    description: 'Encontros estruturados entre detentores de projetos industriais e agrícolas em Tete e instituições financeiras e fundos de investimento.',
    descriptionEn: 'Facilitated dealmaking sessions between regional project developers and international development finance institutions.',
    speakerIds: [],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'networking',
    isPreliminary: true
  },
  {
    id: 'd2s5',
    time: '14:30 – 16:30',
    activity: 'Painel Plenário de Agronegócio e Pescas (6C\'s)',
    activityEn: 'Agribusiness & Fisheries Plenary Panel',
    title: 'Agronegócio, Pecuária do Cabrito de Tete e Potencial da Capenta e Chicoa',
    titleEn: 'Agribusiness, Tete Goat Livestock, and Capenta & Chicoa Fisheries',
    theme: 'Valorização da Indicação Geográfica do Cabrito de Tete, cadeia de frio, regadio do Zambeze e aquacultura sustentável',
    themeEn: 'Protected Geographical Indication for Tete Goat, cold chains, Zambezi irrigation, and sustainable aquaculture',
    description: 'Mesa plenária sobre a modernização da pecuária caprina, matadouros industriais, pescas na albufeira de Cahora Bassa e regadio agrícola.',
    descriptionEn: 'Plenary session on goat livestock industrialization, modern abattoirs, Cahora Bassa fisheries, and large-scale Zambezi irrigation farming.',
    speakerIds: ['sp3', 'sp5', 'sp6'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'agriculture',
    isPreliminary: true
  },

  // DAY 3 - Oct 10
  {
    id: 'd3s1',
    time: '09:00 – 10:30',
    activity: 'Sessão Plenária de Inovação e Empreendedorismo',
    activityEn: 'Innovation & Youth Entrepreneurship Plenary',
    title: 'Inovação Tecnológica, PMEs Locais e Formação Técnico-Profissional',
    titleEn: 'Technological Innovation, Local SMEs, and Vocational Training',
    theme: 'Capacitação do capital humano e transferência tecnológica para os jovens e quadros da Província de Tete',
    themeEn: 'Human capital development and technology transfer for the youth and professionals of Tete',
    description: 'Painel dedicado à qualificação profissional, inovação digital, centros de formação técnica e estímulo a startups moçambicanas.',
    descriptionEn: 'Plenary session dedicated to technical vocational training, digital innovation hubs, and Mozambican youth entrepreneurship.',
    speakerIds: ['sp2', 'sp4', 'sp6'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },
  {
    id: 'd3s2',
    time: '10:45 – 12:30',
    activity: 'Assinatura de Memorandos de Entendimento (MoU)',
    activityEn: 'MoU & Investment Agreement Signing Ceremony',
    title: 'Cerimónia Solene de Assinatura de Acordos de Investimento e Financiamento',
    titleEn: 'Solemn Signing Ceremony for Investment and Financing Agreements',
    theme: 'Formalização de compromissos de investimento público-privado facilitados durante a CIIT 2026',
    themeEn: 'Formal execution of bilateral investment and PPP commitments facilitated during CIIT 2026',
    description: 'Assinatura formal de acordos bilaterais de investimento entre o Governo da Província de Tete, ministérios, operadores económicos e investidores internacionais.',
    descriptionEn: 'Formal signing of investment agreements between the Government of Tete Province, line ministries, private promoters, and financial partners.',
    speakerIds: ['sp2', 'sp3', 'sp6'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  },
  {
    id: 'd3s3',
    time: '12:30 – 13:30',
    activity: 'Sessão Solene de Encerramento',
    activityEn: 'Solemn Closing Ceremony',
    title: 'Encerramento Oficial e Leitura da Declaração de Investimentos de Tete 2026',
    titleEn: 'Official Summit Closing & Reading of the Tete 2026 Declaration',
    description: 'Discursos de encerramento pelo Governador da Província de Tete e representantes do Governo Central, com balanço dos compromissos e declaração final da conferência.',
    descriptionEn: 'Closing remarks by the Governor of Tete Province and Central Government leaders, delivering the final summary and official conference declaration.',
    speakerIds: ['sp3', 'sp4', 'sp2'],
    location: 'PLENÁRIA',
    locationEn: 'PLENARY HALL',
    category: 'plenary',
    isPreliminary: true
  }
];

// OS 5 HOTÉIS REAIS E EXCLUSIVOS DE TETE
export const HOTELS: HotelRecommendation[] = [
  {
    id: 'h1',
    name: 'VIP Executive Tete Hotel',
    stars: 4, // Classificação oficial 4 estrelas
    categoryTag: 'Hotel Executivo 4 Estrelas',
    categoryTagEn: '4-Star Executive Hotel',
    description: 'Hotel de 4 estrelas projetado especificamente para acolher delegações executivas e viajantes de negócios na cidade de Tete. Dispõe de 120 quartos modernos (incluindo 16 suites executivas), 5 salas de conferências climatizadas com capacidade até 200 pessoas, restaurante internacional, dois bares e piscina exterior.',
    descriptionEn: '4-star corporate hotel designed specifically for executive delegations and business travelers in Tete City. Features 120 contemporary rooms (including 16 executive suites), 5 fully-equipped conference suites for up to 200 delegates, international dining restaurant, two bars, and an outdoor swimming pool.',
    location: 'Bairro Chingodzi, próximo do Rio Zambeze e a 5 km do Aeroporto de Chingozi (TET), Cidade de Tete',
    locationEn: 'Chingodzi district, close to the Zambezi River and 5 km from Chingozi Airport (TET), Tete City',
    address: 'Av. da Liberdade, Bairro Chingodzi, Cidade de Tete, Moçambique',
    addressEn: 'Liberdade Avenue, Chingodzi, Tete City, Mozambique',
    roomsInfo: '120 quartos modernos, incluindo 16 suites executivas e unidades com kitchenette',
    roomsInfoEn: '120 modern rooms, including 16 executive suites and kitchenette-equipped units',
    phone: '+258 25 224 800',
    email: 'hotelsete@viphotels.com',
    website: 'https://www.viphotels.com/pt/Hoteis/VIP-Executive-Tete/Sobre-Hotel.aspx',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=900'
    ],
    amenities: {
      pool: true,
      restaurant: true,
      gym: true,
      conferenceRooms: true,
      wifi: true,
      parking: true,
      airportShuttle: true,
      bar: true
    },
    highlights: [
      '5 Salas de conferências e reuniões executivas para até 200 participantes',
      'Restaurante VIP com gastronomia moçambicana e internacional',
      'Piscina exterior sazonal com bar de apoio e espreguiçadeiras',
      'Ginásio e centro de fitness totalmente equipado',
      'Serviço de transfer gratuito para o Aeroporto de Chingozi (TET)'
    ],
    highlightsEn: [
      '5 Fully-equipped executive conference suites for up to 200 delegates',
      'VIP Restaurant serving refined Mozambican and international cuisine',
      'Outdoor swimming pool with poolside bar and sun loungers',
      'Fully equipped fitness centre and gym',
      'Complimentary airport shuttle to/from Chingozi Airport (TET)'
    ]
  },
  {
    id: 'h2',
    name: 'Tete Ferry Sun',
    stars: 4, // Classificação oficial Southern Sun
    categoryTag: 'Resort Ribeirinho & Hotel Corporativo',
    categoryTagEn: 'Riverside Resort & Corporate Hotel',
    description: 'Integrado na conceituada cadeia hoteleira Southern Sun, o Tete Ferry Sun localiza-se nas margens calmas do Rio Zambeze. Oferece 143 quartos e villas climatizadas com kitchenette, o afamado restaurante "A Brasa", piscina exterior panorâmica sobre o rio, ginásio, centro de negócios e campo de golfe mashie de 9 buracos.',
    descriptionEn: 'Part of the prestigious Southern Sun hotel group, Tete Ferry Sun sits along the scenic banks of the Zambezi River. Offers 143 air-conditioned rooms and self-catering villas with kitchenettes, the renowned "A Brasa" restaurant, panoramic outdoor pool, fitness centre, business centre, and a 9-hole mashie golf course.',
    location: 'Margem do Rio Zambeze, Changara / Tete, Moçambique',
    locationEn: 'Banks of the Zambezi River, Changara / Tete, Mozambique',
    address: 'Estrada Nacional N7, Changara, Província de Tete, Moçambique',
    addressEn: 'National Highway N7, Changara, Tete Province, Mozambique',
    roomsInfo: '143 quartos climatizados e villas self-catering com kitchenette e frigorífico',
    roomsInfoEn: '143 air-conditioned rooms and self-catering villas with kitchenette and refrigerator',
    phone: '+258 25 224 000',
    email: 'tete.reservations@southernsun.com',
    website: 'https://www.southernsun.com/tete-ferry-sun',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=900'
    ],
    amenities: {
      pool: true,
      restaurant: true,
      gym: true,
      conferenceRooms: true,
      wifi: true,
      parking: true,
      airportShuttle: true,
      bar: true
    },
    highlights: [
      'Piscina exterior panorâmica com vista direta para o Rio Zambeze',
      'Restaurante "A Brasa" com grelhados de excelência e buffet diário',
      'Campo de golfe mashie de 9 buracos integrado na propriedade',
      'Centro de fitness moderno e instalações de negócios completas',
      'Wi-Fi ilimitado gratuito e ambiente de tranquilidade natural'
    ],
    highlightsEn: [
      'Panoramic outdoor pool overlooking the majestic Zambezi River',
      'Signature "A Brasa" flame-grilled restaurant & daily buffet',
      '9-hole mashie golf course on private grounds',
      'State-of-the-art fitness gym and full business facilities',
      'Complimentary uncapped high-speed Wi-Fi and serene gardens'
    ]
  },
  {
    id: 'h3',
    name: 'Hotel Fatima',
    categoryTag: 'Hotel Urbano & Apart-Hotel',
    categoryTagEn: 'Urban Hotel & Serviced Apartments',
    description: 'Localizado no centro urbano de Tete, o Hotel Fatima proporciona uma estadia funcional e confortável para estadias de curta e longa duração. Dispõe de quartos climatizados e apartamentos familiares com kitchenette e varanda, piscina exterior, ginásio equipado, jardim e comodidades de barbecue.',
    descriptionEn: 'Conveniently situated in central Tete, Hotel Fatima provides comfortable executive and family accommodations for short and extended stays. Features air-conditioned suites and apartments with kitchenettes and balconies, an outdoor swimming pool, fitness gym, garden, and BBQ facilities.',
    location: 'Centro da Cidade de Tete, Moçambique',
    locationEn: 'Tete City Center, Mozambique',
    address: 'Av. da Independência / Rua Central, Cidade de Tete, Moçambique',
    addressEn: 'Independência Avenue / Central District, Tete City, Mozambique',
    roomsInfo: 'Quartos executivos e apartamentos familiares climatizados com kitchenette e varanda privativa',
    roomsInfoEn: 'Executive rooms and family apartments with air-conditioning, kitchenette, and private balcony',
    phone: '+258 84 398 5000',
    email: 'reservas@hotelfatimatete.com',
    website: 'https://www.booking.com/hotel/mz/hotel-fatima-tete.html',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=900'
    ],
    amenities: {
      pool: true,
      restaurant: true,
      gym: true,
      conferenceRooms: false,
      wifi: true,
      parking: true,
      airportShuttle: false,
      bar: true
    },
    highlights: [
      'Piscina exterior e solário para momentos de descanso',
      'Ginásio privativo e espaço de fitness',
      'Quartos e apartamentos equipados com kitchenette independente',
      'Jardim privativo e comodidades de barbecue (BBQ)',
      'Wi-Fi de alta velocidade e receção 24 horas'
    ],
    highlightsEn: [
      'Outdoor swimming pool and sundeck for relaxation',
      'Private fitness gym for guests',
      'Accommodations equipped with self-catering kitchenettes',
      'Private landscaped garden with barbecue (BBQ) facilities',
      'High-speed Wi-Fi and 24-hour reception desk'
    ]
  },
  {
    id: 'h4',
    name: 'Tete Palm Hotel',
    stars: 3, // Classificação 3 estrelas
    categoryTag: 'Hotel 3 Estrelas & Lazer',
    categoryTagEn: '3-Star Business & Leisure Hotel',
    description: 'Hotel de 3 estrelas que oferece uma estadia confortável e prática no centro de Tete. Os quartos estão equipados com ar condicionado, secretária de trabalho, cafeteira e varanda privativa. Dispõe de piscina exterior disponível todo o ano, restaurante com pequeno-almoço buffet, continental e halal, e bar compartilhado.',
    descriptionEn: '3-star establishment offering comfortable and practical lodging in Tete. Rooms feature air conditioning, work desk, coffee maker, and private balcony. Offers a year-round outdoor pool, restaurant serving buffet, continental, and halal breakfast options, and a shared lounge bar.',
    location: 'Bairro Josina Machel, Cidade de Tete, Moçambique',
    locationEn: 'Josina Machel District, Tete City, Mozambique',
    address: 'Av. Josina Machel, Cidade de Tete, Moçambique',
    addressEn: 'Josina Machel Avenue, Tete City, Mozambique',
    roomsInfo: 'Quartos climatizados com casa de banho privativa, secretária, cafeteira e varanda',
    roomsInfoEn: 'Air-conditioned rooms with private bathroom, work desk, coffee maker, and balcony',
    phone: '+258 84 555 7890',
    email: 'reservas@tetepalmhotel.com',
    website: 'https://www.booking.com/hotel/mz/tete-palm.html',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=900'
    ],
    amenities: {
      pool: true,
      restaurant: true,
      gym: false,
      conferenceRooms: false,
      wifi: true,
      parking: true,
      airportShuttle: false,
      bar: true
    },
    highlights: [
      'Piscina exterior aberta durante todo o ano',
      'Restaurante no local com opções de pequeno-almoço buffet, continental e halal',
      'Quartos confortáveis com secretária de trabalho e varanda',
      'Bar e salão lounge compartilhado para momentos de convívio',
      'Estacionamento privativo gratuito e segurança 24 horas'
    ],
    highlightsEn: [
      'Year-round outdoor swimming pool and relaxing patio',
      'On-site restaurant offering buffet, continental, and halal breakfast',
      'Comfortable rooms featuring executive work desks and balconies',
      'Shared lounge bar for pleasant evenings and networking',
      'Complimentary private parking and 24/7 on-site security'
    ]
  },
  {
    id: 'h5',
    name: 'Horizonte Lodge',
    categoryTag: 'Lodge Ribeirinho & Espaço de Eventos',
    categoryTagEn: 'Riverside Lodge & Event Venue',
    description: 'Localizado no bairro de Matundo, nas margens privilegiadas do Rio Zambeze, o Horizonte Lodge proporciona um retiro arborizado e tranquilo. Dispõe de chalés confortáveis, restaurante e esplanada com vista sobre o rio, piscina exterior e um amplo jardim exterior vocacionado para banquetes e eventos ao ar livre.',
    descriptionEn: 'Situated in the Matundo district directly along the scenic banks of the Zambezi River, Horizonte Lodge offers a tranquil riverside retreat. Features comfortable chalets, restaurant and outdoor terrace with sweeping river views, swimming pool, and an expansive garden for corporate gatherings and banquets.',
    location: 'Bairro de Matundo, Margem do Rio Zambeze, Tete, Moçambique',
    locationEn: 'Matundo District, Zambezi Riverfront, Tete, Mozambique',
    address: 'Bairro Matundo, Margem do Zambeze, Província de Tete, Moçambique',
    addressEn: 'Matundo District, Zambezi Riverbank, Tete Province, Mozambique',
    roomsInfo: 'Chalés privativos e quartos climatizados com vista jardim e vista fluvial',
    roomsInfoEn: 'Private chalets and air-conditioned guest units with garden and river views',
    phone: '+258 84 624 3912',
    email: 'horizontelodge.tete@gmail.com',
    website: 'https://www.facebook.com/horizontelodgetete',
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=900'
    ],
    amenities: {
      pool: true,
      restaurant: true,
      gym: false,
      conferenceRooms: true,
      wifi: true,
      parking: true,
      airportShuttle: false,
      bar: true
    },
    highlights: [
      'Localização ribeirinha exclusiva no bairro de Matundo junto ao Zambeze',
      'Amplo jardim exterior para eventos corporativos, banquetes e casamentos',
      'Restaurante e esplanada exterior com peixe fresco do Zambeze e pratos regionais',
      'Piscina exterior rodeada por vegetação e atmosfera relaxante',
      'Terraço panorâmico com vista para o pôr do sol sobre as águas do Zambeze'
    ],
    highlightsEn: [
      'Exclusive riverfront setting in Matundo along the Zambezi River',
      'Expansive landscaped event garden for corporate banquets and receptions',
      'Restaurant and terrace serving fresh Zambezi fish and regional specialties',
      'Outdoor swimming pool surrounded by lush greenery and tranquility',
      'Panoramic sunset deck overlooking the pristine Zambezi waters'
    ]
  }
];

// OS 5 PARCEIROS INSTITUCIONAIS OFICIAIS EXCLUSIVOS
export const INSTITUTIONAL_PARTNERS: InstitutionalPartner[] = [
  {
    id: 'p1',
    name: 'Agência do Zambeze',
    acronym: 'Agência do Zambeze',
    fullName: 'Agência de Desenvolvimento do Vale do Zambeze',
    role: 'Parceiro Institucional Estratégico',
    roleEn: 'Strategic Institutional Partner',
    website: 'https://www.agenciadozambeze.gov.mz',
    description: 'Instituição pública responsável pela coordenação, promoção e implementação do desenvolvimento económico, social e sustentável de toda a região do Vale do Zambeze em Moçambique.',
    descriptionEn: 'Public agency tasked with coordinating, promoting, and facilitating the economic, social, and sustainable development of the entire Zambezi Valley region in Mozambique.',
    logoType: 'agencia_zambeze'
  },
  {
    id: 'p2',
    name: 'Hidroeléctrica de Cahora Bassa',
    acronym: 'HCB',
    fullName: 'Hidroeléctrica de Cahora Bassa, S.A.',
    role: 'Patrocinador & Parceiro de Energia',
    roleEn: 'Energy Partner & Major Sponsor',
    website: 'https://www.hcb.co.mz',
    description: 'A maior geradora hidroelétrica da África Austral com 2.075 MW de capacidade instalada no Rio Zambeze em Tete, espinha dorsal da matriz energética de Moçambique e da região SADC.',
    descriptionEn: 'Southern Africa\'s largest hydropower facility with 2,075 MW installed capacity on the Zambezi River in Tete, the backbone of Mozambique and regional SADC power grids.',
    logoType: 'hcb',
    logoImg: hcbLogoImg
  },
  {
    id: 'p3',
    name: 'Mphanda Nkuwa',
    acronym: 'GMNK',
    fullName: 'Gabinete de Implementação do Projecto Hidroeléctrico de Mphanda Nkuwa',
    role: 'Parceiro Estratégico de Infraestruturas',
    roleEn: 'Strategic Infrastructure Partner',
    website: 'https://mphandankuwa.co.mz',
    description: 'Entidade responsável pela estruturação e implementação do megaprojeto hidroelétrico de 1.500 MW a jusante de Cahora Bassa e respetiva linha de transmissão de alta tensão até Maputo.',
    descriptionEn: 'The office responsible for structuring and delivering the 1,500 MW Mphanda Nkuwa hydropower megaproject downstream on the Zambezi and its high-voltage transmission line to Maputo.',
    logoType: 'mphanda_nkuwa'
  },
  {
    id: 'p4',
    name: 'APIEX',
    acronym: 'APIEX',
    fullName: 'Agência para a Promoção de Investimento e Exportações',
    role: 'Parceiro de Investimento & IDE',
    roleEn: 'Investment & Export Promotion Partner',
    website: 'https://apiex.gov.mz',
    description: 'Agência oficial do Governo de Moçambique vocacionada para a atração, facilitação e monitorização de Investimento Direto Estrangeiro (IDE) e promoção de exportações nacionais.',
    descriptionEn: 'The official Government of Mozambique agency for promoting, facilitating, and monitoring Foreign Direct Investment (FDI) and national export competitiveness.',
    logoType: 'apiex'
  },
  {
    id: 'p5',
    name: 'CTA',
    acronym: 'CTA',
    fullName: 'Confederação das Associações Económicas de Moçambique',
    role: 'Parceiro Oficial do Sector Privado',
    roleEn: 'Official Private Sector Partner',
    website: 'https://cta.org.mz',
    description: 'A principal organização de cúpula do empresariado moçambicano e interlocutor oficial no diálogo público-privado com o Governo para a melhoria do ambiente de negócios.',
    descriptionEn: 'The apex confederation representing the Mozambican business community and official partner in public-private dialogue with the Government to enhance economic competitiveness.',
    logoType: 'cta'
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
    { name: 'Hidroeléctrica de Cahora Bassa (HCB)', url: 'https://www.hcb.co.mz' },
    { name: 'Agência do Zambeze', url: 'https://www.agenciadozambeze.gov.mz' }
  ],
  gold: [
    { name: 'Mphanda Nkuwa', url: 'https://mphandankuwa.co.mz' },
    { name: 'CTA Moçambique', url: 'https://cta.org.mz' }
  ],
  institutional: [
    { name: 'APIEX Moçambique', url: 'https://apiex.gov.mz' }
  ]
};

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'gal-01',
    filename: 'Alvaro Massingue 1.jpeg',
    title: 'Intervenção do Presidente da CTA — Dr. Álvaro Massingue',
    titleEn: 'Keynote by the President of CTA — Dr. Álvaro Massingue',
    category: 'speeches',
    categoryLabel: 'Discursos Oficiais',
    categoryLabelEn: 'Official Speeches',
    description: 'O Presidente da Confederação das Associações Económicas de Moçambique (CTA), Dr. Álvaro Massingue, discursa na tribuna oficial destacando o papel estratégico do empresariado moçambicano e o fomento às PMEs no vale do Zambeze.',
    descriptionEn: 'The President of CTA, Dr. Álvaro Massingue, addresses the official podium underscoring the strategic role of Mozambican private enterprises and SME integration in the Zambezi basin.',
    imageUrl: ciitGalAlvaro1,
    aspectRatio: '4:3',
    featured: true
  },
  {
    id: 'gal-02',
    filename: 'Domingos Viola.jpeg',
    title: 'Alocução de Abertura do Governador de Tete — S. Excia Domingos Viola',
    titleEn: 'Opening Address by the Governor of Tete — H.E. Domingos Viola',
    category: 'speeches',
    categoryLabel: 'Discursos Oficiais',
    categoryLabelEn: 'Official Speeches',
    description: 'S. Excia Domingos Juliasse Viola, Governador da Província de Tete, apresenta a visão de desenvolvimento territorial sustentável e os mais de 10 milhões de hectares aráveis disponíveis para projetos estruturantes.',
    descriptionEn: 'H.E. Domingos Juliasse Viola, Governor of Tete Province, delivers the strategic address highlighting sustainable territorial development and over 10 million hectares of fertile arable land.',
    imageUrl: ciitGalDomingos,
    aspectRatio: '4:3',
    featured: true
  },
  {
    id: 'gal-03',
    filename: 'Basílio Muhate.jpeg',
    title: 'Discurso do Ministro da Economia — Eng. Basílio Zefanias Muhate',
    titleEn: 'Address by the Minister of Economy — Eng. Basílio Zefanias Muhate',
    category: 'leadership',
    categoryLabel: 'Liderança & Governo',
    categoryLabelEn: 'Leadership & Government',
    description: 'O Ministro da Economia apresenta o pacote governamental de reformas estruturais, atração de investimento direto estrangeiro (IDE) e benefícios fiscais direcionados à agroindústria e energia.',
    descriptionEn: 'The Minister of Economy outlines the structural reform framework, foreign direct investment incentives, and fiscal benefits tailored for agribusiness and clean energy projects.',
    imageUrl: ciitGalBasilio,
    aspectRatio: '4:3',
    featured: true
  },
  {
    id: 'gal-04',
    filename: 'Cristina Muchanga.jpeg',
    title: 'Mensagem da Secretária de Estado na Província de Tete — Dra. Cristina Muchanga',
    titleEn: 'Message by the Secretary of State for Tete — Dra. Cristina Muchanga',
    category: 'leadership',
    categoryLabel: 'Liderança & Governo',
    categoryLabelEn: 'Leadership & Government',
    description: 'Dra. Cristina de Fátima Muchanga reforça o ambiente de paz social, segurança institucional e total prontidão das autoridades provinciais para apoiar os investidores privados.',
    descriptionEn: 'Dra. Cristina de Fátima Muchanga emphasizes institutional readiness, security, and the unwavering commitment of provincial authorities to facilitate global investor ventures.',
    imageUrl: ciitGalCristina,
    aspectRatio: '4:3',
    featured: true
  },
  {
    id: 'gal-05',
    filename: 'gallery_panel_vip_1787582288582.jpeg',
    title: 'Mesa de Honra e Painel de Alto Nível na Abertura Solene',
    titleEn: 'High-Level VIP Executive Panel at the Solemn Opening',
    category: 'leadership',
    categoryLabel: 'Liderança & Governo',
    categoryLabelEn: 'Leadership & Government',
    description: 'Painel executivo com a presença de membros do Governo Central, liderança do executivo provincial de Tete e direcção máxima da Confederação das Associações Económicas.',
    descriptionEn: 'High-level executive panel convening Central Government ministers, provincial governance leaders, and the presidency of the Mozambican Chamber of Commerce.',
    imageUrl: ciitGalPanelVip,
    aspectRatio: '16:9',
    featured: true
  },
  {
    id: 'gal-06',
    filename: 'gallery_plenary_wide_1787582222862.jpeg',
    title: 'Auditório da Sala Plenária Preparado para as Sessões da CIIT 2026',
    titleEn: 'Plenary Hall Stage and Main Screen Setting for CIIT 2026',
    category: 'plenary',
    categoryLabel: 'Sala Plenária',
    categoryLabelEn: 'Plenary Hall',
    description: 'Cenografia oficial da Sala Plenária com transmissão de alta resolução, destacando os pilares de recursos minerais, energia, turismo e agropecuária de Tete.',
    descriptionEn: 'Official high-definition plenary hall stage featuring thematic displays of Tete\'s mineral abundance, clean energy, ecotourism, and agribusiness potential.',
    imageUrl: ciitGalPlenaryWide,
    aspectRatio: '16:9',
    featured: true
  },
  {
    id: 'gal-07',
    filename: 'gallery_plenary_audience_1787582252434.jpeg',
    title: 'Momento Solene de Abertura com Audiência Plena',
    titleEn: 'Solemn Opening Ceremony with Full Plenary Assembly',
    category: 'plenary',
    categoryLabel: 'Sala Plenária',
    categoryLabelEn: 'Plenary Hall',
    description: 'Audiência composta por centenas de delegados, empresários, líderes comunitários e investidores internacionais de pé durante o hino nacional da República de Moçambique.',
    descriptionEn: 'Full auditorium of delegates, investors, community leaders, and international partners standing solemnly during Mozambique\'s national anthem.',
    imageUrl: ciitGalPlenaryAudience,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-08',
    filename: 'gallery_governor_speech_1787582265650.jpeg',
    title: 'Exposição do Potencial Hídrico, Energético e de Conservação de Tete',
    titleEn: 'Presentation on Tete\'s Hydropower, Energy, and Conservation Potentials',
    category: 'speeches',
    categoryLabel: 'Discursos Oficiais',
    categoryLabelEn: 'Official Speeches',
    description: 'S. Excia Domingos Viola detalha os projectos estruturantes na Albufeira de Cahora Bassa, Mphanda Nkuwa e a preservação dos ecossistemas turísticos e faunísticos.',
    descriptionEn: 'H.E. Domingos Viola details anchor projects at the Cahora Bassa reservoir, Mphanda Nkuwa hydropower, and wildlife conservation corridors.',
    imageUrl: ciitGalGovernorSpeech,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-09',
    filename: 'gallery_international_delegates_1787582303946.jpeg',
    title: 'Corpo Diplomático e Investidores Internacionais na Plenária',
    titleEn: 'Diplomatic Corps and International Investors in Plenary',
    category: 'delegates',
    categoryLabel: 'Corpo Diplomático & Delegados',
    categoryLabelEn: 'Diplomats & Delegates',
    description: 'Representantes de missões diplomáticas, agências multilaterais de cooperação e fundos de investimento participam ativamente nos debates bilaterais.',
    descriptionEn: 'Representatives from foreign embassies, multilateral financing agencies, and global capital funds actively engaging in bilateral sessions.',
    imageUrl: ciitGalIntlDelegates,
    aspectRatio: '4:3'
  },
  {
    id: 'gal-10',
    filename: 'WhatsApp Image 2026-08-24 at 10.47.02 (2).jpeg',
    title: 'Fotografia Oficial de Família — Governo, CTA e Parceiros Estratégicos',
    titleEn: 'Official Family Photo — Tete Government, CTA & Strategic Partners',
    category: 'protocol',
    categoryLabel: 'Protocolo & Fotos Oficiais',
    categoryLabelEn: 'Protocol & Official Photos',
    description: 'Registo solene de família reunindo membros do Governo de Moçambique, autoridades municipais, direcção da CTA e parceiros de desenvolvimento diante do painel da CIIT 2026.',
    descriptionEn: 'Official family photograph assembling Mozambique Government ministers, municipal authorities, CTA leadership, and corporate partners in front of CIIT 2026 banner.',
    imageUrl: ciitGalWa2,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-11',
    filename: 'Alvaro Massingue 2.jpeg',
    title: 'Visão Estratégica da CTA para a Industrialização e Cadeias Locais',
    titleEn: 'CTA Roadmap for Industrialization and Local Content Value Chains',
    category: 'speeches',
    categoryLabel: 'Discursos Oficiais',
    categoryLabelEn: 'Official Speeches',
    description: 'Dr. Álvaro Massingue detalha propostas concretas para o fortalecimento da competitividade das empresas moçambicanas e transferência tecnológica.',
    descriptionEn: 'Dr. Álvaro Massingue outlines targeted measures to bolster local company competitiveness, supply chain linkage, and technology transfers.',
    imageUrl: ciitGalAlvaro2,
    aspectRatio: '4:3'
  },
  {
    id: 'gal-12',
    filename: 'Alvaro Massingue 3.jpeg',
    title: 'Posicionamento Regional de Tete na Integração Económica da SADC',
    titleEn: 'Tete\'s Strategic Positioning in SADC Regional Economic Integration',
    category: 'speeches',
    categoryLabel: 'Discursos Oficiais',
    categoryLabelEn: 'Official Speeches',
    description: 'Realce para a conectividade logística e comercial com o Zimbábue, Zâmbia e Malawi, transformando a Província de Tete no epicentro económico do interior austral.',
    descriptionEn: 'Emphasizing logistics and trade interconnections with Zimbabwe, Zambia, and Malawi, cementing Tete as Southern Africa\'s prime inland hub.',
    imageUrl: ciitGalAlvaro3,
    aspectRatio: '4:3'
  },
  {
    id: 'gal-13',
    filename: 'Basílio Muhate1.jpeg',
    title: 'Garantias Institucionais e Segurança para Capitais Privados',
    titleEn: 'Institutional Guarantees and Legal Security for Private Capital',
    category: 'leadership',
    categoryLabel: 'Liderança & Governo',
    categoryLabelEn: 'Leadership & Government',
    description: 'O Ministro da Economia reafirma a solidez do quadro regulatório moçambicano e o suporte governamental a consórcios de investimento de grande escala.',
    descriptionEn: 'The Minister of Economy reinforces the stability of Mozambique\'s regulatory framework and institutional support for large-scale investment consortia.',
    imageUrl: ciitGalBasilio1,
    aspectRatio: '4:3'
  },
  {
    id: 'gal-14',
    filename: 'WhatsApp Image 2026-08-24 at 10.47.01.jpeg',
    title: 'A Dança Nyau e o Património Cultural de Tete no Palco da Conferência',
    titleEn: 'Nyau Cultural Heritage on the CIIT 2026 Conference Stage',
    category: 'plenary',
    categoryLabel: 'Sala Plenária',
    categoryLabelEn: 'Plenary Hall',
    description: 'Homenagem às ricas expressões culturais de Tete, conjugando identidade tradicional, turismo e modernização industrial sustentável.',
    descriptionEn: 'Tribute to Tete\'s rich cultural identity, combining ancestral heritage, ecotourism potential, and sustainable modern industrial growth.',
    imageUrl: ciitGalWa1,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-15',
    filename: 'WhatsApp Image 2026-08-24 at 10.47.03 (1).jpeg',
    title: 'Delegação Empresarial e Lideranças dos Sectores Produtivos',
    titleEn: 'Business Delegations and Productive Sector Leadership',
    category: 'protocol',
    categoryLabel: 'Protocolo & Fotos Oficiais',
    categoryLabelEn: 'Protocol & Official Photos',
    description: 'Intercâmbio executivo entre representantes dos sectores bancário, mineiro, agrícola e logístico durante os momentos protocolares da conferência.',
    descriptionEn: 'Executive dialogue between leaders from banking, mining, agribusiness, and logistics sectors during conference protocol sessions.',
    imageUrl: ciitGalWa3_1,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-16',
    filename: 'WhatsApp Image 2026-08-24 at 10.47.03.jpeg',
    title: 'Composição da Mesa de Honra no Momento Inaugural',
    titleEn: 'Head Table Dignitaries at the Inaugural Ceremony',
    category: 'protocol',
    categoryLabel: 'Protocolo & Fotos Oficiais',
    categoryLabelEn: 'Protocol & Official Photos',
    description: 'Membros da Mesa de Honra perfilados no palco principal com o arranjo floral solene e a identidade visual oficial da CIIT 2026.',
    descriptionEn: 'Dignitaries standing in solemn formation on the main stage alongside ceremonial floral arrangements and official CIIT 2026 branding.',
    imageUrl: ciitGalWa3,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-17',
    filename: 'WhatsApp Image 2026-08-24 at 10.47.04 (1).jpeg',
    title: 'Panorâmica com a Totalidade dos Congressistas Acreditados',
    titleEn: 'Grand Assembly of All Accredited Conference Delegates',
    category: 'plenary',
    categoryLabel: 'Sala Plenária',
    categoryLabelEn: 'Plenary Hall',
    description: 'Registo fotográfico de grande plano evidenciando o elevado prestígio e ampla participação nacional e internacional na conferência.',
    descriptionEn: 'Wide panoramic portrait reflecting the high prestige and extensive national and international participation at the summit.',
    imageUrl: ciitGalWa4_1,
    aspectRatio: '16:9'
  },
  {
    id: 'gal-18',
    filename: 'WhatsApp Image 2026-08-24 at 10.47.09 (2).jpeg',
    title: 'Encerramento Solene da Sessão Inaugural de Apresentação',
    titleEn: 'Solemn Conclusion of the Launch Presentation Session',
    category: 'protocol',
    categoryLabel: 'Protocolo & Fotos Oficiais',
    categoryLabelEn: 'Protocol & Official Photos',
    description: 'As altas personalidades no termo da sessão de lançamento, reiterando o convite a todos os investidores para estarem presentes em Tete em Outubro de 2026.',
    descriptionEn: 'Key dignitaries concluding the launching ceremony, issuing an open invitation to global investors to convene in Tete in October 2026.',
    imageUrl: ciitGalWa9_2,
    aspectRatio: '16:9'
  }
];

export const TRANSLATIONS = {
  pt: {
    navHome: 'Início',
    navAbout: 'Sobre',
    navProfile: 'Perfil de Tete',
    nav6cs: 'Os 6C\'s de Tete',
    navSpeakers: 'Oradores',
    navAgenda: 'Programa',
    navGallery: 'Galeria Oficial',
    navAttendance: 'Presenças LIVE',
    navTravel: 'Viagem & Hotéis',
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
    speakersSubtitle: 'Líderes de Estado, Governo e do Sector Privado Nacional',
    agendaTitle: 'Programa Oficial',
    agendaSubtitle: 'Todos os trabalhos, conferências e debates decorrem na Sala PLENÁRIA',
    day: 'Dia',
    galleryTitle: 'Galeria Oficial de Fotografias',
    gallerySubtitle: 'Registos Visuais Oficiais da Cerimónia de Lançamento e Sessões Plenárias da CIIT 2026',
    galleryFilterAll: 'Todas as Fotografias (18)',
    galleryFilterPlenary: 'Sala Plenária',
    galleryFilterLeadership: 'Liderança & Governo',
    galleryFilterSpeeches: 'Discursos Oficiais',
    galleryFilterDelegates: 'Corpo Diplomático',
    galleryFilterProtocol: 'Protocolo & Fotos de Família',
    galleryPrev: 'Imagem anterior',
    galleryNext: 'Próxima imagem',
    galleryClose: 'Fechar visualização',
    galleryFullscreen: 'Ampliar em ecrã inteiro',
    galleryZoomIn: 'Aumentar zoom',
    galleryZoomOut: 'Diminuir zoom',
    galleryResetZoom: 'Repor zoom normal',
    galleryPlay: 'Iniciar rotação automática',
    galleryPause: 'Pausar rotação automática',
    galleryViewGrid: 'Vista em Grelha',
    galleryViewCarousel: 'Vista em Carrossel',
    galleryCountOf: 'de',
    galleryAssetOfficial: 'Asset Fotográfico Oficial da CIIT 2026',
    galleryThumbnails: 'Miniaturas',
    galleryPressNotice: 'Imagens oficiais da Conferência Internacional de Investimentos de Tete 2026. Todos os direitos reservados.',
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
    travelTitle: 'Viagem e Acomodação Oficial',
    travelSubtitle: 'Informações logísticas indispensáveis e hotéis recomendados na Cidade de Tete',
    travelAirportTitle: 'Como Chegar (Aeroporto de Chingozi - TET)',
    travelAirportText: 'O Aeroporto de Chingozi (TET), situado a apenas 10 minutos do centro da cidade de Tete, recebe voos diários de Maputo operados pelas Linhas Aéreas de Moçambique (LAM) e conexões regionais regulares a partir de Joanesburgo (África do Sul) e Harare (Zimbábue).',
    travelVisasTitle: 'Vistos de Entrada (e-Visa)',
    travelVisasText: 'Moçambique implementou facilidades para investidores com a introdução do visto eletrónico (e-Visa). Cidadãos de diversos países agora possuem isenção de vistos para estadias curtas de negócios ou turismo. Consulte o site evisa.gov.mz antes de viajar.',
    travelHotelsTitle: 'Hotéis Recomendados em Tete',
    travelHotelsBtn: 'Ver Hotel / Reservar',
    adminTitle: 'Painel Administrativo da Conferência',
    adminSubtitle: 'Monitorização em tempo real de inscrições, estatísticas setoriais e relatórios executivos',
    adminLoginPlaceholder: 'Insira a palavra-passe de administrador...',
    adminLoginBtn: 'Aceder ao Painel',
    adminTotal: 'Total de Inscritos',
    adminStatusConfirmed: 'Confirmados',
    adminStatsTitle: 'Métricas e Distribuição de Delegados',
    adminTableTitle: 'Lista de Participantes Cadastrados',
    adminAddManual: 'Registar Manualmente',
    liveAttendanceTitle: 'Presenças em Tempo Real',
    liveAttendanceSubtitle: 'Acompanhamento do credenciamento e fluxo de entrada dos participantes no evento',
    liveTotalRegistered: 'Total de Cadastrados',
    livePresent: 'Presentes',
    livePending: 'Pendentes / A Caminho',
    liveAttendanceRate: 'Percentagem de Presença',
    attendanceByTypeTitle: 'Presenças por Tipo de Participação',
    attendanceByTypeSubtitle: 'Discriminação detalhada de inscritos, presenças confirmadas e participantes a caminho por categoria no ato da inscrição',
    categoryDelegates: 'Delegados Executivos',
    categoryInvestors: 'Investidores',
    categoryGovernment: 'Membros do Governo',
    categorySpeakers: 'Oradores & Painelistas',
    categorySponsors: 'Patrocinadores & Parceiros',
    statusOnTheWay: 'A caminho',
    statusPresent: 'Presentes',
    filterByCategory: 'Filtrar por Categoria',
    filterByStatus: 'Filtrar por Presença',
    allCategories: 'Todas as Categorias',
    allStatuses: 'Todos os Estados',
    onlyPresent: 'Apenas Presentes',
    onlyPending: 'Apenas a Caminho (Pendentes)',
    viewAttendees: 'Ver Participantes',
    liveLatestCheckIns: 'Últimos Check-ins',
    liveHourlyEvolution: 'Evolução de Entradas por Hora',
    liveCheckInConfirmed: 'Check-in Confirmado',
    liveInvalidQr: 'QR Code Inválido',
    liveAlreadyCheckedIn: 'Check-in Já Realizado',
    liveQrScanner: 'Scanner QR Code',
    liveOpenScanner: 'Abrir Scanner de Entrada',
    liveDemoMode: 'Modo Demonstração',
    liveLoadDemo: 'Carregar Dados de Demonstração',
    liveClearDemo: 'Limpar Dados de Teste',
    liveOnline: 'ONLINE',
    liveOffline: 'OFFLINE (Sincronização pendente)',
    liveJustNow: 'Agora mesmo',
    liveNoCheckInsYet: 'Nenhum check-in registado recentemente.',
    footerRights: 'Todos os direitos reservados. Governo da Província de Tete, República de Moçambique.'
  },
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navProfile: 'Tete Profile',
    nav6cs: 'Tete 6 C\'s',
    navSpeakers: 'Speakers',
    navAgenda: 'Agenda',
    navGallery: 'Official Gallery',
    navAttendance: 'Live Attendance',
    navTravel: 'Travel & Hotels',
    navAdmin: 'Admin Dashboard',
    navRegister: 'Register Now',
    heroSubtitle: 'Government of Tete Province • Republic of Mozambique',
    heroDate: 'October 8, 9, & 10, 2026',
    heroMotto: '"TETE ON THE INVESTMENT HORIZON: OPPORTUNITIES FOR A NEW ERA OF DEVELOPMENT"',
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
    speakersSubtitle: 'Heads of State, Government Ministers & National Private Sector Leaders',
    agendaTitle: 'Official Program',
    agendaSubtitle: 'All conference sessions, keynotes, and panels take place in the PLENARY Hall',
    day: 'Day',
    galleryTitle: 'Official Photo Gallery',
    gallerySubtitle: 'Official Photographic Records of the Launching Ceremony and Plenary Sessions of CIIT 2026',
    galleryFilterAll: 'All Photographs (18)',
    galleryFilterPlenary: 'Plenary Hall',
    galleryFilterLeadership: 'Leadership & Government',
    galleryFilterSpeeches: 'Official Speeches',
    galleryFilterDelegates: 'Diplomatic Corps',
    galleryFilterProtocol: 'Protocol & Family Photos',
    galleryPrev: 'Previous photo',
    galleryNext: 'Next photo',
    galleryClose: 'Close view',
    galleryFullscreen: 'Open in fullscreen (Lightbox)',
    galleryZoomIn: 'Zoom in',
    galleryZoomOut: 'Zoom out',
    galleryResetZoom: 'Reset normal zoom',
    galleryPlay: 'Play auto slide rotation',
    galleryPause: 'Pause auto rotation',
    galleryViewGrid: 'Grid View',
    galleryViewCarousel: 'Carousel View',
    galleryCountOf: 'of',
    galleryAssetOfficial: 'Official CIIT 2026 Photographic Asset',
    galleryThumbnails: 'Thumbnails',
    galleryPressNotice: 'Official photography of the Tete International Investment Conference 2026. All rights reserved.',
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
    travelTitle: 'Travel & Official Accommodation',
    travelSubtitle: 'Essential travel logistics and recommended hotels in Tete City',
    travelAirportTitle: 'Getting Here (Chingozi Airport - TET)',
    travelAirportText: 'Chingozi Airport (TET) is located just 10 minutes from Tete city center, offering daily domestic flights from Maputo via Linhas Aéreas de Moçambique (LAM), and regular regional connections from Johannesburg (South Africa) and Harare (Zimbabwe).',
    travelVisasTitle: 'Visa Requirements (e-Visa)',
    travelVisasText: 'Mozambique has simplified investment entry with the introduction of the e-Visa portal. Citizens of various countries now enjoy visa exemptions for short-term business or tourism visits. Review evisa.gov.mz prior to your flight.',
    travelHotelsTitle: 'Recommended Hotels in Tete',
    travelHotelsBtn: 'View Hotel / Book',
    adminTitle: 'Conference Administration Portal',
    adminSubtitle: 'Real-time tracking of registration metrics, sector interest charts, and delegate logs',
    adminLoginPlaceholder: 'Enter administrator passcode...',
    adminLoginBtn: 'Access Portal',
    adminTotal: 'Total Delegates',
    adminStatusConfirmed: 'Confirmed',
    adminStatsTitle: 'Key Metrics & Attendance Distribution',
    adminTableTitle: 'Registered Delegates Database',
    adminAddManual: 'Register Manual Attendee',
    liveAttendanceTitle: 'Live Attendance',
    liveAttendanceSubtitle: 'Real-time tracking of attendee check-ins and entrance flow',
    liveTotalRegistered: 'Total Registered',
    livePresent: 'Present',
    livePending: 'Pending / On The Way',
    liveAttendanceRate: 'Attendance Rate',
    attendanceByTypeTitle: 'Attendance by Participation Type',
    attendanceByTypeSubtitle: 'Detailed breakdown of registered, confirmed present, and pending attendees by registration category',
    categoryDelegates: 'Executive Delegates',
    categoryInvestors: 'Investors',
    categoryGovernment: 'Government Officials',
    categorySpeakers: 'Speakers & Panelists',
    categorySponsors: 'Sponsors & Partners',
    statusOnTheWay: 'On the way',
    statusPresent: 'Present',
    filterByCategory: 'Filter by Category',
    filterByStatus: 'Filter by Attendance',
    allCategories: 'All Categories',
    allStatuses: 'All Statuses',
    onlyPresent: 'Only Present',
    onlyPending: 'Only on the Way (Pending)',
    viewAttendees: 'View Attendees',
    liveLatestCheckIns: 'Latest Check-ins',
    liveHourlyEvolution: 'Hourly Check-in Evolution',
    liveCheckInConfirmed: 'Check-in Confirmed',
    liveInvalidQr: 'Invalid QR Code',
    liveAlreadyCheckedIn: 'Check-in Already Completed',
    liveQrScanner: 'QR Code Scanner',
    liveOpenScanner: 'Launch Entrance Scanner',
    liveDemoMode: 'Demo Simulation',
    liveLoadDemo: 'Load Sample Attendees',
    liveClearDemo: 'Clear Test Data',
    liveOnline: 'ONLINE',
    liveOffline: 'OFFLINE (Pending sync)',
    liveJustNow: 'Just now',
    liveNoCheckInsYet: 'No check-ins recorded recently.',
    footerRights: 'All rights reserved. Government of Tete Province, Republic of Mozambique.'
  }
};

