import { ArrowUpRight, BadgeCheck, BookOpenText } from 'lucide-react';

import type { Source } from '@/lib/catalog';

export function SourceLink({ source, kind = '官方' }: { source: Source; kind?: '官方' | '第三方' }) {
  const Icon = kind === '官方' ? BadgeCheck : BookOpenText;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition hover:border-primary/30 hover:bg-white/[0.06]"
    >
      <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl ${kind === '官方' ? 'bg-primary/12 text-primary' : 'bg-white/[0.06] text-muted-foreground'}`}>
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {kind} · {source.publisher} {source.date ? `· ${source.date}` : ''}
        </span>
        <span className="mt-1.5 block text-sm font-semibold leading-5 group-hover:text-primary">{source.title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{source.note}</span>
      </span>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
    </a>
  );
}
