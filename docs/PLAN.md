# PLANO — Portfólio Manuel Sereno
### Auditoria de SEO / GEO / AEO + reescrita de copy

> **Documento de referência autossuficiente.** Foi escrito para ser lido fora da conversa que o originou, possivelmente por outra pessoa ou por outro agente, dentro de um repositório diferente. Tudo que é necessário para executar está aqui dentro.

**Data:** agosto de 2026
**Origem:** auditoria do redesign gerado pelo Vercel v0 (projeto local `D:\personal`)
**Destino:** o repositório/deploy já existente do site, onde este plano será aplicado

---

## SUMÁRIO

1. [Como usar este documento](#1-como-usar-este-documento)
2. [Contexto do projeto](#2-contexto-do-projeto)
3. [Fatos sobre o Manuel](#3-fatos-sobre-o-manuel-fonte-da-verdade)
4. [Auditoria — SEO](#4-auditoria--seo)
5. [Auditoria — GEO](#5-auditoria--geo)
6. [Auditoria — AEO](#6-auditoria--aeo)
7. [Auditoria — Copy](#7-auditoria--copy)
8. [Calibragem de expectativas e estimativas](#8-calibragem-de-expectativas-e-estimativas)
9. [Decisões fechadas](#9-decisões-fechadas)
10. [Arquitetura final](#10-arquitetura-final)
11. [Fase 0 — Base técnica](#11-fase-0--base-técnica)
12. [Fase 1 — Copy da home](#12-fase-1--copy-da-home)
13. [Fase 3 — Case studies e FAQ](#13-fase-3--case-studies-e-faq)
14. [Fase 2 — /curriculo](#14-fase-2--curriculo)
15. [Regras permanentes de copy](#15-regras-permanentes-de-copy)
16. [Pendências e questões em aberto](#16-pendências-e-questões-em-aberto)
17. [Auditoria de 17/08/2026 — o que o redesign criou](#17-auditoria-de-17082026--o-que-o-redesign-criou)
18. [Inventário do merge — antigo × novo](#18-inventário-do-merge--antigo--novo)
19. [Manifesto de cópia — como levar a origem para o destino](#19-manifesto-de-cópia--como-levar-a-origem-para-o-destino)

---

## 1. COMO USAR ESTE DOCUMENTO

### Ordem de execução

```
MIGRAÇÃO 15→16  →  FASE 0 (técnico)  →  FASE 1 (copy)  →  FASE 3 (cases+FAQ)  →  FASE 2 (/curriculo)
    ~2-4h              ~3h                  ~6h              ~8h + escrita           ~4h
                                                              ⚠️ "talvez"            ⚠️ "talvez"
```

> **A migração para o Next 16 (seção 11.1) vem primeiro** — decisão 17. Escrever `sitemap.ts` e `opengraph-image.tsx` na API da 15 para reescrever depois seria retrabalho puro.

A numeração fora de ordem é proposital: a Fase 2 foi rebaixada quando ficou claro que o Manuel já está empregado, então a página para recruiter deixou de ser urgente. Os nomes foram mantidos para não quebrar referências ao longo do texto.

Cada fase entrega valor sozinha. É possível parar em qualquer ponto.

### ✅ Destino confirmado (17/08/2026)

O repositório de destino é **`github.com/DevManuelSereno/Site_Portfolio`** — o mesmo que serve `manuelsereno.vercel.app` hoje. Verificado diretamente no GitHub:

| | Origem (`D:\personal`) | **Destino (`Site_Portfolio`)** |
|---|---|---|
| Next.js | 16.3.1 | 15.5.4 → **migrar para 16** *(decisão 17)* |
| React | 19 | 19.1.0 |
| TypeScript | 5.7.3 | 5.0 → **exige ≥ 5.1** *(ver 11.1)* |
| Tailwind | 4.3.3 | 4.0 |
| Estrutura | `app/` na raiz | **`src/app/`, `src/components/`, `src/lib/` — MANTIDA** *(decisão 18)* |
| Componentes | `components/` plano | `src/components/{layout,portfolio,ui}/` |
| Animação | CSS puro | **Framer Motion 12.23.21** |
| Biblioteca de UI | `@base-ui/react` | **Radix UI** |
| Contato | só links | **formulário + Resend + rate limit (3 envios / 15 min)** |
| Fontes | Inter · Space Grotesk · JetBrains Mono | **Geist · Geist Mono** |
| Ícone | `app/icon.svg` (auto-detectado) | `/icon-site.png` via `metadata.icons` |
| Lint | script sem config | `eslint.config.mjs` |

**Consequência prática:** a Fase 0 sobrevive inteira — Next 15 suporta `metadataBase`, `sitemap.ts`, `robots.ts` e `opengraph-image` exatamente como o 16. **Mas todo caminho de arquivo citado neste documento ganha o prefixo `src/`.**

> ⚠️ **O README do destino superestima o que existe lá.** Ele afirma *"structured Schema.org data"* e *"Open Graph integration"*. Verificado em `src/app/layout.tsx`: **não há JSON-LD nem Schema.org**, não há `metadataBase` e não há `canonical`. Não tome o README como inventário — ver seção 18.

### 🔀 Diretriz de merge (decisão do Manuel, 17/08/2026)

> **Isto não é "substituir o antigo pelo novo".** A instrução explícita foi aproveitar o que é bom dos dois lados. Não descarte trabalho do `Site_Portfolio` só porque o redesign não tem equivalente — e não descarte decisão do redesign só porque o antigo já resolvia de outro jeito.

Antes de escrever qualquer código, preencha o **inventário da seção 18**. Nada é apagado no destino sem estar marcado lá como "morre", com a razão escrita.

> **Correção (17/08/2026).** Esta linha dizia "shadcn/ui". Impreciso: o shadcn está **configurado** (`components.json`, estilo `base-nova`) mas **nenhum componente dele é usado**. O único que existia (`components/ui/button.tsx`) era andaime do v0, não era importado por tela nenhuma, e foi removido — junto com a pasta `components/ui/`, que ficou vazia. Não espere encontrar componentes de UI no repositório de origem.
>
> A dependência que realmente sustenta comportamento é o **`@base-ui/react`** (é o `Dialog` dele que o modal de Habilidades usa). O `shadcn` continua no `package.json`, mas é só o **CLI** — um gerador, sem componentes React exportados. Se o formulário de contato/Resend voltar, o caminho é `npx shadcn add input textarea label form` e **reestilizar para o design system** antes de usar (ver `DESIGN.md`).

---

## 2. CONTEXTO DO PROJETO

### O que existe hoje

| Item | Estado |
|---|---|
| Site no ar | `manuelsereno.vercel.app` |
| Repositório antigo | `github.com/DevManuelSereno/Site_Portfolio` |
| Avaliação do dono | "feio, mal feito, datado, e bem AI SLOP" |
| Redesign | Gerado pelo Vercel v0, aprovado esteticamente, é a base visual daqui pra frente |

### O que foi pedido

Auditoria de **SEO**, **GEO** e **AEO**, mais uma reescrita completa da copy.

**Definições usadas neste documento:**

- **SEO** — Search Engine Optimization. Aparecer em busca tradicional (Google, Bing).
- **GEO** — Generative Engine Optimization. Ser **citado** por motores generativos (ChatGPT, Perplexity, Claude, Google AI Overviews). Depende fortemente de dados estruturados e de afirmações factuais autocontidas.
- **AEO** — Answer Engine Optimization. Ocupar respostas diretas: featured snippets, "As pessoas também perguntam", busca por voz. Depende de conteúdo em formato pergunta→resposta.

### Restrição declarada pelo dono

> "NN assuma nada, caso tenha dúvidas: me pergunte"

Isso vale para quem for executar este plano. Onde há informação faltando, ela está marcada como pendência na seção 16 — **não preencha com suposição.** Inventar preenchimento é exatamente o que produz a sensação de "AI slop" que este projeto existe para eliminar.

---

## 3. FATOS SOBRE O MANUEL (fonte da verdade)

> Estes dados foram confirmados diretamente com ele em agosto de 2026 e **substituem** qualquer coisa escrita no site atual. O site atual está desatualizado em vários pontos.

### Identidade

| Campo | Valor |
|---|---|
| Nome | Manuel Sereno |
| Localização | Salvador, Bahia — Brasil |
| Email | `nelfsereno@gmail.com` |
| Telefone / WhatsApp | `(71) 99995-6042` → `https://wa.me/5571999956042` |
| GitHub | `github.com/DevManuelSereno` (@DevManuelSereno) |
| LinkedIn | `linkedin.com/in/manuelsereno` (@manuelsereno) |
| Instagram | `instagram.com/nelfsereno` (@nelfsereno) |

### Formação

| Curso | Instituição | Período |
|---|---|---|
| **Bacharelado em Ciência da Computação** — ✅ **concluído** | UNIFACS — Universidade Salvador | conclusão dez/2025 |
| Ensino Médio | Colégio Antônio Vieira — Salvador, BA | 2017 — 2021 |

> ⚠️ O site atual diz *"Curso o 8º semestre"* e *"Conclusão prevista dez/2025"*. **Ambos estão errados.** Ele se formou. Hoje é bacharel.

### Experiência profissional

**PASS** — nov/2025 até hoje
- Cargo formal: *Desenvolvedor Web*
- Função real: **Desenvolvedor Front-End**
- Stack de produção: **Next.js, TypeScript, Tailwind CSS, shadcn/ui**
- Trabalha muito com **consumo de APIs**
- Recentemente: responsável pela **cobertura de idiomas da plataforma, com i18n**
- ✅ Autorizado a citar o nome da empresa publicamente

**Praxis Empresa Júnior** — Salvador, BA
- Desenvolvedor Front-End Web: ago/2024 — **nov/2025** (encerrado)
- Assessor Comercial: ago/2024 — fev/2025

> ⚠️ O site atual diz *"Ago 2024 — Presente"* para a Praxis. **Está errado.** Ele saiu em nov/2025.

### Implicação crítica da stack da PASS

O site atual lista **TypeScript, Next.js e Tailwind CSS** na seção **"Em estudo"**.

Ele usa as três **em produção, todo dia, num emprego formal**. Além disso, o próprio site do portfólio é construído nelas.

Essa é a **maior perda de credibilidade do site inteiro**: ele está se desqualificando exatamente nas keywords pelas quais recruiters e clientes filtram. Corrigir isso é obrigatório.

O **i18n** é ainda mais valioso — internacionalização é competência incomum em perfil júnior, e hoje não aparece em lugar nenhum do site.

### Projetos

| # | Projeto | Ano | Stack | Natureza |
|---|---|---|---|---|
| 1 | **Giuliana Ragno PSI** | 2025 | Figma, TypeScript, React, UI/UX, Branding | Identidade visual + manual de marca + landing page para uma psicóloga. **⚠️ NÃO REMUNERADO** — ver abaixo |
| 2 | **Biblioteca Virtual** | 2025 | TypeScript, Next.js, Tailwind | Cadastro e gestão de livros e usuários |
| 3 | **Espaço Psi** | 2024 | HTML, CSS, JS | Projeto final do trainee da Praxis Jr. |
| 4 | **Hollow Knight — Silksong** | 2024 | HTML, CSS, JS | Fan page, atividade avaliativa do trainee |
| 5 | **Demanda Frontend Praxis** | 2024 | HTML, CSS, JS | Demanda de estudo do setor de front-end |

### 🔴 Restrição inegociável — projeto Giuliana Ragno

**O trabalho não foi remunerado.** O Manuel ofereceu de graça para montar portfólio. Depois, ela sugeriu que ele definisse um valor, mas não voltou ao assunto, e ele não quer cobrar.

**Portanto, em nenhum lugar do site pode aparecer:**
- ❌ A palavra "cliente" associada a ela
- ❌ "clientes atendidos", "clientes satisfeitos"
- ❌ Qualquer contagem de projetos entregues que insinue volume comercial
- ❌ Qualquer coisa que sugira histórico de freela pago

**O que pode e deve aparecer:** a descrição da entrega, do processo e do resultado. O trabalho não vale menos por não ter sido pago — foi um projeto real, para uma profissional real, com briefing real, entregue ponta a ponta. Só não pode receber rótulo comercial.

> 💡 **Ação recomendada:** pedir um depoimento a ela. Não custa nada, não reabre a conversa sobre dinheiro, e é o ativo que mais falta na página. Um parágrafo dela vale mais que qualquer adjetivo escrito pelo próprio Manuel.

### Objetivo

- ✅ **Já está empregado** (PASS, desde nov/2025). Buscar emprego **não** é urgente.
- ✅ **Quer continuar pegando freela.** Este é o objetivo ativo do site.
- ❌ **Não tem histórico de freela pago.** A copy não pode fingir que tem.

---

## 4. AUDITORIA — SEO

### 4.1 Bloqueadores técnicos

| # | Problema | Impacto | Onde |
|---|---|---|---|
| 1 | Sem `metadataBase` | URLs de OG e canonical resolvem como relativas → quebram | `app/layout.tsx` |
| 2 | Sem `alternates.canonical` | Risco de conteúdo duplicado | `app/layout.tsx` |
| 3 | Sem `robots.txt` | Nenhuma diretiva de rastreio | ausente |
| 4 | Sem `sitemap.xml` | Nenhum mapa de URLs | ausente |
| 5 | 🔴 **Sem imagem OpenGraph** | Compartilhar no WhatsApp/LinkedIn/Instagram gera **preview em branco**. Para um portfólio, essa é a maior perda isolada do site | `app/layout.tsx` |
| 6 | Sem Twitter Card | Idem, em X/Twitter | `app/layout.tsx` |
| 7 | ~~🔴 `generator: 'v0.app'`~~ **✅ RESOLVIDO (17/08/2026)** | Declarava literalmente no `<head>` que o site foi gerado por IA. Contradizia frontalmente o objetivo do projeto. Removido na origem — ver Fase 0 | `app/layout.tsx` |
| 8 | 🔴 **Sem favicon** | Os ícones existem em `/public`, mas o Next só auto-detecta em `app/`. **Resultado: o site não tem ícone nenhum hoje** | `public/` vs `app/` |
| 9 | ~~`images.unoptimized: true`~~ **✅ RESOLVIDO (17/08/2026)** | PNGs eram servidos crus, sem WebP/AVIF → LCP ruim → Core Web Vitals é fator de ranking confirmado. Removido; ganho medido de **−98%** no PNG de projeto (417 KB → 9 KB em WebP) | `next.config.mjs` |
| 10 | ~~`typescript.ignoreBuildErrors: true`~~ **✅ RESOLVIDO (17/08/2026)** | Erros de tipo chegavam em produção silenciosamente. Removido; `tsc --noEmit` e o build passam limpos | `next.config.mjs` |

### 4.2 Problemas de on-page

**O `<h1>` está desperdiçado.** Ele contém apenas *"Manuel Sereno"*. O sinal on-page mais forte da página inteira está gasto num nome que ninguém pesquisa. O cargo, que é a keyword real, está relegado ao `<h2>`.

**Só existe uma URL indexável.** A navegação é toda por âncora (`#inicio`, `#sobre`, `#projetos`…). Sem páginas separadas, não há cauda longa. O teto de SEO é estruturalmente baixo — uma URL rankeia bem para um tema, não para vários.

**🔴 Nenhum projeto tem link.** No arquivo de dados, o campo `href` dos projetos existe no tipo mas nunca é preenchido. O site não tem um único link de saída para repositório ou demo. Isso é ruim para SEO (zero link equity) e devastador para credibilidade: **um portfólio onde não dá para clicar no trabalho é um folheto.**

**Sem `hreflang`** — irrelevante hoje (só pt-BR), passa a importar quando o i18n entrar.

### 4.3 Comparação com o repositório de destino (17/08/2026)

Verificado em `src/app/layout.tsx` do `Site_Portfolio`. **O repo antigo tem mais metadata que o redesign** — isso é material a aproveitar no merge, não a descartar:

| Item | Redesign (origem) | `Site_Portfolio` (destino) |
|---|---|---|
| `openGraph.url` + `siteName` | ❌ | ✅ *(mas aponta para domínio inexistente)* |
| Twitter card `summary_large_image` | ❌ | ✅ *(sem imagem, então inerte)* |
| `robots: index, follow` | ❌ | ✅ |
| `authors` / `creator` / `publisher` | parcial | ✅ |
| **`metadataBase`** | ❌ | ❌ |
| **`alternates.canonical`** | ❌ | ❌ |
| **Imagem OG** | ❌ | ❌ |
| **JSON-LD / Schema.org** | ❌ | ❌ **(apesar do README afirmar que sim)** |

**Leitura:** nenhum dos dois resolve o essencial. O destino adianta `robots`, `siteName` e o twitter card; a Fase 0 continua necessária por inteiro.

---

## 5. AUDITORIA — GEO

*Objetivo: ser citado por ChatGPT, Perplexity, Claude e Google AI Overviews.*

| # | Problema | Por que importa |
|---|---|---|
| 1 | 🔴 **Zero dados estruturados** | Nenhum JSON-LD `Person`, `ProfilePage`, `WebSite` ou `CreativeWork`. Este é o principal fator de GEO — motores generativos e o AI Overviews se apoiam fortemente em dados de entidade |
| 2 | 🔴 **Sem `sameAs`** | Nada conecta a string "Manuel Sereno" ao grafo de identidade real (GitHub, LinkedIn). Para qualquer motor, ele é uma **entidade ambígua** |
| 3 | **A decoração de código polui a extração de texto** | Um crawler que lê o hero extrai literalmente `const desenvolvedor = { Manuel Sereno }`. O logo `{ MS }` e o comentário `// vamos construir algo juntos` fazem o mesmo em menor escala |
| 4 | **Nenhuma afirmação citável** | LLMs citam frases autocontidas e verificáveis. Não existe no corpo do site uma frase como *"Manuel Sereno é desenvolvedor front-end em Salvador que trabalha com React e Next.js"* |
| 5 | **Sem `dateModified`** | Nenhum sinal de frescor do conteúdo |
| 6 | **Zero números, zero resultados, zero nomes** | Pesquisa sobre GEO indica que estatísticas, citações e fatos concretos aumentam significativamente a taxa de citação por LLM |
| 7 | Sem `llms.txt` | Convenção emergente para orientar crawlers de IA. Custo quase zero |

---

## 6. AUDITORIA — AEO

*Objetivo: ocupar respostas diretas e "As pessoas também perguntam".*

| # | Problema |
|---|---|
| 1 | 🔴 **Nenhum heading é uma pergunta.** Todos são slogans declarativos: *"Apaixonado por tecnologia, movido por detalhes"*, *"Ferramentas que uso para construir a web"*. Bonitos e completamente irrecuperáveis por um motor de resposta |
| 2 | **Sem FAQ e sem schema `FAQPage`** |
| 3 | Contato não estruturado como `ContactPoint` |
| 4 | 🔴 **"Salvador, Bahia" aparece só no rodapé e na meta description.** Busca local é a briga mais ganhável dele e o site quase não a atende |
| 5 | **Nenhum parágrafo responde antes de enfeitar.** Toda seção enterra o fato debaixo de um slogan |

---

## 7. AUDITORIA — COPY

### 7.1 Está factualmente desatualizada

Hoje é **agosto de 2026**. O site diz:

- ❌ *"Curso o 8º semestre de Ciência da Computação"* → ele se formou
- ❌ *"Conclusão prevista dez/2025"* → passou
- ❌ *"Praxis — Ago 2024 — Presente"* → saiu em nov/2025
- ❌ Nenhum projeto de 2026 → **o site parece parado há um ano**
- ❌ PASS não aparece em lugar nenhum

### 7.2 Ele desqualifica as próprias keywords

Já detalhado na [seção 3](#implicação-crítica-da-stack-da-pass). A divisão **"Domínio / Em estudo"** inteira sinaliza insegurança e precisa acabar.

### 7.3 O "AI slop" — o diagnóstico real

Estas são as frases do site atual:

> *"Apaixonado por tecnologia, movido por detalhes"* · *"transformar paixão em carreira"* · *"soluções digitais de qualidade"* · *"projetos modernos e escaláveis"* · *"Construindo soluções digitais modernas e personalizadas"* · *"interfaces rápidas, acessíveis e centradas no usuário"*

**Nenhuma delas poderia ser provada falsa.**

Esse é o diagnóstico completo, e é mais útil que qualquer lista de palavras proibidas: **não é o vocabulário que denuncia texto de IA — é a ausência de compromisso com um fato.** Uma frase que nenhuma evidência poderia contradizer não carrega informação, e o leitor sente isso mesmo sem saber nomear.

### 7.4 Zero prova

*"Identidade visual, manual de marca e landing page profissional para uma psicóloga"* é boa matéria-prima, mas não tem resultado: quanto carregou, qual a nota no Lighthouse, o que a Giuliana achou, o que mudou para ela.

### 7.5 A decoração de código é o clichê mais datado do gênero

`const desenvolvedor = {` … `}` em volta do nome, logo `{ MS }`, comentário `// vamos construir algo juntos`.

É o trope de portfólio dev da era 2019–2021. O Manuel disse que o site antigo parecia datado — **esse elemento trouxe o problema junto para o redesign.** Também prejudica GEO, como visto na [seção 5](#5-auditoria--geo).

### 7.6 Registro inconsistente

Formal em *"Meu objetivo é consolidar minha carreira"* (tom de currículo) versus casual em *"Bora trocar uma ideia"*. Precisa escolher um.

### 7.7 O site não sabe para quem fala

*"Estou aberto a oportunidades, freelas e conversas sobre tecnologia e design"* tenta atender recruiter e cliente no mesmo parágrafo — **e não converte nenhum dos dois.** Este é o problema estrutural que a arquitetura da [seção 10](#10-arquitetura-final) resolve.

### 7.8 Outros

- A seção "Sobre" repete competências que já estão em "Habilidades" (HTML5, CSS3, JS ES6+, Figma)
- **HostGator** listado como competência — trabalho de painel de hospedagem sinaliza baixa alavancagem. Cortar
- *"Todos os direitos reservados"* no rodapé é boilerplate vazio

---

## 8. CALIBRAGEM DE EXPECTATIVAS E ESTIMATIVAS

> ⚠️ **Os números abaixo são estimativas fundamentadas, não dados medidos.** Nenhuma ferramenta de keyword research foi consultada. Premissas: subdomínio `.vercel.app`, sem construção de backlinks, mercado Salvador, pt-BR.

### 8.1 Volume real das buscas possíveis

| Query | Volume BR/mês (est.) | Competição | Chance real |
|---|---|---|---|
| "criar site para psicólogo" | 100–300 | Média | Boa — nicho, alta intenção |
| "criação de sites salvador" | 100–500 | **Alta** — agências com anos de autoridade | Baixa em 12 meses |
| "quanto custa um site" | Milhares | **Brutal** — Wix, Hostinger, agências | Quase nula |
| "desenvolvedor front-end salvador" | 10–50 | Baixa | Boa, mas volume irrisório |
| **"manuel sereno"** | Baixo, mas **é ele** | Nenhuma | **Garantida** |

### 8.2 A conclusão desconfortável

Um site pessoal novo, em subdomínio, no primeiro ano, realisticamente traz **dezenas de visitas orgânicas por mês, não centenas.** SEO puro talvez converta 1 a 3 leads no primeiro ano.

**Detalhe técnico relevante:** `vercel.app` está na *Public Suffix List*, então o Google trata o subdomínio como site independente. Ele **não herda autoridade da Vercel** — mas também não é contaminado por vizinhos ruins.

### 8.3 Onde o retorno real está — ordenado por ROI

| # | Alavanca | Impacto | Esforço | Por quê |
|---|---|---|---|---|
| 1 | **Imagem OG + favicon + metadata** | 🟩🟩🟩🟩🟩 | ~2h | Provavelmente **80% do tráfego real** é ele colando o link em algum lugar. Hoje o preview é uma caixa em branco |
| 2 | **Copy que converte + links dos projetos** | 🟩🟩🟩🟩🟩 | ~6h | Não adianta tráfego se a página não fecha |
| 3 | **Schema `Person` / entidade** | 🟩🟩🟩🟩 | ~2h | Busca pelo próprio nome é a de maior conversão e vai acontecer com certeza |
| 4 | **Case studies** | 🟩🟩🟩 | alto | Maior ganho de GEO, mas o custo é *escrita*, não código |
| 5 | Rankear keyword comercial disputada | 🟩 | altíssimo | Não se paga em 12 meses num subdomínio |

> **O achado mais valioso de toda a auditoria:** as linhas 1 a 3 valem mais que todo o resto somado, e custam cerca de 10 horas.

### 8.4 Comparação das estruturas consideradas

| Opção | URLs | Orgânico 6m | Orgânico 12m | GEO | Esforço dev | Escrita do Manuel |
|---|---|---|---|---|---|---|
| Landing única | 1 | 5–15/mês | 10–30/mês | 🟨 Baixa-média | ~6–10h | ~2h |
| **Landing + 2 cases** ✅ | 3 | 10–25/mês | 25–60/mês | 🟩 **Alta** | ~14–18h | **~4–6h** |
| Landing + /sobre | 2 | 8–20/mês | 15–40/mês | 🟨 Média-alta | ~8–12h | ~2–3h |
| Landing + 5 cases ❌ | 6 | 10–25/mês | 30–80 ⚠️ | 🟩 Alta *se* denso | ~24–30h | ~10–15h |
| `/curriculo` (adicional) | +1 | ~0 (proposital) | ~0 | — | +3–4h | ~1h |

**Por que 5 cases foi descartado:** Espaço Psi, Silksong e Demanda Frontend são projetos de trainee — sem cliente, sem prazo real, sem resultado. Não há matéria-prima para um case study honesto. **Cinco páginas rasas rankeiam pior que duas boas**, porque *thin content* é sinal negativo. Profundidade vence cobertura.

---

## 9. DECISÕES FECHADAS

| # | Decisão | Escolha | Razão |
|---|---|---|---|
| 1 | **Domínio** | Continuar em `.vercel.app` por ora | Domínio próprio virá no futuro. A URL fica **parametrizada em variável de ambiente**, então a migração é uma linha só |
| 2 | **Idioma** | Só **pt-BR** agora | i18n para outros locales fica para depois. **Estruturar o conteúdo de forma que a migração seja mecânica** — o Manuel faz i18n profissionalmente, então não vai sofrer com isso |
| 3 | **Objetivo** | **Híbrido, com prioridade real nos dois** | Ver seção 10 — os canais de entrada são disjuntos, então não há conflito |
| 4 | **Estrutura** | Landing + `/curriculo` + **2** case studies | Melhor relação ganho/esforço. 4 URLs |
| 5 | **Ordem das fases** | 0 → 1 → 3 → 2 | Ele já está empregado, então `/curriculo` deixou de ser urgente |
| 6 | **Posicionamento do H1** | **Sem recorte de público — só o serviço** | Escolha dele. Foca no diferencial design+código sem limitar tipo de cliente |
| 7 | **Vocabulário da copy** | **Legível para leigo** | Consequência da decisão 6 — ver seção 12.1 |

### 9.2 Decisões acrescentadas em 17/08/2026

| # | Decisão | Escolha | Razão |
|---|---|---|---|
| 8 | **Repositório de destino** | **`Site_Portfolio`** — o mesmo do deploy atual | Mantém o deploy, o histórico de commits e a URL. Ver seção 1 |
| 9 | **Natureza da migração** | 🔀 **Merge, não substituição** | Aproveitar o melhor dos dois lados. Ver seção 18 |
| 10 | **Seção Serviços** (nova, não estava no plano) | **Manter e reescrever a copy** | É a seção que mais serve ao objetivo freela — diz ao cliente o que ele pode comprar. A copy atual tem slop novo e vende SEO; entra na Fase 1 |
| 11 | **Níveis de proficiência** | **Remover `level` e `levelLabel`; acrescentar linha verificável no modal** | Os campos são **dados mortos** — nenhum componente os consome — e um número autoatribuído é inverificável, violando a regra 1 da seção 15 |
| 12 | **Links dos projetos** | **Cards viram clicáveis** | O Manuel vai fornecer os links. Resolve a affordance falsa (achado D, seção 17) |
| 13 | **Formulário de contato** | **Manter o do Resend + os links do novo design** | Já funciona no destino e converte melhor que "me manda um email". Precisa ser reestilizado para o design system |
| 14 | **Framer Motion** | **Decidir caso a caso no inventário** | Se houver animação boa no site antigo que valha manter, fica para ela; senão, sai |
| 15 | **Badge do hero** | **Manter "Disponível para novos projetos"** | Escolha do Manuel. **Custo aceito e registrado:** como ele está empregado na PASS, o badge fica ambíguo entre freela e vaga |
| 16 | **Decoração de código** | **Logo `{ MS }` fica. Hero fica por ora** | Ver a análise completa em 16.3, questão 9 |
| 17 | **Versão do Next no destino** | **Migrar 15.5.4 → 16** | Escolha do Manuel. Alinha destino e origem, evita manter código escrito para duas versões. Ver 11.1 |
| 18 | **Estrutura de pastas** | **Manter `src/app/`** | Escolha do Manuel. O redesign é que se adapta ao destino, não o contrário |

> **Emenda à decisão 1 (domínio).** O `layout.tsx` do repo antigo aponta `openGraph.url` para `https://manuelsereno.dev`. **O Manuel confirmou que não possui esse domínio** — era só planejado. A decisão 1 fica como está (`.vercel.app` + env var), e **essa URL precisa ser corrigida no merge**: publicar apontando para um domínio de terceiros é pior que não ter OG nenhum.

### 9.1 A decisão-chave: por que dá para priorizar os dois públicos

Esta foi a descoberta que destravou o plano. Os dois públicos **chegam por canais completamente diferentes**:

| Público | Como chega | Precisa de SEO? |
|---|---|---|
| Recruiter / tech lead | Link direto: LinkedIn, candidatura, assinatura de email, QR no currículo | ❌ **Não.** Nunca chega por busca |
| Cliente / freela | Busca no Google, ChatGPT, bio do Instagram, indicação | ✅ **Sim.** É todo o tráfego dele |

**O cliente chega por busca, e busca cai na raiz. O recruiter chega por link colado, e não liga para qual é a URL.**

Logo, cada um pode ser prioridade total no seu próprio endereço. Não é um meio-termo — é roteamento por canal.

**O site de hoje não falha por ter dois públicos. Falha por colocar os dois no mesmo parágrafo.**

**Único vazamento:** recruiter que googla o nome dele cai em `/`. Resolve-se com uma linha discreta no topo — *"É recrutador? Veja meu perfil técnico →"*. Custo: 10 minutos.

---

## 10. ARQUITETURA FINAL

```
/                              → Cliente / freela  ✅ CONFIRMADA
                                 Dono da raiz. Otimizado para busca.
                                 Schema: WebSite + Person + ProfessionalService

/curriculo                     → Recruiter / tech lead   ⚠️ "TALVEZ"
                                 Link colado no LinkedIn. Zero SEO.
                                 Schema: ProfilePage + Person

/projetos/giuliana-ragno       → Case study (Fase 3)     ⚠️ "TALVEZ"
/projetos/biblioteca-virtual   → Case study (Fase 3)     ⚠️ "TALVEZ"
                                 Schema: CreativeWork
```

> **Atualização 17/08/2026.** Só a raiz está confirmada. `/curriculo` foi rebaixada a decisão em aberto pelo Manuel (16.3, questão 11), e os case studies dependem de conteúdo que ainda não existe. **Nada disso bloqueia as Fases 0 e 1** — mas o `sitemap.ts` deve nascer só com `/` e ganhar as outras rotas quando cada uma for confirmada.

Os outros 3 projetos (Espaço Psi, Silksong, Demanda Frontend) continuam como **cards na home, sem página própria**.

### 10.1 Seções da home — ordem real (17/08/2026)

O redesign acrescentou **Serviços**, que não existia no plano original. A numeração visível hoje é:

```
Hero · 01 Sobre · 02 Habilidades · 03 Serviços · 04 Projetos · 05 Contato
```

Confirmada pela decisão 10. Qualquer seção nova entra continuando essa numeração (regra do *Section Eyebrow*, no `DESIGN.md`).

---

## 11. FASE 0 — BASE TÉCNICA

**~3h · Não depende de nenhuma decisão de conteúdo · Maior ROI do projeto inteiro**

> 🔴 **Todos os caminhos abaixo ganham o prefixo `src/` no repositório de destino** (decisão 18). `lib/site-config.ts` → `src/lib/site-config.ts`, `app/layout.tsx` → `src/app/layout.tsx`, e assim por diante.
>
> ⚠️ **Ao mexer no `layout.tsx` do destino, corrija `openGraph.url`** — hoje aponta para `manuelsereno.dev`, domínio que o Manuel **não possui**. Substituir pelo valor vindo de `site-config.ts`.
>
> ⚠️ **A migração para o Next 16 (11.1) vem ANTES da Fase 0.** Não faz sentido escrever `sitemap.ts` e `opengraph-image.tsx` na API da 15 para reescrever depois.

### 11.1 Migração Next 15.5.4 → 16 (decisão 17)

> **Fonte:** `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`, na versão 16.3.1 instalada na origem. **Não use conhecimento de memória sobre o Next 16 — leia esse arquivo.** É o que o `AGENTS.md` deste projeto exige.

#### O reenquadramento que barateia tudo

O guia de upgrade é longo, mas **a maior parte não se aplica aqui**. A razão: o merge **substitui praticamente todo o front-end** pelo redesign, que já é escrito para o Next 16 e compila limpo (`tsc --noEmit` sem erros).

**As breaking changes só ameaçam o código que SOBREVIVE do repo antigo** — e essa lista é curta e conhecida (seção 18.2):

| Sobrevive do antigo | Risco na migração |
|---|---|
| **Rota de API do Resend** | 🔴 **Alto** — ver Async Request APIs abaixo |
| `eslint.config.mjs` | 🟢 Baixo — já é flat config, que virou o padrão na 16 |
| Campos de metadata (`robots`, `siteName`, twitter card) | 🟢 Nenhum — a API de metadata não mudou |

#### Checklist de migração

| # | Item | Ação | Verificar |
|---|---|---|---|
| 1 | **TypeScript 5.0** | 🔴 **Abaixo do mínimo.** A 16 exige **≥ 5.1**. Subir para 5.7+ (igual à origem) | `package.json` |
| 2 | **Node.js** | Mínimo passa a ser **20.9**. A Vercel resolve no deploy; confirme o local | `node -v` |
| 3 | **Async Request APIs** | 🔴 **Acesso síncrono a `headers()`, `cookies()`, `params`, `searchParams` foi REMOVIDO.** O rate limit do Resend quase certamente lê `headers()` para pegar o IP | `src/app/api/**/route.ts` |
| 4 | **`next lint` removido** | Se `package.json` tiver `"lint": "next lint"`, quebra. `next build` também não roda mais lint | `package.json` |
| 5 | **Turbopack por padrão** | Vale para `dev` **e** `build`. 🔴 **Se houver config custom de webpack, o build FALHA.** Saídas: migrar a config, ou usar `next build --webpack` | `next.config.*` |
| 6 | **`scroll-behavior`** | ⚠️ **Relevante para este site.** A 16 **não sobrescreve mais** `scroll-behavior` durante navegação. Como o site é todo de âncoras com rolagem suave, adicionar `data-scroll-behavior="smooth"` no `<html>` | `src/app/layout.tsx` |
| 7 | **`images.qualities`** | Padrão vira **só `[75]`**. Qualquer `<Image quality={90}>` é coagido para 75 | busca por `quality=` |
| 8 | **`images.minimumCacheTTL`** | Padrão sobe de 60s para **4h**. Provavelmente desejável aqui | — |
| 9 | **`imageSizes`** | O valor `16` saiu do array padrão | — |
| 10 | **Saída do `next build`** | `size` e `First Load JS` foram removidos. **Medir performance por Lighthouse**, não pelo log do build | — |
| 11 | **React 19.2 (canary)** | Confirmar Framer Motion 12 e Radix. Só importa para o que sobreviver do antigo | — |

#### Comandos

```bash
pnpm dlx @next/codemod@canary upgrade latest
```

O codemod resolve config do Turbopack, `next lint` → ESLint CLI, `middleware` → `proxy` e remoção de prefixos `unstable_`. **Ele não cobre as Async Request APIs** — para isso:

```bash
npx @next/codemod@canary next-async-request-api .
```

Gate de verificação, que não depende do build:

```bash
npx tsc --noEmit -p tsconfig.json
```

#### Não se aplica a este projeto

`middleware` → `proxy` (não há middleware) · PPR / `cacheComponents` · `revalidateTag` / `updateTag` · AMP · `serverRuntimeConfig` · rotas paralelas · `next/legacy/image`. **Confirmar ao clonar** — nenhum destes foi verificado no destino.

#### ⚠️ Ao escrever os arquivos da Fase 0, use a API da 16

Em `opengraph-image` e `sitemap`, `params` e `id` agora são **Promises**. Para a home não há segmento dinâmico, então não há `params` — mas se os case studies virarem `/projetos/[slug]`, isso passa a valer:

```tsx
export default async function Image({ params }) {
  const { slug } = await params   // Promise na 16
}
```

#### 🔴 O que não deu para verificar

Sem o repositório clonado localmente, **não foi possível checar**: os scripts do `package.json`, existência de config custom de webpack, o código da rota do Resend, e se há `middleware`. Os itens 3, 4 e 5 do checklist são **os de maior risco e são exatamente os não verificados.**

| Arquivo (sugestão) | Objetivo |
|---|---|
| `lib/site-config.ts` | **Novo.** Centralizar a URL do site em `NEXT_PUBLIC_SITE_URL`, com fallback para o `.vercel.app`. Todo o resto (canonical, sitemap, OG, JSON-LD) consome daqui. Trocar de domínio vira alterar uma env var |
| `app/layout.tsx` | Adicionar `metadataBase`, `alternates.canonical`, `openGraph` completo (`images`, `url`, `siteName`, `locale`), `twitter.card`, diretivas `robots`. ~~**🔴 Remover `generator: 'v0.app'`**~~ **✅ já feito na origem.** `icons` **não é necessário** — ver nota dos ícones abaixo |
| `app/opengraph-image.tsx` | **Novo.** Gerar a imagem OG via `next/og` (`ImageResponse`) — sem asset externo, nunca sai de sincronia com o conteúdo |
| `app/icon.svg`<br>`app/apple-icon.png` | ~~**Mover de `/public` para `app/`.**~~ **✅ JÁ FEITO no projeto de origem — ver nota abaixo.** O Next só auto-detecta ícones em `app/`. É exatamente por isso que o site não tinha favicon |
| `app/robots.ts` | **Novo.** Permitir rastreio, apontar o sitemap |
| `app/sitemap.ts` | **Novo.** Já preparado para as rotas das fases seguintes |
| `components/json-ld.tsx` | **Novo.** Schema `Person` + `WebSite`, com `sameAs` apontando para GitHub, LinkedIn e Instagram, e `address`/`areaServed` carregando o sinal de Salvador |
| `public/llms.txt` | **Novo.** Opcional, custo quase zero |
| `next.config.mjs` | ~~Remover `images.unoptimized`. Tentar remover `typescript.ignoreBuildErrors`~~ **✅ AMBOS JÁ REMOVIDOS na origem e validados — ver nota abaixo.** O arquivo hoje é `const nextConfig = {}` |

> **Nota sobre os ícones (17/08/2026) — item já concluído na origem.** A linha `app/icon.svg` / `app/apple-icon.png` **já foi executada** em `D:\personal`. Não refaça do zero: **copie os arquivos**. O que existe hoje:
>
> | Arquivo | O quê |
> |---|---|
> | `app/icon.svg` | Vetor, 1,4 KB, `viewBox 0 0 512 512` |
> | `app/favicon.ico` | Multi-tamanho: 16 / 32 / 48 |
> | `app/apple-icon.png` | 180×180, full-bleed (iOS aplica a própria máscara) |
> | `public/icon-192.png`<br>`public/icon-512.png` | Android / PWA, referenciados pelo manifest |
> | `public/site.webmanifest` | Nome, `theme_color`, ícones `any` + `maskable` |
> | `app/layout.tsx` | `manifest: '/site.webmanifest'` declarado |
>
> **Três ressalvas que mudam a execução:**
>
> 1. **Não foi "mover", foi criar.** O `icon.svg` é um vetor construído do zero (a fonte era só PNG). Os arquivos antigos de `/public` já foram removidos — não há nada sobrando para mover.
> 2. **O frame de 16px do `.ico` é uma arte diferente** dos de 32/48: só "MS", sem as chaves, porque o mark completo vira mingau nesse tamanho. É escolha deliberada, não inconsistência — preserve ao copiar.
> 3. **Não é preciso adicionar `icons` ao objeto `metadata`** (contrariando o que a linha de `app/layout.tsx` acima sugere). O Next auto-detecta pelos nomes de arquivo em `app/` e gera as tags sozinho. Confirmado no HTML de build: `<link rel="icon" href="/favicon.ico">`, `<link rel="icon" href="/icon.svg" sizes="any">`, `<link rel="apple-touch-icon" sizes="180x180">`.
>
> **Também já feito (17/08/2026):** o 🔴 **`generator: 'v0.app'`** foi removido de `app/layout.tsx`. Confirmado no HTML de build: **zero** ocorrências de `<meta name="generator">` e zero de `v0.app`; `title`, `description`, `keywords`, `author`, `manifest` e `icon` seguem presentes.
>
> Nota de escopo: este item estava listado na auditoria de SEO (seção 4.1, nº 7), mas **não é um item de SEO** — `meta generator` não é fator de ranqueamento. A justificativa registrada no próprio documento é de posicionamento ("contradiz frontalmente o objetivo do projeto"), e é essa que vale. Não espere efeito em métrica de busca.
>
> **Rastros do v0 que permanecem** (nenhum é servido ao visitante, só aparecem em repositório público): as 5 linhas de `# v0 sandbox internal files` no `.gitignore` e o arquivo `v0 - mudanças pendentes.md` na raiz. Ambos são inertes e ficaram para trás de propósito — não foram levados para o repositório do site.

> **Nota sobre `next.config.mjs` (17/08/2026) — item concluído e validado na origem.** Os dois flags eram padrões injetados pelo v0, não escolhas: `ignoreBuildErrors` para o preview dele compilar mesmo com erro de tipo no meio da geração, e `images.unoptimized` porque o sandbox do v0 não roda o otimizador de imagem. Ambos foram removidos e o arquivo hoje é apenas `const nextConfig = {}`.
>
> **`typescript.ignoreBuildErrors` — removido.** Esse flag é mais perigoso do que parece: com ele ligado, **`pnpm build` passa mesmo havendo erros de tipo** (o log mostra `Skipping validation of types`). Isso enganou uma implementação nesta codebase, onde o build tinha sido adotado como rede de segurança de tipo e não era. Após a remoção, o log passou a mostrar `Running TypeScript ... Finished TypeScript` e o build passa. Gate confiável para checar antes, sem depender do build:
>
> ```bash
> npx tsc --noEmit -p tsconfig.json
> ```
>
> **`images.unoptimized` — removido, com uma armadilha desarmada.** A suspeita era que a otimização quebraria os logos em SVG, já que o otimizador do Next **rejeita SVG por padrão** (confirmado: requisição direta ao endpoint retorna **400**). Não quebra — o `next/image` detecta SVG e **desvia do otimizador sozinho**, emitindo caminho direto. Medido na home em build de produção:
>
> | | Resultado |
> |---|---|
> | Total de `<img>` na home | 41 |
> | Passando pelo otimizador | **5** (só os PNGs de projeto) |
> | Logos SVG | caminho direto, `200`, `image/svg+xml` |
> | PNG de projeto | `200`, convertido para `image/webp` |
> | **Ganho medido** | **417.713 → 9.368 bytes (−98%)** num único PNG |
>
> Como são 5 PNGs pesados na home, esse é o item de maior impacto real em LCP de toda a Fase 0.
>
> ⚠️ **No repositório de destino, reconfirme antes de assumir.** A validação acima é desta codebase. Se lá houver `output: 'export'`, imagens de domínio externo, ou uso de `next/image` com SVG por caminho diferente, o resultado pode mudar.

### Nota sobre i18n futuro

Ao escrever os metadados, deixar espaço para `alternates.languages`. Ao estruturar o conteúdo, **manter as strings separadas dos componentes** para que a migração para `next-intl` (ou equivalente) seja mecânica.

---

## 12. FASE 1 — COPY DA HOME

**~6h · Esta copy foi revisada e aprovada pelo Manuel**

### 12.1 Nota sobre vocabulário

Como o posicionamento não tem recorte de público (decisão 6), a copy precisa ser **legível por leigo**. Jargão como *"do Figma ao deploy"* funciona para dev e recruiter, mas é ininteligível para uma psicóloga ou um dentista — que é quem paga. Foi trocado por *"do primeiro rascunho ao site no ar"*.

### 12.2 Hero

> ⬤ Agenda aberta para novos projetos
>
> # Sites e identidade visual, do primeiro rascunho ao site no ar.
>
> Sou Manuel Sereno, desenvolvedor front-end e designer em Salvador. Faço a marca, a interface e o código — a entrega inteira, com uma pessoa só.
>
> `[Falar no WhatsApp]` `[Ver projetos]`

**Mudanças estruturais:**
- ~~🔴 **Sai** `const desenvolvedor = {`, o `}` de fechamento, e o logo `{ MS }`~~ → **REVISADO 17/08/2026, ver abaixo**
- O `<h1>` passa a carregar o **serviço**, não o nome. O nome vive no `<title>`, no schema `Person` e no rodapé — que é onde ele já funciona
- **Salvador migrou do H1 para a linha de apoio.** Continua indexável, sem estreitar a proposta
- ~~O badge mudou para *"Agenda aberta para novos projetos"*~~ → **REVERTIDO.** Decisão 15: fica **"Disponível para novos projetos"**
- CTA primário vira **WhatsApp** (era `#contato`)

> **Revisão da decoração de código (17/08/2026).** O Manuel decidiu:
>
> | Elemento | Decisão |
> |---|---|
> | Logo `{ MS }` no nav | ✅ **Fica.** Ele prefere ao logo anterior |
> | `const desenvolvedor = {` … `}` no hero | ⏸ **Fica por enquanto**, registrado como pendência aberta (16.3, questão 9) |
> | `// vamos construir algo juntos` no contato | ❓ **Não decidido** — confirmar se segue a mesma regra do hero |
>
> **Razão dele:** a reclamação original de "datado" era sobre o site antigo ser feio no conjunto; no novo design, ele achou o `const` charmoso. Reconheceu o argumento contrário e preferiu registrar em aberto a decidir sob dúvida.
>
> **Mitigação importante — o risco é menor do que a seção 5 sugere.** Quando o JSON-LD `Person` entrar na Fase 0, o schema vai declarar `"name": "Manuel Sereno"` de forma limpa e inequívoca. Motores generativos priorizam dados estruturados para resolver entidade, então **o schema neutraliza a maior parte do dano de GEO**. O que sobra é estético, e é escolha do dono.
>
> **No logo, o argumento é ainda mais fraco:** num logo, chaves são lidas como monograma; num parágrafo, como jargão. Um logo não é extraído como prosa por LLM. Manter `{ MS }` não tem custo real de GEO.

**Variantes de H1 consideradas** (registradas caso ele mude de ideia):

| | H1 | Lê bem para |
|---|---|---|
| **A** ✅ | Sites e identidade visual, do primeiro rascunho ao site no ar. | Cliente leigo ✅ · Dev ✅ |
| B | Sites e identidade visual, do Figma ao deploy. | Dev ✅ · Cliente ❌ |
| C | Eu desenho e eu programo. É o mesmo site e a mesma pessoa. | Cliente ✅ · Menos keyword |

### 12.3 Sobre

> ## Design e código não são duas etapas.
>
> Sou Manuel Sereno, desenvolvedor front-end e designer em Salvador, Bahia.
>
> Sou bacharel em Ciência da Computação pela UNIFACS e trabalho como desenvolvedor front-end na **PASS**, onde construo interfaces em Next.js, TypeScript e Tailwind, integro APIs e cuido da cobertura de idiomas da plataforma com i18n.
>
> Antes disso, passei um ano e três meses na **Praxis Empresa Júnior** — onde aprendi a lidar com briefing, prazo e cliente de verdade, não com projeto de aula.
>
> O que me diferencia é não parar no código. Desenho a identidade e a interface no Figma antes de escrever a primeira linha, o que significa que você não precisa contratar um designer, um desenvolvedor, e mais alguém para fazer os dois conversarem.

> 💡 O primeiro parágrafo existe deliberadamente para **AEO/GEO**: é uma frase autocontida que responde *"quem é Manuel Sereno"* e pode ser citada isolada por um LLM.

### 12.4 Habilidades

🔴 **Acaba a divisão "Domínio / Em estudo".**

> **Revisão 17/08/2026 — o redesign já reconstruiu esta seção.** A proposta original (três grupos rotulados) foi **superada**: hoje a seção é uma grade de cards com logo, cada card abrindo um modal que explica a tecnologia em linguagem para leigo. Isso é melhor do que o plano previa e **fica**.
>
> O que muda, pela decisão 11:
>
> | Campo em `portfolio-data.ts` | Ação |
> |---|---|
> | `level` (número 0–100) | 🔴 **Remover.** Dado morto — nenhum componente consome — e inverificável |
> | `levelLabel` (Avançado/Intermediário/Básico) | 🔴 **Remover.** Mesma razão |
> | `learning` (booleano) | 🔴 **Remover.** Hoje só afeta a ordem da esteira; definir a ordem explicitamente |
> | `category` | ⚠️ **Remover se não for usar.** Também está morto hoje |
> | **`context`** *(novo)* | ✅ **Adicionar.** Uma linha factual e verificável, exibida no modal |
> | `summary` · `commonUses` | ✅ **Manter.** É a melhor copy do site hoje — leiga, concreta, sem slop |
>
> **Derivados a ajustar:** `coreSkills` e `learningSkills` deixam de existir; `skillMarquee` passa a derivar de `allSkills` com ordem explícita.

**Mapeamento proposto do campo `context`** — ⚠️ **derivado dos fatos da seção 3, mas NÃO confirmado pelo Manuel. Confirmar antes de implementar:**

| Tecnologia | `context` proposto |
|---|---|
| React · TypeScript · Next.js · Tailwind | `Uso na PASS, em produção` |
| HTML5 · CSS3/SCSS · JavaScript | `Uso desde a Praxis Jr.` |
| Figma | `Usei na identidade da Giuliana Ragno` |
| Git / GitHub | `Uso no dia a dia` |
| Node.js · SQL · Python | `Estudando` |

**Por que isto é melhor que o número:** é falsificável, respeita a regra 1 da seção 15, diferencia React de Python sem inventar escala, e **para de desqualificar a stack que ele usa em produção** — o problema descrito em 7.2.

**Cortar:** HostGator (ainda presente no texto da seção Sobre).

### 12.5 Projetos

> ## O que eu já coloquei no ar.

**Giuliana Ragno PSI** — reescrito sem qualquer insinuação comercial:

> Identidade visual completa, manual de marca e landing page para a psicóloga Giuliana Ragno. Desenhei a marca no Figma e desenvolvi o site em React e TypeScript — do primeiro rascunho ao deploy.

🔴 **Todo projeto precisa de link** (repositório e/ou site no ar). Ver pendência 16.1.

> **Decisão 12 (17/08/2026) — cards viram clicáveis.** Hoje o card tem seta `ArrowUpRight` com hover animado e **não é link**: `Project.href` existe no tipo e nunca é preenchido. É affordance falsa e nada é focável por teclado (achado D, seção 17).
>
> **Tabela para o Manuel preencher — bloqueia a Fase 1:**
>
> | Projeto | Site no ar | Repositório |
> |---|---|---|
> | Giuliana Ragno PSI | `_______` | `_______` |
> | Biblioteca Virtual | `_______` | `_______` |
> | Espaço Psi | `_______` | `_______` |
> | Hollow Knight — Silksong | `_______` | `_______` |
> | Demanda Frontend Praxis | `_______` | `_______` |
> | *(projetos de 2026 — ver 16.1)* | `_______` | `_______` |
>
> Se algum projeto não tiver link nenhum, **esse card perde a seta e o hover** — não finge ser clicável.

### 12.6 Contato

> ## Tem um projeto em mente?
>
> Me manda uma mensagem contando o que você precisa. Respondo em até 24h — e se não for algo que eu faça bem, eu te digo, e indico quem faz.

- ❓ ~~🔴 **Sai** o comentário `// vamos construir algo juntos`~~ → **NÃO DECIDIDO.** Ver 16.3, questão 9
- A última cláusula é um movimento de confiança deliberado, e é o oposto exato de texto genérico

> **Decisão 13 (17/08/2026) — o formulário fica.** O repositório de destino tem formulário funcionando com **Resend + rate limit de 3 envios por 15 minutos**. O redesign tem só links. **Ficam os dois:** formulário para quem quer resolver ali, links para quem prefere WhatsApp ou email.
>
> **Cuidados na implementação:**
> - O formulário precisa ser **reestilizado para o design system** antes de entrar. O `DESIGN.md` tem regra explícita sobre isso ("Don't usar um componente do shadcn com a estética padrão dele")
> - Os campos vêm via `npx shadcn add input textarea label form`, e o destino usa **Radix**, então confira compatibilidade antes de misturar com `@base-ui/react`
> - **Preservar o rate limit.** É proteção contra abuso do endpoint de email, não enfeite
> - A chave da API do Resend é segredo de ambiente — nunca commitar

### 12.7 Rodapé

- Cortar *"Todos os direitos reservados"*
- Manter localidade (sinal de SEO local)
- Manter *"Desenhado & desenvolvido por Manuel Sereno"* — aqui é verdade e reforça o diferencial

### 12.8 Serviços — reescrita (seção nova, decisão 10)

A seção não existia quando este plano foi escrito, então nunca passou por auditoria de copy. Ela **entrou já com slop**: *"traduzem a ideia em experiência"*, *"foco em performance e **conversão**"* (nenhum dado de conversão existe) e **"SEO"** como entregável, num site que não tem `metadataBase`, sitemap, robots, OG nem schema.

⚠️ **Proposta abaixo NÃO aprovada pelo Manuel — revisar antes de implementar.**

| # | Título | Descrição proposta | Entregáveis |
|---|---|---|---|
| 1 | **Desenvolvimento Front-End** | Interfaces em React, Next.js e TypeScript — a mesma stack que uso todo dia na PASS. Inclui integração com APIs e o site funcionando bem no celular. | React & Next.js · TypeScript · Integração de APIs · Responsivo |
| 2 | **Design de Interface** | Desenho a tela no Figma antes de escrever código. Você vê e aprova o layout antes de existir uma linha de programação — o que evita retrabalho caro depois. | Figma · Protótipo navegável · Design system |
| 3 | **Sites e Landing Pages** | Site institucional ou página de divulgação, do primeiro rascunho ao endereço no ar. Marca, layout, código e publicação — tudo comigo. | Do rascunho ao ar · Deploy na Vercel |
| 4 | **Internacionalização (i18n)** | Deixar o site ou a plataforma em mais de um idioma. É o que faço hoje na PASS, onde cuido da cobertura de idiomas do produto. | i18n · Múltiplos idiomas |

**O que saiu e por quê:**

| Removido | Razão |
|---|---|
| *"traduzem a ideia em experiência"* | Slop — não é falsificável (regra 1, seção 15) |
| *"foco em performance e conversão"* | Nenhum dado de conversão existe (regra 2) |
| **"SEO"** como entregável | 🔴 O site que vende SEO não tem SEO. **Pode voltar depois da Fase 0** — aí o próprio site vira a prova |

> 💡 O serviço 4 é o mais forte dos quatro: é específico, é raro num perfil júnior, e é verificável no emprego atual. Considere promovê-lo na ordem visual.

---

## 13. FASE 3 — CASE STUDIES E FAQ

**~8h de dev + escrita do Manuel**

### 13.1 Case studies

`/projetos/giuliana-ragno` e `/projetos/biblioteca-virtual`, com schema `CreativeWork`.

**Estrutura de cada case:**
1. Contexto — quem é, que problema tinha
2. O que foi entregue
3. Decisões de design e técnicas (e **por quê**)
4. Resultado — o que mudou, números se houver
5. Link para o site no ar e/ou repositório

> ⚠️ **O custo real aqui não é código, é escrita.** As decisões, os problemas e os resultados só existem na cabeça do Manuel. Quem executar o plano pode estruturar e rascunhar, mas **não pode inventar o conteúdo.**

### 13.2 FAQ com schema `FAQPage` — ⚠️ EXISTÊNCIA EM ABERTO

> **Revisão 17/08/2026.** O Manuel **não decidiu se quer um FAQ**. A dúvida dele, nas palavras dele: *"do ponto de vista de SEO/GEO/AEO é bom ter, mas não sei se eu como um dev, e uma página de portfólio, faz sentido ter um FAQ."*
>
> **A dúvida é legítima e o trade-off é real:**
>
> | A favor | Contra |
> |---|---|
> | É o **principal ativo de AEO** do site — sem ele, AEO fica próximo de zero | FAQ é convenção de site de serviço, não de portfólio de dev |
> | A seção Serviços já existe (decisão 10) e **FAQ combina naturalmente com venda** | Pode fazer a página parecer de agência, não de pessoa |
> | "Quanto custa" é a pergunta mais buscada do nicho | Exige decidir preço e prazo — que ele ainda não tem (16.3, questão 7) |
>
> **Observação factual, não recomendação:** a seção Serviços foi mantida, e Serviços sem FAQ deixa o cliente com as perguntas de sempre sem resposta. As duas decisões são coerentes entre si — se uma cair, a outra fica mais fraca.
>
> Enquanto não decidir: **as perguntas abaixo ficam registradas, não implementadas.**

As perguntas que um cliente de verdade faz:

- Quanto custa um site?
- Quanto tempo leva para ficar pronto?
- Você faz só o design ou também o desenvolvimento?
- Consigo editar o site depois, sozinho?
- O domínio e a hospedagem ficam no meu nome?
- **Que tipo de projeto você pega?** *(substituiu "Você atende só profissionais liberais?" após a decisão 6)*
- Você atende fora de Salvador? *(carrega o sinal local que saiu do H1)*

Este bloco é o principal ativo de **AEO** do site.

---

## 14. FASE 2 — /CURRICULO

**~4h · Executar por último · ⚠️ EXISTÊNCIA EM ABERTO (17/08/2026)**

> O Manuel rebaixou esta página a **"talvez, decidir depois"**. Não bloqueia nada — as Fases 0 e 1 são indiferentes a ela.
>
> **Consequência registrada:** sem `/curriculo`, o problema 7.7 ("o site não sabe para quem fala") **volta**. A home passa a servir recruiter e cliente de novo — e a decisão 15 (manter o badge ambíguo "Disponível para novos projetos") reforça isso, porque não filtra público na entrada.
>
> Isso é **coerente**, não contraditório: ele escolheu deliberadamente uma home que atende os dois. O que o plano registra é o custo — nenhum dos dois públicos recebe uma página feita sob medida.

Página densa para recruiter e tech lead. **Sem otimização para busca** — ela nunca precisa rankear.

**Conteúdo:**
- Trajetória completa, com datas corretas (seção 3)
- Stack sem ressalvas, com contexto de onde cada coisa é usada
- Links de repositório em destaque — o tech lead vai ler o código
- Praxis Jr. explorada de verdade: cliente real, prazo real, trabalho em equipe. Hoje esse ativo está subaproveitado
- Currículo em PDF para download
- CTA: LinkedIn + email. **WhatsApp não aparece** — recruiter não chama no zap

**Schema:** `ProfilePage` + `Person`
**Na home:** link discreto no topo — *"É recrutador? Veja meu perfil técnico →"*

---

## 15. REGRAS PERMANENTES DE COPY

> Valem para qualquer texto novo escrito para este site, em qualquer fase, por qualquer pessoa.

### ✅ Fazer

1. **Toda afirmação precisa ser falsificável.** Se nenhuma evidência no mundo poderia contradizer a frase, ela não carrega informação — corte ou troque por um fato.
2. **Responder antes de enfeitar.** Cada seção começa pelo fato; o slogan vem depois, se vier.
3. **Nomear coisas.** "Next.js na PASS" vence "tecnologias modernas". "Giuliana Ragno" vence "uma cliente".
4. **Frases autocontidas** em pontos-chave — é o que um LLM consegue extrair e citar.
5. **Vocabulário legível por leigo** na home. Jargão só em `/curriculo`.

### ❌ Nunca

1. **Nunca** chamar a Giuliana de cliente, nem sugerir freela pago. Ver [seção 3](#-restrição-inegociável--projeto-giuliana-ragno).
2. **Nunca** inventar métrica, número, prazo ou depoimento.
3. **Nunca** listar como "em estudo" algo que ele usa em produção.
4. **Nunca** usar: *"soluções digitais de qualidade"*, *"projetos modernos e escaláveis"*, *"apaixonado por tecnologia"*, *"centrado no usuário"* sem prova, *"transformar ideias em realidade"*.
5. ⚠️ **REESCRITA EM 17/08/2026** — ver abaixo.
6. **Nunca** preencher lacuna com suposição. Se falta informação, **perguntar** — está na seção 16.
7. **Nunca** vender como serviço algo que o próprio site não demonstra. Foi o caso de "SEO" na seção Serviços (12.8).
8. **Nunca** atribuir número autoavaliado a uma competência. Use contexto verificável — onde foi usada, em que projeto (decisão 11).

> **Regra 5 — versão vigente (substitui a anterior).**
>
> A regra dizia *"nunca reintroduzir decoração de sintaxe de código (`const x = {`, `{ MS }`, `// comentário`)"*. Ela **conflitava frontalmente** com a "Regra da Legenda" do `DESIGN.md:157`, que canonizou esses mesmos elementos como parte do design system. Dois documentos fonte-da-verdade apontando para lados opostos travariam qualquer implementação.
>
> **Resolvido pelo Manuel (decisão 16). Nova redação:**
>
> > **5.** A decoração de sintaxe de código existente — logo `{ MS }` e o `const desenvolvedor = {` do hero — **está autorizada e não deve ser removida sem decisão explícita do dono**. Mas **não crie novas ocorrências**: nenhum elemento novo de copy pode usar sintaxe de código como ornamento. O inventário atual é o teto, não o piso.
>
> **`DESIGN.md:157` não precisa mais ser alterado** — os dois documentos passam a concordar.
>
> **Pendência ligada:** o `// vamos construir algo juntos` da seção Contato não foi decidido (16.3, questão 9).

---

## 16. PENDÊNCIAS E QUESTÕES EM ABERTO

### 16.1 Bloqueiam as Fases 1 e 3

| # | Pendência | Bloqueia | Status |
|---|---|---|---|
| 1 | **Links dos projetos** — repositório e/ou site no ar. **Tabela para preencher em [12.5](#125-projetos)** | Fase 1 (credibilidade) e Fase 3. Agora também o achado D | ⏸ Adiado pelo Manuel |
| 2 | **Projetos de 2026** — ele fez, mas não detalhou | Fase 1 — sem isso o site parece parado há um ano | ⏸ Adiado pelo Manuel |
| 3 | **Conteúdo dos 2 case studies** — contexto, decisões, resultados | Fase 3, se ela existir | ⏸ Não iniciado |
| 3b | 🔴 **Completar o inventário do merge** — exige o `Site_Portfolio` **clonado localmente**. A inspeção remota do GitHub não lista os arquivos dentro de `src/` | Toda a migração. Ver [18.1](#181--limite-deste-inventário) | ⏸ Bloqueado por acesso local |

### 16.2 Recomendadas, não bloqueantes

| # | Item | Por quê |
|---|---|---|
| 4 | **Pedir depoimento à Giuliana** | É o ativo que mais falta na página de freela. Não custa nada a ela e não reabre a conversa sobre dinheiro |
| 5 | **⚠️ Conferir cláusula de exclusividade no contrato da PASS** | Ele vai anunciar freela publicamente enquanto está empregado. Várias empresas de tecnologia têm cláusula de exclusividade ou conflito de interesse. **Na maioria dos casos não impede nada, mas é melhor verificar antes de publicar do que depois** |
| 6 | Currículo em PDF | Necessário para a Fase 2 |

### 16.3 Nunca perguntado / não decidido

| # | Questão aberta | Status |
|---|---|---|
| 7 | **Faixa de preço e prazo.** Ele nunca cobrou, então não há referência. Só bloqueia se o FAQ existir | ⏸ Adiado |
| 8 | ~~**Qual o repositório de destino?**~~ | ✅ **RESOLVIDO 17/08/2026** — `Site_Portfolio`. Ver seção 1 |
| 9 | **Decoração de código no hero e no contato.** O logo `{ MS }` ficou (decisão 16). O `const desenvolvedor = {` fica **por enquanto**, a revisitar. O `// vamos construir algo juntos` **nunca foi decidido** | ⏸ Aberto por escolha |
| 10 | **Quando migrar para domínio próprio** e qual será. `manuelsereno.dev` **não é dele** — era só planejado | ⏸ Aberto |
| 11 | **A página `/curriculo` deve existir?** Rebaixada a "talvez". Ver seção 14 | ⏸ Aberto |
| 12 | **O site deve ter FAQ?** Bom para AEO, mas ele duvida que caiba num portfólio de dev. Ver 13.2 | ⏸ Aberto |
| 13 | **Confirmar o mapeamento do campo `context`** das habilidades (proposto em 12.4, derivado dos fatos, **não confirmado**) | ⏸ Aguarda ele |
| 14 | **Aprovar a reescrita da seção Serviços** (proposta em 12.8, **não aprovada**) | ⏸ Aguarda ele |
| 15 | **Framer Motion fica ou sai?** Decidir item a item no inventário (seção 18) | ⏸ Aguarda inventário |

---

## 17. AUDITORIA DE 17/08/2026 — O QUE O REDESIGN CRIOU

> Releitura completa da codebase após as mudanças de design e a execução parcial da Fase 0. **Estes achados são novos** — não existiam na auditoria original.

### 17.1 Correção de dois achados anteriores

Uma busca por `level|levelLabel|category|learning` em `components/` retornou **zero ocorrências**. Consequência:

| Achado | Correção |
|---|---|
| "o site vende como serviço o que rotula como em estudo" | O rótulo **não é renderizado**. A contradição existe no arquivo de dados, **não na tela** |
| "números de proficiência implausíveis (React 90 vs Next 60)" | **Ninguém vê esses números.** Não é problema de credibilidade pública — é dado morto |

Ainda vale corrigir (dado errado parado no arquivo ressurge quando alguém for usá-lo), mas a **urgência é baixa**, não crítica. É a decisão 11.

### 17.2 Achados válidos e visíveis

| # | Achado | Onde | Gravidade |
|---|---|---|---|
| **B** | **O texto do Sobre diz que ele "está avançando nos estudos em React"**, enquanto a seção Habilidades trata React como domínio. Contradição na mesma página, e **esta é visível** | `about-section.tsx:65` | 🔴 Alta |
| **D** | **Cards de projeto fingem ser clicáveis.** Têm `ArrowUpRight` com hover animado e mudança de cor, mas não são links e nada é focável por teclado. Affordance falsa é pior que ausência de seta | `projects-section.tsx:73` | 🔴 Alta |
| **E** | **Vende "SEO" num site sem SEO.** Um cliente informado — ou o ChatGPT dele — confere em trinta segundos | `portfolio-data.ts:270` | 🟠 Média |
| **F** | **Copy nova entrou no registro antigo.** A seção Serviços não existia, então ninguém a auditou: *"conversão"*, *"traduzem a ideia em experiência"* | `portfolio-data.ts` | 🟠 Média |
| **G** | ~~`DESIGN.md` e `PLAN.md` se contradiziam sobre decoração de código~~ | — | ✅ **RESOLVIDO** pela decisão 16 |

### 17.3 O que continua factualmente errado no ar

**Nada disso foi tocado pelo redesign.** É o item de maior urgência do projeto inteiro — o site está mentindo agora:

| Onde | Diz | Verdade |
|---|---|---|
| `about-section.tsx:55` | "Curso o 8º semestre" | **É bacharel** |
| `about-section.tsx:60` | "Atuo como desenvolvedor web na Praxis" | **Saiu em nov/2025** |
| `portfolio-data.ts:213` | Praxis "Ago 2024 — **Presente**" | **Encerrou nov/2025** |
| `portfolio-data.ts:228` | "Conclusão **prevista** dez/2025" | **Concluída** |
| — | **PASS não aparece em lugar nenhum** | Emprego atual desde nov/2025 |
| `about-section.tsx:63` | HostGator | Era para cortar (7.8) |

> 💡 **Boa notícia estrutural:** `experience`, `education` e `allSkills` estão todos em **`lib/portfolio-data.ts`**. Corrigir os fatos é uma edição localizada num arquivo, não uma refatoração. Estimativa: **~30 minutos.**

### 17.4 Ordem recomendada de execução

| # | Tarefa | Esforço | Por quê primeiro |
|---|---|---|---|
| 1 | **Corrigir os fatos** (17.3) | ~30 min | Para o sangramento de credibilidade. Um arquivo só |
| 2 | **Terminar a Fase 0** | ~2h | `metadataBase`, imagem OG, JSON-LD. Fecha o furo do achado E |
| 3 | **Fase 1 — copy** | ~6h | Inclui a reescrita de Serviços (12.8) |
| 4 | **Links dos projetos** | depende dele | Resolve o achado D |

---

## 18. INVENTÁRIO DO MERGE — ANTIGO × NOVO

> **Decisão 9: isto é um merge, não uma substituição.** Nada é apagado no destino sem constar aqui como "morre", com razão escrita.

### 18.1 ⚠️ Limite deste inventário

**Este inventário é parcial e direcional.** Foi montado por inspeção remota do GitHub, que **não expõe a listagem completa de arquivos** dentro de `src/app`, `src/components/{layout,portfolio,ui}` e `src/lib`.

**Para completá-lo, o repositório precisa estar local.** Enquanto isso não acontece, trate as linhas abaixo como hipóteses a confirmar — **não como inventário fechado.**

### 18.2 Decidido — vem do ANTIGO (`Site_Portfolio`)

| Item | Razão |
|---|---|
| **Formulário de contato + Resend** | Decisão 13. Já funciona e converte melhor que só links |
| **Rate limit (3 envios / 15 min)** | Proteção real do endpoint de email. Não é enfeite |
| **`robots: index, follow`** | O redesign não tem |
| **`openGraph.siteName`** | O redesign não tem |
| **Twitter card `summary_large_image`** | O redesign não tem. Fica inerte até a imagem OG existir |
| **`eslint.config.mjs`** | O redesign tem script de lint sem config. Já é flat config, que virou padrão na 16 |
| **Estrutura `src/`** | Decisão 18 — o redesign é que se adapta |

### 18.3 Decidido — vem do NOVO (redesign)

| Item | Razão |
|---|---|
| **Design system inteiro** | `DESIGN.md`, paleta cianotipia, três vozes tipográficas, regra do fio de 1px |
| **Todas as seções visuais** | Hero, Sobre, Habilidades, Serviços, Projetos, Contato, Nav, Footer |
| **Modal de habilidades** (`@base-ui/react`) | Melhor ativo de copy do site — `summary` + `commonUses` em linguagem leiga |
| **Esteira de logos** + os 12 SVGs em `public/logos/` | |
| **Ícones em `app/`** | `icon.svg`, `favicon.ico`, `apple-icon.png` + manifest. **Copiar, não refazer** — ver nota da Fase 0 |
| **`next.config.mjs` limpo** | Sem `unoptimized`, sem `ignoreBuildErrors` |
| **Fontes** Inter · Space Grotesk · JetBrains Mono | O `DESIGN.md` depende delas. Substituem Geist |

### 18.4 Decidido — MORRE

| Item | Razão |
|---|---|
| **`openGraph.url: "https://manuelsereno.dev"`** | 🔴 **Domínio que o Manuel não possui.** Apontar OG para domínio de terceiros é pior que não ter OG |
| **`level` · `levelLabel` · `learning` · `category`** | Dados mortos e inverificáveis (decisão 11) |
| **`/icon-site.png` via `metadata.icons`** | Substituído pela auto-detecção do Next em `app/` |
| **Fontes Geist / Geist Mono** | Conflitam com o `DESIGN.md` |
| **`v0 - mudanças pendentes.md`** e as 5 linhas de v0 no `.gitignore` | Rastros do v0. Não migrar |

### 18.5 ⏸ A DECIDIR no inventário completo

| Item | Pergunta |
|---|---|
| **Framer Motion** | Existe animação boa no site antigo que justifique manter a dependência? Senão, sai (decisão 14) |
| **Radix UI × `@base-ui/react`** | O destino usa Radix; o modal novo usa Base UI. Padronizar num só ou conviver? **Duas bibliotecas de primitivos no mesmo bundle é peso morto** |
| **`src/components/ui/`** | O que existe lá? Aproveitável para os campos do formulário? |
| **`src/components/portfolio/`** | Tem algo sem equivalente no redesign — modal de projeto, por exemplo? O README cita "project showcase with modals" |
| **`src/lib/`** | Que utilidades existem? Alguma vale trazer? |
| **API routes em `src/app/api/`** | Além do endpoint do Resend, existe outra? 🔴 **Verificar acesso síncrono a `headers()`/`cookies()`** — quebra no Next 16 (ver 11.1, item 3) |
| **Config custom de webpack** | 🔴 Se existir, o `next build` da 16 **falha** — Turbopack é o padrão (11.1, item 5) |
| **Scripts do `package.json`** | 🔴 `"lint": "next lint"` deixa de existir na 16 (11.1, item 4) |
| **`middleware.ts`** | Se existir, precisa virar `proxy.ts` |
| **Lighthouse > 90 (alegado no README)** | Verificar se é real antes de citar como prova em qualquer lugar |

---

## 19. MANIFESTO DE CÓPIA — COMO LEVAR A ORIGEM PARA O DESTINO

### 19.1 ⛔ Não copie a pasta inteira

**Copiar `D:\personal` por cima do `Site_Portfolio` quebra o repositório.** Cinco razões concretas:

| # | Problema | Consequência |
|---|---|---|
| 1 | **Estrutura incompatível** | A origem tem `app/` na raiz; o destino usa `src/app/` (decisão 18). Não é cópia — é reposicionamento de cada arquivo |
| 2 | 🔴 **Conflito de gerenciador de pacotes** | A origem tem `pnpm-lock.yaml`; o destino tem `package-lock.json`. **Dois lockfiles no mesmo repo produzem builds não determinísticos.** Escolher um e apagar o outro |
| 3 | 🔴 **Sobrescrita cega viola a decisão 9** | O destino tem a rota do Resend, o rate limit e o `eslint.config.mjs` — tudo marcado para sobreviver (18.2). Cópia por cima mata exatamente o que era para ficar |
| 4 | **Artefatos gerados** | `node_modules/`, `.next/`, `tsconfig.tsbuildinfo`, `next-env.d.ts` não vão para repositório nenhum |
| 5 | **Rastros do v0** | As 5 linhas de v0 no `.gitignore` e o `v0 - mudanças pendentes.md` |

### 19.2 O que copiar, e para onde

| Origem | Destino | Cuidado |
|---|---|---|
| `components/*.tsx` (11 arquivos) | `src/components/` | Decidir se entra em subpasta, seguindo o padrão `{layout,portfolio,ui}` do destino |
| `lib/portfolio-data.ts` | `src/lib/` | ✅ Cópia direta |
| `lib/utils.ts` | `src/lib/` | ⚠️ O destino provavelmente já tem — comparar antes |
| `app/page.tsx` | `src/app/page.tsx` | ✅ Substitui |
| `app/globals.css` | `src/app/globals.css` | ⚠️ **Merge, não substituição** — pode haver estilo do formulário lá |
| **`app/layout.tsx`** | `src/app/layout.tsx` | 🔴 **O arquivo mais delicado do merge.** Ver 19.4 |
| `app/icon.svg` · `favicon.ico` · `apple-icon.png` | `src/app/` | ✅ Copiar, **não refazer** (ver nota da Fase 0) |
| `public/logos/*.svg` (12) | `public/logos/` | ✅ |
| `public/projects/*.png` (5) | `public/projects/` | ✅ |
| `public/icon-192.png` · `icon-512.png` · `site.webmanifest` | `public/` | ✅ |
| `next.config.mjs` | raiz | ⚠️ **Não substituir cego** — se o destino tiver config custom de webpack, isso importa para a migração (11.1, item 5) |
| `postcss.config.mjs` · `components.json` | raiz | ⚠️ Comparar — o destino já tem os dois |
| `tsconfig.json` | raiz | 🔴 **Não copiar.** O do destino tem os `paths` apontando para `src/` |
| `DESIGN.md` · `PLAN.md` | pasta de design do destino | ✅ São a documentação do projeto |

### 19.3 O que NÃO copiar

```
node_modules/          .next/                 tsconfig.tsbuildinfo
next-env.d.ts          pnpm-lock.yaml         v0 - mudanças pendentes.md
.gitignore             AGENTS.md              CLAUDE.md
```

- **`AGENTS.md` / `CLAUDE.md`** — o `AGENTS.md` é **reescrito automaticamente pelo `next dev`** (`node_modules/next/dist/server/lib/generate-agent-files.js`). Deixe o destino gerar o seu.
- **`.gitignore`** — traga só a seção "Common ignores"; as 5 linhas de v0 não.
- **`.superpowers/` · `.impeccable/` · `docs/superpowers/`** — artefatos de sessão. Migrar só se ele quiser o histórico das decisões de design.

### 19.4 🔴 `layout.tsx` — o merge manual

**Nenhum dos dois arquivos pode simplesmente vencer.** Cada lado tem coisa que o outro não tem:

| Vem da ORIGEM | Vem do DESTINO |
|---|---|
| Fontes Inter · Space Grotesk · JetBrains Mono | `robots: index, follow` |
| `<Analytics />` restrito a produção | `openGraph.siteName` |
| `manifest: '/site.webmanifest'` | Twitter card `summary_large_image` |
| `className="dark"` + `viewport` | `authors` / `creator` / `publisher` |
| — | 🔴 `openGraph.url` — **corrigir**, aponta para domínio inexistente |

E a Fase 0 acrescenta em cima dos dois: `metadataBase`, `alternates.canonical`, `openGraph.images`, JSON-LD, e o `data-scroll-behavior="smooth"` do Next 16 (11.1, item 6).

### 19.5 Ordem de execução

| # | Passo | Depende de |
|---|---|---|
| 0 | **Clonar o `Site_Portfolio` localmente** e fechar o inventário (18.5) | — |
| 1 | **Corrigir os fatos aqui na origem** (17.3), onde já compila limpo | — |
| 2 | **Migrar o destino para o Next 16** (11.1) — antes de trazer código | passo 0 |
| 3 | **Trazer o design** conforme 19.2 | passos 1 e 2 |
| 4 | **Merge do `layout.tsx`** (19.4) | passo 3 |
| 5 | **Fase 0** — `metadataBase`, OG, JSON-LD, robots, sitemap | passo 4 |
| 6 | **Fase 1** — copy | passo 5 + pendências 1, 13, 14 |

> **Por que corrigir os fatos no passo 1 e não depois:** `portfolio-data.ts` é copiado da origem para o destino. Corrigir aqui primeiro significa que o arquivo que viaja já está certo — em vez de migrar o erro e consertar do outro lado.

### 19.6 O que pode começar **hoje**, sem depender de ninguém

| Tarefa | Bloqueado por |
|---|---|
| ✅ Corrigir os fatos (17.3) | nada — **~30 min, um arquivo** |
| ✅ Remover `level`/`levelLabel`/`learning`/`category` (decisão 11) | nada |
| ✅ Clonar o destino e fechar o inventário | nada |
| ✅ Migrar para o Next 16 | ter o destino local |
| ⏸ Fase 1 — copy | pendências 1 (links), 13 (`context`), 14 (Serviços) |

---

*Documento gerado a partir da auditoria de agosto de 2026 e revisado em 17/08/2026. Toda decisão registrada aqui foi confirmada diretamente com o Manuel Sereno. Onde há incerteza, ela está marcada como pendência — não como suposição.*
