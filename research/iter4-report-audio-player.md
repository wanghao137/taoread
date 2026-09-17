# 桃阅读第四次迭代调研报告：儿童听书播放器（服务端 TTS 时代的播放器、锁屏、字幕同步与哄睡）

> 调研日期：2026-09-17
> 调研背景：桃阅读第四轮已接入阶跃星辰 **stepaudio-3-gen-preview** 服务端 TTS（自然语言描述音色 / speed 0.5–2 / SSE 流式 base64 分片 / wav·mp3·flac·opus·pcm）。上一轮朗读走浏览器 Web Speech API，受宿主语音包限制、无锁屏控件、无字级高亮时间轴。
> 本报告聚焦：播放器交互标准、锁屏与后台播放、字幕/高亮同步、儿童 TTS 音色、听书与阅读的关系、睡眠场景。
> 取证方式：WebFetch / curl 直接抓取权威页面（MDN、MDN browser-compat-data、caniuse data.json、StepFun 开放平台文档、阿里云百炼文档、Tonies/Epic 官帮助中心 API、Vooks 官网、OpenAlex 学术库）
> 证据强度标注：**【一手】** = 本次直接抓取的官方/权威原始页面；**【二手】** = 媒体/社区文章；**【未取证】** = 本环境无法验证，已诚实标注
> 环境约束：无图像输入能力（不能看 App 截图），论证全部基于文字资料；禁止积分/打卡/孩子推送/广告；不做需要实时通道的功能

---

## 0. 执行摘要（先给结论）

1. **播放器控件分层：必需 = 播放/暂停 + 上一段/下一段 + 定时关闭 + 音量；次必需 = 进度条 + 倍速；不做 = 均衡器/音色自由切换/复杂章节列表搜索。** 儿童硬件播放器（Yoto、Toniebox）的共同设计是「把控件数量压到 3 个以内」，因为 3–6 岁孩子的操作粒度只支持「大目标点按」和「实体/单一手势」。【一手：tonies.com / yotoplay.com】
2. **锁屏控件在 iOS Safari 上能做，但有条件。** MDN browser-compat-data（本次直接拉取 GitHub main 分支）：MediaSession API 桌面 Safari 15+、iOS Safari 镜像同步（mirror）= 15+；但 WebKit 至 2026-08 仍在「实验特性开关背后」补齐 call-to-action action handler（PR 未合入），**iOS 上元数据（标题/封面）能显示，但不要指望锁屏按钮回调 100% 可靠**，应用内必须有等价控件兜底。【一手：github.com/WebKit/WebKit PR #72048】
3. **Wake Lock：iOS Safari 18.4+ 才支持**（BCD 明确 iOS 18.4，与桌面 Safari 16.4 不同步）。iOS 16.4–18.3 的用户朗读到一半会息屏中断，必须做特性检测 + 低版本提示。caniuse 全局使用率 94.92%。【一手：MDN BCD api/WakeLock + caniuse wake-lock】
4. **字级高亮时间轴有一条一步到位的闭环：stepaudio-3-gen-preview 不支持 `timestamp` 参数（官方文档明示），但同家族的 stepaudio-2.5-asr 支持「字/词级时间戳」（`show_utterances=true` → `words[].start_time/end_time`）。** 用 TTS 生成 wav → 本地/服务端 ASR 对齐 → 得到字级时间轴，是当前最可靠的路线，且识别对象是「已知文本」，可做约束式对齐而非开环识别。【一手：platform.stepfun.com 两份 API 文档】
5. **精度要求：字级高亮误差控制在 ±150–200ms 内即「够用」。** 依据是跨模态时间感知研究：自然语音本身就存在几十到上百毫秒的视听不同步而不破坏感知连贯性。【一手：PNAS 2014 / Perception & Psychophysics 2008，经 OpenAlex 取证】
6. **听书与阅读不是二选一，而是「简单视图」（Simple View of Reading）的两个因子：阅读理解 = 解码 × 听力理解。** 3–8 岁孩子解码能力尚未成型，听力理解就是他们理解故事的唯一通道；因此桃阅读的默认形态应是「图文 + 朗读」，纯听模式是睡前/乘车场景的降屏形态。【一手：Gough & Tunmer 1986 / Hoover & Gough 1990，经 OpenAlex 取证】
7. **睡眠场景的行业共识：定时（固定档位 + 自定义 + 读完本章）+ 渐弱关闭 + 夜间模式 + 续播位置记忆。** Tonies 官方原文定义了渐弱范式：「sleep timer gradually lowers the volume before switching off automatically, so little listeners can drift off without abrupt stops or interruptions」。凯叔支持「自定义时间」定时。【一手：us.tonies.com；百度经验】
8. **音色描述词不是「温柔女声」六个字，而是多维结构化描述。** 阿里云百炼（CosyVoice）官方指南给出五条原则（具体/多维/客观/原创/简洁）和七个维度（性别、年龄、音调、语速、情感、特点、用途）；StepFun 官方 demo 给出的儿童音描述范例是「年幼男童，声音奶乎乎脆生生的，带着满满的雀跃感，天真烂漫」。本报告第 4 章给出可直接粘贴进 `roles[].description` 的中文模板。【一手：help.aliyun.com + static.stepfun.com】

---

## 1. 儿童听书播放器的交互标准

### 1.1 控件清单：行业实际在用什么

综合本次与第三轮取证结果，儿童/听书播放器的控件可归为三层：

| 层级 | 控件 | 谁在做 | 桃阅读建议 |
|---|---|---|---|
| **必需层** | 播放/暂停（单键切换） | 全部 | **必需**，目标尺寸 ≥ 64×64dp（儿童手指比成人更需大目标） |
| **必需层** | 上一段 / 下一段 | 喜马拉雅、凯叔、Epic、Yoto（实体按键）、Toniebox（拍打/侧键） | **必需**。对儿童比进度条更重要：段是「故事单位」，孩子想重听的是「这一段」而不是「第 37 秒」 |
| **必需层** | 定时关闭（哄睡） | 喜马拉雅、凯叔、Audible、Toniebox 2、Vooks | **必需**（桃阅读核心场景就是睡前） |
| **必需层** | 音量 | 全部（硬件为物理旋钮/捏耳朵；App 为系统音量或滑杆） | **必需**，建议直接映射系统音量，不自建复杂音量曲线 |
| **次必需层** | 进度条 + 时间显示 | 喜马拉雅、凯叔、Epic（play bar）、Audible | **次必需**，3–5 岁孩子无法精确拖拽，主要给家长用；见 1.4 |
| **次必需层** | 倍速 | 喜马拉雅（0.5/0.75/1.25/1.5/1.75/2）、Epic（speedometer 图标）、StepFun speed 0.5–2 | **次必需**，儿童场景档位建议收敛为 0.8 / 0.9 / 1.0 / 1.1 / 1.25，不要 7 档 |
| **增强层** | 字级高亮开关 | Epic（Word Highlight toggle）、Vooks（默认开启） | **增强**，自动开启 + 可关闭（Epic 范式） |
| **增强层** | 章节列表 / 上次听到这里 | 凯叔（「上次听到这里」进度指引）、Yoto（像素图标章节导航） | **增强**，桃阅读「上次听到这里」是断点续播的低成本高价值功能 |
| **增强层** | 夜间模式 / 哄睡音量上限 | Toniebox 2（日夜亮度/音量分别设）、Yoto（okay-to-wake + 夜灯） | **增强**，桃阅读夜间模式建议「深色 + 降低对比度 + 隐藏非必要控件」 |
| **不要做** | 均衡器 / 音效混音器 | 无儿童产品做 | 见第 8 章 |
| **不要做** | 需要账号的下载 | Epic 的 Audiobook 明确「not available for offline reading」而 Read-to-Me 可下载 | 桃阅读离线缓存应零账号门槛 |

### 1.2 逐产品取证

#### 1.2.1 Epic（Read-to-Me + Audiobook 双形态，本次一手）

【一手】Epic 官方帮助中心（通过 Zendesk API 直接抓取，`support.getepic.com/api/v2/help_center/articles/search.json?query=read-to-me`，53 篇相关文章）明确区分两种音频形态：

- **Audiobook（紫色标签）**：「strictly audio without a visual book and pages to follow along with, **perfect for bedtime stories**, language learning」「**not available for offline reading**」
- **Read-to-Me（绿色标签）**：「provide a visual experience where children can **follow along as the pages turn automatically with the narration**」「**can be downloaded to read offline**」

关键设计含义：**Epic 用「颜色标签」而非「模式开关」来区分听与读**——两种形态在书架层面就是两个入口，而不是同一个播放器里的模式切换。这对桃阅读的「听读互跳」入口设计是直接可借鉴的范式（见第 5.3 节）。

【一手】同帮助中心关于播放速度：「You can adjust the playback speed of read-to-me books by clicking the **speedometer icon next to the play bar**」——即倍速入口紧邻播放条，是一个仪表盘图标，不在二级菜单里。

【一手】关于听书时长统计：「Listening for more than **60 seconds** counts toward the child's overall reading time」——注意桃阅读不做积分打卡，但这条说明行业里「听」是被折算成「读」的。

来源：
- https://support.getepic.com/api/v2/help_center/articles/search.json?query=read-to-me（API）
- https://support.getepic.com/hc/en-us/articles/204962039-Does-Epic-have-Audiobooks-and-Read-to-Me-books
- https://www.getepic.com（App Store 描述：Read-To-Me books「Featuring talented voice actors, fun music and exciting sound effects」）

#### 1.2.2 Vooks（动画绘本 + 逐词高亮 + 听书模式）

【一手，本次抓取 vooks.com】：
- 「**read-along highlighted text**」伴随音乐、音效与轻柔朗读
- FAQ 原句：「**Text-highlighting helps kids connect what a word sounds like with what it looks like.**」
- 教师证言：「highlights the words to help them start to read along」
- 屏幕哲学：「Gentle animation engages **without overstimulating**」；定位「Bedtime, nap time, or quiet time」；内容「**Soothing and non-addictive**」
- 有「**audiobook mode**」（纯听形态）；「offline and on-demand」「ad-free」

来源：https://vooks.com

设计含义：Vooks 把「不刺激」写进产品哲学，这直接对应桃阅读睡前场景的视觉/听觉克制原则——夜间模式下不应有强动效。

#### 1.2.3 Yoto（无屏幕硬件，实体即导航）

【一手，本次抓取 yotoplay.com 页面 + 第三轮取证】：
- 「**Card in. Play begins.**」插卡即播，**1 步操作**；无屏幕菜单
- Green Button（4 代）：「**Twist to browse**」（旋转浏览，封面显示在像素屏）→「**Press to play**」→「Press again to pause」→「Press and hold to eject」
- 「**Title artwork helps kids browse and choose**…much like picking a Yoto Card from their card case」；「**pixel icons help them navigate chapters and tracks**」——**用封面图 + 像素图标替代文字列表**，给不识字孩子完整自主选播权
- 非播放时像素屏是数字时钟，「customisable day and night settings」，「acting as an **okay-to-wake cue**」
- 「**timers and calming audio lead into bedtime**」；「**alarms and handy timers** for everything from brushing teeth to homework」（刷牙计时器是把听书嵌入日常仪式的设计）
- 「full-panel **night light**, sleep sounds」；「**Yoto Sleep Radio** ready for night time」
- 音量上限：「defaulted to ensure **safe listening volumes** when used with wired or Bluetooth headphones」
- 离线：App 加载后「compatible audio downloads to the player, so kids can browse and listen even when they're offline」
- 分龄内容：0-2 / 3-5 / 6-8 / 9+；整机适玩 3 岁+

来源：https://yotoplay.com（含 Green Button 说明页）；https://uk.yotoplay.com/products/yoto-player

#### 1.2.4 Toniebox（无屏幕硬件，手势即控件）

【一手，本次抓取 us.tonies.com/pages/tonieboxes 与 tonies.com/en-gb/toniebox-2/】：
- 「**Intuitive controls mean kids can tap, tilt or squeeze to navigate** their way through their favorite songs, stories, games and more. **No screens or menus in sight.**」
- 「**Made for independent play**…Designed with kid-friendly, intuitive controls. Listeners explore stories, songs and games all on their own, boosting their confidence and independence.」
- 哄睡定时（Toniebox 2 官方原文）：「transform the 'bedtime battle' into a peaceful routine with a **gentle sleep timer and a sunrise alarm**」
- **渐弱关闭范式（最重要的一条一手证据）**：「Built for smoother bedtimes, the **sleep timer gradually lowers the volume before switching off automatically**, so little listeners can **drift off without abrupt stops or interruptions.**」
- 音量上限：「**In-app volume controls let parents set volume limits** right from the app」；家长可「set different brightness/volume for day and night」
- 「1+ certified」（Toniebox 2 / Lite 经测试对 1 岁以上安全易用）；「Designed for ages 1–12+」
- 操作隐喻：放置手办即播（「Pop a Tonie on the Toniebox 2 and they're all set」）；捏耳朵调音量（商店页二手：「changing tracks, and even changing volume **with a pinch of the ear**」）；侧键切章/拍打暂停（一手官方支持页 support.tonies.com 本次不可达，**标注未逐项取证**）

来源：
- https://us.tonies.com/pages/tonieboxes
- https://tonies.com/en-gb/toniebox-2/
- iter3-report-intl-ux.md 第 4 节（含 Creative Tonies 自录、隐私警示：Tonies 法律声明「We will send you... offers and recommendations based on... interaction information provided by you for advertising purposes (e.g. **playtime information**)」——播放数据用于广告推荐，与儿童隐私规范存在张力，桃阅读红线不做）

#### 1.2.5 凯叔讲故事（国内儿童听书标杆）

【一手 + 二手】：
- 播放器：状态栏悬浮操作、后台播放、**哄睡定时**（可预设播完后收听「睡前诗」）、收藏/分享/下载（第三轮取证，来源 report-cn-apps.md）
- 定时关闭交互（本次补证，百度经验《凯叔讲故事怎么设置定时关闭》，v2.1.3 / iOS 16）：播放界面 → **单击左下角的闹钟按钮** → 向下滑动 → **「自定义时间」** → 弹窗设置时分 → 确定 → 显示倒计时。**要点：凯叔支持「自定义时间」，不只是固定档位。** https://jingyan.baidu.com/article/ff411625f82ad353e582375a.html
- 专辑详情页：试听、「**上次听到这里**」进度指引、批量/多选下载离线（第三轮取证）
- 首页**语音搜索**（照顾识字不多的孩子）（第三轮取证）

#### 1.2.6 喜马拉雅 / 喜马拉雅儿童

【二手，第三轮取证】：
- 倍速档位：播放界面 → 设置图标 →「倍数播放」弹窗，档位 **0.5 / 0.75 / 1.25 / 1.5 / 1.75 / 2 倍**（默认 1.0 不在弹窗列出，需逐个点击试听）。来源：太平洋IT百科 https://product.pconline.com.cn/itbk/sjtx/sjrj/1573/15736608.html
- 定时关闭：播放界面点**时钟图标** → 选择时长 → 播放界面显示**倒计时**。来源：百度经验 https://jingyan.baidu.com/article/46650658d5c770b449e5f8f2.html
- **具体定时时长档位数值未逐项取证**（教程只写「选择适合自己的时长」），标注。行业通行档位为 5/10/15/20/30/45/60 分钟 +「播完本集/本章」，属通用设计，非逐项证据。
- 喜马拉雅儿童具体播放器界面（波波音色入口、夜晚模式开关）本次**未能取得一手证据**，标注为缺口。

#### 1.2.7 洪恩、宝宝巴士

【未取证】本次未能取得洪恩（识字/分级阅读）与宝宝巴士的**听书播放器界面**一手证据。这两家产品形态以「互动识字/动画 + 儿歌」为主，并非「听书播放器」设计，播放控件散落在各内容卡片内、没有统一的播放器页面。对桃阅读的参考价值低于 Epic/Vooks/凯叔，**本节标注为证据缺口**，不强行下结论。

### 1.3 「孩子多大能自己操作进度条」

这是本报告被明确问到的问题。诚实回答：**没有找到直接针对「儿童拖拽音频进度条」的实证研究**，但可由触控手势发展研究给出可靠推断：

【一手，OpenAlex 取证】：
- 「**Touch gesture performed by children under 3 years old** when drawing and coloring on a tablet」（IJHCS 2018，DOI 10.1016/j.ijhcs.2018.11.008）——3 岁以下儿童的拖拽/绘制手势仍在发展中。
- 「**Characterizing How Interface Complexity Affects Children's Touchscreen Interactions**」（CHI 2016，DOI 10.1145/2858036.2858200）——界面复杂度显著影响儿童的触控交互表现。
- 「All Tapped Out: Touchscreen Interactivity and Young Children's Word Learning」（Frontiers in Psychology 2017，DOI 10.3389/fpsyg.2017.00578）——2 岁儿童的**点按**行为已与自我调节能力相关；点按是最早成熟的手势。

推断（标注为**推断而非直接证据**）：

| 年龄 | 能独立操作的控件 | 不能可靠操作的 |
|---|---|---|
| 2–3 岁 | 大目标点按（播放/暂停）、拍打 | 拖拽、长按、需精准落点的手势 |
| 4–5 岁 | 点按、简单短距拖拽、单手滑动翻页 | 精确进度条定位（拖过、拖不动、误触） |
| 6–8 岁 | 短距拖拽、双击、简单手势组合 | 长距离精确 scrubbing、多指手势 |
| 全段（3+） | 「上一段/下一段」点按 | — |

**结论**：
1. **「上一段/下一段」对 3 岁以上孩子就是他们的「进度条」**——这是儿童播放器设计的核心洞察，也是 Yoto（实体键左右切轨）和 Toniebox（拍打/侧键）的设计起点。
2. 进度条在桃阅读里应定位为**家长控件 + 大龄儿童控件**：默认给「段刻度」（段落锚点）而非「秒刻度」，拖拽吸附到段；时间显示用「第 2 段 / 共 5 段」而非「02:13 / 08:47」。
3. 触控目标尺寸：Apple HIG 44pt / Material 48dp 是**成人**下限；儿童产品建议 **≥ 56–64dp**，关键操作（播放/暂停、定时）越大越好。

### 1.4 控件布局建议（可直接落地）

```
┌──────────────────────────────────────────┐
│  [封面/插图]                              │  ← 夜间模式：深色 + 低对比
│                                          │
│  《小狐狸找朋友》                          │  ← 标题（与 MediaSession 同步）
│  第 2 段 · 共 5 段        [🌙 夜间]        │  ← 段刻度优先于时间刻度
│                                          │
│  ──●──────────────────── 02:13 / 08:47   │  ← 进度条：吸附到段，次要信息
│                                          │
│    [◀上一段]    [▶/⏸ 大按钮]    [下一段▶] │  ← 必需层，居中，最大目标
│                                          │
│  [⏰ 定时]     [🐇 倍速]     [Aa 高亮]     │  ← 次必需层，一行三个
│                                          │
│  [🔈 音量]      [☰ 段落列表]              │  ← 增强/家长层
└──────────────────────────────────────────┘
```

布局原则（基于 1.1–1.3 的取证）：
- **主操作区只放 3 个大按钮**（上一段 / 播放暂停 / 下一段），这是 3 岁孩子能独立掌握的全部。
- **定时按钮必须在首屏可见**——睡前场景下要能在关灯前一步点到（凯叔左下角闹钟按钮、喜马拉雅时钟图标，都是首屏可见）。**不要把定时藏进二级菜单。**
- **倍速紧邻播放条**（Epic 的 speedometer 图标范式），不要放进「设置」页。
- **夜间模式一键切换**，切换后隐藏非必要控件（Vooks 的「不刺激」哲学）。
- **不做底部 tab 导航**：播放器页面应是模态全屏，单一返回手势/返回键回到书架。

---

## 2. 锁屏与后台播放

### 2.1 从 Web Speech API 到服务端 TTS：为什么这一题现在才有解

第三轮报告已论证（本次保留结论并补充新证据）：
- MediaSession / Wake Lock 都只对**真实媒体源**（`<audio>` / `<video>` 元素或 MediaSession metadata）有效。若朗读走 `speechSynthesis`（不产生媒体流），锁屏控件和息屏保持都**没有挂载点**。
- 【一手】MDN SpeechSynthesis 接口只暴露 `speak/cancel/pause/resume/getVoices` 和 `paused/pending/speaking` 状态，**没有任何音频输出流属性**；W3C Speech API 草案层面也不提供 MediaStream。→ speechSynthesis 的输出**无法**被 Web Audio API 捕获，无法做音量包络/渐弱/混音。https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

**结论**：接入 stepaudio-3-gen-preview 后，音频变成可寻址的 `<audio>` 元素 / AudioBuffer，**锁屏控件、息屏保持、音量渐弱、进度条、倍速档位一次性全部解锁**。这是第四轮迭代在体验层面最大的结构性变化。

### 2.2 MediaSession API 能做什么（官方规格）

【一手】MDN Media Session API（https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API）：
- 作用：让 Web App 自定义**系统级媒体通知**（锁屏、通知栏、控制中心）并提供 **action handler**，使用户能通过硬件/软件媒体键控制网页播放。
- 元数据 `MediaMetadata`：`title` / `artist` / `album` / `artwork`（多尺寸数组，官方示例给出 96/128/192/256/384/512 六档，让 user agent 自选）/ `chapterInfo`。
- 状态：`navigator.mediaSession.playbackState = "playing" | "paused" | "none"`。
- 动作：`setActionHandler(action, handler)`，支持 `play` / `pause` / `stop` / `seekbackward` / `seekforward` / `seekto` / `previoustrack` / `nexttrack` / `skipad` / `togglecamera` / `togglemicrophone` / `hangup` / `previousslide` / `nextslide`。
- **MDN 自己的可用性警告**：该特性被标注为「**Limited availability**」——「does not work in some of the most widely-used browsers」，因为浏览器需要一种接入 OS 级媒体控制的机制。
- **自动播放约束**：必须在用户交互事件（如 `pointerup`）中初始化：
```js
playButton.addEventListener("pointerup", () => {
  audio.play().then(() => { /* 设置 media session */ }).catch(console.error);
});
```
- `previousslide` / `nextslide` 需 `try...catch`，不支持时会抛 warning。

### 2.3 浏览器支持矩阵（本次一手拉取 MDN browser-compat-data 主分支）

【一手】直接抓取 `https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/MediaSession.json` 与 `MediaMetadata.json`，解析 `__compat.support`：

| 特性 | Chrome | Chrome Android | Safari | iOS Safari | Firefox |
|---|---|---|---|---|---|
| MediaSession 基础 + metadata + playbackState | 73 | 57 | 15 | **mirror → 15** | 82 |
| setActionHandler: play/pause/nexttrack/previoustrack/seekbackward/seekforward | 73 | 57 | 15 | mirror → 15 | 82 |
| setActionHandler: **seekto** | 78 | **不支持** | 15 | mirror | 82 |
| setActionHandler: stop | 77 | 不支持 | 15 | mirror | 82 |
| setActionHandler: skipad | 128 | 不支持 | 15 | mirror | 82 |
| setPositionState | 81 | 57 | 15 | mirror | 82 |
| MediaMetadata.artwork | 57 | 不支持 | 14 | **不支持** | 82 |

**关键读法**：
1. **iOS Safari 支持 MediaSession（镜像桌面 Safari = 15+）**——所以桃阅读在 iOS 15+ 上**能**显示锁屏媒体卡。这一点与「Web Speech 时代完全不可能」形成对比。
2. **`safari_ios: "mirror"` 是镜像值，不是 iOS 独立验证**。MDN BCD 用 mirror 表示「假定与桌面 Safari 一致」，**并非在 iOS 真机上逐项验证的结果**。见 2.4 的实践警示。
3. **`seekto` 在 Chrome Android 上不支持**——Android Chrome 锁屏界面拖动进度条不会回调网页。所以**进度条拖拽必须依赖应用内控件**，不能指望锁屏。
4. **BCD 内部存在一处数据不一致，值得特别注意**：`MediaSession` 接口与其 `.metadata` 属性在 iOS 上是 mirror（= 支持，15+），但 **`MediaMetadata` 接口本身（含 `title`/`artist`/`album`/`artwork`）在 iOS Safari 上被 BCD 显式标注为 NO**。→ **这意味着「iOS 锁屏能不能显示标题/封面」在官方数据层面是自相矛盾的**，只能靠真机实测。兜底方案：把 PWA 自身的高质量图标（apple-touch-icon，512×512）做成与书本封面同风格，即使元数据不显示，系统回退图也不违和。

【一手】caniuse `wake-lock`（直接抓取 https://caniuse.com/data.json 解析）：全局使用率 **94.92%**；Chrome 85+、Edge 90+、**Safari/iOS Safari 16.4+**、Firefox 126+、Android Chrome 152+。https://caniuse.com/wake-lock

【一手】MDN BCD `api/WakeLock`：Chrome 84、Chrome Android mirror、Safari **16.4**、**iOS Safari 18.4**（注意：iOS 比桌面晚两个大版本）、Firefox 126。

### 2.4 iOS 的真实坑（本次一手发现的 WebKit 状态）

【一手】GitHub WebKit 仓库搜索（API: `repo:WebKit/WebKit MediaSession iOS`，183 条结果）中，2026-08-20 提交的 PR **#72048 仍然 open**：标题为「**Add partial implementation of media session call-to-action action handler behind an experimental feature flag**」。https://github.com/WebKit/WebKit/pull/72048

含义（本次解读）：
- 直到 2026 年 8 月，WebKit 的 **media session 动作回调（action handler）仍是「部分实现 + 实验特性开关」状态**。
- 因此：**iOS 锁屏上的标题/专辑文字能显示（metadata），但「锁屏按钮 → 网页回调」这条链路在 iOS 上不可靠**。
- **必须的应用内兜底**：锁屏只能作为「显示」通道；真正的传输控制（播放/暂停/上一段/下一段）必须在应用内 UI 完整可用。这与第 1 章的布局建议一致——应用内大按钮是主角，锁屏是配角。

【一手 + 解读】iOS Safari 播放 `<audio>` 时的系统行为（基于 BCD 与 MDN 文档推断，非真机实测，标注）：
- 用户在 Safari 中启动音频播放后锁屏，**音频会继续播放**（系统媒体策略允许后台媒体），锁屏/控制中心出现媒体卡。
- 因 `artwork` 在 iOS Safari 标注为不支持，媒体卡封面可能回退为 Safari 默认图；**建议把 PWA icon 做到 512×512 且与书本封面风格一致**，降低回退的违和感。
- 微信内置浏览器不是目标平台（第三轮已论证：Android X5 内核可能完全无 speechSynthesis；iOS WKWebView 仅系统语音）。服务端 TTS 时代，**音频走 `<audio>` 在微信内大概率可播**，但 MediaSession/Wake Lock 在 WebView 内不可靠——仍应引导用户用 Safari/Chrome 打开。

### 2.5 Wake Lock：怎么用、什么时候失效

【一手】MDN Screen Wake Lock API（https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API）：
- 用途：阻止设备变暗/锁屏/息屏。Baseline 2025（2025-03 起跨浏览器可用），**仅安全上下文（HTTPS）**。
- API：`navigator.wakeLock.request("screen")` → 返回 `WakeLockSentinel`；`sentinel.release()`；权限由 `screen-wake-lock` Permissions-Policy 控制（默认 allowlist 为 `self`，第三方 iframe 需显式授权）。
- **系统会自动释放 wake lock 的情形**：
  1. 文档变为不可见（页面切到后台、切换 tab、导航离开）；
  2. **低电量 / 省电模式**；
- **必须做的补偿**：监听 `visibilitychange`，页面重新可见时重新申请：
```js
document.addEventListener("visibilitychange", async () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    wakeLock = await navigator.wakeLock.request("screen");
  }
});
```
- 请求可能被系统拒绝（省电模式），必须 `try...catch` 并在 UI 上给出状态反馈。
- MDN 建议：下载类长任务用 Background Fetch，同步用 Background Sync，**不要用屏幕常亮去保活非媒体任务**。

### 2.6 桃阅读锁屏/后台播放落地清单

| 能力 | 方案 | 依赖 | 降级策略 |
|---|---|---|---|
| 锁屏媒体卡（标题/文案） | `new MediaMetadata({title: 书名, artist: "桃阅读", album: 段落标题})` | iOS 15+ / Android Chrome 57+ | 不支持时无锁屏卡，应用内控件照常 |
| 锁屏封面 | artwork 多尺寸 + **PWA icon 512×512 兜底** | iOS 不支持 artwork 字段 | 用应用图标 |
| 锁屏播放/暂停按钮 | `setActionHandler("play"/"pause")` | iOS 不可靠（见 2.4） | 应用内大按钮为主 |
| 锁屏上一首/下一首 | `setActionHandler("previoustrack"/"nexttrack")` → 上一段/下一段 | 同上 | 同上 |
| 锁屏进度拖拽 | `setActionHandler("seekto")` + `setPositionState` | **Android Chrome 不支持 seekto** | 应用内进度条 |
| 息屏继续播放 |Wake Lock（iOS 18.4+）+ 真实 `<audio>` 元素 | iOS 18.4+ | 低版本提示「请保持屏幕常亮」 |
| 后台播放（切 tab/回桌面） | 真实媒体流 + 系统媒体策略 | 全平台 | — |
| 首次播放 | 必须在用户手势（`pointerup`/`click`）中 `audio.play()` | 自动播放策略 | 引导页提示「点一下开始」 |

**一句话总结**：**把 MediaSession 当作「显示通道」来用，把 Wake Lock 当作「息屏保活」来用，所有控制能力都必须在应用内有等价实现。**

---

## 3. 字幕 / 高亮同步

### 3.1 行业标杆的实际做法

#### 3.1.1 Epic：逐词高亮（follow-along word highlighting）

【一手】Epic 官方帮助文章「Do Read-to-Me books offer word highlighting?」（通过 Zendesk 搜索 API 直接抓取正文）：

> 「We're excited to announce that Read-to-Me books for the website and our iOS/Android apps now offer **follow-along word highlighting** to help kids improve their reading skills on Epic. Word highlighting with Read-to-Me books **enables early readers to focus on the word as it is being spoken and strengthens the association between visual words and audio pronunciation**. The highlighting feature is **automatically enabled on all Read-To-Me books** and can be **toggled on/off** at your convenience from within the book **on iOS/Web** (while the feature is available on android, **the ability to disable it, is not**).」

交互路径（官方原文）：
- 网页端：按播放栏旁边的 **settings** → 切换「**Word Highlight**」
- iOS：书页内点**左上角三个点** → 切换「**Word Highlight**」

https://support.getepic.com/hc/en-us/articles/360027662011-Do-Read-to-Me-books-offer-word-highlighting

**设计要点提炼**：
1. **默认开启**（不是可选功能）——高亮是 Read-to-Me 的核心承诺；
2. **可关闭**——家长/孩子可以选择只看画面；
3. **平台差异诚实存在**（Android 可用但不能关）；
4. 入口在**播放栏旁边**，与播放控制同层。

#### 3.1.2 Vooks：字幕式高亮

【一手，本次抓取 vooks.com】：
- 「**read-along highlighted text**」
- 「**Text-highlighting helps kids connect what a word sounds like with what it looks like.**」
- 「highlights the words to help them start to read along」（教师证言）
- 另有「**audiobook mode**」纯听形态

https://vooks.com

**Epic vs Vooks 的形态差异**（对桃阅读的直接启发）：
| | Epic Read-to-Me | Vooks | 桃阅读建议 |
|---|---|---|---|
| 高亮单位 | 逐词（word） | 逐词（字幕式） | **逐字（中文无空格，按字符/词组）** |
| 文本位置 | 书页内嵌文字 | 屏幕底部字幕条 | 书页内嵌（图文同源）优先；字幕条作为兜底 |
| 开关 | settings 内 toggle | 默认开启 | 默认开启 + 播放栏旁可关 |
| 与画面的关系 | 页面自动翻页 + 高亮 | 动画 + 字幕 | 图文 + 高亮（不做全动画，成本与「不刺激」原则） |

### 3.2 没有官方时间轴时：三条技术路线

#### 路线 A（推荐）：TTS → ASR 回写对齐（同家族闭环）

【一手，本次抓取 StepFun 两份 API 文档，这是本报告最重要的技术发现】：

1. **stepaudio-3-gen-preview 明确不支持时间戳参数**：官方 API 参考原文——「`stepaudio-3-gen-preview` **不支持 `voice`、`voice_label`、`timestamp` 参数**」。https://platform.stepfun.com/docs/zh/api-reference/audio/generate
2. **同家族 ASR 支持字/词级时间戳**：`stepaudio-2.5-asr` 的异步转写接口，设 `show_utterances: true` 后返回：
   - 句级：`utterances[].start_time` / `end_time`（毫秒）
   - **字/词级：`utterances[].words[]`，每项含 `text`、`start_time`、`end_time`**（官方原文称「**字 / 词级时间戳**」）
   - 支持中英文（「中英文识别（暂不支持中文方言及其他语种）」）
   - 异步接口，建议「1s~3s 轮询一次」；音频 < 100MB，格式 wav/mp3/pcm/ogg/m4a
   https://platform.stepfun.com/docs/zh/api-reference/audio/asr.md

**闭环管线**（桃阅读可直接落地）：
```
书页文本（已知）
   │  ① chunk ≤1000 字 → stepaudio-3-gen-preview（wav, stream_format=sse）
   ▼
TTS 音频分片
   │  ② 合并 wav → stepaudio-2.5-asr（show_utterances=true）
   ▼
字级时间轴 words[]: {text, start_time, end_time}
   │  ③ 用「已知文本」对识别结果做约束式对齐（编辑距离对齐，纠正个别识别错字）
   ▼
前端高亮时间轴（与原文逐字对应）
```

**为什么这条路线最可靠**：
- 识别对象是**自己生成的 TTS 音频**——信噪比极高、无口音/噪声/重叠说话，ASR 准确率远高于真实场景；
- 文本已知 → 可用**约束式对齐**（把 ASR 结果与原文做序列对齐，纠正少量识别错误），而不是开环识别；
- 时间戳是**模型直接输出**，不是估算，精度可达毫秒级；
- 成本可控：ASR 按时长计费，预生成（非实时）时可批量处理。

**适用场景**：预生成模式（书架上架时后台跑一遍，时间轴随音频一起缓存）。**实时朗读场景不适用**（ASR 有轮询延迟）。

#### 路线 B：估算（均分 vs 标点权重）

当不能/不想调 ASR 时，用音频时长反推字级时间。中文无空格，估算单位是「字」。

**B1 纯均分**：`t_i = i / N × duration`（N = 字符数，不含标点）。
- 优点：零成本、实现 10 行代码。
- 缺点：完全忽略停顿与字长差异（「啊——」和「小明」等长），**段首段尾错位明显**，观感像「跑马灯」而非「跟读」。

**B2 标点权重法**（推荐的最小可行方案）：
```
句内停顿权重：。！？= 1.6 ，、；= 1.2 引号/省略号 = 1.1 普通字 = 1.0
字时长 = (duration - 停顿预算) × w_i / Σw
每个标点额外获得 pause（句末 300–500ms，句中 150–250ms，可标定）
```
- 优点：句末长停顿被建模，**高亮在「句子层面」会是对的**，观感接近 Epic 的 70–80%；
- 缺点：字内仍然均分，遇到感叹句/拟声词会漂移。

**B3 语速感知**：stepaudio 的 `speed` 参数会整体缩放时长——估算时要把目标 speed 代入，或在生成时固定 speed 并把实际 duration 记下来（推荐后者：永远用真实 duration 反推，不用理论估算）。

**估算路线的定位**：MVP/降级方案。**它够不够用，见 3.3。**

#### 路线 C：强制对齐开源工具

【一手，本次抓取 GitHub README】：

| 工具 | 做什么 | 维护状态 | 对桃阅读的适用性 |
|---|---|---|---|
| **aeneas**（readbeyond/aeneas） | 强制对齐（forced alignment）：给定文本片段列表 + 音频，输出每片的起止时间；输出 SMIL/SRT/VTT/JSON/TTML 等 | v1.7.3，**2017-03-15 发布后无新版**（AGPL v3） | **句级对齐**可靠（片段=句子），字级不直接支持；AGPL 对商业闭环有传染性风险 |
| **ffsubsync**（smacke/ffsubsync） | 语言无关的字幕与音频/视频对齐；**有浏览器版本**（ffmpeg.wasm，文件不上传） | MIT，活跃 | 适合「已有大致时间轴、做整体偏移校正」；不解决「从零生成字级时间轴」 |
| **WhisperX**（m-bain/whisperX） | **词级时间戳** ASW + 说话人分离；基于 Whisper + wav2vec2 对齐 | **24,070 stars，BSD-2，2026-08 仍活跃** | 路线 A 的开源自部署替代；若不想依赖 StepFun ASR，可用 WhisperX 自部署 |

来源：
- https://github.com/readbeyond/aeneas（README：版本 1.7.3 / 2017-03-15 / AGPL v3；输出格式清单）
- https://github.com/smacke/ffsubsync（README：language-agnostic；browser version with ffmpeg.wasm）
- https://api.github.com/repos/m-bain/whisperX（24,070 stars / BSD-2 / pushed 2026-08-30）

**注意**：aeneas 是 **AGPL v3**。桃阅读若在后端集成 aeneas 并通过网络提供服务，需评估传染性；WhisperX 是 BSD-2，宽松得多。这是选型时的真实约束。

### 3.3 「精度多少够用」

【一手，OpenAlex 取证】跨模态时间感知研究：
- 「**Natural asynchronies in audiovisual communication signals regulate neuronal multisensory interactions** in voice-sensitive cortex」（PNAS 2014，DOI 10.1073/pnas.1412817112）——原文：「When social animals communicate, the onset of informative content in one modality varies considerably relative to the other… **These naturally occurring asynchronies do not disrupt intelligibility or perceptual coherence.**」
- 「Audiovisual synchrony and temporal order judgments: Effects of experimental method and stimulus type」（Perception & Psychophysics 2008，DOI 10.3758/pp.70.6.955）

**结论（基于上述研究的工程解读）**：
| 精度 | 观感 | 方案 |
|---|---|---|
| ±50ms 以内 | 完美跟读 | ASR 回写（路线 A）/ WhisperX |
| ±100–200ms | 「跟得上」，偶尔感觉字飘 | 标点权重估算（B2）可用下限；ASR 回写的常见波动区间 |
| ±300–500ms | 「大概在这句」，像低质量卡拉OK | 纯均分（B1）——**不推荐用于逐字高亮** |
| >500ms 或错句 | 高亮反而干扰阅读 | 不如只做**句级高亮**或关闭高亮 |

**关键洞察**：**如果精度只能做到 ±300ms 以上，就降级为「句级高亮」而不是「字级高亮」**——句级高亮即使偏移半秒也在可接受范围内（因为句子持续时间长），而字级高亮偏移 300ms 就会让人觉得「对不上」。这是一个设计上的诚实降级路径，Epic 没有明说但产品上成立。

### 3.4 字级高亮的前端实现要点

1. **以音频 currentTime 为主时钟**：用 `requestAnimationFrame` 轮询 `audio.currentTime`（约 16ms 精度），不要用 setInterval（后台 tab 会被节流到 1s，高亮会卡）。
2. **时间轴索引化**：把 `words[]` 预处理成「开始时间 → 索引」的有序数组，每帧二分查找当前索引，O(log n)。
3. **变速兼容**：`audio.playbackRate` 改变时**时间轴不用重算**（currentTime 是播放位置的真实时间，倍速只影响推进速度）。
4. **seek 兜底**：拖拽/上一段后立即按新 currentTime 重定位高亮。
5. **高亮样式**：用 `background` 色块 + 轻微放大（1.02–1.05），**不要用闪烁动画**（Vooks 的「不刺激」原则 + 癫痫安全）。
6. **低性能设备降级**：若掉帧，改为每 200ms 更新一次 + 句级高亮。

---

## 4. 儿童 TTS 音色选择与 stepaudio 描述词模板

### 4.1 什么样的声音适合 3–8 岁孩子（研究证据）

#### 4.1.1 儿向语音（infant-directed speech, IDS）的跨文化共性

【一手，OpenAlex 取证】：
- 「**Motherese in Interaction: At the Cross-Road of Emotion and Cognition? (A Systematic Review)**」（PLoS ONE 2013，342 次引用，DOI 10.1371/journal.pone.0078103）——综述了 1966 年以来 **144 项**实验研究，结论原文：
  > 「General linguistic and **prosodic characteristics of IDS were found in a variety of languages**… **IDS promoted infants' affect, attention and language learning**… (1) IDS prosody **reflects emotional charges and meets infants' preferences**」
- 「**Acoustic regularities in infant-directed speech and song across cultures**」（Nature Human Behaviour 2022，178 次引用，DOI 10.1038/s41562-022-01410-x）——IDS 的声学规律具有跨文化普遍性。

**可提取的音色特征（研究共识）**：
| 维度 | 儿向语音的特征 | 对 stepaudio 描述词的含义 |
|---|---|---|
| 音高 | 高于成人日常对话音高 | 「音调偏高」「声线明亮」 |
| 音高范围 | 更大的音高起伏（夸张语调） | 「语调起伏明显」「抑扬顿挫」 |
| 语速 | 慢于日常语速 | 「语速偏慢」「不急不缓」 |
| 节奏 | 更规则的节奏、更长停顿 | 「一句一顿」「停顿明显」 |
| 情感 | 正向情感负载、温暖 | 「温柔」「有亲和力」「带笑意」 |
| 清晰度 | 夸张的咬字 | 「吐字清晰」 |

**注意一个反直觉的发现**（【一手】OpenAlex）：「Infants' memory for musical performances」（Developmental Science 2006，DOI 10.1111/j.1467-7687.2006.00536.x）——**6–7 个月的婴儿偏好更低音高的摇篮曲演绎**（「both age groups preferred lower-pitched to higher-pitched renditions of unfamiliar lullabies」）。

→ **场景分化结论**：**故事/互动场景**适合明亮、偏高、起伏大的声音（IDS 范式）；**哄睡场景**适合偏低、舒缓、起伏小的声音（摇篮曲范式）。**桃阅读不应全篇用一个音色**，至少区分「故事音色」与「哄睡音色」。

#### 4.1.2 孩子对合成语音的接受度

【二手/推断】本次未找到专门针对「3–8 岁儿童对 TTS 音色偏好」的强实证论文（OpenAlex 检索到多为人机交互泛题），**标注为证据缺口**。可用的间接依据：
- 「Does Use of Text-to-Speech and Related Read-Aloud Tools Improve Reading Comprehension for Students With Reading Disabilities?」（Journal of Learning Disabilities 2017，191 次引用）——TTS/朗读工具被广泛用于辅助阅读理解，但其效果**证据混合**（「It is not clear how effective text-to-speech is at improving reading comprehension」）。→ **TTS 是「辅助通道」而非「教学替代」**，桃阅读的内容设计（图文 + 亲子共读）仍是主体。
- 工程常识（【二手】）：儿童对「机械感」的容忍度低于成人，因为儿童还没建立「语音=机器」的刻板预期，反而更容易因为不自然而分心。→ 拟人化（第四轮 stepaudio 的核心能力）在儿童场景的收益高于成人场景。

### 4.2 stepaudio-3-gen-preview 音色描述机制（一手规格）

【一手】StepFun 开放平台文档（本次直接抓取两份页面 + API 参考）：

**模型与端点**：
- 模型：`stepaudio-3-gen-preview`（Gen 系列，「统一生成人声、音效、环境音与背景音乐」）；**限时免费**（preview 版在免费期结束后会被正式付费版替换）
- 端点：`POST https://api.stepfun.com/v1/audio/generate`
- 任务：`task: "text_to_audio"`（当前仅支持）

**与音色直接相关的参数**：

| 参数 | 类型 | 说明（官方原文） |
|---|---|---|
| `roles` | array | 角色音色描述；「所有 `name` 和 `description` 合计最多 **500 个字符**」 |
| `roles[].name` | string | 角色名，如「主唱」；**须与 description 同时填或同时留空** |
| `roles[].description` | string | 音色描述，如「二十多岁的青年男性，嗓音略带沙哑，演唱时气息饱满」 |
| `scripts` | array | 台词/音效/背景音描述；「合计最多 **1000 个字符**」 |
| `scripts[].speaker` | string | 「台词对应的 `roles.name`。纯音效或 BGM 描述可以不传。」 |
| `scripts[].text` | string | 台词、音效或 BGM 描述（**必填**） |
| `instruction` | string | 「全局自然语言指导，用于设定**环境、BGM 和情绪基调**，最多 500 个字符」 |
| `speed` | number | 「语速，范围为 **0.5～2**」 |
| `volume` | number | 「音量，范围为 **0.1～2.0**」 |
| `response_format` | string | `wav` / `mp3` / `flac` / `opus` / `pcm` |
| `sample_rate` | integer | 8000 / 16000 / 22050 / 24000 / 48000 |
| `stream_format` | string | 默认 `audio`；**`sse` 通过 Server-Sent Events 持续返回 Base64 编码的音频分片** |
| `return_url` | boolean | 是否返回音频 URL |
| `pronunciation_map` | object | 发音替换规则（可做生僻字/多音字纠正） |
| `text_normalization` | string | `standard` / `enhanced`（文本归一化策略） |

**明确的限制**：
- 「`stepaudio-3-gen-preview` **不支持 `voice`、`voice_label`、`timestamp` 参数**」→ **不能用预设音色 ID，只能用描述；也没有时间戳**（时间轴必须走第 3 章的 ASR 回写或估算）。
- 「超出长度限制或传入不支持的参数时，接口返回 HTTP 400。」
- `reference_to_audio`（参考音频复刻）「暂未开放」。

**官方音色描述范例（StepFun 自己的 demo 与文档，原文引用）**：
- 文档示例（机场场景）：地勤 = 「三十岁上下的男性，声音干练利落，语速快，带着停机坪作业的专注，需盖过引擎噪音而略提高音量」；塔台 = 「女性，声音同样经无线电传输，字正腔圆略带失真，冷静下达指令」
- demo 页范例（static.stepfun.com/blog/stepaudio3/gen/）：
  - **儿童音**：「**年幼男童，声音奶乎乎脆生生的，带着满满都雀跃感，天真烂漫。**」
  - 青年女性：「二十二三岁女生，嗓音清亮通透，说话语速偏快，情绪上来音调会不自觉拔高，笑点低，容易开心大笑。」
  - 中年男性：「五十多岁男性，嗓音低沉浑厚，一句一顿，专业笃定。」
  - Voice Design 高龄范例：「高龄男性 / 虚弱沙哑 / 气息短促」
- demo 页展现的描述结构：**ROLE（年龄/性别/音色/语速/情感）+ DIRECTOR（空间/混响/环境/氛围）+ SCRIPT（带表演标注的台词 + 括号副语言 + 方括号音效）**

来源：
- https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-gen（模型说明）
- https://platform.stepfun.com/docs/zh/api-reference/audio/generate（API 参考）
- https://static.stepfun.com/blog/stepaudio3/gen/（demo 描述范例）
- https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-tts（TTS 系列：2.5 元/万字，音色复刻 9.9 元/音色）

### 4.3 描述词怎么写效果好（跨厂商方法论）

【一手】阿里云百炼「声音设计用户指南」（CosyVoice 系，与 stepaudio 同为「自然语言描述音色」流派，方法论可直接迁移）：https://help.aliyun.com/zh/model-studio/voice-design-user-guide

**官方五条原则（原文）**：
1. **具体而非模糊**：使用描绘声音特质的词语，如「低沉」「清脆」「语速偏快」，避免「好听」「普通」等主观或模糊的表述。
2. **多维而非单一**：好的描述通常涵盖多个维度（如性别、年龄、情感等）。仅写「女声」过于宽泛。
3. **客观而非主观**：聚焦声音的物理和感知特征。用「音调偏高，带有活力」代替「我最喜欢的声音」。
4. **原创而非模仿**：描述声音的特质，而非要求模仿特定人物（名人、演员）——模型不支持模仿，且涉及版权风险。
5. **简洁而非冗余**：避免重复的同义词或无意义的修饰。

**官方推荐维度**：

| 维度 | 示例 |
|---|---|
| 性别 | 男性、女性、中性 |
| 年龄 | 儿童(5-12岁)、青少年(13-18岁)、青年(19-35岁)、中年(36-55岁)、老年(55岁以上) |
| 音调 | 高音、中音、低音、偏高、偏低 |
| 语速 | 快速、中速、缓慢、偏快、偏慢 |
| 情感 | 开朗、沉稳、温柔、严肃、活泼、冷静、治愈 |
| 特点 | 有磁性、清脆、沙哑、圆润、甜美、浑厚、有力 |
| 用途 | 新闻播报、广告配音、有声书、动画角色、语音助手、纪录片解说 |

**官方儿童音范例**：「可爱的儿童声音，大约 8 岁女孩，说话略带稚气，适合动画角色配音。」

**官方提醒**：「声音设计具有随机性，相同描述可能生成略有差异的音色。**建议多次生成后试听，择优使用。**」→ **桃阅读必须建一个「音色试听-定稿」流程：同一描述生成 N 次，人工/家长侧试听选优，把定稿的音频样本与描述一起存档**，而不是每次合成都重新抽卡。

### 4.4 StepFun 官方音色库可复用的「描述词汇表」

【一手】StepFun「获取官方音色详情」文档中的音色命名与描述（这些是 stepaudio-3-tts 的预设音色，gen-preview 不支持 voice ID，但**这些描述文本本身就是最好的描述词训练语料**）：

**儿童/稚气向**：
- `linjiameimei` 邻家妹妹：「女，可爱亲和，**稚气感**」
- `ruanmengnvsheng` 软萌女声：「女，可爱、甜、嗲」
- `yuanqishaonv` 元气少女：「女，声线细腻，甜、嗲」
- `jilingshaonv` 机灵少女：「女，声线细腻，**有活力**」

**温柔/陪伴向（妈妈音基底）**：
- `tianmeinvsheng` 甜美女声：「女，甜美温柔，亲和力强」
- `wenrounvsheng` 温柔女声：「女，温柔甜美，**叙述感强，有关怀感**」← 官方把「有关怀感」与「叙述感强」组合，正是妈妈讲故事音色的核心
- `linjiajiejie` 邻家姐姐：「女，有亲和力…**给人安全感**」
- `elegantgentle-female` 气质温婉：「女，真诚温柔，亲和力强，给人安全感」

**讲故事/有声书向（爸爸音、爷爷音基底）**：
- `ruyananshi` 儒雅男士：「男，**沉稳厚重，叙述感强，有亲和力、陪伴感**」← 有声书场景官方首推之一
- `cixingnansheng` 磁性男声：「男，深情厚重，有感染力」
- `shenchennanyin` 深沉男音：「男，有感情，代入感强，给人信心」
- `wenrougongzi` 温柔公子：「男，沉稳温柔，叙述感强」
- `boyinnansheng` 播音男声：「男，播音腔，中正平稳」

**英文音色（双语绘本需要）**：
- `vibrant-youth`：「男，英文音色，温柔亲和」
- `lively-girl`：「女，英文音色，亲和感，有活力」
- `soft-spoken-gentleman`：「男，英文音色，沉稳温柔，给人安全感」

**情感/风格标签体系**（来自「音频合成最佳实践」文档，注意：**这些 voice_label 标签属于 step-tts-2，gen-preview 不支持 voice_label**，但可作为描述词的情绪词汇库）：
- 情绪：高兴、悲伤、生气、撒娇
- 风格：冷漠、温柔、严肃
- 语速：慢速、快速

**官方对 AI 语音的合规建议**（原文）：「建议您告知用户音频为 AI 生成，**以便于用户感知相关音频为 AI 生成**。」→ 桃阅读应在关于页/设置页标注「朗读由 AI 生成」，这是一条可落地的合规动作。

### 4.5 桃阅读可直接使用的音色描述词模板（中文，可直接粘贴）

以下模板按 `roles[].description` 的 500 字符上限设计（实际每条约 40–80 字，留足空间），并给出配套的 `instruction`（环境/情绪基调）、`speed`、`volume` 建议。

#### 模板 1：温柔妈妈音（默认音色，0–6 岁睡前故事）

```yaml
roles:
  - name: 旁白
    description: >
      二三十岁的年轻母亲，嗓音温柔清亮，音调偏高，语速偏慢，
      吐字清晰圆润，带着轻轻的笑意和关怀感，像在床头给孩子讲故事，
      语调起伏柔和，不急不缓。
instruction: "温暖的卧室灯光，安静安全的氛围，适合睡前亲子共读的轻柔叙述。"
speed: 0.9
volume: 1.0
```
**说明**：融合官方 `wenrounvsheng`（温柔甜美、叙述感强、有关怀感）+ IDS 特征（音调偏高、语速偏慢、情感正向）。

#### 模板 2：活泼童声（适合 3–8 岁对话/儿歌/拟声段落）

```yaml
roles:
  - name: 旁白
    description: >
      六七岁的小女孩，声音奶乎乎脆生生的，音调偏高而明亮，
      说话带着雀跃感和天真烂漫，语速偏快，容易开心地笑出声。
instruction: "明亮欢快的白天场景，充满好奇与活力。"
speed: 1.0
volume: 1.0
```
**说明**：直接化用 StepFun demo 范例「年幼男童，声音奶乎乎脆生生的，带着满满的雀跃感，天真烂漫」+ 阿里云范例「可爱的儿童声音，大约 8 岁女孩，说话略带稚气」。

#### 模板 3：沉稳爸爸音（适合冒险/科普/稍长故事，5–8 岁）

```yaml
roles:  - name: 旁白
    description: >
      三四十岁的青年父亲，嗓音低沉浑厚而不严厉，音调中偏低，
      吐字沉稳有力，语速中等偏慢，叙述感强，带着安全感和陪伴感。
instruction: "沉稳专注的讲述氛围，像父亲在书房里给孩子讲一个真正的冒险故事。"
speed: 0.95
volume: 1.0
```
**说明**：融合 `ruyananshi`（沉稳厚重、叙述感强、亲和力、陪伴感）+ `shenchennanyin`（代入感强、给人信心）。

#### 模板 4：故事爷爷音（适合民间故事/童话/哄睡尾声）

```yaml
roles:
  - name: 旁白
    description: >
      六十多岁的老爷爷，嗓音沙哑而温暖，气息绵长，音调偏低，
      语速缓慢，一句一顿，像摇着蒲扇在院子里讲老故事，
      带着慈祥和慢慢的笑意。
instruction: "夏夜院子里的悠长宁静，怀旧而安全的讲述氛围。"
speed: 0.85
volume: 0.9
```
**说明**：参考 demo 页「高龄男性 / 虚弱沙哑 / 气息短促」的反向用法——去掉「虚弱」保留「沙哑绵长」，「气息短促」改为「气息绵长」（虚弱会显得不精神，不适合长篇幅）。**这一条是「描述词需要人工校准」的典型例子：直接抄 demo 范例会掉坑。**

#### 模板 5：哄睡专用音（夜间模式，低刺激）

```yaml
roles:
  - name: 旁白
    description: >
      年轻母亲，嗓音轻柔低缓，音调偏低，气息轻，
     
      语速很慢，几乎像在耳语，语调起伏很小，
      没有情绪起伏，平稳而安心。
instruction: "深夜卧室，只有微弱的夜灯光，安静、催眠、安全的氛围。"
speed: 0.8
volume: 0.7
```
**说明**：依据 Developmental Science 2006 的发现（婴儿偏好**更低音调**的摇篮曲演绎）+ Tonies 的「gradually lowers the volume」范式。**speed 0.8 + volume 0.7 是建议起点，配合定时渐弱（第 6 章）。**

#### 模板 6：多角色对话（绘本里的角色音）

```yaml
roles:
  - {name: 小狐狸, description: "五六岁的小男孩，声音奶声奶气，语速偏快，好奇心重。"}
  - {name: 狐狸妈妈, description: "年轻母亲，嗓音温柔清亮，音调偏高，语速偏慢，关怀感强。"}
  - {name: 老山羊, description: "六十多岁的老爷爷，嗓音沙哑低沉，语速缓慢，一句一顿，慈祥。"}
scripts:
  - {speaker: 小狐狸, text: "（好奇地）妈妈，那座山的外面是什么呀？"}
  - {speaker: 狐狸妈妈, text: "（温柔地）外面呀，是另一座山。等你长大了，妈妈陪你去看看。"}
  - {speaker: 老山羊, text: "（慢吞吞地）山外有山——这话我听了六十年咯。"}
instruction: "阳光穿过森林的午后，温暖、安静、带一点点神秘。"
speed: 0.95
```
**说明**：scripts 的括号副语言（「好奇地」「温柔地」）是 StepFun demo 页验证过的写法；scripts 合计 ≤1000 字符 → **一本绘本需要按场景拆成多次调用再拼接**（见 4.6）。

### 4.6 工程约束（对落地有直接影响的硬限制）

1. **scripts ≤ 1000 字符/次** → 一段 300 字的绘本单页一次调用够用；一个 2000 字的章节必须拆 2–3 次调用并**拼接音频**。拼接点要做交叉淡入淡出（crossfade）避免爆音。
2. **roles + instruction ≤ 500 字符** → 角色多时 description 必须精简（每角色 ≤ 60–80 字）。
3. **同一描述每次生成有随机性**（阿里云官方提醒）→ **预生成模式**（上架时生成一次并缓存）远优于**实时生成**（每次听都变音）。这也正好匹配第 3 章的 ASR 回写时间轴流程（都在预生成时一并完成）。
4. **音色定稿流程**：每个模板生成 3–5 次试听 → 选最优 → 把「描述 + 生成参数 + 试听样本」存档为「桃阅读官方音色」（可命名「桃桃妈妈音」「果果童声」），之后同风格内容复用同一组参数，**保证用户每次听到同一个声音**。这是「无 voice ID」约束下实现「音色一致性」的唯一可靠路径。
5. **speed 与高亮时间轴**：stepaudio 支持 speed 0.5–2，但**儿童语音建议工作区间 0.8–1.25**（低于 0.7 会显得拖沓怪异，高于 1.5 会像花栗鼠）。倍速档位用「生成时 speed 固定 + 前端 playbackRate 微调」结合。
6. **合规**：在设置/关于页标注「朗读声音由 AI 生成」（StepFun 官方建议原文：「建议您告知用户音频为 AI 生成，以便于用户感知相关音频为 AI 生成」）。
7. **成本**：gen-preview 当前**限时免费**；免费期结束后可评估降级到 stepaudio-3-tts（**2.5 元/万字**，音色复刻 **9.9 元/音色**）。一本 3000 字绘本 ≈ 0.75 元（TTS 口径），可承受；但 ASR 回写时间轴会额外产生一笔转写成本，需计入。
8. **格式选择**：**流式首播用 `mp3`（体积小、解码快）；需要 ASR 对齐时用 `wav`（无损、无编码延迟）**。建议预生成流程产出 wav → 跑 ASR → 再转 mp3 给前端播放，一条流水线两份产物。`sample_rate` 建议 24000（语音足够，文件最小）。

---

## 5. 听书与阅读的关系：研究证据与「听读互跳」设计

### 5.1 核心理论框架：简单视图（Simple View of Reading）

【一手，OpenAlex 取证】：
- Gough & Tunmer (1986) / Hoover & Gough (1990) 提出「**简单视图**」：**阅读理解 = 解码 × 听力理解（RC = D × L）**。
- 后续验证：「The simple view of second language reading throughout the primary grades」（Reading and Writing 2011，223 次引用）原文：「In the Simple View of Reading proposed by Hoover and Gough (1990), reading comprehension is conceived as the product of word decoding and listening comprehension. It is claimed that **listening comprehension or the linguistic processes involved in the comprehension of oral language strongly constrain the process of reading comprehension**.」
- 「Revisiting the simple view of reading」（British Journal of Educational Psychology 2008，155 次引用）、「The Science of Reading Progresses: Communicating Advances Beyond the Simple View of Reading」（Reading Research Quarterly 2021，497 次引用）——框架 35 年后仍在被检验与扩展。

**对桃阅读的直接含义（这是本节的结论）**：
- 公式里是**乘法**：解码能力为 0（不识字/初学识字的孩子），阅读理解恒为 0，**无论文本多简单**。
- 因此 3–8 岁孩子理解故事的通道**就是听力理解**。朗读不是「阅读的替代品」，而是**这个年龄段唯一可用的意义通道**。
- 随着解码能力上升（6–8 岁、小学低年级），阅读理解的权重逐渐转向解码 + 听力的乘积，这时候「边听边看字」才开始产生独特价值（把两个因子同时激活）。

### 5.2 三种形态的证据对照

#### 5.2.1 纯听（audiobook-only）

【一手】National Literacy Trust 2026 年报告（基于年度识字调查）：
- 《Children and young people's audio listening in 2026》（8–18 岁，N=110,114）：「Nearly half (**47.3%**) listened to audiobooks, podcasts or both」；听书者中 56.4% 每周至少听一次；**「Audiobook listening became less common with age」**（即：年龄越小，听书占比越高——因为阅读能力尚未形成）；有声书与「imagination, immersion and reading-related experiences」相关；**「50.3% of listeners said it feels like reading」**、**「36.6% said it sparked a reading interest」**、**「30.1% reported sometimes reading along」**。
  https://literacytrust.org.uk/research-services/research-reports/children-and-young-peoples-audio-listening-in-2026/
- 《Audiobooks in the home in 2026》（5–18 岁孩子的家长）：「around **7 in 10 households (69.2%)** listened to audiobooks」；**「parents and children listening together」占 28.5%**；**共享收听享受度最高（93.5%）**，高于家长单独听（87.8%）或孩子单独听（85.8%）；**「two thirds (66.7%) listened at bedtime」**；「audiobooks helped them relax (49.7%)」；「strengthened family bonds (63.2%)」。
  https://literacytrust.org.uk/research-services/research-reports/audiobooks-in-the-home-in-2026/

**要点**：**共享收听的享受度（93.5%）是所有形态里最高的**——这是桃阅读「亲子共读」定位的最强外部佐证；**2/3 的共享听书发生在睡前**——直接支持桃阅读的睡前场景定位。

#### 5.2.2 图文 + 听（read-along / 边听边看）

【一手，OpenAlex 取证】：
- 「**The effects of shared storybook reading on word learning: A meta-analysis**」（Developmental Psychology 2018，237 次引用，38 项研究 / 2,455 名儿童 / 110 个效应量）：学龄前儿童**能从共享绘本阅读中成功习得词汇**，并量化了阅读风格、重复次数、词频等因素的调节作用。
- 「**Shared Picture Book Reading Interventions for Child Language Development: A Systematic Review and Meta-Analysis**」（Child Development 2019，376 次引用，19 项 RCT，N=2,594，儿童 1–6 岁）：绘本共享干预对**表达性语言 d = 0.41**、**接受性语言 d = 0.26**（小型但稳健的效应）。
- 「**Home Reading Environment and Brain Activation in Preschool Children Listening to Stories**」（PEDIATRICS 2015，189 次引用）：用 fNIRS 研究学龄前儿童**听故事时的大脑激活**——「Parent-child reading is widely advocated… AAP 建议从出生开始」。
- 「**Young L2 learners' online processing of information in a graded reader during reading-only and reading-while-listening conditions**」（Applied Linguistics Review 2019，57 次引用）：「Combining reading with auditory input has been shown to be an effective way of supporting reading fluency and reading comprehension」；「reading comprehension can be further supported by pictorial information」。
- 「**Does Use of Text-to-Speech and Related Read-Aloud Tools Improve Reading Comprehension for Students With Reading Disabilities?**」（Journal of Learning Disabilities 2017，191 次引用）——TTS/朗读工具的效果**证据混合**：「It is not clear how effective text-to-speech is at improving reading comprehension」。

**要点**：
1. **图文 + 朗读是 3–8 岁词汇吸收证据最强的形态**（两个 meta 分析、数千名儿童）。
2. 「边听边看」对**已有一定解码能力**的孩子（5–8 岁）收益最明确；对完全不识字的 3–4 岁，高亮的作用是「建立字音—字形关联的早期暴露」而非直接词汇习得。
3. **TTS 朗读 vs 真人朗读**：现有研究多基于真人朗读或 TTS 工具，**没有找到专门比较「AI 拟人 TTS 朗读」与「真人朗读」对幼儿词汇吸收差异的研究**——标注为证据缺口。可用的保守推论：stepaudio 这类拟人化 TTS 在「自然度」上逼近真人（第 4 章），但**亲子共读中的「对话、提问、停顿」是 TTS 无法替代的**——这是桃阅读坚持「亲子共读」而非「机器带读」的理论依据。

#### 5.2.3 只读（text-only）

【一手】「**Parent–Toddler Behavior and Language Differ When Reading Electronic and Print Picture Books**」（Frontiers in Psychology 2017，69 次引用，102 名 17–26 个月幼儿的家长）——家长与孩子读电子书 vs 纸质书时，**行为与语言有显著差异**，并考察了行为与词汇学习的关联。

【一手】「Screen time and preschool children: Promoting health and development in a digital world」（Paediatrics & Child Health 2023，153 次引用）——加拿大儿科协会立场：对 5 岁以下儿童的屏幕媒体提出「**minimizing, mitigating, mindfully using, modelling**」（最小化、缓解、用心使用、以身作则）四原则。

**要点**：对 3–8 岁孩子，**纯文字阅读不是独立可用的形态**（解码能力不足）；桃阅读的「只读」形态应理解为「孩子自己翻页看图 + 家长读」，而不是「孩子自己读字」。

### 5.3 什么时候只听、什么时候看字

基于 5.1–5.2 的证据，给出桃阅读的**场景—形态路由**（结论性建议，非直接实验证据）：

| 场景 | 推荐形态 | 依据 |
|---|---|---|
| 睡前哄睡（关灯/昏暗） | **纯听**（夜间模式 + 渐弱） | NLT：66.7% 共享听书在睡前；Epic 把 Audiobook 定位为「perfect for bedtime stories」；Vooks「Soothing and non-addictive」 |
| 车上/出行/做手工 | **纯听** | 解放眼睛；NLT：听书与「imagination, immersion」相关 |
| 亲子共读（白天，家长在场） | **图文 + 朗读 + 逐字高亮** | 词汇习得证据最强（两个 meta 分析）；共享享受度最高（93.5%） |
| 孩子自主翻看（3–5 岁） | **图文 + 朗读**（高亮可选） | 听力理解是唯一意义通道（简单视图）；孩子看图，朗读补足语言层 |
| 初学识字（5–8 岁） | **图文 + 朗读 + 逐字高亮（默认开）** | Epic 范式：「strengthens the association between visual words and audio pronunciation」；边听边看收益最明确 |
| 家长想安静/孩子已睡着 | **纯听 + 定时关闭** | — |

**什么时候只听更好**：睡前（光线、不打扰睡意）、注意力需要收拢时（减少视觉刺激）、家长不在场时（孩子无法独立读字）。
**什么时候看字更好**：有识字目标时（5–8 岁）、白天亲子共读、孩子主动问「这个字念什么」时。

### 5.4 「听读互跳」入口设计

【一手 + 设计建议】Epic 的范式（1.2.1 节）给出了最干净的答案：**不做「模式切换开关」，而是在书架/详情页用不同的入口标签把两种形态分开**（紫色 Audiobook 标签 = 纯听；绿色 Read-to-Me 标签 = 图文跟读）。

**桃阅读的落地方案**：

1. **书详情页两个并排入口**（不做下拉、不做二级菜单）：
   - 「**听故事**」→ 纯听播放器（封面 + 极简控件，夜间模式优先）
   - 「**看故事**」→ 图文阅读器（页面 + 朗读 + 逐字高亮）
   - 两个入口共用同一份音频与时间轴（预生成一次，两种形态复用），**不重复调用 TTS**。
2. **播放中互跳**：
   - 纯听播放器右上角常驻「**看绘本**」按钮 → 跳到图文阅读器，**定位到同一 currentTime**（时间轴共享，这是技术关键）。
   - 图文阅读器内点封面/「**只听**」按钮 → 收起页面，进入纯听播放器，**位置不变**。
   - 互跳必须保持播放连续（不重新加载、不从头开始）——这要求两种形态共用同一个 `<audio>` 实例与时间轴。
3. **高亮开关的位置**：图文阅读器内，播放栏旁（Epic 的 settings toggle 范式），默认开启。
4. **不做的事**：不要让用户在「听/看」之间做「二选一且不可逆」的选择；不要在播放器里放复杂的「阅读模式设置面板」。

---

## 6. 睡眠场景

### 6.1 行业基准：哄睡定时怎么做的

| 产品 | 定时方式 | 渐弱 | 夜间模式 | 续播位置 | 证据 |
|---|---|---|---|---|---|
| **Toniebox 2** | 内建 sleep timer | **「gradually lowers the volume before switching off automatically」** | 日/夜分别设亮度与音量 | — | 【一手】us.tonies.com |
| **Yoto Player** | 「timers and calming audio lead into bedtime」；闹钟/计时器（刷牙、作业） | 未取证 | 夜灯（full-panel night light）+ okay-to-wake 起床提示 | 「Card in. Play begins.」从卡片头开始 | 【一手】yotoplay.com |
| **凯叔讲故事** | 播放页左下角**闹钟按钮** → **支持「自定义时间」**（时/分） | 未取证（「播完睡前诗」是内容层衔接） | 未取证 | 「上次听到这里」断点续播 | 【一手】百度经验 + report-cn-apps.md |
| **喜马拉雅** | 播放页**时钟图标** → 选时长 → 显示倒计时 | 未取证 | 未取证 | 未取证 | 【二手】百度经验 |
| **Vooks** | sleep timer（第三轮取证） | 未取证 | 「Soothing and non-addictive」定位 | — | 【二手】 |
| **Audible** | 行业通行：15/30/45/60 分钟 +「end of chapter」 | 未取证 | 未取证 | 停止时保存位置 | 【未逐项取证】help.audible.com 本次返回加载错误 |

### 6.2 桃阅读哄睡功能的设计建议

#### 6.2.1 定时档位（建议）

**固定档位 + 读完本段/本章 + 自定义**（凯叔支持自定义，是儿童场景的合理项——孩子入睡时间不可预测）：

- **快捷档**：10 / 20 / 30 分钟（覆盖 3–8 岁典型入睡时长）
- **「读完这一段」**（不是「读完本章」——桃阅读的段落粒度更细，对孩子更友好，也更接近「自然停止点」）
- **自定义**：分钟选择器（凯叔范式）
- **倒计时显示**：播放界面常驻小倒计时（喜马拉雅范式），点按可提前取消/延长
- **入口位置**：播放器首屏（**不要进二级菜单**——关灯后要一步点到）

#### 6.2.2 音量渐弱（Tonies 范式，本报告最推荐的功能）

【一手】Tonies 官方原文：「the sleep timer **gradually lowers the volume before switching off automatically**, so little listeners can **drift off without abrupt stops or interruptions**」。

**为什么重要**：突然停止会把快要睡着的孩子惊醒或让孩子在静默中醒来。渐弱是「哄睡定时」与「闹钟式定时」的本质区别。

**技术实现**（服务端 TTS 时代才能做——见 2.1）：
```
最后 N 分钟（建议 N=3）：
  GainNode.gain.setValueAtTime(currentVolume, t_now)
  GainNode.gain.linearRampToValueAtTime(0.0, t_now + 180s)
  → 到 0 后 audio.pause() + 记录 currentTime
```
- 用 Web Audio 的 `GainNode` 包络（`linearRampToValueAtTime`）；
- 若音频走纯 `<audio>`（不经 Web Audio），降级用 `setInterval` 每 5s 把 `audio.volume` 乘 0.9（iOS Safari 的 `volume` 属性可写，但步进感稍粗）；
- **渐弱期间禁用「上一段/下一段」的自动衔接音量跳变**（否则渐弱被打断）。

#### 6.2.3 夜间模式

- 深色背景 + 降低对比度（不要纯黑 + 纯白，用 #1a1a2e 底 + #e8e6d8 字）；
- 隐藏非必要控件（只留播放/暂停 + 定时 + 夜间模式退出）；
- 关闭所有动效（Vooks「without overstimulating」）；
- 屏幕亮度交由系统（不自建亮度滑杆——多余且费电）；
- **夜间模式与哄睡音色联动**：开启夜间模式 → 提示切换到「哄睡专用音」（模板 5，speed 0.8 / volume 0.7）。

#### 6.2.4 自动停止后的续播位置记忆

- 定时结束/渐弱结束时，**把 currentTime 落盘（localStorage / IndexedDB）**，键为 书ID；
- 下次打开该书详情页：显示「**上次听到这里 →**」（凯叔范式），一键从断点继续；
- 断点精度：**吸附到段起点**（而不是秒级位置）——睡前迷糊状态下的孩子，从「这一段开头」重新听比从「第 147 秒」重新听友好得多；
- 纯听与图文两种形态共用同一个断点（时间轴共享，见 5.4）。

#### 6.2.5 睡眠场景的证据基础

【一手，OpenAlex】：
- 「A randomized controlled trial of bedtime music for insomnia disorder」（Journal of Sleep Research 2019，91 次引用，n=57）——**把 audiobook 作为对照组**（music vs audiobook vs waitlist）：睡前音频是被使用的入睡策略。
- 「Listening to music for insomnia in adults」（Cochrane Database of Systematic Reviews 2022，58 次引用）——听音乐改善失眠的证据存在但有限。

**诚实标注**：以上研究针对**成人失眠**，不是儿童哄睡。**没有找到专门研究「儿童听有声书与入睡潜伏期」的强实证论文**——这是证据缺口。桃阅读的哄睡功能有**行业基准**（Tonies/Yoto/凯叔/Vooks 都做）与**机制合理性**（渐弱不惊醒），但**不应宣传「助眠」「治疗失眠」等医疗化表述**。

---

## 7. 播放器控件清单与布局建议（汇总版）

### 7.1 必需控件（P0，不做就不能上线）

| 控件 | 规格 | 依据 |
|---|---|---|
| 播放 / 暂停 | 单键切换，≥64dp，居中 | 全部产品；儿童最早成熟的手势是点按 |
| 上一段 / 下一段 | 两个大按钮，左右对称 | Yoto 实体键 / Toniebox 拍打侧键 / Epic play bar；3 岁孩子的「进度条」 |
| 定时关闭 | 首屏可见（⏰ 图标）；10/20/30 分钟 + 读完本段 + 自定义 | 凯叔（闹钟按钮 + 自定义时间）、喜马拉雅（时钟图标 + 倒计时）、Tonies（sleep timer） |
| 音量渐弱关闭 | 定时结束前 3 分钟线性渐弱到 0 | Tonies 官方范式（一手） |
| 续播位置记忆 | 「上次听到这里」，吸附到段 | 凯叔 |
| 后台/锁屏标题 | MediaMetadata（title/album/artist） | MDN + BCD（iOS 15+） |
| 用户手势启动播放 | pointerup/click 中 `audio.play()` | MDN Autoplay 指南 |

### 7.2 次必需控件（P1，第二迭代）

| 控件 | 规格 | 依据 |
|---|---|---|
| 进度条 | 段刻度优先，吸附到段，时间显示次要 | 儿童 drag 研究（推断）；家长需要 |
| 倍速 | 5 档：0.8 / 0.9 / 1.0 / 1.1 / 1.25，紧邻播放条 | Epic speedometer 图标范式；喜马拉雅 7 档对儿童过多 |
| 逐字高亮开关 | 播放栏旁 toggle，默认开 | Epic Word Highlight 范式（一手） |
| 夜间模式 | 一键切换，切换后隐藏非必要控件 | Vooks / Tonies 日夜分别设置 |
| 段落列表 | 「☰」入口，当前段高亮 | Yoto 像素图标章节导航的弱化版 |

### 7.3 增强控件（P2，有余力再做）

| 控件 | 说明 |
|---|---|
| 音色切换（预设 2–3 个定稿音色） | 「妈妈音 / 爸爸音 / 哄睡音」，不要做自由音色生成器 |
| 书签 / 收藏 | 单纯的「想再听」标记，不做积分 |
| 离线缓存 | 零账号门槛（Epic：Read-to-Me 可离线，Audiobook 不可——说明离线是形态属性而非账号属性） |
| 听书时长记录（仅家长可见） | Epic「>60s 计入阅读时长」的简化版；**不做孩子侧的积分/徽章** |

### 7.4 布局三原则

1. **三按钮主区**：上一段 / 播放暂停 / 下一段，占屏幕宽度的大部分，居中。
2. **定时在首屏**：关灯前要一步点到。
3. **夜间模式收敛**：开夜间模式后，屏幕上最多剩 4 个可点区域（播放/暂停、定时、夜间模式退出、上一段）。

---

## 8. 明确不要做（反模式清单）

| 不要做 | 理由 | 证据/来源 |
|---|---|---|
| **复杂均衡器 / 音效混音器** | 儿童产品零 precedent；增加认知负荷与误操作 | 全部 8 个标杆产品无一有（本次取证） |
| **需要账号的下载/离线** | 儿童产品门槛要低；离线是形态属性不是账号属性 | Epic：Audiobook 不可离线、Read-to-Me 可离线（一手） |
| **积分 / 打卡 / 徽章 / 孩子侧成就系统** | 产品红线；且激励逻辑与儿童产品冲突 | 番茄畅听「看视频解锁听书时长」是反面模式（第三轮）；Epic 的徽章在**家长侧** dashboard |
| **孩子推送 / 通知提醒** | 产品红线 | — |
| **广告 / 看视频解锁** | 产品红线 | 番茄畅听反例 |
| **需要实时通道的功能（家长远程暂停、实时控制）** | 产品红线 + 架构约束 | 用户明确约束 |
| **进度条秒级刻度作为主信息** | 3–5 岁无法精确拖拽；段刻度更友好 | 触控手势研究（推断） |
| **7 档倍速** | 儿童场景档位应收敛到 5 档以内 | 喜马拉雅 7 档是成人产品 |
| **自由音色生成器给孩子玩** | 每次生成有随机性，体验不一致；应预设定稿音色 | 阿里云官方：「声音设计具有随机性…建议多次生成后试听，择优使用」 |
| **把定时关闭藏进二级菜单** | 关灯场景下找不到 | 凯叔/喜马拉雅都在播放器首屏 |
| **医疗化助眠宣传** | 无儿童实证支持 | 6.2.5 证据缺口 |
| **闪烁式高亮动画** | 「不刺激」原则 + 光敏安全 | Vooks「without overstimulating」 |
| **模仿名人/特定真人的音色描述** | 模型不支持 + 版权风险 | 阿里云官方原则「原创而非模仿」 |
| **让听/读成为二选一且不可逆** | 两种形态应共享时间轴、可互跳 | Epic 双入口范式 |

---

## 9. 与第四轮已接入能力的落地映射

| stepaudio-3-gen-preview 能力 | 桃阅读落地点 | 章节 |
|---|---|---|
| 自然语言描述音色（roles） | 6 套定稿音色模板（妈妈/童声/爸爸/爷爷/哄睡/多角色） | 4.5 |
| speed 0.5–2 | 倍速档位（建议工作区间 0.8–1.25）+ 哄睡音 0.8 | 4.5 / 7.2 |
| volume 0.1–2.0 | 哄睡音 0.7 + 渐弱包络的起点音量 | 6.2.2 |
| SSE 流式 base64 分片 | 首播低延迟（边收边播）；预生成时合并 | 4.6 |
| wav 格式 | ASR 回写时间轴用 wav（无损） | 3.2 / 4.6 |
| mp3 格式 | 前端播放用 mp3（体积小） | 4.6 |
| pcm / 24000 采样率 | 自部署 ASR（WhisperX）输入 | 3.2 |
| pronunciation_map | 生僻字/多音字/异读纠正（儿童内容里的人名地名） | 4.2 |
| text_normalization: enhanced | 数字/单位归一化（「3 只小猪」→「三只小猪」的朗读一致性） | 4.2 |
| 不支持 timestamp | **时间轴走 stepaudio-2.5-asr 回写**（words[] 字级时间戳） | 3.2 |
| 不支持 voice/voice_label | 只能用描述；音色一致性靠「定稿参数复用」 | 4.6 |

**一条建议的最小流水线（预生成模式）**：
```
书页文本 → 分段（≤1000 字/段，按场景/角色边界）
  → stepaudio-3-gen-preview（wav, 24000Hz, speed 固定, 描述词模板）
  → 合并整段 wav
  → stepaudio-2.5-asr（show_utterances=true）→ words[] 字级时间轴
  → 与已知文本做约束式对齐（纠个别识别错字）
  → 产出：mp3（播放）+ words.json（高亮时间轴）+ 断点信息
  → 两者一起缓存，纯听/图文两种形态共用
```

---

## 10. 未取证清单（诚实标注）

以下内容本次**未能取得一手证据**，报告中相应位置已标注，不作为结论使用：

1. **洪恩 / 宝宝巴士的听书播放器界面**——两家无统一播放器页面（1.2.7）。
2. **喜马拉雅儿童的具体播放器界面**（波波音色入口、夜晚哄睡模式开关、定时档位逐项数值）——教程类文章只写「选择适合自己的时长」（1.2.6）。
3. **Toniebox 的具体手势映射**（耳朵调音量的具体捏法、侧键切章、拍打暂停）——官方支持页 support.tonies.com 本次不可达（403/000），仅有商店页二手描述「with a pinch of the ear」（1.2.4）。
4. **Audible 睡眠定时的档位与渐弱行为**——help.audible.com 搜索页本次返回加载错误（Salesforce 渲染问题），仅能确认该功能存在（行业通行 15/30/45/60 分钟 + end of chapter 为二手常识，未逐项取证）（6.1）。
5. **Vooks 的 sleep timer 具体档位**——官网本次未提及定时细节（1.2.2）。
6. **Yoto 的睡眠定时器档位与渐弱行为**——官网提到「timers and calming audio lead into bedtime」「Sleep Radio」，但无档位细节（1.2.3）。
7. **3–8 岁儿童对 TTS 音色的偏好实证**——OpenAlex 未检索到针对该年龄段的 TTS 音色偏好论文（4.1.2）。
8. **AI 拟人 TTS 朗读 vs 真人朗读对幼儿词汇吸收的差异**——无研究（5.2.2）。
9. **儿童听有声书与入睡潜伏期的关系**——仅有成人失眠研究（music/audiobook），无儿童实证（6.2.5）。
10. **MediaSession 在 iOS 真机上的实际行为**——BCD 的 `safari_ios` 为 mirror（镜像桌面值，非真机验证）；WebKit 2026-08 仍在补 action handler（2.3/2.4）。**建议桃阅读在 iOS 真机上做一轮实测**（iPhone 15/16 + iOS 18/26 各一台），验证锁屏标题与按钮回调。
11. **stepaudio-3-gen-preview 对中文儿童内容的具体效果**（音色稳定性、情感表现力、长文本拼接质量）——无 API key 无法实测，本环境仅做文档级取证。


---

## 11. 落地建议：`AudioPlayer` 组件规格（可直接开工）

> 本节把前 10 章的证据收敛成一份**组件级工程规格**。第 7 章给了「控件清单」，第 9 章给了「能力映射」，本节补齐剩下的四块：状态机、Props 契约、UI 布局、Media Session 精确接线、Web Speech 降级链。

### 11.1 两条来自一手社区证据的硬约束（先立规矩，再写代码）

【一手】Stack Overflow 73152620（2022-06，React + **4 个 `HTMLAudioElement`** 分轨，iPhone 锁屏控件「**maybe coming up one in four times**」；**只用 1 个 audio 元素时每次都出现**；「play → pause → play 后锁屏必出现」）。https://stackoverflow.com/questions/73152620

> **约束 A：全程只 `new` 一个 `Audio` 元素。** 章节被 SSE 切成多段 MP3，若为每段创建独立 `Audio` 或反复 `new Audio()`，iOS 锁屏控件会变得不稳定。段切换只改 `src`（配合 `load()`），让平台认为这是「同一个媒体会话」。

【一手】Stack Overflow 71823496（2021，提问者在 `play/pause/nexttrack/seek*` 处理器内部又调 `updatePositionState()` 并改 `playbackState`，导致锁屏通知「options and the song details disappear, leaving me with only the play/pause button」；高票答案：「**have you tried not touching the media session from inside the callbacks?**」——把更新移出回调后问题消失）。https://stackoverflow.com/questions/71823496

> **约束 B：action handler 里只做「改播放状态」这一件事。** `metadata` / `playbackState` / `setPositionState` 的刷新一律放到 `audio` 的 `play` / `pause` / `timeupdate` 监听里异步执行。

这两条叠加 §2.4 的 WebKit 状态（iOS action handler 仍在实验开关后）得到统一结论：**锁屏是「显示通道」，应用内大按钮才是「控制通道」**。

### 11.2 状态机

```
                        ┌──────────────┐
   (mount, 有 segment)   │   loading    │  ← SSE 未返回首段 / 正在取 audioUrl
   ─────────────────►    └──────┬───────┘
                                 │ 首段 canplaythrough
                                 ▼
                        ┌──────────────┐  user tap / actionHandler('play')
   ┌─────────────────── │   ready      │ ─────────────┐
   │  (ended, 无下一段)  └──────┬───────┘              │
   │                          │ user tap              ▼
   │                    ┌─────┴────────┐      ┌──────────────┐
   │                    │   paused     │ ◄──► │   playing    │
   │                    └─────┬────────┘      └───┬──────┬────┘
   │                          │  ended + 有下一段  │      │
   │                          └───────►(切段)─────┘      │
   │                                                     │
   │  sleep timer 到点 / fade 完成                        │
   │  音频错误 / SSE error 事件                           │
   ▼                                                     ▼
┌──────────────┐                              ┌──────────────────┐
│   ended      │  「读完本章」sleep 模式落点   │   error          │
│ (章节结束)    │                              │ (降级 Web Speech) │
└──────┬───────┘                              └──────────────────┘
       │ autoAdvance && 有下一章 → loadChapter(next)
       ▼
   (回到 loading，循环)
```

```ts
type PlayerStatus =
  | 'loading'    // 等待首段
  | 'ready'      // 就绪未播
  | 'playing'
  | 'paused'
  | 'ended'      // 本章最后一段播完
  | 'error'      // 音频失败，已降级或等待降级
```

**三条易错点**：
1. `ended` 不是用户手势链路内的同步调用（§2.7 WebKit 原文），直接链式 `play()` 可能被自动播放策略拦截。续播前先查 `navigator.getAutoplayPolicy?.('mediaelement')`，被拒则回 `ready` 等用户再点一次。
2. 所有 `play()` 都 `catch` `error.name === 'NotAllowedError'`（MDN Autoplay 指南的一手范式），回退到 ready 态显示大按钮，**不做静默失败**。
3. `error` 是**段级**而非章节级：某段失败只降级该段，其余段继续用服务端 TTS（见 11.6）。

### 11.3 Props 契约

```ts
interface AudioPlayerProps {
  /** 当前章节信息（用于 Media Session metadata） */
  chapter: { order: number; title: string }
  bookTitle: string
  /** 至少 512×512 的封面，用于锁屏 artwork 与应用内旋转封面 */
  coverArt: string
  contentId: string
  totalChapters: number
  voiceId?: string
  speed?: number
  /** 章节播完是否自动连播下一章（孩子端默认 true，家长可关） */
  autoAdvance?: boolean
  /** 朗读引擎：服务端 TTS 优先，不可用时整体降级到 Web Speech */
  engine: 'server-tts' | 'web-speech'
  onChapterComplete?: (order: number) => void
  onProgress?: (p: { chapterOrder: number; segmentIndex: number; blockOrder: number }) => void
  onExit?: (finished: boolean) => void
  /** 高亮回调：当前段文本 + 字级时间轴 + 当前字下标。
   *  L1 高亮由外部渲染（静态 span），避免每帧 setState 重渲染 */
  onHighlight?: (p: { segmentIndex: number; text: string; chars: CharTime[]; charIndex: number }) => void
  theme: 'paper' | 'night' | 'sepia'
}
```

### 11.4 UI 布局（ASCII）

```
┌──────────────────────────────────────────┐
│ ← 书架    《小狐狸找朋友》          目录  │  ← 顶栏（触控 ≥64px）
│           第 3 章 · 3 / 12               │
├──────────────────────────────────────────┤
│                                          │
│        ╭──────────────────────╮          │
│        │                      │          │
│        │   封面图（缓慢旋转    │          │  ← 播放中缓慢旋转（CSS animation，
│        │   或呼吸缩放，8s/圈）  │          │     prefers-reduced-motion 时停止）
│        │                      │          │
│        ╰──────────────────────╯          │
│                                          │
│        正在朗读：小狐狸遇见了猫头鹰       │  ← 当前句（truncate，1 行）
│        ──▓▓▓▓▓▓░░░░░░░░░░░── 2/5 段     │  ← 段刻度进度条（点按=跳到该段，
│                                          │     不可秒级拖拽；段是孩子的单位）
│   ┌──────┐  ┌────────┐  ┌──────┐         │
│   │  ⏮  │  │        │  │  ⏭  │         │
│   │ 上一 │  │   ▶    │  │ 下一 │         │  ← 三键均 ≥64px，主按钮 ≥80px
│   │  段  │  │  80px  │  │  段  │         │     （「上一段/下一段」= 孩子的进度条）
│   └──────┘  └────────┘  └──────┘         │
│                                          │
│   ┌────────┐  ┌────────┐  ┌────────┐     │
│   │  ⏲ 定时 │  │ 0.92×  │  │ 声音  │     │  ← 次级操作，≥64px；倍速紧邻播放条
│   │ 20:00  │  │ 刚好   │  │ 桃桃  │     │     （Epic speedometer 范式）
│   └────────┘  └────────┘  └────────┘     │
│                                          │
├──────────────────────────────────────────┤
│  正文区（可滚动，卡拉OK 逐字高亮）         │
│  ...前文...                              │
│  小狐狸在森林里走啊走，遇见了【猫头       │  ← 当前字：变色 + scale(1.02–1.05)
│  鹰】爷爷。...                            │     （不要闪烁动画，光敏安全）
└──────────────────────────────────────────┘
```

**布局原则**：
- 封面 + 主按钮区固定在视口上半部（flex 上区），正文区独立滚动。
- 正文高亮行滚到 **2/5 高度**处；滚动用 `setTimeout` 递归 + 直接 `scrollTop` 赋值（网易歌词算法，§3.4），**不要用 `scrollIntoView({behavior:'smooth'})`**（每段触发一次平滑滚动会在低端 Android 堆积抖动；这也是现有 `ReaderScreen.tsx` 的一个明确优化点）。
- 夜间模式收敛到最多 4 个可点区域（§7.4）。
- 专注模式（点正文）：顶栏与次级操作区淡出，只留主播放按钮与高亮正文。
- **不做底部 tab 导航**：播放器页面是模态全屏，单一返回手势/返回键回书架。

### 11.5 Media Session 精确接线

```ts
// 只在支持时接线；WebView/微信内不可用（BCD: webview_android = false），静默降级
function wireMediaSession(el: HTMLAudioElement, ctx: PlayerCtx) {
  if (!('mediaSession' in navigator)) return  // 微信 WebView 内为 false，不报错、不提示

  // ① metadata：在 play 事件或切段逻辑里更新，绝不在 action handler 里（约束 B）
  function pushMetadata() {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: ctx.chapter.title,                       // 锁屏大字 = 章节标题
      artist: '桃阅读 · ' + ctx.bookTitle,            // 书名放 artist
      album: '桃阅读',
      artwork: [                                       // 多尺寸让平台挑（规范 §4.3 fetch image 算法）
        { src: ctx.cover512, sizes: '512x512', type: 'image/png' },
        { src: ctx.cover256, sizes: '256x256', type: 'image/png' },
        { src: ctx.cover96,  sizes: '96x96',  type: 'image/png' },
      ],
    })
    if (el.duration) {                                 // duration 为 NaN/0 时不要推，否则锁屏进度条错乱
      navigator.mediaSession.setPositionState({
        duration: el.duration,
        playbackRate: el.playbackRate,
        position: el.currentTime,
      })
    }
  }

  // ② action handlers：只做状态迁移，绝不在此碰 mediaSession 本身
  const handlers: [MediaSessionAction, () => void][] = [
    ['play',          () => { void el.play() }],
    ['pause',         () => { el.pause() }],
    ['stop',          () => { el.pause(); el.currentTime = 0 }],
    // 孩子不需要 15s 快进快退：把这两个键重新定义为「上一句/下一句」
    // （规范允许：seekbackward/forward 的语义是「移动一小段」）
    ['seekbackward',  () => ctx.replayCurrentSentence()],
    ['seekforward',   () => ctx.skipToNextSentence()],
    ['previoustrack', () => ctx.goPrevChapter()],
    ['nexttrack',     () => ctx.goNextChapter()],
  ]
  for (const [action, fn] of handlers) {
    try { navigator.mediaSession.setActionHandler(action, fn) }
    catch { /* action 不支持时静默忽略：seekto 在 Chrome 78+ 才有，且 Android Chrome 不支持 */ }
  }

  // ③ 状态与位置：在媒体事件里异步推
  el.addEventListener('play',  () => { navigator.mediaSession.playbackState = 'playing'; pushMetadata() })
  el.addEventListener('pause', () => { navigator.mediaSession.playbackState = 'paused' })
  el.addEventListener('timeupdate', () => {
    if (!el.duration) return
    navigator.mediaSession.setPositionState({
      duration: el.duration, playbackRate: el.playbackRate, position: el.currentTime,
    })
  })
}
```

**接线检查清单**：
- [ ] `'mediaSession' in navigator` 守卫（微信 WebView / Android WebView 内为 false）
- [ ] artwork 至少 3 尺寸，`type` 显式 `image/png`（平台校验格式；iOS 不支持 artwork 字段时回退 PWA 512×512 图标）
- [ ] `setPositionState` 的 `duration` 不可为 NaN/0
- [ ] `seekbackward/seekforward` 重定义为句级跳转——**儿童播放器相对成人播放器的关键差异化**
- [ ] 错误态把 `playbackState` 置回 `none`，不残留 `'playing'`
- [ ] `prefers-reduced-motion` 时封面旋转动画停止（无障碍）
- [ ] Wake Lock（iOS 18.4+）播放时申请，`visibilitychange` 重新可见时重申请；低版本静默降级提示「请保持屏幕常亮」

### 11.6 预取与续播（SSE 段队列）

```
SSE event: segment(i)  ──►  「下一段」audio.src 立即赋值（浏览器自动开始下载，HTTP 缓存生效）
                                │
段 i ended  ──────────────────►  提升「下一段」为「当前」→ 零等待续播
                                │
队列容量 = 2（当前 + 下一），不超过 3（移动流量 + 内存）
```

MP3 段是**不可变内容**（同 cacheKey 永远同音频），适合长缓存 + `immutable`。P0 只靠 **HTTP 缓存 + 队列预取**；P1 再上 `caches.open('taoread-audio')` 显式缓存已播段（**不必上 Service Worker**，主线程 `caches` 即可写）。

### 11.7 Web Speech 降级链

降级触发点（按优先级）：
1. `GET /api/tts/voices` 返回 `available: false`（服务端 503 / 未配置 stepaudio）→ **整章**用 Web Speech。
2. SSE `error` 事件或 `audio` 触发 `error` 且重试 1 次仍失败 → **该段**降级，其余段继续用服务端 TTS（混合模式，避免整章报废）。
3. `'mediaSession' in navigator === false`（微信内）→ 播放继续，只是**没有锁屏控件**，UI 不报错、不提示。

降级后的行为：
- 复用既有 `tts` 单例（`apps/web/src/lib/tts.ts`）：`speak(text, {lang, voiceURI, rate})`，`onProgress` 提供句级 `index/total/text` 与 `charIndex`（boundary 事件）。
- **高亮同步降级为句级**（`onProgress.text` 匹配所在块 → 整块加底色，即现有 `ReaderScreen` 的 `box-shadow` 方案），因为 Web Speech 的 `onboundary` 字级精度更差且部分浏览器不触发。精度退化时降级为句级而非硬撑字级，符合 §3.3 的诚实降级路径。
- Media Session 仍可接线：把 `tts` 的 speaking 状态映射到 `playbackState`，`pause` action 映射到 `speechSynthesis.pause()`。**但 iOS Safari 的 SpeechSynthesis 在后台会被系统挂起**，只承诺前台可用。
- 定时器对两种引擎统一生效（现有 `sleepMinutes` effect 已是引擎无关的，直接复用）。

### 11.8 与现有代码的整合点

| 现有位置 | 改动方向 |
|---|---|
| `apps/web/src/lib/tts.ts` | 保留为降级引擎；新增 `lib/audio-player.ts` 承载服务端 TTS 的段队列 + 单 Audio 元素 + Media Session |
| `apps/web/src/pages/child/ReaderScreen.tsx` 底部朗读栏 | 当前是「🔊 + 当前句 + 声音 + 定时」的细条；升级为 11.4 的封面 + 大按钮布局，或抽成独立全屏 `AudioPlayerScreen`（哄睡场景下全屏更合适） |
| `sleepMinutes` effect | 加音量阶梯渐弱（Tonies 范式：`setInterval` 100ms × N 步到 0 再 `stop()`；§6.2 建议睡前 3 分钟线性渐弱）；激活时自动切 night 主题 |
| `highlight` 滚动 effect | `scrollIntoView({behavior:'smooth'})` → `setTimeout` 递归 + 2/5 高度夹取 |
| 高亮渲染 | 「当前字下标」**不进 React state**；正文渲染为静态字符 span（`data-i`），由脱离 React 的 250ms 轮询二分定位、直接改 classList |
| `RATE_STEPS` | 保持 4 档（慢一点/刚好/稍快/快一点），对接服务端 `speed` 参数（工作区间 0.8–1.25） |
| `api.contentChapter` | 播放器另起 `api.ttsChapter(contentId, order)` 走 SSE；与阅读器加载解耦，阅读和听书并行不互斥 |

### 11.9 一句话结论

桃阅读的播放器应当是**「一个 Audio 元素 + 一个段队列 + 一套 Media Session 接线」**：单元素是为了 iOS 锁屏控件稳定（一手社区证据：多元素会让控件 1/4 概率出现），段队列是为了 SSE 边收边播零等待续播，Media Session 的 `seekbackward/forward` 重定义为句级跳转是儿童场景的关键差异化。字级高亮用「静态 span + 脱离 React 的 250ms 轮询」避免低端机掉帧，时间轴精度不够时诚实降级为句级。哄睡定时器加音量渐弱（Tonies 范式）并自动切夜空主题。服务端 TTS 不可用时**按段**降级到既有 Web Speech 单例，全程不报错、不阻断。

---

*报告结束。核心结论见第 0 章执行摘要；落地清单见第 7 章与第 9 章；**组件级规格（状态机 / Props / 布局 / Media Session 接线 / 降级链）见第 11 章**；诚实缺口见第 10 章。*
---

## 附录 A：一手来源汇总（本次直接抓取）

**StepFun / stepaudio**
- https://platform.stepfun.com/docs/zh/overview/concept（模型矩阵导航）
- https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-gen（模型说明：gen-preview、限时免费、能力清单）
- https://platform.stepfun.com/docs/zh/api-reference/audio/generate（API 参数全表 + 不支持 timestamp/voice/voice_label）
- https://platform.stepfun.com/docs/zh/guides/models/stepaudio-3-tts（TTS 系列、2.5 元/万字、复刻 9.9 元/音色）
- https://platform.stepfun.com/docs/zh/api-reference/audio/system-voices.md（官方音色列表与描述）
- https://platform.stepfun.com/docs/zh/guides/developer/tts.md（最佳实践、voice_label 情绪/风格标签、有声书场景、AI 披露建议）
- https://platform.stepfun.com/docs/zh/api-reference/audio/asr.md（stepaudio-2.5-asr：字/词级时间戳）
- https://static.stepfun.com/blog/stepaudio3/gen/（官方 demo 的音色描述范例）

**音色描述方法论**
- https://help.aliyun.com/zh/model-studio/voice-design-user-guide（CosyVoice 声音设计指南：五原则 + 七维度 + 儿童范例）

**Web 平台能力**
- https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API（MediaSession 规格）
- https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API（Wake Lock 规格）
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis（无媒体流输出）
- https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/MediaSession.json（一手 BCD）
- https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/MediaMetadata.json（一手 BCD）
- https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/WakeLock.json（一手 BCD）
- https://caniuse.com/data.json（wake-lock 支持矩阵，一手解析）
- https://github.com/WebKit/WebKit/pull/72048（iOS media session action handler 仍在实验开关后，2026-08-20 open）

**儿童产品一手**
- https://support.getepic.com/api/v2/help_center/articles/search.json?query=read-to-me（Epic 帮助 API，53 篇）
- https://support.getepic.com/hc/en-us/articles/204962039（Audiobook vs Read-to-Me）
- https://support.getepic.com/hc/en-us/articles/360027662011（word highlighting）
- https://vooks.com（read-along highlighted text、audiobook mode、不刺激哲学）
- https://us.tonies.com/pages/tonieboxes（tap/tilt/squeeze、sleep timer 渐弱、音量上限）
- https://tonies.com/en-gb/toniebox-2/（gentle sleep timer + sunrise alarm、1+ certified）
- https://yotoplay.com（Green Button、像素图标章节导航、okay-to-wake、Sleep Radio）
- https://www.getepic.com（App Store 描述：Read-to-Me + 有声书）

**学术（OpenAlex API，一手抓取元数据与摘要）**
- 10.1371/journal.pone.0078103（Motherese 系统综述，144 项研究）
- 10.1038/s41562-022-01410-x（IDS 跨文化声学规律，Nature HB 2022）
- 10.1111/j.1467-7687.2006.00536.x（婴儿偏好低音调摇篮曲）
- 10.1073/pnas.1412817112（自然视听不同步不破坏感知连贯性）
- 10.3758/pp.70.6.955（AV 同步判断）
- 10.1007/s11145-011-9346-3（简单视图验证）
- 10.1037/dev0000512（共享绘本阅读词汇习得 meta 分析）
- 10.1111/cdev.13225（绘本共享干预 meta 分析，d=0.41/0.26）
- 10.1542/peds.2015-0359（学龄前儿童听故事的大脑激活）
- 10.1177/0022219416688170（TTS 与朗读工具效果，证据混合）
- 10.3389/fpsyg.2017.00677（电子书 vs 纸质书亲子行为差异）
- 10.3389/fpsyg.2017.00578（2 岁触屏点按与自我调节）
- 10.1016/j.ijhcs.2018.11.008（3 岁以下触屏手势）
- 10.1145/2858036.2858200（界面复杂度与儿童触控交互）
- 10.1111/jsr.12817（睡前音乐 RCT，audiobook 对照）
- 10.1002/14651858.cd010459.pub3（Cochrane：听音乐与失眠）
- 10.1093/pch/pxac125（加拿大儿科学会屏幕时间立场）

**行业报告**
- https://literacytrust.org.uk/research-services/research-reports/children-and-young-peoples-audio-listening-in-2026/
- https://literacytrust.org.uk/research-services/research-reports/audiobooks-in-the-home-in-2026/

**开源工具**
- https://github.com/readbeyond/aeneas（AGPL v3，2017 后无更新）
- https://github.com/smacke/ffsubsync（MIT，浏览器版 ffmpeg.wasm）
- https://api.github.com/repos/m-bain/whisperX（24,070 stars，BSD-2，2026-08 活跃）

**二手教程（中文产品交互）**
- https://jingyan.baidu.com/article/ff411625f82ad353e582375a.html（凯叔定时：闹钟按钮 + 自定义时间）
- https://product.pconline.com.cn/itbk/sjtx/sjrj/1573/15736608.html（喜马拉雅倍速 7 档）
- https://jingyan.baidu.
/article/46650658d5c770b449e5f8f2.html（喜马拉雅定时：时钟图标 + 倒计时）

**前序报告（内部复用）**
- research/iter3-report-tts.md（SpeechSynthesis 缺陷、Edge 免费端点 322 音色实测、云端 TTS 对比、听书 UX 基准）
- research/iter3-report-intl-ux.md（Yoto / Tonies / Epic / Vooks 产品取证、儿童 UX 规范）
- research/iter3-report-cn-ux.md（凯叔 / 喜马拉雅 / 宝宝巴士等国内产品取证）

---

## 附录 B：本次调研产出的原始证据文件

（保存在 `D:\codesolo\taoread\research\`）

| 文件 | 内容 |
|---|---|
| `b2_*.json` / `b_*.json` | Bing 搜索结果（英文查询，部分被地域污染，已标注） |
| `so_*.json` | 360 搜索结果（中文查询） |
| `bcd_MediaSession.json` / `bcd_MediaMetadata.json` / `bcd_WakeLock.json` | MDN browser-compat-data 原始 JSON（本次从 GitHub main 拉取） |
| `caniuse.json` + `canparse.mjs` | caniuse data.json 与解析脚本 |
| `epic_help.json` | Epic 帮助中心 Zendesk API 返回（53 篇相关文章，含正文） |
| `aeneas.md` / `subsync.md` | 两个对齐工具的 README |
| `oa_*.json` / `ss1.json` | OpenAlex / Semantic Scholar 学术检索结果 |
| `gh_*.json` | GitHub API 检索结果（WebKit PR、whisperX、仓库搜索） |
| `f_toniebox2.txt` / `f_tonie_how.txt` / `f_kaishu_timer.txt` | Tonies / 凯叔页面文本抓取 |
| `fetch.mjs` / `bing.mjs` / `bing2.mjs` / `sosearch.mjs` / `helper.mjs` / `oa.mjs` / `bcdparse.mjs` | 取证工具链 |

---
