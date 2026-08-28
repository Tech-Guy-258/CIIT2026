/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Beef, 
  Sprout, 
  Trees, 
  Palmtree, 
  Truck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Plane,
  Train,
  Anchor
} from 'lucide-react';
import { 
  LIVESTOCK_CENSUS_DATA,
  OTHER_POTENTIALS_AREAS
} from '../teteInvestmentData';

interface OtherPotentialsProps {
  lang: 'pt' | 'en';
}

export default function OtherPotentials({ lang }: OtherPotentialsProps) {
  const [activeTab, setActiveTab] = useState<'pecuaria' | 'agricultura' | 'florestas_fauna' | 'turismo' | 'logistica_servicos'>('pecuaria');

  const pecuariaArea = OTHER_POTENTIALS_AREAS.find(a => a.id === 'pecuaria');
  const agriArea = OTHER_POTENTIALS_AREAS.find(a => a.id === 'agricultura');
  const forestArea = OTHER_POTENTIALS_AREAS.find(a => a.id === 'florestas_fauna');
  const tourismArea = OTHER_POTENTIALS_AREAS.find(a => a.id === 'turismo');
  const logisticaArea = OTHER_POTENTIALS_AREAS.find(a => a.id === 'logistica_servicos');

  return (
    <section id="outros-potenciais" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3">
            <Sprout className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'pt' ? 'Matriz Económica Diversificada' : 'Diversified Economic Matrix'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Outros Potenciais Económicos' : 'Other Economic Potentials'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'pt'
              ? 'Para além dos recursos minerais e energéticos, Tete apresenta vantagens competitivas de escala regional em pecuária, agroindústria, florestas, turismo e corredores logísticos.'
              : 'Beyond minerals and energy, Tete provides regional-scale competitive advantages in livestock, agribusiness, forestry, tourism, and multi-modal logistics corridors.'}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-2">
          <button
            onClick={() => setActiveTab('pecuaria')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold whitespace-nowrap border-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'pecuaria'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Beef className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Pecuária (Cabrito IG)' : 'Livestock (GI Goat)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('agricultura')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold whitespace-nowrap border-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'agricultura'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Agricultura (10M Acres)' : 'Agriculture (10M Acres)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('florestas_fauna')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold whitespace-nowrap border-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'florestas_fauna'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Florestas & Fauna' : 'Forestry & Wildlife'}</span>
          </button>

          <button
            onClick={() => setActiveTab('turismo')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold whitespace-nowrap border-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'turismo'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Palmtree className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Turismo & Ecoturismo' : 'Tourism & Ecotourism'}</span>
          </button>

          <button
            onClick={() => setActiveTab('logistica_servicos')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold whitespace-nowrap border-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'logistica_servicos'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Logística & Serviços' : 'Logistics & Hub'}</span>
          </button>
        </div>

        {/* Tab Content 1: Pecuária */}
        {activeTab === 'pecuaria' && pecuariaArea && (
          <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 mb-8">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'pt' ? pecuariaArea.highlightBadge : pecuariaArea.highlightBadgeEn}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                  {lang === 'pt' ? pecuariaArea.title : pecuariaArea.titleEn} — {lang === 'pt' ? pecuariaArea.subtitle : pecuariaArea.subtitleEn}
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                  {lang === 'pt' ? pecuariaArea.description : pecuariaArea.descriptionEn}
                </p>
              </div>

              {/* Processing Capacity Callout */}
              <div className="bg-amber-500 text-slate-950 p-5 text-left max-w-sm flex-shrink-0">
                <span className="text-xs font-mono uppercase tracking-widest font-black block mb-1">
                  {lang === 'pt' ? 'Capacidade Industrial' : 'Industrial Processing'}
                </span>
                <p className="text-xs font-medium leading-snug">
                  {lang === 'pt' ? pecuariaArea.processingCapacity : pecuariaArea.processingCapacityEn}
                </p>
              </div>
            </div>

            {/* Official Livestock Census Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {LIVESTOCK_CENSUS_DATA.map((item, idx) => (
                <div key={idx} className="bg-white p-5 border border-slate-200 text-center shadow-xs">
                  <span className="text-xs font-semibold text-slate-600 block mb-1">
                    {lang === 'pt' ? item.category : item.categoryEn}
                  </span>
                  <span className="text-2xl font-display font-black text-slate-950">
                    {item.count.toLocaleString('pt-MZ')}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block mt-1">
                    {item.unit}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">
                {lang === 'pt' ? 'Destaques de Investimento Pecuário:' : 'Livestock Investment Highlights:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Instalação de matadouros industriais com certificação sanitária para exportação.' : 'Installation of industrial abattoirs with export sanitary certification.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Curtumes e transformação industrial de couros e peles caprinas/bovinas.' : 'Tanneries and industrial processing of goat and cattle hides.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Fábricas de rações balanceadas aproveitando subprodutos de grãos locais.' : 'Animal feed compounding plants leveraging local grain by-products.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Cadeia de frio e centros de distribuição para o mercado nacional e regional.' : 'Cold-chain storage and logistics hubs for domestic and SADC markets.'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Agricultura */}
        {activeTab === 'agricultura' && agriArea && (
          <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-10">
            <div className="pb-6 border-b border-slate-200 mb-8">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                {lang === 'pt' ? agriArea.title : agriArea.titleEn} — {lang === 'pt' ? agriArea.subtitle : agriArea.subtitleEn}
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {lang === 'pt' ? agriArea.description : agriArea.descriptionEn}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 border border-slate-200">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                  {lang === 'pt' ? 'Principais Culturas de Rendimento' : 'High-Yield Crops'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'pt' ? agriArea.crops : agriArea.cropsEn)?.map((crop) => (
                    <span key={crop} className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-950">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 border border-slate-200">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                  {lang === 'pt' ? 'Recursos e Infraestrutura Hídrica' : 'Water Resources & Land'}
                </span>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between py-1 border-b border-slate-100 font-mono">
                    <span className="text-slate-500">{lang === 'pt' ? 'Terra Arável:' : 'Arable Land:'}</span>
                    <span className="font-bold text-slate-950">10.065.806 acres</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 font-mono">
                    <span className="text-slate-500">{lang === 'pt' ? 'Recurso Hídrico:' : 'Water Source:'}</span>
                    <span className="font-bold text-slate-950">Rio Zambeze & Bacias Perenes</span>
                  </div>
                  <div className="flex justify-between py-1 font-mono">
                    <span className="text-slate-500">{lang === 'pt' ? 'Polos Agrícolas:' : 'Agri Centers:'}</span>
                    <span className="font-bold text-slate-950">Angónia, Tsangano, Macanga, Chiúta</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">
                {lang === 'pt' ? 'Oportunidades em Agroindústria:' : 'Agribusiness Opportunities:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Processamento industrial de batata e tomate para redução de perdas pós-colheita.' : 'Industrial processing of potato and tomato to reduce post-harvest losses.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Moageiras de milho e trigo de média e grande escala para abastecimento nacional.' : 'Medium and large-scale maize and wheat milling for domestic consumption.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Sistemas de regadio mecanizado no vale do Zambeze para agricultura durante todo o ano.' : 'Mechanized irrigation systems in the Zambezi valley for year-round cropping.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Extração de óleo vegetal de soja e semente de gergelim para exportação regional.' : 'Soybean and sesame seed vegetable oil extraction for regional export.'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Florestas e Fauna */}
        {activeTab === 'florestas_fauna' && forestArea && (
          <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-10">
            <div className="pb-6 border-b border-slate-200 mb-8">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                {lang === 'pt' ? forestArea.title : forestArea.titleEn} — {lang === 'pt' ? forestArea.subtitle : forestArea.subtitleEn}
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {lang === 'pt' ? forestArea.description : forestArea.descriptionEn}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 border border-slate-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                  {lang === 'pt' ? 'Fauna Bravia Documentada' : 'Documented Wildlife'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'pt' ? forestArea.species : forestArea.speciesEn)?.map((sp) => (
                    <span key={sp} className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 border border-slate-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                  {lang === 'pt' ? 'Características Florestais' : 'Forestry Features'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'pt' ? forestArea.features : forestArea.featuresEn)?.map((f) => (
                    <span key={f} className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-950">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">
                {lang === 'pt' ? 'Oportunidades em Silvicultura & Conservação:' : 'Forestry & Conservation Opportunities:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Plantações florestais comerciais de eucalipto e pinho para madeira e celulose.' : 'Commercial eucalyptus and pine timber plantations for paper and construction.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Projetos de créditos de carbono e reflorestamento sustentável com comunidades.' : 'Carbon credit projects and community-based sustainable reforestation.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Coutadas oficiais de caça e turismo cinegético de alto padrão internacional.' : 'Official game reserves and high-end international trophy hunting tourism.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Maneio sustentável de produtos florestais não-madeireiros (apicultura, resinas).' : 'Sustainable management of non-timber forest products (beekeeping, resins).'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Turismo */}
        {activeTab === 'turismo' && tourismArea && (
          <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-10">
            <div className="pb-6 border-b border-slate-200 mb-8">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                {lang === 'pt' ? tourismArea.title : tourismArea.titleEn} — {lang === 'pt' ? tourismArea.subtitle : tourismArea.subtitleEn}
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {lang === 'pt' ? tourismArea.description : tourismArea.descriptionEn}
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-200 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-4">
                {lang === 'pt' ? 'Atrativos & Frentes de Ecoturismo' : 'Attractions & Ecotourism Assets'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {(lang === 'pt' ? tourismArea.attractions : tourismArea.attractionsEn)?.map((att, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                    {att}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">
                {lang === 'pt' ? 'Oportunidades em Hotelaria & Turismo:' : 'Hospitality & Tourism Opportunities:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Resorts e eco-lodges na margem da Albufeira de Cahora Bassa.' : 'Resorts and luxury eco-lodges along Lake Cahora Bassa shores.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Estâncias termais e centros de bem-estar explorando as nascentes minerais.' : 'Thermal spa resorts and wellness centers utilizing mineral hot springs.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Hotéis executivos e centros de congressos (MICE) na Cidade de Tete.' : 'Executive business hotels and conference centers (MICE) in Tete City.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Operadoras de safaris de pesca desportiva (Tigerfish) e cruzeiros no Zambeze.' : 'Sport fishing safari operators (Tigerfish) and Zambezi scenic boat charters.'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 5: Logística */}
        {activeTab === 'logistica_servicos' && logisticaArea && (
          <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-10">
            <div className="pb-6 border-b border-slate-200 mb-8">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950">
                {lang === 'pt' ? logisticaArea.title : logisticaArea.titleEn} — {lang === 'pt' ? logisticaArea.subtitle : logisticaArea.subtitleEn}
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {lang === 'pt' ? logisticaArea.description : logisticaArea.descriptionEn}
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-200 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-4">
                {lang === 'pt' ? 'Eixos Estruturantes de Infraestrutura' : 'Core Infrastructure Axes'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(lang === 'pt' ? logisticaArea.infrastructure : logisticaArea.infrastructureEn)?.map((inf, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 flex items-start space-x-2">
                    <Truck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{inf}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">
                {lang === 'pt' ? 'Oportunidades em Logística e Suporte:' : 'Logistics & Support Opportunities:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Portos secos, entrepostos aduaneiros e terminais de carga intermodais.' : 'Dry ports, bonded customs warehouses, and intermodal freight terminals.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Bases logísticas e oficinas de manutenção pesada para frotas de mineração.' : 'Logistics supply bases and heavy machinery service hubs for mining fleets.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Armazéns frigoríficos para a cadeia de frio de peixe, carne e hortícolas.' : 'Cold-storage warehouses supporting fish, meat, and fresh produce corridors.'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{lang === 'pt' ? 'Serviços de transporte e distribuição transfronteiriça para a SADC.' : 'Cross-border transport and distribution fleet services across SADC.'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
