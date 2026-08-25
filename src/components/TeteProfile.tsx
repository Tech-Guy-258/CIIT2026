/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import cahoraBassaDamImg from '../assets/images/HCB.jpg';
import cahoraBassaLakeImg from '../assets/images/ABCB.jpg';
import tchumaTchatoImg from '../assets/images/Area_de_Conservacao_Tchuma_Tchato.jpg';
import samoraMachelBridgeImg from '../assets/images/ponte samora machel em tete.jpg';
import kassuendeBridgeImg from '../assets/images/Ponte_Kassuende.jpg';
import donaAnaBridgeImg from '../assets/images/Ponte dona ana.jpg';
import magoeParkImg from '../assets/images/magoe_national_park_antelopes_1784878851948.jpg';
import missaoBoromaImg from '../assets/images/BRM.jpg';
import { 
  MapPin, 
  ExternalLink, 
  Compass, 
  Landmark, 
  Utensils, 
  Waves, 
  Mountain, 
  Camera, 
  Info, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Building2, 
  Sun,
  ShieldAlert,
  Award,
  Sparkles,
  TreePine,
  Anchor,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TeteProfileProps {
  lang: 'pt' | 'en';
}

export default function TeteProfile({ lang }: TeteProfileProps) {
  const [activeTab, setActiveTab] = useState<'attractions' | 'geography' | 'districts' | 'sources'>('attractions');
  const [filterType, setFilterType] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Attractions data sourced from Visit Mozambique (visitmozambique.gov.mz/onde-ir/provincias/tete/) & Local Historical Monuments
  const attractions = [
    {
      id: 'albufeira-cahora-bassa',
      title: lang === 'pt' ? 'Albufeira de Cahora Bassa' : 'Lake Cahora Bassa Reservoir',
      category: 'nature_engineering',
      categoryLabel: lang === 'pt' ? 'Lago & Natureza' : 'Lake & Nature',
      location: 'Distrito de Cahora-Bassa',
      image: cahoraBassaLakeImg,
      description: lang === 'pt'
        ? 'A maior albufeira artificial da África Austral, estendendo-se por mais de 270 km de comprimento. Um verdadeiro mar interior rodeado por desfiladeiros majestosos, ideal para cruzeiros, passeios de barco e turismo aquático.'
        : 'The largest artificial reservoir in Southern Africa, extending over 270 km long. An inland sea surrounded by majestic gorges, ideal for lake cruises and water tourism.',
      highlights: [
        lang === 'pt' ? 'Pesca desportiva do Peixe-Tigre' : 'Tiger Fish sport fishing',
        lang === 'pt' ? 'Passeios de barco ao entardecer' : 'Sunset boat cruises',
        lang === 'pt' ? 'Extensão de mais de 270 km' : 'Over 270 km in length'
      ]
    },
    {
      id: 'barragem-cahora-bassa',
      title: lang === 'pt' ? 'Barragem de Cahora Bassa' : 'Cahora Bassa Hydroelectric Dam',
      category: 'nature_engineering',
      categoryLabel: lang === 'pt' ? 'Engenharia Monumental' : 'Engineering Marvel',
      location: 'Songo / Distrito de Cahora-Bassa',
      image: cahoraBassaDamImg,
      description: lang === 'pt'
        ? 'Uma das maiores obras de engenharia do século XX e o motor energético da África Austral. Construída na garganta do Rio Zambeze, gera 2.075 MW de energia limpa com paredes de betão de 171 metros de altura.'
        : 'One of the greatest engineering feats of the 20th century. Built in the Zambezi River gorge, generating 2,075 MW of clean hydroelectric power with 171-meter high dam walls.',
      highlights: [
        lang === 'pt' ? 'Muralhas de betão de 171 metros' : '171-meter high concrete walls',
        lang === 'pt' ? 'Capacidade de 2.075 MW de energia' : '2,075 MW power output',
        lang === 'pt' ? 'Visitas guiadas ao centro técnico' : 'Technical center guided tours'
      ]
    },
    {
      id: 'tchuma-tchato',
      title: lang === 'pt' ? 'Área de Conservação Tchuma Tchato' : 'Tchuma Tchato Conservation Area',
      category: 'wildlife',
      categoryLabel: lang === 'pt' ? 'Conservação Comunitária' : 'Community Conservation',
      location: 'Distritos de Mágoè e Zumbo',
      image: tchumaTchatoImg,
      description: lang === 'pt'
        ? 'Pioneiro projeto de gestão comunitária de recursos naturais nas margens do Rio Zambeze e de Cahora Bassa. Une o ecoturismo sustentável, safaris fotográficos e o desenvolvimento económico das comunidades locais.'
        : 'A pioneering community-based natural resource management project along the Zambezi River and Lake Cahora Bassa, combining sustainable ecotourism, photo safaris, and local development.',
      highlights: [
        lang === 'pt' ? 'Gestão comunitária sustentável' : 'Community eco-management',
        lang === 'pt' ? 'Observação de hipopótamos e crocodilos' : 'Hippo and crocodile watching',
        lang === 'pt' ? 'Safaris fotográficos no Zambeze' : 'Zambezi photo safaris'
      ]
    },
    {
      id: 'ponte-samora-machel',
      title: lang === 'pt' ? 'Ponte Samora Machel (Cidade de Tete)' : 'Samora Machel Suspension Bridge',
      category: 'bridges',
      categoryLabel: lang === 'pt' ? 'Ícone Urbano' : 'Suspension Bridge',
      location: 'Cidade de Tete',
      image: samoraMachelBridgeImg,
      description: lang === 'pt'
        ? 'Inaugurada em 1973, é uma imponente ponte suspensa rodoviária com 762 metros de extensão sobre o Rio Zambeze. Considerada o cartão de visita e ex-libris arquitetónico mais emblemático da Cidade de Tete.'
        : 'Opened in 1973, this iconic 762-meter long suspension bridge spans the Zambezi River. It stands as Tete City\'s most famous architectural postcard landmark.',
      highlights: [
        lang === 'pt' ? '762 metros de vão suspenso' : '762-meter suspended span',
        lang === 'pt' ? 'Iluminação noturna espetacular' : 'Spectacular night lighting',
        lang === 'pt' ? 'Símbolo arquitetónico de Tete' : 'Architectural icon of Tete'
      ]
    },
    {
      id: 'ponte-kassuende',
      title: lang === 'pt' ? 'Ponte Kassuende' : 'Kassuende Bridge',
      category: 'bridges',
      categoryLabel: lang === 'pt' ? 'Engenharia Moderna' : 'Modern Bridge',
      location: 'Cidade de Tete / Moatize',
      image: kassuendeBridgeImg,
      description: lang === 'pt'
        ? 'Inaugurada em 2014, é a segunda grande ponte rodoviária sobre o Zambeze em Tete, com 1.586 metros de comprimento. Crucial para o tráfego internacional de carga do Corredor da SADC.'
        : 'Inaugurated in 2014, this 1,586-meter modern bridge spans the Zambezi, serving as a critical international transit arterial for the SADC corridor.',
      highlights: [
        lang === 'pt' ? '1.586 metros de extensão moderna' : '1,586 meters modern span',
        lang === 'pt' ? 'Artéria do Corredor da SADC' : 'SADC trade corridor arterial',
        lang === 'pt' ? 'Miradouro para o perfil urbano' : 'Skyline view of Tete city'
      ]
    },
    {
      id: 'ponte-dona-ana',
      title: lang === 'pt' ? 'Ponte Dona Ana (Mutarara)' : 'Dona Ana Rail Bridge (Mutarara)',
      category: 'bridges',
      categoryLabel: lang === 'pt' ? 'Património Ferroviário' : 'Historic Rail Bridge',
      location: 'Distrito de Mutarara / Vila de Sena',
      image: donaAnaBridgeImg,
      description: lang === 'pt'
        ? 'Uma das pontes ferroviárias mais longas de África, com 3,75 km de comprimento. Construída na década de 1930 para a linha do Dondo ao Malawi, cruza o baixo Zambeze unindo Tete a Sofala.'
        : 'One of the longest railway bridges in Africa, stretching 3.75 km across the lower Zambezi River. Built in the 1930s, it connects Tete to Sofala and Malawi.',
      highlights: [
        lang === 'pt' ? '3,75 km de extensão ferroviária' : '3.75 km railway length',
        lang === 'pt' ? 'Património de engenharia do século XX' : '20th-century engineering landmark',
        lang === 'pt' ? 'Vista panorâmica do Baixo Zambeze' : 'Panorama over lower Zambezi'
      ]
    },
    {
      id: 'fortaleza-sao-tiago',
      title: lang === 'pt' ? 'Fortaleza de São Tiago Maior (Fortim de Tete)' : 'Fort St. James the Greater',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'História Colonial' : 'Colonial Fortress',
      location: 'Centro Histórico da Cidade de Tete',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Fortificação militar erguida nas margens do Zambeze durante o período colonial para proteção da feitoria e das rotas fluviais de comércio de ouro e marfim.'
        : 'Historic military fort constructed on the banks of the Zambezi River to protect trade routes and river trading posts during colonial times.',
      highlights: [
        lang === 'pt' ? 'Muralhas e baluartes de pedra' : 'Stone walls and bastions',
        lang === 'pt' ? 'Localização histórica na marginal' : 'Waterfront historical setting',
        lang === 'pt' ? 'Vista para o Rio Zambeze' : 'Zambezi River overlook'
      ]
    },
    {
      id: 'fortaleza-dom-luis',
      title: lang === 'pt' ? 'Fortaleza Dom Luis V' : 'Dom Luis V Fortress',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Arquitetura Militar' : 'Military Fort',
      location: 'Província de Tete',
      image: 'https://images.unsplash.com/photo-1599598425947-030648873618?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Forte militar construído na segunda metade do século XIX em honra ao Rei D. Luís V de Portugal, marcando a soberania e a defesa da navegação no Alto Zambeze.'
        : '19th-century military fort built in honor of King Dom Luis V, marking administrative sovereignty and navigation defense along the Upper Zambezi.',
      highlights: [
        lang === 'pt' ? 'Fortificação militar secular' : 'Secular military fortification',
        lang === 'pt' ? 'Património histórico arquivístico' : 'Archival heritage site',
        lang === 'pt' ? 'Memória das expedições fluviais' : 'River expedition memory'
      ]
    },
    {
      id: 'catedral-tete',
      title: lang === 'pt' ? 'Catedral de Tete (São Tiago Maior)' : 'Tete Cathedral (St. James the Greater)',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Arquitetura Religiosa' : 'Religious Landmark',
      location: 'Cidade de Tete',
      image: 'https://images.unsplash.com/photo-1548625361-183610992769?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Sede episcopal da Diocese de Tete, edificada no século XIX. Apresenta uma elegante fachada neoclássica e acolhe as celebrações ao padroeiro São Tiago Maior.'
        : 'Cathedral church of the Diocese of Tete built in the 19th century, featuring elegant neoclassical colonial architecture facing the river district.',
      highlights: [
        lang === 'pt' ? 'Fachada histórica bem conservada' : 'Preserved historic facade',
        lang === 'pt' ? 'Centro religioso e cultural' : 'Religious and cultural hub',
        lang === 'pt' ? 'Próxima da marginal dos baobás' : 'Close to baobab riverfront'
      ]
    },
    {
      id: 'carro-de-ferro',
      title: lang === 'pt' ? 'Carro de Ferro (Cidade de Tete)' : 'Historical Iron Locomotive',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Património Industrial' : 'Industrial Heritage',
      location: 'Centro da Cidade de Tete',
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Relíquia histórica preservada que simboliza os primórdios do transporte mecânico e da atividade mineradora e ferroviária no Vale do Zambeze.'
        : 'Preserved historical iron rail vehicle symbolizing the birth of mechanized transport and mining logistics in the Zambezi Valley.',
      highlights: [
        lang === 'pt' ? 'Monumento à memória industrial' : 'Industrial history monument',
        lang === 'pt' ? 'Ponto de interesse no centro urbano' : 'Urban center photo spot',
        lang === 'pt' ? 'Legado ferroviário de Tete' : 'Rail legacy of Tete'
      ]
    },
    {
      id: 'casa-de-pedra-macanga',
      title: lang === 'pt' ? 'Casa de Pedra de Macanga' : 'Stone House of Macanga',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Património em Pedra' : 'Stone Heritage',
      location: 'Distrito de Macanga (Furancungo)',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Edificação histórica construída inteiramente em alvenaria de pedra nos planaltos agrícolas e mineiros do norte de Tete, servindo de entreposto e residência fortificada.'
        : 'Historical building constructed entirely of stone masonry on the northern plateaus of Tete, serving as an ancient trade post and fortified residence.',
      highlights: [
        lang === 'pt' ? 'Construção tradicional em pedra' : 'Traditional stone construction',
        lang === 'pt' ? 'Clima planáltico de Furancungo' : 'Highland plateau climate',
        lang === 'pt' ? 'Monumento do distrito de Macanga' : 'Macanga district landmark'
      ]
    },
    {
      id: 'confluencia-zambeze',
      title: lang === 'pt' ? 'Confluência do Rio Zambeze (Luenha & Luangwa)' : 'Zambezi River Confluence',
      category: 'nature_engineering',
      categoryLabel: lang === 'pt' ? 'Fenómeno Natural' : 'Natural Confluence',
      location: 'Tete, Changara & Zumbo',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'O impressionante espetáculo natural do encontro das águas dos grandes afluentes (Rios Luenha e Luangwa) com o majestoso Rio Zambeze, oferecendo paisagens ribeirinhas inesquecíveis.'
        : 'The impressive natural spectacle where major tributaries (Luenha and Luangwa rivers) join the Zambezi, creating breathtaking riverfront landscapes.',
      highlights: [
        lang === 'pt' ? 'Encontro das cores das águas' : 'Meeting of different water tones',
        lang === 'pt' ? 'Passeios de piroga tradicional' : 'Traditional canoe rides',
        lang === 'pt' ? 'Abundância de avifauna e peixe' : 'Rich birdlife and fishing'
      ]
    },
    {
      id: 'mazimbabwe-songo',
      title: lang === 'pt' ? 'Mazimbabwe do Songo (Cahora Bassa)' : 'Songo Mazimbabwe Stone Ruins',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Arqueologia Pré-Colonial' : 'Archaeological Ruins',
      location: 'Planalto do Songo / Cahora Bassa',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Ruínas arqueológicas de muralhas de pedra sem argamassa associadas à civilização do Grande Zimbábue e aos antigos reinos do Estado do Mwenemutapa (Monomotapa).'
        : 'Pre-colonial dry-stone wall archaeological ruins linked to the Great Zimbabwe civilization and the ancient Mwenemutapa Monomotapa Kingdom.',
      highlights: [
        lang === 'pt' ? 'Muralhas de pedra seca pré-coloniais' : 'Pre-colonial dry-stone walls',
        lang === 'pt' ? 'Legado do Império de Monomotapa' : 'Mwenemutapa Empire legacy',
        lang === 'pt' ? 'Sítio arqueológico sagrado' : 'Sacred archaeological site'
      ]
    },
    {
      id: 'missao-boroma',
      title: lang === 'pt' ? 'Missão de Boroma' : 'Boroma Historical Jesuit Mission',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Património Histórico' : 'Historic Heritage',
      location: 'Boroma (~30 km da Cidade de Tete)',
      image: missaoBoromaImg,
      description: lang === 'pt'
        ? 'Fundada em 1885 por padres Jesuítas, a Missão de Boroma é um tesouro arquitetónico em pedra no alto de uma colina sobre o Zambeze, com igreja monumental e antigo colégio.'
        : 'Founded in 1885 by Jesuit missionaries, Boroma Mission is a hilltop stone architectural treasure overlooking the Zambezi, with a grand church and historical college.',
      highlights: [
        lang === 'pt' ? 'Igreja monumental em pedra de 1885' : 'Monumental 1885 stone church',
        lang === 'pt' ? 'Vista panorâmica sobre o Zambeze' : 'Panorama over Zambezi Valley',
        lang === 'pt' ? 'Património cultural e educativo' : 'Cultural and educational heritage'
      ]
    },
    {
      id: 'monumento-zintambira',
      title: lang === 'pt' ? 'Monumento Zintambira' : 'Zintambira Cultural Monument',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Memória Cultural' : 'Cultural Landmark',
      location: 'Distrito de Macanga / Angónia',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Santuário e monumento comemorativo que evoca as lutas de resistência e os valores socioculturais tradicionais dos povos locais da região norte de Tete.'
        : 'Commemorative monument and cultural shrine honoring local resistance history and traditional socio-cultural heritage of northern Tete.',
      highlights: [
        lang === 'pt' ? 'Marco de identidade cultural local' : 'Local identity landmark',
        lang === 'pt' ? 'Homenagem aos líderes tradicionais' : 'Tribute to traditional leaders',
        lang === 'pt' ? 'Turismo cultural e antropológico' : 'Cultural & anthropological tourism'
      ]
    },
    {
      id: 'monumento-liberdade',
      title: lang === 'pt' ? 'Monumento da Liberdade' : 'Liberty Monument',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Símbolo Cívico' : 'Civic Monument',
      location: 'Praça Central da Cidade de Tete',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Monumento cívico erguido no centro da cidade para celebrar a independência nacional, a soberania do povo moçambicano e os heróis da pátria.'
        : 'Civic monument built in central Tete celebrating national independence, Mozambique\'s sovereignty, and national heroes.',
      highlights: [
        lang === 'pt' ? 'Local de atos solenes e cívicos' : 'Site for official ceremonies',
        lang === 'pt' ? 'Símbolo da independência nacional' : 'National independence symbol',
        lang === 'pt' ? 'Espaço público no coração da cidade' : 'Public landmark in city center'
      ]
    },
    {
      id: 'monumento-francisco-manyanga',
      title: lang === 'pt' ? 'Monumento Francisco Manyanga' : 'Francisco Manyanga Monument',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Herói Nacional' : 'National Hero',
      location: 'Cidade de Tete',
      image: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Homenagem ao patrono e comandante militar Francisco Manyanga, um dos principais estrategas da Luta Armada de Libertação Nacional na Província de Tete.'
        : 'Memorial dedicated to Commander Francisco Manyanga, a prominent strategist of the National Liberation Armed Struggle in Tete Province.',
      highlights: [
        lang === 'pt' ? 'Homenagem ao herói nacional' : 'Tribute to national hero',
        lang === 'pt' ? 'Preservação da memória histórica' : 'Historical memory preservation',
        lang === 'pt' ? 'Património educativo de Tete' : 'Educational heritage landmark'
      ]
    },
    {
      id: 'monumento-wiriyamu',
      title: lang === 'pt' ? 'Monumento Mártires de Wiriyamu' : 'Wiriyamu Martyrs Memorial',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Santuário de Memória' : 'Memorial Shrine',
      location: 'Povoado de Wiriyamu / Changara',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Santuário histórico e memorial solene em homenagem às centenas de vítimas civis do Massacre de Wiriyamu (1972). Um local de peregrinação, paz e memória histórica internacional.'
        : 'Solemn historic memorial honoring the hundreds of civilian victims of the Wiriyamu Massacre (1972). A international pilgrimage site for peace and memory.',
      highlights: [
        lang === 'pt' ? 'Memorial das vítimas de Wiriyamu' : 'Memorial for Wiriyamu victims',
        lang === 'pt' ? 'Turismo de memória histórica e paz' : 'Peace and history memory tourism',
        lang === 'pt' ? 'Sítio histórico de alcance internacional' : 'International historic site'
      ]
    },
    {
      id: 'monumento-sandawana',
      title: lang === 'pt' ? 'Monumento Sandawana' : 'Sandawana Monument',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Lenda & Tradição' : 'Folklore & Legend',
      location: 'Província de Tete',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Marco histórico cultural e místico associado ao folclore, à prospeção mineral e às lendas populares que povoam a tradição oral da Província de Tete.'
        : 'Cultural and mystical monument associated with mineral folklore and oral legends passed down through generations in Tete.',
      highlights: [
        lang === 'pt' ? 'Património imaterial de Tete' : 'Intangible heritage of Tete',
        lang === 'pt' ? 'Lenda dos minerais preciosos' : 'Precious mineral legends',
        lang === 'pt' ? 'Atração da cultura popular' : 'Folk culture attraction'
      ]
    },
    {
      id: 'praca-armando-guebuza',
      title: lang === 'pt' ? 'Praça Armando Emílio Guebuza' : 'Armando Guebuza Central Square',
      category: 'heritage',
      categoryLabel: lang === 'pt' ? 'Praça Urbana' : 'Urban Square',
      location: 'Centro Urbano da Cidade de Tete',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Acolhedor espaço público e praça cívica arborizada no centro da cidade, ideal para passeios ao ar livre sob a sombra de baobás centenários.'
        : 'Welcoming public square in the city center surrounded by shaded avenues and century-old baobab trees, ideal for city walks.',
      highlights: [
        lang === 'pt' ? 'Jardins e sombra de baobás' : 'Gardens and baobab shade',
        lang === 'pt' ? 'Ponto de encontro urbano' : 'Urban meeting point',
        lang === 'pt' ? 'Anfiteatro e eventos cívicos' : 'Amphitheater for civic events'
      ]
    },
    {
      id: 'monte-caloeira',
      title: lang === 'pt' ? 'Monte Caloeira' : 'Mount Caloeira Peak',
      category: 'mountains',
      categoryLabel: lang === 'pt' ? 'Montanha & Ecoturismo' : 'Mountain & Hiking',
      location: 'Província de Tete',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'Imponente elevação montanhosa de relevo acentuado, procurada por praticantes de caminhadas, montanhismo e entusiastas de fotografia de paisagens panorâmicas.'
        : 'Striking mountain peak with rugged terrain, popular among hikers, mountain climbers, and landscape photography enthusiasts.',
      highlights: [
        lang === 'pt' ? 'Trilhas de caminhada e aventura' : 'Adventure hiking trails',
        lang === 'pt' ? 'Vistas panorâmicas do planalto' : 'Plateau panoramic viewpoints',
        lang === 'pt' ? 'Biodiversidade de montanha' : 'Highland biodiversity'
      ]
    },
    {
      id: 'parque-magoe',
      title: lang === 'pt' ? 'Parque Nacional do Mágoè' : 'Mágoè National Park',
      category: 'wildlife',
      categoryLabel: lang === 'pt' ? 'Vida Selvagem & Safari' : 'Wildlife & Safari',
      location: 'Distrito de Mágoè (Margem Sul de Cahora Bassa)',
      image: magoeParkImg,
      description: lang === 'pt'
        ? 'Santuário de biodiversidade criado para proteger a fauna aquática e terrestre das margens de Cahora Bassa, com hipopótamos, crocodilos, elefantes e leões.'
        : 'A protected wilderness sanctuary along the southern shore of Lake Cahora Bassa, home to hippos, Nile crocodiles, elephants, and lions.',
      highlights: [
        lang === 'pt' ? 'Safaris terrestres e de barco' : 'Land and boat safaris',
        lang === 'pt' ? 'Observação de grandes mamíferos' : 'Big mammal watching',
        lang === 'pt' ? 'Savana intocada de Tete' : 'Unspoiled Tete savanna'
      ]
    },
    {
      id: 'gastronomia-tete',
      title: lang === 'pt' ? 'Especialidade: Cabrito de Tete & Peixe Kapenta' : 'Cuisine: Tete Goat & Kapenta Fish',
      category: 'culture',
      categoryLabel: lang === 'pt' ? 'Gastronomia Típica' : 'Local Cuisine',
      location: 'Restaurantes de Tete, Songo & Cahora Bassa',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
      description: lang === 'pt'
        ? 'O famoso "Cabrito de Tete" assado na brasa com piripiri tradicional, acompanhado por Matemba/Kapenta fresca ou seca da albufeira e xima quentinha.'
        : 'The legendary "Cabrito de Tete" charcoal-grilled spiced goat, served with fresh Lake Kapenta fish and hot xima (cornmeal porridge).',
      highlights: [
        lang === 'pt' ? 'Cabrito de Tete assado na brasa' : 'Charcoal-grilled spiced goat',
        lang === 'pt' ? 'Peixe Matemba/Kapenta da Albufeira' : 'Lake Kapenta fish delicacies',
        lang === 'pt' ? 'Sabores únicos com marca registada' : 'Signature regional culinary tradition'
      ]
    }
  ];

  // List of 15 districts of Tete Province (Wikipedia)
  const districtsList = [
    { name: 'Angónia', capital: 'Ulongué', detail: lang === 'pt' ? 'Planalto fértil, alta produção agrícola (batata, milho, feijão) e clima fresco.' : 'Fertile plateau, high agricultural output (potatoes, corn, beans), and cool highland climate.' },
    { name: 'Cahora-Bassa', capital: 'Songo', detail: lang === 'pt' ? 'Sede da Hidroeléctrica de Cahora Bassa e da vasta albufeira sobre o Zambeze.' : 'Home to the Cahora Bassa Hydroelectric dam and the vast lake reservoir on the Zambezi.' },
    { name: 'Cidade de Tete', capital: 'Tete', detail: lang === 'pt' ? 'Capital provincial, centro financeiro, comercial e de serviços nas margens do Zambeze.' : 'Provincial capital, commercial and financial hub along the banks of the Zambezi.' },
    { name: 'Changara', capital: 'Luenha', detail: lang === 'pt' ? 'Pecuária caprina e bovina, entroncamento rodoviário para o Zimbábue.' : 'Goat and cattle livestock hub, major highway junction leading to Zimbabwe.' },
    { name: 'Chifunde', capital: 'Chifunde', detail: lang === 'pt' ? 'Zona de transição florestal, rica em recursos florestais e agricultura.' : 'Forest transition zone rich in timber resources and agriculture.' },
    { name: 'Chiúta', capital: 'Manje', detail: lang === 'pt' ? 'Área com potencial mineiro e agropecuário no centro da província.' : 'Region with high mineral and farming potential in central Tete.' },
    { name: 'Doa', capital: 'Doa', detail: lang === 'pt' ? 'Distrito criado recentemente, atravessado pela linha fêmea de caminho de ferro.' : 'Recently created district traversed by the main railway line.' },
    { name: 'Macanga', capital: 'Furancungo', detail: lang === 'pt' ? 'Planalto norte rico em recursos florestais, tabaco e minerais.' : 'Northern plateau rich in forestry, tobacco farming, and mineral deposits.' },
    { name: 'Marávia', capital: 'Fingoe', detail: lang === 'pt' ? 'Distrito fronteiriço com a Zâmbia, com vastas reservas de caça e savana.' : 'Border district with Zambia featuring extensive game reserves and savanna.' },
    { name: 'Marara', capital: 'Marara', detail: lang === 'pt' ? 'Proximidade com o Rio Zambeze, projetos agrícolas de irrigação.' : 'Located near the Zambezi River with key agricultural irrigation projects.' },
    { name: 'Moatize', capital: 'Moatize', detail: lang === 'pt' ? 'Coração da mineração de carvão metalúrgico e centro industrial em expansão.' : 'Heart of metallurgical coal mining and a fast-growing industrial center.' },
    { name: 'Mutarara', capital: 'Nhamayabué', detail: lang === 'pt' ? 'Localizado no extremo sul, junto à mítica Ponte D. Ana sobre o Zambeze.' : 'Located in the far south near the historic Dona Ana Rail Bridge on the Zambezi.' },
    { name: 'Nhamatanda / Tsangano', capital: 'Ntengo-Wambusi', detail: lang === 'pt' ? 'Zona de alta altitude, produtora de hortícolas e citrinos de qualidade.' : 'High-altitude district producing premium vegetables and citrus fruits.' },
    { name: 'Zumbo', capital: 'Zumbo', detail: lang === 'pt' ? 'Ponto extremo ocidental, fronteira com Zâmbia e Zimbábue na confluência do Luangwa.' : 'Westernmost point, bordering Zambia and Zimbabwe at the Luangwa confluence.' },
  ];

  const filteredAttractions = filterType === 'all' 
    ? attractions 
    : attractions.filter(a => a.category === filterType);

  return (
    <section id="tete-profile" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200 overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-none mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-mono text-amber-950 font-black uppercase tracking-widest">
              {lang === 'pt' ? 'Perfil Oficial da Província' : 'Official Province Profile'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wider text-slate-950">
            {lang === 'pt' ? 'Província de Tete' : 'Tete Province'}
          </h2>

          <p className="text-slate-700 text-base md:text-lg mt-3 font-normal leading-relaxed">
            {lang === 'pt'
              ? 'Conheça os dados demográficos, divisão geográfica, riqueza económica e os pontos turísticos imperdíveis da "Capital da Energia" de Moçambique.'
              : 'Discover demography, geography, economic prowess, and must-visit tourist attractions in Mozambique\'s Energy Capital.'}
          </p>

          <div className="w-20 h-1 bg-amber-500 mx-auto mt-5" />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          <div className="bg-white border-2 border-slate-200 p-4 rounded-none text-center shadow-xs hover:border-amber-500 transition-colors">
            <MapPin className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">{lang === 'pt' ? 'Área Territorial' : 'Territorial Area'}</span>
            <span className="text-lg font-display font-black text-slate-900 block mt-0.5">100.724 km²</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Wiki / INE</span>
          </div>

          <div className="bg-white border-2 border-slate-200 p-4 rounded-none text-center shadow-xs hover:border-amber-500 transition-colors">
            <Users className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">{lang === 'pt' ? 'População Est.' : 'Est. Population'}</span>
            <span className="text-lg font-display font-black text-slate-900 block mt-0.5">{lang === 'pt' ? '~2.76 Milhões' : '~2.76 Million'}</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{lang === 'pt' ? 'Habitantes' : 'Inhabitants'}</span>
          </div>

          <div className="bg-white border-2 border-slate-200 p-4 rounded-none text-center shadow-xs hover:border-amber-500 transition-colors">
            <Building2 className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">{lang === 'pt' ? 'Capital' : 'Capital'}</span>
            <span className="text-lg font-display font-black text-slate-900 block mt-0.5">{lang === 'pt' ? 'Cidade de Tete' : 'Tete City'}</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{lang === 'pt' ? 'Margens do Zambeze' : 'Zambezi Banks'}</span>
          </div>

          <div className="bg-white border-2 border-slate-200 p-4 rounded-none text-center shadow-xs hover:border-amber-500 transition-colors">
            <Sun className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">{lang === 'pt' ? 'Clima Predominante' : 'Climate'}</span>
            <span className="text-lg font-display font-black text-slate-900 block mt-0.5">{lang === 'pt' ? 'Tropical Seco' : 'Tropical Dry'}</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{lang === 'pt' ? 'Calor & Sol constante' : 'Warm & Sunny'}</span>
          </div>

          <div className="bg-white border-2 border-slate-200 p-4 rounded-none text-center shadow-xs hover:border-amber-500 transition-colors">
            <Layers className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">{lang === 'pt' ? 'Divisão' : 'Division'}</span>
            <span className="text-lg font-display font-black text-slate-900 block mt-0.5">{lang === 'pt' ? '15 Distritos' : '15 Districts'}</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{lang === 'pt' ? 'Municípios & Vilas' : 'Municipalities & Towns'}</span>
          </div>

          <div className="bg-white border-2 border-slate-200 p-4 rounded-none text-center shadow-xs hover:border-amber-500 transition-colors">
            <Award className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">{lang === 'pt' ? 'Especialidade' : 'Specialty'}</span>
            <span className="text-lg font-display font-black text-amber-700 block mt-0.5">{lang === 'pt' ? 'Cabrito & Energia' : 'Goat Meat & Energy'}</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{lang === 'pt' ? 'Marca de Origem' : 'Origin Designation'}</span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-slate-200 pb-4">
          <button
            id="tab-btn-attractions"
            onClick={() => setActiveTab('attractions')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center space-x-2 shadow-xs ${
              activeTab === 'attractions'
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Pontos Turísticos "Não Deixe de Visitar"' : 'Must-Visit Tourist Spots'}</span>
          </button>

          <button
            id="tab-btn-geography"
            onClick={() => setActiveTab('geography')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center space-x-2 shadow-xs ${
              activeTab === 'geography'
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Geografia & Economia (Wikipédia)' : 'Geography & Economy'}</span>
          </button>

          <button
            id="tab-btn-districts"
            onClick={() => setActiveTab('districts')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center space-x-2 shadow-xs ${
              activeTab === 'districts'
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Os 15 Distritos' : 'The 15 Districts'}</span>
          </button>

          <button
            id="tab-btn-sources"
            onClick={() => setActiveTab('sources')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center space-x-2 shadow-xs ${
              activeTab === 'sources'
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Fontes das Informações' : 'Information Sources'}</span>
          </button>
        </div>

        {/* TAB 1: ATTRACTIONS ("NÃO DEIXE DE VISITAR" - VISIT MOZAMBIQUE) */}
        {activeTab === 'attractions' && (
          <div className="space-y-8 animate-fade-in">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-slate-200 shadow-xs">
              <span className="text-xs font-mono text-slate-900 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>{lang === 'pt' ? 'Guia de Atrações Visit Mozambique:' : 'Visit Mozambique Attractions:'}</span>
              </span>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: lang === 'pt' ? 'Todos os Pontos (23)' : 'All Spots (23)' },
                  { id: 'nature_engineering', label: lang === 'pt' ? 'Cahora Bassa & Lago' : 'Cahora Bassa & Lake' },
                  { id: 'bridges', label: lang === 'pt' ? 'Pontes Históricas' : 'Bridges' },
                  { id: 'heritage', label: lang === 'pt' ? 'Monumentos & Fortalezas' : 'Monuments & Forts' },
                  { id: 'wildlife', label: lang === 'pt' ? 'Conservação & Fauna' : 'Conservation & Wildlife' },
                  { id: 'mountains', label: lang === 'pt' ? 'Montanhas' : 'Mountains' },
                  { id: 'culture', label: lang === 'pt' ? 'Gastronomia' : 'Local Food' }
                ].map(f => (
                  <button
                    key={f.id}
                    id={`filter-btn-${f.id}`}
                    onClick={() => {
                      setFilterType(f.id);
                      setIsExpanded(false);
                    }}
                    className={`px-3 py-1.5 text-xs uppercase font-mono tracking-wider transition-colors cursor-pointer border font-bold ${
                      filterType === f.id
                        ? 'bg-amber-500 text-slate-950 border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Attractions Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(isExpanded ? filteredAttractions : filteredAttractions.slice(0, 3)).map((item, index) => (
                <div
                  key={item.id}
                  className={`bg-white border-2 border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all flex-col group overflow-hidden ${
                    !isExpanded && index > 0 ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  {/* Card Image */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 border border-slate-300 text-slate-900 text-xs font-mono font-bold uppercase shadow-xs">
                      {item.categoryLabel}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs text-amber-700 font-mono font-bold mb-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-slate-950 tracking-wide group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-700 text-sm mt-2 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold block mb-1">
                        {lang === 'pt' ? 'Destaques da Visita:' : 'Visit Highlights:'}
                      </span>
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-800 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Elegant Show More / Show Less Button Option */}
            {filteredAttractions.length > 1 && (
              <div className="flex flex-col items-center justify-center pt-2 pb-2">
                <button
                  id="btn-toggle-attractions-expand"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group relative inline-flex items-center space-x-3 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-900 text-amber-400 hover:text-white text-xs sm:text-sm uppercase font-mono font-bold tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <span>
                    {isExpanded
                      ? (lang === 'pt' ? 'Mostrar Menos' : 'Show Less')
                      : (lang === 'pt'
                          ? `Mostrar Mais (${filteredAttractions.length} Atrações no Total)`
                          : `Show More (${filteredAttractions.length} Total Attractions)`)}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </button>
                {!isExpanded && (
                  <p className="text-xs font-mono text-slate-600 mt-2 tracking-wider uppercase text-center font-semibold">
                    {lang === 'pt'
                      ? `✦ A exibir 1 no telemóvel e 3 no computador do total de ${filteredAttractions.length} atrações`
                      : `✦ Displaying 1 on mobile and 3 on desktop out of ${filteredAttractions.length} total attractions`}
                  </p>
                )}
              </div>
            )}

            {/* Visit Mozambique Mention Banner */}
            <div className="bg-amber-100/90 border border-amber-300 p-5 sm:p-6 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 shadow-xs">
              <div className="flex items-center space-x-3.5">
                <Landmark className="w-7 h-7 text-amber-700 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-slate-950 uppercase tracking-wider">
                    {lang === 'pt' ? 'Fonte Oficial dos Pontos Turísticos "Não Deixe de Visitar"' : 'Official Source for "Must-Visit" Tourist Attractions'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-normal mt-0.5">
                    {lang === 'pt'
                      ? 'Informações e roteiros turísticos compilados diretamente do Portal Oficial de Turismo do Governo de Moçambique.'
                      : 'Tourism information and itineraries compiled directly from the Official Tourism Portal of the Government of Mozambique.'}
                  </p>
                </div>
              </div>

              <a
                href="https://www.visitmozambique.gov.mz/onde-ir/provincias/tete/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-white font-bold uppercase text-xs tracking-widest flex items-center space-x-2 transition-colors flex-shrink-0 shadow-xs"
              >
                <span>{lang === 'pt' ? 'Aceder Visit Mozambique' : 'Access Visit Mozambique'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: GEOGRAPHY & ECONOMY (WIKIPEDIA) */}
        {activeTab === 'geography' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Geography & Boundaries */}
            <div className="bg-white border-2 border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-display font-bold uppercase text-slate-950 tracking-wider">
                  {lang === 'pt' ? 'Localização & Geografia (Dados Wikipédia)' : 'Location & Geography (Wikipedia Data)'}
                </h3>
              </div>

              <p className="text-slate-800 text-sm md:text-base leading-relaxed font-normal">
                {lang === 'pt' ? (
                  <>A <strong className="text-amber-800 font-bold">Província de Tete</strong> situa-se no interior da região centro de Moçambique, cobrindo uma área de <strong>100.724 km²</strong>. É atravessada pelo majestoso Rio Zambeze, que a divide em duas regiões geográficas distintas.</>
                ) : (
                  <>The <strong className="text-amber-800 font-bold">Tete Province</strong> is located in central Mozambique, covering an area of <strong>100,724 km²</strong>. It is traversed by the majestic Zambezi River, dividing it into two distinct geographical regions.</>
                )}
              </p>

              <div className="space-y-2 bg-slate-50 p-4 border border-slate-200 text-sm text-slate-800">
                <h4 className="font-mono text-amber-900 uppercase tracking-wider font-bold mb-2">
                  {lang === 'pt' ? 'Fronteiras Nacionais e Internacionais:' : 'National & International Borders:'}
                </h4>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>{lang === 'pt' ? 'Norte:' : 'North:'}</strong> {lang === 'pt' ? 'Zâmbia e Malawi' : 'Zambia and Malawi'}</li>
                  <li><strong>{lang === 'pt' ? 'Este:' : 'East:'}</strong> {lang === 'pt' ? 'Província da Zambézia' : 'Zambezia Province'}</li>
                  <li><strong>{lang === 'pt' ? 'Sul:' : 'South:'}</strong> {lang === 'pt' ? 'Províncias de Sofala e Manica' : 'Sofala and Manica Provinces'}</li>
                  <li><strong>{lang === 'pt' ? 'Oeste:' : 'West:'}</strong> {lang === 'pt' ? 'Zimbábue' : 'Zimbabwe'}</li>
                </ul>
              </div>

              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                {lang === 'pt'
                  ? 'O clima é predominantemente tropical seco/semiárido ao longo do vale do Zambeze, com temperaturas elevadas durante a maior parte do ano, e mais ameno nas zonas planálticas de alta altitude como a Angónia e Tsangano.'
                  : 'The climate is predominantly dry tropical/semi-arid along the Zambezi valley, with warm temperatures year-round, and milder in high-altitude plateaus like Angónia and Tsangano.'}
              </p>
            </div>

            {/* Economy & Resources */}
            <div className="bg-white border-2 border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-display font-bold uppercase text-slate-950 tracking-wider">
                  {lang === 'pt' ? 'Economia & Potencial de Tete (Dados Wikipédia)' : 'Economy & Potential of Tete (Wikipedia Data)'}
                </h3>
              </div>

              <p className="text-slate-800 text-sm md:text-base leading-relaxed font-normal">
                {lang === 'pt'
                  ? 'A economia de Tete destaca-se no cenário nacional e internacional por integrar alguns dos maiores megaprojetos industriais e energéticos do continente africano:'
                  : 'Tete\'s economy stands out nationally and internationally by hosting major industrial and energy megaprojects on the African continent:'}
              </p>

              <div className="space-y-3">
                <div className="bg-slate-50 p-4 border border-slate-200">
                  <span className="text-sm font-bold text-amber-800 uppercase tracking-wider block">
                    {lang === 'pt' ? '⚡ Potência Energética de Cahora Bassa' : '⚡ Cahora Bassa Power Powerhouse'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {lang === 'pt'
                      ? 'Sede da Hidroeléctrica de Cahora Bassa (HCB), com capacidade instalada de 2.075 MW, abastecendo Moçambique e exportando eletricidade para África do Sul e Zimbábue.'
                      : 'Home to the Cahora Bassa Hydroelectric plant (HCB), with an installed capacity of 2,075 MW, powering Mozambique and exporting electricity to South Africa and Zimbabwe.'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200">
                  <span className="text-sm font-bold text-amber-800 uppercase tracking-wider block">
                    {lang === 'pt' ? '⛏️ Bacia Carbonífera de Moatize' : '⛏️ Moatize Coal Basin'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {lang === 'pt'
                      ? 'Alberga uma das maiores reservas mundiais de carvão mineral (coke e térmico), ligada por corredores férreos aos portos oceânicos da Beira e Nacala.'
                      : 'Hosts vast coal mineral reserves (coking and thermal), connected by heavy-haul railways to deepwater ports in Beira and Nacala.'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200">
                  <span className="text-sm font-bold text-amber-800 uppercase tracking-wider block">
                    {lang === 'pt' ? '🐐 Pecuária & Agronegócio Tradicional' : '🐐 Livestock & Traditional Agribusiness'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {lang === 'pt'
                      ? 'Referência na criação de gado caprino (Cabrito de Tete), bovino, produção de tabaco, milho, feijão e fruteiras cítricas.'
                      : 'Renowned for goat farming (Tete Goat), cattle livestock, tobacco cultivation, corn, beans, and citrus fruits.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THE 15 DISTRICTS */}
        {activeTab === 'districts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border-2 border-slate-200 p-5 shadow-xs">
              <h3 className="text-lg font-display font-bold text-slate-950 uppercase tracking-wider flex items-center space-x-2">
                <Compass className="w-5 h-5 text-amber-600" />
                <span>{lang === 'pt' ? 'Divisão Administrativa: Os 15 Distritos da Província de Tete' : 'Administrative Division: The 15 Districts of Tete Province'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-normal mt-1">
                {lang === 'pt'
                  ? 'Conforme documentado pela Wikipédia e pelo Instituto Nacional de Estatística de Moçambique.'
                  : 'As documented by Wikipedia and Mozambique\'s National Institute of Statistics.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {districtsList.map((d, i) => (
                <div key={i} className="bg-white border-2 border-slate-200 p-4 shadow-xs hover:border-amber-500 transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span className="text-sm font-bold text-slate-950">{d.name}</span>
                    <span className="text-xs font-mono text-amber-900 font-bold uppercase bg-amber-100 px-2 py-0.5">{d.capital}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                    {d.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OFFICIAL SOURCES MENTION */}
        {activeTab === 'sources' && (
          <div className="max-w-4xl mx-auto bg-white border-2 border-amber-300 p-8 space-y-6 animate-fade-in shadow-md">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
              <Info className="w-7 h-7 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-display font-bold text-slate-950 uppercase tracking-wider">
                  {lang === 'pt' ? 'Declaração de Transparência & Fontes das Informações' : 'Transparency Statement & Sources of Information'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-normal mt-0.5">
                  {lang === 'pt'
                    ? 'Conforme solicitado, todos os dados estatísticos, demográficos, geográficos e turísticos apresentados neste espaço foram rigorosamente extraídos e compilados das fontes oficiais abaixo.'
                    : 'All statistical, demographic, geographical, and tourist information presented in this section has been compiled from official public citations below.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Source 1: Wikipedia */}
              <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                      {lang === 'pt' ? '1. Wikipédia em Português' : '1. Wikipedia (Portuguese)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                    {lang === 'pt'
                      ? 'Artigo principal sobre a Província de Tete: Dados de área (100.724 km²), limites geográficos, rios, história, demografia e lista completa dos 15 distritos administrativos.'
                      : 'Main article on Tete Province: Area data (100,724 km²), geographical boundaries, rivers, history, demography, and complete list of the 15 administrative districts.'}
                  </p>
                  <span className="text-xs font-mono text-amber-800 font-bold block pt-1">
                    URL: https://pt.wikipedia.org/wiki/Tete_(prov%C3%ADncia)
                  </span>
                </div>

                <a
                  href="https://pt.wikipedia.org/wiki/Tete_(prov%C3%ADncia)"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-xs tracking-wider flex items-center space-x-1.5 transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                >
                  <span>{lang === 'pt' ? 'Abrir Wikipédia' : 'Open Wikipedia'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Source 2: Visit Mozambique */}
              <div className="bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                      {lang === 'pt' ? '2. Visit Mozambique (Portal Oficial de Turismo)' : '2. Visit Mozambique (Official Tourism Portal)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                    {lang === 'pt'
                      ? 'Portal do Ministério da Cultura e Turismo de Moçambique: Guia de atrações "Não deixe de visitar" da Província de Tete (Cahora Bassa, Songo, Pontes sobre o Zambeze, Parque Nacional do Mágoè, Missão de Boroma, Zumbo e Gastronomia de Cabrito/Matemba).'
                      : 'Ministry of Culture and Tourism of Mozambique portal: "Must-Visit" attraction guide for Tete Province (Cahora Bassa, Songo, Zambezi Bridges, Mágoè National Park, Boroma Mission, Zumbo, and Local Cuisine).'}
                  </p>
                  <span className="text-xs font-mono text-amber-800 font-bold block pt-1">
                    URL: https://www.visitmozambique.gov.mz/onde-ir/provincias/tete/
                  </span>
                </div>

                <a
                  href="https://www.visitmozambique.gov.mz/onde-ir/provincias/tete/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-xs tracking-wider flex items-center space-x-1.5 transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                >
                  <span>{lang === 'pt' ? 'Abrir Visit Mozambique' : 'Open Visit Mozambique'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-600 font-medium italic">
              {lang === 'pt'
                ? 'Governo da Província de Tete • Conferência Internacional de Investimentos de Tete (CIIT2026)'
                : 'Government of Tete Province • International Conference on Tete Investments (CIIT2026)'}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
