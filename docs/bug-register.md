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
