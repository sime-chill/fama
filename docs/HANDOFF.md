# FAMA 开发交接

更新时间：2026-09-04

## 当前状态

- 仓库：`sime-chill/fama`
- 本机路径：`E:\codex_work\chipatlas`（WSL：`/mnt/e/codex_work/chipatlas`）
- 当前分支：`main`
- 盘点时 HEAD：`0f6c4db`
- 最近一次已核验 GitHub Pages 部署：该提交构建成功。
- 正式数据：26 个芯片、4 个 Memory 专题、12 个 vendor-radar 条目；22 个监控源、0 个待审候选。

## 本阶段已完成但尚未默认发布的工作

- 品牌名称统一为 FAMA，线上路径使用 `/fama/`。
- 最终 App Logo 改为抽象的三层堆叠存储/芯片结构：保留多芯片、memory bank、stacked memory、TSV 和互联含义。
- `public/` 中 1024、512、192、180 和 64 像素资源已统一替换；图片为 RGB 且无透明通道。
- Service Worker 缓存版本从 `fama-v5` 升至 `fama-v6`。
- 旧 Logo 方案画廊已删除；最终设计稿和尺寸审查图归档在 `design/logo/`。
- 无引用的 shadcn UI 示例脚手架已从本阶段清理，保留实际页面组件和 shadcn 基础配置。
- 项目地图、维护、运维和本交接文档已补齐。

上述内容仍以 `git status` 为准。新 Agent 不应假设工作区干净，也不要覆盖用户未提交改动。

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

1. 查看 `git status --short` 与 `git diff --stat`，确认 Logo、文档和清理范围。
2. 用 64/180/512 像素实际预览确认图标小尺寸辨识度。
3. 如用户同意发布，先运行 `go run . publish` 查看 dry run；再次确认后才运行 `go run . publish --apply`。
4. 发布后在 iPhone/Safari 检查添加到主屏幕、favicon、PWA 缓存刷新和 `/chipatlas/` 兼容跳转。

## 待拍板，不要自动删除

- 个人主页仓库中 `_site/` 虽被 `.gitignore` 忽略，但历史上已有 69 个文件被跟踪；删除会形成较大提交。
- 个人主页的 `etached/` 是旧站快照，共 32 个跟踪文件，当前被 Jekyll 排除。
- 个人主页根部 `index.md` 看似旧内容，实际被 siteflow 当作原始正文基线；不得删除。
