/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { accessControl } from '../services/accessControl';
import { AccessSessionState } from '../types';
import { Lock, ShieldAlert, KeyRound, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Clock, Globe } from 'lucide-react';
import ciitLogoImg from '../assets/images/ciit_2026_logo_1787657793393.png';

interface AccessGatekeeperProps {
  sessionState: AccessSessionState;
  lang?: 'pt' | 'en';
}

export default function AccessGatekeeper({ sessionState, lang = 'pt' }: AccessGatekeeperProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDemoHelper, setShowDemoHelper] = useState(false);

  const isExpired = sessionState.status === 'expired';
  const isRevoked = sessionState.status === 'revoked';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || loading) return;

    setLoading(true);
    setErrorMessage(null);

    const res = await accessControl.validateAccessCode(code);

    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.error || (lang === 'pt' ? 'Código de acesso inválido ou expirado.' : 'Invalid or expired access code.'));
    }
  };

  const handleApplyPreset = (presetCode: string) => {
    setCode(presetCode);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 px-4 py-8">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-amber-500/10 blur-[120px] pointer-events-none rounded-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-none" />

      {/* TOP HEADER: REPUBLIC & PROVINCE RECOGNITION */}
      <div className="relative z-10 w-full max-w-lg mx-auto text-center pt-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900/80 border border-amber-500/30 text-amber-400 text-[10px] font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>República de Moçambique • Província de Tete</span>
        </div>
      </div>

      {/* MAIN AUTHENTICATION CARD */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="bg-slate-900/90 border border-amber-500/30 p-6 sm:p-8 rounded-none shadow-2xl backdrop-blur-xl relative">
          
          {/* Subtle Top Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

          {/* APPLICATION LOGO & IDENTITY */}
          <div className="text-center mb-6 pt-2">
            <img
              src={ciitLogoImg}
              alt="CIIT 2026 Logo"
              className="h-14 sm:h-16 w-auto mx-auto object-contain drop-shadow-md mb-4"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
              Conferência Internacional de Investimentos de Tete
            </span>
          </div>

          {/* STATE A: EXPIRED ACCESS SCREEN (WHEN 24H COMPLETES) */}
          {isExpired ? (
            <div className="text-center space-y-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-red-500/10 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-red-400">
                  {lang === 'pt' ? 'Acesso Expirado' : 'Access Expired'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                  {sessionState.expiredMessage || (lang === 'pt'
                    ? 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.'
                    : 'This access code expired after 24 hours. Please request a new code to continue.')}
                </p>
              </div>
            </div>
          ) : isRevoked ? (
            /* STATE B: REVOKED ACCESS SCREEN */
            <div className="text-center space-y-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-amber-400">
                  {lang === 'pt' ? 'Acesso Revogado' : 'Access Revoked'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                  {sessionState.expiredMessage || (lang === 'pt'
                    ? 'Este código de acesso foi revogado pela administração. Introduza um código válido.'
                    : 'This access code was revoked by the administration. Please enter a valid code.')}
                </p>
              </div>
            </div>
          ) : (
            /* STATE C: DEFAULT RESTRICTED ACCESS SCREEN */
            <div className="text-center space-y-2 mb-6">
              <div className="w-10 h-10 rounded-none bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-white">
                {lang === 'pt' ? 'Acesso Restrito' : 'Restricted Access'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {lang === 'pt'
                  ? 'Introduza o código de acesso para continuar.'
                  : 'Enter the access code to continue.'}
              </p>
            </div>
          )}

          {/* CODE ENTRY FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="access-code-input" className="block text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                {lang === 'pt' ? 'Código de Acesso' : 'Access Code'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="access-code-input"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder={lang === 'pt' ? 'Ex: CIIT2026' : 'e.g. CIIT2026'}
                  disabled={loading}
                  autoComplete="off"
                  spellCheck="false"
                  className="w-full bg-slate-950/90 text-white font-mono text-sm tracking-wider uppercase pl-10 pr-4 py-3 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none rounded-none placeholder-slate-600 transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>

            {/* ERROR MESSAGE NOTIFICATION */}
            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-300 text-xs flex items-start space-x-2 rounded-none animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              id="btn-access-enter"
              type="submit"
              disabled={loading || !code.trim()}
              className={`w-full py-3 px-6 font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all duration-200 rounded-none cursor-pointer ${
                loading || !code.trim()
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border border-amber-400 shadow-lg shadow-amber-500/20 active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'pt' ? 'A Validar...' : 'Validating...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'pt' ? 'Entrar' : 'Enter'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 24H VALIDITY SECURITY NOTICE */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'pt' ? 'Validade: 24h contínuas' : 'Validity: 24h continuous'}</span>
            </span>
            <button
              type="button"
              onClick={() => setShowDemoHelper(!showDemoHelper)}
              className="text-amber-400 hover:text-amber-300 transition-colors underline cursor-pointer text-[10px]"
            >
              {showDemoHelper ? (lang === 'pt' ? 'Ocultar Códigos' : 'Hide Codes') : (lang === 'pt' ? 'Ver Códigos Oficiais' : 'View Official Codes')}
            </button>
          </div>

          {/* HELPER DRAWER WITH PRE-CONFIGURED OFFICIAL CODES */}
          {showDemoHelper && (
            <div className="mt-4 p-3 bg-slate-950/90 border border-amber-500/20 text-xs rounded-none space-y-2 animate-fadeIn">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                {lang === 'pt' ? 'Códigos Disponíveis (Clique para aplicar):' : 'Available Codes (Click to apply):'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {[
                  { code: 'CIIT2026', label: 'Oficial CIIT' },
                  { code: 'TETE-INVEST-2026', label: 'Investidor' },
                  { code: 'CIIT-VIP-ACCESS', label: 'VIP Executivo' },
                  { code: 'GOV-TETE-2026', label: 'Governo' },
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleApplyPreset(item.code)}
                    className="p-1.5 bg-slate-900 hover:bg-amber-500/10 border border-slate-700 hover:border-amber-500/50 text-left transition-all rounded-none cursor-pointer flex items-center justify-between"
                  >
                    <span className="font-mono text-[11px] text-amber-300 font-bold">{item.code}</span>
                    <span className="text-[9px] text-slate-400">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER METADATA & SUPPORT INFO */}
      <div className="relative z-10 w-full max-w-lg mx-auto text-center pb-2 text-[11px] text-slate-500 font-mono space-y-1">
        <p>© 2026 CIIT 2026 • Plataforma de Investimentos de Tete</p>
        <p className="text-[10px] text-slate-600">
          {lang === 'pt' ? 'Suporte & Credenciamento: invest@tete.gov.mz' : 'Support & Accreditation: invest@tete.gov.mz'}
        </p>
      </div>

    </div>
  );
}
