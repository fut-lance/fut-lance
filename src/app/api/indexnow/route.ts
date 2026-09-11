import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'futlance2024';
const SEARCH_ENGINES = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const payload = {
      host: 'fut-lance.vercel.app',
      key: INDEXNOW_KEY,
      keyLocation: `https://fut-lance.vercel.app/${INDEXNOW_KEY}.txt`,
      urlList: [url],
    };

    const results = await Promise.allSettled(
      SEARCH_ENGINES.map(async (engine) => {
        const response = await fetch(engine, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        });
        return { engine, status: response.status };
      })
    );

    return NextResponse.json({ success: true, results });
  } catch {
    return NextResponse.json({ error: 'Failed to ping IndexNow' }, { status: 500 });
  }
}
