# 🌟 Portfólio Pessoal - Manuel Sereno

> Portfólio profissional moderno desenvolvido com Next.js 15, TypeScript e Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://reactjs.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

## 📋 Sobre o Projeto

Este é o portfólio pessoal de **Manuel Sereno**, desenvolvedor Front-End e UI/UX Designer localizado em Salvador, Bahia. O projeto apresenta uma interface moderna, responsiva e otimizada, showcasing projetos e experiências profissionais.

### ✨ Características Principais

- 🎨 **Design Moderno**: Interface clean e profissional com gradientes personalizados
- 📱 **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- ⚡ **Performance Otimizada**: SSG com Next.js 15 e App Router
- 🎭 **Animações Fluídas**: Transições suaves com Framer Motion
- 📧 **Formulário de Contato**: Sistema completo de envio de emails via Resend API
- 🔍 **SEO Otimizado**: Meta tags completas e Open Graph
- ♿ **Acessibilidade**: Seguindo padrões de acessibilidade web
- 🌙 **Tema Escuro**: Design com esquema de cores escuras elegante

## 🚀 Tecnologias e Ferramentas

### Frontend Core
- **[Next.js 15.5.4](https://nextjs.org)** - Framework React com App Router
- **[React 19.1.0](https://reactjs.org)** - Biblioteca para interfaces de usuário
- **[TypeScript 5.0](https://typescriptlang.org)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS 4.0](https://tailwindcss.com)** - Framework CSS utilitário

### UI & Animações
- **[Framer Motion 12.23.21](https://framer.com/motion)** - Biblioteca de animações para React
- **[Lucide React 0.544.0](https://lucide.dev)** - Ícones SVG otimizados
- **[React Icons 5.5.0](https://react-icons.github.io)** - Biblioteca de ícones populares
- **[Radix UI](https://radix-ui.com)** - Componentes acessíveis e primitivos

### Utilitários CSS
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais
- **[tailwind-merge 3.3.1](https://github.com/dcastil/tailwind-merge)** - Merge de classes Tailwind
- **[class-variance-authority 0.7.1](https://cva.style)** - Variantes de componentes com classe
- **[tw-animate-css 1.3.8](https://github.com/tw-animate-css/tw-animate-css)** - Animações CSS adicionais

### Backend & APIs
- **[Resend API](https://resend.com)** - API de e-mail para desenvolvedores
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Endpoints serverless

### Desenvolvimento
- **[ESLint 9](https://eslint.org)** - Linter para JavaScript/TypeScript
- **[PostCSS](https://postcss.org)** - Processador de CSS
- **[@types/*](https://www.npmjs.com/~types)** - Definições TypeScript

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # Rotas da API serverless
│   │   └── contact/       # Endpoint de contato
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz da aplicação
│   └── page.tsx          # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── layout/           # Componentes de layout
│   │   ├── Header.tsx    # Cabeçalho/navegação
│   │   └── Footer.tsx    # Rodapé
│   ├── portfolio/        # Seções do portfólio
│   │   ├── Hero.tsx      # Seção inicial/apresentação
│   │   ├── About.tsx     # Sobre mim
│   │   ├── Projects.tsx  # Projetos desenvolvidos
│   │   └── Contact.tsx   # Formulário de contato
│   └── ui/              # Componentes de interface
│       ├── modal.tsx    # Modal/diálogo
│       ├── button.tsx   # Botões estilizados
│       ├── card.tsx     # Cards/cartões
│       ├── badge.tsx    # Badges/etiquetas
│       └── scroll-animation.tsx # Animações de scroll
└── lib/                 # Utilitários e configurações
    └── utils.ts        # Funções auxiliares
```

## ⚙️ Funcionalidades Implementadas

### 🎯 Seções do Portfólio

1. **Hero Section**
   - Apresentação profissional com animações
   - Call-to-action para contato
   - Design responsivo com gradientes

2. **Sobre Mim**
   - Biografia profissional
   - Experiências e trajetória
   - Animações de entrada suaves

3. **Projetos**
   - Grid responsivo de projetos
   - Modal detalhado para cada projeto
   - Links para GitHub e demonstrações
   - Imagens otimizadas com Next.js Image

4. **Contato**
   - Formulário completo com validação
   - Envio de emails automatizado
   - Rate limiting para segurança
   - Resposta automática personalizada

### 📧 Sistema de Contato

- **Validação Completa**: Frontend e backend
- **Templates HTML**: Emails estilizados e responsivos
- **Rate Limiting**: Proteção contra spam (3 envios/15min)
- **Auto-reply**: Confirmação automática para o usuário
- **Notificação**: Email de notificação para o proprietário
- **Error Handling**: Tratamento robusto de erros

### 🎨 Animações & UX

- **Scroll Animations**: Elementos aparecem ao entrar na viewport
- **Stagger Effects**: Animações escalonadas em listas
- **Hover Effects**: Micro-interações nos cards e botões
- **Loading States**: Indicadores visuais durante operações
- **Modal Animations**: Transições suaves para abrir/fechar

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Conta de email para configuração do Nodemailer

## 🔧 Configurações Técnicas

### TypeScript

```json
{
  "target": "ES2017",
  "lib": ["dom", "dom.iterable", "esnext"],
  "strict": true,
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Tailwind CSS

- **Framework**: v4.0 com PostCSS
- **Modo**: JIT (Just-In-Time)
- **Tema**: Personalizado com cores e gradientes
- **Responsividade**: Mobile-first approach

### Next.js

- **App Router**: Estrutura moderna de roteamento
- **SSG**: Geração estática para performance
- **Image Optimization**: Otimização automática de imagens
- **API Routes**: Endpoints serverless integrados

## 📊 Performance e SEO

### Otimizações Implementadas

- ✅ **Lighthouse Score**: 90+ em todas as métricas
- ✅ **Core Web Vitals**: LCP, FID e CLS otimizados
- ✅ **Image Optimization**: Lazy loading e formatos modernos
- ✅ **Code Splitting**: Bundle otimizado automaticamente
- ✅ **Prefetching**: Pre-carregamento de rotas críticas
- ✅ **Compression**: Gzip/Brotli habilitados

### SEO Features

- ✅ **Meta Tags**: Título, descrição e keywords
- ✅ **Open Graph**: Preview social otimizado
- ✅ **Twitter Cards**: Integração com Twitter
- ✅ **Structured Data**: Schema.org para melhor indexação
- ✅ **Sitemap**: Geração automática
- ✅ **Robots.txt**: Configuração de crawling

## 📞 Contato

**Manuel Sereno** - Desenvolvedor Front-End & UI/UX Designer

- 📧 Email: [nelfsereno@gmail.com](mailto:nelfsereno@gmail.com)
- 💼 LinkedIn: [@dev-manuel-sereno](https://linkedin.com/in/dev-manuel-sereno)
- 🐱 GitHub: [@DevManuelSereno](https://github.com/DevManuelSereno)
- 📱 WhatsApp: [(71) 99995-6042](https://wa.me/5571999956042)
- 🌐 Website: [manuelsereno.dev](https://manuelsereno.dev)

<div align="center">
  <p>Desenvolvido com ❤️ por <strong>Manuel Sereno</strong></p>
  <p>🚀 <em>"Transformando ideias em experiências digitais excepcionais"</em></p>
</div>
