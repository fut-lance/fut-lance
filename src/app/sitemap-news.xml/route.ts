import { MetadataRoute } from 'next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

async function fetchRecentNoticias() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/noticias?fields=slug,titulo,data_publicacao,updatedAt&sort=data_publicacao:desc&pagination[pageSize]=48`,
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

  const urls = noticias
    .filter((n: { slug?: string }) => n.slug)
    .map((n: { slug: string; data_publicacao?: string; updatedAt?: string }) => {
      const lastmod = n.updatedAt || n.data_publicacao || new Date().toISOString();
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
