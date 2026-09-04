# FAMA 开发交接

更新时间：2026-09-04

## 当前状态

- 仓库：`sime-chill/fama`
- 统一开发路径：`/home/wsl_hyh/web/fama`
- Windows 访问路径：`\\wsl.localhost\Ubuntu-20.04\home\wsl_hyh\web\fama`
- 当前分支：`main`
- Logo 与文档发布提交：`ff230c3`
- 该提交的 GitHub Pages 构建和部署均成功。
- 正式数据：26 个芯片、4 个 Memory 专题、12 个 vendor-radar 条目；22 个监控源、0 个待审候选。

## 本阶段已完成并发布的工作

- 品牌名称统一为 FAMA，线上路径使用 `/fama/`。
- 最终 App Logo 改为抽象的三层堆叠存储/芯片结构：保留多芯片、memory bank、stacked memory、TSV 和互联含义。
- `public/` 中 1024、512、192、180 和 64 像素资源已统一替换；图片为 RGB 且无透明通道。
- Service Worker 缓存版本从 `fama-v5` 升至 `fama-v6`。
- 旧 Logo 方案画廊已删除；最终设计稿和尺寸审查图归档在 `design/logo/`。
- 无引用的 shadcn UI 示例脚手架已从本阶段清理，保留实际页面组件和 shadcn 基础配置。
- 项目地图、维护、运维和本交接文档已补齐。

发布后源码统一迁移到 WSL 原生文件系统；E 盘不再保存第二份可编辑工作树。开始工作仍应先看 `git status`，不要覆盖用户未提交改动。

## 已验证

- `bun run data:validate`：通过。
- `bun run lint`：通过；删除未引用 UI 脚手架后无原有 lint 噪声。
- `bun run build`：通过。
- `go test ./...`（`tools/siteflow`）：通过。
- `go run . doctor`：通过，能识别两个仓库和本机工具。
- `go run . all`：通过；生成 36 条 FAMA 路由，校验 26 个芯片页、4 个 Memory 页及双站内部链接。
- 个人主页 `./scripts/build.sh /tmp/fama-personal-handoff-build-final`：通过。
- GitHub Pages：FAMA 与个人主页最近一次远端 workflow 均成功。

## 下一步

1. 在 iPhone/Safari 检查添加到主屏幕、favicon、PWA 缓存刷新和 `/chipatlas/` 兼容跳转。
2. 后续内容维护按 `docs/MAINTENANCE.md` 进行。
3. 再次发布时先运行 `go run . publish` dry run；只有用户明确确认后才执行 `--apply`。

## 待拍板，不要自动删除

- 个人主页仓库中 `_site/` 虽被 `.gitignore` 忽略，但历史上已有 69 个文件被跟踪；删除会形成较大提交。
- 个人主页的 `etached/` 是旧站快照，共 32 个跟踪文件，当前被 Jekyll 排除。
- 个人主页根部 `index.md` 看似旧内容，实际被 siteflow 当作原始正文基线；不得删除。
