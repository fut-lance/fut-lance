import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';
const STRAPI_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'rafaelmelegari86@gmail.com';
const STRAPI_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'funil1315rR#$';

async function getAdminToken() {
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: STRAPI_EMAIL, password: STRAPI_PASSWORD }),
  });
  const data = await res.json();
  return data.data?.token;
}

export async function GET() {
  try {
    const token = await getAdminToken();
    if (!token) return NextResponse.json({ transmissoes_ativas: true });

    const res = await fetch(`${STRAPI_URL}/content-manager/single-types/api::configuracao.configuracao`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const data = await res.json();

    if (data.data) {
      return NextResponse.json({ transmissoes_ativas: data.data.transmissoes_ativas !== false });
    }
    return NextResponse.json({ transmissoes_ativas: true });
  } catch {
    return NextResponse.json({ transmissoes_ativas: true });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const token = await getAdminToken();
    if (!token) return NextResponse.json({ error: 'Auth failed' }, { status: 500 });

    const updateRes = await fetch(`${STRAPI_URL}/content-manager/single-types/api::configuracao.configuracao`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transmissoes_ativas: body.transmissoes_ativas }),
    });
    const updateData = await updateRes.json();

    return NextResponse.json({
      success: true,
      transmissoes_ativas: updateData.data?.transmissoes_ativas ?? body.transmissoes_ativas,
    });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
