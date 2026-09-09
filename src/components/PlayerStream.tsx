'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

interface PlayerStreamProps {
  url: string;
  titulo: string;
}

export default function PlayerStream({ url, titulo }: PlayerStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [paused, setPaused] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setError(false);
    setPaused(true);

    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

    if (url.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: true,
        maxBufferLength: 10,
        maxMaxBufferLength: 20,
        manifestLoadingTimeOut: 30000,
        manifestLoadingMaxRetry: 10,
        manifestLoadingRetryDelay: 500,
        fragLoadingTimeOut: 30000,
        fragLoadingMaxRetry: 10,
        startFragPrefetch: true,
      });
      hlsRef.current = hls;

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          } else {
            setError(true);
          }
        }
      });

      hls.loadSource(proxyUrl);
      hls.attachMedia(video);
    } else if (url.includes('.m3u8') && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = proxyUrl;
      video.onerror = () => setError(true);
    } else {
      setError(true);
    }

    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url]);

  return (
    <div ref={containerRef} className="bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* Channel Header */}
      <div className="bg-gradient-to-r from-fut-green to-green-600 px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
        <span className="text-white font-bold text-sm truncate">{titulo}</span>
        {error && <span className="text-red-200 text-xs ml-auto">Erro ao carregar</span>}
      </div>

      {/* Video Container */}
      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black"
          controls={!paused}
          playsInline
          preload="auto"
        />

        {/* Play Overlay */}
        {paused && !error && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 bg-black/20"
          >
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-105 transition-all">
              <svg className="w-10 h-10 text-fut-green ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center px-4">
              <span className="text-5xl block mb-4">⚠️</span>
              <p className="text-white mb-3 font-medium">Erro ao carregar o vídeo</p>
              <p className="text-gray-400 text-sm mb-4">Tente novamente ou escolha outro canal.</p>
              <button
                onClick={() => { setError(false); window.location.reload(); }}
                className="bg-fut-green text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-green-600 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Fullscreen Button */}
        {!paused && !error && (
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors z-10"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4H4M9 9h5M15 15v5h5M15 15H9" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
