/* oxlint-disable next/no-html-link-for-pages -- Native navigation is intentional for iOS resilience. */
import type { Metadata } from 'next';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Radar,
  ScanSearch,
} from 'lucide-react';

import { vendorRadar } from '@/data/vendor-radar';
import { famaPath } from '@/lib/paths';

export const metadata: Metadata = {
  title: '全球 AI 芯片厂商雷达｜FAMA',
  description:
    '追踪 GPU、ASIC、数据流、近存计算与定制芯片公司的产品路线和 Memory 设计。',
};

export default function VendorsPage() {
  const fullProfiles = vendorRadar.filter((entry) => entry.chipId).length;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12">
      <section className="max-w-3xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          <Radar className="size-3.5" /> Global silicon radar
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          全球 AI 芯片厂商雷达
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          除云计算巨头外，持续跟踪数据流、近存计算、开放加速器与 custom silicon
          公司。先建立官方路线索引，再按资料完整度升级为芯片详情页。
        </p>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <Building2 className="size-4 text-primary" />
          <p className="mt-4 font-mono text-2xl font-semibold">
            {vendorRadar.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">雷达厂商</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <ScanSearch className="size-4 text-primary" />
          <p className="mt-4 font-mono text-2xl font-semibold">
            {fullProfiles}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">已建完整档案</p>
        </div>
        <a
          href={famaPath('/updates/')}
          className="col-span-2 rounded-2xl border border-primary/16 bg-primary/[0.055] p-4 transition hover:bg-primary/[0.09] sm:col-span-1"
        >
          <Radar className="size-4 text-primary" />
          <p className="mt-4 text-sm font-semibold">查看监控状态</p>
          <p className="mt-1 text-xs text-muted-foreground">
            官方源与待审核队列
          </p>
        </a>
      </section>

      <section className="pt-10">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {vendorRadar.map((entry) => (
            <article
              key={`${entry.vendor}-${entry.platform}`}
              className="flex min-h-56 flex-col rounded-[24px] border border-white/8 bg-card/62 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    {entry.region}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{entry.vendor}</h2>
                </div>
                <span className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 text-[9px] text-muted-foreground">
                  {entry.status}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium">{entry.platform}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {entry.focus}
              </p>
              <div className="mt-4 rounded-xl bg-black/12 p-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-primary">
                  Memory path
                </p>
                <p className="mt-1.5 text-xs leading-5">{entry.memoryPath}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
                <a
                  href={entry.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground"
                >
                  官方资料 <ExternalLink className="size-3" />
                </a>
                {entry.chipId ? (
                  <a
                    href={famaPath(`/chips/${entry.chipId}/`)}
                    className="inline-flex items-center gap-1.5 font-medium text-primary"
                  >
                    完整档案 <ArrowRight className="size-3" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
