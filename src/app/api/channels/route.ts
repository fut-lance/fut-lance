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
      // Extrair grupo (category) do atributo group-title
      const groupMatch = line.match(/group-title="([^"]*)"/i);
      const group = groupMatch ? groupMatch[1].trim() : '';

      // Extrair nome do canal (após a vírgula)
      const nameMatch = line.match(/,(.+)$/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();
      const url = lines[i + 1]?.trim() || '';

      if (!url || (!url.endsWith('.m3u8') && !url.endsWith('.ts'))) continue;

      let quality = 'SD';
      if (name.includes('FHD') || name.includes('4K')) quality = 'FHD';
      else if (name.includes('HD')) quality = 'HD';

      // Detectar categoria: primeiro pelo group-title, depois pelo nome
      let category = 'Outros';

      const groupUpper = group.toUpperCase();
      const nameUpper = name.toUpperCase();
      const combined = (groupUpper + ' ' + nameUpper);

      if (combined.includes('ESPN')) category = 'ESPN';
      else if (combined.includes('SPORTV') || combined.includes('SPORT TV')) category = 'SporTV';
      else if (combined.includes('PREMIERE')) category = 'Premiere';
      else if (combined.includes('BAND SPORTS') || (combined.includes('BAND') && combined.includes('SPORTS'))) category = 'Band Sports';
      else if (combined.includes('COMBATE')) category = 'Combate';
      else if (combined.includes('DAZN')) category = 'DAZN';
      else if (combined.includes('CAZ') || combined.includes('CAZÉ')) category = 'Cazé TV';
      else if (combined.includes('PARAMOUNT')) category = 'Paramount+';
      else if (combined.includes('PRIME') || combined.includes('AMAZON')) category = 'Amazon Prime';
      else if (combined.includes('FOX')) category = 'Fox Sports';
      else if (combined.includes('GLOBO')) category = 'Globo';
      else if (combined.includes('SBT')) category = 'SBT';
      else if (combined.includes('RECORD')) category = 'Record';
      else if (combined.includes('BAND')) category = 'Band';
      else if (groupUpper) category = group;

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
