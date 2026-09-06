import { defineConfig } from 'vitest/config'

// 独立于 vite.config：单测只测纯逻辑（api/session），无需 react/PWA 插件
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
})
