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
    vendor: 'Groq',
    region: '美国',
    platform: 'GroqChip LPU',
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
    focus: '高能效 LLM 推理',
    memoryPath: '256 MB SRAM + 48 GB HBM3 · 1.5 TB/s',
    status: '已发布 · 待扩展完整档案',
    officialUrl: 'https://furiosa.ai/rngd',
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
    status: '已发布 · 待扩展完整档案',
    officialUrl: 'https://rebellions.ai/',
  },
  {
    vendor: 'SambaNova',
    region: '美国',
    platform: 'SN50 RDU',
    focus: '可重构数据流推理',
    memoryPath: '432 MB SRAM + 64 GB HBM2E + 512 GB DDR5',
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
