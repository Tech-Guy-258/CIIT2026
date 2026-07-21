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
    <section id="about" className="py-24 bg-neutral-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-500/5 border border-gold-500/20 px-4 py-1.5 rounded-none">
            {t.aboutTitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-corporate-950 mt-4 tracking-tight leading-tight">
            {t.aboutSubtitle}
          </h2>
          <div className="w-16 h-[2px] bg-gold-600 mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {t.aboutText1}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              {t.aboutText2}
            </p>

            {/* Micro pillars of the conference */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {pillars.map((p, idx) => (
                <div key={idx} className="bg-white p-6 rounded-none border border-slate-200 shadow-sm hover:border-gold-500/40 transition-colors flex flex-col space-y-3">
                  <div className="p-2 bg-gold-500/10 rounded-none w-max">
                    {p.icon}
                  </div>
                  <h3 className="font-display font-bold text-xs text-corporate-950 uppercase tracking-wider">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Presentation Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-none overflow-hidden shadow-2xl bg-corporate-900 text-white p-8 md:p-10 border border-gold-500/20">
              
              {/* Decorative light elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-corporate-500/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[9px] tracking-widest font-mono text-gold-400 block uppercase mb-2 font-bold">
                {lang === 'pt' ? 'Factores de Atração' : 'Key Attractions'}
              </span>
              <h3 className="text-2xl font-display font-light text-white mb-6 uppercase tracking-wide">
                Tete: <span className="font-serif italic text-gold-400">{lang === 'pt' ? 'O Coração Económico' : 'The Economic Engine'}</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 border-l-2 border-gold-500 pl-4">
                  <div>
                    <h4 className="font-mono text-xs text-gold-400 uppercase tracking-widest">
                      {lang === 'pt' ? 'Localização Central SADC' : 'Strategic SADC Central Hub'}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">
                      {lang === 'pt' ? 'Tete faz fronteira com Malawi, Zimbábue e Zâmbia. É a porta de entrada lógica para o comércio regional da África Central e Austral.' : 'Tete shares land boundaries with Malawi, Zimbabwe, and Zambia, offering logical ingress to inland trade.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-l-2 border-gold-500 pl-4">
                  <div>
                    <h4 className="font-mono text-xs text-gold-400 uppercase tracking-widest">
                      {lang === 'pt' ? 'O Corredor do Zambeze' : 'The Zambezi River Lifeline'}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">
                      {lang === 'pt' ? 'Mais do que uma bacia hídrica comercial, fornece irrigação contínua para agronegócio de alta produtividade e geração massiva de energia limpa.' : 'More than a waterway, it offers secure commercial water irrigation and massive clean hydroelectric power generation.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border-l-2 border-gold-500 pl-4">
                  <div>
                    <h4 className="font-mono text-xs text-gold-400 uppercase tracking-widest">
                      {lang === 'pt' ? 'Riqueza Mineral de Classe Mundial' : 'World-Class Mineral Endowment'}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">
                      {lang === 'pt' ? 'Contém algumas das maiores reservas de carvão de alta qualidade do mundo, juntamente com minerais industriais críticos como cobre, ferro, fosfato e calcário.' : 'Boasts some of the largest metallurgical coal reserves on earth, alongside critical minerals like copper and iron.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Small stamp at bottom */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>{lang === 'pt' ? 'Investe em Tete' : 'Invest in Tete'}</span>
                <span className="text-gold-500">CIIT 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
