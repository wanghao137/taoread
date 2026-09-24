import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // iPad 旧版 Safari 白屏整改：显式目标 + legacy 双包（旧浏览器走 SystemJS+polyfill）
  build: {
    target: 'es2018',
  },
  plugins: [
    react(),
    legacy({
      targets: ['iOS >= 13', 'Safari >= 13', 'Chrome >= 87', 'Android >= 8'],
      modernPolyfills: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: '桃阅读',
        short_name: '桃阅读',
        description: '家庭的睡前共读仪式 —— 孩子选书、家长共读、一起爱上阅读',
        lang: 'zh-CN',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        background_color: '#FAF9F5',
        theme_color: '#FAF9F5',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      // TAO_API_PORT 可覆盖（审计 T01/T02：隔离实例浏览器验收用；默认 8787）
      '/api': `http://localhost:${process.env.TAO_API_PORT ?? 8787}`,
    },
  },
})
