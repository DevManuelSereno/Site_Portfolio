import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { contactInfo } from '@/lib/portfolio-data'
import { siteConfig } from '@/lib/site-config'

// O canonical do layout é "/"; sem este, a página apontaria para a home.
export const metadata: Metadata = {
  title: `Política de privacidade — ${siteConfig.name}`,
  description:
    'Como este portfólio trata os dados enviados pelo formulário de contato, as métricas de acesso e o que fica guardado no seu navegador.',
  alternates: { canonical: '/privacidade' },
}

const sections = [
  {
    title: 'Quem responde pelos dados',
    body: (
      <p>
        {siteConfig.name}, pessoa física e desenvolvedor deste portfólio. Para
        qualquer assunto sobre seus dados, escreva para{' '}
        <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${contactInfo.email}`}>
          {contactInfo.email}
        </a>
        .
      </p>
    ),
  },
  {
    title: 'O que o formulário de contato coleta',
    body: (
      <p>
        Nome, e-mail e mensagem, que são obrigatórios, e telefone, que é
        opcional. O envio é voluntário e parte de você.
      </p>
    ),
  },
  {
    title: 'Para que uso esses dados',
    body: (
      <p>
        Apenas para ler e responder ao seu contato. Não uso para marketing, não
        vendo e não monto lista de e-mails. A base legal é o seu consentimento,
        dado ao enviar o formulário (LGPD, art. 7º, I).
      </p>
    ),
  },
  {
    title: 'Com quem os dados passam',
    body: (
      <>
        <p>Para a mensagem chegar até mim, ela passa por:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Resend, serviço que envia o e-mail do formulário.</li>
          <li>Google (Gmail), onde recebo e guardo a mensagem.</li>
          <li>Vercel, que hospeda este site e processa o envio.</li>
        </ul>
        <p className="mt-3">
          Esses serviços podem processar dados fora do Brasil, conforme as
          políticas de cada um.
        </p>
      </>
    ),
  },
  {
    title: 'Por quanto tempo guardo',
    body: (
      <p>
        A mensagem fica na minha caixa de e-mail durante a conversa e por até
        12 meses depois dela. Passado esse prazo, apago. Você pode pedir a
        exclusão antes disso.
      </p>
    ),
  },
  {
    title: 'Velocidade do site',
    body: (
      <p>
        Uso o Vercel Speed Insights para medir quão rápido o site carrega.
        Segundo a Vercel, ele não identifica quem visita: registra dados
        anônimos, como página, país, navegador, tipo de dispositivo e tempo de
        carregamento. Ele só roda na versão publicada do site.
      </p>
    ),
  },
  {
    title: 'O que fica no seu navegador',
    body: (
      <p>
        A animação de abertura guarda no seu navegador (no{' '}
        <code className="font-mono text-sm">localStorage</code>) a data da
        última visita, para não repetir a abertura a cada acesso. Esse dado fica
        só no seu aparelho e nunca é enviado para mim nem para terceiros. Para
        apagá-lo, limpe os dados do site nas configurações do navegador.
      </p>
    ),
  },
  {
    title: 'Cookies',
    body: (
      <p>
        Este site não usa cookies de publicidade nem de rastreamento, por isso
        não mostra aviso de cookies. Se isso mudar, por exemplo com uma
        ferramenta de análise que use cookies, esta página será atualizada e o
        consentimento será pedido antes.
      </p>
    ),
  },
  {
    title: 'Seus direitos',
    body: (
      <>
        <p>
          Pela LGPD (art. 18), você pode pedir a confirmação de que trato seus
          dados, o acesso a eles, a correção, a exclusão, e informações sobre
          com quem foram compartilhados, além de revogar o consentimento. É só
          escrever para o e-mail acima.
        </p>
        <p className="mt-3">
          Se achar que seus dados foram tratados de forma inadequada, você
          também pode reclamar à Autoridade Nacional de Proteção de Dados
          (ANPD).
        </p>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Voltar ao portfólio
      </Link>

      <h1 className="mt-12 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
        Política de privacidade
      </h1>
      <p className="mt-8 text-base leading-relaxed text-muted-foreground">
        Este é um portfólio pessoal. Aqui está, em linguagem simples, o que
        acontece com os dados de quem usa o site.
      </p>

      <div className="mt-12 space-y-10">
        {sections.map((section, index) => (
          <section key={section.title} className="border-t border-border pt-8">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-xl font-bold tracking-tight">
                {section.title}
              </h2>
            </div>
            <div className="mt-4 text-base leading-relaxed text-muted-foreground">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
