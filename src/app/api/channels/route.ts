import { NextResponse } from 'next/server';

const IPTV_URL = process.env.IPTV_URL || '';

interface Channel {
  name: string;
  url: string;
  category: string;
  quality: string;
}

// Canais fixos sempre disponíveis (mesmo se M3U falhar)
const fixedChannels: Channel[] = [
  // Paramount+
  { name: 'Paramount+ 01', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 02', url: 'http://xigfh01.site:80/031532627/513117897/619.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 03', url: 'http://xigfh01.site:80/031532627/513117897/620.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 04', url: 'http://xigfh01.site:80/031532627/513117897/621.m3u8', category: 'Paramount+', quality: 'HD' },
  // Cazé TV
  { name: 'Cazé TV 01', url: 'http://xigfh01.site:80/031532627/513117897/646.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 02', url: 'http://xigfh01.site:80/031532627/513117897/647.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 03', url: 'http://xigfh01.site:80/031532627/513117897/648.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 04', url: 'http://xigfh01.site:80/031532627/513117897/649.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 05', url: 'http://xigfh01.site:80/031532627/513117897/650.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 06', url: 'http://xigfh01.site:80/031532627/513117897/651.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 07', url: 'http://xigfh01.site:80/031532627/513117897/652.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 08', url: 'http://xigfh01.site:80/031532627/513117897/653.m3u8', category: 'Cazé TV', quality: 'HD' },
  // Amazon Prime Video
  { name: 'Prime Video 01', url: 'http://xigfh01.site:80/031532627/513117897/654.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 02', url: 'http://xigfh01.site:80/031532627/513117897/655.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 03', url: 'http://xigfh01.site:80/031532627/513117897/656.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 04', url: 'http://xigfh01.site:80/031532627/513117897/657.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 05', url: 'http://xigfh01.site:80/031532627/513117897/658.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 06', url: 'http://xigfh01.site:80/031532627/513117897/659.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 07', url: 'http://xigfh01.site:80/031532627/513117897/660.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 08', url: 'http://xigfh01.site:80/031532627/513117897/661.m3u8', category: 'Amazon Prime', quality: 'HD' },
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
      const url = lines[i + 1]?.trim() || '';
      if (!url || (!url.endsWith('.m3u8') && !url.endsWith('.ts'))) continue;

      let quality = 'SD';
      if (name.includes('FHD') || name.includes('4K')) quality = 'FHD';
      else if (name.includes('HD')) quality = 'HD';

      const combined = ((group || '') + ' ' + name).toUpperCase();
      let category = 'Outros';
      if (combined.includes('ESPN')) category = 'ESPN';
      else if (combined.includes('SPORTV')) category = 'SporTV';
      else if (combined.includes('PREMIERE')) category = 'Premiere';
      else if (combined.includes('BAND SPORTS')) category = 'Band Sports';
      else if (combined.includes('COMBATE')) category = 'Combate';
      else if (combined.includes('DAZN')) category = 'DAZN';
      else if (combined.includes('CAZ')) category = 'Cazé TV';
      else if (combined.includes('PARAMOUNT')) category = 'Paramount+';
      else if (combined.includes('PRIME') || combined.includes('AMAZON')) category = 'Amazon Prime';
      else if (combined.includes('FOX')) category = 'Fox Sports';
      else if (group) category = group;

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
  let m3uChannels: Channel[] = [];

  if (IPTV_URL) {
    try {
      const res = await fetch(IPTV_URL, {
        headers: { 'User-Agent': 'VLC/3.0.20' },
        signal: AbortSignal.timeout(60000),
      });
      if (res.ok) {
        const content = await res.text();
        m3uChannels = parseM3U(content);
      }
    } catch { /* continua com fixos */ }
  }

  // Combina: fixos + M3U, sem duplicatas
  const seen = new Set<string>();
  const all: Channel[] = [];

  for (const ch of [...fixedChannels, ...m3uChannels]) {
    const base = ch.name.replace(/ FHD| HD| SD| 4K/g, '').trim();
    if (!seen.has(base)) {
      seen.add(base);
      all.push(ch);
    }
  }

  return NextResponse.json({ channels: all }, {
    headers: { 'Cache-Control': 'public, max-age=300' },
  });
}
