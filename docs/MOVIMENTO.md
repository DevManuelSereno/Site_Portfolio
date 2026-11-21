# Movimento e fundo

> Rascunho até o ok do Manuel. Resumo do que existe. O plano (por etapa) está em `PLANO-MOVIMENTO.md` e o raciocínio em `DECISOES-MOVIMENTO.md`.

## Princípios

- O conteúdo fica no HTML estático; as camadas só cobrem a página. `/` continua estática.
- Reduced-motion, economia de dados, 2 GB de memória ou menos e toque desligam ou simplificam tudo.
- O que não está à vista não roda: aba oculta ou seção fora da tela para o loop.
- Bibliotecas por `import()` dinâmico, só quando o efeito vai rodar. GSAP 3.15.1, `@usefluid/motion` 0.1.2 (só o morph da abertura) e `lenis` 1.3.27, todos em versão exata.

## O que existe

| Efeito | Onde | Notas |
|---|---|---|
| Rastreador de cursor | `src/lib/motion/pointer-field.ts` | Um loop único; para quando converge; alimenta fundo, rede e cards. |
| Decisão de movimento | `capability.ts`, `intro-policy.ts`, `intro-gate.ts` | O script do `<head>` é gerado com `toString()` dessas funções (não há duas cópias). |
| Fundo (grade e luz) | `components/layout/page-field.tsx`, `.page-field*` em `globals.css` | Grade fixa na página toda; a luz é um quadrado movido por `transform`. |
| Abertura (~2,9 s) | `components/intro/*` | Só na home; 1ª visita ou mais de 14 dias (`ms:last-visit`); `?intro=1` força. Sem botão de pular. |
| Hero | `portfolio/hero-visual*.tsx`, `hero-network.tsx` | Wireframe→UI em SVG com slot para foto; rede de nós em canvas, só no Hero. |
| Brilho de borda | `components/layout/card-glow.tsx`, `[data-glow]::after` | Anel de 1px no hover; marcar o card com `data-glow`. Some em toque e reduced-motion. |
| Projetos | `portfolio/projects-section.tsx`, `projects-motion.tsx`, `projects-showcase.tsx`, `project-parts.tsx`; contas em `lib/motion/project-steps.ts` | O servidor só renderiza a lista. Perto da seção (1500 px), o cliente carrega GSAP e o showcase e fixa a seção (ScrollTrigger pin), 0,4 tela por projeto: janela de editor a partir de 1024 px, blocos que se trocam abaixo disso. Lista simples com reduced-motion, economia de dados, pouca memória, sem JS ou em janelas baixas (menos de 700 px no editor, 680 px nos blocos). Planejamento em `PLANO-PROJETOS.md`. |
| Rolagem suave | `components/layout/smooth-scroll.tsx`, `lib/motion/smooth-scroll.ts` | Lenis 1.3.27, uma instância na página toda, só com movimento permitido; `syncTouch` desligado (toque nativo). Um relógio só: rAF próprio até o GSAP chegar, depois o `gsap.ticker` (com `performance.now()` para os dois terem a mesma origem). Âncoras pelo Lenis, que já desconta o `scroll-mt`. Parado durante a abertura (`intro:done` o liga). `html.lenis` tira o `scroll-behavior: smooth` do CSS. |
| Formulário | `portfolio/contact-form.tsx` | Fade do status e seta pulsando ao enviar (CSS, `motion-safe`). |

## Exceções à regra "animar só `transform`, `opacity`, `filter` e `clip-path`"

- Abertura (menos de 3 s): máscara da grade (`--r`), `stroke-dashoffset` dos eixos e troca do `d` no morph.
- Hero: `stroke-dashoffset` e `fill-opacity` do desenho, e a transição de cor do `stroke`.
- Cards: o gradiente do `::after` do brilho, movido por `--gx`/`--gy`, repinta o card em hover.
- Fundo: o `mask-image` da grade acesa, movido por `--lx`/`--ly` (custo aceito, não medido no DevTools).
- Projetos: o `pin` do ScrollTrigger reposiciona o palco (posição e espaçador de rolagem), e o Lenis move a rolagem por JavaScript. A barra de progresso usa a propriedade `scale`, não `transform` (o `scale-x-0` do Tailwind 4 já usa `scale`).

## Regras do `DESIGN.md` relaxadas (Manuel, 2026-11-20)

- "Nada se move no hover" e "no máximo três ocorrências do acento".
- O fundo e a luz são exceção à Regra do Fio e à Regra do Plano.
- Continuam: sem sombra no fluxo, três vozes tipográficas, `max-w-6xl`.

## Testes

`npm test` (unitários, `node:test`, exige Node 22.18 ou mais novo) e `npm run test:smoke` (HTML servido por `next start`; `BASE_URL` muda o endereço, padrão `localhost:3001`). O build de produção é `next build`; neste ambiente o hook do `rtk` o reescreve, então use `rtk bypass npx next build`.

## Em aberto

- LCP, FCP, INP, Lighthouse e `ui-check` nunca foram medidos com a página pintando.
- Safari, Firefox e mobile real; Googlebot (Inspeção de URL, depois de publicar).
- Projetos: as capturas são as imagens quadradas antigas; trocar pelas 16:10 (campo `image`). Os valores de `kind` ("Identidade + site" etc.) são provisórios. Ver `PLANO-PROJETOS.md`.
- Projetos: ao recarregar ou abrir com âncora, a lista aparece por cerca de 1 s e depois a versão fixada assume (a posição final fica certa). Ctrl+F não acha projetos inativos com a seção fixada.
- Lenis: nunca testado em Safari, iOS, Android nem com leitor de tela; o rastreador de cursor segue com rAF próprio.
