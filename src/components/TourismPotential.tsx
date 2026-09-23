/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Palmtree, 
  Fish, 
  Flame, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Camera, 
  Waves, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Droplets,
  Calendar
} from 'lucide-react';

// Images
import ecolodgeImg from '../assets/images/luxury_ecolodge_tete_1788432223118.jpg';
import tigerfishImg from '../assets/images/tigerfish_sport_fishing_1788432237554.jpg';
import thermalImg from '../assets/images/tete_thermal_springs_1788432253076.jpg';
import safariImg from '../assets/images/tete_hunting_safari_1788432268598.jpg';
import cahoraBassaImg from '../assets/images/Albufeira de cahora bassa.jpg';
import magoeParkImg from '../assets/images/magoe_national_park_antelopes_1784878851948.jpg';
import boromaMissionImg from '../assets/images/missao_boroma_tete_1784879058976.jpg';
import ponteDonaAnaImg from '../assets/images/Ponte dona ana.jpg';

interface TourismPotentialProps {
  lang: 'pt' | 'en';
  onInquireInterest?: (subject?: string) => void;
  onViewProjectsClick?: () => void;
}

type CategoryFilter = 'all' | 'ecolodge' | 'safari' | 'nautical' | 'thermal' | 'hunting' | 'heritage';

interface TourismPillar {
  id: string;
  category: CategoryFilter;
  titlePt: string;
  titleEn: string;
  tagPt: string;
  tagEn: string;
  locationPt: string;
  locationEn: string;
  image: string;
  highlightMetric: string;
  highlightLabelPt: string;
  highlightLabelEn: string;
  descPt: string;
  descEn: string;
  keyPointsPt: string[];
  keyPointsEn: string[];
  incentivePt: string;
  incentiveEn: string;
}

export default function TourismPotential({ lang, onInquireInterest, onViewProjectsClick }: TourismPotentialProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedPillar, setSelectedPillar] = useState<TourismPillar | null>(null);

  const tourismPillars: TourismPillar[] = [
    {
      id: 'ecolodges',
      category: 'ecolodge',
      titlePt: 'Eco-Lodges de Charme & Resorts Fluviais',
      titleEn: 'Boutique Eco-Lodges & River Resorts',
      tagPt: 'Hospitalidade de Luxo',
      tagEn: 'Luxury Hospitality',
      locationPt: 'Encostas de Cahora Bassa (Songo, Chicoa, Zumbo) & Vale do Zambeze',
      locationEn: 'Cahora Bassa Lake Shores (Songo, Chicoa, Zumbo) & Zambezi Valley',
      image: ecolodgeImg,
      highlightMetric: '2.700 km²',
      highlightLabelPt: 'Espelho de água cénico com enseadas ideais para resorts',
      highlightLabelEn: 'Scenic lake surface with secluded bays for resort concessions',
      descPt: 'Concessões de terrenos com DUAT simplificado em falésias e ilhotas exclusivas da Albufeira de Cahora Bassa. Propostas para implantação de lodges de 4 a 5 estrelas baseados em arquitetura bioclimática, energias solares off-grid e piscinas panorâmicas infinitas voltadas para o pôr-do-sol africano.',
      descEn: 'Simplified land title concessions (DUAT) on cliff edges and private islands along Lake Cahora Bassa. Development of 4 to 5-star sustainable lodges designed with bioclimatic materials, independent off-grid solar microgrids, and infinity plunge pools overlooking the majestic African sunset.',
      keyPointsPt: [
        'Concessões de 25 a 50 anos com regimes especiais de arrendamento turístico',
        'Forte procura por parte de quadros executivos, diplomatas e viajantes regionais (África do Sul, Zimbábue, Zâmbia)',
        'Isenção aduaneira total na importação de equipamentos e mobílias hoteleiras',
        'Potencial para operação combinada com pequenos aeródromos e helipontos'
      ],
      keyPointsEn: [
        '25 to 50-year concessions under favorable tourism land tenure regimes',
        'High demand from mining/energy executives, diplomats, and regional leisure travelers',
        'Zero customs tariffs on imported hotel equipment, building fixtures and furnishings',
        'Ideal for fly-in safari and fly-in retreat concepts with local airstrip links'
      ],
      incentivePt: 'Elegível a 100% de isenção de direitos aduaneiros e deduções fiscais no Código de Benefícios Fiscais.',
      incentiveEn: 'Eligible for 100% customs duty exemptions and accelerated capital depreciation.'
    },
    {
      id: 'safaris',
      category: 'safari',
      titlePt: 'Safaris Fotográficos & Parque Nacional de Mágoè',
      titleEn: 'Photographic Safaris & Mágoè National Park',
      tagPt: 'Vida Selvagem & Conservação',
      tagEn: 'Wildlife & Conservation',
      locationPt: 'Parque Nacional de Mágoè (Margem Sul de Cahora Bassa)',
      locationEn: 'Mágoè National Park (Southern Shore of Lake Cahora Bassa)',
      image: safariImg,
      highlightMetric: '3.500+ km²',
      highlightLabelPt: 'Área protegida contígua às grandes reservas do Zambeze',
      highlightLabelEn: 'Protected ecosystem contiguous with the greater Zambezi biome',
      descPt: 'O Parque Nacional de Mágoè é uma joia de conservação que preserva manadas de elefantes, búfalos, leões, leopardos, cães selvagens africanos, hipopótamos e antílopes como o cudo e a palanca. Oportunidades diretas para operadores de safaris fotográficos, trilhas fluviais e tendas glamping de luxo.',
      descEn: 'Mágoè National Park is a pristine conservation jewel sheltering vast herds of elephants, cape buffaloes, lions, leopards, African wild dogs, hippos, and majestic antelopes. Direct concessions available for photo-safari operators, walking wilderness trails, and ultra-luxury glamping tented camps.',
      keyPointsPt: [
        'Parcerias público-privadas de co-gestão com a ANAC (Administração Nacional das Áreas de Conservação)',
        'Integração na Área de Conservação Transfronteiriça ZIMOZA (Zimbábue, Moçambique e Zâmbia)',
        'Circuitos combinados de game drives em veículos 4x4 abertos e safaris de barco no lago',
        'Mais de 400 espécies de aves catalogadas para ecoturismo de observação (birdwatching)'
      ],
      keyPointsEn: [
        'Public-Private Partnerships (PPP) with ANAC for park infrastructure and anti-poaching',
        'Core hub within the ZIMOZA Transfrontier Conservation Area (Zimbabwe, Mozambique, Zambia)',
        'Hybrid itineraries featuring 4x4 open safari game drives and scenic boat-based wildlife viewing',
        'Over 400 registered bird species driving year-round international birdwatching tourism'
      ],
      incentivePt: 'Incentivos contratuais de longo prazo com partilha de receitas comunitárias sustentáveis.',
      incentiveEn: 'Long-term concession agreements with sustainable community benefit sharing frameworks.'
    },
    {
      id: 'nautical',
      category: 'nautical',
      titlePt: 'Ecossistema Náutico & Cruzeiros em Cahora Bassa',
      titleEn: 'Nautical Ecosystem & Cahora Bassa Houseboats',
      tagPt: 'Turismo Náutico & Cruzeiros',
      tagEn: 'Nautical Tourism & Cruises',
      locationPt: 'Albufeira de Cahora Bassa & Gargantas de Songo a Chicoa',
      locationEn: 'Cahora Bassa Reservoir & Gorges from Songo to Chicoa',
      image: cahoraBassaImg,
      highlightMetric: '270 km',
      highlightLabelPt: 'Extensão navegável da albufeira do Songo ao Zumbo',
      highlightLabelEn: 'Navigable reservoir length from Songo dam to Zumbo border',
      descPt: 'Com dimensões comparáveis a um mar interior africano, a Albufeira de Cahora Bassa oferece condições excecionais e inexploradas para frotas de barcos-casa (houseboats) de luxo, catamarãs de cruzeiro com cabines climatizadas, marinas recreativas e competições de vela e remo em desfiladeiros dramáticos.',
      descEn: 'Resembling an inland sea, Lake Cahora Bassa provides virgin opportunities for luxury houseboat charters, motorized catamaran cruise lines with air-conditioned cabins, full-service marinas, and watersport expeditions through towering mountain gorges.',
      keyPointsPt: [
        'Ausência de saturação turística: primeiro operador a instalar frotas modernas captura liderança de mercado',
        'Roteiros de 3 a 7 noites entre o Songo, as ilhas remotas e os canhões fluviais de Chicoa',
        'Instalação de cais acostáveis, postos de abastecimento náutico e clubes desportivos',
        'Clima ameno e sol abundante durante mais de 300 dias por ano'
      ],
      keyPointsEn: [
        'Virtually untapped market: early-mover advantage for premium charter fleets and floating suites',
        '3 to 7-night itineraries navigating between Songo, secluded islands and Chicoa river canyons',
        'Private dock developments, eco-fueling marine stations and waterfront leisure clubs',
        'Over 300 sunny days per year with calm waters in protected lake branches'
      ],
      incentivePt: 'Tarifas preferenciais e licenciamento simplificado pela Direção Marítima e Turismo.',
      incentiveEn: 'Fast-tracked maritime permits and preferential harbor concession terms.'
    },
    {
      id: 'fishing',
      category: 'nautical',
      titlePt: 'Pesca Desportiva Internacional (Peixe-Tigre do Zambeze)',
      titleEn: 'International Sport Fishing (Zambezi Tigerfish)',
      tagPt: 'Pesca Desportiva • Catch & Release',
      tagEn: 'Sport Fishing • Catch & Release',
      locationPt: 'Rio Zambeze, Albufeira de Cahora Bassa, Chicoa & Zumbo',
      locationEn: 'Zambezi River, Cahora Bassa Reservoir, Chicoa & Zumbo',
      image: tigerfishImg,
      highlightMetric: '15+ kg',
      highlightLabelPt: 'Recordes mundiais de espécimes de Peixe-Tigre (Hydrocynus vittatus)',
      highlightLabelEn: 'World-class trophy size African Tigerfish specimens',
      descPt: 'Tete é consagrada entre os maiores conhecedores internacionais como um dos melhores habitats do mundo para a pesca desportiva do lendário Peixe-Tigre Africano (*Hydrocynus vittatus*), além de bream e vundu gigante. Mercado de altíssimo rendimento para lodges temáticos de pesca, guias profissionais e torneios anuais.',
      descEn: 'Tete is globally revered by angling connoisseurs as one of the ultimate international hotspots for the ferocious African Tigerfish (*Hydrocynus vittatus*), alongside trophy bream and giant vundu catfish. High-spending niche market ideal for dedicated fishing lodges and world championship events.',
      keyPointsPt: [
        'Regime rigoroso de pesca e devolução (*catch and release*) para preservação do património ictiológico',
        'Diárias médias de pescadores desportivos internacionais superiores a US$ 600 - US$ 1.200/dia',
        'Organização de campeonatos internacionais e cobertura em canais globais de desporto de aventura',
        'Parcerias com comunidades de pescadores artesanais para guiamento e vigilância biológica'
      ],
      keyPointsEn: [
        'Strict catch-and-release protocols safeguarding the premier genetic breeding stocks',
        'High-yield guest demographic generating daily spend exceeding US$ 600 - US$ 1,200/day',
        'International tournament hosting potential with global adventure broadcast syndication',
        'Community inclusion programs training local artisanal fishermen into certified master guides'
      ],
      incentivePt: 'Isenção fiscal na importação de barcos especializados e equipamentos eletrónicos de sondagem.',
      incentiveEn: 'Duty relief on specialized bass boats, eco-outboard motors and modern sonar equipment.'
    },
    {
      id: 'thermal',
      category: 'thermal',
      titlePt: 'Turismo Termal & Eco-Spas Geotérmicos de Tete',
      titleEn: 'Thermal Wellness & Geothermal Eco-Spas',
      tagPt: 'Termalismo & Saúde',
      tagEn: 'Thermal Wellness & Health',
      locationPt: 'Distritos de Mágoè (Nhacapirire), Zumbo & Marara',
      locationEn: 'Mágoè (Nhacapirire), Zumbo & Marara Districts',
      image: thermalImg,
      highlightMetric: '45°C - 72°C',
      highlightLabelPt: 'Temperatura das nascentes hipertermominerais ricas em enxofre',
      highlightLabelEn: 'Natural hyperthermal mineral water temperature rich in minerals',
      descPt: 'A geologia singular de Tete abriga dezenas de nascentes termais naturais com águas minero-medicinais sulfurosas e cloretadas comprovadamente terapêuticas. Oportunidade pioneira para implantar estâncias termais modernas, balneários de saúde, spas holísticos e hotéis de retiro corporal.',
      descEn: 'Tete’s geothermal geology hosts dozens of natural thermal mineral springs with therapeutic sulfurous and mineralized waters. A groundbreaking opportunity to construct the first world-class geothermal hot spring retreats, holistic mineral spas, and medical wellness sanctuaries in Mozambique.',
      keyPointsPt: [
        'Crescimento acelerado do mercado global de turismo de bem-estar (*wellness tourism*) pós-pandemia',
        'Concessões exclusivas de áreas geotérmicas naturais em ambientes de savana preservada',
        'Possibilidade de engarrafamento de águas minerais medicinais com alto valor acrescentado',
        'Operação turística com sazonalidade nula (atratividade durante os 12 meses do ano)'
      ],
      keyPointsEn: [
        'Surging global wellness tourism expenditure seeking authentic natural geothermal therapies',
        'Exclusive spatial concessions covering natural thermal vents within tranquil riverine forests',
        'Commercial synergies with certified thermal medicinal water bottling for regional health distribution',
        'Zero seasonal downtime: constant thermal flow sustaining 365-day high occupancy'
      ],
      incentivePt: 'Incentivos de polo especial de desenvolvimento do interior com bonificação fiscal.',
      incentiveEn: 'Special economic development interior zone incentives with maximum fiscal rebate.'
    },
    {
      id: 'hunting',
      category: 'hunting',
      titlePt: 'Turismo Cinegético Regulado & Coutadas de Caça',
      titleEn: 'Regulated Game Tourism & Hunting Concessions',
      tagPt: 'Coutadas & Conservação Comunitária',
      tagEn: 'Concessions & Community Conservation',
      locationPt: 'Coutadas Oficiais e Concessões em Mágoè, Marávia e Chifunde',
      locationEn: 'Official Game Concessions in Mágoè, Marávia and Chifunde',
      image: magoeParkImg,
      highlightMetric: '6 Coutadas',
      highlightLabelPt: 'Áreas de gestão de caça desportiva sob quotas rigorosas da CITES',
      highlightLabelEn: 'Managed hunting concessions operating under strict CITES quotas',
      descPt: 'Moçambique dispõe de um modelo regulamentado de turismo cinegético onde as coutadas funcionam como barreiras ativas contra a desertificação e a caça furtiva. As taxas dos safaris cinegéticos financiam guarda-faunas, furos de água e escolas locais através da matriz comunitária Tchuma Tchato.',
      descEn: 'Mozambique maintains an internationally recognized sustainable hunting safari framework where licensed concessions act as the primary line of defense against illegal poaching. Substantial concession revenues directly finance anti-poaching ranger units, water wells and schools via community programs.',
      keyPointsPt: [
        'Gestão sustentável orientada por inventários biométricos anuais e quotas emitidas pelo Governo',
        'Safari cinegético clássico que atrai clientela internacional de topo (EUA, Europa e Médio Oriente)',
        'Garantia de segurança territorial e monitorização por satélite das populações de fauna',
        'Reinvestimento mandatório de percentagem de receitas nas comunidades circunvizinhas'
      ],
      keyPointsEn: [
        'Strict quota regulation based on annual aerial wildlife surveys certified by national conservation authorities',
        'High-value traditional safari expeditions attracting top-tier clients from North America and Europe',
        'Private security patrols and GPS satellite monitoring protecting extensive frontier ecosystems',
        'Mandatory community revenue dividend legally reinvested in education, clinics and local infrastructure'
      ],
      incentivePt: 'Concessões de longo prazo (até 25 anos renováveis) sob tutela da ANAC e Governo Provincial.',
      incentiveEn: 'Long-term renewable concessions (up to 25 years) governed directly by ANAC and Provincial Government.'
    },
    {
      id: 'heritage',
      category: 'heritage',
      titlePt: 'Património Histórico, Rotas Coloniais & Jesuítas',
      titleEn: 'Historic Heritage, Jesuit & Colonial Routes',
      tagPt: 'Turismo Cultural & Arquitetura',
      tagEn: 'Cultural Tourism & Architecture',
      locationPt: 'Missão de Boroma (1885), Ponte Dona Ana (Mutarara), Cidade de Tete',
      locationEn: 'Boroma Jesuit Mission (1885), Dona Ana Bridge (Mutarara), Tete City',
      image: boromaMissionImg,
      highlightMetric: '1885',
      highlightLabelPt: 'Fundação da monumental Missão Jesuíta de Boroma em pedra lavrada',
      highlightLabelEn: 'Foundation date of the monumental carved-stone Jesuit Mission of Boroma',
      descPt: 'A história de Tete é marcada por séculos de encontros fluviais no Zambeze, missões jesuítas monumentais como Boroma (estilo neogótico em cantaria com colégios e oficinas históricas), a célebre Ponte Dona Ana em Mutarara (3.670m de extensão sobre o Zambeze) e antigas fortificações coloniais.',
      descEn: 'Tete’s cultural fabric spans centuries of Zambezi trade history, featuring architectural marvels such as the 1885 Boroma Jesuit Mission (neogothic carved stone complex), the engineering icon Dona Ana Bridge (3,670m across the Zambezi in Mutarara), and Portuguese river forts.',
      keyPointsPt: [
        'Projetos de requalificação de edifícios históricos para pousadas de charme e museus etnográficos',
        'Integração com viagens temáticas de comboio transzambeziano e cruzeiros históricos',
        'Valorização do artesanato tradicional de cestaria, cantaria e gastronomia do Cabrito de Tete',
        'Turismo académico, documental e de preservação da memória transafricana'
      ],
      keyPointsEn: [
        'Restoration and adaptive reuse of heritage buildings into boutique heritage inns and living museums',
        'Synergies with scenic trans-Zambezi heritage rail tours and historical river expeditions',
        'Promotion of indigenous craft cooperatives, stone masonry and certified Tete Goat culinary traditions',
        'Educational, historical research and international diaspora documentary tourism'
      ],
      incentivePt: 'Incentivos ao mecenato cultural e benefícios fiscais especiais para reabilitação do património.',
      incentiveEn: 'Cultural patronage incentives and property tax holidays for historical rehabilitation.'
    },
    {
      id: 'mice',
      category: 'ecolodge',
      titlePt: 'Hotelaria Executiva & Turismo de Negócios MICE',
      titleEn: 'Executive Hospitality & MICE Business Tourism',
      tagPt: 'Hub Corporativo & Convenções',
      tagEn: 'Corporate Hub & Conventions',
      locationPt: 'Cidade de Tete, Moatize & Corredor Logístico',
      locationEn: 'Tete City, Moatize & Logistic Corridor',
      image: ponteDonaAnaImg,
      highlightMetric: '30.000+',
      highlightLabelPt: 'Fluxo anual de executivos corporativos e delegações comerciais',
      highlightLabelEn: 'Annual inflow of corporate executives and trade delegations',
      descPt: 'Como coração económico do carvão, hidroelétrica e novos megaprojetos industriais, Tete regista uma taxa de ocupação corporativa sustentada ao longo de todo o ano. Há carência imediata de hotéis executivos de marcas internacionais, centros de convenções com capacidade para 1.000+ delegados e catering corporativo.',
      descEn: 'As Mozambique’s energy and mining capital, Tete maintains consistent year-round corporate hotel occupancy. There is an acute, high-yield demand for international 4-star business hotels, multi-purpose convention auditoriums accommodating 1,000+ delegates, and VIP travel logistics.',
      keyPointsPt: [
        'Tarifas médias diárias (ADR) elevadas sustentadas por contratos com mineradoras e construtoras',
        'Disponibilidade de terrenos municipais na zona nobre do Rio Zambeze para centros de congressos',
        'Potencial para salas modulares, tradução simultânea e infraestruturas digitais de fibra ótica',
        'Sinergia direta com a realização da própria CIIT e fóruns económicos anuais'
      ],
      keyPointsEn: [
        'Strong Average Daily Rates (ADR) underpinned by multinational corporate lodging contracts',
        'Prime riverfront municipal parcels zoned specifically for convention centers and executive hotels',
        'Equipped with modern modular auditoriums, multi-lingual interpretation booths and high-speed fiber',
        'Host venue synergies for future iterations of CIIT and regional bilateral business summits'
      ],
      incentivePt: 'Facilidades de importação de materiais de acabamento e redução temporária de impostos autárquicos.',
      incentiveEn: 'Import concessions on commercial building fit-outs and municipal investment fast-tracking.'
    }
  ];

  const filteredPillars = activeCategory === 'all' 
    ? tourismPillars 
    : tourismPillars.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', labelPt: 'Todas as Oportunidades', labelEn: 'All Opportunities' },
    { id: 'ecolodge', labelPt: 'Eco-Lodges & Resorts', labelEn: 'Eco-Lodges & Resorts' },
    { id: 'safari', labelPt: 'Safaris & Vida Selvagem', labelEn: 'Safaris & Wildlife' },
    { id: 'nautical', labelPt: 'Náutico & Pesca Desportiva', labelEn: 'Nautical & Fishing' },
    { id: 'thermal', labelPt: 'Águas Termais & Bem-Estar', labelEn: 'Thermal & Wellness' },
    { id: 'hunting', labelPt: 'Coutadas & Conservação', labelEn: 'Game Reserves' },
    { id: 'heritage', labelPt: 'Património & MICE', labelEn: 'Heritage & MICE' },
  ];

  const handleOpenInquiry = (title: string) => {
    if (onInquireInterest) {
      onInquireInterest(`Investimento em Turismo: ${title}`);
    } else {
      const el = document.getElementById('area-investidor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="potencial-turistico" 
      className="py-16 sm:py-24 bg-slate-50 text-slate-900 relative border-b border-slate-200 scroll-mt-28 sm:scroll-mt-36 overflow-hidden"
    >
      {/* Anchor for backwards compatibility with navbar link */}
      <div id="turismo-investimento" className="absolute -top-28" />
      {/* Background Ambience Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Equal Stature to Energy Potential */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-amber-950 uppercase mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
            <span>{lang === 'pt' ? 'Prioridade Estratégica CIIT 2026 • Turismo & Ecoturismo' : 'CIIT 2026 Strategic Pillar • Tourism & Ecotourism'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 uppercase mb-4">
            {lang === 'pt' ? 'Potencial Turístico & Ecoturismo de Tete' : 'Tourism & Eco-Investment Potential of Tete'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {lang === 'pt'
              ? 'Com a majestosa Albufeira de Cahora Bassa (2.700 km²), o Parque Nacional de Mágoè, termas naturais medicinais, pesca desportiva de classe mundial e rica herança histórica, Tete é uma das fronteiras de investimento turístico com maior rentabilidade e expansão na África Austral.'
              : 'Endowed with the majestic Lake Cahora Bassa (2,700 km²), Mágoè National Park, natural geothermal springs, world-renowned tigerfish angling, and deep historical heritage, Tete stands as one of the most profitable, untapped eco-tourism frontiers in Southern Africa.'}
          </p>
        </div>

        {/* Macro Strategic Indicators of Tete Tourism (Metrics Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-14">
          <div className="bg-white border border-slate-200 p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all shadow-2xs">
            <span className="text-2xl sm:text-3xl font-display font-black text-amber-600 block mb-1">
              2.700 km²
            </span>
            <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block">
              {lang === 'pt' ? 'Espelho d’Água de Cahora Bassa' : 'Cahora Bassa Lake Surface'}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all shadow-2xs">
            <span className="text-2xl sm:text-3xl font-display font-black text-amber-600 block mb-1">
              3.500+ km²
            </span>
            <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block">
              {lang === 'pt' ? 'Parque Nacional de Mágoè' : 'Mágoè National Park'}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all shadow-2xs">
            <span className="text-2xl sm:text-3xl font-display font-black text-amber-600 block mb-1">
              10+ Fontes
            </span>
            <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block">
              {lang === 'pt' ? 'Águas Termais Geotérmicas' : 'Natural Geothermal Springs'}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all shadow-2xs">
            <span className="text-2xl sm:text-3xl font-display font-black text-amber-600 block mb-1">
              6 Coutadas
            </span>
            <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block">
              {lang === 'pt' ? 'Concessões Cinegéticas Oficiais' : 'Official Game Concessions'}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all shadow-2xs">
            <span className="text-2xl sm:text-3xl font-display font-black text-amber-600 block mb-1">
              15+ kg
            </span>
            <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block">
              {lang === 'pt' ? 'Tigre do Zambeze (Recordes)' : 'Trophy Zambezi Tigerfish'}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-4 text-center hover:border-emerald-400 hover:shadow-xs transition-all shadow-2xs">
            <span className="text-2xl sm:text-3xl font-display font-black text-emerald-700 block mb-1">
              0% Direitos
            </span>
            <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-tight block">
              {lang === 'pt' ? 'Isenção na Importação Hoteleira' : 'Zero Duty on Hotel Equipment'}
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-950 shadow-2xs'
              }`}
            >
              {lang === 'pt' ? cat.labelPt : cat.labelEn}
            </button>
          ))}
        </div>

        {/* 8 Flagship Tourism Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group bg-white border border-slate-200 flex flex-col justify-between hover:border-amber-500 hover:shadow-md transition-all duration-300 overflow-hidden shadow-xs"
            >
              <div>
                {/* Photo with Overlay Badge */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={pillar.image}
                    alt={lang === 'pt' ? pillar.titlePt : pillar.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border bg-slate-900/90 text-amber-300 border-slate-700 backdrop-blur-xs shadow-xs">
                      {lang === 'pt' ? pillar.tagPt : pillar.tagEn}
                    </span>
                  </div>

                  {/* Highlight Metric in Photo Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-xl font-display font-black text-amber-300 block leading-tight drop-shadow-xs">
                        {pillar.highlightMetric}
                      </span>
                      <span className="text-[10px] text-white/95 font-mono block drop-shadow-xs font-medium">
                        {lang === 'pt' ? pillar.highlightLabelPt : pillar.highlightLabelEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5">
                  <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] mb-2 font-mono">
                    <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{lang === 'pt' ? pillar.locationPt : pillar.locationEn}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-950 mb-2.5 leading-snug group-hover:text-amber-700 transition-colors">
                    {lang === 'pt' ? pillar.titlePt : pillar.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 line-clamp-3">
                    {lang === 'pt' ? pillar.descPt : pillar.descEn}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 mb-4 text-[11px] text-slate-600 font-normal">
                    {(lang === 'pt' ? pillar.keyPointsPt : pillar.keyPointsEn).slice(0, 2).map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer with Details & Action Button */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <div className="text-[10px] font-mono text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1.5 line-clamp-1 mb-2">
                  {lang === 'pt' ? pillar.incentivePt : pillar.incentiveEn}
                </div>
                <button
                  onClick={() => setSelectedPillar(pillar)}
                  className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white px-3 py-2 text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer border border-slate-900 hover:border-amber-500 shadow-2xs"
                >
                  <span>{lang === 'pt' ? 'Detalhes da Oportunidade' : 'Opportunity Dossier'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Investment Support Banner & Direct Action */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-300 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-amber-900 font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{lang === 'pt' ? 'Facilitação ao Investidor Turístico' : 'Tourism Investor Facilitation'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mb-3">
                {lang === 'pt' ? 'Benefícios Fiscais & Concessões Garantidas por Lei' : 'Statutory Tax Incentives & Concessions'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'pt'
                  ? 'Os projetos turísticos em Tete contam com apoio institucional direto do Governo Provincial e da APIEX, acesso ao regime de isenção de vistos (evisa.gov.mz), 100% de isenção de direitos aduaneiros em equipamentos hoteleiros e emissão expedita de títulos de aproveitamento de terra (DUAT).'
                  : 'Tourism investments in Tete benefit from direct facilitation by the Provincial Government and APIEX, streamlined e-Visa entry, 100% duty exemptions on hotel fixtures, and fast-track processing of long-term land titles (DUAT).'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => handleOpenInquiry('Geral de Turismo e Eco-Lodges')}
                className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-black transition-colors shadow-md cursor-pointer border border-amber-600"
              >
                <span>{lang === 'pt' ? 'Manifestar Interesse Turístico' : 'Submit Tourism Inquiry'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onViewProjectsClick && (
                <button
                  onClick={onViewProjectsClick}
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-bold transition-colors border border-slate-300 cursor-pointer shadow-2xs"
                >
                  <span>{lang === 'pt' ? 'Ver Portfólio de Projetos' : 'Review Project Portfolio'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Modal / Detailed Dossier Popup for Selected Tourism Pillar */}
      {selectedPillar && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPillar(null)}
        >
          <div 
            className="bg-white border border-slate-300 text-slate-900 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                  {lang === 'pt' ? selectedPillar.tagPt : selectedPillar.tagEn}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {lang === 'pt' ? selectedPillar.locationPt : selectedPillar.locationEn}
                </span>
              </div>
              <button
                onClick={() => setSelectedPillar(null)}
                className="text-slate-400 hover:text-slate-800 text-xl font-bold font-mono px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative h-56 sm:h-64 w-full mb-6 overflow-hidden rounded-xs">
              <img 
                src={selectedPillar.image} 
                alt={lang === 'pt' ? selectedPillar.titlePt : selectedPillar.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-3xl font-display font-black text-amber-300 block">
                  {selectedPillar.highlightMetric}
                </span>
                <span className="text-xs text-white/95 font-mono">
                  {lang === 'pt' ? selectedPillar.highlightLabelPt : selectedPillar.highlightLabelEn}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-display font-black text-slate-950 mb-3">
              {lang === 'pt' ? selectedPillar.titlePt : selectedPillar.titleEn}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {lang === 'pt' ? selectedPillar.descPt : selectedPillar.descEn}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-800 mb-3">
                {lang === 'pt' ? 'Vantagens Estratégicas & Condições de Investimento' : 'Strategic Advantages & Investment Terms'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-normal">
                {(lang === 'pt' ? selectedPillar.keyPointsPt : selectedPillar.keyPointsEn).map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 mb-6">
              <span className="text-[11px] font-mono text-amber-900 block font-bold mb-1">
                {lang === 'pt' ? 'Enquadramento Fiscal do Empreendimento' : 'Fiscal Framework & Incentives'}
              </span>
              <p className="text-xs text-slate-700">
                {lang === 'pt' ? selectedPillar.incentivePt : selectedPillar.incentiveEn}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  handleOpenInquiry(lang === 'pt' ? selectedPillar.titlePt : selectedPillar.titleEn);
                  setSelectedPillar(null);
                }}
                className="flex-1 inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 text-xs font-mono uppercase tracking-widest font-black transition-colors cursor-pointer"
              >
                <span>{lang === 'pt' ? 'Submeter Intenção de Investimento' : 'Submit Investment Intent'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono uppercase font-bold tracking-wider transition-colors border border-slate-300 cursor-pointer"
              >
                {lang === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
