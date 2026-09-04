# FAMA 内容维护手册

FAMA 采用“官方源监控 → 候选队列 → 人工核验 → 构建发布”。自动任务只发现线索，不能直接修改正式芯片参数。

## 数据在哪里

- `lib/catalog.ts`：既有芯片、Memory 专题、字段类型与聚合入口。
- `data/latest-chips.ts`：2026 年 9 月起新增或重点更新的芯片条目。
- `data/vendor-radar.ts`：尚未全部展开成详情页的国际厂商与技术路线。
- `data/watch-sources.json`：定期访问的官方公司、会议和研究入口。
- `data/inbox/candidates.json`：自动发现、等待人工审核的链接。
- `data/source-state.json`：上次看到的链接指纹，用于识别增量。

Git 仓库是长期事实源；公开网页只是构建后的只读副本。

## 日常维护顺序

1. 运行 `bun run research:scan`，或等待 GitHub Actions 每天 09:23（北京时间）扫描。
2. 查看 `data/inbox/candidates.json` 中状态为 `pending` 的候选。
3. 打开原文，核对芯片边界、数值精度、稠密/稀疏、芯片/板卡/机架口径和发布时间。
4. 至少找到一个一手来源：厂商产品页、规格书、官方工程博客、正式会议或论文。
5. 将可信内容写入正式目录；第三方文章只能用于解释和质疑。
6. 把候选标记为 `accepted` 或 `rejected`，并填写 `reviewNote`。
7. 运行 `bun run data:validate`、`bun run lint` 和 `bun run build`。
8. 检查详情页、来源链接和 iPhone 布局；公开发布前取得用户确认。

第一次启用新来源时先执行 `bun run research:baseline`，只建立链接基线；以后再用 `research:scan` 记录增量。

## 编辑硬规则

- 未披露就是“未披露”，不拿估算填空。
- 同一数值必须说明芯片、板卡、节点还是机架边界。
- 目标值、样片值和量产值必须区分。
- 只有真正重新核验时才更新 `lastVerified`。
- 重大参数变化时保留旧代条目，不覆盖历史事实。
- 自动任务只能提交候选与扫描状态，不能直接编辑正式芯片详情。

推荐给新 Agent 的任务说明：

```text
读取 data/inbox/candidates.json 中所有 pending 项；逐项打开官方原文，
核验 Memory 容量、带宽、互联、制程和算力口径。官方来源不足的
不要进入正式库。更新芯片条目、标记审核结论，运行数据检查、lint
和 build；发布公开站点前先让我确认。
```
