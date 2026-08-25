/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TRANSLATIONS } from '../data';
import { Target, ShieldCheck, Milestone } from 'lucide-react';

interface AboutProps {
  lang: 'pt' | 'en';
}

export default function About({ lang }: AboutProps) {
  const t = TRANSLATIONS[lang];

  const pillars = lang === 'pt' ? [
    {
      icon: <Target className="w-6 h-6 text-gold-600" />,
      title: 'Atração de IDE',
      desc: 'Facilitar canais diretos de diálogo entre investidores internacionais e promotores de grandes projetos em Moçambique.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-600" />,
      title: 'Segurança de Negócios',
      desc: 'Apresentar o quadro legal de garantias e incentivos fiscais vigorosos da Lei de Investimentos para proteção do capital.'
    },
    {
      icon: <Milestone className="w-6 h-6 text-gold-600" />,
      title: 'Ligação Regional (SADC)',
      desc: 'Explorar a localização geográfica ímpar de Tete, fazendo fronteira com três nações vizinhas encravadas.'
    }
  ] : [
    {
      icon: <Target className="w-6 h-6 text-gold-600" />,
      title: 'FDI Attraction',
      desc: 'Facilitating direct dialogue channels between international investors and large-scale projects promoters.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-600" />,
      title: 'Business Security',
      desc: 'Highlighting the legal framework and strong fiscal incentives of the Mozambican Investment Act to protect assets.'
    },
    {
      icon: <Milestone className="w-6 h-6 text-gold-600" />,
      title: 'Regional Link (SADC)',
      desc: 'Capitalizing on Tete\'s unmatched geography, directly bordering three landlocked partner nations.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-none inline-block shadow-xs">
            {t.aboutTitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-950 mt-4 tracking-tight leading-tight">
            {t.aboutSubtitle}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal">
              {t.aboutText1}
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {t.aboutText2}
            </p>

            {/* Micro pillars of the conference */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
              {pillars.map((p, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-none border border-slate-300 shadow-xs hover:border-amber-500 transition-colors flex flex-col space-y-3">
                  <div className="p-2.5 bg-amber-100 border border-amber-300 rounded-none w-max">
                    {p.icon}
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-950 uppercase tracking-wider">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Presentation Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-none shadow-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-8 md:p-10 border-2 border-amber-500/40">
              
              {/* Decorative light elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-700/20 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs tracking-widest font-mono text-amber-400 block uppercase mb-2 font-black">
                {lang === 'pt' ? 'Factores de Atração' : 'Key Attractions'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 uppercase tracking-wide">
                Tete: <span className="font-serif italic text-amber-400 font-bold">{lang === 'pt' ? 'O Coração Económico' : 'The Economic Engine'}</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 border-l-4 border-amber-500 pl-4">
                  <div>
                    <h4 className="font-mono text-xs sm:text-sm text-amber-400 uppercase tracking-wider font-bold">
                      {lang === 'pt' ? 'Localização Central SADC' : 'Strategic SADC Central Hub'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                      {lang === 'pt' ? 'Tete faz fronteira com Malawi, Zimbábue e Zâmbia. É a porta de entrada lógica para o comércio regional da África Central e Austral.' : 'Tete shares land boundaries with Malawi, Zimbabwe, and Zambia, offering logical ingress to inland trade.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-l-4 border-amber-500 pl-4">
                  <div>
                    <h4 className="font-mono text-xs sm:text-sm text-amber-400 uppercase tracking-wider font-bold">
                      {lang === 'pt' ? 'O Corredor do Zambeze' : 'The Zambezi River Lifeline'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                      {lang === 'pt' ? 'Mais do que uma bacia hídrica comercial, fornece irrigação contínua para agronegócio de alta produtividade e geração massiva de energia limpa.' : 'More than a waterway, it offers secure commercial water irrigation and massive clean hydroelectric power generation.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-l-4 border-amber-500 pl-4">
                  <div>
                    <h4 className="font-mono text-xs sm:text-sm text-amber-400 uppercase tracking-wider font-bold">
                      {lang === 'pt' ? 'Riqueza Mineral de Classe Mundial' : 'World-Class Mineral Endowment'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                      {lang === 'pt' ? 'Contém algumas das maiores reservas de carvão de alta qualidade do mundo, juntamente com minerais industriais críticos como cobre, ferro, fosfato e calcário.' : 'Boasts some of the largest metallurgical coal reserves on earth, alongside critical minerals like copper and iron.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Small stamp at bottom */}
              <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="font-semibold">{lang === 'pt' ? 'Investe em Tete' : 'Invest in Tete'}</span>
                <span className="text-amber-400 font-bold">CIIT 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
