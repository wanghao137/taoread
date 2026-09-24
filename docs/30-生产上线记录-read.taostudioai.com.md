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
