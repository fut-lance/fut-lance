# FUT LANCE - Memória do Projeto

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
- Mercado (id:4, slug: mercado)
- Feminino (id:5, slug: feminino)
- Champions League (id:6, slug: champions-league)

## O que FUNCIONA
- News listing, detail pages, category filtering
- IPTV player com proxy CORS (Edge Runtime)
- Toggle admin para transmissões ao vivo
- SEO completo (JSON-LD, OG, sitemaps, breadcrumbs)
- Comentários nas notícias
- Tabela do Brasileirão na página de categoria
- Canal GETV (GE TV) funcionando

## Pendências
- [ ] Publicar 5 notícias sobre Libertadores dos jogos do dia 09/09/2026

## Monetização
- **Planejado**: AdCash (futuro, ainda não implementado)
- **Atual**: Nenhuma monetização ativa

## O que NÃO funciona / Cuidados
- **Tabela do Brasileirão**: NÃO é automática — precisa atualizar manualmente quando jogos são disputados. Fonte: ESPN (espn.com.br/futebol/classificacao/_/liga/bra.1)
- **Imagens Unsplash quebradas**: photo-1508098682722-e99c43a406b2 e photo-1522778119026-d647f5096c20 retornam 404
- **Slugs das categorias no Strapi**: Brasileirão e Libertadores têm slug null — o frontend resolve com slugMap no api.ts
- **Strapi single types**: Não expõem REST API pública por padrão
- **Publicar notícias**: SEMPRE colocar na categoria correta ao criar no Strapi
- **UTF-8 no banco**: Já corrigido, mas podem aparecer caracteres quebrados em notícias antigas

## Regras para Jogos ao Vivo (matches.ts)
- **SEMPRE colocar logos dos times** — usar URLs de api-sports.io: `https://media.api-sports.io/football/teams/{id}.png`
- IDs conhecidos: Flamengo=1959, Independiente del Valle=256
- Para outros times, pesquisar ID correto no api-sports.io
- NÃO usar placeholder genérico (ex: img.flashscore.com)
- Tipos de jogos: Libertadores, Champions League, Sul-Americana, Brasileirão Série B

## Regras para Publicar Notícias
1. SEMPRE escolher a categoria correta no Strapi
2. Usar imagens Unsplash que funcionam (evitar as duas listadas acima)
3. Título claro e descritivo
4. Conteúdo em HTML (<p>, <h3>, <strong>)
5. Data de publicação correta

## Comandos Úteis
- Node.js: `C:\Program Files\nodejs\node.exe`
- npm: `C:\Program Files\nodejs\npm.cmd`
- Git: `C:\Program Files\Git\bin\git.exe`
- PATH: `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH`
- Build: `& "C:\Program Files\nodejs\npm.cmd" run build`
- Push: `& "C:\Program Files\Git\bin\git.exe" push`
- PowerShell não roda npm.ps1 — usar npm.cmd diretamente
