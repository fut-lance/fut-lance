'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  /** Posição do anúncio no layout */
  position: 'header' | 'content' | 'sidebar' | 'footer';
  /** Largura personalizada (opcional) */
  width?: string;
  /** Altura personalizada (opcional) */
  height?: string;
  /** Classe CSS adicional (opcional) */
  className?: string;
}

/**
 * AdBanner - Componente para exibição de anúncios leaderboard/banner
 *
 * ADCASH: Inserir aqui o código oficial fornecido pelo Adcash após aprovação.
 * Este componente é um placeholder que será preenchido com o código real do Adcash.
 *
 * Posições suportadas:
 * - header: Abaixo do cabeçalho (728x90 ou responsivo)
 * - content: Entre blocos de conteúdo (728x90 ou responsivo)
 * - sidebar: Lateral do site (300x250)
 * - footer: Antes do rodapé (728x90 ou responsivo)
 */
export default function AdBanner({ position, width, height, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ADCASH: Inserir aqui o código de inicialização do Adcash após aprovação.
    // Exemplo (NÃO inserir até receber código oficial):
    // if (typeof window !== 'undefined' && window.adcash) {
    //   window.adcash.push({ slot: 'banner-header', format: 'banner' });
    // }
  }, []);

  const sizeMap: Record<string, { w: string; h: string }> = {
    header: { w: '728px', h: '90px' },
    content: { w: '728px', h: '90px' },
    sidebar: { w: '300px', h: '250px' },
    footer: { w: '728px', h: '90px' },
  };

  const size = sizeMap[position] || sizeMap.content;

  return (
    <div
      ref={adRef}
      className={`ad-banner ad-banner--${position} flex items-center justify-center bg-fut-darker/50 border border-gray-800/50 rounded-lg overflow-hidden ${className}`}
      style={{
        width: width || size.w,
        height: height || size.h,
        maxWidth: '100%',
      }}
      data-ad-position={position}
      role="complementary"
      aria-label="Espaço publicitário"
    >
      {/* Placeholder visual - será substituído pelo código Adcash */}
      <div className="flex flex-col items-center gap-1 text-gray-600 text-xs select-none">
        <span className="text-lg opacity-50">📢</span>
        <span className="opacity-50">Publicidade</span>
      </div>
    </div>
  );
}
