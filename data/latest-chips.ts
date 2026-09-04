import type { ChipRecord } from '@/lib/catalog';

const verified = '2026-09-04';

/**
 * 2026-09 新增与重点更新条目。
 *
 * 正式条目的最低门槛：至少一个厂商、项目或正式会议的一手来源。
 * 对尚未公开的参数一律写“未披露”，不使用供应链传闻补空白。
 */
export const latestChips: ChipRecord[] = [
  {
    id: 'google-tpu8i',
    vendor: 'Google',
    name: 'TPU 8i',
    generation: '第八代 TPU · Inference',
    category: 'ASIC',
    year: '2026',
    status: '预览 / 导入',
    confidence: '高',
    accent: '#6ca4ff',
    process: 'Google 自研 TPU ASIC',
    memory: '288 GB HBM + 384 MB VMEM',
    bandwidth: '8.6 TB/s HBM',
    compute: '10.1 PFLOPS FP4',
    power: '未披露',
    interconnect: 'Boardfly · 最高 1,152 芯片域',
    software: 'XLA · JAX · PyTorch · Pathways',
    workload: '推理 / Reasoning / MoE Serving',
    oneLiner:
      '用更大的 HBM 与片上 VMEM，加上 Boardfly 拓扑，专门优化大模型推理的访存与扩展效率。',
    overview: [
      'TPU 8i 是 Google 第八代 TPU 中面向推理与 reasoning 的版本。相比训练型 8t，它用 288 GB HBM 与 384 MB 片上 VMEM换取更大的模型和 KV Cache 驻留空间。',
      'Boardfly 互联和 Collective Acceleration Engine 面向 collective 通信优化；LLM Decoder Engine 则把 decode 阶段常见的数据流直接纳入硬件设计。',
    ],
    memoryType: 'HBM + VMEM SRAM + 集合通信加速',
    memoryLayers: [
      {
        name: 'Vector / Matrix Local Storage',
        role: '计算单元局部复用',
        detail: '由 XLA 与内核调度管理中间数据，降低重复访问主存。',
      },
      {
        name: 'VMEM',
        role: '片上工作集',
        detail: '384 MB SRAM，为推理中的热权重、激活和查表数据提供高复用层。',
      },
      {
        name: 'HBM',
        role: '模型与 KV Cache 主存',
        detail: '288 GB、8,601 GB/s，容量和带宽均针对长上下文 serving。',
      },
      {
        name: 'Boardfly Fabric',
        role: '跨芯片扩展域',
        detail:
          '面向大规模 collective 与 MoE token 交换，系统上限可达 1,152 颗芯片。',
      },
    ],
    memoryBottleneck:
      '推理瓶颈从单芯片 HBM 带宽延伸到大规模 collective、KV Cache 容量与多租户调度。',
    memoryVerdict:
      '8i 的核心不是追求最高训练 FLOPS，而是通过更大 HBM、VMEM 和专用 decode/collective 机制提高实际 token 吞吐。',
    architecture: [
      '推理导向的第八代 TPU',
      'LLM Decoder Engine',
      'Collective Acceleration Engine',
      'Boardfly 互联拓扑',
    ],
    watchItems: [
      'Google Cloud 正式可用区与实例形态',
      'TPU 8i 的功耗与价格',
      '1,152 芯片域的有效利用率',
    ],
    officialSources: [
      {
        title: 'TPU 8t and TPU 8i Technical Deep Dive',
        publisher: 'Google Cloud',
        url: 'https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive',
        date: '2026-08',
        note: 'TPU 8i 的 HBM、VMEM、FP4、Boardfly 与专用引擎官方规格。',
      },
      {
        title: 'Hot Chips 2026 Program',
        publisher: 'Hot Chips',
        url: 'https://hc2026.hotchips.org/',
        date: '2026-08',
        note: 'Google 第八代 TPU 正式会议议程入口。',
      },
    ],
    thirdPartySources: [
      {
        title: 'Google TPUv8s for Training and Inference at Hot Chips 2026',
        publisher: 'ServeTheHome',
        url: 'https://www.servethehome.com/googles-tpuv8s-for-training-and-inference-at-hot-chips-2026/',
        date: '2026-08',
        note: '结合 Hot Chips 讲义解读 8t/8i 系统差异。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'google-tpu8t',
    vendor: 'Google',
    name: 'TPU 8t',
    generation: '第八代 TPU · Training',
    category: 'ASIC',
    year: '2026',
    status: '预览 / 导入',
    confidence: '高',
    accent: '#8ab4f8',
    process: 'Google 自研 TPU ASIC',
    memory: '216 GB HBM + 128 MB VMEM',
    bandwidth: '6.53 TB/s HBM',
    compute: '12.6 PFLOPS FP4',
    power: '未披露',
    interconnect: '3D Torus · 9,600-chip Superpod',
    software: 'XLA · JAX · PyTorch · Pathways',
    workload: '预训练 / 后训练 / 超大规模 MoE',
    oneLiner:
      '以 9,600 芯片 Superpod 和 3D Torus 扩展域服务下一代基础模型训练。',
    overview: [
      'TPU 8t 是第八代 TPU 的训练版本，重点是把单芯片 12.6 PFLOPS FP4、216 GB HBM 与大规模 3D Torus 网络组织为一个可编程训练系统。',
      'Google 同时保留 128 MB VMEM 与 SparseCore，并通过 TPUDirect RDMA/Storage 缩短主机、存储与加速器之间的数据路径。',
    ],
    memoryType: 'HBM + VMEM SRAM + 3D Torus 分布式内存域',
    memoryLayers: [
      {
        name: 'VMEM',
        role: '片上数据复用',
        detail: '128 MB SRAM，承接矩阵计算附近的热工作集。',
      },
      {
        name: 'HBM',
        role: '训练权重、优化器与激活',
        detail: '216 GB、6,528 GB/s，为单芯片训练算子提供主带宽。',
      },
      {
        name: 'TPUDirect',
        role: '主机与存储直达',
        detail: 'RDMA 与 Storage 路径降低检查点、数据加载及跨节点搬运开销。',
      },
      {
        name: 'Superpod',
        role: '跨芯片模型状态',
        detail:
          '3D Torus 最多连接 9,600 颗芯片，承接张量、流水与数据并行通信。',
      },
    ],
    memoryBottleneck:
      '超大规模训练时，HBM 容量之外的关键约束是 all-reduce、检查点和稀疏专家通信。',
    memoryVerdict:
      '8t 把存储系统边界扩大到 Superpod：性能取决于 HBM、TPUDirect 和拓扑感知编译的共同作用。',
    architecture: [
      '训练导向的第八代 TPU',
      '3D Torus',
      'SparseCore',
      'TPUDirect RDMA / Storage',
    ],
    watchItems: [
      'Superpod 实际训练效率',
      'BF16/FP8 完整规格',
      '与 TPU 7x 的成本性能对比',
    ],
    officialSources: [
      {
        title: 'TPU 8t and TPU 8i Technical Deep Dive',
        publisher: 'Google Cloud',
        url: 'https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive',
        date: '2026-08',
        note: '第八代 TPU 的官方架构与规格基线。',
      },
    ],
    thirdPartySources: [
      {
        title: 'Google TPUv8s for Training and Inference at Hot Chips 2026',
        publisher: 'ServeTheHome',
        url: 'https://www.servethehome.com/googles-tpuv8s-for-training-and-inference-at-hot-chips-2026/',
        date: '2026-08',
        note: 'Hot Chips 会议材料的逐页观察。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'amd-mi455x',
    vendor: 'AMD',
    name: 'Instinct MI455X',
    generation: 'MI400 · CDNA 5',
    category: 'GPU',
    year: '2026',
    status: 'H2 2026 量产',
    confidence: '高',
    accent: '#ff665b',
    process: 'CDNA 5 · 3D Hybrid Bonding · CoWoS-L',
    memory: '432 GB HBM4 · 12 stacks',
    bandwidth: '23.3 TB/s',
    compute: '40 PFLOPS FP4 · 20 PFLOPS FP8',
    power: '机架级液冷',
    interconnect: 'Infinity Fabric · 3.6 TB/s scale-up',
    software: 'ROCm · AMD AI Suite',
    workload: 'LLM 训练 / 推理 / Helios 机架',
    oneLiner:
      '12 栈 HBM4 与 3D 混合键合计算裸片把 MI400 推向 72-GPU Helios 机架级系统。',
    overview: [
      'MI455X 是 AMD MI400 系列的通用 AI 旗舰，采用 CDNA 5 与 3D hybrid bonding。单颗拥有 432 GB HBM4 和 23.3 TB/s 带宽，显著提高大模型状态的本地驻留比例。',
      'AMD 将它放进 72-GPU Helios 机架中，scale-up 互联与 HBM4 共同形成系统内存域；因此应同时观察单卡规格、整柜拓扑和 ROCm 软件成熟度。',
    ],
    memoryType: '12-stack HBM4 + 3D bonded compute + Infinity Fabric',
    memoryLayers: [
      {
        name: 'LDS / Cache',
        role: 'CU 局部复用',
        detail: '服务矩阵指令、wavefront 与高复用 tile。',
      },
      {
        name: 'HBM4',
        role: '模型与训练状态主存',
        detail: '432 GB、23.3 TB/s，以 12 栈封装提高容量和带宽密度。',
      },
      {
        name: 'Infinity Fabric',
        role: '多 GPU scale-up',
        detail: '单 GPU 3.6 TB/s，连接 Helios 内的 72 颗加速器。',
      },
      {
        name: 'Host / Fabric',
        role: '数据与容量扩展',
        detail: '与 EPYC、以太网和存储共同组成机架级训练/推理路径。',
      },
    ],
    memoryBottleneck:
      '12 栈 HBM4 缓解容量与带宽，但 72-GPU 系统的 collective、功耗和软件调度成为主要约束。',
    memoryVerdict:
      'MI455X 的竞争力必须按 Helios 系统评估：HBM4 数字很强，实际收益取决于 scale-up 网络和 ROCm 全栈。',
    architecture: [
      'CDNA 5',
      '256 Workgroup Processors',
      '3D hybrid bonded compute dies',
      'Helios 72-GPU rack',
    ],
    watchItems: [
      'H2 2026 实际出货',
      'Helios 整柜功耗与网络配置',
      'ROCm 在大规模 MoE 上的稳定性',
    ],
    officialSources: [
      {
        title: 'AMD Instinct MI400 Series Accelerators',
        publisher: 'AMD',
        url: 'https://www.amd.com/en/products/accelerators/instinct/mi400.html',
        date: '2026',
        note: 'MI455X 的 HBM4、带宽、算力、封装与上市窗口官方规格。',
      },
      {
        title: 'AMD CDNA Architecture',
        publisher: 'AMD',
        url: 'https://www.amd.com/en/technologies/cdna.html',
        note: 'CDNA 5 与 MI400 系列架构入口。',
      },
    ],
    thirdPartySources: [
      {
        title: 'AMD MI400 GPU at Hot Chips 2026',
        publisher: 'ServeTheHome',
        url: 'https://www.servethehome.com/amd-mi400-gpu-at-hot-chips-2026/',
        date: '2026-08',
        note: '从会议材料解读 MI400 封装与系统。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'amd-mi430x',
    vendor: 'AMD',
    name: 'Instinct MI430X',
    generation: 'MI400 · Sovereign AI / HPC',
    category: 'GPU',
    year: '2027',
    status: '已发布 · 预计 2027',
    confidence: '高',
    accent: '#ff8b72',
    process: 'CDNA 5 · 3D Hybrid Bonding',
    memory: '432 GB HBM4',
    bandwidth: '官方页面当前列 2.3 TB/s，待最终规格复核',
    compute: '288 TFLOPS hardware FP64',
    power: '未披露',
    interconnect: 'Infinity Fabric',
    software: 'ROCm · HPC software ecosystem',
    workload: '主权 AI / HPC / 科学计算',
    oneLiner:
      '在 MI400 封装基础上强化硬件 FP64，面向国家级 AI 与科学计算基础设施。',
    overview: [
      'MI430X 与 MI455X 同属 MI400/CDNA 5，但更强调 FP64 科学计算和 sovereign AI。它保留 432 GB HBM4，使超大网格、科学模型和 AI 工作负载能够共享同一加速平台。',
      'AMD 产品页当前显示的带宽字段与 12 栈 HBM4 的常见预期存在明显差异，因此图谱按官方页面原文记录并明确标记“待最终 SKU 文档复核”。',
    ],
    memoryType: 'HBM4 + HPC 导向缓存层级',
    memoryLayers: [
      {
        name: 'LDS / Cache',
        role: '计算局部性',
        detail: '面向 AI tensor 与 FP64 科学算子的局部复用。',
      },
      {
        name: 'HBM4',
        role: 'AI/HPC 统一主存',
        detail: '432 GB，为高精度状态、网格和模型权重提供大容量封装内存。',
      },
      {
        name: 'Infinity Fabric',
        role: '节点内扩展',
        detail: '连接多加速器与主机；最终系统规模仍待平台发布。',
      },
    ],
    memoryBottleneck:
      '高精度 HPC 通常对持续带宽和 collective 更敏感，最终 HBM 速率与系统拓扑尚需 AMD 完整规格书确认。',
    memoryVerdict:
      '这是一个应保留版本化证据的条目：架构方向已明确，带宽和平台参数仍可能在 2027 出货前更新。',
    architecture: [
      'CDNA 5',
      'Hardware FP64',
      'AI 与 HPC 融合',
      'Sovereign AI 定位',
    ],
    watchItems: [
      '最终产品规格书',
      'HBM4 带宽字段修订',
      '首发主权 AI / 超算系统',
    ],
    officialSources: [
      {
        title: 'AMD Instinct MI400 Series Accelerators',
        publisher: 'AMD',
        url: 'https://www.amd.com/en/products/accelerators/instinct/mi400.html',
        date: '2026',
        note: 'MI430X 的定位、HBM4 容量与 FP64 官方信息；带宽字段需持续复核。',
      },
    ],
    thirdPartySources: [
      {
        title: 'AMD MI400 GPU at Hot Chips 2026',
        publisher: 'ServeTheHome',
        url: 'https://www.servethehome.com/amd-mi400-gpu-at-hot-chips-2026/',
        date: '2026-08',
        note: 'MI400 家族与封装路线的会议解读。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'xiaomi-xring-o100',
    vendor: 'Xiaomi',
    name: '玄戒 O100',
    generation: 'XRING · AI Accelerator',
    category: '近存计算',
    year: '2026',
    status: '已发布 · 计划 2027 商用',
    confidence: '中',
    accent: '#ff7d3b',
    process: '6 nm · 晶圆级垂直堆叠',
    memory: '3.5 GB AI 专用内存',
    bandwidth: '1.22 TB/s',
    compute: '14-core NPU · 未披露 TOPS',
    power: '原型机约 10 W 散热配置',
    interconnect: '与 XRING SoC 协同',
    software: 'MiMo · Xiaomi HyperOS',
    workload: '端侧 LLM / 手机 / 机器人 / 汽车',
    oneLiner:
      '把 AI 专用内存垂直堆叠在计算层附近，以 1.22 TB/s 带宽突破端侧 DRAM 墙。',
    overview: [
      '玄戒 O100 是小米面向端侧大模型的独立 AI 加速器，公开重点不是峰值 TOPS，而是 6 nm 晶圆级垂直堆叠与 1.22 TB/s 内存带宽。',
      '现阶段展示以技术验证机和 AI Cube 为主，计算精度、峰值算力、内存协议和量产封装仍未给出完整官方规格，因此置信度标记为“中”。',
    ],
    memoryType: '晶圆级 3D 堆叠 AI 专用内存',
    memoryLayers: [
      {
        name: 'NPU Local Storage',
        role: '算子局部复用',
        detail: '14 核 NPU 的局部存储细节尚未公开。',
      },
      {
        name: '3D AI Memory',
        role: '权重与激活主带宽',
        detail: '公开容量 3.5 GB、带宽 1.22 TB/s，以超密键合连接计算层。',
      },
      {
        name: 'XRING SoC Memory',
        role: '系统共享数据',
        detail: '加速器与主 SoC 协同，完整一致性和编程模型待披露。',
      },
    ],
    memoryBottleneck:
      '3.5 GB 容量仍限制可驻留模型规模；系统性能还取决于主 SoC 与 O100 之间的数据路径。',
    memoryVerdict:
      'O100 是值得重点追踪的 memory-first 端侧架构，但现阶段应把发布会数字与最终量产 SKU 严格区分。',
    architecture: [
      '14-core NPU',
      '6 nm wafer-level 3D stacking',
      '1.4 μm hybrid-bond pitch',
      '端侧协同加速器',
    ],
    watchItems: [
      '正式产品页与白皮书',
      '量产终端与商用时间',
      '计算精度、TOPS 与编程接口',
    ],
    officialSources: [
      {
        title: '玄戒三芯发布（官方账号入口）',
        publisher: '雷军官方微博',
        url: 'https://weibo.com/leijun',
        date: '2026-08-24',
        note: '小米发布会一手账号；完整独立规格页尚未公开，条目持续跟踪。',
      },
    ],
    thirdPartySources: [
      {
        title: '小米玄戒三芯齐发',
        publisher: '新华网',
        url: 'https://www.xinhuanet.com/finance/20260825/fd5eb2e3b382445497caf5375921a739/c.html',
        date: '2026-08-25',
        note: '发布会技术参数与应用方向的权威报道。',
      },
      {
        title: '小米 AI Cube 展示 O100 / D100',
        publisher: 'IT之家',
        url: 'https://www.ithome.com/0/993/546.htm',
        date: '2026-08',
        note: '原型机形态与现场演示补充。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'xiaomi-xring-d100',
    vendor: 'Xiaomi',
    name: '玄戒 D100',
    generation: 'XRING · Intelligent Driving',
    category: 'ASIC',
    year: '2026',
    status: '预发布 · 计划 2027 上车',
    confidence: '中',
    accent: '#ffa057',
    process: '3 nm',
    memory: '最高 160 GB 统一内存',
    bandwidth: '未披露',
    compute: '20-core CPU + 16-core NPU',
    power: '未披露',
    interconnect: '车载域控 / 与 O100、O3 协同',
    software: 'Xiaomi HAD · MiMo',
    workload: '智能驾驶 / 车端大模型',
    oneLiner:
      '以大容量统一内存承载 200B+ 车端模型，把智驾计算从固定算子推向大模型域控。',
    overview: [
      '玄戒 D100 是小米面向智能驾驶的 3 nm 芯片，公开配置为 20 核 CPU、16 核 NPU，最高支持 160 GB 统一内存和 200B+ 参数本地模型。',
      'D100 目前仍属于预发布阶段，带宽、算力、功耗、安全等级与量产车型未完整披露；图谱不会用媒体估算补齐这些字段。',
    ],
    memoryType: 'CPU/NPU 统一大容量内存',
    memoryLayers: [
      {
        name: 'CPU / NPU Local Memory',
        role: '实时任务与张量复用',
        detail: '缓存容量和一致性结构尚未公开。',
      },
      {
        name: 'Unified Memory',
        role: '感知、规划与模型共享',
        detail: '最高 160 GB，减少 CPU 与 NPU 之间复制并承载超大车端模型。',
      },
      {
        name: 'Vehicle I/O',
        role: '传感器持续数据流',
        detail: '相机、激光雷达与控制器接口规格待量产平台披露。',
      },
    ],
    memoryBottleneck:
      '车端模型不仅受容量限制，还需要可预测带宽、功能安全隔离和长时间热设计。',
    memoryVerdict:
      '160 GB 统一内存是 D100 最有辨识度的公开设计点；在带宽和功耗披露前，不宜据此推导实际 token 性能。',
    architecture: [
      '20-core CPU',
      '16-core NPU',
      '3 nm process',
      '大容量统一内存',
    ],
    watchItems: ['首发车型', '统一内存类型与带宽', 'TOPS、功耗与功能安全等级'],
    officialSources: [
      {
        title: '玄戒三芯发布（官方账号入口）',
        publisher: '雷军官方微博',
        url: 'https://weibo.com/leijun',
        date: '2026-08-24',
        note: '小米发布会一手账号；D100 仍待正式产品文档。',
      },
    ],
    thirdPartySources: [
      {
        title: '小米玄戒三芯齐发',
        publisher: '新华网',
        url: 'https://www.xinhuanet.com/finance/20260825/fd5eb2e3b382445497caf5375921a739/c.html',
        date: '2026-08-25',
        note: 'D100 的工艺、CPU/NPU、统一内存与模型规模报道。',
      },
      {
        title: '玄戒 D100 预发布信息',
        publisher: 'IT之家',
        url: 'https://www.ithome.com/0/993/535.htm',
        date: '2026-08',
        note: '发布会规格与商用窗口整理。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'li-auto-mahe-m100',
    vendor: 'Li Auto',
    name: '马赫 M100',
    generation: 'MAHE · Automotive AI',
    category: 'ASIC',
    year: '2026',
    status: '量产上车',
    confidence: '高',
    accent: '#55d5a9',
    process: '5 nm',
    memory: '8-channel LPDDR5X',
    bandwidth: '273 GB/s',
    compute: '1,280 TOPS',
    power: '未披露',
    interconnect: '双芯片车载域控',
    software: '自研数据流编译器 · 理想汽车软件栈',
    workload: '端到端智驾 / VLA / 车端推理',
    oneLiner:
      '以编译器管理的动态数据流替代传统缓存依赖，让有限 LPDDR 带宽服务高算力车端模型。',
    overview: [
      '马赫 M100 是理想汽车自研的 5 nm 智驾芯片，采用 orchestrated dynamic dataflow。它用编译器管理数据流和显式片上复用，目标是在车载功耗约束下减少缓存未命中与无效搬移。',
      '单芯片公开峰值为 1,280 TOPS，外部内存为 8 通道 LPDDR5X、273 GB/s。与 HBM 服务器芯片相比，它更强调每瓦算力、确定性和车规集成。',
    ],
    memoryType: 'LPDDR5X + compiler-managed dataflow',
    memoryLayers: [
      {
        name: 'Compute-unit Local Memory',
        role: '显式数据驻留',
        detail: '计算单元的数据由编译器编排，避免依赖大容量硬件缓存猜测。',
      },
      {
        name: 'On-chip Data Streams',
        role: '跨单元传输',
        detail: '动态数据流让激活和中间结果沿计算图直接流动。',
      },
      {
        name: 'LPDDR5X',
        role: '模型与传感器主存',
        detail: '8 通道、273 GB/s，围绕车载容量、能效与成本平衡。',
      },
    ],
    memoryBottleneck:
      '273 GB/s 远低于数据中心 HBM，因此编译质量、稀疏性与片上复用率直接决定算力利用率。',
    memoryVerdict:
      'M100 是软硬协同的典型案例：核心价值不是单看 TOPS，而是用数据流编排在 LPDDR 预算下维持有效吞吐。',
    architecture: [
      'Orchestrated Dynamic Dataflow',
      '56 compute units',
      '24 × Cortex-A78AE',
      'Compiler-managed streams',
    ],
    watchItems: [
      '量产车型实测功耗',
      '编译器与模型支持范围',
      '双芯系统的数据一致性和冗余设计',
    ],
    officialSources: [
      {
        title: 'MAHE: An Orchestrated Dataflow Processor',
        publisher: 'ISCA 2026 / arXiv',
        url: 'https://arxiv.org/abs/2604.17862',
        date: '2026-04',
        note: '马赫架构、数据流执行与内存系统的一手学术论文。',
      },
      {
        title: 'Li Auto Form 6-K: Proprietary MAHE M100',
        publisher: 'Li Auto Investor Relations',
        url: 'https://ir.lixiang.com/static-files/234a9c3d-0567-4972-89b5-6e73f098abf8',
        date: '2026',
        note: '公司公告中的 M100 产品与量产信息。',
      },
    ],
    thirdPartySources: [
      {
        title: '理想马赫 M100 芯片技术解读',
        publisher: 'IT之家',
        url: 'https://www.ithome.com/0/949/393.htm',
        date: '2026-06',
        note: '工艺、算力、CPU 与 LPDDR5X 带宽整理。',
      },
      {
        title: 'M100 and the Dataflow Architecture',
        publisher: 'Silicon & Systems',
        url: 'https://siliconandsystems.com/en/articles/m100-dataflow/',
        date: '2026',
        note: '从数据流与缓存替代角度分析 M100。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'd-matrix-raptor-3dimc',
    vendor: 'd-Matrix',
    name: 'Raptor 3DIMC',
    generation: '第二代 Digital In-Memory Compute',
    category: '近存计算',
    year: '2026',
    status: 'Pavehawk 验证 · Raptor 开发中',
    confidence: '中',
    accent: '#f0bc62',
    process: '4 nm compute die · 3D bonded custom DRAM',
    memory: '目标 32 GB / card',
    bandwidth: '目标 100 TB/s / card',
    compute: '未披露',
    power: '未披露',
    interconnect: 'Chiplet / PCIe card',
    software: 'd-Matrix Aviator',
    workload: '低时延生成式 AI 推理',
    oneLiner:
      '把定制 DRAM 直接堆在数字近存计算裸片上，目标是绕开 HBM PHY 的带宽与能耗边界。',
    overview: [
      'd-Matrix 先用 Pavehawk 测试芯片验证 3D DRAM 接口，再计划把技术用于第二代 Raptor。官方披露最差约 0.4 pJ/bit，并以相对 HBM4 约 10 倍的带宽与能效提升作为设计目标。',
      '媒体从 Hot Chips 资料报道 32 GB、100 TB/s/card 等目标值；由于 Raptor 尚无最终数据表，这些数字在图谱中明确标为“目标/会议报道”，不能等同量产规格。',
    ],
    memoryType: '3D bonded custom DRAM + digital in-memory compute',
    memoryLayers: [
      {
        name: 'DIMC Fabric',
        role: '存内矩阵计算',
        detail: '数字计算靠近存储阵列，减少权重反复进出传统加速器数据通路。',
      },
      {
        name: '3D Custom DRAM',
        role: '垂直高带宽权重层',
        detail: '通过超细间距键合连接计算裸片，接口能效验证值约 0.4 pJ/bit。',
      },
      {
        name: 'Card / Host Memory',
        role: '容量与请求调度',
        detail: '外部卡级容量与系统接口仍待 Raptor 正式产品资料确认。',
      },
    ],
    memoryBottleneck:
      '工程难点转向 3D 热耦合、良率、定制 DRAM 供应和编译器对权重布局的管理。',
    memoryVerdict:
      '这是本图谱最典型的“存储即架构”路线之一，但当前应该把 Pavehawk 实测与 Raptor 目标严格分层记录。',
    architecture: [
      'Digital in-memory compute',
      '3D custom DRAM',
      'Hybrid bonding',
      'Pavehawk validation vehicle',
    ],
    watchItems: [
      'Raptor 正式规格与量产时间',
      '32 GB / 100 TB/s 目标验证',
      '散热、良率和模型映射限制',
    ],
    officialSources: [
      {
        title: 'Going Vertical: Why We Created a 3D DRAM Solution',
        publisher: 'd-Matrix',
        url: 'https://www.d-matrix.ai/going-vertical-why-we-created-a-3d-dram-solution-to-advance-low-latency-ai-inference/',
        date: '2026',
        note: 'Pavehawk 测试、接口能效和 Raptor 路线官方说明。',
      },
      {
        title: 'd-Matrix and Alchip Announce 3D DRAM Collaboration',
        publisher: 'd-Matrix',
        url: 'https://www.d-matrix.ai/announcements/d-matrix-and-alchip-announce-collaboration-on-worlds-first-3d-dram-solution-to-supercharge-ai-inference/',
        date: '2026',
        note: '定制 DRAM 与 3D 集成合作公告。',
      },
    ],
    thirdPartySources: [
      {
        title: 'd-Matrix stacks AI accelerator on custom DRAM',
        publisher: 'Tom’s Hardware',
        url: 'https://www.tomshardware.com/tech-industry/semiconductors/d-matrix-stacks-its-ai-accelerator-directly-on-custom-dram-for-100-tbs-per-card',
        date: '2026-08',
        note: 'Hot Chips 资料中的卡级容量、带宽与键合参数；按目标值使用。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'sambanova-sn50',
    vendor: 'SambaNova',
    name: 'SN50 RDU',
    generation: '第五代 Reconfigurable Dataflow Unit',
    category: 'ASIC',
    year: '2026',
    status: '已发布',
    confidence: '高',
    accent: '#ff57a8',
    process: 'TSMC 5 nm',
    memory: '432 MB SRAM + 64 GB HBM2E + 512 GB DDR5',
    bandwidth: '分层带宽 · 官方未给总值',
    compute: '1.6 PFLOPS BF16 · 3.2 PFLOPS FP8',
    power: '未披露',
    interconnect: '最高 256 RDU scale-out',
    software: 'SambaNova DataScale · SambaFlow',
    workload: 'Memory-bound LLM inference',
    oneLiner:
      '以 SRAM、HBM2E、DDR5 三层显式数据流存储，换取大模型推理的容量和带宽平衡。',
    overview: [
      'SN50 是 SambaNova 第五代 RDU。它不是传统缓存型 GPU，而是由编译器把算子和数据映射到可重构数据流结构，并在 432 MB SRAM、64 GB HBM2E 与最高 512 GB DDR5 之间显式组织工作集。',
      '这种分层容量特别适合 memory-bound inference：热数据留在 SRAM/HBM，更大的模型和 KV 状态进入 DDR5，但软件映射质量会直接影响有效带宽。',
    ],
    memoryType: 'SRAM + HBM2E + DDR5 显式分层数据流',
    memoryLayers: [
      {
        name: 'Distributed SRAM',
        role: '流水线局部状态',
        detail: '432 MB 片上 SRAM，围绕数据流单元分布，承接高复用张量。',
      },
      {
        name: 'HBM2E',
        role: '高带宽模型工作集',
        detail: '64 GB，服务不能完全驻留片上的权重与激活。',
      },
      {
        name: 'DDR5',
        role: '大容量模型与 KV 层',
        detail: '最高 512 GB，以较低成本扩大单 RDU 可承载模型规模。',
      },
      {
        name: 'Scale-out Fabric',
        role: '跨 RDU 模型扩展',
        detail: '系统最多扩展到 256 颗 RDU。',
      },
    ],
    memoryBottleneck:
      'DDR5 容量很大但带宽低于 HBM；性能依赖编译器能否把热工作集稳定放进 SRAM/HBM。',
    memoryVerdict:
      'SN50 代表“分层内存 + 编译器调度”路线，值得与统一 HBM GPU 和近存计算进行横向比较。',
    architecture: [
      'Reconfigurable dataflow',
      'Distributed SRAM',
      'Three-tier memory',
      'Up to 256 RDU scaling',
    ],
    watchItems: [
      '各层实测带宽',
      '主流开源模型支持度',
      '256-RDU 规模下的延迟与利用率',
    ],
    officialSources: [
      {
        title: 'SambaNova RDU AI Chips',
        publisher: 'SambaNova Systems',
        url: 'https://sambanova.ai/products/rdu-ai-chips',
        date: '2026',
        note: 'SN50 工艺、算力和 SRAM/HBM/DDR 分层官方规格。',
      },
      {
        title: 'Hot Chips 2026 Program',
        publisher: 'Hot Chips',
        url: 'https://hc2026.hotchips.org/',
        date: '2026-08',
        note: 'SN50 RDU 正式会议议程。',
      },
    ],
    thirdPartySources: [
      {
        title: 'SambaNova details SN50 RDU at Hot Chips 2026',
        publisher: 'La Vie Zine',
        url: 'https://news.lavx.hu/article/sambanova-details-sn50-rdu-architecture-and-scaling-at-hot-chips-2026',
        date: '2026-08',
        note: '会议架构、扩展与分层内存解读。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'aws-trainium3',
    vendor: 'AWS',
    name: 'Trainium3',
    generation: 'NeuronCore-v4',
    category: 'ASIC',
    year: '2026',
    status: '已发布',
    confidence: '高',
    accent: '#ffae58',
    process: '3 nm · 8 NeuronCore-v4',
    memory: '144 GB HBM3E',
    bandwidth: '4.9 TB/s',
    compute: '2.52 PFLOPS FP8',
    power: '未披露',
    interconnect: 'NeuronLink · 144-chip UltraServer',
    software: 'AWS Neuron SDK · PyTorch / JAX',
    workload: 'LLM 训练 / 推理',
    oneLiner:
      '以更大 HBM3E 和 144 芯片 UltraServer 扩大 AWS 自研训练与推理域。',
    overview: [
      'Trainium3 采用 3 nm 工艺和 8 个 NeuronCore-v4，单芯片配备 144 GB HBM3E、4.9 TB/s 带宽与 2.52 PFLOPS FP8。',
      'Trn3 UltraServer 可组织最多 144 颗芯片，软件侧由 Neuron SDK 处理图编译、分布式训练和推理部署。',
    ],
    memoryType: 'HBM3E + NeuronLink scale-up',
    memoryLayers: [
      {
        name: 'NeuronCore Local Memory',
        role: '算子局部复用',
        detail: '服务张量、向量、标量与 collective 引擎。',
      },
      { name: 'HBM3E', role: '模型与训练状态', detail: '144 GB、4.9 TB/s。' },
      {
        name: 'NeuronLink',
        role: 'UltraServer 内扩展',
        detail: '最多 144 颗 Trainium3 组成高带宽训练/推理域。',
      },
    ],
    memoryBottleneck:
      '大规模 UltraServer 的有效性能受图切分、collective 与 Neuron 编译覆盖度影响。',
    memoryVerdict:
      'Trainium3 用云内垂直整合把 HBM、互联、实例和编译器绑定成一个可持续迭代的平台。',
    architecture: [
      '8 × NeuronCore-v4',
      '3 nm',
      'NeuronLink',
      '144-chip UltraServer',
    ],
    watchItems: [
      '实例区域与供给',
      '训练/推理每美元表现',
      'Neuron 对前沿模型算子的覆盖',
    ],
    officialSources: [
      {
        title: 'AWS Trainium3 Architecture',
        publisher: 'AWS Neuron Documentation',
        url: 'https://awsdocs-neuron.readthedocs-hosted.com/en/v2.29.1/about-neuron/arch/neuron-hardware/trainium3.html',
        date: '2026',
        note: 'NeuronCore、HBM、带宽与数值格式官方文档。',
      },
      {
        title: 'AWS Trainium',
        publisher: 'Amazon Web Services',
        url: 'https://aws.amazon.com/ai/machine-learning/trainium/',
        note: 'Trainium3 产品和 UltraServer 入口。',
      },
    ],
    thirdPartySources: [],
    lastVerified: verified,
  },
  {
    id: 'intel-crescent-island',
    vendor: 'Intel',
    name: 'Crescent Island',
    generation: 'Xe3P Data Center GPU',
    category: 'GPU',
    year: '2026',
    status: 'H2 2026 客户送样',
    confidence: '中',
    accent: '#5aa7ff',
    process: 'Xe3P architecture',
    memory: '160 GB LPDDR5X',
    bandwidth: '未正式披露 · 容量/能效优先',
    compute: '未披露',
    power: '未披露',
    interconnect: 'PCIe · Ethernet scale-out',
    software: 'oneAPI · Open software stack',
    workload: 'Agentic AI 推理',
    oneLiner:
      '用 160 GB LPDDR5X 把容量与每瓦成本放在首位，瞄准 agentic inference。',
    overview: [
      'Crescent Island 是 Intel 面向 agentic AI 推理的 Xe3P 数据中心 GPU，官方确认单卡 160 GB LPDDR5X，并计划在 2026 年下半年向客户送样。',
      'LPDDR 路线牺牲部分带宽密度，换取更低功耗与更大容量。峰值算力、带宽和量产 SKU 尚未公开，因此条目保持中等置信度。',
    ],
    memoryType: '大容量 LPDDR5X',
    memoryLayers: [
      {
        name: 'Xe Cache Hierarchy',
        role: '片上复用',
        detail: 'Xe3P 的详细缓存容量尚待正式架构文档。',
      },
      {
        name: 'LPDDR5X',
        role: '模型与 KV Cache',
        detail: '官方基础配置 160 GB，强调容量、成本与能效。',
      },
      {
        name: 'Host / Ethernet',
        role: '服务扩展',
        detail: '以开放软件和以太网进入现有数据中心。',
      },
    ],
    memoryBottleneck:
      'LPDDR 的持续带宽低于 HBM，需要更高缓存命中、量化和请求批处理来保持计算单元利用率。',
    memoryVerdict:
      'Crescent Island 是“容量优先推理 GPU”的重要样本，最终价值要看带宽、功耗和售价的组合。',
    architecture: [
      'Xe3P',
      'LPDDR5X capacity-first design',
      'Agentic inference',
      'Open software stack',
    ],
    watchItems: [
      '最终带宽与算力',
      '160 GB 以上 ODM 配置是否量产',
      '2026 H2 客户样片反馈',
    ],
    officialSources: [
      {
        title: 'Intel Expands AI Accelerator Portfolio with New GPU',
        publisher: 'Intel Newsroom',
        url: 'https://newsroom.intel.com/artificial-intelligence/intel-to-expand-ai-accelerator-portfolio-with-new-gpu',
        date: '2025-10',
        note: 'Crescent Island 名称、Xe3P、160 GB LPDDR5X 与送样时间。',
      },
      {
        title: 'Crescent Island GPU for Agentic AI Inference',
        publisher: 'Intel',
        url: 'https://www.intel.com/content/www/us/en/content-details/926893/crescent-island-gpu-designed-for-agentic-ai-inference.html',
        date: '2026',
        note: 'Hot Chips 2026 官方视频与架构入口。',
      },
    ],
    thirdPartySources: [
      {
        title: 'Intel Crescent Island LPDDR5X AI GPU at Hot Chips 2026',
        publisher: 'ServeTheHome',
        url: 'https://www.servethehome.com/intel-crescent-island-160gb-to-480gb-lpddr5x-ai-gpu-at-hot-chips-2026/',
        date: '2026-08',
        note: '会议信息与 ODM 容量路线解读；非官方配置另行标注。',
      },
    ],
    lastVerified: verified,
  },
  {
    id: 'qualcomm-dragonfly-ai200',
    vendor: 'Qualcomm',
    name: 'Dragonfly AI200',
    generation: 'Data Center AI',
    category: 'ASIC',
    year: '2026',
    status: '商用导入',
    confidence: '高',
    accent: '#69d4dc',
    process: 'Qualcomm Hexagon NPU architecture',
    memory: '768 GB LPDDR5X / card',
    bandwidth: '0.414 PB/s / rack aggregate',
    compute: '未披露',
    power: '140 kW / rack',
    interconnect: 'PCIe 6 scale-up · Ethernet/RoCE scale-out',
    software: 'Qualcomm AI Inference Suite',
    workload: '高容量 LLM 推理',
    oneLiner:
      '用每卡 768 GB LPDDR5X 和 56 卡整柜容量挑战 HBM-only 推理系统的成本结构。',
    overview: [
      'Dragonfly AI200 把 Qualcomm 的 NPU 能效路线带入数据中心。单卡 768 GB LPDDR5X，56 卡机架合计约 43 TB 内存，适合容量密集型 LLM serving。',
      '它使用 PCIe 6 做 scale-up、Ethernet/RoCE 做 scale-out。官方给出整柜聚合带宽，但尚未披露单芯峰值算力和单卡带宽，分析时不能直接与 HBM GPU 的单卡 TB/s 对比。',
    ],
    memoryType: '超大容量 LPDDR5X + rack-scale fabric',
    memoryLayers: [
      {
        name: 'NPU Local Memory',
        role: '张量局部复用',
        detail: '继承 Hexagon 数据路径，具体容量待数据表。',
      },
      {
        name: 'LPDDR5X',
        role: '模型和 KV 主存',
        detail: '每卡 768 GB，容量显著高于主流 HBM 加速卡。',
      },
      {
        name: 'Rack Memory Domain',
        role: '整柜模型分片',
        detail: '56 卡约 43 TB，官方聚合带宽 0.414 PB/s。',
      },
    ],
    memoryBottleneck:
      'LPDDR 高容量路线要求软件充分利用批处理、量化和分片，否则低于 HBM 的单卡带宽会限制 token 速率。',
    memoryVerdict:
      'AI200 是“容量/能效优先”数据中心推理的关键对照组，尤其适合评估单位模型容量成本。',
    architecture: [
      'Qualcomm Hexagon NPU',
      '768 GB LPDDR5X per card',
      'PCIe 6 scale-up',
      '56-card rack',
    ],
    watchItems: [
      '单卡带宽与峰值算力',
      '支持的模型精度与实测 token/s',
      'AI250 near-memory 路线',
    ],
    officialSources: [
      {
        title: 'Qualcomm Dragonfly AI200',
        publisher: 'Qualcomm',
        url: 'https://www.qualcomm.com/data-center/products/qualcomm-dragonfly-ai200',
        date: '2026',
        note: 'AI200 容量、机架规模、互联与软件官方产品页。',
      },
      {
        title: 'Qualcomm Unveils AI200 and AI250',
        publisher: 'Qualcomm Newsroom',
        url: 'https://www.qualcomm.com/news/releases/2025/10/qualcomm-unveils-ai200-and-ai250-redefining-rack-scale-data-cent',
        date: '2025-10',
        note: '产品路线、商用窗口与 near-memory 方向。',
      },
    ],
    thirdPartySources: [],
    lastVerified: verified,
  },
];
