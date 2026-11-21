export const contactInfo = {
  name: 'Manuel Sereno',
  role: 'Desenvolvedor Front-End & UI/UX Designer',
  location: 'Salvador, Bahia — Brasil',
  phone: '(71) 99995-6042',
  phoneHref: 'https://wa.me/5571999956042',
  email: 'nelfsereno@gmail.com',
  github: 'https://github.com/DevManuelSereno',
  githubHandle: '@DevManuelSereno',
  linkedin: 'https://www.linkedin.com/in/dev-manuel-sereno',
  linkedinHandle: '@dev-manuel-sereno',
  instagram: 'https://www.instagram.com/nelfsereno',
  instagramHandle: '@nelfsereno',
}

export type TimelineItem = {
  title: string
  place: string
  period: string
}

export const experience: TimelineItem[] = [
  {
    title: 'Desenvolvedor Front-End',
    place: 'PASS',
    period: 'Nov 2025 — Presente',
  },
  {
    title: 'Desenvolvedor Front-End Web',
    place: 'Praxis Empresa Júnior — Salvador, BA',
    period: 'Ago 2024 — Nov 2025',
  },
  {
    title: 'Assessor Comercial',
    place: 'Praxis Empresa Júnior — Salvador, BA',
    period: 'Ago 2024 — Fev 2025',
  },
]

export const education: TimelineItem[] = [
  {
    title: 'Ciência da Computação',
    place: 'UNIFACS — Universidade Salvador',
    period: 'Bacharelado · Concluído em dez/2025',
  },
  {
    title: 'Ensino Médio',
    place: 'Colégio Antônio Vieira — Salvador, BA',
    period: '2017 — 2021',
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
