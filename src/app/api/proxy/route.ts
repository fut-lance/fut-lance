import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VLC/3.0.20' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const body = await res.arrayBuffer();

    if (url.endsWith('.m3u8')) {
      let text = new TextDecoder().decode(body);
      const base = url.substring(0, url.lastIndexOf('/') + 1);
      text = text.replace(/(^(?!#).+\.m3u8.*$)/gm, (match) => {
        const absolute = match.startsWith('http') ? match : base + match;
        return `/api/proxy?url=${encodeURIComponent(absolute)}`;
      });
      text = text.replace(/(^(?!#).+\.ts.*$)/gm, (match) => {
        const absolute = match.startsWith('http') ? match : base + match;
        return `/api/proxy?url=${encodeURIComponent(absolute)}`;
      });
      return new NextResponse(text, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=2',
        },
      });
    }

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy timeout' }, { status: 504 });
  }
}
