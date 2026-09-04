# 夜间执行日志（唯一进度事实源）

> 规则：每夜收尾必须更新本文件。夜次 = 日期 − 9/3。开工先读本文件决定做什么。
> 格式：状态 / 完成任务 / 顺延或砍掉（含原因）/ 审查结果（Gate A/B/C）/ 给下一夜的交接便签。

---

## 2026-09-04 ｜ 第 1 夜 ｜ 状态：✅ 完成（白班基建 + 夜班收尾，四项交接任务全部完成）

**夜班完成（23:00–08:00 时段）：**
- [x] 交接任务①：ESLint 9 flat config 基线（`eslint.config.js`，no-explicit-any 红线），lint 串入 `npm run verify`；首跑抓出 3 个未使用导入并修复
- [x] 交接任务②：`npm run smoke:weread` 冒烟脚本（复用 callWereadApi 唯一出网通道），真实 key 体检三项全过，报告落盘 `docs/reports/night-01-smoke.md`（gitignored）
- [x] 交接任务③：限频摸底 50 连发（maxRetries=0、间隔 200ms）完成，结论见下
- [x] 交接任务④：第 2 夜 Prisma schema 初稿就位（`apps/server/prisma/schema.prisma`，11 表全对照 docs/02 §4.4，级联删除完整）

**限频摸底结论（校准依据）：**
- 网关健康：17 个业务接口可用（另有 /_list 元接口）；书架 126 条（电子书 124 + 听书 1 + 文章收藏 1，口径=三者之和）；本月阅读 16 分钟/2 天
- 延迟：P50 326ms ｜ P95 543ms ｜ 最大 1525ms
- **无 429**，但第 49–50 连发触发 **HTTP 499 节流**（约 5 req/s 持续 48 次后）。499 属非 429 的 4xx，网关适配层正确地不重试立即失败
- 令牌桶安全参数：capacity 5、refillPerMinute 10（远低于节流阈值）；后续家庭并发场景按此收紧

**三道门：**
- Gate A：`npm run verify`（typecheck + lint + test）全绿，7 文件 50 用例（修复后复验 2 次均绿）
- Gate B：code-reviewer 对抗审查夜班增量，发现 **P1×1 + P2×4**：P1（摸底 outcome 分类语义颠倒：网络错误误标 httpError、升级信号误标 network）当夜修复；P2 修复 3 项（兜底 catch 防崩溃、schema 冗余索引、weekStart 规范化约定）、wont-fix 1 项（allowScripts：本环境 npm shim 消费该字段，删除破坏全新安装）。全部记录于 bug-register.md N1-N01~N05
- Gate C：验收清单走查——verify 全绿 ✅；冒烟报告存在且无 key 泄漏（仅 maskedKey ****MQAA）✅；摸底结论已录入日志 ✅。回归抽查：网关契约/加密往返/缓存隔离三组关键测试均在 verify 中通过 ✅

**给第 2 夜（9/5）的交接便签：**
1. Prisma 落地：安装 prisma/@prisma/client → `prisma validate` 校验初稿 → migrate（含 TAO_DATABASE_URL 进 .env/.env.example）→ 按 schema 生成 client；weekStart 规范化工具函数 + 单测（见 N1-N04 约定）
2. 家庭码/设备绑定认证（family_code + device_token 签名 JWT）+ `POST /api/family`、`POST /api/family/:id/bind-weread`（key 加密入库、回显尾 4 位）+ child_profile CRUD
3. 认证与越权是当夜审查重点（family A 不可读 family B；key 不回显全文）；覆盖率要求：crypto/认证中间件 ≥85% 分支

**遗留：** 无 P0/P1。Phase 0 家庭访谈待用户白班参与（技术三验替代中：限频摸底✅，deepLink 三链路留第 7 夜）。
