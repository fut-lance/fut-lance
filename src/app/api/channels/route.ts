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

      if (!url || (!url.endsWith('.m3u8') && !url.endsWith('.ts'))) continue;

      let quality = 'SD';
      if (name.includes('FHD') || name.includes('4K')) quality = 'FHD';
      else if (name.includes('HD')) quality = 'HD';

      const nameUpper = name.toUpperCase();

      // Detectar categoria por nome do canal
      let category = 'Outros';

      if (nameUpper.includes('ESPN')) category = 'ESPN';
      else if (nameUpper.includes('SPORTV') || nameUpper.includes('SPORT TV')) category = 'SporTV';
      else if (nameUpper.includes('PREMIERE')) category = 'Premiere';
      else if (nameUpper.includes('BAND SPORTS') || nameUpper.includes('BAND')) category = 'Band Sports';
      else if (nameUpper.includes('COMBATE')) category = 'Combate';
      else if (nameUpper.includes('DAZN')) category = 'DAZN';
      else if (nameUpper.includes('GETV') || nameUpper.includes('GE ')) category = 'GE';
      else if (nameUpper.includes('CAZE') || nameUpper.includes('CAZÉ')) category = 'Cazé TV';
      else if (nameUpper.includes('PARAMOUNT')) category = 'Paramount+';
      else if (nameUpper.includes('AMAZON')) category = 'Amazon Prime';
      else if (nameUpper.includes('FOX SPORTS') || nameUpper.includes('FOX ')) category = 'Fox Sports';
      else if (nameUpper.includes('CANAL FUTEBOL')) category = 'Canal Futebol';
      else if (nameUpper.includes('GLOBE')) category = 'Globo';
      else if (nameUpper.includes('SBT')) category = 'SBT';
      else if (nameUpper.includes('RECORD')) category = 'Record';
      else if (nameUpper.includes('BAND')) category = 'Band';

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
  if (!IPTV_URL) {
    return NextResponse.json({ channels: [], error: 'IPTV_URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(IPTV_URL, {
      headers: { 'User-Agent': 'VLC/3.0.20' },
      signal: AbortSignal.timeout(60000),
    });

    if (!res.ok) {
      return NextResponse.json({ channels: [], error: 'Failed to fetch M3U' }, { status: 502 });
    }

    const content = await res.text();
    const channels = parseM3U(content);

    return NextResponse.json({ channels }, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  } catch {
    return NextResponse.json({ channels: [], error: 'Timeout fetching M3U' }, { status: 504 });
  }
}
