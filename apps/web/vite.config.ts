import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // iPad 旧版 Safari 白屏整改：显式目标 + legacy 双包（旧浏览器走 SystemJS+polyfill）
  build: {
    target: 'es2018',
    manifest: true,
  },
  plugins: [
    react(),
    legacy({
      targets: ['iOS >= 13', 'Safari >= 13', 'Chrome >= 87', 'Android >= 8'],
      // Keep the same Safari floor; the default modern target also covers Chrome 64.
      // Usage-based polyfills should match our supported browsers, not that older floor.
      modernTargets: ['iOS >= 13', 'Safari >= 13', 'Chrome >= 87', 'Firefox >= 78', 'Edge >= 88'],
      // docs/102（2026-11-01）：移除 modernPolyfills 全量注入。es2018 target + 上列 modernTargets
      // 下 core-js 全量属过度供给：此前每个现代浏览器首访白拉 100KB raw/40KB gz；
      // 真旧浏览器仍由 legacy 双包（nomodule + SystemJS）兜底。

    }),
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
})
