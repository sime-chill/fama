import type { Metadata } from 'next';
import { BadgeCheck, BookOpenText, CircleAlert, FileCheck2 } from 'lucide-react';

import { SourceLink } from '@/components/source-link';
import { chips, memoryTopics } from '@/lib/catalog';

export const metadata: Metadata = {
  title: '来源库与编辑方法｜芯存图谱',
  description: '芯存图谱的官方来源门槛、第三方阅读筛选规则、口径与核验时间。',
};

export default function SourcesPage() {
  const officialSources = [
    ...chips.flatMap((chip) => chip.officialSources.map((source) => ({ source, related: `${chip.vendor} ${chip.name}` }))),
    ...memoryTopics.flatMap((topic) => topic.officialSources.map((source) => ({ source, related: topic.name }))),
  ];
  const readings = [
    ...chips.flatMap((chip) => chip.thirdPartySources.map((source) => ({ source, related: `${chip.vendor} ${chip.name}` }))),
    ...memoryTopics.flatMap((topic) => topic.thirdPartySources.map((source) => ({ source, related: topic.name }))),
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12">
      <section className="max-w-3xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"><FileCheck2 className="size-3.5" />Evidence library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">来源库与编辑方法</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">这里不是链接堆。官方材料负责参数基线，第三方深度文章负责解释、实测与质疑，两类证据永远分开呈现。</p>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-3">
        {[
          { icon: BadgeCheck, title: '官方来源硬门槛', body: '产品页、规格书、官方工程博客或正式学术会议资料至少一项，否则不进入正式芯片库。' },
          { icon: BookOpenText, title: '第三方按质量筛选', body: '优先作者专业度、技术深度、可核查引用、实测数据与持续更新；不虚构阅读量。' },
          { icon: CircleAlert, title: '未知就是未知', body: '未披露参数不以供应链传言填充。媒体估算会写明“估算”，并与官方事实隔离。' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
            <Icon className="size-5 text-primary" />
            <h2 className="mt-4 text-base font-semibold">{title}</h2>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <section className="pt-12">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Primary sources</p><h2 className="mt-1.5 text-2xl font-semibold">官方资料</h2></div>
          <p className="font-mono text-xs text-muted-foreground">{officialSources.length} links</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {officialSources.map(({ source, related }, index) => (
            <div key={`${source.url}-${index}`}>
              <p className="mb-1.5 ml-1 text-[10px] text-muted-foreground">{related}</p>
              <SourceLink source={source} />
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Independent reading</p><h2 className="mt-1.5 text-2xl font-semibold">第三方深度阅读</h2></div>
          <p className="font-mono text-xs text-muted-foreground">{readings.length} links</p>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">当前优先 SemiAnalysis、Chips and Cheese、The Next Platform、TechInsights、工程媒体与论文；中文内容优先电子工程专辑等能给出技术细节和可追溯出处的文章。公众号和知乎将按同一标准逐步补录。</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {readings.map(({ source, related }, index) => (
            <div key={`${source.url}-${index}`}>
              <p className="mb-1.5 ml-1 text-[10px] text-muted-foreground">{related}</p>
              <SourceLink source={source} kind="第三方" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
