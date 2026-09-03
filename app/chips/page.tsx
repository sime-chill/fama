import type { Metadata } from 'next';
import { BadgeCheck, SlidersHorizontal } from 'lucide-react';

import { ChipExplorer } from '@/components/chip-explorer';
import { chips } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'AI 芯片库｜芯存图谱',
  description: '按 Memory、厂商与架构检索主流 AI 加速器，每个条目均附官方资料。',
};

export default function ChipsPage() {
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
        <ChipExplorer chips={chips} />
      </section>
    </main>
  );
}
