# 缺陷登记册

> P0=当夜清零 ｜ P1=当夜清零 ｜ P2=登记排期，验收日前全部处置
> 格式：编号 | 日期 | 严重级 | 位置 | 描述 | 状态（open/fixed/wont-fix+理由）| 修复夜次

| 编号 | 日期 | 级别 | 位置 | 描述 | 状态 | 修复夜次 |
|------|------|------|------|------|------|----------|
| N1-B01 | 2026-09-04 | P1 | server/services/weread/gateway.ts | 200 回包为 null/数组/标量时契约检查被绕过甚至抛未受控 TypeError | fixed | 第 1 夜 |
| N1-B02 | 2026-09-04 | P2 | test/gateway.test.ts | 缺少「upgrade_info 优先于 errcode」顺序回归测试 | fixed | 第 1 夜 |
| N1-B03 | 2026-09-04 | P2 | gateway.ts | 重试未消费响应体（占连接）、未读 Retry-After 头 | fixed | 第 1 夜 |
| N1-B04 | 2026-09-04 | P2 | service.ts | 缓存击穿：并发同键请求重复扣令牌重复出网 | fixed（在途 Promise 合并） | 第 1 夜 |
| N1-B05 | 2026-09-04 | P2 | cache.ts | 注释称 FIFO，实现实为近似 LRU，文档与行为不符 | fixed（注释更正） | 第 1 夜 |
| N1-B06 | 2026-09-04 | P2 | lib/crypto.ts | scryptSync 同步阻塞事件循环 | fixed（改异步 scrypt） | 第 1 夜 |
| N1-B07 | 2026-09-04 | P2 | config.ts | CORS 默认 '*' 是危险默认方向 | fixed（prod 下禁止 '*'，强制显式配置） | 第 1 夜 |
| N1-B08 | 2026-09-04 | P2 | test/gateway.test.ts | 永真式假测试（typeof 检查） | fixed（删除，补 Retry-After 行为测试） | 第 1 夜 |
| N1-B09 | 2026-09-04 | P2 | test/service.test.ts | 缺「TTL 过期后重新出网」行为测试；TTL 策略断言为常量同义反复 | fixed（补真实时钟注入用例） | 第 1 夜 |
| N1-B10 | 2026-09-04 | P2 | gateway.ts | fetch 抛非 Error 值时错误消息变 undefined | fixed（errorMessage 归一化） | 第 1 夜 |
| N1-N01 | 2026-09-04 | P1 | scripts/smoke-weread.ts | 摸底 outcome 分类语义颠倒：网络错误（status=0）误标 httpError、升级信号误标 network | fixed（分类重写 + upgrade 独立 outcome） | 第 1 夜 |
| N1-N02 | 2026-09-04 | P2 | scripts/smoke-weread.ts | 兜底 catch 内写报告失败会二次抛出导致非 0 退出 | fixed（兜底写报告加 try/catch） | 第 1 夜 |
| N1-N03 | 2026-09-04 | P2 | prisma/schema.prisma | ShelfSnapshot/Achievement 存在被 unique 最左前缀覆盖的冗余索引 | fixed（删除冗余索引） | 第 1 夜 |
| N1-N04 | 2026-09-04 | P2 | prisma/schema.prisma | WeeklyReport.weekStart 唯一键依赖规范化构造，时区/毫秒差异可破坏唯一性 | fixed（schema 注释强制规范化函数约定，第 2 夜落地工具函数+单测） | 第 1 夜 |
| N1-N05 | 2026-09-04 | P2 | package.json | allowScripts 疑似死配置 | wont-fix：本环境 npm shim 确实消费该字段（approve-scripts 生成），删除会破坏全新安装 | 第 1 夜 |
| N2-001 | 2026-09-05 | **P0** | test/helper.ts、test/crypto.test.ts | 真实微信读书 API key 明文写入测试源码并随提交进入 git 历史（白班引入，对抗审查捕获） | fixed：源码换假 key + filter-branch 清洗全部历史 + gc 剪除旧对象；git log -S 全库扫描为 0；已建议用户轮换该 key | 第 2 夜 |
| N2-002 | 2026-09-05 | P1 | modules/family/routes.ts | 绑定探针把升级信号（WEREAD_UPGRADE）等错误静默映射为 unverified，网关升级约定被吞 | fixed：仅网络层失败（status=0）与网关 5xx → unverified；key 被拒（业务/HTTP 4xx）→ ValidationError；其余原样上抛（升级=503） | 第 2 夜 |
| N2-003 | 2026-09-05 | P1 | app.ts | 错误处理器未透传框架级 4xx（畸形 JSON/空 body/超限 body 一律 500） | fixed：statusCode 400-499 透传为 BAD_REQUEST；补 500/400 出口真实覆盖测试 | 第 2 夜 |
| N2-004 | 2026-09-05 | P2 | prisma/schema.prisma | 白班 schema 把 EventLog 定义为 Family 一对一但缺 @unique，validate 失败（语义应为一对多） | fixed：Family.events 改 EventLog[]（prisma validate 迁移前捕获） | 第 2 夜 |
| N2-005 | 2026-09-05 | P2 | test/app.test.ts、family.test.ts | 两处无效测试：500 出口实际测的是内置 404；绑定拒绝用例缺「不落库」断言 | fixed：注入抛错路由锁定 500 分支；补 count=0 断言 | 第 2 夜 |
| N2-006 | 2026-09-05 | P2 | service.ts | 家庭码唯一约束碰撞无重试（P2002 直接 500） | fixed：碰撞重试至多 3 次 | 第 2 夜 |
| N2-007 | 2026-09-05 | P2 | routes.ts | POST /api/family 与 /join 是无凭据入口，缺 IP 级限速（家庭码=完整身份） | fixed：IpRateLimiter（每 IP 令牌桶 capacity 5 / refill 10min⁻¹，第 1 夜摸底安全参数；maxTrack 4096 防膨胀），冻结时钟确定性测试 | 第 3 夜（白班） |
| N2-008 | 2026-09-05 | P2 | lib/db.ts | wipeDb 用 $executeRawUnsafe（常量 SQL 无注入面，但不如 tagged template 稳） | wont-fix：SQL 为编译期常量数组、无外部输入拼接；表名无法参数化，tagged template 收益为零 | 第 2 夜 |
| N3-001 | 2026-09-06 | **P1** | modules/weread/shelf.ts | 快照全量同步 deleteMany 全家删除，「不在书架但被屏蔽」的推荐书屏蔽行被清除→家长单书屏蔽对推荐流失效（docs/02 §5.4 管控失效） | fixed：deleteMany 仅清 blocked:false；屏蔽行永不删除，回包重建跳过已屏蔽键；回归测试锁定「屏蔽推荐书→两次同步→行存活→推荐持续过滤」+ 解除路径 | 第 3 夜（白班） |
| N3-002 | 2026-09-06 | **P1** | modules/weread/routes.ts | 适龄过滤仅是查询参数：孩子 token 不带 ?view=child 即得全量书架（含成人书）与屏蔽清单；详情四接口对孩子也不校验屏蔽书 | fixed：服务端按角色强制——child 角色一律孩子视图（忽略 query，isChild 优先）；info/chapters/progress/bestbookmarks 对 child 校验屏蔽（kind=book）→404，家长不受限；回归测试 ×2 | 第 3 夜（白班） |
| N3-003 | 2026-09-06 | **P1** | modules/weread/shelf.ts | 孩子视图 albums 无类目闸全量直通（回包无 category 字段无法判定），成人有声书可漏给孩子，违背「不展示成人类目」红线 | fixed（产品决策）：宁缺勿滥——孩子视图默认不放行任何专辑；听书放行能力（家长逐个授权）留第 9 夜家长端（见 N3-R4 同期处理） | 第 3 夜（白班） |
| N3-004 | 2026-09-06 | P2 | modules/weread/routes.ts、shelf.ts | 屏蔽集合不区分 kind，book/album 两个独立 id 空间同值碰撞时互相误伤 | fixed：屏蔽键统一 kind 前缀（book:/album:）贯通 load/filter/响应 | 第 3 夜（白班） |
| N3-005 | 2026-09-06 | P2 | app.ts、index.ts | IP 限流依赖 request.ip，未配 trustProxy；反代部署下退化为全站共享桶（上线即互相 429） | open：第 15 夜部署准备——TAO_TRUST_PROXY 环境变量接入 Fastify trustProxy，写入部署文档为前置条件 | 第 15 夜（计划） |
| N3-006 | 2026-09-06 | P2 | services/weread/registry.ts | Registry entries Map 以 familyId 为键只增不减，长驻进程无界增长 | open：第 13 夜马拉松——容量上限 + 逐出 | 第 13 夜（计划） |
| N3-007 | 2026-09-06 | P2 | modules/weread/shelf.ts、routes.ts | /api/shelf 缓存命中仍每请求全删全建快照（写放大）；与 PUT 屏蔽并发的窄窗口可撞唯一键产生一次 500（数据无损，重试即恢复，见复审 N3-R2） | open：第 9 夜重构——回包指纹跳过同步或逐行 upsert（update 仅元数据不动 blocked） | 第 9 夜（计划） |
| N3-008 | 2026-09-06 | P2 | app.ts | maxParamLength 注释与实现不一致（128 vs 256） | fixed：注释更正为 256 并说明动机 | 第 3 夜（白班） |
| N3-R1 | 2026-09-06 | P2 | modules/weread/routes.ts | assertNotBlockedForChild 的 findFirst 不带 kind，album 屏蔽可误伤同值 bookId 的详情访问 | fixed：查询固定 kind='book'（详情接口均为 book 语义） | 第 3 夜（白班） |
| N3-R4 | 2026-09-06 | P2 | modules/weread/routes.ts | 孩子对「未屏蔽的非童书」详情四接口仍直通（bookId 可枚举可构造）；book info 回包有 category，具备校验条件 | open：第 9 夜家长端重构——child 角色校验回包 category 命中童书白名单，否则 404 | 第 9 夜（计划） |
| N4-001 | 2026-09-06 | P2 | modules/cosession/service.ts | finish 的 check-then-act 竞态：并发双收尾各自 update，后到者覆盖先到者（时长放大/进度覆盖） | fixed：updateMany 带 `endedAt: null` 条件原子收尾，count=0 重读走已收尾语义（保留先到者值） | 第 4 夜（白班） |
| N4-002 | 2026-09-06 | P2 | modules/cosession/service.ts | 成就漏发窗口：收尾已提交、成就落库前异常 → 重试不再评估 → 纪念成就永久缺页（不可自愈） | fixed：已收尾分支补偿评估（持久化 endedAt/bookId/progressMark 重放；planUnlocks 幂等 + P2002 兜底，正常重试无新增）；回归测试锁定补齐语义 | 第 4 夜（白班） |
| N4-003 | 2026-09-06 | P2 | docs/ | nights.ts 注释声称时区决策「已在日志登记」但第 4 夜条目未写（审查时序问题） | fixed：第 4 夜日志条目与登记册本行即为登记 | 第 4 夜（白班） |
| N4-004 | 2026-09-06 | P2 | modules/cosession/nights.ts | 夜界取服务器本地时区：容器 UTC 下北京 00:00-07:59 收尾跨午夜共读计入前一日（8h 漂移窗口，无报错无对账） | open：第 15 夜部署准备——部署文档强制 TZ 或引入 TAO_NIGHT_TZ（与 N3-005 trustProxy 同批部署前置） | 第 15 夜（计划） |
| N4-005 | 2026-09-06 | P2 | modules/cosession/service.ts | bookId 与 paperTitle 可同时传入，共读卡书名优先级随出网成败不一致 | fixed：service 层书源互斥（同传 → 400 二选一）+ 测试 | 第 4 夜（白班） |
| N4-006 | 2026-09-06 | P2 | modules/cosession/service.ts | 同孩子多 active 会话无守卫：双开设备产生僵尸会话（永不收尾、不进成就统计） | open：第 7 夜孩子端「会话中断恢复」一并定产品语义（409 提示先收尾 或 自动收尾旧场） | 第 7 夜（计划） |
| N4-007 | 2026-09-06 | P2 | modules/cosession/service.ts | reading-card 每次调用新增 ParentPrompt 行（内容确定性相同），消费方上线后将读到重复卡 | open：第 9 夜重构批——按 (familyId, bookId, nightKey) 唯一化/upsert（与 N3-007 同批）；顺带评估 allSettled 分级降级与角色限制（孩子端每次耗 2 令牌自伤配额） | 第 9 夜（计划） |
| N4-008 | 2026-09-06 | P2 | modules/cosession/service.ts | logEvent catch 完全黑洞：事件静默丢失不可发现（DB 满等持续失败无从察觉） | fixed：catch 降级 console.warn（含 event 名与错误消息） | 第 4 夜（白班） |
| N4-R1 | 2026-09-06 | P2 | test/cosession.test.ts | 幂等用例标题「不重评成就」与补偿修复后行为不符（断言仍正确，描述误导） | fixed：标题与注释更正为「补偿重放无新增」 | 第 4 夜（白班） |
| N5-001 | 2026-09-06 | P1 | web/pages/ChildHome.tsx | 错误态 retry 死锁：retry 只改本地 state，effect 依赖不变永不重拉，永久卡 Loading | fixed（拉取提取为 useCallback load，effect 调 load，onRetry=load） | 第 5 夜 |
| N5-002 | 2026-09-06 | P1 | web/pages/ParentHome.tsx | 同根因的家长端 retry 死锁 | fixed（同上模式） | 第 5 夜 |
| N5-003 | 2026-09-06 | P1 | web/lib/api.ts | design-system §9 明文要求的 401 单点处理缺失，过期会话死锁 | fixed（401 → 清会话 + 回 /login + UNAUTHORIZED 语义，含测试锁定） | 第 5 夜 |
| N5-004 | 2026-09-06 | P2 | web/lib/api.ts | 2xx+非 JSON 静默归一 undefined → 下游渲染白屏崩溃路径（如静态托管 SPA fallback 打到 /api） | fixed（一律抛 BAD_RESPONSE）+ main.tsx 挂全局 ErrorBoundary（正向文案兜底） | 第 5 夜 |
| N5-005 | 2026-09-06 | P2 | web/pages/ChildHome.tsx | 孩子端「换一个家庭」触达仅 ~38px，违反 64px 红线 | fixed（min-h-touch + text-base） | 第 5 夜 |
| N5-006 | 2026-09-06 | P2 | web/components/ui/TaSticker.tsx | 可点态贴纸 56px < 64px 红线（孩子会点） | fixed（可点态 min-h-touch） | 第 5 夜 |
| N5-007 | 2026-09-06 | P2 | web/pages/LoginPage.tsx | 家庭码 placeholder 对比度 ≈2.3:1，违反 ≥4.5 红线 | fixed（不透明度 40%→70%，实算 ≈4.8:1） | 第 5 夜 |
| N5-008 | 2026-09-06 | P2 | web/pages/*（11 处） | text-sm(14px) 违反「字号 ≥16px」红线 | fixed（全部提升 text-base） | 第 5 夜 |
| N5-009 | 2026-09-06 | P2 | web/components/ui/TaButton.tsx | loading 态整体替换 children，可访问名称变空 | fixed（文本保留 opacity-0 + spinner 绝对叠加） | 第 5 夜 |
| N5-010 | 2026-09-06 | P2 | web/components/ui/TaSheet.tsx | aria-modal 声明了语义义务但无焦点陷阱/还焦/滚动锁 | fixed（移焦+Tab 循环陷阱+关闭还焦+body 滚动锁） | 第 5 夜 |
| N5-011 | 2026-09-06 | P2 | web/pages/LoginPage.tsx | deviceId 裸用 localStorage（隐私模式异常被上层 try 吞掉但不统一） | fixed（safe 模式 try/catch + 降级 web-ephemeral） | 第 5 夜 |
| N5-012 | 2026-09-06 | P2 | web/src/App.tsx | 前端角色守卫是装饰性防线（role 客户端自选可改） | wont-fix：架构既定；服务端已按 token 强制（第 3 夜：child 一律孩子视图、屏蔽书 404、角色权限路由级校验），前端仅做体验层引导 | 第 5 夜 |
| N6-001 | 2026-09-07 | P1 | server/modules/weread/shelf.ts | 童书白名单用臆测数字前缀 '1300000' 匹配，真实回包 category 为中文串（"童书-幼儿启蒙"）→ 孩子视图/推荐全灭（白天 mock 臆测值致测试绿真数据空） | fixed（双口径：中文前缀为主 + 数字前缀兼容；真实值域测试锁定；教训入日志） | 第 6 夜 |
| N6-002 | 2026-09-07 | P1 | web/lib/api.ts | 孩子书架视图字段臆测：服务端孩子视图过滤结果放 books 字段，web 读 childrenView → 真实数据恒空 | fixed（api.shelf 归一化映射 + 契约测试锁定） | 第 6 夜 |
| N6-003 | 2026-09-07 | P1 | server/modules/cosession/service.ts | startSession 幂等守卫 check-then-create 非原子，并发双开可行 | fixed（SQLite 部分唯一索引 cosession_one_active_per_child + P2002 捕获重读复用；复审推演确认闭环） | 第 6 夜 |
| N6-004 | 2026-09-07 | P1 | web/pages/child/BookPicker.tsx | 骰子 600ms 动画窗口防连点失效（闭包捕获旧 busyId + 定时器不可撤销） | fixed（busyRef 同步判定 + diceTimerRef 选中即撤销/卸载清理 + diceRolling 期全卡禁用；复审时序推演确认） | 第 6 夜 |
| N6-005 | 2026-09-07 | P1 | web/pages/ChildHome.tsx | reused 语义错位：忽略服务端复用回包，确认屏显示新点的书而账本记在旧书上 | fixed（消费回包：归属另一本微信读书书 → 解析真实书名进确认屏；解析失败 → 409 正向提示留选书屏） | 第 6 夜 |
| N6-006 | 2026-09-07 | P2 | web/pages/ChildHome.tsx | reused 纸书变体（bookId=null）仍冒充新书（复审新发现） | fixed（三分支归属判定：他书 resolveBook / 纸书 paperTitle / 本书直通） | 第 6 夜 |
| N6-007 | 2026-09-07 | P2 | server/modules/cosession/service.ts | P2002 恢复分支零测试覆盖，Prisma 对部分索引的映射假设未经验证（复审新发现） | fixed（stub db 确定性单测：P2002 → reused:true；非 P2002 原样上抛） | 第 6 夜 |
| N6-008 | 2026-09-07 | P2 | web/pages/ChildHome.tsx | 纸质书活跃会话时「继续今晚的故事」为死按钮 | fixed（bookId 为空 → ready(paperTitle) 走纸书文案分支） | 第 6 夜 |
| N6-009 | 2026-09-07 | P2 | web/pages/ChildHome.tsx | setChildId 在 load 回调内触发 loadChildren 重建 → familyView/active 双拉取 | fixed（getState 读 childId 移出依赖，拉取各一次） | 第 6 夜 |
| N6-010 | 2026-09-07 | P2 | web/lib/ritual.ts | friendlyLastRead 假定秒级时间戳（skill 未锁单位），毫秒回包恒显「今天」 | fixed（>1e12 毫秒折算 + 确定性用例） | 第 6 夜 |
| N6-011 | 2026-09-07 | P2 | web/scripts/screenshot-child-flow.mjs | win32 下 shell:true 进程树 kill 不净，重跑端口占用 | fixed（taskkill /T /F 清进程树） | 第 6 夜 |
| N6-012 | 2026-09-07 | P2 | server/modules/weread/routes.ts | 推荐流不过滤 price/payType，付费书可能出现在孩子「去读吧」落地（第 3 夜存量，本夜首次触达孩子端） | open：夜 9 与家长授权（听书逐个放行/付费口径）一并定夺 | 第 9 夜（计划） |
