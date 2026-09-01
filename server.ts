/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Disk persistence path for access codes
const STORAGE_FILE = path.join(process.cwd(), 'data_access_codes.json');

// Enable CORS and security headers for external devices / mobile browsers / PWAs / iframes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Device-Id');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Access Code Record Interface
interface ServerAccessCode {
  code: string;
  status: 'unused' | 'active' | 'expired' | 'revoked';
  activatedAt: number | null;
  expiresAt: number | null;
  deviceId?: string;
  token?: string;
  label?: string;
  category?: string;
  revokedAt?: number | null;
  revokedReason?: string;
  createdAt: number;
  lastVerifiedAt?: number;
}

// 24 hours in milliseconds
const DURATION_24H_MS = 24 * 60 * 60 * 1000;

// Initial pre-configured access codes
const DEFAULT_CODES: ServerAccessCode[] = [
  {
    code: 'CIIT2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Chave Oficial CIIT 2026',
    category: 'Geral',
    createdAt: Date.now(),
  },
  {
    code: 'TETE-INVEST-2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Acesso Investidor Estratégico',
    category: 'Investidor',
    createdAt: Date.now(),
  },
  {
    code: 'CIIT-VIP-ACCESS',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Credencial VIP Executiva',
    category: 'VIP',
    createdAt: Date.now(),
  },
  {
    code: 'MOZ-INVEST-2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Delegação Internacional',
    category: 'Internacional',
    createdAt: Date.now(),
  },
  {
    code: 'GOV-TETE-2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Governo & Protocolo de Estado',
    category: 'Governo',
    createdAt: Date.now(),
  },
  {
    code: 'ADMIN-CIIT-2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Comissão Organizadora / Admin',
    category: 'Admin',
    createdAt: Date.now(),
  },
  {
    code: 'DELEGATE-2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Delegado Participante',
    category: 'Delegado',
    createdAt: Date.now(),
  },
  {
    code: 'PARTNER-2026',
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: 'Patrocinador / Parceiro',
    category: 'Parceiro',
    createdAt: Date.now(),
  }
];

// In-memory store initialized with defaults and synced with disk
let accessCodesDb: Map<string, ServerAccessCode> = new Map();

function loadCodesFromDisk(): void {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed: ServerAccessCode[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (item && item.code) {
            accessCodesDb.set(item.code.toUpperCase(), item);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Não foi possível ler arquivo de persistência de códigos, inicializando padrão:', err);
  }

  // Ensure default codes always exist if not already loaded
  DEFAULT_CODES.forEach(item => {
    if (!accessCodesDb.has(item.code.toUpperCase())) {
      accessCodesDb.set(item.code.toUpperCase(), { ...item });
    }
  });
}

function saveCodesToDisk(): void {
  try {
    const list = Array.from(accessCodesDb.values());
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Erro ao salvar códigos em disco:', err);
  }
}

// Initial load
loadCodesFromDisk();

// Helper to check and update expiration against authoritative server time
function checkAndUpdateCodeExpiration(record: ServerAccessCode): ServerAccessCode {
  const now = Date.now();
  if (record.status === 'active' && record.expiresAt && now >= record.expiresAt) {
    record.status = 'expired';
  }
  return record;
}

// ----------------------------------------------------
// API ROUTES FOR 24H ACCESS CODE GATEKEEPER
// ----------------------------------------------------

// 1. Validate / Activate Access Code (Supports POST and GET for maximum compatibility across mobile & web)
const handleValidateAccess = (req: express.Request, res: express.Response) => {
  const rawCode = (req.body?.code || req.query?.code || '') as string;
  const deviceId = (req.body?.deviceId || req.query?.deviceId || '') as string;
  const now = Date.now();

  if (!rawCode || typeof rawCode !== 'string') {
    return res.status(200).json({
      success: false,
      valid: false,
      error: 'Por favor, introduza um código de acesso válido.'
    });
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);

  if (!record) {
    return res.status(200).json({
      success: false,
      valid: false,
      error: 'Código de acesso não encontrado. Verifique o código e tente novamente.'
    });
  }

  // Update status if expired
  checkAndUpdateCodeExpiration(record);

  if (record.status === 'revoked') {
    return res.status(200).json({
      success: false,
      valid: false,
      revoked: true,
      error: record.revokedReason || 'Este código de acesso foi revogado pela comissão organizadora.'
    });
  }

  if (record.status === 'expired') {
    return res.status(200).json({
      success: false,
      valid: false,
      expired: true,
      error: 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.'
    });
  }

  // Case A: Unused code -> First time use, start 24-hour window
  if (record.status === 'unused') {
    record.status = 'active';
    record.activatedAt = now;
    record.expiresAt = now + DURATION_24H_MS;
    record.deviceId = deviceId || 'client-browser-' + Math.random().toString(36).substring(2);
    record.token = `ciit_auth_${Math.random().toString(36).substring(2)}_${now.toString(36)}`;
    record.lastVerifiedAt = now;

    accessCodesDb.set(normalizedCode, record);
    saveCodesToDisk();

    return res.status(200).json({
      success: true,
      valid: true,
      code: record.code,
      token: record.token,
      status: record.status,
      activatedAt: record.activatedAt,
      expiresAt: record.expiresAt,
      serverTime: now,
      remainingMs: DURATION_24H_MS,
      message: 'Código de acesso validado com sucesso! Período de 24 horas iniciado.'
    });
  }

  // Case B: Active code within 24h
  if (record.status === 'active') {
    const remainingMs = Math.max(0, (record.expiresAt || 0) - now);
    record.lastVerifiedAt = now;
    saveCodesToDisk();

    return res.status(200).json({
      success: true,
      valid: true,
      code: record.code,
      token: record.token,
      status: record.status,
      activatedAt: record.activatedAt,
      expiresAt: record.expiresAt,
      serverTime: now,
      remainingMs: remainingMs,
      message: 'Acesso ativo restabelecido.'
    });
  }

  return res.status(200).json({
    success: false,
    valid: false,
    error: 'Estado de acesso desconhecido.'
  });
};

app.post('/api/access/validate', handleValidateAccess);
app.get('/api/access/validate', handleValidateAccess);

// 2. Continuous Session Verification & Server Clock Sync
app.get('/api/access/verify-session', (req, res) => {
  const rawCode = req.query.code as string;
  const token = req.query.token as string;
  const now = Date.now();

  if (!rawCode) {
    return res.status(400).json({
      valid: false,
      serverTime: now,
      error: 'Código não fornecido.'
    });
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);

  if (!record) {
    return res.json({
      valid: false,
      serverTime: now,
      error: 'Código não encontrado no servidor.'
    });
  }

  // Check token match if token was provided
  if (token && record.token && record.token !== token) {
    // If token mismatches, we still verify by authoritative code state
  }

  // Check 24-hour expiration against server clock
  checkAndUpdateCodeExpiration(record);

  if (record.status === 'revoked') {
    return res.json({
      valid: false,
      revoked: true,
      serverTime: now,
      error: 'Este código de acesso foi revogado pela organização.'
    });
  }

  if (record.status === 'expired' || (record.expiresAt && now >= record.expiresAt)) {
    record.status = 'expired';
    return res.json({
      valid: false,
      expired: true,
      serverTime: now,
      error: 'Este código de acesso expirou após 24 horas. Solicite um novo código para continuar.'
    });
  }

  if (record.status === 'active' && record.expiresAt) {
    const remainingMs = Math.max(0, record.expiresAt - now);
    record.lastVerifiedAt = now;

    return res.json({
      valid: true,
      code: record.code,
      status: 'active',
      activatedAt: record.activatedAt,
      expiresAt: record.expiresAt,
      serverTime: now,
      remainingMs: remainingMs,
      token: record.token
    });
  }

  return res.json({
    valid: false,
    serverTime: now,
    error: 'Código ainda não ativado ou inválido.'
  });
});

// 3. Admin: List All Access Codes
app.get('/api/access/admin/codes', (req, res) => {
  const now = Date.now();
  const codesList = Array.from(accessCodesDb.values()).map(item => {
    checkAndUpdateCodeExpiration(item);
    const remainingMs = (item.status === 'active' && item.expiresAt) ? Math.max(0, item.expiresAt - now) : 0;
    return {
      ...item,
      remainingMs
    };
  });

  return res.json({
    success: true,
    serverTime: now,
    codes: codesList
  });
});

// 4. Admin: Create New Access Code
app.post('/api/access/admin/create', (req, res) => {
  const { code: rawCode, label, category } = req.body;
  if (!rawCode || typeof rawCode !== 'string') {
    return res.status(400).json({ success: false, error: 'Código inválido.' });
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  if (accessCodesDb.has(normalizedCode)) {
    return res.status(400).json({ success: false, error: 'Este código já existe no sistema.' });
  }

  const newCodeRecord: ServerAccessCode = {
    code: normalizedCode,
    status: 'unused',
    activatedAt: null,
    expiresAt: null,
    label: label || 'Código Personalizado',
    category: category || 'Geral',
    createdAt: Date.now()
  };

  accessCodesDb.set(normalizedCode, newCodeRecord);
  saveCodesToDisk();

  return res.json({
    success: true,
    message: `Código ${normalizedCode} criado com sucesso.`,
    code: newCodeRecord
  });
});

// 5. Admin: Revoke Access Code Instantly
app.post('/api/access/admin/revoke', (req, res) => {
  const { code: rawCode, reason } = req.body;
  if (!rawCode) {
    return res.status(400).json({ success: false, error: 'Código não fornecido.' });
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);

  if (!record) {
    return res.status(404).json({ success: false, error: 'Código não encontrado.' });
  }

  record.status = 'revoked';
  record.revokedAt = Date.now();
  record.revokedReason = reason || 'Acesso revogado pela administração da CIIT 2026.';
  accessCodesDb.set(normalizedCode, record);
  saveCodesToDisk();

  return res.json({
    success: true,
    message: `Código ${normalizedCode} revogado com sucesso.`,
    code: record
  });
});

// 6. Admin: Reset / Reactivate Code (New 24h Quota)
app.post('/api/access/admin/reset', (req, res) => {
  const { code: rawCode } = req.body;
  if (!rawCode) {
    return res.status(400).json({ success: false, error: 'Código não fornecido.' });
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);

  if (!record) {
    return res.status(404).json({ success: false, error: 'Código não encontrado.' });
  }

  record.status = 'unused';
  record.activatedAt = null;
  record.expiresAt = null;
  record.deviceId = undefined;
  record.token = undefined;
  record.revokedAt = null;
  record.revokedReason = undefined;
  accessCodesDb.set(normalizedCode, record);
  saveCodesToDisk();

  return res.json({
    success: true,
    message: `Código ${normalizedCode} redefinido para não utilizado (24 horas disponíveis).`,
    code: record
  });
});

// 7. Admin: Delete Access Code Permanently
app.post('/api/access/admin/delete', (req, res) => {
  const { code: rawCode } = req.body;
  if (!rawCode) {
    return res.status(400).json({ success: false, error: 'Código não fornecido.' });
  }

  const normalizedCode = rawCode.trim().toUpperCase();
  if (!accessCodesDb.has(normalizedCode)) {
    return res.status(404).json({ success: false, error: 'Código não encontrado.' });
  }

  accessCodesDb.delete(normalizedCode);
  saveCodesToDisk();

  return res.json({
    success: true,
    message: `Código ${normalizedCode} apagado permanentemente.`,
    code: normalizedCode
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    service: 'CIIT 2026 24h Gatekeeper Access Control API'
  });
});

// ----------------------------------------------------
// VITE & STATIC SPA MIDDLEWARE
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CIIT 2026 Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
