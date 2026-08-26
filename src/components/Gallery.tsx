/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Play,
  Pause,
  Grid,
  Layers,
  Camera,
  Check,
  Share2,
  Download,
  Info
} from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_IMAGES, TRANSLATIONS } from '../data';

interface GalleryProps {
  lang: 'pt' | 'en';
}

type GalleryCategory = 'all' | 'plenary' | 'leadership' | 'speeches' | 'delegates' | 'protocol';

export const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filteredImages: GalleryItem[] = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  // Keep index within bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const currentImage = filteredImages[currentIndex] || filteredImages[0];
  const lightboxImage = filteredImages[lightboxIndex] || filteredImages[0];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  }, [filteredImages.length]);

  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    setZoomLevel(1);
  }, [filteredImages.length]);

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  }, [filteredImages.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlay || isHovered || isLightboxOpen || viewMode === 'grid') return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, isLightboxOpen, viewMode, handleNext]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        handleLightboxPrev();
      } else if (e.key === 'ArrowRight') {
        handleLightboxNext();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.5, 1));
      } else if (e.key === '0') {
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleLightboxPrev, handleLightboxNext]);

  // Auto scroll active thumbnail inside the horizontal strip ONLY (does not scroll window)
  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    if (!container) return;
    const activeThumbnail = container.children[currentIndex] as HTMLElement;
    if (activeThumbnail) {
      const scrollLeft = activeThumbnail.offsetLeft - (container.clientWidth / 2) + (activeThumbnail.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Share handler
  const handleShare = async (img: GalleryItem) => {
    const title = lang === 'pt' ? img.title : img.titleEn;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `CIIT 2026 - ${title}`,
          text: lang === 'pt' ? img.description : img.descriptionEn,
          url: window.location.href
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const categories = [
    { key: 'all' as GalleryCategory, label: t.galleryFilterAll || (lang === 'pt' ? 'Todas as Fotos (18)' : 'All Photos (18)') },
    { key: 'plenary' as GalleryCategory, label: t.galleryFilterPlenary || (lang === 'pt' ? 'Sala Plenária' : 'Plenary Hall') },
    { key: 'leadership' as GalleryCategory, label: t.galleryFilterLeadership || (lang === 'pt' ? 'Liderança & Governo' : 'Leadership & Govt') },
    { key: 'speeches' as GalleryCategory, label: t.galleryFilterSpeeches || (lang === 'pt' ? 'Discursos Oficiais' : 'Official Speeches') },
    { key: 'delegates' as GalleryCategory, label: t.galleryFilterDelegates || (lang === 'pt' ? 'Corpo Diplomático' : 'Diplomatic Corps') },
    { key: 'protocol' as GalleryCategory, label: t.galleryFilterProtocol || (lang === 'pt' ? 'Protocolo & Família' : 'Protocol & Family') }
  ];

  return (
    <section
      id="gallery"
      className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden border-t border-slate-800"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.galleryAssetOfficial}</span>
          </div>

          <h2
            id="gallery-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4"
          >
            {t.galleryTitle}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Controls Bar: Categories & View Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div
            id="gallery-category-filters"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  id={`gallery-filter-${cat.key}`}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30 border border-primary-500'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* View Mode & Autoplay Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Carousel View Mode Toggle */}
            <div className="inline-flex rounded-xl bg-slate-800/90 p-1 border border-slate-700/70">
              <button
                id="gallery-view-carousel-btn"
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t.galleryViewCarousel}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.galleryViewCarousel}</span>
              </button>
              <button
                id="gallery-view-grid-btn"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t.galleryViewGrid}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.galleryViewGrid}</span>
              </button>
            </div>

            {/* Autoplay Play/Pause */}
            {viewMode === 'carousel' && (
              <button
                id="gallery-autoplay-toggle"
                onClick={() => setIsAutoPlay((prev) => !prev)}
                className={`p-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isAutoPlay
                    ? 'bg-slate-800 text-primary-400 border-primary-500/40 hover:bg-slate-700'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title={isAutoPlay ? t.galleryPause : t.galleryPlay}
                aria-label={isAutoPlay ? t.galleryPause : t.galleryPlay}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* View Mode: Carousel */}
        {viewMode === 'carousel' && currentImage && (
          <div
            id="gallery-carousel"
            className="flex flex-col gap-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Featured Slide Container */}
            <div
              className="relative w-full aspect-4/3 sm:aspect-16/9 max-h-[580px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full h-full relative flex items-center justify-center cursor-pointer"
                  onClick={() => openLightbox(currentIndex)}
                >
                  <img
                    src={currentImage.imageUrl}
                    alt={lang === 'pt' ? currentImage.title : currentImage.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover sm:object-contain bg-slate-950 transition-transform duration-500 group-hover:scale-[1.015]"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Caption Readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/30 to-slate-950/20 pointer-events-none" />

                  {/* Top Bar on Image: Category Badge & Index Counter */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-3 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-primary-400 text-xs font-semibold shadow-md">
                      {lang === 'pt' ? currentImage.categoryLabel : currentImage.categoryLabelEn}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-slate-200 text-xs font-medium font-mono shadow-md">
                        {currentIndex + 1} {t.galleryCountOf} {filteredImages.length}
                      </span>
                      <button
                        id="gallery-fullscreen-trigger-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(currentIndex);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-slate-200 hover:text-white hover:bg-primary-600 transition-colors pointer-events-auto cursor-pointer shadow-md"
                        title={t.galleryFullscreen}
                        aria-label={t.galleryFullscreen}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-left pointer-events-none z-10">
                    <div className="max-w-3xl">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md">
                        {lang === 'pt' ? currentImage.title : currentImage.titleEn}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow-sm">
                        {lang === 'pt' ? currentImage.description : currentImage.descriptionEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Navigation Arrows */}
              <button
                id="gallery-prev-btn"
                onClick={handlePrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 z-20 shadow-lg cursor-pointer focus:opacity-100"
                aria-label={t.galleryPrev}
                title={t.galleryPrev}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                id="gallery-next-btn"
                onClick={handleNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 z-20 shadow-lg cursor-pointer focus:opacity-100"
                aria-label={t.galleryNext}
                title={t.galleryNext}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 z-20 pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60">
                {filteredImages.map((_, idx) => (
                  <button
                    key={idx}
                    id={`gallery-dot-${idx}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-primary-500'
                        : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip (Miniaturas) */}
            <div className="w-full">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
                <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-primary-400" />
                  {t.galleryThumbnails} ({filteredImages.length})
                </span>
                <span className="font-mono text-slate-400">
                  {currentIndex + 1} / {filteredImages.length}
                </span>
              </div>

              <div
                ref={thumbnailsContainerRef}
                id="gallery-thumbnails-strip"
                className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
              >
                {filteredImages.map((img, idx) => {
                  const isActive = currentIndex === idx;
                  return (
                    <button
                      key={img.id}
                      id={`gallery-thumb-${idx}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'border-primary-500 ring-2 ring-primary-500/40 scale-105 shadow-md shadow-primary-500/20'
                          : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                      }`}
                      aria-label={`Select photo ${idx + 1}: ${lang === 'pt' ? img.title : img.titleEn}`}
                    >
                      <img
                        src={img.imageUrl}
                        alt={lang === 'pt' ? img.title : img.titleEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-primary-500/10 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* View Mode: Grid */}
        {viewMode === 'grid' && (
          <div
            id="gallery-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-lg hover:border-primary-500/60 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                {/* Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <img
                    src={img.imageUrl}
                    alt={lang === 'pt' ? img.title : img.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-primary-400 text-[11px] font-semibold">
                    {lang === 'pt' ? img.categoryLabel : img.categoryLabelEn}
                  </span>

                  {/* Zoom Hover Icon */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-1.5">
                      {lang === 'pt' ? img.title : img.titleEn}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {lang === 'pt' ? img.description : img.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{idx + 1} / {filteredImages.length}</span>
                    <span className="text-primary-400 font-medium font-sans flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      {t.galleryFullscreen} →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Institutional Footnote */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{t.galleryPressNotice}</span>
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && lightboxImage && (
          <motion.div
            id="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={closeLightbox}
          >
            {/* Lightbox Top Action Bar */}
            <div
              className="flex items-center justify-between gap-4 z-50 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-primary-600/30 border border-primary-500/50 text-primary-300 text-xs font-semibold">
                  {lang === 'pt' ? lightboxImage.categoryLabel : lightboxImage.categoryLabelEn}
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-300">
                  {lightboxIndex + 1} {t.galleryCountOf} {filteredImages.length}
                </span>
              </div>

              {/* Controls: Zoom, Share, Close */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  id="lightbox-zoom-out"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.5, 1))}
                  disabled={zoomLevel <= 1}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title={t.galleryZoomOut}
                  aria-label={t.galleryZoomOut}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  id="lightbox-zoom-in"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.5, 3))}
                  disabled={zoomLevel >= 3}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title={t.galleryZoomIn}
                  aria-label={t.galleryZoomIn}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {zoomLevel > 1 && (
                  <button
                    id="lightbox-reset-zoom"
                    onClick={() => setZoomLevel(1)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-primary-400 transition-colors cursor-pointer"
                    title={t.galleryResetZoom}
                    aria-label={t.galleryResetZoom}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                <button
                  id="lightbox-share-btn"
                  onClick={() => handleShare(lightboxImage)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  title="Partilhar / Share"
                  aria-label="Share"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  id="lightbox-close-btn"
                  onClick={closeLightbox}
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-colors cursor-pointer ml-2"
                  title={t.galleryClose}
                  aria-label={t.galleryClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Center Image Stage */}
            <div
              className="relative flex-1 flex items-center justify-center overflow-hidden my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={handleLightboxPrev}
                className="absolute left-2 sm:left-4 z-30 p-3 sm:p-4 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-primary-600 transition-colors shadow-2xl cursor-pointer"
                aria-label={t.galleryPrev}
                title={t.galleryPrev}
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Main Image with Zoom Scale */}
              <div className="max-w-5xl max-h-[72vh] flex items-center justify-center overflow-hidden">
                <motion.img
                  key={lightboxImage.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: zoomLevel }}
                  transition={{ duration: 0.3 }}
                  src={lightboxImage.imageUrl}
                  alt={lang === 'pt' ? lightboxImage.title : lightboxImage.titleEn}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl transition-transform duration-200"
                />
              </div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={handleLightboxNext}
                className="absolute right-2 sm:right-4 z-30 p-3 sm:p-4 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-primary-600 transition-colors shadow-2xl cursor-pointer"
                aria-label={t.galleryNext}
                title={t.galleryNext}
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Lightbox Bottom Info Bar */}
            <div
              className="max-w-3xl mx-auto w-full bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-center text-white backdrop-blur-md shadow-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {lang === 'pt' ? lightboxImage.title : lightboxImage.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'pt' ? lightboxImage.description : lightboxImage.descriptionEn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
