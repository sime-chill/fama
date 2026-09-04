# FAMA App Logo

最终方向是将字母 F 抽象成三层堆叠的 memory/chip slabs，并用少量 memory banks、三芯粒核心、TSV 竖向通路和水平互联表达“芯片、存储、堆叠与互联”。细节经过压缩，目标是在 iOS 主屏幕小尺寸下仍能辨认。

## 文件

- `fama-app-icon-v2-source.png`：1254×1254 最终主设计稿。
- `fama-app-icon-v2-size-review.png`：多尺寸审查拼图，只用于设计核对。
- `public/fama-app-icon-1024.png`：上线主文件。
- `public/fama-icon-512.png`、`public/fama-icon-192.png`、`public/apple-touch-icon.png`、`public/favicon.png`：上线派生文件。

所有上线 PNG 都应为 RGB、无透明通道。上线主文件由设计稿裁切/缩放为 1024×1024，再派生 512、192、180、64 像素版本。调整主设计后必须重新生成全部尺寸、检查 `manifest.webmanifest`，并递增 `public/sw.js` 的缓存版本以避免旧图标滞留。
