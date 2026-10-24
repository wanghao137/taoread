import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.taostudio.taoread',
  appName: '桃阅读',
  webDir: 'dist',
  // docs/84：远程壳——web 是唯一事实源，APK 内置快照只是首启兜底。
  // 此前无 server.url：APK 用户永远看到打包日的旧页面（夜间修复等全部不可见）。
  server: { androidScheme: 'https', url: 'https://read.taostudioai.com' },
}

export default config
