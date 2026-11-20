# Plano: movimento e fundo do portfólio

> Plano de execução, uma etapa por vez, parando ao fim de cada uma para o ok do Manuel. Cada etapa declara `depende de:` e `→ verificar:`.
> Criado em 2026-11-20. Fica em `docs/` por decisão do Manuel (não é regra do Core). Não commitar sem pedido.
> Implementa o `general-purpose` (sonnet; opus se `[HIGH]`); revisa o `reviewer`. Sem worktree. Commit: só mensagem sugerida.

**Meta:** dar "sabor" ao visual sem exagero: fundo em camadas, Hero com wireframe que vira UI, abertura de cerca de 2,5 s e scroll narrativo em Projetos.

**Arquitetura:** o conteúdo continua no HTML estático e as camadas só cobrem a página. O CSS faz grade, luz e pontos; o `<canvas>` faz só a rede de nós no Hero; o GSAP cuida do desenho, do scroll e da abertura. Um único loop e um único rastreador de cursor alimentam tudo.

**Stack:** Next 16.3.1, React 19, Tailwind 4, GSAP, `@gsap/react` e `@usefluid/motion` (a instalar na etapa 2; o FluidUI foi adotado pelo Manuel depois do teste da etapa 1b).

## Decisões fechadas (Manuel, 2026-11-20)

- Fundo com as três camadas: grade (planta), luz ciano difusa e pontos com halo no cursor; rede de nós só no Hero. Projetos tem fundo liso. A rede de nós "desconexa" de linhas de código (opção 4 da demonstração) foi descartada.
- Hero: wireframe que vira interface, em SVG. O espaço do Hero é um slot trocável para uma foto do Manuel.
- Abertura de cerca de 2,9 s (teto 3 s), sem contador e **sem botão de pular**. **Versão aprovada: a com morph** (Artifact `Prancha Viva Morph`, versão 4): ponto, círculo e quadrado se transformam no `{ MS }`, que voa ao cabeçalho; a grade permanece como fundo. O morph é do FluidUI (motor `@usefluid/motion`); a grade, as réguas e o voo são do GSAP. A versão com traço foi descartada.
- Cenário da abertura: grade que se revela em círculo, plano cartesiano (eixos numerados com origem no centro, onde o ponto nasce; o alcance segue o tamanho da tela, de −14 a 14 em 1440 px de largura), réguas numeradas no topo e na esquerda, marcas de corte, cota "144 u" e carimbo de legenda. Ao fechar o logo, abre-se uma janela limpa nos eixos ao redor dele e da cota.
- Logo: o `{ MS }` fecha na abertura em JetBrains Mono **Regular (400)** e engrossa durante o voo até o **Bold (700)** do cabeçalho (morph entre os dois pesos). O caminho do logo é gerado das letras da fonte (4 partes: `{`, `M`, `S`, `}`).
- Fundo: a grade cobre a página toda (fixa, alinhada ao centro), com a luz ciano que segue o cursor. A rede de nós fica só no Hero, esmaecendo nos últimos 140 px. Os pontos em Habilidades ficam **em espera** (código mantido, desligados por padrão). Sem separador de linha entre o Hero e Habilidades.
- Frequência: mostra se nunca viu ou se passaram mais de 14 dias sem acessar (timestamp em `localStorage`). A visita só é renovada quando a pessoa vê a abertura até o fim ou quando não havia o que mostrar; abandono (erro, prazo de carga de 1,5 s, aba oculta) não conta, para ela ter outra chance. Aba oculta ao carregar não mostra e não conta; aba que fica oculta durante a abertura a encerra na hora. A abertura só existe na home. `?intro=1` força a abertura.
- Pula a abertura com reduced-motion, economia de dados ou memória declarada de 2 GB ou menos. Nesses casos o fundo fica estático. Sem teste de FPS.
- Relaxadas do `DESIGN.md`: "nada se move no hover" e "no máximo três ocorrências do acento". Continuam: sem sombra no fluxo, três vozes tipográficas, `max-w-6xl`.
- Movimento: GSAP para timeline, scroll e desenho; FluidUI só para o morph da abertura (e, talvez, o toast do formulário). Exceção consciente à regra "uma biblioteca de movimento por tela": o motor do Fluid não tem dependências. `@usefluid/motion` fixado na versão exata 0.1.2 (pacote de 1 semana de vida). Three.js fica fora por ora.
- Testes: pertinentes e sem exagero (ver etapas 2 e 4). O Manuel explicará depois o motivo de querer testes no projeto.
- Ordem: a abertura (a mais arriscada para SEO e LCP) vem antes do Hero, para falhar cedo.
- Privacidade e cookies: pendência separada (memória do projeto). Resolver antes de **publicar** a etapa 4.

## Restrições globais

- Antes de código: ler em `node_modules/next/dist/docs/` os guias pertinentes (`01-app/02-guides/preventing-flash-before-hydration.md`, `cookies`, componentes cliente), como o `AGENTS.md` manda.
- SEO da Fase 0 não pode regredir: metadata, JSON-LD, sitemap, OG. O texto da página precisa estar no HTML servido.
- Sem dependência nova sem ok do Manuel. Sem commit e sem `--no-verify`.
- Animar só `transform`, `opacity`, `filter` e `clip-path`. Toda animação respeita `prefers-reduced-motion`. **Exceção consciente, só na abertura (dura menos de 3 s e já era assim no protótipo aprovado):** a máscara da grade (`--r`), o `stroke-dashoffset` dos eixos e a troca do `d` do path no morph.
- Mudança cirúrgica: nada fora do escopo da etapa; código morto que aparecer só se aponta.

## Foco de revisão

1. Sem JavaScript ou com crawler: o texto do Hero aparece sem a abertura cobrindo.
2. `localStorage` bloqueado (modo privado) ou relógio errado: a abertura não quebra a página; timestamp inválido ou no futuro conta como "não viu".
3. Aba oculta ou seção fora da tela: o loop de animação para de verdade.
4. Tela ultrawide, DPR alto e redimensionamento: canvas e grade não deformam nem pesam.
5. Teclado e leitor de tela: o overlay não prende foco nem é anunciado como conteúdo.

## Etapas

- [x] **Etapa 0 · Preparação e linha de base** `[MED]` · depende de: nada · *fechada em 2026-11-20; INP, `ui-check` e Lighthouse ficam para o fim (etapa 9), se ainda houver necessidade (decisão do Manuel)*
  - Ler os guias do Next acima; anotar o que muda o plano (fora do repo).
  - Conferir a versão do Node (decide o executor de testes da etapa 2).
  - Medir a linha de base: `next build`, `eslint`, e LCP, CLS e INP da página atual numa build de produção; `ui-check`.
  - → verificar: build e lint passam; números anotados; estado do repo inalterado (só este plano novo em `docs/`).
  - **Linha de base (2026-11-20, build de produção em localhost:3001, `portfolio-prod`, sem limitação de CPU nem rede, navegador embutido, 1440x900):** `eslint` sem problemas; `next build` passa e `/` sai estática; FCP e LCP de 52 a 80 ms (2 cargas), elemento de LCP = o `<h1>` do Hero (texto); CLS 0; 15 requisições; cerca de 536 KB de JS descomprimido. **Falta:** INP, `ui-check` e Lighthouse (não medidos). Os números servem só para comparar antes e depois; não representam rede e CPU reais.
  - Entrada `portfolio-prod` acrescentada ao `.claude/launch.json` (autorizada pelo Manuel).

- [x] **Etapa 1 · Protótipo isolado** `[MED]` · depende de: 0 · *aprovada pelo Manuel em 2026-11-20 com a abertura em morph (Artifact privado `Prancha Viva Morph`, versão 4; o original `Prancha Viva` ficou como referência)*
  - HTML único com GSAP via CDN, fora do repo, publicado como Artifact privado: Hero (wireframe→UI), as três camadas de fundo e a abertura completa (sequência, voo do `{ MS }`).
  - → verificar: o Manuel aprova a cara e o ritmo (2,5 s); fluidez no navegador embutido.

- [x] **Etapa 1b · Teste do FluidUI** `[MED]` · depende de: 1 e do ok para `npm install` · *feita em 2026-11-20 (pasta descartável no scratchpad, instalado com `--ignore-scripts`). Resultado: passa nos três critérios nos testes feitos (SSR com `renderToString` sem erro; 9,4 KB min / 4,4 KB gzip contra 7,6 KB gzip do MorphSVG; morph para o `{ MS }` em glifos da JetBrains Mono, líquido e com chegada exata). Ressalvas: versão 0.1.2 com 1 semana de vida; Next 16 e Turbopack reais não testados; comparação visual com poucos quadros. Decisão do Manuel: adotar o FluidUI na abertura.*
  - Projeto Vite+React descartável em pasta nova do scratchpad (nunca no repo), instalando só `@usefluid/motion`.
  - Critérios: roda em React 19 sem erro de SSR; bundle pequeno; morph em `{ MS }` visivelmente melhor que o do GSAP.
  - → verificar: relatório "passa" ou "não passa" por critério. Se falhar, fica o GSAP.

- [x] **Etapa 2 · Base de movimento** `[MED]` · depende de: 1 aprovado · *feita em 2026-11-20: `npm test` 19 de 19, `tsc`, `eslint` e `next build` passam; revisão por `reviewer` (sonnet) sem bugs, 3 correções aplicadas. Aguardando o ok do Manuel para a etapa 3. Pendências anotadas da revisão: loop do cursor roda a 60 fps mesmo parado (otimizar na etapa 3 se o paint pesar); `pointer-field` não reage a mudança de reduced-motion com a página aberta; `package.json` sem `engines` (o `npm test` precisa de Node 22.18 ou mais novo).*
  - Instalar `gsap` 3.15.1 (publicada há mais de 14 dias), `@gsap/react` 2.1.2 e `@usefluid/motion` 0.1.2, todas em versão exata (ok do Manuel: GSAP e adoção do Fluid). Arquivos em `src/lib/motion/`: `intro-policy.ts` (decisão de mostrar a abertura), `capability.ts` (sinais de reduced-motion, economia de dados e memória) e `pointer-field.ts` (rastreador de cursor com loop único, só no cliente).
  - Função pura `shouldShowIntro(...)` (14 dias, `?intro=1`, timestamp inválido ou futuro, storage indisponível) com testes no executor nativo do Node (`node:test`), sem biblioteca nova. Se o Node da máquina não rodar TypeScript direto, pergunta ao Manuel antes de acrescentar dependência.
  - → verificar: build, lint e tipos passam; testes da função passam; console limpo; nada muda visualmente.

- [x] **Etapa 3 · Fundo: grade e luz** `[MED]` · depende de: 2 · *feita em 2026-11-20 (`PageField` em `src/components/layout/page-field.tsx`, CSS em `globals.css`, montado no `layout.tsx`; fundo do `<body>` removido, o do `<html>` basta). Revisão por `reviewer` (sonnet): sem bugs; 2 correções aplicadas: a luz virou um quadrado pintado que só se move por `transform` (antes recalculava um gradiente de tela cheia por quadro), e o rastreador de cursor passou a parar quando converge e a não ter deriva em toque (luz parada no ponto de repouso). Em produção local: LCP 60 a 92 ms (h1), CLS 0, JS 537 KB (linha de base 536 KB). Contraste medido (`contrast.py`): texto secundário 6,62:1 no fundo e 5,14:1 no pico da luz (AA ok); texto principal 6,22:1 no pior caso. **Ressalva medida:** o texto secundário sobre um fio da grade acesa sob o pico da luz cai a 2,58:1, só nos pixels de 1 px do fio. A grade acesa continua em `mask-image` com `var()` (repinta quando o cursor se move; custo aceito, sem DevTools para medir). Os separadores de seção que já existem (`border-y` em Habilidades, `border-t` em Contato) não foram tocados; a decisão de tirar o separador depois do Hero vale quando a rede de nós entrar (etapa 5). Ao fim (etapa 10): registrar a camada de fundo e a luz no `DESIGN.md` como exceção à "Regra do Fio" e ao "plano".*
  - Camadas globais em CSS: grade fixa na página toda, alinhada ao centro, com esmaecimento leve nas bordas, e luz ciano com atraso suave seguindo o cursor.
  - → verificar: prints desktop e mobile; contraste medido; reduced-motion estático; sem scroll lateral; custo de paint do halo no DevTools.

- [x] **Etapa 4 · Abertura** `[HIGH]` · depende de: 3 · *feita em 2026-11-20 (falta só a privacidade antes de PUBLICAR); implementada em 2026-11-20 por `general-purpose` (opus); revisada por dois `reviewer` (Spec em opus, Padrões em sonnet), sem bugs; correções aplicadas: overlay como primeiro filho do `<body>`, abertura só na home (`pathname === '/'`, sem gastar a visita nas outras rotas), `playing` volta a `false` no fim, cota e carimbo montados no cliente (não vão no HTML), tokens de fonte, tipo de `IntroGate.reason`. Decisões do Manuel aplicadas: a visita só conta quando a abertura termina (ou não havia o que mostrar), aba oculta e prazo de carga de 1,5 s; mantidos `@gsap/react` (até a etapa 5, remover se não for usada), o brilho do logo voador e o foco sem `inert`. Testes: 31 unitários e 5 de fumaça. Notas para outras etapas: o Hero (etapa 5) lê só `show` e o evento `intro:done` (sai em ~2,95 s, o protótipo começava o Hero aos 2,75 s); confirmar o Googlebot pela Inspeção de URL do Search Console depois de publicar; PageSpeed/Lighthouse sempre veem "primeira visita" (o overlay aparece na tira de quadros; avaliar na etapa 9).*
  - Script inline no `<head>` decide mostrar ou não (usa a função da etapa 2) e marca o `<html>`. Overlay `position: fixed` que só cobre. Sequência do protótipo aprovado (morph do FluidUI, plano cartesiano com janela no logo, logo 400→700 no voo ao cabeçalho); a grade permanece. Evento de fim para o Hero.
  - Decidir como o script inline sai de `src/lib/motion/intro-policy.ts` e `capability.ts` (revisão da etapa 2): um texto único gerado a partir dos módulos, com os tipos removidos e as duas constantes junto, nunca duas cópias escritas à mão.
  - Teste de fumaça do HTML servido (`node:test`, sem biblioteca): título, texto do Hero e JSON-LD presentes na resposta de `next start`.
  - Implementa em opus; revisão por dois `reviewer` em paralelo (Spec e Padrões).
  - → verificar: teste de fumaça passa; sem piscar antes da abertura na build de produção; LCP, CLS e INP com e sem abertura comparados à linha de base; `localStorage` bloqueado e relógio errado não quebram; foco do teclado não entra no overlay.

- [x] **Etapa 5 · Hero** `[MED]` · depende de: 3 e do evento da etapa 4 · *feita em 2026-11-20. Revisão por `reviewer` (sonnet), sem bugs; correções aplicadas: handlers do tilt num contêiner sem transform (a rotação na borda encolhia a área de hit e podia piscar), a rede ignora o primeiro frame do rastreador (era o ponto de repouso, não um cursor) e comentários que citavam o protótipo. `@gsap/react` removido (nenhum uso, conforme a decisão da etapa 4). Não corrigido, aceito: a rede reembaralha os nós ao redimensionar a janela. Implementada por `general-purpose` (sonnet) e verificada por mim em produção local: 35 testes, `tsc`, `eslint` e `next build` com `/` estática; LCP 68 ms com abertura e 84 ms sem (h1), CLS 0, JS inicial 554 KB; rede de nós 0 quadros por segundo fora da tela. Decisão de desenho: o wireframe só se desenha quando a abertura roda; nas outras visitas a arte já vem pronta (sem piscar e sem carregar GSAP). A arte não tem texto no HTML (sem as cotas numeradas nem "SLOT · FOTO" do protótipo). No celular a arte fica abaixo da primeira dobra.*
  - Wireframe→UI em SVG (traço com GSAP) no componente `HeroVisual` com slot para foto. Rede de nós em canvas atrás: teto de nós, pausa fora da tela e aba oculta, densidade de pixels limitada.
  - → verificar: prints; o loop para fora da tela; touch sem cursor; reduced-motion estático.

- [x] **Etapa 6 · Pontos e brilho nos cards** `[MED]` · depende de: 3 · *feita em 2026-11-20: `CardGlow` (`src/components/layout/card-glow.tsx`) usa o rastreador compartilhado e escreve `--gx`/`--gy` só no card em hover; o anel de 1px é o `[data-glow]::after` em `globals.css`, em Habilidades, Serviços e Projetos (moldura da imagem). Some com reduced-motion e em toque. Revisão por `reviewer` (sonnet): 1 achado médio (brilho pendurado em toque), corrigido; 2 baixos aceitos (varredura de `:hover` por quadro; `:hover` desatualizado durante a rolagem). `tsc`, `eslint`, 35 testes e `next build` passam. **Os pontos nas interseções não foram escritos** (não havia código a manter; ficam como ideia desligada). Não verificado: `ui-check`, contraste do anel, Safari/Firefox, mobile real.*
  - Brilho de borda nos cards seguindo o cursor. Os pontos nas interseções ficam **em espera** (desligados por padrão, código mantido) por decisão do Manuel.
  - → verificar: prints nas três seções; contraste; `ui-check`.

- [x] **Etapa 7 · Projetos: scroll narrativo** `[MED]` · depende de: 2 · *feita em 2026-11-20: os 5 projetos viraram linhas alternadas com contador "01 / 05" e moldura quadrada (`ProjectRow` em `projects-section.tsx`); `projects-motion.tsx` revela a imagem por `clip-path` (`fromTo` com `clearProps`) e sobe o texto, só a partir de 1024px e com movimento; GSAP e ScrollTrigger por `import()` dinâmico. Sem pin nem parallax (decisão minha, reversível). Removidos: legenda "Destaque", seta e zoom da imagem no hover. Revisão por `reviewer` (sonnet, não conseguiu animar no painel oculto): clip-path de `none` corrigido; ficam aceitos (a) piscada visível→escondido→visível se a linha já está na tela na hidratação, (b) linhas já vistas refazem a entrada ao cruzar 1024px, (c) sem `ScrollTrigger.refresh` após fontes. Não verificado: ritmo real, âncora `#projetos` e scroll restaurado com a aba visível, `ui-check`, Safari/Firefox, mobile real. Em aberto: `priority` na 1ª imagem (já existia; está abaixo da dobra e é deprecado no Next 16) e a tarja cinza que faz parte da arte da Biblioteca Virtual.*
  - Cada projeto ocupa a tela com entrada em scroll; em mobile e reduced-motion vira lista normal. Padroniza o enquadramento das imagens (tarjas laterais e bordas claras).
  - → verificar: prints; sem salto de layout; teclado; conteúdo continua no HTML.

- [x] **Etapa 8 · Acabamento** `[MED]` · depende de: 5, 6, 7 e do resultado da 1b · *feita em 2026-11-20: o quadrado branco era o `placeholder.svg` (#EAEAEA) da foto; virou um desenho decorativo no tema (moldura tracejada, diagonais e círculo, `aria-hidden`), sem imagem; ao trocar pela foto, pôr um `<Image>` no lugar. No formulário, a mensagem de status entra com fade e subida de 1 passo num `<span>` com chave (o `<p role="status">` fica estável para o leitor de tela anunciar), o botão ganha `active` e a seta pulsa ao enviar, tudo `motion-safe`. **FluidUI não foi usado aqui** (CSS bastou; sem peso extra). Sem revisão separada: entra na revisão do conjunto (etapa 9). Verificado: `tsc`, `eslint`, 35 testes, `next build`; no navegador, o placeholder sai escuro e o envio mostra a mensagem (sem configuração de e-mail local, então só o caminho de erro foi exercitado; nenhum e-mail enviado). Não verificado: sucesso real do envio, prints do movimento, mobile.*
  - Corrigir o quadrado branco da foto em Sobre; toast e botão de enviar com detalhe de movimento (FluidUI só se passou na 1b).
  - → verificar: prints; formulário de contato ainda funciona (teste local).

- [x] **Etapa 9 · Verificação final e revisão** `[HIGH]` · depende de: 0 a 8 · *feita em 2026-11-20, com lacunas declaradas. **Correção de processo:** os `next build` das etapas 6 a 8 rodados como `rtk npx next build` não compilavam (o hook reescrevia o comando; `.next` só tinha `dev/`); o build real é `rtk bypass npx next build` e passa. Medido em produção local: teste de fumaça 5/5; SEO sem regressão (título, `<h1>`, 1 JSON-LD, canonical, OG completo, `robots.txt`, `sitemap.xml`, texto dos projetos no HTML); CLS 0; 35 testes, `tsc`, `eslint`. JS inicial: 690 KB quando o GSAP de Projetos carregava na hora; corrigido para carregar só a 1500 px da seção (e nunca no celular): **557 KB na carga** (linha de base 536) e 670 KB perto de Projetos. **Não medido:** LCP, FCP e INP (o painel do navegador não pinta), Lighthouse, `ui-check`; medir numa aba visível ou no PageSpeed depois de publicar. Revisão do conjunto por `reviewer` (opus): os 5 itens do "Foco de revisão" passam; 0 achados de spec novos. Corrigidos: `intro:done` repetido quando o prazo de 1,5 s vence antes do chunk da abertura (`intro-controller.tsx`) e comentários do CardGlow que diziam que o anel nunca aparece com pouca memória ou sem JS (aparece parado no centro). **Aceitos, sem correção:** a rede não reage a troca de DPR sem resize; sem teto de pixels do canvas em ultrawide com DPR 2; a máscara da grade da abertura (`--r` 1200 px) não alcança os cantos em 3440x1440; pior caso do overlay ~4,45 s (prazo de carga 1,5 s + 2,95 s), acima do "teto 3 s" se ele valer para o tempo na tela; a rede roda por baixo do overlay durante a abertura. **Para a etapa 10 registrar como exceções à regra de animação:** `stroke-dashoffset`/`fill-opacity` do Hero, o gradiente do `::after` do CardGlow movido por variável e o `mask-image` da grade acesa. **Pendência de deploy:** o `pnpm-lock.yaml` commitado (HEAD) não tem `gsap` nem `@usefluid/motion` (o `package-lock.json` tem); o working tree já traz o lockfile corrigido, ainda sem commit, e o repo tem dois lockfiles; confirmar qual gerenciador o Vercel usa antes de publicar.*
  - Build de produção, `ui-check`, LCP/CLS/INP em todas as combinações, regressão de SEO (metadata, JSON-LD, sitemap, OG), revisão do conjunto pelo `reviewer` (máx. 3 rodadas).
  - → verificar: números lado a lado com a linha de base; achados classificados.

- [x] **Etapa 10 · Documentação** `[LOW]` · depende de: 9 · *feita em 2026-11-20, como **rascunho até o ok do Manuel**: `docs/MOVIMENTO.md` (resumo, exceções de animação, regras relaxadas, testes, pendências) e uma nota no fim do `DESIGN.md` apontando para ele. Mensagens de commit sugeridas ao fim de cada etapa na conversa; nada foi commitado.*
  - `docs/MOVIMENTO.md` curto e uma linha no `DESIGN.md` apontando para ele. Rascunho até o ok do Manuel. Mensagens de commit sugeridas por etapa.

## Fora deste plano

- Privacidade e cookies (aviso do formulário, `/privacidade`): anotada como pendência. Resolver antes de publicar a etapa 4.
- Pendências de conteúdo (copy, links dos projetos, projetos de 2026, domínio): continuam adiadas.
- README, WARP.md e EMAIL_SETUP_INSTRUCTIONS.md desatualizados: fora do escopo.
