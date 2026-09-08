import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'VLC/3.0.20' },
      signal: AbortSignal.timeout(20000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
    }

    if (url.includes('.m3u8')) {
      const text = await upstream.text();
      const urlObj = new URL(url);
      const origin = urlObj.origin;
      const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);

      const rewritten = text.replace(/^(?!#)(.+)$/gm, (match) => {
        let absolute: string;
        if (match.startsWith('http')) {
          absolute = match;
        } else if (match.startsWith('/')) {
          absolute = origin + match;
        } else {
          absolute = baseUrl + match;
        }

        const path = new URL(absolute).pathname + new URL(absolute).search;
        return `/stream${path}`;
      });

      return new NextResponse(rewritten, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=2',
        },
      });
    }

    return new NextResponse(upstream.body, {
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=2',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Proxy error' }, { status: 504 });
  }
}
