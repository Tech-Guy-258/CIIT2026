/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AccessSessionState } from '../types';
import { accessControl } from '../services/accessControl';
import { Clock, ShieldCheck, KeyRound, AlertTriangle, LogOut, Info } from 'lucide-react';

interface AccessTimeIndicatorProps {
  sessionState: AccessSessionState;
  lang?: 'pt' | 'en';
}

export default function AccessTimeIndicator({ sessionState, lang = 'pt' }: AccessTimeIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!sessionState.isAuthenticated || !sessionState.expiresAt) {
    return null;
  }

  const isExpiringSoon = sessionState.isExpiringSoon; // < 1 hour
  const remainingMs = sessionState.remainingMs;

  const handleLogout = () => {
    accessControl.logout();
  };

  return (
    <div id="access-time-indicator" className="relative z-40 bg-slate-950 border-b border-amber-500/20 text-slate-200 text-xs py-1 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* LEFT: ACCESS STATUS BADGE & CODE */}
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 border border-amber-500/30">
            <KeyRound className="w-3 h-3 text-amber-400" />
            <span>{sessionState.code}</span>
          </span>

          <span className="hidden sm:inline-block text-[10px] text-slate-400 font-light">
            • {lang === 'pt' ? 'Sessão 24h Ativa' : '24h Active Session'}
          </span>
        </div>

        {/* CENTER / RIGHT: 24H DURATION & LIVE COUNTDOWN DISPLAY */}
        <div className="flex items-center space-x-3 ml-auto">
          
          {isExpiringSoon ? (
            /* CRITICAL WARNING: LESS THAN 1 HOUR REMAINING (LIVE COUNTDOWN) */
            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-red-500/15 border border-red-500/40 text-red-400 font-mono text-[11px] font-bold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>
                {lang === 'pt' ? 'Expira em:' : 'Expires in:'} <span className="text-white tracking-widest">{sessionState.formattedRemaining}</span>
              </span>
            </div>
          ) : (
            /* STANDARD 24H REMAINING BADGE (e.g. "Acesso válido por mais 17 horas e 32 minutos.") */
            <div className="flex items-center space-x-1.5 text-slate-300 font-mono text-[10px] sm:text-[11px]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">
                {sessionState.formattedRemaining}
              </span>
            </div>
          )}

          {/* QUICK LOGOUT / SWITCH CODE BUTTON */}
          <button
            type="button"
            onClick={handleLogout}
            title={lang === 'pt' ? 'Bloquear / Trocar Código' : 'Lock / Switch Code'}
            className="flex items-center space-x-1 text-[10px] font-mono text-slate-400 hover:text-amber-400 transition-colors p-1 border border-slate-800 hover:border-amber-500/40 cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden md:inline">{lang === 'pt' ? 'Sair' : 'Exit'}</span>
          </button>

        </div>

      </div>
    </div>
  );
}
