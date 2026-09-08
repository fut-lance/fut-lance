'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

interface PlayerStreamProps {
  url: string;
  titulo: string;
}

export default function PlayerStream({ url, titulo }: PlayerStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    let hls: Hls | null = null;
    setReady(false);
    setError(false);
    setPlaying(false);

    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

    if (url.includes('.m3u8') && Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });
      hls.loadSource(proxyUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setReady(true);
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setError(true);
      });
    } else if (url.includes('.m3u8') && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = proxyUrl;
      video.onloadedmetadata = () => setReady(true);
      video.onerror = () => setError(true);
    } else {
      video.src = url;
      video.onloadeddata = () => setReady(true);
      video.onerror = () => setError(true);
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [url]);

  return (
    <div className="bg-black rounded-lg overflow-hidden relative">
      <div className="bg-fut-accent px-4 py-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        <span className="text-white font-bold text-sm">{titulo}</span>
        {!ready && !error && <span className="text-white/60 text-xs ml-auto">Carregando...</span>}
        {error && <span className="text-red-300 text-xs ml-auto">Erro ao carregar</span>}
      </div>
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black"
          controls={playing}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80"
        />
        {ready && !playing && !error && (
          <button
            onClick={startPlayback}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fut-accent rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
