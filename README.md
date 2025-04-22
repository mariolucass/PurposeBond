
# 🧠 PurposeBond

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-3982CE)

> Projeto robusto de rede social desenvolvido com foco em **engenharia de software moderna**, **arquitetura escalável** e **experiência realista de produto**, inspirado nos padrões utilizados por empresas como **Nubank**, **Twitter** e **Meta**.

> _Toda a lógica, arquitetura e decisões técnicas deste projeto foram desenvolvidas e compreendidas a fundo por mim, com apoio de ferramentas modernas para ganho de produtividade._

--- 

**Testar o projeto:** [https://purposebond.vercel.app](https://purposebond.vercel.app)

--- 

## 📑 Sumário
- 🔗 [Testar o projeto](https://purposebond.vercel.app)
- 📌 [Visão Geral](#-visão-geral)
- 🚀 [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- 🛠️ [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- 🧪 [Como rodar localmente](#-como-rodar-localmente)
- 🚧 [Funcionalidades Futuras](#-funcionalidades-futuras)
- 🧪 [Melhorias Técnicas](#-melhorias-técnicas)
- 📁 [Documentações específicas](#-documentações-específicas)
- 📄 [Licença](#-licença)

--- 

## 📌 Visão Geral

**PurposeBond** é um clone avançado de rede social, com funcionalidades completas de interação entre usuários, incluindo:

- CRUD de postagens, comentários, curtidas e retweets
- Feed personalizado (ForYou e Following)
- Mensagens em tempo real com WebSocket + Redis
- Notificações reativas
- Troca de contas e pesquisa global (usuários e postagens)

---

## 🚀 Funcionalidades Implementadas

✅ Pesquisa de usuários e posts  
✅ Sistema de seguidores (Follow/Unfollow)  
✅ Mensagens em tempo real com WebSockets e Redis também persistidas no PostgreSQL  
✅ Feed dividido entre **ForYou** e **Following** 

✅ CRUD completo de:
- Usuários
- Postagens
- Comentários
- Likes
- Retweets
- Notificações
  
✅ Páginas específicas para:
- Perfil
- Sistema de Autenticação ( Registro / Login / AlternarContas ) 
- Comentário
- Post individual
- Notificações
- Configurações
- Resultados de busca

---

## 🛠️ Tecnologias Utilizadas

### 📦 Backend
- **Node.js** com **Express**
- **TypeScript**
- **PostgreSQL** com **Prisma ORM**
- **Redis** com `@socket.io/redis-adapter`
- **Socket.IO** (mensagens em tempo real)
- **Zod** para validação de dados
- **JWT** para autenticação
- **Arquitetura modular com controllers, services, schemas e middlewares**

### 🌐 Frontend
- **Next.js 14** + **React 18**
- **TailwindCSS** com suporte a temas (`dark/light`)
- **Radix UI** (acessibilidade e componetização avançada)
- **React Hook Form** + **Zod Resolver**
- **Framer Motion** para animações
- **Axios**, **Socket.IO Client**, **Lucide**, **Swiper**, entre outros

---

## 🧪 Como rodar localmente

### Backend
```bash
cd backend
yarn
yarn migrate
yarn dev
```

### Frontend
```bash
cd redesocial
yarn
yarn dev
```

---

## 🚧 Funcionalidades Futuras

- [ ] Upload de imagem de perfil com armazenamento externo (S3 ou Cloudinary)
- [ ] Sistema de notificações em tempo real com WebSocket
- [ ] Sistema de verificação (badge) para usuários
- [ ] Página de relatório de atividades do usuário (dashboard pessoal)
- [ ] Sistema de bloqueio e denúncias (abuse report)
- [ ] Dark mode automatizado com base no SO do usuário
- [ ] Notificações por e-mail com cron + templates dinâmicos
- [ ] Sistema de analytics simples para visualização de posts (número de views)
- [ ] Modal de preview de mídia com zoom (fotos e vídeos)
- [ ] Indexação de posts por tags e busca por #hashtags

## 🧪 Melhorias Técnicas

- [ ] Testes com Jest (backend) e Testing Library/Cypress (frontend)
- [ ] Cache de feed com Redis para alta performance
- [ ] Documentação da API com Swagger/OpenAPI
- [ ] Suporte a múltiplos idiomas (i18n com next-intl)

---

## 📁 Documentações específicas

- [`architecture.md`](./docs/architecture.md) – Estrutura de pastas, separação de responsabilidades e organização geral do projeto.
- [`auth.md`](./docs/auth.md) – Estratégia de autenticação com JWT, fluxo de login e proteção de rotas.  
- [`deploy.md`](./docs/deploy.md) – Como o projeto foi hospedado (frontend e backend), variáveis de ambiente e serviços usados. 
- [`endpoints.md`](./docs/endpoints.md) – Lista dos principais endpoints da API RESTful com exemplos de payloads. 
- [`errors.md`](./docs/errors.md) – Tratamento global de erros, estrutura de `AppError`, Zod e Prisma.  
- [`flow.md`](./docs/flow.md) – Fluxo de navegação do usuário dentro da aplicação e transições de tela.  
- [`instalation.md`](./docs/instalation.md) – Instruções passo a passo para rodar o projeto localmente. 
- [`links.md`](./docs/links.md) – Links úteis relacionados ao projeto (produção, Figma, design system, etc).
- [`roadmap.md`](./docs/roadmap.md) – Lista de funcionalidades futuras e melhorias planejadas. 
- [`socket.md`](./docs/socket.md) – Sistema de mensagens em tempo real com Socket.IO + Redis, persistência no PostgreSQL.
- [`techs.md`](./docs/techs.md) – Tecnologias utilizadas no frontend e backend com justificativas.
- [`tests.md`](./docs/tests.md) – Estratégia de testes, bibliotecas utilizadas e estrutura de testes unitários/e2e.
- [`validation.md`](./docs/validation.md) – Uso do Zod para validação de dados e integração com React Hook Form.

---

## 📄 Licença

MIT © Mário L.

