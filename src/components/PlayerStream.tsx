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
  const [error, setError] = useState(false);
  const [showPlay, setShowPlay] = useState(true);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setShowPlay(false)).catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    if (hlsRef.current) hlsRef.current.destroy();
    setError(false);
    setShowPlay(true);

    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

    if (url.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });
      hlsRef.current = hls;
      hls.loadSource(proxyUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setError(true);
      });
    } else if (url.includes('.m3u8') && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = proxyUrl;
      video.onerror = () => setError(true);
    } else {
      video.src = url;
      video.onerror = () => setError(true);
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [url]);

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="bg-fut-accent px-4 py-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        <span className="text-white font-bold text-sm">{titulo}</span>
        {error && <span className="text-red-300 text-xs ml-auto">Erro ao carregar</span>}
      </div>
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black"
          controls
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80"
        />
        {showPlay && !error && (
          <button
            onClick={startPlayback}
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            style={{ zIndex: 5 }}
          >
            <div className="w-20 h-20 bg-fut-accent rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
