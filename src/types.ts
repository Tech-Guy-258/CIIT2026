/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Speaker {
  id: string;
  name: string;
  role: string;
  roleEn?: string;
  company: string;
  bio: string;
  bioEn?: string;
  imageUrl: string;
  nationality: string;
  nationalityEn?: string;
  featured?: boolean;
  institution?: string;
  institutionEn?: string;
  education?: string[];
  educationEn?: string[];
  previousRoles?: string[];
  previousRolesEn?: string[];
  experience?: string[];
  experienceEn?: string[];
  keyTopics?: string[];
  keyTopicsEn?: string[];
}

export interface AgendaSession {
  id: string;
  time: string;
  activity: string;
  activityEn?: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  speakerIds?: string[];
  theme?: string;
  themeEn?: string;
  location: string; // "PLENÁRIA"
  locationEn?: string; // "PLENARY HALL"
  category: 'plenary' | 'energy' | 'mining' | 'agriculture' | 'infrastructure' | 'networking' | 'economy';
  isPreliminary?: boolean;
}

export interface Registration {
  id: string; // Dynamic registration ID (e.g. CIIT-2026-XXXX)
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  country: string;
  sectorOfInterest: string;
  registrationType: 'delegate' | 'investor' | 'speaker' | 'sponsor' | 'government';
  registeredAt: string;
  ticketStatus: 'Confirmed' | 'Pending Review';
  isCheckedIn?: boolean;
  checkedInAt?: string;
  checkInHistory?: Array<{ timestamp: string; deviceId?: string }>;
  qrToken?: string;
  isDemo?: boolean;
}

export type CheckInStatus = 'VALIDO_NAO_UTILIZADO' | 'PRESENTE' | 'INVALIDO' | 'DUPLICADO';

export interface CheckInRecord {
  id: string;
  registrationId: string;
  participantName: string;
  jobTitle?: string;
  company?: string;
  registrationType?: string;
  country?: string;
  sectorOfInterest?: string;
  checkedInAt: string;
  formattedTime: string;
  scannerDeviceId?: string;
  scannerOperator?: string;
  status: 'PRESENTE' | 'DUPLICADO' | 'INVALIDO';
  isSynced: boolean;
}

export interface CategoryAttendanceBreakdown {
  type: 'delegate' | 'investor' | 'government' | 'speaker' | 'sponsor';
  label: string;
  labelEn: string;
  total: number;
  present: number;
  pending: number; // quantos ainda estão a caminho
  rate: number; // percentage
  color: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  iconName: string;
}

export interface AttendanceMetrics {
  totalRegistered: number;
  totalPresent: number;
  totalPending: number;
  attendancePercentage: number;
  categoryBreakdown?: CategoryAttendanceBreakdown[];
  lastCheckIn?: CheckInRecord | null;
  lastRegistered?: Registration | null;
  totalCheckInActions: number;
}

export interface QrScanResult {
  success: boolean;
  status: CheckInStatus;
  participant?: Registration;
  checkInRecord?: CheckInRecord;
  message: string;
  messageEn: string;
  previousCheckInTime?: string;
}

export interface SectorDetail {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  investmentOpportunities: string[];
  investmentOpportunitiesEn?: string[];
  keyData: string;
  keyDataEn?: string;
  iconName: string;
  imageUrl?: string;
}

export interface HotelAmenity {
  name: string;
  icon: string;
}

export interface HotelRecommendation {
  id: string;
  name: string;
  stars?: number; // only if officially confirmed
  categoryTag: string;
  categoryTagEn: string;
  description: string;
  descriptionEn?: string;
  location: string;
  locationEn?: string;
  address: string;
  addressEn?: string;
  roomsInfo?: string;
  roomsInfoEn?: string;
  phone: string;
  email?: string;
  website: string;
  images: string[];
  amenities: {
    pool: boolean;
    restaurant: boolean;
    gym: boolean;
    conferenceRooms: boolean;
    wifi: boolean;
    parking: boolean;
    airportShuttle?: boolean;
    bar?: boolean;
  };
  highlights: string[];
  highlightsEn?: string[];
}

export interface InstitutionalPartner {
  id: string;
  name: string;
  acronym?: string;
  fullName: string;
  role: string;
  roleEn: string;
  website: string;
  description: string;
  descriptionEn: string;
  logoType: 'agencia_zambeze' | 'hcb' | 'mphanda_nkuwa' | 'apiex' | 'cta';
  logoImg?: string;
}

export interface GalleryItem {
  id: string;
  filename: string;
  title: string;
  titleEn: string;
  category: 'plenary' | 'leadership' | 'speeches' | 'delegates' | 'protocol' | 'facim';
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  aspectRatio?: string;
  featured?: boolean;
}

export interface DistrictMineral {
  district: string;
  minerals: string;
  mineralsEn?: string;
  mineralTypes: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  capacity?: string;
  capacityEn?: string;
  location: string;
  locationEn?: string;
  investment?: string;
  investmentEn?: string;
  sector: 'Energia' | 'Agricultura' | 'Pecuária' | 'Mineração' | 'Indústria' | 'Turismo' | 'Pesca/Aquacultura' | 'Infraestrutura';
  sectorEn?: string;
  locationType: 'Distrito' | 'Cidade' | 'Província';
  locationTypeEn?: string;
  investmentType: 'Energia' | 'Infraestrutura' | 'Produção' | 'Processamento' | 'Extração';
  investmentTypeEn?: string;
  image?: string;
}

export interface SpeciesDistribution {
  scientificName: string;
  commonName: string;
  commonNameEn?: string;
  percentage: number;
  color: string;
}

export interface LivestockData {
  category: string;
  categoryEn: string;
  count: number;
  unit: string;
}

export interface WhyInvestCard {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  keyPoints?: string[];
  keyPointsEn?: string[];
  iconName: string;
}

export interface InvestorInquiry {
  id?: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  sectorOfInterest: string;
  projectOfInterest: string;
  message: string;
  submittedAt?: string;
}

export interface DistrictEconomyActivity {
  name: string;
  nameEn: string;
  desc: string;
  isPrimary?: boolean;
}

export interface DistrictInvestmentProject {
  sector: string;
  project: string;
  location: string;
  capacity: string;
  investment: string;
}

export interface DistrictIndicators {
  location: boolean;
  agriculture: boolean;
  mining: boolean;
  energy: boolean;
  fisheries: boolean;
  livestock: boolean;
  tourism: boolean;
}

export interface DistrictDetail {
  id: string;
  slug: string;
  name: string;
  capital: string;
  tagline: string;
  taglineEn?: string;
  image: string;
  heroImage?: string;
  location: string;
  locationEn?: string;
  area: string;
  population: string;
  climate?: string;
  climateEn?: string;
  overview: string;
  overviewEn?: string;
  history: string;
  historyEn?: string;
  geography: {
    borders: string;
    bordersEn?: string;
    rivers: string;
    localities: string;
    coordinates?: string;
  };
  economy: DistrictEconomyActivity[];
  resources: string;
  resourcesEn?: string;
  investmentProjects: DistrictInvestmentProject[];
  indicators: DistrictIndicators;
  gallery: string[];
  sources: string[];
}

export interface MunicipalityDetail {
  id: string;
  slug: string;
  name: string;
  status: string;
  statusEn: string;
  image: string;
  heroImage?: string;
  location: string;
  locationEn: string;
  population: string;
  overview: string;
  overviewEn: string;
  history: string;
  historyEn: string;
  economy: string;
  economyEn: string;
  strategicImportance: string;
  strategicImportanceEn: string;
  infrastructure: string;
  infrastructureEn: string;
  investmentPotential: string;
  investmentPotentialEn: string;
  heritageCulture: string;
  curiosities: string;
  sources: string[];
}

export interface BorderPostItem {
  name: string;
  type: string;
  connectsTo: string;
}

export interface BorderDetail {
  id: string;
  country: string;
  flag: string;
  borderLength: string;
  borderType: string;
  borderTypeEn: string;
  borderPosts: BorderPostItem[];
  commercialImportance: string;
  commercialImportanceEn: string;
  logisticsImportance: string;
  logisticsImportanceEn: string;
  history: string;
  historyEn: string;
  tradeOpportunities: string[];
  tradeOpportunitiesEn?: string[];
  sources: string[];
}

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  highlight: string;
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'district' | 'municipality' | 'border' | 'project' | 'resource';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  district?: string;
  info: string;
}


