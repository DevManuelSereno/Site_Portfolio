/**
 * Fonte única da URL do site.
 *
 * Tudo que precisa de URL absoluta — `metadataBase`, canonical, sitemap,
 * robots, imagem OpenGraph e o JSON-LD — consome daqui. Trocar de domínio
 * passa a ser alterar uma variável de ambiente, não caçar strings pelo
 * repositório (decisão 1 do PLAN.md).
 *
 * O fallback é o `.vercel.app` que serve o site hoje. Ele NÃO é
 * `manuelsereno.dev`: esse domínio aparecia no `openGraph.url` do repositório
 * antigo, mas o Manuel não o possui — era só planejado. Publicar OG apontando
 * para domínio de terceiros é pior que não ter OG nenhum.
 */
const FALLBACK_URL = 'https://manuelsereno.vercel.app'

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return FALLBACK_URL

  // Sem barra final: `new URL(path, base)` e a concatenação do sitemap
  // produzem barra dupla se ela ficar.
  return raw.replace(/\/+$/, '')
}

export const siteConfig = {
  url: resolveSiteUrl(),
  name: 'Manuel Sereno',
  title: 'Manuel Sereno — Desenvolvedor Front-End e UI/UX Designer',
  description:
    'Portfólio de Manuel Sereno, desenvolvedor front-end e designer UI/UX em Salvador, Bahia. Interfaces em React, Next.js e TypeScript, do design ao deploy.',
  locale: 'pt_BR',
  lang: 'pt-BR',
} as const
