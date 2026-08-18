---
name: Manuel Sereno — Portfólio
description: Portfólio de desenvolvedor front-end e designer UI/UX, desenhado como uma planta técnica em cianotipia.
colors:
  primary: "oklch(0.83 0.104 214)"
  primary-foreground: "oklch(0.17 0.02 258)"
  background: "oklch(0.17 0.014 258)"
  foreground: "oklch(0.94 0.006 250)"
  card: "oklch(0.21 0.016 258)"
  secondary: "oklch(0.27 0.016 258)"
  muted: "oklch(0.25 0.015 258)"
  muted-foreground: "oklch(0.68 0.014 250)"
  border: "oklch(1 0 0 / 10%)"
  input: "oklch(1 0 0 / 14%)"
  destructive: "oklch(0.62 0.2 25)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
    fontFeature: "'ss01', 'cv01'"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.25em"
rounded:
  sm: "4.8px"
  md: "6.4px"
  lg: "8px"
  xl: "11.2px"
  "2xl": "14.4px"
  full: "9999px"
spacing:
  card-sm: "1.25rem"
  card: "1.5rem"
  card-lg: "2rem"
  gutter: "1.5rem"
  gutter-lg: "2rem"
  section: "6rem"
  section-lg: "8rem"
components:
  cta-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  cta-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  card-skill:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "1.25rem"
  card-service:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
    padding: "2rem"
  dialog:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
    padding: "1.5rem"
    width: "28rem"
---

# Design System: Manuel Sereno — Portfólio

## Overview

**Creative North Star: "A Planta Cianotípica"**

A cianotipia nasceu como processo de reprodução técnica — o jeito barato de copiar plantas de engenharia — e acabou virando meio artístico sem deixar de ser rigor. Linhas claras sobre fundo azul profundo, uma cor só, nenhuma tinta desperdiçada. Este sistema segue a mesma lógica: fundo azul-quase-preto, fios de 1px como ferramenta primária de separação, anotação em letra técnica, e um único ciano que aparece pouco justamente para significar alguma coisa quando aparece.

Ele fala como quem escreve código: direto, sem adorno, sem gordura. Cada elemento existe porque tem função. Mas a contenção é elegante, não áspera — a precisão está tanto no desenho (borda de 1px, raio consistente, o traço do card alinhado à largura exata do ícone acima) quanto no gesto (só o CTA se desloca, e só 2px). O visual não compete com o conteúdo; ele o organiza, do jeito que uma prancha organiza um projeto.

A profundidade nunca vem de sombra em superfície. Vem de degrau tonal — fundo, depois `card/40` nas seções alternadas, depois `card` nas superfícies — sempre reforçado por um fio de 1px. Sombra existe, mas só para o que literalmente flutua acima da página.

**Key Characteristics:**
- Escuro por padrão, plano por convicção
- Um único acento cromático, usado com escassez deliberada
- Separação por fio de 1px, nunca por bloco preenchido ou sombra
- Seções numeradas, com legenda em mono caixa-alta
- Três vozes tipográficas com papéis rígidos e não intercambiáveis
- Ritmo vertical generoso (6–8rem entre seções)

## Colors

Paleta monocromática azul-ardósia com um único acento ciano — sem cor secundária, sem terciária, por escolha e não por omissão.

### Primary
- **Ciano React** (`oklch(0.83 0.104 214)`): um ciano claro, dessaturado e frio, quase gelo — nomeado a partir da paleta do React, que é a stack central do portfólio. É o único acento do sistema. Aparece em: números de seção, labels de destaque, o ponto pulsante de "disponível para novos projetos", o preenchimento do CTA principal, e a borda de qualquer superfície sob o cursor. Também é o valor de `--accent` e `--ring`, que são apelidos dele, não cores distintas.

### Neutral
- **Azul-Ardósia Profundo** (`oklch(0.17 0.014 258)`): o fundo da prancha. Base de toda a página.
- **Ardósia Elevada** (`oklch(0.21 0.016 258)`): superfície um degrau acima do fundo. Usada em cards de serviço, no modal, e a 40% de opacidade para tingir seções alternadas (Habilidades, Contato) sem recorrer a borda de bloco.
- **Ardósia Média** (`oklch(0.25 0.015 258)` / `oklch(0.27 0.016 258)`): degraus intermediários para estados discretos e trilhos.
- **Névoa Clara** (`oklch(0.94 0.006 250)`): texto principal. Nunca branco puro.
- **Névoa Recuada** (`oklch(0.68 0.014 250)`): corpo de texto, legendas, e todo o texto secundário. É a cor de leitura padrão — o texto principal em `foreground` é a exceção, reservada a títulos e ênfase.
- **Fio** (`oklch(1 0 0 / 10%)`): branco a 10% de opacidade. Toda borda e todo separador do sistema.

### Named Rules

**A Regra do Sinal Único.** Existe exatamente um acento cromático. Se uma tela precisa de uma segunda cor para se organizar, o problema é de hierarquia tipográfica ou de espaço, não de paleta. Teste: conte os elementos em ciano numa tela — se passar de três, um deles não merecia.

**A Regra do Fio.** Separação é sempre uma linha de 1px em `border`. Nunca um bloco preenchido, nunca uma sombra, nunca uma mudança brusca de fundo. Quando duas regiões precisam se distinguir mais do que o fio consegue, use o degrau tonal (`card/40`) *somado* ao fio, não no lugar dele.

## Typography

**Display Font:** Space Grotesk (com `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Inter (com `ui-sans-serif, system-ui, sans-serif`), com `font-feature-settings: 'ss01', 'cv01'`
**Label/Mono Font:** JetBrains Mono (com `ui-monospace, monospace`)

**Character:** Space Grotesk tem a geometria levemente estranha de uma grotesca técnica — afirma sem gritar. Inter desaparece a serviço da leitura. JetBrains Mono não é decoração de "tema programador": é a letra da legenda técnica, e só aparece onde há anotação, não onde há prosa.

### Hierarchy
- **Display** (700, `3.75rem` → `4.5rem` em `sm` → `6rem` em `lg`, line-height `0.95`): apenas o nome no hero. Uma ocorrência por página.
- **Headline** (700, `1.875rem` → `2.25rem` em `sm`, line-height `1.25`): título de seção. A variante longa de Contato sobe para `2.25rem` → `3rem` com line-height `1.05`.
- **Title** (600, `1.5rem`; 700 em `2.25rem` no projeto em destaque): títulos de card e de projeto.
- **Body** (400, `1rem`, line-height `1.625`): toda a prosa, em `muted-foreground`. Largura máxima de `max-w-2xl` (42rem) em blocos de introdução e `max-w-md` (28rem) em colunas.
- **Label** (400, `0.75rem`, letter-spacing `0.25em`, caixa-alta): a legenda técnica. Eyebrow de seção, nome de canal de contato, tags, rodapé.

### Named Rules

**A Regra das Três Vozes.** Cada família tem um papel e não empresta: Space Grotesk **afirma** (títulos), Inter **explica** (prosa), JetBrains Mono **anota** (label, número, tag, CTA). Prosa corrida em mono é erro; título em Inter é erro.

**A Regra da Legenda.** Todo label em mono é caixa-alta com `letter-spacing` de `0.25em` (ou `0.1em` nas variantes compactas). Mono em caixa-baixa só aparece dentro de citação literal de código na copy (`const desenvolvedor = {`, `// vamos construir algo juntos`).

## Layout

Container único de `max-w-6xl` (72rem / 1152px), centralizado, com respiro lateral de `1.5rem` que sobe para `2rem` a partir de `lg` (1024px). Esse container **não cresce** acima de 1152px: em telas maiores, a margem lateral aumenta e a medida de leitura permanece constante.

O ritmo vertical entre seções é de `6rem`, subindo para `8rem` em `lg`. Toda seção com âncora carrega `scroll-mt-24` (6rem) para compensar o header fixo na navegação por link.

**Composição das seções:** cabeçalho em largura total (eyebrow → título → parágrafo de apoio) seguido de grade em largura total. Grades assimétricas de duas colunas existem em Sobre (`1.1fr 1fr`) e Contato (`1.2fr 1fr`), onde as duas colunas têm altura semelhante. Onde uma coluna seria muito mais alta que a outra, a seção usa a composição empilhada — evita o vazio vertical que a assimetria produziria.

**Densidade de grade:** cards de habilidade em 1 → 2 (`sm`) → 3 (`lg`) colunas com gap de `1rem`. Cards de serviço e projeto em 1 → 2 (`sm`) colunas com gaps maiores (`1.5rem` e `2.5rem`/`4rem` respectivamente).

**Breakpoints:** os padrões do Tailwind — `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. A troca estrutural relevante acontece em `sm` e `lg`.

**Barra de rolagem:** oculta visualmente em todos os navegadores (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`), sem afetar a rolagem. Rolagem por âncora é suave, condicionada a `prefers-reduced-motion: no-preference`.

## Elevation & Depth

Este sistema é **plano**. Nenhuma superfície dentro do fluxo da página projeta sombra — nem card, nem seção, nem imagem, nem tag. A profundidade é construída por dois meios combinados: degrau tonal (`background` → `card/40` → `card`) e o fio de 1px em `border`.

Sombra existe, mas o critério é literal: só recebe sombra o que **flutua acima do plano da página**.

### Shadow Vocabulary
- **Flutuante** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)`): o header quando se destaca da página ao rolar e assume forma de pílula.
- **Sobreposto** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`): o modal, que precisa se separar do conteúdo por trás do backdrop.

### Named Rules

**A Regra do Plano.** Se o elemento está no fluxo do documento, ele é plano. Sombra é resposta a *sair* do plano, não a hierarquia. Precisa destacar um card? Use o degrau tonal ou acenda a borda — não adicione sombra.

## Shapes

Geometria calma, sem canto vivo e sem exagero. A escala de raio deriva de uma base de `8px` (`--radius`), com degraus proporcionais: `4.8px`, `6.4px`, `8px`, `11.2px`, `14.4px`.

Na prática o sistema usa três formas:
- **`rounded-xl` (11.2px)** — cards de conteúdo denso (habilidades) e molduras de imagem.
- **`rounded-2xl` (14.4px)** — superfícies maiores (cards de serviço, modal).
- **`rounded-full`** — reservado a duas coisas: pílulas de ação (CTA, header recolhido) e marcadores compactos (tag, ponto de status, marcador da timeline).

Bordas são sempre de 1px, sempre em `border`. Não há borda de 2px, nem borda tracejada, nem borda colorida em repouso — a borda só ganha cor (`primary/50`) como resposta a hover ou foco.

Uma forma assinatura recorre em todo o sistema: o **fio horizontal de 1px** (`h-px`), usado como régua do eyebrow de seção, como divisor de rodapé, e como traço decorativo nos cards de habilidade.

## Components

### Buttons
O sistema **não usa** um componente de botão genérico. As ações são pílulas escritas à mão, sempre em mono.

- **Shape:** totalmente arredondada (`rounded-full`), padding `0.75rem 1.5rem`.
- **Primary:** preenchimento sólido em Ciano React, texto em `primary-foreground`, `font-mono text-sm font-medium`. Acompanhado de um ícone `ArrowUpRight` de 16px. Aparece **uma vez por seção**, na ação principal.
- **Hover (primary):** o botão inteiro sobe 2px (`translateY(-2px)`) e a seta se desloca 2px na diagonal (direita e cima). É o único componente do sistema que se move.
- **Outline:** fundo transparente, borda de 1px em `border`, texto em `foreground`. No hover a borda vira `primary/50` e o texto vira Ciano React. Não se move.

### Chips
- **Style:** fundo transparente, borda de 1px em `border`, texto em `muted-foreground`, `font-mono text-xs`, `rounded-full`, padding `0.25rem 0.75rem`.
- **State:** estático. Tags são rótulos, não controles — não têm hover nem estado selecionado.

### Cards / Containers
- **Corner Style:** `rounded-xl` (11.2px) para cards densos, `rounded-2xl` (14.4px) para superfícies maiores.
- **Background:** `background` quando o card está sobre uma seção tingida; `card` quando está sobre o fundo puro. O card é sempre um degrau tonal de distância da sua seção.
- **Shadow Strategy:** nenhuma. Ver Elevation & Depth.
- **Border:** 1px em `border`, virando `primary/50` no hover do grupo.
- **Internal Padding:** `1.25rem` (denso) a `2rem` (espaçoso).

### Navigation
Header fixo que **muda de forma ao rolar**: começa em largura total (`max-w-6xl`), fundo translúcido e sem raio; após 24px de rolagem, recolhe para uma pílula (`max-w-4xl`, `rounded-full`) com borda, `backdrop-blur-md` e a sombra Flutuante. A transição é de 300ms.

Links em `font-mono text-xs` caixa-alta com `tracking-widest`, em `muted-foreground`, virando `foreground` no hover. O CTA do header é uma pílula de contorno em ciano que inverte para preenchimento sólido no hover. Em telas abaixo de `md`, o menu vira painel expansível abaixo da barra.

### Dialog
Backdrop em `background/80` com `backdrop-blur-sm`. Popup centralizado, `max-w-md` (28rem) limitado a `100vw - 2rem`, `rounded-2xl`, fundo `card`, borda de 1px, sombra Sobreposto, padding `1.5rem`. Cabeçalho com logo + título e botão de fechar em X; corpo com dois parágrafos curtos em `text-sm`. Fecha por X, clique fora ou `Esc`.

### Section Eyebrow (assinatura)
O componente mais característico do sistema, presente no topo de todas as cinco seções internas: um número sequencial de dois dígitos em Ciano React (`font-mono text-sm`), um fio de 1px que ocupa todo o espaço disponível (`h-px flex-1 bg-border`), e o nome da seção em mono caixa-alta com `tracking-[0.25em]` em `muted-foreground`. É a legenda da prancha — o elemento que mais literalmente encarna o North Star.

### Skill Card (assinatura)
Card clicável que abre o modal da tecnologia. O card inteiro é o alvo de clique. Contém ícone de 44px em moldura arredondada, nome em `font-display text-base font-semibold`, e abaixo um traço decorativo de 1px que em repouso tem **exatamente a largura do ícone** (44px) e cresce até a largura total do card no hover ou no foco por teclado. O traço é ornamento puro — fica fora da árvore de acessibilidade.

## Do's and Don'ts

### Do:
- **Do** usar o fio de 1px (`h-px bg-border`) como recurso primário de separação — é a ferramenta de desenho deste sistema.
- **Do** manter o acento em no máximo três ocorrências por tela, seguindo A Regra do Sinal Único.
- **Do** derivar profundidade de degrau tonal (`background` → `card/40` → `card`) somado a borda, nunca de sombra.
- **Do** abrir toda seção nova com o Section Eyebrow, continuando a numeração sequencial.
- **Do** respeitar A Regra das Três Vozes: Space Grotesk afirma, Inter explica, JetBrains Mono anota.
- **Do** usar `rounded-full` apenas para ação e marcador compacto; conteúdo usa `rounded-xl` ou `rounded-2xl`.
- **Do** condicionar qualquer movimento novo a `prefers-reduced-motion`, como já fazem a rolagem suave e o traço do card de habilidade.

### Don't:
- **Don't** usar um componente do shadcn com a estética padrão dele. O shadcn entrega o código-fonte para você editar — ao adicionar `Button`, `Input` ou qualquer outro, reestilize-o para este sistema **antes** de colocar em tela. Referência concreta: o botão padrão do shadcn (altura de 32px, `rounded-lg`, variantes `secondary`/`destructive`/`link`) contradiz a ação real deste sistema, que é a pílula em mono `rounded-full` com padding `0.75rem 1.5rem`.
- **Don't** adicionar sombra a qualquer coisa que esteja no fluxo da página.
- **Don't** introduzir uma segunda cor de acento. Falta de hierarquia se resolve com tipografia e espaço.
- **Don't** deixar o container passar de `max-w-6xl`. Em telas grandes, a margem cresce — a medida de leitura não.
- **Don't** usar mono para prosa corrida, nem Inter para título.
- **Don't** deslocar elementos no hover. A resposta padrão é a borda acender; só o CTA principal se move, e só 2px.
- **Don't** usar branco puro (`#fff`) para texto nem preto puro para fundo. Os extremos da paleta são `foreground` e `background`.
- **Don't** montar grade assimétrica de duas colunas quando uma das colunas for muito mais alta que a outra — use a composição empilhada.
