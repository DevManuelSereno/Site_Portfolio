# Plano: seção Projetos em "janela de editor"

> Plano de execução, uma etapa por vez, parando ao fim de cada uma para o ok do Manuel. Cada etapa declara `depende de:` e `→ verificar:`.
> Criado em 2026-11-21. Fica em `docs/` seguindo o precedente do `PLANO-MOVIMENTO.md`. Não commitar sem pedido.
> Implementa o `general-purpose` (sonnet; opus se `[HIGH]`); revisa o `reviewer`. Sem worktree. Commit: só mensagem sugerida.

**Meta:** trocar a lista atual de Projetos por uma janela de editor fixada na tela (referência: a seção "Selected work" do aonnoysengupta.com): abas em forma de arquivo, painel esquerdo como README, preview em moldura de navegador à direita, e a rolagem trocando de projeto. Adaptada ao nosso visual de planta, sem copiar o dele.

**Como a referência funciona (observado em 2026-11-21):** uma seção fixada com GSAP ScrollTrigger (`pin-spacer`, cerca de 1,08 tela de rolagem por projeto); o progresso da rolagem escolhe o projeto ativo; abas (`role="tab"`) clicáveis; contador "01 / 05" e barra de progresso; link "skip" que pula a seção; versão separada em cartões no celular; todo o conteúdo no HTML. Os previews dele são mockups animados feitos à mão. Rolagem suave com Lenis na página toda.

**Arquitetura:** o HTML estático continua servindo os 5 projetos como lista. Um componente cliente, por `import()` dinâmico, a reorganiza em janela de editor e fixa a seção, só em telas ≥ 1024 px e com movimento. Abaixo disso, com reduced-motion, economia de dados, pouca memória ou sem JavaScript, fica a lista.

## Decisões fechadas (Manuel, 2026-11-21)

- Fixar a seção no desktop, com as abas clicáveis; fallback em lista no celular e com reduced-motion.
- Cerca de 0,7 tela de rolagem por projeto (seção inteira em torno de 3,5 telas). Ajustável pelo protótipo.
- Painel esquerdo só com o que existe: título, ano, descrição, `tipo` e `stack` (vindos das tags). O botão "Case study" só aparece quando houver página ou link. Sem métricas inventadas.
- Preview: captura do projeto dentro de uma moldura de navegador, na proporção de uma tela (cerca de 16:10). O Manuel fornece as capturas.
- Abas com nomes de arquivo em minúsculas, como `giuliana-ragno.tsx`.
- Fazer primeiro um protótipo isolado (Artifact privado), como na abertura, e só depois levar ao código.
- **Lenis: mantido** (Manuel, 2026-11-21), apesar de a pesquisa (etapa 2) recomendar não usar por padrão. Escopo ainda a fechar na etapa 6; a pesquisa aponta a instância única, criada uma vez (ver etapa 6), e não criar e destruir por seção.
- Preview **estático** (Manuel, 2026-11-21): uma captura da parte principal de cada projeto (a home ou o trecho que melhor o representa), dentro da moldura de navegador, na proporção de uma tela (cerca de 16:10). Sem captura comprida nem movimento dentro da moldura; foi testada no protótipo e descartada.
- Telas menores (< 1024 px): a seção também fica fixada, sem a janela de editor. Cada projeto é um bloco sem fundo nem borda (contador e ano, título, descrição, tags, e a captura na moldura de navegador embaixo), e a rolagem **troca** o atual pelo próximo (sem empilhar), até o último; então a página segue. Com reduced-motion, lista simples.
- Rolagem por projeto: como o preview é estático, o projeto não precisa de tempo de leitura longo. Manuel escolheu **0,3 tela** no protótipo (0,6 era o melhor com o preview em movimento) e subiu para **0,4** no código (2026-11-21).

## Restrições globais

- Antes de código: ler em `node_modules/next/dist/docs/` os guias pertinentes (componentes cliente e o que mudou), como o `AGENTS.md` manda.
- SEO: o texto dos 5 projetos precisa continuar no HTML servido (o teste de fumaça passa a conferir os títulos).
- Dependência nova (Lenis) só com ok do Manuel, em versão exata e publicada há mais de 14 dias.
- Animar só `transform`, `opacity`, `filter` e `clip-path`. Toda animação respeita `prefers-reduced-motion`.
- Sem sombra no fluxo; três vozes tipográficas (mono anota); `max-w-6xl`; só tokens do tema.
- Mudança cirúrgica: nada fora do escopo da etapa; código morto só se aponta.

## Foco de revisão

1. Sem JavaScript ou com crawler: os 5 projetos aparecem como lista, com todo o texto.
2. Teclado e leitor de tela: abas em `tablist` com setas, link de pular a seção, a fixação não prende o foco.
3. Âncora `#projetos` e `#contato`, scroll restaurado e recarregar no meio da seção chegam no ponto certo.
4. Resize, ultrawide e DPR alto: a janela não deforma; `ScrollTrigger.refresh` depois das fontes.
5. Sem salto de layout (CLS) com o `pin-spacer`; o loop e o GSAP só carregam perto da seção.
6. Troca de breakpoint (1024 px) em tempo real: volta limpa para a lista.

## Etapas

- [x] **Etapa 0 · Preparação** `[LOW]` · depende de: nada · *feita em 2026-11-21 (guias do Next lidos pelo implementador).*
  - Ler os guias do Next acima; conferir o estado do repo e a versão de GSAP/ScrollTrigger já instalada.
  - → verificar: árvore limpa; anotado o que muda o plano (fora do repo).

- [x] **Etapa 1 · Protótipo isolado** `[MED]` · depende de: nada · *aprovada pelo Manuel em 2026-11-21 (Artifact privado `Janela de Projetos`, versão 9).*
  - HTML único, publicado como Artifact privado: janela de editor, 5 abas, README à esquerda, moldura de navegador com as capturas atuais, contador, barra de progresso, "skip", clique na aba. GSAP e ScrollTrigger por CDN, em versão exata.
  - Com um botão que liga e desliga o Lenis, para sentir a diferença na hora. Parâmetro fácil para a distância por projeto.
  - → verificar: o Manuel aprova o ritmo (0,7 tela é bom?), a moldura e a cara; decide o Lenis (não, só nesta seção, ou na página toda).

- [x] **Etapa 2 · Pesquisa do Lenis** `[MED]` · depende de: nada (em paralelo com a 1) · `researcher` (sonnet) · *feita em 2026-11-21: o relatório recomendava não usar por padrão; o Manuel decidiu usar, com instância única.*
  - Versão atual e tamanho; convivência com ScrollTrigger, Next 16 e React 19; acessibilidade (âncoras, busca na página, teclado, reduced-motion, restauração de scroll, toque); interação com o fundo fixo e o rastreador de cursor; o que muda se for na página toda.
  - → verificar: relatório com fontes, separando fato, hipótese e recomendação; viabilidade para "página toda" e "só a seção".

- [ ] **Etapa 3 · Capturas e dados** `[LOW]` · depende de: 1 aprovada e das capturas do Manuel · *parcial: os campos `file` e `kind` existem (o `kind` é provisório); as capturas 16:10 continuam pendentes, e o código usa as imagens quadradas antigas.*
  - O Manuel entrega as capturas na proporção de tela (uma por projeto). Ajustar o tipo `Project` (nome do arquivo na aba, `tipo`, imagem da captura) em `portfolio-data.ts` e as imagens em `public/projects/`.
  - → verificar: `tsc` passa; imagens leves e com `alt`; nenhum projeto sem captura.

- [x] **Etapa 4 · Estrutura da seção** `[MED]` · depende de: 3 · *feita em 2026-11-21 (lista semântica no servidor; showcase só no cliente).*
  - Server component com a lista (HTML estático) e a marcação para a janela de editor (abas, README, moldura). Função pura que mapeia o progresso da rolagem ao projeto ativo, com testes em `node:test`. Teste de fumaça conferindo os 5 títulos no HTML.
  - → verificar: `tsc`, `eslint`, testes e `next build` passam; lista correta sem JS; `/` continua estática.

- [x] **Etapa 5 · Movimento da seção** `[HIGH]` · depende de: 4 · opus; revisão por dois `reviewer` (Spec e Padrões) · *feita em 2026-11-21, com duas rodadas de revisão. Correções: relógio do Lenis, leitura em telas menores, rolagem restaurada, altura mínima, CLS; depois, a barra de progresso (`scale` e `transform` se multiplicavam) e a rolagem por projeto em 0,4. Não verificado visualmente: fades, cores, hover; Safari, iOS e Android.*
  - Fixação com ScrollTrigger, troca de projeto, clique e setas nas abas, contador e barra, "skip", fallback em lista (< 1024 px, reduced-motion, pouca memória). Substitui `projects-motion.tsx`. O GSAP só carrega perto da seção.
  - → verificar: itens 1 a 6 do foco de revisão; LCP, CLS e JS inicial comparados à linha de base (557 KB na carga).

- [x] **Etapa 6 · Lenis** `[MED]` · depende de: 2 e da decisão da 1 · aprovado pelo Manuel (2026-11-21) · *feita em 2026-11-21 (`lenis` 1.3.27 exata, instância única na página toda). Não testado em Safari, iOS, Android nem com leitor de tela.*
  - Pesquisa (etapa 2): `lenis` 1.3.27 (MIT, ~5 kB gz). Uma única instância criada uma vez, `autoRaf: false`, com o `gsap.ticker` como único loop e o rastreador de cursor no mesmo loop; `lenis.on('scroll', ScrollTrigger.update)` e `lagSmoothing(0)`. Não criar com reduced-motion, economia de dados ou pouca memória (o Lenis só respeita o primeiro). `anchors: true` com `offset` do header, tirar o `data-scroll-behavior="smooth"` do `<html>`, `stop()`/`start()` durante a abertura, `syncTouch` desligado, `ScrollTrigger.refresh()` após fontes e imagens. Testar em iOS Safari, Android e Safari desktop.
  - Módulo próprio em `src/lib/motion/`. Se for na página toda: âncoras pelo Lenis, a abertura não pode travar a rolagem.
  - → verificar: âncoras do menu, `#projetos`, scroll restaurado, teclado, sem regressão de desempenho.

- [ ] **Etapa 7 · Verificação final e revisão** `[HIGH]` · depende de: 0 a 6
  - Build de produção, testes de fumaça, SEO sem regressão, `ui-check`, medição numa aba visível ou no PageSpeed, Safari, Firefox e celular, revisão do conjunto pelo `reviewer` (máx. 3 rodadas).
  - → verificar: números lado a lado com a linha de base; achados classificados.

- [x] **Etapa 8 · Documentação** `[LOW]` · depende de: 7 · rascunho até o ok do Manuel · *feita em 2026-11-21: `MOVIMENTO.md` e `DESIGN.md` atualizados.*
  - Atualizar `docs/MOVIMENTO.md` e o `DESIGN.md` (janela de editor, moldura de navegador, fixação de scroll, Lenis se entrar). Mensagens de commit sugeridas por etapa.

## Fora deste plano

- Páginas de projeto (`/projetos/[slug]`), índice `/projetos`, FAQ e blog: ideias separadas, dependem de escrita do Manuel.
- Links dos projetos e a seção Serviços: continuam adiados.
