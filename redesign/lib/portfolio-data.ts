export const contactInfo = {
  name: 'Manuel Sereno',
  role: 'Desenvolvedor Front-End & UI/UX Designer',
  location: 'Salvador, Bahia — Brasil',
  phone: '(71) 99995-6042',
  phoneHref: 'https://wa.me/5571999956042',
  email: 'nelfsereno@gmail.com',
  github: 'https://github.com/DevManuelSereno',
  githubHandle: '@DevManuelSereno',
  linkedin: 'https://www.linkedin.com/in/manuelsereno',
  linkedinHandle: '@manuelsereno',
  instagram: 'https://www.instagram.com/nelfsereno',
  instagramHandle: '@nelfsereno',
}

export type SkillCategory = 'Linguagens' | 'Frameworks & Libs' | 'Ferramentas'
export type SkillLevelLabel = 'Avançado' | 'Intermediário' | 'Básico'

export type Skill = {
  name: string
  logo: string
  /** Proficiência de 0 a 100, usada na barra sutil. */
  level: number
  levelLabel: SkillLevelLabel
  category: SkillCategory
  learning?: boolean
  /** O que a tecnologia é, em linguagem para leigos. */
  summary: string
  /** Onde ela costuma ser usada no mundo real. */
  commonUses: string
}

/**
 * Ordenada para leitura em grade de 3 colunas — cada linha é um agrupamento
 * que se lê sozinho, sem precisar de cabeçalho:
 *
 *   base da web  →  stack de produção  →  ferramentas  →  back-end e dados
 *
 * O domínio fica no topo e o que está em estudo fica embaixo, então a ordem
 * já comunica o nível sem precisar declará-lo em cada card.
 */
export const allSkills: Skill[] = [
  // A base da web
  {
    name: 'HTML5',
    logo: '/logos/html5.svg',
    level: 95,
    levelLabel: 'Avançado',
    category: 'Linguagens',
    summary:
      'A estrutura de qualquer página da web — é o que define o que é título, o que é parágrafo, o que é imagem e o que é botão.',
    commonUses:
      'Está em toda página que você abre no navegador, sem exceção. É a fundação sobre a qual todo o resto é construído.',
  },
  {
    name: 'CSS3 / SCSS',
    logo: '/logos/sass.svg',
    level: 90,
    levelLabel: 'Avançado',
    category: 'Linguagens',
    summary:
      'A camada que dá aparência ao site: cores, espaçamento, tipografia e como tudo se reorganiza no celular. O SCSS é uma versão com mais recursos, para projetos maiores.',
    commonUses:
      'Se dois sites têm a mesma estrutura mas um parece profissional e o outro não, a diferença está aqui.',
  },
  {
    name: 'JavaScript',
    logo: '/logos/javascript.svg',
    level: 88,
    levelLabel: 'Avançado',
    category: 'Linguagens',
    summary:
      'A linguagem que faz a página reagir — abrir um menu, validar um formulário, carregar conteúdo sem recarregar a tela.',
    commonUses:
      'É o que separa uma página parada de algo que responde a você. Todo site com qualquer tipo de interação usa.',
  },

  // O stack de produção
  {
    name: 'TypeScript',
    logo: '/logos/typescript.svg',
    level: 65,
    levelLabel: 'Intermediário',
    category: 'Linguagens',
    learning: true,
    summary:
      'JavaScript com uma camada de conferência: o computador avisa sobre erros enquanto o código está sendo escrito, antes de chegar ao ar.',
    commonUses:
      'Virou padrão em projetos feitos para durar e crescer, porque reduz a chance de um erro bobo chegar ao usuário final.',
  },
  {
    name: 'React',
    logo: '/logos/react.svg',
    level: 90,
    levelLabel: 'Avançado',
    category: 'Frameworks & Libs',
    summary:
      'Uma ferramenta para montar interfaces em blocos reutilizáveis, como peças de Lego que se encaixam para formar a tela.',
    commonUses:
      'Está por trás de boa parte do que você já usa: Instagram, Netflix e Airbnb são construídos com ela.',
  },
  {
    name: 'Next.js',
    logo: '/logos/nextjs.svg',
    level: 60,
    levelLabel: 'Intermediário',
    category: 'Frameworks & Libs',
    learning: true,
    summary:
      'Uma estrutura construída em cima do React que resolve o que ele sozinho não faz: velocidade de carregamento, endereços de página e aparecer bem no Google.',
    commonUses:
      'É a escolha comum quando o site precisa ser rápido e ser encontrado na busca — lojas, portfólios e sites institucionais.',
  },

  // Ferramentas do dia a dia
  {
    name: 'Tailwind CSS',
    logo: '/logos/tailwind.svg',
    level: 70,
    levelLabel: 'Intermediário',
    category: 'Frameworks & Libs',
    learning: true,
    summary:
      'Uma forma de escrever o estilo direto no elemento, com peças pequenas e padronizadas, em vez de arquivos de estilo separados.',
    commonUses:
      'Acelera muito a construção e mantém o visual consistente, porque todo mundo no projeto usa as mesmas medidas e cores.',
  },
  {
    name: 'Figma',
    logo: '/logos/figma.svg',
    level: 85,
    levelLabel: 'Avançado',
    category: 'Ferramentas',
    summary:
      'O programa onde o site é desenhado antes de virar código — como a planta de uma casa antes da obra.',
    commonUses:
      'Permite ver e aprovar o layout antes que exista uma linha de código, o que evita retrabalho caro depois.',
  },
  {
    name: 'Git / GitHub',
    logo: '/logos/git.svg',
    level: 80,
    levelLabel: 'Intermediário',
    category: 'Ferramentas',
    summary:
      'Um sistema que guarda o histórico completo do projeto, permitindo voltar atrás em qualquer alteração. O GitHub é onde esse histórico fica hospedado.',
    commonUses:
      'É o padrão em qualquer equipe de desenvolvimento — sem ele, duas pessoas não conseguem mexer no mesmo arquivo sem se atrapalhar.',
  },

  // Back-end e dados
  {
    name: 'Node.js',
    logo: '/logos/nodejs.svg',
    level: 45,
    levelLabel: 'Básico',
    category: 'Frameworks & Libs',
    learning: true,
    summary:
      'Permite usar JavaScript fora do navegador, no servidor — a mesma linguagem dos dois lados do site.',
    commonUses:
      'É o que roda nos bastidores: processa cadastros, envia e-mails e conversa com o banco de dados.',
  },
  {
    name: 'SQL',
    logo: '/logos/postgresql.svg',
    level: 40,
    levelLabel: 'Básico',
    category: 'Linguagens',
    learning: true,
    summary:
      'A linguagem usada para conversar com um banco de dados — pedir, guardar e organizar informação.',
    commonUses:
      'Sempre que um site lembra do seu carrinho, do seu histórico ou dos seus dados, tem um banco respondendo em SQL nos bastidores.',
  },
  {
    name: 'Python',
    logo: '/logos/python.svg',
    level: 40,
    levelLabel: 'Básico',
    category: 'Linguagens',
    learning: true,
    summary:
      'Uma linguagem conhecida por ser direta de ler e escrever, usada bastante fora do desenvolvimento web.',
    commonUses:
      'Aparece muito em análise de dados, automação de tarefas repetitivas e inteligência artificial.',
  },
]

/** Domínio — tecnologias com as quais trabalho no dia a dia. */
export const coreSkills: Skill[] = allSkills.filter((s) => !s.learning)

/** Em estudo — tecnologias que estou aprofundando agora. */
export const learningSkills: Skill[] = allSkills.filter((s) => s.learning)

/** Sequência de logos usada na esteira animada (tech stack). */
export const skillMarquee: { name: string; logo: string }[] = [
  ...coreSkills.map((s) => ({ name: s.name, logo: s.logo })),
  ...learningSkills.map((s) => ({ name: s.name, logo: s.logo })),
]

export type TimelineItem = {
  title: string
  place: string
  period: string
  kind: 'work' | 'education'
}

export const experience: TimelineItem[] = [
  {
    title: 'Desenvolvedor Front-End Web',
    place: 'Praxis Empresa Júnior — Salvador, BA',
    period: 'Ago 2024 — Presente',
    kind: 'work',
  },
  {
    title: 'Assessor Comercial',
    place: 'Praxis Empresa Júnior — Salvador, BA',
    period: 'Ago 2024 — Fev 2025',
    kind: 'work',
  },
]

export const education: TimelineItem[] = [
  {
    title: 'Ciência da Computação',
    place: 'UNIFACS — Universidade Salvador',
    period: 'Graduação · Conclusão prevista dez/2025',
    kind: 'education',
  },
  {
    title: 'Ensino Médio',
    place: 'Colégio Antônio Vieira — Salvador, BA',
    period: '2017 — 2021',
    kind: 'education',
  },
]

export type Service = {
  id: string
  icon: 'code' | 'palette' | 'layout' | 'languages'
  title: string
  description: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    id: 'front-end',
    icon: 'code',
    title: 'Desenvolvimento Front-End',
    description:
      'Interfaces rápidas e responsivas construídas com React, Next.js, TypeScript e Tailwind CSS, com consumo de APIs e atenção à acessibilidade.',
    deliverables: ['React & Next.js', 'TypeScript', 'Integração de APIs', 'Responsivo'],
  },
  {
    id: 'ui-ux',
    icon: 'palette',
    title: 'Design de Interface (UI/UX)',
    description:
      'Do wireframe à interface final no Figma — protótipos navegáveis e componentes consistentes que traduzem a ideia em experiência.',
    deliverables: ['Figma', 'Prototipagem', 'Design System', 'UI/UX'],
  },
  {
    id: 'landing-pages',
    icon: 'layout',
    title: 'Landing Pages & Sites',
    description:
      'Sites institucionais e landing pages entregues ponta a ponta, do design ao deploy, com foco em performance e conversão.',
    deliverables: ['Design ao deploy', 'Performance', 'SEO', 'Deploy na Vercel'],
  },
  {
    id: 'i18n',
    icon: 'languages',
    title: 'Internacionalização (i18n)',
    description:
      'Cobertura de múltiplos idiomas em plataformas web, estruturando o conteúdo para alcançar públicos em diferentes regiões.',
    deliverables: ['i18n', 'Múltiplos idiomas', 'Estrutura escalável'],
  },
]

export type Project = {
  id: string
  title: string
  year: string
  description: string
  tags: string[]
  image: string
  href?: string
}

export const projects: Project[] = [
  {
    id: 'giuliana-ragno',
    title: 'Giuliana Ragno PSI',
    year: '2025',
    description:
      'Identidade visual, manual de marca e landing page profissional para uma psicóloga, do design ao desenvolvimento.',
    tags: ['Figma', 'TypeScript', 'React', 'UI/UX', 'Branding'],
    image: '/projects/giuliana-ragno.png',
  },
  {
    id: 'biblioteca-virtual',
    title: 'Biblioteca Virtual',
    year: '2025',
    description:
      'Aplicação de cadastro e gestão de livros e usuários, com foco em uma experiência de leitura organizada.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    image: '/projects/biblioteca-virtual.png',
  },
  {
    id: 'espaco-psi',
    title: 'Espaço Psi',
    year: '2024',
    description:
      'Projeto final do processo trainee da Praxis Jr., um site institucional para um espaço de psicologia.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/espaco-psi.png',
  },
  {
    id: 'silksong',
    title: 'Hollow Knight — Silksong',
    year: '2024',
    description:
      'Fan page atmosférica desenvolvida como atividade avaliativa do processo trainee da Praxis Júnior.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/silksong.png',
  },
  {
    id: 'demanda-frontend',
    title: 'Demanda Frontend Praxis',
    year: '2024',
    description:
      'Demanda de estudo do setor de desenvolvimento front-end da Praxis Jr., explorando fundamentos da web.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/demanda-frontend.png',
  },
]
