'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircuitBoard,
  Cpu,
  Database,
  ExternalLink,
  GitCompareArrows,
  Layers3,
  Plus,
  Search,
  Share,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type Category = 'GPU' | 'ASIC' | '晶圆级';

type Chip = {
  id: string;
  vendor: string;
  name: string;
  category: Category;
  released: string;
  status: string;
  process: string;
  memory: string;
  bandwidth: string;
  compute: string;
  power: string;
  interconnect: string;
  workload: string;
  software: string;
  summary: string;
  route: string[];
  sourceLabel: string;
  sourceUrl: string;
  accent: string;
  confidence: '高' | '中';
};

const chips: Chip[] = [
  {
    id: 'nvidia-b200',
    vendor: 'NVIDIA',
    name: 'Blackwell B200',
    category: 'GPU',
    released: '2024',
    status: '量产部署',
    process: 'TSMC 4NP · 双裸片',
    memory: '180 GB HBM3e',
    bandwidth: '最高 8 TB/s',
    compute: '18 PFLOPS FP4（Tensor）',
    power: '最高 1,000 W（平台可配）',
    interconnect: 'NVLink 5 · NVSwitch',
    workload: '大模型训练 / 推理 / HPC',
    software: 'CUDA · TensorRT-LLM · NCCL',
    summary: '用双计算裸片与高带宽 scale-up 互联延续通用 GPU 路线，重点服务超大规模训练和推理集群。',
    route: ['通用 GPU', '双裸片封装', 'HBM3e', '专有 scale-up 互联'],
    sourceLabel: 'NVIDIA HGX 官方架构文档',
    sourceUrl: 'https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory-h100-h200-b200/latest/components.html',
    accent: '#9be84b',
    confidence: '高',
  },
  {
    id: 'amd-mi300x',
    vendor: 'AMD',
    name: 'Instinct MI300X',
    category: 'GPU',
    released: '2023',
    status: '量产部署',
    process: 'TSMC 5 nm / 6 nm · Chiplet',
    memory: '192 GB HBM3',
    bandwidth: '5.3 TB/s',
    compute: '2.61 PFLOPS FP8（Dense）',
    power: '750 W TBP',
    interconnect: 'Infinity Fabric · PCIe 5.0',
    workload: '生成式 AI / HPC',
    software: 'ROCm · HIP · RCCL',
    summary: '以 3D Chiplet 和大容量 HBM 为核心，强调开放软件生态以及大模型单卡承载能力。',
    route: ['CDNA GPU', '3D Chiplet', '大容量 HBM', '开放软件栈'],
    sourceLabel: 'AMD MI300X 官方规格页',
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi300/mi300x.html',
    accent: '#ff725f',
    confidence: '高',
  },
  {
    id: 'google-tpu7x',
    vendor: 'Google',
    name: 'TPU7x · Ironwood',
    category: 'ASIC',
    released: '2025',
    status: '云端可用',
    process: '定制 Tensor ASIC',
    memory: '192 GiB HBM / 芯片',
    bandwidth: '7.38 TB/s / 芯片',
    compute: '4.614 PFLOPS FP8 / 芯片',
    power: '未公开',
    interconnect: '1.2 TB/s ICI · 3D Torus',
    workload: '训练 / 推理 / 超大规模 Pod',
    software: 'XLA · JAX · PyTorch/XLA',
    summary: '围绕矩阵计算、编译器和 Pod 拓扑进行软硬件协同设计，突出云内大规模系统效率。',
    route: ['领域专用 ASIC', '编译器协同', '3D Torus', '超大规模 Pod'],
    sourceLabel: 'Google Cloud TPU 官方文档',
    sourceUrl: 'https://docs.cloud.google.com/compute/docs/tpus/tpu-machines',
    accent: '#62b5ff',
    confidence: '高',
  },
  {
    id: 'microsoft-maia200',
    vendor: 'Microsoft',
    name: 'Maia 200',
    category: 'ASIC',
    released: '2026',
    status: 'Azure 部署',
    process: 'TSMC 3 nm',
    memory: '216 GB HBM3e + 272 MB SRAM',
    bandwidth: '7 TB/s HBM',
    compute: '原生 FP8 / FP4 Tensor',
    power: '未公开',
    interconnect: 'Azure 定制系统互联',
    workload: 'LLM 推理 / Token 生成',
    software: 'Azure AI 软件栈',
    summary: '针对 Token 生成经济性设计的云端推理 ASIC，通过大容量 HBM、片上 SRAM 和数据搬移引擎提高利用率。',
    route: ['推理优先 ASIC', 'FP4 / FP8', '片上大 SRAM', '云服务垂直整合'],
    sourceLabel: 'Microsoft 官方博客',
    sourceUrl: 'https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/',
    accent: '#56e1c4',
    confidence: '高',
  },
  {
    id: 'aws-trainium2',
    vendor: 'AWS',
    name: 'Trainium2',
    category: 'ASIC',
    released: '2024',
    status: 'EC2 Trn2 可用',
    process: '第三代 NeuronCore',
    memory: '96 GiB HBM / 芯片',
    bandwidth: '2.9 TB/s / 芯片',
    compute: '1.3 PFLOPS FP8（Dense）',
    power: '未公开',
    interconnect: 'NeuronLink · EFAv3',
    workload: '大模型训练 / 推理',
    software: 'AWS Neuron SDK · NKI',
    summary: '通过自研 NeuronCore、NeuronLink 和云实例编排，形成从算子到 UltraServer 的纵向协同。',
    route: ['云端 ASIC', '编译器 / Kernel SDK', 'NeuronLink', 'UltraServer'],
    sourceLabel: 'AWS Trn2 官方产品页',
    sourceUrl: 'https://aws.amazon.com/ec2/instance-types/trn2/',
    accent: '#ffb253',
    confidence: '高',
  },
  {
    id: 'intel-gaudi3',
    vendor: 'Intel',
    name: 'Gaudi 3',
    category: 'ASIC',
    released: '2024',
    status: '量产部署',
    process: 'TSMC 5 nm',
    memory: '128 GB HBM2e',
    bandwidth: '3.7 TB/s',
    compute: '1.678 PFLOPS FP8 / BF16',
    power: '900 W OAM',
    interconnect: '24 × 200 GbE RoCE',
    workload: 'LLM 训练 / 推理',
    software: 'SynapseAI · PyTorch',
    summary: '把标准以太网直接集成到加速器，试图以开放 scale-up / scale-out 网络降低集群锁定。',
    route: ['矩阵引擎', '片上 RoCE', '标准以太网', '开放框架'],
    sourceLabel: 'Intel Gaudi 3 官方规格资料',
    sourceUrl: 'https://cdrdv2-public.intel.com/845118/gaudi-3-ai-accelerator-30-3-30.pdf',
    accent: '#58a6ff',
    confidence: '高',
  },
  {
    id: 'cerebras-wse3',
    vendor: 'Cerebras',
    name: 'WSE-3',
    category: '晶圆级',
    released: '2024',
    status: 'CS-3 系统部署',
    process: 'TSMC 5 nm · 晶圆级',
    memory: '44 GB 片上 SRAM',
    bandwidth: '片上分布式数据流',
    compute: '125 PFLOPS 峰值 AI 性能',
    power: '系统级液冷',
    interconnect: 'SwarmX',
    workload: '超大模型训练 / 推理',
    software: 'Cerebras Software Platform',
    summary: '用单片晶圆级处理器消除传统多芯片切分边界，以海量片上 SRAM 和数据流执行换取系统简化。',
    route: ['晶圆级集成', '片上 SRAM', '数据流计算', '系统级容错'],
    sourceLabel: 'Cerebras WSE-3 官方发布',
    sourceUrl: 'https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine',
    accent: '#a983ff',
    confidence: '高',
  },
  {
    id: 'meta-mtia300',
    vendor: 'Meta',
    name: 'MTIA 300',
    category: 'ASIC',
    released: '2026',
    status: '内部生产部署',
    process: '未公开',
    memory: '未公开',
    bandwidth: '未公开',
    compute: '面向排序与推荐训练',
    power: '未公开',
    interconnect: '模块化机架基础设施',
    workload: '推荐 / 排序训练',
    software: 'Meta 内部 AI 栈',
    summary: '采用快速迭代与推理优先的自研路线；MTIA 300 已进入生产，后续世代扩展到生成式 AI。',
    route: ['自用 ASIC', '工作负载定制', '六个月级迭代', '软硬件共设计'],
    sourceLabel: 'Meta 2026 自研芯片路线公告',
    sourceUrl: 'https://about.fb.com/news/2026/03/expanding-metas-custom-silicon-to-power-our-ai-workloads/',
    accent: '#7aa8ff',
    confidence: '中',
  },
];

const filters: Array<'全部' | Category> = ['全部', 'GPU', 'ASIC', '晶圆级'];

const routeCards = [
  {
    icon: Layers3,
    title: '先进封装成为系统边界',
    body: 'Chiplet、2.5D / 3D 堆叠与 HBM 把“芯片设计”推向封装和热设计协同。',
    tags: ['Chiplet', 'CoWoS', 'HBM3e'],
  },
  {
    icon: GitCompareArrows,
    title: 'Scale-up 互联决定集群效率',
    body: 'NVLink、Infinity Fabric、ICI、NeuronLink 与以太网路线争夺机架内带宽。',
    tags: ['Scale-up', 'Topology', 'Collective'],
  },
  {
    icon: Cpu,
    title: '低精度与推理专用化',
    body: 'FP8、FP4、MX 格式与更大的片上 SRAM，围绕 Token 生成重新分配硅面积。',
    tags: ['FP4', 'SRAM', 'Inference'],
  },
];

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl bg-white/[0.045] p-3">
      <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium leading-snug">{value}</dd>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('全部');
  const [activeChip, setActiveChip] = useState<Chip | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const filteredChips = useMemo(() => {
    const term = query.trim().toLowerCase();
    return chips.filter((chip) => {
      const categoryMatch = filter === '全部' || chip.category === filter;
      const haystack = [chip.vendor, chip.name, chip.category, chip.workload, chip.software, ...chip.route]
        .join(' ')
        .toLowerCase();
      return categoryMatch && (!term || haystack.includes(term));
    });
  }, [filter, query]);

  const comparedChips = chips.filter((chip) => compareIds.includes(chip.id));

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function shareApp() {
    if (navigator.share) {
      await navigator.share({ title: '芯图谱 ChipAtlas', text: 'AI 芯片参数与技术路线', url: location.href });
      return;
    }
    setInstallOpen(true);
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-6xl px-4 pb-28 pt-5 sm:px-8 sm:pt-8">
      <header className="flex items-center justify-between">
        <button className="flex items-center gap-3 text-left" type="button" onClick={() => scrollTo('discover')}>
          <span className="grid size-10 place-items-center rounded-[14px] bg-primary text-primary-foreground shadow-[0_0_34px_color-mix(in_oklch,var(--primary)_30%,transparent)]">
            <CircuitBoard className="size-5" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">AI SILICON INTELLIGENCE</span>
            <span className="block text-lg font-semibold tracking-tight">芯图谱 ChipAtlas</span>
          </span>
        </button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon-lg" aria-label="分享应用" onClick={() => void shareApp()}>
            <Share />
          </Button>
          <Button variant="outline" size="lg" aria-label="打开芯片对比" onClick={() => setCompareOpen(true)}>
            <GitCompareArrows />
            <span className="hidden sm:inline">对比</span>
            {compareIds.length > 0 && <span className="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{compareIds.length}</span>}
          </Button>
        </div>
      </header>

      <section id="discover" className="scroll-mt-5 pt-9 sm:pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              公开资料首批校验 · 8 个条目
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
              看懂下一代<br />AI 计算架构
            </h1>
          </div>
          <span className="hidden text-right font-mono text-xs leading-5 text-muted-foreground sm:block">
            MVP DATASET<br />UPDATED 2026.09.04
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 rounded-2xl border-white/10 bg-white/[0.055] pl-11 pr-10 text-base shadow-inner placeholder:text-muted-foreground/80"
              placeholder="搜索厂商、芯片、软件栈或技术路线"
              aria-label="搜索芯片"
            />
            {query && (
              <button className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-white/10" type="button" onClick={() => setQuery('')} aria-label="清除搜索">
                <X className="size-3.5" />
              </button>
            )}
          </label>
          <Button className="h-12 rounded-2xl px-4" onClick={() => setInstallOpen(true)}>
            <Plus /> 添加到 iPhone 主屏幕
          </Button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${filter === item ? 'border-primary bg-primary text-primary-foreground' : 'border-white/10 bg-white/[0.035] text-muted-foreground hover:bg-white/[0.07]'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section id="chips" className="scroll-mt-6 pt-9">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">ACCELERATOR INDEX</p>
            <h2 className="mt-1 text-lg font-semibold">AI 加速器索引</h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground">{filteredChips.length} / {chips.length}</span>
        </div>

        {filteredChips.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center">
            <Database className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">没有匹配的芯片</p>
            <button type="button" className="mt-2 text-xs text-primary" onClick={() => { setQuery(''); setFilter('全部'); }}>清除筛选条件</button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChips.map((chip) => {
              const selected = compareIds.includes(chip.id);
              const limitReached = compareIds.length >= 3 && !selected;
              return (
                <Card key={chip.id} className="gap-4 border-0 bg-card/78 py-4 ring-white/10 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-card">
                  <CardHeader className="px-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="h-1.5 w-14 rounded-full" style={{ background: `linear-gradient(90deg, ${chip.accent}, color-mix(in srgb, ${chip.accent} 35%, white))` }} />
                      <div className="flex gap-1.5">
                        <Badge variant="outline" className="border-white/10 font-mono text-[10px] text-muted-foreground">{chip.category}</Badge>
                        <Badge variant="outline" className="border-white/10 font-mono text-[10px] text-muted-foreground">{chip.released}</Badge>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{chip.vendor}</p>
                    <CardTitle className="text-xl font-semibold tracking-tight">{chip.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4">
                    <dl className="grid grid-cols-2 gap-3 border-t border-white/8 pt-4 text-xs">
                      <div>
                        <dt className="text-muted-foreground">存储容量</dt>
                        <dd className="mt-1 font-medium leading-snug">{chip.memory}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">存储带宽</dt>
                        <dd className="mt-1 font-medium leading-snug">{chip.bandwidth}</dd>
                      </div>
                    </dl>
                    <button type="button" onClick={() => setActiveChip(chip)} className="mt-4 flex w-full items-center justify-between rounded-xl bg-white/[0.045] px-3 py-2.5 text-left transition hover:bg-white/[0.08]">
                      <span className="truncate text-xs text-muted-foreground">{chip.route.slice(0, 2).join(' · ')}</span>
                      <ChevronRight className="size-3.5 shrink-0 text-primary" />
                    </button>
                    <Button
                      variant={selected ? 'secondary' : 'ghost'}
                      size="sm"
                      className="mt-2 w-full"
                      disabled={limitReached}
                      onClick={() => toggleCompare(chip.id)}
                    >
                      {selected ? <Check /> : <Plus />}
                      {selected ? '已加入对比' : limitReached ? '最多选择 3 项' : '加入对比'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section id="routes" className="scroll-mt-6 pt-12">
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">CO-DESIGN SIGNALS</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">关键技术路线</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">不只比较峰值算力，更关注存储、互联、封装和软件如何共同决定 LLM 系统效率。</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {routeCards.map((route, index) => {
            const Icon = route.icon;
            return (
              <article key={route.title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></span>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold">{route.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{route.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {route.tags.map((tag) => <Badge key={tag} variant="secondary" className="font-mono text-[10px]">{tag}</Badge>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="sources" className="scroll-mt-6 pt-12">
        <div className="rounded-3xl border border-primary/20 bg-primary/[0.055] p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"><BookOpen className="size-5" /></span>
            <div>
              <h2 className="font-semibold">数据口径说明</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">本 MVP 优先采用厂商官方页面和公开技术资料。峰值算力必须结合精度、稀疏性、芯片/板卡/系统边界阅读，页面不会把不同口径强行合成单一排名。</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/[0.055] px-3 py-1.5">公开来源</span>
                <span className="rounded-full bg-white/[0.055] px-3 py-1.5">字段级可信度</span>
                <span className="rounded-full bg-white/[0.055] px-3 py-1.5">待持续校验</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-2 pt-10 text-center text-xs text-muted-foreground">
        ChipAtlas MVP · 为 AI 芯片与 LLM 协同设计研究而建
      </footer>

      <nav className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-md items-center justify-around rounded-[22px] border border-white/10 bg-[#132329]/92 px-2 py-2 shadow-2xl backdrop-blur-xl sm:hidden" aria-label="主导航">
        {[
          ['发现', 'discover'],
          ['芯片', 'chips'],
          ['路线', 'routes'],
          ['口径', 'sources'],
        ].map(([label, id], index) => (
          <button key={id} type="button" onClick={() => scrollTo(id)} className={`rounded-2xl px-4 py-2 text-xs font-medium ${index === 0 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
            {label}
          </button>
        ))}
      </nav>

      <Sheet open={Boolean(activeChip)} onOpenChange={(open) => !open && setActiveChip(null)}>
        <SheetContent side="bottom" className="mx-auto max-h-[91dvh] max-w-3xl overflow-y-auto rounded-t-[30px] border-white/10 bg-popover px-1 pb-[max(1rem,env(safe-area-inset-bottom))] sm:left-1/2 sm:w-[min(720px,calc(100%-2rem))] sm:-translate-x-1/2">
          {activeChip && (
            <>
              <SheetHeader className="px-5 pb-2 pt-6">
                <div className="mb-3 h-1.5 w-16 rounded-full" style={{ background: activeChip.accent }} />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{activeChip.vendor}</Badge>
                  <Badge variant="outline">{activeChip.status}</Badge>
                  <Badge variant="outline">可信度 {activeChip.confidence}</Badge>
                </div>
                <SheetTitle className="mt-2 text-3xl font-semibold tracking-[-0.035em]">{activeChip.name}</SheetTitle>
                <SheetDescription className="mt-2 text-sm leading-6">{activeChip.summary}</SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-2 px-5 py-3 sm:grid-cols-3">
                <Metric label="工艺 / 封装" value={activeChip.process} />
                <Metric label="存储" value={activeChip.memory} />
                <Metric label="存储带宽" value={activeChip.bandwidth} />
                <Metric label="峰值计算" value={activeChip.compute} />
                <Metric label="功耗" value={activeChip.power} />
                <Metric label="互联" value={activeChip.interconnect} />
              </div>
              <div className="px-5 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">技术路径</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeChip.route.map((item, index) => (
                    <span key={item} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs">
                      <span className="font-mono text-[10px] text-primary">{index + 1}</span>{item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mx-5 mt-2 rounded-2xl bg-white/[0.045] p-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">软件栈</p>
                    <p className="mt-1 font-medium">{activeChip.software}</p>
                  </div>
                  <Zap className="size-5 text-primary" />
                </div>
              </div>
              <div className="flex gap-2 px-5 pb-2 pt-5">
                <Button className="flex-1" variant={compareIds.includes(activeChip.id) ? 'secondary' : 'default'} onClick={() => toggleCompare(activeChip.id)} disabled={compareIds.length >= 3 && !compareIds.includes(activeChip.id)}>
                  {compareIds.includes(activeChip.id) ? <Check /> : <Plus />}
                  {compareIds.includes(activeChip.id) ? '已加入对比' : '加入对比'}
                </Button>
                <a href={activeChip.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-background px-2.5 text-sm font-medium transition hover:bg-muted">
                  查看官方来源 <ExternalLink className="size-3.5" />
                </a>
              </div>
              <p className="px-5 pb-2 text-center text-[10px] text-muted-foreground">{activeChip.sourceLabel}</p>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={compareOpen} onOpenChange={setCompareOpen}>
        <SheetContent side="bottom" className="mx-auto max-h-[92dvh] max-w-5xl overflow-y-auto rounded-t-[30px] border-white/10 bg-popover px-1 pb-[max(1rem,env(safe-area-inset-bottom))] sm:left-1/2 sm:w-[min(960px,calc(100%-2rem))] sm:-translate-x-1/2">
          <SheetHeader className="px-5 pb-2 pt-6">
            <SheetTitle className="text-2xl font-semibold tracking-tight">芯片对比</SheetTitle>
            <SheetDescription>最多选择 3 项。数值保留原始口径，不进行跨精度排名。</SheetDescription>
          </SheetHeader>
          {comparedChips.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <GitCompareArrows className="mx-auto size-7 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">还没有选择芯片</p>
              <p className="mt-1 text-xs text-muted-foreground">关闭面板后，从芯片卡片中加入 2～3 项。</p>
            </div>
          ) : (
            <div className="grid gap-2 px-5 py-4" style={{ gridTemplateColumns: `repeat(${comparedChips.length}, minmax(150px, 1fr))` }}>
              {comparedChips.map((chip) => (
                <article key={chip.id} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="mb-3 h-1 w-10 rounded-full" style={{ background: chip.accent }} />
                  <p className="truncate text-[10px] text-muted-foreground">{chip.vendor}</p>
                  <h3 className="mt-0.5 truncate text-sm font-semibold">{chip.name}</h3>
                  <dl className="mt-4 space-y-3 text-xs">
                    {[
                      ['类别', chip.category],
                      ['工艺', chip.process],
                      ['存储', chip.memory],
                      ['带宽', chip.bandwidth],
                      ['计算', chip.compute],
                      ['功耗', chip.power],
                      ['互联', chip.interconnect],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[10px] text-muted-foreground">{label}</dt>
                        <dd className="mt-0.5 leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => toggleCompare(chip.id)}><X />移除</Button>
                </article>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={installOpen} onOpenChange={setInstallOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-lg rounded-t-[30px] border-white/10 bg-popover pb-[max(1rem,env(safe-area-inset-bottom))] sm:left-1/2 sm:w-[min(480px,calc(100%-2rem))] sm:-translate-x-1/2">
          <SheetHeader className="px-5 pb-2 pt-6">
            <SheetTitle className="text-xl font-semibold">安装到 iPhone</SheetTitle>
            <SheetDescription>不需要经过 App Store，现在就可以像 App 一样从主屏幕启动。</SheetDescription>
          </SheetHeader>
          <ol className="mx-5 mb-5 mt-2 space-y-3">
            {[
              ['1', '用 Safari 打开发布后的 ChipAtlas 链接'],
              ['2', '点击浏览器底部的“分享”按钮'],
              ['3', '选择“添加到主屏幕”，再点击“添加”'],
            ].map(([number, text]) => (
              <li key={number} className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3 text-sm">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs text-primary-foreground">{number}</span>
                {text}
              </li>
            ))}
          </ol>
        </SheetContent>
      </Sheet>
    </main>
  );
}
