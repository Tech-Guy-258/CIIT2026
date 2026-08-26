/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { INSTITUTIONAL_PARTNERS } from '../data';
import { ExternalLink, Building2, ShieldCheck, Zap, TrendingUp, Handshake } from 'lucide-react';

interface PartnersProps {
  lang: 'pt' | 'en';
}

export default function Partners({ lang }: PartnersProps) {
  const getPartnerIcon = (logoType: string) => {
    switch (logoType) {
      case 'hcb':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'agencia_zambeze':
        return <Building2 className="w-6 h-6 text-emerald-600" />;
      case 'mphanda_nkuwa':
        return <Zap className="w-6 h-6 text-cyan-600" />;
      case 'apiex':
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'cta':
        return <Handshake className="w-6 h-6 text-purple-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-gold-600" />;
    }
  };

  return (
    <section id="partners" className="py-20 bg-neutral-100/70 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/10 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {lang === 'pt' ? 'Cooperação & Patrocínios' : 'Cooperation & Sponsorships'}
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-light text-corporate-950 mt-3 tracking-tight">
            {lang === 'pt' ? 'Parceiros Institucionais Estratégicos' : 'Strategic Institutional Partners'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            {lang === 'pt'
              ? 'As 5 principais instituições públicas e do empresariado nacional unidas no acolhimento de investimentos para o Vale do Zambeze.'
              : 'The 5 principal public agencies and national private sector institutions partnering for investment mobilization in the Zambezi Valley.'}
          </p>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        {/* 5 Institutional Partners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {INSTITUTIONAL_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              id={`partner-card-${partner.id}`}
              className="bg-white border border-slate-200 p-6 rounded-none shadow-sm hover:shadow-lg hover:border-gold-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Logo / Icon & Tag */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    {partner.logoImg ? (
                      <div className="h-10 w-24 bg-white p-1 flex items-center justify-center border border-slate-200">
                        <img
                          src={partner.logoImg}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-corporate-950/5 border border-slate-200 flex items-center justify-center">
                        {getPartnerIcon(partner.logoType)}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-mono font-bold text-corporate-950 block">
                        {partner.acronym}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 bg-neutral-100 text-gold-700 border border-gold-500/20">
                    {lang === 'pt' ? partner.role : (partner.roleEn || partner.role)}
                  </span>
                </div>

                {/* Partner Name & Description */}
                <h3 className="text-base font-display font-bold text-corporate-950 group-hover:text-gold-700 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5 font-sans">
                  {partner.fullName}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed font-normal mt-3">
                  {lang === 'pt' ? partner.description : (partner.descriptionEn || partner.description)}
                </p>
              </div>

              {/* Website Link */}
              <div className="mt-6 pt-3 border-t border-gray-100">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer"
                  id={`partner-link-${partner.id}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-corporate-900 group-hover:text-gold-700 transition-colors"
                >
                  <span>{lang === 'pt' ? 'Portal Institucional' : 'Official Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-600" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
