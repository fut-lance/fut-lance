# FUT LANCE - Memória do Projeto

## ⚠️ REGRAS CRÍTICAS (SEMPRE SEGUIR)
1. **NOTÍCIAS: SEMPRE verificar a data ANTES de publicar.** Buscar no Google "futebol hoje [data]" e só publicar notícias do dia ou últimas 24h. NUNCA publicar notícias antigas.
2. **JOGOS AO VIVO: Remover jogos encerrados 20 minutos após o fim** (implementado no client-side).

## Informações Gerais
- **Nome do site**: FUT LANCE
- **Dono**: Rafael Melegari de Souza (rafaelmelegari86@gmail.com)
- **Idioma**: Português (Brasil)
- **Nível técnico**: Iniciante, não-técnico
- **Working directory**: D:\open code\

## Repositórios
- Frontend: https://github.com/fut-lance/fut-lance.git
- CMS: https://github.com/fut-lance/fut-lance-cms.git
- Frontend live: https://fut-lance.vercel.app
- Strapi live: https://fut-lance-cms-v2.onrender.com

## Stack
- Next.js 14 (App Router) + Tailwind CSS + TypeScript
- Strapi v5 (headless CMS)
- PostgreSQL no Render
- Deploy: Vercel (frontend) + Render (CMS)

## Strapi Admin
- Email: rafaelmelegari86@gmail.com
- Senha: funil1315rR#$
- Senha do toggle admin: futlance2024

## Variáveis de Ambiente (Vercel - Secret, production)
- NEXT_PUBLIC_STRAPI_URL = https://fut-lance-cms-v2.onrender.com
- STRAPI_ADMIN_EMAIL
- STRAPI_ADMIN_PASSWORD
- IPTV_URL = http://radiogolive.site:80/get.php?username=031532627&password=513117897&type=m3u_plus&output=m3u8

## IPTV
- Streams: http://xigfh01.site:80/031532627/513117897/{id}.m3u8 (HLS)
- Canal GETV: ids 588(FHD), 589(HD), 590(SD)
- Canais permitidos: ESPN, SporTV, Premiere, Band Sports, Combate, GE TV, Cazé TV, Paramount+, Amazon Prime
- NÃO incluir: DAZN, canais não-esportivos

## Google Analytics
- ID: G-V6N0JVT695

## Categorias (Strapi)
- Brasileirão (id:1, slug: brasileirao)
- Libertadores (id:2, slug: libertadores)
- Seleção (id:3, slug: selecao)
- Mercado (id:4, slug: mercado) — NÃO USAR, usar Transferências
- Feminino (id:5, slug: feminino)
- Champions League (id:6, slug: champions-league)
- Transferências (id:7, slug: transferencias) — USAR ESTA para notícias de transferências

## O que FUNCIONA
- News listing, detail pages, category filtering
- IPTV player com proxy CORS (Edge Runtime)
- Toggle admin para transmissões ao vivo
- SEO completo (JSON-LD, OG, sitemaps, breadcrumbs)
- Comentários nas notícias
- Tabela do Brasileirão na página de categoria
- Canal GETV (GE TV) funcionando

## Pendências
- [ ] Solicitar inclusão no Google News (news.google.com/newspublishers)
- [ ] Configurar Google Search Console para monitorar indexação
- [ ] Criar redes sociais: Instagram @futlance, Twitter @fut_lance, Facebook

## SEO Implementado
- robots.txt configurado
- sitemap.xml (normal)
- sitemap-news.xml (Google News - últimos 48 artigos)
- IndexNow API (indexação instantânea Bing/Yandex)
- NewsArticle schema completo
- news_keywords meta tag
- Canonical URLs
- OpenGraph e Twitter Cards
- JSON-LD结构化数据

## SEO Implementado
- robots.txt configurado
- sitemap.xml (normal)
- sitemap-news.xml (Google News - últimos 48 artigos)
- IndexNow API (indexação instantânea Bing/Yandex)
- NewsArticle schema completo
- news_keywords meta tag
- Canonical URLs
- OpenGraph e Twitter Cards
- JSON-LD结构化数据

## Monetização
- **Plataforma**: Adcash (ativa)
- **Publisher ID**: 1213830
- **Zone ID**: ctkhqd7xx
- **Scripts**: acscdn.com/script/aclib.js + runAutoTag
- **Status**: Conta criada, scripts integrados, aguardando aprovação do site

## O que NÃO funciona / Cuidados
- **Tabela do Brasileirão**: NÃO é automática — precisa atualizar manualmente quando jogos são disputados. Fonte: ESPN (espn.com.br/futebol/classificacao/_/liga/bra.1)
- **Imagens Unsplash quebradas**: photo-1508098682722-e99c43a406b2 e photo-1522778119026-d647f5096c20 retornam 404
- **Slugs das categorias no Strapi**: Brasileirão e Libertadores têm slug null — o frontend resolve com slugMap no api.ts
- **Strapi single types**: Não expõem REST API pública por padrão
- **Publicar notícias**: SEMPRE colocar na categoria correta ao criar no Strapi
- **UTF-8 no banco**: Já corrigido, mas podem aparecer caracteres quebrados em notícias antigas

## Regras para Jogos ao Vivo (matches.ts)
- **⚠️ REGRAS DE LIMPEZA AUTOMÁTICA:** Jogos encerrados DEVEM ser removidos da página 20 minutos após o encerramento. Implementar no client-side (AoVivoClient.tsx) lógica que compara data/hora atual com data/hora do jogo + 20min. Jogos que passaram desse período somem da listagem automaticamente.
- **SEMPRE colocar logos oficiais dos times** — buscar sempre a logo oficial de cada time
- **SEMPRE pesquisar qual canal vai passar o jogo** e colocar o link correto do canal no IPTV
- Fontes para logos oficiais:
  - logodetimes.com: `https://logodetimes.com/times/{nome}/logo-{nome}.png`
  - Sites oficiais dos times (ex: goiasec.com.br, cienciano.com, montevideocitytorque.com)
  - Wikipedia (upload.wikimedia.org)
- Canais IPTV disponíveis:
  - ESPN: 570 (FHD), 571 (HD), 573-586 (ESPN 2-6)
  - Premiere: 594 (Clubes FHD), 595 (Clubes HD), 597-616 (Premiere 2-8)
  - Paramount+: 618-621
  - SporTV: 558-568
  - Band Sports: 555-556
  - GE TV: 588 (FHD), 589 (HD)
  - Cazé TV: 646-653
  - Amazon Prime: 654-661
- NÃO usar placeholder genérico (ex: img.flashscore.com)
- NUNCA deixar time sem logo — sempre buscar a logo oficial
- Tipos de jogos: Libertadores, Champions League, Sul-Americana, Brasileirão Série B

## Regras para Publicar Notícias
1. SEMPRE escolher a categoria correta no Strapi (Transferências = id:7)
2. Usar imagens Unsplash que funcionam (evitar as duas listadas acima)
3. NUNCA usar URLs de sites de times (chelseafc.com, fcbarcelona.com etc) - retornam 404
4. SEMPRE verificar se imagens retornam 200 antes de criar notícias
5. Imagem padrão confiável: https://images.unsplash.com/photo-1574629810360-7efbbe195018
6. Título claro e descritivo
7. Conteúdo em HTML (<p>, <h3>, <strong>)
8. Data de publicação correta
9. **REGRAS ADCASH:** Toda notícia DEVE ter imagem funcional. Site sem imagem pode ser reprovado.
10. **⚠️ REGRA CRÍTICA: ANTES DE CRIAR QUALQUER NOTÍCIA, SEMPRE:**
    - Buscar no Google/na web a data atual (ex: "notícias futebol hoje [data]")
    - Verificar se a notícia que será publicada é de HOJE ou no máximo das últimas 24h
    - NUNCA publicar notícias de dias anteriores — mesmo que sejam "reais"
    - Se a notícia for antiga, DESCARTAR e buscar uma mais recente
    - Motivo: notícias desatualizadas prejudicam SEO e confiança do usuário

## API Token (Strapi Full Access)
- **Token**: `231bc9d148822cbbf909771a5e6c3fa28a58c1ab33b7a06cc183c5b3da2baa85e17a7ead799a7974388111d5853505f2d1707e5bd25723c8ebfe1a9445486cad84836e53541ad8cb909c5919bb2aad2de1eecc64d000eb3441e01ff2619588df9d05f439a6e82f16cc6575fdd0f9ca6a82574f437a807724d8fa1effbf8a9699`
- **Permissões**: Full Access (leitura e escrita)
- **Uso**: `Authorization: Bearer {token}` nos headers das requisições API

## Comandos Úteis
- Node.js: `C:\Program Files\nodejs\node.exe`
- npm: `C:\Program Files\nodejs\npm.cmd`
- Git: `C:\Program Files\Git\bin\git.exe`
- PATH: `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH`
- Build: `& "C:\Program Files\nodejs\npm.cmd" run build`
- Push: `& "C:\Program Files\Git\bin\git.exe" push`
- PowerShell não roda npm.ps1 — usar npm.cmd diretamente
