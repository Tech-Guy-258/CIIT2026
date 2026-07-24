/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HOTELS, TRANSLATIONS } from '../data';
import { MapPin, Plane, ShieldAlert, Star, Phone, Globe, ArrowRight } from 'lucide-react';

interface TravelGuideProps {
  lang: 'pt' | 'en';
}

export default function TravelGuide({ lang }: TravelGuideProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="travel" className="py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/5 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Guia do Delegado' : 'Visitor Information'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Airport Details Card */}
          <div className="bg-neutral-50 rounded-none p-8 border border-slate-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="p-4 rounded-none bg-gold-500/10 text-gold-700 border border-gold-600/10 flex-shrink-0">
              <Plane className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-corporate-950 tracking-tight uppercase">
                {t.travelAirportTitle}
              </h3>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed font-light">
                {t.travelAirportText}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-corporate-950 font-mono font-bold uppercase">
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-none">IATA: TET</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-none">LAM Mozambican Airlines</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-none">CemAir / Airlink Connections</span>
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
              <p className="text-sm text-gray-500 mt-3 leading-relaxed font-light">
                {t.travelVisasText}
              </p>
              <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-gold-800">
                <span>e-Visa:</span>
                <a
                  href="https://evisa.gov.mz"
                  target="_blank"
                  rel="noreferrer"
                  id="evisa-portal-link"
                  className="hover:underline flex items-center space-x-1"
                >
                  <span>evisa.gov.mz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Recommended Hotels Section */}
        <div>
          <h3 className="text-2xl font-display font-light text-corporate-950 mb-8 uppercase tracking-widest text-center">
            {t.travelHotelsTitle}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {HOTELS.map((hotel, idx) => (
              <div
                key={idx}
                id={`hotel-card-${idx}`}
                className="bg-neutral-50 rounded-none overflow-hidden border border-slate-200 shadow-sm flex flex-col group hover:shadow-lg transition-all"
              >
                {/* Hotel thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-corporate-900">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-corporate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-none flex items-center space-x-1 border border-white/10 text-gold-400 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-gold-400" />
                    <span>{hotel.stars}★</span>
                  </div>
                </div>

                {/* Hotel specs */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-lg font-display font-bold text-corporate-950 tracking-tight">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light line-clamp-3">
                      {lang === 'pt' ? hotel.description : (hotel.descriptionEn || hotel.description)}
                    </p>
                  </div>

                  {/* Contacts and Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-400">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      <span>{lang === 'pt' ? hotel.address : (hotel.addressEn || hotel.address)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      <span>{hotel.phone}</span>
                    </div>

                    <div className="pt-3">
                      <a
                        href={hotel.website}
                        target="_blank"
                        rel="noreferrer"
                        id={`hotel-link-${idx}`}
                        className="w-full py-2.5 px-4 rounded-none border border-gold-600/30 text-gold-800 hover:bg-gold-500 hover:text-corporate-950 hover:border-gold-500 transition-colors flex items-center justify-center space-x-2 font-bold uppercase tracking-widest text-[10px]"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{t.travelHotelsBtn}</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
