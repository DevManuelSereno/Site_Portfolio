# Modal de Habilidades — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer cada um dos 12 cards da seção Habilidades abrir um modal que explica a tecnologia em linguagem acessível a leigos.

**Architecture:** Um `Dialog.Root` do Base UI por card, encapsulado num novo client component `SkillDialog`. A fronteira de cliente para no card — `SkillsSection`, header e marquee continuam Server Components. O conteúdo vem de dois campos novos no tipo `Skill`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5.7, Tailwind CSS v4, `@base-ui/react` 1.5 (já é dependência), `lucide-react`.

**Spec:** [`docs/superpowers/specs/2026-08-16-modal-habilidades-design.md`](../specs/2026-08-16-modal-habilidades-design.md)

## Global Constraints

- **Sem framework de teste no projeto.** Não há `vitest`, `jest` nem script `test` no `package.json`. Introduzir um está fora do escopo. O ciclo de verificação de cada task é: `pnpm build` (o TypeScript é a rede de segurança), asserções no DOM via navegador, e o detector do Impeccable.
- **Sem git no projeto.** Os passos de "commit" são substituídos por snapshot de arquivos em `_backup/`, seguindo o padrão já usado em `_backup/2026-08-16-habilidades/`.
- **NUNCA rodar `pnpm build` com `pnpm dev` ativo.** Os dois escrevem em `.next` e corrompem o CSS servido pelo dev (sintoma: zero regras `:hover` na folha). Parar o dev antes, ou aceitar reiniciá-lo depois.
- `SkillsSection` **não pode** ganhar `'use client'`. Verificado explicitamente na Task 3.
- Copy: duas frases por bloco, sem jargão, uma âncora concreta. Textos vêm do §7 do spec, **verbatim**.
- Não usar `keepMounted` no `Dialog.Portal`.
- Não adicionar links para projetos (adiado — §9 do spec).
- Não remover `level`, `levelLabel` nem `category` dos dados.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `lib/portfolio-data.ts` (modificar) | Tipo `Skill` + os 12 objetos ganham `summary` e `commonUses` |
| `components/skill-dialog.tsx` (criar) | Client component: gatilho (ícone + nome) e o modal inteiro |
| `components/skills-section.tsx` (modificar) | `SkillCard` delega ícone/nome ao `SkillDialog`; mantém `<li>` e o traço |

---

### Task 1: Dados e copy

**Files:**
- Modify: `lib/portfolio-data.ts:19-27` (tipo `Skill`) e `lib/portfolio-data.ts:29-...` (os 12 objetos de `allSkills`)

**Interfaces:**
- Consumes: nada
- Produces: `Skill.summary: string` e `Skill.commonUses: string`, ambos obrigatórios. `allSkills: Skill[]` continua com os 12 itens na ordem atual.

- [ ] **Step 1: Adicionar os dois campos ao tipo**

Em `lib/portfolio-data.ts`, dentro de `export type Skill = { ... }`, após `learning?: boolean`:

```ts
  /** O que a tecnologia é, em linguagem para leigos. */
  summary: string
  /** Onde ela costuma ser usada no mundo real. */
  commonUses: string
```

- [ ] **Step 2: Verificar que o build falha**

Parar o `pnpm dev` se estiver rodando. Então:

```bash
pnpm build
```

Esperado: **FALHA** com 12 erros do TypeScript, um por objeto de `allSkills`, na linha `Property 'summary' is missing in type ...`. Se o build passar, o tipo não foi editado no lugar certo.

- [ ] **Step 3: Preencher os 12 objetos**

Adicionar `summary` e `commonUses` a cada objeto de `allSkills`, na ordem em que aparecem no arquivo. Textos verbatim do §7 do spec:

```ts
// HTML5
summary:
  'A estrutura de qualquer página da web — é o que define o que é título, o que é parágrafo, o que é imagem e o que é botão.',
commonUses:
  'Está em toda página que você abre no navegador, sem exceção. É a fundação sobre a qual todo o resto é construído.',

// CSS3 / SCSS
summary:
  'A camada que dá aparência ao site: cores, espaçamento, tipografia e como tudo se reorganiza no celular. O SCSS é uma versão com mais recursos, para projetos maiores.',
commonUses:
  'Se dois sites têm a mesma estrutura mas um parece profissional e o outro não, a diferença está aqui.',

// JavaScript
summary:
  'A linguagem que faz a página reagir — abrir um menu, validar um formulário, carregar conteúdo sem recarregar a tela.',
commonUses:
  'É o que separa uma página parada de algo que responde a você. Todo site com qualquer tipo de interação usa.',

// TypeScript
summary:
  'JavaScript com uma camada de conferência: o computador avisa sobre erros enquanto o código está sendo escrito, antes de chegar ao ar.',
commonUses:
  'Virou padrão em projetos feitos para durar e crescer, porque reduz a chance de um erro bobo chegar ao usuário final.',

// React
summary:
  'Uma ferramenta para montar interfaces em blocos reutilizáveis, como peças de Lego que se encaixam para formar a tela.',
commonUses:
  'Está por trás de boa parte do que você já usa: Instagram, Netflix e Airbnb são construídos com ela.',

// Next.js
summary:
  'Uma estrutura construída em cima do React que resolve o que ele sozinho não faz: velocidade de carregamento, endereços de página e aparecer bem no Google.',
commonUses:
  'É a escolha comum quando o site precisa ser rápido e ser encontrado na busca — lojas, portfólios e sites institucionais.',

// Tailwind CSS
summary:
  'Uma forma de escrever o estilo direto no elemento, com peças pequenas e padronizadas, em vez de arquivos de estilo separados.',
commonUses:
  'Acelera muito a construção e mantém o visual consistente, porque todo mundo no projeto usa as mesmas medidas e cores.',

// Figma
summary:
  'O programa onde o site é desenhado antes de virar código — como a planta de uma casa antes da obra.',
commonUses:
  'Permite ver e aprovar o layout antes que exista uma linha de código, o que evita retrabalho caro depois.',

// Git / GitHub
summary:
  'Um sistema que guarda o histórico completo do projeto, permitindo voltar atrás em qualquer alteração. O GitHub é onde esse histórico fica hospedado.',
commonUses:
  'É o padrão em qualquer equipe de desenvolvimento — sem ele, duas pessoas não conseguem mexer no mesmo arquivo sem se atrapalhar.',

// Node.js
summary:
  'Permite usar JavaScript fora do navegador, no servidor — a mesma linguagem dos dois lados do site.',
commonUses:
  'É o que roda nos bastidores: processa cadastros, envia e-mails e conversa com o banco de dados.',

// SQL
summary:
  'A linguagem usada para conversar com um banco de dados — pedir, guardar e organizar informação.',
commonUses:
  'Sempre que um site lembra do seu carrinho, do seu histórico ou dos seus dados, tem um banco respondendo em SQL nos bastidores.',

// Python
summary:
  'Uma linguagem conhecida por ser direta de ler e escrever, usada bastante fora do desenvolvimento web.',
commonUses:
  'Aparece muito em análise de dados, automação de tarefas repetitivas e inteligência artificial.',
```

- [ ] **Step 4: Verificar que o build passa**

```bash
pnpm build
```

Esperado: **PASSA**. Zero erros de TypeScript. Isto prova que os 12 objetos foram preenchidos — o tipo obrigatório é a verificação.

- [ ] **Step 5: Snapshot**

```bash
mkdir -p _backup/2026-08-16-modal/t1 && cp lib/portfolio-data.ts _backup/2026-08-16-modal/t1/portfolio-data.ts.bak
```

---

### Task 2: Componente do modal

**Files:**
- Create: `components/skill-dialog.tsx`
- Modify: `components/skills-section.tsx` (função `SkillCard` e imports)

**Interfaces:**
- Consumes: `Skill` com `summary` e `commonUses` (Task 1)
- Produces: `export function SkillDialog({ skill }: { skill: Skill })` — renderiza o gatilho (ícone + nome) **e** o modal. Substitui integralmente o bloco `<div className="flex items-center gap-3.5">` que hoje existe no `SkillCard`.

> **Mudança de markup deliberada:** o `<h4>` do nome vira `<span>`. O modelo de conteúdo de `<button>` é *phrasing content*, e headings são *flow content* — `<h4>` dentro de `<button>` é HTML inválido. O nome passa a ser o **nome acessível do botão**, que é semanticamente melhor que um heading para um card clicável. A hierarquia de headings da página não perde nada: os 12 `h4` eram folhas sem conteúdo abaixo.

- [ ] **Step 1: Criar o componente**

Criar `components/skill-dialog.tsx`:

```tsx
'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { Dialog } from '@base-ui/react/dialog'

import type { Skill } from '@/lib/portfolio-data'

export function SkillDialog({ skill }: { skill: Skill }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex w-full cursor-pointer items-center gap-3.5 rounded-lg text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card transition-colors duration-300 group-hover:border-primary/40">
          <Image
            src={skill.logo || '/placeholder.svg'}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </span>
        <span className="min-w-0 truncate font-display text-base font-semibold tracking-tight text-foreground">
          {skill.name}
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl outline-none">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                <Image
                  src={skill.logo || '/placeholder.svg'}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <Dialog.Title className="min-w-0 font-display text-lg font-semibold tracking-tight text-foreground">
                {skill.name}
              </Dialog.Title>
            </div>

            <Dialog.Close
              aria-label="Fechar"
              className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          <Dialog.Description className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {skill.summary}
          </Dialog.Description>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {skill.commonUses}
          </p>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

- [ ] **Step 2: Ligar ao card**

Em `components/skills-section.tsx`, substituir a função `SkillCard` inteira por:

```tsx
function SkillCard({ skill }: { skill: Skill }) {
  return (
    <li className="group relative flex flex-col gap-4 rounded-xl border border-border bg-background p-5 transition-colors duration-300 hover:border-primary/50">
      <SkillDialog skill={skill} />

      {/* Traço decorativo — cresce até a largura do card ao apontar/focar.
          Em repouso usa a mesma largura do ícone (w-11), alinhando a ponta
          direita com a dele. Sem papel semântico: é ornamento, por isso fica
          fora da árvore de acessibilidade. */}
      <span
        aria-hidden="true"
        className="block h-px w-11 bg-primary transition-[width] duration-300 ease-out group-hover:w-full group-focus-within:w-full motion-reduce:transition-none"
      />
    </li>
  )
}
```

- [ ] **Step 3: Corrigir os imports**

No topo de `components/skills-section.tsx`, `Image` deixa de ser usado (migrou para o `SkillDialog`). Trocar o bloco de imports por:

```tsx
import { allSkills, type Skill } from '@/lib/portfolio-data'
import { SkillMarquee } from '@/components/skill-marquee'
import { SkillDialog } from '@/components/skill-dialog'
```

- [ ] **Step 4: Verificar o build**

```bash
pnpm build
```

Esperado: **PASSA**. Se aparecer `'Image' is declared but its value is never read`, o Step 3 não foi feito.

- [ ] **Step 5: Verificar o DOM no navegador**

Subir o dev (`pnpm dev`), abrir `http://localhost:3000` e rodar no console:

```js
(() => {
  const cards = [...document.querySelectorAll('#habilidades ul.grid > li')];
  const btn = cards[0].querySelector('button');
  return {
    totalCards: cards.length,                               // esperado: 12
    cardsComBotao: cards.filter(c => c.querySelector('button')).length, // esperado: 12
    h4Restantes: document.querySelectorAll('#habilidades h4').length,   // esperado: 0
    nomeAcessivel: btn.textContent.trim(),                  // esperado: "HTML5"
    dialogsAbertos: document.querySelectorAll('[role="dialog"]').length, // esperado: 0
  };
})()
```

Depois clicar num card e rodar:

```js
(() => {
  const d = document.querySelector('[role="dialog"]');
  return {
    existe: !!d,
    temTitulo: !!d?.getAttribute('aria-labelledby'),
    temDescricao: !!d?.getAttribute('aria-describedby'),
    botaoFechar: !!d?.querySelector('[aria-label="Fechar"]'),
    paragrafos: d?.querySelectorAll('p').length,  // esperado: 2
  };
})()
```

Esperado: `existe: true`, `temTitulo: true`, `temDescricao: true`, `botaoFechar: true`, `paragrafos: 2`.

- [ ] **Step 6: Snapshot**

```bash
mkdir -p _backup/2026-08-16-modal/t2 && cp components/skills-section.tsx _backup/2026-08-16-modal/t2/skills-section.tsx.bak && cp components/skill-dialog.tsx _backup/2026-08-16-modal/t2/skill-dialog.tsx.bak
```

---

### Task 3: Acessibilidade, estados e responsivo

**Files:**
- Verify: `components/skill-dialog.tsx`, `components/skills-section.tsx`

Esta task não escreve código novo se as anteriores estiverem corretas — ela existe porque um revisor pode aprovar "o modal abre" e reprovar "o teclado não funciona". Qualquer falha aqui volta como correção na Task 2.

**Interfaces:**
- Consumes: `SkillDialog` (Task 2)
- Produces: nada

- [ ] **Step 1: Confirmar que a seção continua Server Component**

```bash
grep -c "use client" components/skills-section.tsx
```

Esperado: **0**. Se retornar 1, a fronteira de cliente vazou para a seção e a Task 2 precisa ser refeita.

```bash
grep -l "use client" components/*.tsx
```

Esperado: exatamente `components/site-nav.tsx` e `components/skill-dialog.tsx`.

- [ ] **Step 2: Testar os três caminhos de fechamento**

Manualmente, no navegador, para um card qualquer:

1. Abrir e clicar no **X** → fecha.
2. Abrir e clicar **fora do modal** (na área escurecida) → fecha.
3. Abrir e apertar **`Esc`** → fecha.

Os três devem funcionar sem configuração adicional. Se o clique fora não fechar, alguém passou `disablePointerDismissal` — remover.

- [ ] **Step 3: Testar o percurso de teclado**

Sem usar o mouse:

1. `Tab` até um card da seção Habilidades.
2. Confirmar que existe **anel de foco visível** no card (contorno na cor primária, deslocado 4px).
3. Confirmar que o **traço cresce** até a largura do card ao focar — é o `group-focus-within:w-full`, que estava inerte até agora.
4. `Enter` → modal abre e o foco entra nele.
5. `Tab` repetido → o foco circula **dentro** do modal e não escapa para a página.
6. `Esc` → fecha e o foco **volta para o card de origem**.

Se o passo 2 falhar, o `focus-visible:outline-*` do `Dialog.Trigger` não está aplicando.

- [ ] **Step 4: Verificar responsivo**

Com o modal aberto, em três larguras:

```js
(() => {
  const d = document.querySelector('[role="dialog"]');
  const r = d.getBoundingClientRect();
  return {
    viewport: innerWidth,
    modalW: Math.round(r.width),
    dentroDaTela: r.left >= 0 && r.right <= innerWidth,
    overflowHorizontal: document.documentElement.scrollWidth > innerWidth,
  };
})()
```

Rodar a 1920, 1017 e 390. Esperado em todas: `dentroDaTela: true`, `overflowHorizontal: false`. A 390 o `modalW` deve ser ~358 (`100vw - 2rem`).

- [ ] **Step 5: Rodar o detector do Impeccable**

```bash
node C:/Users/GAMER/.claude/skills/impeccable/scripts/detect.mjs --json components/skill-dialog.tsx components/skills-section.tsx
```

Esperado: `[]`. Qualquer achado deve ser corrigido antes de encerrar.

- [ ] **Step 6: Build final e snapshot**

Parar o `pnpm dev` antes:

```bash
pnpm build
```

Esperado: **PASSA**, com `/` ainda listada como `○ (Static)`.

```bash
mkdir -p _backup/2026-08-16-modal/final && cp components/skills-section.tsx _backup/2026-08-16-modal/final/skills-section.tsx.bak && cp components/skill-dialog.tsx _backup/2026-08-16-modal/final/skill-dialog.tsx.bak && cp lib/portfolio-data.ts _backup/2026-08-16-modal/final/portfolio-data.ts.bak
```

> O sufixo `.bak` é obrigatório. O `tsconfig.json` inclui `**/*.ts` e `**/*.tsx`
> e só exclui `node_modules` — copiar com a extensão original coloca os backups
> dentro do typecheck do `next build`.

---

## Fora do escopo (do spec)

Não implementar neste plano:

- Links para projetos no rodapé do modal (§9 do spec — o mapa de tags e os dois obstáculos conhecidos estão documentados lá).
- Enquadramento narrativo de Node.js, SQL e Python (§4 do spec — adiado, revisitar junto com a copy do Sobre).
- Remoção de `level`, `levelLabel` e `category` dos dados.
