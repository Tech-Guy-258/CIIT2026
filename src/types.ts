/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  imageUrl: string;
  nationality: string;
  featured?: boolean;
}

export interface AgendaSession {
  id: string;
  time: string;
  title: string;
  description?: string;
  speakerIds?: string[];
  location: string;
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
  subtitle: string;
  description: string;
  investmentOpportunities: string[];
  keyData: string;
  iconName: string;
}

export interface HotelRecommendation {
  name: string;
  stars: number;
  description: string;
  address: string;
  phone: string;
  website: string;
  image: string;
}
