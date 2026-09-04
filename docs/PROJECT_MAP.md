# FAMA 项目地图

## 路径和仓库

- Windows：`E:\codex_work\chipatlas`
- WSL：`/mnt/e/codex_work/chipatlas`
- GitHub：`sime-chill/fama`
- 默认分支：`main`
- 公开地址：`https://yhhe.top/fama/`

FAMA 与个人主页是两个独立仓库。跨站构建和发布只通过 `tools/siteflow` 协调。

## 目录结构

```text
chipatlas/
├── .github/workflows/       # Pages 部署、每日官方源扫描
├── .openai/hosting.json     # OpenAI Sites/Vite 托管配置
├── app/                     # 页面、布局、全局样式
│   ├── chips/               # 芯片详情与索引
│   ├── memory/              # Memory 专题
│   ├── sources/             # 来源说明
│   ├── updates/             # 更新记录页面
│   └── vendors/             # 厂商路线页面
├── components/              # 实际使用的 React 组件
├── data/
│   ├── inbox/               # 自动发现、待人工审核的候选
│   ├── latest-chips.ts       # 新增/重点更新芯片
│   ├── source-state.json     # 扫描增量状态
│   ├── vendor-radar.ts       # 待扩展厂商路线
│   └── watch-sources.json    # 官方监控入口
├── design/logo/             # Logo 主设计稿、尺寸审查图和说明
├── docs/                    # 项目地图、维护、运维与交接文档
├── lib/
│   ├── catalog.ts           # 类型、既有芯片、Memory 专题、聚合入口
│   └── paths.ts             # `/fama/` 等路径处理
├── public/                  # 上线 Logo、PWA manifest、SW、OG 图
├── scripts/                 # 数据校验、源扫描、Pages 构建
└── tools/siteflow/          # 双站构建、校验、预览和发布工具
```

## 生成目录

`node_modules/`、`.next/`、`.vinext/`、`.wrangler/`、`dist/`、`pages-dist/` 与工作区根部 `.siteflow-out/` 都可重新生成，不是事实源，也不应提交。机器路径只放在已忽略的 `tools/siteflow/siteflow.json`。

## 关键事实源

- 正式芯片：`lib/catalog.ts` 与 `data/latest-chips.ts`
- Memory 专题：`lib/catalog.ts`
- 监控入口：`data/watch-sources.json`
- 候选队列：`data/inbox/candidates.json`
- 上线 Logo 主文件：`public/fama-app-icon-1024.png`
- Logo 可编辑/审查归档：`design/logo/`
