import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';
const STRAPI_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'rafaelmelegari86@gmail.com';
const STRAPI_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'funil1315rR#$';

async function strapiRequest(method: string, path: string, body?: object) {
  const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: STRAPI_EMAIL, password: STRAPI_PASSWORD }),
  });
  const loginData = await loginRes.json();
  const token = loginData.data?.token;
  if (!token) throw new Error('No token');

  const opts: RequestInit = {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${STRAPI_URL}${path}?_t=${Date.now()}`, opts);
  return res.json();
}

export async function GET() {
  try {
    const data = await strapiRequest('GET', '/content-manager/single-types/api::configuracao.configuracao');
    const value = data.data?.transmissoes_ativas;
    return NextResponse.json({ transmissoes_ativas: value !== false });
  } catch {
    return NextResponse.json({ transmissoes_ativas: true });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const updateData = await strapiRequest('PUT', '/content-manager/single-types/api::configuracao.configuracao', {
      transmissoes_ativas: body.transmissoes_ativas,
    });

    const newValue = updateData.data?.transmissoes_ativas ?? body.transmissoes_ativas;

    await new Promise(r => setTimeout(r, 2000));

    const verifyData = await strapiRequest('GET', '/content-manager/single-types/api::configuracao.configuracao');
    const verified = verifyData.data?.transmissoes_ativas;

    return NextResponse.json({
      success: true,
      transmissoes_ativas: verified !== undefined ? verified : newValue,
    });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
