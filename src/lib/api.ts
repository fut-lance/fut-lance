const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface FetchOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Charset': 'utf-8',
  };

  // Retry só em leituras (GET): POST nunca é repetido automaticamente.
  const maxAttempts = method === 'GET' ? 3 : 1;
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
        method,
        headers: { ...defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
      });

      if (!response.ok) {
        // 4xx (exceto 429) não adianta repetir.
        if (response.status !== 429 && response.status < 500) {
          throw new Error(`API error: ${response.status}`);
        }
        throw new Error(`API retryable: ${response.status}`);
      }

      const text = await response.text();
      return JSON.parse(text);
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error('API error');
}

export async function getNoticias(page = 1, pageSize = 10) {
  const data = await fetchAPI(
    `/noticias?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=data_publicacao:desc&sort[1]=id:desc&populate=*`
  );
  return data;
}

export async function getNoticiaBySlug(slug: string) {
  const data = await fetchAPI(
    `/noticias?filters[slug][$eq]=${slug}&populate=*`
  );
  return data?.data?.[0] || null;
}

export async function getNoticiasByCategoria(categoriaNome: string) {
  const slugMap: Record<string, string> = {
    'brasileirao': 'Brasileirão',
    'brasileirao-serie-b': 'Brasileirão Série B',
    'serie-b': 'Brasileirão Série B',
    'libertadores': 'Libertadores',
    'selecao': 'Seleção',
    'mercado': 'Mercado',
    'feminino': 'Feminino',
    'champions-league': 'Champions League',
    'transferencias': 'Transferências',
    'sul-americana': 'Sul-Americana',
    'copa-do-brasil': 'Copa do Brasil',
    'premier-league': 'Premier League',
    'flamengo': 'Flamengo',
    'palmeiras': 'Palmeiras',
    'corinthians': 'Corinthians',
    'sao-paulo': 'São Paulo',
  };

  const nomeReal = slugMap[categoriaNome] || categoriaNome.charAt(0).toUpperCase() + categoriaNome.slice(1);

  // Percorre todas as páginas: sem isso, categorias com mais de 25
  // notícias (limite padrão do Strapi) exibiam lista incompleta.
  const all: any[] = [];
  let page = 1;
  for (;;) {
    const data = await fetchAPI(
      `/noticias?filters[categoria][nome][$eq]=${encodeURIComponent(nomeReal)}&sort[0]=data_publicacao:desc&sort[1]=id:desc&pagination[page]=${page}&pagination[pageSize]=100&populate=*`
    );
    const items = data?.data || [];
    all.push(...items);
    const pagination = data?.meta?.pagination;
    if (!pagination || page >= (pagination.pageCount || 1) || items.length === 0) {
      return { data: all, meta: data?.meta };
    }
    page += 1;
  }
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
      `/noticias?filters[categoria][id][$eq]=${categoriaId}&filters[slug][$ne]=${currentSlug}&sort=data_publicacao:desc&pagination[pageSize]=${limit}&populate=*`
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
