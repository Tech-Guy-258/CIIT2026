var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var app = (0, import_express.default)();
var PORT = 3e3;
var STORAGE_FILE = import_path.default.join(process.cwd(), "data_access_codes.json");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Device-Id");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ extended: true }));
var DURATION_24H_MS = 24 * 60 * 60 * 1e3;
var DEFAULT_CODES = [
  {
    code: "CIIT2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Chave Oficial CIIT 2026",
    category: "Geral",
    createdAt: Date.now()
  },
  {
    code: "TETE-INVEST-2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Acesso Investidor Estrat\xE9gico",
    category: "Investidor",
    createdAt: Date.now()
  },
  {
    code: "CIIT-VIP-ACCESS",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Credencial VIP Executiva",
    category: "VIP",
    createdAt: Date.now()
  },
  {
    code: "MOZ-INVEST-2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Delega\xE7\xE3o Internacional",
    category: "Internacional",
    createdAt: Date.now()
  },
  {
    code: "GOV-TETE-2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Governo & Protocolo de Estado",
    category: "Governo",
    createdAt: Date.now()
  },
  {
    code: "ADMIN-CIIT-2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Comiss\xE3o Organizadora / Admin",
    category: "Admin",
    createdAt: Date.now()
  },
  {
    code: "DELEGATE-2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Delegado Participante",
    category: "Delegado",
    createdAt: Date.now()
  },
  {
    code: "PARTNER-2026",
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: "Patrocinador / Parceiro",
    category: "Parceiro",
    createdAt: Date.now()
  }
];
var accessCodesDb = /* @__PURE__ */ new Map();
function loadCodesFromDisk() {
  try {
    if (import_fs.default.existsSync(STORAGE_FILE)) {
      const raw = import_fs.default.readFileSync(STORAGE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (item && item.code) {
            accessCodesDb.set(item.code.toUpperCase(), item);
          }
        });
      }
    }
  } catch (err) {
    console.warn("N\xE3o foi poss\xEDvel ler arquivo de persist\xEAncia de c\xF3digos, inicializando padr\xE3o:", err);
  }
  DEFAULT_CODES.forEach((item) => {
    if (!accessCodesDb.has(item.code.toUpperCase())) {
      accessCodesDb.set(item.code.toUpperCase(), { ...item });
    }
  });
}
function saveCodesToDisk() {
  try {
    const list = Array.from(accessCodesDb.values());
    import_fs.default.writeFileSync(STORAGE_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar c\xF3digos em disco:", err);
  }
}
loadCodesFromDisk();
function checkAndUpdateCodeExpiration(record) {
  const now = Date.now();
  if (record.status === "active" && record.expiresAt && now >= record.expiresAt) {
    record.status = "expired";
  }
  return record;
}
app.post("/api/access/validate", (req, res) => {
  const { code: rawCode, deviceId } = req.body;
  const now = Date.now();
  if (!rawCode || typeof rawCode !== "string") {
    return res.status(400).json({
      success: false,
      error: "Por favor, introduza um c\xF3digo de acesso v\xE1lido."
    });
  }
  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);
  if (!record) {
    return res.status(404).json({
      success: false,
      error: "C\xF3digo de acesso n\xE3o encontrado. Verifique o c\xF3digo e tente novamente."
    });
  }
  checkAndUpdateCodeExpiration(record);
  if (record.status === "revoked") {
    return res.status(403).json({
      success: false,
      revoked: true,
      error: record.revokedReason || "Este c\xF3digo de acesso foi revogado pela comiss\xE3o organizadora."
    });
  }
  if (record.status === "expired") {
    return res.status(403).json({
      success: false,
      expired: true,
      error: "Este c\xF3digo de acesso expirou ap\xF3s 24 horas. Solicite um novo c\xF3digo para continuar."
    });
  }
  if (record.status === "unused") {
    record.status = "active";
    record.activatedAt = now;
    record.expiresAt = now + DURATION_24H_MS;
    record.deviceId = deviceId || "client-browser-" + Math.random().toString(36).substring(2);
    record.token = `ciit_auth_${Math.random().toString(36).substring(2)}_${now.toString(36)}`;
    record.lastVerifiedAt = now;
    accessCodesDb.set(normalizedCode, record);
    saveCodesToDisk();
    return res.json({
      success: true,
      valid: true,
      code: record.code,
      token: record.token,
      status: record.status,
      activatedAt: record.activatedAt,
      expiresAt: record.expiresAt,
      serverTime: now,
      remainingMs: DURATION_24H_MS,
      message: "C\xF3digo de acesso validado com sucesso! Per\xEDodo de 24 horas iniciado."
    });
  }
  if (record.status === "active") {
    const remainingMs = Math.max(0, (record.expiresAt || 0) - now);
    record.lastVerifiedAt = now;
    saveCodesToDisk();
    return res.json({
      success: true,
      valid: true,
      code: record.code,
      token: record.token,
      status: record.status,
      activatedAt: record.activatedAt,
      expiresAt: record.expiresAt,
      serverTime: now,
      remainingMs,
      message: "Acesso ativo restabelecido."
    });
  }
  return res.status(400).json({
    success: false,
    error: "Estado de acesso desconhecido."
  });
});
app.get("/api/access/verify-session", (req, res) => {
  const rawCode = req.query.code;
  const token = req.query.token;
  const now = Date.now();
  if (!rawCode) {
    return res.status(400).json({
      valid: false,
      serverTime: now,
      error: "C\xF3digo n\xE3o fornecido."
    });
  }
  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);
  if (!record) {
    return res.json({
      valid: false,
      serverTime: now,
      error: "C\xF3digo n\xE3o encontrado no servidor."
    });
  }
  if (token && record.token && record.token !== token) {
  }
  checkAndUpdateCodeExpiration(record);
  if (record.status === "revoked") {
    return res.json({
      valid: false,
      revoked: true,
      serverTime: now,
      error: "Este c\xF3digo de acesso foi revogado pela organiza\xE7\xE3o."
    });
  }
  if (record.status === "expired" || record.expiresAt && now >= record.expiresAt) {
    record.status = "expired";
    return res.json({
      valid: false,
      expired: true,
      serverTime: now,
      error: "Este c\xF3digo de acesso expirou ap\xF3s 24 horas. Solicite um novo c\xF3digo para continuar."
    });
  }
  if (record.status === "active" && record.expiresAt) {
    const remainingMs = Math.max(0, record.expiresAt - now);
    record.lastVerifiedAt = now;
    return res.json({
      valid: true,
      code: record.code,
      status: "active",
      activatedAt: record.activatedAt,
      expiresAt: record.expiresAt,
      serverTime: now,
      remainingMs,
      token: record.token
    });
  }
  return res.json({
    valid: false,
    serverTime: now,
    error: "C\xF3digo ainda n\xE3o ativado ou inv\xE1lido."
  });
});
app.get("/api/access/admin/codes", (req, res) => {
  const now = Date.now();
  const codesList = Array.from(accessCodesDb.values()).map((item) => {
    checkAndUpdateCodeExpiration(item);
    const remainingMs = item.status === "active" && item.expiresAt ? Math.max(0, item.expiresAt - now) : 0;
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
app.post("/api/access/admin/create", (req, res) => {
  const { code: rawCode, label, category } = req.body;
  if (!rawCode || typeof rawCode !== "string") {
    return res.status(400).json({ success: false, error: "C\xF3digo inv\xE1lido." });
  }
  const normalizedCode = rawCode.trim().toUpperCase();
  if (accessCodesDb.has(normalizedCode)) {
    return res.status(400).json({ success: false, error: "Este c\xF3digo j\xE1 existe no sistema." });
  }
  const newCodeRecord = {
    code: normalizedCode,
    status: "unused",
    activatedAt: null,
    expiresAt: null,
    label: label || "C\xF3digo Personalizado",
    category: category || "Geral",
    createdAt: Date.now()
  };
  accessCodesDb.set(normalizedCode, newCodeRecord);
  saveCodesToDisk();
  return res.json({
    success: true,
    message: `C\xF3digo ${normalizedCode} criado com sucesso.`,
    code: newCodeRecord
  });
});
app.post("/api/access/admin/revoke", (req, res) => {
  const { code: rawCode, reason } = req.body;
  if (!rawCode) {
    return res.status(400).json({ success: false, error: "C\xF3digo n\xE3o fornecido." });
  }
  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);
  if (!record) {
    return res.status(404).json({ success: false, error: "C\xF3digo n\xE3o encontrado." });
  }
  record.status = "revoked";
  record.revokedAt = Date.now();
  record.revokedReason = reason || "Acesso revogado pela administra\xE7\xE3o da CIIT 2026.";
  accessCodesDb.set(normalizedCode, record);
  saveCodesToDisk();
  return res.json({
    success: true,
    message: `C\xF3digo ${normalizedCode} revogado com sucesso.`,
    code: record
  });
});
app.post("/api/access/admin/reset", (req, res) => {
  const { code: rawCode } = req.body;
  if (!rawCode) {
    return res.status(400).json({ success: false, error: "C\xF3digo n\xE3o fornecido." });
  }
  const normalizedCode = rawCode.trim().toUpperCase();
  const record = accessCodesDb.get(normalizedCode);
  if (!record) {
    return res.status(404).json({ success: false, error: "C\xF3digo n\xE3o encontrado." });
  }
  record.status = "unused";
  record.activatedAt = null;
  record.expiresAt = null;
  record.deviceId = void 0;
  record.token = void 0;
  record.revokedAt = null;
  record.revokedReason = void 0;
  accessCodesDb.set(normalizedCode, record);
  saveCodesToDisk();
  return res.json({
    success: true,
    message: `C\xF3digo ${normalizedCode} redefinido para n\xE3o utilizado (24 horas dispon\xEDveis).`,
    code: record
  });
});
app.post("/api/access/admin/delete", (req, res) => {
  const { code: rawCode } = req.body;
  if (!rawCode) {
    return res.status(400).json({ success: false, error: "C\xF3digo n\xE3o fornecido." });
  }
  const normalizedCode = rawCode.trim().toUpperCase();
  if (!accessCodesDb.has(normalizedCode)) {
    return res.status(404).json({ success: false, error: "C\xF3digo n\xE3o encontrado." });
  }
  accessCodesDb.delete(normalizedCode);
  saveCodesToDisk();
  return res.json({
    success: true,
    message: `C\xF3digo ${normalizedCode} apagado permanentemente.`,
    code: normalizedCode
  });
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now(),
    service: "CIIT 2026 24h Gatekeeper Access Control API"
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CIIT 2026 Full-Stack Server running on port ${PORT}`);
  });
}
startServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
