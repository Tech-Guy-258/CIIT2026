/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Official Data for Tete Investment Platform
 * Rigorously structured according to official specifications.
 */

import { DistrictMineral, ProjectItem, SpeciesDistribution, LivestockData, WhyInvestCard } from './types';

import cahoraBassaImg from './assets/images/Cahora Bassa.jpg';
import albufeiraImg from './assets/images/Albufeira de cahora bassa.jpg';
import damImg from './assets/images/cahora_bassa_dam_1784807259669.jpg';
import lakeImg from './assets/images/cahora_bassa_lake_1784808062238.jpg';
import coalImg from './assets/images/moatize_coal_minerals_1784807272754.jpg';
import caprinosImg from './assets/images/tete_caprinos_goats_1784807286233.jpg';
import tchumaTchatoImg from './assets/images/Area_de_Conservacao_Tchuma_Tchato.jpg';
import chicoaImg from './assets/images/Chicoa (2).jpg';
import kapentaImg from './assets/images/KAPENTA.jpg';
import citrusAgriImg from './assets/images/citrus_agriculture_tete_1784807298725.jpg';
import cottonAgriImg from './assets/images/cotton_harvest_commodities_1784807324034.jpg';
import cementImg from './assets/images/cement_bags_construction_1784807313963.jpg';
import magoeParkImg from './assets/images/magoe_national_park_antelopes_1784878851948.jpg';
import missaoBoromaImg from './assets/images/missao_boroma_tete_1784879058976.jpg';
import ponteSamoraImg from './assets/images/ponte samora machel em tete.jpg';
import ponteKassuendeImg from './assets/images/Ponte_Kassuende.jpg';
import ponteDonaAnaImg from './assets/images/Ponte dona ana.jpg';

// ==========================================
// 1. INDICADORES DESTACADOS (HOMEPAGE & SOBRE TETE)
// ==========================================
export const TETE_KEY_INDICATORS = [
  {
    id: 'area',
    value: '100.724 km²',
    label: 'Área da província',
    labelEn: 'Province Area',
    subtext: '3.ª maior província em área em Moçambique',
    subtextEn: '3rd largest province by area in Mozambique',
    iconName: 'Map'
  },
  {
    id: 'arable_land',
    value: '10.065.806 acres',
    label: 'Terra arável',
    labelEn: 'Arable Land',
    subtext: 'Elevado potencial agropecuário e florestal',
    subtextEn: 'High agricultural, livestock and forestry potential',
    iconName: 'Sprout'
  },
  {
    id: 'population',
    value: '3,5 milhões',
    label: 'População',
    labelEn: 'Population',
    subtext: '3.ª maior em população (1,86M economicamente ativa)',
    subtextEn: '3rd largest in population (1.86M economically active)',
    iconName: 'Users'
  },
  {
    id: 'districts',
    value: '15',
    label: 'Distritos',
    labelEn: 'Districts',
    subtext: 'Ampla cobertura territorial e recursos diversificados',
    subtextEn: 'Broad territorial coverage and diversified resources',
    iconName: 'Landmark'
  },
  {
    id: 'municipalities',
    value: '5',
    label: 'Municípios',
    labelEn: 'Municipalities',
    subtext: 'Centros urbanos dinâmicos e polos de comércio',
    subtextEn: 'Dynamic urban centers and trade hubs',
    iconName: 'Building2'
  },
  {
    id: 'waters',
    value: '2.900 km²',
    label: 'Águas interiores',
    labelEn: 'Inland Waters',
    subtext: '2.700 km² pertencentes à albufeira de Cahora Bassa',
    subtextEn: '2,700 km² belonging to Cahora Bassa reservoir',
    iconName: 'Waves'
  }
];

// Dados demográficos e territoriais adicionais de "Sobre Tete"
export const TETE_ABOUT_METRICS = {
  area: '100.724 km²',
  arableLand: '10.065.806 acres',
  population: '3,5 milhões',
  activePopulation: '1,86 milhões',
  inlandWaters: '2.900 km²',
  cahoraBassaWaters: '2.700 km²',
  districtsCount: 15,
  municipalitiesCount: 5,
  areaRank: '3.ª maior província em área',
  popRank: '3.ª maior em população',
  borderLength: 'Aproximadamente 1.400 km de fronteira com Malawi, Zâmbia e Zimbabwe'
};

// ==========================================
// 2. FRONTEIRAS, DISTRITOS E MUNICÍPIOS DE TETE
// ==========================================
export const TETE_BORDERS = [
  { name: 'Malawi', type: 'internacional', direction: 'Este / Nordeste', description: 'Fronteira internacional com o Malawi' },
  { name: 'Zâmbia', type: 'internacional', direction: 'Norte / Noroeste', description: 'Fronteira internacional com a Zâmbia' },
  { name: 'Zimbabwe', type: 'internacional', direction: 'Oeste / Sudoeste', description: 'Fronteira internacional com o Zimbabwe' },
  { name: 'Zambézia', type: 'provincial', direction: 'Sudeste', description: 'Província vizinha de Moçambique' },
  { name: 'Manica', type: 'provincial', direction: 'Sul', description: 'Província vizinha de Moçambique' }
];

export const TETE_DISTRICTS_LIST = [
  { id: 1, name: 'Angónia', capital: 'Ulónguè', zone: 'Norte' },
  { id: 2, name: 'Changara', capital: 'Luenha', zone: 'Sul' },
  { id: 3, name: 'Chiúta', capital: 'Kazula', zone: 'Centro-Norte' },
  { id: 4, name: 'Chifunde', capital: 'Chifunde', zone: 'Norte' },
  { id: 5, name: 'Cahora Bassa', capital: 'Songo', zone: 'Centro' },
  { id: 6, name: 'Dôa', capital: 'Dôa', zone: 'Sul' },
  { id: 7, name: 'Marávia', capital: 'Fingoè', zone: 'Noroeste' },
  { id: 8, name: 'Macanga', capital: 'Furancungo', zone: 'Norte' },
  { id: 9, name: 'Moatize', capital: 'Moatize', zone: 'Centro' },
  { id: 10, name: 'Mutarara', capital: 'Nyamayabáue', zone: 'Sudeste' },
  { id: 11, name: 'Magoè', capital: 'Mphende', zone: 'Oeste' },
  { id: 12, name: 'Tsangano', capital: 'Tsangano', zone: 'Nordeste' },
  { id: 13, name: 'Zumbo', capital: 'Zumbo', zone: 'Extremo Oeste' },
  { id: 14, name: 'Tete City', capital: 'Cidade de Tete', zone: 'Capital Provincial' }
];

export const TETE_MUNICIPALITIES_LIST = [
  { id: 1, name: 'Tete City', type: 'Cidade Capital', district: 'Tete City', description: 'Capital provincial e principal centro comercial e administrativo.' },
  { id: 2, name: 'Moatize City', type: 'Cidade', district: 'Moatize', description: 'Capital da indústria carbonífera e polo logístico ferroviário.' },
  { id: 3, name: 'Vila de Ulónguè', type: 'Vila Municipal', district: 'Angónia', description: 'Celeiro agrícola da província no planalto fértil de Angónia.' },
  { id: 4, name: 'Vila de Nyamayabáue', type: 'Vila Municipal', district: 'Mutarara', description: 'Polo logístico e agropecuário no baixo Zambeze.' },
  { id: 5, name: 'Chitima', type: 'Vila Municipal', district: 'Cahora Bassa', description: 'Sede distrital no vale do Zambeze e porta de entrada da albufeira.' }
];

// ==========================================
// 3. PORQUÊ INVESTIR EM TETE (6 CARDS DIFERENCIAIS)
// ==========================================
export const WHY_INVEST_TETE: WhyInvestCard[] = [
  {
    id: 'geoestrategica',
    number: 1,
    title: 'LOCALIZAÇÃO GEOESTRATÉGICA',
    titleEn: 'GEOSTRATEGIC LOCATION',
    description: 'Tete possui aproximadamente 1.400 km de fronteira com Malawi, Zâmbia e Zimbabwe, permitindo acesso privilegiado ao mercado regional da SADC.',
    descriptionEn: 'Tete possesses approximately 1,400 km of international border with Malawi, Zambia, and Zimbabwe, providing direct access to the SADC market.',
    keyPoints: [
      'Aproximadamente 1.400 km de fronteira internacional',
      'Porta de entrada privilegiada para o mercado da SADC',
      'Ponto central de ligação viária entre três nações vizinhas'
    ],
    keyPointsEn: [
      'Approx. 1,400 km of international border',
      'Prime gateway to the SADC common market',
      'Central road connection hub for three neighboring nations'
    ],
    iconName: 'Globe'
  },
  {
    id: 'plataforma_logistica',
    number: 2,
    title: 'PLATAFORMA LOGÍSTICA',
    titleEn: 'LOGISTICS PLATFORM',
    description: 'Acesso estratégico aos Corredores da Beira e Nacala através de ferrovia e estrada. Destaque para o Aeroporto Internacional de Chingodzi com capacidade para voos regionais e internacionais.',
    descriptionEn: 'Strategic access to the Beira and Nacala Corridors via rail and road. Featuring Chingodzi International Airport with capacity for regional and international flights.',
    keyPoints: [
      'Acesso aos Corredores da Beira e Nacala por ferrovia e estrada',
      'Aeroporto Internacional de Chingodzi na Cidade de Tete',
      'Capacidade operacional para voos regionais e internacionais'
    ],
    keyPointsEn: [
      'Access to Beira and Nacala Corridors by rail and road',
      'Chingodzi International Airport in Tete City',
      'Operational capacity for regional and international flights'
    ],
    iconName: 'Truck'
  },
  {
    id: 'floresta_fauna_turismo',
    number: 3,
    title: 'FLORESTA, FAUNA E TURISMO',
    titleEn: 'FORESTRY, WILDLIFE & TOURISM',
    description: 'Vastas áreas de conservação natural, Parque Nacional de Mágoè e a Floresta Fóssil de Mágoè com grande valor ecológico, científico e ecoturístico.',
    descriptionEn: 'Vast nature conservation areas, Mágoè National Park, and the Mágoè Fossil Forest with significant ecological, scientific, and ecotourism value.',
    keyPoints: [
      'Áreas de conservação natural e savanas preservadas',
      'Parque Nacional de Mágoè',
      'Floresta Fóssil de Mágoè de elevado valor geológico'
    ],
    keyPointsEn: [
      'Nature conservation areas and preserved savannahs',
      'Mágoè National Park',
      'Mágoè Fossil Forest of high geological importance'
    ],
    iconName: 'Trees'
  },
  {
    id: 'recursos_naturais',
    number: 4,
    title: 'RECURSOS NATURAIS ABUNDANTES',
    titleEn: 'ABUNDANT NATURAL RESOURCES',
    description: 'Aproximadamente 10.065.806 hectares/acres de terra arável com forte aptidão para a produção agrícola comercial, pecuária intensiva e florestamento.',
    descriptionEn: 'Approximately 10,065,806 hectares/acres of arable land with immense potential for commercial agricultural production, livestock, and afforestation.',
    keyPoints: [
      'Aproximadamente 10.065.806 hectares/acres de terra arável',
      'Microclimas diversificados para múltiplas culturas',
      'Abundância hídrica da bacia do Rio Zambeze'
    ],
    keyPointsEn: [
      'Approx. 10,065,806 hectares/acres of arable land',
      'Diverse microclimates for diverse crop production',
      'Water abundance from the Zambezi River basin'
    ],
    iconName: 'Sprout'
  },
  {
    id: 'potencial_energetico',
    number: 5,
    title: 'POTENCIAL ENERGÉTICO',
    titleEn: 'ENERGY POWERHOUSE',
    description: 'Central Hidroelétrica de Cahora Bassa com capacidade de 2.075 MW, potencial para construção de mais três centrais hidroelétricas e capacidade adicional de produção de 2.300 MW.',
    descriptionEn: 'Cahora Bassa Hydroelectric Plant with 2,075 MW capacity, potential for three additional hydropower stations, and an extra generation potential of 2,300 MW.',
    keyPoints: [
      'Central Hidroelétrica de Cahora Bassa (2.075 MW)',
      'Potencial para mais 3 centrais hidroelétricas',
      'Potencial adicional de produção de 2.300 MW de energia limpa'
    ],
    keyPointsEn: [
      'Cahora Bassa Hydro Plant (2,075 MW)',
      'Potential for 3 additional hydro power stations',
      'Additional production potential of 2,300 MW clean energy'
    ],
    iconName: 'Zap'
  },
  {
    id: 'recursos_minerais',
    number: 6,
    title: 'RECURSOS MINERAIS',
    titleEn: 'MINERAL RESOURCES',
    description: 'Depósitos de classe mundial de Carvão, Titano-magnetite, Ferro, Ouro, Cobre e outros minerais. Reservas extensas de carvão estimadas em 20 mil milhões de toneladas.',
    descriptionEn: 'World-class deposits of Coal, Titano-magnetite, Iron, Gold, Copper, and other minerals. Extensive coal reserves estimated at 20 billion tonnes.',
    keyPoints: [
      'Reservas de carvão estimadas em 20 mil milhões de toneladas',
      'Carvão, Titano-magnetite, Ferro, Ouro e Cobre',
      'Terras raras, grafite, urânio, gemas e rochas dimensionais'
    ],
    keyPointsEn: [
      'Coal reserves estimated at 20 billion tonnes',
      'Coal, Titano-magnetite, Iron, Gold, and Copper',
      'Rare earths, graphite, uranium, gemstones, and dimension stones'
    ],
    iconName: 'Gem'
  }
];

// ==========================================
// 4. ONDE INVESTIR (SETORES E OPORTUNIDADES)
// ==========================================
export const WHERE_TO_INVEST_SECTORS = [
  {
    id: 'energia_infraestrutura',
    title: 'ENERGIA E INFRAESTRUTURA',
    titleEn: 'ENERGY & INFRASTRUCTURE',
    description: 'Grandes projetos de geração elétrica sustentável, linhas de interconexão, armazenamento e infraestrutura logística no corredor do Zambeze.',
    descriptionEn: 'Large-scale sustainable power generation projects, regional interconnectors, battery storage, and logistics infrastructure in the Zambezi corridor.',
    image: cahoraBassaImg,
    iconName: 'Zap',
    opportunities: [
      'Construção de centrais elétricas resilientes ao clima',
      'Mphanda Nkuwa – Fase I: 1.500 MW',
      'Cahora Bassa Norte: 1.245 MW',
      'Lupata: 600 MW',
      'Boroma: 200 MW',
      'Construção do Porto Seco de Moatize',
      'Projetos solares fotovoltaicos',
      'Projetos de energia eólica',
      'Sistemas de armazenamento de energia'
    ],
    opportunitiesEn: [
      'Construction of climate-resilient power plants',
      'Mphanda Nkuwa – Phase I: 1,500 MW',
      'Cahora Bassa North: 1,245 MW',
      'Lupata: 600 MW',
      'Boroma: 200 MW',
      'Construction of the Moatize Dry Port',
      'Solar photovoltaic projects',
      'Wind energy projects',
      'Energy storage systems'
    ]
  },
  {
    id: 'industria_extrativa',
    title: 'INDÚSTRIA EXTRATIVA',
    titleEn: 'EXTRACTIVE INDUSTRY',
    description: 'Transformação, refinação e processamento local de recursos minerais para agregar valor na província e abastecer cadeias industriais globais.',
    descriptionEn: 'Local transformation, refining, and processing of mineral resources to add regional value and supply global industrial supply chains.',
    image: coalImg,
    iconName: 'Pickaxe',
    opportunities: [
      'Processamento de minério de ferro',
      'Processamento de cobre',
      'Processamento de magnetite',
      'Processamento de ouro'
    ],
    opportunitiesEn: [
      'Iron ore processing and beneficiation',
      'Copper processing and refining',
      'Magnetite processing',
      'Gold extraction and refining'
    ]
  },
  {
    id: 'agricultura',
    title: 'AGRICULTURA',
    titleEn: 'AGRICULTURE & AGRIBUSINESS',
    description: 'Modernização do regadio, retenção e gestão hídrica, canais de irrigação e instalação de unidades de processamento e conservação agroalimentar.',
    descriptionEn: 'Irrigation modernization, water storage and management, canals, and establishing agro-industrial processing and packaging plants.',
    image: citrusAgriImg,
    iconName: 'Wheat',
    opportunities: [
      'Sistemas de irrigação',
      'Barragens',
      'Reservatórios',
      'Canais',
      'Diques',
      'Processamento agrícola'
    ],
    opportunitiesEn: [
      'Modern irrigation systems',
      'Agricultural dams and impoundments',
      'Water reservoirs',
      'Irrigation canals',
      'Dykes and flood control structures',
      'Agro-processing plants'
    ]
  }
];

// ==========================================
// 5. POTENCIAL MINERAL POR DISTRITO
// ==========================================
export const DISTRICT_MINERALS_DATA: DistrictMineral[] = [
  {
    district: 'Zumbo',
    minerals: 'Gemas, terras raras, metais base, coríndon, ouro e carvão.',
    mineralsEn: 'Gemstones, rare earths, base metals, corundum, gold, and coal.',
    mineralTypes: ['Gemas', 'Terras Raras', 'Metais Base', 'Ouro', 'Carvão', 'Coríndon']
  },
  {
    district: 'Marávia',
    minerals: 'Calcário cristalino, anortosito, granito, turmalina, topázio, amazonite, água-marinha, quartzo, ouro, cobre e rochas dimensionais.',
    mineralsEn: 'Crystalline limestone, anorthosite, granite, tourmaline, topaz, amazonite, aquamarine, quartz, gold, copper, and dimension stones.',
    mineralTypes: ['Calcário', 'Granito', 'Gemas', 'Ouro', 'Cobre', 'Rochas Dimensionais']
  },
  {
    district: 'Chifunde',
    minerals: 'Ouro, água-marinha, turmalina e rochas dimensionais.',
    mineralsEn: 'Gold, aquamarine, tourmaline, and dimension stones.',
    mineralTypes: ['Ouro', 'Gemas', 'Rochas Dimensionais']
  },
  {
    district: 'Macanga',
    minerals: 'Ouro, gemas, platina, níquel, terras raras e rochas dimensionais.',
    mineralsEn: 'Gold, gemstones, platinum, nickel, rare earths, and dimension stones.',
    mineralTypes: ['Ouro', 'Gemas', 'Platina', 'Níquel', 'Terras Raras', 'Rochas Dimensionais']
  },
  {
    district: 'Chiúta',
    minerals: 'Ouro, ferro, cobre, águas termais e minerais, turmalina, titanomagnetite e rochas dimensionais.',
    mineralsEn: 'Gold, iron, copper, thermal and mineral waters, tourmaline, titanomagnetite, and dimension stones.',
    mineralTypes: ['Ouro', 'Ferro', 'Cobre', 'Águas Termais', 'Gemas', 'Titanomagnetite', 'Rochas Dimensionais']
  },
  {
    district: 'Angónia',
    minerals: 'Ouro, turmalina, zircão, grafite, ferro, platina e níquel.',
    mineralsEn: 'Gold, tourmaline, zircon, graphite, iron, platinum, and nickel.',
    mineralTypes: ['Ouro', 'Gemas', 'Grafite', 'Ferro', 'Platina', 'Níquel']
  },
  {
    district: 'Tsangano',
    minerals: 'Platina, grafite, coríndon, água-marinha, granadas e ouro.',
    mineralsEn: 'Platinum, graphite, corundum, aquamarine, garnets, and gold.',
    mineralTypes: ['Platina', 'Grafite', 'Coríndon', 'Gemas', 'Ouro']
  },
  {
    district: 'Mutarara',
    minerals: 'Carvão, ágatas, berilo, troncos fossilizados, safira, turmalina, coríndon e granadas.',
    mineralsEn: 'Coal, agates, beryl, fossilized wood, sapphire, tourmaline, corundum, and garnets.',
    mineralTypes: ['Carvão', 'Ágatas', 'Gemas', 'Fósseis', 'Coríndon']
  },
  {
    district: 'Moatize',
    minerals: 'Carvão, ouro, anortosito, urânio, troncos fossilizados, ágatas, titanomagnetite, calcite e rochas dimensionais.',
    mineralsEn: 'Coal, gold, anorthosite, uranium, fossilized wood, agates, titanomagnetite, calcite, and dimension stones.',
    mineralTypes: ['Carvão', 'Ouro', 'Urânio', 'Titanomagnetite', 'Fósseis', 'Rochas Dimensionais']
  },
  {
    district: 'Changara',
    minerals: 'Carvão, fluorite, galena, cobre, urânio, coríndon e manganês.',
    mineralsEn: 'Coal, fluorite, galena, copper, uranium, corundum, and manganese.',
    mineralTypes: ['Carvão', 'Fluorite', 'Galena', 'Cobre', 'Urânio', 'Coríndon', 'Manganês']
  },
  {
    district: 'Cahora Bassa',
    minerals: 'Carvão, ouro, ágatas, troncos fossilizados, dumortierite, granito e rochas dimensionais.',
    mineralsEn: 'Coal, gold, agates, fossilized wood, dumortierite, granite, and dimension stones.',
    mineralTypes: ['Carvão', 'Ouro', 'Ágatas', 'Fósseis', 'Granito', 'Rochas Dimensionais']
  },
  {
    district: 'Magoè',
    minerals: 'Ágatas, troncos fossilizados, ouro, calcite, carvão, urânio e rochas dimensionais.',
    mineralsEn: 'Agates, fossilized wood, gold, calcite, coal, uranium, and dimension stones.',
    mineralTypes: ['Ágatas', 'Fósseis', 'Ouro', 'Carvão', 'Urânio', 'Rochas Dimensionais']
  },
  {
    district: 'Distrito de Tete',
    minerals: 'Carvão e materiais de construção, incluindo areia, pedra de construção, brita e argila.',
    mineralsEn: 'Coal and construction materials, including sand, building stone, aggregate, and clay.',
    mineralTypes: ['Carvão', 'Materiais de Construção', 'Areia', 'Brita', 'Argila']
  }
];

// Tipos de minerais para filtro interativo
export const MINERAL_FILTER_CATEGORIES = [
  'Todos',
  'Carvão',
  'Ouro',
  'Cobre',
  'Ferro',
  'Platina',
  'Gemas',
  'Grafite',
  'Urânio',
  'Rochas Dimensionais'
];

// ==========================================
// 6. PESCA E AQUACULTURA (GRÁFICO E MÉTRICAS)
// ==========================================
export const FISHERIES_SPECIES_DISTRIBUTION: SpeciesDistribution[] = [
  {
    scientificName: 'Oreochromis niloticus',
    commonName: 'Tilápia',
    commonNameEn: 'Nile Tilapia',
    percentage: 93,
    color: '#0284c7' // sky-600
  },
  {
    scientificName: 'Hydrocinus vittatus',
    commonName: 'Peixe-tigre / Nchenga',
    commonNameEn: 'Tigerfish / Nchenga',
    percentage: 2,
    color: '#d97706' // amber-600
  },
  {
    scientificName: 'Distichodus schenga',
    commonName: 'Nchenga',
    commonNameEn: 'Nchenga',
    percentage: 2,
    color: '#059669' // emerald-600
  },
  {
    scientificName: 'Tilapia rendalli',
    commonName: 'Tilápia',
    commonNameEn: 'Redbreast Tilapia',
    percentage: 1,
    color: '#6366f1' // indigo-500
  },
  {
    scientificName: 'Clarias gariepinus',
    commonName: 'Peixe-gato / Mulamba',
    commonNameEn: 'African Catfish / Mulamba',
    percentage: 1,
    color: '#e11d48' // rose-600
  }
];

export const FISHERIES_CAPACITY_HIGHLIGHTS = [
  {
    value: '4.000 ton/ano',
    label: 'Potencial de aquacultura',
    labelEn: 'Aquaculture potential',
    subtext: 'Na albufeira de Cahora Bassa',
    subtextEn: 'In Lake Cahora Bassa reservoir',
    icon: 'Waves'
  },
  {
    value: '2.700 ton/ano',
    label: 'Capacidade de processamento',
    labelEn: 'Processing capacity',
    subtext: 'Processamento industrial de tilápia',
    subtextEn: 'Industrial tilapia processing',
    icon: 'Factory'
  },
  {
    value: '12 milhões/ano',
    label: 'Capacidade de produção',
    labelEn: 'Fingerling production',
    subtext: 'Produção de alevinos por ano',
    subtextEn: 'Fingerlings per year capacity',
    icon: 'Fish'
  },
  {
    value: '6.000 ton/ano',
    label: 'Potencial de captura',
    labelEn: 'Catch potential',
    subtext: 'Captura sustentável de Kapenta',
    subtextEn: 'Sustainable Kapenta catch',
    icon: 'Anchor'
  }
];

export const FISHERIES_GALLERY_CARDS = [
  {
    id: 'tilapia',
    title: 'Tilápia (Oreochromis niloticus & Tilapia rendalli)',
    titleEn: 'Tilapia Production & Processing',
    category: 'Aquacultura',
    image: chicoaImg,
    description: 'Representa 94% da biomassa de pescado comercial, com projetos líderes de aquacultura em gaiolas flutuantes e alta capacidade de processamento.',
    descriptionEn: 'Represents 94% of commercial fish biomass, featuring leading floating cage aquaculture projects and large-scale processing facilities.'
  },
  {
    id: 'kapenta',
    title: 'Kapenta do Zambeze',
    titleEn: 'Zambezi Kapenta Fishery',
    category: 'Pesca Comercial',
    image: kapentaImg,
    description: 'Potencial de captura de 6.000 toneladas/ano. Pescado noturno de alto valor nutritivo e ampla aceitação no mercado de Moçambique e SADC.',
    descriptionEn: 'Catch potential of 6,000 tonnes/year. High-nutrient pelagic fishery with strong demand across domestic and regional SADC markets.'
  },
  {
    id: 'albufeira',
    title: 'Albufeira de Cahora Bassa',
    titleEn: 'Cahora Bassa Reservoir Ecosystem',
    category: 'Recurso Hídrico',
    image: albufeiraImg,
    description: 'Com 2.700 km² de superfície aquática, constitui um dos maiores ecossistemas lacustres da África para pesca desportiva, comercial e aquacultura.',
    descriptionEn: 'Spanning 2,700 km² of water surface, one of Africa’s largest freshwater ecosystems for commercial fishing, sport fishing, and cage aquaculture.'
  },
  {
    id: 'aquacultura',
    title: 'Centros de Produção de Alevinos',
    titleEn: 'Hatcheries & Fingerling Centers',
    category: 'Tecnologia Aquícola',
    image: lakeImg,
    description: 'Capacidade instalada para produzir 12 milhões de alevinos por ano para povoamento de tanques e abastecimento de piscicultores.',
    descriptionEn: 'Installed capacity to produce 12 million fingerlings annually to stock grow-out cages and supply local fish farmers.'
  }
];

// ==========================================
// 7. OUTROS POTENCIAIS (5 GRANDES ÁREAS)
// ==========================================
export const LIVESTOCK_CENSUS_DATA: LivestockData[] = [
  { category: 'Bovinos', categoryEn: 'Cattle (Bovine)', count: 430472, unit: 'cabeças' },
  { category: 'Caprinos', categoryEn: 'Goats (Caprine)', count: 575211, unit: 'cabeças' },
  { category: 'Ovinos', categoryEn: 'Sheep (Ovine)', count: 30263, unit: 'cabeças' },
  { category: 'Suínos', categoryEn: 'Pigs (Swine)', count: 188933, unit: 'cabeças' },
  { category: 'Aves', categoryEn: 'Poultry', count: 1472518, unit: 'unidades' }
];

export const OTHER_POTENTIALS_AREAS = [
  {
    id: 'pecuaria',
    title: 'PECUÁRIA',
    titleEn: 'LIVESTOCK',
    subtitle: 'Rebanho expressivo e capacidade industrial',
    subtitleEn: 'Substantial herd & industrial capacity',
    image: caprinosImg,
    iconName: 'Beef',
    highlightBadge: 'Cabrito de Tete: 1.ª Indicação Geográfica registada',
    highlightBadgeEn: 'Tete Goat: 1st Registered Geographical Indication',
    stats: [
      { label: 'Bovinos', value: '430.472 cabeças' },
      { label: 'Caprinos', value: '575.211 cabeças' },
      { label: 'Ovinos', value: '30.263 cabeças' },
      { label: 'Suínos', value: '188.933 cabeças' },
      { label: 'Aves', value: '1.472.518 aves' }
    ],
    processingCapacity: 'Capacidade de processamento: 8.030 toneladas de carne bovina e 2.000 toneladas de carne caprina por ano.',
    processingCapacityEn: 'Processing capacity: 8,030 tonnes of beef and 2,000 tonnes of goat meat per year.',
    description: 'A pecuária é uma das marcas identitárias mais fortes da província. O "Cabrito de Tete" detém a primeira Indicação Geográfica (IG) registada em Moçambique, conferindo distinção gastronómica e valor comercial único para exportação.',
    descriptionEn: 'Livestock farming is a cornerstone of Tete. "Cabrito de Tete" holds the first registered Geographical Indication (GI) in Mozambique, providing unique gastronomic distinction and export value.'
  },
  {
    id: 'agricultura',
    title: 'AGRICULTURA',
    titleEn: 'AGRICULTURE',
    subtitle: '10.065.806 de terra fértil e culturas de alto rendimento',
    subtitleEn: '10,065,806 of fertile land & high-yield crops',
    image: cottonAgriImg,
    iconName: 'Sprout',
    stats: [
      { label: 'Área disponível', value: '10.065.806' },
      { label: 'Recurso Hídrico', value: 'Bacia do Zambeze' }
    ],
    crops: ['Milho', 'Soja', 'Gergelim', 'Batata', 'Tabaco', 'Trigo', 'Feijão', 'Hortícolas'],
    cropsEn: ['Maize', 'Soybean', 'Sesame', 'Potato', 'Tobacco', 'Wheat', 'Beans', 'Vegetables'],
    description: 'Com solos férteis nos planaltos de Angónia e Tsangano e acesso contínuo à água do Rio Zambeze, Tete apresenta condições para culturas de grãos, oleaginosas, tubérculos e hortícolas com alto valor agroindustrial.',
    descriptionEn: 'With fertile highland soils in Angónia and Tsangano and continuous water access from the Zambezi River, Tete offers prime conditions for grains, oilseeds, tubers, and vegetables.'
  },
  {
    id: 'florestas_fauna',
    title: 'FLORESTAS E FAUNA',
    titleEn: 'FORESTRY & WILDLIFE',
    subtitle: 'Florestas, savanas e fauna bravia diversificada',
    subtitleEn: 'Forests, savannas & rich wildlife biodiversity',
    image: magoeParkImg,
    iconName: 'Trees',
    features: ['Florestas', 'Savanas', 'Áreas adequadas para reflorestamento', 'Potencial faunístico'],
    featuresEn: ['Forests', 'Savannas', 'Suitable areas for reforestation', 'Wildlife potential'],
    species: ['Búfalos', 'Kudus', 'Elefantes', 'Zebras', 'Leões', 'Leopardos'],
    speciesEn: ['Buffaloes', 'Kudus', 'Elephants', 'Zebras', 'Lions', 'Leopards'],
    description: 'Extensas formações florestais com aptidão para silvicultura sustentável, captura de carbono e concessões de reflorestamento, combinadas com reservas faunísticas de grande porte.',
    descriptionEn: 'Extensive forest formations suitable for sustainable commercial forestry, carbon credits, and timber concessions, alongside renowned large-mammal wildlife reserves.'
  },
  {
    id: 'turismo',
    title: 'TURISMO',
    titleEn: 'TOURISM',
    subtitle: 'Ecoturismo, safaris e albufeira monumental',
    subtitleEn: 'Ecotourism, safaris & monumental reservoir',
    image: tchumaTchatoImg,
    iconName: 'Palmtree',
    attractions: [
      'Eco-lodges',
      'Safaris',
      'Ecossistema da albufeira de Cahora Bassa',
      'Áreas de conservação',
      'Águas termais',
      'Pesca desportiva',
      'Turismo cinegético'
    ],
    attractionsEn: [
      'Eco-lodges',
      'Safaris',
      'Lake Cahora Bassa ecosystem',
      'Conservation areas',
      'Thermal waters & mineral springs',
      'Sport fishing (Tigerfish)',
      'Hunting and photo tourism'
    ],
    description: 'Destino singular que combina a imensidão da albufeira de Cahora Bassa, águas termais curativas, desfiladeiros cénicos no Rio Zambeze e safaris na estepe moçambicana.',
    descriptionEn: 'A unique destination combining the vastness of Lake Cahora Bassa, healing hot springs, scenic Zambezi gorges, and wildlife safaris across the Mozambican savannah.'
  },
  {
    id: 'logistica_servicos',
    title: 'LOGÍSTICA E SERVIÇOS',
    titleEn: 'LOGISTICS & SERVICES',
    subtitle: 'Conectividade intermodal e acesso regional',
    subtitleEn: 'Intermodal connectivity & regional reach',
    image: ponteKassuendeImg,
    iconName: 'Truck',
    infrastructure: [
      'Rede rodoviária (N7, N8, N9 e pontes internacionais)',
      'Corredor de Nacala (ligação ferroviária ao porto de águas profundas)',
      'Linha de Sena (escoamento ferroviário para o Porto da Beira)',
      'Aeroporto Internacional de Chingodzi, Cidade de Tete'
    ],
    infrastructureEn: [
      'Road network (N7, N8, N9, and international bridges)',
      'Nacala Corridor (rail connection to deep-water port)',
      'Sena Railway Line (direct rail connection to Beira Port)',
      'Chingodzi International Airport, Tete City'
    ],
    description: 'Eixo logístico nevrálgico da África Austral com ferrovia, estradas asfaltadas transfronteiriças e aeroporto com voos comerciais regulares para Maputo e ligações regionais.',
    descriptionEn: 'Vital logistics artery in Southern Africa featuring direct rail, paved cross-border highways, and an international airport with scheduled flights.'
  }
];

// ==========================================
// 8. POTENCIAL ENERGÉTICO (PROJETOS & MAPA ESTILIZADO)
// ==========================================
export const ENERGY_PROJECTS_DATA = [
  {
    id: 'mphanda_nkuwa',
    name: 'Mphanda Nkuwa',
    capacity: '1.500 MW (Fase I)',
    type: 'Hidroelétrica',
    location: 'Rio Zambeze, 60 km a jusante de Cahora Bassa',
    status: 'Projeto Estruturante Nacional',
    description: 'Construção da nova central hidroelétrica que aumentará a segurança energética e a exportação de energia limpa na SADC.'
  },
  {
    id: 'hcb_expansion',
    name: 'HCB (Cahora Bassa)',
    capacity: '2.925 MW',
    type: 'Hidroelétrica Existente + Expansão Norte (1.245 MW)',
    location: 'Garganta de Cahora Bassa, Songo',
    status: 'Operação e Expansão',
    description: 'Central em operação com 2.075 MW e projeto de expansão da Central Norte para atingir 2.925 MW / capacidade combinada.'
  },
  {
    id: 'lupata',
    name: 'Lupata',
    capacity: '600 MW',
    type: 'Hidroelétrica',
    location: 'Garganta de Lupata, com reservatório até Changara',
    status: 'Em Desenvolvimento',
    description: 'Aproveitamento hidroelétrico no vale do Zambeze com capacidade prevista de 600 MW.'
  },
  {
    id: 'boroma',
    name: 'Boroma',
    capacity: '200 MW',
    type: 'Hidroelétrica',
    location: 'Rio Zambeze, a montante de Cahora Bassa',
    status: 'USD 600 Milhões',
    description: 'Construção de barragem e central hidroelétrica no Rio Zambeze.'
  }
];

export const ENERGY_OPPORTUNITIES_LIST = [
  { title: 'Energia hidroelétrica', desc: 'Aproveitamento das correntes do Rio Zambeze e afluentes.' },
  { title: 'Energia solar fotovoltaica', desc: 'Elevado índice de radiação solar para centrais terrestres e solares flutuantes.' },
  { title: 'Energia eólica', desc: 'Parques eólicos nas áreas de relevo acidentado e planaltos.' },
  { title: 'Armazenamento de energia', desc: 'Sistemas BESS para estabilização de rede e integração renovável.' },
  { title: 'Infraestrutura energética', desc: 'Linhas de transmissão de alta tensão e subestações para interligação SADC.' }
];

// ==========================================
// 9. PORTFÓLIO DE PROJETOS (OS 8 PROJETOS REAIS)
// ==========================================
export const PROJECTS_PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Boroma',
    nameEn: 'Boroma Hydroelectric Project',
    description: 'Construção de uma barragem e central elétrica em Cahora Bassa.',
    descriptionEn: 'Construction of a dam and power plant in Cahora Bassa.',
    capacity: '200 MW',
    capacityEn: '200 MW',
    location: 'Província de Tete, Rio Zambeze, a montante da Central Hidroelétrica de Cahora Bassa.',
    locationEn: 'Tete Province, Zambezi River, upstream of Cahora Bassa Hydroelectric Plant.',
    investment: 'USD 600 milhões',
    investmentEn: 'USD 600 Million',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Energia',
    investmentTypeEn: 'Energy',
    image: damImg
  },
  {
    id: 'proj-2',
    name: 'Lupata',
    nameEn: 'Lupata Hydroelectric Project',
    description: 'Projeto localizado na Província de Tete, com capacidade prevista de 600 MW.',
    descriptionEn: 'Project located in Tete Province, with an expected capacity of 600 MW.',
    capacity: '600 MW',
    capacityEn: '600 MW',
    location: 'Província de Tete, com o reservatório a estender-se até à zona de Changara.',
    locationEn: 'Tete Province, with the reservoir extending to the Changara area.',
    investment: 'Investimento estruturado',
    investmentEn: 'Structured Investment',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Energia',
    investmentTypeEn: 'Energy',
    image: cahoraBassaImg
  },
  {
    id: 'proj-3',
    name: 'NKONDEZE ENERGY',
    nameEn: 'NKONDEZE ENERGY Solar & Storage',
    description: 'Produção de energia a partir de fontes renováveis, com foco na geração de energia solar fotovoltaica e armazenamento em baterias.',
    descriptionEn: 'Energy production from renewable sources, focusing on solar PV generation and battery energy storage.',
    capacity: '300 MW',
    capacityEn: '300 MW',
    location: 'Província de Tete — distritos de Moatize e Chiúta.',
    locationEn: 'Tete Province — Moatize and Chiúta districts.',
    investment: 'USD 60 milhões',
    investmentEn: 'USD 60 Million',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Energia',
    investmentTypeEn: 'Energy',
    image: lakeImg
  },
  {
    id: 'proj-4',
    name: 'Central Termoelétrica de Chifunde',
    nameEn: 'Chifunde Thermal Power Plant',
    description: 'Instalação de uma unidade para geração de eletricidade a partir de energia térmica.',
    descriptionEn: 'Installation of a unit for electricity generation from thermal energy.',
    capacity: '300 MW',
    capacityEn: '300 MW',
    location: 'Distrito de Chifunde.',
    locationEn: 'Chifunde District.',
    investment: 'USD 12 milhões',
    investmentEn: 'USD 12 Million',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Produção',
    investmentTypeEn: 'Production',
    image: coalImg
  },
  {
    id: 'proj-5',
    name: 'Produção e processamento de frangos de corte',
    nameEn: 'Broiler Chicken Production & Processing',
    description: 'Produção avícola.',
    descriptionEn: 'Poultry broiler production and meat processing.',
    capacity: 'Produção avícola integrada e processamento',
    capacityEn: 'Integrated poultry production and processing',
    location: 'Tsangano — Localidade de Chinvano.',
    locationEn: 'Tsangano — Chinvano locality.',
    investment: '25 milhões de meticais',
    investmentEn: '25 Million Meticais',
    sector: 'Pecuária',
    sectorEn: 'Livestock',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Produção',
    investmentTypeEn: 'Production',
    image: caprinosImg
  },
  {
    id: 'proj-6',
    name: 'Produção, promoção e processamento de batata',
    nameEn: 'Potato Production, Promotion & Processing',
    description: 'Produção agrícola de batata.',
    descriptionEn: 'Agricultural potato production and value addition.',
    capacity: 'Cadeia de produção e armazenamento frigorífico',
    capacityEn: 'Production chain and cold storage capacity',
    location: 'Distrito de Tsangano.',
    locationEn: 'Tsangano District.',
    investment: '49 milhões de meticais',
    investmentEn: '49 Million Meticais',
    sector: 'Agricultura',
    sectorEn: 'Agriculture',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Produção',
    investmentTypeEn: 'Production',
    image: citrusAgriImg
  },
  {
    id: 'proj-7',
    name: 'Produção, promoção e processamento de tomate',
    nameEn: 'Tomato Production, Promotion & Processing',
    description: 'O projeto pretende reduzir as perdas de tomate, considerando que este produto é altamente perecível.',
    descriptionEn: 'The project aims to reduce tomato post-harvest losses, given that this product is highly perishable.',
    capacity: 'Processamento agroindustrial e conservação',
    capacityEn: 'Agro-processing and preservation unit',
    location: 'Distrito de Chiúta — Localidade de Kaunda.',
    locationEn: 'Chiúta District — Kaunda locality.',
    investment: '27,3 milhões de meticais',
    investmentEn: '27.3 Million Meticais',
    sector: 'Agricultura',
    sectorEn: 'Agriculture',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Processamento',
    investmentTypeEn: 'Processing',
    image: cottonAgriImg
  },
  {
    id: 'proj-8',
    name: 'Iron Processing',
    nameEn: 'Iron Ore Extraction & Processing',
    description: 'Extração e processamento de minério de ferro, com capacidade indicada no documento.',
    descriptionEn: 'Extraction and processing of iron ore, with capacity indicated in the document.',
    capacity: '2,35 milhões de toneladas/ano',
    capacityEn: '2.35 Million Tonnes / Year',
    location: 'Distrito de Chiúta.',
    locationEn: 'Chiúta District.',
    investment: 'USD 950 milhões',
    investmentEn: 'USD 950 Million',
    sector: 'Mineração',
    sectorEn: 'Mining',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Extração',
    investmentTypeEn: 'Extraction',
    image: cementImg
  }
];
