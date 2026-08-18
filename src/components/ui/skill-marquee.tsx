import Image from 'next/image'

import { skillMarquee } from '@/lib/portfolio-data'

export function SkillMarquee() {
  // Duplicamos a lista para criar um loop contínuo e sem emenda.
  const items = [...skillMarquee, ...skillMarquee]

  return (
    <div className="group relative w-full overflow-hidden" aria-hidden="true">
      {/* Máscara de fade nas laterais para a esteira surgir e sumir suavemente. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

      <ul className="flex w-max animate-marquee items-center gap-14 py-1 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex items-center gap-2.5 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={item.logo || '/placeholder.svg'}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain"
            />
            <span className="whitespace-nowrap font-mono text-sm text-muted-foreground">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
