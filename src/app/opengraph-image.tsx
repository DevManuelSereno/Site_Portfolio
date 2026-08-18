import { ImageResponse } from 'next/og'

import { contactInfo } from '@/lib/portfolio-data'

export const alt =
  'Manuel Sereno — Desenvolvedor Front-End e UI/UX Designer em Salvador, Bahia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Imagem OpenGraph gerada em código, não como asset estático — assim ela nunca
 * sai de sincronia com o conteúdo do site.
 *
 * Era a maior perda isolada do site: sem ela, compartilhar o link no WhatsApp,
 * LinkedIn ou Instagram gerava preview em branco. E o PLAN.md §8.3 estima que
 * a maior parte do tráfego real vem justamente de ele colar o link em algum
 * lugar.
 *
 * As cores são os valores sRGB exatos dos tokens do design system — o
 * `next/og` renderiza fora do navegador e não resolve variáveis CSS nem oklch.
 * A tipografia usa a fonte padrão do renderizador: carregar Space Grotesk aqui
 * exigiria buscar o arquivo da fonte em tempo de build, o que tornaria o build
 * dependente de rede. A identidade fica por conta da composição e da paleta.
 */
const COLORS = {
  background: '#0c1016',
  foreground: '#e8ebef',
  primary: '#6dd9f1',
  mutedForeground: '#9299a1',
  border: 'rgba(255, 255, 255, 0.10)',
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLORS.background,
          padding: '72px 80px',
        }}
      >
        {/* Eyebrow — o elemento assinatura do design system: marca, fio de 1px
            e legenda em mono caixa-alta. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, color: COLORS.primary }}>
            {'{ MS }'}
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              height: 1,
              backgroundColor: COLORS.border,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: 5,
              color: COLORS.mutedForeground,
            }}
          >
            PORTFÓLIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: COLORS.foreground,
            }}
          >
            Manuel Sereno
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 38,
              color: COLORS.mutedForeground,
            }}
          >
            {/* Artefato conhecido: o Satori abre um espaço um pouco largo em
                volta de "Front-End" e do "&", porque segmenta o texto na
                pontuação e resolve a fonte por segmento. Some ao carregar uma
                fonte real em vez da padrão do renderizador — que é a mesma
                mudança que traria Space Grotesk para cá. Invisível no tamanho
                em que a prévia é exibida, então não foi tratado agora. */}
            {'Desenvolvedor Front-End & UI/UX Designer'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 1,
              backgroundColor: COLORS.border,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 28,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 22,
                letterSpacing: 3,
                color: COLORS.mutedForeground,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: COLORS.primary,
                }}
              />
              {contactInfo.location.toUpperCase()}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                letterSpacing: 2,
                color: COLORS.mutedForeground,
              }}
            >
              REACT · NEXT.JS · TYPESCRIPT
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
