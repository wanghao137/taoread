# 遗留 UI 巡检脚本（已归档）

这三个脚本（adversarial-sweep / audit-shots / verify-demo-media）写于 v7 UI 时代，
依赖已删除的页面与交互：OnboardingTour 三步引导、ReadyScreen 门屏、ChildTabBar
底部导航（「书架」tab）、掷骰子选书流、《四季诗选》等旧书目，以及已被废除的
家长码登录占位符（ABCD2345）。2026-09-25 单一家庭码改版（3f43e4a）后必然中途失败。

现役的等价覆盖：
- 端到端回归：`npm run e2e`（e2e/audit.spec.ts + demo-*.spec.ts，CI 强制）
- 截图终扫：`npm run e2e:visual`（e2e/visual.spec.ts → docs/screenshots/final）
- 触达审计：`npm run audit:touch`

如需重建人工巡检脚本，请以现役 v8 选择器（aria-label 打开《书名》、mobile-nav、
data-testid="footprint-bar"）为准，勿直接复活本目录文件。
