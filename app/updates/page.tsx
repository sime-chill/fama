import type { Metadata } from 'next';
import {
  BadgeCheck,
  CircleDotDashed,
  Clock3,
  DatabaseZap,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

import candidatesData from '@/data/inbox/candidates.json';
import sourceStateData from '@/data/source-state.json';
import watchData from '@/data/watch-sources.json';

export const metadata: Metadata = {
  title: '数据维护与更新监控｜FAMA',
  description: 'FAMA 的官方源监控、候选审核和发布流程。',
};

type Candidate = {
  id: string;
  sourceId: string;
  publisher: string;
  title: string;
  url: string;
  discoveredAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  matchedKeywords: string[];
};

export default function UpdatesPage() {
  const candidates = candidatesData.items as Candidate[];
  const pending = candidates.filter((item) => item.status === 'pending');
  const lastScan = sourceStateData.lastScanAt
    ? new Intl.DateTimeFormat('zh-CN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Shanghai',
      }).format(new Date(sourceStateData.lastScanAt))
    : '等待首次建立基线';

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12">
      <section className="max-w-3xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          <DatabaseZap className="size-3.5" /> Maintenance pipeline
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          数据维护与更新监控
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          已配置官方会议、厂商产品页与工程博客的每日扫描流程。当前 Sites 阶段由 Codex 或本地命令运行；迁移到 GitHub 后由 Actions 定时执行。新链接只进入候选队列，人工核验后才会进入正式芯片库。
        </p>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            icon: RefreshCw,
            value: String(watchData.sources.length),
            label: '官方监控源',
          },
          {
            icon: CircleDotDashed,
            value: String(pending.length),
            label: '待审核候选',
          },
          { icon: ShieldCheck, value: '人工', label: '发布闸门' },
          { icon: Clock3, value: '已配置', label: '每日扫描计划' },
        ].map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
          >
            <Icon className="size-4 text-primary" />
            <p className="mt-4 font-mono text-xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Workflow
        </p>
        <h2 className="mt-1.5 text-2xl font-semibold">从发现到发布</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            [
              '01',
              '检索',
              '定时访问官方源，识别与芯片、Memory、互联相关的新链接。',
            ],
            [
              '02',
              '候选',
              '记录标题、来源、关键词和发现时间，不自动写入正式参数。',
            ],
            [
              '03',
              '核验',
              '核对精度、稠密/稀疏以及芯片、板卡、节点和机架边界。',
            ],
            [
              '04',
              '发布',
              '数据检查、lint、构建与移动端验证通过后，才发布新版本。',
            ],
          ].map(([index, title, body]) => (
            <div
              key={index}
              className="rounded-[22px] border border-white/8 bg-card/55 p-5"
            >
              <p className="font-mono text-[10px] text-primary">{index}</p>
              <h3 className="mt-3 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Review inbox
            </p>
            <h2 className="mt-1.5 text-2xl font-semibold">待审核候选</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            最近基线变化：{lastScan}
          </p>
        </div>
        {pending.length ? (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {pending.slice(0, 12).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-[20px] border border-white/8 bg-white/[0.025] p-4 transition hover:border-white/15"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[10px] text-primary">{item.publisher}</p>
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                </div>
                <h3 className="mt-2 text-sm font-medium leading-6">
                  {item.title}
                </h3>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  {item.matchedKeywords.join(' · ')}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[24px] border border-dashed border-white/12 bg-white/[0.02] p-7 text-center">
            <BadgeCheck className="mx-auto size-5 text-primary" />
            <p className="mt-3 text-sm font-medium">当前没有待审核候选</p>
            <p className="mt-1 text-xs text-muted-foreground">
              官方链接基线已经建立；本地扫描或 GitHub 定时任务发现的新链接会进入这里。
            </p>
          </div>
        )}
      </section>

      <section className="pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Watch list
        </p>
        <h2 className="mt-1.5 text-2xl font-semibold">官方监控源</h2>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {watchData.sources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3.5 text-xs transition hover:bg-white/[0.05]"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">
                  {source.publisher}
                </span>
                <span className="mt-1 block truncate text-[10px] text-muted-foreground">
                  {source.keywords.slice(0, 3).join(' · ')}
                </span>
              </span>
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
