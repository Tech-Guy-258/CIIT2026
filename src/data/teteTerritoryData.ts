/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DistrictDetail, MunicipalityDetail, BorderDetail, TimelineEvent, MapPoint } from '../types';
import { DISTRICT_IMAGES_MAP } from './districtImages';

// Image assets references
import hcbImg from '../assets/images/HCB.jpg';
import albufeiraImg from '../assets/images/Albufeira de cahora bassa.jpg';
import donaAnaImg from '../assets/images/Ponte dona ana.jpg';
import kassuendeImg from '../assets/images/Ponte_Kassuende.jpg';
import samoraBridgeImg from '../assets/images/ponte samora machel em tete.jpg';
import boromaImg from '../assets/images/missao_boroma_tete_1784879058976.jpg';
import magoeImg from '../assets/images/magoe_national_park_antelopes_1784878851948.jpg';
import coalImg from '../assets/images/moatize_coal_minerals_1784807272754.jpg';
import citrusImg from '../assets/images/citrus_agriculture_tete_1784807298725.jpg';
import goatsImg from '../assets/images/tete_caprinos_goats_1784807286233.jpg';
import cottonImg from '../assets/images/cotton_harvest_commodities_1784807324034.jpg';
import chicoaImg from '../assets/images/Chicoa (2).jpg';
import kapentaImg from '../assets/images/KAPENTA.jpg';
import brmImg from '../assets/images/BRM.jpg';
import tchumaImg from '../assets/images/Area_de_Conservacao_Tchuma_Tchato.jpg';

/* ==========================================================================
   15 DISTRITOS DA PROVÍNCIA DE TETE
   Fontes: Governo da Província de Tete, INE Moçambique, Ministério da Administração Estatal (MAE)
   ========================================================================== */

export const DISTRICTS_DETAILED_DATA: DistrictDetail[] = [
  {
    id: 'angonia',
    slug: 'angonia',
    name: 'Angónia',
    capital: 'Ulónguè',
    tagline: 'O celeiro agrícola e hortícola de Moçambique no planalto fértil.',
    taglineEn: 'Mozambique’s fertile highland agricultural and horticultural granary.',
    image: DISTRICT_IMAGES_MAP.angonia.image,
    heroImage: DISTRICT_IMAGES_MAP.angonia.heroImage,
    location: 'Nordeste da Província de Tete (Planalto de Angónia)',
    locationEn: 'Northeast of Tete Province (Angónia Plateau)',
    area: '3.437 km²',
    population: '430.000 hab. (INE Proj.)',
    climate: 'Tropical de altitude / Temperado húmido',
    climateEn: 'Highland tropical / Moist temperate',
    overview: 'O Distrito de Angónia situa-se no nordeste da província de Tete, na fronteira direta com a República do Malawi. Caracteriza-se por um relevo planáltico elevado com altitudes entre 1.000 e 1.600 metros, solos de elevada fertilidade natural e um regime pluviométrico abundante e regular, constituindo a zona com maior produtividade agropecuária de toda a região centro-norte.',
    overviewEn: 'Angónia District lies in northeast Tete bordering Malawi. Characterized by high plateau relief (1,000–1,600m altitude), fertile soils, and abundant rainfall, it forms the most productive agricultural granary in central Mozambique.',
    history: 'Historicamente habitado por comunidades da etnia Angoni (descendentes das migrações Nguni lideradas por Zwangendaba no século XIX) e Chewa, o território integrou rotas agrícolas e comerciais de ligação com o Lago Niassa e o vale do Zambeze. Durante a administração colonial, o estatuto da circunscrição foi elevado pela sua relevância na produção de cereais e batata. Após a independência nacional em 1975 e os acordos de paz em 1992, consolidou-se como polo agro-industrial e transfronteiriço.',
    historyEn: 'Historically settled by Angoni (Nguni descent) and Chewa peoples, Angónia has been a vital breadbasket and trade crossroads. Administratively developed for intensive cropping, it expanded post-1975 into a major regional agro-industrial and cross-border commercial hub.',
    geography: {
      borders: 'Tsangano, Macanga e República do Malawi (Distritos de Dedza e Ntcheu)',
      bordersEn: 'Tsangano, Macanga, and Malawi (Dedza & Ntcheu Districts)',
      rivers: 'Rio Chifumbaze, Rio Lifidzi, Rio Livize',
      localities: 'Ulónguè (Sede), Dómuè, Calómuè, Seze, Ndaula',
      coordinates: '14°43′S 34°22′E'
    },
    economy: [
      { name: 'Agricultura', nameEn: 'Agriculture', desc: 'Produção em larga escala de batata-reno, milho, soja, feijão manteiga, hortícolas e café.', isPrimary: true },
      { name: 'Pecuária', nameEn: 'Livestock', desc: 'Criação de gado bovino leiteiro, suínos e aves em clima temperado.', isPrimary: true },
      { name: 'Comércio Transfronteiriço', nameEn: 'Cross-border Trade', desc: 'Posto fronteiriço de Calómuè com tráfego intenso com o Malawi.', isPrimary: true },
      { name: 'Agro-processamento', nameEn: 'Agro-processing', desc: 'Farinhas de milho, embalamento de batata e processamento de sementes.', isPrimary: false }
    ],
    resources: 'Solos profundos de alta fertilidade, microclima temperado para culturas de altitude, bacias hidrográficas perenes para regadio, jazigos de minerais não-metálicos e calcários.',
    resourcesEn: 'Deep fertile highland soils, temperate microclimate, perennial rivers for year-round irrigation, and industrial minerals.',
    investmentProjects: [
      { sector: 'Agricultura & Indústria', project: 'Parque Agro-Industrial e Frigorífico de Ulónguè', location: 'Ulónguè / Calómuè', capacity: '50.000 ton/ano', investment: 'US$ 35M' },
      { sector: 'Energia Renovável', project: 'Micro-hídricas e Biomassa de Angónia', location: 'Rio Lifidzi', capacity: '15 MW', investment: 'US$ 22M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: false,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.angonia.gallery,
    sources: ['Governo da Província de Tete', 'INE - Censo Geral e Projeções Distritais', 'MAE - Perfil do Distrito de Angónia', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'cahora-bassa',
    slug: 'cahora-bassa',
    name: 'Cahora Bassa',
    capital: 'Chitima',
    tagline: 'O coração energético da África Austral e da economia azul no Zambeze.',
    taglineEn: 'Southern Africa’s energy powerhouse and Zambezi blue economy capital.',
    image: DISTRICT_IMAGES_MAP['cahora-bassa'].image,
    heroImage: DISTRICT_IMAGES_MAP['cahora-bassa'].heroImage,
    location: 'Centro-Sul da Província de Tete',
    locationEn: 'Central-South Tete Province',
    area: '10.590 km²',
    population: '165.000 hab.',
    climate: 'Tropical semiárido no vale e ameno nas encostas',
    climateEn: 'Semi-arid in valleys, milder in uplands',
    overview: 'O Distrito de Cahora Bassa abriga a monumental Central Hidroelétrica de Cahora Bassa (HCB), com 2.075 MW de capacidade instalada e um reservatório de 2.700 km². É o centro nevrálgico da geração hidroelétrica moçambicana e alimenta o Southern African Power Pool (SAPP), para além de abrigar uma das maiores pescas continentais da África Austral.',
    overviewEn: 'Cahora Bassa District hosts the Cahora Bassa Hydroelectric Dam (2,075 MW) and its 2,700 km² reservoir. It forms the backbone of Mozambican energy exports and Southern Africa’s premier inland commercial fishery.',
    history: 'A garganta do Zambeze em Songo/Cahora Bassa era conhecida historicamente pelas suas corredeiras intransitáveis ("Kebrabasa"). As obras da barragem iniciaram-se em 1969 e a central entrou em operação em 1975. O marco histórico mais marcante da soberania moçambicana foi a reversão da HCB para o Estado Moçambicano em 27 de Novembro de 2007 sob liderança do Presidente Armando Guebuza.',
    historyEn: 'The Zambezi rapids ("Kebrabasa") were historic navigational barriers. Dam construction began in 1969 and commissioning in 1975. The landmark milestone occurred on November 27, 2007, with the official reversion of HCB control to the Mozambican state.',
    geography: {
      borders: 'Mágoè, Marávia, Chiúta, Changara, Moatize e Província de Manica',
      bordersEn: 'Mágoè, Marávia, Chiúta, Changara, Moatize, and Manica Province',
      rivers: 'Rio Zambeze, Albufeira de Cahora Bassa, Rio Mucanha',
      localities: 'Chitima (Sede), Songo, Chintholo',
      coordinates: '15°44′S 32°46′E'
    },
    economy: [
      { name: 'Energia Hidroelétrica', nameEn: 'Hydroelectric Power', desc: 'HCB (2.075 MW) e projeto da Central Norte de Cahora Bassa (1.245 MW).', isPrimary: true },
      { name: 'Pesca & Aquacultura', nameEn: 'Fisheries & Aquaculture', desc: 'Captura industrial de Kapenta e criação de tilápia em gaiolas flutuantes.', isPrimary: true },
      { name: 'Turismo e Lazer Náutico', nameEn: 'Tourism & Nautical Leisure', desc: 'Pesca desportiva do Peixe-Tigre, safaris aquáticos e turismo técnico.', isPrimary: true },
      { name: 'Mineração', nameEn: 'Mining', desc: 'Jazigos de ferro, fluorite e rochas ornamentais.', isPrimary: false }
    ],
    resources: 'Manancial hídrico do Zambeze (capacidade de armazenamento de 55,8 mil milhões m³), ictiofauna de alto valor comercial, solidez para turismo hidroelétrico e energia solar flutuante.',
    resourcesEn: 'Vast Zambezi water body, premium commercial fish biomass, prime conditions for floating solar and eco-tourism.',
    investmentProjects: [
      { sector: 'Energia', project: 'Central Norte de Cahora Bassa (HCB Norte)', location: 'Songo', capacity: '1.245 MW', investment: 'US$ 1.500M' },
      { sector: 'Pesca / Aquacultura', project: 'Expansão de Aquacultura Industrial de Tilápia', location: 'Albufeira de Cahora Bassa', capacity: '10.000 ton/ano', investment: 'US$ 45M' }
    ],
    indicators: {
      location: true,
      agriculture: false,
      mining: true,
      energy: true,
      fisheries: true,
      livestock: false,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP['cahora-bassa'].gallery,
    sources: ['Governo da Província de Tete', 'HCB Relatórios Anuais', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'changara',
    slug: 'changara',
    name: 'Changara',
    capital: 'Luenha',
    tagline: 'Capital da pecuária tradicional, corredor para o Zimbabwe e bacia do Luenha.',
    taglineEn: 'Livestock heartland, Luenha basin, and strategic highway to Zimbabwe.',
    image: DISTRICT_IMAGES_MAP.changara.image,
    heroImage: DISTRICT_IMAGES_MAP.changara.heroImage,
    location: 'Sul da Província de Tete',
    locationEn: 'Southern Tete Province',
    area: '6.444 km²',
    population: '160.000 hab.',
    climate: 'Tropical semiárido e quente',
    climateEn: 'Hot semi-arid tropical',
    overview: 'O Distrito de Changara situa-se na margem direita do Rio Zambeze, estendendo-se ao longo da fronteira com a República do Zimbabwe. É atravessado pela Estrada Nacional N7 (Corredor Tete-Harare) e pelo Rio Luenha, destacando-se como o maior centro de criação e comercialização pecuária de caprinos e bovinos da província.',
    overviewEn: 'Changara District lies on the southern bank of the Zambezi, bordering Zimbabwe along the vital N7 Highway (Tete-Harare transport corridor). It is Tete’s premier goat and cattle breeding center.',
    history: 'Cruzamento milenar de rotas mercantis entre o planalto zimbabueano e os entrepostos do Zambeze. No período dos Prazos da Coroa e da ocupação portuguesa, Luenha serviu de feitoria e posto de controlo fiscal. Com a fixação do posto fronteiriço de Cuchamano/Nyamapanda, Changara transformou-se no principal portal de comércio rodoviário entre Moçambique e o Zimbabwe.',
    historyEn: 'An ancient trading junction between the Zimbabwean plateau and the Zambezi. Later serving as a tax post in the crown-estate era, modern Changara centers on the busy Cuchamano/Nyamapanda border post.',
    geography: {
      borders: 'Cidade de Tete, Moatize, Cahora Bassa, Marara, Guro (Manica) e Zimbabwe',
      bordersEn: 'Tete City, Moatize, Cahora Bassa, Marara, Guro (Manica), and Zimbabwe',
      rivers: 'Rio Luenha, Rio Zambeze, Rio Mazoe',
      localities: 'Luenha (Sede), Cuchamano, Chioco, Mufa',
      coordinates: '16°15′S 33°10′E'
    },
    economy: [
      { name: 'Pecuária (Cabrito de Tete)', nameEn: 'Livestock (Tete Goat IG)', desc: 'Maior efetivo de caprinos da província com certificação de Indicação Geográfica.', isPrimary: true },
      { name: 'Comércio e Logística', nameEn: 'Commerce & Logistics', desc: 'Trânsito internacional rodoviário de mercadorias no Corredor N7.', isPrimary: true },
      { name: 'Agricultura de Sequeiro e Regadio', nameEn: 'Agriculture', desc: 'Milho, mapira, gergelim e hortícolas nas margens dos rios Luenha e Mazoe.', isPrimary: false },
      { name: 'Recursos Minerais', nameEn: 'Mineral Resources', desc: 'Rochas ornamentais, pedreiras de inertes e areias pesadas.', isPrimary: false }
    ],
    resources: 'Extensas pastagens naturais de savana perfeitas para pecuária extensiva, depósitos de granito e mármore, bacia aluvial para captação de água no Luenha.',
    resourcesEn: 'Vast natural savanna grazing rangelands, granite and marble stone reserves, alluvial aquifers along the Luenha River.',
    investmentProjects: [
      { sector: 'Pecuária / Indústria', project: 'Matadouro Industrial e Centro de Processamento de Carne Caprina', location: 'Luenha / Changara', capacity: '1.000 cabeças/dia', investment: 'US$ 18M' },
      { sector: 'Logística', project: 'Terminal Intermodal e Parque de Carga de Cuchamano', location: 'Cuchamano', capacity: '300 camiões/dia', investment: 'US$ 12M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: true,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: false
    },
    gallery: DISTRICT_IMAGES_MAP.changara.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Perfil do Distrito de Changara', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'chifunde',
    slug: 'chifunde',
    name: 'Chifunde',
    capital: 'Chifunde',
    tagline: 'Fronteira norte com Zâmbia e Malawi, reserva florestal e potencial agrícola.',
    taglineEn: 'Northern frontier with Zambia and Malawi, forest reserves and agro-potential.',
    image: DISTRICT_IMAGES_MAP.chifunde.image,
    heroImage: DISTRICT_IMAGES_MAP.chifunde.heroImage,
    location: 'Norte da Província de Tete',
    locationEn: 'Northern Tete Province',
    area: '9.323 km²',
    population: '155.000 hab.',
    climate: 'Tropical húmido a semiárido nas baixas',
    climateEn: 'Tropical humid to semi-arid in lowlands',
    overview: 'Localizado no extremo norte da província, Chifunde partilha fronteiras internacionais com a República da Zâmbia e a República do Malawi. Destaca-se por vastas áreas de solos aráveis para culturas de rendimento (tabaco, algodão, cereais) e importantes recursos florestais de espécies nobres de madeira.',
    overviewEn: 'Situated in northern Tete bordering both Zambia and Malawi, Chifunde boasts vast tracts of arable land for cash crops (tobacco, cotton, cereals) and rich indigenous hardwood forest reserves.',
    history: 'A região de Chifunde teve papel determinante durante a Luta de Libertação Nacional moçambicana, constituindo um dos corredores cruciais da Frente de Tete aberta pela FRELIMO a partir das bases de retaguarda na Zâmbia. A sua estrutura administrativa moderna consolidou-se no pós-independência como distrito fronteiriço.',
    historyEn: 'Chifunde was a historic corridor during Mozambique’s National Liberation Struggle, serving as a strategic gateway for the Tete Front from Zambian bases. It was administratively strengthened post-1975.',
    geography: {
      borders: 'Macanga, Marávia, Chiúta, Zâmbia e Malawi',
      bordersEn: 'Macanga, Marávia, Chiúta, Zambia, and Malawi',
      rivers: 'Rio Luia, Rio Capoche, Rio Muvuzi',
      localities: 'Chifunde (Sede), Mualadzi, Nsadzo',
      coordinates: '14°32′S 32°52′E'
    },
    economy: [
      { name: 'Agricultura de Rendimento', nameEn: 'Cash Crop Agriculture', desc: 'Produção intensiva de tabaco, soja, algodão, gergelim e milho.', isPrimary: true },
      { name: 'Recursos Florestais', nameEn: 'Forestry Resources', desc: 'Maneio sustentável de espécies nativas (Chanfuta, Umbila, Pau-ferro).', isPrimary: true },
      { name: 'Pecuária', nameEn: 'Livestock', desc: 'Criação de gado bovino e caprino em regime extensivo.', isPrimary: false }
    ],
    resources: 'Recursos florestais e de madeira nobre, solos profundos favoráveis ao agronegócio e bacias hídricas para regadio.',
    resourcesEn: 'Indigenous hardwood timber, deep fertile soils for commercial agribusiness, and tributary river basins.',
    investmentProjects: [
      { sector: 'Agricultura', project: 'Complexo Agro-industrial de Fibras e Oleaginosas de Chifunde', location: 'Mualadzi', capacity: '20.000 ton/ano', investment: 'US$ 15M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: false,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.chifunde.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Perfil de Chifunde', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'chiuta',
    slug: 'chiuta',
    name: 'Chiúta',
    capital: 'Manje',
    tagline: 'Minerais metálicos, calcários, ferro e bacias agrícolas férteis.',
    taglineEn: 'Metallic minerals, limestone deposits, iron ore, and fertile farming plains.',
    image: DISTRICT_IMAGES_MAP.chiuta.image,
    heroImage: DISTRICT_IMAGES_MAP.chiuta.heroImage,
    location: 'Centro-Norte de Tete',
    locationEn: 'Central-North Tete',
    area: '6.958 km²',
    population: '130.000 hab.',
    climate: 'Tropical de savana com invernos secos',
    climateEn: 'Tropical savanna with dry winters',
    overview: 'O Distrito de Chiúta, cuja sede é a vila de Manje, situa-se no coração geológico da província. Possui significativas reservas de minério de ferro, calcário para a indústria de cimento, cobre e ouro, combinadas com vales férteis para a produção de cereais e pecuária.',
    overviewEn: 'Centering on Manje town, Chiúta lies within Tete’s richest geological formations, holding proven deposits of iron ore, cement-grade limestone, copper, and gold alongside fertile agricultural valleys.',
    history: 'Região historicamente associada aos reinos Chewa e aos contactos com as feiras auríferas e de ferro dos séculos XVII e XVIII. Desenvolveu-se no período moderno com a expansão dos levantamentos geológicos e a abertura da rede viária ligando a Estrada Nacional à fronteira norte.',
    historyEn: 'Historically connected to Chewa chieftains and ancient regional iron-smelting sites. Chiúta developed rapidly with mineral mapping and transport arteries linking northern Tete.',
    geography: {
      borders: 'Moatize, Cahora Bassa, Macanga, Chifunde, Marávia e República do Malawi',
      bordersEn: 'Moatize, Cahora Bassa, Macanga, Chifunde, Marávia, and Malawi',
      rivers: 'Rio Luia, Rio Mufa, Rio Sanhango',
      localities: 'Manje (Sede), Kazula, Muchena',
      coordinates: '15°22′S 33°16′E'
    },
    economy: [
      { name: 'Mineração & Cimento', nameEn: 'Mining & Cement', desc: 'Calcários para clinker e cimento, depósitos de ferro e ocorrências de ouro.', isPrimary: true },
      { name: 'Agricultura', nameEn: 'Agriculture', desc: 'Cultivo de milho, amendoim, feijões e tabaco.', isPrimary: true },
      { name: 'Pecuária', nameEn: 'Livestock', desc: 'Criação de gado bovino e caprino.', isPrimary: false }
    ],
    resources: 'Jazigos maciços de calcário, minério de ferro com alto teor, ouro aluvionar e solos agrícolas.',
    resourcesEn: 'Massive high-purity limestone reserves, high-grade iron ore deposits, alluvial gold, and productive soils.',
    investmentProjects: [
      { sector: 'Indústria / Mineração', project: 'Unidade Integrada de Clinker e Cimento de Chiúta', location: 'Manje', capacity: '1.200.000 ton/ano', investment: 'US$ 180M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: true,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: false
    },
    gallery: DISTRICT_IMAGES_MAP.chiuta.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'Ministério dos Recursos Minerais e Energia', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'cidade-de-tete',
    slug: 'cidade-de-tete',
    name: 'Cidade de Tete',
    capital: 'Cidade de Tete',
    tagline: 'Capital provincial, polo financeiro, histórico e logístico do Zambeze.',
    taglineEn: 'Provincial capital, financial, historical, and logistic hub on the Zambezi.',
    image: DISTRICT_IMAGES_MAP['cidade-de-tete'].image,
    heroImage: DISTRICT_IMAGES_MAP['cidade-de-tete'].heroImage,
    location: 'Centro da Província (Margens do Rio Zambeze)',
    locationEn: 'Central Tete (Zambezi River Banks)',
    area: '286 km²',
    population: '380.000 hab.',
    climate: 'Tropical quente e seco (clima de vale)',
    climateEn: 'Hot and dry tropical (valley climate)',
    overview: 'A Cidade de Tete é a capital política, administrativa e financeira da província. Situada nas margens do imponente Rio Zambeze, é atravessada por duas pontes de grande escala internacional — a Ponte Samora Machel (inaugurada em 1973) e a moderna Ponte Kassuende (inaugurada em 2014) — servindo de nó logístico obrigatório para a circulação de passageiros e carga em toda a África Austral.',
    overviewEn: 'Tete City is the administrative, corporate, and financial hub of the province. Flanked by the Zambezi River and crossed by the Samora Machel and Kassuende suspension bridges, it forms a vital logistics node in Southern Africa.',
    history: 'Uma das cidades mais antigas da costa oriental africana, Tete foi fundada como feitoria e entreposto comercial português no século XVI (1531), no local de um antigo mercado Swahili-Árabe e Africano de marfim e ouro. Elevada a vila em 1761 e a cidade em 21 de Março de 1959, preserva património notável como o Forte de São Tiago Maior e a Catedral de São Tiago Maior.',
    historyEn: 'Among southeastern Africa’s oldest urban settlements, Tete was established as a trading post in 1531 atop earlier Swahili-African river trade nodes. Elevated to town status in 1761 and city status on March 21, 1959, it hosts iconic heritage like the Fort of São Tiago Maior.',
    geography: {
      borders: 'Rodeada pelos distritos de Moatize, Changara e Marara',
      bordersEn: 'Surrounded by Moatize, Changara, and Marara Districts',
      rivers: 'Rio Zambeze',
      localities: 'Bairros Urbanos: Josina Machel, Samora Machel, Chingodzi, Matundo, Degue, Francisco Manyanga',
      coordinates: '16°09′S 33°35′E'
    },
    economy: [
      { name: 'Serviços Financeiros & Corporativos', nameEn: 'Financial & Corporate Services', desc: 'Banca comercial, seguradoras, consultoria de engenharia e sedes empresariais.', isPrimary: true },
      { name: 'Logística & Transportes', nameEn: 'Logistics & Transport', desc: 'Aeroporto Internacional de Chingodzi e entroncamento das rodovias N7 e N8.', isPrimary: true },
      { name: 'Hotelaria e Turismo Corporativo', nameEn: 'Hospitality & Business Tourism', desc: 'Complexos hoteleiros internacionais, centros de conferências e gastronomia.', isPrimary: true },
      { name: 'Comércio Atacadista e Varejista', nameEn: 'Commerce & Retail', desc: 'Abastecimento a toda a região centro-oeste de Moçambique.', isPrimary: false }
    ],
    resources: 'Infraestrutura urbana consolidada, Aeroporto Internacional de Chingodzi, duas pontes sobre o Zambeze, abastecimento de água e fibra ótica.',
    resourcesEn: 'Established urban infrastructure, Chingodzi International Airport, two major Zambezi bridges, power grid and telecom fiber connectivity.',
    investmentProjects: [
      { sector: 'Infraestrutura / Serviços', project: 'Centro Internacional de Convenções e Negócios de Tete (CICN)', location: 'Cidade de Tete (Matundo)', capacity: '2.500 delegados', investment: 'US$ 60M' },
      { sector: 'Imobiliário / Logística', project: 'Parque Logístico Urbano e Zona Comercial de Chingodzi', location: 'Chingodzi', capacity: '80.000 m²', investment: 'US$ 40M' }
    ],
    indicators: {
      location: true,
      agriculture: false,
      mining: false,
      energy: false,
      fisheries: false,
      livestock: false,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP['cidade-de-tete'].gallery,
    sources: ['Governo da Província de Tete', 'Conselho Municipal da Cidade de Tete', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'doa',
    slug: 'doa',
    name: 'Dôa',
    capital: 'Dôa',
    tagline: 'Bacia carbonífera do Baixo Zambeze e corredor ferroviário de Sena.',
    taglineEn: 'Lower Zambezi coal basin and Sena railway logistics corridor.',
    image: DISTRICT_IMAGES_MAP.doa.image,
    heroImage: DISTRICT_IMAGES_MAP.doa.heroImage,
    location: 'Sudeste da Província de Tete',
    locationEn: 'Southeast Tete Province',
    area: '3.606 km²',
    population: '85.000 hab.',
    climate: 'Tropical semiárido e húmido sazonal',
    climateEn: 'Tropical semi-arid with seasonal wetness',
    overview: 'O Distrito de Dôa, criado no âmbito do novo quadro administrativo provincial a partir do desmembramento de Mutarara, ocupa uma posição estratégica no Baixo Zambeze. É atravessado pela Linha Férrea de Sena e possui expressivas reservas de carvão mineral, além de férteis planícies agrícolas.',
    overviewEn: 'Created through provincial administrative reorganization, Dôa occupies a strategic position in the Lower Zambezi. Traversed by the Sena Railway Line, it holds massive thermal and metallurgical coal deposits along with arable floodplains.',
    history: 'A região de Dôa tem raízes históricas profundas ligadas ao transporte fluvial no Zambeze e à construção da Linha de Sena no início do século XX. O território ganhou autonomia administrativa para acelerar o desenvolvimento local associado aos projetos de concessão mineira e dinamização do corredor de transporte para o Porto da Beira.',
    historyEn: 'Historically tied to Zambezi river commerce and the early 20th-century Sena Railway construction. Granted district status to drive development in coal concession mining and rail logistics to Beira Port.',
    geography: {
      borders: 'Mutarara, Moatize, Tsangano e Província da Zambézia',
      bordersEn: 'Mutarara, Moatize, Tsangano, and Zambézia Province',
      rivers: 'Rio Zambeze, Rio Chire',
      localities: 'Dôa (Sede), Salambidua, Chueza',
      coordinates: '16°42′S 34°56′E'
    },
    economy: [
      { name: 'Mineração de Carvão', nameEn: 'Coal Mining', desc: 'Jazigos carboníferos integrados no Corredor de Sena para o Porto da Beira.', isPrimary: true },
      { name: 'Logística Ferroviária', nameEn: 'Rail Logistics', desc: 'Estações e ramais da Linha de Sena com transporte contínuo de granéis.', isPrimary: true },
      { name: 'Agricultura do Baixo Zambeze', nameEn: 'Agriculture', desc: 'Milho, gergelim, algodão e horticultura nas várzeas férteis.', isPrimary: false }
    ],
    resources: 'Reservas de carvão mineral de alta qualidade, acesso ferroviário direto ao mar (Beira), água abundante do Rio Zambeze.',
    resourcesEn: 'High-grade coal deposits, direct rail connection to port facilities (Beira), abundant Zambezi water access.',
    investmentProjects: [
      { sector: 'Mineração / Energia', project: 'Mina e Central Térmica a Carvão de Dôa', location: 'Dôa', capacity: '300 MW', investment: 'US$ 350M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: true,
      energy: true,
      fisheries: false,
      livestock: true,
      tourism: false
    },
    gallery: DISTRICT_IMAGES_MAP.doa.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Divisão Administrativa', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'macanga',
    slug: 'macanga',
    name: 'Macanga',
    capital: 'Furancungo',
    tagline: 'Planalto de Furancungo, minerais nobres, ouro e agricultura de excelência.',
    taglineEn: 'Furancungo plateau, precious minerals, gold, and fertile cropping.',
    image: DISTRICT_IMAGES_MAP.macanga.image,
    heroImage: DISTRICT_IMAGES_MAP.macanga.heroImage,
    location: 'Norte da Província de Tete',
    locationEn: 'Northern Tete Province',
    area: '7.300 km²',
    population: '160.000 hab.',
    climate: 'Tropical de altitude / Sub-húmido',
    climateEn: 'Highland tropical / Sub-humid',
    overview: 'Com sede na histórica vila de Furancungo, o Distrito de Macanga estende-se num planalto com clima fresco e solos ricos. É célebre pela sua produção agropecuária (milho, tabaco, feijão, batata), exploração florestal sustentável e expressivo potencial em mineração de ouro aluvionar e pedras preciosas.',
    overviewEn: 'Centering on Furancungo, Macanga sits on a high plateau with pleasant climate and productive soils. It is recognized for commercial agriculture (maize, tobacco, beans), timber, and extensive alluvial gold deposits.',
    history: 'Macanga foi no século XIX o núcleo do famoso "Estado de Macanga" liderado pela dinastia dos Caetano Pereira (os "Chicucurus"), desempenhando um papel preponderante no comércio de marfim e ouro com a Zâmbia e o Malawi. Mantém forte identidade cultural e histórica.',
    historyEn: 'Macanga was the seat of the 19th-century "Macanga State" ruled by the Caetano Pereira dynasty ("Chicucurus"), exerting decisive influence on regional gold and ivory trade across Zambia and Malawi.',
    geography: {
      borders: 'Chifunde, Chiúta, Angónia, Tsangano e República do Malawi',
      bordersEn: 'Chifunde, Chiúta, Angónia, Tsangano, and Malawi',
      rivers: 'Rio Luia, Rio Muvuzi, Rio Baue',
      localities: 'Furancungo (Sede), Chidzolomondo, Gandali',
      coordinates: '14°54′S 33°37′E'
    },
    economy: [
      { name: 'Agricultura & Silvicultura', nameEn: 'Agriculture & Forestry', desc: 'Milho, tabaco, soja, batata-reno e corte autorizado de madeira nobre.', isPrimary: true },
      { name: 'Mineração Aurífera', nameEn: 'Gold Mining', desc: 'Exploração de ouro aluvionar e filoniano nas bacias fluviais.', isPrimary: true },
      { name: 'Pecuária', nameEn: 'Livestock', desc: 'Criação de bovinos e caprinos em ambiente livre de tsé-tsé nas cotas altas.', isPrimary: false }
    ],
    resources: 'Jazigos de ouro, ferro, quartzo, turmalinas, vastas reservas de madeira nobre e solos de grande aptidão agrícola.',
    resourcesEn: 'Gold, iron, quartz, tourmaline deposits, sustainable timber concessions, and high-fertility soils.',
    investmentProjects: [
      { sector: 'Mineração', project: 'Unidade Industrial de Extração e Refino de Ouro de Macanga', location: 'Furancungo', capacity: '1.500 kg/ano', investment: 'US$ 30M' },
      { sector: 'Agricultura', project: 'Fábrica de Ração e Processamento de Soja', location: 'Chidzolomondo', capacity: '25.000 ton/ano', investment: 'US$ 14M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: true,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.macanga.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Perfil do Distrito de Macanga', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'magoe',
    slug: 'magoe',
    name: 'Mágoè',
    capital: 'Mphende',
    tagline: 'Parque Nacional de Mágoè, Albufeira de Cahora Bassa e recursos minerais.',
    taglineEn: 'Mágoè National Park, Lake Cahora Bassa, and rich mineral resources.',
    image: DISTRICT_IMAGES_MAP.magoe.image,
    heroImage: DISTRICT_IMAGES_MAP.magoe.heroImage,
    location: 'Sudoeste de Tete (Margem Sul da Albufeira)',
    locationEn: 'Southwest Tete (South Bank of Lake Cahora Bassa)',
    area: '8.697 km²',
    population: '90.000 hab.',
    climate: 'Tropical semiárido e quente',
    climateEn: 'Hot semi-arid tropical',
    overview: 'O Distrito de Mágoè situa-se na margem sul do Rio Zambeze e da Albufeira de Cahora Bassa, estendendo-se até à fronteira com o Zimbabwe. Abriga o espetacular Parque Nacional de Mágoè (com 3.500 km² de fauna bravia: elefantes, leões, búfalos, hipopótamos) e o histórico programa comunitário de conservação Tchuma Tchato.',
    overviewEn: 'Stretching along the southern shore of Lake Cahora Bassa to the Zimbabwe border, Mágoè hosts the pristine Mágoè National Park (3,500 km² of protected wildlife) and the pioneering Tchuma Tchato community conservation model.',
    history: 'Mágoè é famoso por ser o berço do programa pioneiro de gestão comunitária de recursos naturais "Tchuma Tchato" ("A nossa riqueza"), lançado nos anos 1990 para integrar comunidades locais nas receitas do ecoturismo e conservação. Em 2013, o Governo oficializou a criação do Parque Nacional de Mágoè.',
    historyEn: 'Renowned as the birthplace of the pioneering "Tchuma Tchato" community-based natural resource management initiative in the 1990s. In 2013, the state formally proclaimed Mágoè National Park.',
    geography: {
      borders: 'Cahora Bassa, Zumbo, Marávia e República do Zimbabwe',
      bordersEn: 'Cahora Bassa, Zumbo, Marávia, and Zimbabwe',
      rivers: 'Rio Zambeze, Rio Mucumbura, Rio Daque, Albufeira de Cahora Bassa',
      localities: 'Mphende (Sede), Mucumbura, Chintholo',
      coordinates: '15°48′S 31°45′E'
    },
    economy: [
      { name: 'Ecoturismo e Safaris', nameEn: 'Ecotourism & Safaris', desc: 'Parque Nacional de Mágoè, safaris fotográficos e turismo cinegético sustentável.', isPrimary: true },
      { name: 'Pesca Continental (Kapenta e Tilápia)', nameEn: 'Inland Fishery', desc: 'Frotas de pesca artesanal e semi-industrial na margem sul da albufeira.', isPrimary: true },
      { name: 'Recursos Minerais', nameEn: 'Mineral Resources', desc: 'Jazigos de calcário, fluorite, carvão e pedras preciosas.', isPrimary: false }
    ],
    resources: 'Biodiversidade de fauna bravia africana, 180 km de orla aquática lacustre, reservas minerais e potencial de turismo de conservação.',
    resourcesEn: 'Abundant African wildlife biodiversity, 180 km of pristine lakefront shoreline, mineral occurrences, and eco-safari concessions.',
    investmentProjects: [
      { sector: 'Turismo / Conservação', project: 'Eco-Lodges de Luxo e Concessões Ecoturísticas no Parque Nacional de Mágoè', location: 'Parque Nacional de Mágoè', capacity: '120 leitos de luxo', investment: 'US$ 25M' },
      { sector: 'Pesca', project: 'Centro de Processamento e Frio de Pescado de Mucumbura', location: 'Mucumbura / Lago', capacity: '3.000 ton/ano', investment: 'US$ 8M' }
    ],
    indicators: {
      location: true,
      agriculture: false,
      mining: true,
      energy: false,
      fisheries: true,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.magoe.gallery,
    sources: ['Governo da Província de Tete', 'ANAC - Administração Nacional das Áreas de Conservação', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'marara',
    slug: 'marara',
    name: 'Marara',
    capital: 'Marara Centro (Kambulatsitsi)',
    tagline: 'Capital da pecuária caprina, polo de carvão e corredor logístico do Zambeze.',
    taglineEn: 'Caprine livestock capital, coal node, and Zambezi transport corridor.',
    image: DISTRICT_IMAGES_MAP.marara.image,
    heroImage: DISTRICT_IMAGES_MAP.marara.heroImage,
    location: 'Sul da Província de Tete (Margem Sul do Rio Zambeze)',
    locationEn: 'Southern Tete Province (South bank of Zambezi River)',
    area: '2.840 km²',
    population: '80.000 hab. (INE Proj.)',
    climate: 'Tropical semiárido quente',
    climateEn: 'Hot semi-arid tropical',
    overview: 'O Distrito de Marara, criado pelo desmembramento territorial da parte norte de Changara, localiza-se estrategicamente na margem sul do Rio Zambeze e ao longo do Rio Luenha. É famoso pela excelência na criação do afamado Cabrito de Tete, abundância de recursos minerais carboníferos, pedreiras e exploração de agregados de construção civil.',
    overviewEn: 'Marara District, formed from the northern territory of Changara, lies along the southern bank of the Zambezi and Luenha rivers. It is famed for premium indigenous caprine breeding (Tete Goat), rich coal occurrences, and construction aggregates quarries.',
    history: 'Historicamente território de cruzamento de caravanas mercantis entre Tete e o planalto zimbabueano, a região abrigou missões históricas e comunidades tradicionais Tonga e Nyungwe. Foi elevado à categoria de distrito pela Lei nº 26/2013 de 18 de Dezembro, acelerando investimentos em infraestruturas públicas, eletrificação, abastecimento de água e serviços sociais.',
    historyEn: 'Historically a trading junction between Tete and the Zimbabwean plateau, hosting historic missions and Tonga/Nyungwe communities. Elevated to full district status in 2013, accelerating investments in civic infrastructure, electrification, and social services.',
    geography: {
      borders: 'Cidade de Tete, Changara, Moatize, Cahora Bassa e Chiúta',
      bordersEn: 'Tete City, Changara, Moatize, Cahora Bassa, and Chiúta',
      rivers: 'Rio Zambeze, Rio Luenha',
      localities: 'Marara Centro (Sede), Kambulatsitsi, Mufa, Boroma',
      coordinates: '16°02′S 33°28′E'
    },
    economy: [
      { name: 'Pecuária Tradicional e Comercial', nameEn: 'Livestock Breeding', desc: 'Maior polo produtor do famoso Cabrito de Tete, bovinos de corte e ovinos.', isPrimary: true },
      { name: 'Mineração de Carvão e Pedreiras', nameEn: 'Mining & Aggregates', desc: 'Concessões de carvão térmico e exploração industrial de inertes para construção civil.', isPrimary: true },
      { name: 'Agricultura ao Longo do Zambeze', nameEn: 'Riverine Agriculture', desc: 'Milho, hortícolas e culturas de sequeiro nas várzeas férteis.', isPrimary: false },
      { name: 'Logística Rodoviária', nameEn: 'Road Logistics', desc: 'Eixo rodoviário estratégico de ligação à Estrada Nacional N7/N8.', isPrimary: false }
    ],
    resources: 'Rebanhos caprinos de raça autóctone, jazigos de carvão mineral, bancos de areia e granito de alta qualidade, margens fluviais para regadio.',
    resourcesEn: 'Indigenous goat livestock gene pool, thermal coal occurrences, premium aggregate stone quarries, and Zambezi riverfront arable soils.',
    investmentProjects: [
      { sector: 'Pecuária & Agro-indústria', project: 'Matadouro Industrial e Centro de Processamento de Carnes de Marara', location: 'Marara Centro', capacity: '100.000 cabeças/ano', investment: 'US$ 16M' },
      { sector: 'Indústria Extractiva', project: 'Unidade Industrial de Britagem e Agregados de Construção', location: 'Kambulatsitsi / Mufa', capacity: '500.000 m³/ano', investment: 'US$ 12M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: true,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.marara.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Divisão Territorial', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'maravia',
    slug: 'maravia',
    name: 'Marávia',
    capital: 'Fíngoè',
    tagline: 'Tesouro mineral do norte, ouro, cobre, ferro e fronteira com a Zâmbia.',
    taglineEn: 'Northern mineral treasure, gold, copper, iron ore, and Zambia frontier.',
    image: DISTRICT_IMAGES_MAP.maravia.image,
    heroImage: DISTRICT_IMAGES_MAP.maravia.heroImage,
    location: 'Noroeste da Província de Tete',
    locationEn: 'Northwest Tete Province',
    area: '16.515 km²',
    population: '145.000 hab.',
    climate: 'Tropical de savana com cotas montanhosas',
    climateEn: 'Tropical savanna with rugged uplands',
    overview: 'O Distrito de Marávia, com sede em Fíngoè, é o maior em extensão territorial da província de Tete. Apresenta uma extraordinária riqueza geológica, com imensas reservas de minério de ferro, cobre, ouro, vanádio, titânio e pedras preciosas, aliadas a uma extensa fronteira com a República da Zâmbia.',
    overviewEn: 'Centering on Fíngoè, Marávia is Tete’s largest district by land area. It boasts immense geological wealth, including world-class iron ore, copper, gold, titanium, and gemstones along its vast Zambian border.',
    history: 'A região de Marávia esteve historicamente ligada ao lendário Reino dos Maraves e aos chefados Karanga-Tonga que negociavam ouro e cobre com mercadores do Zambeze. No século XX, as montanhas de Fíngoè tornaram-se célebres pelas descobertas geológicas e pela resistência anticolonial.',
    historyEn: 'Historically tied to the ancient Maravi Empire and trade conduits for copper and gold. In modern times, Fíngoè’s mineralized massifs have positioned Marávia as a critical frontier for industrial exploration.',
    geography: {
      borders: 'Zumbo, Mágoè, Cahora Bassa, Chiúta, Chifunde e República da Zâmbia',
      bordersEn: 'Zumbo, Mágoè, Cahora Bassa, Chiúta, Chifunde, and Zambia',
      rivers: 'Rio Luia, Rio Messambizi, Rio Zambeze (norte da albufeira)',
      localities: 'Fíngoè (Sede), Cassacatiza, Molowera, Chipera',
      coordinates: '15°07′S 31°54′E'
    },
    economy: [
      { name: 'Mineração Metálica de Grande Escala', nameEn: 'Large-scale Metallic Mining', desc: 'Projetos de minério de ferro, cobre, ouro e depósitos polimetálicos.', isPrimary: true },
      { name: 'Comércio Fronteiriço (Cassacatiza)', nameEn: 'Cross-border Trade', desc: 'Posto fronteiriço estratégico ligando Moçambique à Província Oriental da Zâmbia.', isPrimary: true },
      { name: 'Agricultura e Pecuária', nameEn: 'Agriculture & Livestock', desc: 'Cereais, gergelim e criação de gado caprino e bovino.', isPrimary: false }
    ],
    resources: 'Jazigos de ferro titanífero de classe mundial, cobre, ouro aluvionar e primário, calcários e pedras semipreciosas (turmalinas, águas-marinhas).',
    resourcesEn: 'World-class titaniferous iron ore, copper, primary/alluvial gold, limestone, and gemstones (tourmaline, aquamarine).',
    investmentProjects: [
      { sector: 'Mineração', project: 'Projeto de Ferro e Beneficiação Metálica de Fíngoè/Marávia', location: 'Fíngoè', capacity: '5.000.000 ton/ano concentrado', investment: 'US$ 650M' },
      { sector: 'Infraestrutura / Logística', project: 'Modernização do Posto Aduaneiro e Porto Seco de Cassacatiza', location: 'Cassacatiza (Fronteira Zâmbia)', capacity: 'Trânsito de 200 camiões/dia', investment: 'US$ 18M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: true,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.maravia.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'Direção Provincial de Recursos Minerais e Energia', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'moatize',
    slug: 'moatize',
    name: 'Moatize',
    capital: 'Cidade de Moatize',
    tagline: 'A capital do carvão mineral, megaprojetos industriais e nó logístico.',
    taglineEn: 'Global coal capital, heavy industrial megaprojects, and rail logistics.',
    image: DISTRICT_IMAGES_MAP.moatize.image,
    heroImage: DISTRICT_IMAGES_MAP.moatize.heroImage,
    location: 'Centro-Leste da Província de Tete',
    locationEn: 'Central-East Tete Province',
    area: '8.455 km²',
    population: '450.000 hab.',
    climate: 'Tropical quente com estação seca prolongada',
    climateEn: 'Hot tropical with extended dry season',
    overview: 'O Distrito de Moatize é o motor económico da província e o maior polo de mineração de carvão mineral de África. Abriga reservas comprovadas de carvão coqueificável e térmico estimadas em mais de 20 mil milhões de toneladas, operadas por gigantes globais (Vulcan, ICVL, Jindal), conectadas aos Portos de Nacala e da Beira através dos corredores ferroviários de Sena e Nacala.',
    overviewEn: 'Moatize District is Tete’s economic powerhouse and Africa’s premier coal mining cluster. Holding over 20 billion tonnes of high-grade metallurgical and thermal coal, it anchors massive operations linked to Nacala and Beira deepwater ports.',
    history: 'A existência de carvão em Moatize foi documentada cientificamente por David Livingstone no século XIX. A extração industrial teve início na década de 1930 pela Companhia Carbonífera de Moçambique. Nos anos 2000, com os investimentos de grande porte da Vale e Rio Tinto/ICVL, o distrito viveu uma das maiores transformações urbanas e industriais da história do país.',
    historyEn: 'Livingstone scientifically documented Moatize’s coal in the 19th century. Commercial mining started in the 1930s. In the 2000s, massive global concessions (Vale, ICVL, Jindal) catalyzed historic industrialization and infrastructure growth.',
    geography: {
      borders: 'Cidade de Tete, Chiúta, Tsangano, Dôa, Mutarara, Guro (Manica) e República do Malawi',
      bordersEn: 'Tete City, Chiúta, Tsangano, Dôa, Mutarara, Guro (Manica), and Malawi',
      rivers: 'Rio Zambeze, Rio Revúboè, Rio Moatize',
      localities: 'Cidade de Moatize (Sede), Kambulatsitsi, Zóbuè, Benga',
      coordinates: '16°07′S 33°44′E'
    },
    economy: [
      { name: 'Mega-Mineração de Carvão Mineral', nameEn: 'Coal Mega-Mining', desc: 'Minas a céu aberto de carvão de coque para siderurgia e carvão térmico para exportação global.', isPrimary: true },
      { name: 'Logística Ferroviária e Portuária', nameEn: 'Rail & Port Logistics', desc: 'Corredores Ferroviários de Nacala e Sena com transporte de milhões de toneladas/ano.', isPrimary: true },
      { name: 'Energia Térmica & Manufatura', nameEn: 'Thermal Power & Manufacturing', desc: 'Projetos de centrais termoelétricas a carvão, cimento e oficinas industriais pesadas.', isPrimary: true },
      { name: 'Comércio Internacional (Zóbuè)', nameEn: 'International Trade (Zóbuè)', desc: 'Principal posto fronteiriço rodoviário com o sul do Malawi (Blantyre).', isPrimary: false }
    ],
    resources: '20+ mil milhões de toneladas de carvão de alta qualidade, água industrial do Zambeze e Revúboè, malha ferroviária pesada com ligação a portos de águas profundas.',
    resourcesEn: '20+ billion tonnes of world-class metallurgical coal reserves, Revúboè/Zambezi industrial water access, dual heavy-haul rail corridors to sea ports.',
    investmentProjects: [
      { sector: 'Logística / Indústria', project: 'Porto Seco e Plataforma Multimodal de Moatize', location: 'Moatize', capacity: '5.000.000 ton/ano', investment: 'US$ 85M' },
      { sector: 'Energia', project: 'Central Térmica a Carvão de Benga', location: 'Benga / Moatize', capacity: '300 MW', investment: 'US$ 400M' },
      { sector: 'Indústria Pesada', project: 'Parque de Beneficiação de Carvão e Briquetagem', location: 'Kambulatsitsi', capacity: '1.000.000 ton/ano', investment: 'US$ 60M' }
    ],
    indicators: {
      location: true,
      agriculture: false,
      mining: true,
      energy: true,
      fisheries: false,
      livestock: true,
      tourism: false
    },
    gallery: DISTRICT_IMAGES_MAP.moatize.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'Direção Provincial de Recursos Minerais e Energia', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'mutarara',
    slug: 'mutarara',
    name: 'Mutarara',
    capital: 'Nyamayabáue',
    tagline: 'Confluência do Zambeze e Chire, Ponte Dona Ana e agricultura de várzea.',
    taglineEn: 'Zambezi-Shire confluence, iconic Dona Ana Bridge, and fertile plains.',
    image: DISTRICT_IMAGES_MAP.mutarara.image,
    heroImage: DISTRICT_IMAGES_MAP.mutarara.heroImage,
    location: 'Extremo Sudeste da Província de Tete',
    locationEn: 'Southeast Tip of Tete Province',
    area: '6.295 km²',
    population: '210.000 hab.',
    climate: 'Tropical húmido de planície',
    climateEn: 'Humid lowland tropical',
    overview: 'O Distrito de Mutarara ocupa uma posição singular na confluência dos rios Zambeze e Chire, no entroncamento geográfico de quatro províncias (Tete, Sofala, Zambézia e Manica) e do Malawi. É internacionalmente famoso pela Ponte Dona Ana — com 3,67 km de extensão, uma das pontes ferroviárias mais longas de África — ligando Vila Nova de Fronteira ao litoral.',
    overviewEn: 'Mutarara sits at the scenic confluence of the Zambezi and Shire rivers, connecting four provinces (Tete, Sofala, Zambézia, Manica) and Malawi. It is internationally famed for the 3.67 km Dona Ana Bridge, one of Africa’s longest rail bridges.',
    history: 'Polo vital da navegação fluvial e comércio no Zambeze desde os séculos XVIII e XIX. A construção da Ponte Dona Ana na década de 1930 pela Trans-Zambezia Railway revolucionou as rotas de exportação do carvão e do açúcar para o Porto da Beira.',
    historyEn: 'A pivotal river transport and trading junction since the 18th century. The construction of the monumental Dona Ana Bridge in the 1930s revolutionized southern African rail connectivity to Beira.',
    geography: {
      borders: 'Dôa, Tsangano, Províncias da Zambézia, Sofala e República do Malawi',
      bordersEn: 'Dôa, Tsangano, Zambézia, Sofala, and Malawi',
      rivers: 'Rio Zambeze, Rio Chire',
      localities: 'Nyamayabáue (Sede), Vila Nova de Fronteira, Inhangoma, Charre',
      coordinates: '17°27′S 35°12′E'
    },
    economy: [
      { name: 'Agricultura de Várzea e Regadio', nameEn: 'Floodplain Agriculture', desc: 'Arroz, milho, cana-de-açúcar, gergelim, algodão e horticultura.', isPrimary: true },
      { name: 'Logística Ferroviária (Linha de Sena)', nameEn: 'Rail Logistics (Sena Line)', desc: 'Ponto nodal ferroviário com ligação direta ao Malawi e ao Porto da Beira.', isPrimary: true },
      { name: 'Pesca Fluvial e Pecuária', nameEn: 'River Fishing & Livestock', desc: 'Captura de peixe de água doce no Chire/Zambeze e criação bovina.', isPrimary: false }
    ],
    resources: 'Solos aluvionares de extrema fertilidade com capacidade para milhares de hectares de regadio, confluência hídrica inesgotável, património histórico e turístico.',
    resourcesEn: 'Vast highly fertile alluvial floodplains ideal for large-scale irrigation, perpetual water resources from two major rivers, and heritage tourism assets.',
    investmentProjects: [
      { sector: 'Agricultura / Agro-indústria', project: 'Projeto Agro-Industrial de Regadio e Produção de Arroz do Baixo Zambeze', location: 'Inhangoma / Nyamayabáue', capacity: '40.000 ton/ano arroz processado', investment: 'US$ 48M' },
      { sector: 'Logística', project: 'Terminal Intermodal de Carga de Vila Nova de Fronteira', location: 'Vila Nova de Fronteira (Malawi)', capacity: '500.000 ton/ano', investment: 'US$ 20M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: false,
      energy: false,
      fisheries: true,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.mutarara.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Perfil do Distrito de Mutarara', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'tsangano',
    slug: 'tsangano',
    name: 'Tsangano',
    capital: 'Tsangano',
    tagline: 'Planalto frio, batata-reno, trigo, horticultura e ligação transfronteiriça.',
    taglineEn: 'Cool highlands, high-yield potato and wheat farming, cross-border commerce.',
    image: DISTRICT_IMAGES_MAP.tsangano.image,
    heroImage: DISTRICT_IMAGES_MAP.tsangano.heroImage,
    location: 'Nordeste da Província de Tete',
    locationEn: 'Northeast Tete Province',
    area: '3.661 km²',
    population: '190.000 hab.',
    climate: 'Temperado de montanha / Subtropical húmido',
    climateEn: 'Mountain temperate / Humid subtropical',
    overview: 'O Distrito de Tsangano ocupa a parte meridional do fértil Planalto de Angónia-Tsangano, com altitudes que ultrapassam os 1.400 metros. O clima ameno e as chuvas regulares proporcionam condições perfeitas para culturas de clima temperado raríssimas em Moçambique, como o trigo, cevada, batata-reno de alta qualidade, maçãs e hortaliças.',
    overviewEn: 'Occupying the southern rim of the Angónia-Tsangano highlands (above 1,400m altitude), Tsangano enjoys a cool temperate climate ideal for temperate crops such as wheat, seed potato, barley, and fresh vegetables.',
    history: 'Criado no período pós-independência a partir da reorganização da circunscrição de Angónia, Tsangano partilha as ricas tradições culturais do povo Nguni-Angoni e Chewa. Desenvolveu fortes redes de cooperação agrária com os distritos limítrofes do Malawi.',
    historyEn: 'Formed through administrative reorganization of the greater Angónia plateau, Tsangano shares vibrant Angoni-Nguni cultural heritage and deep agricultural ties with neighboring Malawi.',
    geography: {
      borders: 'Angónia, Macanga, Moatize, Dôa e República do Malawi (Ntcheu e Mwanza)',
      bordersEn: 'Angónia, Macanga, Moatize, Dôa, and Malawi',
      rivers: 'Rio Livize, Rio Nhalapanda',
      localities: 'Tsangano (Sede), Ntengo-wa-Mbalame, Biriwiri',
      coordinates: '15°13′S 34°28′E'
    },
    economy: [
      { name: 'Agricultura Hortícola e Frutícola', nameEn: 'Horticulture & Orchards', desc: 'Maior produtor provincial de batata-reno, repolho, tomate, cenoura e citrinos.', isPrimary: true },
      { name: 'Produção de Cereais Nobres', nameEn: 'Grain Production', desc: 'Milho, trigo, feijão manteiga e soja.', isPrimary: true },
      { name: 'Pecuária Leiteira e Suinicultura', nameEn: 'Dairy & Swine', desc: 'Bovinocultura de leite e transformação artesanal de queijos.', isPrimary: false }
    ],
    resources: 'Clima de altitude com baixa evapotranspiração, solos vulcânicos férteis, abundância de nascentes de montanha para regadio gravitacional.',
    resourcesEn: 'Temperate climate, volcanic-origin fertile soils, and abundant mountain springs suitable for gravity-fed irrigation.',
    investmentProjects: [
      { sector: 'Agricultura / Fruticultura', project: 'Complexo de Armazenamento Refrigerado e Processamento de Batata de Tsangano', location: 'Ntengo-wa-Mbalame', capacity: '30.000 ton/ano', investment: 'US$ 22M' }
    ],
    indicators: {
      location: true,
      agriculture: true,
      mining: false,
      energy: false,
      fisheries: false,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.tsangano.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Perfil do Distrito de Tsangano', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'zumbo',
    slug: 'zumbo',
    name: 'Zumbo',
    capital: 'Zumbo',
    tagline: 'O ponto mais ocidental de Moçambique, confluência Zambeze-Luangwa e história viva.',
    taglineEn: 'Mozambique’s westernmost outpost, Zambezi-Luangwa confluence and rich history.',
    image: DISTRICT_IMAGES_MAP.zumbo.image,
    heroImage: DISTRICT_IMAGES_MAP.zumbo.heroImage,
    location: 'Extremo Oeste de Tete (Tríplice Fronteira Moçambique-Zâmbia-Zimbabwe)',
    locationEn: 'Westernmost Tete (Tripoint: Mozambique-Zambia-Zimbabwe)',
    area: '12.040 km²',
    population: '105.000 hab.',
    climate: 'Tropical semiárido e quente',
    climateEn: 'Hot semi-arid tropical',
    overview: 'O Distrito de Zumbo é o ponto mais a oeste de todo o território de Moçambique. Situa-se na confluência épica do Rio Zambeze com o Rio Luangwa, onde se tocam três nações: Moçambique, Zâmbia e Zimbabwe. É uma região de extraordinária beleza paisagística, pesca de kapenta e tilápia, recursos minerais e grande importância estratégica transfronteiriça.',
    overviewEn: 'Zumbo is the westernmost tip of Mozambique, situated where the Zambezi meets the Luangwa at the tripoint of Mozambique, Zambia, and Zimbabwe. It is endowed with majestic scenery, rich lake fisheries, gold deposits, and strategic cross-border potential.',
    history: 'Fundado em 1720 como uma das mais remotas feitorias comerciais portuguesas para o comércio com o Império dos Mwenemutapas e os reinos do interior africano. Manteve guarnição militar e alfândega secular. A sua posição geográfica garantiu-lhe destaque em crónicas históricas e tratados internacionais de fronteiras.',
    historyEn: 'Founded in 1720 as a frontier trading fair for the inland Mwenemutapa trade. Zumbo has retained deep historic legacy as the landmark boundary stone of Portuguese East Africa.',
    geography: {
      borders: 'Marávia, Mágoè, República da Zâmbia (Distrito de Luangwa) e República do Zimbabwe',
      bordersEn: 'Marávia, Mágoè, Zambia (Luangwa District), and Zimbabwe',
      rivers: 'Rio Zambeze, Rio Luangwa, Albufeira de Cahora Bassa',
      localities: 'Zumbo (Sede), Miruru, Zambue, Muze',
      coordinates: '15°37′S 30°26′E'
    },
    economy: [
      { name: 'Pesca & Aquacultura', nameEn: 'Fisheries & Aquaculture', desc: 'Captura de Kapenta, Peixe-Tigre e Tilápia na cauda da Albufeira de Cahora Bassa.', isPrimary: true },
      { name: 'Mineração Aurífera e Gemas', nameEn: 'Gold & Gemstones', desc: 'Ouro aluvionar no Rio Luangwa/Zambeze e pedras semipreciosas.', isPrimary: true },
      { name: 'Turismo e Safaris Fluviais', nameEn: 'River Safari Tourism', desc: 'Pesca desportiva internacional, safaris na confluência e história colonial.', isPrimary: false }
    ],
    resources: 'Confluência de dois dos maiores rios de África, pesqueiros lacustres abundantes, depósitos minerais de ouro e cobre, património histórico singular.',
    resourcesEn: 'Confluence of two major African rivers, bountiful freshwater fisheries, alluvial gold deposits, and unique historical frontier heritage.',
    investmentProjects: [
      { sector: 'Pesca / Indústria', project: 'Terminal Pesqueiro e Unidade de Secagem e Congelação de Zumbo', location: 'Zumbo / Albufeira', capacity: '4.000 ton/ano', investment: 'US$ 12M' },
      { sector: 'Turismo', project: 'Resort Fluvial e Marina da Tríplice Fronteira', location: 'Confluência Zambeze-Luangwa', capacity: '60 quartos', investment: 'US$ 15M' }
    ],
    indicators: {
      location: true,
      agriculture: false,
      mining: true,
      energy: false,
      fisheries: true,
      livestock: true,
      tourism: true
    },
    gallery: DISTRICT_IMAGES_MAP.zumbo.gallery,
    sources: ['Governo da Província de Tete', 'INE Moçambique', 'MAE - Perfil do Distrito de Zumbo', 'Documento Oficial CIIT / Info.pdf']
  }
];

/* ==========================================================================
   5 MUNICÍPIOS DE TETE
   Fontes: Ministério da Administração Estatal, Conselho Municipal de Tete / Moatize / Ulónguè / Nyamayabáue / Chitima
   ========================================================================== */

export const MUNICIPALITIES_DETAILED_DATA: MunicipalityDetail[] = [
  {
    id: 'cidade-de-tete',
    slug: 'cidade-de-tete',
    name: 'Cidade de Tete',
    status: 'Município de Cidade (Capital Provincial)',
    statusEn: 'City Municipality (Provincial Capital)',
    image: samoraBridgeImg,
    heroImage: kassuendeImg,
    location: 'Margens do Rio Zambeze (Centro da Província)',
    locationEn: 'Banks of the Zambezi River (Central Tete)',
    population: '380.000 habitantes',
    overview: 'A Cidade de Tete é a capital administrativa, política e financeira da Província de Tete. Erguida num cenário imponente nas margens do Rio Zambeze, constitui o polo urbano de maior crescimento da região centro-oeste de Moçambique, concentrando os principais bancos, seguradoras, hotéis de padrão internacional e serviços corporativos de apoio à mineração e energia.',
    overviewEn: 'Tete City is the provincial capital and financial center. Rising along the Zambezi River, it forms western Mozambique’s largest urban engine, hosting banking, corporate services, hospitality, and logistics hubs.',
    history: 'A feitoria de Tete foi fundada pelos portugueses em 1531 nas proximidades de um histórico mercado africano e swahili. Elevada a vila em 1761 e a cidade em 21 de Março de 1959. No século XX, tornou-se o principal quartel-general administrativo da bacia do Zambeze, consolidando-se com a inauguração da Ponte Samora Machel (1973) e da Ponte Kassuende (2014).',
    historyEn: 'Established as a trading post in 1531 atop indigenous Zambezi trading sites. Raised to city status on March 21, 1959. Major milestone bridges (Samora Machel in 1973, Kassuende in 2014) reinforced its role as an international transit axis.',
    economy: 'Serviços financeiros, comércio grossista, hotelaria executiva, logística rodoviária e aeroportuária, construção civil e engenharia.',
    economyEn: 'Financial services, wholesale trade, corporate hospitality, road/air logistics, and civil engineering.',
    strategicImportance: 'Centro de comando governamental, nó de trânsito internacional entre Malawi, Zâmbia e Zimbabwe, sede do Aeroporto Internacional de Chingodzi.',
    strategicImportanceEn: 'Provincial government seat, transit hub for SADC trade, and location of Chingodzi International Airport.',
    infrastructure: 'Aeroporto Internacional de Chingodzi (voos internacionais e domésticos), duas pontes rodoviárias sobre o Zambeze, Hospital Provincial de Tete, Universidade Zambeze, subestações de alta tensão e rede de telecomunicações de fibra ótica.',
    infrastructureEn: 'Chingodzi International Airport, two major suspension bridges, Provincial Hospital, Zambeze University, high-voltage substations, and fiber-optic backbone.',
    investmentPotential: 'Centros de congressos, parques imobiliários residenciais e corporativos, hospitais privados, polos tecnológicos e centros de distribuição.',
    investmentPotentialEn: 'Convention centers, corporate real estate, private specialized healthcare, logistics parks, and higher education.',
    heritageCulture: 'Forte de São Tiago Maior, Catedral de São Tiago Maior, Museu Municipal, Dança Nyau e gastronomia típica do peixe do Zambeze.',
    curiosities: 'É conhecida como uma das cidades mais quentes de Moçambique, carinhosamente apelidada de "Cidade de Pedra e Calor", onde o pôr-do-sol sobre o Zambeze é uma das marcas visuais mais célebres do país.',
    sources: ['Governo da Província de Tete', 'Conselho Municipal da Cidade de Tete', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'cidade-de-moatize',
    slug: 'cidade-de-moatize',
    name: 'Cidade de Moatize',
    status: 'Município de Cidade (Polo Industrial)',
    statusEn: 'City Municipality (Industrial Mining Hub)',
    image: coalImg,
    heroImage: coalImg,
    location: '18 km a leste da Cidade de Tete',
    locationEn: '18 km east of Tete City',
    population: '120.000 habitantes',
    overview: 'A Cidade de Moatize é a capital africana da mineração de carvão mineral e um dos municípios industriais mais dinâmicos do continente. Abriga os maiores complexos de extração a céu aberto, estações de tratamento de carvão e os pátios de carregamento ferroviário dos corredores de Nacala e Sena.',
    overviewEn: 'Moatize City is Africa’s coal mining capital and a powerhouse of industrial activity. It houses open-cast mining concessions, coal handling plants, and heavy-haul rail terminals linking to Nacala and Beira ports.',
    history: 'A vila desenvolveu-se em torno das concessões de carvão iniciadas nas primeiras décadas do século XX. O seu crescimento acelerou exponencialmente a partir de 2007 com a chegada de grandes investimentos globais, sendo formalmente elevada a cidade e município autónomo em Fevereiro de 2013.',
    historyEn: 'Grew around coal concessions during the 20th century. Accelerated rapidly post-2007 with multibillion-dollar mining ventures, officially gaining city and municipality status in February 2013.',
    economy: 'Mineração pesada de carvão, serviços industriais de manutenção, logística ferroviária de carga, comércio e metalomecânica.',
    economyEn: 'Heavy coal mining, industrial maintenance, rail freight logistics, commercial supply, and mechanical engineering.',
    strategicImportance: 'Ponto de partida das exportações de carvão moçambicano para os mercados de aço e energia da Ásia e Europa; conexão direta à Linha do Norte e Linha de Sena.',
    strategicImportanceEn: 'Origin of Mozambican coal exports to global steel and power markets in Asia and Europe; direct link to Nacala and Sena rail corridors.',
    infrastructure: 'Pátios ferroviários de triagem, autoestrada duplicada ligando à Cidade de Tete, subestações elétricas dedicadas e centros de formação técnico-profissional.',
    infrastructureEn: 'Heavy-haul rail sorting yards, dual carriageway highway to Tete City, industrial power substations, and technical training institutes.',
    investmentPotential: 'Portos secos, montagem de equipamentos industriais pesados, aproveitamento de cinzas e subprodutos de carvão, hotéis executivos e serviços de catering industrial.',
    investmentPotentialEn: 'Dry ports, heavy machinery assembly and servicing, coal by-product processing, corporate hospitality, and industrial catering.',
    heritageCulture: 'Monumentos ao mineiro, feiras culturais multiétnicas e tradição associativa operária.',
    curiosities: 'Moatize possui uma das maiores frotas de camiões de transporte pesado (fora de estrada) do hemisfério sul, com pneus que chegam a ter 3,5 metros de altura.',
    sources: ['Conselho Municipal de Moatize', 'Ministério dos Recursos Minerais e Energia', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'ulongue',
    slug: 'ulongue',
    name: 'Vila de Ulónguè',
    status: 'Município de Vila (Capital do Planalto)',
    statusEn: 'Town Municipality (Highland Agro Capital)',
    image: citrusImg,
    heroImage: citrusImg,
    location: 'Planalto de Angónia (Nordeste de Tete)',
    locationEn: 'Angónia Plateau (Northeast Tete)',
    population: '75.000 habitantes',
    overview: 'A Vila de Ulónguè é a sede do Distrito de Angónia e o principal município agrícola da província. Situada a mais de 1.200 metros de altitude, possui um clima fresco e aprazível, funcionando como a grande praça de comercialização de batata, milho, feijão, soja e hortícolas de Moçambique.',
    overviewEn: 'Ulónguè is the municipal seat of Angónia District and the premier agricultural trading town in Tete. At 1,200m altitude, it boasts a mild climate and serves as Mozambique’s prime potato and grain commodity exchange.',
    history: 'Fundada como posto administrativo colonial com a denominação de "Vila Coutinho", passou a denominar-se Ulónguè após a independência nacional. Em 1998, foi um dos primeiros 33 municípios autárquicos criados em Moçambique no processo pioneiro de descentralização.',
    historyEn: 'Established as Vila Coutinho in the colonial era, it was renamed Ulónguè post-1975 and chosen in 1998 as one of Mozambique’s original 33 pioneering municipal authorities.',
    economy: 'Agro-comércio, armazenagem de cereais, serviços bancários rurais, hotelaria de trânsito e comércio transfronteiriço com o Malawi.',
    economyEn: 'Agri-trade, grain storage and warehousing, rural banking, transit hospitality, and border commerce with Malawi.',
    strategicImportance: 'Centro de gravidade da segurança alimentar provincial e polo distribuidor de produtos agrícolas frescos para Tete, Maputo e a região da SADC.',
    strategicImportanceEn: 'Hub for national food security and major supplier of fresh agricultural commodities to Tete, Maputo, and SADC markets.',
    infrastructure: 'Mercado central grossista de produtos agrícolas, rede viária asfaltada ligando à Estrada Nacional, Instituto Agrário de Ulónguè, agências bancárias e rede elétrica estável.',
    infrastructureEn: 'Central agricultural wholesale market, asphalt road link, Ulónguè Agricultural Institute, commercial banks, and stable power grid.',
    investmentPotential: 'Silos de secagem e armazenagem, unidades industriais de batata pré-frita congelada, embalamento de sementes certificadas e agro-turismo rural.',
    investmentPotentialEn: 'Cold storage silos, potato processing (chips/frozen fries), certified seed packaging, and agro-tourism ventures.',
    heritageCulture: 'Tradições culturais do povo Angoni, Dança Ingoma e gastronomia à base de batata e produtos frescos do planalto.',
    curiosities: 'Em Ulónguè, durante os meses de Junho e Julho, as temperaturas noturnas podem descer abaixo dos 10°C, um contraste marcante com o calor do vale do Zambeze.',
    sources: ['Conselho Municipal de Ulónguè', 'MAE Moçambique', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'nyamayabaue',
    slug: 'nyamayabaue',
    name: 'Vila de Nyamayabáue',
    status: 'Município de Vila (Polo Ferroviário do Baixo Zambeze)',
    statusEn: 'Town Municipality (Lower Zambezi Rail Hub)',
    image: donaAnaImg,
    heroImage: donaAnaImg,
    location: 'Confluência Zambeze-Chire (Sede de Mutarara)',
    locationEn: 'Zambezi-Shire Confluence (Mutarara)',
    population: '45.000 habitantes',
    overview: 'A Vila de Nyamayabáue é a sede municipal do Distrito de Mutarara. Erguida junto à imponente Ponte Dona Ana, constitui um cruzamento geoestratégico que une o corredor ferroviário de Sena ao Malawi e ao Porto da Beira, com imenso potencial no agronegócio de várzea e na logística.',
    overviewEn: 'Nyamayabáue is the municipal center of Mutarara District. Flanked by the iconic Dona Ana Bridge, it forms a vital railway hub connecting the Sena Line to Malawi and Beira Port.',
    history: 'A vila ganhou projeção histórica com as obras da ferrovia de Sena na década de 1930. Desenvolveu-se como polo comercial de entreposto entre o vale do Zambeze e o Malawi. Foi elevada à categoria de município autárquico em 2013.',
    historyEn: 'Grew historically with the construction of the Sena Railway and the Dona Ana Bridge in the 1930s. Functioned as a key transit entrepôt, officially gaining municipal status in 2013.',
    economy: 'Serviços ferroviários e de transporte, comércio fluvial, pesca, comercialização de arroz e gergelim.',
    economyEn: 'Railway and freight services, river trade, commercial fishing, and rice/sesame trade.',
    strategicImportance: 'Controlo do nó ferroviário sul da Província de Tete e ponte de ligação com as províncias da Zambézia e Sofala.',
    strategicImportanceEn: 'Southern rail hub controlling freight flows into central Mozambique, Zambézia, and Sofala provinces.',
    infrastructure: 'Estação ferroviária da Linha de Sena, Ponte Dona Ana, cais de atracação fluvial, escolas e centro de saúde distrital.',
    infrastructureEn: 'Sena Railway Station, Dona Ana Bridge, river barge landing facilities, and district health center.',
    investmentPotential: 'Silos de arroz, plataformas de transferência de carga rodo-ferroviária, estaleiros de reparação naval fluvial e ecoturismo de observação no Rio Zambeze.',
    investmentPotentialEn: 'Rice milling and storage, rail-road cargo transshipment, riverboat maintenance, and scenic river ecotourism.',
    heritageCulture: 'Arquitetura ferroviária dos anos 1930, miradouro da Ponte Dona Ana e tradições dos pescadores do Zambeze e Chire.',
    curiosities: 'A travessia pedonal e ferroviária da Ponte Dona Ana permite caminhar durante quase 4 quilómetros sobre as águas do Rio Zambeze entre Tete e a Zambézia.',
    sources: ['Conselho Municipal de Nyamayabáue', 'MAE Moçambique', 'INE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'chitima',
    slug: 'chitima',
    name: 'Vila de Chitima',
    status: 'Município de Vila (Polo de Cahora Bassa)',
    statusEn: 'Town Municipality (Cahora Bassa Basin Hub)',
    image: hcbImg,
    heroImage: albufeiraImg,
    location: 'Vale de Cahora Bassa (Sede de Cahora Bassa)',
    locationEn: 'Cahora Bassa Basin (District Seat)',
    population: '38.000 habitantes',
    overview: 'A Vila de Chitima é a sede do Distrito de Cahora Bassa. Localizada no sopé do planalto de Songo, funciona como o centro administrativo e de serviços comerciais de suporte à bacia da albufeira, com forte ligação à indústria hidroelétrica, à pesca comercial e ao turismo lacustre.',
    overviewEn: 'Chitima is the municipal seat of Cahora Bassa District, situated at the base of the Songo plateau. It serves as the commercial and administrative service center for the dam reservoir, fisheries, and nautical tourism.',
    history: 'A vila expandiu-se como entreposto logístico durante a grande epopeia de construção da Barragem de Cahora Bassa. Consolidou a sua importância comercial e cívica, sendo formalmente elevada a município autárquico em 2023 no âmbito da expansão da descentralização em Moçambique.',
    historyEn: 'Expanded as a logistics staging hub during the construction of the Cahora Bassa Dam. Elevated to municipal authority status in 2023 under Mozambique’s decentralization reforms.',
    economy: 'Comércio de pescado fresco e seco, serviços de apoio à HCB, agricultura de sequeiro, pecuária caprina e comércio geral.',
    economyEn: 'Fish trade (fresh and sun-dried Kapenta/Tilapia), HCB support services, agriculture, goat farming, and retail.',
    strategicImportance: 'Ponto de acesso obrigatório à Barragem de Cahora Bassa, ao planalto de Songo e às praias fluviais da albufeira.',
    strategicImportanceEn: 'Primary road gateway to Cahora Bassa Dam, Songo plateau, and lakefront tourism spots.',
    infrastructure: 'Estrada asfaltada ligando à Estrada Nacional e à vila de Songo, rede elétrica de alta fidelidade ligada à central de Cahora Bassa e rede de abastecimento de água.',
    infrastructureEn: 'Paved highway linking to the national network and Songo, direct high-reliability power feed from HCB, and municipal water network.',
    investmentPotential: 'Centros de processamento e conservação de pescado, entrepostos frigoríficos, hotéis de trânsito para turistas e técnicos, postos de combustíveis e oficinas de barcos.',
    investmentPotentialEn: 'Cold storage fish processing, transit hotels for dam engineers and tourists, boat repair workshops, and retail commercial complexes.',
    heritageCulture: 'Cultura musical Nyungwe, feiras de Kapenta na beira do lago e artesanato em madeira e corda.',
    curiosities: 'De Chitima, a subida pela escarpada serra até à vila de Songo oferece uma das vistas panorâmicas mais impressionantes de todo o vale do Zambeze.',
    sources: ['Conselho Municipal de Chitima', 'Governo da Província de Tete', 'MAE Moçambique', 'Documento Oficial CIIT / Info.pdf']
  }
];

/* ==========================================================================
   FRONTEIRAS DE TETE: UMA PROVÍNCIA LIGADA À REGIÃO SADC
   Fontes: Autoridade Tributária de Moçambique, SADC Trade Protocols, Info.pdf
   ========================================================================== */

export const BORDERS_DETAILED_DATA: BorderDetail[] = [
  {
    id: 'malawi',
    country: 'Malawi',
    flag: '🇲🇼',
    borderLength: '~800 km',
    borderType: 'Fronteira Internacional Terrestre e Fluvial',
    borderTypeEn: 'International Land & River Border',
    borderPosts: [
      { name: 'Zóbuè / Mwanza', type: 'Principal Posto Aduaneiro Rodoviário', connectsTo: 'Blantyre / Sul do Malawi' },
      { name: 'Calómuè / Dedza', type: 'Posto Aduaneiro Agrícola e de Passageiros', connectsTo: 'Lilongwe / Planalto Central' },
      { name: 'Vila Nova de Fronteira / Marka', type: 'Posto Ferroviário e Rodoviário', connectsTo: 'Nsanje / Vale do Chire' },
      { name: 'Biriwiri / Tsangano', type: 'Posto Local de Trânsito Agrícola', connectsTo: 'Ntcheu' }
    ],
    commercialImportance: 'Malawi é um país encravado (landlocked) que depende estrategicamente dos corredores rodoviários e ferroviários de Tete para o acesso aos portos de Nacala e da Beira. Além disso, Moçambique exporta energia elétrica da HCB para a rede malawiana através do projeto de interligação energética Matambo-Phombeya.',
    commercialImportanceEn: 'Malawi is a landlocked nation heavily reliant on Tete’s road and rail arteries for sea access via Nacala and Beira ports. Mozambique also exports electrical power from HCB to the Malawian national grid via the Matambo-Phombeya interconnector.',
    logisticsImportance: 'Fluxo contínuo de camiões com combustíveis, fertilizantes, bens manufaturados, cimento e produtos alimentares. A Linha de Sena restabeleceu a ligação ferroviária direta.',
    logisticsImportanceEn: 'Continuous freight flows of fuel, fertilizer, manufactured goods, cement, and agricultural staples. The Sena Line provides direct rail connectivity.',
    history: 'As fronteiras entre Tete e a então Nyasaland britânica foram definidas pelos tratados luso-britânicos de 1891. Historicamente, os povos Chewa e Angoni partilham laços de parentesco e cultura que transcendem as fronteiras políticas, mantendo um intercâmbio comercial e humano vibrante há séculos.',
    historyEn: 'Borders with British Nyasaland were settled under the 1891 Anglo-Portuguese Treaty. Historically, Chewa and Angoni peoples share deep kinship and linguistic ties that have fostered centuries of cross-border trade.',
    tradeOpportunities: [
      'Exportação de energia elétrica e produtos siderúrgicos/cimento',
      'Serviços de trânsito aduaneiro e logística de combustíveis para Blantyre e Lilongwe',
      'Agro-comércio integrado de grãos e batata com tarifas SADC preferenciais',
      'Parques logísticos e terminais de carga nas fronteiras de Zóbuè e Calómuè'
    ],
    tradeOpportunitiesEn: [
      'Electricity and building materials / cement exports',
      'Fuel transit and customs clearing logistics for Blantyre and Lilongwe',
      'Integrated grain and potato commodity trade under SADC preferential tariffs',
      'Border logistics parks and transshipment terminals at Zóbuè and Calómuè'
    ],
    sources: ['Autoridade Tributária de Moçambique', 'SADC Secretariat', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'zambia',
    country: 'Zâmbia',
    flag: '🇿🇲',
    borderLength: '~350 km',
    borderType: 'Fronteira Internacional Terrestre e Fluvial',
    borderTypeEn: 'International Land & River Border',
    borderPosts: [
      { name: 'Cassacatiza / Chanida', type: 'Principal Posto Rodoviário Comercial', connectsTo: 'Katete / Chipata / Lusaka' },
      { name: 'Zumbo / Luangwa', type: 'Posto Fluvial / Fronteira Tripartida', connectsTo: 'Luangwa / Lusaka' }
    ],
    commercialImportance: 'A Zâmbia utiliza o Corredor de Tete como via de escoamento de minérios e importação de combustíveis e bens de capital a partir dos portos moçambicanos. A fronteira de Cassacatiza converteu-se num dos eixos comerciais de mais rápido crescimento na SADC.',
    commercialImportanceEn: 'Zambia utilizes the Tete transport corridor for mining export routing and capital imports from Mozambican seaports. Cassacatiza has emerged as one of the fastest-growing commercial gateways in SADC.',
    logisticsImportance: 'Ligação rodoviária direta entre a Província Oriental da Zâmbia e a rede viária de Moçambique, facilitando o transporte de fertilizantes, matérias-primas e gado.',
    logisticsImportanceEn: 'Direct paved highway link between Zambia’s Eastern Province and Mozambique’s transit network, enabling fertilizer, mineral, and livestock transport.',
    history: 'A fronteira foi delineada no final do século XIX entre Portugal e a Companhia Britânica da África do Sul (BSAC) de Cecil Rhodes. Durante a luta de libertação nacional, a Zâmbia do Presidente Kenneth Kaunda foi a grande retaguarda solidária que acolheu as bases da FRELIMO para abrir a vitoriosa Frente de Tete.',
    historyEn: 'Demarcated between Portugal and the British South Africa Company. During Mozambique’s liberation struggle, President Kenneth Kaunda’s Zambia provided decisive rear-base solidarity for FRELIMO’s Tete Front.',
    tradeOpportunities: [
      'Corredor de transporte de cobre e fertilizantes',
      'Interligação de redes elétricas no âmbito do Southern African Power Pool (SAPP)',
      'Fornecimento de calcário e cimento moçambicano para a construção civil zambiana',
      'Projetos agrícolas conjuntos de sementes e grãos'
    ],
    tradeOpportunitiesEn: [
      'Copper and mineral export transit corridor',
      'Power grid interconnection under the Southern African Power Pool (SAPP)',
      'Mozambican limestone and cement supply for Zambian construction industry',
      'Joint agribusiness and grain supply ventures'
    ],
    sources: ['Autoridade Tributária de Moçambique', 'Governo da Província de Tete', 'SADC Secretariat', 'Documento Oficial CIIT / Info.pdf']
  },
  {
    id: 'zimbabwe',
    country: 'Zimbabwe',
    flag: '🇿🇼',
    borderLength: '~250 km',
    borderType: 'Fronteira Internacional Terrestre',
    borderTypeEn: 'International Land Border',
    borderPosts: [
      { name: 'Cuchamano / Nyamapanda', type: 'Principal Posto Aduaneiro Rodoviário', connectsTo: 'Harare / Corredor N7' },
      { name: 'Mucumbura / Kanyemba', type: 'Posto Secundário do Vale', connectsTo: 'Mount Darwin / Mashonaland' }
    ],
    commercialImportance: 'O Corredor Tete-Harare através de Cuchamano/Nyamapanda é uma das rotas comerciais mais movimentadas da África Austral, canalizando o tráfego pesado entre o Zimbabwe, o Malawi e o centro-norte de Moçambique. Adicionalmente, a ZESA do Zimbabwe é um dos maiores importadores históricos de energia da Barragem de Cahora Bassa.',
    commercialImportanceEn: 'The Tete-Harare Corridor via Cuchamano/Nyamapanda is among Southern Africa’s busiest transport arteries, linking Zimbabwe with Malawi and northern Mozambique. Zimbabwe’s ZESA is a major long-term buyer of HCB electricity.',
    logisticsImportance: 'Estrada asfaltada N7 de alta capacidade para transporte internacional de contentores, combustível e carga pesada.',
    logisticsImportanceEn: 'High-capacity paved N7 international highway for containerized freight, fuel tankers, and bulk commodities.',
    history: 'As ligações entre Tete e o planalto zimbabueano remontam ao Império dos Mwenemutapas no século XV, cujas rotas do ouro e marfim convergiam para os rios Mazoe, Luenha e Zambeze. Na era moderna, o apoio mútuo durante as lutas de libertação (FRELIMO e ZANLA) consolidou laços de irmandade indestrutíveis.',
    historyEn: 'Ties with the Zimbabwean plateau date back to the 15th-century Mwenemutapa Empire. Modern brotherhood was cemented through mutual solidarity between FRELIMO and ZANLA liberation forces.',
    tradeOpportunities: [
      'Abastecimento contínuo de energia elétrica e gás',
      'Serviços de trânsito rodoviário e logística de entreposto em Changara',
      'Comércio de gado, carnes e produtos agropecuários certificados',
      'Desenvolvimento de infraestruturas turísticas transfronteiriças de conservação'
    ],
    tradeOpportunitiesEn: [
      'Stable electricity supply contracts and energy infrastructure',
      'Freight logistics and transit warehouse facilities in Changara',
      'Trade in livestock, processed meats, and certified agricultural goods',
      'Cross-border wildlife conservation and ecotourism corridors'
    ],
    sources: ['Autoridade Tributária de Moçambique', 'SADC Secretariat', 'Documento Oficial CIIT / Info.pdf']
  }
];

/* ==========================================================================
   LINHA DO TEMPO: HISTÓRIA DE TETE (8 ERAS FUNDAMENTAIS)
   Fontes: Arquivo Histórico de Moçambique, Publicações Académicas, MAE
   ========================================================================== */

export const TETE_HISTORY_TIMELINE: TimelineEvent[] = [
  {
    id: 'era-1',
    period: 'Séculos XIV – XVI',
    title: 'Período Pré-Colonial & Reinos Tradicionais',
    titleEn: 'Pre-Colonial Era & Traditional Kingdoms',
    description: 'A bacia do Rio Zambeze constituía a artéria central do Império dos Mwenemutapas e dos Estados Maraves. Os povos locais desenvolviam mineração e metalurgia de ouro e ferro, agricultura de várzea e um florescente comércio fluvial que se conectava às rotas do Oceano Índico através de mercadores suaílis-árabes.',
    descriptionEn: 'The Zambezi River basin formed the economic artery of the Mwenemutapa Empire and Maravi Kingdoms. Indigenous societies engaged in gold and iron metallurgy, agriculture, and river trade connected to Indian Ocean Swahili merchant networks.',
    highlight: 'Metalurgia de ouro e ferro e rotas fluviais do Zambeze'
  },
  {
    id: 'era-2',
    period: '1531 – 1761',
    title: 'Feitorias Coloniais & Forte de São Tiago Maior',
    titleEn: 'Colonial Feitorias & São Tiago Fort',
    description: 'Em 1531, os portugueses estabeleceram a Feitoria de Tete no local de um antigo entreposto africano. Em 1585 foi erguido o imponente Forte de São Tiago Maior para proteger as rotas de ouro. Tete foi formalmente elevada à categoria de Vila em 1761, tornando-se o coração administrativo dos Prazos do Zambeze.',
    descriptionEn: 'In 1531, Portuguese traders established the Tete Feitoria atop indigenous trading posts. The Fort of São Tiago Maior was built in 1585. Tete was formally chartered as a town in 1761, anchoring the Zambezi crown-estates (Prazos).',
    highlight: 'Fundação da feitoria em 1531 e elevação a Vila em 1761'
  },
  {
    id: 'era-3',
    period: 'Século XIX (1850–1898)',
    title: 'Expedições Científicas e Mapeamento de Recursos',
    titleEn: 'Scientific Expeditions & Mineral Mapping',
    description: 'O célebre explorador David Livingstone navegou o Rio Zambeze e documentou cientificamente as jazidas de carvão em Moatize e as corredeiras de Kebrabasa. Os tratados de fronteiras com a Grã-Bretanha (1891) fixaram os limites internacionais de Tete com a Rodésia e a Niassalândia.',
    descriptionEn: 'David Livingstone explored the Zambezi, scientifically documenting Moatize’s vast coal deposits and the Kebrabasa rapids. The 1891 Anglo-Portuguese treaties fixed Tete’s international borders with Rhodesia and Nyasaland.',
    highlight: 'Descoberta científica das bacias carboníferas por Livingstone'
  },
  {
    id: 'era-4',
    period: '1930 – 1968',
    title: 'Construção da Linha de Sena e Início da Mineração',
    titleEn: 'Sena Railway & Early Mining Industry',
    description: 'A construção da colossal Ponte Dona Ana sobre o Zambeze (1935) e da Linha Férrea de Sena viabilizou as primeiras exportações industriais de carvão de Moatize e açúcar do vale. Em 21 de Março de 1959, Tete foi oficialmente elevada ao estatuto de Cidade.',
    descriptionEn: 'The completion of the monumental Dona Ana Bridge (1935) and Sena Railway enabled Moatize’s first industrial coal exports. On March 21, 1959, Tete was formally proclaimed a City.',
    highlight: 'Ponte Dona Ana e elevação de Tete a Cidade em 1959'
  },
  {
    id: 'era-5',
    period: '1968 – 1974',
    title: 'Luta de Libertação Nacional & Frente de Tete',
    titleEn: 'National Liberation Struggle & Tete Front',
    description: 'A Frente de Tete, aberta pela FRELIMO em Março de 1968 a partir da Zâmbia, desempenhou papel militar e estratégico decisivo no colapso do colonialismo português. A determinação das forças guerrilheiras e a solidariedade das populações locais aceleraram a vitória da independência.',
    descriptionEn: 'Opened by FRELIMO in March 1968 from Zambian rear-bases, the Tete Front played a decisive military and strategic role in dismantling Portuguese colonialism, leading to national sovereignty.',
    highlight: 'Abertura histórica da Frente de Tete pela FRELIMO em 1968'
  },
  {
    id: 'era-6',
    period: '1975 – 2006',
    title: 'Independência e Operacionalização de Cahora Bassa',
    titleEn: 'Independence & Cahora Bassa Operations',
    description: 'Com a proclamação da Independência Nacional em 25 de Junho de 1975, iniciou-se a estruturação da Província de Tete. A Central Hidroelétrica de Cahora Bassa (HCB) começou a operar, transformando a província no pilar energético da África Austral.',
    descriptionEn: 'Following Mozambique’s independence on June 25, 1975, Tete was established as a sovereign province. The Cahora Bassa dam commenced operations, turning Tete into Southern Africa’s premier energy reservoir.',
    highlight: 'Início da geração em grande escala na Barragem de Cahora Bassa'
  },
  {
    id: 'era-7',
    period: '27 de Novembro de 2007',
    title: 'A Histórica Reversão da HCB para Moçambique',
    titleEn: 'Historic Reversion of HCB to Mozambican Control',
    description: 'Em cerimónia memorável na vila de Songo, o Presidente da República Armando Emílio Guebuza formalizou a transferência do controlo acionista maioritário da Hidroelétrica de Cahora Bassa para o Estado Moçambicano, proclamando o ato como a "Segunda Independência Nacional".',
    descriptionEn: 'In a historic ceremony at Songo, the Mozambican state acquired majority control of Hidroelétrica de Cahora Bassa from Portugal, heralded as the nation’s "Second Independence".',
    highlight: 'Reversão oficial do controlo de Cahora Bassa para o Estado'
  },
  {
    id: 'era-8',
    period: '2010 – 2026+',
    title: 'Boom Mineral, Megaprojetos e Transição Energética',
    titleEn: 'Mineral Boom, Megaprojects & Clean Energy Hub',
    description: 'Entrada em operação dos megaprojetos de carvão de Moatize, duplicação dos corredores ferroviários de Nacala e Sena, inauguração da Ponte Kassuende (2014) e estruturação do projeto Mphanda Nkuwa (1.500 MW), consolidando Tete como o polo de investimento de maior atratividade de Moçambique.',
    descriptionEn: 'Commercial operation of world-class Moatize coal concessions, modernization of Nacala and Sena heavy rail corridors, opening of Kassuende Bridge (2014), and development of Mphanda Nkuwa Hydro (1,500 MW).',
    highlight: 'CIIT 2026: Tete como epicentro do investimento sustentável'
  }
];

/* ==========================================================================
   PONTOS DO MAPA INTERATIVO DE TETE
   ========================================================================== */

export const INTERACTIVE_MAP_POINTS: MapPoint[] = [
  // Distritos
  { id: 'angonia', name: 'Angónia', type: 'district', x: 74, y: 32, district: 'Angónia', info: 'Planalto fértil, maior celeiro agrícola e batata-reno.' },
  { id: 'cahora-bassa', name: 'Cahora Bassa', type: 'district', x: 42, y: 55, district: 'Cahora Bassa', info: 'Central HCB (2.075 MW), Albufeira e Pesca de Kapenta.' },
  { id: 'changara', name: 'Changara', type: 'district', x: 50, y: 72, district: 'Changara', info: 'Capital da pecuária (Cabrito de Tete) e fronteira de Cuchamano.' },
  { id: 'chifunde', name: 'Chifunde', type: 'district', x: 62, y: 22, district: 'Chifunde', info: 'Fronteira com Zâmbia e Malawi, recursos florestais e tabaco.' },
  { id: 'chiuta', name: 'Chiúta', type: 'district', x: 58, y: 44, district: 'Chiúta', info: 'Minério de ferro, calcários industriais e agricultura.' },
  { id: 'cidade-de-tete', name: 'Cidade de Tete', type: 'district', x: 56, y: 64, district: 'Cidade de Tete', info: 'Capital provincial, Pontes Samora Machel e Kassuende.' },
  { id: 'doa', name: 'Dôa', type: 'district', x: 72, y: 76, district: 'Dôa', info: 'Bacia carbonífera do Baixo Zambeze e Linha de Sena.' },
  { id: 'macanga', name: 'Macanga', type: 'district', x: 68, y: 28, district: 'Macanga', info: 'Furancungo, ouro aluvionar e produção de cereais.' },
  { id: 'magoe', name: 'Mágoè', type: 'district', x: 30, y: 62, district: 'Mágoè', info: 'Parque Nacional de Mágoè, fauna bravia e pesca.' },
  { id: 'maravia', name: 'Marávia', type: 'district', x: 38, y: 36, district: 'Marávia', info: 'Maior distrito, minério de ferro de Fíngoè e fronteira Cassacatiza.' },
  { id: 'moatize', name: 'Moatize', type: 'district', x: 62, y: 60, district: 'Moatize', info: 'Mega-mineração de carvão mineral, Corredores de Sena e Nacala.' },
  { id: 'mutarara', name: 'Mutarara', type: 'district', x: 80, y: 88, district: 'Mutarara', info: 'Confluência Zambeze-Chire e histórica Ponte Dona Ana.' },
  { id: 'tsangano', name: 'Tsangano', type: 'district', x: 76, y: 42, district: 'Tsangano', info: 'Planalto frio, trigo, batata e horticultura comercial.' },
  { id: 'zumbo', name: 'Zumbo', type: 'district', x: 14, y: 46, district: 'Zumbo', info: 'Ponto mais ocidental, Tríplice Fronteira e feitoria de 1720.' },

  // Municípios
  { id: 'mun-tete', name: 'Mun. Cidade de Tete', type: 'municipality', x: 56, y: 64, info: 'Capital Provincial e centro financeiro corporativo.' },
  { id: 'mun-moatize', name: 'Mun. Cidade de Moatize', type: 'municipality', x: 62, y: 60, info: 'Polo industrial da mineração de carvão mineral.' },
  { id: 'mun-ulongue', name: 'Mun. Vila de Ulónguè', type: 'municipality', x: 74, y: 32, info: 'Capital comercial agrícola do Planalto de Angónia.' },
  { id: 'mun-nyamayabaue', name: 'Mun. Vila de Nyamayabáue', type: 'municipality', x: 80, y: 88, info: 'Polo ferroviário de Mutarara e Ponte Dona Ana.' },
  { id: 'mun-chitima', name: 'Mun. Vila de Chitima', type: 'municipality', x: 42, y: 55, info: 'Sede municipal da bacia de Cahora Bassa.' },

  // Fronteiras
  { id: 'border-malawi-zobue', name: 'Fronteira Zóbuè (Malawi)', type: 'border', x: 70, y: 56, info: 'Principal rota rodoviária comercial para Blantyre.' },
  { id: 'border-malawi-calomue', name: 'Fronteira Calómuè (Malawi)', type: 'border', x: 76, y: 30, info: 'Rota agrícola para Dedza e Lilongwe.' },
  { id: 'border-zambia-cassacatiza', name: 'Fronteira Cassacatiza (Zâmbia)', type: 'border', x: 40, y: 24, info: 'Corredor rodoviário para Katete, Chipata e Lusaka.' },
  { id: 'border-zimbabwe-cuchamano', name: 'Fronteira Cuchamano (Zimbabwe)', type: 'border', x: 44, y: 78, info: 'Corredor N7 para Harare.' },
  { id: 'border-tripoint-zumbo', name: 'Tríplice Fronteira Zumbo', type: 'border', x: 12, y: 44, info: 'Confluência Zambeze-Luangwa (Moçambique-Zâmbia-Zimbabwe).' },

  // Megaprojetos
  { id: 'proj-hcb', name: 'Central Hidroelétrica HCB', type: 'project', x: 42, y: 52, info: '2.075 MW de capacidade instalada no Zambeze.' },
  { id: 'proj-mphanda-nkuwa', name: 'Hidroelétrica Mphanda Nkuwa', type: 'project', x: 48, y: 58, info: '1.500 MW a jusante de Cahora Bassa.' },
  { id: 'proj-moatize-coal', name: 'Minas de Carvão de Moatize', type: 'project', x: 64, y: 58, info: '20+ mil milhões de toneladas de reservas.' },
  { id: 'proj-porto-seco', name: 'Porto Seco de Moatize', type: 'project', x: 63, y: 62, info: 'Terminal ferroviário e alfandegário de granéis.' },

  // Recursos Chave
  { id: 'res-pesca-albufeira', name: 'Pesca de Kapenta e Tilápia', type: 'resource', x: 36, y: 50, info: '2.700 km² de biomassa aquícola na Albufeira.' },
  { id: 'res-agro-angonia', name: 'Planalto Agrícola de Angónia', type: 'resource', x: 75, y: 34, info: 'Solos férteis e microclima temperado para hortícolas.' },
  { id: 'res-ferro-fingoe', name: 'Minério de Ferro de Fíngoè', type: 'resource', x: 38, y: 34, info: 'Depósitos maciços de ferro titanífero em Marávia.' },
  { id: 'res-parque-magoe', name: 'Parque Nacional de Mágoè', type: 'resource', x: 28, y: 64, info: '3.500 km² de conservação de fauna bravia.' }
];

export const TETE_MAP_POINTS = INTERACTIVE_MAP_POINTS;

