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
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setStatus('loading');
    video.play().then(() => setStatus('ready')).catch(() => setStatus('idle'));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setStatus('idle');

    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

    if (url.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: true,
        maxBufferLength: 15,
        maxMaxBufferLength: 30,
        manifestLoadingTimeOut: 30000,
        manifestLoadingMaxRetry: 5,
        manifestLoadingRetryDelay: 1000,
        levelLoadingTimeOut: 30000,
        fragLoadingTimeOut: 30000,
      });
      hlsRef.current = hls;
      hls.loadSource(proxyUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setStatus('ready'));
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else {
            setStatus('error');
          }
        }
      });
    } else if (url.includes('.m3u8') && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = proxyUrl;
      video.onloadedmetadata = () => setStatus('ready');
      video.onerror = () => setStatus('error');
    } else {
      video.src = url;
      video.onloadeddata = () => setStatus('ready');
      video.onerror = () => setStatus('error');
    }

    return () => {
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
        {status === 'loading' && <span className="text-white/60 text-xs ml-auto">Carregando...</span>}
        {status === 'error' && (
          <button onClick={handlePlay} className="text-white/80 text-xs ml-auto underline">
            Tentar novamente
          </button>
        )}
      </div>
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black"
          controls={status === 'ready'}
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80"
        />
        {status !== 'ready' && status !== 'error' && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl opacity-90 hover:opacity-100">
              <svg className="w-10 h-10 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <p className="text-white mb-2">Erro ao carregar o video</p>
              <button onClick={handlePlay} className="bg-white text-green-600 px-4 py-2 rounded-full font-bold text-sm">
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
