'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

import { ChipCard } from '@/components/chip-card';
import { Input } from '@/components/ui/input';
import type { ChipRecord } from '@/lib/catalog';

const filters = ['全部', 'GPU', 'ASIC', '晶圆级', '近存计算'] as const;

export function ChipExplorer({ chips }: { chips: ChipRecord[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('全部');

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return chips.filter((chip) => {
      const inCategory = filter === '全部' || chip.category === filter;
      const haystack = [chip.vendor, chip.name, chip.generation, chip.memory, chip.memoryType, chip.workload, chip.software, ...chip.architecture].join(' ').toLowerCase();
      return inCategory && (!term || haystack.includes(term));
    });
  }, [chips, filter, query]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-12 rounded-2xl border-white/10 bg-white/[0.05] pl-11 pr-10 text-base" placeholder="搜索芯片、厂商、Memory 或软件栈" aria-label="搜索芯片" />
          {query && <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-white/10" aria-label="清除搜索"><X className="size-3.5" /></button>}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${filter === item ? 'border-primary bg-primary text-primary-foreground' : 'border-white/10 bg-white/[0.035] text-muted-foreground hover:bg-white/[0.07]'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <p>每个条目都通过官方来源门槛</p>
        <p className="font-mono">{results.length} / {chips.length}</p>
      </div>

      {results.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((chip) => <ChipCard key={chip.id} chip={chip} />)}
        </div>
      ) : (
        <div className="mt-4 rounded-[24px] border border-dashed border-white/12 p-12 text-center">
          <p className="text-sm font-medium">没有匹配条目</p>
          <button type="button" onClick={() => { setQuery(''); setFilter('全部'); }} className="mt-2 text-xs text-primary">清除筛选</button>
        </div>
      )}
    </>
  );
}
