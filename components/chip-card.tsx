import Link from 'next/link';
import { ArrowRight, BadgeCheck, MemoryStick } from 'lucide-react';

import type { ChipRecord } from '@/lib/catalog';

export function ChipCard({ chip }: { chip: ChipRecord }) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-white/8 bg-card/72 p-4 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-card">
      <div className="flex items-center justify-between gap-3">
        <span className="h-1.5 w-14 rounded-full" style={{ background: chip.accent }} />
        <div className="flex gap-1.5">
          <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-muted-foreground">{chip.category}</span>
          <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-muted-foreground">{chip.year}</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-muted-foreground">{chip.vendor} · {chip.generation}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">{chip.name}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{chip.oneLiner}</p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/[0.04] p-3">
          <dt className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><MemoryStick className="size-3" />存储</dt>
          <dd className="mt-1.5 text-xs font-medium leading-5">{chip.memory}</dd>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-3">
          <dt className="text-[10px] text-muted-foreground">带宽</dt>
          <dd className="mt-1.5 text-xs font-medium leading-5">{chip.bandwidth}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <div className="mb-3 flex items-center gap-1.5 text-[10px] text-primary">
          <BadgeCheck className="size-3.5" />
          {chip.officialSources.length} 个官方来源已核验
        </div>
        <Link href={`/chips/${chip.id}`} className="flex items-center justify-between rounded-xl bg-white/[0.045] px-3 py-2.5 text-sm font-medium transition group-hover:bg-primary group-hover:text-primary-foreground">
          查看存储架构
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
