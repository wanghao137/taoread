# 桃阅读 TaoRead 🌙🍑

> 家庭的睡前共读仪式应用 —— 孩子选书、家长共读、阅读发生在微信读书与纸质书里。

- 产品调研：[docs/01-市场调研报告.md](docs/01-市场调研报告.md)
- 开发计划：[docs/02-开发计划书.md](docs/02-开发计划书.md)
- 夜间执行计划（2026-09-04 → 09-20）：[docs/03-夜间执行计划.md](docs/03-夜间执行计划.md)
- 对抗式审查协议：[docs/04-对抗式审查协议.md](docs/04-对抗式审查协议.md)
- 进度日志：[docs/nightly-log.md](docs/nightly-log.md)

## 快速开始

```bash
npm install          # 安装全部 workspace 依赖
npm run verify       # typecheck + 单测（收夜门槛）
npm run dev:server   # 启动服务端（需先配置 apps/server/.env）
```

环境变量：复制 `apps/server/.env.example` 为 `apps/server/.env` 并填写（本地联调可填 `WEREAD_API_KEY`，该文件永不入库）。

## 仓库结构

```
apps/
  server/    # Fastify 服务端：微信读书网关适配层、家庭/共读域 API
  web/       # React PWA：孩子端仪式流 + 家长端（第 5 夜起）
packages/
  shared/    # 前后端共享类型与常量
docs/        # 全部计划、协议与日志
```
