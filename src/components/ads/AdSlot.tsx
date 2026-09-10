'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  /** ID do slot de anúncio (fornecido pelo Adcash) */
  slotId?: string;
  /** Tamanho do anúncio */
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile-banner' | 'custom';
  /** Largura personalizada (quando size='custom') */
  width?: number;
  /** Altura personalizada (quando size='custom') */
  height?: number;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * AdSlot - Componente para slot de anúncio flexível
 *
 * ADCASH: Inserir aqui o código oficial fornecido pelo Adcash após aprovação.
 * Este componente é um placeholder que será preenchido com o código real do Adcash.
 *
 * Tamanhos suportados:
 * - leaderboard: 728x90
 * - rectangle: 300x250
 * - skyscraper: 160x600
 * - mobile-banner: 320x50
 * - custom: tamanho personalizado via width/height
 */
export default function AdSlot({
  slotId,
  size,
  width,
  height,
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ADCASH: Inserir aqui o código de inicialização do Adcash após aprovação.
    // Exemplo (NÃO inserir até receber código oficial):
    // if (typeof window !== 'undefined' && window.adcash) {
    //   window.adcash.push({ slot: slotId || 'default', format: size });
    // }
  }, [slotId, size]);

  const sizeMap: Record<string, { w: number; h: number }> = {
    leaderboard: { w: 728, h: 90 },
    rectangle: { w: 300, h: 250 },
    skyscraper: { w: 160, h: 600 },
    'mobile-banner': { w: 320, h: 50 },
    custom: { w: width || 300, h: height || 250 },
  };

  const dims = sizeMap[size] || sizeMap.rectangle;

  return (
    <div
      ref={adRef}
      className={`ad-slot ad-slot--${size} flex items-center justify-center bg-fut-darker/30 border border-gray-800/30 rounded-lg overflow-hidden ${className}`}
      style={{
        width: dims.w,
        height: dims.h,
        maxWidth: '100%',
      }}
      data-ad-slot={slotId}
      data-ad-size={size}
      role="complementary"
      aria-label="Espaço publicitário"
    >
      {/* Placeholder visual - será substituído pelo código Adcash */}
      <div className="flex flex-col items-center gap-1 text-gray-600 text-[10px] select-none">
        <span className="text-sm opacity-40">📢</span>
        <span className="opacity-40">Anúncio</span>
      </div>
    </div>
  );
}
