# 桃阅读设计系统（Design System）

> 版本：v1.0 ｜ 第 5 夜落盘 ｜ 实现载体：`apps/web/tailwind.config.js` + `src/index.css`
> 原则（docs/02 §1.5）：孩子利益优先——正向文案、大触达、低刺激、可访问性是一等公民。

## 1. 品牌意象

夜空 + 月亮 + 桃子。睡前仪式的视觉语言：安静、温暖、有仪式感。孩子端永远停留在"夜空"主题（睡前场景）；家长端同底色，信息密度更高。

## 2. 色彩

### 夜空（背景系）

| Token | 值 | 用途 |
|-------|-----|------|
| `night.900` | `#0E1A38` | 页面底色（manifest background/theme_color） |
| `night.800` | `#16244C` | 卡片底 |
| `night.700` | `#223465` | 浮层/输入框底 |
| `night.border` | `#2E4278` | 描边/分隔 |

### 蜜桃（主行动系）

| Token | 值 | 用途 |
|-------|-----|------|
| `peach.400` | `#FFB3A0` | 主按钮、强调渐变起点 |
| `peach.500` | `#FF8E75` | 按压态、渐变终点 |
| `peach.300` | `#FFD3C4` | 柔和标签底 |

### 月光（点缀系）

| Token | 值 | 用途 |
|-------|-----|------|
| `moon.300` | `#FFE9B8` | 星星、成就光晕 |
| `moon.400` | `#FFD97A` | 高亮数字、夜灯 |

### 墨色（文字系，对比度实测）

| Token | 值 | 对 `night.900` 对比度 | 用途 |
|-------|-----|----------------------|------|
| `ink.primary` | `#F4F1FF` | ≈ 16.8 : 1 ✅ | 标题/正文 |
| `ink.secondary` | `#B8C1E2` | ≈ 9.2 : 1 ✅ | 次要说明 |
| `night.900`（peach 按钮上的文字） | `#0E1A38` | 对 `peach.400` ≈ 7.9 : 1 ✅ | 主按钮文字（深字浅底） |

**红线：任何文字/背景组合对比度 ≥ 4.5:1（WCAG AA）；禁用纯黑/纯白。**

## 3. 字体与字号

- 字族：`system-ui, -apple-system, PingFang SC, HarmonyOS Sans SC, Microsoft YaHei, sans-serif`（系统栈，零字体版权风险）
- 基准 **16px 起步**（审查红线）；孩子端标题 `2xl`(24px)+、行动按钮 `lg`(18px)+；数字（如阅读晚数）用 `3xl` 加 `moon.400`
- 行高：正文 `leading-relaxed`；标题 `leading-tight`

## 4. 圆角 / 间距 / 触达

- 圆角：卡片 `3xl`(24px)、按钮 `2xl`(20px)、贴纸 `full`——全产品无锐角
- 间距：4px 基数；页面安全边距 `px-5`（20px）；卡片内 `p-5`
- **触达红线：孩子端可点元素 ≥ 64px（`min-h-touch`）；家长端次要操作 ≥ 48px**；点与点间距 ≥ 12px

## 5. 动效

- 引擎：Framer Motion；全局 `<MotionConfig reducedMotion="user">`——**系统开启"减少动态效果"时自动禁用位移/缩放动画**（低端安卓降级红线）
- 仪式动效清单（后续夜次使用）：月亮升起（8s ease-in-out）、按钮按压 `whileTap scale 0.96`、夜灯点亮（光晕扩散 600ms）、出发倒计时（3-2-1 翻牌）
- 时长：微交互 150-250ms；场景动画 ≤ 800ms；**任何动画不得阻塞交互**（pointer-events 不被动画层截留）

## 6. 插画与图标

- 优先使用 emoji（跨平台零成本、孩子可读）+ 自绘 SVG（月亮/星星/云朵，`src/components/decor/`）
- PWA 图标：`apps/web/scripts/gen-icons.mjs` 程序化生成（夜空底 + 蜜桃新月 + 双星），改色板后重跑 `npm run icons`

## 7. 组件清单（`src/components/ui/`）

| 组件 | 职责 | 关键约束 |
|------|------|----------|
| `TaButton` | 唯一按钮实现 | `lg`=64px（孩子端默认）、`md`=48px（家长端次要）；loading 态禁点；`whileTap`；focus-visible 环 |
| `TaCard` | 唯一卡片容器 | `rounded-3xl` + `night.800` + 细描边 |
| `TaSheet` | 底部弹层 | `role="dialog"` + `aria-modal` + 背板点击关闭 + Esc 关闭 |
| `TaSticker` | 心情/标签贴纸 | emoji + 文案 chip，无点击语义时用 `span` |
| `Loading` | 加载态 | 月亮呼吸动画 + `aria-busy`；文案正向（"月亮正在升起…"） |
| `ErrorState` | 错误态 | 零指责文案 + 重试按钮；展示 `ApiError.message`（服务端中文） |
| `EmptyState` | 空态 | 星星插画 + 正向引导（"书架还空着，等第一本书住进来"） |

## 8. 文案规范（红线，审查逐条对照 docs/02 §3.4）

- 只说"做到了什么"（"已经连续 7 晚"），不说"还差什么"（禁"落后/差距/别输在/只剩"）
- 断签无惩罚表述："月亮休息了一晚，今晚一起点亮它"
- 不出现：课程/教学/培训/提高成绩/识字量承诺；孩子端不出现任何"完成任务"话术

## 9. 路由与角色

| 路由 | 角色 | 说明 |
|------|------|------|
| `/login` | 无 | 家庭码加入（选角色）+ 创建新家庭 |
| `/child` | child | 孩子端（仪式流，第 6 夜起） |
| `/parent` | parent | 家长端四 Tab（今晚/书架/周报/设置） |
| `/dev/kitchen-sink` | 无 | 组件演示页（视觉走查基线，验收前移除入口） |

- 会话：zustand persist → `localStorage["taoread-session"]`（token/familyId/role）；SSR 安全的 storage 包装
- 401 统一处理：清会话回 `/login`（api.ts 单点）

## 10. 走查基线

每 UI 夜产出三档截图（PC 1280 / 平板 768 / 手机 390）存 `docs/screenshots/night-NN/`（不入库）。第 5 夜基线：kitchen-sink + login。
