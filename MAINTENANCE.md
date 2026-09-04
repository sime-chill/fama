# FAMA 维护手册

FAMA 采用“官方源监控 → 候选队列 → 人工核验 → 构建发布”的维护方式。自动任务只发现线索，不能直接修改正式芯片参数。

## 数据在哪里

- `lib/catalog.ts`：既有芯片、Memory 专题、字段类型与聚合入口。
- `data/latest-chips.ts`：2026 年 9 月起新增或重点更新的芯片条目。
- `data/vendor-radar.ts`：尚未全部展开成详情页的国际厂商与技术路线。
- `data/watch-sources.json`：定期访问的官方公司、会议和研究入口。
- `data/inbox/candidates.json`：自动发现、等待人工审核的链接。
- `data/source-state.json`：监控器上次看到的链接指纹，用于识别增量。

当前正式数据随源码一起保存。公开网页是构建后的只读副本，不是唯一数据库；Git 仓库应作为长期事实源。迁移到 GitHub Pages、Cloudflare 或自有域名时，数据结构不需要重做。

## 日常维护顺序

1. 运行 `npm run research:scan`，或等待 GitHub Actions 每天 09:23（北京时间）自动扫描。
2. 查看 `data/inbox/candidates.json` 中状态为 `pending` 的候选链接。
3. 打开原文，核对芯片边界、数值精度、稠密/稀疏、芯片/板卡/机架口径和发布时间。
4. 至少找到一个一手来源：厂商产品页、规格书、官方工程博客或正式会议/论文。
5. 将可信内容写入 `data/latest-chips.ts`；第三方文章只负责解释与质疑，不能替代官方参数。
6. 把候选项状态改为 `accepted` 或 `rejected`，并写清 `reviewNote`。
7. 运行 `npm run data:validate`、`npm run lint`、`npm run build`。
8. 检查芯片详情、来源链接和 iPhone 布局，再发布新版本。

> Windows 本地构建必须由 Node.js 22+ 执行 Vinext。当前 Vinext/Cloudflare 工具链不支持用 Bun 直接启动 Wrangler；如果日志没有列出 `/chips`、`/updates` 等路由，那个构建不能发布。Codex 环境应显式调用其 Node runtime，普通开发机使用 `npm run build` 和 `npm run start` 即可。

## 第一次启用自动监控

```bash
npm run data:validate
npm run research:baseline
```

`research:baseline` 只建立当前链接基线，不会把历史页面全部塞进候选队列。之后执行 `research:scan` 才会记录新增的相关链接。部分厂商站点使用 JavaScript 渲染或反爬策略，单个来源失败不会让其他来源停止。

## GitHub 定时任务

`.github/workflows/source-watch.yml` 配置为每天扫描一次官方源，也可以在 GitHub Actions 页面手动运行。它只有在项目源码迁移到 GitHub 后才会自动执行；当前 ChatGPT Sites 内部源码仓库不会运行 GitHub Actions。迁移前由 Codex 或本地的 `npm run research:scan` 执行扫描。只有发现新链接或监控基线变化时才提交 `source-state.json` 与 `candidates.json`，不会编辑芯片详情或自动部署公开站点。

如果仓库分支启用了保护规则，建议把工作流改为创建 Pull Request，或给机器人使用单独分支；不要为了自动提交关闭代码审查。

## 给 Codex 的推荐指令

```text
读取 data/inbox/candidates.json 中所有 pending 项。
逐项打开官方原文，核验 Memory 容量、带宽、互联、制程和算力口径；
官方来源不足的不要进入正式库。更新芯片条目、标记审核结论，
运行数据检查、lint 和 build，但发布公开站点前先让我确认。
```

也可以直接说“核验并添加某公司的最新 AI 芯片”。Codex 应先检索一手资料，再更新数据，而不是仅凭新闻标题填参数。

## 发布与迁移

- 当前 ChatGPT Sites 地址适合快速预览与阶段性发布。
- 长期维护建议把仓库托管到 GitHub，并绑定自有域名；这样定时检索、审核记录和版本回滚都保留在同一处。
- GitHub Pages 更适合纯静态导出；当前 vinext/Cloudflare 架构迁移到 Cloudflare Pages 或 Workers 更直接。
- 域名迁移完成后，更新 `app/layout.tsx` 的 `metadataBase`、PWA manifest 和监控器 `user-agent` 中的网址。

## 编辑硬规则

- 每个正式芯片至少一个一手来源。
- 未披露就是“未披露”，不要拿估算填空。
- 同一数值必须说明芯片、板卡、节点还是机架边界。
- 媒体报道中的目标值、样片值和量产值要分开。
- 修改 `lastVerified` 只代表该条目真的重新核验过。
- 一项重大参数发生变化时，保留旧代芯片条目，不覆盖历史事实。
