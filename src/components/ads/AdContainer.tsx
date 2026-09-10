'use client';

import { ReactNode } from 'react';
import AdBanner from './AdBanner';
import AdSlot from './AdSlot';

interface AdContainerProps {
  /** Posição do anúncio */
  position: 'header' | 'content' | 'sidebar' | 'footer' | 'in-article';
  /** Tipo de anúncio */
  type?: 'banner' | 'slot';
  /** Slot ID para o Adcash (quando type='slot') */
  slotId?: string;
  /** Tamanho do slot (quando type='slot') */
  slotSize?: 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile-banner' | 'custom';
  /** Filhos para envolver (quando type='in-article') */
  children?: ReactNode;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * AdContainer - Wrapper principal para anúncios
 *
 * ADCASH: Este componente gerencia a exibição de anúncios em diferentes posições.
 * O código oficial do Adcash deve ser inserido nos componentes AdBanner e AdSlot.
 *
 * Uso:
 * <AdContainer position="header" />                    -> Banner leaderboard
 * <AdContainer position="sidebar" type="slot" />       -> Slot retângulo lateral
 * <AdContainer position="in-article">{children}</AdContainer> -> Conteúdo com anúncio entre
 */
export default function AdContainer({
  position,
  type = 'banner',
  slotId,
  slotSize = 'rectangle',
  children,
  className = '',
}: AdContainerProps) {
  if (position === 'in-article' && children) {
    return (
      <div className={`ad-in-article my-6 ${className}`}>
        <div className="border-t border-gray-800/50 pt-6">
          {children}
        </div>
        <div className="mt-6 flex justify-center">
          <AdSlot size="leaderboard" slotId={slotId} />
        </div>
      </div>
    );
  }

  if (type === 'slot') {
    return (
      <div className={`ad-container ad-container--${position} my-4 ${className}`}>
        <AdSlot
          size={slotSize}
          slotId={slotId}
        />
      </div>
    );
  }

  return (
    <div className={`ad-container ad-container--${position} my-4 ${className}`}>
      <AdBanner position={position as 'header' | 'content' | 'sidebar' | 'footer'} />
    </div>
  );
}
