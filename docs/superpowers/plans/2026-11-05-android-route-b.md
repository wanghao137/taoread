# 路线 B 实施计划（M2a-d）— 2026-11-05

对应 spec：docs/superpowers/specs/2026-11-05-android-route-b-design.md
执行方式：inline 执行（会话内已握全部上下文），每期独立验证后才进下一期。

## Task M2a 本地壳

- [ ] A1 读 capacitor 构建流：apps/mobile/dist 如何填充（npm run mobile:sync 链）、publish-mobile.mjs 版本机制
- [ ] A2 capacitor.config.ts 移除 server.url；isNativePlatform 检测 SW/PWA 跳过点定位（main.tsx / registerSW 逻辑）
- App 入口守卫点确认（若有「需要联网」前置检查需放宽为「可离线进入」）
- [ ] A3 mobile 专用构建：VITE_API_BASE 注入（mobile:sync 链路加 env），cap sync，gradle assembleRelease
- [ ] A4 模拟器验收：断网冷启登录页可交互；联网登录→书架；音频可播
- [ ] A5 commit

## Task M2b 原生朗读

- [ ] B1 gradle 加 media3 依赖；Manifest 声明 service+权限
- [ ] B2 NarrationPlugin.kt + NarrationService.kt（队列链式+事件桥）
- [ ] B3 web：src/lib/nativeNarration.ts 桥 + audioPlayer.ts native 分支（编排复用）
- [ ] B4 模拟器验收：播放跨段连续、adb 息屏不断播、锁屏通知控制、来电让焦点
- [ ] B5 commit

## Task M2c 离线内容

- [ ] C1 服务端 offline-manifest 端点 + 单测（段解析与运行时同源 pregen 分诊）
- server vitest 全绿
- [ ] C2 客户端下载器 offline.ts（断点/索引/配额）+ 阅读器离线分支（图/音本地化）
- [ ] C3 家长端入口（下载/清理入口 UI）+ 下载 UI
- [ ] 离线播放=走 M2b native 队列喂本地文件
- [ ] C4 模拟器验收：飞行模式读+听已下载书；未下载书明确空态
- [ ] C5 commit

## Task M2d 本地提醒

- [ ] D1 装 @capacitor/notifications；提醒时间字段定位（既有每日阅读提醒设置）
- [ ] D2 调度逻辑（设置变更/启动时重排）+ Android 14 exact alarm 策略（exact 优先 inexact 回落）
- [ ] D3 模拟器验收：杀进程后通知照发
- [ ] D4 commit

## 收口

- [ ] F1 全量回归：web typecheck/vitest/e2e + server vitest + lint
- [ ] F2 APK release 构建（版本三件套）+ 发布 dl 渠道
- [ ] F3 生产部署 server 端点（若 M2c 服务端有改动：fetch/reset+npm install+migrate+restart 协议）
- [ ] F4 对抗审查 + docs/104 归档 + 记忆更新 + push
