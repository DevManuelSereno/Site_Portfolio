import { contactInfo } from '@/lib/portfolio-data'
import { siteConfig } from '@/lib/site-config'

/**
 * Dados estruturados Person + WebSite.
 *
 * É o principal ativo de GEO do site. Sem `sameAs`, a string "Manuel Sereno"
 * é uma entidade ambígua para qualquer motor generativo — nada a conecta ao
 * GitHub, ao LinkedIn ou ao Instagram reais. Com o grafo declarado, o schema
 * resolve a entidade de forma limpa.
 *
 * Efeito colateral registrado no PLAN.md §12.2: isto neutraliza a maior parte
 * do custo de GEO de manter o `const desenvolvedor = {` no hero, porque
 * declara o nome de forma inequívoca em dado estruturado, que os motores
 * priorizam sobre a extração de prosa.
 *
 * `address` e `areaServed` carregam o sinal de busca local — a briga mais
 * ganhável dele segundo o PLAN.md §8.1, e que hoje só aparecia no rodapé.
 *
 * Nada aqui é afirmação nova: cada campo sai dos fatos já verificados em
 * portfolio-data.ts. Nenhuma métrica, nenhum depoimento, nenhum número
 * inventado.
 */
export function JsonLd() {
  const personId = `${siteConfig.url}/#person`
  const websiteId = `${siteConfig.url}/#website`

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: contactInfo.name,
        url: siteConfig.url,
        email: `mailto:${contactInfo.email}`,
        jobTitle: 'Desenvolvedor Front-End',
        description:
          'Desenvolvedor front-end e designer de interface em Salvador, Bahia. Constrói interfaces em React, Next.js e TypeScript, do design ao deploy.',
        sameAs: [contactInfo.github, contactInfo.linkedin, contactInfo.instagram],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Salvador',
          addressRegion: 'BA',
          addressCountry: 'BR',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'PASS',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'UNIFACS — Universidade Salvador',
        },
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'JavaScript',
          'HTML5',
          'CSS3',
          'Figma',
          'UI/UX Design',
          'Internacionalização (i18n)',
        ],
        knowsLanguage: ['pt-BR'],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.lang,
        author: { '@id': personId },
        publisher: { '@id': personId },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // O conteúdo é montado aqui a partir de constantes do próprio
      // repositório, nunca de entrada de usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
