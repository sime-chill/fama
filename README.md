# FAMA — Flagship AI Accelerator Memory Architectures

面向全球旗舰 AI 加速器存储架构的可核验知识库。公开站点为 <https://yhhe.top/fama/>；它与个人主页使用独立 GitHub 仓库，通过 Pages 项目站挂载到同一域名的 `/fama/`。

## 新接手者入口

1. 阅读 [`docs/HANDOFF.md`](docs/HANDOFF.md)，了解当前进度、工作区和未发布改动。
2. 阅读 [`docs/PROJECT_MAP.md`](docs/PROJECT_MAP.md)，定位源码、数据、Logo 和生成目录。
3. 阅读 [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md)，再修改知识库内容。
4. 按 [`docs/OPERATIONS.md`](docs/OPERATIONS.md) 完成检查、构建或双站预览。

## 最小开发流程

```powershell
bun install --frozen-lockfile
bun run data:validate
bun run lint
bun run build
```

开发服务器使用 `bun run dev`。GitHub Pages 静态构建由 `bun run build:pages` 和 `.github/workflows/pages.yml` 完成。

## 数据硬规则

- 每个正式芯片条目至少包含一个厂商、项目或正式会议的一手来源。
- 未公开参数写“未披露”，不能用估算或传闻补空白。
- 第三方文章只能用于解释和质疑，不能代替官方来源。
- 自动检索结果只进入 `data/inbox/candidates.json`，人工复核后才能进入正式目录。

双站工具位于 [`tools/siteflow`](tools/siteflow)。`publish` 默认只是演练；`publish --apply` 会真实推送两个仓库，只能在用户明确同意发布后运行。
