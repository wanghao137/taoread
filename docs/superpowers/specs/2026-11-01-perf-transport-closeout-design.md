# 桃阅读性能优化·传输收口轮 — 设计文档

日期：2026-11-01
状态：**待用户批准**（brainstorming 产出，未实施）
前序：docs/74/75/78/79/80/88 + docs/101 音频 CDN 遗留
对应轮次记录（实施后）：docs/102

---

## 0. 第一性原理诊断（2026-11-01 晚实测）

**物理架构**：源站 = 家庭服务器（cloudflared 隧道）+ CF 边缘 + R2（audio/media 域已迁 R2）。
瓶颈链 = 客户端 → CF 边缘（RTT）→ 隧道（晚间拥塞窗口）→ 家庭上行（约 95KB/s 量级）。
源站代码本身快（127.0.0.1 实测 2.7ms TTFB）——所有慢都发生在「绕不开边缘」的传输路径上。
推论：本轮主轴 = 让一切重载荷（音频/JS/CSS/字体）离开家庭上行，由边缘/CDN 服务；字节修剪为辅。

**修前基线（本轮实测）**：

| 项 | 实测值 |
|---|---|
| index.html TTFB（公网晚高峰） | 1.6-5.0s，cf-cache-status: DYNAMIC |
| index 主 JS 边缘 MISS 回源 | 339 秒（225KB raw，晚高峰隧道拥塞） |
| 资产首轮 cf-cache-status | MISS（部署新哈希 = 边缘全冷，首位访客付全量源站上行） |
| 音频 manifest | 17,872 条中 1,336 条 uploaded=false（运行时按源站服务） |
| 抽样 false 键 CDN HEAD | 可达者全部 200（文件已在 R2，仅旗未翻）；单段 570-693KB |
| PhonicsGalaxy chunk | 554KB raw / 133KB gz（为 13 个核心 THREE 符号打包整个 three.js） |
| 现代浏览器 polyfill chunk | 100KB raw / 40KB gz（modernPolyfills: true 白送） |
| 字体 | 123 子集片共 3.4MB；完整版 2.4MB 仍在 dist；docs/74 预算 300KB 未达 |
| 源站 TTFB | 2.7ms（localhost 216ms 是 IPv6 解析伪影，已排除） |
| 源站静态层 | 正确：哈希资产 immutable、入口 no-cache、br q5 |

已排除的重做项（docs/78 不动清单 + 本轮复核）：儿童端首屏调度、书架分页、ETag/304、封面缩图档、朗读冷启动根修、媒体 4h 缓存、preconnect、brotli、静态缓存分层、preHandler/session 路径（2.7ms 实证无瓶颈）。

---

## 1. 目标与非目标

目标：
1. 1,336 段源站音频切 CDN（docs/101 最后一公里）
2. 补 docs/75 欠下的性能实测基线（脚本化、可复跑）
3. 载荷修剪三件套：three.js 具名导入 / polyfills 收敛 / 字体死重清除（语料重子集视工作量）
4. 修后复测 + 对抗审查 + docs/102 归档

非目标：
- 不迁 web 静态资产到 R2（方案 C 单独立项，拿修后复测数据决定）
- 不动家长端 / 内容管线 / DB schema
- 不做服务端运行时代码改动（A1 为数据变更 + 离线运维脚本）

---

## 2. A1 音频 CDN 收口（P0）

现状机制（src/modules/tts/publicCache.ts 审读）：
- 清单 media/.tts-public-state.json：key → { durationMs, bytes, uploaded }
- get(): uploaded=true 且配置公共基址 → CDN URL；否则本地文件在盘 → 源站分支
- 清单按 mtime 惰性重载 → 改数据即生效，无需重启服务

脚本设计（apps/server/scripts/sync-public-upload-flags.mts）：
- 输入：生产 manifest 路径参数（默认 D:/taoread-prod/apps/server/media/.tts-public-state.json）
- 流程：备份 → 分诊 → 原子写回 → 复核重跑（预期待翻 = 0）
- 分诊：并发 8，单请求 15s 超时，3 次重试退避 + 抖动
- 幂等：重跑安全，已 true 跳过
- 输出统计：翻旗数 / 待上传 / 双缺 / 网络跳过

分诊决策表：

| R2 HEAD | 生产盘本地 mp3 | 动作 |
|---|---|---|
| 200 且 content-length>0 | 任意 | 翻 true |
| 404 | 在盘 | 保持 false，入「待上传」清单 |
| 404 | 不在盘 | 保持 false，入「双缺」清单（运行时实时合成兜底） |
| 网络错误 ×3 | 任意 | 保持 false，入「网络跳过」清单 |

生效验证：
1. 脚本统计四类计数
2. 复核重跑 → 待翻 = 0
3. 抽 5 本覆盖翻旗键的书 → 运行时返回 CDN URL
4. 真实听感留给真机门

安全红线：
- 只翻 R2 HEAD 200 且 content-length>0 的键（未经证实的翻旗 = 可能大面积坏音频；损坏的音频比慢的音频更糟）
- 首次写前备份 manifest（.bak-perf-20261101 后缀）
- tmp + rename 原子写
- 只写 manifest 文件，DB 零接触
- 操作前后各跑一次 catalog 状态计数（预期 285/285 published 不变）

---

## 3. A2 实测基线（P1）

工具：output/perf-20261101/measure-prod.mjs（把本轮临时脚本正式化）

场景表（每请求硬超时 + 总时长上限 + JSON 输出）：
1. index.html TTFB ×3
2. top 资产（index JS/CSS/polyfills/ChildHome chunk）冷/暖（双拉测 cf-cache-status HIT）
3. /api/content/home（401 边界 = 隧道 RTT 下限）
4. 音频对照：1 段源站段 vs 1 段 CDN 段（修前/修后各测）
5. 字体 shards 抽 5 片

真机门（给用户的 10 分钟清单）：iPad Safari 冷/暖、Android APK 冷启、PC 壳冷启，表格式回填 docs/102。

晚间约束：脚本带网络门控（3 连通探测才开测）；拥塞窗口样本标注 congestionWindow:true，不混入正常基线；真机清单建议非晚高峰执行。

---

## 4. A3 载荷修剪三件套（P2）

### 4.1 three.js 具名导入

PhonicsGalaxy.tsx 的 import * as THREE 改为 13 个具名导入
（BufferGeometry / CanvasTexture / Color / Float32BufferAttribute / Group / MathUtils /
PerspectiveCamera / Points / PointsMaterial / Raycaster / Scene / WebGLRenderer）。

- 目标：chunk 554KB → ≤250KB raw（gz ≤75KB）
- 验证：build 产物对比 + phonics 相关 e2e + 手动星空课堂冒烟
- 风险低：同库同 API，仅打包方式变化

### 4.2 polyfills 收敛

vite.config.ts 的 modernPolyfills: true → 移除该选项。

- 收益：现代浏览器不再拉 100KB raw / 40KB gz 的全量 polyfill chunk
- 决策依据：es2018 target + modernTargets iOS13+ 的核心语言特性已覆盖，全量 core-js 属过度供给；legacy 双包兜底真旧浏览器
- 验证：typecheck / vitest / e2e 全量 + iPad 手测（真机门顺带覆盖）

### 4.3 字体

1. 确认 gensen 完整版两文件（2.4MB）无 CSS 引用 → 从 public/fonts 移除（dist 减 2.4MB）
2. 语料重子集：按当前语料（313 本书名 + UI 字符串 + 词光文本）重跑 docs/75 子集管线，目标冷 Today 字体 ≤300KB（docs/74 预算）
3. 若重子集工作量超预期 → 降级为只做第 1 步，第 2 步记为遗留（诚实记录决策点）

验证：CSS 引用核查 + build + e2e + 抽查书名/正文/词光渲染无缺字。

---

## 5. A4 复测 + 对抗审查 + 归档（P3）

复测：measure-prod.mjs 重跑 → docs/102 修前/修后对照表。

对抗审查三线：
1. 数据安全线：manifest 写入路径（备份存在 / tmp+rename / 只写 manifest / DB 零接触 / publicationStatus 计数核对）
2. 回归线：typecheck + vitest（server+web）+ e2e 全量
3. 传输线：生产 curl 核对（immutable / br / cf-cache-status HIT / 音频 CDN 200）

提交拆分：
1. 音频翻旗脚本 + 单测
2. web 载荷修剪
3. docs/102 归档

---

## 6. 测试

- server vitest：sync 脚本分诊决策表单测（4 行决策表全覆盖）
- web：typecheck + vitest + e2e 15 例全量
- 生产验证：curl 核对（immutable / br / HIT / 音频 CDN 200）
- 真机：用户 10 分钟清单（docs/102 归档不阻塞于此门，诚实记录为待办）
- e2e 红线：脏会话级联检查（已知坑）

---

## 7. 风险与缓解

| 风险 | 缓解 |
|---|---|
| 未经证实的翻旗 → 大面积坏音频 | 只翻 R2 HEAD 200+CL>0 验证过的键；404/ERR 保持 false |
| manifest 写坏 = 全站音频失索引 → 实时合成雪崩 | 备份 + tmp+rename 原子写 + 复核重跑 |
| 晚间网络黑洞窗口 | 网络门控 + 幂等可重跑 |
| three 具名导入改变行为 | 同库同 API；e2e + 手动星空课堂冒烟 |
| polyfills 移除影响 iOS13 Safari | legacy 双包兜底；e2e + iPad 手测为安全网 |
| 字体缺字 → fallback 渲染 | 子集从当前语料重建；缺字=视觉降级非功能损坏；复验抽查 |
| 部署后老访客拿旧壳引用新资产 404 | 遵守现行部署协议（装静态后必重启，CSP 哈希重建） |
| R2 容量 | 预计新增约 270MB；账本 json 为准（警 8GB/停 9GB，现 5.08GB） |

---

## 8. 成功判据

| 判据 | 目标 |
|---|---|
| 音频 manifest uploaded=false 残留 | 仅剩「待上传/双缺/网络跳过」三类清单，每键有明确定义 |
| 抽样 5 本覆盖翻旗键的书 | 运行时返回 CDN URL |
| PhonicsGalaxy chunk | 554KB → ≤250KB raw |
| 现代浏览器 polyfill chunk | 100KB → 0 |
| dist 字体死重 | 2.4MB → 0 |
| e2e 15 例 | 全绿 |
| 修后复测 | 资产 cf-cache-status=HIT；音频 CDN 200 |
| publicationStatus 计数 | 操作前后 285/285 published 不变 |
| 星空课堂 | 手动冒烟通过 |

---

## 9. 开放问题

1. 语料重子集工作量未知——实施时先试运行，超预期即降级为遗留记录
2. 晚间拥塞窗口分位数据需非高峰复测（真机清单建议上午执行）
3. 方案 C（web 静态资产迁 R2）以下一轮独立立项为候选，拿修后复测数据决定
4. 真机清单依赖用户时间，docs/102 归档不阻塞于此（诚实记录为待办）
