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
    value: '10.065.806 hectares',
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
  arableLand: '10.065.806 hectares',
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
    description: 'Aproximadamente 10.065.806 hectares de terra arável com forte aptidão para a produção agrícola comercial, pecuária intensiva e florestamento.',
    descriptionEn: 'Approximately 10,065,806 hectares of arable land with immense potential for commercial agricultural production, livestock, and afforestation.',
    keyPoints: [
      'Aproximadamente 10.065.806 hectares de terra arável',
      'Microclimas diversificados para múltiplas culturas',
      'Abundância hídrica da bacia do Rio Zambeze'
    ],
    keyPointsEn: [
      'Approx. 10,065,806 hectares of arable land',
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
// 9. PORTFÓLIO DE PROJETOS OFICIAIS (APIEX & GOVERNO DE TETE)
// ==========================================
export const PROJECTS_PORTFOLIO_DATA: ProjectItem[] = [
  // ----------------------------------------------------
  // 1. SIDERURGIA & METALURGIA
  // ----------------------------------------------------
  {
    id: 'proj-baobab-steel',
    name: 'Baobab Capital Resources (Siderurgia & Ferrovanádio)',
    nameEn: 'Baobab Capital Resources (Steel & Ferrovanadium)',
    description: 'Projeto de grande dimensão para produção de aço e ferrovanádio. Projeto âncora para a Zona Franca Industrial (ZFI) de Rovubwe. Potencial PPP com a EDM para fornecimento de energia e interligação da linha à rede nacional.',
    descriptionEn: 'Large-scale steel and ferrovanadium production plant. Anchor industrial development for the Rovubwe Industrial Free Zone. Potential PPP with EDM for national grid interconnection.',
    capacity: '500.000 ton/ano de Aço | 2.500 ton/ano de Ferrovanádio',
    capacityEn: '500,000 tonnes/year Steel | 2,500 tonnes/year Ferrovanadium',
    location: 'Distrito de Chiúta (ZFI de Rovubwe), Província de Tete',
    locationEn: 'Chiúta District (Rovubwe Free Zone), Tete Province',
    investment: 'USD 750 Milhões a 1 Bilhão',
    investmentEn: 'USD 750 Million to 1 Billion',
    sector: 'Mineração',
    sectorEn: 'Mining & Metallurgy',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Siderurgia & Metalurgia',
    investmentTypeEn: 'Steel & Metallurgy',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'BAOBAB CAPITAL RESOURCES, LDA',
    proponentType: 'Privado',
    proponentLocation: 'Distrito de Chiúta',
    proponentContact: 'Fátima Sing Sang: (+258) 84 309 9846',
    financingMode: 'Privado / PPP (Capital Próprio de 1ª linha ou Dívida + Equity)',
    financingModeEn: 'Private / PPP (Top-tier Equity or Debt + Equity)',
    targetMarket: 'Internacional (com destaque para Índia, China e Tailândia)',
    targetMarketEn: 'International (notably India, China, and Thailand)',
    feasibilityStudy: 'Estudo de viabilidade técnica e económica concluído e aprovado',
    feasibilityStudyEn: 'Techno-economic feasibility study completed and confirmed viable',
    socialEconomicBenefits: 'Atração massiva de capital internacional, dinamização de corredores logísticos ferroviários e novos postos de trabalho diretos para a juventude.',
    socialEconomicBenefitsEn: 'Massive FDI attraction, railway logistics corridor boost, direct industrial jobs for local youth.',
    basicInfrastructure: 'Potencial ligação da linha de energia à rede nacional via EDM; corredor logístico rodoviário e ferroviário.',
    basicInfrastructureEn: 'Power transmission interconnection via EDM; road and rail logistics corridors.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cementImg
  },

  // ----------------------------------------------------
  // 2. ENERGIA HIDROELÉTRICA E RENOVÁVEL
  // ----------------------------------------------------
  {
    id: 'proj-lupata-hydro',
    name: 'Central Hidroelétrica da Barragem de Lupata',
    nameEn: 'Lupata Dam Hydroelectric Power Plant',
    description: 'Construção de uma central hidroelétrica de 600 MW no rio Zambeze para aumentar a oferta de energia na África Austral e apoiar o desenvolvimento da agricultura e silvicultura ao longo do vale.',
    descriptionEn: 'Construction of a 600 MW hydroelectric power plant on the Zambezi River to boost regional electricity supply across Southern Africa and support valley agriculture and forestry.',
    capacity: '600 MW',
    capacityEn: '600 MW',
    location: 'Rio Zambeze, Província de Tete (reservatório estende-se a Changara)',
    locationEn: 'Zambezi River, Tete Province (reservoir extending to Changara)',
    investment: 'USD 1.100 Milhões (1,1 B)',
    investmentEn: 'USD 1,100 Million (1.1 B)',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Energia Hidroelétrica',
    investmentTypeEn: 'Hydropower',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Parceria de Âmbito Nacional e Internacional',
    proponentType: 'PPP',
    proponentLocation: 'Rio Zambeze, Província de Tete',
    proponentContact: 'APIEX / Ministério da Economia / EDM',
    financingMode: 'Nacional e Internacional / Parceria Público-Privada (PPP)',
    financingModeEn: 'National & International / Public-Private Partnership (PPP)',
    targetMarket: 'Mercado Moçambicano e África Austral (SAPP)',
    targetMarketEn: 'Mozambican Market and Southern Africa (SAPP)',
    socialEconomicBenefits: 'Criação maciça de emprego, eletrificação rural acelerada, programas de responsabilidade social, industrialização e agronegócio.',
    socialEconomicBenefitsEn: 'Massive job creation, rural electrification, structured community programs, agro-industry growth.',
    basicInfrastructure: 'Reabilitação e abertura de acessos rodoviários na Província de Tete, ligação à rede elétrica nacional e regional, captação local de água.',
    basicInfrastructureEn: 'Rehabilitation and construction of road links, interconnection to national/regional grid, local water intake.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cahoraBassaImg
  },
  {
    id: 'proj-boroma-hydro',
    name: 'Central Hidroelétrica da Barragem de Boroma',
    nameEn: 'Boroma Dam Hydroelectric Power Plant',
    description: 'Central hidroelétrica no rio Zambeze a 100 km a montante de Cahora Bassa. Sob liderança da EDM, inclui a reabilitação da Estrada R301 (Matambo – Songo, 117 km) e oportunidades para fornecedores nacionais.',
    descriptionEn: 'Hydroelectric power station on the Zambezi River 100 km upstream of Cahora Bassa. Led by EDM, includes rehabilitation of Road R301 (Matambo – Songo, 117 km) and local SME procurement.',
    capacity: '180 a 210 MW',
    capacityEn: '180 to 210 MW',
    location: 'Província de Tete, Distrito de Marara',
    locationEn: 'Tete Province, Marara District',
    investment: 'USD 600 Milhões',
    investmentEn: 'USD 600 Million',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Energia Hidroelétrica',
    investmentTypeEn: 'Hydropower',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'EDM em parceria com a Sonipal e Rundtland Holding (Maurícias)',
    proponentType: 'PPP',
    proponentLocation: 'Distrito de Marara, Província de Tete',
    proponentContact: 'Electricidade de Moçambique (EDM) / APIEX',
    financingMode: 'Parceria Público-Privada (PPP)',
    financingModeEn: 'Public-Private Partnership (PPP)',
    targetMarket: 'Consumo interno em Moçambique e exportação para a África Austral',
    targetMarketEn: 'Domestic Mozambican consumption and export to Southern Africa',
    socialEconomicBenefits: 'Postos de trabalho diretos e indiretos na construção e operação, abertura de furos de água potável comunitários, construção de escolas e postos de saúde.',
    socialEconomicBenefitsEn: 'Construction and operational jobs, community water boreholes, school and health center construction.',
    basicInfrastructure: 'Reabilitação da Estrada R301 Matambo-Songo (117 km), linhas provisórias de média tensão e subestações de estaleiro.',
    basicInfrastructureEn: 'Rehabilitation of Road R301 Matambo-Songo (117 km), medium-voltage site lines and construction substations.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: damImg
  },
  {
    id: 'proj-nkondeze-solar',
    name: 'Central Fotovoltaica de Nkondeze Energy',
    nameEn: 'Nkondeze Energy Solar PV & Storage (BESS)',
    description: 'Central solar de 300 MW com sistemas de armazenamento de energia em baterias (BESS) numa área com recurso solar de 1.980 kWh/m². Em fase avançada de licenciamento e estruturação de equity.',
    descriptionEn: '300 MW solar PV utility with Battery Energy Storage Systems (BESS) capitalizing on 1,980 kWh/m² irradiance. Advanced permitting and strategic equity structuring stage.',
    capacity: '300 MW com Armazenamento BESS',
    capacityEn: '300 MW with Battery Storage (BESS)',
    location: 'Província de Tete (Distritos de Moatize e Chiúta)',
    locationEn: 'Tete Province (Moatize & Chiúta Districts)',
    investment: 'USD 60.000.000,00',
    investmentEn: 'USD 60,000,000.00',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Energia Solar & Armazenamento',
    investmentTypeEn: 'Solar PV & Storage',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Nkondeze Energy (Privado)',
    proponentType: 'Privado',
    proponentLocation: 'Província de Tete',
    proponentContact: 'Nkondeze Energy / APIEX',
    financingMode: 'Privado (Atração de Parceiros Estratégicos)',
    financingModeEn: 'Private (Strategic Partner Equity Attraction)',
    targetMarket: 'Mercado nacional via REN e regional via SAPP (Southern Africa Power Pool)',
    targetMarketEn: 'National market via REN and regional via SAPP (Southern Africa Power Pool)',
    feasibilityStudy: 'Estudo de viabilidade técnica concluído (recurso solar de 1.980 kWh/m² comprovado)',
    feasibilityStudyEn: 'Technical feasibility completed (verified solar resource of 1,980 kWh/m²)',
    socialEconomicBenefits: 'Empregos técnicos verdes, programa estruturado de responsabilidade social comunitária e geração de fluxo de caixa regional.',
    socialEconomicBenefitsEn: 'Green technical jobs, structured community social programs, and clean energy cash flows.',
    basicInfrastructure: 'Proximidade estratégica a subestações da EDM e linhas de alta tensão, furos artesianos locais.',
    basicInfrastructureEn: 'Strategic proximity to EDM substations and high-voltage transmission lines, onsite boreholes.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: lakeImg
  },
  {
    id: 'proj-benga-solar',
    name: 'Central Solar Fotovoltaica de Benga',
    nameEn: 'Benga Solar Photovoltaic Plant',
    description: 'Produção de 300 MW de energia solar renovável a partir da Mina de Benga (transição estratégica do antigo plano térmico a carvão para sustentabilidade ambiental e eletrificação comunitária).',
    descriptionEn: '300 MW solar clean power generation at Benga Mine (strategic transition from former coal thermal project to sustainable solar and community electrification).',
    capacity: '300 MW',
    capacityEn: '300 MW',
    location: 'Distrito de Moatize, Província de Tete',
    locationEn: 'Moatize District, Tete Province',
    investment: 'Investimento Privado Estruturado',
    investmentEn: 'Structured Private Investment',
    sector: 'Energia',
    sectorEn: 'Energy',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Energia Solar & Transição',
    investmentTypeEn: 'Solar & Clean Transition',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'ICVL (International Coal Ventures - Privado)',
    proponentType: 'Privado',
    proponentLocation: 'Distrito de Moatize, Tete',
    proponentContact: 'ICVL Moatize / APIEX',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado nacional (Rede Eléctrica Nacional & PMEs locais)',
    targetMarketEn: 'National market (National Grid & local SME off-takers)',
    socialEconomicBenefits: 'Descarbonização, redução de falhas de energia, desenvolvimento comunitário estruturado e contratos indiretos para PMEs.',
    socialEconomicBenefitsEn: 'Decarbonization, grid resilience, structured community development, and indirect contracts for local SMEs.',
    basicInfrastructure: 'Corredor rodoviário principal N7 e 5 a 12 km de acessos internos em Moatize para transporte seguro de inversores e painéis.',
    basicInfrastructureEn: 'Main N7 road corridor and 5 to 12 km of internal service roads for safe transport of transformers and inverters.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: coalImg
  },

  // ----------------------------------------------------
  // 3. MINERAÇÃO E METALURGIA
  // ----------------------------------------------------
  {
    id: 'proj-copper-milling',
    name: 'Tete Copper Milling (Processamento de Cobre)',
    nameEn: 'Tete Copper Milling (Copper Processing)',
    description: 'Projeto industrial de exploração, moagem e concentração de minério de cobre em Chifunde, com capacidade para processar 5.000 ton/mês para alimentação da indústria e exportação.',
    descriptionEn: 'Mining, crushing, and milling of copper ore in Chifunde, processing 5,000 tonnes/month to feed domestic industry and regional export markets.',
    capacity: '5.000 toneladas / mês',
    capacityEn: '5,000 tonnes / month',
    location: 'Distrito de Chifunde, Província de Tete',
    locationEn: 'Chifunde District, Tete Province',
    investment: 'Investimento Privado Estruturado',
    investmentEn: 'Structured Private Investment',
    sector: 'Mineração',
    sectorEn: 'Mining',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Exploração & Moagem Mineral',
    investmentTypeEn: 'Mineral Milling & Extraction',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Tete Copper Milling, Lda',
    proponentType: 'Privado',
    proponentLocation: 'Província de Tete, Distrito de Chifunde',
    proponentContact: 'Alexandre: (+258) 87 230 5791',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado doméstico e regional (África Austral / SADC)',
    targetMarketEn: 'Domestic and regional market (Southern Africa / SADC)',
    socialEconomicBenefits: 'Criação de postos de trabalho especializados em Chifunde, desenvolvimento socioeconómico e oportunidades comerciais para fornecedores locais.',
    socialEconomicBenefitsEn: 'Specialized jobs in Chifunde, local socioeconomic development, and commercial supply opportunities for SMEs.',
    basicInfrastructure: 'Acessos rodoviários ao jazigo, fornecimento de água industrial e energia.',
    basicInfrastructureEn: 'Road access to ore deposit, industrial water, and electricity.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cementImg
  },

  // ----------------------------------------------------
  // 4. AGROINDÚSTRIA, AGRICULTURA & PECUÁRIA
  // ----------------------------------------------------
  {
    id: 'proj-soja-angonia',
    name: 'Fábrica de Processamento de Leite de Soja e Derivados',
    nameEn: 'Angónia Soy Milk & Yogurt Agro-Processing Plant',
    description: 'Complexo agroindustrial de 40.000 m² na EN 304 em Ulónguè. Produção de leite e iogurte de soja (sabores natural, morango, banana, ananás, malambe, baunilha, maçã e chocolate), farinha composta com soja/amendoim/gergelim, tofu e rações.',
    descriptionEn: '40,000 m² agro-industrial facility on EN 304 in Ulónguè. Multi-flavor soy milk and yogurt production, fortified porridge flour, tofu, functional bakery, and animal feed from hulls.',
    capacity: 'Grande dimensão | Área industrial de 40.000 m²',
    capacityEn: 'Large scale | 40,000 m² industrial footprint',
    location: 'Bairro Francisco Manyanga, EN 304, Vila de Ulónguè, Distrito de Angónia',
    locationEn: 'Francisco Manyanga, EN 304, Ulónguè, Angónia District',
    investment: 'Investimento Privado / Joint-Venture',
    investmentEn: 'Private Investment / Joint-Venture',
    sector: 'Agricultura',
    sectorEn: 'Agriculture & Agro-Processing',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Agroprocessamento de Soja',
    investmentTypeEn: 'Soy Agro-Processing',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Fábrica de Processamento de Leite de Soja e Derivados',
    proponentType: 'Privado',
    proponentLocation: 'Estrada Nacional nº 304, Ulónguè, Angónia',
    proponentContact: 'Antonio Mtola: (+258) 84 917 0872 / 87 471 3465',
    financingMode: 'Privado / Joint-Venture Estratégica',
    financingModeEn: 'Private / Strategic Joint-Venture',
    targetMarket: 'Mercado interno moçambicano e regional (Malawi e SADC)',
    targetMarketEn: 'Domestic Mozambican market and regional (Malawi & SADC)',
    feasibilityStudy: 'Espaço de 40.000 m² adquirido, planta do sítio desenhada e aprovada, em fase de mobilização de capital',
    feasibilityStudyEn: '40,000 m² plot secured, master site plan designed and approved; capital raising phase',
    socialEconomicBenefits: 'Combate à malnutrição com alto valor nutricional, absorção de toda a safra de soja dos camponeses de Angónia, empregos fabris industriais.',
    socialEconomicBenefitsEn: 'Nutritional security, guaranteed off-take for thousands of local soy growers, direct agro-industrial employment.',
    basicInfrastructure: 'Localizada na Estrada Nacional EN 304, ligação fronteiriça imediata com o Malawi.',
    basicInfrastructureEn: 'Located directly on National Highway EN 304, immediate cross-border link with Malawi.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: citrusAgriImg
  },
  {
    id: 'proj-kiko-tomate',
    name: 'Kiko Agroprocessamento de Tomates e Serviços',
    nameEn: 'Kiko Tomato Agro-Processing Unit',
    description: 'Produção, fomento e agroprocessamento de tomate em pasta, concentrado e molhos industriais. Infraestrutura física já montada e viabilidade aprovada, necessitando de financiamento para maquinaria e conclusão.',
    descriptionEn: 'Tomato outgrowing, harvesting, and industrial processing (paste, puree, sauce). Facilities built and feasibility approved; seeking financing for processing machinery.',
    capacity: '3 ton/dia | 90 ton/mês | 1.000 ton/ano',
    capacityEn: '3 tonnes/day | 90 tonnes/month | 1,000 tonnes/year',
    location: 'Distrito de Chiúta, Localidade de Kaunda',
    locationEn: 'Chiúta District, Kaunda locality',
    investment: '27.280.396,00 MZN (~USD 427.000)',
    investmentEn: '27,280,396 MZN (~USD 427,000)',
    sector: 'Agricultura',
    sectorEn: 'Agriculture & Agro-Processing',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Processamento de Tomate',
    investmentTypeEn: 'Tomato Processing',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Kiko Agroprocessamento de Tomates e Serviços, Sociedade Unipessoal',
    proponentType: 'Privado',
    proponentLocation: 'Localidade de Kaunda, Distrito de Chiúta',
    proponentContact: 'Kiko Abrantes: (+258) 87 508 5607',
    financingMode: 'Privado (Crédito / Investimento Privado)',
    financingModeEn: 'Private (Credit / Private Investment)',
    targetMarket: 'Mercado interno moçambicano',
    targetMarketEn: 'Mozambican domestic market',
    feasibilityStudy: 'Estudo de viabilidade concluído e infraestrutura montada',
    feasibilityStudyEn: 'Feasibility study completed and physical structure built',
    socialEconomicBenefits: 'Eliminação de perdas pós-colheita num produto altamente perecível, segurança alimentar e renda garantida para dezenas de famílias rurais.',
    socialEconomicBenefitsEn: 'Drastic reduction of post-harvest tomato rot, food security, and guaranteed income for rural households.',
    basicInfrastructure: 'Infraestrutura civil montada, acesso rodoviário distrital.',
    basicInfrastructureEn: 'Civil structure erected, district road access.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cottonAgriImg
  },
  {
    id: 'proj-tsangano-agrifarms',
    name: 'Tsangano Agrifarms (Processamento de Frangos de Corte)',
    nameEn: 'Tsangano Agrifarms (Broiler Production & Processing)',
    description: 'Produção avícola integrada e processamento/abate de frangos de corte para fornecimento de carne de alta qualidade, inteira e embalada em pedaços. Viabilidade concluída, aguardando financiamento.',
    descriptionEn: 'Integrated broiler poultry rearing and slaughter processing supplying high-quality dressed, portioned meat to the market. Feasibility study completed, awaiting financing.',
    capacity: '140.000 frangos / ano',
    capacityEn: '140,000 broilers / year',
    location: 'Distrito de Tsangano, Localidade de Chinvano',
    locationEn: 'Tsangano District, Chinvano locality',
    investment: '24.999.989,70 MZN (~USD 390.000)',
    investmentEn: '24,999,989.70 MZN (~USD 390,000)',
    sector: 'Pecuária',
    sectorEn: 'Livestock & Poultry',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Produção Avícola & Abate',
    investmentTypeEn: 'Poultry & Processing',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Tsangano Agrifarms',
    proponentType: 'Privado',
    proponentLocation: 'Distrito de Tsangano',
    proponentContact: 'Melode: (+258) 87 230 4737',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado interno nacional (substituição de importações)',
    targetMarketEn: 'Mozambican domestic market (import replacement)',
    feasibilityStudy: 'Estudo de viabilidade técnica concluído com sucesso',
    feasibilityStudyEn: 'Techno-economic feasibility study completed successfully',
    socialEconomicBenefits: 'Postos de trabalho rurais permanentes, soberania nutricional e proteica, desenvolvimento económico comunitário em Tsangano.',
    socialEconomicBenefitsEn: 'Permanent rural jobs, protein food security, community economic growth in Tsangano.',
    basicInfrastructure: 'Acessos rodoviários a Chinvano, disponibilidade de água e energia.',
    basicInfrastructureEn: 'Road access to Chinvano, local water and power availability.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: caprinosImg
  },
  {
    id: 'proj-so-plantas',
    name: 'Só Plantas (Processamento de Frutas e Hortícolas)',
    nameEn: 'Só Plantas (Fruit & Vegetable Agro-Processing)',
    description: 'Projeto de fomento, colheita e processamento de frutas e hortícolas de alto rendimento no planalto de Angónia para abastecimento regular de grandes superfícies comerciais e corte de importações.',
    descriptionEn: 'Fruit and vegetable outgrowing, grading, and packaging project in Angónia to supply formal supermarket chains and substitute cross-border food imports.',
    capacity: 'Agroprocessamento e cadeia de frio para frutas e hortícolas',
    capacityEn: 'Fruit & vegetable agro-processing and cold storage hub',
    location: 'Distrito de Angónia, Vila de Ulónguè',
    locationEn: 'Angónia District, Ulónguè Town',
    investment: '48.910.250,00 MZN (~USD 765.000)',
    investmentEn: '48,910,250 MZN (~USD 765,000)',
    sector: 'Agricultura',
    sectorEn: 'Agriculture',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Agroprocessamento Hortícola',
    investmentTypeEn: 'Horticultural Processing',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Só Plantas (Privado)',
    proponentType: 'Privado',
    proponentLocation: 'Angónia, na Vila de Ulónguè',
    proponentContact: 'Américo Hilário Cantelo: (+258) 84 225 1246 / 86 130 9566',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado interno (grandes superfícies e retalho)',
    targetMarketEn: 'Domestic market (supermarkets and retail chains)',
    socialEconomicBenefits: 'Capitalização do conteúdo local, aumento da rentabilidade de centenas de produtores familiares de Angónia e segurança alimentar.',
    socialEconomicBenefitsEn: 'Local content growth, increased income for hundreds of smallholders in Angónia, food security.',
    basicInfrastructure: 'Proximidade aos campos de cultivo de Angónia e aos eixos rodoviários de escoamento.',
    basicInfrastructureEn: 'Proximity to fertile Angónia fields and distribution highway corridors.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: citrusAgriImg
  },
  {
    id: 'proj-batata-chips',
    name: 'Produção e Processamento da Batata em Chips',
    nameEn: 'Potato Chips Industrial Processing Unit',
    description: 'Transformação agroindustrial da batata-reno em chips industriais (snacks embalados) em Ulónguè e Tsangano, agregando valor local, diminuindo desperdícios sazonais e substituindo importações.',
    descriptionEn: 'Industrial processing of table potatoes into packaged chips/crisps in Ulónguè and Tsangano, slashing post-harvest losses and replacing imported packaged snacks.',
    capacity: 'Linha industrial contínua de processamento de batata e snacks',
    capacityEn: 'Continuous industrial potato processing and bagging line',
    location: 'Distrito de Angónia e Tsangano, Vila de Ulónguè',
    locationEn: 'Angónia & Tsangano Districts, Ulónguè Town',
    investment: '48.910.250,00 MZN (~USD 765.000)',
    investmentEn: '48,910,250 MZN (~USD 765,000)',
    sector: 'Agricultura',
    sectorEn: 'Agriculture & Snacks',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Processamento de Batata',
    investmentTypeEn: 'Potato Agro-Processing',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Empreendimento Agroindustrial de Angónia & Tsangano',
    proponentType: 'Privado',
    proponentLocation: 'Distrito de Tsangano e Angónia',
    proponentContact: 'APIEX / Direção Provincial de Agricultura',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado interno moçambicano',
    targetMarketEn: 'Mozambican domestic market',
    socialEconomicBenefits: 'Absorção massiva da safra agrícola camponesa, postos de trabalho diretos na fábrica e fixação da cadeia de valor no planalto.',
    socialEconomicBenefitsEn: 'Massive absorption of peasant potato harvest, factory jobs, value retention in the highlands.',
    basicInfrastructure: 'Conexão rodoviária à EN 304 e eletricidade de rede.',
    basicInfrastructureEn: 'Road connection to Highway EN 304 and grid power.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: citrusAgriImg
  },
  {
    id: 'proj-chouricos-kukoma',
    name: 'Chouriços Kukoma (Charcutaria & Enchidos Tradicionais)',
    nameEn: 'Kukoma Artisanal Sausages & Charcuterie',
    description: 'Expansão de fábrica de charcutaria e enchidos tradicionais de Tete. Aproveita a pecuária caprina e suína de criadores locais para abastecer grandes superfícies e canal hoteleiro.',
    descriptionEn: 'Expansion of traditional Tete cured sausage and charcuterie plant. Taps local goat and pork livestock to supply major supermarket chains and hospitality channels.',
    capacity: '8.400 kg / ano',
    capacityEn: '8,400 kg / year',
    location: 'Cidade de Tete, Província de Tete',
    locationEn: 'Tete City, Tete Province',
    investment: '6.586.534,00 MZN (~USD 103.000)',
    investmentEn: '6,586,534 MZN (~USD 103,000)',
    sector: 'Pecuária',
    sectorEn: 'Livestock & Meat',
    locationType: 'Cidade',
    locationTypeEn: 'City',
    investmentType: 'Charcutaria & Carnes',
    investmentTypeEn: 'Charcuterie & Meat',
    projectType: 'Expansão',
    projectTypeEn: 'Expansion',
    proponent: 'Chouriço Kukoma (Privado)',
    proponentType: 'Privado',
    proponentLocation: 'Cidade de Tete',
    proponentContact: 'Irassema: (+258) 87 121 3395',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado interno (supermercados e hotelaria)',
    targetMarketEn: 'Domestic market (supermarkets and hospitality)',
    socialEconomicBenefits: 'Valorização dos criadores de gado da província, promoção da gastronomia típica de Tete e substituição de enchidos importados.',
    socialEconomicBenefitsEn: 'Value boost for local livestock farmers, promotion of authentic Tete gastronomy, import replacement.',
    basicInfrastructure: 'Infraestrutura urbana completa na Cidade de Tete (eletricidade estável, água potável e acessos).',
    basicInfrastructureEn: 'Complete urban infrastructure in Tete City (stable power, potable water, paved streets).',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: caprinosImg
  },
  {
    id: 'proj-metil-mel',
    name: 'Metil, Lda (Fomento e Processamento de Mel Orgânico)',
    nameEn: 'Metil, Lda (Organic Honey Processing)',
    description: 'Fomento apícola sustentável com comunidades rurais e unidade de extração, filtragem e embalamento de mel orgânico puro do miombo em Moatize. Conta com associação parceira ativa.',
    descriptionEn: 'Community outgrower beekeeping, modern extraction, filtration, and bottling of certified organic miombo honey in Moatize. Supported by active local beekeepers association.',
    capacity: '80.000 kg de mel / ano',
    capacityEn: '80,000 kg of honey / year',
    location: 'Distrito de Moatize (Kambulatsitsi, Povoado de Mameme)',
    locationEn: 'Moatize District (Kambulatsitsi, Mameme village)',
    investment: '14.615.051,00 MZN (~USD 229.000)',
    investmentEn: '14,615,051 MZN (~USD 229,000)',
    sector: 'Agricultura',
    sectorEn: 'Agriculture & Honey',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Apicultura & Mel Orgânico',
    investmentTypeEn: 'Beekeeping & Organic Honey',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Metil, Lda',
    proponentType: 'Privado',
    proponentLocation: 'Povoado de Mameme, Kambulatsitsi, Moatize',
    proponentContact: 'Titos: (+258) 87 002 4144',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado interno moçambicano',
    targetMarketEn: 'Mozambican domestic market',
    socialEconomicBenefits: 'Renda direta para centenas de famílias de apicultores rurais, conservação da floresta de miombo e proteção contra queimadas descontroladas.',
    socialEconomicBenefitsEn: 'Direct sustainable income for rural beekeeping families, miombo forest conservation, wildfire prevention.',
    basicInfrastructure: 'Armazém de recolha comunitária, ligação rodoviária ao corredor de Moatize.',
    basicInfrastructureEn: 'Community collection depot, road connectivity to Moatize corridor.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cottonAgriImg
  },

  // ----------------------------------------------------
  // 5. INDÚSTRIA & ECONOMIA CIRCULAR
  // ----------------------------------------------------
  {
    id: 'proj-proimagem',
    name: 'Proimagem (Embalagens Industriais & Sacos Herméticos)',
    nameEn: 'Proimagem (Industrial Packaging & Hermetic Bags)',
    description: 'Unidade de produção de embalagens de papel, plástico e sacos herméticos em Matundo. Agrega valor pós-colheita a grãos e produtos locais, aumentando a competitividade e as exportações.',
    descriptionEn: 'Paper, plastic, and hermetic grain storage bag manufacturing plant in Matundo. Adds crucial post-harvest value to local agro-industrial commodities and exports.',
    capacity: 'Pequena dimensão | 25 postos de trabalho na 1ª fase',
    capacityEn: 'Small scale | 25 direct jobs in Phase 1',
    location: 'Cidade de Tete (Bairro Matundo)',
    locationEn: 'Tete City (Matundo Neighborhood)',
    investment: '24.579.801,00 MZN (~USD 385.000)',
    investmentEn: '24,579,801 MZN (~USD 385,000)',
    sector: 'Indústria',
    sectorEn: 'Industry & Packaging',
    locationType: 'Cidade',
    locationTypeEn: 'City',
    investmentType: 'Embalagens & Manufatura',
    investmentTypeEn: 'Packaging & Manufacturing',
    projectType: 'Novo',
    projectTypeEn: 'New Greenfield',
    proponent: 'Proimagem (Privado)',
    proponentType: 'Privado',
    proponentLocation: 'Cidade de Tete, Bairro Matundo',
    proponentContact: 'Donaldo: (+258) 84 527 4700',
    financingMode: 'Privado / Financiamento Bancário',
    financingModeEn: 'Private / Commercial Credit',
    targetMarket: 'Interno e Regional (SADC)',
    targetMarketEn: 'Domestic and Regional (SADC)',
    feasibilityStudy: 'Estudo de viabilidade técnica e financeira concluído, aguardando financiamento',
    feasibilityStudyEn: 'Feasibility study completed, awaiting financing package',
    socialEconomicBenefits: 'Geração de postos de trabalho imediatos, conservação de grãos e cereais camponeses com sacos herméticos e estímulo à exportação.',
    socialEconomicBenefitsEn: 'Immediate job creation, grain preservation using hermetic bags, and export competitiveness.',
    basicInfrastructure: 'Localização privilegiada em Matundo com acesso à EN7 e rede elétrica urbana.',
    basicInfrastructureEn: 'Prime Matundo location with immediate EN7 highway and urban grid access.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cementImg
  },
  {
    id: 'proj-moz-plastico',
    name: 'Moz Plástico, Lda (Reciclagem e Produção Sustentável)',
    nameEn: 'Moz Plástico, Lda (Plastic Recycling & Manufacturing)',
    description: 'Expansão de unidade fabril com tecnologia moderna de reciclagem mecânica e conformação de plástico. Contribui para a proteção ambiental, economia circular e gestão de resíduos sólidos.',
    descriptionEn: 'Plant expansion with modern technology for collecting, washing, pelletizing, and manufacturing recycled plastic products. Driving circular economy and urban sustainability.',
    capacity: 'Linha industrial de lavagem, moagem e reciclagem de plástico',
    capacityEn: 'Industrial plastic washing, shredding, and recycling line',
    location: 'Cidade de Tete, Província de Tete',
    locationEn: 'Tete City, Tete Province',
    investment: '13.627.085,50 MZN (~USD 213.000)',
    investmentEn: '13,627,085.50 MZN (~USD 213,000)',
    sector: 'Indústria',
    sectorEn: 'Industry & Recycling',
    locationType: 'Cidade',
    locationTypeEn: 'City',
    investmentType: 'Reciclagem & Economia Circular',
    investmentTypeEn: 'Recycling & Circular Economy',
    projectType: 'Expansão',
    projectTypeEn: 'Expansion',
    proponent: 'Moz Plástico (Privado)',
    proponentType: 'Privado',
    proponentLocation: 'Cidade de Tete',
    proponentContact: 'Steven Elias: (+258) 87 888 2828 / 84 888 2826',
    financingMode: 'Privado',
    financingModeEn: 'Private',
    targetMarket: 'Mercado interno moçambicano',
    targetMarketEn: 'Mozambican domestic market',
    socialEconomicBenefits: 'Sustentabilidade ecológica urbana, redução do plástico em aterros, capacitação e formação técnica para operadores.',
    socialEconomicBenefitsEn: 'Urban ecological sustainability, landfill plastic reduction, technical workforce training.',
    basicInfrastructure: 'Galpão fabril na Cidade de Tete, água, energia trifásica e logística.',
    basicInfrastructureEn: 'Industrial warehouse in Tete City, 3-phase power, water, and distribution.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: cementImg
  },

  // ----------------------------------------------------
  // 6. INFRAESTRUTURAS RODOVIÁRIAS E HÍDRICAS
  // ----------------------------------------------------
  {
    id: 'proj-represas-tete',
    name: 'Construção e Reabilitação de Represas Hidroagrícolas',
    nameEn: 'Construction & Rehabilitation of Agricultural Earth Dams',
    description: 'Construção de novas represas em Angónia, Tsangano, Macanga, Changara, Marara e Dôa; e Reabilitação em Changara, Marara, Moatize, Mágoè, Cahora-Bassa, Chiúta e Angónia para irrigação de pequena escala e combate à estiagem.',
    descriptionEn: 'Construction of dams in Angónia, Tsangano, Macanga, Changara, Marara, and Dôa; and Rehabilitation in Changara, Marara, Moatize, Mágoè, Cahora-Bassa, Chiúta, and Angónia to mitigate drought and ensure irrigation.',
    capacity: 'Rede multizona provincial de bacias de retenção hidroagrícola',
    capacityEn: 'Provincial multi-zone agricultural water retention network',
    location: 'Província de Tete (Múltiplos Distritos)',
    locationEn: 'Tete Province (Multiple Districts)',
    investment: '46.000.000,00 MZN (~USD 720.000)',
    investmentEn: '46,000,000 MZN (~USD 720,000)',
    sector: 'Infraestrutura',
    sectorEn: 'Infrastructure & Water',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Infraestrutura Hídrica & Irrigação',
    investmentTypeEn: 'Water & Irrigation Infrastructure',
    projectType: 'Novo & Reabilitação',
    projectTypeEn: 'New & Rehabilitation',
    proponent: 'Direção Provincial da Agricultura e Pesca (DPAP Tete)',
    proponentType: 'Público',
    proponentLocation: 'Cidade de Tete, Província de Tete',
    proponentContact: 'DPAP Tete / APIEX',
    financingMode: 'Público / Fundos de Cooperação Agrícola',
    financingModeEn: 'Public / Agricultural Cooperation Funds',
    targetMarket: 'Mercado interno (segurança alimentar e resiliência das famílias camponesas)',
    targetMarketEn: 'Domestic market (food security and peasant resilience)',
    socialEconomicBenefits: 'Mitigação imediata dos efeitos nefastos da seca, massificação de hortícolas na 2ª época, abeberamento do gado e fixação populacional.',
    socialEconomicBenefitsEn: 'Immediate drought mitigation, off-season vegetable farming, cattle watering, and rural retention.',
    basicInfrastructure: 'Aproveitamento de linhas de água naturais e bacias hidrográficas da província.',
    basicInfrastructureEn: 'Utilization of natural stream channels and provincial water basins.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: albufeiraImg
  },
  {
    id: 'proj-estrada-maravia-zumbo',
    name: 'Estrada Marávia – Zumbo (Troço Bene – Zumbo, 350 km)',
    nameEn: 'Marávia – Zumbo Road Corridor (Bene – Zumbo, 350 km)',
    description: 'Reabilitação e melhoramento da rodovia estratégica de 350 km ligando o Posto Administrativo de Bene (Marávia) ao Distrito de Zumbo. Tira a fronteira noroeste do isolamento crónico e serve como espinha dorsal comercial.',
    descriptionEn: '350 km highway rehabilitation linking Bene (Marávia) to historic Zumbo. Government strategic backbone to overcome chronic isolation and accelerate tri-border trade with Zambia and Zimbabwe.',
    capacity: '350 km de estrada asfaltada e pontes',
    capacityEn: '350 km paved arterial highway and civil bridges',
    location: 'Província de Tete (Distritos de Marávia e Zumbo)',
    locationEn: 'Tete Province (Marávia & Zumbo Districts)',
    investment: 'Investimento Público Estruturante / PPP',
    investmentEn: 'Strategic Public Investment / PPP',
    sector: 'Infraestrutura',
    sectorEn: 'Infrastructure & Transport',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Infraestrutura Rodoviária',
    investmentTypeEn: 'Road Highway Infrastructure',
    projectType: 'Novo / Reabilitação Estruturante',
    projectTypeEn: 'New / Major Rehabilitation',
    proponent: 'Ministério das Obras Públicas, Habitação e Recursos Hídricos (MOPHRH)',
    proponentType: 'Público',
    proponentLocation: 'Província de Tete',
    proponentContact: 'MOPHRH / ANE / APIEX',
    financingMode: 'Público / Crédito Concessionário / PPP',
    financingModeEn: 'Public / Concessional Loan / PPP',
    targetMarket: 'Conectividade interna e corredores transfronteiriços com Zâmbia e Zimbabwe',
    targetMarketEn: 'Internal connectivity and tri-border corridors with Zambia and Zimbabwe',
    socialEconomicBenefits: 'Fim do isolamento crónico dos distritos de Marávia e Zumbo, criação de empregos na construção, escoamento de produtos agrícolas, minerais e pescado.',
    socialEconomicBenefitsEn: 'Overcoming historic isolation of Marávia and Zumbo, construction jobs, freight logistics for fish, crops, and minerals.',
    basicInfrastructure: 'Abertura e nivelamento de plataforma, obras de arte, drenagem transversal e asfaltagem.',
    basicInfrastructureEn: 'Subgrade earthworks, bridges, drainage culverts, and asphalt paving.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: ponteSamoraImg
  },
  {
    id: 'proj-estrada-chitima-mucumbura',
    name: 'Estrada do Cruzamento Chitima – Mágoè – Mucumbura',
    nameEn: 'Chitima – Mágoè – Mucumbura Highway (Zimbabwe Border)',
    description: 'Reabilitação e asfaltagem do corredor estratégico interligando Chitima, a sede distrital de Mágoè e o posto fronteiriço de Mucumbura (fronteira com o Zimbabwe). Impulsiona a economia regional e o escoamento mineiro e agropecuário.',
    descriptionEn: 'Strategic paving and upgrade of the Chitima – Mágoè – Mucumbura arterial route, driving cross-border integration with Zimbabwe, mineral logistics, and Mágoè National Park ecotourism.',
    capacity: 'Corredor rodoviário asfaltado transfronteiriço',
    capacityEn: 'Paved cross-border highway corridor',
    location: 'Província de Tete (Distritos de Cahora Bassa e Mágoè)',
    locationEn: 'Tete Province (Cahora Bassa & Mágoè Districts)',
    investment: 'Investimento Público Estruturante / PPP',
    investmentEn: 'Strategic Public Investment / PPP',
    sector: 'Infraestrutura',
    sectorEn: 'Infrastructure & Transport',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Infraestrutura Rodoviária',
    investmentTypeEn: 'Road Highway Infrastructure',
    projectType: 'Novo / Asfaltagem',
    projectTypeEn: 'New / Highway Paving',
    proponent: 'Ministério das Obras Públicas, Habitação e Recursos Hídricos (MOPHRH)',
    proponentType: 'Público',
    proponentLocation: 'Província de Tete',
    proponentContact: 'MOPHRH / ANE / APIEX',
    financingMode: 'Público / Parceria Público-Privada (PPP)',
    financingModeEn: 'Public / Public-Private Partnership (PPP)',
    targetMarket: 'Mercado interno e integração económica Moçambique – Zimbabwe',
    targetMarketEn: 'Domestic market and Mozambique – Zimbabwe regional trade',
    socialEconomicBenefits: 'Integração regional transfronteiriça com o Zimbabwe, valorização do potencial mineiro de Mágoè, estímulo ao turismo e comércio bilateral.',
    socialEconomicBenefitsEn: 'Cross-border integration with Zimbabwe, unlocking mining potential, boosting ecotourism and bilateral commerce.',
    basicInfrastructure: 'Plataforma rodoviária, pontes de travessia, alfândega e infraestrutura fronteiriça em Mucumbura.',
    basicInfrastructureEn: 'Highway bed, river bridges, border customs terminal in Mucumbura.',
    isOfficialForm: true,
    officialSource: 'APIEX / Ministério da Economia',
    image: ponteKassuendeImg
  },

  // ----------------------------------------------------
  // 7. TURISMO & ECOTURISMO DE CLASSE INTERNACIONAL
  // ----------------------------------------------------
  {
    id: 'proj-tourism-1',
    name: 'Masterplan Ecoturístico & Marina da Albufeira de Cahora Bassa',
    nameEn: 'Cahora Bassa Ecotourism Masterplan & Nautical Marina',
    description: 'Desenvolvimento de resort ecológico de alto padrão (5 estrelas), cais para barcos de cruzeiro fluvial, chalés flutuantes sustentáveis e centro de desportos náuticos na albufeira.',
    descriptionEn: 'Development of an upscale 5-star eco-resort, river cruise marina, sustainable floating chalets, and water sports center on Lake Cahora Bassa.',
    capacity: 'Resort de 120 camas, Marina náutica e 20 chalés flutuantes',
    capacityEn: '120-bed eco-resort, nautical marina, and 20 floating chalets',
    location: 'Albufeira de Cahora Bassa — Chicoa e Songo',
    locationEn: 'Lake Cahora Bassa — Chicoa and Songo bays',
    investment: 'USD 18,5 milhões',
    investmentEn: 'USD 18.5 Million',
    sector: 'Turismo',
    sectorEn: 'Tourism',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Ecoturismo & Hotelaria',
    investmentTypeEn: 'Ecotourism & Hospitality',
    image: albufeiraImg
  },
  {
    id: 'proj-tourism-2',
    name: 'Luxury Tented Safari Camp no Parque Nacional de Mágoè',
    nameEn: 'Luxury Tented Safari Camp in Mágoè National Park',
    description: 'Concessão ecoturística para implantação de campamento de safaris de luxo com baixo impacto ambiental, safaris fotográficos guiados, observação da megafauna e passeios de barco no Zambeze.',
    descriptionEn: 'Ecotourism concession for establishing a low-impact luxury tented safari camp, photographic game drives, megafauna tracking, and Zambezi river safaris.',
    capacity: 'Concessão de 25.000 hectares com 28 tendas de luxo e spa selvagem',
    capacityEn: '25,000-hectare concession with 28 luxury safari suites and wilderness spa',
    location: 'Parque Nacional de Mágoè (anterior programa comunitário Tchuma-Tchato)',
    locationEn: 'Mágoè National Park (formerly Tchuma-Tchato conservation area)',
    investment: 'USD 14,0 milhões',
    investmentEn: 'USD 14.0 Million',
    sector: 'Turismo',
    sectorEn: 'Tourism',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Safaris & Conservação',
    investmentTypeEn: 'Safaris & Conservation',
    image: magoeParkImg
  },
  {
    id: 'proj-tourism-3',
    name: 'Estância Hidrotermal & Centro de Bem-Estar de Zumbo e Mágoè',
    nameEn: 'Geothermal Spa & Wellness Resort of Zumbo & Mágoè',
    description: 'Aproveitamento comercial e medicinal das nascentes de águas termais minerais para centro de hidroterapia, spa de relaxamento, tratamentos terapêuticos e turismo de saúde integrado na natureza.',
    descriptionEn: 'Commercial and therapeutic harnessing of natural mineral hot springs for hydrotherapy, relaxation spas, wellness treatments, and pristine health tourism.',
    capacity: 'Hotel-spa com 45 suites termais, piscinas hidrotermais e clínica holística',
    capacityEn: 'Spa hotel with 45 thermal suites, hydrothermal mineral pools, and holistic clinic',
    location: 'Distritos de Zumbo e Mágoè (Nascentes Hidrotermais)',
    locationEn: 'Zumbo and Mágoè Districts (Natural Geothermal Springs)',
    investment: 'USD 9,2 milhões',
    investmentEn: 'USD 9.2 Million',
    sector: 'Turismo',
    sectorEn: 'Tourism',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Turismo Termal & Saúde',
    investmentTypeEn: 'Thermal & Wellness Tourism',
    image: lakeImg
  },
  {
    id: 'proj-tourism-4',
    name: 'Centro Internacional de Pesca Desportiva do Peixe-Tigre',
    nameEn: 'International Tigerfish Sport Fishing Center',
    description: 'Infraestrutura de ponta especializada em pesca desportiva de captura e soltura (catch-and-release) do lendário Peixe-Tigre (Tigerfish) no Zambeze, sediando torneios internacionais anuais.',
    descriptionEn: 'Premier sport-fishing hub dedicated to catch-and-release angling for the legendary Zambezi Tigerfish, hosting annual global angling tournaments.',
    capacity: 'Flotilha de 16 barcos de pesca desportiva, cais técnico e lodge de pescadores',
    capacityEn: 'Fleet of 16 specialized angling boats, service docks, and angler lodge',
    location: 'Rio Zambeze & Albufeira de Cahora Bassa — Chicoa / Tete',
    locationEn: 'Zambezi River & Lake Cahora Bassa — Chicoa / Tete',
    investment: 'USD 6,5 milhões',
    investmentEn: 'USD 6.5 Million',
    sector: 'Turismo',
    sectorEn: 'Tourism',
    locationType: 'Província',
    locationTypeEn: 'Province',
    investmentType: 'Pesca Desportiva & Lazer',
    investmentTypeEn: 'Sport Fishing & Recreation',
    image: chicoaImg
  },
  {
    id: 'proj-tourism-5',
    name: 'Pousada de Charme e Centro Cultural da Missão de Boroma',
    nameEn: 'Historic Boutique Inn & Cultural Center of Boroma Mission',
    description: 'Reabilitação monumental e valorização turística do complexo histórico jesuíta de 1885 em Boroma, integrando pousada de charme, museu da história do Zambeze e oficinas de cerâmica.',
    descriptionEn: 'Monumental restoration and tourism activation of the 1885 Jesuit historic complex in Boroma, featuring a boutique heritage inn, Zambezi history museum, and craft studios.',
    capacity: 'Hotel de charme de 35 quartos, museu e espaço de eventos culturais',
    capacityEn: '35-room heritage boutique inn, museum, and cultural events pavilion',
    location: 'Distrito de Marara / Boroma (a 15 km da Cidade de Tete)',
    locationEn: 'Marara District / Boroma (15 km from Tete City)',
    investment: 'USD 8,0 milhões',
    investmentEn: 'USD 8.0 Million',
    sector: 'Turismo',
    sectorEn: 'Tourism',
    locationType: 'Distrito',
    locationTypeEn: 'District',
    investmentType: 'Património & Hotelaria',
    investmentTypeEn: 'Heritage & Hospitality',
    image: missaoBoromaImg
  },
  {
    id: 'proj-tourism-6',
    name: 'Expansão Hoteleira & Centro de Convenções MICE Horizonte Lodge Tete',
    nameEn: 'Horizonte Lodge Tete Hotel Expansion & MICE Conference Center',
    description: 'Ampliação e modernização das infraestruturas de acolhimento de congressos corporativos internacionais (MICE), novos chalés executivos com vista para o Zambeze e salas de conferência de última geração.',
    descriptionEn: 'Expansion and upgrade of corporate international convention (MICE) facilities, executive chalets overlooking the Zambezi, and state-of-the-art conference auditoriums.',
    capacity: 'Auditório para 1.200 delegados, 75 suites executivas e centro de banquetes',
    capacityEn: '1,200-delegate auditorium, 75 executive suites, and banquet complex',
    location: 'Horizonte Lodge, Cidade de Tete',
    locationEn: 'Horizonte Lodge, Tete City',
    investment: 'USD 10,2 milhões',
    investmentEn: 'USD 10.2 Million',
    sector: 'Turismo',
    sectorEn: 'Tourism',
    locationType: 'Cidade',
    locationTypeEn: 'City',
    investmentType: 'Turismo MICE & Hotelaria',
    investmentTypeEn: 'MICE Tourism & Hospitality',
    image: albufeiraImg
  }
];
