# 77 · UI 升级：参照 codex-resets.com 执行层打磨（2026-10-24）

## 背景与第一性原理结论

用户要求严格参照 `https://codex-resets.com/zh-CN` 对桃阅读做一轮 UI 升级。

**关键发现：两者本就是同一设计语言家族。** codex-resets.com 与桃阅读 v8 共用同一套
暖纸 neobrutalism 基因——色板完全同源（`#fff4dd` 暖纸 / `#26201a` 墨 / `#ff5c2b` 橘红 /
`#ffd84d` 阳光黄 / rose / sky / mint）、同样的 2px 墨线 + 实心偏移阴影、同样的圆胖字体
（Baloo 2 + GenSen Rounded，tailwind.config.js 注释里也写明「参照 codex-resets.com」）。

因此本轮**不推翻设计语言，而是补齐参考站在执行层的成熟度差距**。对参考站 CSS
（57KB，逐段解析）与桃阅读现状（运行中截图 + 代码审读 + 视觉模型分析）的双向取证后，
差距集中在「页面是死的」这一点上：

| 维度 | 参考站做法 | 桃阅读差距（升级前） |
|---|---|---|
| 悬浮反馈 | hover 抬起 -1px,-1px + 阴影加深；active 按压到底；全程 `@media (hover:hover)` 守卫 | 只有 active 按压；hover 一律变天蓝；触屏粘滞 hover |
| 语义色 | `--on-accent/--on-sun/...` 前景配对 + `--accent-hover/--sun-hover` 悬浮深化 | 前景色硬编码；hover 无色相逻辑 |
| 入场动效 | pop-in（scale .85→1 弹簧）/ rise-in（translateY 12px 淡入）+ 逐项 stagger，spring 缓动 `cubic-bezier(.34,1.56,.64,1)` | 页面元素全部静态出现 |
| 弹层 | dialog 升起 + backdrop 淡入 | 瞬间出现 |
| 数字 | tabular-nums + 变化动效 | 静态 |
| 品牌区 | masthead 有 mono 副标、logo hover 弹性摆动 | 孩子端无副标、logo 静态 |
| 焦点环 | 全站统一 | v8.css 深处残留一处蓝色 `#2366ac` |

## 落地内容

### 新增 `apps/web/src/upgrade.css`（唯一新增样式文件，导入顺序最后）

1. **令牌扩展**：`--on-*` 语义前景色、`--*-hover` 悬浮深化色（含暗色值）、
   `--spring` / `--ease-out-soft` 缓动令牌。
2. **hover 拾升体系**：贴纸按钮/筛选 chips/章节行/书卡/指标贴纸/阅读器控制钮等
   全量补 hover 拾升，全部包在 `@media (hover:hover)` 内；primary→亮黄、hot→深橘红，
   取代「一律变天蓝」。
3. **弹簧入场**：hero/诗词卡/快捷方式/推荐位分级 rise-in；指标贴纸与选人卡 pop-in
   （逐张 stagger）；书格/章节目录前几项升起、之后不排队（长列表不等）。
4. **微交互**：toast 滑入、dialog 升起 + backdrop 淡入、品牌 logo hover 弹性摆动、
   进度条宽度软出过渡、心形按钮 hover 放大旋转。
5. **阅读器荧光带**：章节标题阳光黄半衬底（纯背景零布局位移，夜间自动换暗金）。
6. **排印**：标题 `text-wrap:balance`、统计数字 `tabular-nums`。
7. **焦点环统一**为赤陶橙（清除残留蓝色）。
8. **老设备手感**：`button{touch-action:manipulation; -webkit-tap-highlight-color:transparent}`
   消除 300ms 点按高亮灰块（APK/PWA 受益）。

### 组件层小改（三处，零逻辑改动）

- `TaButton` 挂 `ta-btn` 类、`TaSticker` 挂 `ta-sticker` 类（CSS 钩子：拾升/弹跳/交替微旋转）。
- `V8App` 品牌区补 mono 副标「一起读书 · 慢慢长大」（家长端本就有，孩子端补齐）。

### 关键工程约束（为什么这样做）

- **入场动画只用独立 `scale`/`translate` 属性 + opacity，绝不用 `transform`**：
  metric/finish-card/pick-card/sheet-card 的装饰旋转（rotate ±0.7deg）由 v8.css 的
  transform 提供；keyframe 动 transform + fill-mode both 会永久覆盖装饰旋转。
  独立属性在 Safari 14.5+ 生效，iOS 13–14.4 自动降级为纯淡入，零破坏。
- **不用 oklch / @starting-style / :has() / color-mix**：构建目标 iOS 13/Safari 13。
- **动效豁免链路沿用现有机制**：`html[data-calm]`（calmMode）与
  `prefers-reduced-motion` 由 v8.css 既有的 `*` 兜底规则统一禁用，本层不重复实现。
- **theme.css 暗色块刻意不重构**：50 行散装 @media 覆盖虽丑但功能正常且被
  e2e theme.spec 断言依赖；重构风险大于收益，记录在案留待后续。

## 验证

- `npm run build`（tsc + vite）✓；`npm test` 141/141 ✓
- e2e（隔离端口 8790/5176，demo 模式）：theme.spec 3 项 + secondary-ui 2 项 + visual 2 项
  共 7 项全绿（visual 首跑一次超时为用例已知偶发「慢上报」，复跑即过，非本轮改动所致）。
- 程序化探针：CTA hover 实测 `matrix(1,0,0,1,-1,-1)` + 背景 `#ffe070`（拾升+色相深化生效）；
  320/390/768/1280 无横向溢出；暗色 `.app` 背景 `rgb(32,31,35)`；暗色阅读器 CTA hover `#ffe477`。
- 视觉模型走查（升级前后对比截图）：无重叠/截断/断板，副标与荧光带观感确认良好。
- 取证截图存 `docs/screenshots/ui-upgrade/`（gitignored）：`ref-*`（参考站）、
  `tao-*`（升级前）、`tao2-*`（升级后，含暗色）。
- 审计工具留档：`apps/web/scripts/screenshot-ui-audit.mjs`
  （`TAO_UI_AUDIT_PORT` 覆盖端口，截参考站+本地对比图）。

## 坑（本轮新增）

1. **CSS 注释里写 `on-*/hover` 会提前终止注释**：`*/` 序列把 `:root` 令牌块整个吞掉，
   症状是 var() 全部解析为空、hover 背景变透明。用「注释平衡扫描」二分定位。
2. **Git Bash 的 `/tmp` 与 Node 的 `/tmp` 不是同一个目录**（Windows 路径解析差异），
   Node 侧 `file:/tmp/x.db` 会在别处新建空库，导致「迁移已完成但查不到数据」的假象。
3. 本机 5173 长期被 DolphinScheduler dev server 占用、8787 常被残留 tsx 实例占用；
   本地起服务一律用 5174/8788 并用 `TAO_API_PORT` 指对代理。
4. 本地 `prisma/dev.db` 与 schema 有漂移（缺 `parentPinHash` 列，`migrate deploy` 报
   「无待应用」但实际缺列——历史上大概被 db push 过）；排查 UI 时请用**副本库** +
   `prisma db push` 同步，勿动原库。
5. TaskStop 杀 shell 不杀 tsx/vite 的 node 子进程，端口和文件句柄会残留；
   需按端口/PID 二次 taskkill。
