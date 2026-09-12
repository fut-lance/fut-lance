import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/categoria/')) {
    const slug = pathname.replace('/categoria/', '');
    const normalized = normalizeSlug(slug);
    if (slug !== normalized) {
      return NextResponse.redirect(new URL(`/categoria/${normalized}`, request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');
  return response;
}

export const config = {
  matcher: ['/categoria/:path*', '/campeonatos/:path*', '/ao-vivo/:path*'],
};
