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
| N7-001 | 2026-09-08 | P1 | web/pages/ChildHome.tsx | 选书屏死锁：续传解析失败降级进 select 后，active 会话下既开不了新书也回不到收尾（409 提示「先读完」却不给收尾的路） | fixed（解析失败回门屏保住续传卡 + select 阶段加「回到月亮」返回） | 第 7 夜 |
| N7-002 | 2026-09-08 | P2 | server/modules/cosession/service.ts | 金句服务端零去重（(cosessionId,source,text) 无约束），前端 Set 防线可绕过 | open：夜 9 与金句管理一并做（部分唯一索引 + P2002 复用，项目成熟模式） | 第 9 夜（计划） |
| N7-003 | 2026-09-08 | P2 | web/pages/child/DepartureScreen.tsx | deepLink 降级链的「引导浮层」缺席且未记录裁剪；无 deepLink 时通道区空置 | fixed（无 deepLink 时展示「请爸爸妈妈在微信读书里找到这本书」引导文案）；浮层部分裁剪已在日志记录（https 链接隐式兜底网页版） | 第 7 夜 |
| N7-004 | 2026-09-08 | P2 | web/pages/child/DepartureScreen.tsx | 倒计时期间通道按钮 opacity:0 仍可点击（隐形误触风险）；走查脚本断言被裸 timeout 顶替 | fixed（counting 时 pointer-events-none）；脚本改为先等「3」出现再等通道 | 第 7 夜 |
| N7-005 | 2026-09-08 | P2 | web/pages/ChildHome.tsx | activeTitle 死字段，续传卡永远显示「今晚的那本书」（纸书 paperTitle 明明可得） | fixed（门屏检查时填充 paperTitle） | 第 7 夜 |
| N7-006 | 2026-09-08 | P2 | web/pages/ChildHome.tsx | 门屏双通道按钮未延续 busyRef 防连点模式 | fixed（gateBusyRef + try/finally） | 第 7 夜 |
| N7-007 | 2026-09-08 | P2 | web/lib/api.ts | HighlightDto 声明了服务端不返回的三个字段（select 仅 id），契约失真误导后人 | fixed（DTO 收窄为 {id}） | 第 7 夜 |
| N7-008 | 2026-09-08 | P2 | web/lib/finish.ts | 进度/心情枚举 web 端独立维护，防不了跨端漂移 | fixed（web 从 @taoread/shared 单一来源派生；server zod 对齐列入夜 13 重构批） | 第 7 夜 |
| N7-009 | 2026-09-08 | P2 | web/scripts/screenshot-night7.mjs | 金句来源 A 判定有懒加载竞态，可能静默误判「无划线」掩盖回归 | fixed（先等列表/空态其一出现再判定；实测本轮正确识别空态走来源 B） | 第 7 夜 |
| N7-010 | 2026-09-08 | P2 | web/pages/child/FinishScreen.tsx | loadBookmarks 的 alive 清理函数被 effect 丢弃（N5-001 同族弱化版） | fixed（effect 返回清理函数） | 第 7 夜 |
| N7-011 | 2026-09-08 | P2 | server/modules/cosession | N4-006 僵尸会话语义（多 active 场）本夜仍未落实 | open：改期夜 9（与家长端「读完收尾」管理同批），本夜日志已明确改期 | 第 9 夜（计划） |
| N8-001 | 2026-09-09 | P1 | server/modules/cosession/routes.ts | 开课就寝闸时钟不可注入（闭包内直读 new Date()），专项测试依赖真实时钟——白天跑必红，验收「可测（注入时钟）」未达成 | fixed（单一来源 isBedtime + nowMinutesOfDay 注入点，app.ts 贯通两域；测试确定化） | 第 8 夜 |
| N8-002 | 2026-09-09 | P1 | web/pages/ChildHome.tsx | gate 检查 Promise.all 无 catch：activeCosession 网络失败 → 永久卡 Loading（夜间场景恰在高发窗口） | fixed（catch 降级为无会话门屏，续传/收尾通道保留，服务端幂等兜底；复审确认） | 第 8 夜 |
| N8-003 | 2026-09-09 | P2 | server/modules/ritual/routes.ts | requireAuth 第三方重复实现且语义漂移（无头 403 vs 家庭域 401，api.ts 401 单点对 ritual 永不触发） | fixed（删除本地实现改用 family 版，401 对齐） | 第 8 夜 |
| N8-004 | 2026-09-09 | P2 | server/modules/ritual/routes.ts | assertOwnedChild 403 与家庭域/共读域 404 口径分裂 | fixed（统一 NotFoundError 404，测试同步） | 第 8 夜 |
| N8-005 | 2026-09-09 | P2 | server/modules/ritual/routes.ts | ritualWindowOf 兜底分支拆两次 new Date()，跨点瞬间可偏差 60 分钟 | fixed（单 Date IIFE 兜底） | 第 8 夜 |
| N8-006 | 2026-09-09 | P2 | server/src/config.ts | TAO_BEDTIME=（空串）被 coerce 成 0 → 全天就寝静默生效且无提示 | fixed（string+transform 显式拒绝空串/非数字/超界；config 四组测试） | 第 8 夜 |
| N8-007 | 2026-09-09 | P2 | web/pages/child/RitualGate.tsx | overtime 下「故事讲完啦」与「还想再读一会儿」语义自相矛盾 | fixed（文案改「再多读一小段」；软引导不惩罚口径登记） | 第 8 夜 |
| N8-008 | 2026-09-09 | P2 | web/pages/child/BedtimeScreen.tsx | 就寝+有活跃会话时无收尾入口 → 当晚夜灯成就丢失（隐性惩罚，与成就一致性冲突） | fixed（bedtime 屏保留「先把今晚的故事收好」单一收尾通道，锁定即锁定不被破坏） | 第 8 夜 |
| N8-009 | 2026-09-09 | P2 | server/test/ritual.test.ts | 测试缺口：overtime 边界（299/300）未测、bedtime 端到端零覆盖、就寝期收尾/金句放行无回归 | fixed（补三组确定性用例） | 第 8 夜 |
| N8-010 | 2026-09-09 | P2 | web/scripts/screenshot-night8.mjs | 阶段一依赖真实时钟命中就寝窗口，白天/傍晚运行必败 | fixed（注入 TAO_BEDTIME=当前-1 分钟确定性命中） | 第 8 夜 |
| N8-011 | 2026-09-09 | P2（预登记） | web/lib/api.ts | achievements.unlockedAt（UTC ISO）未来若直接浏览器时区渲染，与「晚」的服务器本地分桶口径冲突（当前无消费点） | open：夜 9 展示解锁时间时统一走服务器 TZ 格式化或服务端下发夜键 | 第 9 夜（计划） |
| N8-R1 | 2026-09-09 | P2 | docs/bug-register.md | 第 8 夜代码注释引用 N8 登记号但登记簿未落档（复审 R-1） | fixed（本批补录 N8-001~011 + R 项） | 第 8 夜 |
| N8-R2 | 2026-09-09 | P3 | server/test/ritual.test.ts | 用例标题「越权 403」与断言 404 不符 | fixed（标题对齐） | 第 8 夜 |
| N8-R3 | 2026-09-09 | P3 | web/scripts/screenshot-night8.mjs | 走查成功日志宣称「真实时钟」实际为注入时钟，文案失真 | fixed（日志对齐） | 第 8 夜 |
| N9-101 | 2026-09-10 | P1 | web/pages/parent/ShelfManager.tsx | 书架屏蔽状态读 b.blocked（服务端全量视图无此字段，状态在 blockedBookIds），已屏蔽书永远显示「屏蔽」按钮 | fixed（web 解析 blockedBookIds 构建 Set 参与渲染 + ShelfDto 声明补齐） | 第 9 夜 |
| N9-102 | 2026-09-10 | P1 | web/pages/parent/ShelfManager.tsx | toggleBlock 硬编码 kind:'book'，听书分区屏蔽写入错误 kind 行（id 空间碰撞，N3-R1 要防的场景） | fixed（分区→kind 映射，albums 传 'album'） | 第 9 夜 |
| N9-103 | 2026-09-10 | P1 | migrations/20260910220000 | 金句唯一索引未先去重存量，含重复行的库 migrate deploy 会中断（部署阻断） | fixed（索引前 DELETE 保留每组最小 rowid） | 第 9 夜 |
| N9-104 | 2026-09-10 | P1 | web/pages/parent/SettingsPanel.tsx | 唯一建档入口硬编码 stage='6-8'，3-5/9-12 孩子共读卡梯度全失准 | fixed（建档表单三档年龄段选择器） | 第 9 夜 |
| N9-201 | 2026-09-10 | P2 | web/pages/parent/TonightPanel.tsx | alive 哨兵从不置 false（死代码），刷新按钮可致旧响应覆盖新状态 | fixed（aliveRef + effect cleanup） | 第 9 夜 |
| N9-202 | 2026-09-10 | P2 | web/pages/parent/ShelfManager.tsx | toggleBlock 失败静默无反馈（ready 态原样返回） | fixed（失败提示） | 第 9 夜 |
| N9-203 | 2026-09-10 | P2 | web/pages/parent/BindWizard.tsx + 走查脚本 | key 输入未掩码（屏显可旁观）；走查在 fill 后截图致真实 key 入截图 | fixed（type=password + 截图改在 fill 前） | 第 9 夜 |
| N9-204 | 2026-09-10 | P2 | server/modules/weread/shelf.ts | 指纹在写库前提交且逐行写无事务，中途失败后同步被永久跳过（半写滞留） | fixed（指纹改写库成功后提交，半写下次自愈） | 第 9 夜 |
| N9-205 | 2026-09-10 | P2 | server registry + shelf syncFingerprints | 注销家庭后进程内 Map（含解密 key 的服务实例/书架指纹）不清理且无界 | open：夜 11 e2e 批——deleteFamilyCompletely 后调用按 familyId 失效 + Map 容量上限（与 N3-006 同批） | 第 11 夜（计划） |
| N9-206 | 2026-09-10 | P2 | prisma/schema.prisma | schema @@unique 与手工部分索引漂移，下次 migrate dev 会检出并尝试补建 | wont-fix（文档化）：迁移文件注释已预警 drift；夜 15 部署前统一审计迁移目录 | 第 15 夜复核 |
| N9-207 | 2026-09-10 | P2 | server/test | 第 9 夜新功能测试缺口（settings 边界/家庭级覆盖/去重/夜键/注销级联） | fixed（night9.test.ts 6 用例：边界/越权/覆盖/级联 DB 断言/去重幂等/夜键唯一） | 第 9 夜 |
| N9-208 | 2026-09-10 | P2 | web/pages/parent/ShelfManager.tsx | mp 分区硬编码空数组，有收藏也显示空态矛盾 | fixed（分区按钮隐藏 mp，仅 books/albums 可管理） | 第 9 夜 |
| N10-001 | 2026-09-11 | P1 | server/modules/reports/routes.ts | 周报调度器 tick 异常逃逸成 unhandled rejection → 自部署环境整进程下线（无常驻拉起） | fixed（tick 全体 try/catch + setInterval .catch 双保险；签名删除死参数 app） | 第 10 夜 |
| N10-002 | 2026-09-11 | P2 | server/modules/reports/service.ts | 周报 upsert 为 find-then-create，并发双生成撞唯一键 → 500 | fixed（原生 upsert ON CONFLICT 原子化） | 第 10 夜 |
| N10-003 | 2026-09-11 | P2 | server/modules/reports/service.ts | 滚动日期（2026-02-30）被 Date 静默进位，返回错误周周报 | fixed（round-trip 分量校验拒绝 404 + 回归测试锁定） | 第 10 夜 |
| N10-004 | 2026-09-11 | P2 | server/modules/reports/service.ts | 周聚合窗口用规范化值当物理时刻，TZ≠UTC 时漂移 ±8h 错周带（与 N4-004 机制不同的新发现） | fixed（窗口改从本地日历分量构造本地午夜，与夜桶任意 TZ 对齐；存储键不变） | 第 10 夜 |
| N10-005 | 2026-09-11 | P2 | reports/service.ts + ReportPanel.tsx | 金句计数用截断后 length（≥13 句永远显示 12），SVG 摘要行漏改 | fixed（highlightsTotal 计数与展示分离，DTO/UI/SVG 三处对齐） | 第 10 夜 |
| N10-006 | 2026-09-11 | P2 | server/modules/reports/service.ts | 分享卡长书名/长划线横向溢出 1080 卡面破版 | fixed（截断 18/26 字加省略号；truncate 先于 esc 无转义残缺） | 第 10 夜 |
| N10-007 | 2026-09-11 | P2 | web/pages/parent/ReportPanel.tsx | blob URL 同步 revoke 可静默中断下载（Firefox 尤甚） | fixed（延迟 10s 回收） | 第 10 夜 |
| N10-008 | 2026-09-11 | P2 | web/pages/parent/ReportPanel.tsx | 导出失败清空整页周报且 onRetry 语义错位 | fixed（独立 exportError 局部提示，不动周报数据） | 第 10 夜 |
| N10-009 | 2026-09-11 | P2 | web/scripts/screenshot-night10.mjs | 走查种子宣称「两晚」实为同日 1 晚掩盖口径错误；金句从未 seed（死代码）；足迹断言宽松 | fixed（口径断言精确「共读 1 晚」；金句真实落库并断言可见） | 第 10 夜 |
| N10-010 | 2026-09-11 | P2 | server/test/reports.test.ts | share-card 路由零 HTTP 级测试；R3 滚动日期无回归锁（复审 N-3） | fixed（补 2026-02-30/2026-13-45 → 404 回归锁；share-card 路由 HTTP 用例列入夜 11 e2e 批） | 第 10 夜 |
| N10-R1 | 2026-09-11 | P3 | web/scripts/screenshot-night10.mjs | 走查脚本 mondayOf 死函数遗留 lint 失败 | fixed（删除） | 第 10 夜 |
| N11-001 | 2026-09-12 | P1 | server/demo/main.ts + index.ts | 演示隔离仅靠操作者自觉配独立库：共用 dev.db 跑 demo 后，演示 key（wrk-demo-key-0001）经正常入口+真实网关出网 | fixed（双向守卫：demo 入口强制 file:./demo|e2e-run 前缀否则拒启；正常入口检测库内 PEACH888 家庭即拒启） | 交付日 |
| N11-002 | 2026-09-12 | P2 | server/demo/mock-gateway.ts | mock /store/search 忽略请求 scope/count（硬编码 17/3），以 mock 为基准的契约测试会固化错误口径（N6-001 同型） | fixed（回显请求 scope、尊重 count） | 交付日 |
| N11-003 | 2026-09-12 | P2 | server/modules/weread/routes.ts | /api/search keyword 未 trim（纯空白通过，产生无效搜索与脏缓存键） | fixed（z.string().trim()） | 交付日 |
| N11-004 | 2026-09-12 | P2 | server/demo/seed.ts | 种子金句与当晚书籍错配（读《脑筋急转弯》落《小王子》划线，周报/共读卡张冠李戴） | fixed（按 session.bookId 从对应书目的金句池取） | 交付日 |
| N11-005 | 2026-09-12 | P2 | server/demo/mock-gateway.ts | mock 未知 api_name 静默返回成功（真实网关为错误），demo 全绿上线才炸 | fixed（default 分支返回 errcode:-2013 错误语义） | 交付日 |
| N11-006 | 2026-09-12 | P2 | server/demo/seed.ts + mock-gateway.ts | 注释漂移：DEMO8888→PEACH888、TAO_DEMO=1→独立入口无开关 | fixed（两处注释对齐实际隔离模型） | 交付日 |
| N11-007 | 2026-09-12 | P2 | server/modules/weread/routes.ts | /api/search 适龄过滤押注「真实网关 search 回包含 category」未验证假设（N6-001 同型，fail-closed 不破红线但功能可能全灭） | open：真实接入联调时用真实网关打一发 /store/search 校准字段；若无 category 需经 BookCache 二次判定 | 真实接入前 |
| N11-008 | 2026-09-12 | P2 | e2e/demo-parent.spec.ts | 家长 e2e 末步注销删除共享演示家庭，后续 visual spec 无家可入（测试顺序耦合） | fixed（注销流拆至字母序末位 zz-teardown spec；家长 spec 保持非破坏性） | 交付日 |
| N11-009 | 2026-09-12 | P2 | server/modules/reports/service.ts | 周报金句列表重复文本（种子轮换+不同晚划同句），演示观感差 | fixed（展示按文本去重，计数同步 dedupeByText） | 交付日 |
| N11-R1 | 2026-09-12 | P3 | e2e/playwright.config.ts | 首版 npm 脚本 unlink e2e.db 在 Windows 文件占用下静默失败，跨运行状态污染（症状：登录即见续传卡） | fixed（改唯一时间戳库 e2e-run-*.db，零清理零竞争） | 交付日 |
| N12-001 | 2026-09-16 | P0 | web/lib/api.ts | ttsVoices/ttsPreview/videoGenerate/videoStatus 四处未传 token → request 不带 Bearer → 401 → 全局 signOut 把孩子踢回登录页（一打开阅读器即触发） | fixed（request 增加会话令牌回退：显式 token 优先，未传时回退 useSession.token；登录前接口无会话时正确不带 Bearer；+3 回归测试） | 第 12 夜 |
| N12-002 | 2026-09-16 | P0 | web/lib/haptics.ts | navigator.vibrate 解耦引用未绑 this → Chromium 抛 Illegal invocation；haptic('chapter') 跑在 loadChapter 之前，同步抛出中断翻章（e2e 4 处失败的共同根因；node 单测无 navigator 抓不到，只有 e2e 能抓） | fixed（.bind(navigator) + try/catch 兜底；+1 回归测试断言「抛错时不中断调用方」） | 第 12 夜 |
| N12-003 | 2026-09-16 | P1 | server/modules/media/routes.ts | MIME 表无 .mp4 → 生成的章节动画以 octet-stream 下发，浏览器 <video> 拒播或触发下载（视频链路唯一跑通的那一次就翻车） | fixed（补 'video/mp4'） | 第 12 夜 |
| N12-004 | 2026-09-16 | P2 | server/scripts/label-art.mjs | 用法注释写 `node scripts/label-art.mjs`，实跑 ERR_MODULE_NOT_FOUND（import 的是 TS 源）；且 join(process.cwd(), rel) 在仓库根跑报 32 个假「文件缺失」 | fixed（注释改 npx tsx；路径改从 import.meta.url 解析，cwd 无关；docs/14 复现命令同步） | 第 12 夜 |
| N12-005 | 2026-09-16 | P2 | server/test/reports.test.ts | 调度器测例固定睡眠 60ms 等 setInterval(10ms) 落库，机器高负载定时器饥饿时误报失败 | fixed（改 untilCount 轮询条件，时序依赖变确定性断言） | 第 12 夜 |
| N12-006 | 2026-09-16 | P2 | server/vitest.config.ts | argon2+SQLite 用例高负载偶发 4-6s 超默认 5s 门，全量门偶发误报 | fixed（testTimeout: 20_000 并注明原因） | 第 12 夜 |
| N13-001 | 2026-09-18 | P1 | scripts/demo.mjs | N11-105/N11-006 登记为 fixed 的「DEMO8888→PEACH888 注释漂移」实际只改了 seed.ts/main.ts，启动脚本 demo.mjs 第 2/80 行仍是 DEMO8888。用户照横幅输入被正则 `/^[A-HJ-NP-Z2-9]{8}$/` 拒掉（字母 O 被排除），报「家庭码格式不正确」无法进入演示 | fixed（两处改 PEACH888；curl 验证 /api/family/join 返回 200） | 第 13 夜 |
| N13-002 | 2026-09-18 | P0 | server/demo/main.ts | 演示入口只接了 mock 网关，ttsDeps/imageDeps/videoDeps/mediaDir 四个参数全缺：TTS 降级 Web Speech（机器人声）、封面题图回退 SVG 矢量图、「让画面动起来」按钮不渲染。用户验收打 0 分的直接原因 | fixed（按配置可用性接线 + 新增 seed-media.ts 从 dev.db 幂等播种 +279 插画/+200 视频；实测书架 40 张 AI 插画、阅读器真实 video、TTS 返回 200 带字级时间轴） | 第 13 夜 |
| N13-003 | 2026-09-18 | P0 | server/modules/media/imagegen.ts | STYLE 四个反模式：强制夜景压暗白天场景 / 水彩+彩铅混媒材发糊 / 反向词「no text」走正向通道诱导文字 / 主体居中大片留白；且 1K 档清晰度不足 | fixed（单一水彩+清晰线稿、按描述关键词分流夜景、正向表述 wordless、构图改饱满分层、档位 1K→2K；亮度 133→165 客观验证） | 第 13 夜 |
| N13-004 | 2026-09-18 | P2 | web/pages/child/BookShelf.tsx + LoginPage.tsx | 书架顶栏与登录页缺乏品牌氛围；登录页月亮徽章裸循环无 reduced-motion 门控 | fixed（星光装饰层+毛玻璃按钮、蜜桃渐变标题、reduced 门控） | 第 13 夜 |
| N13-005 | 2026-09-18 | P1 | web/pages/child/BookShelf.tsx | 收藏按钮 h-10 只有 40px，违反孩子端 ≥64px 触达红线，52 个书卡全部违规（DOM 实测发现） | fixed（min-h-touch w-16，实测 64px） | 第 13 夜 |
| N14-001 | 2026-09-18 | P1 | web/pages/ChildHome.tsx + web/pages/child/DepartureScreen.tsx | 出发屏对 cbf: 自研书显示「请爸爸妈妈在微信读书里找到这本」——自研书不在微信读书，M2 选书流/超时续读无进阅读器通道（产品级死路，N7-001 同型） | fixed（DepartureScreen 增 onStartReader 通道，cbf: 书「开始阅读」直达阅读器） | 2026-09-18 |
| N14-002 | 2026-09-18 | P1 | web/pages/ChildHome.tsx + web/lib/api.ts | 自研书书名解析错走微信书 info 接口（cbf: 前缀必 404）；contentBook 回包 {book} 包裹未拆包，出发屏书名渲染成空《》 | fixed（cbf: 前缀分流走 /api/content/books/:id + 拆包） | 2026-09-18 |
| N14-003 | 2026-09-18 | P1 | web/pages/child/BookPicker.tsx + ReadyScreen.tsx + DepartureScreen.tsx | 孩子端裸渲染微信 CDN 外链封面（book.cover），ORB 拦截成 5 张坏图，且向第三方 CDN 泄露孩子 IP（隐私红线） | fixed（只挂载 /api/ 本站封面，外链一律本地 SVG 场景回退，孩子端零外链） | 2026-09-18 |
| N14-004 | 2026-09-18 | P2 | web/pages/child/BookDetail.tsx | 吸底渐变引用不存在的 night-bg 令牌（tailwind 从未定义），渐变静默失效 | fixed（paper-100 渐变） | 2026-09-18 |
| N14-005 | 2026-09-18 | P2 | web/pages/child/ReaderScreen.tsx | 朗读主按钮紫色 #7E57C2 / 旧蜜桃渐变，与色板严重脱节（历次换肤漏网） | fixed（赤陶纯色 #D97757 / #C15F3C） | 2026-09-18 |
| N14-006 | 2026-09-18 | P3 | server/modules/media/videoRoutes.ts | /api/video/:scene 对无记录场景回 404，SceneVideo 每章探测打 404 进 console 噪音 | fixed（回 200 {status:'none'}，前端静默回退） | 2026-09-18 |
| N15-001 | 2026-09-19 | P1 | 旧包 25 个文件（poetry-tang/libai/dufu/wangwei/children/songci、primer-*、tale-* 等） | 105 个章节缺 artPrompt，gen-art 只能退化成通用提示词，插画与章节内容对不上 | fixed（逐章按内容补写画面描述，15-40 字） | 2026-09-19 |
| N15-002 | 2026-09-19 | P1 | primer-sanzi/dizigui/qianziwen/baijiaxing/zengguang、poetry-tang、tale-pooh、original-cottoncandy | 6 组 art 场景键跨书复用（primer-scroll 被五本蒙学书共当封面），两本书共用同一张生成图 | fixed（逐个改键 + 重新生成） | 2026-09-19 |
| N15-003 | 2026-09-19 | P1 | web/pages/child/ReaderScreen.tsx | 正文 image 块只走 40 张手绘 SVG 场景库，新书 400+ image 块绝大多数回退成通用「书架」图——图片与书库严重不对齐 | fixed（block DTO 增 artUrl；image 块改用 BookCover 与封面同管线；gen-art 遍历块级场景生成；663 张插画逐一核对 0 缺失） | 2026-09-19 |
| N15-004 | 2026-09-19 | P3 | primer-sanzi/poetry-tang/story-xiyou | 3 个 note 块用独立 art 键（jade-stone/rice-bowl/cloud-flight），与其余 note 块的 lamp-hint 约定不一致 | fixed（统一 lamp-hint） | 2026-09-19 |
| N15-005 | 2026-09-19 | P3 | tale-grimm/tale-junglebook | 两个章节对象缺 art 键，章节题图回退派生键 | fixed（补 red-cap-path / red-dogs-river） | 2026-09-19 |
| N15-006 | 2026-09-19 | P3 | server/test/content.test.ts | 书库扩到 103 本后 beforeAll 的 seed 耗时超 vitest 默认 10s hook 超时，content 测试整套假失败 | fixed（beforeAll 显式 120s 超时） | 2026-09-19 |
| N16-001 | 2026-09-20 | P2 | server demo seed（mood 枚举值） | 收尾屏心情按钮渲染 🌱🌟🏆 等数据库 emoji 枚举值（前端已换线性图标，数据层仍是 emoji），违反「UI 不用 emoji」红线的数据半区 | open（改 mood 枚举需迁移 demo.db+server 枚举+e2e 断言，单独窗口处理） | docs/26 |
| N16-002 | 2026-09-20 | P2 | apps/server/scripts/gen-video.ts | 云端免费档视频队列经常满（一次 20 单全拒），1393 场景视频覆盖率仅 19%；插画已 100% 兜底不影响阅读 | open（写幂等循环分批重试；或升级付费档） | docs/26 |
