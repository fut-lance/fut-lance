import { NextResponse } from 'next/server';

const IPTV_URL = process.env.IPTV_URL || '';

interface Channel {
  name: string;
  url: string;
  category: string;
  quality: string;
}

function parseM3U(content: string): Channel[] {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF:')) {
      const nameMatch = line.match(/,(.+)$/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();
      const url = lines[i + 1]?.trim() || '';

      if (!url || seen.has(name)) continue;

      let category = 'Outros';
      let quality = 'SD';

      if (name.includes('FHD') || name.includes('4K')) quality = 'FHD';
      else if (name.includes('HD')) quality = 'HD';

      if (name.includes('ESPN')) category = 'ESPN';
      else if (name.includes('SPORTV') || name.includes('SporTV')) category = 'SporTV';
      else if (name.includes('PREMIERE') || name.includes('Premiere')) category = 'Premiere';
      else if (name.includes('BAND SPORTS') || name.includes('Band Sports')) category = 'Band Sports';
      else if (name.includes('COMBATE') || name.includes('Combate')) category = 'Combate';
      else if (name.includes('DAZN')) category = 'DAZN';
      else if (name.includes('GETV') || name.includes('GE')) category = 'GE';
      else if (name.includes('Globo')) category = 'Globo';

      const isFootball = ['ESPN', 'SporTV', 'Premiere', 'Band Sports', 'Combate', 'DAZN', 'GE'].includes(category);

      if (isFootball) {
        const baseName = name.replace(/ FHD| HD| SD| 4K/g, '').trim();
        if (!seen.has(baseName)) {
          seen.add(baseName);
          channels.push({ name, url, category, quality });
        }
      }
    }
  }

  return channels;
}

export async function GET() {
  if (!IPTV_URL) {
    return NextResponse.json({ error: 'IPTV_URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(IPTV_URL, {
      headers: { 'User-Agent': 'VLC/3.0.20' },
      signal: AbortSignal.timeout(60000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch M3U' }, { status: 502 });
    }

    const content = await res.text();
    const channels = parseM3U(content);

    return NextResponse.json({ channels }, {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Timeout fetching M3U' }, { status: 504 });
  }
}
