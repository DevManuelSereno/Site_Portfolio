'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Dialog } from '@base-ui/react/dialog'

import type { Skill } from '@/lib/portfolio-data'

export function SkillDialog({ skill }: { skill: Skill }) {
  /**
   * "O usuário está neste card agora" — por ponteiro ou por teclado.
   *
   * Governa apenas o traço decorativo. Substitui o par
   * `group-hover` + `group-has-[:focus-visible]` que fazia esse papel em CSS.
   *
   * A troca resolve um problema que o CSS sozinho não resolve: `:focus-visible`
   * é pegajoso por *modalidade*, não por presença. Ao fechar o modal, o Base UI
   * devolve o foco a este botão — comportamento correto de acessibilidade —, e
   * se o fechamento foi por `Esc` o navegador marca esse foco restaurado como
   * `:focus-visible`, porque a última interação foi por teclado. O traço então
   * ficava cheio e só soltava com Tab ou clique em outro lugar: tirar o mouse
   * de cima não bastava.
   *
   * Com estado explícito, o traço volta ao repouso quando o usuário de fato
   * *sai* do card — ponteiro saindo ou foco indo embora — em vez de quando o
   * modal fecha. Sair do modal com o cursor ainda sobre o card mantém o traço
   * cheio, que é o comportamento natural.
   *
   * `onFocus` filtra por `:focus-visible` de propósito: foco por clique não
   * deve expandir o traço, só foco perceptível ao usuário.
   */
  const [engaged, setEngaged] = useState(false)

  return (
    <Dialog.Root>
      <Dialog.Trigger
        onPointerEnter={() => setEngaged(true)}
        onPointerLeave={() => setEngaged(false)}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) setEngaged(true)
        }}
        onBlur={() => setEngaged(false)}
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

        {/* Traço decorativo — cresce até a largura do card enquanto o usuário
            está nele. Em repouso usa a mesma largura do ícone (w-11),
            alinhando a ponta direita com a dele. Sem papel semântico: é
            ornamento, por isso fica fora da árvore de acessibilidade, e o foco
            de verdade é comunicado pelo outline do gatilho. */}
        <span
          aria-hidden="true"
          className={`block h-px bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none ${
            engaged ? 'w-full' : 'w-11'
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
