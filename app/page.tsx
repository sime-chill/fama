import Link from 'next/link';
import { ArrowRight, BadgeCheck, BookOpenText, Braces, Cpu, Database, Layers3, MemoryStick, Sparkles } from 'lucide-react';

import { ChipCard } from '@/components/chip-card';
import { InstallGuide } from '@/components/install-guide';
import { chips, memoryTopics } from '@/lib/catalog';

export default function Home() {
  const officialCount = chips.reduce((total, chip) => total + chip.officialSources.length, 0);
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-7 sm:px-8 sm:pt-11">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
        <div className="flex min-h-[430px] flex-col justify-between rounded-[32px] border border-white/8 bg-card/58 p-6 sm:p-9">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              面向 AI 芯片与 LLM 协同设计研究
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[9px]">v0.2</span>
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-6xl">
              从 Memory 看懂<br /><span className="text-primary">AI 芯片</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              不只罗列 FLOPS。沿着 SRAM、HBM、LPDDR、DDR、HBF 与 scale-up 互联，追踪每一种 AI 加速器如何搬运权重、激活和 KV Cache。
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/chips" className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:brightness-105">
              进入芯片库 <ArrowRight className="size-4" />
            </Link>
            <Link href="/memory" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm font-medium transition hover:bg-white/[0.07]">
              <MemoryStick className="size-4" /> 存储技术专题
            </Link>
            <InstallGuide />
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[32px] border border-primary/15 bg-[linear-gradient(155deg,rgba(34,102,91,.35),rgba(10,24,30,.72))] p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 size-52 rounded-full bg-primary/10 blur-3xl" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Memory-first framework</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">四层观察坐标</h2>
          <div className="mt-7 space-y-3">
            {[
              ['01', '片上', 'Register · SRAM · Cache', '决定数据复用与 kernel 上限'],
              ['02', '封装内', 'HBM · 3D DRAM', '决定模型驻留与 token 带宽'],
              ['03', '节点内', 'NVLink · ICI · NeuronLink', '把多颗芯片组织成扩展内存域'],
              ['04', '分层容量', 'DDR · LPDDR · HBF · NVMe', '承接 KV、Embedding 与冷权重'],
            ].map(([index, title, tech, body]) => (
              <div key={index} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/8 bg-black/10 p-3.5">
                <span className="font-mono text-[10px] text-primary">{index}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-sm font-semibold">{title}</p><p className="font-mono text-[10px] text-primary/80">{tech}</p></div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-2 gap-3 pt-5 sm:grid-cols-4">
        {[
          { value: String(chips.length), label: '芯片条目', icon: Cpu },
          { value: String(memoryTopics.length), label: 'Memory 专题', icon: MemoryStick },
          { value: String(officialCount), label: '官方来源', icon: BadgeCheck },
          { value: '100%', label: '官方来源覆盖', icon: Database },
        ].map(({ value, label, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <Icon className="size-4 text-primary" />
            <p className="mt-4 font-mono text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Latest silicon</p>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">重点追踪</h2>
          </div>
          <Link href="/chips" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">全部 {chips.length} 款 <ArrowRight className="size-3.5" /></Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chips.slice(0, 6).map((chip) => <ChipCard key={chip.id} chip={chip} />)}
        </div>
      </section>

      <section className="pt-12">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Memory technologies</p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">存储技术专题</h2>
          <p className="mt-2 text-sm text-muted-foreground">从 HBM4 的超宽 DRAM，到 HBF 的高密度 Flash，理解下一轮系统设计空间。</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {memoryTopics.map((topic) => (
            <Link key={topic.id} href={`/memory/${topic.id}`} className="group relative overflow-hidden rounded-[26px] border border-white/8 bg-card/65 p-5 transition hover:border-white/15 hover:bg-card">
              <span className="absolute right-0 top-0 h-full w-1" style={{ background: topic.accent }} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">{topic.fullName}</p>
                  <h3 className="mt-1 text-xl font-semibold">{topic.name}</h3>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <p className="mt-4 text-sm font-medium leading-6">{topic.headline}</p>
              <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">{topic.summary}</p>
              <p className="mt-4 text-[10px] text-primary">{topic.maturity}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-12">
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            { icon: Layers3, title: '参数不是排名', body: '保留芯片、板卡、系统与稠密/稀疏口径，不把不同边界的数字压成一个分数。' },
            { icon: BadgeCheck, title: '官方来源是硬门槛', body: '每个正式芯片条目至少链接一份厂商文档、官方技术博客或学术会议资料。' },
            { icon: BookOpenText, title: '第三方阅读有角色', body: '独立文章用于理解与质疑，不替代官方参数；推断会和已公开事实分开标注。' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[24px] border border-white/8 bg-white/[0.025] p-5">
              <Icon className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[24px] border border-primary/16 bg-primary/[0.055] p-5">
          <div className="flex items-start gap-3">
            <Braces className="mt-0.5 size-5 text-primary" />
            <div><p className="text-sm font-semibold">可持续更新的数据层</p><p className="mt-1 text-xs leading-5 text-muted-foreground">条目按统一字段维护，下一步可接入自动监测、版本差异与学术引用导出。</p></div>
          </div>
          <Link href="/sources" className="ml-4 shrink-0 text-xs font-medium text-primary">查看方法</Link>
        </div>
      </section>
    </main>
  );
}
