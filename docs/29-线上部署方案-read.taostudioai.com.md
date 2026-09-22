# 线上部署方案：read.taostudioai.com

> 日期：2026-09-23。基线 `0ec5c88`（含审计 T01–T03 安全整改）。
> 结论先行：**单台轻量 VPS（建议香港/海外节点）+ Caddy（自动 HTTPS）+ systemd + SQLite 同源部署**。
> 全部配置模板见本文 §5–§7，内容初始化命令已落地为 `npm run init:content`（F34 缺口已关闭）。

---

## 1. 现状侦察（2026-09-23 实测）

| 项 | 现状 | 对部署的影响 |
|---|---|---|
| `taostudioai.com` | 解析到 216.198.79.65 / 64.29.17.65（**Vercel anycast**） | 主站托管在 Vercel；域名 DNS 大概率在 Vercel/第三方 DNS 控制 |
| `read.taostudioai.com` | **无解析记录** | 需新增一条 A/CNAME 记录指向桃阅读服务器 |
| 媒体资产 | `apps/server/media` **1.7 GB / 3321 文件**（插画 3004 + 视频 270 + TTS 缓存） | 不能进 Serverless/无盘环境；服务器需 ≥3GB 磁盘并随发布 rsync |
| 内容包 | 4.7 MB（222 本 / 2513 章） | 一条命令入库（`npm run init:content`，已实测） |
| 备案 | 主站在 Vercel（海外）→ 域名大概率**未做 ICP 备案** | 国内服务器 80/443 会被接入商拦截 → 默认选**香港/海外节点**；如需大陆低延迟须先完成 ICP 备案 |

## 2. 推荐架构（同源单机）

```
                    DNS  A 记录
read.taostudioai.com ────────▶ VPS 公网 IP
                                │
                    ┌───────────┴───────────┐
                    │  Caddy :443 (自动 HTTPS) │
                    │  ├─ /*        → 静态 dist │
                    │  └─ /api/*    → 127.0.0.1:8787
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │ systemd: taoread.service │
                    │ Fastify :8787 (NODE_ENV=prod) │
                    │ SQLite prod.db + media/ 1.7GB │
                    └───────────────────────┘
```

选型理由：
- **同源部署**（前端与 `/api` 同在 read.taostudioai.com）：零 CORS 配置面、PWA/SW 天然可用、分享卡与深链同域；`TAO_ALLOWED_ORIGIN` 仍显式配置（config 在 prod 禁止 `*`）。
- **SQLite 单写者**与审计 §2 结论一致：单实例小规模不上数据库服务；磁盘文件即备份单元。
- **Caddy 自动签发/续期 Let's Encrypt**：比 Nginx+certbot 少一个运维件（Nginx 等效配置见 §7）。
- 媒体 1.7GB 本地自持：插画/视频是磁盘文件，TTS 缓存也落本地——一切无盘 PaaS 均不适用（备选方案对比见 §8）。

## 3. 前置条件核对单

- [ ] **服务器**：1C2G 起步（Node 22 + SQLite + 1.7GB 媒体 + 缓存增长，磁盘 ≥10GB）；香港/海外节点免备案，大陆节点需 taostudioai.com 完成 ICP 备案
- [ ] **DNS**：在域名 DNS 处加 `read` 的 A 记录 → 服务器 IP（TTL 300 便于首发期调整）
- [ ] **出网**：服务器能访问微信读书网关（weread 绑定用）与 AI 供应商（可选，未配置则功能降级）
- [ ] **密钥**：生成 `TAO_MASTER_KEY` 并离线保管（丢失 = 所有家庭微信读书绑定作废，需重新绑定）
- [ ] **时区**：服务器 `timedatectl set-timezone Asia/Shanghai`（夜界分桶/周报按本地时间）

## 4. 部署步骤

### 4.1 服务器初始化（一次性）

```bash
# Node 22 + 基础工具（Ubuntu 22.04/24.04 示例）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git rsync caddy
sudo timedatectl set-timezone Asia/Shanghai

# Caddy 自动 HTTPS（需 80/443 可达；自动签发续期证书）
sudo tee /etc/apt/sources.list.d/caddy.list <<'EOF'
deb [trusted=yes] https://dl.cloudsmith.io/public/caddy/stable/deb any-version main
EOF
sudo apt-get update && sudo apt-get install -y caddy
```

### 4.2 发布应用

```bash
sudo useradd -m -r -s /usr/sbin/nologin taoread
sudo mkdir -p /opt/taoread && sudo chown taoread:taoread /opt/taoread
sudo -u taoread git clone https://github.com/wanghao137/taoread.git /opt/taoread/app
cd /opt/taoread/app
sudo -u taoread npm ci
```

### 4.3 配置（/opt/taoread/app/apps/server/.env）

```ini
PORT=8787
NODE_ENV=prod
TAO_MASTER_KEY=<node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 生成后离线备份>
TAO_ALLOWED_ORIGIN=https://read.taostudioai.com
TAO_DATABASE_URL="file:./prod.db"
TAO_BEDTIME=1290
TAO_TRUST_PROXY=1
TAO_E2E_ISOLATION=            # 留空——该开关仅 e2e 使用，生产绝不设置
WEREAD_API_KEY=               # 留空（BYOK：各家庭在应用内绑定自己的 key）
# 可选 AI 供应商（不配则插画/动画/云朗读降级，功能仍可用）
# TTS_BASE= / TTS_API_KEY= / TAO_IMAGE_BASE= / TAO_IMAGE_KEY= / TAO_VIDEO_BASE= / TAO_VIDEO_KEY=
```

### 4.4 内容初始化 + 构建（审计 F34 缺口，已落地为命令）

```bash
# 同步媒体资产（本机 → 服务器；1.7GB，一次性 + 以后增量）
rsync -avz apps/server/media/ taoread@<server>:/opt/taoread/app/apps/server/media/

cd /opt/taoread/app/apps/server
sudo -u taoread TAO_DATABASE_URL="file:./prod.db" npm run init:content
# → prisma migrate deploy + 222 本公版书 + 媒体台账（幂等，重复执行安全）

cd /opt/taoread/app && sudo -u taoread npm run build -w @taoread/web
```

### 4.5 systemd 常驻

```ini
# /etc/systemd/system/taoread.service
[Unit]
Description=TaoRead API
After=network.target

[Service]
User=taoread
WorkingDirectory=/opt/taoread/app/apps/server
EnvironmentFile=/opt/taoread/app/apps/server/.env
ExecStart=/usr/bin/node --import tsx src/index.ts
Restart=always
RestartSec=3
# 加固
NoNewPrivileges=true
ProtectSystem=full
ReadWritePaths=/opt/taoread/app/apps/server

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now taoread
curl -s http://127.0.0.1:8787/api/health   # → {"ok":true,...}
```

### 4.6 Caddy 站点

```caddy
# /etc/caddy/Caddyfile
read.taostudioai.com {
	encode zstd gzip
	handle /api/* {
		reverse_proxy 127.0.0.1:8787
	}
	handle {
		root * /opt/taoread/app/apps/web/dist
		try_files {path} /index.html
		file_server
	}
}
```

```bash
sudo systemctl reload caddy   # 首次自动签发证书
```

### 4.7 验收（对齐 docs/06 §7）

- [ ] `https://read.taostudioai.com/api/health` 返回 ok
- [ ] 家长注册（创建家庭）→ 设置页可见家长码 → 添加小读者
- [ ] 孩子设备输入家庭码 → 选书 → 阅读 → 收尾全流程
- [ ] 屏蔽/休息时间/安静模式在设置页生效
- [ ] `TAO_TRUST_PROXY=1` 生效：不同外网 IP 的限流桶互相独立
- [ ] PWA 安装到手机桌面可用；断网时有准确反馈（当前版本仅在线阅读，见 §9）
- [ ] 备份脚本跑通一次并异地拉取（§6）

## 5. 后续发版流程

```bash
# 本机：推送 → 服务器：
cd /opt/taoread/app && sudo -u taoread git pull
sudo -u taoread npm ci
sudo -u taoread npx prisma migrate deploy   # schema 变更时
sudo -u taoread npm run build -w @taoread/web
sudo systemctl restart taoread
```

rsync 增量同步 `media/`（有新生成的插画/视频时）。

## 6. 备份与恢复（审计 F38 最小闭环）

```bash
# /etc/cron.daily/taoread-backup —— SQLite 在线一致备份 + 密钥提示
#!/bin/sh
D=/var/backups/taoread
mkdir -p $D
cd /opt/taoread/app/apps/server
sudo -u taoread node -e "
const { execSync } = require('child_process')
execSync('npx --no-install prisma migrate deploy', {env:{...process.env}, stdio:'none'})
" 2>/dev/null
sqlite3 /opt/taoread/app/apps/server/prisma/prod.db ".backup '$D/prod-$(date +%F).db'"
tar czf $D/media-$(date +%F).tar.gz -C /opt/taoread/app/apps/server media  # 每周一次即可（媒体不可变）
find $D -mtime +14 -delete
# 异地：rsync -a $D/ backup@offsite:/taoread/
```

- 恢复 = 停服务 → 还原 db 与 media/ → 起服务；`TAO_MASTER_KEY` 必须与备份时一致（否则微信读书绑定无法解密）——**主密钥离线保管是恢复的前提**。

## 7. Nginx 等效配置（如选 Nginx 而非 Caddy）

```nginx
server {
    listen 443 ssl http2;
    server_name read.taostudioai.com;
    ssl_certificate     /etc/letsencrypt/live/read.taostudioai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/read.taostudioai.com/privkey.pem;
    gzip on;
    location /api/ { proxy_pass http://127.0.0.1:8787; proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr; proxy_set_header X-Forwarded-Proto https; }
    location / { root /opt/taoread/app/apps/web/dist; try_files $uri /index.html; }
}
```

## 8. 备选方案对比

| 方案 | 优点 | 缺点 | 结论 |
|---|---|---|---|
| **A. 单 VPS + Caddy + systemd（推荐）** | 同源零 CORS；SQLite/媒体自持；一件式运维；成本最低 | 需自管系统补丁与备份 | ✅ 本文主方案 |
| B. Docker Compose 单机 | 环境不可变、迁移方便 | 多一层镜像维护；SQLite/媒体仍需卷 | 已有 Docker 习惯时等价可选 |
| C. Vercel 托前端 + VPS 跑 API | 主域同平台顺手；前端零运维 | 双部署面 + CORS；媒体/TTS 缓存仍在 VPS；两个域都要证书 | 不推荐，除非完全不想在 VPS 上托管静态 |
| D. 全 Serverless（Vercel + 托管 DB） | 免运维 | **1.7GB 媒体与 SQLite 单写者模型不适配**；改造量大 | ❌ 与审计架构结论冲突 |

## 9. 上线前必办（对齐审计 T10/F34/F38/F41）

1. ~~内容初始化命令~~ ✅ 已落地 `npm run init:content`（本文 §4.4）。
2. ~~反向代理信任~~ ✅ `TAO_TRUST_PROXY` 已在 T03 落实（Caddy 场景设 `1`）。
3. **备份演练**：按 §6 跑一次完整恢复（停服→还原→起服→登录验证），记录 RPO/RTO。
4. **CI 触发确认**：`.github/workflows/ci.yml` 已随 `0ec5c88` 推送，首次 push 后到 Actions 页确认全绿。
5. **家长告知/隐私清单**（F41）：儿童数据最小化已内建（不收集身份、注销物理删除），上线页脚建议保留「AI 生成内容标识说明」入口（已内建）。
6. **明确离线边界**（F39）：当前 PWA 仅静态预缓存，正文/音频需在线——对外文案不要承诺离线阅读。
7. 依赖公告（Fastify 5 / Router 7 大版本升级）安排专项窗口，不在首发变更里做。

## 10. 需要产品负责人提供

1. 服务器（香港/海外轻量 VPS 即可）与 SSH；或授权用现有机器。
2. DNS 控制权：添加 `read` 子域 A 记录。
3. 决策：主密钥的离线保管人；备份异地存储位置。
