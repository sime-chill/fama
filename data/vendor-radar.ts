export type VendorRadarEntry = {
  vendor: string;
  region: string;
  platform: string;
  focus: string;
  memoryPath: string;
  status: string;
  officialUrl: string;
  chipId?: string;
};

/** 厂商雷达包含已建完整档案和等待扩展的路线，链接只使用公司一手入口。 */
export const vendorRadar: VendorRadarEntry[] = [
  {
    vendor: 'Taalas',
    region: '加拿大',
    platform: 'HC1 / Hardcore Model Silicon',
    focus: '模型固化的低时延 LLM 推理',
    memoryPath: 'Mask ROM 固定权重 + 可编程 SRAM · 容量和带宽未披露',
    status: '技术演示 / API Beta · 已有完整档案',
    officialUrl: 'https://taalas.com/products/',
    chipId: 'taalas-hc1',
  },
  {
    vendor: 'NVIDIA / Groq',
    region: '美国',
    platform: 'Groq 3 LPU / LPX',
    focus: '与 Vera Rubin 配合的低时延推理',
    memoryPath: '500 MB SRAM / LPU · 150 TB/s / LPU；128 GB SRAM + 12 TB DDR5 / rack',
    status: '2026-08-24 官方宣布量产 · 补录代际进展',
    officialUrl: 'https://www.nvidia.com/en-us/data-center/lpx/',
  },
  {
    vendor: '华为',
    region: '中国',
    platform: 'Atlas 960E / 昇腾 960 超节点',
    focus: 'UnifiedBus 统一编址与 NPO 光互联',
    memoryPath: '最多 4096 NPU / SuperPoD · 单芯片内存不从系统指标反推',
    status: '2026-09-17 发布系统；960DT 计划 Q1 2027，960PR 计划 Q3 2027',
    officialUrl: 'https://www.huawei.com/en/news/2026/9/hc-wang-keynote',
  },
  {
    vendor: 'Groq',
    region: '美国',
    platform: 'GroqChip LPU（早期代际）',
    focus: '确定性低时延 LLM 推理',
    memoryPath: '230 MB 片上 SRAM · 最高 80 TB/s',
    status: '待扩展完整档案',
    officialUrl:
      'https://groq.com/wp-content/uploads/2024/08/GroqChip%E2%84%A2-Processor-Product-Brief-v1.7.pdf',
  },
  {
    vendor: 'Tenstorrent',
    region: '加拿大 / 美国',
    platform: 'Blackhole p150',
    focus: '开放式 AI 加速卡',
    memoryPath: '180 MB SRAM + 32 GB GDDR6 · 512 GB/s',
    status: '2026 已量产 · 待扩展完整档案',
    officialUrl: 'https://docs.tenstorrent.com/aibs/blackhole/index.html',
  },
  {
    vendor: 'FuriosaAI',
    region: '韩国',
    platform: 'RNGD',
    focus: '高能效 LLM 推理 · TCP 编译期数据布局',
    memoryPath: '256 MB SRAM + 48 GB HBM3 · 1.5 TB/s',
    status: '2026-01 量产 · 2026-09 扩展亚太部署',
    officialUrl: 'https://furiosa.ai/blog/furiosaai-establishes-singapore-hub-apac-expansion',
  },
  {
    vendor: 'IBM',
    region: '美国',
    platform: 'Spyre Accelerator',
    focus: '企业 AI 与 IBM Z / Power 推理',
    memoryPath: '两级片上 SRAM + 16-channel LPDDR5',
    status: '已部署 · 待扩展完整档案',
    officialUrl:
      'https://research.ibm.com/blog/lifting-the-cover-on-the-ibm-spyre-accelerator',
  },
  {
    vendor: 'Broadcom',
    region: '美国',
    platform: '3.5D XDSiP / Custom AI XPU',
    focus: '超大规模客户定制 AI 芯片',
    memoryPath: '2 nm compute + HBM3/HBM4 + 3.5D packaging',
    status: '客户定制平台 · 持续跟踪',
    officialUrl: 'https://www.broadcom.com/info/ai/3point5d',
  },
  {
    vendor: 'Marvell',
    region: '美国',
    platform: 'Custom HBM Compute Architecture',
    focus: '云厂商定制加速器与连接芯片',
    memoryPath: 'Custom HBM subsystem · chiplet / advanced packaging',
    status: '客户定制平台 · 持续跟踪',
    officialUrl:
      'https://www.marvell.com/products/custom-asic/custom-hbm-compute-architecture.html',
  },
  {
    vendor: 'Graphcore',
    region: '英国',
    platform: 'Bow IPU / IPU-POD',
    focus: '大规模并行图计算',
    memoryPath: 'Distributed In-Processor Memory',
    status: '现有产品 · 路线持续跟踪',
    officialUrl:
      'https://docs.graphcore.ai/projects/bow-2000-datasheet/en/latest/overview.html',
  },
  {
    vendor: 'Rebellions',
    region: '韩国',
    platform: 'REBEL / REBEL-Quad',
    focus: 'Chiplet AI 推理',
    memoryPath: '512 MB SRAM + 144 GB HBM3E · 4.8 TB/s',
    status: '2026-09-15 公布日本推理基础设施合作 · 芯片参数沿用原记录',
    officialUrl: 'https://rebellions.ai/newsroom/rebellions-and-ai-partner-to-bring-energy-efficient-ai-inference-infrastructure-to-japan/',
  },
  {
    vendor: 'SambaNova',
    region: '美国',
    platform: 'SN50 RDU',
    focus: '可重构数据流推理',
    memoryPath: '432 MB SRAM + 64 GB HBM2E + 最高 2 TB DDR5（产品资料表）',
    status: '已有完整档案',
    officialUrl: 'https://sambanova.ai/products/rdu-ai-chips',
    chipId: 'sambanova-sn50',
  },
  {
    vendor: 'd-Matrix',
    region: '美国',
    platform: 'Raptor 3DIMC',
    focus: '数字近存计算推理',
    memoryPath: '3D bonded custom DRAM',
    status: '已有完整档案',
    officialUrl:
      'https://www.d-matrix.ai/going-vertical-why-we-created-a-3d-dram-solution-to-advance-low-latency-ai-inference/',
    chipId: 'd-matrix-raptor-3dimc',
  },
  {
    vendor: 'Qualcomm',
    region: '美国',
    platform: 'Dragonfly AI200 / AI250',
    focus: '高容量数据中心推理',
    memoryPath: '768 GB LPDDR5X / card · near-memory roadmap',
    status: 'AI200 已有完整档案',
    officialUrl:
      'https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai200',
    chipId: 'qualcomm-dragonfly-ai200',
  },
  {
    vendor: 'Intel',
    region: '美国',
    platform: 'Crescent Island',
    focus: 'Agentic AI 推理 GPU',
    memoryPath: '160 GB LPDDR5X',
    status: '已有完整档案',
    officialUrl:
      'https://newsroom.intel.com/artificial-intelligence/intel-to-expand-ai-accelerator-portfolio-with-new-gpu',
    chipId: 'intel-crescent-island',
  },
];
