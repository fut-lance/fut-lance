const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface FetchOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function getNoticias(page = 1, pageSize = 10) {
  const data = await fetchAPI(
    `/noticias?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=data_publicacao:desc&populate=*`
  );
  return data;
}

export async function getNoticiaBySlug(slug: string) {
  const data = await fetchAPI(
    `/noticias?filters[documentId][$eq]=${slug}&populate=*`
  );
  return data?.data?.[0] || null;
}

export async function getNoticiasByCategoria(categoriaNome: string) {
  const nomeCapitalizado = categoriaNome.charAt(0).toUpperCase() + categoriaNome.slice(1);
  const data = await fetchAPI(
    `/noticias?filters[categoria][nome][$eq]=${encodeURIComponent(nomeCapitalizado)}&sort=data_publicacao:desc&populate=*`
  );
  return data;
}

export async function getCategorias() {
  const data = await fetchAPI('/categorias');
  return data;
}

export async function getTransmissoesAoVivo() {
  const data = await fetchAPI(
    '/transmissoes?sort=data_hora:asc&populate=*'
  );
  return data;
}

export async function getRelatedNoticias(categoriaId: number, currentSlug: string, limit = 4) {
  try {
    const data = await fetchAPI(
      `/noticias?filters[categoria][id][$eq]=${categoriaId}&filters[documentId][$ne]=${currentSlug}&sort=data_publicacao:desc&pagination[pageSize]=${limit}&populate=*`
    );
    return data?.data || [];
  } catch {
    return [];
  }
}

export async function createComentario(noticiaId: number, nome: string, email: string, texto: string) {
  const data = await fetchAPI('/comentarios', {
    method: 'POST',
    body: {
      data: {
        nome,
        email,
        texto,
        noticia: noticiaId,
      },
    },
  });
  return data;
}

export async function getComentariosByNoticia(noticiaId: number) {
  const data = await fetchAPI(
    `/comentarios?filters[noticia][id][$eq]=${noticiaId}&sort=data:desc`
  );
  return data;
}
