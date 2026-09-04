# FAMA — Flagship AI Accelerator Memory Architectures

面向全球旗舰 AI 加速器存储架构的可核验知识图谱。公开站点位于
<https://yhhe.top/fama/>；本仓库与个人主页仓库相互独立，通过 GitHub
Pages 项目站挂载到同一域名的 `/fama/` 路径。

## 数据原则

- 正式芯片条目至少包含一个厂商、项目或正式会议的一手来源。
- 未公开参数写“未披露”，不以传闻补空白。
- 第三方文章只能作为延伸阅读，不能代替官方来源。
- 自动检索只进入候选收件箱，必须人工复核后才能改入正式目录。

当前正式芯片由 `lib/catalog.ts` 和 `data/latest-chips.ts` 汇总；Memory 专题位于
`lib/catalog.ts`；待扩展厂商路线位于 `data/vendor-radar.ts`。官方监控入口维护在
`data/watch-sources.json`，自动发现结果写入
`data/inbox/candidates.json`。

## 日常维护

```bash
bun install --frozen-lockfile
bun run data:validate
bun run research:scan
bun run dev
```

处理新资料时：

1. 在候选收件箱核对发布日期、产品代际和原始页面。
2. 至少保留一个一手来源，再补充高质量第三方解读。
3. 将核验后的字段写入正式目录，并更新 `lastVerified`。
4. 运行 `bun run data:validate` 和 `bun run build:pages`。
5. 提交到 `main`；Pages 工作流会重新构建并发布。

`.github/workflows/source-watch.yml` 每天扫描官方入口，只提交待审核候选；
`.github/workflows/pages.yml` 负责静态构建和 GitHub Pages 部署。

## 双站发布工具

`tools/siteflow` 是 Go 编写的一键检查与发布程序。它会：

- 校验个人主页仍逐行保留原 Jekyll 正文，阻止模板占位符进入站点；
- 构建 Jekyll 个人主页和 FAMA 全部静态路由；
- 合并本地预览并扫描内部链接；
- 先发布并等待 FAMA 可访问，再发布个人主页入口。

```powershell
cd tools/siteflow
Copy-Item siteflow.example.json siteflow.json
go test ./...
go run . all
go run . serve
go run . publish       # 只演练
go run . publish --apply
```

机器相关路径只写在 git 忽略的 `siteflow.json` 中。发布前会保留个人主页备份分支
`backup/pre-acad-homepage-20260904`；需要回滚时，可将该分支重新发布到个人主页的
`master` 分支。
