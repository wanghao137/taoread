| N11-101 | 2026-09-12 | P1 | modules/family/routes.ts | 凭家庭码 join 可自选 parent 角色——儿童拿到家庭码即可自升家长权限（改设置/解屏蔽/注销全家）。v1 架构「家庭码即身份」（docs/02 §4.5）的已知取舍，家庭信任模型内风险可控 | wont-fix（v1.0 登记接受）：v1.1 计划家长 PIN 领取制（首设备claim + 后续凭 PIN） | v1.1（计划） |
| N11-102 | 2026-09-12 | P1 | modules/ritual/window.ts | bedtimeMin=0（合法值）时 >=0 恒真 → 全天就寝锁定，与注释语义（仅 00:00-06:00）不符 | fixed（isBedtime 0 值分支 + 回归测试锁定） | 第 11 夜 |
| N11-103 | 2026-09-12 | P1（误报结案） | services/weread/registry.ts | 审查员推测重绑 key 不逐出缓存实例 | wont-fix：误报——registry.get 每次 getKey 比对 namespace 哈希，换 key 即重建（注册表注释+夜 3 测试双证据） | 第 11 夜 |
| N11-104 | 2026-09-12 | P2 | modules/family/routes.ts | 绑定探针把网关 429 误判为「key 无效」（暂时性错误被 fail-closed 误导用户） | fixed（429 归入 unverified 临时态，与网络/5xx 同类） | 第 11 夜 |
| N11-105 | 2026-09-12 | P2 | demo/seed.ts+main.ts | 主密钥双源（seed 直读 env 回落字面量 ≠ config 路径）；DEMO8888 注释漂移；seed 冗余回写 | fixed（masterKey 参数单源传入、注释对齐 PEACH888、删冗余 update） | 第 11 夜 |
| N11-106 | 2026-09-12 | P2 | modules/weread/shelf.ts | 并发首次书架同步同键双 create 撞唯一键 → 一次 500（下次自愈） | fixed（create 改 upsert，update 不动 blocked 保 N3-001） | 第 11 夜 |
| N11-107 | 2026-09-12 | P2 | index.ts | 护眼闸 fail-open 缺省（app 层 ?? null）无可见性 | fixed（生产入口启动打印闸状态；测试域缺省 off 为既定可测性决策） | 第 11 夜 |
| N11-108 | 2026-09-12 | P2 | modules/family/routes.ts | bind 探活直连网关绕过服务级限流；认证路由无 IP 节流 | open：v1.1——探活纳入令牌桶 / bind 按家庭节流（当前绑定为每家庭一次性动作，实害低） | v1.1（计划） |
