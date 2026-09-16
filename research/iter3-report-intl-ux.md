# 桃阅读 · 第三轮迭代调研：国际儿童阅读 App 交互细节 + 儿童产品 UX 规范

> 采集时间：2026-09-16/17 ｜ 采集人：调研子代理（iter3）
> 本轮重点：**交互与体验细节**（信息架构、阅读器、朗读高亮、听书模式、激励、微交互、家长控制），以及**儿童 UX 规范的可执行条目**
> 承接上一轮 `report-intl-products.md`（产品画像与动机研究），本轮不重复宏观结论，只补细节

## 0. 方法与证据强度说明

| 证据等级 | 说明 | 本轮覆盖范围 |
|---|---|---|
| **A 级（一手原文）** | iTunes Search API 返回的 App 描述 verbatim、官网可抓取页面正文 | Epic / Vooks / Reading Eggs / Khan Kids / Duolingo ABC / Novel Effect / Speechify / Amazon / Sago Mini / Lingokids / Yoto / Tonies（部分） |
| **B 级（一手体验报告）** | 深度使用者的图文 step-by-step 记录 | Epic 四栏目结构（搜狐「教书匠在美国」）；Khan Kids 家长端操作（太平洋电脑网） |
| **C 级（二手转引）** | 中国媒体转引 AAP 指南、CSDN 转引 Google Play 政策 | AAP 年龄条文、Google Play Families |
| **D 级（研究文献）** | PubMed/NCBI eutils 原始摘要 | Lillard 2011、Reich 2016、WCAG 2.2、MDN reduced-motion |

**本轮主要阻断点（诚实标注）**：
- `readingeggs.com` 全站 307 跳转至不存在的 `.cn` 域名，DNS 无法解析 → **奖励地图（reward map）具体形态未取证**，仅有 iTunes 描述「golden eggs, collectible pets, and games」
- `tonies.com` 与 `support.tonies.com`（403/不可达）→ **Toniebox 手势细节（耳朵调音量/侧键切章/拍打暂停）未从一手来源取证**，仅有「intuitive play controls / totally tumble-proof」（tonies.com 首页可达时抓取）
- `bookful.app` 连接超时 → **Bookful 完全未取证**
- Google 全域（support.google.com / play.google.com / android-developers）连接超时 → **Google Play Families Policy 仅 C 级转引**
- AAP 官网（publications.aap.org / healthychildren 文章页）403/404 → **AAP 年龄数值仅经中国媒体转引（C 级）**
- Apple HIG Buttons 页正文 JS 渲染未加载 → 触控尺寸改用 **WCAG 2.2 一手规范**
- Novel Effect「reading log」与 Speechify「儿童模式」：官网/描述中未见独立儿童模式 → **Speechify 儿童模式未取证，倾向不存在**

---

## 第一部分：产品逐个取证

### 1. Epic!（iOS 7.52，4.72 星 / 518,909 评分，Epic Creations）

**① 信息架构与导航（B 级：搜狐深度使用记录 + A 级 iTunes）**
- 家长注册后**输入孩子年龄**，首页即出现适龄读物
- 孩子端首页为**四个栏目**（无底部 tab 的细节未取证，但栏目结构明确）：
  - **For you**（个性化推荐）
  - **Read to Me**（伴读：真人朗读）
  - **Videos**（学习视频）
  - **AudioBooks**（有声读物，只有音频，「适合娃休息眼睛的时候练听力」）
- **Read to Me 栏目有独立视觉标记**：「在书本右下方有个绿色小话筒标志的都是有真人朗读的」——这是**不识字孩子选书的关键导航线索**：用图标而非文字区分内容形态
- 中国区 App 为**汉化版本**（有中文界面与中文阅读）
- 「For you」即推荐流 → 孩子落地后**无需主动搜索即可开始读**

**② 选书到阅读的路径**
- 落地即推荐 → 点封面即进阅读器，理论 2 次点击
- 离线：「点击左上角的三个点，选择『保存供离线使用』」，保存后去 **My Library（我的书库）**查找
- **「一键继续上次」未取证**

**③ 阅读器交互（A 级 + B 级）**
- **逐字高亮的特殊实现**：「每读到一个字，都会自动变成大写，帮助孩子把发音和文字联系起来」——这是区别于所有竞品的细节：**朗读时被读到的字会变大（enlarge）**，而非仅变色
- **Spotlight Words**（词汇聚光灯）+ **audio-enabled Dictionary Lookup**（点词查义 + 听发音）——在阅读器内完成词汇学习闭环
- 长按选句 / 划线收藏 / 生词本 / 跟读打分：**全部未取证**

**④ 朗读体验**
- 「talented voice actors, fun music and exciting sound effects」
- 语速/音色调节、自动翻页与手动翻页切换、章节跳转：**全部未取证**

**⑤ 听书模式**
- AudioBooks 栏目与 Read to Me **并列且独立**，「只有音频」——听与读在信息架构上是一等公民分离的
- 后台播放 / 锁屏控件 / 息屏继续 / 睡眠定时档位：**全部未取证**
- 播放完成后衔接（下一本）：**未取证**

**⑥ 进度与成就感（A 级）**
- **Reading Buddies**（虚拟阅读伙伴）
- **Badges**：「badges that celebrate reading time, frequency, topics and more」——徽章维度是**时长/频率/主题**，不是连胜天数
- **Quizzes**（读后小问答）
- **Unlockables**（最新版 release note：「Unlockables are now available to all account holders」）——解锁物经济
- 家长侧：「Parent dashboard lets you see what they're reading and follow along with their progress」
- 教育侧 Epic School：**Daily 20**（教师布置并追踪每日/每周阅读）

**⑦ 家长控制**
- 最多 **4 个 child profiles**，各自个性化体验
- 时长/时段限制、内容分级过滤（Epic School 侧支持 AR/DRA/F&P/grade level 筛选，家庭侧未取证）
- **营销数字警示**：「95% of Epic parents say Epic helped improve their child's reading skills」**未附研究来源**

---

### 2. Vooks（iOS 19.7.2，4.55 星 / 9,816 评分，$9.99/月 或 $69.99/年）

**① 信息架构（A 级官网）**
- 官网顶层导航：Explore 下拉（All Offerings / **Animated Storybooks / Audiobooks / eBooks** / Creator / Storyteller / Printables & Activities）
- 内容形态**按媒介三分**：动画绘本、有声书、电子书——孩子/家长按「今天想怎么看」选入口
- 「best for kids under 9」标注；西语 100+

**② 阅读器与朗读高亮（A 级）**
- 「gently narrated, beautifully animated, thoughtfully paced, and always hand-crafted by humans, **never AI**」
- **同步高亮**：「read-along highlighted text, music, and sound」；「text-highlighting to help children connect the sounds of words with how they look visually」；「Read-along text builds literacy naturally」
- **屏幕哲学（可执行）**：「Subtle animation, music, and sound **engage without overstimulating**」；「intentionally designed to engage without overstimulating for gentle transitions」；定位「Bedtime, nap time, or quiet time」——**这是对 Lillard 2011 研究的直接产品化回应**

**⑤ 听书模式 Listen（A 级，本轮新发现）**
- **独立音频库**：「Listen—a growing audio library for quiet time, bedtime, car rides, wind-downs」
- **睡眠定时器**（sleep timer）
- **刷牙定时器**（toothbrush timer）——把听书嵌入日常流程的微创新
- 「stories without the screen」
- 独立播放视图 / 后台播放 / 锁屏控件 / 息屏继续 / 定时档位数量：**未取证**

**⑦ 微交互与内容创作**
- **Storyteller**：自录朗读并分享，「Recipients of shared Storyteller recordings **do not need a subscription**」
- **Vooks Creator**（iPad）：孩子自制电子书（text/images/drawings/voice recordings）
- 播放列表自建并分享
- 离线下载：「download stories for offline viewing / No wifi needed」

**⑧ 家长控制与合规**
- **COPPA + FERPA compliant** 明确标注
- 「Completely ad-free and kid-safe」

---

### 3. Yoto（硬件：音箱 + 实体卡片）

**① 信息架构：零屏幕，实体即导航（A 级官网，本轮详取）**
- 「**Card in. Play begins.**」内容即实体卡片，**无屏幕菜单**
- 4 代新增 **Green Button**（不插卡也能播）：
  - **「Twist to browse」**（旋转浏览，封面图显示在像素屏上）
  - **「Press to play」**（按下播放）
  - 「Press again to pause」
  - 「Press and hold to eject」（长按退出回到时钟）
  - 「Press when no audio is playing to instantly play the first title in the current day or night playlist」
- **像素屏的儿童导航设计**（极重要）：「**Title artwork helps kids browse and choose** what they want to listen to using the Green Button - much like picking a Yoto Card from their card case」；「**pixel icons help them navigate chapters and tracks** as they listen」——**用封面图+像素图标替代文字列表，给不识字孩子完整的自主选播权**
- 非播放时显示屏是**数字时钟**，「customisable day and night settings」

**② 选书到播放路径**
- 插卡即播 = **1 步**；Green Button 路径 = twist 浏览 → press 播放 = **2 步**
- **「一键继续上次」不存在**，但 Green Button「按下即播日/夜歌单第一项」是变体实现

**⑤ 听书模式（这是 Yoto 的核心）**
- **日/夜双歌单**（Day & Night Modes）：「Yoto Daily over breakfast to sleep sounds at bedtime」
- **okay-to-wake 起床提示**：时钟「acting as an okay-to-wake cue」
- **全面板夜灯 + 睡眠白噪音**（Full-panel night light, sleep sounds）
- **刷牙/作业定时器**：「alarms and handy timers for everything from brushing teeth to homework」
- 睡眠定时器具体档位：**未取证**
- 播放完成衔接：**未取证**

**⑧ 家长控制（App 侧）**
- **音量上限（护耳，真痛点）**：「4th Gen Yoto Player and Mini are **defaulted to ensure safe listening volumes** when used with wired or Bluetooth headphones」；Yoto 耳机「also have volume limits」
- 歌单内容增删、第一曲目设定
- 离线：App 加载后「compatible audio downloads to the player, so kids can browse and listen even when they're offline」
- **Make Your Own Cards**：录音/上传做成实体卡

**内容组织**：0-2 / 3-5 / 6-8 / 9+ 四段分龄；题材 9 类（Music / Classic Stories / Learning & Education / **Sleep & Bedtime** / Activities / Action & Adventure / Animal Stories / **Mindfulness & Movement** / History & Biography）；1,000+ 标题
**适玩年龄**：3 岁+（更小需看护者操作）

---

### 4. Tonies（硬件：Toniebox + 实体角色手办）

- 「**Pop a Tonie on the Toniebox 2 and they're all set**」——放置即播，1 步操作
- 「**Totally tumble-proof with intuitive play controls**, the Toniebox is designed to be super easy to use independently」
- 手势细节（耳朵调音量/侧键切章/拍打暂停/捏取手办）：**一手来源不可达，未取证**；二手商店页仅见「starting / stopping, swapping Tonies, changing tracks, and even changing volume **with a pinch of the ear**」
- **Tonieplay Games**（仅 2 代）：需另购 Tonieplay Controller，「Tonieplay Games will only work on Toniebox 2」
- 分龄：Nursery / 3+ / 4+ / 5+ / 6+；整机「certified safe for 1+」；Tonieplay 3-9 岁
- 离线：「The Toniebox will need to be connected to WiFi for set up and the **first time** you play a Tonie... Once the content has downloaded then you're good to go」
- **Creative Tonies** 自录内容
- 家长 App：内容管理（一手未取证）；**隐私警示**：Tonies 法律声明「We will send you... offers and recommendations based on... interaction information provided by you for advertising purposes (e.g. **playtime information**)」——播放数据用于广告推荐，与儿童隐私规范存在张力

---

### 5. Reading Eggs（iOS 4.24.0，4.70 星 / 7,273 评分，Blake eLearning）

**产品矩阵（A 级 iTunes）**：Reading Eggs Junior（2–4）→ Reading Eggs（3–7）→ Fast Phonics（5–10）→ Reading Eggspress（7–13）→ Mathseeds（3–9），4,000+ 电子书，家庭订阅最多 4 个孩子

**⑥ 激励体系（A 级，仅记录事实）**
- 「the reward system consists of **golden eggs, collectible pets, and games**, motivating children to keep learning」
- 「**matched to the perfect level** and progress with self-paced, one-on-one lessons」
- **奖励地图（reward map）具体形态：官网全站不可达，未取证**——这是本轮最大的证据缺口，因为奖励地图恰是「阅读进度可视化」的标杆案例。已知只是「金蛋 + 宠物 + 游戏」的兑换经济
- 「91% success rate AND money-back guarantee」——营销数字

**家长报告**：「receive **detailed progress reports, which show you exactly where your child is improving and where extra attention is needed**」——这是「诊断式报告」的典范措辞

**合规**：iOS 15.8+，需账号登录，教师账号不支持

---

### 6. Khan Academy Kids（iOS 9.0.1，4.80 星 / 130,485 评分）

**① 信息架构与导航（A 级 iTunes + B 级操作记录）**
- **角色即入口**（每个动物负责一个学科）：Kodi the Bear（主线向导）/ **Ollo 小象（自然拼读与字母发音）/ Reya 小熊猫（故事时间与写作）/ Peck 小蜂鸟（数字与计数）/ Sandy 小澳洲野犬（拼图、记忆与解决问题）**
  → 不识字孩子通过**角色头像**而非文字标签识别内容类型
- **系统推送为主**：「会根据孩子的年龄和能力水平，自动整合语言、数学、逻辑等方面的游戏和课程。孩子无需自主挑选，主要由系统依据年龄推送」——**低幼段的导航范式是「不让孩子导航」，直接给内容**
- 注册流：选 At Home → Sign Up（仅需邮箱验证）→ **设置孩子的名字、年龄及头像** → 进入主界面
- 图书馆：「发现数百本适合学前、幼儿园和小学低年级的绘本与视频」，含 National Geographic / Bellwether Media 非虚构

**③ 阅读器与朗读（A 级）**
- **Read To Me**：「选择『为我朗读』（Read to Me），即可听**英语或西班牙语**故事」——双语朗读是一等公民
- 高亮实现细节：**未取证**

**⑥ 进度与成就感**
- **无徽章/无积分**（ nonprofit 属性，描述中零奖励机制）
- 家长端：「点击页面中的『**Class Reports**』，即可查看孩子的学习进度和知识点掌握情况」
- 难度调整：家长账号 → 孩子账户 → 右上角头像改年龄
- **Assignments**：家长可从图书馆选内容「勾选孩子账户，设置任务时间，然后点击右上角的『Save』」
- 教师 Tools：建班、布置任务、追踪进度

**⑧ 家长控制**
- **完全免费、无广告、无订阅、无内购**（最干净的商业模式）
- COPPA-compliant；与 Stanford GSE 合作开发；对齐 Head Start / Common Core
- 离线：「没有 Wi-Fi？没问题！提前下载书籍与游戏」

---

### 7. Duolingo ABC（iOS 1.96.2，4.25 星 / 3,799 评分，2023-08 后停更）

**③ 阅读器与朗读（A 级 iTunes，最精确的高亮描述）**
- 「reading words aloud to kids and **highlighting each word spoken**」——**逐词（word-level）高亮**，非句级
- 「This utilizes **multi-sensory learning**」
- **多感官交互动作**：letter tracing（字母描红）、drag-and-drop prompts
- 「700+ hands-on lessons」「bite-sized lessons」
- 「mini games and rewards」（具体形态未取证）
- 「no ads or in-app purchases」；offline 可用
- **注意**：版本停在 2023-08-02，`releaseNotes` 为常规修复 → **该产品疑似停止更新**

---

### 8. Novel Effect（iOS 3.11.1，4.89 星 / 9,699 评分，本周更新）

**核心范式：声控音效伴读（A 级官网 + iTunes）**
- 「**follows your voice as you read out loud** from a children's story book and responds at just the right moment with interactive music, sound effects, and character voices」
- 操作四步（官网原文）：
  1. **FIND** - 「Use search or browse our collections」
  2. **PLAY** - 「Tap the cover and then choose how you'll be reading — with print or an eBook」
  3. **READ** - 「When you hear the **chime**, start reading aloud!」（**铃声 = 系统就绪的状态提示音**）
  4. **LISTEN** - 「Hear the music and sounds respond to your voice」
- **两种内容载体**：「Use with your own print copy of a book or choose an ebook from our library」——支持纸质书（自带印刷版）与 in-app eBooks
- **语音识别在端侧完成**：「Voice-recognition is performed on your device, no voice data is saved without express consent」
- **Reading log**：「A reading log tracks books you've read with the app」（iTunes 一手；官网页面未提）
- 孩子语音也能识别（Lifehacker 转引）：「the system picked up her little voice and played the effects at all the right moments」
- 三档订阅：FREE（数百音景 + 自带印刷书）/ PREMIUM（无限 + in-app ebooks）/ CLASSROOM（1 师 30 生）
- 需麦克风权限

---

### 9. Speechify（iOS 5.5.10，4.66 星 / 523,525 评分）

**③/④ 朗读与高亮（A 级官网）**
- **Active Text Highlighting**：「The text is highlighted and **perfectly synced, word for word**, with the voice reader to help you read along」——**逐词同步高亮**的工程级描述
- **速度**：「listen up to **4.5x speed**」；「Ease into 300 words per minute」
- **声音**：「over 1,000 natural-sounding text to speech voices in more than 60 languages」；含名人音色（Snoop Dogg / Gwyneth Paltrow）
- **OCR 扫描**：拍书页即转有声书
- 定位：**dyslexia, ADHD, low vision**；「reading is never a barrier for anyone」

**儿童模式**：**官网与 App 描述中均无「kids mode / 儿童模式」相关表述，未取证，倾向不存在**。Speechify 在本调研中的价值是**「朗读高亮 + 语速调节」的成人端工程标杆**，不是儿童产品标杆。
- 最新版 release note 提到「Add widgets to your home screen and dive into the **Discover tab**」「For You tab」——成人端的信息架构（Discover/For You）可借鉴

---

### 10. Amazon Kids+ / Kindle Kids / Fire Kids

**家长控制（A 级官网产品页 + iTunes 描述）**

*Kindle Paperwhite Kids（硬件级专注设计，A 级）*：
- 「**Stay in the story** – Designed to keep kids focused on reading with **no notifications, apps, videos, or games**」
- 「purpose-built for reading」「no games, no ads, no videos, no distractions」
- 「**Screen time limits are not enabled on Kindle so kids can read as long as they like**」——阅读类内容**豁免时长限制**，家长改设「device bedtime」
- 「ad-free experience」「thousands of ad-free, age-appropriate books」
- 家长可「review your child's **reading activity**, see specific titles to learn more about what books your child is enjoying, **adjust age filters**」
- 「add books from your account to your kid's library」

*Fire Kids 平板（A 级）*：
- 「allows you to use parental controls to **filter content based on child's age, set educational goals and time limits**」
- 「Adjustable age filters let you customize the tablet to grow with your child」
- 「Kids **can't access social media or make in-app purchases without parental approval**」
- 「thousands of ad-free books, games, videos, apps」
- 含 1 年 Amazon Kids+

*Amazon Kids Parent Dashboard App（A 级 iTunes，2026-09-10 刚改版）*：
- 「Home shows every child at a glance. **Bonus time, pause, or check activity in one tap**」——**「奖励时长 / 暂停 / 看动态」三键一字排开**
- 「Tap any child to see their activity, adjust time limits, update schedules, or manage content. **No more jumping between screens**」
- 「**Pause/resume your kids' access to their device even if your kids aren't near you**」
- 最多 4 个 child profiles
- **Learn first**：「prioritize books and learning apps before kids focus on entertainment content」（家长 App 描述原文）
- 「set time limits for a child's total screen time **for the day or the use of certain types of content**」；「set a time when your child's devices **turn off at night** and how long they stay off」
- 「review your child's use of particular types of content, or **see specific titles**」
- 「**block specific Amazon Kids+ titles**, add content from your Amazon library, or adjust the age filter based on your child's maturity, tastes, and sensitivities」

---

### 11. Sago Mini World（iOS 9.0.0，4.32 星 / 66,263 评分，2-6 岁）

**低幼交互范式（A 级官网 + iTunes）**
- 「**Kids are free to play their way** – the only limit is their imagination! Through **open-ended play**, they'll develop self-expression, empathy, and self-confidence」
- 「**designed for easy navigation**, Sago Mini World is safe screen time parents can trust」
- 「made with a **toddlers' wants and needs in mind**」；「allows toddlers to **explore and navigate the vast number of apps themselves, all in one place**」（家长证言）
- 设计三问（sagomini.com/about）："Does it encourage kids to explore, imagine and discover?" / "Is it intuitive, beautiful and fun to play?" / "Does it meet our high standards of quality and safety?"
- 「We believe that **laughter helps kids learn**. That **open-ended activities open doors**」
- COPPA + kidSAFE 认证；订阅制无广告无内购；离线可玩；一个订阅多设备共享
- **Piknik 捆绑包**：Sago Mini + Toca Boca + Originator 一个订阅
- **无文字界面/无失败态/无规则**的一手表述未取证（官网未明说），但 open-ended play 定位明确

---

### 12. Lingokids（iOS 26.38.0，4.27 星 / 651,124 评分）

- 「4000+ interactive games, songs, and shows」；「650+ learning objectives」
- **Playlearning™ method**：「learning sticks when it's wrapped in fun... through play, repetition, and curiosity」
- 「**progress reports, parent community, and up to 4 child profiles**」（Plus 功能）
- 「100% ad-free, with no in-app purchases」；kidSAFE 认证；在线或离线
- 内容合作：Disney / Blippi / Pocoyo / **NASA** / **Oxford University Press**
- 情绪主题运营：「content drop, **The Way I Feel**... Your kid gets to feel it all here, mad, sad, or scared」——**情绪认知是内容运营主线**
- 版本节奏：几乎每周更新

---

### 13. Bookful

**完全未取证**：`bookful.app` 连接超时，iTunes 搜索「Bookful」返回的最优匹配是 Vooks（Bookful 似乎已并入 Vooks 体系或下架）。**不确定该产品当前是否独立运营**。

---

## 第二部分：儿童产品 UX 规范与研究（可执行条目）

### 2.1 Apple App Store Kids Category（A 级一手，developer.apple.com/app-store/review/guidelines/）

**1.3 Kids Category 硬要求（verbatim）**：
- 「These apps **must not include links out of the app, purchasing opportunities, or other distractions to kids** unless reserved for a designated area **behind a parental gate**」
- 「Kids Category apps **may not send personally identifiable information or device information to third parties**」
- 「Apps in the Kids Category **should not include third-party analytics or third-party advertising**」
- 例外（有限情形）：第三方分析「may be permitted provided that the services **do not collect or transmit the IDFA or any identifiable information about children** (such as name, date of birth, email address), their location, or their devices」；第三方**情境广告**「provided that the services have publicly documented practices and policies for Kids Category apps that include **human review of ad creatives** for age appropriateness」
- **一旦进入 Kids Category，后续更新必须持续符合要求**，即使取消该类别（「once customers expect your app to follow the Kids Category requirements, it will need to continue to meet these guidelines in subsequent updates, even if you decide to deselect the category」）

**5.1.4 Kids 隐私**：
- 「Apps may ask for birthdate and parental contact information **only for the purpose of complying with these statutes**, but must include some useful functionality or entertainment value regardless of a person's age」
- 必须有隐私政策 + 符合 COPPA / GDPR 等儿童隐私法
- **「parental gate requirement ≠ 法定的家长同意」**（Apple 明确区分两者）

**2.3.8 元数据年龄限制**：图标/截图/描述须符合 4+ 评级标准；**「For Kids」「For Children」字样为 Kids Category 保留**，非该类别 App 不得在名称/副标题/图标/截图/描述中暗示主要受众是儿童

**2.5.18 行为广告**：禁止基于来自儿童（如 Kids Category App）的数据做定向/行为广告

**可执行清单**：
1. 任何外链、购买入口、「其他 App 推荐」必须放进**家长门禁（parental gate）**区域——技术实现通常为「长按/数学题/滑动+延迟」
2. 不自建广告系统、不接第三方广告 SDK；如接第三方分析，须配置为**不采集 IDFA/姓名/生日/邮箱/定位/设备信息**
3. 日期/家长联系方式的采集只能用于合规（如 COPPA 年龄验证），且**采集与否都不能影响核心功能可用性**
4. 桃阅读若主打儿童受众，元数据（名称/截图/描述）须全程按 4+ 标准自审，且「儿童/孩子」相关措辞要符合 Kids Category 登记

---

### 2.2 Google Play Families Policy（C 级转引，一手站点不可达）

来自 CSDN/开发者博客转引 + 一个真实违规案例：
- **目标受众声明**：须在 Play 管理中心填写「目标受众群体和内容」，选择适当年龄段
- **儿童社交设计**（若含社交功能）：须「在应用内提醒用户如何安全地在网上与他人互动」；「儿童必须获得**成人批准**才能开启允许分享个人信息的聊天功能」；主要用途为与陌生人聊天的 App **不得以儿童为目标受众**
- **广告与变现**：面向儿童的应用中「所有创收行为和广告都必须遵守此政策」；**Google 维护一份「合规广告网络白名单」**，未列出的 SDK（如 Facebook Ad SDK）会导致审核被拒（真实案例）
- **内购**：禁止「欺骗性或操纵性购物体验（包括应用内购买或订阅）」
- **隐私**：须填写「数据安全」表单并在期限内提供隐私权政策
- 官方文档指针（本轮无法抓取）：developer.android.com/google-play/guides/families

**可执行清单**：安卓端如做儿童分发，广告 SDK 只能从 Google 白名单中选；订阅页不得有任何误导性倒计时/「不买就损失」话术。

---

### 2.3 英国 Age Appropriate Design Code（儿童适龄设计准则，A 级一手，ico.org.uk）

**15 条标准全名单**（ico.org.uk 官方表述）：
1. **Best interests of the child**（儿童最大利益）——设计开发的首要考虑
2. **Data protection impact assessments (DPIAs)**
3. **Age appropriate application**（适龄适用）
4. **Transparency**（透明度——隐私说明须清晰、儿童友好）
5. **Detrimental use of data**（禁止有害使用）
6. **Policies and community standards**
7. **Default settings**（默认设置）——须默认**高隐私**，除非有正当理由
8. **Data minimisation**——只采集**最少**个人数据
9. **Data sharing**——「children's data should not usually be shared」
10. **Geolocation**——地理位置服务**默认关闭**
11. **Parental controls**（家长控制）
12. **Profiling**（画像/自动化决策）
13. **Nudge techniques**（助推技术）——「**should not be used to encourage children to provide unnecessary personal data, weaken or turn off their privacy settings**」
14. **Connected toys and devices**
15. **Online tools**（儿童行使数据权利的可及工具）

**与 UI/UX 直接相关的 6 条（ commissioner 原话）**：
- ICO 专员明确说：「We want **coders, UX designers and system engineers** to engage with these standards in their day-to-day work」——**这是写给设计师的规范**
- 代码「sets standards」但「does not ban or specifically prescribe」设计选择，要求的是「built-in protection to allow children to explore, learn and play online」
- **#7 默认高隐私**、**#8 最小采集**、**#10 定位默认关**、**#13 禁止削弱隐私设置的助推**、**#4 儿童可读的透明度**、**#5 禁止有害使用**

**可执行清单**：
1. 所有隐私开关默认「最严」；定位/通讯录/相册权限默认不申请
2. 任何引导孩子「去关隐私设置」「填生日解锁内容」的助推设计**直接违法**
3. 隐私说明要有**儿童可读版本**（图标 + 短句），不只放法律长文
4. 断签惩罚、连胜火苗、焦虑型推送若造成「materially detrimental to a child's health or wellbeing」，触及 **#5 红线**

---

### 2.4 屏幕时间指南：被动观看 vs 互动阅读（B/C 级）

**AAP 美国儿科学会**（经中国媒体转引，C 级，原文站不可达）：
- 「18 个月以下避免使用电子媒体（**视频通话除外**）」
- 18-24 个月：「如需使用，选择高质量节目，且**家长需共同观看、解释内容**」（亲子共看）
- 2-5 岁每天累计不超过 1 小时
- 「不在卧室、餐桌上使用」

**AAP 家庭媒体计划工具页（healthychildren.org，B 级一手）**：
- 「**Set screen-free zones** (such as the dinner table, during homework and before bed)」
- 「**Turn off autoplay and notifications**」——** autoplay 与通知是被 AAP 点名要求关掉的两个功能**
- 「**Choose quality content**」that educates, sparks creativity, or fosters social connection, 避开 ad-heavy / violent / age-inappropriate
- 「**talk about ads and influencer marketing** before using new apps or platforms」
- 「Turn off devices not in use to reduce distractions」
- 父母是「important role model」

**WHO 世界卫生组织**（经泉州晚报转引，C 级）：
- 「不建议 2 岁以下儿童接触各种屏幕，2—5 岁儿童每日屏幕暴露时间不应超过 1 小时」

**中国《防控儿童青少年近视核心知识十条》**：
- 「0—3 岁婴幼儿不使用手机、平板、电脑等视屏类电子产品；3—6 岁幼儿尽量避免其接触和使用」
- 「中小学生非学习目的使用电子屏幕**单次时长不宜超过 15 分钟**，每天累计时长不宜超过 1 小时」

**「被动观看 vs 互动阅读」对 UX 的映射（关键）**：
- 指南的措辞是「**屏幕暴露时间**」/「屏幕时间」——**同一段时间对不同内容并不等价**：互动阅读/教育互动内容被单列为「学习目的」用途（中国指南明确区分「非学习目的」），享有不同的时长预算
- AAP 的品质标准（educates / sparks creativity / fosters social connection）**就是产品自审清单**：桃阅读的功能设计可以直接对照这三条证明自己属于「高质量」
- **设计推论**：
  1. 阅读/听书时长应在家长报告中**与娱乐视频时长分开统计**（Epic 的 Read to Me / Videos / AudioBooks 三栏目天然支持这种分账）
  2. 内置「屏幕暴露」换算口径，帮助家长按「非学习目的单次 15 分钟」自检
  3. 默认关闭 autoplay（AAP 明文），听书列表播完即停而非无限续播

---

### 2.5 触控人体工学研究（A 级规范 + D 级研究）

**WCAG 2.2 SC 2.5.8 Target Size (Minimum)（A 级一手，w3.org）**：
- 「the size of the target for pointer inputs is **at least 24 by 24 CSS pixels**」
- 须「conceptually possible to draw a solid 24 by 24 CSS pixel square, aligned to the horizontal and vertical axis such that the square is completely within the target」
- **与缩放无关**：「is independent of the zoom factor of the page」
- **间距例外**（允许小目标）：「Undersized targets... positioned so that if a **24 CSS pixel diameter circle** is centered on the bounding box of each, the circles **do not intersect** another target」
- 其他例外：Inline（句内文本受行高约束）/ User Agent Control / Essential（地图大头针等）/ Equivalent（同页有等价大控件）
- 更严的 AAA：SC 2.5.5 Target Size (Enhanced) = **44 × 44 CSS pixels**（W3C 建议「For important links/controls, consider aiming for the stricter 2.5.5」）

**儿童场景的取值判断（研究缺口的诚实标注）**：
- **「儿童手指尺寸 → mm 级最小触控区」的具体实证研究本轮未取证到一手来源**（ACM Digital Library 403、ScienceDirect 403、Frontiers 命中错误论文）。本轮不编造数字
- 可用的间接证据：
  - **Scerif et al. 2004 (Dev Sci, PMID 15323123)**：2 岁与 3 岁幼儿在触屏上做**多目标视觉搜索**，测量「Time to hit a target, distance between successively touched items, accuracy and error types」，发现两个年龄对搜索显示操纵的脆弱性不同；特殊儿童组「produced a **larger number of errors**」。→ **结论是学步儿的触屏命中精度显著低于成人，且误触率高，UI 需要更大目标 + 更宽容错**
  - **Millar et al. 2019 (BMJ Open, PMID 31315858)**：3-5 岁儿童在 iPad 上玩游戏，设备能记录**亚秒级（subsecond）运动与触控模式**，机器学习可 93% 区分出自闭症儿童。→ **幼儿的触控数据本身具有诊断级价值，也意味着采集需极其谨慎（与 AADC #8 数据最小化冲突）**
- **落地建议（保守，按 AAA 执行）**：儿童 App 的可点区域**按 44×44 pt（约 14.6mm @1x，44pt ≈ 15mm 量级）作为下限**，而非 WCAG 的 24px 下限；关键操作（删除/购买/退出阅读）加**二次确认**防误触
- **坐姿观看距离 → 字号/行距**：本轮**未取证到一手研究**，不作数字建议。实践上绘本类内容按「一屏不超过 3-4 行文字、字号不小于正文 17pt 量级」保守设计，并支持手动放大

---

### 2.6 阅读障碍/初学者友好排版（A 级一手，dyslexia-reading-well.com）

**有证据的结论**：
- **字体**：2013 年西班牙研究（经该站转引）发现「**Helvetica, Courier, Arial and Verdana were the best fonts for dyslexics**」；通用建议「Choose a simple **sans serif** font like Arial or Helvetica」
- **字号**：「**12-14 point** sans serif font」；「Use larger fonts and **bolding** to highlight text」
- **间距**：专用字体靠加宽间距起效——Dyslexie「Adds space between letters and words」；「**shorter sentences and paragraphs with ample line spacing**」
- **对齐**：「**Left justify** text」（不要两端对齐/居中）
- **对比与底色**：「Use **black text on lighter backgrounds**」；「**Cream colours or pastels work well**」；避免「bright white paper or backgrounds on webpages」与「white text on black backgrounds」
- **避免**：「**underlining or using italics**」、「**ALL CAPS**. The letters tend to fuse together」、「acronyms and abbreviations」

**反直觉的重要证据（必须写进设计决策）**：
- **专用阅读障碍字体（OpenDyslexic / Dyslexie 等）无科学支持**：「**no independent research has found that any font significantly improves reading speed or comprehension for dyslexics**」； Dyslexie 的硕士论文（n=43）「showed no speed improvement... essentially neutral」；OpenDyslexic 官网自承「no formal studies」
- 作者的机制解释：阅读障碍是「**auditory and cognitive processing impairment, not a visual one**」——解码发生在脑而非眼
- **→ 桃阅读的排版策略不应是「换个花体字」，而是「干净无衬线 + 够大字号 + 宽行距 + 左对齐 + 短句段 + 米白底色 + 不用斜线下划线全大写」**

---

### 2.7 动效与注意力（D 级一手研究 + A 级技术规范）

**Lillard & Peterson 2011, Pediatrics 128(4):644-9（PubMed 一手摘要，PMID 21911349）**：
- 设计：**60 名 4 岁儿童**随机分三组——看快节奏电视动画片 / 看教育动画片 / 画画，各 **9 分钟**
- 随后做 **4 项执行功能任务**（含经典 delay-of-gratification 延迟满足、Tower of Hanoi 汉诺塔）
- 结果：「Children who watched the **fast-paced television cartoon performed significantly worse** on the executive function tasks than children in the other 2 groups when controlling for child attention, age, and television exposure」
- 结论：「**Just 9 minutes of viewing a fast-paced television cartoon had immediate negative effects on 4-year-olds' executive function**」
- **→ 这是 Vooks「engage without overstimulating」产品哲学的学术依据：动效节奏直接、即时地损害幼儿的自控与工作记忆**

**Reich, Yau & Warschauer 2016, J Dev Behav Pediatr 37(7):585-91（PubMed 一手摘要，PMID 27575440）**——电子书设计的直接指南：
- 「When eBooks are designed well, preschool-aged children learn **equally well and sometimes more** than from print books」
- **「However, enhanced eBooks with sounds, animations, and games can distract children and reduce learning」**——**增强型电子书的音效/动画/游戏若与故事无关，会降低学习效果**
- 「When book-sharing with an adult, conversations during eBook reading are **often about the platform** while print book conversations are more often **about the book content**」——**共读电子书时话题被设备吸走，这是亲子共读的体验损耗**
- 「For young children (0-2 yr)... limited educational benefits of tablet use for this age group」
- 作者建议：(1) 慎选增强型电子书，**与故事内容无关的游戏/动画具有分散性**；(2) 成人参与共读，讨论故事/文字/角色能提升理解、语言发展与印刷意识；(3) **限制婴幼儿使用平板**，他们从面对面互动中获益更多

**prefers-reduced-motion（A 级，MDN 一手）**：
- 用于检测用户是否开启了「减少非必要动效」的系统设置
- 值：`no-preference`（无偏好，评估为 false）/ `reduce`（已开启，评估为 true）
- 「Such animations can trigger **discomfort for those with vestibular motion disorders**. Animations such as **scaling or panning large objects can be vestibular motion triggers**」
- 各平台开启路径（iOS：设置 > 辅助功能 > 动态效果；Windows 11：设置 > 辅助功能 > 视觉效果 > 动画效果；macOS：系统设置 > 辅助功能 > 显示 > 减少动态效果）
- MDN 示例把 pulse（缩放）降级为 dissolve（透明度）——**「把缩放/平移类大动效降级为透明度变化」是标准做法**

**儿童场景的取舍（研究缺口 + 建议落地形态）**：
- **取舍**：`prefers-reduced-motion` 依赖系统级开关，**幼儿不可能自己去设置里开**。因此儿童 App 不能只靠这个媒体查询，而应**默认采用低刺激动效基线**：
  1. 翻页转场用**位移/淡入**而非缩放/旋转；时长偏短（200-300ms 量级），缓动用 ease-out 而非弹性回弹
  2. 避免大范围缩放与视差平移（前庭触发器）
  3. 朗读高亮用**颜色/字重变化**而非跳动放大；Epic 的「被读到的字变大」要控制幅度
  4. 页面静止时**零循环动画**（不闪、不脉冲、不无限循环——同时满足 AAP「关掉 autoplay」的精神）
  5. 同时仍实现 `@media (prefers-reduced-motion: reduce)` 兜底，把残余动效降为透明度过渡

---

## 第三部分：对桃阅读的可落地差距清单

> 红线定义（桃阅读自定，触线不做）：**积分/打卡/断签惩罚/孩子端推送/广告/「阅读解锁娱乐」式交易**——这些机制把阅读工具化为焦虑来源，与 Scholastic「nagging a child to read will surely turn it off」、AADC #5（detrimental use）、AAP「关掉通知与 autoplay」三条证据同时冲突。

### 导航与信息架构

| 编号 | 差距描述 | 证据来源 | 建议落地形态 | 红线 |
|---|---|---|---|---|
| **IA-1** | 孩子端缺少「内容形态图标化导航」——不识字孩子无法区分「读 / 听 / 看」 | Epic：绿色小话筒标记 + Read to Me/Videos/AudioBooks 四栏目（搜狐 B 级）；Khan Kids：角色即入口（Ollo/Reya/Peck/Sandy） | 首页按媒介分栏：**绘本图标 / 耳机图标 / 视频图标**，配角色形象；封面图优先于文字列表 | 否 |
| **IA-2** | 低幼段（2-4 岁）仍要求孩子自主导航 | Khan Kids：「孩子无需自主挑选，主要由系统依据年龄推送」 | 3 岁以下默认**「投喂模式」**：无导航，直接进当前故事，家长可改年龄调难度（Khan：家长账号→孩子账户→右上角头像改年龄） | 否 |
| **IA-3** | 无「一键继续上次」 | Amazon：「Bonus time, pause, or check activity in one tap」的一键哲学 | 孩子端首屏**「继续上次」大卡片**（封面 + 进度条 + 时长），单点进入 | 否 |
| **IA-4** | 听与读在 IA 中未分账 | Epic：AudioBooks 与 Read to Me 并列独立栏目；Vooks：Animated Storybooks / Audiobooks / eBooks 三分 | 「听」与「读」**双首页 Tab**，家长报告分别统计时长（呼应 2.4 屏幕时间分账） | 否 |

### 阅读器与朗读

| 编号 | 差距描述 | 证据来源 | 建议落地形态 | 红线 |
|---|---|---|---|---|
| **RD-1** | 朗读高亮形态未定，缺少逐词同步 | Duolingo ABC：「highlighting **each word spoken**」；Speechify：「highlighted and **perfectly synced, word for word**」；Vooks：「text-highlighting to help children connect the sounds of words with how they look visually」 | **逐词（word-level）高亮**，颜色 + 字重双信号；句级高亮作为低性能设备降级方案 | 否 |
| **RD-2** | 无「被朗读字变大」的强化反馈 | Epic（搜狐 B 级）：「每读到一个字，都会自动变成大写，帮助孩子把发音和文字联系起来」 | 朗读时被读到字**轻度放大（1.1-1.2 倍，勿过大触发前庭不适）** + 着色 | 否 |
| **RD-3** | 阅读器内无词汇工具闭环 | Epic：**Spotlight Words + audio-enabled Dictionary Lookup** | 点词弹出：释义 + **真人/ TTS 发音** + 一键加入生词本 | 否 |
| **RD-4** | 无读后理解问答 | Epic：quizzes；Reading Eggspress：comprehension | 章节书每本 3-5 道开放题；绘本用**「亲子谈话卡片」**（3 个开放式问题）替代选择题——同时回应 Reich 2016「成人参与讨论提升理解」 | 否 |
| **RD-5** | 语速/音色不可调 | Speechify：「listen up to 4.5x speed」、1000+ 音色 60+ 语言 | 朗读档位 **0.75x / 1x / 1.25x / 1.5x**（儿童场景不给到 4.5x）；至少 2 种音色（成人女声/男声） | 否 |
| **RD-6** | 自动翻页/手动翻页无切换 | Epic/Yoto 均有「播完即停」精神（AAP：关 autoplay） | **默认手动翻页**；朗读模式可开「自动翻页」但须显式开关；**列表播完默认停止**（AAP「Turn off autoplay」） | 否 |
| **RD-7** | 增强型内容（音效/动画/小游戏）缺乏与故事相关性的约束 | Reich 2016：「enhanced eBooks with sounds, animations, and games **can distract children and reduce learning**」；Lillard 2011：快节奏 9 分钟即损害执行功能 | 所有动画/音效必须**与故事情节绑定**；无关小游戏不做；交互热点加「点击区域高亮提示」减少乱点 | 否 |
| **RD-8** | 亲子共读时话题被设备吸走 | Reich 2016：「conversations during eBook reading are often about the platform while print book conversations are more often about the book content」 | 共读模式下**收起所有浮层与按钮**（点屏幕中央才唤出），把屏幕主动权交给家长讲述 | 否 |

### 听书模式

| 编号 | 差距描述 | 证据来源 | 建议落地形态 | 红线 |
|---|---|---|---|---|
| **AU-1** | 无独立纯音频播放视图 | Vooks Listen（独立音频库）；Epic AudioBooks「只有音频」 | **全屏播放器**：大封面 + 进度 + 章节列表；支持**后台播放 + 锁屏控件（Media Session）+ 息屏继续** | 否 |
| **AU-2** | 无场景化睡眠定时 | Vooks：**sleep timer** + **toothbrush timer**；Yoto：刷牙/作业定时器、okay-to-wake | **场景预设档位**：刷牙 2 分钟 / 睡前 15-30 分钟 / 哄睡 45 分钟；到点**淡出（fade-out）而非硬切** | 否 |
| **AU-3** | 无音量上限（护耳） | Yoto：「defaulted to ensure **safe listening volumes**」；耳机硬件级限流 | 家长端设**最大音量档**；耳机/外放分别设置；超限弹温和提示 | 否 |
| **AU-4** | 无「起床提示/作息嵌入」 | Yoto：okay-to-wake cue + 日/夜双歌单 | 早晨时段默认推**轻快歌单**，睡前默认推**白噪音/轻柔故事**；家长可设「息屏只听」时段 | 否 |
| **AU-5** | 播放完成衔接未设计 | Yoto Green Button「按下即播歌单第一项」 | 单本播完**停在结尾并显示「再听一次/换一本」**；不自动连播（除非家长开「连续播放」） | 否 |
| **AU-6** | 无亲人原声内容形态 | Vooks Storyteller（接收方**不需订阅**）；Yoto Make Your Own Cards；Tonies Creative | **「家人读」**：家长/祖辈录音上传 → 孩子端封面带「❤️ 录制」标记；异地家庭核心场景 | 否 |

### 进度与成就感（红线密集区）

| 编号 | 差距描述 | 证据来源 | 建议落地形态 | 红线 |
|---|---|---|---|---|
| **RW-1** | 进度可视化形态单一 | Reading Eggs：奖励地图**未取证**，仅有「golden eggs, pets, games」；Epic：badges 庆祝 **reading time / frequency / topics** | 阅读进度用**「读书树/书架」**可视化（读完一本长一片叶）；**徽章只庆祝「读了什么主题/读了多少本」，绝不庆祝「连续多少天」** | 否（须避开连胜） |
| **RW-2** | 无陪伴型虚拟角色 | Epic：**Reading Buddies**；Khan Kids：Kodi the Bear 主线向导 | 一个贯穿全局的**阅读伙伴**（非可交易宠物），只在孩子完成阅读时出现互动，不催促 | **是（边界）**：必须是陪伴感而非兑换经济；Reading Eggs「金蛋换宠物换游戏」ABCmouse「票券经济」评分同段位最低（4.13/4.27 星），外部奖励与内在动机研究相悖——**不做积分兑换** |
| **RW-3** | 有打卡/断签风险 | Scholastic（上轮）：「nagging a child to read will surely turn it off」；AAP：关掉通知 | **默认不做 streak**；阅读目标默认**私密**仅家长可见；**孩子端无任何「今天还没读」提示** | **是（硬红线）**：断签惩罚/连胜火苗/补签设计**不做** |
| **RW-4** | 无解锁物激励 | Epic：**Unlockables**（最新版向所有账户开放） | 「读 N 本某主题书 → 解锁**一套贴纸/皮肤**」装饰性奖励，**不锁定内容本身**、可跳过 | **是（边界）**：阅读解锁娱乐（Amazon Learn First 式）**不做**；装饰性解锁可做但须可关闭、可跳过 |
| **RW-5** | 家长报告缺少诊断维度 | Reading Eggs：「show you **exactly where your child is improving and where extra attention is needed**」；Amazon：「see specific titles」 | 报告含：在读书目具体书名 / 中英分别时长 / 进度位置 / 问答正确率 / **「建议加强」诊断段**（如「近两周科普类阅读为 0」） | 否 |
| **RW-6** | 8-12 岁「9 岁悬崖」无防御 | Scholastic（上轮）：8 岁 57% → 9 岁 35%；同龄人发现机制缺失 | 该年龄段：**同龄人书单流**（匿名「和你同龄的孩子在读」）、系列续读提醒；目标/徽章对该年龄段**默认隐藏** | 否 |

### 微交互与排版

| 编号 | 差距描述 | 证据来源 | 建议落地形态 | 红线 |
|---|---|---|---|---|
| **MC-1** | 动效节奏未受约束 | Lillard 2011：**9 分钟快节奏动画即损害 4 岁儿童执行功能**；Vooks：「engage **without overstimulating**」 | 动效基线：转场 200-300ms ease-out；**禁止大范围缩放/视差平移**；静止页面零循环动画 | 否 |
| **MC-2** | 未实现 reduced-motion 兜底 | MDN（A 级）：前庭触发器=缩放/平移大物体 | 实现 `@media (prefers-reduced-motion: reduce)`，残余动效降为透明度过渡；**但儿童端默认就是低刺激基线，不依赖系统开关** | 否 |
| **MC-3** | 触控区尺寸无标准 | WCAG 2.2：24×24 CSS px 下限；AAA 2.5.5：44×44；Scerif 2004：学步儿触屏命中精度低、误触率高 | **儿童可点区域下限 44×44pt**；相邻目标间距满足 24px 圆不交叉规则 | 否 |
| **MC-4** | 关键操作无防误触 | Amazon：「Kids can't... make in-app purchases **without parental approval**」 | 退出阅读/删除/购买类操作**二次确认**（长按或「按住 1 秒」式家长手势） | 否 |
| **MC-5** | 排版无阅读障碍友好策略 | dyslexia-reading-well（A 级汇总）：Arial/Helvetica 无衬线、12-14pt、宽行距、左对齐、米白底、不用斜线/全大写；**专用字体无科学支持** | 无衬线 + 大字号 + 宽行距 + **左对齐** + 米白底色（#FBF7F0 量级）；**不引入 OpenDyslexic 类字体**（无证据） | 否 |
| **MC-6** | 无音效设计规范 | Vooks：「fun music and exciting sound effects」；Novel Effect：**chime 提示就绪** | 交互音效**仅在朗读/点击成功时出现**；状态变化用**柔和提示音**（如 Novel Effect 的 chime）；无失败音效 | 否 |
| **MC-7** | 加载/空/错态未儿童化 | （行业通识，一手未取证） | 空态：「这里还没有书，让妈妈帮你挑」；错误态：**不出现「失败」字样**，用「网络睡着了，点这里重试」 | 否 |

### 家长控制与合规

| 编号 | 差距描述 | 证据来源 | 建议落地形态 | 红线 |
|---|---|---|---|---|
| **PC-1** | 无多儿童档案 | Epic/ABCmouse/Homer/Reading Eggs/Amazon/Lingokids **清一色最多 4 个 profile** | 支持 4 个孩子档案，进度/徽章/推荐独立 | 否 |
| **PC-2** | 时长/时段控制缺失 | Amazon：总时长 / 分内容类型时长 / 夜间关机时段；Yoto：就寝定时 | 家长端：**每日总时长 + 分类型（读/听/看）配额 + 就寝时段自动切「息屏只听」**（Amazon：阅读类豁免时长是可借鉴的姿态） | 否 |
| **PC-3** | 内容分级过滤缺失 | Amazon：年龄过滤 + 人工逐本增删（block specific titles）；Epic School：AR/DRA/F&P/grade level 筛选 | 年龄/级数过滤 + **单本黑名单** + 家长手动加书 | 否 |
| **PC-4** | 购买隔离未实现 | Apple 1.3：购买机会必须在**家长门禁后**；Amazon：内购需家长批准 | 订阅/商店入口全部在**家长门禁**（长按 + 算术或延迟门）之后；孩子端零购买入口 | **是（硬红线）**：Apple Kids Category 明文禁止孩子侧出现 purchasing opportunities |
| **PC-5** | 第三方 SDK 未审计 | Apple 1.3/5.1.4：Kids 类不得向第三方发送 PII/设备信息；第三方分析不得采集 IDFA/姓名/生日/邮箱/定位；Google Play：广告 SDK 白名单 | 若接分析：**关闭 IDFA、不采生日/定位/设备 ID**；广告 SDK 只选白名单；隐私政策 + 儿童可读版（AADC #4） | **是（硬红线）**：违规直接导致 App Store 下架/拒绝 |
| **PC-6** | 推送策略未定义 | AAP：「**Turn off autoplay and notifications**」；AADC #13：不得助推孩子削弱隐私设置 | **不对孩子端发任何推送**；阅读提醒只发家长端且可关；**关闭 autoplay**为默认 | **是（硬红线）**：孩子端推送不做 |
| **PC-7** | 定位等权限默认申请 | AADC #7/#10：默认高隐私、定位默认关 | 定位/通讯录/相册**默认不申请**；隐私开关默认最严 | 否 |
| **PC-8** | 无「家长远程暂停」 | Amazon Parent Dashboard：「**Pause/resume** your kids' access to their device **even if your kids aren't near you**」 | 家长端一键「暂停」→ 孩子端温和提示「休息一下」后停用；「奖励时长」按钮可临时延长 | 否 |
| **PC-9** | 缺少专注设计 | Kindle Kids：「**Stay in the story**... **no notifications, apps, videos, or games**」 | 阅读器内**无通知、无外链、无其他 App 入口**；阅读时屏蔽一切非阅读元素 | 否 |
| **PC-10** | 无家校入口 | Epic School：教师免费建班 + Daily 20 + 班级追踪；Khan Kids：Teacher Tools | 轻量家校：教师建班、布置书目、看班级报告（中文学段体系内需求待验证） | 否 |

---

## 附：本轮未取证清单（不编造）

| 项目 | 状态 | 尝试过的来源 |
|---|---|---|
| Epic App 内底部 tab/舵式导航的具体形态 | 未取证 | 官网 JS 渲染；App Store 页无界面描述；Common Sense Media 404 |
| Epic 长按选句 / 划线收藏 / 生词本 / 跟读打分 | 未取证 | iTunes 描述仅提 Spotlight Words + Dictionary Lookup |
| Epic 朗读的语速/音色/自动翻页切换/章节跳转 | 未取证 | 同上 |
| Epic 听书后台播放/锁屏控件/睡眠定时档位 | 未取证 | 同上 |
| Reading Eggs 奖励地图（reward map）具体形态 | **未取证（最大缺口）** | readingeggs.com 全站 307 → .cn 域名 DNS 失败；.co.uk 同样跳转 |
| Reading Eggs 测评定级流程细节 | 未取证 | 同上 |
| Toniebox 手势（耳朵调音量/侧键切章/拍打暂停/捏取手办） | 未取证（仅二手商店页「pinch of the ear」一句） | tonies.com 首页可抓但控件说明页 404；support.tonies.com 403；Wikipedia/Guardian/Mumsnet 超时或 402 |
| Bookful | **完全未取证** | bookful.app 连接超时；iTunes 搜索返回 Vooks |
| Speechify 儿童模式 | **未取证，倾向不存在** | speechify.com 与 iTunes 描述均无相关表述 |
| Novel Effect 阅读记录的展示形态 | 部分（仅知「tracks books you've read」） | 官网页面未展开 |
| Vooks Listen 睡眠定时档位数量 | 未取证（仅知有 sleep timer） | vooks.com/listen 404 |
| Yoto 睡眠定时档位 | 未取证 | 官网仅「timers」「sleep sounds」 |
| 各产品翻页动效时长与缓动曲线参数 | 全部未取证 | 无公开文档 |
| 各产品音效设计细节 | 全部未取证 | 无公开文档 |
| 「儿童手指尺寸 → mm 触控区」一手实证 | 未取证 | ACM 403 / ScienceDirect 403 / Frontiers 命中错误论文 |
| 「坐姿观看距离 → 字号/行距」一手研究 | 未取证 | 未找到可抓取来源 |
| Google Play Families Policy 一手条文 | 未取证（C 级转引） | Google 全域连接超时 |
| AAP 年龄条文一手原文 | 未取证（C 级中国媒体转引） | publications.aap.org 403；healthychildren 文章页 404 |
| Sago Mini「无文字/无失败态」一手表述 | 未取证 | 官网仅 open-ended play 定位表述 |
