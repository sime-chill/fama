# FAMA 开发与发布

## 本机环境（2026-09-04 已核验）

- Bun：`C:\Users\HeYuhan\.bun\bin\bun.exe`，1.3.14
- Node：`C:\Users\HeYuhan\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`，v24.19.0
- Go：`E:\codex_work\.tools\go\bin\go.exe`，go1.27.1
- GitHub CLI：`E:\codex_work\.tools\bin\gh.exe`，2.100.0
- WSL：`Ubuntu-20.04`

普通开发机只需满足 `package.json` 中的 Node 版本约束，并安装 Bun；绝对路径只是本机记录，不应写进受版本控制的配置。

## 常用命令

```powershell
cd E:\codex_work\chipatlas
bun install --frozen-lockfile
bun run data:validate
bun run lint
bun run build
bun run dev
```

研究扫描：

```powershell
bun run research:baseline  # 新监控源第一次加入时
bun run research:scan      # 之后扫描增量
```

GitHub Pages 使用 `bun run build:pages` 生成 `pages-dist/`。2026-09-04 的最终核验中，该命令由 `siteflow all` 成功执行并渲染 36 条路由；如果以后停在 `127.0.0.1:8799` 健康检查，先检查代理环境变量、`bun run build` 与远端 Pages workflow，不要直接把超时归因于页面源码。

## 双站工具 siteflow

```powershell
cd E:\codex_work\chipatlas\tools\siteflow
go test ./...
go run . doctor
go run . all
go run . serve
go run . publish            # dry run
go run . publish --apply    # 真实提交并推送；必须先取得用户明确确认
```

`siteflow.json` 已被 Git 忽略，保存本机路径。`all` 会构建两站、合并预览并扫描内部链接；`serve` 在 `http://127.0.0.1:4173` 提供预览。

2026-09-04 最终核验：`all` 成功生成 36 条 FAMA 路由，并验证 26 个芯片页、4 个 Memory 页及双站内部链接。

真实发布顺序是：验证两站 → 提交并推送 FAMA `main` → 等待 FAMA 公网可达 → 提交个人主页 worktree → 推送备份分支和发布分支 → 将该发布分支推到主页 `master`。因此 `--apply` 不是普通测试命令。

## 自动化

- `.github/workflows/pages.yml`：校验数据、构建 `pages-dist/`、部署 GitHub Pages。
- `.github/workflows/source-watch.yml`：每天 01:23 UTC（北京时间 09:23）扫描官方入口，只提交候选队列和扫描状态变化。
