export type Source = {
  title: string;
  publisher: string;
  url: string;
  date?: string;
  note: string;
};

export type MemoryLayer = {
  name: string;
  role: string;
  detail: string;
};

export type ChipRecord = {
  id: string;
  vendor: string;
  name: string;
  generation: string;
  category: 'GPU' | 'ASIC' | '晶圆级' | '近存计算';
  year: string;
  status: string;
  confidence: '高' | '中';
  accent: string;
  process: string;
  memory: string;
  bandwidth: string;
  compute: string;
  power: string;
  interconnect: string;
  software: string;
  workload: string;
  oneLiner: string;
  overview: string[];
  memoryType: string;
  memoryLayers: MemoryLayer[];
  memoryBottleneck: string;
  memoryVerdict: string;
  architecture: string[];
  watchItems: string[];
  officialSources: [Source, ...Source[]];
  thirdPartySources: Source[];
  lastVerified: string;
};

export type MemoryTopic = {
  id: string;
  name: string;
  fullName: string;
  maturity: string;
  accent: string;
  headline: string;
  summary: string;
  keyMetrics: Array<{ label: string; value: string }>;
  howItWorks: string[];
  aiRole: string[];
  tradeoffs: string[];
  officialSources: [Source, ...Source[]];
  thirdPartySources: Source[];
  lastVerified: string;
};

const verified = '2026-09-04';

export const chips: ChipRecord[] = [
  {
    id: 'nvidia-rubin',
    vendor: 'NVIDIA',
    name: 'Rubin GPU',
    generation: 'Vera Rubin',
    category: 'GPU',
    year: '2026',
    status: '量产导入',
    confidence: '高',
    accent: '#a8ef68',
    process: '双计算裸片 · NV-HBI',
    memory: '288 GB HBM4',
    bandwidth: '22 TB/s',
    compute: '50 PFLOPS NVFP4 推理',
    power: '平台级液冷',
    interconnect: 'NVLink 6 · 3.6 TB/s',
    software: 'CUDA · TensorRT-LLM · NCCL',
    workload: 'Agentic AI / 长上下文 / MoE',
    oneLiner: '把 HBM4、TMA 与 NVLink 6 组合成面向长上下文 Agent 的机架级存储与通信域。',
    overview: [
      'Rubin 延续通用 GPU 路线，但设计边界已从单颗 GPU 扩展到整机架。双计算裸片通过 NV-HBI 统一，计算、HBM4、CPU 一致性互联与 scale-up 网络共同决定可实现性能。',
      '对大模型而言，288 GB HBM4 主要扩大模型、KV Cache 与并发请求的驻留空间；22 TB/s 带宽则直接服务 decode 阶段持续搬运权重与 KV 状态。',
    ],
    memoryType: 'HBM4 + 集中式 L2 + 软件管理的数据搬移',
    memoryLayers: [
      { name: 'Tensor / Shared Memory', role: '线程块局部复用', detail: '靠近 Tensor Core，由编译器与 kernel 显式组织局部数据。' },
      { name: 'Central L2', role: '跨 GPC 共享缓存', detail: '为两个计算裸片后的全局访问提供统一缓冲层。' },
      { name: 'HBM4', role: '模型权重与 KV Cache 主存', detail: '最高 288 GB、22 TB/s；2048-bit 级宽接口把带宽推到 HBM3e 的数倍。' },
      { name: 'NVLink 6 Domain', role: '跨 GPU 扩展内存域', detail: '单 GPU 3.6 TB/s scale-up 带宽，服务 MoE 权重与 token 交换。' },
    ],
    memoryBottleneck: '计算峰值提升快于每字节可用带宽，低 batch decode、长上下文 attention 与 MoE 路由仍依赖数据局部性和融合 kernel。',
    memoryVerdict: 'Rubin 的关键不是“更多 HBM”本身，而是把 HBM4、TMA、NVLink 与机架拓扑作为同一个内存系统联合设计。',
    architecture: ['双裸片统一 GPU', 'HBM4 2048-bit 级接口', '增强 TMA 数据搬移', 'NVLink 6 机架级 scale-up'],
    watchItems: ['官方规格仍标注 preliminary', '实际可用容量与带宽效率', 'Rubin Ultra 扩展拓扑'],
    officialSources: [
      { title: 'Inside NVIDIA Rubin GPU Architecture', publisher: 'NVIDIA Technical Blog', url: 'https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/', date: '2026-07-21', note: 'GPU、HBM4、TMA 与 NVLink 6 的官方架构解读。' },
      { title: 'Vera Rubin NVL72', publisher: 'NVIDIA', url: 'https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/', note: '单 GPU、Superchip 与 NVL72 的官方规格口径。' },
    ],
    thirdPartySources: [
      { title: 'NVIDIA Vera Rubin：已知规格与系统边界', publisher: 'SiliconReport', url: 'https://www.siliconreport.com/nvidia-vera-rubin-everything-we-know-33727d4d', date: '2026-07', note: '从机架级容量与带宽理解 Rubin；非官方，需与 NVIDIA 规格交叉核验。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'nvidia-b200',
    vendor: 'NVIDIA',
    name: 'Blackwell B200',
    generation: 'Blackwell',
    category: 'GPU',
    year: '2024',
    status: '量产部署',
    confidence: '高',
    accent: '#8fda55',
    process: 'TSMC 4NP · 双裸片',
    memory: '180 GB HBM3e',
    bandwidth: '最高 8 TB/s',
    compute: '9 PFLOPS FP4 Dense',
    power: '最高 1,000 W',
    interconnect: 'NVLink 5 · 900 GB/s',
    software: 'CUDA · TensorRT-LLM · NCCL',
    workload: '大模型训练 / 推理 / HPC',
    oneLiner: 'Blackwell 以双裸片、HBM3e 和 NVLink 5 奠定“GPU 即系统节点”的主流范式。',
    overview: [
      'B200 是 Blackwell 数据中心 GPU 的主力形态。它把两个接近光刻掩模极限的计算裸片封装为单一逻辑 GPU，并以 HBM3e 支撑低精度 Tensor Core。',
      '对 LLM decode，带宽常比峰值算力更重要。180 GB 容量决定单卡可驻留的模型与 KV Cache 规模，约 8 TB/s 则限定权重流经计算阵列的速度。',
    ],
    memoryType: 'HBM3e + L2 / Shared Memory + NVLink 统一扩展',
    memoryLayers: [
      { name: 'Registers / Shared Memory', role: '显式数据复用', detail: 'kernel 在 SM 内重排 tile，避免重复访问 HBM。' },
      { name: 'L2 Cache', role: '全 GPU 共享缓存', detail: '为跨 SM、跨裸片访问提供缓存与一致地址空间。' },
      { name: 'HBM3e', role: '加速器主存', detail: '180 GB 容量，官方平台资料给出最高约 8 TB/s。' },
      { name: 'NVLink 5', role: '跨 GPU 数据域', detail: '配合 NVSwitch 构建 8 GPU HGX 与 72 GPU NVL 系统。' },
    ],
    memoryBottleneck: 'FP4 计算吞吐增长显著快于 HBM 带宽，decode 与小 batch 场景的算术强度偏低。',
    memoryVerdict: 'B200 的价值在 HBM3e 与 NVLink 共同提供的“驻留 + 搬移”能力；单看 FP4 峰值会高估真实 token 吞吐。',
    architecture: ['双计算裸片', '第五代 Tensor Core', 'HBM3e', 'NVLink 5 + NVSwitch'],
    watchItems: ['板卡与系统功耗口径不同', '稀疏/稠密计算口径', '实际 HBM 带宽利用率'],
    officialSources: [
      { title: 'HGX B200 Components', publisher: 'NVIDIA Documentation', url: 'https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory-h100-h200-b200/latest/components.html', note: 'HGX B200 组件、GPU 内存与互联的官方文档。' },
    ],
    thirdPartySources: [
      { title: 'Nvidia’s B200: Keeping the CUDA Juggernaut Rolling', publisher: 'Chips and Cheese', url: 'https://chipsandcheese.com/p/nvidias-b200-keeping-the-cuda-juggernaut', date: '2025', note: '含实测缓存、局部存储与 HBM 行为分析。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'amd-mi355x',
    vendor: 'AMD',
    name: 'Instinct MI355X',
    generation: 'CDNA 4',
    category: 'GPU',
    year: '2025',
    status: '量产部署',
    confidence: '高',
    accent: '#ff725f',
    process: 'TSMC 3 nm / 6 nm · 3D Chiplet',
    memory: '288 GB HBM3e',
    bandwidth: '8 TB/s',
    compute: '10.1 PFLOPS MXFP4 Dense',
    power: '1,400 W TBP',
    interconnect: 'Infinity Fabric · 1.075 TB/s',
    software: 'ROCm · HIP · RCCL',
    workload: '生成式 AI / HPC',
    oneLiner: '以 288 GB HBM3e、256 MB Infinity Cache 与 3D Chiplet 争取更大的单卡模型驻留空间。',
    overview: [
      'MI355X 是 CDNA 4 高功耗液冷版本，保留 MI300 系列的多 XCD、多 I/O Die 组织，同时强化低精度格式与内存容量。',
      '八组 HBM3e 堆栈与 256 MB Infinity Cache 构成三级全局存储层次。对软件而言它仍表现为大容量统一 GPU，但跨裸片访问路径会影响尾延迟和有效缓存带宽。',
    ],
    memoryType: '8 × HBM3e + 256 MB Infinity Cache + 分布式 L2',
    memoryLayers: [
      { name: 'LDS', role: 'CU 级 scratchpad', detail: '每 CU 160 KB，由 wavefront 与 kernel 显式管理。' },
      { name: 'L2', role: 'XCD 本地缓存', detail: '分布在八个计算裸片上，优先承接本地复用。' },
      { name: 'Infinity Cache', role: '内存侧共享缓存', detail: '256 MB，位于 I/O Die，缓冲跨 XCD 与 HBM 流量。' },
      { name: 'HBM3e', role: '统一显存', detail: '288 GB、8 TB/s，容量是其 LLM 部署竞争力核心。' },
    ],
    memoryBottleneck: '统一地址空间掩盖了物理 NUMA 特征；跨 I/O Die 的远端访问可能降低 Infinity Cache 与 HBM 的有效带宽。',
    memoryVerdict: 'MI355X 选择“容量优先 + 大内存侧缓存”，适合大模型驻留，但性能工程必须理解 Chiplet 局部性。',
    architecture: ['8 XCD + 4 IOD', '3D Chiplet', '256 MB Infinity Cache', '开放 ROCm 软件栈'],
    watchItems: ['1,400 W 液冷部署门槛', '跨 XCD 访问代价', 'ROCm kernel 成熟度'],
    officialSources: [
      { title: 'AMD Instinct MI355X GPU', publisher: 'AMD', url: 'https://www.amd.com/en/products/accelerators/instinct/mi350/mi355x.html', date: '2025-06-12', note: '产品规格、HBM3e、带宽、计算与功耗官方口径。' },
      { title: 'AMD CDNA 4 Architecture Whitepaper', publisher: 'AMD', url: 'https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/white-papers/amd-cdna-4-architecture-whitepaper.pdf', note: 'CDNA 4 芯粒、缓存与系统架构白皮书。' },
    ],
    thirdPartySources: [
      { title: 'AMD’s CDNA 4 Architecture Announcement', publisher: 'Chips and Cheese', url: 'https://chipsandcheese.com/p/amds-cdna-4-architecture-announcement', date: '2025-06-17', note: '从缓存、Chiplet 与统一访存角度拆解 CDNA 4。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'amd-mi300x',
    vendor: 'AMD',
    name: 'Instinct MI300X',
    generation: 'CDNA 3',
    category: 'GPU',
    year: '2023',
    status: '量产部署',
    confidence: '高',
    accent: '#f69178',
    process: 'TSMC 5 nm / 6 nm · 3D Chiplet',
    memory: '192 GB HBM3',
    bandwidth: '5.3 TB/s',
    compute: '2.61 PFLOPS FP8 Dense',
    power: '750 W TBP',
    interconnect: 'Infinity Fabric · PCIe 5.0',
    software: 'ROCm · HIP · RCCL',
    workload: '大模型推理 / 训练 / HPC',
    oneLiner: '八个计算裸片在四个 I/O Die 上方工作，以统一地址空间呈现 192 GB HBM3。',
    overview: [
      'MI300X 把 AMD 在 CPU 上成熟的 Chiplet 思路推向大计算 GPU。八个 XCD 通过 Infinity Fabric 访问四个 I/O Die 上的缓存与 HBM 控制器。',
      '它的突出点不是单一峰值，而是 192 GB HBM3 与 256 MB Infinity Cache 的组合，让更多大模型能在单卡或较少卡数上驻留。',
    ],
    memoryType: 'HBM3 + 256 MB Infinity Cache + Chiplet 统一地址空间',
    memoryLayers: [
      { name: 'LDS / L1', role: 'CU 本地复用', detail: '显式 scratchpad 与一级缓存减少全局数据搬移。' },
      { name: 'L2', role: 'XCD 本地缓存', detail: '每个计算裸片独立，访问局部性影响延迟。' },
      { name: 'Infinity Cache', role: '内存侧缓存', detail: '总计 256 MB，分布在四个 I/O Die。' },
      { name: 'HBM3', role: '加速器主存', detail: '8 堆栈、192 GB、5.3 TB/s。' },
    ],
    memoryBottleneck: '当访问均匀条带化到所有内存控制器时，跨 Die 流量可能先碰到 die-to-die 带宽，而非 HBM 理论上限。',
    memoryVerdict: 'MI300X 是研究“统一编程模型与物理非统一内存”张力的代表性 Chiplet GPU。',
    architecture: ['8 XCD / 4 IOD', '3D 混合堆叠', '统一显存', 'Infinity Cache'],
    watchItems: ['跨裸片局部性', '实际缓存命中率', '工作负载对 NUMA 暴露方式'],
    officialSources: [
      { title: 'AMD Instinct MI300X', publisher: 'AMD', url: 'https://www.amd.com/en/products/accelerators/instinct/mi300/mi300x.html', note: '容量、带宽、算力、功耗与互联官方规格。' },
    ],
    thirdPartySources: [
      { title: 'Testing AMD’s Giant MI300X', publisher: 'Chips and Cheese', url: 'https://chipsandcheese.com/p/testing-amds-giant-mi300x', date: '2024-06-25', note: '含缓存延迟、带宽与本地存储实测。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'google-tpu7x',
    vendor: 'Google',
    name: 'TPU7x · Ironwood',
    generation: '7th Gen TPU',
    category: 'ASIC',
    year: '2025',
    status: 'Google Cloud 可用',
    confidence: '高',
    accent: '#67b7ff',
    process: '双 Chiplet 定制 Tensor ASIC',
    memory: '192 GiB HBM / 芯片',
    bandwidth: '7.38 TB/s / 芯片',
    compute: '4.614 PFLOPS FP8',
    power: '未公开',
    interconnect: 'ICI 1.2 TB/s · 3D Torus',
    software: 'XLA · JAX · PyTorch/XLA · Pallas',
    workload: '训练 / 推理 / 超大规模 Pod',
    oneLiner: '两个各自拥有 96 GB HBM 的计算 Chiplet，通过高速 D2D 与 3D Torus 扩展到 9,216 芯片。',
    overview: [
      'Ironwood 将单芯片划分为两个独立内存空间的 Chiplet，每个 Chiplet 含一个 TensorCore、两个 SparseCore 和 96 GB HBM。框架会看到两个设备，而不是完全隐藏物理边界。',
      '这种设计把内存局部性显式交给 XLA、JAX 与 Pallas。高效运行不仅取决于 HBM，还取决于 VMEM 分块、D2D collectives 与 Pod 级切分。',
    ],
    memoryType: 'VMEM scratchpad + 192 GiB HBM + Host offload',
    memoryLayers: [
      { name: 'VMEM', role: 'TensorCore 本地 scratchpad', detail: '容量可调，Pallas kernel 的 block size 常受其约束。' },
      { name: 'HBM per Chiplet', role: '权重与激活主存', detail: '每个 Chiplet 96 GB；一颗 TPU 合计 192 GiB、约 7.38 TB/s。' },
      { name: 'D2D', role: 'Chiplet 间数据交换', detail: '官方称其比一条 1D ICI 链路快六倍。' },
      { name: 'Host Memory', role: '压力缓解与卸载', detail: '通过 PCIe 卸载激活或优化器状态，但带宽明显低于 HBM。' },
    ],
    memoryBottleneck: '双 Chiplet 的独立内存空间要求编译器与程序显式考虑分片；低效向量访问即使在 7.38 TB/s HBM 下仍会受限。',
    memoryVerdict: 'Ironwood 展示了“编译器可见 NUMA”：硬件降低制造风险，软件承担更精细的布局与通信优化。',
    architecture: ['双 Chiplet', '显式 VMEM', 'D2D collectives', '9,216 芯片 3D Torus'],
    watchItems: ['HBM 具体代际未明确标注', 'Pallas 分块约束', '跨 Chiplet collective 开销'],
    officialSources: [
      { title: 'TPU7x (Ironwood)', publisher: 'Google Cloud Documentation', url: 'https://docs.cloud.google.com/tpu/docs/tpu7x', note: '含完整规格表、内存层次、双 Chiplet 与拓扑说明。' },
    ],
    thirdPartySources: [
      { title: 'With “Ironwood” TPU, Google Pushes The AI Accelerator To The Floor', publisher: 'The Next Platform', url: 'https://www.nextplatform.com/compute/2025/04/09/with-ironwood-tpu-google-pushes-the-ai-accelerator-to-the-floor/1660461', date: '2025-04-09', note: '从封装、HBM 堆栈与 Pod 拓扑分析公开资料，含推断内容。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'microsoft-maia200',
    vendor: 'Microsoft',
    name: 'Maia 200',
    generation: 'Maia Gen 2',
    category: 'ASIC',
    year: '2026',
    status: 'Azure 部署',
    confidence: '高',
    accent: '#55dec2',
    process: 'TSMC 3 nm · 140B+ 晶体管',
    memory: '216 GB HBM3e + 272 MB SRAM',
    bandwidth: '7 TB/s HBM',
    compute: '10+ PFLOPS FP4',
    power: '750 W SoC TDP',
    interconnect: '2.8 TB/s 双向 scale-up',
    software: 'Maia SDK · PyTorch · Triton',
    workload: 'LLM 推理 / Token 生成',
    oneLiner: '以 HBM3e、大片上 SRAM、专用 DMA 与两级以太网 scale-up 共同优化 token 生成经济性。',
    overview: [
      'Maia 200 是面向推理的云端 ASIC，官方把内存系统而非峰值 FLOPS 放在核心位置：216 GB HBM3e、272 MB SRAM、专用 DMA 与 NoC 协同工作。',
      '系统层采用两级 scale-up 网络，单加速器暴露 2.8 TB/s 双向带宽，并在托盘内以四颗芯片直连，减少交换跳数。',
    ],
    memoryType: '272 MB SRAM + 216 GB HBM3e + DMA / NoC',
    memoryLayers: [
      { name: 'On-die SRAM', role: '热点权重与中间状态', detail: '272 MB，服务低延迟复用与窄精度数据路径。' },
      { name: 'Specialized DMA', role: '异步数据搬移', detail: '把计算与数据传输重叠，减少核心等待。' },
      { name: 'HBM3e', role: '模型与 KV Cache 主存', detail: '216 GB、7 TB/s，容量与带宽兼顾。' },
      { name: 'Ethernet Scale-up', role: '跨芯片扩展域', detail: '托盘内直连，跨机架沿用统一传输协议。' },
    ],
    memoryBottleneck: 'prefill 与 decode 的算术强度不同；固定硬件需依靠 DMA、NoC 和软件映射在两个阶段间保持高利用率。',
    memoryVerdict: 'Maia 200 是“数据搬移引擎优先”的推理 ASIC：SRAM、DMA、NoC 与网络是一条连续的数据路径。',
    architecture: ['推理优先', 'FP4 / FP8', '专用 DMA', '标准以太网 scale-up'],
    watchItems: ['SDK 仍处预览', '公开 benchmark 以厂商数据为主', '跨 6,144 芯片的实际效率'],
    officialSources: [
      { title: 'Maia 200: The AI accelerator built for inference', publisher: 'Microsoft Official Blog', url: 'https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/', date: '2026-01-26', note: '芯片、内存系统、互联与软件栈的官方发布。' },
    ],
    thirdPartySources: [
      { title: 'Microsoft Takes On Other Clouds With Maia 200', publisher: 'The Next Platform', url: 'https://www.nextplatform.com/ai/2026/01/28/microsoft-takes-on-other-clouds-with-braga-maia-200-ai-compute-engines/4092134', date: '2026-01-28', note: '拆解 HBM 堆栈、SRAM 与代际变化；部分字段为作者估算。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'openai-jalapeno',
    vendor: 'OpenAI × Broadcom',
    name: 'Jalapeño',
    generation: 'Gen 1 Intelligence Processor',
    category: 'ASIC',
    year: '2026',
    status: '工程样片 / 年底部署',
    confidence: '中',
    accent: '#ff8b4d',
    process: '定制推理 ASIC · 具体工艺未正式披露',
    memory: '容量与介质未公开',
    bandwidth: '未公开',
    compute: '未公开',
    power: '700 W 额定 · 实测 ≤550 W',
    interconnect: '系统级网络协同 · 规格未公开',
    software: 'OpenAI 模型 / kernel 协同编程',
    workload: 'LLM 推理 / Agentic workloads',
    oneLiner: '围绕 prefill、decode 与 KV Cache 局部性设计的 OpenAI 首款 LLM 推理芯片。',
    overview: [
      'Jalapeño 是 OpenAI 与 Broadcom 联合开发的首代推理加速器。公开材料强调“芯片—内存—网络—软件—机架”的全栈设计，而没有公布 HBM 容量或峰值 FLOPS。',
      '其核心思想是让模型状态和 KV Cache 显式放置并尽量保持局部，在 prefill 与 decode 之间激活合适的计算、内存和网络资源。公开性能结果采用整系统延迟与每瓦吞吐，而非单芯片峰值。',
    ],
    memoryType: '显式局部张量 + KV Cache locality + 系统级内存/网络协同',
    memoryLayers: [
      { name: 'Local Tensors', role: '可预测的局部存储', detail: '编程模型显式描述数据位置、通信与同步。' },
      { name: 'Model State / KV Cache', role: '长驻数据', detail: '设计目标是尽量保持本地，减少跨资源搬移。' },
      { name: 'Integrated Network', role: '跨芯片状态交换', detail: '网络被视为体系结构的一部分，而非外围 I/O。' },
      { name: 'Rack-scale Domain', role: '完整请求执行域', detail: '以大连接域降低通信延迟，具体容量与带宽尚未公开。' },
    ],
    memoryBottleneck: '目前缺少容量、带宽、缓存层次和工艺等硬规格，不能与 GPU 做逐字段公平比较。',
    memoryVerdict: 'Jalapeño 最值得跟踪的是“模型驱动硬件”和 KV Cache 局部放置；在硬规格披露前应把未知明确保留为空。',
    architecture: ['LLM 推理原生', '显式 locality', '网络内生化', 'AI 辅助芯片与 kernel 优化'],
    watchItems: ['内存类型/容量/带宽', 'Hot Chips 完整架构资料', '量产部署与可复现实测'],
    officialSources: [
      { title: 'OpenAI and Broadcom unveil LLM-optimized inference chip', publisher: 'OpenAI', url: 'https://openai.com/index/openai-broadcom-jalapeno-inference-chip/', date: '2026-06-24', note: '首发公告与系统合作边界。' },
      { title: 'Jalapeño’s first results', publisher: 'OpenAI', url: 'https://openai.com/index/jalapeno-first-results/', date: '2026-08-25', note: '首批性能、功耗与数据局部性设计说明。' },
    ],
    thirdPartySources: [
      { title: 'Inside OpenAI Jalapeño’s Inference Chip Architecture', publisher: 'TechInsights', url: 'https://www.techinsights.com/openai-jalapeno-inference-chip-architecture', date: '2026-09-04', note: '基于 Hot Chips 资料的独立架构解读。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'aws-trainium2',
    vendor: 'AWS',
    name: 'Trainium2',
    generation: 'Trn2',
    category: 'ASIC',
    year: '2024',
    status: 'EC2 可用',
    confidence: '高',
    accent: '#ffb65c',
    process: '第三代 NeuronCore',
    memory: '96 GB HBM3 / 芯片',
    bandwidth: '约 2.9 TB/s / 芯片',
    compute: '1.3 PFLOPS FP8 Dense',
    power: '未公开',
    interconnect: 'NeuronLink · EFAv3',
    software: 'AWS Neuron SDK · NKI',
    workload: '大模型训练 / 推理',
    oneLiner: '从单芯片 HBM3 到 64 芯片 UltraServer，以无交换 point-to-point NeuronLink 形成云内 scale-up。',
    overview: [
      'Trainium2 通过 EC2 Trn2 实例交付。单实例含 16 芯片、1.5 TB HBM3 和 46 TB/s 聚合带宽；UltraServer 将 64 芯片连接为更大的计算域。',
      'AWS 的差异化在于把 NeuronCore、HBM、NeuronLink、EFA 网络与 Neuron SDK 一起作为云服务产品，而非单独销售芯片。',
    ],
    memoryType: 'HBM3 + NeuronLink + CPU DDR5 / 本地 NVMe 分层',
    memoryLayers: [
      { name: 'NeuronCore Local Memory', role: '算子局部复用', detail: '由编译器与 NKI kernel 映射，公开容量有限。' },
      { name: 'HBM3', role: '加速器主存', detail: '单芯片 96 GB；16 芯片实例合计 1.5 TB。' },
      { name: 'NeuronLink', role: '实例内 scale-up', detail: 'point-to-point 2D Torus，避免集中式交换芯片。' },
      { name: 'DDR5 / NVMe', role: '主机与存储层', detail: 'CPU 头节点和可直达本地 NVMe 承担数据集与检查点。' },
    ],
    memoryBottleneck: '无交换 torus 的跳数与拓扑映射会影响 collective；软件需让张量分片与物理邻接匹配。',
    memoryVerdict: 'Trainium2 的内存故事是“云实例即产品”：HBM、主机 DDR5、本地 NVMe 和 EFA 构成完整层次。',
    architecture: ['云端 ASIC', 'HBM3', '无交换 NeuronLink', 'Neuron 编译器 / NKI'],
    watchItems: ['单芯片功耗未公开', '拓扑感知编译', 'UltraServer 量产可用性'],
    officialSources: [
      { title: 'Amazon EC2 Trn2 instances and UltraServers', publisher: 'AWS', url: 'https://aws.amazon.com/ec2/instance-types/trn2/', note: '实例级芯片数、HBM、带宽、网络与软件支持。' },
    ],
    thirdPartySources: [
      { title: 'Amazon’s AI Self Sufficiency: Trainium2 Architecture & Networking', publisher: 'SemiAnalysis', url: 'https://newsletter.semianalysis.com/p/amazons-ai-self-sufficiency-trainium2-architecture-networking', date: '2024', note: '深入到 CPU tray、HBM、NVMe 与 2D Torus 的系统拆解。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'intel-gaudi3',
    vendor: 'Intel',
    name: 'Gaudi 3',
    generation: 'Gaudi',
    category: 'ASIC',
    year: '2024',
    status: '量产部署',
    confidence: '高',
    accent: '#5ca8ff',
    process: 'TSMC 5 nm · 双裸片',
    memory: '128 GB HBM2e + 96 MB SRAM',
    bandwidth: '3.7 TB/s HBM · 12.8 TB/s SRAM',
    compute: '1.678 PFLOPS FP8 / BF16',
    power: '900 W OAM',
    interconnect: '24 × 200 GbE RoCE',
    software: 'SynapseAI · PyTorch',
    workload: 'LLM 训练 / 推理',
    oneLiner: '以大片上 SRAM、HBM2e 和片上 200GbE 端口坚持开放以太网扩展路线。',
    overview: [
      'Gaudi 3 由两个对称裸片组成，包含 Matrix Math Engine、Tensor Processing Core 与共享 SRAM。它没有专用 NVLink 类交换域，而是把 24 个 200GbE RoCE 端口直接集成到芯片。',
      '这种设计让内存层次和网络层次连成一体：96 MB SRAM 负责片上热点，128 GB HBM2e 承载模型，标准以太网处理 scale-up 与 scale-out。',
    ],
    memoryType: '96 MB SRAM + 128 GB HBM2e + 片上 RoCE',
    memoryLayers: [
      { name: 'TPC Local Memory', role: '核心私有复用', detail: '供向量与通用张量操作就近访问。' },
      { name: 'Shared SRAM', role: '片上交换与热点', detail: '总计 96 MB，聚合带宽约 12.8 TB/s。' },
      { name: 'HBM2e', role: '模型主存', detail: '八堆栈、128 GB、3.7 TB/s。' },
      { name: 'Integrated RoCE', role: '跨芯片扩展', detail: '24 × 200GbE，利用标准以太网组网。' },
    ],
    memoryBottleneck: 'HBM2e 容量和带宽落后于 HBM3e 新平台；优势更多取决于 SRAM 利用与以太网集群成本。',
    memoryVerdict: 'Gaudi 3 是观察“开放以太网能否替代专有 scale-up fabric”的清晰样本。',
    architecture: ['双裸片', '96 MB 共享 SRAM', '8 × HBM2e', '片上 200GbE RoCE'],
    watchItems: ['软件生态持续性', '以太网 collective 效率', '后续产品路线整合'],
    officialSources: [
      { title: 'Intel Gaudi 3 AI Accelerator', publisher: 'Intel', url: 'https://cdrdv2-public.intel.com/845118/gaudi-3-ai-accelerator-30-3-30.pdf', note: '官方产品规格与性能资料。' },
    ],
    thirdPartySources: [
      { title: 'With Gaudi 3, Intel Can Sell AI Accelerators To The PyTorch Masses', publisher: 'The Next Platform', url: 'https://www.nextplatform.com/ai/2024/04/09/with-gaudi-3-intel-can-sell-ai-accelerators-to-the-pytorch-masses/1640695', date: '2024-04-09', note: '含 SRAM、HBM 控制器与芯片互联拆解。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'cerebras-wse3',
    vendor: 'Cerebras',
    name: 'WSE-3',
    generation: 'CS-3 / CS-4',
    category: '晶圆级',
    year: '2024',
    status: '系统部署',
    confidence: '高',
    accent: '#ac8bff',
    process: 'TSMC 5 nm · 晶圆级',
    memory: '44 GB 片上 SRAM',
    bandwidth: '约 21 PB/s 片上',
    compute: '125 PFLOPS（厂商稀疏口径）',
    power: '约 25 kW / WSE 系统级',
    interconnect: 'SwarmX · 12 × 100GbE I/O',
    software: 'Cerebras Software Platform',
    workload: '低延迟推理 / 超大模型训练',
    oneLiner: '把 44 GB SRAM 铺满晶圆，牺牲容量换取极低延迟与 PB/s 级片上数据流。',
    overview: [
      'WSE-3 用单片晶圆级处理器消除传统多芯片边界，约一半硅面积用于分布式 SRAM。权重和激活若能驻留在晶圆上，可避免 HBM 与 off-package 通信。',
      '代价是容量仅 44 GB，模型往往必须跨多片晶圆按层流水。外部 I/O 远低于片上带宽，因此映射策略与模型大小决定实际优势。',
    ],
    memoryType: '全晶圆分布式 SRAM + 数据流路由',
    memoryLayers: [
      { name: 'Core-local SRAM', role: '权重/激活本地存储', detail: '分布到约 90 万个核心旁，合计 44 GB。' },
      { name: 'On-wafer Fabric', role: 'SRAM 间数据流', detail: '二维 mesh 跨越曝光场边界，提供 PB/s 级聚合带宽。' },
      { name: 'SwarmX / Ethernet', role: '跨系统扩展', detail: '承担多晶圆流水和外部数据输入，带宽远低于片上。' },
      { name: 'KVSS DDR5', role: 'KV Cache 外置层', detail: '系统可配大容量 CPU DDR5 节点扩展 KV 存储。' },
    ],
    memoryBottleneck: '44 GB 容量和有限 off-wafer I/O 使超大模型必须流水化；SRAM 密度缩放放缓也限制后续容量增长。',
    memoryVerdict: 'WSE-3 代表极端 SRAM machine：把内存墙移到晶圆外 I/O 与模型切分位置。',
    architecture: ['晶圆级集成', '44 GB 分布式 SRAM', '数据流执行', '系统级容错'],
    watchItems: ['125 PFLOPS 为稀疏口径', '模型跨晶圆流水开销', 'CS-4 复用 WSE-3 的容量上限'],
    officialSources: [
      { title: 'Cerebras Announces Third-Generation Wafer Scale Engine', publisher: 'Cerebras', url: 'https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine', date: '2024-03-13', note: 'WSE-3 制程、晶体管、核心、SRAM 与峰值官方发布。' },
    ],
    thirdPartySources: [
      { title: 'Cerebras — Faster Tokens Please', publisher: 'SemiAnalysis', url: 'https://newsletter.semianalysis.com/p/cerebras-faster-tokens-please', date: '2026', note: '深入讨论 SRAM machine 的带宽、容量、I/O 与系统功耗权衡。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'meta-mtia300',
    vendor: 'Meta',
    name: 'MTIA 300',
    generation: 'MTIA Roadmap',
    category: 'ASIC',
    year: '2026',
    status: '内部生产部署',
    confidence: '中',
    accent: '#7faaff',
    process: '未公开',
    memory: '未公开',
    bandwidth: '官方仅披露代际提升',
    compute: '面向排序与推荐训练',
    power: '未公开',
    interconnect: '模块化 OCP 机架',
    software: 'PyTorch · vLLM · Triton',
    workload: '排序 / 推荐训练',
    oneLiner: '以六个月级快速迭代和工作负载定制为核心，具体存储规格仍保持未披露。',
    overview: [
      'Meta 表示 MTIA 300 已投入生产，用于排序与推荐训练；后续 400、450、500 将逐步覆盖生成式 AI 推理。公开资料强调模块复用、行业标准和快速迭代。',
      '由于官方没有公布 MTIA 300 的内存容量、介质或带宽，本条目不引用早期 MTIA 数据冒充新一代规格，只把代际方向与待核实问题明确列出。',
    ],
    memoryType: '未披露；官方确认代际提升内存带宽',
    memoryLayers: [
      { name: 'On-chip Memory', role: '热点与中间状态', detail: 'MTIA 家族传统上重视 SRAM，但 300 的容量尚未公开。' },
      { name: 'External Memory', role: '模型与 embedding', detail: '介质、容量与带宽均待官方资料。' },
      { name: 'Rack Infrastructure', role: '规模化部署', detail: '模块化设计可落入现有 OCP 机架。' },
    ],
    memoryBottleneck: '推荐训练的 embedding 表与不规则访问对容量、随机访问和网络敏感，但 MTIA 300 的公开细节不足。',
    memoryVerdict: 'MTIA 300 的研究价值在于“业务负载牵引的快速芯片迭代”；现阶段必须把缺失规格当成信息本身。',
    architecture: ['工作负载定制', '六个月级迭代', '行业标准软件', '模块化 OCP 系统'],
    watchItems: ['内存介质/容量/带宽', '训练与推理代际分工', '官方架构论文或 Hot Chips 资料'],
    officialSources: [
      { title: 'Expanding Meta’s Custom Silicon to Power Our AI Workloads', publisher: 'Meta', url: 'https://about.fb.com/news/2026/03/expanding-metas-custom-silicon-to-power-our-ai-workloads/', date: '2026-03-11', note: 'MTIA 300–500 路线、用途与软件/机架标准。' },
    ],
    thirdPartySources: [
      { title: 'Meta Custom Silicon: What’s Old Is New', publisher: 'SemiAnalysis', url: 'https://newsletter.semianalysis.com/p/meta-custom-silicon-whats-old-is', date: '2023', note: '解析早期 MTIA 的 SRAM 与 LPDDR 路线，仅作家族背景，不代表 MTIA 300 规格。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'huawei-ascend950dt',
    vendor: '华为',
    name: '昇腾 950DT',
    generation: 'Ascend 950',
    category: 'ASIC',
    year: '2026 Q4',
    status: '官方路线图',
    confidence: '中',
    accent: '#f25b58',
    process: '未公开',
    memory: '144 GB HiZQ 2.0 HBM',
    bandwidth: '4 TB/s',
    compute: '1 PFLOPS FP8 · 2 PFLOPS FP4',
    power: '未公开',
    interconnect: '2 TB/s 总互联带宽',
    software: 'CANN · PyTorch 生态',
    workload: 'Decode / 训练',
    oneLiner: '把 prefill 与 decode 拆成不同存储配置，950DT 以高带宽 HBM 专攻 decode 和训练。',
    overview: [
      '昇腾 950 系列公开路线把推理阶段拆开：950PR 面向 prefill 与推荐，采用更低成本 HiBL；950DT 面向 decode 与训练，采用 144 GB、4 TB/s 的 HiZQ 2.0 HBM。',
      '这种产品分化直接对应算术强度差异：prefill 更依赖计算，decode 更依赖内存带宽与 KV Cache。它是目前公开路线中最明确的“以存储配置定义 SKU”案例之一。',
    ],
    memoryType: 'HiZQ 2.0 HBM + 分阶段推理 SKU',
    memoryLayers: [
      { name: 'On-chip Buffers', role: 'Cube / Vector 数据复用', detail: '延续达芬奇架构的显式多级 buffer 思路。' },
      { name: 'HiZQ 2.0 HBM', role: 'Decode / 训练主存', detail: '官方路线给出 144 GB 与 4 TB/s。' },
      { name: 'Chip Interconnect', role: '跨卡状态交换', detail: '950 系列官方目标为 2 TB/s 总互联带宽。' },
    ],
    memoryBottleneck: '950DT 尚未到计划上市窗口，性能、供货、软件成熟度与 HBM 实现均需等待量产资料验证。',
    memoryVerdict: 'Ascend 950 把“prefill 计算墙 / decode 内存墙”直接转化为两种内存 SKU，是软硬协同的重要路线信号。',
    architecture: ['P/D 分型', '自有 HBM 路线', '丰富低精度格式', 'SuperPoD 互联'],
    watchItems: ['Q4 2026 交付', 'HiZQ 2.0 HBM 量产', '实测带宽与 CANN 支持'],
    officialSources: [
      { title: 'Groundbreaking SuperPoD Interconnect', publisher: 'Huawei', url: 'https://www.huawei.com/en/news/2025/9/hc-xu-keynote-speech', date: '2025-09', note: 'Ascend 950PR/DT、内存容量带宽、精度与路线图官方说明。' },
    ],
    thirdPartySources: [
      { title: 'Huawei Ascend Production Ramp', publisher: 'SemiAnalysis', url: 'https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp', date: '2025', note: '提供昇腾供应链、HBM 约束与系统路线背景。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'df1000',
    vendor: '东方算芯',
    name: '巅峯 DF1000',
    generation: 'DF1000',
    category: '近存计算',
    year: '2026',
    status: '流片验证 / 集群运行',
    confidence: '中',
    accent: '#f7c04a',
    process: '国产 14 nm · 晶圆级混合键合 3D',
    memory: '3D DRAM 近存计算 · 容量未公开',
    bandwidth: '官方称较传统方案数量级提升',
    compute: '520 TFLOPS BF16（发布口径）',
    power: '未公开',
    interconnect: '原生分布式执行 · 标准以太网系统',
    software: '自研编译器 / 算子库 / 通信库',
    workload: '训练 / 单机推理 / AFD 分布式推理',
    oneLiner: '在 14 nm 下用逻辑—DRAM 晶圆级混合键合缩短数据路径，以架构换制程。',
    overview: [
      'DF1000 走的是软件定义与 3D 近存计算路线：逻辑与 DRAM 通过晶圆级 Hybrid Bonding 垂直堆叠，以亚微米互连提高带宽密度并降低搬移距离。',
      '公司展示了 OAM 2.0 加速卡、服务器、64 卡超节点与 128 卡集群。公开资料对算力和系统形态已有描述，但内存容量、绝对带宽与功耗仍待完整规格书。',
    ],
    memoryType: '3D DRAM 近存计算 + Hybrid Bonding',
    memoryLayers: [
      { name: 'Compute Layer', role: '软件定义执行', detail: '粗细粒度融合的数据流编程范式。' },
      { name: '3D DRAM Layer', role: '近存主存', detail: '与逻辑晶圆垂直键合，缩短高频数据搬移路径。' },
      { name: 'Hybrid Bonding', role: '超密垂直互连', detail: '公司称互连间距进入亚微米级，提升带宽密度。' },
      { name: 'AFD Runtime', role: '分布式推理映射', detail: '支持 Prefill/Decode 与 Attention/FFN 等分离方式。' },
    ],
    memoryBottleneck: '绝对容量、带宽、功耗和测试方法尚未完整公开，现阶段不能与 HBM GPU 进行定量等价比较。',
    memoryVerdict: 'DF1000 是本项目重点跟踪的国产近存计算样本：真正的验证点将是公开规格、良率、软件映射与规模化部署。',
    architecture: ['14 nm 成熟制程', '逻辑 / DRAM 3D 堆叠', '软件定义数据流', '原生分布式执行'],
    watchItems: ['完整产品规格书', '绝对内存容量与带宽', '第三方实测与量产规模'],
    officialSources: [
      { title: '巅峯 DF1000 产品页', publisher: '东方算芯', url: 'https://www.dfsx.com/products/ai-accelerator/df1000', date: '2026-07', note: '官方产品定位、3D DRAM 与应用场景。' },
      { title: '3D DRAM 近存计算', publisher: '东方算芯', url: 'https://www.dfsx.com/technology/3d-near-memory-computing', note: 'Hybrid Bonding、带宽与延迟的官方技术路线。' },
    ],
    thirdPartySources: [
      { title: '国产 AI 算力不卷制程卷架构：DF1000 的“三维突围”', publisher: '电子工程专辑', url: 'https://www.eet-china.com/news/202607143486.html', date: '2026-07-14', note: '发布会技术解读，含 14 nm、BF16 算力与混合键合背景。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'tesla-dojo-d1',
    vendor: 'Tesla',
    name: 'Dojo D1',
    generation: 'Dojo',
    category: 'ASIC',
    year: '2021–2025',
    status: '历史路线 / 项目已终止',
    confidence: '高',
    accent: '#ef6c68',
    process: 'TSMC 7 nm · 训练 Tile',
    memory: '1.25 MB SRAM / 节点 · 外部 DRAM',
    bandwidth: 'Tile 36 TB/s 边缘带宽（发布口径）',
    compute: '362 TFLOPS BF16/CFP8 / D1',
    power: 'Tile 系统级高功耗',
    interconnect: '2D Mesh · 25 D1 / Tile',
    software: 'Tesla 编译器与训练栈',
    workload: '自动驾驶视频训练',
    oneLiner: '25 颗无封装 D1 组成训练 Tile，以边缘互联和分布式 SRAM 追求“计算平面连续化”。',
    overview: [
      'Dojo D1 把 354 个计算节点、局部 SRAM 与高速边缘 I/O 组织成二维 mesh；25 颗 D1 再以 5×5 形式构成 Training Tile。',
      'Tesla 后续终止了独立 Dojo 路线，但 D1 仍是研究先进封装、系统级供电和去封装 tile 的典型案例。这里把它保留为“历史路线”，避免与仍在量产的产品混为一谈。',
    ],
    memoryType: '分布式 SRAM + Tile 外部 DRAM',
    memoryLayers: [
      { name: 'Node SRAM', role: '计算节点局部状态', detail: '每节点约 1.25 MB，强调显式数据流与局部性。' },
      { name: 'On-die Mesh', role: '节点间张量传输', detail: '把芯片内部设计成可扩展二维平面。' },
      { name: 'Tile Fabric', role: '跨 D1 扩展', detail: '25 颗 D1 无传统封装拼成 5×5 Tile。' },
      { name: 'External DRAM', role: '容量层', detail: '经接口处理器连接，无法享受片上 SRAM 的极端带宽。' },
    ],
    memoryBottleneck: '片上 SRAM 容量有限，跨 Tile 与外部 DRAM 的数据路径复杂；系统实现成本最终削弱路线持续性。',
    memoryVerdict: 'Dojo 把内存与互联平面化，是一次激进系统实验；项目终止本身也是架构—组织—生态共同约束的证据。',
    architecture: ['354 节点 / D1', '25 D1 / Tile', '分布式 SRAM', '去传统封装互联'],
    watchItems: ['作为历史案例维护', 'AI6 对 Dojo 思路的继承', '公开数据多为发布会口径'],
    officialSources: [
      { title: 'Tesla Dojo Custom AI Supercomputer at Hot Chips 34', publisher: 'Hot Chips Conference', url: 'https://hc2024.hotchips.org/assets/program/conference/day2/17_HC2024_Tesla_TTPoE_v5.pdf', date: '2022', note: 'D1、Training Tile、系统供电与互联的会议演讲资料。' },
    ],
    thirdPartySources: [
      { title: 'Tesla Dojo — Unique Packaging and Chip Design', publisher: 'SemiAnalysis', url: 'https://newsletter.semianalysis.com/p/tesla-dojo-unique-packaging-and-chip', date: '2021', note: '从 SRAM、封装与 Tile 扩展角度分析 Dojo。' },
    ],
    lastVerified: verified,
  },
];

export const memoryTopics: MemoryTopic[] = [
  {
    id: 'hbm',
    name: 'HBM3e → HBM4',
    fullName: 'High Bandwidth Memory',
    maturity: 'HBM3e 量产 · HBM4 2026 导入',
    accent: '#8fe86f',
    headline: '用超宽接口把 DRAM 搬到计算封装旁边',
    summary: 'HBM 通过 TSV 垂直堆叠 DRAM，并借助硅中介层或先进封装与加速器并排连接。HBM4 把接口宽度翻倍到 2048-bit 级，并开始让逻辑基底承担更多定制功能。',
    keyMetrics: [
      { label: 'HBM4 接口', value: '2048-bit / stack' },
      { label: '单堆栈带宽', value: '>2.8 TB/s（厂商产品）' },
      { label: '单堆栈容量', value: '36 GB（12-Hi 示例）' },
      { label: 'AI 角色', value: '权重、KV Cache、激活主存' },
    ],
    howItWorks: ['TSV 把多层 DRAM 垂直连接。', '宽并行接口以较低每 pin 速率换取极高总带宽。', '逻辑 base die 与 GPU/ASIC 的封装协同变得更深。'],
    aiRole: ['训练时承载权重、激活与优化器状态。', 'decode 时持续流式读取权重和 KV Cache。', '容量决定模型驻留与 batch，上行带宽决定 memory-bound token 速度。'],
    tradeoffs: ['先进封装产能、良率与散热共同抬高成本。', '每字节成本显著高于 DDR/LPDDR/Flash。', '算力增长仍快于带宽增长，需要缓存、量化和 kernel 融合。'],
    officialSources: [
      { title: 'Micron HBM4', publisher: 'Micron', url: 'https://www.micron.com/products/memory/hbm/hbm4', note: 'HBM4 接口、容量、带宽与量产节奏的厂商资料。' },
      { title: 'Samsung HBM4', publisher: 'Samsung Semiconductor', url: 'https://semiconductor.samsung.com/dram/hbm/hbm4/', note: 'HBM4 2048 I/O、DRAM 与逻辑工艺说明。' },
    ],
    thirdPartySources: [
      { title: 'HBM4 走向定制逻辑基底：要关注什么', publisher: 'Tom’s Hardware', url: 'https://www.tomshardware.com/pc-components/dram/samsung-teases-new-hbm5-with-twice-the-performance-of-hbm4e-ambitious-data-transfer-rates-could-hint-at-4-096-bit-interface', date: '2026-09', note: '追踪 HBM4E / HBM5 路线；新闻分析，需与厂商资料交叉阅读。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'lpddr',
    name: 'LPDDR5X → LPDDR6',
    fullName: 'Low Power Double Data Rate DRAM',
    maturity: 'LPDDR5X 广泛量产 · LPDDR6 初期导入',
    accent: '#62c8ff',
    headline: '以能效和容量密度承接端侧 AI，也开始进入服务器',
    summary: 'LPDDR 原本服务移动设备，随着边缘模型和推理服务器追求每瓦容量，它正扩展到 AI PC、汽车与大容量服务器。LPDDR6 通过更多、更窄的子通道提高并发，并加强动态电压频率管理。',
    keyMetrics: [
      { label: 'LPDDR6 厂商速度', value: '10.7–14.4 Gbps / pin' },
      { label: '产品带宽示例', value: '最高 125 GB/s' },
      { label: '能效改善', value: '最高约 21% vs LPDDR5X' },
      { label: 'AI 角色', value: '端侧模型 / 大容量低功耗推理' },
    ],
    howItWorks: ['降低 I/O 电压并采用精细电源状态。', '多子通道提升并行性，减轻单通道冲突。', '封装可贴近 SoC，也可通过 LPCAMM / SOCAMM 模块化。'],
    aiRole: ['端侧 LLM 共享 CPU/GPU/NPU 统一内存。', '低功耗服务器以更大容量承载模型与 KV Cache。', '适合容量/能效优先、带宽要求低于 HBM 的层级。'],
    tradeoffs: ['绝对带宽低于 HBM。', '高容量多通道布线和信号完整性复杂。', '焊接式封装利于能效但不利于维修，模块化方案仍在演进。'],
    officialSources: [
      { title: 'Samsung LPDDR6', publisher: 'Samsung Semiconductor', url: 'https://semiconductor.samsung.com/dram/lpddr/lpddr6/', note: '速度、带宽、DVFS / DEM 与 AI 场景官方介绍。' },
      { title: 'LPDDR at Scale for LLM Inference', publisher: 'Micron', url: 'https://www.micron.com/content/dam/micron/global/public/products/memory/mobile-dram/lpddr5/documents/lpddr-at-scale-llm-inference-white-paper.pdf', date: '2026', note: '大容量 LPDDR5X 服务器推理的厂商白皮书。' },
    ],
    thirdPartySources: [
      { title: 'JEDEC publishes first LPDDR6 standard', publisher: 'Tom’s Hardware', url: 'https://www.tomshardware.com/pc-components/dram/jedec-publishes-first-lpddr6-standard-new-interface-promises-double-the-effective-bandwidth-of-current-gen', date: '2025-07-10', note: '从子通道与标准变化解读 LPDDR6。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'ddr',
    name: 'DDR5 / MRDIMM',
    fullName: 'Double Data Rate Main Memory',
    maturity: 'DDR5 主流 · MRDIMM 加速导入',
    accent: '#a88cff',
    headline: '容量、可维护性与成本主导的主机内存层',
    summary: 'DDR5 是 CPU 主存与大容量内存池的基础。MRDIMM 通过多路复用 rank 和缓冲逻辑提升有效数据率，使主机侧带宽更适合数据预处理、Embedding、KV Cache 卸载与 disaggregated serving。',
    keyMetrics: [
      { label: 'DDR5 基础', value: '双 32-bit 子通道 / DIMM' },
      { label: 'MRDIMM 路线', value: 'Gen2 目标 12,800 MT/s' },
      { label: '优势', value: '高容量、可插拔、低成本/bit' },
      { label: 'AI 角色', value: 'Host / KV / Embedding / offload' },
    ],
    howItWorks: ['DIMM 在 CPU 内存通道上并行工作。', 'DDR5 把传统 64-bit 通道拆成两个 32-bit 子通道。', 'MRDIMM 以寄存器和多路复用缓冲器聚合多个 rank 的数据。'],
    aiRole: ['支撑 CPU 预处理、数据加载与检查点。', '作为 HBM 之外的 KV Cache 或模型卸载层。', 'CXL 可进一步把 DDR5 组织为共享或分层内存池。'],
    tradeoffs: ['带宽密度与能效远低于封装内 HBM。', 'NUMA、通道人口和 rank 组织强烈影响性能。', 'MRDIMM 增加缓冲延迟、功耗和平台依赖。'],
    officialSources: [
      { title: 'Micron DDR5 SDRAM', publisher: 'Micron', url: 'https://www.micron.com/products/memory/dram-components/ddr5-sdram', note: 'DDR5 产品与技术支持入口。' },
      { title: 'DDR5 AI Workload Performance', publisher: 'Micron', url: 'https://tw.micron.com/content/dam/micron/global/public/documents/products/technical-marketing-brief/ddr5-ai-inference-workload-performance-tech-brief.pdf', note: 'CPU 内存带宽对 AI 推理的厂商测试资料。' },
    ],
    thirdPartySources: [
      { title: 'Performance and Energy Benefits of MRDIMMs', publisher: 'arXiv preprint', url: 'https://arxiv.org/abs/2605.02371', date: '2026-05', note: '生产服务器上的 MRDIMM 性能与能耗评估。' },
    ],
    lastVerified: verified,
  },
  {
    id: 'hbf',
    name: 'HBF',
    fullName: 'High Bandwidth Flash',
    maturity: '2026 首版开放规格 · 工程导入期',
    accent: '#ffc45e',
    headline: '把 NAND 做成封装内高带宽容量层，瞄准权重与 KV 的冷/温数据',
    summary: 'HBF 试图在 HBM 与 SSD 之间建立新层级：使用堆叠 NAND、宽 package-local 接口和面向只读/低写入 AI 数据的控制方式，以 TB 级容量和接近 HBM 的顺序读取带宽降低每 bit 成本。',
    keyMetrics: [
      { label: '首版容量目标', value: '最高 512 GB / package' },
      { label: '带宽目标', value: '最高约 3 TB/s' },
      { label: '堆叠', value: '8-Hi / 16-Hi NAND' },
      { label: '定位', value: 'HBM 与 NVMe SSD 之间' },
    ],
    howItWorks: ['用 3D NAND 获得远高于 DRAM 的密度。', '通过宽并行接口和封装内连接减少传统 SSD 协议开销。', '围绕模型权重等读多写少数据简化 FTL 与耐久需求。'],
    aiRole: ['存放不常更新的模型权重。', '作为超大 KV Cache 的温数据层。', '配合 HBM 做容量扩展，减少频繁经过 PCIe/NVMe。'],
    tradeoffs: ['NAND 写入延迟和耐久性远逊于 DRAM。', '控制器、刷新、地址转换与软件分层仍未成熟。', '公开规格刚起步，2026–2027 以样片与生态验证为主。'],
    officialSources: [
      { title: 'SK hynix and Sandisk Begin Global Standardization of HBF', publisher: 'SK hynix Newsroom', url: 'https://news.skhynix.com/en/sk-hynix-and-sandisk-begin-global-standardization-ofnext-generation-memory-hbf/', date: '2026-02-26', note: 'HBF 定位、标准化与 AI 推理目标。' },
      { title: 'Memory-Centric AI: High Bandwidth Flash', publisher: 'Sandisk', url: 'https://www.sandisk.com/en-ca/company/newsroom/blogs/2025/memory-centric-ai', date: '2025-08', note: 'HBF 的厂商技术背景与路线。' },
    ],
    thirdPartySources: [
      { title: 'New HBF spec: up to 512GB and 3 TB/s', publisher: 'Tom’s Hardware', url: 'https://www.tomshardware.com/pc-components/ssds/sandisk-and-sk-hynix-unveil-hbf-spec-up-to-16-hi-nand-stacks-3-tb-s-bandwidth-ucie', date: '2026-08-04', note: '首版规格与 UCIe 路线新闻解读。' },
      { title: 'Full-Stack Characterization of HBF for KV-Centric LLM Serving', publisher: 'arXiv preprint', url: 'https://arxiv.org/abs/2608.11668', date: '2026-08', note: '分析 HBF 在 KV-centric serving 中的潜力与限制。' },
    ],
    lastVerified: verified,
  },
];

export const chipById = (id: string) => chips.find((chip) => chip.id === id);
export const memoryTopicById = (id: string) => memoryTopics.find((topic) => topic.id === id);

export const allSources = chips.flatMap((chip) => [
  ...chip.officialSources.map((source) => ({ ...source, kind: '官方' as const, related: `${chip.vendor} ${chip.name}` })),
  ...chip.thirdPartySources.map((source) => ({ ...source, kind: '第三方' as const, related: `${chip.vendor} ${chip.name}` })),
]);
