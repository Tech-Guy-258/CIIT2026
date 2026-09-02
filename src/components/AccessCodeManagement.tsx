/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Key, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Copy, 
  Check, 
  AlertCircle, 
  RotateCcw, 
  Sparkles,
  Smartphone,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
  Search,
  X,
  Filter
} from 'lucide-react';
import { accessControl, DEFAULT_STARTER_CODES } from '../services/accessControlService';
import { AccessCodeRecord, AccessCodeStatus } from '../types';

interface AccessCodeManagementProps {
  lang: 'pt' | 'en';
}

export default function AccessCodeManagement({ lang }: AccessCodeManagementProps) {
  const [codes, setCodes] = useState<AccessCodeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newHours, setNewHours] = useState(24);
  const [newNotes, setNewNotes] = useState('');
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unactivated' | 'expired' | 'revoked' | 'super'>('all');

  // Revoke modal state
  const [revokingCode, setRevokingCode] = useState<AccessCodeRecord | null>(null);
  const [revokeReason, setRevokeReason] = useState('');

  // Delete modal state
  const [deletingCode, setDeletingCode] = useState<AccessCodeRecord | null>(null);

  // Reactivate modal state
  const [reactivatingCode, setReactivatingCode] = useState<AccessCodeRecord | null>(null);

  // Global action notification
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Subscribe to all codes in Firestore in real time
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = accessControl.subscribeAllCodes((updatedList) => {
      setCodes(updatedList);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleGenerateRandomCode = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefixes = ['CIIT-2026', 'TETE-INV', 'DELEGATE', 'VIP-TETE', 'PARTNER'];
    const chosenPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    setNewCode(`${chosenPrefix}-${randomSuffix}`);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    setIsSubmitting(true);
    setFormFeedback(null);

    const result = await accessControl.createCode(
      newCode.trim(),
      newLabel.trim() || (isSuperUser ? 'Super Administrador (Ilimitado)' : 'Passe de Acesso 24h'),
      isSuperUser ? 0 : (newHours || 24),
      newNotes.trim(),
      isSuperUser
    );

    setIsSubmitting(false);

    if (result.success) {
      setFormFeedback({ type: 'success', message: result.message });
      showToast(result.message, 'success');
      setNewCode('');
      setNewLabel('');
      setNewNotes('');
      setIsSuperUser(false);
      setTimeout(() => {
        setShowCreateModal(false);
        setFormFeedback(null);
      }, 1200);
    } else {
      setFormFeedback({ type: 'error', message: result.message });
    }
  };

  const handleRevokeConfirm = async () => {
    if (!revokingCode) return;
    setIsSubmitting(true);
    const result = await accessControl.revokeCode(revokingCode.code, revokeReason || 'Revogado pela administração');
    setIsSubmitting(false);
    showToast(result.message, result.success ? 'success' : 'error');
    setRevokingCode(null);
    setRevokeReason('');
  };

  const handleReactivateConfirm = async () => {
    if (!reactivatingCode) return;
    setIsSubmitting(true);
    const result = await accessControl.resetOrReactivateCode(reactivatingCode.code);
    setIsSubmitting(false);
    showToast(result.message, result.success ? 'success' : 'error');
    setReactivatingCode(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCode) return;
    setIsSubmitting(true);
    const result = await accessControl.deleteCode(deletingCode.code);
    setIsSubmitting(false);
    showToast(result.message, result.success ? 'success' : 'error');
    setDeletingCode(null);
  };

  const handleInitDefaultCodes = async () => {
    setIsSubmitting(true);
    await accessControl.initializeStarterCodes();
    for (const starter of DEFAULT_STARTER_CODES) {
      await accessControl.createCode(starter.code, starter.label, starter.maxHours);
    }
    setIsSubmitting(false);
    showToast(lang === 'pt' ? 'Códigos padrão inicializados no Firestore com sucesso!' : 'Default codes initialized in Firestore!', 'success');
  };

  const formatTimestamp = (ts?: number | null) => {
    if (!ts) return '---';
    return new Date(ts).toLocaleString(lang === 'pt' ? 'pt-MZ' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredCodes = useMemo(() => {
    return codes.filter((item) => {
      // Status filter
      if (statusFilter === 'active' && (item.status !== 'active' || item.isUnlimited || item.code === 'ADMIN-DIVA')) return false;
      if (statusFilter === 'super' && !(item.isUnlimited || item.code === 'ADMIN-DIVA')) return false;
      if (statusFilter === 'unactivated' && item.status !== 'unactivated') return false;
      if (statusFilter === 'expired' && item.status !== 'expired' && !(item.expiresAt && Date.now() >= item.expiresAt)) return false;
      if (statusFilter === 'revoked' && item.status !== 'revoked') return false;

      // Text search
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase().trim();
      return (
        item.code.toLowerCase().includes(term) ||
        (item.label && item.label.toLowerCase().includes(term)) ||
        (item.notes && item.notes.toLowerCase().includes(term))
      );
    });
  }, [codes, searchTerm, statusFilter]);

  const getRemainingDisplay = (record: AccessCodeRecord) => {
    if (record.isUnlimited || record.code === 'ADMIN-DIVA') {
      return <span className="text-amber-400 font-bold">{lang === 'pt' ? 'Ilimitado (Permanente)' : 'Unlimited (Permanent)'}</span>;
    }
    if (record.status === 'revoked') {
      return <span className="text-red-400 font-bold">{lang === 'pt' ? 'Revogado' : 'Revoked'}</span>;
    }
    if (record.status === 'expired' || (record.expiresAt && Date.now() >= record.expiresAt)) {
      return <span className="text-red-400 font-bold">{lang === 'pt' ? 'Expirado (24h)' : 'Expired (24h)'}</span>;
    }
    if (!record.activatedAt || record.status === 'unactivated') {
      return <span className="text-amber-400">{lang === 'pt' ? '24h (Após primeiro uso)' : '24h (Upon first use)'}</span>;
    }
    const msLeft = (record.expiresAt || 0) - Date.now();
    if (msLeft <= 0) {
      return <span className="text-red-400 font-bold">{lang === 'pt' ? 'Expirado' : 'Expired'}</span>;
    }
    const hours = Math.floor(msLeft / (1000 * 60 * 60));
    const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
    return (
      <span className="text-emerald-400 font-bold">
        {hours}h {minutes}m {lang === 'pt' ? 'restantes' : 'left'}
      </span>
    );
  };

  const getStatusBadge = (record: AccessCodeRecord) => {
    if (record.isUnlimited || record.code === 'ADMIN-DIVA') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/50 flex items-center space-x-1">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>{lang === 'pt' ? 'ADMIN (ILIMITADO)' : 'ADMIN (UNLIMITED)'}</span>
        </span>
      );
    }

    const isActuallyExpired = record.expiresAt && Date.now() >= record.expiresAt;
    
    if (record.status === 'revoked') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-500/40">
          {lang === 'pt' ? 'REVOGADO' : 'REVOKED'}
        </span>
      );
    }
    if (record.status === 'expired' || isActuallyExpired) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 text-zinc-400 border border-zinc-700">
          {lang === 'pt' ? 'EXPIRADO' : 'EXPIRED'}
        </span>
      );
    }
    if (record.status === 'active' && record.activatedAt) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
          <span>{lang === 'pt' ? 'ATIVO (24H)' : 'ACTIVE (24H)'}</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
        {lang === 'pt' ? 'PRONTO P/ USO' : 'UNACTIVATED'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono transition-all animate-fadeIn ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
              : toastMessage.type === 'error'
              ? 'bg-red-950/90 border-red-500/50 text-red-300'
              : 'bg-amber-950/90 border-amber-500/50 text-amber-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{toastMessage.text}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/10 rounded cursor-pointer text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/90 border border-amber-500/30 rounded-xl">
        <div>
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              {lang === 'pt' ? 'Códigos de Acesso à Aplicação (Validade 24 Horas)' : 'Application Access Codes (24-Hour Validity)'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'pt'
              ? 'Gerenciamento no Cloud Firestore. Pode criar novos passes, revogar, reiniciar ou apagar registos.'
              : 'Managed in Cloud Firestore. Create new passes, revoke, reset validity, or permanently delete codes.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              handleGenerateRandomCode();
              setShowCreateModal(true);
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Gerar Novo Código' : 'Create New Code'}</span>
          </button>

          {codes.length === 0 && (
            <button
              onClick={handleInitDefaultCodes}
              disabled={isSubmitting}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg border border-amber-500/30 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'pt' ? 'Restaurar Códigos Iniciais' : 'Restore Default Codes'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats Summary */}
      {codes.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-400">{lang === 'pt' ? 'Total Códigos' : 'Total Codes'}</span>
            <span className="font-bold text-amber-400 text-sm">{codes.length}</span>
          </div>
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-400">{lang === 'pt' ? 'Super Users' : 'Super Users'}</span>
            <span className="font-bold text-amber-300 text-sm">
              {codes.filter((c) => c.isUnlimited || c.code === 'ADMIN-DIVA').length}
            </span>
          </div>
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-400">{lang === 'pt' ? 'Ativos Agora' : 'Active Now'}</span>
            <span className="font-bold text-emerald-400 text-sm">
              {codes.filter((c) => c.status === 'active' && !c.isUnlimited && c.code !== 'ADMIN-DIVA').length}
            </span>
          </div>
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-400">{lang === 'pt' ? 'Prontos / Novos' : 'Unactivated'}</span>
            <span className="font-bold text-slate-300 text-sm">
              {codes.filter((c) => c.status === 'unactivated').length}
            </span>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      {codes.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'pt' ? 'Filtrar por código, destinatário ou notas...' : 'Filter by code, label or notes...'}
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:border-amber-500/60 outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto text-[11px] font-mono">
            {[
              { id: 'all', label: lang === 'pt' ? 'Todos' : 'All' },
              { id: 'super', label: 'Super Users' },
              { id: 'active', label: lang === 'pt' ? 'Ativos' : 'Active' },
              { id: 'unactivated', label: lang === 'pt' ? 'Prontos' : 'Unactivated' },
              { id: 'expired', label: lang === 'pt' ? 'Expirados' : 'Expired' },
              { id: 'revoked', label: lang === 'pt' ? 'Revogados' : 'Revoked' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Codes Table & Cards */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 flex items-center justify-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
          <span>{lang === 'pt' ? 'A sincronizar códigos com o Firestore...' : 'Syncing codes with Firestore...'}</span>
        </div>
      ) : codes.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 space-y-3">
          <Key className="w-8 h-8 text-amber-500/50 mx-auto" />
          <p className="text-sm">
            {lang === 'pt' ? 'Nenhum código de acesso registado no Firestore.' : 'No access codes found in Firestore.'}
          </p>
          <button
            onClick={handleInitDefaultCodes}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer hover:bg-amber-400"
          >
            {lang === 'pt' ? 'Criar Códigos Padrão CIIT 2026' : 'Create Default CIIT 2026 Codes'}
          </button>
        </div>
      ) : filteredCodes.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 space-y-2">
          <Filter className="w-6 h-6 text-slate-600 mx-auto" />
          <p className="text-xs">
            {lang === 'pt'
              ? 'Nenhum código corresponde aos filtros de pesquisa aplicados.'
              : 'No codes match the search filters.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            {lang === 'pt' ? 'Limpar filtros' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="bg-slate-950/80 text-[10px] text-amber-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">{lang === 'pt' ? 'Código de Acesso' : 'Access Code'}</th>
                  <th className="px-4 py-3">{lang === 'pt' ? 'Designação / Destinatário' : 'Label / Recipient'}</th>
                  <th className="px-4 py-3">{lang === 'pt' ? 'Estado' : 'Status'}</th>
                  <th className="px-4 py-3">{lang === 'pt' ? 'Tempo Restante' : 'Time Left'}</th>
                  <th className="px-4 py-3">{lang === 'pt' ? 'Primeiro Acesso' : 'Activated At'}</th>
                  <th className="px-4 py-3">{lang === 'pt' ? 'Expiração (24h)' : 'Expires At'}</th>
                  <th className="px-4 py-3 text-right">{lang === 'pt' ? 'Ações' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCodes.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-amber-300 text-sm tracking-wider">{item.code}</span>
                        <button
                          onClick={() => handleCopy(item.code)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
                          title={lang === 'pt' ? 'Copiar código' : 'Copy code'}
                        >
                          {copiedCode === item.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-200 font-sans">
                      <div className="flex items-center space-x-1.5">
                        <span>{item.label || 'Passe Geral'}</span>
                        {(item.isUnlimited || item.code === 'ADMIN-DIVA') && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-500/40">
                            Super User
                          </span>
                        )}
                      </div>
                      {item.notes && <div className="text-[10px] text-slate-500 font-light">{item.notes}</div>}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(item)}</td>
                    <td className="px-4 py-3">{getRemainingDisplay(item)}</td>
                    <td className="px-4 py-3 text-slate-400">{formatTimestamp(item.activatedAt)}</td>
                    <td className="px-4 py-3 text-slate-400">{formatTimestamp(item.expiresAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {item.status === 'active' && !item.isUnlimited && item.code !== 'ADMIN-DIVA' && (
                          <button
                            onClick={() => setRevokingCode(item)}
                            className="px-2 py-1 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 text-[10px] rounded cursor-pointer transition-colors"
                            title={lang === 'pt' ? 'Revogar código imediatamente' : 'Revoke code'}
                          >
                            {lang === 'pt' ? 'Revogar' : 'Revoke'}
                          </button>
                        )}
                        {(item.status === 'expired' || item.status === 'revoked' || (item.status === 'active' && !item.isUnlimited && item.code !== 'ADMIN-DIVA')) && (
                          <button
                            onClick={() => setReactivatingCode(item)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] rounded cursor-pointer transition-colors flex items-center space-x-1"
                            title={lang === 'pt' ? 'Reiniciar ciclo de 24h' : 'Reset 24h'}
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{lang === 'pt' ? 'Reiniciar' : 'Reset'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => setDeletingCode(item)}
                          className="px-2 py-1 bg-red-500/10 hover:bg-red-600 hover:text-white border border-red-500/30 text-red-400 text-[10px] rounded cursor-pointer transition-all flex items-center space-x-1"
                          title={lang === 'pt' ? 'Apagar definitivamente do Firestore' : 'Delete permanently from Firestore'}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{lang === 'pt' ? 'Apagar' : 'Delete'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW CODE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Key className="w-5 h-5 text-amber-400" />
              <span>{lang === 'pt' ? 'Criar Novo Código de Acesso' : 'Create New Access Code'}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {lang === 'pt'
                ? 'O código terá validade de 24 horas a partir do momento em que for utilizado pela primeira vez.'
                : 'The code will remain valid for 24 hours starting upon first usage.'}
            </p>

            {formFeedback && (
              <div
                className={`p-3 rounded-lg text-xs mb-4 flex items-center space-x-2 ${
                  formFeedback.type === 'success'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-950/80 text-red-300 border border-red-500/40'
                }`}
              >
                {formFeedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{formFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono text-slate-300 font-medium">{lang === 'pt' ? 'Código' : 'Code'}</label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomCode}
                    className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center space-x-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'pt' ? 'Gerar Aleatório' : 'Generate'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="ex: CIIT-2026-VIP-GOLD"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm tracking-wider uppercase focus:border-amber-500 outline-none"
                />
              </div>

              {/* Type of Access Selection */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <label className="block text-xs font-mono text-slate-300 font-medium">
                  {lang === 'pt' ? 'Nível de Permissão' : 'Permission Level'}
                </label>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuperUser(false);
                      if (newHours === 0) setNewHours(24);
                    }}
                    className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      !isSuperUser
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 font-bold text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Passe Normal (24h)' : 'Normal Pass (24h)'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">
                      {lang === 'pt' ? 'Validade temporária após 1º uso' : 'Expires after set hours'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSuperUser(true);
                      if (!newLabel) setNewLabel('Super Administrador (Ilimitado)');
                    }}
                    className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSuperUser
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 font-bold text-xs text-amber-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'pt' ? 'Super User (Admin)' : 'Super User (Admin)'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">
                      {lang === 'pt' ? 'Acesso Ilimitado & Painel Admin' : 'Unlimited & Direct Admin'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-medium mb-1">
                  {lang === 'pt' ? 'Designação / Destinatário' : 'Designation / Recipient'}
                </label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder={isSuperUser ? "ex: Administrador VIP Tete / Equipa de TI" : "ex: Delegação Internacional Suíça / VIP"}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>

              {!isSuperUser && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-medium mb-1">
                    {lang === 'pt' ? 'Duração da Validade (Horas)' : 'Validity Duration (Hours)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-slate-500">{lang === 'pt' ? 'Padrão: 24 horas' : 'Default: 24 hours'}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-slate-300 font-medium mb-1">
                  {lang === 'pt' ? 'Notas / Observações' : 'Notes / Remarks'}
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="ex: Aprovado pelo Gabinete do Governador"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  {lang === 'pt' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newCode.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (lang === 'pt' ? 'A criar...' : 'Creating...') : (lang === 'pt' ? 'Guardar no Firestore' : 'Save to Firestore')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVOCATION MODAL */}
      {revokingCode && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5" />
              <span>{lang === 'pt' ? 'Revogar Código de Acesso' : 'Revoke Access Code'}</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              {lang === 'pt'
                ? `Tem a certeza que deseja revogar o código ${revokingCode.code}? O utilizador perderá o acesso instantaneamente em tempo real.`
                : `Are you sure you want to revoke code ${revokingCode.code}?`}
            </p>

            <div className="mb-4">
              <label className="block text-xs font-mono text-slate-400 mb-1">
                {lang === 'pt' ? 'Motivo da Revogação (Opcional)' : 'Revocation Reason'}
              </label>
              <input
                type="text"
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="ex: Violação de termos ou término antecipado"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-red-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setRevokingCode(null)}
                className="px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleRevokeConfirm}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
              >
                {isSubmitting ? (lang === 'pt' ? 'A revogar...' : 'Revoking...') : (lang === 'pt' ? 'Confirmar Revogação' : 'Confirm Revoke')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REACTIVATE / RESET MODAL */}
      {reactivatingCode && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'pt' ? 'Reiniciar Validade de 24 Horas' : 'Reset 24-Hour Validity'}
                </h3>
                <p className="text-xs text-amber-400/80 font-mono">
                  {lang === 'pt' ? 'Restauração de ciclo no Firestore' : 'Reset validity cycle in Firestore'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'pt' ? 'Código:' : 'Code:'}</span>
                <span className="text-sm font-mono font-bold text-amber-300 tracking-wider">{reactivatingCode.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'pt' ? 'Destinatário:' : 'Recipient:'}</span>
                <span className="text-xs text-slate-200 font-medium">{reactivatingCode.label || 'Passe Geral'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'pt' ? 'Estado Atual:' : 'Current Status:'}</span>
                <span>{getStatusBadge(reactivatingCode)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {lang === 'pt'
                ? `Ao reiniciar o código "${reactivatingCode.code}", os contadores de acesso serão zerados e o código voltará a estar pronto. O utilizador terá novas 24 horas a partir da próxima vez que aceder à plataforma.`
                : `Resetting "${reactivatingCode.code}" will clear past activation timestamps. A fresh 24-hour cycle will begin upon its next usage.`}
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setReactivatingCode(null)}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleReactivateConfirm}
                disabled={isSubmitting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'pt' ? 'A reiniciar...' : 'Resetting...'}</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'pt' ? 'Sim, Reiniciar Validade' : 'Yes, Reset Validity'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCode && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-red-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'pt' ? 'Apagar Código de Acesso' : 'Delete Access Code'}
                </h3>
                <p className="text-xs text-red-400 font-mono">
                  {lang === 'pt' ? 'Ação irreversível no Cloud Firestore' : 'Irreversible Cloud Firestore action'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'pt' ? 'Código:' : 'Code:'}</span>
                <span className="text-sm font-mono font-bold text-amber-300 tracking-wider">{deletingCode.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'pt' ? 'Destinatário:' : 'Recipient:'}</span>
                <span className="text-xs text-slate-200 font-medium">{deletingCode.label || 'Passe Geral'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{lang === 'pt' ? 'Estado Atual:' : 'Current Status:'}</span>
                <span>{getStatusBadge(deletingCode)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {lang === 'pt'
                ? `Tem certeza absoluta que deseja apagar o código "${deletingCode.code}"? Este documento será permanentemente excluído da base de dados e qualquer utilizador perderá o acesso de imediato.`
                : `Are you sure you want to permanently delete code "${deletingCode.code}" from Firestore?`}
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setDeletingCode(null)}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-red-900/30 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'pt' ? 'A apagar...' : 'Deleting...'}</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'pt' ? 'Sim, Apagar Definitivamente' : 'Yes, Delete Permanently'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
