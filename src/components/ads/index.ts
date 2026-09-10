/**
 * ADCASH - Componentes de Anúncios
 *
 * Este diretório contém os componentes preparados para integração com o Adcash.
 *
 * IMPORTANTE:
 * - NÃO inserir código inventado ou falso
 * - NÃO ativar anúncios antes de receber o código oficial do Adcash
 * - Aguardar aprovação do domínio antes de implementar
 *
 * Como usar:
 * 1. Após aprovação, insira o script do Adcash no layout.tsx
 * 2. Substitua os placeholders nos componentes AdBanner e AdSlot
 * 3. Use AdContainer nas páginas para posicionar os anúncios
 *
 * Exemplo de inserção no layout.tsx (após receber código):
 * ```tsx
 * <Script
 *   id="adcash-script"
 *   strategy="afterInteractive"
 *   src="https://www.adcash.com/script/YOUR_SCRIPT_ID.js"
 * />
 * ```
 *
 * Posições planejadas:
 * - header: Abaixo do cabeçalho (728x90)
 * - content: Entre blocos de notícias (728x90)
 * - sidebar: Lateral (300x250)
 * - in-article: Dentro da notícia (728x90)
 * - footer: Antes do rodapé (728x90)
 */

export { default as AdBanner } from './AdBanner';
export { default as AdSlot } from './AdSlot';
export { default as AdContainer } from './AdContainer';
