# 夜间执行日志（唯一进度事实源）

> 规则：每夜收尾必须更新本文件。夜次 = 日期 − 9/3。开工先读本文件决定做什么。
> 格式：状态 / 完成任务 / 顺延或砍掉（含原因）/ 审查结果（Gate A/B/C）/ 给下一夜的交接便签。

---

## 2026-09-06 ｜ 第 3 夜任务 ｜ 状态：✅ 完成（**白班提前完成**，今晚 23:00 夜班请直接执行第 4 夜任务）

**⚠️ 给 2026-09-06 23:00 夜班会话的重要说明：**
第 3 夜全部任务（微信读书业务 API 四件套 + P2-007 限流）已由白班会话于今日 17:40–19:00 完成，三道审查门全部通过，登记册已更新。**按协议「该夜任务已完成则顺延执行下一夜任务」——请直接执行第 4 夜任务（共读域 API 与模板共读卡，docs/03 §3 第 4 夜），并在收尾时打 `m-a-done` tag（M-A 里程碑夜）。** 无欠账、无未决 P0/P1。

**完成任务：**
- [x] ① P2-007（清账）：IpRateLimiter——每 IP 令牌桶（capacity 5 / refill 10min⁻¹，第 1 夜摸底安全参数），挂 POST /api/family 与 /join 两个无凭据入口；RateLimitedError 统一映射 429 语义化中文
- [x] ② /api/shelf 书架聚合：口径严格按 shelf.md（总数 = books + albums + mp 非空计 1，绝不用 bookCount 内部计数）；条目原样直通（deepLink 只透传回包原值）；ShelfSnapshot 快照落库（**blocked 行永不因同步丢失**，N3-001）；?view=child 孩子视图
- [x] ③ /api/book/:id/info｜chapters（24h 缓存，第二次 0 出网）｜progress（实时不缓存）
- [x] ④ /api/book/recommend：童书类目白名单（前缀 1300000，宁缺勿滥）+ 家长单书屏蔽过滤；/api/book/:id/bestbookmarks 全书热门划线
- [x] ⑤ PUT /api/family/:familyId/shelf/:bookId/blocked 家长屏蔽 API（仅家长角色；kind 区分 book/album）
- [x] ⑥ WereadServiceRegistry：familyId→WereadService 进程内单例（**必须单例**：否则令牌桶形同虚设、缓存永不命中）；每次 get 比对 key 哈希，重绑自愈不串缓存；getBoundKey→解密→WereadService 接线完成
- [x] 服务端适龄强制（审查修复）：child 角色一律强制孩子视图（忽略 query）；孩子访问屏蔽书的四个详情接口 404

**审查门：**
- Gate A：`npm run verify` 全绿——**14 文件 135 用例**；覆盖率：全库语句 88.08%、services/weread 目录分支 87.05%（≥85 ✅）、crypto 100%、auth 94.11% 分支（≥85 ✅）。修复一处 flaky：限流用例改注入冻结时钟（覆盖率插桩变慢导致令牌回补竞态），杜绝重跑碰运气
- Gate B：code-reviewer 对抗审查发现 **P1×3 + P2×5**，全部当夜处置（P1 fixed ×2 + 产品决策 ×1；P2 fixed ×3 / wont-fix 0 / open ×4 排期夜 9/13/15）；**复审确认三 P1 闭环未引入新问题**，复审新发现 P2×4（R1 当夜修复，R2 并入 N3-007、R3 即本日志与登记册落盘、R4 排期夜 9）。明细 N3-001~008、N3-R1/R4
- Gate C：验收清单走查——① mock 网关联调 ✅（16+ 集成用例，回包结构逐字段对照 skill 文档）② 缓存命中第二次 0 出网 ✅（计数断言）③ 限流 429 语义化中文 ✅（冻结时钟确定性断言）。回归抽查第 2 夜关键路径：auth 10 测（缺/错/过期/伪造 token 401）✅、family 22 测（key 密文落库/不回显、跨家庭越权 403/404）✅、网关契约 17 测 ✅

**产品决策（N3-003，需用户知情）：**
孩子视图**默认不放行任何听书专辑**——微信读书回包的 albums 无 category 字段，服务端无法判定适龄，「成人有声书漏给孩子」是不可接受的红色风险，故宁缺勿滥。孩子的听书场景将由第 9 夜家长端补「逐个放行」能力（家长自选哪些专辑对孩子可见）。童书类目白名单初版仅含 docs/02 点名的前缀 1300000，**待用户用真实书架数据校准后扩充**（等真实联调时看 category 实际值域）。

**给今晚 23:00 夜班（9/6，执行第 4 夜）的交接便签：**
1. 第 4 夜任务照 docs/03 §3 执行：cosession（开/收尾/进度三档/心情/金句两来源）、highlight_star、achievement（夜灯/最长连续/读完，唯一约束防重复解锁）、模板共读卡（年龄段三档问题梯度 [02 §2.2]）。审查重点：幂等（重复收尾）、时区（统一 Unix 秒）、成就解锁竞态
2. 可复用的本夜基建：WereedServiceRegistry（`registry.get(familyId)` 拿服务实例，热门划线 `service.endpoints.bestBookmarks` 供金句点选）；BookCache 表已建未启用（共读卡若需持久化书信息可用）；EventLog 表可记 ritual 事件；屏蔽/孩子视图逻辑在 modules/weread/shelf.ts（纯函数可直接复用）
3. **收尾打 `m-a-done` tag**（第 4 夜=里程碑夜）；提醒：M-A 出口标准中的 deepLink 三链路实测按计划留第 7 夜，不阻塞 tag

**遗留：** 无 P0/P1。开放 P2：N3-005（trustProxy，夜 15）、N3-006（registry 上限，夜 13）、N3-007（快照写放大+并发窗口，夜 9）、N3-R4（孩子详情白名单校验，夜 9）。deepLink 三链路验证留第 7 夜。

---

## 2026-09-05 ｜ 第 2 夜 ｜ 状态：✅ 完成（M-A 里程碑 2/4）

**完成任务（按交接便签顺序）：**
- [x] ① Prisma 落地：prisma@5.22 + @prisma/client 安装；TAO_DATABASE_URL 贯通 .env/.env.example/config；**prisma validate 捕获白班 schema 的 EventLog 一对一缺陷（N2-004）并修复**；首迁移 `20260905154828_init` 落地；数据库工厂 + 测试 wipeDb 工具
- [x] ② weekStart 规范化唯一构造函数（N1-N04 约定）+ 跨月/跨年/同周一致性单测
- [x] ③ 认证：HMAC-JWT 设备令牌（签名密钥从 TAO_MASTER_KEY 派生——对原计划「内存态随机密钥」的刻意偏离：夜间频繁重启会导致全设备反复重绑，重启稳定性优先，主密钥更换=全员下线是预期失效路径）+ 家庭码生成（32 字符表去易混淆字符）+ requireAuth 中间件 + 错误分级（401/403/404/400/503）
- [x] ④ 家庭域 API：POST /api/family、/api/family/join、GET /api/family/:id、POST bind-weread（探针可注入；密文落库仅回显尾 4 位；拒绝不落库；网络不通→unverified）、孩子档案 CRUD；统一错误出口
- [x] 覆盖率：**auth.ts 94.11% 分支、crypto.ts 100% 分支**（要求 ≥85% ✅），全库 86.86%；defaultProbe 已重构为可注入 fetch 并补测

**⚠️ P0 事件与处置（N2-001，必须让用户知情）：**
对抗审查捕获**真实微信读书 API key 被白班写入测试源码**（helper.ts/crypto.test.ts）并进入 git 历史。已处置：源码全部换假 key；`git filter-branch` 清洗全部历史 + reflog expire + gc 剪除；`git log -S` 全库扫描 0 残留；仓库无远端、key 未离开本机。**建议用户方便时在微信读书侧轮换该 key**（.env 中现值仍可用，替换 .env 的 WEREAD_API_KEY 即可）。

**审查门：**
- Gate A：verify（typecheck+lint+test）全绿，**11 文件 102 用例**；迁移从零库重建实测通过（删库→migrate deploy→family 测试全绿）
- Gate B：code-reviewer 对抗审查发现 **P0×1 + P1×2 + P2×5**，全部当夜处置（fixed 6 / wont-fix 1 带理由 / open 1 排期第 3 夜），明细 N2-001~N2-008
- Gate C：验收清单——迁移从零重建 ✅；缺 token/错 token/过期/伪造均 401（4 个专项测试）✅；key 密文落库且任何响应不含明文（测试断言）✅；回归抽查：网关契约 17 测、加密往返 8 测、缓存隔离 11 测全绿 ✅

**给第 3 夜（9/6）的交接便签：**
1. P2-007：POST /api/family 与 /join 的 IP 级轻量限流中间件（登记册 open 项，优先做）
2. 微信读书业务 API 四件套：/api/shelf（books+albums+mp 三者和口径）、/api/book/:id/info|chapters|progress、/api/book/recommend（童书类目白名单+家长屏蔽）、/api/book/:id/bestbookmarks；全部走 WereadService（缓存+限流），用 mock 网关联调
3. 审查重点：缓存键家庭隔离、类目过滤白名单、对回包字段不臆测（对照 weread skill 文档）；绑定 key 解密 → WereadService 的接线可在本夜完成（getBoundKey 已就绪）

**遗留：** 无 P0/P1。开放 P2：N2-007（限流，第 3 夜）。deepLink 三链路验证仍留第 7 夜。

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
