'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Dialog } from '@base-ui/react/dialog'

import type { Skill } from '@/lib/portfolio-data'

export function SkillDialog({ skill }: { skill: Skill }) {
  /**
   * Verdadeiro entre fechar o modal e o gatilho perder o foco.
   *
   * Ao fechar, o Base UI devolve o foco a este botão — comportamento correto
   * de acessibilidade. Só que, se o fechamento foi por `Esc`, a última
   * modalidade de interação foi teclado, então o navegador marca esse foco
   * restaurado como `:focus-visible`. O traço decorativo, que responde a
   * `:focus-visible`, ficava preso em largura cheia depois do `Esc` — mas não
   * depois do X nem do clique fora, onde a modalidade é ponteiro.
   *
   * Ou seja: o mesmo estado final (foco no gatilho) renderizava de dois jeitos
   * conforme a forma de fechar. Esta flag suprime a resposta do traço ao foco
   * apenas nessa janela, igualando os três caminhos de saída. Navegar até o
   * card pelo teclado, sem abrir o modal, continua expandindo o traço.
   */
  const [returningFromDialog, setReturningFromDialog] = useState(false)

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) setReturningFromDialog(true)
      }}
    >
      <Dialog.Trigger
        onBlur={() => setReturningFromDialog(false)}
        className="flex h-full w-full cursor-pointer flex-col gap-4 rounded-xl p-5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
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
            direita com a dele. group-has-[:focus-visible] em vez de
            group-focus-within porque :focus-within continuaria satisfeito
            indefinidamente depois de fechar o modal, já que o foco volta para
            cá. Não basta sozinho: ver `returningFromDialog` acima, que cobre o
            fechamento por Esc. Sem papel semântico — é ornamento, por isso
            fica fora da árvore de acessibilidade, e o foco de verdade é
            comunicado pelo outline do gatilho. */}
        <span
          aria-hidden="true"
          className={`block h-px w-11 bg-primary transition-[width] duration-300 ease-out group-hover:w-full motion-reduce:transition-none ${
            returningFromDialog ? '' : 'group-has-[:focus-visible]:w-full'
          }`}
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
              <div className="min-w-0">
                <Dialog.Title className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {skill.name}
                </Dialog.Title>
                {/* A linha verificável que substituiu a nota de proficiência
                    (decisão 11). Mono porque é anotação técnica, não prosa —
                    "A Regra das Três Vozes" do DESIGN.md. Em caixa-baixa
                    porque é uma frase, não um rótulo. */}
                <p className="mt-0.5 font-mono text-xs text-primary">
                  {skill.context}
                </p>
              </div>
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
