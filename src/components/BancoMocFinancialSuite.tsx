/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  RefreshCw,
  ArrowRightLeft,
  Building2,
  ExternalLink,
  X,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Coins,
  Lock,
  Radio,
  Sliders,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import {
  exchangeRateService,
  ACCESS_BANK_OFFICIAL_RATES,
  ExchangeRateItem,
  RatesMetadata
} from '../services/exchangeRateService';

interface BancoMocFinancialSuiteProps {
  lang: 'pt' | 'en';
  onAdminToggle?: () => void;
  showAdmin?: boolean;
  isAdminUser?: boolean;
}

export { ACCESS_BANK_OFFICIAL_RATES as INITIAL_RATES };
export type { ExchangeRateItem };

export default function BancoMocFinancialSuite({
  lang,
  onAdminToggle,
  showAdmin,
  isAdminUser
}: BancoMocFinancialSuiteProps) {
  const [rates, setRates] = useState<ExchangeRateItem[]>(ACCESS_BANK_OFFICIAL_RATES);
  const [metadata, setMetadata] = useState<RatesMetadata>({
    source: 'Access Bank Moçambique',
    sourceUrl: 'https://mozambique.accessbankplc.com/pt',
    lastUpdated: Date.now(),
    lastUpdatedFormatted: '2 de Setembro de 2026',
    autoUpdateEnabled: true,
    refreshIntervalSeconds: 60
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [nextUpdateCountdown, setNextUpdateCountdown] = useState<number>(60);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(60);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sidebar Open State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'converter' | 'table' | 'live_settings'>('converter');

  // Currency Converter State
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('MZN');
  const [rateType, setRateType] = useState<'mid' | 'buy' | 'sell'>('mid');

  // 1. Subscribe to real-time rates from Firestore
  useEffect(() => {
    const unsubscribe = exchangeRateService.subscribeToRates((updatedRates, meta) => {
      setRates(updatedRates);
      if (meta) {
        setMetadata(meta);
        if (meta.autoUpdateEnabled !== undefined) {
          setAutoUpdate(meta.autoUpdateEnabled);
        }
        if (meta.refreshIntervalSeconds) {
          setRefreshInterval(meta.refreshIntervalSeconds);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Continuous Live Auto-Update Loop
  useEffect(() => {
    if (!autoUpdate) return;

    setNextUpdateCountdown(refreshInterval);

    // Countdown tick
    const countdownTimer = setInterval(() => {
      setNextUpdateCountdown((prev) => (prev > 1 ? prev - 1 : refreshInterval));
    }, 1000);

    // Main fetch timer
    const intervalTimer = setInterval(async () => {
      setIsRefreshing(true);
      await exchangeRateService.fetchLiveRates();
      setIsRefreshing(false);
    }, refreshInterval * 1000);

    return () => {
      clearInterval(countdownTimer);
      clearInterval(intervalTimer);
    };
  }, [autoUpdate, refreshInterval]);

  // Handle Manual Refresh
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    const result = await exchangeRateService.fetchLiveRates();
    setRates(result.rates);
    setMetadata(result.meta);
    setIsRefreshing(false);
    setNextUpdateCountdown(refreshInterval);
    
    setStatusMessage(lang === 'pt' ? 'Cotações Access Bank atualizadas!' : 'Access Bank rates updated!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Reset to Access Bank Official Values
  const handleResetToAccessBank = async () => {
    setIsRefreshing(true);
    const result = await exchangeRateService.resetToAccessBankOfficial();
    setRates(result.rates);
    setMetadata(result.meta);
    setIsRefreshing(false);
    setNextUpdateCountdown(refreshInterval);

    setStatusMessage(lang === 'pt' ? 'Restauradas cotações oficiais Access Bank!' : 'Reset to official Access Bank rates!');
    setTimeout(() => setStatusMessage(null), 3000);
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
      <div className="bg-slate-100/95 border-b border-slate-200 text-slate-900 overflow-hidden select-none relative z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex flex-row items-center justify-between gap-2">
          
          {/* Label Badge */}
          <div className="h-7 sm:h-8 flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 bg-amber-100 border border-amber-300 px-2 sm:px-2.5 text-[10px] sm:text-xs font-mono tracking-wider text-amber-900 font-bold uppercase">
            <span className={`w-2 h-2 rounded-full ${autoUpdate ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'} flex-shrink-0`}></span>
            <span className="hidden xs:inline sm:inline">
              {lang === 'pt' ? 'ACCESS BANK MOÇAMBIQUE' : 'ACCESS BANK MOZAMBIQUE'}
            </span>
            <span className="xs:hidden">ACCESS BANK</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-700 font-medium">
              {lang === 'pt' ? 'Câmbio em Tempo Real' : 'Live Forex Rates'}
            </span>
          </div>

          {/* Scrolling Rates Ticker */}
          <div
            className="flex-grow overflow-hidden relative min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex items-center space-x-3 sm:space-x-6 whitespace-nowrap ${
                isPaused ? '' : 'animate-marquee'
              }`}
            >
              {[...rates, ...rates].map((item, idx) => (
                <div
                  key={`${item.code}-${idx}`}
                  className="h-7 sm:h-8 inline-flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs md:text-[13px] font-mono bg-white border border-slate-300 px-2 sm:px-3 hover:border-amber-500 shadow-xs transition-colors cursor-pointer"
                  onClick={() => {
                    setFromCurrency(item.code);
                    setToCurrency('MZN');
                    setSidebarTab('converter');
                    setIsSidebarOpen(true);
                  }}
                  title={lang === 'pt' ? `Clique para converter ${item.code} (Compra: ${item.buy} | Venda: ${item.sell})` : `Click to convert ${item.code}`}
                >
                  <span className="text-sm sm:text-base">{item.flag}</span>
                  <span className="font-bold text-slate-900">{item.code}</span>
                  <span className="text-slate-800 font-semibold">
                    {item.mid.toFixed(2)}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold ${
                      item.change24h >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Quick Links & Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 text-xs font-mono">
            {/* Continuous Live Pulse Indicator */}
            {autoUpdate && (
              <span
                className="hidden lg:inline-flex items-center space-x-1 px-2 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold"
                title={lang === 'pt' ? `Atualização contínua ativa (${nextUpdateCountdown}s para próxima cotação)` : `Continuous update active (${nextUpdateCountdown}s)`}
              >
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                <span>{nextUpdateCountdown}s</span>
              </span>
            )}

            <button
              id="btn-refresh-rates"
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="h-7 sm:h-8 w-7 sm:w-8 flex items-center justify-center bg-white hover:bg-amber-100 border border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-900 transition-colors cursor-pointer flex-shrink-0 shadow-xs"
              title={lang === 'pt' ? 'Atualizar Cotações Agora' : 'Refresh Rates Now'}
            >
              <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
            </button>

            <button
              id="btn-open-sidebar-market"
              onClick={() => setIsSidebarOpen(true)}
              className="h-7 sm:h-8 px-2 sm:px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 sm:space-x-2 transition-all shadow-xs cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <ArrowRightLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">{lang === 'pt' ? 'Câmbio Access Bank' : 'Access Bank Forex'}</span>
              <span className="sm:hidden">{lang === 'pt' ? 'Câmbio' : 'Rates'}</span>
            </button>

            {/* Admin Lock Button ONLY visible if isAdminUser is true (code === 'ADMIN-DIVA') */}
            {isAdminUser && onAdminToggle && (
              <button
                id="btn-cambio-admin-lock"
                onClick={onAdminToggle}
                title={lang === 'pt' ? 'Painel Administrativo CIIT 2026 (Exclusivo ADMIN-DIVA)' : 'CIIT 2026 Admin Panel (ADMIN-DIVA Exclusive)'}
                aria-label={lang === 'pt' ? 'Painel Administrativo' : 'Admin Panel'}
                className={`h-7 sm:h-8 w-7 sm:w-8 flex items-center justify-center border transition-all duration-200 cursor-pointer flex-shrink-0 shadow-xs active:scale-95 ${
                  showAdmin
                    ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                    : 'bg-white hover:bg-amber-100 border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-900'
                }`}
              >
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. FLOATING SIDEBAR TOGGLE BUTTON (PERSISTENT ON RIGHT EDGE OF SCREEN) */}
      <button
        id="btn-float-sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-slate-50 border-l-4 border-y border-amber-500 text-slate-900 px-2 py-4 shadow-xl flex flex-col items-center space-y-2 cursor-pointer transition-all group hover:pr-3"
        title={lang === 'pt' ? 'Abrir Câmbio Access Bank Moçambique' : 'Open Access Bank Forex'}
      >
        <Building2 className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-mono uppercase font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 py-1 text-slate-800">
          {lang === 'pt' ? 'CÂMBIO ACCESS BANK' : 'ACCESS BANK FOREX'}
        </span>
        <ChevronRight className={`w-3.5 h-3.5 text-amber-600 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 3. DEDICATED SLIDE-OVER SIDEBAR FOR ACCESS BANK FOREX */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md sm:max-w-lg bg-white border-l border-slate-300 text-slate-900 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in-right">
              
              {/* Sidebar Header */}
              <div className="p-5 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-amber-100 text-amber-900 border border-amber-300">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 tracking-wide">
                        {lang === 'pt' ? 'Câmbio & Conversor' : 'Forex & Converter'}
                      </h3>
                      <p className="text-xs font-mono text-amber-800 uppercase tracking-wider font-bold">
                        {lang === 'pt' ? 'Access Bank Moçambique' : 'Access Bank Mozambique'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:border-amber-500 cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status toast message */}
                {statusMessage && (
                  <div className="mb-3 px-3 py-1.5 bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-mono font-bold flex items-center justify-between animate-fade-in">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  </div>
                )}

                {/* Sidebar Navigation Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-slate-200 p-1 border border-slate-300 text-xs font-mono uppercase font-bold">
                  <button
                    onClick={() => setSidebarTab('converter')}
                    className={`py-2 flex items-center justify-center space-x-1 transition-colors cursor-pointer ${
                      sidebarTab === 'converter'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{lang === 'pt' ? 'Conversor' : 'Convert'}</span>
                  </button>

                  <button
                    onClick={() => setSidebarTab('table')}
                    className={`py-2 flex items-center justify-center space-x-1 transition-colors cursor-pointer ${
                      sidebarTab === 'table'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{lang === 'pt' ? 'Cotações' : 'Rates'}</span>
                  </button>

                  <button
                    onClick={() => setSidebarTab('live_settings')}
                    className={`py-2 flex items-center justify-center space-x-1 transition-colors cursor-pointer ${
                      sidebarTab === 'live_settings'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{lang === 'pt' ? 'Contínuo' : 'Live Sync'}</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Content Body */}
              <div className="p-5 space-y-6 flex-grow">

                {/* TAB 1: CURRENCY CONVERTER */}
                {sidebarTab === 'converter' && (
                  <div className="space-y-5 animate-fade-in">
                    
                    <div className="bg-slate-50 border border-slate-300 p-4 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono text-slate-800 uppercase font-bold">
                          {lang === 'pt' ? 'Montante a Converter:' : 'Amount to Convert:'}
                        </label>
                        <span className="text-xs font-mono text-amber-800 font-bold">
                          {fromCurrency}
                        </span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={amount || ''}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border-2 border-slate-300 focus:border-amber-500 px-3.5 py-2.5 text-lg font-mono font-bold text-slate-900 focus:outline-none"
                        placeholder="1000"
                      />
                    </div>

                    {/* From/To Selection */}
                    <div className="grid grid-cols-11 gap-2 items-center">
                      <div className="col-span-5">
                        <label className="block text-xs font-mono text-slate-700 mb-1 uppercase font-bold">
                          {lang === 'pt' ? 'De (Origem):' : 'From:'}
                        </label>
                        <select
                          value={fromCurrency}
                          onChange={(e) => setFromCurrency(e.target.value)}
                          className="w-full bg-white border-2 border-slate-300 focus:border-amber-500 p-2 text-xs sm:text-sm font-mono font-bold text-slate-900 cursor-pointer"
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
                          className="p-2 bg-slate-100 hover:bg-amber-500 text-slate-800 hover:text-slate-950 transition-colors cursor-pointer border border-slate-300 shadow-xs"
                          title={lang === 'pt' ? 'Inverter Moedas' : 'Swap Currencies'}
                        >
                          <ArrowRightLeft className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="col-span-5">
                        <label className="block text-xs font-mono text-slate-700 mb-1 uppercase font-bold">
                          {lang === 'pt' ? 'Para (Destino):' : 'To:'}
                        </label>
                        <select
                          value={toCurrency}
                          onChange={(e) => setToCurrency(e.target.value)}
                          className="w-full bg-white border-2 border-slate-300 focus:border-amber-500 p-2 text-xs sm:text-sm font-mono font-bold text-slate-900 cursor-pointer"
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
                      <label className="block text-xs font-mono text-slate-700 mb-1 uppercase font-bold">
                        {lang === 'pt' ? 'Modalidade de Cotação Bancária:' : 'Banking Rate Type:'}
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                        {(['mid', 'buy', 'sell'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setRateType(mode)}
                            className={`py-1.5 uppercase font-bold border transition-colors cursor-pointer ${
                              rateType === mode
                                ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {mode === 'mid' ? (lang === 'pt' ? 'Média' : 'Mid') : mode === 'buy' ? (lang === 'pt' ? 'Compra' : 'Buy') : (lang === 'pt' ? 'Venda' : 'Sell')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Result Box */}
                    <div className="bg-amber-50 border-2 border-amber-400 p-4 relative shadow-xs">
                      <div className="text-xs font-mono text-amber-900 uppercase font-bold">
                        {lang === 'pt' ? 'Resultado Estimado:' : 'Estimated Result:'}
                      </div>
                      <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-950 mt-1">
                        {convertedValue.toLocaleString('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {' '}
                        <span className="text-lg text-amber-900 font-bold">{toCurrency}</span>
                      </div>
                      <p className="text-xs font-mono text-slate-700 mt-1.5 font-medium">
                        1 {fromCurrency} = {(convertedValue / (amount || 1)).toFixed(4)} {toCurrency}
                      </p>
                    </div>

                    {/* Quick Presets */}
                    <div>
                      <span className="text-xs font-mono text-slate-700 block mb-1.5 uppercase font-bold">
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
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-200 border border-slate-300 text-xs font-mono text-slate-800 font-semibold transition-colors cursor-pointer"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: EXCHANGE RATES TABLE (WITH ACCESS BANK HIGHLIGHTS) */}
                {sidebarTab === 'table' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center space-x-1.5">
                        <span className={`w-2 h-2 rounded-full ${autoUpdate ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`}></span>
                        <span className="text-amber-900 font-bold uppercase">
                          {lang === 'pt' ? 'Taxas Oficiais Access Bank' : 'Official Access Bank Rates'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 font-semibold">{metadata.lastUpdatedFormatted}</span>
                    </div>

                    <div className="overflow-x-auto bg-slate-50 border border-slate-300 p-2">
                      <table className="w-full text-left text-xs sm:text-sm font-mono">
                        <thead>
                          <tr className="border-b border-slate-300 text-slate-700">
                            <th className="pb-2 font-bold">{lang === 'pt' ? 'Moeda' : 'Currency'}</th>
                            <th className="pb-2 font-bold text-right">{lang === 'pt' ? 'Compra' : 'Buy'}</th>
                            <th className="pb-2 font-bold text-right">{lang === 'pt' ? 'Venda' : 'Sell'}</th>
                            <th className="pb-2 font-bold text-right">{lang === 'pt' ? 'Média' : 'Mid'}</th>
                            <th className="pb-2 font-bold text-right">{lang === 'pt' ? '24h' : '24h'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {rates.map((r) => (
                            <tr
                              key={r.code}
                              onClick={() => {
                                setFromCurrency(r.code);
                                setToCurrency('MZN');
                                setSidebarTab('converter');
                              }}
                              className="hover:bg-amber-100/50 transition-colors cursor-pointer"
                              title={lang === 'pt' ? 'Clique para converter' : 'Click to convert'}
                            >
                              <td className="py-2.5 font-bold text-slate-950 flex items-center space-x-1.5">
                                <span className="text-base">{r.flag}</span>
                                <div>
                                  <span className="text-amber-900 font-bold block">{r.code}</span>
                                  <span className="text-[10px] text-slate-500 font-normal">{r.name[lang]}</span>
                                </div>
                              </td>
                              <td className="py-2.5 text-right text-slate-800 font-medium">{r.buy.toFixed(2)}</td>
                              <td className="py-2.5 text-right text-slate-800 font-medium">{r.sell.toFixed(2)}</td>
                              <td className="py-2.5 text-right font-bold text-slate-950">{r.mid.toFixed(2)}</td>
                              <td className="py-2.5 text-right font-bold">
                                <span className={r.change24h >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                                  {r.change24h >= 0 ? `+${r.change24h}%` : `${r.change24h}%`}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-300 p-3 text-xs font-mono text-slate-700 flex items-start space-x-2">
                      <Info className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-950">
                          {lang === 'pt' ? 'Fonte Oficial:' : 'Official Source:'} Access Bank Moçambique
                        </p>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {lang === 'pt' 
                            ? 'Valores oficiais extraídos e sincronizados diretamente do portal Access Bank Moçambique. Todas as cotações são em Meticais (MZN).' 
                            : 'Official rates extracted and synchronized directly from Access Bank Mozambique. All rates in Meticais (MZN).'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CONTINUOUS LIVE SYNC SETTINGS */}
                {sidebarTab === 'live_settings' && (
                  <div className="space-y-5 animate-fade-in">
                    
                    {/* Auto Update Switch Card */}
                    <div className="bg-slate-50 border border-slate-300 p-4 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-mono uppercase text-slate-900 font-bold flex items-center space-x-1.5">
                            <Radio className={`w-4 h-4 ${autoUpdate ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
                            <span>{lang === 'pt' ? 'Atualização Contínua em Tempo Real' : 'Continuous Live Updates'}</span>
                          </h4>
                          <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                            {lang === 'pt'
                              ? 'Mantém as taxas sincronizadas em background entre todos os utilizadores.'
                              : 'Keeps forex rates synchronized in background across all users.'}
                          </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={autoUpdate}
                            onChange={(e) => setAutoUpdate(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>

                      {/* Interval Selector */}
                      <div>
                        <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-bold">
                          {lang === 'pt' ? 'Frequência de Atualização:' : 'Update Frequency:'}
                        </label>
                        <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                          {[
                            { label: '15s', sec: 15 },
                            { label: '30s', sec: 30 },
                            { label: '1 min', sec: 60 },
                            { label: '5 min', sec: 300 }
                          ].map((freq) => (
                            <button
                              key={freq.sec}
                              onClick={() => setRefreshInterval(freq.sec)}
                              className={`py-2 border font-bold text-center transition-colors cursor-pointer ${
                                refreshInterval === freq.sec
                                  ? 'bg-amber-500 text-slate-950 border-amber-600'
                                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              {freq.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Countdown & Status */}
                      {autoUpdate && (
                        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-emerald-600 animate-spin" />
                            <span>{lang === 'pt' ? 'Próxima verificação em:' : 'Next check in:'}</span>
                          </div>
                          <span className="font-bold text-sm">{nextUpdateCountdown} segundos</span>
                        </div>
                      )}
                    </div>

                    {/* Actions Panel */}
                    <div className="space-y-2">
                      <button
                        onClick={handleRefreshData}
                        disabled={isRefreshing}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>{lang === 'pt' ? 'Atualizar Agora (Forçar Sincronização)' : 'Refresh Now (Force Sync)'}</span>
                      </button>

                      <button
                        onClick={handleResetToAccessBank}
                        disabled={isRefreshing}
                        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-mono font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{lang === 'pt' ? 'Restaurar Valores Oficiais Access Bank' : 'Reset to Access Bank Baseline'}</span>
                      </button>
                    </div>

                    {/* External Source Box */}
                    <div className="bg-slate-50 border border-slate-300 p-4 space-y-2 text-xs font-mono">
                      <h5 className="font-bold text-slate-900 uppercase">
                        {lang === 'pt' ? 'Portal Oficial de Câmbio:' : 'Official Exchange Portal:'}
                      </h5>
                      <div>
                        <a
                          href="https://mozambique.accessbankplc.com/pt"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-2 bg-white hover:bg-amber-50 border border-slate-300 text-slate-800 font-medium transition-colors"
                        >
                          <span className="flex items-center space-x-1.5">
                            <span>🏦</span>
                            <span className="font-bold text-amber-900">Access Bank Moçambique</span>
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Sidebar Footer */}
              <div className="p-4 bg-slate-100 border-t border-slate-300 sticky bottom-0 z-20 text-xs font-mono text-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span className="font-semibold">Access Bank Moçambique</span>
                </div>
                <a
                  href="https://mozambique.accessbankplc.com/pt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 transition-colors"
                >
                  <span>{lang === 'pt' ? 'Aceder Portal' : 'Open Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
