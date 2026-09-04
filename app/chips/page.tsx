/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import type { Metadata } from 'next';
import { BadgeCheck, Search, SlidersHorizontal, X } from 'lucide-react';

import { ChipCard } from '@/components/chip-card';
import { chips } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'AI 芯片库｜芯存图谱',
  description: '按 Memory、厂商与架构检索主流 AI 加速器，每个条目均附官方资料。',
};

const categories = ['全部', 'GPU', 'ASIC', '晶圆级', '近存计算'] as const;

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function ChipsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = (params.q ?? '').trim();
  const category = categories.includes(params.category as (typeof categories)[number]) ? params.category! : '全部';
  const term = query.toLowerCase();
  const results = chips.filter((chip) => {
    const inCategory = category === '全部' || chip.category === category;
    const haystack = [chip.vendor, chip.name, chip.generation, chip.memory, chip.memoryType, chip.workload, chip.software, ...chip.architecture].join(' ').toLowerCase();
    return inCategory && (!term || haystack.includes(term));
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12">
      <section className="max-w-3xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"><SlidersHorizontal className="size-3.5" />Accelerator index</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">AI 芯片库</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          从存储层次进入芯片：看容量、带宽、片上缓存、数据搬移和互联。未知字段保持未知；每项正式条目至少有一份官方资料。
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/[0.055] px-3 py-1.5 text-[11px] text-primary">
          <BadgeCheck className="size-3.5" /> 官方来源覆盖 {chips.length} / {chips.length}
        </div>
      </section>

      <section className="pt-8">
        <form action="/chips" method="get" className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input name="q" defaultValue={query} className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.05] pl-11 pr-4 text-base outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20" placeholder="搜索芯片、厂商、Memory 或软件栈" aria-label="搜索芯片" />
          </label>
          <select name="category" defaultValue={category} className="h-12 rounded-2xl border border-white/10 bg-[#14252c] px-4 text-sm outline-none focus:border-primary/50" aria-label="芯片类别">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button type="submit" className="h-12 rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground">应用筛选</button>
        </form>

        <div className="mt-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>每个条目都通过官方来源门槛</p>
          <div className="flex items-center gap-3">
            <span className="font-mono">{results.length} / {chips.length}</span>
            {(query || category !== '全部') && <a href="/chips" className="inline-flex items-center gap-1 text-primary"><X className="size-3.5" />清除</a>}
          </div>
        </div>

        {results.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((chip) => <ChipCard key={chip.id} chip={chip} />)}
          </div>
        ) : (
          <div className="mt-4 rounded-[24px] border border-dashed border-white/12 p-12 text-center">
            <p className="text-sm font-medium">没有匹配条目</p>
            <a href="/chips" className="mt-2 inline-block text-xs text-primary">清除筛选</a>
          </div>
        )}
      </section>
    </main>
  );
}
