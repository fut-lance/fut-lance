# FUT LANCE - Memória do Projeto

## ⚠️ INSTRUÇÕES PERMANENTES — PRIORIDADE MÁXIMA

### 1. SEMPRE CONSIDERAR A DATA ATUAL
- Antes de qualquer tarefa, verifique a data atual
- Nunca presuma que informação antiga continua atual
- Nunca invente datas
- Nunca trate notícia antiga como recente
- Confira data de publicação/atualização da fonte
- Se houver dúvida, pesquise novamente antes de usar

### 2. NOTÍCIAS DEVEM SER ATUALIZADAS
1. Verifique a data atual
2. Busque informações recentes
3. Dê preferência a fontes confiáveis
4. Confira se a notícia corresponde ao momento atual
5. Evite publicar informações antigas como novas
6. Não invente notícias, declarações, resultados, escalações ou transferências
7. Quando possível, confirme em mais de uma fonte
8. Se não houver confirmação suficiente, deixe claro em vez de inventar

### 3. VERIFICAR ANTES DE ALTERAR O CÓDIGO
- Analise a estrutura existente primeiro
- Identifique quais arquivos serão afetados
- Entenda como o sistema atual funciona
- Verifique dependências entre componentes
- Não altere arquivos desnecessários
- Não remova funcionalidades sem autorização
- Não substitua código funcional por simplificação sem verificar consequências

### 4. NÃO FAZER ALTERAÇÕES ÀS CEGAS
- NUNCA altere apenas supondo como funciona
- Antes de implementar: Leia o código relacionado
- Identifique possíveis conflitos
- Verifique rotas, componentes, APIs, banco de dados, variáveis de ambiente
- Verifique responsividade e SEO quando aplicável

### 5. TESTAR TUDO APÓS ALTERAÇÕES
- Execute testes disponíveis
- Verifique erros de TypeScript e build
- Verifique rotas afetadas
- Verifique se funcionalidades anteriores continuam
- Corrija erros antes de considerar tarefa concluída
- Não diga que está concluído se houver erros conhecidos

### 6. PRESERVAR O QUE JÁ FUNCIONA
- Não altere Home sem necessidade
- Não altere páginas de notícias sem necessidade
- Não altere categorias sem necessidade
- Não altere SEO existente sem verificar consequências
- Não remova componentes ou funcionalidades para simplificar
- Faça alterações pequenas, controladas e justificadas

### 7. SEO
- Preserve URLs existentes
- Evite quebrar links internos
- Verifique title, meta description, canonical, headings
- Verifique dados estruturados quando aplicáveis
- Evite conteúdo duplicado ou páginas vazias
- Priorize conteúdo útil e original

### 8. CONTEÚDO DE FUTEBOL
- Diferencie: notícia, rumor, informação confirmada, opinião, resultado, programação
- Nunca transforme rumor em fato
- Para jogos: confira competição, times, data, horário, status, resultado, rodada, local

### 9. PENSAR ANTES DE EXECUTAR
- Sequência: ANALISAR → VERIFICAR → PLANEJAR → IMPLEMENTAR → TESTAR → REVISAR
- Não tenha pressa para alterar código
- Identifique riscos antes de executar

### 10. QUANDO FALTAR INFORMAÇÃO
- Não invente, não suponha, não apresente como fato
- Procure fonte confiável
- Se não for possível confirmar, informe a limitação

### 11. MEMÓRIA DO PROJETO
- Consulte estas regras antes de cada tarefa
- Objetivo evitar: notícias desatualizadas, datas erradas, informações inventadas, alterações desnecessárias, quebra de funcionalidades, erros de código, perda de SEO, retrabalho

### REGRA PRINCIPAL
**É MELHOR DEMORAR UM POUCO MAIS PARA VERIFICAR E FAZER CERTO DO QUE EXECUTAR RAPIDAMENTE E FAZER ERRADO.**

### CHECKLIST FINAL
✓ Solicitação atendida exatamente como pedida
✓ Data atual considerada quando necessário
✓ Informações recentes verificadas quando necessário
✓ Nenhuma informação inventada
✓ Nenhuma funcionalidade quebrada
✓ Código testado
✓ Sem erros conhecidos
✓ Resultado corresponde ao solicitado

---

## ⚠️ REGRAS ADICIONAIS FUT-LANCE
1. **NOTÍCIAS:** SEMPRE verificar a data ANTES de publicar. Buscar no Google "futebol hoje [data]" e só publicar notícias do dia ou últimas 24h. NUNCA publicar notícias antigas.
2. **JOGOS AO VIVO:** Remover jogos encerrados 20 minutos após o fim (implementado no client-side).
3. **CONTEÚDO:** SEMPRE pesquisar dados atualizados no Google antes de preencher classificação, artilharia, elencos, transferências. NUNCA usar dados fictícios ou desatualizados.
4. **DATAS:** SEMPRE verificar a data atual antes de criar qualquer conteúdo temporal.
5. **FONTES:** Usar apenas fontes confiáveis (ge.globo.com, espn.com.br, uol.com.br, etc.)
6. **NÃO INVENTAR:** Nunca inventar notícias, resultados, transferências ou escalações.
7. **CONFIRMAR:** Quando possível, confirmar informações em mais de uma fonte.
8. **CANAIS DE TRANSMISSÃO:** SEMPRE pesquisar no Google quais canais irão transmitir cada jogo ANTES de cadastrar os canais em `matches.ts`. Buscar "onde assistir [time] x [time] [data]" ou "transmissão brasileirão rodada [X]". Não inventar canais — usar apenas os confirmados em fontes oficiais (ge.globo.com, CBF, portalmidiaesporte.com, etc.).
9. **PÁGINA DE CADA JOGO:** Toda página de jogo (`/ao-vivo/[slug]`) DEVE ter: player de vídeo no topo, seletor de canais (se tiver mais de 1), placar visual com escudos, informações da partida, jogos relacionados. Isso é essencial para a experiência do usuário.
10. **CRIAR JOGO = CRIAR PÁGINA + SEO:** Sempre que cadastrar um novo jogo em `matches.ts`, a página do jogo é criada automaticamente via `generateStaticParams()`. Porém, SEMPRE verificar se o SEO está correto: título, descrição, keywords, Open Graph, Twitter Card, JSON-LD SportsEvent, BreadcrumbList. Se faltar algo, ajustar antes de publicar.

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
- IPTV_URL = http://blackbr.fun:80/get.php?username=031532627&password=513117897&type=m3u_plus&output=m3u8

## IPTV
- **Servidor principal**: http://blackbr.fun:80/get.php?username=031532627&password=513117897&type=m3u_plus&output=m3u8
- **Servidor antigo (pode estar fora)**: http://filtror7679.site:80/031532627/513117897/{id}.m3u8
- **Stream URL**: http://blackbr.fun:80/031532627/513117897/{id}.m3u8
- Canais permitidos: ESPN, SporTV, Premiere, Band Sports, Combate, GE TV, Cazé TV, Record, Paramount+, Amazon Prime
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
- **Artilharia do Brasileirão**: NÃO é automática — precisa atualizar manualmente. Fonte: ge.globo.com (artilheiro da serie a do brasileirao)
- **Elenços dos times**: Dados em src/data/times.ts podem ficar desatualizados — verificar sempre no Google antes de usar
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
10. **⚠️ REGRA CRÍTICA: ANTES DE CRIAR QUALQUER NOTÍCIA OU CONTEÚDO, SEMPRE:**
    - Verificar a data atual (ex: "hoje é 11/09/2026")
    - Buscar no Google dados atualizados (ex: "artilharia Brasileirão 2026 atual", "classificação Brasileirão 2026")
    - Verificar se a notícia/conteúdo é de HOJE ou no máximo das últimas 24h
    - NUNCA publicar notícias de dias anteriores — mesmo que sejam "reais"
    - NUNCA usar dados antigos de classificação, artilharia, elencos ou transferências
    - Se o dado for antigo, DESCARTAR e buscar o mais recente
    - Motivo: conteúdo desatualizado prejudica SEO, confiança do usuário e monetização

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

---

## 📋 PROMPT MESTRE — EXECUÇÃO EDITORIAL EM ETAPAS

### ORDEM OBRIGATÓRIA:
ETAPA 0 → PREPARAÇÃO E BACKUP
ETAPA 1 → AUDITORIA
ETAPA 2 → VALIDAÇÃO DA AUDITORIA
ETAPA 3 → LIMPEZA
ETAPA 4 → VALIDAÇÃO DA LIMPEZA
ETAPA 5 → PESQUISA DE NOVAS PAUTAS
ETAPA 6 → CRIAÇÃO DAS NOTÍCIAS
ETAPA 7 → IMAGENS
ETAPA 8 → SEO
ETAPA 9 → VALIDAÇÃO FINAL
ETAPA 10 → PUBLICAÇÃO/DEPLOY
ETAPA 11 → RELATÓRIO FINAL

### REGRA ABSOLUTA — DATA ATUAL:
1. Verifique a data e hora REAL do sistema
2. Não utilize conhecimento antigo do modelo como fonte
3. Pesquise informações atuais na internet
4. Confirme os fatos
5. Não invente informações
6. Se a data real for diferente da referência, utilize a data real

### FLUXO EDITORIAL PERMANENTE:
DATA ATUAL → PESQUISA → CONFIRMAÇÃO → DUPLICAÇÃO → CATEGORIA → CONTEÚDO → IMAGEM → LICENÇA → SEO → VALIDAÇÃO → PUBLICAÇÃO

### PRIORIDADES:
1. PRECISÃO
2. ATUALIDADE
3. SEGURANÇA
4. QUALIDADE
5. IMAGENS ADEQUADAS
6. SEO
7. ORGANIZAÇÃO
8. QUANTIDADE

### REGRA DE PARADA:
PARE se houver: dúvida sobre dados, falta de fonte, conflito entre fontes, dúvida sobre licença, erro de banco, erro de build, risco de apagar dados importantes.
