// Utilidades IPTV — USO EXCLUSIVO SERVER-SIDE (route handlers).
// Nunca importar em Client Components. Credenciais ficam em variáveis de ambiente.

export function getIptvConfig(): { host: string; user: string; pass: string } | null {
  const host = (process.env.IPTV_HOST || '').replace(/\/+$/, '');
  const user = process.env.IPTV_USER || '';
  const pass = process.env.IPTV_PASS || '';
  if (!host || !user || !pass) return null;
  return { host, user, pass };
}

function hostWithScheme(host: string): string {
  return host.startsWith('http://') || host.startsWith('https://') ? host : `http://${host}`;
}

export function buildUpstreamUrl(channelId: string): string | null {
  if (!/^\d{1,6}$/.test(channelId)) return null;
  const cfg = getIptvConfig();
  if (!cfg) return null;
  return `${hostWithScheme(cfg.host)}/${cfg.user}/${cfg.pass}/${channelId}.m3u8`;
}

/** Referência opaca (sem credenciais) usada no frontend. */
export function streamRef(channelId: string): string {
  return `/api/stream?ch=${channelId}`;
}

/** Extrai o ID numérico do canal de uma URL upstream (.../{id}.m3u8). */
export function extractChannelId(upstreamUrl: string): string | null {
  const m = upstreamUrl.match(/\/(\d{1,6})\.m3u8(\?.*)?$/);
  return m ? m[1] : null;
}

/** Permite apenas URLs do host IPTV configurado (http/https). */
export function isAllowedUpstream(url: string): boolean {
  try {
    const cfg = getIptvConfig();
    if (!cfg) return false;
    const u = new URL(url);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    const cfgHost = new URL(hostWithScheme(cfg.host)).hostname.toLowerCase();
    return u.hostname.toLowerCase() === cfgHost;
  } catch {
    return false;
  }
}
