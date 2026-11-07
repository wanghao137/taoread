import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // docs/105 方案C-lite：cdn 模式（build:webcdn）资产URL前缀指向 dl/R2 通道，
  // index.html 仍由源站 no-cache 下发（CSP 引导哈希在源站计算）。dev/移动构建不受影响。
  const assetBase = mode === 'cdn' ? (env.VITE_ASSET_BASE ?? '/') : '/'
  return {
    base: assetBase,
    build: {
      target: 'es2018',
      manifest: true,
    },
    plugins: [
      react(),
      // docs/108 M-3：mobile（APK）构建不产 legacy 双包——Capacitor WebView ≥ Chrome 87
      //（legacy targets 本就含 Android >= 8），legacy 23 文件 ~1.7MB 在 APK 里是死重；
      // web/PWA（cdn/默认）保持双包兜底不变。
      ...(mode === 'mobile' ? [] : [legacy({
        targets: ['iOS >= 13', 'Safari >= 13', 'Chrome >= 87', 'Android >= 8'],
        // Keep the same Safari floor; the default modern target also covers Chrome 64.
        // Usage-based polyfills should match our supported browsers, not that older floor.
        modernTargets: ['iOS >= 13', 'Safari >= 13', 'Chrome >= 87', 'Firefox >= 78', 'Edge >= 88'],
        // docs/102（2026-11-01）：移除 modernPolyfills 全量注入。es2018 target + 上列 modernTargets
        // 下 core-js 全量属过度供给：此前每个现代浏览器首访白拉 100KB raw/40KB gz；
        // 真旧浏览器仍由 legacy 双包（nomodule + SystemJS）兜底。
      })]),
      // PWA 预缓存已移除（2026-09-24 白屏事故根因）：旧壳引用被部署删除的产物 → 白屏。
      // 现由 public/sw.js 透传 SW 负责清理历史 Cache Storage；产品明确不支持离线（F39）。
    ],
    server: {
      port: 5173,
      proxy: {
        // TAO_API_PORT 可覆盖（审计 T01/T02：隔离实例浏览器验收用；默认 8787）
        '/api': `http://localhost:${process.env.TAO_API_PORT ?? 8787}`,
      },
    },
  }
})
