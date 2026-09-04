/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, BadgeCheck, BrainCircuit, ChevronRight, Layers3, MemoryStick, Network, SearchCheck } from 'lucide-react';

import { SourceLink } from '@/components/source-link';
import { chipById, chips } from '@/lib/catalog';

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return chips.map((chip) => ({ id: chip.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const chip = chipById(id);
  if (!chip) return {};
  const title = `${chip.vendor} ${chip.name} 存储架构｜芯存图谱`;
  const description = chip.oneLiner;
  return {
    title,
    description,
    openGraph: { title, description, images: [] },
    twitter: { title, description, images: [] },
  };
}

export default async function ChipDetailPage({ params }: PageProps) {
  const { id } = await params;
  const chip = chipById(id);
  if (!chip) notFound();

  const metrics = [
    ['工艺 / 封装', chip.process], ['存储', chip.memory], ['存储带宽', chip.bandwidth],
    ['峰值计算', chip.compute], ['功耗', chip.power], ['互联', chip.interconnect],
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 sm:pt-9">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="面包屑">
        <a href="/chips" className="inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="size-3.5" />芯片库</a>
        <ChevronRight className="size-3" />
        <span className="truncate">{chip.vendor} {chip.name}</span>
      </nav>

      <section className="mt-6 overflow-hidden rounded-[30px] border border-white/8 bg-card/64">
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${chip.accent}, transparent 72%)` }} />
        <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-medium text-primary">{chip.vendor}</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-muted-foreground">{chip.category}</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-muted-foreground">{chip.status}</span>
            </div>
            <p className="mt-6 text-xs font-medium text-muted-foreground">{chip.generation} · {chip.year}</p>
            <h1 className="mt-1 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{chip.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{chip.oneLiner}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px]">
              <span className="inline-flex items-center gap-1.5 text-primary"><BadgeCheck className="size-3.5" />{chip.officialSources.length} 个官方来源</span>
              <span className="text-muted-foreground">可信度 {chip.confidence}</span>
              <span className="text-muted-foreground">核验 {chip.lastVerified}</span>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-black/10 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Memory thesis</p>
            <h2 className="mt-3 text-lg font-semibold leading-7">{chip.memoryType}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{chip.memoryVerdict}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <dl key={label} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <dt className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</dt>
            <dd className="mt-2 text-sm font-medium leading-6">{value}</dd>
          </dl>
        ))}
      </section>

      <section className="grid gap-8 pt-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"><MemoryStick className="size-3.5" />Memory hierarchy</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">存储层次</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">沿着数据离计算核心越来越远的方向阅读。真实带宽不只取决于介质，也取决于布局、复用和互联。</p>
        </div>
        <div className="space-y-2">
          {chip.memoryLayers.map((layer, index) => (
            <div key={layer.name} className="grid grid-cols-[auto_1fr] gap-4 rounded-[22px] border border-white/8 bg-card/52 p-4">
              <span className="grid size-9 place-items-center rounded-xl font-mono text-xs font-semibold" style={{ background: `color-mix(in srgb, ${chip.accent} 15%, transparent)`, color: chip.accent }}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-sm font-semibold">{layer.name}</h3><span className="text-[10px] text-primary">{layer.role}</span></div>
                <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{layer.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 pt-12 lg:grid-cols-[1.25fr_0.75fr]">
        <article>
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary"><BrainCircuit className="size-3.5" />Architecture note</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">如何理解这颗芯片</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            {chip.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-6 rounded-[22px] border border-amber-300/15 bg-amber-300/[0.045] p-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-amber-200"><AlertTriangle className="size-4" />主要存储瓶颈</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{chip.memoryBottleneck}</p>
          </div>
        </article>
        <aside className="space-y-3">
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5">
            <p className="flex items-center gap-2 text-xs font-semibold"><Layers3 className="size-4 text-primary" />关键技术路径</p>
            <ol className="mt-4 space-y-3">
              {chip.architecture.map((item, index) => <li key={item} className="flex items-start gap-3 text-xs leading-5 text-muted-foreground"><span className="font-mono text-[10px] text-primary">{index + 1}</span>{item}</li>)}
            </ol>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5">
            <p className="flex items-center gap-2 text-xs font-semibold"><Network className="size-4 text-primary" />软件与工作负载</p>
            <dl className="mt-4 space-y-3 text-xs"><div><dt className="text-muted-foreground">软件栈</dt><dd className="mt-1 leading-5">{chip.software}</dd></div><div><dt className="text-muted-foreground">目标工作负载</dt><dd className="mt-1 leading-5">{chip.workload}</dd></div></dl>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5">
            <p className="flex items-center gap-2 text-xs font-semibold"><SearchCheck className="size-4 text-primary" />继续追踪</p>
            <ul className="mt-4 space-y-2">{chip.watchItems.map((item) => <li key={item} className="text-xs leading-5 text-muted-foreground">· {item}</li>)}</ul>
          </div>
        </aside>
      </section>

      <section className="pt-12">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Evidence</p><h2 className="mt-1.5 text-2xl font-semibold">资料入口</h2></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-primary"><BadgeCheck className="size-4" />官方资料 · 必选</h3>
            <div className="space-y-2">{chip.officialSources.map((source) => <SourceLink key={source.url} source={source} />)}</div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold text-muted-foreground">第三方深度阅读 · 辅助理解</h3>
            <div className="space-y-2">{chip.thirdPartySources.map((source) => <SourceLink key={source.url} source={source} kind="第三方" />)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
