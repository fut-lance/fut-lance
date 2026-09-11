import { MetadataRoute } from 'next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

async function fetchRecentNoticias() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/noticias?fields=slug,titulo,data_publicacao,updatedAt&sort=data_publicacao:desc&pagination[pageSize]=48`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function sitemapNews(): Promise<MetadataRoute.Sitemap> {
  const noticias = await fetchRecentNoticias();

  return noticias.map((n: { slug: string; titulo: string; data_publicacao?: string; updatedAt?: string }) => ({
    url: `https://fut-lance.vercel.app/noticias/${n.slug}`,
    lastModified: n.updatedAt ? new Date(n.updatedAt) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
}
