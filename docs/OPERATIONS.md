# FAMA 开发与发布

## WSL 本机环境（2026-09-04 已核验）

- 工作区：`/home/wsl_hyh/web`
- Bun：`/home/wsl_hyh/.local/bin/bun`，1.3.14
- Node：`/home/wsl_hyh/.local/bin/node`，v26.4.0
- Go：`/home/wsl_hyh/.local/bin/go`，go1.27.1
- Ruby/Jekyll：由现有 RVM 环境提供
- WSL：`Ubuntu-20.04`

`~/.local/bin` 已在登录 shell 的 `PATH` 中。普通开发机只需满足 `package.json` 的 Node 版本约束并安装 Bun；机器绝对路径只写入已忽略的 `siteflow.json`。

## 常用命令

```bash
cd /home/wsl_hyh/web/fama
bun install --frozen-lockfile
bun run data:validate
bun run lint
bun run build
bun run dev
```

研究扫描：

```bash
bun run research:baseline  # 新监控源第一次加入时
bun run research:scan      # 之后扫描增量
```

GitHub Pages 使用 `bun run build:pages` 生成 `pages-dist/`。2026-09-04 的最终核验中，该命令由 `siteflow all` 成功执行并渲染 36 条路由；如果以后停在 `127.0.0.1:8799` 健康检查，先检查代理环境变量、`bun run build` 与远端 Pages workflow，不要直接把超时归因于页面源码。

## 双站工具 siteflow

```bash
cd /home/wsl_hyh/web/fama/tools/siteflow
go test ./...
go run . doctor
go run . all
go run . serve
go run . publish            # dry run
go run . publish --apply    # 真实提交并推送；必须先取得用户明确确认
```

`siteflow.json` 已被 Git 忽略，保存本机路径。Siteflow 在 Linux/WSL 中直接使用 Bash；Windows 模式仍保留 `wsl.exe` 兼容逻辑。`all` 会构建两站、合并预览并扫描内部链接；`serve` 在 `http://127.0.0.1:4173` 提供预览。

迁移前的 Windows 核验中，`all` 成功生成 36 条 FAMA 路由，并验证 26 个芯片页、4 个 Memory 页及双站内部链接。

### Ubuntu 20.04 限制

当前 Cloudflare `workerd` Linux 预编译包要求 glibc 2.35；Ubuntu 20.04 提供 2.31。因此新 WSL 工作区中的 `bun run build:pages` 和 `go run . all` 会在启动 Wrangler 时失败。以下命令已在新位置通过：

- `bun run data:validate`
- `bun run lint`
- `bun run build`
- `go test ./...`
- `go run . doctor`
- 个人主页 `./scripts/build.sh`

GitHub Actions 的 Pages 构建和部署仍然通过。不要在 Ubuntu 20.04 中单独替换系统 glibc；若需要完整本地静态导出，应在备份后升级/新建 Ubuntu 22.04+ distro，并重新运行 `siteflow all`。

真实发布顺序是：验证两站 → 提交并推送 FAMA `main` → 等待 FAMA 公网可达 → 提交个人主页 worktree → 推送备份分支和发布分支 → 将该发布分支推到主页 `master`。因此 `--apply` 不是普通测试命令。

## 自动化

- `.github/workflows/pages.yml`：校验数据、构建 `pages-dist/`、部署 GitHub Pages。
- `.github/workflows/source-watch.yml`：每天 01:23 UTC（北京时间 09:23）扫描官方入口，只提交候选队列和扫描状态变化。
