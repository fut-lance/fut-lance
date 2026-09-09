import { NextResponse } from 'next/server';

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
  'DAZN',
  'Cazé TV',
  'Paramount+',
  'Amazon Prime',
];

const fixedChannels: Channel[] = [
  { name: 'Band Sports FHD', url: 'http://xigfh01.site:80/031532627/513117897/555.m3u8', category: 'Band Sports', quality: 'FHD' },
  { name: 'Band Sports HD', url: 'http://xigfh01.site:80/031532627/513117897/556.m3u8', category: 'Band Sports', quality: 'HD' },
  { name: 'SporTV FHD', url: 'http://xigfh01.site:80/031532627/513117897/558.m3u8', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV HD', url: 'http://xigfh01.site:80/031532627/513117897/559.m3u8', category: 'SporTV', quality: 'HD' },
  { name: 'SporTV 2 FHD', url: 'http://xigfh01.site:80/031532627/513117897/561.m3u8', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV 2 HD', url: 'http://xigfh01.site:80/031532627/513117897/562.m3u8', category: 'SporTV', quality: 'HD' },
  { name: 'SporTV 3 FHD', url: 'http://xigfh01.site:80/031532627/513117897/564.m3u8', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV 3 HD', url: 'http://xigfh01.site:80/031532627/513117897/565.m3u8', category: 'SporTV', quality: 'HD' },
  { name: 'SporTV 4 FHD', url: 'http://xigfh01.site:80/031532627/513117897/567.m3u8', category: 'SporTV', quality: 'FHD' },
  { name: 'SporTV 4 HD', url: 'http://xigfh01.site:80/031532627/513117897/568.m3u8', category: 'SporTV', quality: 'HD' },
  { name: 'ESPN FHD', url: 'http://xigfh01.site:80/031532627/513117897/570.m3u8', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN HD', url: 'http://xigfh01.site:80/031532627/513117897/571.m3u8', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 2 FHD', url: 'http://xigfh01.site:80/031532627/513117897/573.m3u8', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 2 HD', url: 'http://xigfh01.site:80/031532627/513117897/574.m3u8', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 3 FHD', url: 'http://xigfh01.site:80/031532627/513117897/576.m3u8', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 3 HD', url: 'http://xigfh01.site:80/031532627/513117897/577.m3u8', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 4 FHD', url: 'http://xigfh01.site:80/031532627/513117897/579.m3u8', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 4 HD', url: 'http://xigfh01.site:80/031532627/513117897/580.m3u8', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 5 FHD', url: 'http://xigfh01.site:80/031532627/513117897/582.m3u8', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 5 HD', url: 'http://xigfh01.site:80/031532627/513117897/583.m3u8', category: 'ESPN', quality: 'HD' },
  { name: 'ESPN 6 FHD', url: 'http://xigfh01.site:80/031532627/513117897/585.m3u8', category: 'ESPN', quality: 'FHD' },
  { name: 'ESPN 6 HD', url: 'http://xigfh01.site:80/031532627/513117897/586.m3u8', category: 'ESPN', quality: 'HD' },
  { name: 'Combate FHD', url: 'http://xigfh01.site:80/031532627/513117897/591.m3u8', category: 'Combate', quality: 'FHD' },
  { name: 'Combate HD', url: 'http://xigfh01.site:80/031532627/513117897/592.m3u8', category: 'Combate', quality: 'HD' },
  { name: 'Premiere Clubes FHD', url: 'http://xigfh01.site:80/031532627/513117897/594.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere Clubes HD', url: 'http://xigfh01.site:80/031532627/513117897/595.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 2 FHD', url: 'http://xigfh01.site:80/031532627/513117897/597.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 2 HD', url: 'http://xigfh01.site:80/031532627/513117897/598.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 3 FHD', url: 'http://xigfh01.site:80/031532627/513117897/600.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 3 HD', url: 'http://xigfh01.site:80/031532627/513117897/601.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 4 FHD', url: 'http://xigfh01.site:80/031532627/513117897/603.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 4 HD', url: 'http://xigfh01.site:80/031532627/513117897/604.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 5 FHD', url: 'http://xigfh01.site:80/031532627/513117897/606.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 5 HD', url: 'http://xigfh01.site:80/031532627/513117897/607.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 6 FHD', url: 'http://xigfh01.site:80/031532627/513117897/609.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 6 HD', url: 'http://xigfh01.site:80/031532627/513117897/610.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 7 FHD', url: 'http://xigfh01.site:80/031532627/513117897/612.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 7 HD', url: 'http://xigfh01.site:80/031532627/513117897/613.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Premiere 8 FHD', url: 'http://xigfh01.site:80/031532627/513117897/615.m3u8', category: 'Premiere', quality: 'FHD' },
  { name: 'Premiere 8 HD', url: 'http://xigfh01.site:80/031532627/513117897/616.m3u8', category: 'Premiere', quality: 'HD' },
  { name: 'Paramount+ 01', url: 'http://xigfh01.site:80/031532627/513117897/618.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 02', url: 'http://xigfh01.site:80/031532627/513117897/619.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 03', url: 'http://xigfh01.site:80/031532627/513117897/620.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Paramount+ 04', url: 'http://xigfh01.site:80/031532627/513117897/621.m3u8', category: 'Paramount+', quality: 'HD' },
  { name: 'Cazé TV 01', url: 'http://xigfh01.site:80/031532627/513117897/646.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 02', url: 'http://xigfh01.site:80/031532627/513117897/647.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 03', url: 'http://xigfh01.site:80/031532627/513117897/648.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 04', url: 'http://xigfh01.site:80/031532627/513117897/649.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 05', url: 'http://xigfh01.site:80/031532627/513117897/650.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 06', url: 'http://xigfh01.site:80/031532627/513117897/651.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 07', url: 'http://xigfh01.site:80/031532627/513117897/652.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Cazé TV 08', url: 'http://xigfh01.site:80/031532627/513117897/653.m3u8', category: 'Cazé TV', quality: 'HD' },
  { name: 'Prime Video 01', url: 'http://xigfh01.site:80/031532627/513117897/654.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 02', url: 'http://xigfh01.site:80/031532627/513117897/655.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 03', url: 'http://xigfh01.site:80/031532627/513117897/656.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 04', url: 'http://xigfh01.site:80/031532627/513117897/657.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 05', url: 'http://xigfh01.site:80/031532627/513117897/658.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 06', url: 'http://xigfh01.site:80/031532627/513117897/659.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 07', url: 'http://xigfh01.site:80/031532627/513117897/660.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'Prime Video 08', url: 'http://xigfh01.site:80/031532627/513117897/661.m3u8', category: 'Amazon Prime', quality: 'HD' },
  { name: 'DAZN 01', url: 'http://xigfh01.site:80/031532627/513117897/667.m3u8', category: 'DAZN', quality: 'HD' },
  { name: 'DAZN 02', url: 'http://xigfh01.site:80/031532627/513117897/668.m3u8', category: 'DAZN', quality: 'HD' },
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
      let category = '';
      if (combined.includes('ESPN')) category = 'ESPN';
      else if (combined.includes('SPORTV')) category = 'SporTV';
      else if (combined.includes('PREMIERE')) category = 'Premiere';
      else if (combined.includes('BAND SPORTS')) category = 'Band Sports';
      else if (combined.includes('COMBATE')) category = 'Combate';
      else if (combined.includes('DAZN')) category = 'DAZN';
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

  // Fixos primeiro
  for (const ch of fixedChannels) {
    const base = ch.name.replace(/ FHD| HD| SD| 4K/g, '').trim();
    if (!seen.has(base)) {
      seen.add(base);
      all.push(ch);
    }
  }

  // M3U depois (só categorias permitidas)
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
