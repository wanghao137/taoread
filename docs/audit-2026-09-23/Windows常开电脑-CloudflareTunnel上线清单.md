# 桃阅读 Windows 常开电脑 + Cloudflare Tunnel 上线执行清单

日期：2026-09-23。目标：`https://read.taostudioai.com`；不采购服务器或数据库。此文为上线准备与可回退演练，不代表已发布。

## 已核对的机器与仓库事实

- 本机 Windows、Node 24、`cloudflared` 2026.5.1；`Cloudflared` 服务处于 Running/Automatic。没有检测到 Caddy；8787、5173、8080、80、443 此时均无监听。**已有 cloudflared 服务可能属于其他站点，不改其配置或重装服务。** 仅凭服务状态不能确定它连接了哪个 Tunnel。
- 权威 DNS 查询为 `alex.ns.cloudflare.com`、`deb.ns.cloudflare.com`；用户已确认能登录域名 Cloudflare 账户。仍需在控制台核对 `read` 记录、现有 Tunnel、账号/zone 所属及该服务是否供其他站使用；绝不覆盖主站或现有 Tunnel。
- Prisma 数据源为 SQLite；数据库与磁盘媒体必须保存在可持久化目录。当前本机 `apps/server/media` 约 1,813,815,925 字节、3321 个文件；`apps/server/prisma/dev.db` 约 6.9 MB。**dev.db、demo.db、test.db 均不能直接认作生产库。** 当前 `dev.db` 曾被本轮一次误触迁移，需在建立生产库前核实来源/数据。
- `TAO_HOST` 默认 `127.0.0.1`；生产 CORS 必须显式设置 `TAO_ALLOWED_ORIGIN=https://read.taostudioai.com`。前端构建默认同源 `/api`；周报由单进程内调度器按本地时区运行。

## 架构

```
浏览器 HTTPS → Cloudflare read 子域名 → 现有或新增独立 Tunnel
                                            ↓
                               本机 127.0.0.1:8080 HTTP 反代
                                ├─ /api/* → 127.0.0.1:8787 Fastify
                                └─ /* → apps/web/dist（SPA 回退）
                                    SQLite 生产库 + apps/server/media
```

Windows 上可使用专用 Caddy 进程作本机 HTTP 站点（配置示意；初次使用前先校验工作目录与路径）。Caddy **只监听回环地址**，Cloudflare 负责外网 HTTPS；无需向互联网开放本机 80/443，也无需为此重设主站 DNS。

```caddy
http://127.0.0.1:8080 {
  handle /api/* {
    reverse_proxy 127.0.0.1:8787
  }
  handle {
    root * "D:/codesolo/taoread/apps/web/dist"
    try_files {path} /index.html
    file_server
  }
}
```

若选实际部署专用目录，替换上面的绝对路径，运行前核对 Caddyfile 与语法。保持 `TAO_HOST=127.0.0.1`、`PORT=8787`，不启用开放式端口映射。`TAO_TRUST_PROXY=1` 仅在明确反代/代理头链路并核对限流 IP 后启用，不能未经验证直接信任外网伪造的转发头。

## 准备与本机私测

1. 在独立目录/独立账户准备生产配置和持久化存储；先盘点现有数据来源，明确是迁移旧家庭还是创建空库。不要把仓库内 `.env`、`dev.db`、`demo.db` 直接复制为线上。检查机器可用空间、休眠、断电重启、系统更新和实际上传带宽；预计媒体与备份至少需数 GB，容量上限以实测为准。
2. 保持 AI 生图、视频、第三方 TTS 的密钥未配置，避免付费出网；可降级浏览器朗读，相关体验另做验收。生产密钥单独生成、离线保管，绝不进 Git/文档/日志，必须和未来数据库备份一起制定恢复方案。
3. **先在复制的数据库和媒体上**演练 migration、内容初始化、存量家庭身份恢复、SQLite 一致备份和恢复。生产库首次初始化前核对 Prisma 的 `file:` 路径实际解析位置；SQLite 新库可能需要先创建文件，不能以 migration 命令成功输出之外推断位置正确。每次演练都核对绝对文件路径、大小、迁移列表与恢复后的实际 API。
4. 在本机跑 `npm run audit:touch`、`npm run typecheck`、`npm run lint`、`npm run test`，完成触达问题、浏览器 E2E、手机端与权限/注销/超时媒体测试。完成内容版权审签、旧家庭恢复和持久数据删除策略后再允许普通用户注册。当前代码修复尚有未提交改动，发布版本必须冻结并记录来源；未经用户明确要求不提交/推送。
5. 在隔离实例构建 `apps/web/dist`，通过本机反代测试首页、深链、`/api/health`、阅读进度、私有媒体、播放超 5 分钟后的续播、关停重启与恢复。监测日志是否泄露 URL 票据、Token、家庭数据。验证 Windows 登录前/断线后应用、反代和 Tunnel 自动恢复，并制定单实例维护/备份窗口。

## Cloudflare 控制台上线步骤（在本机私测通过之后）

1. 在 `taostudioai.com` 对应 zone 备份/截图现有 DNS、检查是否已有 `read` 记录和公共 hostname；确认现有 `Cloudflared` 服务连接哪条 Tunnel、是否承载其他服务。必要时建立**独立的桃阅读 Tunnel**与服务，不修改已有主站路由。
2. 在 Cloudflare Zero Trust 的 Tunnels 中为 `read.taostudioai.com` 添加 Public Hostname / Published application，服务地址填 `http://127.0.0.1:8080`。**注意：这里的 `127.0.0.1` 是运行 cloudflared 的机器；若要复用当前服务，须先验证它确实在这台常开电脑上并属于该 zone。**仅由这一条 hostname 修改/生成 `read` DNS，不动 apex 和 `www`、邮件相关记录。不同控制台版本菜单名称可能变化，以当期官方文档与控制台为准。
3. 先通过只有操作者可访问的测试 hostname/访问策略走通公网验收，再切到 `read`；公开访问之前记录回退点。核对 TLS、DNS、同源 API、私有资源鉴权、Range 视频、移动网络、错误页、日志和刷新深链。若需要整站访问控制，应在 Cloudflare Access 上单独配置并测试；不能只给 `/api` 加保护而忘记公开页面。
4. 回退：撤销/禁用新加的 `read` 公共 hostname 与对应 DNS 记录，保留原站；停止桃阅读专用服务，恢复数据库一致备份并同步媒体版本。DNS 回退不能替代数据回滚，迁移回滚不能删除上线后用户新数据，必须先冻结写入并做新备份。

## 零预算边界和当前阻断

无需 Supabase：这台常开电脑已可承担 SQLite、约 1.81 GB 媒体与 Node 服务。Cloudflare Tunnel 只是连通，不是数据库、媒体存储或备份。域名续费、电费和网络是已有成本；免费计划和媒体流量政策以账户条款、实际使用情况复核，不承诺无限量。

不能现在直接对所有人开放：审计清单 T02 旧家庭恢复、T04/T05 进度和续读、T08 内容审签、T10 备份恢复等仍未验收；`npm run audit:touch` 曾有 10 项失败。AI 第三方功能禁用时要显示正确降级；英语自然拼读课程仍未交付。旧 `docs/29-线上部署方案-read.taostudioai.com.md` 是付费 Linux VPS 文档，不适用于本机零新增预算部署。
## 2026-09-23 实测补充：R2/D1 与旧 cpa Tunnel

- `cpa.taostudioai.com` 已由用户明确授权停用或删除。本机 `C:\ProgramData\cloudflared\config-svc.yml` 仅有此 hostname 指向 `127.0.0.1:8317`；同名备份 `config-svc.backup-20260923.yml` 已存在，当前服务运行且 ingress 配置校验通过。尚未修改或重启，以免在新服务未就绪时将备用入口暴露为故障页。待生产 API、静态站与数据备份恢复验收后，去掉旧 ingress，添加 `read.taostudioai.com -> http://127.0.0.1:8080`，再在 Cloudflare 控制台更正 `read` DNS 并逐项实测。
- `read.taostudioai.com` 当前 A 记录为 `127.0.0.1`，公网无法正常访问；本机 Tunnel 凭据只足以运行 tunnel，不能据此管理 Cloudflare DNS。尚无账户 API 权限，因此尚未上线。
- 官方免费额度（2026-09-23 查询）：R2 Standard 10 GB-month、每月 100 万 Class A、1000 万 Class B、出网免费；D1 免费档 5 GB 总存储、每天 500 万行读/10 万行写；Workers Free 每天 10 万请求。超额行为和计费以账户当前方案为准。
- 本机已有约 1.81 GB 媒体，容量上落在 R2 Standard 免费额度内，但迁移需要逐对象私有鉴权、上传/下载授权、备份与切换验证。D1 无法当成现有 Node Prisma SQLite 的连接串直接替换，须改数据访问层/部署架构。首发继续本机 SQLite + Tunnel，之后可单独评估 R2 媒体迁移。R2 也不能替代数据库一致备份和媒体恢复演练。
- 检查结果：服务端 332 项及前端 125 项测试、类型检查、lint、前端构建通过；新增的触达 CSS 修复后 `npm run audit:touch` 为 0 违规。PDF 文本型实际正向样本及 Project Gutenberg 完整 API 入库仍需验收，英语自然拼读课程仍是草稿。以上本地检查均不等于公网验收。

官方定价参考：https://developers.cloudflare.com/r2/pricing/ 、https://developers.cloudflare.com/workers/platform/pricing/ 、https://developers.cloudflare.com/workers/platform/limits/ 。
