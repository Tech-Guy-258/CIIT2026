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
}

export interface AgendaSession {
  id: string;
  time: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  speakerIds?: string[];
  location: string;
  locationEn?: string;
  category: 'energy' | 'mining' | 'agriculture' | 'infrastructure' | 'plenary' | 'networking';
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

export interface HotelRecommendation {
  name: string;
  stars: number;
  description: string;
  descriptionEn?: string;
  address: string;
  addressEn?: string;
  phone: string;
  website: string;
  image: string;
}
