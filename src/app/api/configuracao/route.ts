import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

export async function GET() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/configuracao`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json();

    if (data.data) {
      return NextResponse.json({ transmissoes_ativas: data.data.transmissoes_ativas === true });
    }

    return NextResponse.json({ transmissoes_ativas: true });
  } catch {
    return NextResponse.json({ transmissoes_ativas: true });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${STRAPI_URL}/api/configuracao`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { transmissoes_ativas: body.transmissoes_ativas } }),
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json();

    return NextResponse.json({
      success: true,
      transmissoes_ativas: data.data?.transmissoes_ativas ?? body.transmissoes_ativas,
    });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
