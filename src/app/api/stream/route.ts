import { NextRequest, NextResponse } from 'next/server';
import { buildUpstreamUrl, isAllowedUpstream } from '@/lib/iptv';

/**
 * GET /api/stream?ch=<id> — playlist do canal (credenciais aplicadas server-side).
 * GET /api/stream?ch=<id>&s=<url> — segmento/playlist aninhada (allowlist do host IPTV).
 * O navegador recebe apenas referências opacas, nunca as credenciais.
 */

function rewritePlaylist(text: string, channelId: string): string {
  return text.replace(/^(?!#)(.+)$/gm, (match) => {
    const line = match.trim();
    if (!line) return match;
    let absolute = line;
    if (!line.startsWith('http')) {
      // Relativo: resolve contra a playlist do canal
      const base = buildUpstreamUrl(channelId);
      if (!base) return match;
      try {
        absolute = new URL(line, base).toString();
      } catch {
        return match;
      }
    }
    if (!isAllowedUpstream(absolute)) return match;
    return `/api/stream?ch=${channelId}&s=${encodeURIComponent(absolute)}`;
  });
}

async function fetchUpstream(url: string): Promise<Response> {
  return fetch(url, {
    headers: { 'User-Agent': 'VLC/3.0.20' },
    signal: AbortSignal.timeout(20000),
  });
}

export async function GET(request: NextRequest) {
  const ch = request.nextUrl.searchParams.get('ch') || '';
  const s = request.nextUrl.searchParams.get('s');

  if (!/^\d{1,6}$/.test(ch)) {
    return NextResponse.json({ error: 'Canal inválido.' }, { status: 400 });
  }

  try {
    if (s) {
      if (!isAllowedUpstream(s)) {
        return NextResponse.json({ error: 'Origem não permitida.' }, { status: 403 });
      }
      const upstream = await fetchUpstream(s);
      if (!upstream.ok) {
        return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
      }
      const contentType = upstream.headers.get('content-type') || '';
      if (s.includes('.m3u8') || contentType.includes('mpegurl')) {
        const text = await upstream.text();
        return new NextResponse(rewritePlaylist(text, ch), {
          headers: {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=2',
          },
        });
      }
      return new NextResponse(upstream.body, {
        headers: {
          'Content-Type': contentType || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=2',
        },
      });
    }

    const upstreamUrl = buildUpstreamUrl(ch);
    if (!upstreamUrl) {
      return NextResponse.json({ error: 'Transmissão indisponível.' }, { status: 503 });
    }
    const upstream = await fetchUpstream(upstreamUrl);
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
    }
    const text = await upstream.text();
    return new NextResponse(rewritePlaylist(text, ch), {
      headers: {
        'Content-Type': 'application/vnd.apple.mpegurl',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=2',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Proxy error' }, { status: 504 });
  }
}
