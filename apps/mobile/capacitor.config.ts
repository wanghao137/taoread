import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.taostudio.taoread',
  appName: '桃阅读',
  webDir: 'dist',
  // docs/103 路线 B（M2a）：本地壳——内置 dist 成为主内容，冷启不再等公网。
  // docs/84 的「旧页面」顾虑由 dl 渠道版本检查（src/lib/appUpdate.ts）+ 既有 APK
  // 自更新闭环兜底：VITE_TAO_NATIVE=1 构建启动即查 /app/version.json，新版走弹窗。
  // VITE_API_BASE（.env.mobile）把 API/媒体绝对化到生产域，CORS 白名单已含 https://localhost。
  server: { androidScheme: 'https' },
}

export default config
