# ⚽ FUT LANCE - Blog de Futebol

Blog completo de notícias de futebol com sistema de transmissões ao vivo.

## 🚀 Funcionalidades

- **Notícias**: Cadastro, edição e exclusão de notícias
- **Imagens**: Upload de imagens para capa das notícias
- **Vídeos**: Incorporação de vídeos do YouTube
- **Comentários**: Sistema de comentários nas notícias
- **Transmissões**: Player de vídeo para transmissões ao vivo (M3U/HLS)
- **Categorias**: Organização por times, campeonatos, transferências
- **Layout Responsivo**: Funciona em desktop e celular

## 📁 Estrutura do Projeto

```
fut-lance/
├── src/                    # Frontend (Next.js)
│   ├── app/               # Páginas
│   │   ├── page.tsx       # Home
│   │   ├── noticia/       # Notícias
│   │   ├── categoria/     # Categorias
│   │   └── ao-vivo/       # Transmissões
│   ├── components/        # Componentes React
│   └── lib/               # Utilitários
└── backend/               # Backend (Strapi)
    └── src/api/           # APIs
```

## 🛠️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+)
- npm ou yarn

## 📦 Instalação

### 1. Frontend (Next.js)

```bash
cd fut-lance
npm install
npm run dev
```

O site estará disponível em: `http://localhost:3000`

### 2. Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

O Strapi estará disponível em: `http://localhost:1337`

### 3. Configurar Strapi

1. Acesse `http://localhost:1337/admin`
2. Crie um usuário administrador
3. Vá em **Settings > Users & Permissions**
4. Em **Roles**, edite o **Public** e ative as permissões das APIs
5. Crie categorias e notícias pelo painel do Strapi

## 🌐 Hospedagem

### Frontend (Vercel)

1. Crie uma conta no [Vercel](https://vercel.com)
2. Conecte seu repositório Git
3. Configure a variável de ambiente: `NEXT_PUBLIC_STRAPI_URL`
4. Deploy automático

### Backend (Strapi Cloud ou Railway)

1. **Strapi Cloud**: [strapi.io/cloud](https://strapi.io/cloud)
2. **Railway**: [railway.app](https://railway.app)
3. Configure as variáveis de ambiente conforme o Strapi

## 🎨 Personalização

### Cores

Edite `tailwind.config.ts` para mudar as cores:

```typescript
colors: {
  'fut-green': '#00a651',    // Verde principal
  'fut-dark': '#1a1a2e',     // Fundo escuro
  'fut-darker': '#16213e',   // Fundo mais escuro
  'fut-accent': '#e94560',   // Vermelho destaque
}
```

### Logo

Altere o ícone e nome no `Header.tsx`.

## 📝 Licença

Projeto open-source para fins educacionais.

---

Feito com ⚽ por **FUT LANCE**
