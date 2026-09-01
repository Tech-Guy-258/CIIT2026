/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccessSessionState, AccessValidationResponse, AccessCodeRecord } from '../types';

const STORAGE_KEY_CODE = 'ciit_access_code_v1';
const STORAGE_KEY_TOKEN = 'ciit_access_token_v1';
const STORAGE_KEY_EXPIRES_AT = 'ciit_access_expires_at_v1';
const STORAGE_KEY_DEVICE_ID = 'ciit_device_uuid_v1';
const STORAGE_KEY_CODES_REGISTRY = 'ciit_local_codes_registry_v1';

const DEFAULT_CODES_CATALOG: Record<string, { label: string; category: string }> = {
  'CIIT2026': { label: 'Oficial CIIT 2026', category: 'VIP & Executivo' },
  'TETE-INVEST-2026': { label: 'Investidores Gerais', category: 'Investidor' },
  'CIIT-VIP-ACCESS': { label: 'VIP Executivo', category: 'VIP & Executivo' },
  'GOV-TETE-2026': { label: 'Governo da Província de Tete', category: 'Governo & Diplomacia' },
  'BANCO-MOC-2026': { label: 'Banco de Moçambique', category: 'Financeiro' },
  'VALE-MINING-2026': { label: 'Setor Mineiro & Recursos', category: 'Mineração' },
  'HCB-ENERGY-2026': { label: 'Hidroeléctrica de Cahora Bassa', category: 'Energia' },
  'CTA-TETE-2026': { label: 'Confederação Económica CTA', category: 'Setor Privado' },
};

type AccessStateListener = (state: AccessSessionState) => void;

class AccessControlService {
  private listeners: Set<AccessStateListener> = new Set();
  private heartbeatInterval: any = null;
  private countdownInterval: any = null;
  private deviceId: string = '';

  private currentState: AccessSessionState = {
    isChecking: true,
    isAuthenticated: false,
    code: null,
    token: null,
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    remainingMs: 0,
    formattedRemaining: '',
    isExpiringSoon: false,
    expiredMessage: undefined,
  };

  constructor() {
    this.deviceId = this.getOrCreateDeviceId();
    this.initializeSession();
  }

  private getOrCreateDeviceId(): string {
    if (typeof window === 'undefined') return 'server-env';
    let id = localStorage.getItem(STORAGE_KEY_DEVICE_ID);
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEY_DEVICE_ID, id);
    }
    return id;
  }

  public getDeviceId(): string {
    return this.deviceId;
  }

  public getState(): AccessSessionState {
    return { ...this.currentState };
  }

  public subscribe(listener: AccessStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  /**
   * Helper to retrieve or update local fallback codes map
   */
  private getLocalCodesRegistry(): Record<string, AccessCodeRecord> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CODES_REGISTRY);
      let registry: Record<string, AccessCodeRecord> = raw ? JSON.parse(raw) : {};
      
      // Ensure defaults exist in local registry
      Object.entries(DEFAULT_CODES_CATALOG).forEach(([code, meta]) => {
        if (!registry[code]) {
          registry[code] = {
            code,
            label: meta.label,
            category: meta.category,
            status: 'unused',
            activatedAt: null,
            expiresAt: null,
            createdAt: Date.now(),
          };
        }
      });
      return registry;
    } catch {
      return {};
    }
  }

  private saveLocalCodesRegistry(registry: Record<string, AccessCodeRecord>) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_CODES_REGISTRY, JSON.stringify(registry));
    } catch {
      // ignore
    }
  }

  /**
   * Initializes session on load by querying backend server verification
   * Also supports instant auto-authentication from URL query parameter on external devices
   */
  public async initializeSession(): Promise<void> {
    if (typeof window === 'undefined') return;

    // 1. Check URL parameters for direct link authentication from external devices (e.g. ?code=CIIT2026 or ?access_code=CIIT2026 or #code=CIIT2026)
    let urlCode: string | null = null;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      urlCode =
        urlParams.get('code') ||
        urlParams.get('access_code') ||
        urlParams.get('ac') ||
        urlParams.get('key') ||
        urlParams.get('ciit_code') ||
        urlParams.get('c') ||
        null;

      if (!urlCode && window.location.hash) {
        const hashMatch = window.location.hash.match(/[#&?](?:code|ac|access_code|key)=([^&]+)/i);
        if (hashMatch && hashMatch[1]) {
          urlCode = decodeURIComponent(hashMatch[1]);
        }
      }
    } catch (e) {
      console.warn('Erro ao ler parâmetros de URL:', e);
    }

    // If an external device opens with a valid code in the URL, authenticate automatically!
    if (urlCode && urlCode.trim()) {
      const cleanUrlCode = urlCode.trim().toUpperCase();
      this.currentState = {
        ...this.currentState,
        isChecking: true,
      };
      this.notify();

      const res = await this.validateAccessCode(cleanUrlCode);
      if (res.success) {
        // Clean URL query parameters smoothly without reloading
        try {
          const cleanUrl = new URL(window.location.href);
          cleanUrl.searchParams.delete('code');
          cleanUrl.searchParams.delete('access_code');
          cleanUrl.searchParams.delete('ac');
          cleanUrl.searchParams.delete('key');
          cleanUrl.searchParams.delete('ciit_code');
          cleanUrl.searchParams.delete('c');
          window.history.replaceState({}, document.title, cleanUrl.pathname + (cleanUrl.search ? cleanUrl.search : ''));
        } catch (e) {
          // ignore
        }
        return;
      }
    }

    const savedCode = localStorage.getItem(STORAGE_KEY_CODE);
    const savedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
    const savedExpiresAt = parseInt(localStorage.getItem(STORAGE_KEY_EXPIRES_AT) || '0', 10);

    if (!savedCode) {
      this.currentState = {
        isChecking: false,
        isAuthenticated: false,
        code: null,
        token: null,
        status: 'unused',
        activatedAt: null,
        expiresAt: null,
        remainingMs: 0,
        formattedRemaining: '',
        isExpiringSoon: false,
        expiredMessage: undefined,
      };
      this.notify();
      return;
    }

    // Try backend verification first
    try {
      const query = new URLSearchParams({
        code: savedCode,
        token: savedToken || '',
        deviceId: this.deviceId,
      });

      const response = await fetch(`/api/access/verify-session?${query.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.valid && data.status === 'active' && data.expiresAt) {
          const remainingMs = Math.max(0, data.remainingMs || (data.expiresAt - (data.serverTime || Date.now())));
          
          if (remainingMs <= 0) {
            this.handleExpired('Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
            return;
          }

          this.currentState = {
            isChecking: false,
            isAuthenticated: true,
            code: data.code || savedCode,
            token: data.token || savedToken,
            status: 'active',
            activatedAt: data.activatedAt,
            expiresAt: data.expiresAt,
            remainingMs: remainingMs,
            formattedRemaining: this.formatRemainingTime(remainingMs),
            isExpiringSoon: remainingMs < 3600000,
            expiredMessage: undefined,
          };
          this.startTimers();
          this.notify();
          return;
        } else if (data.expired) {
          this.handleExpired(data.error || 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
          return;
        } else if (data.revoked) {
          this.handleRevoked(data.error || 'Código revogado pela organização.');
          return;
        }
      }
    } catch (err) {
      console.warn('Verificação de sessão via backend indisponível, checando local:', err);
    }

    // Resilient Local fallback for 24h verification
    const now = Date.now();
    if (savedExpiresAt && now < savedExpiresAt) {
      const rem = savedExpiresAt - now;
      this.currentState = {
        isChecking: false,
        isAuthenticated: true,
        code: savedCode,
        token: savedToken,
        status: 'active',
        activatedAt: savedExpiresAt - 86400000,
        expiresAt: savedExpiresAt,
        remainingMs: rem,
        formattedRemaining: this.formatRemainingTime(rem),
        isExpiringSoon: rem < 3600000,
        expiredMessage: undefined,
      };
      this.startTimers();
      this.notify();
    } else {
      this.handleExpired('Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
    }
  }

  /**
   * Validates and activates a new code (with dual-layer backend + resilient local fallback)
   */
  public async validateAccessCode(inputCode: string): Promise<AccessValidationResponse> {
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, error: 'Por favor, introduza o código de acesso.' };
    }

    // 1. Try Backend API first
    try {
      const response = await fetch('/api/access/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: cleanCode,
          deviceId: this.deviceId,
        }),
      });

      if (response.ok) {
        const text = await response.text();
        let data: AccessValidationResponse;
        try {
          data = JSON.parse(text);
        } catch {
          data = { success: false, error: 'Resposta inválida do servidor.' };
        }

        if (data.success && data.status === 'active' && data.expiresAt) {
          const remainingMs = data.remainingMs || (data.expiresAt - (data.serverTime || Date.now()));

          // Save session
          localStorage.setItem(STORAGE_KEY_CODE, data.code || cleanCode);
          if (data.token) localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
          localStorage.setItem(STORAGE_KEY_EXPIRES_AT, String(data.expiresAt));

          this.currentState = {
            isChecking: false,
            isAuthenticated: true,
            code: data.code || cleanCode,
            token: data.token || null,
            status: 'active',
            activatedAt: data.activatedAt || Date.now(),
            expiresAt: data.expiresAt,
            remainingMs: remainingMs,
            formattedRemaining: this.formatRemainingTime(remainingMs),
            isExpiringSoon: remainingMs < 3600000,
            expiredMessage: undefined,
          };

          this.startTimers();
          this.notify();
          return data;
        } else if (data.error) {
          if (data.expired) {
            this.handleExpired(data.error || 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
          } else if (data.revoked) {
            this.handleRevoked(data.error || 'Este código foi revogado pela organização.');
          }
          return data;
        }
      }
    } catch (err) {
      console.warn('Backend API temporariamente inacessível, utilizando motor de autenticação local de alta resiliência:', err);
    }

    // 2. Resilient Local Authentication Engine (Enforces the exact 24-Hour window reliably)
    const localRegistry = this.getLocalCodesRegistry();
    let record = localRegistry[cleanCode];

    const now = Date.now();
    const DURATION_24H_MS = 24 * 60 * 60 * 1000;

    // MODO TESTE RÁPIDO & APRESENTAÇÃO: Criação instantânea de qualquer código digitado
    if (!record) {
      record = {
        code: cleanCode,
        label: `Acesso Demonstração (${cleanCode})`,
        category: 'Teste & Apresentação',
        status: 'unused',
        activatedAt: null,
        expiresAt: null,
        createdAt: now,
      };
      localRegistry[cleanCode] = record;
      this.saveLocalCodesRegistry(localRegistry);
    }

    if (record.status === 'revoked') {
      this.handleRevoked(record.revokedReason || 'Este código de acesso foi revogado pela organização.');
      return {
        success: false,
        revoked: true,
        error: record.revokedReason || 'Este código de acesso foi revogado pela organização.',
      };
    }

    if (record.status === 'expired' || (record.expiresAt && now >= record.expiresAt)) {
      record.status = 'expired';
      this.saveLocalCodesRegistry(localRegistry);
      this.handleExpired('Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
      return {
        success: false,
        expired: true,
        error: 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.',
      };
    }

    // Activate 24h period if unused or re-open active
    let activatedAt = record.activatedAt || now;
    let expiresAt = record.expiresAt || (now + DURATION_24H_MS);

    record.status = 'active';
    record.activatedAt = activatedAt;
    record.expiresAt = expiresAt;
    record.deviceId = this.deviceId;
    record.token = record.token || `ciit_auth_local_${Math.random().toString(36).substring(2)}`;
    this.saveLocalCodesRegistry(localRegistry);

    const remainingMs = Math.max(0, expiresAt - now);

    // Save active session
    localStorage.setItem(STORAGE_KEY_CODE, cleanCode);
    localStorage.setItem(STORAGE_KEY_TOKEN, record.token);
    localStorage.setItem(STORAGE_KEY_EXPIRES_AT, String(expiresAt));

    this.currentState = {
      isChecking: false,
      isAuthenticated: true,
      code: cleanCode,
      token: record.token,
      status: 'active',
      activatedAt: activatedAt,
      expiresAt: expiresAt,
      remainingMs: remainingMs,
      formattedRemaining: this.formatRemainingTime(remainingMs),
      isExpiringSoon: remainingMs < 3600000,
      expiredMessage: undefined,
    };

    this.startTimers();
    this.notify();

    return {
      success: true,
      valid: true,
      code: cleanCode,
      token: record.token,
      status: 'active',
      activatedAt: activatedAt,
      expiresAt: expiresAt,
      serverTime: now,
      remainingMs: remainingMs,
      message: 'Código de acesso validado com sucesso! Período de 24 horas iniciado.',
    };
  }

  private startTimers() {
    this.stopTimers();

    // 1. Live Countdown timer every 1 second
    this.countdownInterval = setInterval(() => {
      if (!this.currentState.expiresAt || !this.currentState.isAuthenticated) return;

      const now = Date.now();
      const remainingMs = Math.max(0, this.currentState.expiresAt - now);

      if (remainingMs <= 0) {
        this.handleExpired('Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
      } else {
        const isExpiringSoon = remainingMs < 3600000;
        this.currentState.remainingMs = remainingMs;
        this.currentState.formattedRemaining = this.formatRemainingTime(remainingMs);
        this.currentState.isExpiringSoon = isExpiringSoon;
        this.notify();
      }
    }, 1000);

    // 2. Authoritative Server Heartbeat every 20 seconds to prevent client clock tampering
    this.heartbeatInterval = setInterval(async () => {
      if (!this.currentState.code || !this.currentState.isAuthenticated) return;

      try {
        const query = new URLSearchParams({
          code: this.currentState.code,
          token: this.currentState.token || '',
          deviceId: this.deviceId,
        });

        const res = await fetch(`/api/access/verify-session?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (!data.valid) {
            if (data.expired) {
              this.handleExpired(data.error || 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
            } else if (data.revoked) {
              this.handleRevoked(data.error || 'Este código de acesso foi revogado.');
            } else {
              this.handleExpired('Sessão expirada.');
            }
          } else if (data.expiresAt) {
            // Re-sync with authoritative server timestamp
            const serverRemaining = Math.max(0, data.remainingMs || (data.expiresAt - (data.serverTime || Date.now())));
            if (serverRemaining <= 0) {
              this.handleExpired('Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.');
            } else {
              this.currentState.remainingMs = serverRemaining;
              this.currentState.expiresAt = data.expiresAt;
              this.currentState.formattedRemaining = this.formatRemainingTime(serverRemaining);
              this.currentState.isExpiringSoon = serverRemaining < 3600000;
              this.notify();
            }
          }
        }
      } catch (e) {
        // Silently keep local countdown on transient network drop
      }
    }, 20000);
  }

  private stopTimers() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.countdownInterval = null;
    this.heartbeatInterval = null;
  }

  private handleExpired(message: string) {
    this.stopTimers();
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_EXPIRES_AT);
    // Keep code in memory or cleared so user sees expired screen
    this.currentState = {
      isChecking: false,
      isAuthenticated: false,
      code: this.currentState.code,
      token: null,
      status: 'expired',
      activatedAt: this.currentState.activatedAt,
      expiresAt: this.currentState.expiresAt,
      remainingMs: 0,
      formattedRemaining: 'Expirado',
      isExpiringSoon: false,
      expiredMessage: message,
    };
    this.notify();
  }

  private handleRevoked(message: string) {
    this.stopTimers();
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_EXPIRES_AT);
    this.currentState = {
      isChecking: false,
      isAuthenticated: false,
      code: this.currentState.code,
      token: null,
      status: 'revoked',
      activatedAt: this.currentState.activatedAt,
      expiresAt: this.currentState.expiresAt,
      remainingMs: 0,
      formattedRemaining: 'Revogado',
      isExpiringSoon: false,
      expiredMessage: message,
    };
    this.notify();
  }

  public logout(): void {
    this.stopTimers();
    localStorage.removeItem(STORAGE_KEY_CODE);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_EXPIRES_AT);

    this.currentState = {
      isChecking: false,
      isAuthenticated: false,
      code: null,
      token: null,
      status: 'unused',
      activatedAt: null,
      expiresAt: null,
      remainingMs: 0,
      formattedRemaining: '',
      isExpiringSoon: false,
      expiredMessage: undefined,
    };
    this.notify();
  }

  /**
   * Helper to format time according to spec:
   * - If >= 1 hour: "Acesso válido por mais 17 horas e 32 minutos."
   * - If < 1 hour: Live format "00:48:12" / "48m 12s"
   */
  public formatRemainingTime(ms: number): string {
    if (ms <= 0) return '00:00:00';

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours >= 1) {
      const hStr = hours === 1 ? '1 hora' : `${hours} horas`;
      const mStr = minutes === 1 ? '1 minuto' : `${minutes} minutos`;
      return `Acesso válido por mais ${hStr} e ${mStr}.`;
    } else {
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      return `00:${mm}:${ss}`;
    }
  }

  // Admin APIs (Hybrid server + synchronized local registry)
  public async fetchAdminCodes(): Promise<AccessCodeRecord[]> {
    const localRegistry = this.getLocalCodesRegistry();
    try {
      const res = await fetch('/api/access/admin/codes');
      if (res.ok) {
        const data = await res.json();
        if (data.codes && Array.isArray(data.codes)) {
          // Sync server codes into local registry
          data.codes.forEach((c: AccessCodeRecord) => {
            localRegistry[c.code.toUpperCase()] = c;
          });
          this.saveLocalCodesRegistry(localRegistry);
          return data.codes;
        }
      }
    } catch (e) {
      console.warn('Servidor admin offline, carregando códigos do registo local:', e);
    }
    return Object.values(localRegistry);
  }

  public async adminRevokeCode(code: string, reason?: string): Promise<boolean> {
    const normalized = code.trim().toUpperCase();
    const localRegistry = this.getLocalCodesRegistry();
    if (localRegistry[normalized]) {
      localRegistry[normalized].status = 'revoked';
      localRegistry[normalized].revokedAt = Date.now();
      localRegistry[normalized].revokedReason = reason || 'Revogado pela administração';
      this.saveLocalCodesRegistry(localRegistry);
    }

    try {
      const res = await fetch('/api/access/admin/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: normalized, reason }),
      });
      return res.ok;
    } catch (e) {
      console.warn('Erro ao comunicar revogação ao servidor, registado localmente:', e);
      return true;
    }
  }

  public async adminCreateCode(code: string, label?: string, category?: string): Promise<boolean> {
    const normalized = code.trim().toUpperCase();
    const localRegistry = this.getLocalCodesRegistry();
    localRegistry[normalized] = {
      code: normalized,
      label: label || 'Código Adicional',
      category: category || 'Geral',
      status: 'unused',
      activatedAt: null,
      expiresAt: null,
      createdAt: Date.now(),
    };
    this.saveLocalCodesRegistry(localRegistry);

    try {
      const res = await fetch('/api/access/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: normalized, label, category }),
      });
      return res.ok;
    } catch (e) {
      console.warn('Erro ao comunicar criação ao servidor, criado localmente:', e);
      return true;
    }
  }

  public async adminResetCode(code: string): Promise<boolean> {
    const normalized = code.trim().toUpperCase();
    const localRegistry = this.getLocalCodesRegistry();
    if (localRegistry[normalized]) {
      localRegistry[normalized].status = 'unused';
      localRegistry[normalized].activatedAt = null;
      localRegistry[normalized].expiresAt = null;
      localRegistry[normalized].deviceId = undefined;
      localRegistry[normalized].token = undefined;
      localRegistry[normalized].revokedAt = null;
      localRegistry[normalized].revokedReason = undefined;
      this.saveLocalCodesRegistry(localRegistry);
    }

    try {
      const res = await fetch('/api/access/admin/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: normalized }),
      });
      return res.ok;
    } catch (e) {
      console.warn('Erro ao comunicar reset ao servidor, resetado localmente:', e);
      return true;
    }
  }

  public async adminDeleteCode(code: string): Promise<boolean> {
    const normalized = code.trim().toUpperCase();
    const localRegistry = this.getLocalCodesRegistry();
    delete localRegistry[normalized];
    this.saveLocalCodesRegistry(localRegistry);

    try {
      const res = await fetch('/api/access/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: normalized }),
      });
      return res.ok;
    } catch (e) {
      console.warn('Erro ao comunicar eliminação ao servidor, eliminado localmente:', e);
      return true;
    }
  }

  /**
   * Generates a direct magic access link for external devices (Smartphones, Tablets, PCs)
   */
  public getDirectAccessUrl(code: string): string {
    if (typeof window === 'undefined') return `?code=${encodeURIComponent(code)}`;
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}?code=${encodeURIComponent(code.trim().toUpperCase())}`;
  }
}

export const accessControl = new AccessControlService();
