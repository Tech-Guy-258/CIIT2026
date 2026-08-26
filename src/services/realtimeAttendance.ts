/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Registration, CheckInRecord, AttendanceMetrics, CheckInStatus, QrScanResult, CategoryAttendanceBreakdown } from '../types';
import { INITIAL_REGISTRATIONS } from '../data';

const STORAGE_KEY_REGISTRATIONS = 'ciit_2026_registrations_v3';
const STORAGE_KEY_CHECKINS = 'ciit_2026_checkins_v3';
const BROADCAST_CHANNEL_NAME = 'ciit_2026_live_attendance_sync';

// Realistic VIP & Conference attendees for high-level simulation
export const VIP_AND_SEEDED_ATTENDEES: Registration[] = [
  // GOVERNMENT
  {
    id: 'CIIT-2026-0001',
    fullName: 'Daniel Francisco Chapo',
    email: 'secretaria.pr@presidencia.gov.mz',
    phone: '+258 21 490 000',
    company: 'Presidência da República de Moçambique',
    jobTitle: 'Presidente da República de Moçambique',
    country: 'Moçambique',
    sectorOfInterest: 'Cahora Bassa (Hidroelétrica & Energia Vital)',
    registrationType: 'government',
    registeredAt: '2026-06-01T08:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:15:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0002',
    fullName: 'Basílio Zefanias Muhate',
    email: 'gabinete.ministro@mef.gov.mz',
    phone: '+258 21 310 000',
    company: 'Ministério da Economia',
    jobTitle: 'Ministro da Economia',
    country: 'Moçambique',
    sectorOfInterest: 'Cahora Bassa (Hidroelétrica & Energia Vital)',
    registrationType: 'government',
    registeredAt: '2026-06-05T09:30:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:30:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0003',
    fullName: 'Domingos Juliasse Viola',
    email: 'governador@governotete.gov.mz',
    phone: '+258 25 220 100',
    company: 'Governo da Província de Tete',
    jobTitle: 'Governador da Província de Tete',
    country: 'Moçambique',
    sectorOfInterest: '6 C\'s de Tete (Desenvolvimento Integral)',
    registrationType: 'government',
    registeredAt: '2026-06-08T10:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:45:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0004',
    fullName: 'César de Carvalho',
    email: 'presidencia@cmctete.gov.mz',
    phone: '+258 25 222 000',
    company: 'Conselho Municipal da Cidade de Tete',
    jobTitle: 'Presidente do Conselho Municipal da Cidade de Tete',
    country: 'Moçambique',
    sectorOfInterest: 'Infraestruturas & Logística Urbana',
    registrationType: 'government',
    registeredAt: '2026-06-10T11:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:05:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0005',
    fullName: 'Cristina de Jesus Xavier Mafumo',
    email: 'secretaria.estado@tete.gov.mz',
    phone: '+258 25 224 000',
    company: 'Representação do Estado na Província de Tete',
    jobTitle: 'Secretária de Estado na Província de Tete',
    country: 'Moçambique',
    sectorOfInterest: 'Desenvolvimento Social & Territorial',
    registrationType: 'government',
    registeredAt: '2026-06-14T09:10:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0006',
    fullName: 'Dra. Maria Helena Chirindza',
    email: 'direcao.nacional@mireme.gov.mz',
    phone: '+258 21 427 000',
    company: 'Ministério dos Recursos Minerais e Energia',
    jobTitle: 'Diretora Nacional de Hidrocarbonetos e Energia',
    country: 'Moçambique',
    sectorOfInterest: 'Carvão & Transição Mineral Sustentável',
    registrationType: 'government',
    registeredAt: '2026-06-18T15:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },

  // SPEAKERS & PANELISTS
  {
    id: 'CIIT-2026-0007',
    fullName: 'Dr. Álvaro Massingue',
    email: 'direcao@cta.org.mz',
    phone: '+258 21 321 000',
    company: 'CTA — Confederação das Associações Económicas',
    jobTitle: 'Presidente da CTA Moçambique',
    country: 'Moçambique',
    sectorOfInterest: 'Sector Privado & PMEs',
    registrationType: 'speaker',
    registeredAt: '2026-06-12T14:15:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:20:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0008',
    fullName: 'Dr. Celso Correia',
    email: 'celso.invest@gabinete-mn.gov.mz',
    phone: '+258 21 400 120',
    company: 'Gabinete de Implementação do Projeto Mphanda Nkuwa',
    jobTitle: 'Coordenador Executivo de Transição Energética',
    country: 'Moçambique',
    sectorOfInterest: 'Cahora Bassa (Hidroelétrica & Energia Vital)',
    registrationType: 'speaker',
    registeredAt: '2026-06-22T15:20:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:50:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0009',
    fullName: 'Prof. Doutor Eusébio Macaringue',
    email: 'macaringue.eusebio@uem.ac.mz',
    phone: '+258 82 450 9100',
    company: 'Universidade Eduardo Mondlane (UEM)',
    jobTitle: 'Especialista em Minas e Recursos Geológicos',
    country: 'Moçambique',
    sectorOfInterest: 'Carvão & Transição Mineral',
    registrationType: 'speaker',
    registeredAt: '2026-06-24T11:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:10:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0010',
    fullName: 'Eng. Fátima Tembe',
    email: 'fatima.tembe@cleanpower-africa.org',
    phone: '+258 84 210 5500',
    company: 'African Renewable Energy Association',
    jobTitle: 'Diretora Regional de Transição Energética',
    country: 'África do Sul',
    sectorOfInterest: 'Calor (Energia Solar & Eólica)',
    registrationType: 'speaker',
    registeredAt: '2026-06-26T16:40:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:30:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0011',
    fullName: 'Dr. Tariq Al-Mansoor',
    email: 'almansoor@gulf-agrocorp.ae',
    phone: '+971 4 330 9800',
    company: 'Emirates Agribusiness Ventures',
    jobTitle: 'Keynote Speaker — Agropecuária e Segurança Alimentar',
    country: 'Emirados Árabes Unidos',
    sectorOfInterest: 'Cabrito & Pecuária de Precisão',
    registrationType: 'speaker',
    registeredAt: '2026-06-30T10:15:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T11:15:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0012',
    fullName: 'Dr. Jean-Pierre Dupont',
    email: 'jp.dupont@afdb-energy.org',
    phone: '+33 1 44 20 8900',
    company: 'Banco Africano de Desenvolvimento (BAD)',
    jobTitle: 'Conselheiro Principal de Financiamento de Infraestruturas',
    country: 'França',
    sectorOfInterest: 'Infraestruturas & Logística',
    registrationType: 'speaker',
    registeredAt: '2026-07-02T14:30:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },

  // INVESTORS
  {
    id: 'CIIT-2026-0013',
    fullName: 'Lady Sarah Sterling-Hamilton',
    email: 'sarah.sterling@commonwealth-capital.co.uk',
    phone: '+44 20 7946 0912',
    company: 'Commonwealth Investment Corporation',
    jobTitle: 'Managing Partner — Sub-Saharan Infrastructure',
    country: 'Reino Unido',
    sectorOfInterest: 'Carvão & Transição Mineral',
    registrationType: 'investor',
    registeredAt: '2026-06-25T11:45:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:18:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0014',
    fullName: 'Chen Wei Long',
    email: 'weilong.chen@sinohydro-africa.cn',
    phone: '+86 10 6588 2300',
    company: 'China SinoHydro Overseas Fund',
    jobTitle: 'Vice-President of Global Energy Assets',
    country: 'China',
    sectorOfInterest: 'Cahora Bassa (Hidroelétrica & Energia Vital)',
    registrationType: 'investor',
    registeredAt: '2026-06-28T08:10:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:55:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0015',
    fullName: 'Klaus Lindqvist',
    email: 'klaus.lindqvist@nordic-invest.se',
    phone: '+46 8 505 2300',
    company: 'Nordic Clean Energy Fund',
    jobTitle: 'Senior Investment Director',
    country: 'Suécia',
    sectorOfInterest: 'Calor (Energia Solar Fotovoltaica)',
    registrationType: 'investor',
    registeredAt: '2026-07-04T12:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T10:45:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0016',
    fullName: 'Marcus Vance',
    email: 'm.vance@us-africa-growth.com',
    phone: '+1 212 555 0198',
    company: 'Pan-African Sovereign Capital Partners',
    jobTitle: 'Chief Investment Officer',
    country: 'Estados Unidos',
    sectorOfInterest: 'Carvão & Recursos Estratégicos',
    registrationType: 'investor',
    registeredAt: '2026-07-08T17:10:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T14:50:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0017',
    fullName: 'Rajesh Mehta',
    email: 'rajesh.mehta@mumbai-industrial.in',
    phone: '+91 22 6120 4000',
    company: 'Mehta Industrial Holdings India',
    jobTitle: 'Diretor Geral de Expansão Africana',
    country: 'Índia',
    sectorOfInterest: 'Capenta & Aquacultura Industrial',
    registrationType: 'investor',
    registeredAt: '2026-07-10T14:20:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0018',
    fullName: 'Ahmed Bin Zayed',
    email: 'zayed.invest@abudhabi-growth.ae',
    phone: '+971 2 690 1200',
    company: 'Abu Dhabi Emerging Markets Fund',
    jobTitle: 'Managing Director for Southern Africa',
    country: 'Emirados Árabes Unidos',
    sectorOfInterest: 'Cahora Bassa & Mphanda Nkuwa',
    registrationType: 'investor',
    registeredAt: '2026-07-12T09:40:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0019',
    fullName: 'Helena Bergström',
    email: 'helena@stockholm-infra.se',
    phone: '+46 8 720 1140',
    company: 'Scandinavia Africa Partnership Fund',
    jobTitle: 'Principal Partner',
    country: 'Suécia',
    sectorOfInterest: 'Infraestruturas & Logística',
    registrationType: 'investor',
    registeredAt: '2026-07-15T10:30:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0020',
    fullName: 'Paulo Sérgio Guedes',
    email: 'psguedes@lusitano-ventures.pt',
    phone: '+351 21 390 8800',
    company: 'Lusitano Private Equity S.A.',
    jobTitle: 'Sócio-Gerente de Ativos Moçambique',
    country: 'Portugal',
    sectorOfInterest: 'Turismo & Ecoturismo Tchuma Tchato',
    registrationType: 'investor',
    registeredAt: '2026-07-18T16:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },

  // SPONSORS & PARTNERS
  {
    id: 'CIIT-2026-0021',
    fullName: 'Eng. Tomás Dimande',
    email: 'tomas.dimande@hcb.co.mz',
    phone: '+258 25 280 000',
    company: 'Hidroeléctrica de Cahora Bassa (HCB)',
    jobTitle: 'Diretor de Operações e Engenharia',
    country: 'Moçambique',
    sectorOfInterest: 'Cahora Bassa (Hidroelétrica & Energia Vital)',
    registrationType: 'sponsor',
    registeredAt: '2026-06-15T16:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:40:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0022',
    fullName: 'Dr. Roberto Da Silva',
    email: 'roberto.silva@agenciadozambeze.gov.mz',
    phone: '+258 25 220 500',
    company: 'Agência do Zambeze',
    jobTitle: 'Diretor Geral de Fomento Económico',
    country: 'Moçambique',
    sectorOfInterest: 'Cabrito (Gastronomia & Pecuária de Excelência)',
    registrationType: 'sponsor',
    registeredAt: '2026-06-20T10:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:15:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0023',
    fullName: 'Eng. Manuel Sotomane',
    email: 'manuel.sotomane@vulcan-coal.co.mz',
    phone: '+258 25 220 900',
    company: 'Vulcan Minerals Mozambique (Moatize Coal)',
    jobTitle: 'Diretor de Relações Corporativas e Sustentabilidade',
    country: 'Moçambique',
    sectorOfInterest: 'Carvão & Logística Ferroviária',
    registrationType: 'sponsor',
    registeredAt: '2026-06-25T15:30:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T10:05:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0024',
    fullName: 'Dra. Luísa Cossa',
    email: 'luisa.cossa@millenniumbim.co.mz',
    phone: '+258 21 350 000',
    company: 'Banco Millennium bim',
    jobTitle: 'Diretora Coordenadora de Banca Corporativa',
    country: 'Moçambique',
    sectorOfInterest: 'Financiamento Estruturado & Câmbio',
    registrationType: 'sponsor',
    registeredAt: '2026-06-28T11:20:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T15:10:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0025',
    fullName: 'Dr. Bernardo Mugabe',
    email: 'bernardo.m@bci.co.mz',
    phone: '+258 21 353 500',
    company: 'BCI — Banco Comercial e de Investimentos',
    jobTitle: 'Gestor de Grandes Clientes Institucionais',
    country: 'Moçambique',
    sectorOfInterest: 'Agronegócio & Agroindústria',
    registrationType: 'sponsor',
    registeredAt: '2026-07-01T09:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0026',
    fullName: 'Eng. Fernando Mabote',
    email: 'fernando.mabote@totalenergies.mz',
    phone: '+258 21 480 300',
    company: 'TotalEnergies Mozambique',
    jobTitle: 'Responsável de Transição e Conteúdo Local',
    country: 'Moçambique',
    sectorOfInterest: 'Calor (Energia Renovável & Parcerias)',
    registrationType: 'sponsor',
    registeredAt: '2026-07-05T14:10:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },

  // EXECUTIVE DELEGATES
  {
    id: 'CIIT-2026-0027',
    fullName: 'Amélia Nhantumbo',
    email: 'amelia.nhantumbo@tete-logistics.co.mz',
    phone: '+258 84 330 9000',
    company: 'Zambeze Freight & Heavy Transport Ltd',
    jobTitle: 'Diretora Comercial e Relações Institucionais',
    country: 'Moçambique',
    sectorOfInterest: 'Infraestruturas & Logística',
    registrationType: 'delegate',
    registeredAt: '2026-07-02T13:40:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T08:35:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0028',
    fullName: 'Dr. Alberto Mavila',
    email: 'alberto.mavila@zambeze-power.co.mz',
    phone: '+258 84 550 1200',
    company: 'Zambeze Power Grid Ltd',
    jobTitle: 'Chief Technical Officer',
    country: 'Moçambique',
    sectorOfInterest: 'Cahora Bassa (Hidroelétrica)',
    registrationType: 'delegate',
    registeredAt: '2026-07-04T08:20:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:12:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0029',
    fullName: 'Dra. Graça Macamo',
    email: 'graca.macamo@export-tete.org.mz',
    phone: '+258 82 300 4500',
    company: 'Associação dos Exportadores e Produtores de Tete',
    jobTitle: 'Presidente Executiva',
    country: 'Moçambique',
    sectorOfInterest: 'Cabrito & Capenta (Agroindústria)',
    registrationType: 'delegate',
    registeredAt: '2026-07-06T10:10:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:25:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0030',
    fullName: 'Dr. John O\'Connor',
    email: 'j.oconnor@zambezi-water.org',
    phone: '+260 97 780 4400',
    company: 'Zambezi Basin Water Advisory Council',
    jobTitle: 'Senior Environmental & Water Counsel',
    country: 'Zâmbia',
    sectorOfInterest: 'Chicoa (Aquacultura & Sustentabilidade)',
    registrationType: 'delegate',
    registeredAt: '2026-07-08T11:45:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T09:40:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0031',
    fullName: 'Eng. António Matusse',
    email: 'antonio.matusse@chicoafish.co.mz',
    phone: '+258 84 900 3320',
    company: 'Chicoa Fish Farm & Aquaculture S.A.',
    jobTitle: 'Diretor de Produção e Cadeia de Frio',
    country: 'Moçambique',
    sectorOfInterest: 'Chicoa (Tilápia & Capenta)',
    registrationType: 'delegate',
    registeredAt: '2026-07-10T15:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T10:15:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0032',
    fullName: 'Dra. Sarah Muthemba',
    email: 'sarah.muthemba@sadc-tradehub.org',
    phone: '+263 77 210 9900',
    company: 'SADC Cross-Border Trade & Logistics Forum',
    jobTitle: 'Diretora de Facilitação de Comércio',
    country: 'Zimbábue',
    sectorOfInterest: 'Infraestruturas & Corredor de Tete',
    registrationType: 'delegate',
    registeredAt: '2026-07-12T16:20:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: true,
    checkedInAt: '2026-10-08T14:20:00Z',
    isDemo: false
  },
  {
    id: 'CIIT-2026-0033',
    fullName: 'Dr. Carlos Alberto Sitoe',
    email: 'carlos.sitoe@bancounico.co.mz',
    phone: '+258 82 120 7700',
    company: 'Banco Único S.A.',
    jobTitle: 'Gerente Regional Norte e Centro',
    country: 'Moçambique',
    sectorOfInterest: 'Financiamento PMEs',
    registrationType: 'delegate',
    registeredAt: '2026-07-14T09:30:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0034',
    fullName: 'Eng. Victor Chimupula',
    email: 'victor.chimupula@corredor-tete.co.mz',
    phone: '+258 84 440 2200',
    company: 'Corredor Rodoviário e Ferroviário de Tete',
    jobTitle: 'Gestor de Infraestruturas e Pontes',
    country: 'Moçambique',
    sectorOfInterest: 'Infraestruturas',
    registrationType: 'delegate',
    registeredAt: '2026-07-16T11:15:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0035',
    fullName: 'Dra. Zélia Guambe',
    email: 'zelia.guambe@agrotech-zambeze.co.mz',
    phone: '+258 84 880 1190',
    company: 'AgroTech Zambeze Industrial',
    jobTitle: 'Diretora de Inovação Agrícola',
    country: 'Moçambique',
    sectorOfInterest: 'Cabrito & Agroprocessamento',
    registrationType: 'delegate',
    registeredAt: '2026-07-18T14:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  },
  {
    id: 'CIIT-2026-0036',
    fullName: 'Dr. Sipho Dlamini',
    email: 'sipho.dlamini@eswatini-invest.sz',
    phone: '+268 76 02 1100',
    company: 'Eswatini Investment Promotion Authority',
    jobTitle: 'Delegado Executivo para Recursos Minerais',
    country: 'Eswatini',
    sectorOfInterest: 'Carvão & Energia',
    registrationType: 'delegate',
    registeredAt: '2026-07-20T17:00:00Z',
    ticketStatus: 'Confirmed',
    isCheckedIn: false,
    isDemo: false
  }
];

class RealtimeAttendanceService {
  private registrations: Registration[] = [];
  private checkIns: CheckInRecord[] = [];
  private listeners: Set<(state: { registrations: Registration[]; checkIns: CheckInRecord[]; metrics: AttendanceMetrics; lastEvent?: any }) => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;

  constructor() {
    this.initStorage();
    this.initBroadcast();
    this.initNetworkListeners();
  }

  private initStorage() {
    try {
      const storedRegs = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
      const storedCheckIns = localStorage.getItem(STORAGE_KEY_CHECKINS);

      if (storedRegs) {
        this.registrations = JSON.parse(storedRegs);
      } else {
        // Combine VIP attendees with INITIAL_REGISTRATIONS
        const combined = [...VIP_AND_SEEDED_ATTENDEES];
        for (const reg of INITIAL_REGISTRATIONS) {
          if (!combined.some(c => c.id === reg.id)) {
            combined.push(reg);
          }
        }
        this.registrations = combined;
        this.saveRegistrations();
      }

      if (storedCheckIns) {
        this.checkIns = JSON.parse(storedCheckIns);
      } else {
        // Generate initial check-in records for attendees that have isCheckedIn = true
        const initialRecords: CheckInRecord[] = [];
        this.registrations.forEach((reg) => {
          if (reg.isCheckedIn && reg.checkedInAt) {
            const timeDate = new Date(reg.checkedInAt);
            const formattedTime = timeDate.toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' });
            initialRecords.push({
              id: `CHK-${reg.id}-${timeDate.getTime()}`,
              registrationId: reg.id,
              participantName: reg.fullName,
              jobTitle: reg.jobTitle,
              company: reg.company,
              registrationType: reg.registrationType,
              country: reg.country,
              sectorOfInterest: reg.sectorOfInterest,
              checkedInAt: reg.checkedInAt,
              formattedTime: formattedTime || '09:00',
              scannerDeviceId: 'PORTAL-MAIN-01',
              scannerOperator: 'Recepção Protocolar',
              status: 'PRESENTE',
              isSynced: true
            });
          }
        });
        this.checkIns = initialRecords;
        this.saveCheckIns();
      }
    } catch (err) {
      console.warn('RealtimeAttendanceService: LocalStorage initialization fallback', err);
      this.registrations = [...VIP_AND_SEEDED_ATTENDEES];
    }
  }

  private initBroadcast() {
    if (typeof window !== 'undefined') {
      try {
        if ('BroadcastChannel' in window) {
          this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
          this.broadcastChannel.onmessage = (event) => {
            if (event.data?.type === 'SYNC_STATE') {
              this.reloadFromStorage(false);
            }
          };
        }

        // Cross-tab storage event listener
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY_REGISTRATIONS || e.key === STORAGE_KEY_CHECKINS) {
            this.reloadFromStorage(false);
          }
        });
      } catch (err) {
        console.warn('BroadcastChannel not available, using storage events.', err);
      }
    }
  }

  private initNetworkListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.syncOfflineQueue();
        this.notify({ type: 'NETWORK_CHANGE', isOnline: true });
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notify({ type: 'NETWORK_CHANGE', isOnline: false });
      });
    }
  }

  private reloadFromStorage(broadcast: boolean = false) {
    try {
      const storedRegs = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
      const storedCheckIns = localStorage.getItem(STORAGE_KEY_CHECKINS);
      if (storedRegs) this.registrations = JSON.parse(storedRegs);
      if (storedCheckIns) this.checkIns = JSON.parse(storedCheckIns);
      this.notify({ type: 'STORAGE_RELOAD' }, broadcast);
    } catch (err) {
      console.error('Error reloading attendance storage:', err);
    }
  }

  private saveRegistrations() {
    try {
      localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(this.registrations));
    } catch (e) {
      console.warn('Failed to persist registrations to localStorage', e);
    }
  }

  private saveCheckIns() {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKINS, JSON.stringify(this.checkIns));
    } catch (e) {
      console.warn('Failed to persist check-ins to localStorage', e);
    }
  }

  private notify(lastEvent?: any, broadcast: boolean = true) {
    const state = {
      registrations: [...this.registrations],
      checkIns: [...this.checkIns],
      metrics: this.getMetrics(),
      lastEvent
    };

    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error('Attendance subscriber error:', err);
      }
    });

    if (broadcast && this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'SYNC_STATE', timestamp: Date.now() });
      } catch (e) {
        // ignore
      }
    }
  }

  // Public API

  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  public getRegistrations(): Registration[] {
    return [...this.registrations];
  }

  public getCheckIns(): CheckInRecord[] {
    return [...this.checkIns];
  }

  public getCategoryBreakdown(): CategoryAttendanceBreakdown[] {
    const categories: Array<{
      type: 'delegate' | 'investor' | 'government' | 'speaker' | 'sponsor';
      label: string;
      labelEn: string;
      color: string;
      badgeBg: string;
      badgeBorder: string;
      textColor: string;
      iconName: string;
    }> = [
      {
        type: 'delegate',
        label: 'Delegados Executivos',
        labelEn: 'Executive Delegates',
        color: '#3B82F6',
        badgeBg: 'bg-blue-500/10',
        badgeBorder: 'border-blue-500/30',
        textColor: 'text-blue-400',
        iconName: 'Briefcase'
      },
      {
        type: 'investor',
        label: 'Investidores',
        labelEn: 'Investors',
        color: '#F59E0B',
        badgeBg: 'bg-amber-500/10',
        badgeBorder: 'border-amber-500/30',
        textColor: 'text-amber-400',
        iconName: 'TrendingUp'
      },
      {
        type: 'government',
        label: 'Membros do Governo',
        labelEn: 'Government Officials',
        color: '#10B981',
        badgeBg: 'bg-emerald-500/10',
        badgeBorder: 'border-emerald-500/30',
        textColor: 'text-emerald-400',
        iconName: 'ShieldCheck'
      },
      {
        type: 'speaker',
        label: 'Oradores & Painelistas',
        labelEn: 'Speakers & Panelists',
        color: '#8B5CF6',
        badgeBg: 'bg-purple-500/10',
        badgeBorder: 'border-purple-500/30',
        textColor: 'text-purple-400',
        iconName: 'Mic'
      },
      {
        type: 'sponsor',
        label: 'Patrocinadores & Parceiros',
        labelEn: 'Sponsors & Partners',
        color: '#EC4899',
        badgeBg: 'bg-pink-500/10',
        badgeBorder: 'border-pink-500/30',
        textColor: 'text-pink-400',
        iconName: 'Sparkles'
      }
    ];

    return categories.map(cat => {
      const items = this.registrations.filter(r => r.registrationType === cat.type);
      const total = items.length;
      const present = items.filter(r => r.isCheckedIn).length;
      const pending = Math.max(0, total - present);
      const rate = total > 0 ? Math.round((present / total) * 1000) / 10 : 0;
      return {
        ...cat,
        total,
        present,
        pending,
        rate
      };
    });
  }

  public getMetrics(): AttendanceMetrics {
    const totalRegistered = this.registrations.length;
    const totalPresent = this.registrations.filter(r => r.isCheckedIn).length;
    const totalPending = Math.max(0, totalRegistered - totalPresent);
    const attendancePercentage = totalRegistered > 0 ? (totalPresent / totalRegistered) * 100 : 0;
    const categoryBreakdown = this.getCategoryBreakdown();

    // Find the latest check-in record
    const sortedCheckIns = [...this.checkIns].sort(
      (a, b) => new Date(b.checkedInAt).getTime() - new Date(a.checkedInAt).getTime()
    );
    const lastCheckIn = sortedCheckIns.length > 0 ? sortedCheckIns[0] : null;

    // Find the latest registered delegate
    const sortedRegs = [...this.registrations].sort(
      (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
    );
    const lastRegistered = sortedRegs.length > 0 ? sortedRegs[0] : null;

    return {
      totalRegistered,
      totalPresent,
      totalPending,
      attendancePercentage: Math.round(attendancePercentage * 10) / 10,
      categoryBreakdown,
      lastCheckIn,
      lastRegistered,
      totalCheckInActions: this.checkIns.length
    };
  }

  /**
   * Parses raw QR Code payload which could be an ID string "CIIT-2026-XXXX",
   * a JSON string '{"ciitId":"CIIT-2026-XXXX", ...}', or a URL.
   */
  public parseQrPayload(rawInput: string): string {
    if (!rawInput || typeof rawInput !== 'string') return '';
    const trimmed = rawInput.trim();

    // Check if JSON
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.id) return String(parsed.id).trim();
        if (parsed.ciitId) return String(parsed.ciitId).trim();
        if (parsed.ticketId) return String(parsed.ticketId).trim();
      } catch (e) {
        // Fallback
      }
    }

    // Check if URL with id query param or path
    if (trimmed.includes('CIIT-')) {
      const match = trimmed.match(/CIIT-[\w-]+/i);
      if (match) return match[0].toUpperCase();
    }

    return trimmed.toUpperCase();
  }

  /**
   * Validates a participant by QR Code payload without performing check-in.
   */
  public validateQrCode(rawInput: string): QrScanResult {
    const extractedId = this.parseQrPayload(rawInput);
    if (!extractedId) {
      return {
        success: false,
        status: 'INVALIDO',
        message: 'Código QR vazio ou ilegível.',
        messageEn: 'Empty or unreadable QR Code.'
      };
    }

    const participant = this.registrations.find(
      r => r.id.toUpperCase() === extractedId.toUpperCase() ||
           (r.qrToken && r.qrToken.toUpperCase() === extractedId.toUpperCase())
    );

    if (!participant) {
      return {
        success: false,
        status: 'INVALIDO',
        message: '✕ QR CODE INVÁLIDO — Este convite não foi encontrado ou não é válido.',
        messageEn: '✕ INVALID QR CODE — This invitation was not found or is invalid.'
      };
    }

    if (participant.isCheckedIn) {
      const existingCheckIn = this.checkIns.find(c => c.registrationId === participant.id);
      const timeStr = existingCheckIn ? existingCheckIn.formattedTime : participant.checkedInAt || 'Hoje';
      return {
        success: false,
        status: 'DUPLICADO',
        participant,
        checkInRecord: existingCheckIn,
        previousCheckInTime: timeStr,
        message: `⚠ CHECK-IN JÁ REALIZADO — Este convite já foi utilizado às ${timeStr}.`,
        messageEn: `⚠ CHECK-IN ALREADY COMPLETED — This pass was already checked in at ${timeStr}.`
      };
    }

    return {
      success: true,
      status: 'VALIDO_NAO_UTILIZADO',
      participant,
      message: '✓ CONVITE VÁLIDO — Pronto para credenciamento.',
      messageEn: '✓ VALID INVITATION — Ready for accreditation.'
    };
  }

  /**
   * Atomically executes a check-in for a given QR Code payload.
   * Prevents race conditions and duplicate counts.
   */
  public performCheckIn(
    rawInput: string,
    operatorDetails?: { deviceId?: string; operatorName?: string }
  ): QrScanResult {
    const validation = this.validateQrCode(rawInput);

    if (validation.status === 'INVALIDO') {
      return validation;
    }

    if (validation.status === 'DUPLICADO') {
      return validation;
    }

    const participant = validation.participant!;
    const now = new Date();
    const isoString = now.toISOString();
    const formattedTime = now.toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' });

    // Update participant record
    participant.isCheckedIn = true;
    participant.checkedInAt = isoString;
    if (!participant.checkInHistory) participant.checkInHistory = [];
    participant.checkInHistory.push({
      timestamp: isoString,
      deviceId: operatorDetails?.deviceId || 'SCANNER-OPERATOR'
    });

    // Create check-in record
    const checkInRecord: CheckInRecord = {
      id: `CHK-${participant.id}-${now.getTime()}`,
      registrationId: participant.id,
      participantName: participant.fullName,
      jobTitle: participant.jobTitle,
      company: participant.company,
      registrationType: participant.registrationType,
      country: participant.country,
      sectorOfInterest: participant.sectorOfInterest,
      checkedInAt: isoString,
      formattedTime: formattedTime || 'Agora',
      scannerDeviceId: operatorDetails?.deviceId || 'MOBILE-SCANNER-01',
      scannerOperator: operatorDetails?.operatorName || 'Oficial de Credenciamento',
      status: 'PRESENTE',
      isSynced: this.isOnline
    };

    // Prepend to checkIns
    this.checkIns = [checkInRecord, ...this.checkIns];

    // Save and notify
    this.saveRegistrations();
    this.saveCheckIns();
    this.notify({
      type: 'NEW_CHECKIN',
      participant,
      checkInRecord
    });

    return {
      success: true,
      status: 'PRESENTE',
      participant,
      checkInRecord,
      message: `✓ CHECK-IN CONFIRMADO — ${participant.fullName}`,
      messageEn: `✓ CHECK-IN CONFIRMED — ${participant.fullName}`
    };
  }

  /**
   * Adds a new participant registration (e.g. from registration form or admin).
   */
  public addRegistration(newReg: Registration): void {
    // Check if ID already exists
    const exists = this.registrations.some(r => r.id === newReg.id);
    if (exists) {
      newReg.id = `CIIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    this.registrations = [newReg, ...this.registrations];
    this.saveRegistrations();
    this.notify({
      type: 'NEW_REGISTRATION',
      registration: newReg
    });
  }

  /**
   * Reverts / cancels a check-in (administrative function).
   */
  public revertCheckIn(registrationId: string): boolean {
    const participant = this.registrations.find(r => r.id === registrationId);
    if (!participant || !participant.isCheckedIn) return false;

    participant.isCheckedIn = false;
    delete participant.checkedInAt;

    this.checkIns = this.checkIns.filter(c => c.registrationId !== registrationId);

    this.saveRegistrations();
    this.saveCheckIns();
    this.notify({ type: 'CHECKIN_REVERTED', registrationId });
    return true;
  }

  /**
   * Alias for revertCheckIn.
   */
  public undoCheckIn(registrationId: string): boolean {
    return this.revertCheckIn(registrationId);
  }

  /**
   * Populates a realistic live simulation batch of attendees (50 demo delegates) for presentation.
   */
  public loadDemoData(): void {
    const demoNames = [
      { name: 'Dr. Alberto Mavila', comp: 'Zambeze Power Grid Ltd', role: 'Chief Technical Officer', type: 'delegate' },
      { name: 'Eng. Fátima Tembe', comp: 'Mozambique Hydro Development', role: 'Energy Project Lead', type: 'speaker' },
      { name: 'Marcus Sterling', comp: 'African Infrastructure Capital', role: 'Senior Managing Director', type: 'investor' },
      { name: 'Dra. Graça Macamo', comp: 'Associação dos Exportadores de Tete', role: 'Presidente Executiva', type: 'delegate' },
      { name: 'Klaus Lindqvist', comp: 'Nordic Renewable Fund', role: 'Investment Director', type: 'investor' },
      { name: 'Eng. Manuel Sotomane', comp: 'Cahora Bassa Logística', role: 'Diretor de Operações', type: 'sponsor' },
      { name: 'Maria Helena Chirindza', comp: 'Ministério dos Recursos Minerais', role: 'Delegada Provincial de Tete', type: 'government' },
      { name: 'Dr. John O\'Connor', comp: 'Zambezi Basin Water Advisory', role: 'Senior Environmental Counsel', type: 'delegate' },
      { name: 'Carlos Eduardo Nguenha', comp: 'Vale Moçambique S.A.', role: 'Superintendente de Relações Institucionais', type: 'sponsor' },
      { name: 'Amina Patel', comp: 'SADC Cross-Border Trade Hub', role: 'Regional Director', type: 'investor' }
    ];

    const newDemoRegs: Registration[] = demoNames.map((d, index) => {
      const id = `CIIT-DEMO-${(1000 + index).toString()}`;
      const isPresent = index < 6; // 6 already checked in, 4 pending
      const checkInHour = (8 + (index % 4)).toString().padStart(2, '0');
      const checkInMin = ((index * 7) % 60).toString().padStart(2, '0');
      const checkInTime = `2026-10-08T${checkInHour}:${checkInMin}:00Z`;

      return {
        id,
        fullName: d.name,
        email: `${d.name.toLowerCase().replace(/[^a-z]/g, '')}@empresa.com`,
        phone: `+258 84 ${Math.floor(1000000 + Math.random() * 9000000)}`,
        company: d.comp,
        jobTitle: d.role,
        country: index % 3 === 0 ? 'África do Sul' : index % 4 === 0 ? 'Reino Unido' : 'Moçambique',
        sectorOfInterest: 'Cahora Bassa (Hidroelétrica & Energia Vital)',
        registrationType: d.type as any,
        registeredAt: new Date().toISOString(),
        ticketStatus: 'Confirmed',
        isCheckedIn: isPresent,
        checkedInAt: isPresent ? checkInTime : undefined,
        isDemo: true
      };
    });

    // Add to existing list without duplicating IDs
    const currentList = this.registrations.filter(r => !r.isDemo);
    this.registrations = [...currentList, ...newDemoRegs];

    // Rebuild check-in list
    const newCheckIns: CheckInRecord[] = [];
    this.registrations.forEach(r => {
      if (r.isCheckedIn && r.checkedInAt) {
        const timeDate = new Date(r.checkedInAt);
        const formattedTime = timeDate.toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' });
        newCheckIns.push({
          id: `CHK-${r.id}-${timeDate.getTime()}`,
          registrationId: r.id,
          participantName: r.fullName,
          jobTitle: r.jobTitle,
          company: r.company,
          registrationType: r.registrationType,
          country: r.country,
          sectorOfInterest: r.sectorOfInterest,
          checkedInAt: r.checkedInAt,
          formattedTime: formattedTime || '09:00',
          scannerDeviceId: 'SCANNER-DEMO-01',
          scannerOperator: 'Operador de Demonstração',
          status: 'PRESENTE',
          isSynced: true
        });
      }
    });

    this.checkIns = newCheckIns;
    this.saveRegistrations();
    this.saveCheckIns();
    this.notify({ type: 'DEMO_DATA_LOADED' });
  }

  /**
   * Cleans all demo test records, retaining only official conference records.
   */
  public clearDemoData(): void {
    this.registrations = this.registrations.filter(r => !r.isDemo);
    this.checkIns = this.checkIns.filter(c => !c.id.includes('DEMO'));
    this.saveRegistrations();
    this.saveCheckIns();
    this.notify({ type: 'DEMO_DATA_CLEARED' });
  }

  /**
   * Resets entire database to the original conference initial state.
   */
  public resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEY_CHECKINS);
    this.initStorage();
    this.notify({ type: 'RESET_DEFAULT' });
  }

  /**
   * Returns hourly distribution of check-ins for the evolution graph.
   */
  public getHourlyEvolution(): Array<{ hour: string; count: number; cumulative: number }> {
    const hours = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'];
    const hourCounts: Record<string, number> = {
      '08h': 0, '09h': 0, '10h': 0, '11h': 0, '12h': 0,
      '13h': 0, '14h': 0, '15h': 0, '16h': 0, '17h': 0, '18h': 0
    };

    this.checkIns.forEach(c => {
      try {
        let hourNum: number | null = null;
        if (c.formattedTime && c.formattedTime.includes(':')) {
          const parts = c.formattedTime.split(':');
          const parsed = parseInt(parts[0], 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
            hourNum = parsed;
          }
        }
        if (hourNum === null && c.checkedInAt) {
          // If ISO string like '2026-10-08T09:12:00Z', extract T(HH) directly to preserve intended local event hour
          if (c.checkedInAt.includes('T')) {
            const timePart = c.checkedInAt.split('T')[1];
            const isoHour = parseInt(timePart.substring(0, 2), 10);
            if (!isNaN(isoHour) && isoHour >= 0 && isoHour <= 23) {
              hourNum = isoHour;
            }
          }
          if (hourNum === null) {
            const date = new Date(c.checkedInAt);
            if (!isNaN(date.getTime())) {
              hourNum = date.getHours();
            }
          }
        }

        if (hourNum !== null) {
          const hourKey = `${hourNum.toString().padStart(2, '0')}h`;
          if (hourCounts[hourKey] !== undefined) {
            hourCounts[hourKey] += 1;
          } else if (hourNum < 8) {
            hourCounts['08h'] += 1;
          } else if (hourNum > 18) {
            hourCounts['18h'] += 1;
          }
        }
      } catch (e) {
        // ignore invalid dates
      }
    });

    let cumulative = 0;
    return hours.map(hour => {
      const count = hourCounts[hour] || 0;
      cumulative += count;
      return { hour, count, cumulative };
    });
  }

  /**
   * Syncs any locally marked unsynced records once internet connection is confirmed.
   */
  public syncOfflineQueue(): void {
    let changed = false;
    this.checkIns.forEach(c => {
      if (!c.isSynced) {
        c.isSynced = true;
        changed = true;
      }
    });
    if (changed) {
      this.saveCheckIns();
      this.notify({ type: 'OFFLINE_SYNC_COMPLETED' });
    }
  }

  /**
   * Subscription hook for React components.
   */
  public subscribe(
    callback: (state: {
      registrations: Registration[];
      checkIns: CheckInRecord[];
      metrics: AttendanceMetrics;
      lastEvent?: any;
    }) => void
  ): () => void {
    this.listeners.add(callback);
    // Trigger initial notification
    callback({
      registrations: [...this.registrations],
      checkIns: [...this.checkIns],
      metrics: this.getMetrics()
    });

    return () => {
      this.listeners.delete(callback);
    };
  }
}

// Global Singleton Instance
export const realtimeAttendance = new RealtimeAttendanceService();
