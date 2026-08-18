import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site-config'

/**
 * Só a raiz, deliberadamente.
 *
 * `/curriculo` e os case studies (`/projetos/[slug]`) estão previstos no
 * PLAN.md §10 mas continuam como decisão em aberto. Declarar no sitemap uma
 * URL que não existe é pior que omiti-la: gera 404 no relatório de cobertura
 * do Search Console e queima confiança do crawler. Cada rota entra aqui
 * quando existir de fato.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
