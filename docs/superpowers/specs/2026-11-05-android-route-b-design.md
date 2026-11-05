# 桃阅读真安卓路线 B 实施 spec（M2a-d）— 2026-11-05

依据：docs/103 分析 + 用户拍板（路线 B、F39 翻案、不上市场、本地提醒、keystore 维持）。
性质：实施 spec；docs/104 为轮次记录。

## 0. 全局架构决策（第一性结论）

1. **编排留在 web、播放交给原生**：audioPlayer.ts 的队列/会话/SSE 流入逻辑引擎无关；
   唯一引擎缝隙 = HTMLAudioElement。但息屏 WebView JS 挂起会杀死 JS 衔接——
   因此原生桥必须持有**整条播放队列**（native 链式），web 只订事件（onSegmentStart/onState/onError）刷 UI。
2. **本地壳 + 既有 APK 自更新闭环**解决 docs/84 的旧页面问题：冷启本地秒开，
   在线时启动检查 dl 渠道版本，有新版走已实测的自更新弹窗。反转 docs/84 的远程壳决策，
   理由=当时没有版本检查通道，现在有（v0.1.2+ 15s 超时自更新）。
3. **API 基址走既有 `VITE_API_BASE` 构建期注入**（api.ts 现成），CORS 白名单已含 https://localhost（10-18 预埋）。
4. **离线单元=书**；公共书 312 本媒体已 100% 公共 CDN（无票据），家庭书下载时用票据 URL 落盘后免票据。
   离线索引存 Filesystem JSON（不引 SQLite），断点=按章跳过已存在文件。

## 1. M2a 本地壳（1-2 天级）

- capacitor.config.ts：移除 server.url（本地 serving，androidScheme https）
- web 构建注入 VITE_API_BASE=https://read.taostudioai.com（mobile 专用构建通道）
- Capacitor 环境检测（isNativePlatform）→ 跳过 SW 注册、跳过 PWA 安装提示路径
- 启动版本检查：读 dl 渠道 /android/latest.json，与内置 versionName 比对，新版本→走既有自更新弹窗
- 验收门（模拟器+真机）：断网冷启 → 登录页可渲染可交互；联网登录→书架正常；音频（CDN 绝对 URL）可播

## 2. M2b 原生朗读（2-4 天级）

Kotlin 侧（apps/mobile/android）：
- NarrationPlugin（@CapacitorPlugin）：appendSegment(url)/play/pause/resume/stop/jumpTo(index)/
  setVolume/fadeStop(ms)/clearQueue
- NarrationService：Media3 MediaSessionService + ExoPlayer（playlist 链式）；
  setAudioAttributes(handleAudioFocus=true)；前台服务 type=mediaPlayback；
  通知（播放/暂停/上一段/下一段）；onMediaItemTransition → notifyListeners('segmentStart',{index})；
  onPlaybackStateChange → notifyListeners('state',{playing})；段错误 → notifyListeners('segmentError',{index})
- 权限：FOREGROUND_SERVICE、FOREGROUND_SERVICE_MEDIA_PLAYBACK、POST_NOTIFICATIONS、WAKE_LOCK
- gradle：androidx.media3:media3-exoplayer + media3-session

web 侧（src/lib/nativeNarration.ts）：
- Capacitor.isNativePlatform() 探测；ServerAudioPlayer 加 native 分支：
  speakChapter 的 onSegment 改为 nativeNarration.appendSegment(url)+首段 play；
  进度=订 segmentStart 事件更新 currentIndex；时间轴高亮=屏幕可见时 setInterval 200ms 轮询
  native getPosition（息屏冻结高亮无害）；stop/pause/jumpTo 映射原生命令；
  native 模式跳过 setMediaSession（原生通知栏接管）与 prime()（无自动播放策略）
- 浏览器/PWA 路径零改动（feature-detect 回退 HTMLAudioElement 引擎）

验收门（模拟器+真机）：息屏 adb 模拟 → 播放跨段不断；锁屏通知可控制；来电话让焦点（不抢）；耳机按钮=模拟器不验、真机门

## 3. M2c 离线内容（3-5 天级）

服务端（apps/server）：
- 新端点 GET /api/content/offline-manifest?contentId=（家庭会话鉴权）：
  { contentId, title, coverThumbUrl, contentVersion, chapters:[{order,title,blocks}] , segments:[{chapterOrder,index,text,audioKey→url,durationMs,chars?}] }
  段音频 URL 解析走与运行时同一 pregen 分诊（PublicTtsIndex.get），未预生成段=标记 unavailable（离线跳过）
- chars 时间轴：与在线 pregen 播放路径同源（若在线也是估算则离线同估算，保证行为一致）

客户端：
- 下载器（src/lib/offline.ts）：按书拉 manifest → Filesystem 逐文件下载（音频/图片）到
  Directory.Data/books/<contentId>/，已存在跳过（断点续传）；索引 index.json（版本/章清单/本地路径映射/时间戳）
- 阅读器离线分支：章节 blocks 的图片 URL → 本地文件 convertFileSrc；
  播放：native 队列喂本地文件 URL（_capacitor_file_ / 或 file 转换后的可播 URL）
- 配额：单书上限+全库 LRU 清理入口（家长端设置页）；下载中 UI+取消
- 验收门：飞行模式（模拟器 airplane mode）→ 已下载书可读、已下载音频可播、未下载书给明确空态

## 4. M2d 本地提醒（1-2 天级）

- @capacitor/notifications（本地通知，无 GMS 依赖）；每日阅读时间设置（既有字段）变更时重排
- EXACT_ALARM：优先 setExactAndAllowWhileIdle，无权限则回落 inexact（家庭自用 ±分钟可接受）
- 验收门：adb 强杀进程 → 次日（或拨快时钟）通知仍到；设置页改时间即时生效

## 5. 红线与约束

- 版本三件套红线（versionCode 单调+RELEASE.md 段+版本三处一致）；publish-mobile.mjs 流程沿用
- e2e（web 浏览器路径）必须全程绿——native 分支 feature-detect，不碰浏览器行为
- 生产服务端改动仅限：offline-manifest 端点 +（若需）CORS 无改动；DB 零 schema 变更
- R2 容量红线知悉：离线下载放大 CDN 流量，不做全库一键下载（按书手动）
- 真机门最终留给用户（iPad 不在本轮：iOS 零预算仅 PWA 决策不变）
