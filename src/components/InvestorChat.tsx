/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS } from '../data';
import { HelpCircle, Send, Sparkles, MessageSquare, Bot, User, RefreshCw, ChevronRight } from 'lucide-react';

interface InvestorChatProps {
  lang: 'pt' | 'en';
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function InvestorChat({ lang }: InvestorChatProps) {
  const t = TRANSLATIONS[lang];
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Suggested questions based on local content
  const suggestedQuestions = lang === 'pt' ? [
    { label: 'Quais são os incentivos fiscais em Tete?', query: 'incentivos fiscais' },
    { label: 'Como funciona a ligação logística regional?', query: 'logistica' },
    { label: 'Quais as oportunidades no setor do Cabrito de Tete?', query: 'cabrito' },
    { label: 'Como posso obter um visto para a conferência?', query: 'visto' }
  ] : [
    { label: 'What are the fiscal tax incentives in Tete?', query: 'tax incentives' },
    { label: 'How does regional SADC logistics operate?', query: 'logistics' },
    { label: 'What are the investment potentials for Tete Goat?', query: 'goat' },
    { label: 'How do I obtain a visa for the conference?', query: 'visa' }
  ];

  // Pre-formulated responses (intelligent matching database)
  const answersDB: Record<string, { pt: string; en: string }> = {
    'incentivos fiscais': {
      pt: 'Ao abrigo da Lei de Investimentos de Moçambique, os investidores autorizados em Tete beneficiam de isenções aduaneiras sobre bens de equipamento (Classe K) e redução substancial do Imposto sobre o Rendimento de Pessoas Coletivas (IRPC) por um período de até 10 anos nas Zonas Económicas Especiais e Zonas de Desenvolvimento Rápido de Tete. O Gabinete do Governador da Província facilita balcões únicos para aprovações céleres.',
      en: 'Under the Mozambican Investment Act, approved investors in Tete benefit from import duty exemptions on capital goods (Class K assets) and substantial Corporate Income Tax (IRPC) holiday reductions for up to 10 years in Tete\'s Special Economic Zones (ZEE) and Rapid Development Zones. The Provincial Governor\'s Office hosts single-window centers for fast-tracked licensing.'
    },
    'tax incentives': {
      pt: 'Ao abrigo da Lei de Investimentos de Moçambique, os investidores autorizados em Tete beneficiam de isenções aduaneiras sobre bens de equipamento (Classe K) e redução substancial do Imposto sobre o Rendimento de Pessoas Coletivas (IRPC) por um período de até 10 anos nas Zonas Económicas Especiais e Zonas de Desenvolvimento Rápido de Tete. O Gabinete do Governador da Província facilita balcões únicos para aprovações céleres.',
      en: 'Under the Mozambican Investment Act, approved investors in Tete benefit from import duty exemptions on capital goods (Class K assets) and substantial Corporate Income Tax (IRPC) holiday reductions for up to 10 years in Tete\'s Special Economic Zones (ZEE) and Rapid Development Zones. The Provincial Governor\'s Office hosts single-window centers for fast-tracked licensing.'
    },
    'logistica': {
      pt: 'Tete é servida pelo Corredor do Zambeze, ligando as ferrovias de Moatize aos portos de mar de Nacala (porto de águas profundas) e da Beira. A província faz fronteira rodoviária direta com o Zimbábue (via fronteira de Changara), Zâmbia (via Zumbo) e Malawi (via Calomue/Zóbuè), sendo a principal artéria comercial terrestre para países encravados da SADC.',
      en: 'Tete is serviced by the Zambezi Corridor, linking Moatize railways directly to the deepwater Port of Nacala and the Port of Beira. The province shares direct highway borders with Zimbabwe (via Changara), Zambia (via Zumbo), and Malawi (via Calomue/Zóbuè), making it the primary logistics corridor for landlocked SADC nations.'
    },
    'logistics': {
      pt: 'Tete é servida pelo Corredor do Zambeze, ligando as ferrovias de Moatize aos portos de mar de Nacala (porto de águas profundas) e da Beira. A província faz fronteira rodoviária direta com o Zimbábue (via fronteira de Changara), Zâmbia (via Zumbo) e Malawi (via Calomue/Zóbuè), sendo a principal artéria comercial terrestre para países encravados da SADC.',
      en: 'Tete is serviced by the Zambezi Corridor, linking Moatize railways directly to the deepwater Port of Nacala and the Port of Beira. The province shares direct highway borders with Zimbabwe (via Changara), Zambia (via Zumbo), and Malawi (via Calomue/Zóbuè), making it the primary logistics corridor for landlocked SADC nations.'
    },
    'cabrito': {
      pt: 'O "Cabrito de Tete" é uma iguaria biológica protegida cujo sabor único deriva da alimentação à base de pasto arbustivo nativo (acácias). Existem oportunidades urgentes para estabelecimento de matadouros industriais com certificação Halal, unidades de acondicionamento para exportação para a Península Arábica e criação de cooperativas agrícolas modernizadas com apoio logístico de frio.',
      en: 'The "Tete Goat" (Cabrito de Tete) is a protected organic delicacy whose exquisite flavor derives from local brushwood feeding. Immediate investment openings exist for industrial Halal-certified slaughterhouses, advanced cold chain logistics, and structured export packaging tailored for Middle Eastern markets.'
    },
    'goat': {
      pt: 'O "Cabrito de Tete" é uma iguaria biológica protegida cujo sabor único deriva da alimentação à base de pasto arbustivo nativo (acácias). Existem oportunidades urgentes para estabelecimento de matadouros industriais com certificação Halal, unidades de acondicionamento para exportação para a Península Arábica e criação de cooperativas agrícolas modernizadas com apoio logístico de frio.',
      en: 'The "Tete Goat" (Cabrito de Tete) is a protected organic delicacy whose exquisite flavor derives from local brushwood feeding. Immediate investment openings exist for industrial Halal-certified slaughterhouses, advanced cold chain logistics, and structured export packaging tailored for Middle Eastern markets.'
    },
    'visto': {
      pt: 'Os participantes da CIIT2026 podem requerer um visto de negócio rápido no portal eletrónico oficial em evisa.gov.mz. Várias nações parceiras estão isentas para visitas de curta duração. Após realizar a sua inscrição no formulário acima, receberá a sua Credencial de Acesso Virtual, que serve como documento comprovativo oficial de participação aceito pelas autoridades alfandegárias.',
      en: 'CIIT2026 participants can request a fast-track Business e-Visa through the official portal at evisa.gov.mz. Many partner nations now enjoy visa exemptions for short-term stays. Upon completing your registration in the form above, your generated Virtual Pass serves as an official supporting file for immigration purposes.'
    },
    'visa': {
      pt: 'Os participantes da CIIT2026 podem requerer um visto de negócio rápido no portal eletrónico oficial em evisa.gov.mz. Várias nações parceiras estão isentas para visitas de curta duração. Após realizar a sua inscrição no formulário acima, receberá a sua Credencial de Acesso Virtual, que serve como documento comprovativo oficial de participação aceito pelas autoridades alfandegárias.',
      en: 'CIIT2026 participants can request a fast-track Business e-Visa through the official portal at evisa.gov.mz. Many partner nations now enjoy visa exemptions for short-term stays. Upon completing your registration in the form above, your generated Virtual Pass serves as an official supporting file for immigration purposes.'
    }
  };

  const defaultWelcomeMsg = lang === 'pt'
    ? 'Olá! Sou o assistente virtual de investimentos "Tete Invest AI". Estou aqui para responder às suas questões sobre as potencialidades de Tete, incentivos fiscais, vistos, hotéis e a programação da CIIT2026. Como posso ajudar o seu negócio hoje?'
    : 'Greetings! I am the "Tete Invest AI" digital assistant. I am prepped to answer your corporate inquiries regarding Tete\'s investment climate, tax benefits, hotel listings, visas, and schedules. How may I assist your business today?';

  const defaultNotFoundMsg = lang === 'pt'
    ? 'Compreendo a sua questão, no entanto recomendo debater este tema em maior pormenor com a nossa equipe ministerial na Sala Executiva de Matchmaking B2B durante o evento. Pode também colocar uma pergunta sobre incentivos fiscais, vistos ou o potencial do Cabrito de Tete.'
    : 'I understand your query, however, I recommend discussing this strategic topic directly with our ministerial representatives in the B2B Matchmaking Lounge during the summit. You can also query me on tax incentives, visas, or the Tete Goat agricultural trade.';

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: defaultWelcomeMsg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    // AI thinking delay
    setTimeout(() => {
      // Find matches in DB
      const queryLower = text.toLowerCase();
      let matchedKey = '';

      for (const key of Object.keys(answersDB)) {
        if (queryLower.includes(key) || key.includes(queryLower)) {
          matchedKey = key;
          break;
        }
      }

      let responseText = '';
      if (matchedKey) {
        responseText = answersDB[matchedKey][lang];
      } else {
        responseText = defaultNotFoundMsg;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section id="investor-assistant" className="py-20 bg-neutral-950 text-white relative border-b border-gray-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-corporate-900/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold-500 animate-pulse" />
            <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-widest">Guia Virtual de Inteligência</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-light text-white mt-3 uppercase tracking-wider">
            Tete Invest AI Assistant
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-1 font-light">
            {lang === 'pt' ? 'Interaja com o nosso consultor digital e esclareça dúvidas de investimento instantaneamente.' : 'Interact with our digital consultant to solve investment queries on Tete instantly.'}
          </p>
        </div>

        {/* Chat Interface Box */}
        <div className="bg-corporate-950 border border-gold-600/30 rounded-none overflow-hidden shadow-2xl flex flex-col h-[500px]">
          {/* Header Bar */}
          <div className="bg-corporate-900 px-6 py-4 border-b border-gold-600/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-none bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-gold-400 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">Tete Invest AI</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 inline-block animate-ping" />
                  <span>Online / Real-time</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">CIIT 2026 Executive Support</span>
          </div>

          {/* Messages Body */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gold-600">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse text-right' : 'text-left'
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0 border ${
                  msg.sender === 'user' 
                    ? 'bg-corporate-900 border-white/15' 
                    : 'bg-gold-500/20 border-gold-500/30'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4 text-gray-300" />
                  ) : (
                    <Bot className="w-4 h-4 text-gold-400" />
                  )}
                </div>

                {/* Message Text bubble */}
                <div className={`rounded-none p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gold-500 text-corporate-950 font-semibold border border-gold-500/50'
                    : 'bg-corporate-900/80 border border-white/5 text-gray-100'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[8px] mt-1.5 font-mono ${
                    msg.sender === 'user' ? 'text-corporate-950/60' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs">
                <Bot className="w-4 h-4 text-gold-400 animate-spin" />
                <span className="font-mono text-[10px] italic">Tete Invest AI is searching files...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick suggestions menu */}
          <div className="px-6 py-3 bg-corporate-900/50 border-t border-white/5 flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                id={`chat-suggested-btn-${idx}`}
                onClick={() => handleSendMessage(q.query)}
                className="px-2.5 py-1 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 transition-colors cursor-pointer text-left font-light"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Sender footer bar */}
          <div className="p-4 bg-corporate-900 border-t border-gold-600/20 flex items-center space-x-3">
            <input
              type="text"
              id="chat-user-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
              placeholder={lang === 'pt' ? 'Pergunte sobre incentivos, infraestrutura, turismo...' : 'Ask about tax holidays, SADC corridors, visas...'}
              className="flex-grow bg-corporate-950 border border-white/10 rounded-none px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
            />
            <button
              id="chat-send-btn"
              onClick={() => handleSendMessage(userInput)}
              className="p-2.5 rounded-none bg-gold-600 text-corporate-950 hover:bg-gold-500 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
