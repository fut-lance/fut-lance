import { MetadataRoute } from 'next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

async function fetchRecentNoticias() {
  try {
    const all: any[] = [];
    let page = 1;
    // Percorre páginas para não perder notícias recentes (teto de 100 por página).
    for (;;) {
      const res = await fetch(
        `${STRAPI_URL}/api/noticias?fields=slug,titulo,data_publicacao,updatedAt&sort[0]=data_publicacao:desc&sort[1]=id:desc&pagination[page]=${page}&pagination[pageSize]=100`,
        { next: { revalidate: 3600 } }
      );
      const data = await res.json();
      const items = data.data || [];
      all.push(...items);
      const pagination = data.meta?.pagination;
      if (!pagination || page >= (pagination.pageCount || 1) || items.length === 0) break;
      page += 1;
      if (page > 5) break;
    }
    return all;
  } catch {
    return [];
  }
}

function escapeXml(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<Response> {
  const noticias = await fetchRecentNoticias();
  const now = Date.now();
  const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

  const urls = noticias
    .filter((n: { slug?: string; data_publicacao?: string }) => {
      if (!n.slug || !n.data_publicacao) return false;
      // Google Notícias: somente últimas 48h.
      const publishedAt = new Date(n.data_publicacao).getTime();
      if (Number.isNaN(publishedAt)) return false;
      return publishedAt <= now && now - publishedAt <= FORTY_EIGHT_HOURS_MS;
    })
    .map((n: { slug: string; titulo?: string; data_publicacao?: string }) => {
      const lastmod = n.data_publicacao || new Date().toISOString();
      return (
        `  <url>\n` +
        `    <loc>https://fut-lance.vercel.app/noticias/${n.slug}</loc>\n` +
        `    <news:news>\n` +
        `      <news:publication>\n` +
        `        <news:name>FUT LANCE</news:name>\n` +
        `        <news:language>pt</news:language>\n` +
        `      </news:publication>\n` +
        `      <news:publication_date>${new Date(lastmod).toISOString()}</news:publication_date>\n` +
        `      <news:title>${escapeXml(n.titulo || n.slug)}</news:title>\n` +
        `    </news:news>\n` +
        `  </url>`
      );
    })
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n` +
    `${urls}\n` +
    `</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
