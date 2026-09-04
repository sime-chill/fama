/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import type { Metadata } from 'next';
import { ArrowRight, Layers3, MemoryStick } from 'lucide-react';

import { memoryTopics } from '@/lib/catalog';

export const metadata: Metadata = {
  title: '存储技术专题｜芯存图谱',
  description: 'HBM、LPDDR、DDR 与 HBF 的 AI 系统设计角色、工作原理与取舍。',
};

export default function MemoryPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12">
      <section className="max-w-3xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"><MemoryStick className="size-3.5" />Memory technology</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">存储技术专题</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          AI 系统不是只有“显存”。从片上 SRAM、封装内 HBM，到主机 DDR、低功耗 LPDDR 与新兴 HBF，每一层都在容量、带宽、延迟、能效和成本之间交换。
        </p>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-2">
        {memoryTopics.map((topic, index) => (
          <a key={topic.id} href={`/memory/${topic.id}`} className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-card/68 p-6 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-card">
            <div className="absolute inset-y-0 right-0 w-1.5" style={{ background: topic.accent }} />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">0{index + 1} · {topic.fullName}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{topic.name}</h2>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white/[0.045]"><ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-primary" /></span>
            </div>
            <p className="mt-5 text-base font-medium leading-7">{topic.headline}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{topic.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {topic.keyMetrics.slice(0, 3).map((metric) => <span key={metric.label} className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-[10px] text-muted-foreground">{metric.label} · <span className="text-foreground">{metric.value}</span></span>)}
            </div>
            <p className="mt-5 text-[10px] font-medium text-primary">{topic.maturity}</p>
          </a>
        ))}
      </section>

      <section className="mt-10 rounded-[28px] border border-white/8 bg-white/[0.025] p-6">
        <div className="flex items-start gap-3">
          <Layers3 className="mt-0.5 size-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">一套统一的阅读方法</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">先问数据放在哪里，再问每秒搬多少、搬一次耗多少能量、谁管理搬移，最后才看计算峰值。这样才能把芯片规格连接到 prefill、decode、训练和推荐等真实工作负载。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
