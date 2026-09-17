# 桃阅读 · 第四次迭代差距分析（Onboarding / 无焦虑激励 / 家长洞察 / 发现 / 微交互 / 睡前模式 / 状态 / 英文读物）

> 日期：2026-09-17 ｜ 前序：docs/11（第三次差距分析，P0-1…P0-8 已交付）+ docs/12（第三轮交付报告）
> 验收日：2026-09-20（**本轮 P0 必须在此之前完成**）
> 约束不变：红线（积分 / 打卡 / 断签惩罚 / 孩子端推送 / 广告 / 阅读解锁娱乐）零新增
>
> **方法论说明**：本环境无 WebSearch 工具，证据来自三类来源——(a) `research/` 已积累的 90+ 份检索快照与三份 iter3 报告；(b) 对可访问一手页面的 WebFetch（Vooks 官网、Apple App Store 审核指南、Khan Academy Kids App Store 页、Amazon Parent Dashboard、ICO AADC、腾讯新闻 Lingokids 评测）；(c) **对 `apps/web/src` 全部 42 个源文件的逐行精读**。第三类最可靠——它描述的是此刻代码确实在做什么。凡引用代码处均给出行号。

---

## 0. 第四轮要回答的问题

前三轮解决了「有没有」和「已存在的界面达没达到基线」。第四轮的问题更靠上游：

> **一个 4 岁、不识字、从未用过 App 的孩子，被家长塞了一台设备——从点亮屏幕到听完第一个故事，有人教他吗？没有人教的话，他能走完吗？**

自查答案是：**没有，且走不完**。`grep -rn "onboard\|firstRun\|hasSeen\|新手引导\|tutorial" apps/web/src` 的结果是 **0 处真正的新手引导实现**（命中的全是注释或「绑定向导」）。孩子端第一次进入直接落在 `RitualGate`（`pages/child/RitualGate.tsx`），界面上是「点亮月亮，去选书」——字是不认识的，「点亮月亮」这个隐喻和「我要听故事」之间的映射，对一个 4 岁孩子是猜谜。

同时，第二轮调研反复引用的 Reich 2016（共读电子书时话题被设备吸走）和 Lillard 2011（9 分钟快节奏动画损害 4 岁儿童执行功能）在第三轮只通过「专注模式」做了**减法**。第四轮该做**加法**了：哪些正向反馈、哪些声音、哪些光，是睡前共读场景真正需要的。**自查发现：全产品 0 处触觉反馈、0 处交互音效、0 处屏幕调暖/调暗逻辑**（`grep -rn "vibrate\|haptic\|new Audio\|AudioContext"` 在 `apps/web/src` 与 `apps/server/src` 均为空）。

---

## 1. 自查发现（本轮新增，逐条对应后文差距卡）

| 编号 | 自查发现 | 证据（代码行号） | 严重度 |
| --- | --- | --- | --- |
| **S-1** | **完全没有新手引导 / 首次运行教学**。无 first-run 标记、无分步教程、无功能发现提示 | `grep onboard/firstRun/hasSeen` = 0 命中（仅注释） | **高** |
| **S-2** | **孩子端无持久化底部导航**。孩子唯一的全局入口是顶栏两个按钮（🍑 桃书架 / 换家庭），且「换家庭」对孩子是危险操作 | `pages/ChildHome.tsx:491-506`；`pages/child/*` 无 `fixed bottom` 导航（家长端有：`pages/ParentHome.tsx:107`） | **高** |
| **S-3** | **「继续读」只是一行排序，不是一级入口**。书架把有进度的书排前面（`sorted`），但没有「继续上次」大卡片，孩子要在一堆封面里找那本读到 47% 的 | `pages/child/BookShelf.tsx:73-78`（纯排序） | 中 |
| **S-4** | **无音频优先入口**。桃书架所有书都先进详情页→阅读器。不识字孩子最自然的入口是「按一下就响」，而不是「读标题选书」 | `pages/child/BookShelf.tsx` 全为图文卡片；无「听」入口 | 中 |
| **S-5** | **古诗拼音是「段落级平铺」，不是「字级注音」**。数据层已逐字对齐（`poetry-tang.ts:29` 空格分词），但渲染只是把整段拼音印在诗文下方一个 `<p>` 里，孩子无法把音和字对应 | `pages/child/ReaderScreen.tsx:552-559`；对照 `apps/server/src/content/types.ts:24`「拼音：按字注音，字与字之间用空格分隔（与 text 一一对应）」 | **高** |
| **S-6** | **英文读物无点词、无双语、无自然拼读支撑**。唯一词汇支撑是写死的 `note` 块（"New word: nursery — ..."），不能点、不能听、无拼读分解 | `apps/server/src/content/packs/tale-peterpan.ts:66`；`ReaderScreen.tsx:516-531` note 块渲染 | 中 |
| **S-7** | **零触觉反馈**。翻章、按钮、完成收尾、盖章全部无振动 | `grep vibrate/haptic` = 0 | 中 |
| **S-8** | **零交互音效**。无翻页声、无完成声、无点击确认声。阅读器只有 TTS 人声 | `grep "new Audio\|AudioContext"` = 0 | 中 |
| **S-9** | **「睡前模式」是一堵墙，不是一层滤镜**。到点直接整屏替换成 `BedtimeScreen`（😴 emoji + 「月亮睡觉啦」），孩子正在读的书被阻断；无调暖/调暗过渡、无息屏只听 | `pages/child/BedtimeScreen.tsx` 全文；`pages/ChildHome.tsx:131-133`（mode==='bedtime' 直接切屏） | **高** |
| **S-10** | **阅读器默认主题是「纸白」**（`#FFFDF8`），在暗夜环境里是一整块发光体。`night` 主题存在但必须手动切，且不随就寝窗口联动 | `pages/child/ReaderScreen.tsx:26,53` | **高** |
| **S-11** | **ErrorState 仍用 emoji**（☁️），第三轮只把 EmptyState 换成 SceneArt；且 `BedtimeScreen` 的 😴、`ReadyScreen` 的 🌟、`DepartureScreen` 的 📖、`BookShelf` 加载态的 🍑 都是裸 emoji，与 P0-3 声明的「关键屏零 emoji」不一致 | `components/ui/ErrorState.tsx:14`；`BedtimeScreen.tsx:21`；`ReadyScreen.tsx:25`；`DepartureScreen.tsx:57`；`BookShelf.tsx:88` | 中 |
| **S-12** | **阅读器错误态无重试**。「这一章还藏在云朵后面」+ 一个「回到书架」按钮——网络闪一下，孩子就被踢出阅读器 | `pages/child/ReaderScreen.tsx:124-125, 391-407` | 中 |
| **S-13** | **家长周报全是计数器，零洞察**。nights / minutes / books / highlights 四个数字，没有「最近迷什么主题」「下次可以试着问什么」。竞品的诊断维度一个都没有 | `pages/parent/ReportPanel.tsx:99-131` | 中 |
| **S-14** | **「今晚怎么讲」脚手架按钮只在 `role === 'parent'` 时显示**（`ReaderScreen.tsx:454`）。家长要用孩子端阅读器才能看到；家长端 `TonightPanel` 的卡片是**另一套**拉取逻辑（`api.readingCard`），两条路不同步 | `pages/child/ReaderScreen.tsx:454-465`；`pages/parent/TonightPanel.tsx:40-41` | 低 |
| **S-15** | **书架筛选条是纯文字 chip**（全部/中文/English/古诗/故事），不识字孩子无法据此选书；分类角标是 10px emoji+文字，同样不可读 | `pages/child/BookShelf.tsx:21-27, 252` | 中 |
| **S-16** | **`ShelfManager` 屏蔽失败用 `window.alert`**——移动端系统级阻塞弹窗，与全产品 TaSheet 语言不一致 | `pages/parent/ShelfManager.tsx:67` | 低 |

---

## 2. 八大主题调研结论与差距

### 2.1 Onboarding 与首次运行体验

**行业证据：**

- **Khan Academy Kids（2-8 岁，App Store 4.80 星 / 130,485 评分，A 级一手）**：低幼段**不要求孩子自主导航**。官方描述把「角色即入口」作为核心设计——「Ollo 小象——自然拼读与字母发音」「Reya 小熊猫——故事时间与写作」「Peck 小蜂鸟——数字与计数」「Sandy 小澳洲野犬——拼图、记忆与解决问题」。孩子选的是**角色形象**，不是功能名字。
- **Lingokids（腾讯新闻深度评测，B 级）**：儿童端信息架构是 **Games / Theater / Lessons / Family 四大板块**，「便于孩子自主导航」；游戏难度「根据孩子进度自动调整，将复杂任务分解，避免畏难情绪」；「内容短小精悍、反馈及时」。
- **Epic（搜狐 B 级）**：开通家长账户后**要求输入孩子的年龄，然后出现适合孩子的读物**——年龄是 onboarding 第一个也是唯一的关键分诊问题。
- **Amazon Parent Dashboard（A 级一手）**：Age Filters **per child**，「adjust settings per child」——多孩档案设置分开。

**桃阅读现状（S-1, S-2）：**

- 首次运行 = 登录页选角色（`pages/LoginPage.tsx:107-139`，两个大卡片 👨‍👩‍👧 / 🧒）→ 输入 8 位家庭码 → 直接落进 `RitualGate`。**没有任何一步告诉孩子「这个 App 是干嘛的、按哪里会响」**。
- 孩子端无底部导航。`pages/ChildHome.tsx` 顶栏对 3-5 岁孩子基本不可见不可读，全屏内容是「月亮升起来啦 / 今晚读什么？」。
- 唯一的「教程」是专注模式的 2.6 秒提示条（`ReaderScreen.tsx:339-341`）——**这是整个产品里唯一一次主动教孩子用界面**，而它出现在孩子已经进了阅读器之后。

**差距卡 ON-1（P0）：首次运行三步引导（孩子端）**
- 标记写入 `localStorage["taoread-onboarded"]`（与 session store 同 storage 包装，SSR 安全）
- 三步，每步一个吉祥物 + 一句语音可读文案 + 一个被高亮放大的真实控件：
  1. 「点这个大大的月亮，开始今晚的故事」→ 高亮 RitualGate 主按钮
  2. 「想听哪本，就点哪本的封面」→ 高亮书架第一张卡片
  3. 「听到这个喇叭响，就是有人在给你讲故事啦」→ 高亮朗读钮
- **家长侧摩擦**：首次进家长端时把「添加孩子档案（选年龄）」与「绑定微信读书」合并成**一个有序清单**（当前 `SettingsPanel` 两件事平铺，家长容易漏年龄，而年龄是推荐分诊的唯一依据——`BookShelf.tsx:46` 的 `stage` 参数来自这里）
- 验收：e2e 清 storage 后首进出现引导层；三步后不再出现

**差距卡 ON-2（P1）：孩子端持久底部导航**
- 两个大图标入口：**故事（书架）** / **我的夜灯**。`min-h-touch`，SVG 图标（不依赖文字）
- 理由：当前孩子端所有路径都是线性 phase 机器（`ChildHome.tsx:27-51` 的 17 态 union），**孩子一旦进入子页面就没有「回主页」的稳定心智模型**，只能靠「← 月亮」「← 书架」这些文字按钮

### 2.2 无焦虑激励（硬约束：无连胜惩罚 / 无积分商城 / 阅读不解锁娱乐）

**学术与行业证据：**

- **Reich, Yau & Warschauer 2016（PubMed PMID 27575440，一手）**：「When eBooks are designed well, preschool-aged children learn **equally well and sometimes more** than from print books」；但「**enhanced eBooks with sounds, animations, and games can distract children and reduce learning**」。
- **Scholastic（上轮已引）**：「nagging a child to read will surely turn it off」。
- **Epic（搜狐 B 级）**：徽章维度是 **reading time / frequency / topics**——庆祝「读了什么主题、读了多少」，**不是「连续多少天」**。
- **Khan Academy Kids（A 级 App Store 描述）**：官方描述**零 reward / points / badges 字样**——一个 4.80 星的教育产品可以完全不做外部奖励。
- **Lingokids（腾讯新闻 B 级）**：「内置**星星贴纸奖励**激发学习动机」——贴纸是**装饰性、非兑换性**的，这是红线内可参考的形态。
- **反面证据（本环境已存检索快照）**：伴鱼绘本「成就系统…免费获得贝壳，兑换专属成就」；KaDa「VIP 打卡」；扇贝/薄荷阅读「押钱对赌式打卡返现」被媒体批评为「恶意营销模式存风险」（163.com）。**这些是桃阅读红线的直接对照面。**
- **ABCmouse**：4.13 星（同段位最低），票券经济被多份评测指为外部奖励反噬内在动机。

**桃阅读现状：**

做得比多数竞品干净。`AchievementWall.tsx` 是**纯纪念墙**：「第 N 盏夜灯，等着今晚的故事」——没有当前连胜火苗，只有 `streakBest`（最长记录，且放在次要卡片）。`CelebrationScreen` 无兑换语义。`docs/02 §3.4` 文案红线在 `lib/finish.ts` 的 `unlockCopy` 里被遵守。

**但有一个漏洞：** `ReportPanel.tsx:104` 的 `nextWeekHint` 是服务端生成的「下周提示」。若未来被写成「本周少了 2 晚，下周加油」，就直接踩 Scholastic 红线。**服务端无文案评审护栏**。

**差距卡 RW-1（P1）：书架生长可视化（读一本，长一片）**
- `AchievementWall` 当前是「数字 + 最多 24 个 🕯️ emoji 平铺」。建议改为**「桃树」**：每读完一本书，树上多一片叶子/一个桃子，叶片可点击回看「这是哪一本、哪一晚读的」。
- 理由：iter3 的建议落地形态就是「阅读进度用读书树/书架可视化（读完一本长一片叶）；徽章只庆祝主题与数量，绝不庆祝连续天数」。当前实现停在「数字计数器」层级，**没有把「读了多少」变成「长了多少」**——后者是 4 岁孩子能看懂的。
- 数据已全部就绪（`AchievementsDto.booksDone` 有书单），纯前端改造。

**差距卡 RW-2（P2）：主题徽章（只庆祝「读了什么」，不庆祝「连续」）**
- 「古诗小读客 / 童话漫游者」类徽章，按 category 聚合，纪念式展示。**不做任何解锁门禁，不做皮肤兑换**。

### 2.3 家长仪表盘：家长真正想看什么

**行业证据：**

- **Amazon Parent Dashboard（A 级一手，parents.amazon.co.uk）**：
  - Activity Reports：看到「which **apps, books, videos, skills** and more your child is interacting with」
  - **Pause Device**：家长可「pause device usage」
  - **Learn First**：「Block access to things like games and cartoons until after educational goals are met」；同时**阅读时间可以不限**——「阅读豁免时长」的产品姿态
  - Age Filters **per child** + Explore Kids+ 逐本控制
- **Reading Eggs（官方描述，B 级）**：报告能「show you **exactly where your child is improving and where extra attention is needed**」——诊断性，不只是计数。
- **喜马拉雅儿童（波波球故事机，B 级）**：连接 App 后「可获取**每周收听报告，了解孩子的收听时长与内容喜好**」——**「内容喜好」是核心卖点，不是时长**。
- **Lingokids（腾讯新闻 B 级）**：家长端「提供 kidSAFE 认证、时长限制、**进度报告**及可打印的线下练习素材」。

**桃阅读现状（S-13）：**

`ReportPanel.tsx` 给出：`nights`、`totalMinutes`、`books.length`、`highlightsTotal`、`achievementsUnlocked`。这**恰好是 Amazon/Reading Eggs/喜马拉雅儿童都不以此为终点**的层级——它们都继续走到了「内容喜好 / 诊断建议」。

`TonightPanel.tsx` 其实已做对了最难的一件事：**共读卡（讲什么 / 问什么 / 聊什么）**——这就是家长真正想要的「对话脚手架」，且收尾文案是「不用每题都问，挑一个孩子接得住的就好。读不完也没关系」（`ReaderScreen.tsx:843`），极其到位。**问题是它没进周报，也没基于本周数据生成。**

**差距卡 PD-1（P0）：周报加「本周读了什么 + 下次可以聊什么」**
- 新增一卡：**「这周迷什么」**——按 category 聚合本周阅读分布，一句话呈现（「这周的夜灯，有 5 盏亮在唐诗里」）
- 新增一卡：**「下次可以试着问」**——从本周读过的书取 2 条 `questions`（`contentScaffold` 题库已存在），零生成式风险
- 严格不含：「还差 X 本」「落后」「建议加强」类诊断焦虑话术（服务端 `nextWeekHint` 护栏同步加）
- 验收：e2e 周报页出现「这周迷什么」卡；单测覆盖 `nextWeekHint` 不含负向词表

**差距卡 PD-2（P1）：「今晚」页加「孩子的信号」**
- `TonightPanel` 的 idle 态当前只有「今晚还没开始——请小读者在他们的设备上点亮月亮」。可改为展示**上一次共读的心情贴纸**（`MOOD_OPTIONS` 数据在收尾时采集，`FinishScreen.tsx:126-139`，但**采集后再也没被用过**）——这是「非监控式洞察」的正确形态：家长看到的是孩子的情绪，不是时长排行榜。

### 2.4 不识字孩子的内容发现

**行业证据：**

- **Khan Academy Kids**：低幼段系统推送，**不要求孩子自主挑选**（iter3 IA-2）。
- **Epic**：绿色话筒图标 = Read to Me，**图标化区分媒介**（iter3 IA-1）。
- **洪恩识字（iefans B 级）**：「玩—认—练—写」四段，「完成任务关卡以后还有音效」。
- **Lexile / 蓝思（搜狐 B 级）**：英文分级体系把「难度」变成可筛选维度；国内 App 普遍把「分龄」做成一级筛选。
- **Amazon**：Age Filters 是发现的第一道门。

**桃阅读现状（S-3, S-4, S-15）：**

发现路径单一且都要求识字：`BookShelf` 网格 → 文字筛选条 → 文字标题 → 详情页 → 阅读器。`BookDetail` 的难度星级（`difficultyStars`，基于 stageRank + 章节数 + 字数，推导逻辑公开可解释，`BookDetail.tsx:44-59`）做得比多数竞品诚实，**但这是给家长看的，不是给孩子看的**。

**差距卡 DS-1（P0）：书架卡片加「试听一下」手势**
- 每张封面卡片右下角加一个小喇叭按钮，点击直接朗读该书第一章前 2-3 句（复用 `tts.speak`），不进阅读器
- 理由：不识字孩子的发现逻辑是「按一下，响不响 / 好不好听」，不是「读标题」。这是把 Epic 的「绿色话筒」本土化到桃阅读架构里的**最小改动版本**（不改信息架构、不需要双首页 Tab）
- 验收：e2e 点喇叭 → `speaking` 为 true；再点 → 停止

**差距卡 DS-2（P1）：筛选条图标化 + 「5 分钟就读完」分区**
- 筛选 chip 从文字改为「图标 + 极短词」（🌙 / 📜 / 🍑 / ✨），去掉「English」文字改用「ABC」
- 按 `book.words` 推导时长（童声语速约 150 字/分钟），加一个「5 分钟」短读分区——睡前「再读一本」的高频场景
- 同时修复 S-15

**差距卡 DS-3（P1）：书架顶部「继续读」大卡片**
- iter3 IA-3 已列为 P1，本轮仍未做。当前只是 `sorted` 排序（`BookShelf.tsx:74-78`）。改为首屏一张大卡（封面 + 进度条 + 「接着读」），单点进入。

### 2.5 微交互与愉悦感（触觉 / 声音 / 庆祝）

**学术与行业证据：**

- **Lillard & Peterson 2011, Pediatrics 128(4):644-9（PubMed PMID 21911349，一手）**：60 名 4 岁儿童，**仅 9 分钟**快节奏电视动画片后，执行功能任务显著劣于教育动画组与画画组。「Just 9 minutes of viewing a fast-paced television cartoon had immediate negative effects on 4-year-olds' executive function」。→ **睡前场景的音效与动画必须是「低速、低频、与情节绑定」的**。
- **Reich 2016**：「enhanced eBooks with sounds, animations, and games can distract children and reduce learning」→ **音效必须与故事情节绑定，不做装饰性背景音**。
- **Vooks（A 级一手官网）**：产品哲学一句话——「**Subtle animation, music, and sound engage without overstimulating**」；「our stories help kids feel **calm, connected, and cherished**」；「intentionally designed to engage without overstimulating for gentle transitions」。这是「睡前音效该是什么样」的正面答案。
- **Novel Effect（iter3 已取证）**：**chime 提示就绪**——状态变化用一声轻柔提示音，不用语音唠叨。
- **Lingokids（腾讯新闻 B 级）**：星星贴纸作为及时反馈；「顺应专注力：内容短小精悍、**反馈及时**」。

**桃阅读现状（S-7, S-8）：**

**0 触觉、0 音效。** 全部反馈通道只有视觉（高亮、动画）和 TTS 人声。收尾盖章（`FinishScreen.tsx:255-264`）按下去没有任何确认感；读完一章点「下一章 →」（`ReaderScreen.tsx:612-619`）是静默切换。

**差距卡 MC-1（P0）：翻章轻振动 + 收尾盖章振动**
- `navigator.vibrate(15)`（Android/Chromium 可用，iOS 静默降级，无副作用）用于：翻章、盖章成功、解锁成就
- 刻意**不做**：按钮按下振动（过密；TaButton 已有 `whileTap scale 0.96` 视觉反馈）
- 刻意**不做**：任何背景音乐 / 环境音（Reich 2016 + Vooks「without overstimulating」：睡前场景的默认态是安静）
- 验收：单测覆盖 `vibrate` 调用与 iOS 降级分支；`prefers-reduced-motion` 时同步关闭振动

**差距卡 MC-2（P1）：完成一本书的庆祝时刻**
- 当前 `CelebrationScreen` 是「月亮 + 吉祥物 + 成就卡列表」，**无声**。加一声**轻柔风铃/月光音**（Novel Effect 式 chime），仅在「读完一整本」时出现（单章完成不响）
- 音频程序化生成（Web Audio 合成正弦衰减包络，零版权零资产）
- 红线复核：这是「读完才有的仪式音」，不是「读 N 本解锁音效」——无交易语义

**差距卡 MC-3（P1）：朗读高亮匹配错位修复**
- iter3 RD-2 建议「被读到字轻度放大 1.1-1.2 倍」。当前只有**句子级**高亮，且匹配方式是**文本子串匹配**（`highlight.text.slice(0,12)` 匹配 block，`ReaderScreen.tsx:299`）——同句重复时会错位。纯前端字级高亮受 Web Speech boundary 中文不支持的限制（iter3 TTS 报告已论证），**本轮不做字级，但应修掉子串错位**：用 `highlight.index` 直接对应分句数组下标，而不是匹配文本。

### 2.6 暗色 / 睡前模式的具体做法

**行业证据：**

- **宝宝巴士（网易 B 级）**：**防蓝光模式**是家长可开关的显式功能；另有禁止观看时间 + 每次观看时长。
- **Vooks（A 级一手）**：整个产品就是「calm, gentle transitions」定位，默认低刺激。
- **Amazon**：Bedtime schedules for **device shutdown**——到点直接关，不做渐变。
- **AAP（iter3 已取证）**：睡前 1 小时移开屏幕；卧室不放屏幕。
- **UK AADC（A 级一手，ico.org.uk）15 条标准**：第 7 条「**Default settings**」（必须默认高隐私）、第 13 条「**Nudge techniques**」（不得助推孩子削弱隐私设置）、第 1 条「**Best interests of the child**」。→ 睡前模式的默认值应该是「最护眼」，而不是「最鲜艳」。

**桃阅读现状（S-9, S-10）：**

- 全站固定深色主题（`index.css` body 渐变 `#0e1a38 → #16244c`），这本身是好的睡前基线。
- **但阅读器默认主题是「纸白」`#FFFDF8`**（`ReaderScreen.tsx:26,53`）。一个 3-5 岁孩子在 21:30 的卧室打开桃阅读，进入阅读器时**屏幕会从深色翻成一整块白**——这是当前最直接的「刺眼」路径。
- 就寝窗口（`bedtimeMin`，`SettingsPanel.tsx:19-24`）到点后**直接整屏替换**为 `BedtimeScreen`（`ChildHome.tsx:131-133`）。孩子若正读到一半，体验是被**中断**而非**过渡**。`BedtimeScreen` 保留了「先把今晚的故事收好」的收尾通道（`BedtimeScreen.tsx:35-43`），这是「读了就要算数、不搞隐性惩罚」的正确坚持（N8-008），但**它是一堵墙，不是一层滤镜**。

**差距卡 DM-1（P0）：阅读器默认主题联动就寝窗口**
- 进入阅读器时，若当前时间在就寝窗口（或服务端 `ritualWindow` 返回 bedtime/overtime）→ 默认主题改为 `night`，而不是 `paper`
- 这是 3 行的改动（`useState<Theme>('paper')` 的初始值改为由时段推导），却是睡前场景最大的单点体验提升
- 验收：单测覆盖时段推导；e2e 在模拟就寝时段进入阅读器断言 `night` 主题

**差距卡 DM-2（P1）：就寝窗口改为「调暗 + 息屏只听」而非整屏阻断**
- 到点不切走 `BedtimeScreen`，而是在阅读器内叠加一层：屏幕亮度降至约 30%（CSS `filter: brightness`），插图去饱和，TTS 继续工作，页面静止
- 顶部出现一句温柔提示（吉祥物 + 「月亮快睡着了，听完这段就晚安」）
- 保留现有「收尾通道」（不破坏 N8-008 的隐性惩罚红线）
- 同时修复 S-9 与 S-11（BedtimeScreen 的 😴 emoji 换成 SceneArt + TaoMascot）

**差距卡 DM-3（P2）：护眼/防蓝光开关（家长端）**
- `SettingsPanel` 护眼设置区加「画面调暖」开关（叠加暖色滤镜），对标宝宝巴士防蓝光模式

### 2.7 给不识字孩子的空态 / 错误态 / 加载态

**行业证据：**

- **Vooks（A 级一手）**：所有交互反馈都通过「gently narrated」的声音与缓慢动画传递，不依赖文字。
- **Khan Academy Kids**：低幼段不需要文字说明，角色引导。
- **iter3 MC-7（行业通识，一手未取证）**：空态「这里还没有书，让妈妈帮你挑」；错误态不出现「失败」字样。
- **UK AADC 第 4 条「Transparency」**：信息要对儿童可理解。

**桃阅读现状：**

`Loading`（月亮呼吸 + 一句文案）、`EmptyState`（SceneArt + 吉祥物 + 文案）、`ErrorState`（☁️ emoji + 「星星眨了眨眼，好像走神了」+ 重试钮）。

**核心矛盾：三个状态的反馈通道都是「文字」。** 一个不识字的孩子看到「月亮正在升起…」「小桃正在搬书…」「这一章还藏在云朵后面」，得到的信息量是零。`Loading` 组件连吉祥物都没有（P0-5 只覆盖了 Loading 的月亮场景，`Loading.tsx` 无 `TaoMascot`）。

**而做得最好的那一处恰好证明了正确方向**：`RitualGate` 的月亮 + 吉祥物组合是全产品唯一「不靠文字也能懂」的状态。

**差距卡 ST-1（P0）：三个状态全部加吉祥物 + 声音提示**
- `Loading`：加 `TaoMascot mood="sleepy"`（修复 P0-5 的遗漏）；可选朗读 label（受 `prefers-reduced-motion` 与静音设置约束）
- `ErrorState`：☁️ emoji → SceneArt `lamp-hint` + TaoMascot `mood="hint"`（修复 S-11）
- 关键：**错误态必须有「重试」而不是「退出」**。当前 `ReaderScreen` 错误态只有「回到书架」（`ReaderScreen.tsx:398-404`），网络闪断就把孩子踢出阅读器——加「再试一次」钮，修复 S-12

**差距卡 ST-2（P1）：加载态用吉祥物动作代替 spinner**
- `ReaderScreen` 章节加载是一个旋转 border 圆圈（`ReaderScreen.tsx:377-382`）——这是**成人 SaaS 的加载语汇**。改为月亮升起/小桃搬书的微动画（与 `Loading` 统一），保持 ≥1.6s 低频呼吸节奏（Lillard 2011：慢节奏）

### 2.8 英文读物的中国孩子 UX

**行业证据：**

- **Epic（搜狐 B 级 + App Store）**：**Spotlight Words + audio-enabled Dictionary Lookup**——点词弹出释义 + 真人发音 + 生词本，阅读器内闭环。
- **Duolingo ABC（iter3 已取证）**：「highlighting **each word spoken**」。
- **Vooks**：text-highlighting 帮孩子「connect the sounds of words with how they look visually」。
- **伴鱼绘本**：与牛津、柯林斯合作，**蓝思值标注**，「专业外教配音」，自然拼读精品课；但「AI 打分每次评分差别很大」是稳定性教训。
- **洪恩分级阅读**：1500+ 牛津原版分级读物，「每本绘本均搭配**三种出声朗读模式**」。
- **Khan Academy Kids**：Ollo 小象 = 自然拼读与字母发音的**角色化入口**。

**桃阅读现状（S-6）：**

4 本英文读物（Peter Pan / Alice / Grimm / Peter Rabbit），全部 Gutenberg 公版逐字校对。难度用 `difficultyStars` 推导（`BookDetail.tsx:44-59`，中英分档，量纲处理诚实）。词汇支撑是**写死的 `note` 块**：

```
{ kind: 'note', text: 'New word: nursery — a special room in a house where little children sleep and play.', art: 'lamp-hint' }
```

（`apps/server/src/content/packs/tale-peterpan.ts:66`）

这个形态**方向是对的**（把生词嵌进情节流，不是查词典），但**不可点、不可听、无拼读分解**。一个 6 岁中国孩子看到 "nursery"，既听不到发音，也看不到怎么拆音节。

**差距卡 EN-1（P0）：英文 note 块加「听这个词」按钮**
- note 块渲染处（`ReaderScreen.tsx:516-531`）加一个小喇叭钮，点击用 TTS 朗读该 note 里的英文词
- 改动极小（note.text 里 "New word: X —释义" 的 X 可正则切出），但把「静态注释」变成「可听反馈」
- 验收：单测切词正则；e2e 点喇叭触发 `tts.speak`

**差距卡 EN-2（P1）：note 块加自然拼读分解**
- 释义上方加一行音节拆分（如 "nur-ser-y"），数据进 CBF `PackBlock` 新增可选字段 `syllables`
- 不做 AI 打分跟读（伴鱼稳定性教训 + 红线内无必要）

**差距卡 EN-3（P2）：点词查义（Epic 式闭环）**
- 英文 `text` 块按词渲染为可点 span，点中弹小卡：发音 + 中文释义。需要词表数据，工作量大，排 v4

---

## 3. 优先级汇总与落地建议

> **P0 判据**：9-20 验收前可完成、可在本环境验证（单测 / e2e / DOM 断言）、且不触发红线。
> **P1**：验收日后 1-2 轮。
> **P2**：v4。

| 编号 | 主题 | 内容 | 量级 | 红线 |
| --- | --- | --- | --- | --- |
| **P0-1** | Onboarding | 孩子端首次运行三步引导（月亮→封面→喇叭），`localStorage` 标记；家长侧「加孩子+绑定」合并有序清单 | 1 天 | 否 |
| **P0-2** | 发现 | 书架卡片「试听一下」小喇叭钮，点响 2-3 句即停，不进阅读器 | 0.5 天 | 否 |
| **P0-3** | 家长洞察 | 周报加「这周迷什么」（category 聚合）+「下次可以试着问」（取已有 questions）；服务端 `nextWeekHint` 负向词表护栏 | 1 天 | 否（须审文案） |
| **P0-4** | 睡前模式 | 阅读器默认主题联动就寝窗口（`paper` → 时段推导，就寝时段默认 `night`） | 0.5 天 | 否 |
| **P0-5** | 微交互 | 翻章 / 盖章 / 解锁成就的 `navigator.vibrate(15)`，iOS 静默降级，reduced-motion 同步关 | 0.5 天 | 否 |
| **P0-6** | 状态 | `Loading` 加吉祥物、`ErrorState` 去 emoji 换 SceneArt、阅读器错误态加「再试一次」 | 0.5 天 | 否 |
| **P0-7** | 英文读物 | 英文 note 块「听这个词」按钮（正则切词 + TTS） | 0.5 天 | 否 |
| **P0-8** | 一致性 | 关键情绪屏剩余 emoji 清零（BedtimeScreen 😴 / ReadyScreen 🌟 / DepartureScreen 📖 / BookShelf 🍑），换 SceneArt + TaoMascot | 0.5 天 | 否 |
| **P1-1** | 导航 | 孩子端持久底部导航（故事 / 我的夜灯，SVG 图标） | 1 天 | 否 |
| **P1-2** | 发现 | 书架「继续读」大卡片（iter3 IA-3 兑现） | 1 天 | 否 |
| **P1-3** | 发现 | 筛选条图标化 + 「5 分钟就读完」分区（按 words 推导时长） | 1 天 | 否 |
| **P1-4** | 激励 | 夜灯墙改「桃树生长」可视化（booksDone → 叶子/桃子，可点击回看） | 1.5 天 | 否（纪念式，无连胜） |
| **P1-5** | 家长洞察 | 「今晚」页 idle 态展示上次共读心情贴纸（采集后从未使用的数据） | 0.5 天 | 否 |
| **P1-6** | 睡前模式 | 就寝窗口从「整屏阻断」改为「调暗 + 息屏只听 + 温柔提示」 | 2 天 | 否 |
| **P1-7** | 微交互 | 读完一整本的庆祝音（Web Audio 合成 chime，单章不响） | 1 天 | 否（无交易语义） |
| **P1-8** | 微交互 | 朗读高亮子串匹配 → `highlight.index` 直接对应分句下标（修错位） | 0.5 天 | 否 |
| **P1-9** | 状态 | 章节加载 spinner → 吉祥物微动画（统一 Loading 语汇） | 0.5 天 | 否 |
| **P1-10** | 英文读物 | note 块音节拆分（CBF 加 `syllables` 字段） | 1 天 | 否 |
| **P1-11** | 容错 | `ShelfManager` 的 `window.alert` → TaSheet 局部提示 | 0.2 天 | 否 |
| **P2-1** | 激励 | 主题徽章（古诗小读客等，category 聚合，纪念式） | 2 天 | 边界：无解锁门禁、无皮肤兑换 |
| **P2-2** | 睡前模式 | 家长端「画面调暖」开关 | 1 天 | 否 |
| **P2-3** | 英文读物 | 点词查义闭环（需词表数据） | 3 天+ | 否 |
| **P2-4** | 服务端 TTS | 字级高亮 + 锁屏 + 拟人音色（docs/11 §6 已定 Azure F0 路线） | 大 | 否 |
| **P2-5** | 排版 | 古诗拼音从段落平铺改为字级注音（ruby 式，数据已逐字对齐） | 1.5 天 | 否 |

### 3.1 本轮 P0 的验收标准（2026-09-20）

| 维度 | 标准 |
|---|---|
| 功能 | P0-1 … P0-8 全部交付，e2e 绿（当前 14/14，预计 +6 ~ +8） |
| 质量 | `npm run verify` 全绿（`audit:touch` 0 违规延续） |
| 一致性 | 生产页面**所有**关键情绪屏零裸 emoji（含 ErrorState / BedtimeScreen，P0-3 的 6 处之外的 4 处） |
| 红线 | 负向清单零新增；`nextWeekHint` 服务端文案护栏单测通过 |
| 文档 | docs/14 交付报告 + nightly-log 追增 + 本文档任务卡状态回填 |

### 3.2 明确不做（本轮）

| 淘汰项 | 理由 |
| --- | --- |
| 任何背景音乐 / 环境音 | Reich 2016：无关音效降低学习；Vooks 的「subtle」指**叙事内**的音，不是背景层 |
| 按钮按压振动 | 过密；已有 `whileTap` 视觉反馈 |
| 积分 / 连胜 / 打卡 / 商城 | 硬红线（Scholastic + AAP + AADC #13 三重证据） |
| 「读 N 本解锁皮肤」 | 阅读解锁娱乐的边界，不做 |
| AI 跟读打分 | 伴鱼「每次评分差别很大」是稳定性教训；无可靠方案前不做 |
| 哄睡白噪音 | 需音频资产 + 版权链路；且与「共读」核心场景冲突 |
| 点词查义（P2-3） | 需词表数据与排版改造，排 v4 |

---

## 4. 关键判断说明（为什么 P0 是这 8 张）

第三轮的 P0 是「补齐已有界面的基线」。第四轮的 P0 有三条新主线：

1. **首次运行**（P0-1）：前三轮完全没碰过的领域，也是「3-5 岁孩子能不能独立用」这个第一性问题的最短路径。Khan Kids 和 Epic 的做法都不复杂——**年龄分诊 + 角色化入口 + 一次教学**，桃阅读连年龄分诊的入口（家长设置里的 select 框，`SettingsPanel.tsx:145-154`）都埋在三级页面里。

2. **睡前场景的物理正确性**（P0-4 + P0-5 + P0-6）：桃阅读定位是「睡前共读」，但当前最亮的屏幕（阅读器纸白主题）和最突兀的中断（就寝整屏替换）都发生在这个核心场景里。三张卡成本极低（合计 1.5 天），却是定位承诺的直接兑现。

3. **反馈通道补全**（P0-2 + P0-7 + P0-8 + P0-3）：把「不识字孩子能获取的信息」从「只有视觉文字」扩展到「听觉 + 图像 + 触觉」。`试听一下`（发现）、`听这个词`（英文）、`吉祥物贯穿状态屏`（空错载）、`振动确认`（关键动作）——四张卡是同一件事的四个面。

**一处自我修正**：iter3 把「服务端 TTS」列为 v4，本轮维持。但 P0-7（英文 note 听词）和 P0-2（试听）**复用了现有 Web Speech 引擎**，在没有服务端 TTS 的情况下先把「可听的反馈」给到孩子——务实路线：不等到 v4 才让孩子听到声音。

---

## 5. 证据来源

**一手（A 级，本轮 WebFetch 直接取证）**

- Vooks 官网 https://www.vooks.com — 「Subtle animation, music, and sound **engage without overstimulating**」；「our stories help kids feel calm, connected, and cherished」；「intentionally designed to engage without overstimulating for gentle transitions」
- Apple App Store Review Guidelines https://developer.apple.com/app-store/review/guidelines/ — Kids Category 1.3：不得含购买机会、外链、第三方广告/分析（除非在家长门禁后）；2.3.8：「For Kids」元数据保留给 Kids Category
- Khan Academy Kids App Store 页 https://apps.apple.com/cn/app/khan-academy-kids/id1378467217 — 「为我朗读（Read to Me）」；Ollo 小象=自然拼读；Reya 小熊猫=故事时间；Peck 小蜂鸟=数字；Sandy 小澳洲野犬=拼图记忆；2-8 岁；官方描述零 reward/points/badges 字样
- Amazon Parent Dashboard https://parents.amazon.co.uk/intro — Activity Reports（看到孩子在用哪些 books/videos/skills）；Pause Device；Learn First（教育目标达成前屏蔽游戏动画，**阅读时间可不限**）；Age Filters per child
- UK ICO Age Appropriate Design Code https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/ — 15 条标准全名；「settings must be 'high privacy' by default」；「nudge techniques should not be used to encourage children to provide unnecessary personal data」

**一手学术（A 级，PubMed 摘要，iter3 已取证，本轮复引）**

- Lillard & Peterson 2011, Pediatrics 128(4):644-9, PMID 21911349 — 9 分钟快节奏动画即时损害 4 岁执行功能
- Reich, Yau & Warschauer 2016, J Dev Behav Pediatr 37(7):585-91, PMID 27575440 — 增强型电子书音效/动画/游戏分散注意力、降低学习；共读电子书话题被设备吸走

**B 级（媒体评测 / 官方描述转引）**

- 腾讯新闻 Lingokids 深度评测 https://news.qq.com/rain/a/20250714A07IS600 — Games/Theater/Lessons/Family 四板块儿童端导航；自适应难度分解任务；星星贴纸奖励；「父母的陪伴永远是…唯一方式」
- 搜狐 Epic 评测 https://www.sohu.com/a/387544532_612049 — 家长账户输入年龄后出现适龄读物
- 搜狐蓝思分级 https://www.sohu.com/a/651287463_121642943 — Lexile 作为可筛选难度维度
- 163.com 打卡返现批评 https://www.163.com/dy/article/EF5H1DT405129QAF.html — 押钱对赌打卡模式风险
- iter3 三份报告（本目录 `iter3-report-cn-ux.md` / `iter3-report-intl-ux.md` / `iter3-report-tts.md`）作为上游证据链，本轮不重复取证已证条目

**C 级（代码自查，最可靠）**

- `apps/web/src/` 全部 42 个源文件逐行精读（行号见 §1 表）
- `grep -rn "vibrate\|haptic\|new Audio\|AudioContext" apps/web/src apps/server/src` → **0 命中**
- `grep -rn "onboard\|firstRun\|hasSeen\|tutorial" apps/web/src` → **0 实现命中**
- `apps/server/src/content/packs/*.ts` 8 个内容包结构核查

**未能取证（诚实声明）**

- Epic 徽章 / Unlockables 的最新界面形态（getepic.com 家长页与 App Store 页均未返回描述正文）
- Yoto / Tonies 的硬件交互细节（官网 404）
- 各竞品 onboarding 的实际分步截图（本环境无图像输入能力，App Store 截图页不可抓取）
- AAP 屏幕时间具体分龄数字（政策页跳转，未取到正文；上轮已有 WHO/AAP 指引在 `research/so_*.json`）
