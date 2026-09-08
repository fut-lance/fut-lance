'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

interface PlayerStreamProps {
  url: string;
  titulo: string;
}

export default function PlayerStream({ url, titulo }: PlayerStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [paused, setPaused] = useState(true);
  const [error, setError] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
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
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="bg-green-600 px-4 py-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        <span className="text-white font-bold text-sm">{titulo}</span>
        {error && <span className="text-red-200 text-xs ml-auto">Erro ao carregar</span>}
      </div>
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black"
          controls
          playsInline
          preload="auto"
        />
        {paused && !error && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          >
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition">
              <svg className="w-10 h-10 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="text-center px-4">
              <p className="text-white mb-3">Erro ao carregar o video</p>
              <button onClick={() => { setError(false); window.location.reload(); }} className="bg-white text-green-600 px-6 py-2 rounded-full font-bold text-sm">
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
