# 桃阅读方案 1 与新图标视觉验收

日期：2026-10-16。范围：当前本地界面及图标；后续生产发布验收记录见末节和docs/64。

## Findings

用户要求发布前扩大全站审查后，发现公共试读、内容审校工作台、独立离线书架、旧弹层/封面回退和月份控件样式遗漏，现已修复并逐组复查。足迹纹理遮挡统计文字也已修复。全站已登记生产路由及主要状态的本地视觉验收通过；生产部署和公网验收单独记录，不能以本地结果代替。

## Source and implementation

- Source visual truth：`output/ui-redesign-20261016/reading-desk-compact-review.png`，用户选择的方案1，原桃logo。
- 后续图标要求：`output/ui-icons-20261016/icon-system-review.png`，40枚完整图标及24/32px小尺寸总览。彩色图标替换原型黑线图标是用户明确要求。
- Implementation：http://127.0.0.1:5191 ，独立演示数据库与隔离API。
- Implementation screenshot：`output/ui-fidelity-20261016/implementation-final.png`。
- 同状态：孩子“今天”、同日期、小读者、续读进度、四本书及诗词。视觉数据仅在浏览器路由替换；清理后另测真实隔离API。
- Source pixels：3200×2400；等比归一化至1448×1086。Implementation pixels/CSS viewport：1448×1086，deviceScaleFactor=1，无浏览器外框。
- 原型没有手机、错误、空态及完整家长页面；这些状态按共享视觉系统检查，未声称存在对应原型逐像素比对。

## Full and focused comparisons

组合图均为左原型、右实装，已实际打开检查；全幅不代替局部检查。

| 层级 | 证据（相对项目根目录） | 检查内容 |
| --- | --- | --- |
| 全幅 | `output/ui-fidelity-20261016/comparison-final.png` | 主卡比例、信息顺序、首页密度、导航与三张推荐 |
| 顶部 | `output/ui-fidelity-20261016/comparison-header-final.png` | 原logo、导航、字体、头像与家长入口 |
| 主卡 | `output/ui-fidelity-20261016/comparison-continue-poem-final.png` | 有界封面、进度、星星、诗题与按钮 |
| 快捷与推荐 | `output/ui-fidelity-20261016/comparison-recommendations-final.png` | 粉绿底色、图标、三列卡片、封面与书名 |
| 图标 | `output/ui-icons-20261016/icon-system-review.png` | 40枚主题、轮廓、色彩、边界、小尺寸辨识度 |
| 侧栏 | `output/ui-icons-20261016/parent-icons-desktop-final.png` | 导航34px、“一起读”36px、选中底色与对齐 |

## Required fidelity surfaces

| 表面 | 检查结果 | 边界或残余差异 |
| --- | --- | --- |
| 字体与排版 | 自托管GenSen Rounded Heavy/Regular，浏览器真实加载断言通过；标题、诗句、书名、小字号层级已对比；长书名不挤走按钮 | 生成图不是字体源，个别字形与基线仍有P3差异 |
| 间距与版式 | 1448px主卡y262/h320、快捷y606/h121、推荐y810；推荐正文间距24px，续读标题43px；六视口无溢出，诗句不与操作相撞 | 不声称所有坐标误差为零 |
| 颜色与token | 奶油底、黄主行动、粉绿快捷、蓝诗卡、深色描边和硬阴影已逐区对比；接入原型纸纹与主卡点纹；共享hover/active/disabled/focus规则 | 浏览器合成与栅格缩放仍可能有微小差异 |
| 图像与图标 | 原logo哈希一致；头像、诗景、两处标题装饰与两种纹理已使用原型提取素材；封面有界；40枚透明图标尺寸/通道/哈希通过，已逐枚目视 | 新图标与原型不同是后续明确要求；AI来源标记保留 |
| 文案与内容 | 固定文案对照同状态原型，动态书目仍来自API；失败提供重试与诗歌书单，空态提供选故事路径 | 真实书名、日期、进度随数据变化属于预期 |

## Comparison history

1. **P1，封面备用书名叠字**：缓存图片加载事件与effect竞态，图片上叠加备用标题。按loadedSrc/failedSrc绑定状态后复拍，四张封面加载通过，无叠字。证据：`comparison-iteration-1.png`至`comparison-final.png`。
2. **P2，手机诗句与按钮空间不足**：调整每日诗最小高度与操作位置。六视口断言poem.bottom <= action.top；`fixture-320-final.png`、`fixture-390-final.png`复拍通过。
3. **P2，图标迁移尺寸规则**：旧svg专属规则不适用于img，头像规则可能误放大下拉图标。限制头像选择器、让尺寸规则支持tao-icon后复拍桌面和手机。最终家长侧栏四枚34px、“一起读”36px均加载。
4. **P2，续读星星消失**：绝对定位容器原为零宽，img的max-width导致收缩。为continue-stars明确40×80px，再执行六视口及两颗星星非零尺寸/加载断言，重新生成全幅与主卡对照。`comparison-continue-poem-final.png`确认已恢复。

以上第1—4项为上一轮记录，截图位于`output/playwright/taoread-ui-20261016/`。

5. **P2，标题与推荐卡偏离原型**：续读书名50px偏大、推荐卡正文位置偏移。调整为43px并修正问候标题、推荐间距、每日诗按钮56px高度及星星位置；替换重建头像/诗景，恢复原型装饰和纹理。修正后的全幅及三个局部见本轮比较表。
6. **P2，真实长诗题挤掉作者**：真实API返回“春日杂兴 · 其一”，大标题使作者无法完整显示。分离题名与作者容器，长题缩小并将作者独占一行；短题仍保留原型大标题。六视口断言作者在卡内且位于诗句上方、诗句不碰按钮、无横向溢出；`output/ui-fidelity-20261016/long-poem-{width}.png`复拍通过。清除视觉路由替换后的真实页面见`real-today-desktop-final.png`。

本轮同状态文字可见像素边界（x/y/w/h），记录于`output/ui-fidelity-20261016/typography-measurements-final.json`：

| 区域 | 原型 | 实装 |
| --- | --- | --- |
| 续读书名 | 276/340/124/39 | 277/340/124/40 |
| 问候标题 | 116/150/489/51 | 116/150/490/50 |
| 诗题与作者 | 965/343/210/39 | 965/344/207/40 |
| 首张推荐书名 | 186/840/161/21 | 186/840/158/21 |

这些是局部量测，不是整体相似率。新增六项原型素材合计60662字节，裁切、处理与SHA-256见`output/ui-fidelity-20261016/reference-asset-provenance.json`。仅提取独立美术素材，UI文案与布局仍由HTML/CSS渲染。

## Responsive, states and interaction checks

- 320/390/768/1024/1448/1920px：`output/playwright/taoread-ui-20261016/fixture-{width}-fidelity-final.png`。字体、四张封面加载、无横向溢出、诗句与按钮分离、所测导航/首页点击目标≥44px均通过。最后长诗题修复另有六视口复拍。
- 手机全页截图中的固定底栏位于原viewport底部，是全页截图的固定元素行为；页面保留底部滚动空间。
- 真实隔离API：书库下滑12→36本；详情、我的、家庭空书架、孩子退出转家长PIN登录及家长今天/内容/足迹/设置已操作截图。
- 公共阅读器CDP真实触摸：第1/22页→第2/22页→第1/22页。不扩展为本轮所有家庭阅读器触摸场景均已覆盖。
- 320/1448px每日诗503与长书名：`error-long-320.png`、`error-long-1448.png`，两项恢复操作在卡片内且≥44px，无横向溢出；重试恢复见`error-recovered-desktop.png`；390px空书架见`empty-today-mobile.png`，均已目视查看。
- 正常浏览器流程0 errors、1条现有Router warning。故障注入的预期503请求单独记录，不计入正常流程结论。
- TypeScript、涉及文件ESLint、触控审计46个TSX/0违规、差异空白检查通过。单元测试15文件130项通过，发生在最后图标替换前。
- 最近完整E2E为10/11；首项冷启动登录超时，单独重跑通过（3.6m）。没有将其写成同轮11/11全绿。
- 最后长诗题修复后的最终源码构建通过：`npm run build --workspace @taoread/web`退出0，471模块，现代及legacy产物成功（Vite 5m20s）。保留现有legacy目标及npm用户配置警告。详细状态见`output/ui-fidelity-20261016/verification-summary.json`；构建不替代视觉验收。

## Open questions and limits

无阻塞本地验收的设计歧义。未进行真人儿童可用性研究、全部屏幕阅读器或所有设备/浏览器覆盖。请求模型名与路由记录不证明供应商内部模型身份。生产与公网状态见后续发布记录。

## Follow-up polish

- P3：如取得原型字体源，可进一步匹配个别汉字、笔画和基线。
- P3：栅格素材缩放与字体渲染仍有细微差异。头像、诗景、标题装饰和纹理已完成原型素材接入，不再属于重建素材差异。

## Implementation checklist

- [x] 按已选方案实施主要版式，保持原桃logo。
- [x] 指定模型请求生成40枚图标，导出并接入共用组件。
- [x] 实际查看同视口全幅/局部组合图，修复已发现的全部P0/P1/P2。
- [x] 六视口、真实API主流程、错误恢复、空态和长书名检查。
- [x] 最后长诗题修复后构建通过，保留本地预览、原型素材来源和最新验收清单。

## 全站扩展审查最终结果

完整覆盖矩阵与证据取舍见 `docs/64-全站新版UI审查与发布门禁-2026-10-16.md`。桌面三组总览、手机分组及错误状态均已实际查看。最终首页再次以1448×1086同状态复拍，查看 `output/ui-full-audit-20261016/final-home-comparison.png` 及 header/main/recommendations 三张局部对照；390px复拍无溢出，字体真实加载。后续彩色图标要求及已登记P3差异继续适用。

最终源码构建470模块、现代及legacy产物通过（3m58s）。类型、lint、触控审计通过；服务端初次超时的4文件35项重跑通过，前端全量15文件130项重跑通过。隔离E2E此前5项通过，剩余34项同轮全通过（5.5m），含完读结算、缓存升级、断网阅读和家庭触摸翻页。沿用预览环境的代替门禁排除注销演示家庭用例；标准新建测试库启动失败与环境恢复时无效运行已如实记录，不能描述为标准全套同轮全绿。发布仍须远端标准CI通过。

## 发布记录

UI提交`d8edfd2`已推送并部署。远端CI 38919396637全绿（服务端508项、前端130项、标准E2E40项）；一致离机备份和本地快照通过。源站与公网health200、入口及52项静态文件哈希通过；390/1448px的登录、试读、离线书架实际浏览器共6页/站点，无运行错误和横向溢出。公网截图已查看，`publicVerified:true`。完整证据与回滚目录见docs/64。

final result: passed
