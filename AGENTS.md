# FAMA Agent Instructions

开始工作前依次阅读 `README.md`、`docs/HANDOFF.md` 和 `docs/PROJECT_MAP.md`。

- 唯一开发路径是 `/home/wsl_hyh/web/fama`；E 盘归档不能作为第二工作树。
- Git 仓库和源码是事实源；不要编辑 `.next/`、`.vinext/`、`.wrangler/`、`dist/`、`pages-dist/` 或 `.siteflow-out/`。
- 正式芯片数据必须有至少一个一手来源。自动扫描候选未经人工核验不得进入正式目录。
- 修改后至少运行 `bun run data:validate`、`bun run lint` 和 `bun run build`。
- 个人主页是独立仓库。跨站操作使用 `tools/siteflow`，先执行 `doctor`、测试和 dry run。
- `go run . publish --apply` 会提交并推送两个仓库；没有用户明确确认不得运行。
- 不要删除或覆盖现有未提交改动。机器路径放在已忽略的 `tools/siteflow/siteflow.json`，不要提交密钥或令牌。
