'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { Dialog } from '@base-ui/react/dialog'

import type { Skill } from '@/lib/portfolio-data'

export function SkillDialog({ skill }: { skill: Skill }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex h-full w-full cursor-pointer flex-col gap-4 rounded-xl p-5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <span className="flex items-center gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card transition-colors duration-300 group-hover:border-primary/40">
            <Image
              src={skill.logo || '/placeholder.svg'}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="min-w-0 truncate font-display text-base font-semibold tracking-tight text-foreground">
            {skill.name}
          </span>
        </span>

        {/* Traço decorativo — cresce até a largura do card ao apontar/focar.
            Em repouso usa a mesma largura do ícone (w-11), alinhando a ponta
            direita com a dele. group-has-[:focus-visible] (não
            group-focus-within) é proposital: o Dialog do Base UI devolve o
            foco a este botão ao fechar (returnFocus, comportamento correto de
            acessibilidade), o que é um foco programático — :focus-within
            continuaria satisfeito indefinidamente depois de fechar o modal,
            prendendo o traço "cheio". :focus-visible só acompanha foco
            perceptível ao usuário (teclado), então volta ao repouso ao
            fechar. Sem papel semântico: é ornamento, por isso fica fora da
            árvore de acessibilidade. */}
        <span
          aria-hidden="true"
          className="block h-px w-11 bg-primary transition-[width] duration-300 ease-out group-hover:w-full group-has-[:focus-visible]:w-full motion-reduce:transition-none"
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl outline-none">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                <Image
                  src={skill.logo || '/placeholder.svg'}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <Dialog.Title className="min-w-0 font-display text-lg font-semibold tracking-tight text-foreground">
                {skill.name}
              </Dialog.Title>
            </div>

            <Dialog.Close
              aria-label="Fechar"
              className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          <Dialog.Description className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {skill.summary}
          </Dialog.Description>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {skill.commonUses}
          </p>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
