import { MetadataRoute } from 'next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

async function fetchRecentNoticias() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/noticias?fields=slug,titulo,data_publicacao,updatedAt&sort[0]=data_publicacao:desc&sort[1]=id:desc&pagination[pageSize]=48`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function GET(): Promise<Response> {
  const noticias = await fetchRecentNoticias();
  const now = Date.now();
  const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

  const urls = noticias
    .filter((n: { slug?: string; data_publicacao?: string }) => {
      if (!n.slug || !n.data_publicacao) return false;
      // Somente notícias publicadas nas últimas 48h (data real do Strapi)
      const publishedAt = new Date(n.data_publicacao).getTime();
      if (Number.isNaN(publishedAt)) return false;
      return publishedAt <= now && now - publishedAt <= FORTY_EIGHT_HOURS_MS;
    })
    .map((n: { slug: string; data_publicacao?: string }) => {
      // lastmod = data de publicação (referência temporal real)
      const lastmod = n.data_publicacao || new Date().toISOString();
      return (
        `  <url>\n` +
        `    <loc>https://fut-lance.vercel.app/noticias/${n.slug}</loc>\n` +
        `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n` +
        `  </url>`
      );
    })
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
