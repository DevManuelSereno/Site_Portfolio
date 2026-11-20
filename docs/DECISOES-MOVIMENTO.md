# Decisões de movimento: o porquê

> Complementa o `PLANO-MOVIMENTO.md` (o que fazer, por etapa). Este arquivo guarda o **raciocínio** das decisões, para não explicar duas vezes.
> Escrito em 2026-11-20, com as Etapas 0 a 5 feitas. Marcação: `[confirmado]` foi medido ou decidido pelo Manuel; `[inferido]` é raciocínio sem medição.
> Se uma decisão mudar, atualize aqui e no plano.

## Ponto de partida

O visual novo (pós-redesign) já era melhor que o antigo, mas o Manuel o achava simples demais. Queria um "sabor" a mais, no espírito das landing pages feitas com IA, **sem virar exagero** e **sem piorar SEO e desempenho** (regra permanente: "mantenha SEO e desempenho bons sempre"). Tudo abaixo serve a esses dois limites.

## Princípios que decidem o resto

1. **O conteúdo fica no HTML estático.** As camadas de movimento cobrem a página, nunca a substituem. A rota `/` continua estática. Motivo: crawler e quem está sem JavaScript precisam ler o texto do Hero. `[confirmado]` (teste de fumaça confere título, texto do Hero e JSON-LD no HTML servido).
2. **O movimento é opcional.** Reduced-motion, economia de dados, pouca memória e toque desligam ou simplificam tudo. Nada depende da animação para a página funcionar.
3. **O que não está à vista não roda.** Aba oculta ou seção fora da tela: o loop para de verdade (medido: 0 quadros por segundo da rede fora da tela).
4. **Exceção só onde compensa e é curta.** Animar só `transform`, `opacity`, `filter` e `clip-path`, com exceções contadas e justificadas (ver "Regras do `DESIGN.md` relaxadas").

## Fundo

**Decisão:** grade de planta na página toda (fixa, centralizada) + luz ciano difusa que segue o cursor. Rede de nós só no Hero. Pontos com halo em Habilidades ficam em espera (código mantido, desligado). Projetos fica liso.

- **Por que a grade de planta.** O Manuel recusou a ideia no começo ("se for literalmente uma planta, não quero"), porque entendeu como uma planta de casa. Depois de ver que era o quadriculado de engenharia, achou que a estética combina com o perfil de dev e aceitou. A grade vem do mesmo universo do desenho técnico do Hero e da abertura (réguas, eixos, cotas), então o conjunto parece uma coisa só.
- **Por que as três camadas e não uma só.** O Manuel gostou das opções 1, 2 e 3 da demonstração (rejeitou a 4, "muito desconexa") e pediu todas, em **partes diferentes** da página, não empilhadas: grade e luz como fundo geral; rede de nós onde há mais destaque (Hero); pontos onde há "grade de itens" (Habilidades).
- **Por que a grade passou a cobrir a página toda.** Depois de ver o protótipo, o Manuel pediu a grade como fundo completo, mantendo a luz. Com isso, o separador de linha entre Hero e Habilidades ficou redundante e feio, e foi removido (opção A do protótipo).
- **Por que os pontos ficam em espera.** O Manuel quis o fundo mais limpo por ora, mas pediu para manter o código. Reativar é ligar uma flag. `[confirmado]`
- **Por que Projetos fica liso.** A seção terá o scroll narrativo (Etapa 7); fundo e movimento brigariam pela atenção.
- **Por que a rede de nós só no Hero.** É a camada mais cara (canvas com loop). Limitada a uma seção, o custo é contido e dá para pará-la fora da tela.

### Como a luz foi feita (e por quê)

A revisão da Etapa 3 achou que o jeito inicial repintava a tela inteira a cada quadro (gradiente grande recalculado) e rodava um loop mesmo com o cursor parado. Hoje:

- A luz é um **quadrado de 1080 px pintado uma vez** e movido só por `transform` (barato: não repinta).
- O rastreador de cursor (`pointer-field`) é um **loop único que para quando o valor converge**, e emite um frame inicial imediato.
- As variáveis (`--lx`, `--ly`) são escritas no **contêiner da camada**, não no `<html>`. Escrever no `<html>` invalidaria o estilo da página inteira a cada quadro. `[inferido]`, mas é a razão do desenho.
- Em toque e reduced-motion o fundo fica estático, sem deriva.

**Custo aceito:** a grade "acesa" ainda usa `mask-image` com `var()`, que repinta quando o cursor se move. Não medi no DevTools. `[não medido]`

**Contraste.** Medido com `contrast.py`: texto secundário 6,62:1 no fundo e 5,14:1 no pico da luz; texto principal 6,22:1 no pior caso. Ressalva: o texto secundário sobre um fio de 1 px da grade acesa, sob o pico da luz, cai a 2,58:1 (só nesses pixels). Aceito.

## Abertura

**Decisão:** cerca de 2,9 s (teto 3 s), sem contador, sem porcentagem e **sem botão de pular**. Ponto, círculo e quadrado se transformam (morph) no `{ MS }`, que voa até o cabeçalho. A grade da abertura permanece como fundo.

- **Por que sem contador nem porcentagem.** O Manuel concordou: não é uma carga real, é uma "tela de abertura". Contador mentiria sobre algo que não está carregando.
- **Por que sem pular.** Ele preferiu não oferecer saída, por ser curta (~3 s) e por frequência baixa (abaixo). Contrapartida aceita: reduced-motion, economia de dados e pouca memória **vencem tudo**, até `?intro=1`, então quem não pode ver movimento nunca a vê.
- **Por que o morph e não o traço.** O Manuel comparou as duas versões e preferiu o morph. Depois pediu que ele convivesse com as réguas e o plano cartesiano da primeira versão (reproduzido). Versão aprovada: `Prancha Viva Morph`, v4.
- **Plano cartesiano e conflito com o logo.** O `{ MS }` fechava em cima da linha e da cota. Opção B: ao fechar, abre-se uma **janela limpa** nos eixos em volta do logo e da cota.
- **Por que o logo fecha em peso 400 e vira 700 no cabeçalho.** O Manuel notou que a escrita do logo não combinava com a fonte do resto da abertura (réguas e cotas em mono leve). Gerei três versões (400/500/700) lado a lado. Ele escolheu 400 na abertura e 700 no cabeçalho, com morph entre os dois durante o voo. O caminho do logo é gerado das letras reais da JetBrains Mono, em 4 partes (`{`, `M`, `S`, `}`).
- **Por que só na home.** A Etapa 4 achou que a abertura rodaria (e gastaria a visita) em qualquer rota. Agora `pathname === '/'`.

### Frequência: por que 14 dias e como conta

- **Por que não toda visita nem só a primeira.** Cada visita seria cansativa ("não quero que seja exaustivo"); só a primeira perde a chance de recontar quem volta depois de um tempo. Ele pediu para comparar com sites que usam abertura; a prática encontrada foi limitar por tempo.
- **Como funciona.** Mostra se nunca viu ou se passaram mais de 14 dias (timestamp em `localStorage`, chave `ms:last-visit`).
- **Regra "visita vista".** Só renova o timestamp quando a pessoa **vê a abertura até o fim** ou quando não havia o que mostrar. Abandono (erro, prazo de carga de 1,5 s, aba oculta) **não conta**, para ela ter outra chance. Motivo: sem isso, uma visita interrompida "gastava" os 14 dias sem a pessoa ter visto nada.
- **Aba oculta ao carregar** não mostra e não conta; aba que fica oculta durante a abertura a encerra na hora.
- **Prazo de carga de 1,5 s.** Se a página demora para ficar pronta, não adianta mostrar uma abertura tardia sobre conteúdo já visível.
- **Timestamp inválido, no futuro ou storage bloqueado** contam como "não viu". Nunca quebram a página.

### Como o script do `<head>` funciona (e por quê)

O Next tem um guia próprio para evitar piscada antes da hidratação (`preventing-flash-before-hydration.md`), e o `AGENTS.md` manda ler antes de codar. A solução:

- Um script inline **síncrono** no `<head>` decide se a abertura roda e marca `html.intro-on`, antes da primeira pintura. Sem isso, o conteúdo piscaria e depois seria coberto.
- O texto do script é **gerado com `Function.prototype.toString()`** das funções reais (`intro-policy.ts`, `capability.ts`), com as constantes interpoladas. Motivo: duas cópias escritas à mão (uma no módulo testado, outra no script) divergiriam. O que é testado é o que roda. `[confirmado]` (há testes que rodam o script num sandbox `vm`.)
- `suppressHydrationWarning` no `<html>`, porque o script altera a classe antes do React.
- O overlay é o **primeiro filho do `<body>`** e só cobre; o conteúdo continua no HTML por baixo.
- GSAP e `@usefluid/motion` só entram por **`import()` dinâmico, quando a abertura vai rodar**. Em visita sem abertura nada disso é baixado.
- Aceito: a ordem do `<head>` (o React coloca CSS e scripts assíncronos antes do script de decisão) não gerou piscada nas medições.

### Dois efeitos que o Manuel deve ter em mente

- **PageSpeed/Lighthouse sempre veem "primeira visita"**, então o overlay aparece neles. Avaliar na Etapa 9.
- **Googlebot:** o texto está no HTML, mas confirmar pela Inspeção de URL do Search Console **depois de publicar**. `[não verificado]`

## Hero

**Decisão:** wireframe de uma página que vira interface, em SVG, com um slot trocável para foto. Rede de nós em canvas atrás.

- **Por que desenho técnico e não foto.** A ideia original era uma foto. O Manuel gostou do desenho técnico e pediu para seguir com ele, **deixando aberta** a possibilidade de foto. Por isso `HeroVisual` aceita `slot`, que substitui **toda** a arte.
- **Por que o desenho só roda com a abertura.** O wireframe se prepara sob o overlay e se desenha no `intro:done`. Sem abertura, a arte já vem pronta e o GSAP nem carrega: sem piscar, sem custo. Consequência: quem revisita depois dos 14 dias não vê o desenho animado. Fazer o desenho em toda visita exigiria estado preparado no `<head>`; fica como ideia, não como decisão.
- **Sem `<text>` na arte.** O texto decorativo (cotas numeradas, "SLOT · FOTO" do protótipo) sairia como conteúdo no HTML para crawlers e leitores de tela. Preferi tirar a ter ruído semântico.
- **Tilt só em CSS.** O React só escreve `--rx`/`--ry`; o `transform` e a transição ficam no CSS. Os handlers do mouse ficam num **contêiner sem transform**, porque no elemento que gira a rotação encolhia a área de resposta na borda e a inclinação piscava (achado da revisão, corrigido e medido).
- **Rede de nós.** 28 a 70 nós (por área, `networkNodeCount`), DPR limitado a 2, loop só com o Hero visível e a aba visível, estática em reduced-motion e toque. O primeiro frame do rastreador é ignorado porque é o ponto de repouso, não um cursor; sem isso, os nós se ligavam a um "mouse" que ninguém mexeu.
- **Aceito:** a rede reembaralha os nós ao redimensionar a janela.
- **Em aberto:** em mobile a arte fica abaixo da primeira dobra.

## Bibliotecas

- **GSAP 3.15.1 para o resto.** O Manuel liberou. Serve a timeline, ao desenho em SVG e (Etapa 7) ao scroll. Versão exata, publicada há mais de 14 dias.
- **FluidUI (`@usefluid/motion` 0.1.2) só no morph.** É projeto de um colega do Manuel (da empresa júnior). Eu avaliei que o produto não precisava dele; o Manuel disse que queria incluí-lo "por ser de um colega", **desde que não piorasse o resultado**. Testei em pasta descartável: passou nos três critérios (SSR sem erro; 4,4 KB gzip contra 7,6 KB do MorphSVG do GSAP; morph limpo até o `{ MS }`). Ressalvas: pacote com 1 semana de vida, Next 16/Turbopack reais só foram exercitados depois, na própria abertura. Versão fixada em exata. Isso abre uma **exceção consciente** à regra "uma biblioteca de movimento por tela": o motor do Fluid não tem dependências.
- **`@gsap/react` foi instalado e removido.** Entrou na Etapa 2 por precaução; a Etapa 5 não usou nenhuma função dele, então saiu (decisão da Etapa 4: "remover se não for usada").
- **Three.js fora por ora.** O Manuel deixou aberto "se encontrar algo que se encaixe"; nada do que foi desenhado exige 3D, e o peso no bundle não se justificaria. `[inferido]`

## Regras do `DESIGN.md` relaxadas

O Manuel autorizou relaxar duas regras do `DESIGN.md`:

- "nada se move no hover" (agora o hover pode mover);
- "no máximo três ocorrências do acento".

Continuam: sem sombra no fluxo, três vozes tipográficas, `max-w-6xl`.

Exceções às regras de animação (só na abertura, que dura menos de 3 s e já era assim no protótipo aprovado): a máscara da grade (`--r`), o `stroke-dashoffset` dos eixos e a troca do `d` no morph, que não são `transform`/`opacity`.

**A registrar na Etapa 10:** a camada de fundo e a luz como exceção à "Regra do Fio" e ao "plano".

## Testes

- **Só os pertinentes, sem biblioteca.** `node:test` nativo, sem Jest/Vitest. O Manuel pediu para não fazer overengineering; ele explicará depois por que quer testes neste projeto.
- **O que existe:** política da abertura (14 dias, `?intro=1`, timestamp inválido/futuro, storage indisponível), sinais de capacidade, o script do gate num sandbox, a contagem de nós da rede e um teste de fumaça do HTML servido.
- **Requisito de ambiente:** `npm test` precisa de Node 22.18 ou mais novo (o `package.json` não declara `engines`). A máquina do Manuel tem 24.22.3.

## Processo

- **Ordem: abertura antes do Hero.** É a parte mais arriscada para SEO e LCP; falhar cedo.
- **Medir só no fim.** INP, `ui-check` e Lighthouse ficam para a Etapa 9, "se ainda houver necessidade" (decisão do Manuel).
- **Plano no repo.** O Manuel decidiu guardar este tipo de plano em `docs/` do projeto, sem mudar regra do Core.
- **Nada é commitado sem pedido.** O agente só sugere mensagens.

## Privacidade e cookies (pendência separada)

O `localStorage` da frequência levantou a dúvida sobre política de cookies. Resposta resumida: `localStorage` não é cookie, mas a LGPD/ANPD trata armazenamento no aparelho de forma parecida quando há dado pessoal; aqui a chave guarda só um timestamp de visita, sem identificar ninguém. `[inferido]`, não é parecer jurídico. O Manuel mandou **anotar e não implementar agora**: `/privacidade`, aviso do formulário e confirmar os cookies do Vercel Analytics. **Resolver antes de publicar a Etapa 4.** O Search Console é outra coisa (verificação de propriedade), não é analytics.

## Ainda não verificado

- INP, `ui-check`, Lighthouse.
- Mobile real, Safari e Firefox (`color-mix`, `mask-image`, `oklch` no canvas, `pathLength` em `<rect>`).
- Reduced-motion real, foco do teclado e pouso exato do logo no cabeçalho.
- Saída real do mouse da arte do Hero (o evento sintético do meu teste não acionou o handler).
- Googlebot (depois de publicar).

## Números de referência (build de produção local, sem limitação de CPU ou rede)

| | Linha de base | Hoje |
|---|---|---|
| LCP | 52 a 80 ms | 68 ms com abertura, 84 ms sem |
| CLS | 0 | 0 |
| JS inicial | ~536 KB | ~554 KB |

Servem para comparar antes e depois; não representam rede e CPU reais.
