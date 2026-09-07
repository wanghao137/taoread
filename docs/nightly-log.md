## 2026-09-07 ｜ 第 6 夜 ｜ 状态：✅ 完成（M-B 里程碑 2/6）——核心闭环的孩子端一半已通

**完成任务（docs/03 第 6 夜：孩子端仪式流 M1-M2）：**
- [x] ⓪ 服务端防连点最后防线：startSession 幂等守卫——快路径查复用 + SQLite 部分唯一索引（迁移 20260907003000，Prisma 不建模 raw 维护）+ P2002 捕获重读复用（与成就解锁同款三段式）
- [x] ① 孩子档案绑定：登录后拉家庭档案——单孩自动绑定、多孩 ChildPicker 点选、零孩正向空态；childId 入 session store
- [x] ② M1 月亮门：月亮主视觉 + 「点亮月亮」入口；进入时查未收尾会话——有则「还没讲完呢」续传卡直达确认屏（纸书会话走 paperTitle 分支）
- [x] ③ M2 选书流四来源：接着读（readUpdateTime 最新 + friendlyLastRead 事实性文案）/ 今晚推荐 3 册（服务端白名单+屏蔽过滤直通）/ 掷骰子（600ms 星光落定自动开课）/ 我的书架（>6 本折叠展开）
- [x] ④ 选定确认屏：🌟 spring 动画 + 书名 + deepLink「去读吧」（回包原值）+ 收尾预告
- [x] ⑤ 选书纯逻辑独立模块 ritual.ts（继续读排序/骰子均匀随机/友好文案）14 个确定性单测
- [x] ⑥ 端到端走查脚本 shots:child：真实服务端 + 真实 key 绑定 + 注入孩子会话 + Playwright 走 M1→M2→选定→续传四阶段截图（docs/screenshots/night-06/）

**⚠️ 真实数据暴露的两个臆测缺陷（本夜最大收获，均修复）：**
- N6-001 白天会话的童书白名单用臆测数字串 '1300000234' 做 mock，真实回包 category 是中文串 → 测试全绿但真数据全灭。修复为双口径（中文前缀为主+数字前缀兼容），真实值域测试锁定，**教训：mock 数据必须来自实测回包**
- N6-002 孩子书架视图字段名臆测（服务端放 books，web 读 childrenView）→ 归一化修复 + 契约测试

**三道审查门：**
- Gate A：verify 全绿——**server 17 文件 170 用例 + web 3 文件 27 用例**；生产构建成功
- Gate B：code-reviewer 对抗审查发现 **P1×3 + P2×3**（幂等非原子/骰子竞态/reused 语义错位），全部当夜修复；**复审确认三项闭环**并新发现 P2×2（P2002 分支零测试、纸书 reused 变体），亦当夜修复。明细 N6-001~012
- Gate C：**真实数据端到端走查通过**——真实书架绑定、真实童书（脑筋急转弯/十万个为什么/西游记等 7 本 + 真实推荐 3 册带封面）、入口→选定 **5.4 秒**（标准 ≤60s）、断线续传横幅复现、四阶段截图目检全过。回归：服务端含第 3/4 夜共读域全量绿

**关键决策记录：**
1. 部分唯一索引 Prisma 不建模：迁移 raw SQL 维护，未来 migrate dev 报 drift 时保留索引（迁移文件内注释预警）；存量库若有双活跃数据需先清理（当前无）
2. 服务端孩子书架视图仍以 books 字段返回（契约），web 归一化为 childrenView——改 web 不改 server，避免破坏家长端契约
3. transient 0xC0000005：vitest worker 在 Windows 偶发原生崩溃（测试已打印结果后），两次全量均复跑即绿；若复发考虑 pool:forks（登记观察，不阻塞）

**给第 7 夜（9/8）的交接便签：**
1. 孩子端 M3-M4（docs/03 第 7 夜）：出发卡（3-2-1 倒计时动画 + deepLink/纸质书/听书三通道 + 降级链）与收尾流（进度三档/心情贴纸/金句两来源——后端 POST finish 与 highlights 已就绪）；ReadyScreen 的「即将点亮」文案同步替换
2. 技术三验之一落地：deepLink 三链路实测（微信内置/系统浏览器/旧平板），实测结论写入日志——这是 M-A 欠账的最后一块
3. 审查重点：会话中断恢复、双击幂等（busyRef 模式延续）、deepLink 只用回包原值

**遗留：** 无 P0/P1。开放 P2：N6-012（推荐流付费口径→夜 9）、N3-005/N4-004（夜 15）、N3-006（夜 13）、N3-007/N3-R4/N4-007（夜 9）、N4-006（随夜 7）。

---

## 2026-09-06 ｜ 第 5 夜（夜班顺延执行）｜ 状态：✅ 完成（M-B 里程碑 1/6）

**背景：** 白班同日已完成第 3、4 夜（M-A 达成）。夜班按日志指示直接执行第 5 夜（Web 地基与设计系统）——首个前端夜。

**完成任务：**
- [x] ① apps/web 脚手架：Vite5 + React18 + TS strict + Tailwind3.4 + vite-plugin-pwa（manifest/离线壳/图标）+ Framer Motion11 + zustand + react-router6；dev 代理 /api→:8787；生产构建通过（PWA precache 11 entries）
- [x] ② 设计系统落盘 docs/design-system.md（夜空/蜜桃/月光/墨色四系 token、对比度实测表、触达/字号红线、动效与 reduced-motion 规则、文案红线）；PWA 图标程序化生成（gen-icons.mjs 手写 PNG 编码：夜空底+蜜桃新月+双星，192/512/maskable 三枚）
- [x] ③ 基础组件 7 件：TaButton（lg=64px 触达/loading 保名/whileTap）、TaCard、TaSheet（dialog 语义+焦点陷阱+还焦+滚动锁）、TaSticker、Loading（月亮呼吸）、ErrorState（零指责）、EmptyState（正向引导）
- [x] ④ 路由与角色框架：/login（家庭码加入/创建+角色选择）、/child、/parent（四 Tab 壳+家庭概览真实对接）、RequireRole 守卫、401 单点处理、全局 ErrorBoundary；/dev/kitchen-sink 组件演示页
- [x] ⑤ 视觉走查基线：Playwright + vite preview 三视口（390/768/1280）×2 页共 6 图存 docs/screenshots/night-05/，全页目检通过

**三道审查门：**
- Gate A：verify 全绿——服务端 16 文件 165 用例 + web 2 文件 11 用例；生产构建成功；PWA 可安装（manifest+SW precache 验证）
- Gate B：code-reviewer 对抗审查发现 **P1×3 + P2×8（零 P0）**，全部当夜处置（fixed 11 / wont-fix 1 带理由）。P1：孩子端与家长端 retry 死锁 ×2（effect 依赖不变永不重拉）、401 单点处理缺失；P2 含 200+非 JSON 白屏崩溃路径（改 BAD_RESPONSE+ErrorBoundary）、触达 38px/56px 违红线、placeholder 对比度 2.3:1、text-sm 11 处、loading 可访问名丢失、弹层无焦点陷阱。明细 N5-001~012
- Gate C：验收走查——kitchen-sink 与 login 三视口截图全过（布局无破碎/对比度达标/文案全正向）；儿童红线 grep（落后/差距/课程/教学等）0 命中；孩子端无外链/广告/付费诱导。回归：服务端 165 用例全绿（含第 3/4 夜共读域）

**给第 6 夜（9/7）的交接便签：**
1. 孩子端仪式流 M1-M2（docs/03 第 6 夜）：月亮入口 + 「今晚读什么」选书（继续读/今晚推荐/翻书架/骰子），对接已有 GET /api/shelf?view=child、/api/book/recommend、/api/book/:id/progress
2. 选书交互动画（翻卡/星光），底线：空书架/接口失败走 ErrorState/EmptyState（组件已就绪，别再写死锁 retry——统一用 load() useCallback 模式）
3. 审查重点：动画不阻塞交互、按钮防连点、选书到选定 ≤60 秒走查；UI 全部文案再过负向清单

**遗留：** 无 P0/P1。开放 P2：N2-007 已清（第 3 夜）；存量排期 N3-005/N4-004（夜 15）、N3-006（夜 13）、N3-007/N3-R4/N4-007（夜 9）、N4-006（夜 7）。deepLink 三链路留第 7 夜。

---

# 夜间执行日志（唯一进度事实源）

> 规则：每夜收尾必须更新本文件。夜次 = 日期 − 9/3。开工先读本文件决定做什么。
> 格式：状态 / 完成任务 / 顺延或砍掉（含原因）/ 审查结果（Gate A/B/C）/ 给下一夜的交接便签。

---

## 2026-09-06 ｜ 第 4 夜任务 ｜ 状态：✅ 完成（**白班同日提前完成**，今晚 23:00 夜班请直接执行第 5 夜任务）｜ 🏁 M-A 里程碑达成，tag `m-a-done` 已打

**⚠️ 给 2026-09-06 23:00 夜班会话的重要说明：**
白班今日连续完成了**第 3 夜与第 4 夜**全部任务，各自通过三道审查门（两次独立的 code-reviewer 对抗审查 + 复审闭环）。**请直接执行第 5 夜任务（Web 地基与设计系统，docs/03 §3 第 5 夜）**——这是首个前端夜（apps/web：Vite+React18+Tailwind+PWA+Framer Motion）。无欠账、无未决 P0/P1。

**完成任务：**
- [x] ① cosession：POST /api/cosession（weread 书/纸质书书源互斥）、GET /active（断线续传）、GET /:id 详情、POST /:id/finish（**原子收尾 + 幂等**：updateMany 带 endedAt:null 条件防并发双收尾覆盖；重复收尾返回首次值）
- [x] ② highlight_star：POST /api/cosession/:id/highlights 两来源（voice 口述 / weread 热门划线点选带 markCount「N 人划过这句」）；文本 1-500 字校验
- [x] ③ achievement：夜灯第 N 晚 / 最长连续（跨 best 瞬间，streak≥2 起）/ 读完第 N 本（去重已读书计数 value，避免 bookId 塞不进 Int32 的 schema 变更）；**防重复解锁最后防线 = @@unique([childId,kind,value])，P2002 捕获跳过**；**已收尾分支补偿评估**（崩溃窗口缺页重放补齐，纪念成就账本级完整）
- [x] ④ 模板共读卡：POST /api/cosession/:id/reading-card——讲什么 3（简介+热门划线+年龄段提示）/问什么 3（3-5/6-8/9-12 三档开放式问题梯度库）/聊什么（话题钩子）；稳定散列确定性生成（同书同孩子每次相同）；书信息+热门划线走 WereadService；未绑定/网关失败/限流 → 纯模板兜底不报错（升级信号不吞）；ParentPrompt 落库（genType=template）
- [x] ⑤ EventLog：ritual_started / cosession_finished / highlight_added 三事件（写失败降级 warn 不阻塞主流程）
- [x] 夜界工具 nights.ts：Unix 秒 → 本地日期桶（跨月/跨年/时区敏感边界单测）

**审查门：**
- Gate A：verify 全绿 **16 文件 165 用例**；覆盖率：全库语句 90.7%、cosession 模块语句 98.4%（≥70 ✓）、services/weread 分支 87%（≥85 ✓）、crypto 100%、auth 94%
- Gate B：code-reviewer 对抗审查（增量）发现 **P2×8（零 P0/P1）**，当夜修复 4 项（N4-001 原子收尾 / N4-002 成就补偿 / N4-005 书源互斥 / N4-008 日志 warn）+ 复审**全部通过**，复审新发现文档级 P2×1（N4-R1 已修）；其余 4 项按建议排期（N4-004→夜 15、N4-006→夜 7、N4-007→夜 9、N4-003 随本条目闭环）
- Gate C：验收走查——①完整共读（开→选书→收尾）落库正确 ✅（durationSec/进度/心情/事件链行为级断言）②断线续传重复收尾幂等 ✅（首次值不被覆盖、时长不变、补偿重放无新增）③成就只在阈值跨越瞬间解锁一次 ✅（同晚第二场不解锁、同书重读不解锁、新书才递增、纯逻辑 6 用例）。回归：第 3 夜 weread 路由 17 测 + 第 2 夜 family/auth 32 测 + 第 1 夜网关/缓存 33 测全绿

**关键决策记录（供审查追踪）：**
1. **夜界时区**（N4-003/004）：存储一律 Unix 秒；「一晚」的分桶取**服务器本地日期**（家庭自部署单时区，与家长感知一致）。容器化部署必须设 TZ（如 Asia/Shanghai），已列第 15 夜部署前置（与 trustProxy 同批）。
2. **成就 value 语义**：夜灯=累计晚数、最长连续=连读晚数、读完=去重已读书序数——三者天然递增，复用 schema 现有唯一约束即可防重，无需 schema 变更。固有特性：极并发下两个中间值可能跳档（如两本同时首次读完只产生 value=2）——已评估为可接受的纪念级损失。
3. M-A 出口标准中的 deepLink 三链路实测按计划留第 7 夜（第 1 夜起即为既定安排），不阻塞 m-a-done。

**给今晚 23:00 夜班（9/6，执行第 5 夜）的交接便签：**
1. 第 5 夜照 docs/03 §3 执行：apps/web 初始化（Vite+React18+TS+Tailwind+PWA+Framer Motion）、设计系统落盘 docs/design-system.md 同步、基础组件（TaButton/TaCard/TaSheet/TaSticker/Loading/ErrorState/EmptyState）、路由与角色框架（孩子端/家长端 + 家庭码登录，后端 /api/family 与 /join 已就绪）、/dev/kitchen-sink 组件演示页、截图基线 docs/screenshots/night-05/
2. 后端已全部就绪可直接对接：业务 API 见 modules/weread/routes.ts、共读域见 modules/cosession/routes.ts；孩子视图 /api/shelf?view=child（服务端按角色强制）；共读卡 /api/cosession/:id/reading-card；测试 mock 模式参考 test/weread-routes.test.ts 的 makeMockGateway
3. 审查重点（计划指定）：可访问性（对比度 ≥4.5、字号 ≥16px、触达 ≥64px）、prefers-reduced-motion 降级；UI 文案必须过 docs/02 §3.4 负向清单（无焦虑话术）

**遗留：** 无 P0/P1。开放 P2：N3-005/N4-004（部署前置，夜 15）、N3-006（registry 上限，夜 13）、N3-007/N3-R4/N4-007（夜 9 重构批）、N4-006（夜 7）。deepLink 三链路验证留第 7 夜。

---

## 2026-09-06 ｜ 第 3 夜任务 ｜ 状态：✅ 完成（白班提前完成；第 4 夜亦已于同日白班完成，见上方条目）

**说明：** 第 3 夜全部任务（微信读书业务 API 四件套 + P2-007 限流）由白班会话完成，三道审查门全部通过。

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

**给第 4 夜的交接便签（已于同日白班消化完毕，留档）：**
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
