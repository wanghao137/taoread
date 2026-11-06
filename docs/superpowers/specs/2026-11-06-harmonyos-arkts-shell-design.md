# 桃阅读鸿蒙（NEXT/ArkTS）壳路线 spec — 2026-11-06

依据：docs/106（用户确认鸿蒙 7 = NEXT 谱系、暂自用）。
性质：待用户批准；批准后走 plan → 实施。

## 0. 架构原则（与路线 B 同构，不新发明）

**编排留 web、播放交原生**（docs/104 已验证的架构决策原样复用）：
web dist 是唯一事实源；ArkTS 壳只做四件事：本地资源服务、后台音频、本地提醒、分发载体。

## 1. M-H1 ArkTS 本地壳（1-2 天）

- 工具链：DevEco Studio + HarmonyOS SDK（华为源下载）+ 华为账号自动签名
- 工程：Stage 模型；EntryAbility + ArkWeb Web 组件
- **本地 dist 加载的关键设计**：onInterceptRequest 把 `https://localhost/*` 映射到本地 dist 文件
  ——保持 origin=https://localhost 与生产 CORS 白名单一致（服务端零改动）。
  **M-H1 第一天先做 10 分钟 spike** 验证主框架拦截可行性；
  fallback 方案=resource:// 协议 + 服务端 CORS 增加 resource origin 白名单
- dist 打包进 resources/rawfile（构建链复用 mode mobile 的 VITE_API_BASE 机制，新增 mode harmony）
- 更新检查：复用 dl 渠道 /app/version.json 比对（等价 appUpdate.ts），新版本→提示重新侧载
- 验收门：断网冷启进登录页；联网登录→书架；在线音频可播

## 2. M-H2 后台朗读（2-4 天）

- AVPlayer + AVSession（锁屏/控制中心媒体样式）+ backgroundTaskManager 长时任务（audioPlayback 类型）
- ArkTS 桥与 NarrationPlugin 同协议：appendSegment/play/pause/jumpTo/getPosition/fadeStop
  + segmentStart/state/ended/segmentError 事件（经 ArkWeb javaScriptProxy 注入 + postMessage 回推）
- web 侧 nativeNarration.ts 增加双通道 feature-detect：window.Capacitor（APK）与
  HarmonyOS 注入代理（ArkWeb），编排层零改动
- 验收门：息屏 5 分钟跨段连播；控制中心可控制；来电自动让出焦点

## 3. M-H3 本地提醒（1 天）

- reminderAgentManager 每日定时提醒（与 M2d 同语义：id 固定、设置变更重排、杀进程仍响）
- 通知权限首启引导
- 验收门：杀进程后次日提醒照发

## 4. M-H4 分发与运维（文档项）

- 调试签名 SOP + 90 天续签流程（DevEco 自动签名，自用接受）
- hdc 无线调试安装流程（需手机配合：开发者模式+无线调试配对码）

## 5. 风险登记

| 风险 | 缓解 |
|---|---|
| ArkWeb 主框架拦截/本地映射细节（最大技术未知） | M-H1 首日 spike 前置验证；fallback 已定义 |
| DevEco 工具链下载与安装（华为源，量级 GB） | 一次性成本；国内源快 |
| NEXT 对后台行为/长时任务的平台约束 | 长时任务按官方类型申报（audioPlayback 合法） |
| 验证依赖用户手机（开发者模式+无线调试配对） | 实施时给出 5 分钟配对指引 |
| 调试证书 90 天到期 | SOP 文档化；到期=重签重装一次 |

## 6. 明确不做

- AppGallery 上架材料（自用不需要；软著/ICP 留待公开分发决策）
- 全原生 UI 重写（ArkWeb 保留 web 资产，与路线 B 同构）
- 跨设备接续/实况窗等 NEXT 红利（后续增强项）
