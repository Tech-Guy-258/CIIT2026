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
  category: 'plenary' | 'leadership' | 'speeches' | 'delegates' | 'protocol';
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  aspectRatio?: string;
  featured?: boolean;
}
