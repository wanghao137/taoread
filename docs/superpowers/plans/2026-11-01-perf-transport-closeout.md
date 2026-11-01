# 桃阅读性能传输收口轮 — 实施计划

**Goal:** 收口 docs/101 音频 CDN 最后一公里（1,336 段翻旗切 CDN）+ 载荷修剪三件套（three.js 具名导入/polyfills 移除/字体死重清除）+ 实测基线正式化 + 修后复测部署验证 + docs/102 归档。

**Architecture:** A1 = 离线脚本对生产 manifest 的数据变更（运行时 mtime 惰性重载，零代码零重启）；A3 = web 三处小改；A2/A4 = 测量与审查。生产红线：只写 manifest、DB 零接触、publicationStatus 前后计数核对、装静态后必重启。

**Tech Stack:** Node 24 + tsx、vitest（apps/server/test/）、Vite 5 + React 18、Playwright e2e（根 npm run e2e）。

## Global Constraints

- 生产 manifest：`D:/taoread-prod/apps/server/media/.tts-public-state.json`（紧凑 JSON，与 bulk-upload.mts 的 manifestWrite 同格式）
- 音频 CDN：`https://audio.taostudioai.com/tts-public/<name>.mp3`
- 文件名解析与运行时 publicSegmentAudioKey 语义一致：`info.audioKey` 合法（64-hex 且有 model）→ audioKey；否则 key
- 生产本地音频盘：`D:/taoread-prod/apps/server/media/tts-public/<name>.mp3`
- 只翻「R2 HEAD 200 且 content-length>0」的键；404/网络错误保持 false
- manifest 写入：首次写前备份 `.bak-perf-20261101`；tmp+rename 原子写；写后复核重跑预期待翻=0
- DB 零接触；操作前后 catalog 计数核对（285/285 published 不变）
- 部署协议：装静态后必重启（D:/taoread-prod/bin/restart-api.cmd）
- 真机门为用户手工项；全程本地 commit，不 push

---

### Task 1: 翻旗分诊核心 + 单测（TDD）

**Files:**
- Create: `apps/server/scripts/lib/upload-flag-triage.mts`
- Test: `apps/server/test/uploadFlagTriage.test.ts`

**Interfaces:**
- Produces: `triage(input: { headOk: boolean; network?: boolean; localExists: boolean }): 'flip' | 'keep-pending-upload' | 'keep-missing' | 'keep-network'`
- Produces: `resolveAudioFileName(key, info?) -> { name, invalidOverride }`

- [ ] **Step 1: 写失败测试**（契约见附录 triage 决策表 + resolveAudioFileName 语义）
- [ ] **Step 2: 跑测试确认失败**：`cd apps/server && npx vitest run test/uploadFlagTriage.test.ts` → FAIL（模块不存在）
- [ ] **Step 3: 写核心模块**（契约见附录）
- [ ] **Step 4: 跑测试确认通过**：同 Step 2 命令 → PASS 6 用例
- [ ] **Step 5: 提交**：`git add apps/server/scripts/lib/upload-flag-triage.mts apps/server/test/uploadFlagTriage.test.ts && git commit -m "feat(ops): 音频翻旗分诊核心+单测"`

### Task 2: runner 脚本 + 对生产清单 dry-run

**Files:**
- Create: `apps/server/scripts/sync-public-upload-flags.mts`

**Interfaces:**
- Consumes: Task 1 的 triage / resolveAudioFileName
- Produces: CLI `npx tsx scripts/sync-public-upload-flags.mts [--apply]`（默认 dry-run；--apply 才写盘）

- [ ] **Step 1: 写 runner**（完整代码见附录 A1-runner）
- [ ] **Step 2: dry-run**：`cd apps/server && npx tsx scripts/sync-public-upload-flags.mts` → 输出 candidates=1336 与四类统计
- [ ] **Step 3: 核对 dry-run 结果**：flip + 三类 keep 之和 = 1336；invalidOverrides 数量合理；无进程异常退出
- [ ] **Step 4: 提交**：`git add apps/server/scripts/sync-public-upload-flags.mts && git commit -m "feat(ops): 音频翻旗 runner（默认 dry-run，--apply 才写盘）"`

---

### Task 3: 执行翻旗 + 生产验证（生产数据变更检查点）

**Files:** 无新代码；产出数据与验证记录

- [ ] **Step 1: 前置核对**（读 DB 只读）：
  `cd apps/server && node -e "const{PrismaClient}=require('@prisma/client');const p=new PrismaClient();p.$queryRawUnsafe('SELECT publicationStatus, COUNT(*) n FROM Book GROUP BY publicationStatus').then(r=>{console.log(JSON.stringify(r));return p.$disconnect()})"`
  预期：published 285（与 10-29 事故后基线一致）
- [ ] **Step 2: --apply 执行**：`cd apps/server && npx tsx scripts/sync-public-upload-flags.mts --apply`
  预期：APPLIED flip=N（N>0）；备份文件出现
- [ ] **Step 3: 复核重跑**：同命令（无 --apply）→ 预期待翻=0（flip bucket 空或仅网络跳过者）
- [ ] **Step 4: CDN 抽验**：从 sync-flags-result.json 取 flip 清单前 30 键，HEAD 全 200 且 CL>0
- [ ] **Step 5: 后置核对**：重复 Step 1 → published 仍 285
- [ ] **Step 6: manifest 条数核对**：node 读 manifest → 总条数 17,872 不变；uploaded=false 残留=待上传+双缺+网络跳过

### Task 4: three.js 具名导入

**Files:**
- Modify: `apps/web/src/pages/child/phonics/PhonicsGalaxy.tsx:2`（及全部 THREE.* 引用）

**Interfaces:**
- Consumes: three r186 具名导出
- Produces: PhonicsGalaxy chunk 缩小；组件行为不变

- [ ] **Step 1: 改导入**：`import * as THREE from 'three'` →
  `import { BufferGeometry, CanvasTexture, Color, Float32BufferAttribute, Group, MathUtils, PointsMaterial, Points, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'`
- [ ] **Step 2: 替换 THREE.* 引用**：上述 13 符号在文件内的 THREE.X → X（保留类型位置 `THREE.WebGLRenderer` 类型标注 → `WebGLRenderer`）
- [ ] **Step 3: build**：`cd apps/web && npm run build` → 成功；PhonicsGalaxy chunk 显著缩小（554KB→预计 ≤250KB raw）
- [ ] **Step 4: 对比记录**：build 后记录 chunk 字节数到 output/perf-20261101/bundle-after.md
- [ ] **注**：Task 4-6 的合并回归与部署统一见 Task 8/9

---

### Task 5: polyfills 收敛

**Files:**
- Modify: `apps/web/vite.config.ts`（删 modernPolyfills: true 行）

- [ ] **Step 1: 改配置**：删除 `modernPolyfills: true,` 一行（保留 legacy targets 与 modernTargets）
- [ ] **Step 2: build**：`cd apps/web && npm run build` → 成功；dist/assets 无 `polyfills-*.js`（现代浏览器不再拉）
- [ ] **Step 3: 回归**：web typecheck + vitest；根 e2e 全量（Task 9 前至少本任务后跑一次冒烟）
- [ ] **Step 4: 提交**：`git add apps/web/vite.config.ts && git commit -m "perf(web): 移除 modernPolyfills 全量注入——现代浏览器 -100KB raw/-40KB gz"`

### Task 6: 字体死重清除

**Files:**
- Delete: `apps/web/public/fonts/gensen-rounded-heavy.woff2`、`apps/web/public/fonts/gensen-rounded-regular.woff2`

- [ ] **Step 1: 引用核查**：`grep -rn "gensen-rounded-" apps/web/src apps/web/index.html apps/web/public` 只命中 ui-subsets 引用与 LICENSE 文件名 → 完整版文件确无引用
- [ ] **Step 2: 删除**：git rm 两文件
- [ ] **Step 3: build**：`cd apps/web && npm run build` → dist 不再含两完整版（dist -2.4MB）
- [ ] **Step 4: 提交**：`git commit -m "perf(web): 移除未引用的 gensen 完整版字体（dist -2.4MB）"`

### Task 7: 字体语料重子集（条件任务，可降级）

**Files:**
- Modify: `apps/web/public/fonts/ui-subsets/*`、`apps/web/src/ui-fonts.css`

- [ ] **Step 1: 读 docs/75 字体管线**：提取当时的 pyftsubset 命令与语料清单生成方式
- [ ] **Step 2: 语料更新与重跑**：语料更新（313 本书名+UI+词光）→ 重跑管线 → 重新生成 shards + ui-fonts.css
- [ ] **Step 3: 验证**：build + 抽查渲染无缺字 + e2e 冒烟
- [ ] **Step 4: 降级判据**：读 docs/75 后 30 分钟内无法复原管线 → 停止，记遗留，直接进 Task 8
- [ ] **Step 5: 若实施**：`git commit -m "perf(web): 按当前语料重做字体子集（123 片 3.4MB -> N 片 M MB）"`

### Task 8: measure-prod 正式化 + 修后复测

**Files:**
- Create: `output/perf-20261101/measure-prod.mjs`

- [ ] **Step 1: 正式化脚本**（网络门控：3 连通探测；每请求 15s 硬超时；JSON 输出）
- [ ] **Step 2: 修后复测**：`node output/perf-20261101/measure-prod.mjs > output/perf-20261101/measure-after.json`
- [ ] **与 Task 9 的部署时序**：Task 8 在部署前跑基线，部署后复跑对照

---

### Task 9: 部署 + 生产传输验证

- [ ] **Step 1: 部署 web**：复制 `apps/web/dist/*` → `D:/taoread-prod/apps/web/dist/`（先备份旧 dist 为 dist.bak-perf-20261101）；`D:/taoread-prod/bin/restart-api.cmd`
- [ ] **Step 2: 部署后 curl 验证**：
  - `https://read.taostudioai.com/` 200 no-cache
  - index JS: `cf-cache-status` 首拉 MISS→二拉 HIT，`content-encoding: br`，`cache-control: immutable`
  - 无 `polyfills-*.js` 出现在 index.html 引用中
  - 抽 3 片字体 shard：200 immutable
- [ ] **Step 3: 音频端到端**：抽 10 翻旗键 CDN URL HEAD 全 200；对照运行时行为确定性（get() 分支）
- [ ] **Step 4: 修后复测**：重跑 measure-prod.mjs → measure-after.json（对照修前基线表）
- [ ] **Step 5: 星空课堂冒烟**（dev 或生产）+ e2e 全量绿

### Task 10: 对抗审查 + docs/102 + 记忆

- [ ] **Step 1: 对抗审查三线**（按设计 §5）：
  1. 数据安全线：备份存在/原子写/只写 manifest/publicationStatus 前后 285 不变
  2. 回归线：typecheck+vitest（server+web）+e2e 全量
  3. 传输线：生产 curl（immutable/br/HIT/音频 CDN 200）
- [ ] **Step 2: docs/102 归档**：`docs/102-性能传输收口轮-2026-11-01.md`（诊断数据/四步执行/修前修后对照/遗留清单）
- [ ] **Step 3: 提交拆分**：①脚本+单测 ②web 修剪 ③docs/102
- [ ] **Step 4: 记忆更新**：performance-deploy 记忆追加本轮要点

---

---

## 附录：A1 执行规格（代码以 TDD 在执行轮落地，此处为契约）

### triage 决策表（唯一权威）
| network | headOk | localExists | 动作 |
|---|---|---|---|
| true | 任意 | 任意 | keep-network |
| false | true | 任意 | flip |
| false | false | true | keep-pending-upload |
| false | false | false | keep-missing |

headOk 定义：HEAD 200 且 content-length>0。

### resolveAudioFileName 语义
`info.audioKey` 为 64-hex 且 `info.model` 非空 → 用 audioKey，invalidOverride=false；
audioKey 存在但非法 → 回退 key，invalidOverride=true（记 invalid 清单，不阻断）。

### runner 协议
1. 读生产 manifest → candidates = uploaded===false 的键
2. 并发 8 worker；每键：resolveAudioFileName → local existsSync → HEAD（15s 超时 ×3 次退避+抖动）→ triage 入桶
3. dry-run（默认）：只统计+写 output/perf-20261101/sync-flags-result.json
4. --apply：先备份（仅首次）→ tmp+rename 原子写翻旗键（JSON.stringify 紧凑）→ 打印 APPLIED
5. 输出统计四桶计数 + invalidOverrides 清单
