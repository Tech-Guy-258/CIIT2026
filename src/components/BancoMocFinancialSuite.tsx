/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  RefreshCw,
  ArrowRightLeft,
  Percent,
  BarChart3,
  Building2,
  ExternalLink,
  X,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Layers,
  Coins
} from 'lucide-react';

interface BancoMocFinancialSuiteProps {
  lang: 'pt' | 'en';
}

export interface ExchangeRateItem {
  code: string;
  name: { pt: string; en: string };
  symbol: string;
  buy: number;
  sell: number;
  mid: number;
  change24h: number;
  flag: string;
}

export const INITIAL_RATES: ExchangeRateItem[] = [
  {
    code: 'USD',
    name: { pt: 'Dólar Norte-Americano', en: 'US Dollar' },
    symbol: '$',
    buy: 63.26,
    sell: 64.54,
    mid: 63.90,
    change24h: 0.05,
    flag: '🇺🇸'
  },
  {
    code: 'EUR',
    name: { pt: 'Euro', en: 'Euro' },
    symbol: '€',
    buy: 69.10,
    sell: 70.50,
    mid: 69.80,
    change24h: 0.12,
    flag: '🇪🇺'
  },
  {
    code: 'ZAR',
    name: { pt: 'Rand Sul-Africano', en: 'South African Rand' },
    symbol: 'R',
    buy: 3.51,
    sell: 3.59,
    mid: 3.55,
    change24h: -0.02,
    flag: '🇿🇦'
  },
  {
    code: 'GBP',
    name: { pt: 'Libra Esterlina', en: 'British Pound' },
    symbol: '£',
    buy: 82.40,
    sell: 84.00,
    mid: 83.20,
    change24h: 0.18,
    flag: '🇬🇧'
  },
  {
    code: 'CNY',
    name: { pt: 'Yuan Chinês', en: 'Chinese Yuan' },
    symbol: '¥',
    buy: 8.76,
    sell: 8.94,
    mid: 8.85,
    change24h: 0.04,
    flag: '🇨🇳'
  },
  {
    code: 'BRL',
    name: { pt: 'Real Brasileiro', en: 'Brazilian Real' },
    symbol: 'R$',
    buy: 11.20,
    sell: 11.80,
    mid: 11.50,
    change24h: 0.10,
    flag: '🇧🇷'
  },
  {
    code: 'INR',
    name: { pt: 'Rúpia Indiana', en: 'Indian Rupee' },
    symbol: '₹',
    buy: 0.74,
    sell: 0.78,
    mid: 0.76,
    change24h: 0.00,
    flag: '🇮🇳'
  }
];

export const ECONOMIC_INDICATORS = {
  inflationMonthly: 0.18, // %
  inflationAnnual: 2.95, // %
  gdpQuarterly: 4.80, // %
  rates: {
    mimo: 12.75, // %
    primeRate: 18.60, // %
    fpd: 9.75, // %
    fpc: 15.75 // %
  },
  lastUpdate: '2026-07-22'
};

export default function BancoMocFinancialSuite({ lang }: BancoMocFinancialSuiteProps) {
  const [rates, setRates] = useState<ExchangeRateItem[]>(INITIAL_RATES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Hoje, 09:30 (Hora de Maputo)');
  const [isPaused, setIsPaused] = useState(false);

  // Sidebar Open State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'converter' | 'indicators' | 'table'>('converter');

  // Currency Converter State
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('MZN');
  const [rateType, setRateType] = useState<'mid' | 'buy' | 'sell'>('mid');

  // Live refresh simulation
  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const updated = rates.map((r) => {
        const jitter = (Math.random() - 0.5) * 0.08;
        const newMid = Math.max(0.1, Number((r.mid + jitter).toFixed(2)));
        const newBuy = Math.max(0.1, Number((newMid * 0.99).toFixed(2)));
        const newSell = Math.max(0.1, Number((newMid * 1.01).toFixed(2)));
        return {
          ...r,
          mid: newMid,
          buy: newBuy,
          sell: newSell,
          change24h: Number(((Math.random() - 0.48) * 0.3).toFixed(2))
        };
      });
      setRates(updated);
      const now = new Date();
      setLastUpdatedTime(`Hoje, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} (Hora de Maputo)`);
      setIsRefreshing(false);
    }, 600);
  };

  // Convert calculation
  const calculateConversion = () => {
    if (isNaN(amount) || amount <= 0) return 0;

    let sourceInMzn = 0;
    if (fromCurrency === 'MZN') {
      sourceInMzn = amount;
    } else {
      const srcRateObj = rates.find((r) => r.code === fromCurrency);
      if (!srcRateObj) return 0;
      const rateToUse = srcRateObj[rateType];
      sourceInMzn = amount * rateToUse;
    }

    if (toCurrency === 'MZN') {
      return sourceInMzn;
    } else {
      const targetRateObj = rates.find((r) => r.code === toCurrency);
      if (!targetRateObj) return 0;
      const targetRateToUse = targetRateObj[rateType];
      return sourceInMzn / targetRateToUse;
    }
  };

  const convertedValue = calculateConversion();

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <>
      {/* 1. TICKER CAROUSEL BAR (RIGHT AFTER HEADER NAVBAR) */}
      <div className="bg-corporate-950 border-b border-gold-500/30 text-white overflow-hidden select-none relative z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Label Badge */}
          <div className="flex items-center space-x-2 flex-shrink-0 bg-gold-500/10 border border-gold-500/40 px-2.5 py-1 text-[10px] font-mono tracking-wider text-gold-300 font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lang === 'pt' ? 'BANCO DE MOÇAMBIQUE' : 'BANK OF MOZAMBIQUE'}</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:inline text-gray-300 font-normal">
              {lang === 'pt' ? 'Câmbio Oficial MZN' : 'Official MZN Rates'}
            </span>
          </div>

          {/* Scrolling Rates Ticker */}
          <div
            className="flex-grow overflow-hidden relative w-full md:w-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex items-center space-x-6 whitespace-nowrap ${
                isPaused ? '' : 'animate-marquee'
              }`}
            >
              {[...rates, ...rates].map((item, idx) => (
                <div
                  key={`${item.code}-${idx}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 hover:border-gold-500/40 transition-colors cursor-pointer"
                  onClick={() => {
                    setFromCurrency(item.code);
                    setToCurrency('MZN');
                    setSidebarTab('converter');
                    setIsSidebarOpen(true);
                  }}
                  title={lang === 'pt' ? 'Clique para abrir no conversor' : 'Click to open in converter'}
                >
                  <span className="text-base">{item.flag}</span>
                  <span className="font-bold text-white">{item.code}/MZN</span>
                  <span className="text-gray-300">
                    {item.mid.toFixed(2)}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      item.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Quick Links & Controls */}
          <div className="flex items-center space-x-2 flex-shrink-0 text-[11px] font-mono">
            <button
              id="btn-refresh-bm-rates"
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="p-1.5 bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-300 transition-colors cursor-pointer"
              title={lang === 'pt' ? 'Atualizar Cotações' : 'Refresh Rates'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-gold-400' : ''}`} />
            </button>

            <button
              id="btn-open-sidebar-market"
              onClick={() => setIsSidebarOpen(true)}
              className="px-3.5 py-1 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-corporate-950 font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{lang === 'pt' ? 'Mercado & Conversor' : 'Market & Converter'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. FLOATING SIDEBAR TOGGLE BUTTON (PERSISTENT ON RIGHT EDGE OF SCREEN) */}
      <button
        id="btn-float-sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-corporate-900 hover:bg-corporate-950 border-l-2 border-y border-gold-500 text-gold-300 hover:text-white px-2 py-4 shadow-2xl flex flex-col items-center space-y-2 cursor-pointer transition-all group hover:pr-3"
        title={lang === 'pt' ? 'Abrir Mercado Financeiro & Conversor (Banco de Moçambique)' : 'Open Financial Market & Converter'}
      >
        <Building2 className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-mono uppercase font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 py-1 text-gold-200">
          {lang === 'pt' ? 'MERCADO FINANCEIRO BM' : 'BM FINANCIAL MARKET'}
        </span>
        <ChevronRight className={`w-3.5 h-3.5 text-gold-400 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 3. DEDICATED SLIDE-OVER SIDEBAR FOR FINANCIAL & MONETARY MARKET */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md sm:max-w-lg bg-corporate-950 border-l border-gold-500/40 text-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in-right">
              
              {/* Sidebar Header */}
              <div className="p-5 bg-gradient-to-r from-corporate-950 via-corporate-900 to-corporate-950 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-gold-500/20 text-gold-400 border border-gold-500/30">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-light text-white tracking-wide">
                        {lang === 'pt' ? 'Mercado Financeiro' : 'Financial Market'}
                      </h3>
                      <p className="text-[10px] font-mono text-gold-400 uppercase tracking-wider">
                        {lang === 'pt' ? 'Banco de Moçambique (BM)' : 'Bank of Mozambique'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-gold-500/50 cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sidebar Navigation Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-corporate-950 p-1 border border-white/10 text-[10px] font-mono uppercase font-bold">
                  <button
                    onClick={() => setSidebarTab('converter')}
                    className={`py-1.5 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                      sidebarTab === 'converter'
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Calculator className="w-3 h-3" />
                    <span>{lang === 'pt' ? 'Conversor' : 'Converter'}</span>
                  </button>

                  <button
                    onClick={() => setSidebarTab('indicators')}
                    className={`py-1.5 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                      sidebarTab === 'indicators'
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Percent className="w-3 h-3" />
                    <span>{lang === 'pt' ? 'Indicadores' : 'Rates & GDP'}</span>
                  </button>

                  <button
                    onClick={() => setSidebarTab('table')}
                    className={`py-1.5 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                      sidebarTab === 'table'
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Coins className="w-3 h-3" />
                    <span>{lang === 'pt' ? 'Cotações' : 'Rates Table'}</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Content Body */}
              <div className="p-5 space-y-6 flex-grow">

                {/* TAB 1: CURRENCY CONVERTER */}
                {sidebarTab === 'converter' && (
                  <div className="space-y-5 animate-fade-in">
                    
                    <div className="bg-corporate-900 border border-gold-500/30 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono text-gray-300 uppercase font-bold">
                          {lang === 'pt' ? 'Montante a Converter:' : 'Amount to Convert:'}
                        </label>
                        <span className="text-[10px] font-mono text-gold-400 font-bold">
                          {fromCurrency}
                        </span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={amount || ''}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-corporate-950 border border-white/20 focus:border-gold-500 px-3.5 py-2.5 text-lg font-mono font-bold text-white focus:outline-none"
                        placeholder="1000"
                      />
                    </div>

                    {/* From/To Selection */}
                    <div className="grid grid-cols-11 gap-2 items-center">
                      <div className="col-span-5">
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase">
                          {lang === 'pt' ? 'De (Origem):' : 'From:'}
                        </label>
                        <select
                          value={fromCurrency}
                          onChange={(e) => setFromCurrency(e.target.value)}
                          className="w-full bg-corporate-900 border border-white/20 focus:border-gold-500 p-2 text-xs font-mono font-bold text-white cursor-pointer"
                        >
                          <option value="MZN">🇲🇿 MZN</option>
                          {rates.map((r) => (
                            <option key={r.code} value={r.code}>
                              {r.flag} {r.code}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-1 flex justify-center pt-4">
                        <button
                          onClick={handleSwapCurrencies}
                          className="p-1.5 bg-white/10 hover:bg-gold-500 text-gray-300 hover:text-corporate-950 transition-colors cursor-pointer border border-white/10"
                          title={lang === 'pt' ? 'Inverter Moedas' : 'Swap Currencies'}
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="col-span-5">
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase">
                          {lang === 'pt' ? 'Para (Destino):' : 'To:'}
                        </label>
                        <select
                          value={toCurrency}
                          onChange={(e) => setToCurrency(e.target.value)}
                          className="w-full bg-corporate-900 border border-white/20 focus:border-gold-500 p-2 text-xs font-mono font-bold text-white cursor-pointer"
                        >
                          <option value="MZN">🇲🇿 MZN</option>
                          {rates.map((r) => (
                            <option key={r.code} value={r.code}>
                              {r.flag} {r.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Rate type selection */}
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase">
                        {lang === 'pt' ? 'Cotação de Referência BM:' : 'BM Exchange Rate:'}
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                        {(['mid', 'buy', 'sell'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setRateType(mode)}
                            className={`py-1 uppercase font-bold border transition-colors cursor-pointer ${
                              rateType === mode
                                ? 'bg-gold-500/20 text-gold-300 border-gold-500'
                                : 'bg-corporate-900 text-gray-400 border-white/10'
                            }`}
                          >
                            {mode === 'mid' ? (lang === 'pt' ? 'Média' : 'Mid') : mode === 'buy' ? (lang === 'pt' ? 'Compra' : 'Buy') : (lang === 'pt' ? 'Venda' : 'Sell')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Result Box */}
                    <div className="bg-gradient-to-r from-corporate-900 via-corporate-950 to-corporate-900 border-2 border-gold-500/50 p-4 relative">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">
                        {lang === 'pt' ? 'Resultado Estimado:' : 'Estimated Result:'}
                      </div>
                      <div className="font-mono text-2xl font-bold text-gold-300 mt-1">
                        {convertedValue.toLocaleString('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {' '}
                        <span className="text-base text-white font-normal">{toCurrency}</span>
                      </div>
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5">
                        1 {fromCurrency} = {(convertedValue / (amount || 1)).toFixed(4)} {toCurrency}
                      </p>
                    </div>

                    {/* Quick Presets */}
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block mb-1.5 uppercase">
                        {lang === 'pt' ? 'Atalhos Rápidos:' : 'Quick Shortcuts:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: '$100 USD', amount: 100, from: 'USD', to: 'MZN' },
                          { label: 'R 1.000 ZAR', amount: 1000, from: 'ZAR', to: 'MZN' },
                          { label: '€500 EUR', amount: 500, from: 'EUR', to: 'MZN' },
                          { label: '50.000 MZN', amount: 50000, from: 'MZN', to: 'USD' }
                        ].map((p) => (
                          <button
                            key={p.label}
                            onClick={() => {
                              setAmount(p.amount);
                              setFromCurrency(p.from);
                              setToCurrency(p.to);
                            }}
                            className="px-2 py-1 bg-white/5 hover:bg-gold-500/20 border border-white/10 text-[10px] font-mono text-gray-300 hover:text-gold-300 transition-colors cursor-pointer"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: ECONOMIC INDICATORS & INTEREST RATES */}
                {sidebarTab === 'indicators' && (
                  <div className="space-y-5 animate-fade-in">
                    
                    {/* Interest Rates Box */}
                    <div className="bg-corporate-900 border border-gold-500/40 p-4">
                      <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/10">
                        <Percent className="w-4 h-4 text-gold-400" />
                        <h4 className="text-xs font-mono uppercase text-gold-300 font-bold">
                          {lang === 'pt' ? 'Taxas de Juros do Banco de Moçambique' : 'Bank of Mozambique Interest Rates'}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-corporate-950 p-2.5 border border-gold-500/40">
                          <span className="text-[9px] font-mono text-gold-300 uppercase block font-bold">
                            {lang === 'pt' ? 'Prime Rate' : 'Prime Rate'}
                          </span>
                          <span className="font-mono text-xl font-bold text-gold-300 block">
                            {ECONOMIC_INDICATORS.rates.primeRate}%
                          </span>
                          <span className="text-[9px] text-gray-400 block font-mono">
                            {lang === 'pt' ? 'Banca Nacional' : 'Commercial Banking'}
                          </span>
                        </div>

                        <div className="bg-corporate-950 p-2.5 border border-white/10">
                          <span className="text-[9px] font-mono text-gray-300 uppercase block font-bold">
                            {lang === 'pt' ? 'Taxa MIMO' : 'MIMO Rate'}
                          </span>
                          <span className="font-mono text-xl font-bold text-white block">
                            {ECONOMIC_INDICATORS.rates.mimo}%
                          </span>
                          <span className="text-[9px] text-gray-400 block font-mono">
                            {lang === 'pt' ? 'Política Monetária' : 'Monetary Policy'}
                          </span>
                        </div>

                        <div className="bg-corporate-950 p-2.5 border border-white/10">
                          <span className="text-[9px] font-mono text-gray-300 uppercase block font-bold">
                            {lang === 'pt' ? 'Taxa FPC' : 'FPC Rate'}
                          </span>
                          <span className="font-mono text-lg font-bold text-white block">
                            {ECONOMIC_INDICATORS.rates.fpc}%
                          </span>
                          <span className="text-[9px] text-gray-400 block font-mono">
                            {lang === 'pt' ? 'Cedência Liquidez' : 'Lending Facility'}
                          </span>
                        </div>

                        <div className="bg-corporate-950 p-2.5 border border-white/10">
                          <span className="text-[9px] font-mono text-gray-300 uppercase block font-bold">
                            {lang === 'pt' ? 'Taxa FPD' : 'FPD Rate'}
                          </span>
                          <span className="font-mono text-lg font-bold text-white block">
                            {ECONOMIC_INDICATORS.rates.fpd}%
                          </span>
                          <span className="text-[9px] text-gray-400 block font-mono">
                            {lang === 'pt' ? 'Depósito Permanente' : 'Deposit Facility'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Macro Economic Metrics */}
                    <div className="space-y-2.5">
                      <div className="bg-corporate-900 p-3.5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase block">
                            {lang === 'pt' ? 'Inflação Mensal (INE/BM)' : 'Monthly Inflation'}
                          </span>
                          <span className="text-xs font-mono text-gray-300 mt-0.5 block">
                            {lang === 'pt' ? 'Variação mensal de preços' : 'Monthly CPI variation'}
                          </span>
                        </div>
                        <span className="font-mono text-xl font-bold text-white">
                          +{ECONOMIC_INDICATORS.inflationMonthly}%
                        </span>
                      </div>

                      <div className="bg-corporate-900 p-3.5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase block">
                            {lang === 'pt' ? 'Inflação Homóloga' : 'Annual Inflation'}
                          </span>
                          <span className="text-xs font-mono text-gray-300 mt-0.5 block">
                            {lang === 'pt' ? 'Taxa anual acumulada' : 'Annual cumulative rate'}
                          </span>
                        </div>
                        <span className="font-mono text-xl font-bold text-emerald-400">
                          {ECONOMIC_INDICATORS.inflationAnnual}%
                        </span>
                      </div>

                      <div className="bg-corporate-900 p-3.5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase block">
                            {lang === 'pt' ? 'Variação Trimestral PIB' : 'Real GDP Growth'}
                          </span>
                          <span className="text-xs font-mono text-gray-300 mt-0.5 block">
                            {lang === 'pt' ? 'Crescimento real da economia' : 'Real economic growth'}
                          </span>
                        </div>
                        <span className="font-mono text-xl font-bold text-emerald-400">
                          +{ECONOMIC_INDICATORS.gdpQuarterly}%
                        </span>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 3: EXCHANGE RATES TABLE */}
                {sidebarTab === 'table' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-gold-400 font-bold uppercase">
                        {lang === 'pt' ? 'Cotações Oficiais MZN' : 'Official MZN Rates'}
                      </span>
                      <span className="text-[10px] text-gray-400">{lastUpdatedTime}</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400">
                            <th className="pb-2 font-normal">{lang === 'pt' ? 'Moeda' : 'Currency'}</th>
                            <th className="pb-2 font-normal text-right">{lang === 'pt' ? 'Compra' : 'Buy'}</th>
                            <th className="pb-2 font-normal text-right">{lang === 'pt' ? 'Venda' : 'Sell'}</th>
                            <th className="pb-2 font-normal text-right">{lang === 'pt' ? 'Média' : 'Mid'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {rates.map((r) => (
                            <tr
                              key={r.code}
                              onClick={() => {
                                setFromCurrency(r.code);
                                setToCurrency('MZN');
                                setSidebarTab('converter');
                              }}
                              className="hover:bg-white/5 transition-colors cursor-pointer"
                              title={lang === 'pt' ? 'Clique para converter' : 'Click to convert'}
                            >
                              <td className="py-2 font-bold text-white flex items-center space-x-1.5">
                                <span className="text-base">{r.flag}</span>
                                <span className="text-gold-300">{r.code}</span>
                              </td>
                              <td className="py-2 text-right text-gray-300">{r.buy.toFixed(2)}</td>
                              <td className="py-2 text-right text-gray-300">{r.sell.toFixed(2)}</td>
                              <td className="py-2 text-right font-bold text-white">{r.mid.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-[10px] font-mono text-gray-400">
                      * {lang === 'pt' ? 'Clique em qualquer moeda para efetuar cálculos no conversor.' : 'Click on any currency to convert.'}
                    </p>
                  </div>
                )}

              </div>

              {/* Sidebar Footer */}
              <div className="p-4 bg-corporate-900 border-t border-white/10 sticky bottom-0 z-20 text-[10px] font-mono text-gray-400 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'pt' ? 'Fonte: bancomoc.mz' : 'Source: bancomoc.mz'}</span>
                </div>
                <a
                  href="https://www.bancomoc.mz"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold-400 hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <span>{lang === 'pt' ? 'Portal BM' : 'BM Portal'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
