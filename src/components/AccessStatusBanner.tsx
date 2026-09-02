/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Key, 
  LogOut, 
  ChevronDown, 
  ChevronUp,
  Info,
  Calendar
} from 'lucide-react';
import { AccessCodeRecord } from '../types';
import { accessControl } from '../services/accessControlService';

interface AccessStatusBannerProps {
  lang: 'pt' | 'en';
  codeRecord: AccessCodeRecord | null;
  remainingMs: number;
  onExitSession: () => void;
}

export default function AccessStatusBanner({
  lang,
  codeRecord,
  remainingMs,
  onExitSession
}: AccessStatusBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!codeRecord) return null;

  const isUnlimited = codeRecord.isUnlimited || codeRecord.code === 'ADMIN-DIVA';

  // Calculate hours, minutes, seconds remaining
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isCritical = !isUnlimited && totalSeconds < 3600; // Less than 1 hour remaining for expiring passes

  // Format date helper
  const formatDate = (timestamp?: number | null) => {
    if (isUnlimited && !timestamp) return lang === 'pt' ? 'Ilimitado (Sem Expiração)' : 'Unlimited (No Expiration)';
    if (!timestamp) return '---';
    return new Date(timestamp).toLocaleString(lang === 'pt' ? 'pt-MZ' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleLogout = () => {
    accessControl.clearStoredCode();
    onExitSession();
  };

  return (
    <div id="access-status-indicator" className="relative z-40">
      {/* Banner Strip */}
      <div 
        className={`px-3 py-1.5 transition-colors duration-300 text-xs font-mono flex items-center justify-between border-b ${
          isCritical 
            ? 'bg-red-950/90 text-red-200 border-red-500/40 animate-pulse' 
            : isUnlimited
              ? 'bg-slate-900/98 text-amber-300 border-amber-500/40'
              : 'bg-slate-900/95 text-amber-300 border-amber-500/30'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2 px-1">
          {/* Left: Code info */}
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1 font-bold text-white bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
              <Key className="w-3 h-3 text-amber-400" />
              <span>{codeRecord.code}</span>
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              • {codeRecord.label || (isUnlimited ? 'Super Administrador' : (lang === 'pt' ? 'Passe de Acesso 24h' : '24h Access Pass'))}
            </span>
          </div>

          {/* Center: Validity Requirement text & Countdown */}
          <div className="flex items-center space-x-2 font-medium">
            {isUnlimited ? (
              <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === 'pt'
                    ? 'Acesso Ilimitado • Administrador Geral (Painel Admin Desbloqueado)'
                    : 'Unlimited Access • General Administrator (Admin Panel Unlocked)'}
                </span>
              </div>
            ) : isCritical ? (
              <div className="flex items-center space-x-1.5 text-red-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 animate-bounce text-red-400" />
                <span>
                  {lang === 'pt' ? 'Tempo Restante: ' : 'Time Remaining: '}
                  <span className="bg-red-900/80 px-1.5 py-0.5 rounded text-white tracking-widest">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === 'pt'
                    ? `Acesso válido por mais ${hours} horas e ${minutes} minutos.`
                    : `Access valid for ${hours} hours and ${minutes} minutes.`}
                </span>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-300 hover:text-white flex items-center space-x-1 hover:underline cursor-pointer"
            >
              <span>{lang === 'pt' ? 'Detalhes' : 'Details'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 flex items-center space-x-1 hover:underline cursor-pointer ml-1"
              title={lang === 'pt' ? 'Sair da Sessão' : 'Exit Session'}
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">{lang === 'pt' ? 'Sair' : 'Exit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details Tray */}
      {isExpanded && (
        <div className="bg-slate-950/98 border-b border-amber-500/30 text-slate-300 p-4 shadow-2xl backdrop-blur-md animate-fadeIn">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">{lang === 'pt' ? 'Código Ativo' : 'Active Code'}</span>
              <span className="text-amber-400 font-bold text-sm">{codeRecord.code}</span>
              <span className="text-slate-400 block text-[10px] mt-1">{codeRecord.label || 'Sessão Individual'}</span>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">{lang === 'pt' ? 'Primeiro Acesso (Ativação)' : 'First Access (Activated)'}</span>
              <span className="text-white font-medium">{formatDate(codeRecord.activatedAt)}</span>
              <span className="text-slate-500 block text-[10px] mt-1">
                {isUnlimited ? (lang === 'pt' ? 'Acesso Permanente' : 'Permanent Access') : (lang === 'pt' ? 'Início do ciclo de 24h' : '24h cycle start')}
              </span>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">{lang === 'pt' ? 'Expiração Automática' : 'Automatic Expiry'}</span>
              <span className={isUnlimited ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
                {isUnlimited ? (lang === 'pt' ? 'Sem limite de tempo (Ilimitado)' : 'No time limit (Unlimited)') : formatDate(codeRecord.expiresAt)}
              </span>
              <span className="text-slate-500 block text-[10px] mt-1">
                {isUnlimited ? (lang === 'pt' ? 'Acesso permanente de Administrador' : 'Permanent Administrator Access') : (lang === 'pt' ? 'Bloqueio irrecuperável após esta data' : 'Irrevocably locked after this date')}
              </span>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">{lang === 'pt' ? 'Estado no Firestore' : 'Firestore Status'}</span>
                <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isUnlimited ? 'ADMIN ILIMITADO' : codeRecord.status.toUpperCase()}</span>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 text-left text-[11px] text-red-400 hover:text-red-300 underline flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>{lang === 'pt' ? 'Trocar Código de Acesso' : 'Change Access Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
