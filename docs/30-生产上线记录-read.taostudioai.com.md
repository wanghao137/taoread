# 桃阅读生产上线记录（read.taostudioai.com）

日期：2026-09-23。执行：ZCode agent。配套：[交接文档](audit-2026-09-23/未完成工作全量交接与执行验收.md)、[零预算部署研究](audit-2026-09-23/零预算子域名部署研究与开发接管.md)。

## 1. 本次代码交付（commit fa90ea9 + 后续）

| 工作包 | 内容 | 验证 |
|---|---|---|
| B3 | 家庭导入进度契约：非末章禁 `completed=true`；完成态粘滞（回看不清完成，与正文域 T04 口径一致）；`baseUpdatedAt` 陈旧写保护（乱序返回 409 PROGRESS_STALE + 服务器最新进度） | test/importProgress.test.ts 6/6 |
| A1 | `GET /api/family/:id/sessions` 设备列表（家长、含已撤销、`current` 标记）；设置页"已登录设备"卡（可请出）；旧家庭家长码回填脚本 `scripts/backfill-parent-codes.ts`（dry-run/--apply，对照表写本地不入库） | test/deviceSessions.test.ts 3/3；隔离库 dry-run+apply 实测 |
| A3 | 生成费用边界：同场景并发去重（20 并发→1 次上游）；每家庭每日配额（`TAO_DAILY_GEN_LIMIT` 默认 60，插画+动画合计按 DB 计数，幂等命中不计不受限） | test/genQuota.test.ts 2/2 |
| B2 | 主阅读器保存状态机：失败可见（顶栏"保存中/已保存/没存上，重试中"）、8s 自动重试、`pagehide`/`visibilitychange` keepalive 兜底提交；家庭书阅读器接 409 后收敛到服务器进度 | tsc 清洁；web 125/125 |
| 拼读 v1 | GB 口音 8 课（Letters and Sounds Phase 2 顺序 s,a,t,p / i,n,m）；每词机器校验只含已教 GPC（未教 c 的 cat 被拦截自证）；三题型（看字听音/合成/分音）+ 6 篇原创可解码短文；续做 API（active attempt）；孩子端完整一课流程（示范→练→短文→温和结束，暂停可续）；家长练习记录 | test/phonicsContent.test.ts 7/7 + importPhonics 6/6。**仍为 draft：无音频、无教学签认，默认关闭** |
| 部署 | `@fastify/static` 同源 SPA（`TAO_STATIC_DIR`）；`TAO_MEDIA_DIR` 独立媒体卷；`TAO_DAILY_GEN_LIMIT` 入 config | 冒烟五项：/ 200 html、/parent 200 html 回退、/api/health 200 json、/api/nope 404 json、/assets 200 js |

门禁基线：server vitest **366/366**、web vitest **125/125**、eslint/tsc/audit:touch 全绿（本次新增测试 16 个）。

## 2. 生产拓扑（零新增预算）

```
Cloudflare Tunnel（本机 Windows 服务，已运行）
  read.taostudioai.com  → http://127.0.0.1:8091   （新增）
  cpa.taostudioai.com   → http://127.0.0.1:8317   （保留未动）
       ↓
Node (Fastify) @ 127.0.0.1:8091，同源托管：
  /api/*   → 服务端路由
  /media   → 媒体静态（家庭票据/realpath 防越界）
  其余     → apps/web/dist SPA（index.html 回退）
       ↓
SQLite D:\taoread-prod\apps\server\prisma\prod.db（由 dev.db 复制：30 家庭 + 222 书 + 3004 媒体台账）
媒体卷   D:\taoread-prod\apps\server\media\（1.7G robocopy 全量同步）
```

- 目录：`D:\taoread-prod`（独立 git clone @ fa90ea9；开发仓库 `D:\codesolo\taoread` 互不影响）
- 配置：`D:\taoread-prod\apps\server\.env`（沿用 dev 主密钥 → 已绑定的微信读书 key 与既有令牌继续有效；NODE_ENV=prod、TAO_ALLOWED_ORIGIN=https://read.taostudioai.com、TAO_TRUST_PROXY=true）
- 进程守护（用户级，无需管理员）：`bin\watchdog.cmd`（崩溃 5 秒自动拉起）已运行；启动文件夹放同名脚本（登录自启）；计划任务 `taoread-watchdog` 创建被拒（ONLOGON 需管理员）——已用启动文件夹替代
- 日志：`D:\taoread-prod\logs\service-out.log`（10MB 轮转需 NSSM，用户级方案为追加）

## 3. 备份与恢复（R2 离机）

- 脚本：`apps/server/scripts/backup-to-r2.mjs`（dev/prod 同名）+ `bin\backup.cmd`
- 行为：SQLite `VACUUM INTO` 一致快照（服务运行中可执行）→ 上传 `db/`（保留 7 份）→ `media/` 增量同步（`.backup-state` 水位，失败不推进）→ R2 桶 `taoread-backup`
- 凭据：`D:\taoread-prod\apps\server\.env.r2`（R2 专用 API key，gitignored）
- 首次运行（2026-09-23）：桶已建、DB 快照 9.5MB 已传、媒体全量 1.7G 上传
- 计划任务 `taoread-backup`：每日 03:30（用户级，已创建）
- **恢复步骤**：装 Node 24 → clone 仓库 → `npm ci && npx prisma generate` → 下载 R2 最新 `db/backup-*.db` → `prisma/prisma/prod.db` → robocopy R2 `media/` → `.env`（主密钥保管在离机密码库）→ `node --import tsx src/index.ts`。**RPO ≤24h（数据库）/ ≤24h（媒体），RTO ≈1h。**
- 首次实测：✓（见 `D:\taoread-prod\logs\backup.log`）

## 4. 公网开放前还差两步（需要账户持有人）

1. **重启 cloudflared 服务**（应用已写入的 read hostname 配置）：
   - 双击 `D:\taoread-prod\bin\finish-install.cmd`（会弹 UAC，点"是"）；它会顺带把 NSSM 服务参数补齐并启动——即使不用 NSSM 也无妨，看门狗已是主守护。
   - 或手动：服务管理器重启 `cloudflared`。
2. **DNS 替换**（Cloudflare 控制台 → taostudioai.com → DNS）：
   - 删除错误的 `read` A 记录（当前指向 127.0.0.1，公网不可达）；
   - 添加：类型 `CNAME`、名称 `read`、目标 `8a934dcf-aa45-4d0b-a460-8faa9db0fcfc.cfargotunnel.com`、代理状态开启（橙云）。
   - （部署 agent 的 API 令牌为 R2 作用域，无 DNS 权限；本机 cert.pem 亦不能签 DNS API，故留人工。）

### ✅ 2026-09-24 更新：以上两步已全部完成，站点已上线

- cloudflared 已于 09-24 07:16 带新配置重启（用户执行 finish-install.cmd 提权成功）；taoread-api（NSSM）服务 RUNNING，接管 8091。
- DNS `read` 记录已由 agent 经 opencli 浏览器自动化在控制台创建（CNAME → `<tunnel-id>.cfargotunnel.com`，Cloudflare 面板将其识别为「隧道」类型、已代理，与 cpa 同款）。
- **公网验收实测（经 Cloudflare 边缘）**：`/api/health` 200 JSON；SPA `/`、`/parent`、`/login` 均 200；静态资源 200；PEACH888 家长码公网登录成功、书库 222 本、拼读 8 课目录、越权请求 403。
- 已知残留：本机/部分 ISP 解析器缓存了旧的 127.0.0.1 答案（TTL 内自愈，手机蜂窝网通常更快）；「双家庭隔离」「整机重启自恢复」「手机蜂窝网实测」三项待后续复验。

完成后公网验收清单：`https://read.taostudioai.com` 首页/深链刷新/`/api/health`；PEACH888 家长码登录；双家庭隔离；手机蜂窝网访问；重启整机后自恢复。

## 5. 安全与合规状态（诚实边界）

- 家长码：生产 30 个旧家庭已全部回填（对照表在 `docs/audit-2026-09-23/production-parent-codes.json`，**已 gitignore，请线下妥善保管并转告各家庭**；泄露可让家长在设置页"重新生成"）。
- 撤销时效：单进程即时生效；多进程部署最长 30s TTL（`lib/sessions.ts` 声明）。
- 内容权利：222 本的来源元数据在库（pd/pd-us/adapted/cc-by/original），但**逐书人工版权签认未完成**——这是内容方（非工程）的上线前置项。
- 拼读：默认关闭 + "内测草稿"标签；**不得宣称教学有效性**；音频需专业录制/听审后才能启用。
- 未验证项：真实手机端、键盘/读屏、生产供应商（生图/TTS/视频）真实出网计费、整机重启演练（服务自启链路已装，待下次重启验证）、CI 在远端的真触发。

### ✅ 2026-09-25 更新：家长码事故根因 + 单一家庭码简化 + 阅读时间限制取消 + docs/31 首批修复卡落地

**家长码「用不了」根因（实测复现）**：`/api/family/join` 的 IP 限流按 `request.ip` 记桶，而生产拓扑是 Cloudflare Tunnel → 127.0.0.1，**全站访客共享同一个 127.0.0.1 桶（容量 5、每分钟回 10）**。09-24 部署当晚的验收 curl 已把桶打空，用户随后每次尝试都撞 429，表现即「码用不了」。家长码 Y37ULWT5 本身始终有效（当日复测 200）。已修复：限流改按 `CF-Connecting-IP` 区分真实访客（本机直连回落 request.ip）。

**产品简化（用户决策）：单一家庭码**。家庭码 12345678 通吃家长/孩子，登录页只输一个码 + 选「爸爸妈妈 / 小朋友」；家长码字段、设置页「家长码」卡与查看/轮换端点全部移除（schema.parentCode 列保留不参与鉴权，旧客户端传参被忽略）。权衡说明：孩子设备可自行选家长角色进家长端——这是用户为简化做出的明确取舍；删除家庭等高危操作保留确认弹窗。

**阅读时间限制取消（用户决策）**：就寝闸（cosession 403 RITUAL_CLOSED）、仪式窗口（恒 open）、5 分钟超时引导、设置页「休息时间」入口全部停用；孩子全天候可读。`Family.bedtimeMin` 等字段保留但不再参与判定。

**docs/31 首批代码卡落地**（R-05/R-06/R-08/R-04/R-03/R-07，详见任务书）：
- R-05：底栏 3 列→5 列自适应（44px 触达、320px 无换行无溢出、≤460px 缩字号、「英语小练习」→「英语练习」防截断）；`.finish` 小高度（≤640px）从顶部排布防遮挡。
- R-06：登录页 AI 说明弹层补齐焦点闭环（打开移焦到关闭钮、Tab/Shift+Tab 圈定、Escape 关闭、关闭回焦触发钮）。
- R-08：eslint flat config 声明 SW worker 全局（self/caches/clients），`npm run lint`/`verify` 恢复绿灯。
- R-04：公版阅读进度加 `baseUpdatedAt` 行版本——服务器发现旧写（>1.5s 容差）返回 `stale:true` + 服务器现状，客户端不再覆盖；旧客户端缺省兼容。新增乱序覆盖测试。
- R-03：生成额度检查移入家庭级临界区（`gen:${fid}`，插画+动画共用一把锁），跨场景/跨域并发不再各自读到同一份余额。生产为单进程，进程内即完整边界；**多进程部署需另建预留表（遗留）**。
- R-07：全局安全头 nosniff / X-Frame-Options SAMEORIGIN / Permissions-Policy 收窄。完整 CSP 与依赖升级（fastify/react-router 主版本）未动，按任务书需独立评估。

**验收证据**：`npm run verify` 全绿（audit:touch + typecheck + lint + server 355 + web 125）；生产实测单码家长/孩子 join 均 200、错码忽略、错家庭码 404；Playwright 320×568 与 375×667 底栏五项单行 `hOverflow=0`；弹层 initialFocus=「知道啦」、Tab 圈定、Escape 关闭全部通过；边缘响应含新安全头。

**docs/31 仍未闭环（如实列出）**：R-00（E2E Schema engine 报错未修）、R-01（注销全链路删除，需产品/法务决策）、R-02（隐私告知与同意留痕，需政策文本）、R-07 依赖升级与 CSP 收紧、R-09（性能/灾备测量演练）、R-10（逐书版权签认、真实设备与读屏走查、供应商成本验收）。

### ✅ 2026-09-25 更新（二）：性能方案落地——图片缩图上 R2 + 语音公共预生成

**瓶颈实测（手机端"整体慢"的量化）**：源站=家庭宽带上行（实测约 95KB/s）；封面图中位 364KB、章节图 339KB（3004 张/1.1GB），书架一屏 60 本 ≈ 22MB；图片边缘首拉 4.4s；语音为实时逐段合成（首段 15-21s+，段间串行，缓存按家庭隔离，缓存仅 49 段）——"图片慢、语音更慢"全部量化坐实。

**已落地（commit 待填）**：
1. **缩图管线**：`sharp` 生成 320w thumb（约 20-40KB）+ 800w reader 档；存量 6008 个变体已生成（0 失败）；新图在 artRoutes 落库时自动生成。媒体路由新增变体公共分支（基准素材公共才放行）；书单/详情/阅读器 DTO 返回 `coverThumbUrl`/`artReaderUrl`（TAO_MEDIA_PUBLIC_BASE 配置时为 R2 绝对地址）；前端三级加载 缩图→原档→SVG，静默回退。
2. **R2 公共媒体域**：新建桶 `taoread-media`（S3 API 创建），绑定自定义域 **media.taostudioai.com**（面板自动化），公共资产从此不消耗家庭上行。
3. **语音公共预生成**：`pregen-tts.mjs` 按"与服务端完全一致"的切分/音色（mom-warm）/语速（0.92）/模型逐章合成；公共命名空间 `__public__`，命中不计配额、不写归属；已上传 R2 → 外发域名，仅本地 → 源站 `/api/media/tts-public/` 兜底。清单 `media/.tts-public-state.json`（原子写+mtime 惰性重载）。**《三字经》实测整章朗读 25s+ → 0.86s 出声**（真浏览器验收，高亮正常推进）。
4. **坑记录**：pregen 曾按整本书拼块切段，与服务端"按章切分"键不匹配 → 已改逐章；高并发(10)预生成会打满上行拖慢 API（章节接口 1s→11.8s）→ 合成阶段 `--no-upload` 本地落盘、上传放夜间；`db.book.findMany` 嵌套 select 在 sqlite 触发引擎 panic → 改分步查询。
5. **深链修复**：直链进阅读器（/child/book/:id/chapter/:n）时书单未拉取导致永久"先去挑一本书"——ReaderRoute 未加载时补拉书单并显示加载态。

**运行中**：3-5/6-8 岁段合成（并发 8，本地落盘）；夜间自动化（每天 04:30，避开 03:30 备份）续跑剩余段（含 9-12）并上传 R2。

**验收**：verify 全绿（355+125）；真浏览器（375×667）——书架缩图 0 破图、底栏 5 项单行、朗读 0.86s 出声+高亮推进、家长端设置无家长码/休息时间残留、单码登录全流程通。

### ✅ 2026-09-25 更新（三）：朗读两 bug 根因修复（真浏览器复现实证）

**Bug1「音频加载失败，请稍后再试」**：浏览器对 `audio.src = ''` 会触发 `MEDIA_ELEMENT_ERROR: Empty src (code=4)`（空 src 解析成页面 URL），错误监听器误判为加载失败弹 toast——即使音频实际在正常播放。修复：错误监听器忽略 `currentSrc` 为空的错误；重试与停止路径改用 `removeAttribute('src')`。

**Bug2「高亮快于声音 + 下半部分不高亮」**（两个独立根因叠加）：
1. **时长半倍**：`parseMp3` 对 MPEG-2/2.5（低采样率）帧沿用 MPEG-1 的帧长系数 144（应为 72），逐帧扫描隔帧跳过 → durationMs 恰好少一半（实测 seg0 6792ms vs 实际 13584ms）→ 字级时间轴压缩一半 → 高亮两倍速跑在声音前面、段内后半程冻结。修复系数并写 `fix-tts-durations.mjs` 重算存量：家庭缓存 60/60、公共清单 3145/3145 全部修正。
2. **注释块无高亮**：`note` 类块（New word 生词卡）渲染时没挂 `speaking` 类/逐字渲染——朗读到注释卡（常在章节下半部分）时高亮完全消失。已补上。
3. 附带加固：高亮映射改为「章节全文全局对齐」（段起点在全文定位 → 全文偏移 → 块区间），覆盖长块被切段边界的尾段（此前 indexOf 整块文本必然 miss）；时间轴给换行/破折号加停顿权重。

**验收**：verify 全绿（355+125）；真浏览器（桌面视口）走用户报障原文同一章（en-nonsense ch1）——全程 0 次 toast、高亮从诗句块推进到生词卡块（HL_BLOCKS 两段见证）、播放自然结束；中文三字经 ch2 回归正常。
