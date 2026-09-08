'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface PlayerStreamProps {
  url: string;
  titulo: string;
}

export default function PlayerStream({ url, titulo }: PlayerStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    let hls: Hls | null = null;
    setReady(false);
    setError(false);

    if (url.includes('.m3u8') && Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setReady(true);
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, () => {
        setError(true);
      });
    } else if (url.includes('.m3u8') && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.onloadedmetadata = () => {
        setReady(true);
        video.play().catch(() => {});
      };
    } else {
      video.src = url;
      video.onloadeddata = () => {
        setReady(true);
        video.play().catch(() => {});
      };
      video.onerror = () => {
        setError(true);
      };
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [url]);

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="bg-fut-accent px-4 py-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        <span className="text-white font-bold text-sm">{titulo}</span>
        {!ready && !error && <span className="text-white/60 text-xs ml-auto">Carregando...</span>}
        {error && <span className="text-red-300 text-xs ml-auto">Erro ao carregar</span>}
      </div>
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        controls
        playsInline
        poster="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80"
      />
    </div>
  );
}
