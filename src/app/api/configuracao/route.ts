import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';
const STRAPI_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'rafaelmelegari86@gmail.com';
const STRAPI_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'funil1315rR#$';

export async function GET() {
  try {
    const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: STRAPI_EMAIL, password: STRAPI_PASSWORD }),
      signal: AbortSignal.timeout(20000),
    });
    const loginData = await loginRes.json();
    const token = loginData.data?.token;

    if (!token) {
      return NextResponse.json({ transmissoes_ativas: true, error: 'no token' });
    }

    const res = await fetch(`${STRAPI_URL}/content-manager/single-types/api::configuracao.configuracao?_t=${Date.now()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(20000),
    });
    const data = await res.json();

    if (data.data) {
      return NextResponse.json({ transmissoes_ativas: data.data.transmissoes_ativas === true });
    }

    return NextResponse.json({ transmissoes_ativas: true, error: 'no data', raw: JSON.stringify(data).substring(0, 200) });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ transmissoes_ativas: true, error: msg });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const loginRes = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: STRAPI_EMAIL, password: STRAPI_PASSWORD }),
      signal: AbortSignal.timeout(20000),
    });
    const loginData = await loginRes.json();
    const token = loginData.data?.token;

    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 500 });
    }

    const updateRes = await fetch(`${STRAPI_URL}/content-manager/single-types/api::configuracao.configuracao`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ transmissoes_ativas: body.transmissoes_ativas }),
      signal: AbortSignal.timeout(20000),
    });
    const updateData = await updateRes.json();

    return NextResponse.json({
      success: true,
      transmissoes_ativas: updateData.data?.transmissoes_ativas ?? body.transmissoes_ativas,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
