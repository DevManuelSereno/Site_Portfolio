# Modal de Habilidades — design

**Data:** 16/08/2026
**Status:** aprovado no brainstorm, aguardando plano de implementação
**Escopo:** Parte 2 do redesign da seção Habilidades. A Parte 1 (reordenação,
remoção dos rótulos de nível, traço decorativo) já está no ar.

---

## 1. Contexto

A seção `#habilidades` renderiza 12 cards de tecnologia. Após a Parte 1, cada
card mostra apenas logo e nome, mais um traço decorativo que expande da largura
do ícone (44px) até a largura total ao apontar ou focar.

Os cards não são clicáveis hoje. O `group-focus-within:w-full` já está no
componente, mas está inerte — não existe elemento focável dentro do card.

## 2. Objetivo

Ao clicar num card, abrir um modal que explique aquela tecnologia **em
linguagem acessível a leigos**: o que é e onde costuma ser usada.

**O leitor-alvo é o cliente não-técnico** — dono de negócio que quer um site e
não sabe o que é Next.js. Isso é o que determina o registro da copy. Explicar o
próprio stack em português claro é argumento de venda: demonstra capacidade de
traduzir o trabalho para quem paga.

Não-objetivo: provar competência. O modal é camada de profundidade para o
visitante curioso, não a superfície principal de venda — essa continua sendo
Projetos e Serviços.

## 3. Decisões

| Decisão | Escolha | Razão |
|---|---|---|
| Container | Modal (`Dialog` do Base UI) | `@base-ui/react` já é dependência; `components/ui/button.tsx` já usa a mesma convenção. Foco preso, scroll lock e devolução de foco vêm prontos. |
| Instanciação | Um `Dialog.Root` por card | Mantém a fronteira de cliente no card. A seção, o header e o marquee continuam Server Components — ganho da Parte 1 preservado. |
| Conteúdo | "O que é" + "onde se usa" | Definido pelo leitor-alvo. "Como eu uso" foi descartado: vira jargão para leigo, e não é redigível por terceiros sem inventar. |
| Cobertura | Todos os 12 | Cards clicáveis e não-clicáveis misturados, sem distinção visual, criam becos sem saída. |
| Links para projetos | Fora do escopo agora | Ver §9. |
| `keepMounted` | Não usar (padrão: monta ao abrir) | Texto genérico sobre tecnologias conhecidas não ranqueia e pode ser lido como conteúdo raso. DOM menor. |

### Por que o Git/GitHub não é tratado como lacuna

As `tags` dos projetos listam linguagens e frameworks, não ferramentas de
fluxo. O Git some desse mapa pelo mesmo motivo que "VS Code" sumiria — e
conhecimento de Git é linha de base presumida para qualquer desenvolvedor.
É lacuna de dado, não de competência. Ele é uma skill normal, sem tratamento
especial.

## 4. Decisões adiadas

Registradas para não virarem padrão por esquecimento:

1. **Enquadramento de Node.js, SQL e Python.** Hoje aparecem sem qualquer
   moldura narrativa. Houve a ideia de agrupá-los como estudos paralelos em
   backend, devops e dados. Ficou decidido apenas *descrever*, sem declarar
   destino — a versão "caminho para full-stack" foi adiada porque anunciar
   transição de carreira numa página que vende freela de front-end enfraquece
   a venda. **Revisitar junto com a copy do Sobre.**
2. **Links para projetos** — ver §9.

## 5. Arquitetura

### 5.1 Dado

Dois campos novos em `Skill` (`lib/portfolio-data.ts`), ambos obrigatórios:

```ts
export type Skill = {
  // ...campos existentes
  /** O que a tecnologia é, em linguagem para leigos. */
  summary: string
  /** Onde ela costuma ser usada no mundo real. */
  commonUses: string
}
```

Os campos `level`, `levelLabel` e `category` continuam nos dados sem serem
renderizados. Não remover neste trabalho.

### 5.2 Componente

Arquivo novo `components/skill-dialog.tsx`, marcado `'use client'`.

```
SkillsSection            (server)
└── SkillCard            (server, renderiza o li e o traço)
    └── SkillDialog      (client) — Trigger + Portal + Backdrop + Popup
```

`SkillDialog` recebe o objeto `Skill` inteiro como prop (é serializável, então
atravessa a fronteira servidor→cliente sem problema) e renderiza o gatilho com
logo e nome.

O `Dialog.Trigger` renderiza um `<button>`. O traço decorativo fica **fora** do
botão: é ornamento e já é `aria-hidden`.

Como o `<button>` passa a existir dentro do `<li class="group">`, o
`group-focus-within:w-full` deixa de ser inerte — o traço cresce ao receber
foco por teclado. Nenhum código novo para isso.

### 5.3 Anatomia do modal

- **Cabeçalho:** logo + nome da tecnologia (`Dialog.Title`)
- **Corpo:** dois parágrafos curtos — `Dialog.Description` renderiza o
  `summary`; o `commonUses` vem logo abaixo, num `<p>` comum
- **Fechar:** um `Dialog.Close` com ícone X, dentro do `Dialog.Popup`

Sem rodapé e sem CTA: um modal de ~40 palavras com botão de ação seria
desproporcional.

### 5.4 Estados do card interativo

O card vira alvo de clique, então precisa parecer clicável e responder ao
teclado:

- `cursor-pointer` no botão do gatilho.
- **Anel de foco visível.** Hoje nenhum card tem `focus-visible` definido —
  `app/globals.css` só declara a cor (`outline-ring/40` no seletor `*`), sem
  regra que a acione. É preciso adicionar `focus-visible:` explícito no botão,
  senão o card fica navegável mas invisível para quem usa teclado.
- O `hover:border-primary/50` existente continua funcionando: o botão fica
  dentro do `<li class="group">`, então apontar o botão dispara o hover do
  grupo.
- O botão não pode quebrar o layout do card — ele assume o lugar da linha
  `flex items-center gap-3.5` que hoje agrupa ícone e nome.

## 6. Acessibilidade

Comportamento herdado do Base UI com `modal` no padrão (`true`): foco preso,
scroll da página travado, interação externa desabilitada, foco devolvido ao
card ao fechar.

Caminhos de fechamento, todos reconhecidos pelo `Dialog.Root`:

| Caminho | Motivo interno | Configuração |
|---|---|---|
| Botão X | `closePress` | precisa ser construído |
| Clique fora | `outsidePress` | já ativo (`disablePointerDismissal` é `false` por padrão) |
| Tecla `Esc` | `escapeKey` | inerente, não há prop para desligar no Root |

O X **não é opcional**. A documentação do Base UI, no tipo da prop `modal`,
determina: com `modal` em `true`, renderizar `<Dialog.Close>` dentro do
`<Dialog.Popup>` para que leitores de tela em touch consigam sair. Sem teclado
não há `Esc`.

`Dialog.Title` e `Dialog.Description` mapeiam para `aria-labelledby` e
`aria-describedby` automaticamente.

## 7. Copy

**Registro:** duas frases por bloco, sem jargão, com uma âncora concreta que o
leitor reconheça. Tom aprovado a partir das amostras de React e SQL.

| Skill | `summary` | `commonUses` |
|---|---|---|
| **HTML5** | A estrutura de qualquer página da web — é o que define o que é título, o que é parágrafo, o que é imagem e o que é botão. | Está em toda página que você abre no navegador, sem exceção. É a fundação sobre a qual todo o resto é construído. |
| **CSS3 / SCSS** | A camada que dá aparência ao site: cores, espaçamento, tipografia e como tudo se reorganiza no celular. O SCSS é uma versão com mais recursos, para projetos maiores. | Se dois sites têm a mesma estrutura mas um parece profissional e o outro não, a diferença está aqui. |
| **JavaScript** | A linguagem que faz a página reagir — abrir um menu, validar um formulário, carregar conteúdo sem recarregar a tela. | É o que separa uma página parada de algo que responde a você. Todo site com qualquer tipo de interação usa. |
| **TypeScript** | JavaScript com uma camada de conferência: o computador avisa sobre erros enquanto o código está sendo escrito, antes de chegar ao ar. | Virou padrão em projetos feitos para durar e crescer, porque reduz a chance de um erro bobo chegar ao usuário final. |
| **React** | Uma ferramenta para montar interfaces em blocos reutilizáveis, como peças de Lego que se encaixam para formar a tela. | Está por trás de boa parte do que você já usa: Instagram, Netflix e Airbnb são construídos com ela. |
| **Next.js** | Uma estrutura construída em cima do React que resolve o que ele sozinho não faz: velocidade de carregamento, endereços de página e aparecer bem no Google. | É a escolha comum quando o site precisa ser rápido e ser encontrado na busca — lojas, portfólios e sites institucionais. |
| **Tailwind CSS** | Uma forma de escrever o estilo direto no elemento, com peças pequenas e padronizadas, em vez de arquivos de estilo separados. | Acelera muito a construção e mantém o visual consistente, porque todo mundo no projeto usa as mesmas medidas e cores. |
| **Figma** | O programa onde o site é desenhado antes de virar código — como a planta de uma casa antes da obra. | Permite ver e aprovar o layout antes que exista uma linha de código, o que evita retrabalho caro depois. |
| **Git / GitHub** | Um sistema que guarda o histórico completo do projeto, permitindo voltar atrás em qualquer alteração. O GitHub é onde esse histórico fica hospedado. | É o padrão em qualquer equipe de desenvolvimento — sem ele, duas pessoas não conseguem mexer no mesmo arquivo sem se atrapalhar. |
| **Node.js** | Permite usar JavaScript fora do navegador, no servidor — a mesma linguagem dos dois lados do site. | É o que roda nos bastidores: processa cadastros, envia e-mails e conversa com o banco de dados. |
| **SQL** | A linguagem usada para conversar com um banco de dados — pedir, guardar e organizar informação. | Sempre que um site lembra do seu carrinho, do seu histórico ou dos seus dados, tem um banco respondendo em SQL nos bastidores. |
| **Python** | Uma linguagem conhecida por ser direta de ler e escrever, usada bastante fora do desenvolvimento web. | Aparece muito em análise de dados, automação de tarefas repetitivas e inteligência artificial. |

**Estes textos são rascunho meu, não do Manuel.** Devem ser lidos e corrigidos
antes de ir ao ar. As menções a Instagram, Netflix e Airbnb usando React são
públicas e verificáveis; nenhuma afirmação sobre o trabalho do Manuel foi feita.

## 8. Verificação

1. `pnpm build` passa.
2. Abrir e fechar pelos três caminhos: X, clique fora, `Esc`.
3. Teclado: `Tab` até o card, `Enter` abre, foco entra no modal, `Tab` circula
   dentro, `Esc` fecha, foco volta ao card de origem.
4. Confirmar que o traço cresce ao focar o card por teclado.
5. Medir a 1920 / 1017 / 390 — modal legível e sem overflow horizontal.
6. Confirmar que `SkillsSection` continua sem `'use client'`.
7. Confirmar o anel de foco visível no card (§5.4).
8. Rodar o detector do Impeccable nos arquivos alterados:
   `node C:/Users/GAMER/.claude/skills/impeccable/scripts/detect.mjs --json <arquivos>`

> **Atenção:** não rodar `pnpm build` com `pnpm dev` ativo. Os dois escrevem em
> `.next` e o CSS servido pelo dev fica corrompido (sintoma: nenhuma regra
> `:hover` na folha). Se acontecer, reiniciar o dev server resolve.

## 9. Mudança futura prevista: links para projetos

Adiada, não descartada. O modal fecharia com "aqui no site você vê em: X".

A relação **já existe nos dados** via `tags` dos projetos — não precisa de campo
novo, só de busca reversa:

| Skill | Projetos |
|---|---|
| HTML5, CSS3 / SCSS, JavaScript | Espaço Psi, Silksong, Demanda Frontend |
| TypeScript | Giuliana Ragno, Biblioteca Virtual |
| React, Figma | Giuliana Ragno |
| Next.js, Tailwind CSS | Biblioteca Virtual |
| Git / GitHub, Node.js, SQL, Python | nenhum |

Dois obstáculos conhecidos:

1. **Nomes divergem.** As tags dizem `HTML` e `CSS`; as skills dizem `HTML5` e
   `CSS3 / SCSS`. Casamento por string falha; precisa de mapeamento explícito.
2. **Quatro skills ficariam sem o bloco.** Um espaço vazio justamente em
   Node.js, SQL e Python reintroduziria por ausência o sinal de fraqueza que a
   Parte 1 removeu ao tirar os rótulos de nível.

Nota: este próprio site é evidência não catalogada de Next.js, React,
TypeScript, Tailwind e Git, e não está na lista de projetos.

## 10. Riscos

| Risco | Mitigação |
|---|---|
| Copy soar genérica e não agregar | Os textos são rascunho e passam por revisão do Manuel antes de ir ao ar (§7). |
| Baixa taxa de abertura tornar o esforço invisível | Aceito por desenho: o modal é profundidade, não a venda principal (§2). |
| 12 `Dialog.Root` pesarem no cliente | Desprezível nessa quantidade; a alternativa custaria a grade inteira em client component (§3). |
