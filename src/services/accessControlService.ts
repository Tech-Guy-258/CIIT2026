/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '../firebase';
import { AccessCodeRecord, AccessVerificationResult, AccessCodeStatus } from '../types';

const STORAGE_KEY = 'ciit_2026_access_code';
const DEVICE_KEY = 'ciit_2026_device_id';
const COLLECTION_NAME = 'access_codes';

// Default starter codes to ensure immediate out-of-the-box functionality: strictly ADMIN-DIVA and APRESENTACAO-CIIT
export const DEFAULT_STARTER_CODES: Array<{ code: string; label: string; maxHours: number; isUnlimited?: boolean; notes?: string }> = [
  { 
    code: 'ADMIN-DIVA', 
    label: 'Administrador Geral Diva (Acesso Ilimitado & Painel Admin)', 
    maxHours: 0, 
    isUnlimited: true, 
    notes: 'Super Administrador Oficial (Acesso Ilimitado e Painel Admin)' 
  },
  { 
    code: 'APRESENTACAO-CIIT', 
    label: 'Passe de Apresentação Oficial CIIT 2026', 
    maxHours: 24, 
    isUnlimited: false, 
    notes: 'Código Oficial de Apresentação CIIT 2026 (Validade 24h a partir do primeiro uso)' 
  },
];

/**
 * Generate or retrieve a persistent client device identifier
 */
export function getOrCreateDeviceId(): string {
  try {
    let deviceId = localStorage.getItem(DEVICE_KEY);
    if (!deviceId) {
      deviceId = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem(DEVICE_KEY, deviceId);
    }
    return deviceId;
  } catch {
    return 'dev_anon_' + Date.now();
  }
}

/**
 * Normalizes an access code to clean uppercase format
 */
export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '-');
}

/**
 * Access Control Service managing Firebase Firestore 24-hour token lifecycles
 */
class AccessControlService {
  private activeCodeListener: Unsubscribe | null = null;
  private isInitialized = false;

  /**
   * Initializes starter codes in Firestore if they don't exist yet and removes obsolete old starter codes
   */
  async initializeStarterCodes(): Promise<void> {
    if (this.isInitialized) return;
    try {
      const now = Date.now();
      // Ensure strictly ADMIN-DIVA and APRESENTACAO-CIIT exist
      for (const starter of DEFAULT_STARTER_CODES) {
        const docRef = doc(db, COLLECTION_NAME, starter.code);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const initialRecord: AccessCodeRecord = {
            id: starter.code,
            code: starter.code,
            label: starter.label,
            status: starter.isUnlimited ? 'active' : 'unactivated',
            activatedAt: starter.isUnlimited ? now : null,
            expiresAt: starter.isUnlimited ? null : null,
            createdAt: now,
            revokedAt: null,
            maxHours: starter.maxHours || (starter.isUnlimited ? 0 : 24),
            isUnlimited: !!starter.isUnlimited,
            notes: starter.notes || (starter.isUnlimited 
              ? 'Código Super Administrador Oficial (Acesso Ilimitado e Acesso ao Painel Admin)' 
              : 'Código Oficial de Apresentação CIIT 2026'),
          };
          await setDoc(docRef, initialRecord);
        } else {
          // If ADMIN-DIVA already exists, ensure isUnlimited is true
          if (starter.code === 'ADMIN-DIVA') {
            const data = docSnap.data() as AccessCodeRecord;
            if (!data.isUnlimited || data.status !== 'active') {
              await updateDoc(docRef, {
                isUnlimited: true,
                status: 'active',
                expiresAt: null,
                label: starter.label
              }).catch(() => {});
            }
          }
        }
      }

      // Automatically clean obsolete starter codes from initial deployments
      const obsoleteCodes = ['CIIT-2026', 'CIIT-2026-VIP', 'TETE-INVEST-24H', 'GOV-TETE-2026', 'DEMO-PASS'];
      for (const obsCode of obsoleteCodes) {
        const obsRef = doc(db, COLLECTION_NAME, obsCode);
        const obsSnap = await getDoc(obsRef);
        if (obsSnap.exists()) {
          await deleteDoc(obsRef).catch(() => {});
        }
      }

      this.isInitialized = true;
    } catch (err) {
      console.warn('Could not initialize starter codes on Firestore (might be offline or rule restricted):', err);
    }
  }

  /**
   * Gets the stored access code from browser storage
   */
  getStoredCode(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }

  /**
   * Saves the verified access code to browser storage
   */
  saveStoredCode(code: string): void {
    try {
      localStorage.setItem(STORAGE_KEY, code);
      sessionStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      console.error('Failed to store access code locally:', e);
    }
  }

  /**
   * Clears stored access code
   */
  clearStoredCode(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      if (this.activeCodeListener) {
        this.activeCodeListener();
        this.activeCodeListener = null;
      }
    } catch (e) {
      console.error('Failed to clear stored access code:', e);
    }
  }

  /**
   * Validates an access code against Firestore and applies first-use 24-hour activation
   */
  async validateAndActivateCode(rawCode: string): Promise<AccessVerificationResult> {
    const code = normalizeCode(rawCode);
    if (!code || code.length < 3) {
      return {
        allowed: false,
        reason: 'INVALID_FORMAT',
        message: 'Código de acesso inválido. Introduza um código válido.',
        messageEn: 'Invalid access code format. Please enter a valid code.',
      };
    }

    try {
      await this.initializeStarterCodes();

      const docRef = doc(db, COLLECTION_NAME, code);
      const docSnap = await getDoc(docRef);

      const now = Date.now();
      const deviceId = getOrCreateDeviceId();

      // Special case: ADMIN-DIVA is always treated as Unlimited Super Admin
      const isAdminDiva = code === 'ADMIN-DIVA';

      if (!docSnap.exists()) {
        // Check if it's one of the default starter codes that wasn't yet seeded
        const matchingStarter = DEFAULT_STARTER_CODES.find((c) => c.code === code);
        if (matchingStarter || isAdminDiva) {
          const isUnlimited = isAdminDiva || matchingStarter?.isUnlimited;
          const maxHours = isUnlimited ? 0 : (matchingStarter?.maxHours || 24);
          const expiresAt = isUnlimited ? null : now + maxHours * 60 * 60 * 1000;
          const newRecord: AccessCodeRecord = {
            id: code,
            code: code,
            label: matchingStarter?.label || 'Super Administrador Diva',
            status: 'active',
            activatedAt: now,
            expiresAt: expiresAt,
            createdAt: now,
            lastAccessAt: now,
            deviceId: deviceId,
            maxHours: maxHours,
            isUnlimited: isUnlimited,
            notes: isUnlimited ? 'Super Administrador Oficial' : undefined,
          };
          await setDoc(docRef, newRecord);
          this.saveStoredCode(code);
          return {
            allowed: true,
            reason: 'ACTIVE_VALID',
            codeRecord: newRecord,
            remainingMs: isUnlimited ? 86400000000 : (expiresAt! - now),
            message: isUnlimited
              ? 'Acesso de Administrador Geral autorizado com sucesso (Acesso Ilimitado).'
              : 'Acesso autorizado com sucesso. Validade iniciada (24 horas).',
            messageEn: isUnlimited
              ? 'General Administrator access granted (Unlimited Access).'
              : 'Access granted successfully. 24-hour validity period started.',
          };
        }

        return {
          allowed: false,
          reason: 'NOT_FOUND',
          message: 'Código de acesso não encontrado. Verifique se digitou corretamente ou solicite um novo código.',
          messageEn: 'Access code not found. Please verify spelling or request a new code.',
        };
      }

      const record = docSnap.data() as AccessCodeRecord;
      const isUnlimited = record.isUnlimited || isAdminDiva;

      // Check Revoked
      if (record.status === 'revoked') {
        return {
          allowed: false,
          reason: 'REVOKED',
          codeRecord: record,
          message: record.revocationReason 
            ? `Este código de acesso foi revogado: ${record.revocationReason}`
            : 'Este código de acesso foi revogado pela administração da conferência.',
          messageEn: 'This access code has been revoked by conference administration.',
        };
      }

      // If unlimited (e.g. ADMIN-DIVA), it never expires
      if (isUnlimited) {
        if (record.status !== 'active' || record.expiresAt !== null) {
          await updateDoc(docRef, { status: 'active', expiresAt: null, isUnlimited: true }).catch(() => {});
        }
        await updateDoc(docRef, { lastAccessAt: now }).catch(() => {});
        this.saveStoredCode(code);
        const adminRecord: AccessCodeRecord = {
          ...record,
          status: 'active',
          isUnlimited: true,
          expiresAt: null,
          lastAccessAt: now,
        };
        return {
          allowed: true,
          reason: 'ACTIVE_VALID',
          codeRecord: adminRecord,
          remainingMs: 86400000000,
          message: 'Acesso de Administrador Geral autorizado com sucesso (Acesso Ilimitado).',
          messageEn: 'General Administrator access granted (Unlimited Access).',
        };
      }

      // First time activation for standard 24h codes
      if (!record.activatedAt || record.status === 'unactivated') {
        const maxHours = record.maxHours || 24;
        const expiresAt = now + maxHours * 60 * 60 * 1000;
        const updatedRecord: Partial<AccessCodeRecord> = {
          status: 'active',
          activatedAt: now,
          expiresAt: expiresAt,
          lastAccessAt: now,
          deviceId: deviceId,
        };

        await updateDoc(docRef, updatedRecord);
        const activeData: AccessCodeRecord = { ...record, ...updatedRecord } as AccessCodeRecord;

        this.saveStoredCode(code);
        return {
          allowed: true,
          reason: 'ACTIVE_VALID',
          codeRecord: activeData,
          remainingMs: expiresAt - now,
          message: `Código ativado com sucesso! Válido por ${maxHours} horas.`,
          messageEn: `Code activated successfully! Valid for ${maxHours} hours.`,
        };
      }

      // Check Expiration for regular codes
      if (record.expiresAt && now >= record.expiresAt) {
        if (record.status !== 'expired') {
          await updateDoc(docRef, { status: 'expired' }).catch(() => {});
        }
        return {
          allowed: false,
          reason: 'EXPIRED',
          codeRecord: { ...record, status: 'expired' },
          remainingMs: 0,
          message: 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.',
          messageEn: 'This access code expired after 24 hours. Request a new code to continue.',
        };
      }

      // Valid Active Session
      const remainingMs = (record.expiresAt || now) - now;
      await updateDoc(docRef, { lastAccessAt: now }).catch(() => {});
      this.saveStoredCode(code);

      return {
        allowed: true,
        reason: 'ACTIVE_VALID',
        codeRecord: record,
        remainingMs: remainingMs,
        message: 'Acesso ativo e validado com sucesso.',
        messageEn: 'Access active and validated successfully.',
      };
    } catch (err: any) {
      console.error('Firestore access validation error:', err);
      return {
        allowed: false,
        reason: 'NOT_FOUND',
        message: 'Erro ao validar código com o servidor Firebase. Verifique a sua conexão de rede.',
        messageEn: 'Error validating code with Firebase server. Please check your internet connection.',
      };
    }
  }

  /**
   * Realtime listener to immediately react when code is revoked or expires in Firestore
   */
  subscribeToCodeStatus(code: string, onUpdate: (result: AccessVerificationResult) => void): () => void {
    const normalized = normalizeCode(code);
    const docRef = doc(db, COLLECTION_NAME, normalized);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const now = Date.now();
      if (!docSnap.exists()) {
        onUpdate({
          allowed: false,
          reason: 'NOT_FOUND',
          message: 'Código de acesso não encontrado.',
          messageEn: 'Access code not found.',
        });
        return;
      }

      const record = docSnap.data() as AccessCodeRecord;

      if (record.status === 'revoked') {
        onUpdate({
          allowed: false,
          reason: 'REVOKED',
          codeRecord: record,
          message: record.revocationReason || 'Este código de acesso foi revogado pela administração.',
          messageEn: 'This access code has been revoked by administration.',
        });
        return;
      }

      // If unlimited (ADMIN-DIVA)
      if (record.isUnlimited || record.code === 'ADMIN-DIVA') {
        onUpdate({
          allowed: true,
          reason: 'ACTIVE_VALID',
          codeRecord: { ...record, isUnlimited: true },
          remainingMs: 86400000000,
          message: 'Acesso de Administrador ativo (Ilimitado).',
          messageEn: 'Administrator access active (Unlimited).',
        });
        return;
      }

      if (record.expiresAt && now >= record.expiresAt) {
        onUpdate({
          allowed: false,
          reason: 'EXPIRED',
          codeRecord: { ...record, status: 'expired' },
          remainingMs: 0,
          message: 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.',
          messageEn: 'This access code expired after 24 hours. Request a new code to continue.',
        });
        return;
      }

      if (record.status === 'active' && record.expiresAt) {
        onUpdate({
          allowed: true,
          reason: 'ACTIVE_VALID',
          codeRecord: record,
          remainingMs: record.expiresAt - now,
          message: 'Acesso ativo.',
          messageEn: 'Access active.',
        });
      }
    }, (error) => {
      console.warn('Snapshot listener error on access code:', error);
    });

    this.activeCodeListener = unsubscribe;
    return unsubscribe;
  }

  /**
   * List all access codes (for Admin Dashboard)
   */
  subscribeAllCodes(onListUpdate: (codes: AccessCodeRecord[]) => void): () => void {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const list: AccessCodeRecord[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as AccessCodeRecord);
      });
      onListUpdate(list);
    }, async (err) => {
      console.warn('Realtime codes query failed, falling back to one-time getDocs:', err);
      try {
        const snap = await getDocs(collection(db, COLLECTION_NAME));
        const list: AccessCodeRecord[] = [];
        snap.forEach((d) => list.push(d.data() as AccessCodeRecord));
        onListUpdate(list);
      } catch (e) {
        console.error('Failed to load access codes list:', e);
      }
    });
  }

  /**
   * Admin: Create a new custom access code (supports standard 24h/custom hours or Unlimited Super User)
   */
  async createCode(
    codeRaw: string, 
    label: string, 
    maxHours: number = 24, 
    notes: string = '',
    isUnlimited: boolean = false
  ): Promise<{ success: boolean; message: string }> {
    const code = normalizeCode(codeRaw);
    if (!code || code.length < 3) {
      return { success: false, message: 'Código deve ter no mínimo 3 caracteres.' };
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, code);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { success: false, message: 'Este código de acesso já existe no sistema.' };
      }

      const now = Date.now();
      const newRecord: AccessCodeRecord = {
        id: code,
        code: code,
        label: label.trim() || (isUnlimited ? 'Super Administrador (Ilimitado)' : 'Passe de Acesso 24h'),
        status: isUnlimited ? 'active' : 'unactivated',
        activatedAt: isUnlimited ? now : null,
        expiresAt: isUnlimited ? null : null,
        createdAt: now,
        revokedAt: null,
        maxHours: isUnlimited ? 0 : (maxHours || 24),
        isUnlimited: isUnlimited,
        notes: notes.trim() || (isUnlimited ? 'Super Administrador com acesso ilimitado e painel admin.' : ''),
      };

      await setDoc(docRef, newRecord);
      return { 
        success: true, 
        message: isUnlimited 
          ? `Super Administrador ${code} criado com sucesso (Acesso Ilimitado & Painel Admin)!`
          : `Código ${code} criado com sucesso!` 
      };
    } catch (err: any) {
      console.error('Error creating code:', err);
      return { success: false, message: 'Erro ao criar código no Firestore: ' + err.message };
    }
  }

  /**
   * Admin: Revoke an access code immediately
   */
  async revokeCode(codeRaw: string, reason?: string): Promise<{ success: boolean; message: string }> {
    const code = normalizeCode(codeRaw);
    try {
      const docRef = doc(db, COLLECTION_NAME, code);
      await updateDoc(docRef, {
        status: 'revoked',
        revokedAt: Date.now(),
        revocationReason: reason || 'Revogado pela administração',
      });
      return { success: true, message: `Código ${code} foi revogado.` };
    } catch (err: any) {
      return { success: false, message: 'Erro ao revogar código: ' + err.message };
    }
  }

  /**
   * Admin: Reset an access code to unactivated or reactivate with new 24h window
   */
  async resetOrReactivateCode(codeRaw: string): Promise<{ success: boolean; message: string }> {
    const code = normalizeCode(codeRaw);
    try {
      const docRef = doc(db, COLLECTION_NAME, code);
      await updateDoc(docRef, {
        status: 'unactivated',
        activatedAt: null,
        expiresAt: null,
        revokedAt: null,
        revocationReason: null,
        lastAccessAt: null,
      });
      return { success: true, message: `Código ${code} foi restaurado para não ativado (terá novas 24h quando usado).` };
    } catch (err: any) {
      return { success: false, message: 'Erro ao restaurar código: ' + err.message };
    }
  }

  /**
   * Purges all access codes from Firestore, retaining ONLY ADMIN-DIVA and APRESENTACAO-CIIT
   */
  async purgeAllExceptOfficialCodes(): Promise<{ success: boolean; message: string; deletedCount: number }> {
    try {
      const allowedCodes = new Set(['ADMIN-DIVA', 'APRESENTACAO-CIIT']);
      const snap = await getDocs(collection(db, COLLECTION_NAME));
      let deletedCount = 0;

      for (const docSnap of snap.docs) {
        const docId = docSnap.id.toUpperCase();
        if (!allowedCodes.has(docId)) {
          await deleteDoc(docSnap.ref);
          deletedCount++;
        }
      }

      // Ensure ADMIN-DIVA exists and is unlimited
      const now = Date.now();
      const divaRef = doc(db, COLLECTION_NAME, 'ADMIN-DIVA');
      const divaSnap = await getDoc(divaRef);
      if (!divaSnap.exists()) {
        await setDoc(divaRef, {
          id: 'ADMIN-DIVA',
          code: 'ADMIN-DIVA',
          label: 'Administrador Geral Diva (Acesso Ilimitado & Painel Admin)',
          status: 'active',
          activatedAt: now,
          expiresAt: null,
          createdAt: now,
          revokedAt: null,
          maxHours: 0,
          isUnlimited: true,
          notes: 'Super Administrador Oficial (Acesso Ilimitado e Painel Admin)'
        });
      } else {
        await updateDoc(divaRef, {
          isUnlimited: true,
          status: 'active',
          expiresAt: null,
        }).catch(() => {});
      }

      // Ensure APRESENTACAO-CIIT exists
      const presRef = doc(db, COLLECTION_NAME, 'APRESENTACAO-CIIT');
      const presSnap = await getDoc(presRef);
      if (!presSnap.exists()) {
        await setDoc(presRef, {
          id: 'APRESENTACAO-CIIT',
          code: 'APRESENTACAO-CIIT',
          label: 'Passe de Apresentação Oficial CIIT 2026',
          status: 'unactivated',
          activatedAt: null,
          expiresAt: null,
          createdAt: now,
          revokedAt: null,
          maxHours: 24,
          isUnlimited: false,
          notes: 'Código Oficial de Apresentação CIIT 2026 (Validade 24h a partir do primeiro uso)'
        });
      }

      return {
        success: true,
        message: `Base de dados atualizada: Mantidos estritamente ADMIN-DIVA e APRESENTACAO-CIIT (${deletedCount} removidos).`,
        deletedCount
      };
    } catch (err: any) {
      console.error('Error purging access codes:', err);
      return {
        success: false,
        message: 'Erro ao limpar códigos no Firestore: ' + err.message,
        deletedCount: 0
      };
    }
  }

  /**
   * Admin: Delete code document with protections for ADMIN-DIVA and active admin session
   */
  async deleteCode(codeRaw: string, currentSessionCode?: string): Promise<{ success: boolean; message: string }> {
    const code = normalizeCode(codeRaw);

    // Protection rule 1: ADMIN-DIVA is the master administrator and can never be deleted
    if (code === 'ADMIN-DIVA') {
      return { 
        success: false, 
        message: 'O código ADMIN-DIVA é o administrador principal do sistema e está protegido permanentemente contra eliminação.' 
      };
    }

    // Protection rule 2: The administrator cannot delete their own active session code
    if (currentSessionCode && code === normalizeCode(currentSessionCode)) {
      return { 
        success: false, 
        message: 'Não é permitido apagar o código de acesso da sua própria sessão ativa.' 
      };
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, code);
      await deleteDoc(docRef);
      return { success: true, message: `Código ${code} removido com sucesso.` };
    } catch (err: any) {
      return { success: false, message: 'Erro ao remover código: ' + err.message };
    }
  }
}

export const accessControl = new AccessControlService();
