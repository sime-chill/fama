/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  CircleGauge,
  Cpu,
  Layers3,
  Scale,
} from 'lucide-react';

import { SourceLink } from '@/components/source-link';
import { memoryTopicById, memoryTopics } from '@/lib/catalog';
import { atlasPath } from '@/lib/paths';

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return memoryTopics.map((topic) => ({ id: topic.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const topic = memoryTopicById(id);
  if (!topic) return {};
  const title = `${topic.name}｜存储技术专题｜芯存图谱`;
  const description = topic.headline;
  return {
    title,
    description,
    openGraph: { title, description, images: [] },
    twitter: { title, description, images: [] },
  };
}

export default async function MemoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const topic = memoryTopicById(id);
  if (!topic) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 sm:pt-9">
      <nav
        className="flex items-center gap-2 text-xs text-muted-foreground"
        aria-label="面包屑"
      >
        <a
          href={atlasPath('/memory/')}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          存储专题
        </a>
        <ChevronRight className="size-3" />
        <span>{topic.name}</span>
      </nav>

      <section className="mt-6 overflow-hidden rounded-[30px] border border-white/8 bg-card/64">
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${topic.accent}, transparent 72%)`,
          }}
        />
        <div className="p-6 sm:p-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
            {topic.fullName}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {topic.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-8">
            {topic.headline}
          </p>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
            {topic.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[10px]">
            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">
              {topic.maturity}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-muted-foreground">
              核验 {topic.lastVerified}
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-4">
        {topic.keyMetrics.map((metric) => (
          <dl
            key={metric.label}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"
          >
            <dt className="text-[10px] text-muted-foreground">
              {metric.label}
            </dt>
            <dd className="mt-2 text-sm font-medium leading-6">
              {metric.value}
            </dd>
          </dl>
        ))}
      </section>

      <section className="grid gap-3 pt-12 lg:grid-cols-3">
        {[
          { icon: Layers3, title: '怎么工作', items: topic.howItWorks },
          { icon: Cpu, title: '在 AI 系统中的角色', items: topic.aiRole },
          { icon: Scale, title: '关键取舍', items: topic.tradeoffs },
        ].map(({ icon: Icon, title, items }) => (
          <article
            key={title}
            className="rounded-[26px] border border-white/8 bg-card/58 p-5"
          >
            <Icon className="size-5 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <span className="font-mono text-[10px] text-primary">
                    0{index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-3 rounded-[24px] border border-primary/14 bg-primary/[0.045] p-5">
        <div className="flex items-start gap-3">
          <CircleGauge className="mt-0.5 size-5 text-primary" />
          <div>
            <h2 className="text-sm font-semibold">阅读提示</h2>
            <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
              带宽峰值是物理接口上限，不等于应用有效带宽。评价任何 Memory
              技术时，都要同时检查访问粒度、随机性、复用、控制器开销、热设计与软件可见性。
            </p>
          </div>
        </div>
      </section>

      <section className="pt-12">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Further reading
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold">继续阅读</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-primary">
              <BadgeCheck className="size-4" />
              官方资料
            </h3>
            <div className="space-y-2">
              {topic.officialSources.map((source) => (
                <SourceLink key={source.url} source={source} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold text-muted-foreground">
              第三方 / 学术阅读
            </h3>
            <div className="space-y-2">
              {topic.thirdPartySources.map((source) => (
                <SourceLink key={source.url} source={source} kind="第三方" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
