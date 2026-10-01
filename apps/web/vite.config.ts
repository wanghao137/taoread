import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // iPad 旧版 Safari 白屏整改：显式目标 + legacy 双包（旧浏览器走 SystemJS+polyfill）
  build: {
    target: 'es2018',
    rollupOptions: {
      output: {
        // docs/35 C2：framer-motion 独立 chunk——动画库与业务主包并行加载，
        // 主包（index-*.js，gzip ~103KB）减负，且该 chunk 长缓存（库不随业务改动）
        manualChunks: {
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
  plugins: [
    react(),
    legacy({
      targets: ['iOS >= 13', 'Safari >= 13', 'Chrome >= 87', 'Android >= 8'],
      modernPolyfills: true,
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
