"use client";

import React, { useState, useEffect, useRef } from "react";

export interface ProgressiveImageModalViewerProps {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  className?: string;
}

interface StageConfig {
  id: string;
  width: number;
  pixelated: boolean;
  durationMs: number;
}

const STAGES: StageConfig[] = [
  { id: "144p", width: 144, pixelated: true, durationMs: 280 },
  { id: "256p", width: 256, pixelated: true, durationMs: 280 },
  { id: "720p", width: 720, pixelated: false, durationMs: 260 },
  { id: "1080p", width: 1080, pixelated: false, durationMs: 260 },
  { id: "4k", width: 2560, pixelated: false, durationMs: 0 },
];

function getOptimizedUrl(src: string, width: number): string {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_scale/`);
  }
  if (src.startsWith("/")) {
    const nextW = width <= 256 ? 256 : width <= 720 ? 640 : width <= 1080 ? 1080 : 1920;
    return `/_next/image?url=${encodeURIComponent(src)}&w=${nextW}&q=75`;
  }
  return src;
}

export default function ProgressiveImageModalViewer({
  src,
  alt,
  thumbnailSrc,
  className = ""
}: ProgressiveImageModalViewerProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [is4KReady, setIs4KReady] = useState<boolean>(false);
  const [hasCanvasDrawn, setHasCanvasDrawn] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);
  const timerIdsRef = useRef<NodeJS.Timeout[]>([]);
  const activeSrcRef = useRef<string>(src);

  // Clear timers
  const clearTimers = () => {
    timerIdsRef.current.forEach((t) => clearTimeout(t));
    timerIdsRef.current = [];
  };

  // Draw stage onto canvas
  const renderCanvasStage = (stageIdx: number, sourceImg: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const stage = STAGES[stageIdx];
    const aspect = (sourceImg.naturalWidth || 1) / (sourceImg.naturalHeight || 1);
    const targetW = stage.width;
    const targetH = Math.max(1, Math.round(targetW / aspect));

    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = !stage.pixelated;
    ctx.clearRect(0, 0, targetW, targetH);
    ctx.drawImage(sourceImg, 0, 0, targetW, targetH);
    setHasCanvasDrawn(true);
  };

  useEffect(() => {
    activeSrcRef.current = src;
    clearTimers();
    setCurrentStageIndex(0);
    setIs4KReady(false);
    setHasCanvasDrawn(false);

    // Fast image loader without CORS penalty
    const img = new window.Image();

    const startCascade = () => {
      if (activeSrcRef.current !== src) return;
      loadedImgRef.current = img;

      // 1. Immediately paint 144p onto canvas
      renderCanvasStage(0, img);
      setCurrentStageIndex(0);

      // 2. Cascade through 256p -> 720p -> 1080p -> 4k
      let cumulativeTime = STAGES[0].durationMs;

      for (let i = 1; i < STAGES.length; i++) {
        const nextIdx = i;
        const t = setTimeout(() => {
          if (activeSrcRef.current !== src) return;

          setCurrentStageIndex(nextIdx);

          if (nextIdx < STAGES.length - 1 && loadedImgRef.current) {
            renderCanvasStage(nextIdx, loadedImgRef.current);
          } else {
            setIs4KReady(true);
          }
        }, cumulativeTime);

        timerIdsRef.current.push(t);
        cumulativeTime += STAGES[nextIdx].durationMs;
      }
    };

    // Use fast thumbnail source first so it resolves in 0-10ms
    const fastUrl = thumbnailSrc || getOptimizedUrl(src, 256);
    img.src = fastUrl;

    if (img.complete && img.naturalWidth > 0) {
      startCascade();
    } else {
      img.onload = startCascade;
      img.onerror = () => {
        if (img.src !== src) {
          img.src = src;
        } else {
          setIs4KReady(true);
        }
      };
    }

    return () => {
      clearTimers();
    };
  }, [src, thumbnailSrc]);

  const currentStage = STAGES[currentStageIndex] || STAGES[0];
  const isPixelated = currentStage.pixelated;

  // Immediate preview URL: guaranteed to be available instantly
  const immediatePreviewUrl = thumbnailSrc || getOptimizedUrl(src, 256);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Full-size media viewer container with absolute centered layers */}
      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
        {/* Layer 1: Instant Base Image (Never a black screen! Visible on millisecond 0) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={immediatePreviewUrl}
          alt={alt}
          className={`absolute inset-0 m-auto w-full h-full max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-200 ${
            hasCanvasDrawn || is4KReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            imageRendering: "pixelated",
            filter: "blur(12px) contrast(130%)",
          }}
        />

        {/* Layer 2: Progressive Canvas (Renders 144p, 256p, 720p, 1080p pixel by pixel) */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 m-auto w-full h-full max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-200 ${
            hasCanvasDrawn && !is4KReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            imageRendering: isPixelated ? "pixelated" : "auto",
          }}
        />

        {/* Layer 3: Native High-Res 4K Image (Smoothly lands dead-center at the end) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 m-auto w-full h-full max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-300 ${
            is4KReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Subtle low frame-rate scanline overlay (active only during 144p & 256p) */}
        {!is4KReady && isPixelated && (
          <div
            className="absolute inset-2 sm:inset-4 rounded-2xl pointer-events-none z-10 overflow-hidden opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.45) 50%)",
              backgroundSize: "100% 4px",
            }}
          />
        )}
      </div>
    </div>
  );
}
