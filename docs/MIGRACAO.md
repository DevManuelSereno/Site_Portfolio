# MIGRAÇÃO — `redesign/` → `src/`

### Plano executável para integrar o redesign ao `Site_Portfolio`

> **Companheiro do `PLAN.md`.** Este documento é o *como*; o `PLAN.md` é o *o quê* e o *porquê*. Toda decisão citada aqui (numeradas de 1 a 18) está justificada lá.

**Data:** 17/08/2026
**Situação:** o projeto do redesign foi copiado inteiro para dentro do repositório de destino, numa pasta `redesign/`, em branch dedicada. **Nenhum arquivo do destino foi alterado.**

---

## 0. POR QUE ESTE SETUP É BOM

Copiar para `redesign/` em vez de colar por cima foi a decisão certa, e muda a natureza do trabalho:

| Colar por cima | `redesign/` como referência |
|---|---|
| *Big bang* — tudo muda de uma vez | **Incremental** — arquivo por arquivo |
| Se quebrar, não se sabe qual mudança causou | **Cada etapa compila** antes da próxima |
| O original se perde | **Original do lado** para comparar até o fim |
| Rollback = reverter tudo | Rollback = reverter uma etapa |

A pasta `redesign/` é uma **área de preparação**. Ela existe durante a migração e é apagada no final (Etapa H).

### A estratégia: migrar de baixo para cima

```
assets  →  dados  →  componentes  →  rotas  →  SEO
(nada     (não      (importam      (importam  (em cima
 importa)  importa   assets)        tudo)      de tudo)
           nada)
```

**Razão:** cada camada só depende das anteriores. Migrando nessa ordem, **todo estado intermediário compila** — nunca existe um momento em que o projeto está quebrado esperando o próximo passo.

---

## 1. ⚡ AÇÃO IMEDIATA — ISOLAR `redesign/`

**Faça isto antes de qualquer outra coisa.** Sem isso, o repositório fica com o build quebrado por um motivo falso.

### O problema, concretamente

O `tsconfig.json` do destino inclui `**/*.ts` e `**/*.tsx` e mapeia `@/*` para `./src/*`.

Os arquivos em `redesign/` importam `@/components/hero-section`, `@/lib/portfolio-data` e afins. Sob os `paths` do **destino**, isso resolve para `src/components/...` — que **ainda não existe**.

**Resultado:** `tsc --noEmit` e o `next build` falham com dezenas de erros de módulo não encontrado, todos vindos de uma pasta que é só referência. É ruído puro, e vai atrapalhar cada gate de verificação daqui pra frente.

### A correção

**1. Excluir do TypeScript** — em `tsconfig.json` do destino:

```json
{
  "exclude": ["node_modules", "redesign"]
}
```

**2. Excluir do ESLint** — em `eslint.config.mjs`:

```js
export default [
  { ignores: ['redesign/**', '.next/**'] },
  // ...resto da config
]
```

**3. Apagar artefatos que vieram junto**, se existirem:

```bash
rm -rf redesign/node_modules redesign/.next redesign/tsconfig.tsbuildinfo redesign/next-env.d.ts
```

- `redesign/node_modules` — peso morto e pode confundir resolução de módulos
- `redesign/tsconfig.tsbuildinfo` — 249 KB de cache de build, não vai para repositório

**4. Impedir que voltem** — acrescentar ao `.gitignore`:

```
redesign/node_modules
redesign/.next
redesign/*.tsbuildinfo
```

### ✅ Gate 1

```bash
npx tsc --noEmit && npm run build
```

**Ambos precisam passar exatamente como passavam antes da cópia.** Se falharem, o `redesign/` ainda não está isolado — resolva antes de seguir.

**Commit aqui.** Você tem uma linha de base limpa: o repositório com o redesign dentro, sem nada quebrado.

---

## 2. DIAGNÓSTICO DO DESTINO

Três itens do `PLAN.md` (11.1, itens 3, 4 e 5) são **os de maior risco da migração e não puderam ser verificados remotamente**. Levante-os agora — leva dez minutos e evita surpresa no meio do caminho.

```bash
node -v && npx tsc -v && cat package.json
```

```bash
ls src/app src/components src/lib && find src/app -name "route.ts" -o -name "middleware.ts" -o -name "proxy.ts"
```

```bash
grep -rn "headers()\|cookies()\|draftMode()" src/ ; grep -n "webpack\|turbopack" next.config.* ; ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null
```

### Preencha antes de seguir

| # | Pergunta | Resposta | Impacto |
|---|---|---|---|
| 1 | Versão do Node | `____` | Precisa ≥ **20.9** |
| 2 | Versão do TypeScript | `____` | Precisa ≥ **5.1** — o README dizia 5.0 |
| 3 | `"lint": "next lint"` no `package.json`? | ☐ sim ☐ não | Se sim, **quebra na 16** |
| 4 | Config custom de `webpack` no `next.config`? | ☐ sim ☐ não | Se sim, **o build da 16 FALHA** |
| 5 | A rota do Resend usa `headers()` síncrono? | ☐ sim ☐ não | Se sim, **quebra na 16** — provável, por causa do rate limit por IP |
| 6 | Existe `middleware.ts`? | ☐ sim ☐ não | Se sim, vira `proxy.ts` |
| 7 | Qual lockfile existe? | `____` | Define o gerenciador. **Só pode haver um** |
| 8 | Caminho exato da rota do Resend | `____` | Alvo da correção da Etapa C |

---

## 3. ETAPA A — MIGRAR PARA O NEXT 16

> Detalhamento completo em **`PLAN.md` seção 11.1**. Fonte autoritativa: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` — **leia esse arquivo, não confie em memória sobre a API da 16.**

**Por que primeiro:** escrever `sitemap.ts` e `opengraph-image.tsx` na API da 15 para reescrever depois é retrabalho puro.

```bash
npx tsc -v
```

Se for < 5.1, suba antes de tudo:

```bash
npm install -D typescript@latest @types/react@latest @types/react-dom@latest
```

Depois o codemod:

```bash
npx @next/codemod@canary upgrade latest
```

E, se o diagnóstico 5 deu "sim":

```bash
npx @next/codemod@canary next-async-request-api .
```

### Ajustes que o codemod não faz

- **`data-scroll-behavior="smooth"` no `<html>`** — a 16 não sobrescreve mais `scroll-behavior` na navegação. O site é todo navegação por âncora com rolagem suave, então **sem isso o comportamento muda visivelmente**
- Conferir `images.qualities` — o padrão virou só `[75]`
- Se houver webpack custom: migrar, ou usar `next build --webpack`

### ✅ Gate A

```bash
npx tsc --noEmit && npm run build && npm run dev
```

Com o dev rodando: **abra o site, envie o formulário de contato de verdade e confirme que o email chega.** O rate limit é o ponto mais provável de quebra e não aparece em erro de compilação.

**Commit.**

---

## 4. ETAPA B — CONSOLIDAR DEPENDÊNCIAS

Compare `package.json` do destino com `redesign/package.json`.

**Entram no destino:**

| Pacote | Para quê |
|---|---|
| `@base-ui/react` | O `Dialog` do modal de habilidades |
| `tw-animate-css` | Usado pelo `globals.css` do redesign |
| `lucide-react` | Conferir versão — o redesign usa `^1.16.0` |
| `class-variance-authority` · `clsx` · `tailwind-merge` | Provavelmente já existem |

### ⚠️ Decisão pendente: Radix × Base UI

O destino usa **Radix**; o redesign usa **`@base-ui/react`**. **Duas bibliotecas de primitivos no mesmo bundle é peso morto.**

| Caminho | Custo |
|---|---|
| Padronizar em Base UI | Reescrever o que usa Radix no destino |
| Padronizar em Radix | Reescrever o `skill-dialog.tsx` |
| Conviver | Bundle maior, dois modelos mentais |

**Não decida no automático** — depende do que o diagnóstico revelar sobre o uso de Radix. É a questão registrada em `PLAN.md` 18.5.

### Framer Motion

Decisão 14: **caso a caso**. Se nada no destino sobreviver usando Framer Motion, remova — o `DESIGN.md` define todo o vocabulário de movimento sem biblioteca.

### 🔴 Lockfile

**Só pode existir um.** Se o diagnóstico 7 encontrou os dois, apague o que não corresponde ao gerenciador escolhido e reinstale do zero.

### ✅ Gate B

```bash
rm -rf node_modules && npm install && npm run build
```

**Commit.**

---

## 5. ETAPA C — ASSETS (risco zero)

Não têm import, não quebram nada. Comece por aqui para ganhar tração.

| De | Para |
|---|---|
| `redesign/public/logos/*.svg` (12) | `public/logos/` |
| `redesign/public/projects/*.png` (5) | `public/projects/` |
| `redesign/public/icon-192.png` · `icon-512.png` | `public/` |
| `redesign/public/site.webmanifest` | `public/` |
| `redesign/app/icon.svg` · `favicon.ico` · `apple-icon.png` | **`src/app/`** |

> ⚠️ **Os ícones são cópia, não recriação.** O `icon.svg` é um vetor construído do zero e o frame de 16px do `.ico` tem arte própria (só "MS", sem as chaves). Ver a nota da Fase 0 no `PLAN.md`. **Não regere esses arquivos.**

Remover do destino o `/icon-site.png` e a entrada `metadata.icons` que o referencia — na 16, o Next auto-detecta pelos nomes em `src/app/`.

### ✅ Gate C

```bash
npm run build
```

---

## 6. ETAPA D — DADOS

`redesign/lib/portfolio-data.ts` → `src/lib/portfolio-data.ts`

**Aproveite a mudança de casa para aplicar as correções que já estão decididas:**

### 🔴 Fatos errados (PLAN.md 17.3) — o site está mentindo hoje

| Campo | Corrigir para |
|---|---|
| `experience` — Praxis | `Ago 2024 — Nov 2025` (não "Presente") |
| `experience` — **acrescentar PASS** | `Nov 2025 — Presente` · Desenvolvedor Front-End |
| `education` | `Bacharelado concluído` (não "prevista dez/2025") |

### Campos mortos (decisão 11)

Remover `level`, `levelLabel`, `learning`, `category`. Acrescentar `context` com uma linha verificável.

> ⚠️ O mapeamento proposto em `PLAN.md` 12.4 **não foi confirmado pelo Manuel** — pendência 13. Confirme antes de escrever.

**Derivados a ajustar:** `coreSkills` e `learningSkills` deixam de existir; `skillMarquee` passa a derivar de `allSkills` com ordem explícita.

### ✅ Gate D

```bash
npx tsc --noEmit
```

---

## 7. ETAPA E — COMPONENTES

Os 11 arquivos de `redesign/components/` → `src/components/`.

**Decida o padrão de pastas:** o destino organiza em `{layout,portfolio,ui}`. Sugestão de encaixe:

| Componente | Pasta |
|---|---|
| `site-nav` · `site-footer` | `layout/` |
| `hero-section` · `about-section` · `skills-section` · `services-section` · `projects-section` · `contact-section` | `portfolio/` |
| `skill-dialog` · `skill-marquee` · `social-icons` | `ui/` |

Ajustar os imports `@/components/...` conforme a pasta escolhida.

### Correções decididas, a aplicar durante a mudança

- **`projects-section.tsx`** — cards viram links de verdade (decisão 12). Hoje têm seta e hover mas não são clicáveis nem focáveis por teclado. **Card sem link perde a seta e o hover** — não finge ser clicável
- **`about-section.tsx`** — a copy inteira é reescrita na Fase 1. Se for adiar, no mínimo **corrija os fatos**: "8º semestre", "Atuo na Praxis" e "HostGator" estão errados no ar

### ✅ Gate E

```bash
npx tsc --noEmit
```

---

## 8. ETAPA F — ROTAS

Última camada e a mais delicada.

### `src/app/page.tsx`

Substituição direta por `redesign/app/page.tsx`, com os imports ajustados.

### `src/app/globals.css`

⚠️ **Merge, não substituição.** O destino pode ter estilo do formulário de contato. Traga do redesign: tokens do design system, `animate-marquee`, ocultação da barra de rolagem, rolagem suave.

### 🔴 `src/app/layout.tsx` — o merge manual

**Nenhum lado pode simplesmente vencer:**

| Vem do REDESIGN | Vem do DESTINO |
|---|---|
| Fontes Inter · Space Grotesk · JetBrains Mono | `robots: index, follow` |
| `<Analytics />` restrito a produção | `openGraph.siteName` |
| `manifest: '/site.webmanifest'` | Twitter card `summary_large_image` |
| `className="dark"` + `viewport` | `authors` / `creator` / `publisher` |
| — | 🔴 `openGraph.url` — **CORRIGIR** |

> 🔴 **`openGraph.url` aponta hoje para `https://manuelsereno.dev` — domínio que o Manuel NÃO possui.** Publicar assim aponta o compartilhamento social para um domínio de terceiros. Substituir pelo valor vindo de `site-config.ts` (Etapa G).

**Acrescentar também:** `data-scroll-behavior="smooth"` no `<html>` (Etapa A).

**Fontes:** Geist e Geist Mono saem — o `DESIGN.md` depende das três do redesign.

### ✅ Gate F

```bash
npm run build && npm run dev
```

Agora é verificação **visual**, não só de compilação:

- [ ] As 6 seções renderizam
- [ ] Nav encolhe para pílula ao rolar
- [ ] Modal de habilidades abre, fecha por `Esc`, devolve o foco ao card
- [ ] Esteira de logos anima e pausa no hover
- [ ] Formulário de contato **envia e o email chega**
- [ ] Favicon aparece na aba
- [ ] Sem erro no console do navegador

**Commit.**

---

## 9. ETAPA G — FASE 0 (SEO/GEO/AEO)

> Detalhamento em **`PLAN.md` seção 11**. Todos os caminhos com prefixo `src/`.

| Arquivo | O quê |
|---|---|
| `src/lib/site-config.ts` | URL em `NEXT_PUBLIC_SITE_URL`, fallback `.vercel.app` |
| `src/app/layout.tsx` | `metadataBase`, `alternates.canonical`, `openGraph.images` |
| `src/app/opengraph-image.tsx` | Imagem OG via `next/og` |
| `src/app/robots.ts` · `src/app/sitemap.ts` | Novos. Sitemap só com `/` por enquanto |
| `src/components/json-ld.tsx` | `Person` + `WebSite`, com `sameAs` e `address` |

> ⚠️ **Na 16, `params` e `id` são Promises** em `opengraph-image` e `sitemap`. Para a home não há segmento dinâmico, então não se aplica — mas passa a valer se os case studies virarem `/projetos/[slug]`.

> 💡 O JSON-LD `Person` também **neutraliza a maior parte do custo de GEO** de manter o `const desenvolvedor = {` no hero (decisão 16), porque declara o nome de forma limpa e inequívoca.

### ✅ Gate G

```bash
npm run build && npx next start
```

- [ ] `curl -s localhost:3000/robots.txt` responde
- [ ] `curl -s localhost:3000/sitemap.xml` responde
- [ ] `curl -s localhost:3000/opengraph-image` retorna imagem
- [ ] O HTML tem `<script type="application/ld+json">`
- [ ] O HTML tem `<link rel="canonical">`
- [ ] Validar o schema no [validator.schema.org](https://validator.schema.org)

---

## 10. ETAPA H — LIMPEZA

Só depois do Gate G passar:

```bash
git rm -r --cached redesign && rm -rf redesign
```

Também remover:
- `redesign` do `exclude` do `tsconfig.json` e dos ignores do ESLint
- As 3 linhas de `redesign/` no `.gitignore`
- Fontes Geist do `package.json`, se ninguém mais usar
- Framer Motion, se a decisão 14 for por remover

### ✅ Gate H

```bash
rm -rf node_modules .next && npm install && npm run build
```

Build limpo, do zero, sem a pasta. **Commit final.**

---

## 11. ROLLBACK

Cada etapa é um commit. Para voltar uma:

```bash
git revert HEAD
```

Se a branch inteira der errado, ela é descartável — `main` nunca foi tocada. **É por isso que a branch dedicada foi a decisão certa.**

---

## 12. CHECKLIST GERAL

- [ ] **1** — Isolar `redesign/` · Gate 1
- [ ] **2** — Diagnóstico (8 respostas preenchidas)
- [ ] **A** — Next 16 · Gate A *(inclui teste real do formulário)*
- [ ] **B** — Dependências · Gate B *(inclui decisão Radix × Base UI)*
- [ ] **C** — Assets · Gate C
- [ ] **D** — Dados **+ correção dos fatos** · Gate D
- [ ] **E** — Componentes **+ links dos projetos** · Gate E
- [ ] **F** — Rotas **+ merge do `layout.tsx`** · Gate F
- [ ] **G** — Fase 0 · Gate G
- [ ] **H** — Limpeza · Gate H

### Ainda bloqueado por decisão do Manuel

| Pendência | Bloqueia |
|---|---|
| Links dos projetos (tabela em `PLAN.md` 12.5) | Etapa E |
| Confirmar mapeamento do campo `context` | Etapa D |
| Aprovar reescrita de Serviços (`PLAN.md` 12.8) | Fase 1 |
| Decidir o `// vamos construir algo juntos` | Fase 1 |

**Nada disso bloqueia as etapas 1, 2, A, B, C, F ou G.** Dá para ir longe antes de precisar de qualquer decisão nova.

---

*Companheiro do `PLAN.md`. As decisões numeradas de 1 a 18 estão justificadas lá.*
