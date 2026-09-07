'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface PlayerStreamProps {
  url: string;
  titulo: string;
}

export default function PlayerStream({ url, titulo }: PlayerStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (url.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setError('Erro ao carregar stream. Verifique o link.');
          setLoading(false);
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        setLoading(false);
        video.play().catch(() => {});
      });
    } else {
      setError('Seu navegador não suporta transmissões ao vivo.');
      setLoading(false);
    }
  }, [url]);

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-fut-dark">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-fut-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Carregando transmissão...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-fut-dark">
            <div className="text-center text-red-500">
              <p className="text-4xl mb-2">⚠️</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          playsInline
        />
      </div>

      <div className="p-4 bg-fut-darker">
        <h3 className="text-white font-bold text-lg">{titulo}</h3>
      </div>
    </div>
  );
}
