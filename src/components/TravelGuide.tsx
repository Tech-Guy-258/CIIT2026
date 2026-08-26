/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HOTELS, TRANSLATIONS } from '../data';
import { HotelRecommendation } from '../types';
import { 
  MapPin, 
  Plane, 
  ShieldAlert, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Wifi, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Users, 
  Car, 
  Bus, 
  Wine, 
  BedDouble, 
  CheckCircle 
} from 'lucide-react';

interface TravelGuideProps {
  lang: 'pt' | 'en';
}

interface HotelCardProps {
  key?: string;
  hotel: HotelRecommendation;
  lang: 'pt' | 'en';
}

function HotelCard({ hotel, lang }: HotelCardProps) {
  const t = TRANSLATIONS[lang];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = hotel.images && hotel.images.length > 0 
    ? hotel.images 
    : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900'];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      id={`hotel-card-${hotel.id}`}
      className="bg-white rounded-none overflow-hidden border border-slate-200 shadow-sm flex flex-col group hover:shadow-xl hover:border-gold-500/40 transition-all duration-300"
    >
      {/* Hotel Image Carousel */}
      <div className="relative aspect-[16/10] overflow-hidden bg-corporate-950">
        <img
          src={images[currentImageIndex]}
          alt={`${hotel.name} - imagem ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-corporate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Navigation arrows for carousel */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center z-10">
            <button
              onClick={prevImage}
              aria-label="Imagem anterior"
              className="w-8 h-8 rounded-none bg-corporate-950/80 hover:bg-gold-500 text-white hover:text-corporate-950 flex items-center justify-center transition-colors backdrop-blur-xs border border-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Próxima imagem"
              className="w-8 h-8 rounded-none bg-corporate-950/80 hover:bg-gold-500 text-white hover:text-corporate-950 flex items-center justify-center transition-colors backdrop-blur-xs border border-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === idx ? 'bg-gold-400 w-4' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Ver foto ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Top Badges: Category & Stars */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-corporate-950/90 backdrop-blur-sm border border-gold-500/40 text-gold-400 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1">
            {lang === 'pt' ? hotel.categoryTag : (hotel.categoryTagEn || hotel.categoryTag)}
          </span>
        </div>

        {hotel.stars && (
          <div className="absolute top-3 right-3 bg-corporate-950/90 backdrop-blur-sm px-2.5 py-1 flex items-center space-x-1 border border-white/10 text-gold-400 text-xs font-bold font-mono z-10">
            <div className="flex">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hotel Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div>
          <h4 className="text-xl font-display font-bold text-corporate-950 tracking-tight group-hover:text-gold-700 transition-colors">
            {hotel.name}
          </h4>

          {/* Location text */}
          <div className="flex items-start space-x-1.5 mt-1.5 text-xs text-gray-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
            <span>{lang === 'pt' ? hotel.location : (hotel.locationEn || hotel.location)}</span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-normal mt-4 line-clamp-3">
            {lang === 'pt' ? hotel.description : (hotel.descriptionEn || hotel.description)}
          </p>

          {/* Rooms capacity info */}
          {hotel.roomsInfo && (
            <div className="mt-4 flex items-start space-x-2 bg-neutral-50 p-2.5 border border-slate-200 text-xs text-corporate-950">
              <BedDouble className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <span className="font-medium">{lang === 'pt' ? hotel.roomsInfo : (hotel.roomsInfoEn || hotel.roomsInfo)}</span>
            </div>
          )}

          {/* Amenities Grid */}
          {hotel.amenities && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block mb-2">
                {lang === 'pt' ? 'Comodidades Principais:' : 'Key Amenities:'}
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-700 font-medium">
                {hotel.amenities.pool && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Waves className="w-3 h-3 text-cyan-600" />
                    <span>{lang === 'pt' ? 'Piscina' : 'Pool'}</span>
                  </span>
                )}
                {hotel.amenities.restaurant && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Utensils className="w-3 h-3 text-amber-600" />
                    <span>{lang === 'pt' ? 'Restaurante' : 'Restaurant'}</span>
                  </span>
                )}
                {hotel.amenities.gym && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Dumbbell className="w-3 h-3 text-indigo-600" />
                    <span>{lang === 'pt' ? 'Ginásio' : 'Gym'}</span>
                  </span>
                )}
                {hotel.amenities.conferenceRooms && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Users className="w-3 h-3 text-corporate-700" />
                    <span>{lang === 'pt' ? 'Conferências' : 'Conference'}</span>
                  </span>
                )}
                {hotel.amenities.wifi && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Wifi className="w-3 h-3 text-emerald-600" />
                    <span>Wi-Fi</span>
                  </span>
                )}
                {hotel.amenities.airportShuttle && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Bus className="w-3 h-3 text-blue-600" />
                    <span>{lang === 'pt' ? 'Transfer Aeroporto' : 'Airport Shuttle'}</span>
                  </span>
                )}
                {hotel.amenities.parking && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Car className="w-3 h-3 text-gray-600" />
                    <span>{lang === 'pt' ? 'Estacionamento' : 'Parking'}</span>
                  </span>
                )}
                {hotel.amenities.bar && (
                  <span className="inline-flex items-center space-x-1 bg-slate-100 px-2 py-0.5">
                    <Wine className="w-3 h-3 text-rose-600" />
                    <span>Bar</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Highlights */}
          {hotel.highlights && hotel.highlights.length > 0 && (
            <div className="mt-4 space-y-1.5 bg-neutral-50 p-3 border border-slate-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-700 font-bold block mb-1">
                {lang === 'pt' ? 'Destaques do Alojamento:' : 'Highlights:'}
              </span>
              {(lang === 'pt' ? hotel.highlights : (hotel.highlightsEn || hotel.highlights)).slice(0, 3).map((hl, i) => (
                <div key={i} className="flex items-start space-x-1.5 text-[11px] text-gray-600">
                  <CheckCircle className="w-3 h-3 text-gold-600 shrink-0 mt-0.5" />
                  <span className="leading-tight">{hl}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contacts and Booking Action */}
        <div className="pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-600">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
            <span className="text-[11px]">{lang === 'pt' ? hotel.address : (hotel.addressEn || hotel.address)}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
            {hotel.phone && (
              <a href={`tel:${hotel.phone}`} className="flex items-center space-x-1.5 hover:text-gold-700 font-mono font-medium">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{hotel.phone}</span>
              </a>
            )}
            {hotel.email && (
              <a href={`mailto:${hotel.email}`} className="flex items-center space-x-1.5 hover:text-gold-700 font-mono text-gray-500">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate max-w-[160px]">{hotel.email}</span>
              </a>
            )}
          </div>

          <div className="pt-2">
            <a
              href={hotel.website}
              target="_blank"
              rel="noreferrer"
              id={`hotel-link-${hotel.id}`}
              className="w-full py-3 px-4 rounded-none bg-corporate-950 text-white hover:bg-gold-500 hover:text-corporate-950 transition-colors flex items-center justify-center space-x-2 font-bold uppercase tracking-widest text-[11px]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.travelHotelsBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TravelGuide({ lang }: TravelGuideProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="travel" className="py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/10 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Informação Logística & Alojamento' : 'Visitor Information & Lodging'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.travelTitle}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            {t.travelSubtitle}
          </p>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        {/* Airport & Visas Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Airport Details Card */}
          <div className="bg-neutral-50 rounded-none p-8 border border-slate-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="p-4 rounded-none bg-gold-500/10 text-gold-700 border border-gold-600/10 flex-shrink-0">
              <Plane className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-corporate-950 tracking-tight uppercase">
                {t.travelAirportTitle}
              </h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                {t.travelAirportText}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-corporate-950 font-mono font-bold uppercase">
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-none shadow-xs">IATA: TET (Chingozi)</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-none shadow-xs">LAM - Linhas Aéreas de Moçambique</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-none shadow-xs">Conexões Regionais SADC</span>
              </div>
            </div>
          </div>

          {/* Visas Details Card */}
          <div className="bg-neutral-50 rounded-none p-8 border border-slate-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="p-4 rounded-none bg-gold-500/10 text-gold-700 border border-gold-600/10 flex-shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-corporate-950 tracking-tight uppercase">
                {t.travelVisasTitle}
              </h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                {t.travelVisasText}
              </p>
              <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-corporate-950">
                <span className="font-mono text-gold-700 uppercase font-bold">Portal Oficial e-Visa:</span>
                <a
                  href="https://evisa.gov.mz"
                  target="_blank"
                  rel="noreferrer"
                  id="evisa-portal-link"
                  className="hover:underline flex items-center space-x-1 text-gold-700 font-bold bg-gold-500/10 px-3 py-1 border border-gold-500/30"
                >
                  <span>evisa.gov.mz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Recommended Hotels Section - 5 Exclusive Official Hotels */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-none">
              {lang === 'pt' ? 'Rede Hoteleira Credenciada de Tete' : 'Accredited Tete Hospitality Network'}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-corporate-950 mt-3 tracking-tight">
              {t.travelHotelsTitle}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              {lang === 'pt'
                ? 'Os 5 estabelecimentos hoteleiros e lodges oficiais selecionados na Cidade de Tete para acolher os delegados da CIIT 2026.'
                : 'The 5 official executive hotels and lodges selected in Tete City to host delegates attending CIIT 2026.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOTELS.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} lang={lang} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
