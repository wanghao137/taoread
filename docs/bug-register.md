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
