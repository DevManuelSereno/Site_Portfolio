# Movimento e fundo

> Rascunho até o ok do Manuel. Resumo do que existe. O plano (por etapa) está em `PLANO-MOVIMENTO.md` e o raciocínio em `DECISOES-MOVIMENTO.md`.

## Princípios

- O conteúdo fica no HTML estático; as camadas só cobrem a página. `/` continua estática.
- Reduced-motion, economia de dados, 2 GB de memória ou menos e toque desligam ou simplificam tudo.
- O que não está à vista não roda: aba oculta ou seção fora da tela para o loop.
- Bibliotecas por `import()` dinâmico, só quando o efeito vai rodar. GSAP 3.15.1 e `@usefluid/motion` 0.1.2 (só o morph da abertura), ambos em versão exata.

## O que existe

| Efeito | Onde | Notas |
|---|---|---|
| Rastreador de cursor | `src/lib/motion/pointer-field.ts` | Um loop único; para quando converge; alimenta fundo, rede e cards. |
| Decisão de movimento | `capability.ts`, `intro-policy.ts`, `intro-gate.ts` | O script do `<head>` é gerado com `toString()` dessas funções (não há duas cópias). |
| Fundo (grade e luz) | `components/layout/page-field.tsx`, `.page-field*` em `globals.css` | Grade fixa na página toda; a luz é um quadrado movido por `transform`. |
| Abertura (~2,9 s) | `components/intro/*` | Só na home; 1ª visita ou mais de 14 dias (`ms:last-visit`); `?intro=1` força. Sem botão de pular. |
| Hero | `portfolio/hero-visual*.tsx`, `hero-network.tsx` | Wireframe→UI em SVG com slot para foto; rede de nós em canvas, só no Hero. |
| Brilho de borda | `components/layout/card-glow.tsx`, `[data-glow]::after` | Anel de 1px no hover; marcar o card com `data-glow`. Some em toque e reduced-motion. |
| Projetos | `portfolio/projects-section.tsx`, `projects-motion.tsx` | Entrada em scroll a partir de 1024px; o GSAP só carrega a 1500 px da seção. |
| Formulário | `portfolio/contact-form.tsx` | Fade do status e seta pulsando ao enviar (CSS, `motion-safe`). |

## Exceções à regra "animar só `transform`, `opacity`, `filter` e `clip-path`"

- Abertura (menos de 3 s): máscara da grade (`--r`), `stroke-dashoffset` dos eixos e troca do `d` no morph.
- Hero: `stroke-dashoffset` e `fill-opacity` do desenho, e a transição de cor do `stroke`.
- Cards: o gradiente do `::after` do brilho, movido por `--gx`/`--gy`, repinta o card em hover.
- Fundo: o `mask-image` da grade acesa, movido por `--lx`/`--ly` (custo aceito, não medido no DevTools).

## Regras do `DESIGN.md` relaxadas (Manuel, 2026-11-20)

- "Nada se move no hover" e "no máximo três ocorrências do acento".
- O fundo e a luz são exceção à Regra do Fio e à Regra do Plano.
- Continuam: sem sombra no fluxo, três vozes tipográficas, `max-w-6xl`.

## Testes

`npm test` (unitários, `node:test`, exige Node 22.18 ou mais novo) e `npm run test:smoke` (HTML servido por `next start`; `BASE_URL` muda o endereço, padrão `localhost:3001`). O build de produção é `next build`; neste ambiente o hook do `rtk` o reescreve, então use `rtk bypass npx next build`.

## Em aberto

- LCP, FCP, INP, Lighthouse e `ui-check` nunca foram medidos com a página pintando.
- Safari, Firefox e mobile real; Googlebot (Inspeção de URL, depois de publicar).
- Privacidade e cookies (`/privacidade`): resolver antes de publicar a abertura.
