/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  KeyRound, 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  RefreshCw, 
  Info,
  ShieldCheck,
  Building2,
  Calendar,
  Globe2
} from 'lucide-react';
import { accessControl, DEFAULT_STARTER_CODES } from '../services/accessControlService';
import { AccessCodeRecord, AccessVerificationResult } from '../types';
import ciitLogoImg from '../assets/images/ciit_2026_logo_1787657793393.png';

interface AccessGateProps {
  lang: 'pt' | 'en';
  children: React.ReactNode;
  onAccessStateChange?: (record: AccessCodeRecord | null, remainingMs: number) => void;
}

export default function AccessGate({ lang, children, onAccessStateChange }: AccessGateProps) {
  const [inputCode, setInputCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeCodeRecord, setActiveCodeRecord] = useState<AccessCodeRecord | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expiredState, setExpiredState] = useState<{ isExpired: boolean; code?: string } | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const [showHelperCodes, setShowHelperCodes] = useState(false);

  // Initial check on mount from persistent storage
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const performInitialAuth = async () => {
      setIsLoading(true);
      const storedCode = accessControl.getStoredCode();

      if (!storedCode) {
        setIsLoading(false);
        setIsAuthorized(false);
        return;
      }

      const result = await accessControl.validateAndActivateCode(storedCode);

      if (result.allowed && result.codeRecord) {
        setActiveCodeRecord(result.codeRecord);
        setIsAuthorized(true);
        setRemainingMs(result.remainingMs || 0);
        setExpiredState(null);
        if (onAccessStateChange) {
          onAccessStateChange(result.codeRecord, result.remainingMs || 0);
        }

        // Setup real-time listener for code revocation or expiration in Firestore
        unsubscribeSnapshot = accessControl.subscribeToCodeStatus(result.codeRecord.code, (liveResult) => {
          if (!liveResult.allowed) {
            setIsAuthorized(false);
            if (liveResult.reason === 'EXPIRED') {
              setExpiredState({ isExpired: true, code: result.codeRecord?.code });
            } else {
              setErrorMessage(liveResult.message);
            }
            setActiveCodeRecord(null);
            accessControl.clearStoredCode();
            if (onAccessStateChange) {
              onAccessStateChange(null, 0);
            }
          } else if (liveResult.codeRecord) {
            setActiveCodeRecord(liveResult.codeRecord);
            setRemainingMs(liveResult.remainingMs || 0);
            if (onAccessStateChange) {
              onAccessStateChange(liveResult.codeRecord, liveResult.remainingMs || 0);
            }
          }
        });
      } else {
        accessControl.clearStoredCode();
        setIsAuthorized(false);
        if (result.reason === 'EXPIRED') {
          setExpiredState({ isExpired: true, code: storedCode });
        } else if (result.reason === 'REVOKED') {
          setErrorMessage(result.message);
        }
      }
      setIsLoading(false);
    };

    performInitialAuth();

    return () => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  // Real-time ticking interval for remaining time calculation
  useEffect(() => {
    if (!isAuthorized || !activeCodeRecord?.expiresAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const left = (activeCodeRecord.expiresAt || 0) - now;
      if (left <= 0) {
        // Expired in real-time!
        setRemainingMs(0);
        setIsAuthorized(false);
        setExpiredState({ isExpired: true, code: activeCodeRecord.code });
        accessControl.clearStoredCode();
        if (onAccessStateChange) {
          onAccessStateChange(null, 0);
        }
      } else {
        setRemainingMs(left);
        if (onAccessStateChange) {
          onAccessStateChange(activeCodeRecord, left);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthorized, activeCodeRecord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setErrorMessage(
        lang === 'pt' ? 'Por favor, introduza o seu código de acesso.' : 'Please enter your access code.'
      );
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);
    setExpiredState(null);

    try {
      const result = await accessControl.validateAndActivateCode(inputCode.trim());

      if (result.allowed && result.codeRecord) {
        setActiveCodeRecord(result.codeRecord);
        setIsAuthorized(true);
        setRemainingMs(result.remainingMs || 0);
        setInputCode('');
        if (onAccessStateChange) {
          onAccessStateChange(result.codeRecord, result.remainingMs || 0);
        }
      } else {
        if (result.reason === 'EXPIRED') {
          setExpiredState({ isExpired: true, code: inputCode.trim().toUpperCase() });
        } else {
          setErrorMessage(lang === 'pt' ? result.message : result.messageEn);
        }
      }
    } catch (err: any) {
      setErrorMessage(
        lang === 'pt' 
          ? 'Erro de comunicação com o servidor de autenticação.' 
          : 'Communication error with authentication server.'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSelectDemoCode = (code: string) => {
    setInputCode(code);
    setErrorMessage(null);
    setExpiredState(null);
  };

  // If initial load in progress, show subtle elegant splash
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
          <img
            src={ciitLogoImg}
            alt="CIIT 2026 Logo"
            className="h-16 w-auto object-contain animate-pulse drop-shadow-lg"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center space-x-2 text-amber-400 text-sm font-mono tracking-wider">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
            <span>{lang === 'pt' ? 'A verificar credenciais seguras...' : 'Verifying secure credentials...'}</span>
          </div>
        </div>
      </div>
    );
  }

  // If authorized and valid, render application
  if (isAuthorized && activeCodeRecord) {
    return <>{children}</>;
  }

  // EXPIRED ACCESS SCREEN
  if (expiredState?.isExpired) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden selection:bg-amber-500 selection:text-slate-950">
        {/* Background glow & subtle ambient graphics */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(217,119,6,0.12),transparent_70%)]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md bg-slate-900/90 border border-red-500/30 rounded-2xl shadow-2xl backdrop-blur-xl p-6 sm:p-8 relative z-10 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={ciitLogoImg}
              alt="CIIT 2026 Logo"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Expired Icon */}
          <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center mb-4 text-red-400">
            <Clock className="w-7 h-7" />
          </div>

          {/* Specific Exact Requirements */}
          <h1 className="text-2xl font-bold font-serif text-white tracking-wide mb-2">
            {lang === 'pt' ? 'Acesso Expirado' : 'Access Expired'}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
            {lang === 'pt'
              ? 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.'
              : 'This access code has expired after 24 hours. Request a new code to continue.'}
          </p>

          {expiredState.code && (
            <div className="mb-6 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>{lang === 'pt' ? 'Código expirado:' : 'Expired code:'}</span>
              <span className="text-red-400 font-bold line-through tracking-wider">{expiredState.code}</span>
            </div>
          )}

          <button
            id="btn-try-another-code"
            onClick={() => {
              setExpiredState(null);
              setErrorMessage(null);
              setInputCode('');
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center space-x-2 cursor-pointer font-sans"
          >
            <KeyRound className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Introduzir Novo Código' : 'Enter New Code'}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          <span>CIIT 2026 • Província de Tete, Moçambique</span>
        </div>
      </div>
    );
  }

  // RESTRICTED ACCESS SCREEN (Authentication Form)
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,6,0.15),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top institution bar */}
      <div className="w-full max-w-5xl flex items-center justify-between py-2 text-xs font-mono text-slate-400 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">República de Moçambique • Governo de Tete</span>
          <span className="sm:hidden">Gov. Tete</span>
        </div>
        <div className="flex items-center space-x-2 text-amber-400/90">
          <Calendar className="w-3.5 h-3.5" />
          <span>2026</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md my-auto relative z-10">
        <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

          {/* 1. Logotipo / Nome da Aplicação */}
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={ciitLogoImg}
              alt="CIIT 2026 Logo"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-md mb-2"
              referrerPolicy="no-referrer"
            />
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Conferência Internacional de Investimentos de Tete
            </span>
          </div>

          {/* 2. Título Exato: "Acesso Restrito" */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
              {lang === 'pt' ? 'Acesso Restrito' : 'Restricted Access'}
            </h1>
            {/* 3. Texto Exato: "Introduza o código de acesso para continuar." */}
            <p className="text-sm text-slate-300 mt-2 font-light">
              {lang === 'pt'
                ? 'Introduza o código de acesso para continuar.'
                : 'Enter your access code to continue.'}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-950/70 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-start space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="access-code-input" className="block text-xs font-mono text-slate-300 font-medium mb-1.5">
                {lang === 'pt' ? 'Código de Acesso' : 'Access Code'}
              </label>
              <div className="relative">
                <input
                  id="access-code-input"
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value.toUpperCase());
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="ex: CIIT-2026-VIP"
                  autoFocus
                  disabled={isVerifying}
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl text-white font-mono text-base tracking-wider placeholder:text-slate-600 placeholder:font-sans uppercase transition-all outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center space-x-1 font-light">
                <Clock className="w-3 h-3 text-amber-500 inline-block mr-1 flex-shrink-0" />
                <span>
                  {lang === 'pt'
                    ? 'Validade automática de 24 horas a partir do primeiro uso.'
                    : 'Automatic 24-hour validity starting upon first use.'}
                </span>
              </p>
            </div>

            {/* 4. Botão "Entrar" */}
            <button
              id="btn-access-enter"
              type="submit"
              disabled={isVerifying || !inputCode.trim()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-sans"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'pt' ? 'A validar código...' : 'Validating code...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'pt' ? 'Entrar' : 'Enter'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Codes Assist Accordion */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowHelperCodes(!showHelperCodes)}
              className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-amber-400 transition-colors py-1 cursor-pointer font-mono"
            >
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'pt' ? 'Códigos de Acesso Disponíveis' : 'Available Access Codes'}</span>
              </span>
              <span className="text-[10px] text-slate-500">{showHelperCodes ? '▲' : '▼'}</span>
            </button>

            {showHelperCodes && (
              <div className="mt-3 space-y-2 animate-fadeIn bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <p className="text-[10px] text-slate-400 leading-tight mb-2">
                  {lang === 'pt'
                    ? 'Clique num código para preencher e validar instantaneamente no Firebase Firestore:'
                    : 'Click any code to fill and validate instantly in Firebase Firestore:'}
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {DEFAULT_STARTER_CODES.map((starter) => (
                    <button
                      key={starter.code}
                      type="button"
                      onClick={() => handleSelectDemoCode(starter.code)}
                      className="text-left px-2.5 py-1.5 rounded bg-slate-900 hover:bg-amber-500/20 hover:border-amber-500/40 border border-slate-800 text-xs font-mono text-amber-300 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="font-bold">{starter.code}</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-sans truncate ml-2">
                        {starter.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Credentials */}
      <div className="w-full max-w-5xl py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2 border-t border-slate-800/80">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{lang === 'pt' ? 'Protegido por Cloud Firestore 24h Token Gate' : 'Protected by Cloud Firestore 24h Token Gate'}</span>
        </div>
        <div>
          <span>© 2026 CIIT • Governo da Província de Tete</span>
        </div>
      </div>
    </div>
  );
}
