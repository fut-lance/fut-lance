import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminConfigured,
  verifyPassword,
  verifySessionToken,
} from '@/lib/admin-auth';

export async function GET() {
  const store = cookies();
  const authenticated = verifySessionToken(store.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ authenticated, configured: isAdminConfigured() });
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: 'Login indisponível (configuração pendente).' },
      { status: 503 }
    );
  }

  let senha = '';
  try {
    const body = await request.json();
    senha = typeof body?.senha === 'string' ? body.senha : '';
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  if (!verifyPassword(senha)) {
    return NextResponse.json({ error: 'Senha incorreta!' }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: 'Login indisponível (configuração pendente).' },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
