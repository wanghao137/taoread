# 桃阅读第三次迭代调研报告：语音 / TTS 与听书体验

> 调研日期：2026-09-16
> 调研约束：桃阅读 = Web App（React + Vite + PWA），Web Speech API 中文/英文儿童朗读；用户硬要求「语音必须拟人化，不能像机器人」
> 取证方式：WebFetch / curl 直接抓取权威页面 + Stack Exchange API 抓取 Stack Overflow 问答 + 360 搜索找中文产品资料 + 对微软 Edge TTS 端点做了一手请求实测
> 证据强度标注：【一手】= 本次直接抓取或实测；【二手】= 社区/媒体文章；【未取证】= 本次环境无法验证，已诚实标注

---

## A. 浏览器端语音能力现状（2025-2026）

### A1. SpeechSynthesis 浏览器支持度

| 浏览器 | 支持版本 | 备注 |
|---|---|---|
| Chrome | 33+ | |
| Edge | 14+ | |
| Safari | 7+ | |
| Firefox | 49+（31-48 默认禁用） | |
| iOS Safari | 7+ | |

- 全局使用率 **95.39%**；MDN 标注「Baseline: Widely available」，2018 年 9 月起跨浏览器可用。【一手】https://caniuse.com/speech-synthesis
- 规范状态仍是 **UNOFFICIAL**（W3C 非正式草案），这也是各家实现差异大、bug 多的根源。【一手】caniuse 同页
- `getVoices()` 首次调用可能返回空数组，必须监听 `voiceschanged` 事件；语音由**操作系统/浏览器实现提供**，规范不保证内容。【一手】https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

### A2. 各浏览器中文语音可用性

**Apple 平台（iOS / macOS Safari）**
- zh-CN 系统语音为 **Tingting**。【一手证据】Stack Overflow 问题「Safari JavaScript SpeechSynthesis on iOS 26 stop working after certain text」（2025-11 提问）中，提问者用 `voice.lang` 匹配 `/^zh-CN/` 并用 `voiceURI` 匹配 `/Tingting/` 选取中文语音，并确认 iOS 18 无此 bug。https://stackoverflow.com/questions/79796476
- 结论：iOS/macOS Safari 的中文语音来自系统语音（Tingting / Siri 神经语音），**质量取决于用户系统版本和是否下载了增强语音**。

**Microsoft Edge**
- Edge 的 `getVoices()` 在桌面端会列出「Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)」等**在线自然语音**（微软神经语音），这是 Edge 相对其他浏览器的核心优势。【二手/广为报道，本次未能在浏览器内实测 `getVoices()`，已标注】
- 【一手实测】Edge 朗读服务所用的免费端点 `https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list`（无需 API key，本环境 curl 直接 200）返回 **322 个音色，其中 14 个中文音色**：

| 音色 | 性别 | ContentCategories | VoicePersonalities |
|---|---|---|---|
| zh-CN-XiaoxiaoNeural | 女 | News, Novel | Warm |
| zh-CN-XiaoyiNeural | 女 | **Cartoon**, Novel | Lively |
| zh-CN-YunxiNeural | 男 | Novel | Lively, Sunshine |
| zh-CN-YunxiaNeural | 男 | **Cartoon**, Novel | **Cute** |
| zh-CN-YunjianNeural | 男 | Sports, Novel | Passion |
| zh-CN-YunyangNeural | 男 | News | Professional, Reliable |
| zh-CN-liaoning-XiaobeiNeural / zh-CN-shaanxi-XiaoniNeural | 女 | Dialect | Humorous / Bright |
| zh-HK ×3 / zh-TW ×3 | - | General | Friendly, Positive |

  → 即「Edge 免费 TTS」这条路上，**Xiaoyi（Cartoon/Lively）与 Yunxia（Cartoon/Cute）天然适合儿童内容**。这是本次调研最有力的一手发现之一。

**Chrome 桌面 / Android**
- Chrome 桌面端使用**操作系统语音**（Windows 上为 SAPI5 传统语音如 Huihui/Yaoyao，非神经语音）；Chrome for Android 使用系统 TTS 引擎（Google TTS）。【未取证】本次环境无法运行浏览器实测 `getVoices()`，此为广泛流传的实现差异，写代码时必须按运行时探测为准。

**微信内置浏览器**
- Android 微信内置浏览器基于 X5/系统 WebView，有开发者报告 `speechSynthesis` 不可用（CSDN 问答：「Vue2 项目在微信浏览器打开报错 Your browser does not support Speech Synthesis」；另有多条「手机浏览器不支持语音合成」问答）。【二手，非官方声明】
- iOS 微信 = WKWebView，SpeechSynthesis 可用但仅限系统语音。【二手】
- 结论：**桃阅读不应把微信内置浏览器当作朗读能力的目标平台**；需引导用户用 Safari/Edge/Chrome 打开。

### A3. SpeechSynthesis 已知缺陷与社区 workaround

1. **长文本截断（最经典的 Chrome bug）**
   - 【一手】SO 问题「Chrome Speech Synthesis with longer texts」（63 票）：Chrome 33 中短文本正常，长文本说到一半直接停止，**且一旦停止，整个浏览器的 SpeechSynthesis 都失效，必须重启浏览器**。https://stackoverflow.com/questions/21947730
   - 高票答案（70 票）关键结论：断裂只发生在**非原生语音**上；通常在 **200-300 字符**处断裂；`speechSynthesis.cancel()` 可以「解冻」；`onend` 有时不触发；把 speak 调用包进 `setTimeout` 能缓解。
   - 标准 workaround：**文本分块（chunk）**成小段 utterance 依次排队播放；代价是句中切断处的韵律不自然 + 小延迟。
2. **pause/resume 的「保活 hack」**
   - 【一手】同问题下答案（29 票 / 11 票）：周期性调用 `pause()` + `resume()`（每 10 秒）或单独 `resume()`（每 1 秒，`onstart` 时启动、`onend` 时清除），可绕过播放中断。
   - 说明 pause/resume 在 Chrome 上**本身不可靠**，只能作为 keep-alive 手段使用。
3. **iOS 26 的崩溃级 bug（2025-2026 新增）**
   - 【一手】SO 79796476：iOS 26.0.1 上，用 Tingting 语音朗读**以 `<` 开头、`>` 结尾且内部含中文**的文本（如 `<天地玄黄，宇宙鸿荒>`），会导致 SpeechSynthesis 完全失效，**刷新页面无效，必须重启 Safari**。macOS Safari 同样受影响；iOS 18 无此问题。workaround：把 `<` `>` 替换为全角 `＜` `＞`。
   - 对桃阅读的直接含义：**任何要进入 utterance.text 的内容都必须先做字符消毒**（< > 转全角或剔除），尤其是 BYOK 导入的微信读书书名/笔记。
4. **boundary 事件不靠谱**
   - 【一手】MDN 对 `boundary` 事件明确标注 **「Limited availability」**：这不是 Baseline 特性，「does not work in some of the most widely-used browsers」。https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/boundary_event
   - 中文场景更糟：中文无空格，Chrome 的 boundary 以词/句边界触发，中文往往整句才一个事件，**无法支撑字级高亮**。
5. **自动播放被浏览器策略阻止**
   - 【一手】MDN Autoplay 指南：未发生过用户交互的页签内，编程启动的**带音媒体一般被阻止**；条件为「静音 / 用户已交互 / 站点被加入白名单 / iframe 的 Permissions Policy 授权」四者之一。Web Audio API **同样受 autoplay 阻止**（Firefox 的 `media.autoplay.block-webaudio` 默认 true，需 sticky activation）。`Navigator.getAutoplayPolicy()` 可查询策略。https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
   - 该 MDN 页面**未提及 Speech Synthesis**（诚实标注），但移动端实测共识是：iOS Safari 上 `speak()` 必须在用户交互事件中调用。【二手】腾讯云开发者社区翻译的 SO 问答「speechSynthesis 不支持移动 Safari」答案明确列出检查项：语音是否加载、系统是否安装语音、utterance 配置、**是否从用户交互事件调用**。https://cloud.tencent.com/developer/ask/sof/108188016
   - 结论：桃阅读的「一键开始朗读」必须由**用户手势触发**，且首次播放前要做 voices 加载等待（轮询 `getVoices()` 直到非空）。

### A4. 字级 / 词级高亮方案

| 方案 | 能力 | 中文可用性 | 证据 |
|---|---|---|---|
| Web Speech `boundary` 事件 | 事件含 `charIndex` / `elapsedTime` / `name` | 中文不靠谱（见 A3.4），且非 Baseline | 【一手】MDN boundary_event |
| Azure Speech SDK `WordBoundary` 事件 | 事件提供 `BoundaryType`(Word/Punctuation/Sentence)、`AudioOffset`、`Duration`、`Text`、`TextOffset`、`WordLength` → 可直接做卡拉OK式高亮；**句子边界需显式开启** `SpeechServiceResponse_RequestSentenceBoundary=true` | 文档未逐语言说明 zh-CN 细节（标注），但该事件机制对中文按字/词触发 | 【一手】https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-speech-synthesis 。官方警告：事件触发快于实际播放，应用需自行把流时间轴与实际播放对齐 |
| edge-tts 的字幕时间轴 | 服务端返回 `WordBoundary`/`SentenceBoundary` 元数据，含 `Data.Offset` + `Data.Duration`；CLI `--write-subtitles` 直接输出 **SRT**；源码默认 `boundary="SentenceBoundary"`，可配置为 `WordBoundary` | 中文可用（端点支持中文，见 A2）；已知 quirks：跨块需 `offset_compensation` 补偿，源码注释明说存在「overflow in reported offsets」 | 【一手】edge-tts 源码 `src/edge_tts/communicate.py`（raw.githubusercontent.com 抓取）+ README |
| 纯前端估算（无时间轴） | 按字数 × 语速估算每字时长 | 精度差，仅兜底 | 无（实现常识） |
| 逐字分块朗读 | 每字一个 utterance | 精确但**完全破坏韵律**，违背「拟人化」要求 | 无（实现常识） |

> 结论：**要同时做到「拟人化 + 字级高亮」，必须走服务端 TTS 并拿时间轴**（Azure WordBoundary 或 edge-tts SRT）。纯前端 Web Speech 路线只能做句级或估算级高亮。

### A5. Media Session API（锁屏控件 / 息屏继续播放）

- 【一手】caniuse `mdn-api_MediaSession`：全局使用率 **96.2%**。Chrome 73+、Edge 79+、Safari 15+、**iOS Safari 15+**、Firefox 82+ 完整支持；Firefox for Android 仅 partial。→ 桃阅读在 iOS 15+ / Safari 15+ 上**可以**做锁屏播放控件（封面、标题、播放/暂停、进度），这是 PWA 听书体验的关键拼图。https://caniuse.com/mdn-api_MediaSession
- 【一手】caniuse `wake-lock`（Screen Wake Lock API）：全局 **94.92%**。Chrome 85+、Edge 90+、**Safari/iOS Safari 16.4+**、Firefox 126+。→ **iOS 16.4 以下系统无法阻止息屏**，朗读到一半锁屏就停；需做特性检测 + 低版本提示「请保持屏幕常亮」。https://caniuse.com/wake-lock
- 重要限制：Media Session / Wake Lock 都只对**真实媒体源**（`<audio>`/`<video>` 或 MediaSession metadata）有效。若朗读走 `speechSynthesis`（不产生媒体流），锁屏控件和息屏保持都**没有挂载点**。→ 这是「服务端 TTS + `<audio>`」相对「纯前端 speechSynthesis」的又一个决定性优势。

### A6. Web Audio API + TTS 混音（背景音 / 音效叠加）

- 【一手证据（间接）】MDN `SpeechSynthesis` 接口只暴露 `speak/cancel/pause/resume/getVoices` 和 `paused/pending/speaking` 状态，**没有任何音频输出流属性**；W3C Speech API 草案层面也不提供 MediaStream。→ **speechSynthesis 的输出无法被 Web Audio API 捕获、无法做音量包络/渐弱/混音**。
- 本次未能找到官方文档直接陈述此限制的页面（搜索受限，Stack Overflow 被 403、Chromium issue tracker 不可达），【标注为间接证据 + 未直接取证】。
- 可行替代：
  1. 服务端 TTS 生成音频文件 → `<audio>` 或 `AudioBufferSourceNode` → Web Audio 图（BGM 节点 + 朗读节点混合，可做渐弱、音效叠加）。**这是唯一能做「睡前渐弱 + 背景音」的路线**。
  2. 若坚持纯前端：BGM 走 Web Audio，朗读走 speechSynthesis，两者**无法同步控制**（朗读无法渐弱，只能 `speechSynthesis.pause()` 硬停）。`utterance.volume` 只能在发起前设置，不支持动态曲线。

---

## B. 服务端 / 云端 TTS 对比（「拟人化」升级评估）

### B1. 微软 Azure Cognitive Services Speech【主力候选】

**音色（一手抓取 learn.microsoft.com language-support 全表，zh-CN 共 ~45 个音色）**
- Standard 神经语音：`zh-CN-XiaoxiaoNeural`（女，20 种 style：affectionate / calm / chat / cheerful / **gentle** / **lyrical** / **poetry-reading** / **whispering** 等）；`zh-CN-YunxiNeural`（男，**Roles: Boy / Narrator / YoungAdultMale** —— 「Boy」角色直接适合儿童向男声）；`YunjianNeural`、`XiaoyiNeural`、`YunyangNeural`、`XiaoyanNeural` 等
- **明确标注的儿童音色：`zh-CN-XiaoshuangNeural (Female, Child)`、`zh-CN-XiaoyouNeural (Female, Child)`**
- 新一代 Neural HD / HD Flash（Dragon 系列，2025-2026）：`Xiaoxiao2:DragonHDFlashLatestNeural`（含 **story-telling** style）、`Xiaochen:DragonHDLatestNeural`、`Yunyi`（roles: assassin/captain/poet/prince）、`Xiaoyue`/`Yunqi` DragonHDOmni 等
- 方言：`zh-CN-henan-YundengNeural`、`zh-CN-shandong-YunxiangNeural`、`XiaoxiaoDialectsNeural`（山东/四川/中原等）
- 【一手】https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support

**价格**
- 【一手】https://azure.microsoft.com/en-us/pricing/details/speech/
- **F0 免费层：神经语音每月 50 万字符免费**（原文「Text to Speech (per character billing) Neural 0.5 million characters free per month」）
- PAYG：Standard Neural / Neural HD Flash「$- per 1M characters」，Neural HD「$- per 1M characters」—— **具体美元金额页面以 `$-` 占位、按区域/账号动态加载，本次未能取证具体数字**（诚实标注；prices.azure.com 零售 API 不含 Speech 类目）
- 承诺层：80M / 400M / 2000M 字符/月三档
- 计费规则：**按字符，标点也计**；SSML 中用于调整发音的音素/韵律元素也计为可计费字符
- Custom Voice（定制音色）为受限功能，需申请

**接入方式**：Speech SDK（含 JS 浏览器版）、REST、WebSocket 实时流式、批量合成 API。字级时间轴见 A4。
**合规**：企业级服务，内容安全与数据合规有官方承诺；儿童音色 + Boy role + story-telling style 是所有方案里最贴近「儿童拟人化朗读」的官方组合。

### B2. Microsoft Edge 在线 TTS（edge-tts，非官方）【零成本但合规风险最高】

- 【一手实测】端点 `speech.platform.bing.com/.../readaloud/voices/list`（trustedclienttoken 公开值）返回 322 音色 / 14 中文音色（见 A2 表），**无需 API key、无需 Edge 浏览器、无需 Windows**。
- 【一手】edge-tts（GitHub 12k stars，https://github.com/rany2/edge-tts ）：Python 模块 + CLI；`--rate/--volume/--pitch` 可调；`--write-subtitles` 输出 SRT 时间轴；`--list-voices` 列音色（含 Gender / ContentCategories / VoicePersonalities）。
- 【一手】README 明确：**自定义 SSML 已被微软限制**（只允许单个 `<voice>` 内套单个 `<prosody>`），所以情感/风格类高级控制**不可用**。
- 【一手】许可证：`LICENSE` 文件——`srt_composer.py` 为 MIT，其余文件 **LGPLv3**。
- 成本：**完全免费**，无额度概念。
- 合规判断：这是微软 Edge 朗读功能的**非官方端点**，无 SLA、无官方授权、可能随时被限流或关闭（ToS 灰色地带）。→ 适合个人/家庭自部署原型与自用，**不适合作为对外产品服务的依赖**。

### B3. Google Cloud Text-to-Speech【未能取证】

- 本环境 `cloud.google.com` 完全不可达（curl 与 WebFetch 均连接超时，Google IP 段被网络层阻断），**本次未能取得任何一手定价/音色证据**。
- 公开领域已知（**未本次验证，标注**）：WaveNet / Neural2 / Studio / Chirp 语音，zh-CN 有 cmn-CN-Wavenet-A/B/C、Neural2-C/D 等；按字符计费，有免费层。由于网络不可达 + 需要海外信用卡 + 数据出境合规问题，**对桃阅读（中国家庭场景）不是现实选项**。

### B4. 阿里云（百炼平台 CosyVoice / 通义语音）

**价格【一手】**（help.aliyun.com 百炼计费页）
- 计费单位：输入字符（**一个汉字 = 2 个字符**，字母/数字/标点各 1 字符）；仅输出文本计费，输出音频不计
- 华北2（北京）每万字符单价：`cosyvoice-v3.5-plus` ¥1.5；`cosyvoice-v3.5-flash` ¥0.8；`cosyvoice-v3-plus` ¥2；`cosyvoice-v3-flash` ¥1；`cosyvoice-v2/v1` ¥2
- **免费额度：每个模型 1 万字符**（自开通/发布/申请通过之日起 90 天内，以较晚者为准）；**仅华北2（北京）地域有免费额度，其他地域均无**
- 仅按量付费，暂无资源包/套餐
- 国际部署（新加坡）：v3-plus ¥1.9082/万字符、v3-flash ¥0.9541/万字符，无免费额度

**能力【一手】**（CosyVoice GitHub README）
- 9 种语言（中/英/日/韩/德/西/法/意/俄）+ **18+ 中文方言**（粤/闽/川/东北/陕西/上海/天津/山东…）
- **发音修补**：支持中文拼音与英文 CMU 音素级发音纠正（可做多音字/生僻字）
- **文本正则化**：数字、特殊符号、各种文本格式无需传统前端模块即可朗读
- **双向流式**：文本入流 + 音频出流，延迟可低至 **150ms**
- **Instruct 支持**：语言 / 方域 / **情感** / 语速 等指令控制；Fun-CosyVoice 3.0（2025）已发布
- 儿童/童声音色：README 未列出明确「儿童音色」，【未取证】；但零样本声音克隆可复刻家长声音（合规需本人授权）
- 接入：百炼 REST/流式 API、SDK

### B5. 腾讯云语音合成【价格一手，能力二手】

**价格【一手】**（cloud.tencent.com 语音合成购买指南）
- 免费额度（资源包形式，**3 个月有效，每账号限 1 次**）：超自然大模型音色 **2 万字符**；大模型音色 **10 万字符**；**基础/精品音色 800 万字符**
- 通用 TTS 预付费（¥/万字符/年）：超自然大模型 4.8–6.0；大模型 0.4–1.0；精品 **0.15–0.21**
- 通用 TTS 后付费（¥/万字符/日）：超自然大模型 4.9–6.5；大模型 0.55–1.2；精品 0.3
- 长文本 TTS：预付费大模型 1.5–2.8 / 精品 1.0–2.4；后付费大模型 2.30–3.20 / 精品 2.0–2.8
- 并发：超自然大模型默认 10，大模型/精品默认 20；扩容 ¥350 或 ¥200 / 并发 / 月
- 「大模型播客」后付费 ¥100/百万 token（输入+输出）
- 注意：**只有「通用语音合成」有免费额度**，且是一次性资源包

**能力【一手，产品文档】**：支持 **SSML**；音量/语速可调；提供基础、长文本、实时流式三类 API；多端 SDK（Android/iOS/C++/Java/PHP/Python）；官方卖点即「将文本转换为**拟人化语音**」，应用场景含**有声书**。儿童音色未在概述页列出，【未逐项取证】。

### B6. 火山引擎（字节跳动）

> 官方文档为前端 JS 渲染，WebFetch/curl 均只能拿到空壳，**未能取得官方一手证据**；以下来自媒体/测评文章【二手】。

- 产品线分「语音技术」（短文本，**每请求 ≤300 字**）与「音频技术」（**≤1000 字**）两条，限额不同
- 核心优势：**情感预测合成，支持情绪强度调节**
- 价格：情感预测版（长文本）**¥2/万字符** vs 标准版 **¥1/万字符**（情感能力贵一倍）
- **成本陷阱：非基础音色授权 ¥10,000/年/个**（单独付费）；测评文章评价其「成本结构较复杂」
- 豆包语音合成模型 2.0（2025-10 发布，chinaz 报道）：基于豆包 LLM，深度语义理解与上下文推理 → 精准情感表达；可用**自然语言调整语速、情感、语气**
- 童声/儿童音色：【未取证】
- 合规：国内合规无问题，但**非基础音色年费 1 万**对单家庭部署不现实

### B7. 开源本地方案

| 方案 | 许可证 | 中文 | 情感/多音色 | 硬件 | 关键限制 | 证据 |
|---|---|---|---|---|---|---|
| **CosyVoice**（FunAudioLLM） | README 抓取片段未显示 license【未取证】 | ✅ 9 语言 + 18 方言 | ✅ Instruct（语言/方言/情感/语速）；发音修补（拼音/CMU）；文本正则化 | 需 GPU（vLLM/TensorRT-LLM 加速）；CPU 未说明 | 部署复杂；license 未确认 | 【一手】GitHub README（raw 抓取） |
| **ChatTTS**（2noise） | 代码 **AGPLv3+**；模型 **CC BY-NC 4.0（禁商用）** | ✅ 中英（10 万小时训练，HF 开源版 4 万小时且无 SFT） | ❌ **多情感控制尚未开源**，仅有 `[laugh]`/`[uv_break]`/`[lbreak]` token | 30 秒片段至少 **4GB VRAM**；4090 RTF≈0.28（7 token/s） | **模型禁止商用**，直接排除 | 【一手】GitHub README |
| **GPT-SoVITS**（RVC-Boss） | **MIT** | ✅ 中/英/日/韩/粤 | 声音克隆（需参考音频）；情感控制为路线图未完成项 | RTF：4060Ti 0.028 / 4090 0.014 / **M4 CPU 0.526**；有 CPUFast 版 | 克隆音色 ≠ 稳定儿童叙事音色；G2PW 模型需单独下载 | 【一手】GitHub README |
| **Piper** | 开发已迁移至 `OHF-Voice/piper1-gpl`（**GPL**） | 有 zh_CN 音色（质量/数量有限，【未逐项取证】） | 无情感 | ONNX，CPU/树莓派友好 | 无情感、无中文前端优化 | 【一手】原仓库 README 已改为迁移声明 |
| **edge-tts** | LGPLv3（srt_composer 为 MIT） | ✅ 14 中文音色（含 Cartoon 类） | ❌ SSML 被限制（见 B2） | 无（调远程端点） | **非官方端点，无 SLA** | 【一手】 |
| **Kokoro-82M** | - | - | - | 82M 轻量模型 | 本次 raw/API 均 404，**未能取证** | 【未取证】 |

### B8. 「零成本 / 低成本 + 单家庭自部署」约束下的结论

**最现实路线排序：**

1. **Azure F0 免费层（首选）** —— 每月 50 万字符**永久免费**（不是一次性额度），覆盖**两个明确儿童音色**（XiaoshuangNeural / XiaoyouNeural）+ YunxiNeural 的 **Boy 角色** + DragonHD 的 **story-telling 风格**；Speech SDK 浏览器端可用、WebSocket 流式低延迟、**WordBoundary 事件直接给字级时间轴**（可做字级高亮）；企业级合规。单家庭场景下 50 万字符/月远超需求（一本中长绘本约 1-3 万字符，即每月可合成 150+ 本）。**这是「拟人化 + 字级高亮 + 锁屏控件 + 渐弱混音」四个能力唯一同时满足的免费方案。**
2. **edge-tts（备选/原型）** —— 零成本、音色多（含卡通向 Xiaoyi/Yunxia）、自带 SRT 时间轴，但**合规风险最高**（非官方端点），只能作为家庭自用原型或 Azure 不可用时的降级。
3. **腾讯云精品音色** —— 800 万字符免费（一次性，3 个月有效，约够 100+ 本绘本的前期缓存），单价最低（¥0.15/万字符）；但**免费额度是一次性的**，长期仍要付费，且未确认儿童音色。
4. **阿里云 CosyVoice** —— 技术能力最强（150ms 流式、情感指令、发音修补、18 方言），但免费额度仅 1 万字符/模型，长期成本 ¥0.8-2/万字符；适合未来商业化后升级。
5. **本地自部署（CosyVoice / GPT-SoVITS）** —— 需要 GPU 或忍受 CPU 慢速（GPT-SoVITS M4 CPU RTF 0.526）；ChatTTS 禁商用直接排除。**对「单家庭零成本」意义不大**，除非家里有闲置 GPU 且愿意维护。

> 一句话结论：**Azure F0 免费层是桃阅读「拟人化朗读」唯一同时满足「免费 + 儿童音色 + 字级时间轴 + 浏览器可接入 + 合规」的方案**；edge-tts 作为零成本降级；纯前端 Web Speech 只能做「能出声」的兜底，做不到「拟人化」。

---

## C. 听书模式 UX 基准

### C1. 主流听书 App 播放器交互（取证）

**喜马拉雅（FM）**
- 【一手】倍速：播放界面点设置图标 → 弹窗「倍数播放」，**档位为 0.5 / 0.75 / 1.25 / 1.5 / 1.75 / 2 倍**（默认 1.0 不在弹窗中列出，逐个点击试听）。来源：太平洋IT百科《喜马拉雅FM怎么设置1.5倍速播放》（2022-12-28）https://product.pconline.com.cn/itbk/sjtx/sjrj/1573/15736608.html
- 【一手】定时关闭：播放界面点**时钟图标** → 选择时长 → 播放界面显示**倒计时**。来源：百度经验《喜马拉雅如何设置定时关闭》（2023-05-11，喜马拉雅 3.0 / 华为 P50）https://jingyan.baidu.com/article/46650658d5c770b449e5f8f2.html
- **具体定时时长档位数值未逐项取证**（教程只写「选择适合自己的时长」），标注。行业通行档位为 5/10/15/20/30/45/60 分钟 +「播完本集/本章」，属通用设计，未取得逐项证据。

**凯叔讲故事（儿童听书标杆，前次迭代已取证）**
- 播放器：状态栏悬浮操作、后台播放、**哄睡定时（可预设播完后收听「睡前诗」）**、收藏/分享/下载
- 专辑详情页：试听、**「上次听到这里」进度指引**、批量/多选下载离线
- 首页有**语音搜索**（照顾识字不多的孩子）
- 来源：前次报告 `research/report-cn-apps.md`（基于官网/App Store 描述）；本次补证定时关闭交互：百度经验《凯叔讲故事如何设置定时停止播放》（2019，v5.7.5）——播放界面点时钟图标 → 底部弹窗选择时间 → 显示倒计时 https://jingyan.baidu.com/article/47a29f24eb22ca801423998f.html

**微信读书**
- v10.1.1 专门优化过听书**定时关闭**；另有「阅读统计」小组件（打卡进度 + 阅读时长）。来源：前次报告 `research/report-cn-apps.md`
- 含义：BYOK 书架同步 + 听书定时是已验证的组合。

**番茄畅听**
- 无独立儿童模式，只有「青少年模式」（需时间锁密码）；**反面对照：「看视频解锁听书时长」机制**。来源：前次报告。

**Vooks（国际儿童动画绘本标杆）**
- **Listen 听书模式**：纯音频库 + **sleep timer** + **toothbrush timer**（刷牙计时器——把听书嵌入日常仪式，与桃阅读的「睡前仪式」定位高度一致）
- **同步高亮**：「Read-along text builds literacy naturally」「text-highlighting to help children connect the sounds of words with how they look visually」
- 屏幕哲学：「Gentle animation engages **without overstimulating**」，定位 bedtime / quiet time
- 来源：前次报告 `research/report-intl-products.md`（基于官网/ASO 描述）

**Yoto（纯听书硬件，声音内容哲学）**
- 「Card in. Play begins.」无屏幕菜单；**Yoto Sleep Radio** 睡前电台、声景、睡前引导
- **okay-to-wake 起床提示**；家长 App：内容增删、**safe listening volumes（音量上限）**、闹钟/定时
- **Make Your Own Cards**：任何人录音上传做成卡片（爷爷奶奶讲故事）→ 与「家长自录朗读」功能对标
- 来源：前次报告

### C2. 儿童场景特有的交互

| 场景 | 行业做法 | 证据强度 |
|---|---|---|
| 睡前渐弱 | 凯叔「播完睡前诗」；Yoto Sleep Radio / 睡前引导；Vooks sleep timer；喜马拉雅儿童「夜晚哄睡 + 起床叫早」 | 前次报告（二手） |
| 读到哪自动停 | 定时关闭（时长档位）+ 「播完本集」；凯叔「上次听到这里」断点续播 | 本次 + 前次 |
| 家长远程控制 | 喜马拉雅儿童：使用时长 + 筛选可收听类目；宝宝巴士：禁止观看时段 + 每次时长 + 防蓝光；Yoto：音量上限、内容增删 | 前次报告（二手） |
| 儿童语音搜索 | 凯叔讲故事首页语音搜索（识字不多孩子的替代入口） | 前次报告（二手） |
| 反面模式 | 番茄畅听「看视频解锁听书时长」——激励逻辑与儿童产品冲突，桃阅读红线不做 | 前次报告 |

### C3. 播放器交互要素在桃阅读 PWA 中的落地映射

| 要素 | 落地形态 | 依赖 |
|---|---|---|
| 进度条（可拖拽 + 时间显示） | 纯前端（`<audio>` currentTime/duration） | 需音频文件 → 服务端 TTS |
| 倍速档位（对齐行业 0.5/0.75/1.0/1.25/1.5/1.75/2.0） | 纯前端（`playbackRate`） | 同上；注意 speechSynthesis 的 rate 参数无档位刻度对应 |
| 定时关闭（10/20/30 分钟 + 播完本章） | 纯前端 setTimeout + 队列状态 | 纯前端可做 |
| 睡前渐弱（音量曲线衰减到停） | 纯前端（Web Audio GainNode 包络） | 需音频走 Web Audio → 需服务端 TTS |
| 锁屏控件 / 息屏继续 | Media Session API（iOS 15+）+ Wake Lock（iOS 16.4+） | 纯前端可做，**但必须有真实媒体流**（speechSynthesis 无挂载点） |
| 章节列表 / 播放完成自动衔接 | 纯前端播放队列 | 纯前端可做 |
| 断点续播「上次听到这里」 | 纯前端 localStorage / IndexedDB | 纯前端可做 |

---

## D. 语音搜索 / 语音交互

### D1. SpeechRecognition 浏览器支持现状【一手 caniuse】

- 全局使用率 **87.89%**；规范 **UNOFFICIAL**；**没有任何浏览器达到「完全支持」**（全部为 partial）
- Chrome 25+ partial（历史上以 `webkitSpeechRecognition` 前缀暴露）
- **Edge 79+：不支持**（即便同基于 Chromium）
- Safari 14.1+、**iOS Safari 14.5+：partial**
- Firefox 22+：默认禁用，需手动开启
- 来源：https://caniuse.com/speech-recognition

**Android WebView / 微信内置浏览器**
- 【一手】SO 问题「Android, WebView and SpeechRecognition-API」（40337687）：API 在系统浏览器可用但在 **WebView 实例中不可用**（WebView 用的是设备默认渲染引擎，与系统浏览器版本不一致）；原生壳需通过 `WebChromeClient.onPermissionRequest` 主动 `request.grant()` 才能让 WebView 内的语音识别工作。
- 结论：**微信 Android 内置浏览器（X5/系统 WebView）上语音搜索基本不可用**；iOS 微信（WKWebView）同样受限。语音搜索只能引导用户用 Safari/Chrome 打开 PWA。

### D2. iOS Safari 已知严重 bug（2026 年仍未修复）【一手】

- 【一手】SO 问题 79991991「How to reliably restart Web Speech API SpeechRecognition after `<audio>` playback on iOS Safari?」：
  - 症状：iOS Safari（含独立 PWA）中，同一会话内**播放 `<audio>`（如 TTS 朗读回复）之后，再次调用 `SpeechRecognition.start()` 会挂起**——系统麦克风指示灯有时真的亮着，但**永不触发 `onresult`，也不触发 `onerror`/`onend`**。
  - 根因：**WebKit bug 317741**「Speech recognition microphone source should make sure to keep its audio session active while capturing」，WebKit 工程师 youenn fablet 已在 WICG/speech-api#96 确认，修复已合入上游（315887@main / 316394@main）。
  - 修复状态（截至 2026-08）：**仅进入 Safari Technology Preview 248，稳定版没有**（Safari 26.6 仍有该 bug）。
- **对桃阅读的直接含义**：朗读（音频播放）与语音搜索在同一会话内交替使用是桃阅读的核心交互（听读 → 搜索），**在 iOS 上大概率会复现此挂起 bug**。必须做：识别失败兜底（超时 + 友好提示 + 建议重启浏览器）、或在播放音频前先释放识别器、或把「朗读中」禁用语音搜索按钮。

### D3. 中文识别准确率与儿童容错

- 【未取证】未能取得 iOS Safari / 微信场景下中文识别准确率的权威数据（Stack Overflow 被限流、搜索引擎对长尾查询失效）。
- 儿童语音识别是公认难题的**间接证据**：NIST 评测体系把「**儿童语音（CUBS）评测**」单列为一个评测类别（developer.baidu.com 技术文章提及）；Qwen3-ASR 等新模型在宣传中专门强调「儿童语音、老年语音、非母语者」场景优化（CSDN 文章标题，**效果未逐项验证**）。
- 主流产品对「识别失败 / 无结果」的处理（**产品级取证有限，多为设计常识，已标注**）：
  - 不报技术错误，给友好兜底（「没听清，再说一次」/ 展示热门搜索 / 展示最近阅读）
  - 儿童场景额外容错：童音、发音不准、方言、乱说一气 → 需要在产品层做「模糊匹配书名/作者/角色名」+ 结果数<阈值时走人工列表选择，而不是返回空
  - 凯叔讲故事已验证「语音搜索」对识字不多孩子的价值（前次报告）
- 服务端替代方案（若要做可靠的儿童语音搜索）：
  - 阿里 FunASR / **SenseVoice**（CosyVoice README 中列出：SenseVoice = 超快 ASR + 情感识别 + 音频事件检测；Fun-ASR-Nano = 31 语言、热词、流式）
  - 各家云 ASR（阿里/腾讯/火山）均有中文声学模型优势，但**儿童声学模型需专门评估**，本次未做准确率实测

---

## 对桃阅读的可落地差距清单

> 落地形态分类：**纯前端**（Web/PWA 内可完成）／**需服务端**（桃阅读自部署后端）／**需外部付费服务**（云厂商账号与额度）
> 成本与合规判断中「合规」指：数据出境、内容安全、音色授权、儿童信息保护。

| # | 差距描述 | 证据 | 落地形态 | 成本与合规判断 |
|---|---|---|---|---|
| **G-01** | **朗读音色「机器人感」**：纯前端 Web Speech 在多数浏览器只能拿到系统语音（Chrome 桌面 = Windows 传统语音；iOS = Tingting），达不到用户「拟人化」硬要求 | caniuse/MDN（A1）；iOS Tingting（A2 SO 79796476）；Chrome 桌面用系统语音【未取证标注】 | **需服务端**：服务端合成 Azure 神经语音 / edge-tts 后返回 mp3 | Azure F0 每月 50 万字符**永久免费**（B1），单家庭足够；数据出境需告知。edge-tts 零成本但非官方端点，合规风险高（B2） |
| **G-02** | **长文本朗读截断**：Chrome 下 200-300 字符处断裂，且断裂后整浏览器 TTS 失效需重启 | SO 21947730（63 票，A3.1） | 纯前端（若仍用 Web Speech）：分块 chunk + cancel 解冻 + setTimeout 包裹；**服务端 TTS 路线天然免疫** | 纯前端 workaround 无成本；建议直接走服务端 |
| **G-03** | **iOS 26 崩溃 bug**：含 `<...>` 的中文文本会让 Safari SpeechSynthesis 失效到需重启浏览器 | SO 79796476（A3.3） | **纯前端**：所有进入 `utterance.text` 的内容做字符消毒（`<`/`>` 转全角或剔除），尤其 BYOK 导入的微信读书书名/笔记 | 零成本；属必须做的防御性编码 |
| **G-04** | **字级高亮做不了**：Web Speech `boundary` 事件非 Baseline、中文不触发词级；逐字分块会破坏韵律 | MDN boundary_event「Limited availability」（A4） | **需服务端**：Azure `WordBoundary`（TextOffset/AudioOffset/Duration）或 edge-tts SRT 时间轴 → 前端按时间轴高亮 | Azure 免费层含；edge-tts 免费但风险同 G-01。注意 offset 跨块补偿 quirk（edge-tts 源码）与「事件快于播放」需自行同步（Azure 官方警告） |
| **G-05** | **锁屏控件 / 息屏继续播放缺失**：speechSynthesis 不产生媒体流，Media Session 与 Wake Lock 无挂载点 | caniuse MediaSession 96.2%（iOS 15+）/ wakeLock 94.92%（iOS 16.4+）（A5）；MDN SpeechSynthesis 无音频输出属性（A6） | **需服务端**：TTS 音频 → `<audio>` → `navigator.mediaSession` 元数据 + actionHandler；`wakeLock` 需用户手势请求 | Azure/edge-tts 生成的 mp3 即可驱动；纯前端无解 |
| **G-06** | **睡前渐弱 / 背景音混音做不了**：speechSynthesis 无法接入 Web Audio，无法做音量包络 | MDN SpeechSynthesis 接口无音频流（A6，间接证据，未取得官方直接陈述）；凯叔「播完睡前诗」/ Vooks sleep timer / Yoto Sleep Radio（C2） | **需服务端**：TTS 音频 → Web Audio 图（BGM 节点 + 朗读 GainNode 渐弱包络） | 音频文件生成成本同上；BGM 需自有版权或 CC0 素材 |
| **G-07** | **倍速档位不标准**：行业基准 0.5/0.75/1.0/1.25/1.5/1.75/2.0，Web Speech 的 rate 参数无对应刻度且音质变差 | 太平洋IT百科（喜马拉雅倍速档位，C1） | 纯前端（`playbackRate`，需音频文件）；Web Speech 路线只能近似 | 零成本；服务端 TTS 音频 + playbackRate 音质更好 |
| **G-08** | **定时关闭 / 播完本章 / 断点续播缺失**：睡前场景刚需 | 凯叔/微信读书/喜马拉雅（C1）；番茄畅听反面案例（C2） | **纯前端**：setTimeout 定时 + 播放队列状态机 + IndexedDB 断点 | 零成本；无需任何外部服务 |
| **G-09** | **微信内置浏览器不可用**：Android X5/WebView 上 speechSynthesis 与 SpeechRecognition 均受限 | CSDN 问答 + SO 40337687（A2/D1） | **纯前端**：环境检测 + 引导「用 Safari / Edge / Chrome 打开」；分享落地页提供浏览器跳转 | 零成本；产品文案层面解决 |
| **G-10** | **自动播放被阻止**：未交互页签内编程启动音频被拦截 | MDN Autoplay 指南（A3.5）；移动 Safari 需用户交互（腾讯云 SO 译文） | **纯前端**：首次播放绑定用户手势；`getAutoplayPolicy()` 检测；voices 异步加载轮询 | 零成本；必须做 |
| **G-11** | **语音搜索在 iOS 上会挂起**：播放音频后 SpeechRecognition.start() 挂死（WebKit bug 317741，稳定版未修复） | SO 79991991 + WebKit bug（D2） | **纯前端**：识别超时兜底 + 友好提示；朗读中禁用语音按钮；或播放前先 stop 识别器 | 零成本；体验降级是必然，需在文案上管理预期 |
| **G-12** | **儿童语音搜索准确率无保障**：童音/发音不准/方言/乱说；SpeechRecognition 中文准确率无权威数据 | caniuse partial（D1）；NIST CUBS 儿童评测类别（D3，间接）；准确率【未取证】 | **需服务端**（若要可靠）：FunASR/SenseVoice 等服务端 ASR + 模糊匹配书名/作者；前端做「结果<阈值 → 人工列表选择」兜底 | 自部署 FunASR 零 license 成本（Apache 系，需核实版本 license）；云端 ASR 有免费层但量小。**建议先不做，用「书名列表选择 + 拼音搜索」替代** |
| **G-13** | **儿童音色 / 叙事风格音色未接入**：Azure 有 XiaoshuangNeural(F,Child)、XiaoyouNeural(F,Child)、YunxiNeural Role=Boy、DragonHD story-telling；edge-tts 有 Cartoon 类 Xiaoyi/Yunxia —— 均未使用 | Azure language-support 全表（B1，一手）；edge 端点音色表（A2，一手实测） | **需外部付费服务**（Azure F0 免费层即可）或 edge-tts 降级 | Azure：免费层 50 万字符/月，儿童音色含在内；edge-tts：零成本、非官方端点（家庭自用可，对外产品不可） |
| **G-14** | **多音字 / 生僻字 / 数字正则化处理**：儿童绘本含大量拟声词、数字、生僻字 | CosyVoice「发音修补 + 文本正则化」（B4，一手 README）；Azure SSML phoneme/lexicon（B1 SSML 概述页） | **需服务端**：SSML/拼音标注或依赖 CosyVoice/Azure 前端 | Azure SSML 按字符计费（标点也计）；edge-tts **不支持自定义 SSML**（B2，一手 README） |
| **G-15** | **内容安全与儿童合规**：朗读内容经外部 TTS 传输 | Azure 企业级合规承诺（B1）；ChatTTS 禁商用（B7，一手）；edge-tts 无任何合规承诺（B2） | **需外部付费服务**（Azure）为首选 | Azure 数据处理条款明确；edge-tts 数据发往微软未公开端点、无 SLA，**儿童内容上传存在合规不确定性**；ChatTTS CC BY-NC 排除商用 |

### 未能取证清单（诚实标注）

1. **浏览器内 `getVoices()` 的实际中文音色列表**：本次环境无浏览器，无法实测；Edge 暴露在线神经语音、Chrome 桌面用系统语音均为二手结论。
2. **Azure PAYG 具体美元金额**：定价页以 `$-` 占位动态加载，零售 API 不含 Speech 类目。
3. **Google Cloud TTS 全部信息**：cloud.google.com 在本环境网络不可达。
4. **火山引擎官方文档**：官方文档为 JS 渲染空壳；价格/能力来自二手测评文章。
5. **喜马拉雅/凯叔定时关闭的具体时长档位数值**：教程只写「选择时长」，未列出具体档位。
6. **SpeechSynthesis 无法接入 Web Audio 的官方直接陈述**：仅有接口无音频输出属性的间接证据（Stack Overflow 403、Chromium issue tracker 不可达）。
7. **Kokoro-82M**：raw README 与 GitHub API 均返回 404。
8. **中文 SpeechRecognition 准确率数据**、**儿童语音搜索容错的产品级取证**：未取得，D3 中的容错策略为实现常识 + 少量间接证据。
9. **Azure WordBoundary 对 zh-CN 的官方逐语言说明**：文档指向 language-support 页但该页未逐项说明 boundary 语言差异；实践上中文 WordBoundary 可用，但未一手实测。
10. **edge-tts 实际合成中文音频**：本环境 Python 无 websocket 库、无 pip，无法跑一次真实合成；音色列表与源码时间戳机制为一手证据，合成出声为二手预期。

---

## 附：本次调研新增的原始证据文件

位于 `D:\codesolo\taoread\research\i3\`：
- `az_lang.html`（Azure 全语言/音色表原始 HTML，含 zh-CN 45 个音色与儿童音色标注）
- `az_price.html`（Azure 定价页，含 F0 免费层原文）
- `edge_voices.json`（**一手实测**：Edge 免费端点 322 音色 / 14 中文音色）
- `gh_rany2_edge-tts.md`、`et_communicate.py`、`et_srt_composer.py`、`et_submaker.py`（edge-tts README 与源码，含 boundary 时间戳机制与许可证）
- `gh_FunAudioLLM_CosyVoice.md`、`gh_2noise_ChatTTS.md`、`gh_RVC-Boss_GPT-SoVITS.md`、`gh_OHF-Voice_piper1-gpl.md`（开源 TTS README）
- `xmly_speed.html`（喜马拉雅倍速档位 0.5/0.75/1.25/1.5/1.75/2）
- `xmly_timer2.html`、`kaishu_timer.html`（喜马拉雅/凯叔定时关闭交互）
- `tx_safari.html`（移动 Safari SpeechSynthesis 检查清单）
- `bing.py`（cn.bing.com 检索脚本）、`so.py`（Stack Exchange API 抓取脚本）
