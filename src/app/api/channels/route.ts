import { NextResponse } from 'next/server';
import { extractChannelId, streamRef } from '@/lib/iptv';

const IPTV_URL = process.env.IPTV_URL || '';

interface Channel {
  name: string;
  url: string;
  category: string;
  quality: string;
}

const ALLOWED_CATEGORIES = [
  'ESPN',
  'SporTV',
  'Premiere',
  'Band Sports',
  'Combate',
  'GE TV',
  'Cazé TV',
  'Paramount+',
  'Amazon Prime',
];

const fixedChannels: Channel[] = [
  { name: 'Band Sports FHD', url: '/api/stream?ch=555', category: 'Band Sports', quality: 'FHD' },
  { name: 'Band Sports HD', url: '/api/stream?ch=556', category: 'Band Sports', quality: 'HD' },
  { name: 'SporTV FHD', url: '/api/stream?ch=558', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV HD', url: '/api/stream?ch=559', category: 'SporTV', quality: 'HD' },
  { name: 'SporTV 2 FHD', url: '/api/stream?ch=561', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV 2 HD', url: '/api/stream?ch=562', category: 'SporTV', quality: 'HD' },
  { name: 'SporTV 3 FHD', url: '/api/stream?ch=564', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV 3 HD', url: '/api/stream?ch=565', category: 'SporTV', quality: 'HD' },
  { name: 'SporTV 4 FHD', url: '/api/stream?ch=567', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV 4 HD', url: '/api/stream?ch=568', category: 'SporTV', quality: 'HD' },
  { name: 'ESPN FHD', url: '/api/stream?ch=570', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN HD', url: '/api/stream?ch=571', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 2 FHD', url: '/api/stream?ch=573', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 2 HD', url: '/api/stream?ch=574', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 3 FHD', url: '/api/stream?ch=576', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 3 HD', url: '/api/stream?ch=577', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 4 FHD', url: '/api/stream?ch=579', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 4 HD', url: '/api/stream?ch=580', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 5 FHD', url: '/api/stream?ch=582', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 5 HD', url: '/api/stream?ch=583', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 6 FHD', url: '/api/stream?ch=585', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 6 HD', url: '/api/stream?ch=586', category: 'ESPN', quality: 'HD' },
  { name: 'Combate FHD', url: '/api/stream?ch=591', category: 'Combate', quality: 'FHD' },
  { name: 'Combate HD', url: '/api/stream?ch=592', category: 'Combate', quality: 'HD' },
  { name: 'Premiere Clubes FHD', url: '/api/stream?ch=594', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere Clubes HD', url: '/api/stream?ch=595', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 2 FHD', url: '/api/stream?ch=597', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 2 HD', url: '/api/stream?ch=598', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 3 FHD', url: '/api/stream?ch=600', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 3 HD', url: '/api/stream?ch=601', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 4 FHD', url: '/api/stream?ch=603', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 4 HD', url: '/api/stream?ch=604', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 5 FHD', url: '/api/stream?ch=606', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 5 HD', url: '/api/stream?ch=607', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 6 FHD', url: '/api/stream?ch=609', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 6 HD', url: '/api/stream?ch=610', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 7 FHD', url: '/api/stream?ch=612', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 7 HD', url: '/api/stream?ch=613', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 8 FHD', url: '/api/stream?ch=615', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 8 HD', url: '/api/stream?ch=616', category: 'Premiere', quality: 'HD' },
  { name: 'GE TV FHD', url: '/api/stream?ch=588', category: 'GE TV', quality: 'FHD' },
  { name: 'GE TV HD', url: '/api/stream?ch=589', category: 'GE TV', quality: 'HD' },
  { name: 'Paramount+ 01', url: '/api/stream?ch=618', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 02', url: '/api/stream?ch=619', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 03', url: '/api/stream?ch=620', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 04', url: '/api/stream?ch=621', category: 'Paramount+', quality: 'HD' },
  { name: 'Cazé TV 01', url: '/api/stream?ch=646', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 02', url: '/api/stream?ch=647', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 03', url: '/api/stream?ch=648', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 04', url: '/api/stream?ch=649', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 05', url: '/api/stream?ch=650', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 06', url: '/api/stream?ch=651', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 07', url: '/api/stream?ch=652', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 08', url: '/api/stream?ch=653', category: 'Cazé TV', quality: 'HD' },
  { name: 'Prime Video 01', url: '/api/stream?ch=654', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 02', url: '/api/stream?ch=655', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 03', url: '/api/stream?ch=656', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 04', url: '/api/stream?ch=657', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 05', url: '/api/stream?ch=658', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 06', url: '/api/stream?ch=659', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 07', url: '/api/stream?ch=660', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 08', url: '/api/stream?ch=661', category: 'Amazon Prime', quality: 'HD' },
];

function parseM3U(content: string): Channel[] {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF:')) {
      const groupMatch = line.match(/group-title="([^"]*)"/i);
      const group = groupMatch ? groupMatch[1].trim() : '';
      const nameMatch = line.match(/,(.+)$/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();
      const rawUrl = lines[i + 1]?.trim() || '';
      if (!rawUrl || (!rawUrl.endsWith('.m3u8') && !rawUrl.endsWith('.ts'))) continue;
      // Nunca expor a URL upstream (contém credenciais): usa referência opaca
      const channelId = extractChannelId(rawUrl);
      if (!channelId) continue;
      const url = streamRef(channelId);

      let quality = 'SD';
      if (name.includes('FHD') || name.includes('4K')) quality = 'FHD';
      else if (name.includes('HD')) quality = 'HD';

      const combined = ((group || '') + ' ' + name).toUpperCase();
      let category = '';
      if (combined.includes('ESPN')) category = 'ESPN';
      else if (combined.includes('SPORTV')) category = 'SporTV';
      else if (combined.includes('PREMIERE')) category = 'Premiere';
      else if (combined.includes('BAND SPORTS')) category = 'Band Sports';
      else if (combined.includes('COMBATE')) category = 'Combate';
      else if (combined.includes('GETV') || combined.includes('GE TV')) category = 'GE TV';
      else if (combined.includes('CAZ')) category = 'Cazé TV';
      else if (combined.includes('PARAMOUNT')) category = 'Paramount+';
      else if (combined.includes('PRIME') || combined.includes('AMAZON')) category = 'Amazon Prime';

      if (!category || !ALLOWED_CATEGORIES.includes(category)) continue;

      const baseName = name.replace(/ FHD| HD| SD| 4K/g, '').trim();
      if (seen.has(baseName)) continue;
      seen.add(baseName);
      channels.push({ name, url, category, quality });
    }
  }
  return channels;
}

export const runtime = 'nodejs';

export async function GET() {
  const seen = new Set<string>();
  const all: Channel[] = [];

  for (const ch of fixedChannels) {
    const base = ch.name.replace(/ FHD| HD| SD| 4K/g, '').trim();
    if (!seen.has(base)) {
      seen.add(base);
      all.push(ch);
    }
  }

  if (IPTV_URL) {
    try {
      const res = await fetch(IPTV_URL, {
        headers: { 'User-Agent': 'VLC/3.0.20' },
        signal: AbortSignal.timeout(60000),
      });
      if (res.ok) {
        const content = await res.text();
        const m3uChannels = parseM3U(content);
        for (const ch of m3uChannels) {
          const base = ch.name.replace(/ FHD| HD| SD| 4K/g, '').trim();
          if (!seen.has(base)) {
            seen.add(base);
            all.push(ch);
          }
        }
      }
    } catch { /* fixos já estão */ }
  }

  return NextResponse.json({ channels: all }, {
    headers: { 'Cache-Control': 'public, max-age=300' },
  });
}
