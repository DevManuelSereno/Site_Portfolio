'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'error'; message: string; details?: string[] }

const TOAST_MS = 6000

const EMPTY_FORM = { name: '', phone: '', email: '', message: '' }

const fieldClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/50 focus:outline-none'

const labelClass =
  'mb-2 block font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground'

export function ContactForm() {
  const id = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_MS)
    return () => clearTimeout(timer)
  }, [toast])

  const sending = status.kind === 'sending'

  function update(field: keyof typeof EMPTY_FORM) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus({ kind: 'sending' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()

      if (result.success) {
        setForm(EMPTY_FORM)
        setStatus({ kind: 'idle' })
        setToast(result.message)
      } else {
        setStatus({
          kind: 'error',
          message: result.message,
          details: result.errors,
        })
      }
    } catch {
      setStatus({
        kind: 'error',
        message: 'Não consegui enviar. Verifique sua conexão e tente de novo.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Nome
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            value={form.name}
            onChange={update('name')}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Telefone <span className="normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`${id}-email`} className={labelClass}>
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          className={fieldClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor={`${id}-message`} className={labelClass}>
          Mensagem
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={update('message')}
          placeholder="Conte o que você precisa."
          className={`${fieldClass} resize-none`}
        />
      </div>

      <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground">
        Ao enviar, você concorda que eu use seu nome, e-mail e telefone apenas
        para responder a esta mensagem. Detalhes na{' '}
        <Link
          href="/privacidade"
          className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          política de privacidade
        </Link>
        .
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-60"
        >
          {sending ? 'Enviando…' : 'Enviar mensagem'}
          <ArrowUpRight
            size={16}
            className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              sending ? 'motion-safe:animate-pulse' : ''
            }`}
          />
        </button>

        {/* Substitui os alert() nativos do formulário anterior: um diálogo do
            navegador não tem como respeitar o design system, e interrompe em
            vez de informar. aria-live para que leitores de tela anunciem o
            resultado sem precisar mover o foco. */}
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${
            status.kind === 'error' ? 'text-destructive' : 'text-muted-foreground'
          }`}
        >
          {status.kind === 'error' ? (
            <span
              key={status.message}
              className="inline-block motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300"
            >
              {status.message}
            </span>
          ) : null}
        </p>
      </div>

      {status.kind === 'error' && status.details?.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-destructive">
          {status.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ) : null}

      {/* Toast provisório: o sucesso sai do <p> de status e vem aqui, com
          aria-live para o leitor de tela anunciar. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end"
      >
        {toast ? (
          <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
            <Check size={16} className="shrink-0 text-primary" aria-hidden="true" />
            <span>{toast}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Fechar
            </button>
          </div>
        ) : null}
      </div>
    </form>
  )
}
