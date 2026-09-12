import { MetadataRoute } from 'next';
import { matches } from '@/data/matches';
import { getAllCampeonatos } from '@/data/campeonatos';
import { getAllTimes } from '@/data/times';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://fut-lance-cms-v2.onrender.com';

async function fetchNoticias() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/noticias?fields=slug,updatedAt,data_publicacao&pagination[pageSize]=100`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function fetchCategorias() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/categorias?fields=slug,updatedAt&pagination[pageSize]=100`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noticias = await fetchNoticias();
  const categorias = await fetchCategorias();
  const campeonatos = getAllCampeonatos();
  const times = getAllTimes();

  const staticPages = [
    { url: 'https://fut-lance.vercel.app', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: 'https://fut-lance.vercel.app/noticias', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://fut-lance.vercel.app/ao-vivo', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://fut-lance.vercel.app/onde-assistir', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://fut-lance.vercel.app/sobre', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: 'https://fut-lance.vercel.app/contato', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: 'https://fut-lance.vercel.app/politica-de-privacidade', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: 'https://fut-lance.vercel.app/politica-de-cookies', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: 'https://fut-lance.vercel.app/termos-de-uso', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const noticiasPages = noticias.map((n: { slug: string; updatedAt?: string; data_publicacao?: string }) => ({
    url: `https://fut-lance.vercel.app/noticias/${n.slug}`,
    lastModified: n.updatedAt ? new Date(n.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const categoriasPages = categorias.map((c: { slug: string; updatedAt?: string }) => ({
    url: `https://fut-lance.vercel.app/categoria/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const campeonatosPages = campeonatos.map((c) => ({
    url: `https://fut-lance.vercel.app/campeonatos/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const timesPages = times.map((t) => ({
    url: `https://fut-lance.vercel.app/times/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const jogoPages = matches.map((match) => ({
    url: `https://fut-lance.vercel.app/ao-vivo/${match.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoriasPages, ...campeonatosPages, ...timesPages, ...noticiasPages, ...jogoPages];
}
