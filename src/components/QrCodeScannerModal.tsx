/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { realtimeAttendance } from '../services/realtimeAttendance';
import { QrScanResult, CheckInRecord } from '../types';
import {
  X, Camera, CameraOff, Upload, CheckCircle2, AlertTriangle, XCircle,
  Sparkles, RefreshCw, Zap, ShieldCheck, UserCheck, Clock, Building2,
  Globe, Briefcase, ChevronRight, Hash, Volume2, VolumeX, Smartphone
} from 'lucide-react';

interface QrCodeScannerModalProps {
  lang: 'pt' | 'en';
  isOpen: boolean;
  onClose: () => void;
  onCheckInSuccess?: (result: QrScanResult) => void;
}

export default function QrCodeScannerModal({
  lang,
  isOpen,
  onClose,
  onCheckInSuccess
}: QrCodeScannerModalProps) {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual' | 'simulator'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [lastResult, setLastResult] = useState<QrScanResult | null>(null);
  const [recentScanLog, setRecentScanLog] = useState<CheckInRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerElementId = 'ciit-html5-qr-reader';
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Sound synthesizer
  const playSound = (type: 'success' | 'duplicate' | 'error') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'success') {
        // High crisp double chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'duplicate') {
        // Warning double buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(330, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        // Error low tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Audio not supported or autoplay blocked
    }
  };

  // Sync recent check-ins log
  useEffect(() => {
    if (isOpen) {
      setRecentScanLog(realtimeAttendance.getCheckIns().slice(0, 5));
    }
  }, [isOpen, lastResult]);

  // Handle camera start/stop
  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setCameraError(
          lang === 'pt'
            ? 'Nenhuma câmara de vídeo foi encontrada no seu dispositivo.'
            : 'No video camera detected on this device.'
        );
        return;
      }

      // Stop previous instance if any
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          scannerRef.current.clear();
        } catch (e) {
          // ignore
        }
      }

      const html5QrCode = new Html5Qrcode(readerElementId);
      scannerRef.current = html5QrCode;

      // Prefer back camera on mobile
      const cameraId = devices.length > 1 ? devices[devices.length - 1].id : devices[0].id;

      await html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          handleDecodedQr(decodedText);
        },
        () => {
          // Frame scan error (ignore continuous scan noise)
        }
      );
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Failed to start camera:', err);
      setCameraError(
        lang === 'pt'
          ? 'Permissão de acesso à câmara recusada ou indisponível. Utilize o modo de inserção manual ou carregue a foto da credencial.'
          : 'Camera access denied or unavailable. Use manual code lookup or upload a badge image.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (e) {
        // ignore
      }
      scannerRef.current = null;
    }
    setCameraActive(false);
  };

  const handleDecodedQr = (rawQrText: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const result = realtimeAttendance.performCheckIn(rawQrText, {
      deviceId: 'SCANNER-PORTAL-01',
      operatorName: 'Recepção Protocolar CIIT'
    });

    setLastResult(result);

    if (result.status === 'PRESENTE') {
      playSound('success');
      if (onCheckInSuccess) onCheckInSuccess(result);
    } else if (result.status === 'DUPLICADO') {
      playSound('duplicate');
    } else {
      playSound('error');
    }

    // Cooldown before scanning next item
    setTimeout(() => {
      setIsProcessing(false);
    }, 1800);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleDecodedQr(manualCode.trim());
    setManualCode('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const html5QrCode = new Html5Qrcode('file-qr-temp-reader');
      const decodedText = await html5QrCode.scanFile(file, true);
      handleDecodedQr(decodedText);
      html5QrCode.clear();
    } catch (err) {
      setLastResult({
        success: false,
        status: 'INVALIDO',
        message: lang === 'pt' ? '✕ Não foi possível ler o QR Code na imagem fornecida.' : '✕ Could not find a valid QR Code in this image.',
        messageEn: '✕ Could not find a valid QR Code in this image.'
      });
      playSound('error');
      setIsProcessing(false);
    }
  };

  // Simulator helper quick triggers
  const handleSimulateCheckIn = (code: string) => {
    handleDecodedQr(code);
  };

  const handleSimulateBatch = () => {
    const registrations = realtimeAttendance.getRegistrations();
    const pendingList = registrations.filter(r => !r.isCheckedIn);

    if (pendingList.length === 0) {
      // Load demo data first if none pending
      realtimeAttendance.loadDemoData();
    }

    const available = realtimeAttendance.getRegistrations().filter(r => !r.isCheckedIn);
    const toProcess = available.slice(0, 3);

    toProcess.forEach((p, idx) => {
      setTimeout(() => {
        handleDecodedQr(p.id);
      }, idx * 600);
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="qr-scanner-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        id="qr-scanner-modal-container"
        className="bg-corporate-950 border border-gold-500/40 rounded-none shadow-2xl max-w-2xl w-full text-white overflow-hidden relative my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-corporate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-none bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-gold-400">
                  {lang === 'pt' ? 'Terminal de Entrada' : 'Accreditation Terminal'}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-none text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                  LIVE
                </span>
              </div>
              <h3 className="text-lg font-display font-light uppercase tracking-wider text-white">
                {lang === 'pt' ? 'Scanner de Credenciamento CIIT' : 'CIIT Entrance QR Scanner'}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Toggle */}
            <button
              id="qr-scanner-audio-toggle"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Silenciar bip de leitura' : 'Ativar bip de leitura'}
              className="p-2 rounded-none bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-gold-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
            </button>

            {/* Close Modal */}
            <button
              id="qr-scanner-close-btn"
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-2 rounded-none bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:text-rose-400 text-gray-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Operational Mode Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-corporate-900/30 text-xs font-semibold">
          <button
            id="tab-camera-btn"
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'camera'
                ? 'border-gold-500 text-gold-400 bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Câmara Live' : 'Live Camera'}</span>
          </button>

          <button
            id="tab-manual-btn"
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'border-gold-500 text-gold-400 bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Hash className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Inserção por Código' : 'Manual ID'}</span>
          </button>

          <button
            id="tab-upload-btn"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-gold-500 text-gold-400 bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Carregar Foto' : 'Upload File'}</span>
          </button>

          <button
            id="tab-simulator-btn"
            onClick={() => setActiveTab('simulator')}
            className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-gold-500 text-gold-400 bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Simulador VIP' : 'Simulator'}</span>
          </button>
        </div>

        {/* Modal Main Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: CAMERA STREAM */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-none border border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                {/* Real HTML5 QR Scanner Viewport */}
                <div
                  id={readerElementId}
                  className="w-full max-w-sm rounded-none overflow-hidden"
                />

                {/* Laser scan line overlay */}
                {cameraActive && (
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-pulse pointer-events-none shadow-[0_0_12px_#eab308]" />
                )}

                {/* Error Banner if Camera Failed */}
                {cameraError && (
                  <div className="p-6 text-center max-w-md space-y-3">
                    <CameraOff className="w-10 h-10 text-amber-400 mx-auto" />
                    <p className="text-xs text-amber-200 font-light leading-relaxed">
                      {cameraError}
                    </p>
                    <button
                      id="retry-camera-btn"
                      onClick={startCamera}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-corporate-950 text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer"
                    >
                      {lang === 'pt' ? 'Tentar Novamente' : 'Retry Camera'}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center space-x-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-gold-400" />
                  <span>{lang === 'pt' ? 'Aponte a câmara para a credencial do delegado' : 'Point camera directly at delegate badge'}</span>
                </span>
                <span className="font-mono text-gray-500">Auto-Detect 10 FPS</span>
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL ID CODE ENTRY */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="bg-corporate-900/60 p-6 border border-white/10 rounded-none space-y-4">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  {lang === 'pt' ? 'Código da Credencial ou ID de Inscrição' : 'Badge ID or Registration Code'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="manual-qr-input"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g. CIIT-2026-0001 ou CIIT-2026-1024"
                    className="flex-1 px-4 py-3 bg-corporate-950 border border-white/15 rounded-none text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 font-mono uppercase"
                    autoFocus
                  />
                  <button
                    type="submit"
                    id="manual-qr-submit-btn"
                    disabled={!manualCode.trim() || isProcessing}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-corporate-950 font-bold uppercase text-xs tracking-widest rounded-none transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : (lang === 'pt' ? 'Validar' : 'Validate')}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400">
                  {lang === 'pt'
                    ? 'Dica: Digite o número impresso no verso ou rodapé da credencial.'
                    : 'Tip: Enter the code printed on the physical or virtual access badge.'}
                </p>
              </div>
            </form>
          )}

          {/* TAB 3: FILE UPLOAD SCANNER */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="bg-corporate-900/40 border-2 border-dashed border-white/15 p-8 text-center rounded-none hover:border-gold-500/50 transition-colors">
                <Upload className="w-10 h-10 text-gold-400 mx-auto mb-3" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  {lang === 'pt' ? 'Carregar Imagem da Credencial' : 'Upload Badge Screenshot'}
                </h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  {lang === 'pt'
                    ? 'Selecione uma fotografia ou captura de ecrã do QR Code da conferência.'
                    : 'Choose an image file containing the official conference QR Code.'}
                </p>
                <label className="mt-4 inline-block px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer border border-white/20">
                  <span>{lang === 'pt' ? 'Procurar Ficheiro' : 'Browse File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div id="file-qr-temp-reader" className="hidden" />
            </div>
          )}

          {/* TAB 4: SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="bg-corporate-900/60 p-5 border border-white/10 rounded-none space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'pt' ? 'Simulador de Leituras de Entrada' : 'Accreditation Simulator'}</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">1-Click Live Test</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <button
                    id="sim-valid-chapo"
                    onClick={() => handleSimulateCheckIn('CIIT-2026-0001')}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs transition-colors rounded-none cursor-pointer"
                  >
                    <span className="font-bold text-white block">Daniel Francisco Chapo</span>
                    <span className="text-[10px] text-gold-400 block font-mono">CIIT-2026-0001 (Presidente da República)</span>
                  </button>

                  <button
                    id="sim-valid-muhate"
                    onClick={() => handleSimulateCheckIn('CIIT-2026-0002')}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs transition-colors rounded-none cursor-pointer"
                  >
                    <span className="font-bold text-white block">Basílio Zefanias Muhate</span>
                    <span className="text-[10px] text-gold-400 block font-mono">CIIT-2026-0002 (Ministro da Economia)</span>
                  </button>

                  <button
                    id="sim-valid-massingue"
                    onClick={() => handleSimulateCheckIn('CIIT-2026-0004')}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs transition-colors rounded-none cursor-pointer"
                  >
                    <span className="font-bold text-white block">Dr. Álvaro Massingue</span>
                    <span className="text-[10px] text-gold-400 block font-mono">CIIT-2026-0004 (Presidente CTA)</span>
                  </button>

                  <button
                    id="sim-invalid-code"
                    onClick={() => handleSimulateCheckIn('CIIT-INVALID-9999')}
                    className="p-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-left text-xs transition-colors rounded-none cursor-pointer"
                  >
                    <span className="font-bold text-rose-300 block">✕ QR Code Inválido / Falso</span>
                    <span className="text-[10px] text-rose-400 block font-mono">CIIT-INVALID-9999</span>
                  </button>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    id="sim-batch-entries"
                    onClick={handleSimulateBatch}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-corporate-950 font-bold uppercase text-[10px] tracking-widest rounded-none transition-colors cursor-pointer text-center"
                  >
                    {lang === 'pt' ? '⚡ Simular 3 Check-ins em Sequência' : '⚡ Simulate 3 Live Check-ins'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC RESULT BANNER / OVERLAY */}
          {lastResult && (
            <div
              id="qr-scan-result-card"
              className={`p-5 rounded-none border transition-all animate-fade-in ${
                lastResult.status === 'PRESENTE'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : lastResult.status === 'DUPLICADO'
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="p-2 rounded-none bg-black/40 flex-shrink-0 mt-0.5">
                  {lastResult.status === 'PRESENTE' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                  {lastResult.status === 'DUPLICADO' && <AlertTriangle className="w-6 h-6 text-amber-400" />}
                  {lastResult.status === 'INVALIDO' && <XCircle className="w-6 h-6 text-rose-400" />}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold uppercase tracking-wider text-sm">
                      {lastResult.status === 'PRESENTE' && (lang === 'pt' ? '✓ CHECK-IN CONFIRMADO' : '✓ CHECK-IN CONFIRMED')}
                      {lastResult.status === 'DUPLICADO' && (lang === 'pt' ? '⚠ CHECK-IN JÁ REALIZADO' : '⚠ CHECK-IN ALREADY COMPLETED')}
                      {lastResult.status === 'INVALIDO' && (lang === 'pt' ? '✕ QR CODE INVÁLIDO' : '✕ INVALID QR CODE')}
                    </h4>
                    <span className="text-[10px] font-mono opacity-70">
                      {new Date().toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed font-light">
                    {lang === 'pt' ? lastResult.message : lastResult.messageEn}
                  </p>

                  {/* Participant card details if recognized */}
                  {lastResult.participant && (
                    <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-black/30 p-3 rounded-none">
                      <div>
                        <span className="text-[9px] uppercase font-mono text-gray-400 block">{lang === 'pt' ? 'Nome' : 'Name'}</span>
                        <span className="font-bold text-white block">{lastResult.participant.fullName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-mono text-gray-400 block">{lang === 'pt' ? 'Cargo & Entidade' : 'Role & Entity'}</span>
                        <span className="font-medium text-gray-200 block">{lastResult.participant.jobTitle} • {lastResult.participant.company}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-mono text-gray-400 block">{lang === 'pt' ? 'ID da Credencial' : 'Badge Pass ID'}</span>
                        <span className="font-mono text-gold-400 font-bold block">{lastResult.participant.id}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-mono text-gray-400 block">{lang === 'pt' ? 'Tipo de Delegado' : 'Category'}</span>
                        <span className="uppercase text-gold-300 font-bold block text-[10px]">{lastResult.participant.registrationType}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* RECENT SCANNER AUDIT LOG */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{lang === 'pt' ? 'Últimos Check-ins no Terminal' : 'Recent Scans on Terminal'}</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {recentScanLog.length} {lang === 'pt' ? 'Registos' : 'Entries'}
              </span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {recentScanLog.length > 0 ? (
                recentScanLog.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2.5 bg-corporate-900/40 border border-white/5 text-xs hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-gold-400 font-bold text-[11px]">{log.formattedTime}</span>
                      <div>
                        <div className="font-semibold text-white">{log.participantName}</div>
                        <div className="text-[10px] text-gray-400">{log.company}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ✓ Presente
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-4">
                  {lang === 'pt' ? 'Aguardando primeira leitura de QR Code...' : 'Waiting for first QR Code scan...'}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-corporate-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Porta 1 • Palácio do Governo / Centro de Conferências de Tete</span>
          </div>

          <button
            id="qr-scanner-done-btn"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-5 py-2 rounded-none bg-gold-600 hover:bg-gold-500 text-corporate-950 font-bold uppercase text-[10px] tracking-widest transition-colors cursor-pointer"
          >
            {lang === 'pt' ? 'Concluir' : 'Done'}
          </button>
        </div>

      </div>
    </div>
  );
}
