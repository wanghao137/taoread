# 桃阅读 · 第四轮迭代调研：AI 生图做儿童绘本插画 —— 风格、Prompt 工程、合规披露与竞品视觉差距

> 采集时间：2026-09-16/17 ｜ 采集人：调研子代理（iter4，AI 美术方向）
> 本轮命题：书库 8 本公版书的**封面与章节插图**从手写 SVG 矢量场景升级为 AI 生成的绘本风格插画（OpenAI 兼容 images/generations 接口）。回答四个问题：**什么风格、怎么 prompt 才不崩、合规红线在哪、和竞品差多远**。
> 承接 `iter3-report-intl-ux.md`（交互细节）与 `report-cn-apps.md`（国产 App 画像），本轮专注**视觉生产**。
> 覆盖的 8 本书（`apps/server/src/content/packs/index.ts`）：唐诗三百首·星星篇、三字经·人之初、西游记·美猴王出世、刻舟求剑、Alice in Wonderland、Peter Pan、Little Red Riding Hood、The Tale of Peter Rabbit。

## 0. 取证方式、证据强度与诚实性声明

### 0.1 证据分级

| 等级 | 说明 | 本轮覆盖范围 |
|---|---|---|
| **A 级（一手原文）** | 官网可抓取正文、法规条文 verbatim、官方 App Store 描述 | 中国三部 AI 法规全文；Vooks/Epic 官网；Kidillus 服务分类；洪恩/凯叔/喜马拉雅儿童 App Store 描述；US Copyright Office 政策 |
| **B 级（一手实践报告）** | 实操者图文教程 | CSDN 三篇 AI 绘本实战教程（角色一致性三方法、负面提示词原理、风格统一三策略）；什么值得买选书指南；搜狐中国风绘本盘点 |
| **C 级（二手转引）** | 行业报告、媒体转引、平台转载文档 | 中研网绘本产业趋势；腾讯云转载的 gpt-image-1 参数；ESRB 对 ICO AADC 的解读 |
| **D 级（学术研究）** | arXiv 同行评议/预印本 | SCHEMA 结构化 prompt 方法论（2026-02，850 次验证）；角色一致性 6 篇；AI 标签感知 2 篇；手部崩坏修复 2 篇；情绪识别 1 篇 |
| **自采（一手实测）** | 本环境可运行的统计脚本 | 国产儿童 App 配色量化；桃阅读夜空色板 WCAG 对比度；SceneArt 代码级指标 |

### 0.2 本轮主要阻断点（诚实标注）

- **本环境无图像输入能力**（iter3 交付报告 §6 已实测确认）。因此**所有"画风"论证基于文字描述、prompt 关键词、配色统计与学术论文结论，不含任何看图判断**。凡"这张图好/不好"的表述，一律转写为可机器验证的结构断言（颜色数、元素数、构图规则、是否含文字）。
- Google 全域、DuckDuckGo、Brave、Qwant 全部连接超时；Bing 国内版对英文长查询返回大量无关结果（"makes 是什么意思"级别的词义页），**不可用于英文调研**；最终检索通道为 **360 搜索（so.com，可解析真实链接）+ arXiv API + 直接 curl 官网**。
- **OpenAI 全域（openai.com / platform.openai.com / help.openai.com）与 Midjourney 文档站返回 Cloudflare 反爬页**（"Enable JavaScript and cookies to continue"），DALL-E 3 与 Midjourney 的官方 prompt 指南未取得一手原文。gpt-image 参数以腾讯云转载二手文档为准，已标注。
- docs.midjourney.com 的 `character-reference`（--cref）页面在被拦截前只抓到 V8.2 Edit Model 页，**--cref/--cw 官方取值未取证**；相关结论改用 arXiv 学术论文（ConsiStory、Storynizor、CharCom）与 CSDN 实操支撑。
- 2024-2026 流行画风"趋势榜单"类一手文章全部不可达（illustrationx JS 验证、getillustrations 404、skillshare 403、printmag 404）；改用 **Kidillus 商业插画平台的服务分类目录**（在营事实）+ 中研网产业报告 + 搜狐中国风绘本盘点作为替代证据。**画风趋势的 A 级榜单证据缺失，是本轮最大缺口**。
- 各 App **单本封面的逐本画风未取证**：自有拼贴图是整屏 UI 级统计，非封面特写。

---

## 第一部分：儿童绘本插画的主流风格与趋势

### 1.1 行业事实：商业儿童插画平台实际在交付的风格（A 级）

Kidillus 是 2026 年仍在运营的儿童书插画外包平台（首页标注"4.9/5 · 294+ Reviews · 1,000+ Books Published"、"Custom illustrations from just $20 per page"、"an award-winning illustrator with 15+ years of experience"）。它的服务目录是**业界实际在交付的风格清单**，比趋势榜单更接近"市场真的在买什么"。

来源：<https://kidillus.com/>

| 类别 | 原文标签 | 桃阅读适配度 |
|---|---|---|
| 水彩 | `Watercolour` | ★★★★★ 睡前场景首选 |
| 2D 扁平/卡通 | `2D Flat / Cartoon` | ★★★★ 与现有 SVG 审美延续 |
| 3D 渲染 | `3D Render` | ★★ 过重，睡前不宜 |
| 写实 | `Realistic` | ★ 恐怖谷风险最高 |
| 柔和粉彩 | `Soft Pastel` | ★★★★★ 与夜空主题同源 |
| 粗犷图形 | `Bold & Graphic` | ★★ 信息量高但刺激 |
| 线稿/涂色 | `Coloring / Line Art` | — 涂色书用途，不适用 |

**封面专题分类（原文）**：`Animal Covers`、`Adventure`、`Fantasy`、**`Bedtime`**、`Educational`。

> 关键观察：**"Bedtime"（睡前）在商业平台是一个独立封面品类**，与 Adventure/Fantasy 并列。这说明"睡前绘本"有独立的视觉语言，不是"冒险类改暗一点"。桃阅读定位（睡前亲子共读）正落在这一品类。
> 价格基准："$20 per page" 起的人工插画，是判断 AI 生图成本收益的参照系（见 §7.5 成本对比）。

**年龄分段（原文）**：`Ages 0–3`、`Ages 3–5`、`Ages 5-8`、`Ages 8-12`。桃阅读目标 3-8 岁横跨 `Ages 3–5` 与 `Ages 5-8` 两段。

### 1.2 低幼选书的画面标准（B 级）

什么值得买选书指南（面向 0-3 岁语言爆发期）对画面的要求：画风「简洁」「明快」，色彩「明快」且「用色醒目」，画面需「细节丰富」以吸引并维持低幼宝宝注意力；实例《爱工作的交通工具》被描述为「明朗又可爱的画面」，《宝宝最爱的方向盘书》「画面色彩明快、细节丰富」，作者画风「干练、清新，线条硬朗」。
来源：<https://post.smzdm.com/p/ag87oq36/>

同站另一篇（低幼颜色认知绘本）指出，此类绘本「专为 2-5 岁处于颜色敏感期的孩子设计，符合其认知发展规律」——**2-5 岁是色彩敏感期，醒目用色有发展心理学依据**。
来源：<https://post.smzdm.com/p/awm02032/>

**可落地结论**：3-5 岁（我们 ageStage `3-5`）的画面关键词是 **简洁 / 明快 / 醒目 / 线条干净**；不要复杂写实透视、不要灰暗调子。

### 1.3 「图画是信息源」——为什么画风本身就是内容

网易亲子共读文章指出：孩子读绘本需要大人伴读，根本原因不只是「不识字」，而是阅读能力尚在发展；**图画是优质绘本不可或缺的组成部分，与文字共同构成完整信息源**；「耳朵听故事、眼睛看图」是把两种信息整合成新信息的阅读过程。幼小衔接的分界：此后「从多读图变为多读字，从亲子共读升级到自主阅读」。
来源：<https://www.163.com/dy/article/J7D7TK7M051282RU.html>

**可落地结论**：桃阅读产品形态正是「TTS 听 + 眼睛看图」，**插画不是装饰而是叙事通道**。每张章节图必须能独立讲清这一章的核心动作（孩子听不懂字时靠图补全信息），所以构图要直白、主体要大、信息要单一。

### 1.4 国学/传统文化类适合的中国风介质（B 级）

搜狐对中国风原创绘本的盘点给出可用的传统美术介质清单，且明确标注适合「2-8 岁」：

| 介质 | 绘本实例 | 视觉特征（原文表述） |
|---|---|---|
| 水墨写意 | 《我有一盏小灯笼》《一粒金子会发光》 | 「自然更有韵味」「空灵写意」 |
| 彩墨神话 | 《济公的传说之古井运木》 | 「画风古意盎然，人物线条拙稚纯朴」 |
| 泥塑 | 《种梨》 | 「跳脱出了传统的平面绘画」，有限篇幅呈现更多中国视觉元素 |
| 几何剪贴（丙烯） | 《龙牙颗颗钉满天》 | 不规则几何体拼贴，「独特的视觉享受」 |
| 水彩 + 钢笔机理 | 《牙齿，牙齿，扔屋顶》 | 水彩为老巷子染灰、钢笔加机理，「加强了斑驳感」 |
| 蓝调国画（仿古宣纸） | 《夜游》 | 图案仿古宣纸，渲染夜幕透视，「意境深远」 |

来源：<https://www.sohu.com/a/143494500_660922>（另见同类盘点 <https://www.sohu.com/a/437222229_661307>）

**对本项目的映射建议**：
- **唐诗**：水墨写意 / 蓝调国画，与「星星篇」夜空主题和 `poetry-moon` 场景键天然吻合；《夜游》的「蓝调 + 仿古宣纸」几乎就是唐诗封面的现成方向。
- **三字经**：蒙学适合「拙稚纯朴」的彩墨/泥塑感，比水墨更暖更萌，匹配 `primer-scroll` 的暖橘渐变。
- **西游记**：彩墨神话 + 泥塑的厚重感与民间趣味，避开「写实玄幻」成人化方向。
- **刻舟求剑**：水彩 + 钢笔机理（江河、小舟、剑）。
- **四本英文读物**：比得兔的经典水彩植物园风格、小红帽的欧美森林水彩、彼得潘的星光蓝夜空、爱丽丝的糖果水彩——全部落在「水彩绘本」最安全赛道内。

### 1.5 产业趋势（C 级）

来源：中研网《2025年儿童绘本产业现状与发展趋势分析》<https://m.chinairn.com/hyzx/20241211/140923418.shtml>

与视觉生产相关的两条：
1. **产品多元化和细分化**："科普类、情感类、艺术类等多种类型的绘本也将逐渐受到欢迎"，更注重趣味性与互动性。
2. **数字化技术推动转型升级**："电子绘本和在线绘本阅读平台等新型阅读方式受到越来越多家长的关注"；VR/AR 逐渐被引入。

> 诚实标注：该文**未专门探讨插画风格**，也未提及 AI 对插画的影响。它只证明"电子绘本阅读平台"是被认可的方向，**不构成画风趋势证据**。

### 1.6 学术证据：绘本插画承载可识别的情绪（D 级）

来源：arXiv 2506.18201《Deciphering Emotions in Children Storybooks》<https://arxiv.org/abs/2506.18201>

该研究让 GPT-4o 与 Gemini 1.5 Pro 识别 7 本阿拉伯语儿童故事书的 75 张插画情绪，与人类基于 Plutchik 情绪框架的标注对比。

**可执行结论**：
- **绘本插画承载可被识别的情绪**——AI 生图时"情绪"是必须写进 prompt 的一等参数，不是附属隐含项。S2ED（§3.3）明确把 **affective cues** 作为多帧一致性的维度之一，与 character identity、layout 并列。
- 反面推论：**prompt 不指定情绪，模型倾向给出"中性空洞"表情**，这正是 AI 生图被认为"没有灵魂"的主因之一。

### 1.7 可复用的英文 Prompt 风格关键词

**水彩系（睡前首选）**
```
soft watercolor illustration, gentle washes, wet-on-wet blending,
muted bedtime palette, low-saturation blues and warm peach,
soft edges, no harsh outlines, visible paper texture,
children's picture book style, storybook illustration
```

**柔和粉彩系（与桃阅读夜空主题同源）**
```
soft pastel illustration, chalk and gouache texture,
dreamy hazy atmosphere, moonlit night sky, warm glow,
peach and indigo palette, gentle gradients, calming mood,
children's book illustration, quiet bedtime scene
```

**2D 扁平几何系（与现有 SVG 审美延续）**
```
flat vector illustration, 2D cartoon style, simple geometric shapes,
bold clean shapes, limited color palette, no outlines,
modern children's book style, friendly and cheerful,
flat design, soft curves, rounded forms
```

**剪纸/拼贴风（信息量高，适合章节题图）**
```
cut-paper collage illustration, layered paper shapes,
scissor-cut edges, textured paper, handcrafted feel,
bold silhouettes, decorative patterns, picture book collage
```

**中国风水墨（唐诗/三字经专用）**
```
traditional Chinese ink wash painting (shui-mo), childlike and gentle,
on textured rice paper, xuan paper texture, empty poetic space,
soft indigo and warm moon-yellow accents, poetic night mood
```

**选择建议**：桃阅读夜空主题（`night.900 #0E1A38`）与**柔和粉彩/水彩**天然同源；2D 扁平是现有 SVG 的直接升级路径，过渡成本最低。**不建议 3D Render 与 Realistic**：前者过重，后者恐怖谷风险最高（§5.5）。

---

## 第二部分：提示词工程与 AI 生图最佳实践

### 2.1 核心结构：SCHEMA 三层渐进框架（D 级，2026-02）

来源：arXiv 2602.18903《SCHEMA for Gemini 3 Pro Image: A Structured Methodology for Controlled AI Image Generation》<https://arxiv.org/html/2602.18903v1>

这是本轮最有价值的一手方法论。作者 Luca Cazzaniga 基于 **850 次已验证 API 调用、约 4800 张生成图**（覆盖房地产摄影、商业产品、编辑内容、**storyboards**、商业广告、信息设计），提出 SCHEMA（Structured Components for Harmonized Engineered Modular Architecture）。

**三层结构（原文 Table 2）**：

| 参数 | BASE（探索） | MEDIO（方向） | AVANZATO（交付） |
|---|---|---|---|
| 从业者控制 | ~5% | ~85% | 95–98% |
| AI 创造性 | ~95% | ~15% | ≤5% |
| 时间投入 | < 1 分钟 | ~5 分钟 | > 15 分钟 |
| Prompt 结构 | 自由自然语言 | 7 个结构化标签 | 7 核心 + 5 可选标签 |
| 用途 | 探索、发现偏见 | 专业草稿 | 最终交付、**批量一致性** |

> BASE 层不是用来产出可用图的，而是 "diagnostic tool"——"forces the model to reveal its default assumptions, latent biases regarding lighting, color temperature, composition, and demographic representation"。**做儿童产品时这一步尤其必要**：先跑 BASE 看模型对"中国公版故事 + 儿童"的默认偏见（肤色、服饰、场景刻板）。

**MEDIO 层 7 标签结构（论文 §7.1 完整示例，原文）**：

```
Style: Professional architectural interior photography, high-end real estate
  magazine quality, photorealistic.
Composition: Wide-angle frontal view at eye level, symmetrical framing,
  16–24mm equivalent focal length.
Subject: Modern living room with light oak flooring, white walls, large sofa
  in warm grey fabric, coffee table.
Lighting: Natural soft daylight from large window, warm 3000K recessed ceiling
  lights, 70:30 natural to artificial ratio.
Mandatory: Verticals perfectly straight, realistic materials, no perspective
  distortion, professional photography standards.
Prohibitions: No converging verticals, no oversaturated colors, no fake HDR,
  no unrealistic furniture.
Output: Aspect ratio 4:3, resolution 4K, horizontal format.
```

论文对每个标签的方法论注解（Table 7）：Style "Defines visual register and expected quality standard"；Composition "Explicit focal length and viewpoint reduce compositional ambiguity"；Subject "Specific materials and colors, not generic descriptors"。

**AVANZATO 关键原则**："Subjective evaluative terms are categorically replaced by numeric specifications: HEX codes for chromatic palette, Kelvin scale values for light temperature, contrast ratios, and photographic lens focal length equivalents."

—— 到了交付层，**"温暖柔和"要被替换成 HEX 色值与色温数值**。这一条可直接落到桃阅读设计系统上（已有完整 token：`night.900 #0E1A38`、`peach.400 #FFB3A0`、`moon.400 #FFD97A`）。

**Constraint-Over-Elaboration Principle（约束优于 elaboration，§6.1.1）**：

> "on this model, constraint-based specification outperforms descriptive elaboration as the primary control mechanism. This finding **inverts the conventional prompt engineering assumption that more descriptive detail always produces better results**."

论文把 Mandatory/Prohibitions 类比为 LLM 管线里的 **JSON Schema / Output Contracts**："the SCHEMA operator uses Mandatory and Prohibitions as a visual JSON to constrain the graphic model within an imposed semantic perimeter."

**可执行结论**：prompt 不是越长越好。**Mandatory + Prohibitions 两个约束标签，比堆砌华丽描述词更能控制结果**。这也解释了为什么负面提示词（§2.3）在儿童内容上如此关键。

### 2.2 通用提示词技巧（B 级）

CSDN 实践文总结的可复用技巧：
1. 使用**明确的风格描述词**（具象风格名），而不是只描述内容。
2. **指定艺术家或艺术运动**作为风格锚点（如「毕加索风格」）。
3. **细化提示词、增加限定条件**：把「一只猫」改成「一只橘色短毛猫坐在窗台上，阳光照射」。
4. 多轮对话中**保持风格描述一致**，可用「延续之前风格」这类指令。
5. **迭代细化**：先快速生成小图确定构图，再细化提示词，最后生成高分辨率终版。
6. 常见缺陷：手部/面部等精细部位变形、同一组提示词结果质量不稳、复杂场景风格易漂移。
来源：<https://blog.csdn.net/2600_94959984/article/details/157280599>

### 2.3 负面提示词（negative prompt）原理与写法（B 级）

CSDN 原理向文章给出：
- 负面提示两大职能：**不良特征抑制**（阻止低质量内容）与**风格稳定性维持**（避免风格漂移，如「写实照片中的卡通元素」混杂）。
- 机制：经 CLIP 文本编码器映射到语义向量，在扩散过程中对匹配负面语义的潜在表示施加负权重。
- 效果数据（原文自述）：合理使用可使图像质量评分（CLIP Score）提升 15-20%，不良内容生成概率降至 1/8。
- **典型踩坑——语义冲突**：正向写「a smiling cartoon character」时负面写「happy」会冲突；应改用更具体的负面描述如「oversaturated colors」。
- 长度建议：单个负面提示不超过 30 token。
- 示例词（英文）：`blurry, distorted, low quality` / `deformed` / `oversaturated colors` / `offensive, culturally insensitive, controversial`。
来源：<https://blog.csdn.net/2600_94959984/article/details/157302825>

### 2.4 gpt-image 系列的参数事实（C 级，转载二手）

腾讯云开发者社区对 gpt-image-1 API 的整理（**非 OpenAI 一手文档**）：
- `size`：`1024x1024`（默认/最快）、`1024x1536`（竖）、`1536x1024`（横）、`auto`（模型自选）。
- `quality`：`low` / `medium` / `high` / `auto`。
- 风格适应：可通过提示词生成油画、水彩、像素艺术、3D 渲染、极简线条画等。
- **文字渲染**：相较前代是重大突破，能渲染「清晰易读且符合上下文语境的文本」，但「极端复杂排版下仍有挑战」。
- **编辑能力**：`/images/edits` 支持上传**多张参考图**组合生成新图，支持蒙版（mask）局部修复；支持透明背景（仅 PNG/WebP）。
- 成本：文本输入 $5/百万 token、图像输出 $40/百万 token；1024x1024 约 low $0.02 / medium $0.07 / high $0.19 每张。
来源：<https://cloud.tencent.com/developer/article/2516198>

**两条关键外推（标注为外推，未获一手证据）**：
1. 上述参数清单**没有 `negative_prompt` 字段**，OpenAI 官方 images 接口历来也没有。因此提示词规范必须**把回避词写进正向提示词**（如 `no text, no words, no letters in the image`），而不是依赖独立的 negative 字段；若供应商额外支持 negative 字段，再把 §2.3 词表迁移过去。
2. 多参考图编辑端点（`/images/edits`）是 OpenAI 兼容体系里**做角色一致性最正统的手段**——比第三方 hack 更应作为首选。

### 2.5 应当使用的措辞 vs 应当回避的措辞

**推荐措辞**：
- 风格锚点前置：`children's picture book illustration, soft watercolor and colored pencil` / `traditional Chinese ink wash painting (shui-mo), childlike and gentle`。
- 介质限定：`on textured rice paper` / `gouache on paper` / `flat vector with paper cut texture`。
- 情绪与氛围：`gentle, warm, dreamy, cozy bedtime mood, soft diffused light`。
- 光照：`soft morning light` / `moonlit indigo night sky with warm stars`。
- 安全正向约束：`rounded shapes, simple and cute characters, friendly expressions, child-appropriate`。
- 构图指令：`single main character centered, large in frame, minimal background, generous empty space at top for title text`。

**应回避的措辞**：
- `photorealistic / realistic / photo / 8k / hyper-detailed / cinematic lighting`——诱导写实化，触发恐怖谷，与「简洁明快」的低幼要求冲突。
- `masterpiece, award-winning, trending on artstation`——与儿童内容无关，引入成人化审美。
- 复杂手部动作特写（`holding`, `fingers`, `hands close-up`）——手部是已知最高频失败部位。
- 让模型在画面里写中文/英文标题——中文文字渲染是已知弱项（§5.1），标题应由前端文字层叠加。
- 风格混杂词同时出现（如同时 `watercolor` 和 `3D render`）——引发风格漂移。
- 情绪负面词（`scary`, `dark`, `horror`, `angry`）——与监管要求冲突（§5.3）。

### 2.6 中英 prompt 哪种效果好

**本轮未取得直接对比中英 prompt 效果的一手实验**（可用通道下未命中对照研究）。以下为基于间接证据的工程判断：

- **训练语料分布**：主流图像模型训练语料以英文为主，**英文风格词（watercolor / gouache / soft pastel）在模型中对应更稳定**。中文风格词（「水墨」「工笔」）在公版书场景有意象优势，但稳定性差。
- **SCHEMA 的全部标签与示例都是英文**（§2.1），且论文明确要求 "Specific materials and colors, not generic descriptors"——英文颜色/材质/构图词库更成熟。
- **§3.1 中文实操教程的实际 prompt 全部是英文**（"Rush hour, crowded subway car, art by Raymond Briggs"），即使文章是中文写的。这是事实性证据：**中文实操社区也用英文写 prompt**。

**建议**：**场景描述可用中文写（先理清要画什么），风格锁定一律英文**。桃阅读 §7 的模板采用 `[中文内容描述] + [English style suffix]` 结构。对公版国学内容，用英文写场景（"ancient Chinese poet by a moonlit window"）而非直译诗名。

### 2.7 Aspect Ratio 与构图

**项目侧画幅事实（代码级）**：
- 封面容器：`aspect-[3 / 4]`（`BookShelf.tsx:243`；`BookDetail.tsx:106`）
- 章节题图与文内插图：`aspectRatio: '16 / 9'`（`ReaderScreen.tsx:477` 及 `:497`）
- 现有 SVG 场景件 `viewBox="0 0 100 100"` + `preserveAspectRatio="xMidYMid slice"`（`SceneArt.tsx:88-89`），即**方形画布被容器裁切**。

**与 gpt-image 出图尺寸的匹配（关键落地细节）**：gpt-image 竖版只有 `1024x1536`（2:3），横版只有 `1536x1024`（3:2），没有 3:4 与 16:9 原生档位：

| 用途 | 容器比例 | 建议请求尺寸 | 后续处理 |
|---|---|---|---|
| 封面 | 3:4（0.75） | `1024x1536`（0.667） | CSS `object-cover` 裁掉上下各约 5.5%（共约 11% 高度）；提示词必须要求**主体居中、上下留白** |
| 章节题图 | 16:9（1.78） | `1536x1024`（1.5） | `object-cover` 裁掉上下各约 8%（共约 16% 高度） |

若供应商支持自定义尺寸，直接请求 `1152x1536`（3:4）与 `1536x864`（16:9）可零裁切；**接入时应先探测 `size` 是否接受任意值**，这是最省提示词成本的优化点。
（尺寸取值来源：<https://cloud.tencent.com/developer/article/2516198>；SCHEMA §7.1 的 Output 标签也要求把 aspect ratio 显式写进 prompt）

**给标题留出叠加空间的构图规范**：封面标题由前端文字层叠加，因此提示词需显式要求留白：
- 封面：`main character in lower two-thirds, large empty warm sky area in the top third for title overlay, no text in image`。
- 章节图（16:9）：`character on the left third, open landscape on the right two-thirds for caption overlay`。
- 因 `object-cover` 会再裁一次，留白区要**比目标留白大约 20%** 才安全。

---

## 第三部分：核心难点 —— 同一本书内的角色一致性

### 3.1 学术证据：这是结构性问题，不是调参问题

| 论文 | 核心机制 | 对桃阅读的可执行结论 |
|---|---|---|
| **ConsiStory**（arXiv 2402.03286）<https://arxiv.org/abs/2402.03286> | Training-free，共享自注意力让同一 subject 跨 prompt 一致；明确指出已有方法 "struggle to align generated images with text prompts and face difficulties in portraying multiple subjects" | 一致性与文本遵循**是 trade-off**；多角色场景一致性更难 |
| **Storynizor**（arXiv 2409.19624）<https://arxiv.org/abs/2409.19624> | ID-Synchronizer（跨帧自注意力 + mask 感知损失）+ ID-Injector，实现 "strong inter-frame character consistency, effective foreground-background separation, and diverse pose variation" | 前景/背景分离可工程化；姿态多样性可与一致性兼得 |
| **CharCom**（arXiv 2510.10135）<https://arxiv.org/abs/2510.10135> | 可组合 LoRA 适配器，per-character 定制无需重训底模；"Remains robust in crowded scenes" | 若长期做，**每角色一个 LoRA** 是最稳架构；桃阅读 8 本书主角固定，投入产出比高 |
| **Storybooth**（arXiv 2504.05800）<https://arxiv.org/abs/2504.05800> | Training-free 多主体一致性；发现已有跨帧自注意力方法在**多角色**时因 "self-attention-leakage" 失效 | 多角色（如西游记师徒）场景需专门处理，不能照搬单角色方案 |
| **ReDiStory**（arXiv 2602.01303）<https://arxiv.org/abs/2602.01303> | 推理期把文本嵌入分解为 identity-related 与 frame-specific，抑制跨帧共享方向 | prompt 层面**把"角色固定描述"与"场景描述"分开写**，模型能自己解耦 |
| **FLUX.1 Kontext**（arXiv 2506.15742）<https://arxiv.org/abs/2506.15742> | 上下文内生成与编辑统一；对比 "current editing models that exhibit degradation in character consistency and stability across multiple turns" | **迭代编辑会累积退化**；编辑链路要尽量短 |

### 3.2 最重要的结构性发现：Iterative Generative Drift（迭代生成漂移）

来源：SCHEMA 论文 §6.2 <https://arxiv.org/html/2602.18903v1>

> "When an output ... is used as a reference for a new generation, image quality degrades progressively. The model does not copy the reference—it reinterprets it—and each reinterpretation introduces micro-errors that accumulate across iterations."

三条结构性原因（论文原文）：(1) 模型是**再解释而非复制**，每次引入微误差；(2) 接近 7MB 的重图会被内部压缩，先损失质量再再解释；(3) **误差是乘性累积而非线性**——退化会加速。论文给的忠告："Always save before iterating"。

**这条直接推翻一个常见错误做法**：把上一张生成图当参考图，一路迭代下去做整本书。正确做法是**每张图都从同一份"源描述 + 源参考"生成**，而不是链式引用。

另一条相关发现（SCHEMA §6.3，初步观察，论文自述未系统验证）：**低对比度参考图**（扁平、低饱和、小动态范围）被解释得更忠实、输出更可控；高对比度参考图（过曝/欠曝区域、高饱和、强明暗差）输出更不可预测，因为模型会进一步夸张 tonal differences。**实践建议：上传参考图前先降对比度。**

### 3.3 工程化路径：StoryState / S2ED（D 级）

两篇 2026 年论文给出"如何把一致性落地为系统"的答案，且都明确 **training-free**（无需训练，可直接用 API 实现）——与桃阅读"接 OpenAI 兼容 images/generations 接口"的现状直接吻合。

**StoryState**（arXiv 2602.01305）<https://arxiv.org/abs/2602.01305>

指出问题："the underlying story state, such as characters, world settings, and page-level objects, remains implicit, making edits coarse-grained and often breaking visual consistency."

方案：把每个故事表示为一个**结构化对象**：
- **character sheet**（角色表）
- **global settings**（全局设定）
- **per-page scene constraints**（逐页场景约束）

> 这几乎就是桃阅读内容包应该补的字段：**每本书一份 character sheet，存在内容包里，所有章节插图的 prompt 都从它派生**。

**S2ED**（arXiv 2605.22448）<https://arxiv.org/abs/2605.22448>

"Multi-frame story illustration requires long-horizon coherence ... including narrative decomposition and **persistent character identity, layout, and affect across frames**."

方案：三个 agent 协作——(1) 分段叙事 (2) **ground canonical character attributes**（锚定正典角色属性）(3) 丰富空间与情感线索；实现 "interpretable prompt-carried state propagation and local edits to repair drift without retraining the generator"。

**两个关键词**：`canonical character attributes`（正典角色属性）与 `prompt-carried state propagation`（由 prompt 携带的状态传递）。**翻译成桃阅读的做法：角色的固定描述词串（正典）写进数据层，每张图 prompt 都带上，而不是每次重写。**

### 3.4 中文实操教程的三种方法（B 级）

来源：CSDN《AI绘画儿童绘本制作中如何保持角色一致?分享三个方法!》<https://blog.csdn.net/ice_99/article/details/140174750>

| 方法 | 机制 | 适用性 |
|---|---|---|
| **GPT 的 gen_id** | 生成满意角色图后，问 GPT 要该图 `gen_id`，后续 prompt 带上这串 ID | OpenAI 兼容接口**可能不支持**（ChatGPT 对话内机制），需实测 |
| **多宫格生成后裁剪放大** | 一次 prompt 生成 3×4 宽幅多格图，再裁切放大 | **单次生成内一致性最好**，代价是构图受限、需后处理 |
| **MJ 垫图链接** | 生成 character sheet → 裁切 → 逐张上传复制链接 → 后续 prompt 全部带链接 | 思路正确（参考图注入），依赖 MJ 生态 |

来源：CSDN《用 AI 生成绘本，含大量 prompt》<https://blog.csdn.net/2401_85955060/article/details/140104303>

三条风格/叙事连贯策略，直接可用：
1. **画风统一**："固定一个插画师的风格，可以输入插画师的名字，或者垫图"（示例 prompt 结尾固定 `art by Raymond Briggs`）
2. **角色连贯**："对核心角色保持相同描述"
3. **故事一致**："背景保留"（示例中每张都带 `subway car`）

> 该教程示例内容是"地铁早高峰争吵"，**不是儿童内容**，prompt 不能直接复用；但三条结构性策略与 §3.3 学术结论一致。

**给桃阅读的建议（按可靠性排序）**：
1. **首选**：`/images/edits` 多参考图端点（§2.4 已确认 gpt-image-1 支持）——先定稿 8 张角色设定表，之后每张章节图都带角色参考图 + 风格参考图。API 层能力，最稳。
2. **次选**：多宫格法生成角色设定表（方法 2），一次出全套角度，成本低。
3. **提示词层兜底**：每张图带固定角色外观描述串（§7 模板 #10 的 Character Bible）+ 固定风格锚点串。
4. 章节图按书成批生成（同书同模板、同参考图），可在书的 3-6 章内拿到肉眼一致的主角。

---

## 第四部分：合规与披露 —— 儿童 App 用 AI 插画的法规红线

### 4.1 中国法规：三条线，全部命中（A 级一手全文）

桃阅读作为**中国区儿童 App + 使用 AI 生成图片**，同时落入三部法规管辖。三部均取得全文原文。

#### (1)《生成式人工智能服务管理暂行办法》（2023-08-15 施行）

来源：<https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm>

| 条款 | 原文 | 影响 |
|---|---|---|
| **第四条（一）** | 不得生成"暴力、淫秽色情，以及虚假有害信息等法律、行政法规禁止的内容" | 内容安全底线 |
| **第四条（五）** | "基于服务类型特点，采取有效措施，**提升生成式人工智能服务的透明度**，提高生成内容的准确性和可靠性" | **透明度是明文要求**，不只是最佳实践 |
| **第十条** | "提供者应当明确并公开其服务的适用人群、场合、用途……采取有效措施**防范未成年人用户过度依赖或者沉迷**生成式人工智能服务" | **直接命中**：桃阅读就是面向未成年人的生成式 AI 服务提供者 |
| **第十一条** | 对输入信息和使用记录的保护义务，不得收集非必要个人信息 | 若做"孩子自己生成图"功能则触发；**当前不做即为安全** |
| **第十二条** | "提供者应当按照《互联网信息服务深度合成管理规定》对**图片、视频等生成内容进行标识**" | **图片标识的直接依据** |

#### (2)《互联网信息服务深度合成管理规定》（2023-01-10 施行）

来源（工信部转载全文）：<https://www.miit.gov.cn/xwdt/gxdt/sjdt/art/2022/art_466dfb964d6646f38234ca8aadc056b1.html>

| 条款 | 原文 | 解读 |
|---|---|---|
| **第十六条** | "深度合成服务提供者对使用其服务生成或者编辑的信息内容，应当采取技术措施添加**不影响用户使用的标识**，并依照法律、行政法规和国家有关规定保存日志信息" | **隐式标识**：元数据/水印层面，不影响观看 |
| **第十七条（三）** | "人脸生成、人脸替换、人脸操控、姿态操控等**人物图像**、视频生成或者显著改变个人身份特征的编辑服务"，"可能导致公众混淆或者误认的，应当在生成或者编辑的信息内容的合理位置、区域进行**显著标识**" | **关键**：显著标识触发条件是"人物图像"且"可能混淆误认"。绘本插画是**虚构角色**（猴子、兔子、桃子精灵），不是真实人物，**一般不触发显著标识** |
| **第十七条（五）** | "其他具有生成或者显著改变信息内容功能的服务" | 兜底条款，风险存在 |
| **第十八条** | "任何组织和个人不得采用技术手段**删除、篡改、隐匿**本规定第十六条和第十七条规定的深度合成标识" | 标识一旦加上就不能去掉 |

#### (3)《人工智能生成合成内容标识办法》（2025-09-01 施行，最新且最直接）

来源（山西网信网转载全文，国信办通字〔2025〕2号）：<http://www.casx.gov.cn/content/2025-03/17/content_13404699.htm>

这是本轮**最重要的合规发现**——它今天正在生效，且专门讲"标识"。

| 条款 | 原文 | 对桃阅读的要求 |
|---|---|---|
| **第三条** | 显式标识 = "以文字、声音、图形等方式呈现并可以被用户明显感知到的标识"；隐式标识 = "采取技术措施在生成合成内容文件数据中添加的，不易被用户明显感知到的标识" | 两层标识的定义 |
| **第四条（三）** | "在**图片的适当位置添加显著的提示标识**" | 若触发第四条，图片上要加可见标识 |
| **第五条** | "在生成合成内容的**文件元数据中添加隐式标识**，隐式标识包含生成合成内容属性信息、服务提供者名称或者编码、内容编号等制作要素信息。**鼓励**服务提供者在生成合成内容中添加**数字水印**等形式的隐式标识" | **元数据隐式标识是义务；数字水印是鼓励项** |
| **第六条** | 传播平台核验元数据、添加显著提示的三档处置；"提供必要的标识功能，并提醒用户主动声明" | 针对传播平台，App 内若不传播则不直接适用 |
| **第七条** | "互联网应用程序分发平台在应用程序上架或者上线审核时，应当要求互联网应用程序服务提供者**说明是否提供人工智能生成合成服务**。……应当**核验其生成合成内容标识相关材料**" | **最直接的落地影响**：App 上架应用商店时会被问"是否提供 AI 生成合成服务"，且要交标识材料 |
| **第八条** | "应当在**用户服务协议中明确说明**生成合成内容标识的方法、样式等规范内容，并**提示用户仔细阅读**" | **用户协议必须写明标识方案** |
| **第九条** | 用户申请无显式标识内容时，可经用户协议明确义务后提供，但**日志留存不少于六个月** | 若家长想导出无标识图，走这条 |
| **第十条** | 用户发布生成合成内容"应当主动声明并使用服务提供者提供的标识功能进行标识"；不得删除/篡改/伪造/隐匿标识 | 孩子端**不提供发布功能**即不触发 |
| **第十四条** | 本办法自**2025年9月1日**起施行 | 已生效 |

#### 三个必须做的动作（本节结论）

1. **元数据隐式标识（义务）**：AI 生成的每张图，写入元数据（Content Credentials / C2PA 或自定字段）含"AI 生成"属性、服务提供者、内容编号。
2. **用户协议明示（义务）**：用户服务协议写明"本书插画由 AI 生成并已按《人工智能生成合成内容标识办法》添加标识"。
3. **应用商店上架材料（义务）**：按第七条准备标识相关材料，回答"是否提供 AI 生成合成服务：是"。
4. **显著标识（视情形）**：桃阅读的虚构角色绘本**不构成"人物图像"**，按第十七条（三）不强制显著标识；但**第四条（六）"其他生成合成服务场景"存在解释空间**。**稳妥做法：在家长端/关于页给一个可见的"AI 绘制"说明（不破坏孩子端画面）**，既满足透明度（办法第四条五），又不给孩子端加视觉噪音。

### 4.2 COPPA（美国）——管数据不管内容（A 级）

来源：<https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy>

FTC 官方页面明确：COPPA "gives parents control over what information websites can collect from their kids"，COPPA Rule "puts additional protections in place"。

**关键结论**：该页**全文未提及 AI、AI-generated content、automated content**（唯一一处 AI 是侧栏一份无关的版权评论文件《Comment from the Federal Trade Commission on Artificial Intelligence and Copyright》）。

> **COPPA 管的是"收集儿童个人信息"，不管"内容是不是 AI 生的"**。桃阅读若不收集儿童个人信息，COPPA 不因 AI 插画而触发额外义务。但它要求**面向 13 岁以下儿童的隐私政策与家长通知**——这与"是否披露 AI"是两件事，不可混淆。

### 4.3 英国 AADC：透明度标准的可执行条文（A/C 级）

AADC（Age Appropriate Design Code）15 条标准（ICO 官网原文）：<https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/>

1. Best interests of the child  2. Data protection impact assessments  3. Age appropriate application  4. **Transparency**  5. Detrimental use of data  6. Policies and community standards  7. Default settings  8. Data minimisation  9. Data sharing  10. Geolocation  11. Parental controls  12. Profiling  13. Nudge techniques  14. Connected toys and devices  15. Online tools

**第 4 条 Transparency 的可执行要求**（ESRB 转引 ICO 原文）：<https://www.esrb.org/privacy-certified-blog/the-icos-age-appropriate-design-code-transparency-and-fairness/>
- 隐私披露须 "concise, prominent and in clear language suited to the age of the child"
- 强烈建议使用 just-in-time "bite-size" 通知
- **对 6-9 岁用户**："cartoons, videos or audio materials to be provided to sit alongside disclosures meant for parents"

> 这条有直接视觉指导意义：**"给孩子的说明要用卡通/视频/音频形式"**——恰好可用桃阅读自己的 SVG 吉祥物（TaoMascot）做一段"我们的画是电脑帮着画的"童趣说明，而不是枯燥文字。既满足 AADC transparency，又不破坏孩子端体验。

### 4.4 AI 生成图的版权归属（A 级，US Copyright Office）

来源：<https://www.copyright.gov/ai/>

**核心结论：纯 AI 生成内容不可获得版权；人类创作部分可以。**

US Copyright Office 立场与判例（官网原文）：
- 要求 **human authorship**（人类作者身份）为前提
- 2023-03-16《Copyright Registration Guidance for Works Containing AI-Generated Materials》：**只有人类创作的部分可受保护**
- 具体登记决定：
  - **Théâtre D'opéra Spatial**（2023-09-05）：维持拒绝登记该 AI 生成内容
  - **SURYAST**（2023-12-11）：维持拒绝
  - **A Recent Entrance to Paradise**（2022-02-14）：完全 AI 生成的作品不可版权
  - **Zarya of the Dawn**（2023-02-21）：AI 生成的图像本身不可登记，但**人类对图像的选择、协调与编排**可以

**对桃阅读的影响**：
- AI 生成的单张插图**本身不受版权保护**——任何人可合法复制。这对竞品抄袭是敞开的门。
- **但人类创作部分可保护**：8 本书封面的**选择、编排、顺序、组合**，以及配套中文文字、设计系统、交互，是人类创作，受保护。
- **公版书 + AI 插画的组合反而清晰**：文本本来就公版（Gutenberg），插图本来就不可版权，**没有任何第三方版权风险**——与桃阅读"只用公版或自创内容"的红线完全一致，是优势而非劣势。

**公众认知佐证（D 级）**：arXiv 2407.10546《Public Opinions About Copyright for AI-Generated Art》（N=432）<https://arxiv.org/abs/2407.10546> 发现：参与者认为创造力与努力（**但不是技能 skills**）是创作 AI 艺术所需的。**公众倾向于认为"用心做的 AI 图也有创造性"**，对披露的抵触低于预期。

### 4.5 披露有用吗：AI 标签的实证效果（D 级）

两条用户研究，结论方向一致且都有反直觉之处：

**研究一**（arXiv 2510.19024，N=105，组内实验）<https://arxiv.org/abs/2510.19024>
- 发现：**增加标签细节提升用户对"透明度"的感知，但不影响用户参与度**（"increasing label detail enhances user perceptions of label transparency but does not affect user engagement"）
- 内容风险（content stakes）显著影响参与度与信任：**低风险内容的参与度与信任更高**

> 对桃阅读：**睡前绘本插画是"低风险内容"**（不是新闻、医疗、金融），所以加 AI 标签**不会降低使用参与度**。担忧"披露会赶走用户"在这类内容上没有实证支持。

**研究二**（arXiv 2505.22845，5 个焦点组 + 实验）<https://arxiv.org/abs/2505.22845>
- 背景：立法者正要求披露 AI 生成内容，但 "it is unclear if labels reduce the risk of users falling for AI-generated misinformation"
- 发现：参与者对落地实现有顾虑，但**认为标签有助于识别 AI 生成内容、避免被欺骗**（"they considered labeling helpful in identifying AI-generated images and avoiding deception"）

> 综合：**披露的收益（透明度感知、避免误解）在本场景下大于成本（不降低参与度）**。建议披露，放在家长端 + 关于页，用 AADC 推荐的卡通形式。

---

## 第五部分：AI 生图在儿童内容上的已知失败模式与对策

### 5.1 画面文字乱码（最高频风险）

华为云博客分析 AI 生图文字混乱的原因：**多模态生成的内在矛盾**（视觉与语言模态固有不一致）、**数据集局限**（缺乏足够中文图片语料）、**模型训练不足**。解决方案集中在模型层：多模态融合（字节 TextHarmony）、高质量数据集（DetailedTextCaps-100K）、专用算法（阿里 AnyText、GPT-4o 图像生成「能准确描绘环境并保持图像中文字的清晰和连贯」）。**该文未在提示词层给出对策。**
来源：<https://bbs.huaweicloud.com/blogs/450200>

**对策（我们侧）**：
- **绝不把标题/章节名/诗句写进提示词**。唐诗尤其危险——汉字笔画密集，是所有语料里最弱的一环。所有文字一律前端叠加。
- 提示词显式加 `no text, no words, no letters, no captions in the image`。
- 上线前做**文字检测后检**：对生成图跑 OCR（或连通域 + 笔画密度启发式），检出疑似字符区域则重抽。
- 若封面必须有「卷轴/石碑」等本应带字的道具，让模型画**空白卷轴**，文字由前端叠加。

### 5.2 手部/面部变形（D + B 级）

**学术证据**：HandCraft（arXiv 2411.04332）<https://arxiv.org/abs/2411.04332> 指出扩散模型 "are surprisingly inept when it comes to rendering human hands, which are often anatomically incorrect or reside in the **'uncanny valley'**"，并提出用参数化模型构造手部 mask 与深度图作为条件信号来修复。

**合成痕迹的普遍性**：ArtifactLens（arXiv 2602.09475）<https://arxiv.org/abs/2602.09475> —— "Modern image generators produce strikingly realistic images, where **only artifacts like distorted hands or warped objects reveal their synthetic origin**. Detecting these artifacts is essential: without detection, we cannot benchmark generators or train reward models to improve them." 该研究证明**预训练 VLM 加几百个标注样本即可检测合成痕迹**。

**实践证据**：CSDN 将「手部、面部等精细部位经常出现变形或逻辑错误」列为首要缺陷，提示词层手段是添加负面提示（如「避免畸形手指」）。
来源：<https://blog.csdn.net/2600_94959984/article/details/157280599>

**对策（我们侧）**：
- 构图上**回避手部特写与复杂手部动作**：让角色「背手、叉腰、扶帽、抱在胸前」，或用中远景/半身像，手在画面中占比小。
- 「刻舟」「捞剑」这类动作用**剪影/远景**表现，而不是手部特写。
- 提示词加入 `simple rounded hands, small hands hidden if possible` 与回避词 `extra fingers, deformed hands, distorted face`。
- **后检**：用多模态模型过一遍 artifact 检测（ArtifactLens 思路）；对人脸区域做「双眸对称 + 嘴巴单一」启发式抽检；首批 8 张封面人工过一遍。

### 5.3 画面惊悚/成人化（监管与舆情红线）

2024-03 新浪财经转载《团结报》评论（儿童绘本「画风诡异化」争议）：家长发现某绘本出现「人物扭曲、画面惊悚、奇葩内容迭出，有的渲染血腥暴力、充斥负能量」，批评出版商无序竞争、急功近利「一味求新求快」。评论呼吁监管部门「细化内容标准、划出红线」，出版机构「自觉抵制劣质童书」，并建议定期发布童书推荐目录和「黑名单」。
来源：<https://finance.sina.com.cn/jjjxw/2024-03-23/doc-inapfxme4461466.shtml>

**学术佐证**：BookAgent（arXiv 2604.16541）<https://arxiv.org/abs/2604.16541> 明确指出 "while safety alignment is studied for text- or image-only generation, existing works rarely integrate **child-specific safety constraints** into narrative planning and sequence-level multi-modal verification"，并据此提出安全感知的多智能体框架。

**对策（我们侧）**：这是**真实存在的监管红线**，AI 生图没有人工画师的社会自觉，必须靠提示词 + 人工审。
- 提示词固定带安全串：`gentle, friendly, child-safe, no violence, no weapons, no blood, no scary expressions`。
- **西游记/小红帽/爱丽丝**是高风险题材（妖怪、狼、审判）：统一走「萌化、圆润、低幼」方向，狼要画成「傻乎乎的大狗」而不是獠牙猛兽，妖怪用「布偶/泥偶质感」消解恐怖。
- 上线前**人工过审每一张**（首批量小，成本可接受）；建立黑名单关键词表（暴力、惊悚、成人化、诡异）。

### 5.4 风格漂移与质量不稳

CSDN 两文均指出「同一组提示词结果差异巨大」「复杂场景风格控制困难」。对策：固定风格后缀串 + 固定 size/quality + 同批同种子（若接口暴露 seed）+ 先小图定稿再放大。

SCHEMA §6.2 的 Iterative Generative Drift（§3.2）给出了漂移的结构性原因与"不要链式迭代"的对策。

### 5.5 恐怖谷与风格选择

- Uncanny or Not（arXiv 2507.08230）<https://arxiv.org/abs/2507.08230> 研究 AI 生成面孔的恐怖谷感知。
- **选 Soft Pastel / Watercolor 而非 Realistic**（§1.1）；角色用动物/拟人而非真人面孔——同时规避恐怖谷与第十七条（三）的"人物图像"显著标识触发风险。

### 5.6 失败模式与对策速查表

| 失败模式 | 触发场景 | 提示词对策 | 后检对策 |
|---|---|---|---|
| 画面出现乱码汉字/英文 | 要求写标题、卷轴、石碑 | `no text, no words, no letters`；画空白卷轴 | OCR 检出即重抽 |
| 多余手指/手部变形 | 特写、抓握、持物动作 | 回避手部特写；`simple rounded hands`；负面 `extra fingers, deformed` | VLM artifact 检测 + 人脸/手部抽检 |
| 恐怖谷/写实脸 | 用了 realistic 类词 | 风格锚点前置 `soft watercolor childlike`；禁用 photorealistic 词 | 人工过审 |
| 惊悚/暴力内容 | 西游记/小红帽题材 | 固定安全串；妖怪萌化 | 人工过审 + 黑名单词表 |
| 风格漂移 | 跨章节生成 | 固定风格后缀；批量同参数；**不链式引用上一张图** | 首图定稿后锁参数 |
| 构图太满、标题无落位 | 未要求留白 | `empty top third for title overlay` | 叠加标题样机检查 |
| 色彩过饱和/过暗 | 未约束色板 | 指定 `warm palette, night indigo + moon yellow + peach` | 亮度/饱和度自动卡口 |
| 迭代退化 | 拿上一张当参考图 | 每张从源描述生成；参考图先降对比度 | 限制编辑轮次 |

**建议的自动卡口**（用已有 sharp 管线可实现，非本次范围）：生成图若亮度占比 < 60% 或 > 99%、平均饱和度 > 0.7、或检出文字连通域，则自动重抽并记录到日志。

---

## 第六部分：竞品视觉差距

### 6.1 国际竞品的视觉生产模式（A 级，官方描述 verbatim）

| 竞品 | 视觉生产模式（官方原话） | 来源 |
|---|---|---|
| **Epic** | 40,000+ 本书来自 **250+ 出版社**；"top publishers to bring trusted children's books"；"carefully curated by experts"；内容总监 Julia Horowitz："**High quality publishers, award-winning authors, and unforgettable characters** are Epic's unique ingredients" | <https://www.getepic.com/about> <https://www.getepic.com/parents> |
| **Vooks** | "**We turn physical kids' picture books into animated, read-aloud storybooks**"；"We carefully animate the art and add narration, music and sound"；"It all starts with **real kids' picture books (that you already love!)**" | <https://www.vooks.com/> |
| **Khan Kids** | "Join **Kodi the Bear and friends**"；5,000+ 游戏/活动；角色驱动：Ollo the Elephant / Reya the Red Panda / Peck the Hummingbird / Sandy the Dingo | 本地 `research/epic_itunes.json`（Khan Academy Kids 9.0.1） |
| **洪恩双语绘本** | "**资深儿童插画师团队**为每个绘本精心绘制高品质的绘本插图……以精彩纷呈的画**面从小提高孩子的审美**" | 本地 `research/app_ihuman_book.json` |
| **凯叔讲故事** | "打造优质原创儿童内容"；50000+ 内容；"《凯叔西游记》……保留原著精髓，**专为孩子绿色改编**" | 本地 `research/app_kaishu.json` |
| **喜马拉雅儿童** | "与**牛津大学出版社**战略合作……内置超 1170 本牛津树线上绘本"；"**甄选专业主播及制作团队**……严选优质、安全放心、有趣有爱的高质量内容" | 本地 `research/app_xmly_kids.json` |

### 6.2 本次实测：国产儿童 App 的配色量化（自采，一手数据）

对 `research/montages/` 中 9 款 App 的整屏截图拼贴图做像素统计（每图缩放至 160×320，按色相分桶），脚本为 `research/palette.mjs`（亮度/饱和度/主色）与 `research/hue.mjs`（色相分布 + WCAG 对比度）：

| App | 亮度>150 像素占比 | 平均饱和度 | 暖色相占比 | 冷色相占比 | 主导色 |
|---|---|---|---|---|---|
| 凯叔讲故事 | 92% | 0.27 | 14% | 5% | 绿 19% / 蓝 10% / 红 7%，灰 51% |
| KaDa 阅读 | 94% | 0.42 | 32% | 9% | 橙 16% / 红 14% / 蓝 14%，灰 36% |
| 洪恩阅读 | 98% | 0.31 | 16% | 34% | 青 24% / 紫 10% / 绿 14%，灰 34% |
| 叫叫阅读 | 98% | 0.46 | **57%** | 1% | **黄 48%** / 橙 8%，灰 40% |
| 宝宝巴士 | 94% | 0.31 | 30% | 12% | 橙 16% / 红 10%，灰 39% |
| 喜马拉雅儿童 | 98% | 0.47 | **61%** | 9% | **黄 38%** / 橙 19%，灰 23% |
| 伴鱼绘本 | 98% | 0.46 | 33% | 21% | 橙 16% / 红 13% / 紫 6%，灰 21% |
| 洪恩双语绘本 | 94% | 0.21 | 30% | 10% | 橙 16% / 桃 8%，灰 50% |
| 微信读书（成人对照） | **59%** | **0.09** | 5% | 0% | 灰 95% |

**读出的视觉惯例**：
1. **清一色高调明亮**：8 款儿童 App 亮度占比 92-98%，平均饱和度 0.21-0.47；成人应用（微信读书）亮度 59%、饱和度 0.09。**「明亮 + 中高饱和」是儿童应用的视觉默认**，且与年龄负相关——越低幼越饱和（叫叫/喜马拉雅儿童 0.46-0.47）。
2. **暖色主导**：8 款中 6 款暖色相占比 ≥30%，叫叫（小鸡 IP 黄 48%）与喜马拉雅儿童（品牌黄 38%）是纯度极高的暖色战略。凯叔是例外（绿/蓝更多，走「森林夜话」感），**偏冷的儿童品牌确实存在但非主流**。
3. **大量近白底色**：灰（无彩色）占比 21-51%，界面以白/浅灰为底，彩色用于插画与按钮。
4. **页面彩色丰富度**：KaDa/伴鱼/洪恩双语呈现多色相并存的「绘本花园」感；叫叫/喜马拉雅儿童则是单色品牌驱动。

> 局限声明：拼贴图是整屏 UI 而非单本封面，以上反映**应用级**配色而非**封面级**画风；封面级逐本画风本次未取证。

### 6.3 桃阅读现状（自采，代码级）

来源：`apps/web/src/components/art/SceneArt.tsx`（854 行）+ `apps/server/src/content/packs/*.ts`

- **40 个 SVG 场景**，覆盖 8 本书封面 + 章节题图 + 空态 + 情绪屏 + 加载态
- 文件头注释原文："由「渐变天空 + 远景 + 中景 + 前景点缀」四层构成……圆角块面、无描边、柔和高饱和儿童配色"
- 代码级指标（本次实测）：**75 个不同 fill 色值**；约 **248 个 SVG 基本图元**（rect/circle/ellipse/path/line/polygon）分布于 40 个场景
- viewBox 固定 `0 0 100 100`，`preserveAspectRatio="xMidYMid slice"`——**所有场景是正方形坐标空间**

### 6.4 差距分析：四个维度

> 方法声明：本环境无图像输入能力，以下**全部为基于代码与官方文字的结构化断言**，不含像素级看图判断。

| 维度 | 竞品（Epic/洪恩/凯叔/Khan Kids） | 桃阅读 SVG 现状 | 差距性质 |
|---|---|---|---|
| **信息量** | 每页是完整插画：多角色、道具、背景细节、表情 | 40 场景共 248 图元 ≈ **每场景 6 个图元**；角色多为高度抽象几何符号 | **数量级差距**。AI 生图单张信息量远超 6 个图元 |
| **色彩丰富度** | 出版级绘本色彩：渐变、层次、环境光 | 75 色覆盖 40 场景已不少，但每场景实际用色少；无光影渐变（SVG 只有 linearGradient 天空） | 中等差距，可补 |
| **角色感** | Epic："unforgettable characters"；Khan Kids 有 4 个固定角色 IP；洪恩"资深插画师团队" | 场景为主，**无固定角色设计**；吉祥物 TaoMascot 存在但非每书主角 | **最大差距**。角色一致性是绘本灵魂（§3 全部论文都在解这个题） |
| **氛围感** | Vooks："Subtle animation, music, and sound engage without overstimulating"；睡前定位 | 有月亮/星星/夜空渐变，氛围方向正确，但静态且抽象 | 方向对、深度浅。AI 生图可直接产生"氛围"（hazy dreamy atmosphere） |

**关键洞察 1：桃阅读的 SVG 不是"劣化版绘本"，而是"抽象场景图标"**。248 图元 / 40 场景 = 每场景约 6 个形状，信息量上属于**图标**而非**插画**。竞品是出版级插画。这不是风格差异，是**媒介代差**。AI 生图是唯一能以合理成本补上这个数量级差距的手段（人工绘制 8 本书 × 20+ 章节，参考 Kidillus 每页 $20 起，也是一笔不小支出）。

**关键洞察 2：角色一致性对桃阅读尤其重要**。Khan Kids 的 Kodi the Bear / Ollo / Reya / Peck / Sandy 是**跨全书固定的角色系统**，这是"孩子记得住、想再见"的核心。桃阅读 8 本书**每本都有主角**，正好是 character sheet 架构（§3.3 StoryState）的理想场景。**AI 生图升级的真正收益不是"更漂亮的封面"，而是"第一次拥有角色"**。

**关键洞察 3：Vooks 的反例值得警惕**。Vooks 官网明确强调 "It all starts with **real kids' picture books**"、"carefully animate the art"——**插画来自实体绘本，是版权采购 + 人工动画，不是 AI**。在"高质量儿童内容"赛道上，**"人类创作"本身是卖点**。桃阅读用 AI 生图是**成本与质量的折中**，不应反过来把"AI 生成"当营销噱头（与 §4.5 实证一致：披露的收益在透明度，不在营销）。

**关键洞察 4：IP 吉祥物是头部玩家标配**。叫叫有小鸡叫叫、凯叔有真人 IP、宝宝巴士有奇奇妙妙、喜马拉雅有波波/小雅（来源：`research/report-cn-apps.md`，该报告标注其 UI 视觉层为"未查证"，吉祥物信息来自商店描述与 logo）。**桃阅读的"桃子"还没立起来——P0 品牌资产**。AI 生图是**一次性把"桃子"画进 8 本封面**的最低成本机会：给桃子定固定外观描述（§7 模板 #10），在每张封面里以配角身份出现，形成跨书品牌锚点。这是本次接入除"替换 SVG"之外的**最大附加价值**。

### 6.5 与桃阅读定位的关系（重要判断）

量化数据显示儿童 App 主流是「高亮 + 高饱和 + 白底」，而桃阅读是**夜空蓝 #0E1A38** 暗色外壳。这不是缺陷而是定位差异：
- 桃阅读主打**就寝窗口 + 亲子共读**，暗色外壳有明确功能与合规理由（§6.6），不应跟随白底高饱和主流。
- 但**封面与章节图本身可以明亮**：它们是暗色界面里的「发光画框」。建议合成方向——**画面内保持绘本级明快色彩与高饱和，画面底色融入夜空蓝（让封面在书架上不刺眼），关键发光元素（月亮、灯笼、星光）使用 moon-yellow #FFD97A**，与外壳形成「夜空里的暖光」叙事。同时满足「儿童要明亮醒目」与「睡前要低刺激」两个约束。

### 6.6 睡前阅读场景的配色指引（自采 + B 级）

**现有夜空配色的 WCAG 对比度（本次实测）**：

| 颜色 | 对比度 vs #0E1A38 | 评级（WCAG 2.1） |
|---|---|---|
| moon-yellow #FFD97A | **12.63** | 超过 AAA（7:1） |
| white #FFFFFF | 17.16 | 超过 AAA |
| peach #FFB3A0 | **9.98** | 超过 AAA |
| muted #8FA2C8 | 6.68 | 超过 AA（4.5:1），未达 AAA |

**结论**：现有三色在夜空底上**全部达到 AAA 级文字对比度**，作为插画强调色完全安全。moon-yellow 是最强发光色（12.63），适合月亮/星光/灯笼；peach 适合角色腮红、暖光晕；#8FA2C8 只能做次要辅助，不要承担关键信息。

**护眼模式与色温的实证依据**：
- 南都教育联盟测评 24 款主流儿歌动画类 App，**仅 6 款设有可调节色温的夜间/护眼模式**（爱奇艺奇巴布、小企鹅乐园、宝宝巴士儿歌、小伴龙儿歌、儿歌千千、儿歌多多），原理是「把电子设备的屏幕调低色温，让人看起来更加舒服」，开启后「弱化一定波段的有害蓝光，屏幕画面会稍微变黄」；眼科医生评价「还是有一定的作用」。同测评中爱奇艺奇巴布、小企鹅乐园、宝宝巴士儿歌还支持姿势矫正与距离提醒（眼睛距屏幕小于 40cm 时屏幕变模糊并弹窗）。
  来源：<http://www.sohu.com/a/308455521_161795>
- KaDa 阅读器设有「护眼模式（暖色调减蓝光）」，属家长端可控项。来源：`research/report-cn-apps.md`

**可落地结论**：
1. 桃阅读夜空蓝底 + 暖色强调，与「低色温、减蓝光」的护眼共识一致，是**正确的产品决策**，应保留。
2. 插画配色顺这个方向：**画面主色温偏暖（peach/moon-yellow/暖橙），冷色只作点缀**；避免大面积高纯度蓝、紫（尤其睡前章节图）——与 §6.2 实测的「儿童 App 暖色主导」吻合。
3. **封面/章节图上的文字层应叠在画面留白处并保证 4.5:1 以上对比度**；moon-yellow 达 12.63，用暖黄做标题文字在夜空底上最稳。
4. 若后续做距离/姿势提醒，40cm 模糊是行业已有先例，合规友好（P2 级建议）。

---

## 第七部分：落地建议

### 7.1 数据层改造（对齐 StoryState 架构）

在 `apps/server/src/content/packs/*.ts` 每本书里新增字段：

```ts
interface BookArt {
  characterSheet: string   // 固定角色描述（正典），所有章节 prompt 派生自此
  worldSettings: string    // 固定世界设定（背景关键词重复策略）
  styleAnchor: string      // 固定风格锚（水彩/粉彩 + 艺术家锚点）
  coverPrompt: string      // 模板 A 填充结果
  chapters: { art: string; prompt: string }[]  // 模板 B 填充结果
}
```

与 §3.3 的 `character sheet + global settings + per-page scene constraints` 一一对应，**不需要训练任何模型**（training-free，与现有 OpenAI 兼容 API 直接吻合）。

### 7.2 生成与质检流程

1. **BASE 层先跑**（SCHEMA 原则）：用自由 prompt 跑 8 本书各一张，检查模型对"中国公版故事 + 儿童"的默认偏见（肤色、服饰、场景刻板）。
2. **每本书先生成 1 张 character sheet（模板 #10）**，人工确认后冻结为 `characterSheet`。
3. 封面与章节题图**全部从 characterSheet + 模板派生**，不引用其他生成图（规避 Drift）；若用 `/images/edits` 带参考图，**参考图先降对比度**（SCHEMA §6.3）。
4. **VLM 自检**：用多模态模型对每张生成图过一遍 artifact 检测（ArtifactLens 证明预训练 VLM 加少量样本即可），重点查手、眼、文字、多肢。
5. 生成后**写元数据隐式标识**（Content Credentials 或自定字段）。

### 7.3 通用约定

- **结构**：`[中文内容描述] + [English style suffix]`，中文描述场景与构图，英文锁定风格。
- **风格后缀（全项目统一，保证跨书风格不漂移）**：
  ```
  , children's picture book illustration for ages 3-8, soft watercolor and colored pencil,
    warm and gentle palette, rounded cute shapes, friendly expressions, soft diffused light,
    cozy bedtime mood, night indigo sky with moon-yellow stars, simple minimal background,
    generous empty space at top for title overlay, no text, no words, no letters,
    no captions in the image, child-safe, no violence, no scary elements,
    flat storybook composition
  ```
- **安全后缀（每次必带）**：`no extra fingers, no deformed hands, no distorted faces, simple rounded hands`
- **尺寸**：封面 `size: 1024x1536`（若支持自定义则 `1152x1536`）；章节图 `size: 1536x1024`（若支持则 `1536x864`）；角色设定表 `size: 1024x1024`。
- **质量**：封面用 `high`（门面资产），章节图用 `medium`（成本 3.7 倍差），先用 medium 出草稿定构图再升 high。

### 7.4 可直接粘贴的 Prompt 模板

#### #1 唐诗三百首·星星篇（封面，poetry-moon）
```
唐诗之夜：一个小书童坐在屋檐上，抬头仰望满天繁星和一轮圆月，远山如黛，身旁放着一卷竹简和一盏小灯笼，画面安静悠远，大量夜空留白用于叠加标题。
, children's picture book illustration for ages 3-8, traditional Chinese ink wash
  painting shui-mo style, gentle night scene, deep indigo night sky with glowing
  moon-yellow moon and stars, soft watercolor gradients on textured rice paper,
  dreamy and poetic mood, single small child character sitting on a rooftop,
  large in the lower third, huge empty starry sky in the top two thirds for title
  overlay, no text, no words, no letters, no captions in the image, child-safe,
  warm moon-yellow lantern glow, rounded cute shapes, no extra fingers,
  no deformed hands
```
> 对应 `coverFrom #1E2A5A → coverTo #4A5FBF`：夜空蓝渐变可直接由画面底色继承。

#### #2 三字经·人之初（封面，primer-scroll）
```
蒙学课堂：三个圆脸稚童围坐在一张矮书案前，案上摊开一卷竹简，一位白胡子老先生笑眯眯地指着竹简领读，窗外有桃花和一只燕子，晨光暖黄，氛围欢快。
, children's picture book illustration for ages 3-8, warm gouache and colored pencil,
  traditional Chinese primer schoolroom scene, soft warm peach and honey-yellow
  palette matching a cream and tangerine cover gradient, cute chubby toddlers with
  big friendly smiles, rounded simple shapes, bright and cheerful morning light,
  characters in the lower two thirds, open warm sky in the top third for title
  overlay, no text, no words, no letters, no captions in the image, child-safe,
  no extra fingers, no deformed hands
```
> 对应 `coverFrom #FFE0B2 → coverTo #FFB74D`。

#### #3 西游记·美猴王出世（封面，mountain-monkey）
```
花果山之巅：一只圆脸大眼睛的小石猴从一块发光的仙石里蹦出来，周围山花烂漫、几只小猴子在桃树上欢呼，远处是云海和仙山，色彩明快热闹。
, children's picture book illustration for ages 3-8, playful Chinese color-ink
  painting with clay-toy texture, chubby cute baby monkey with big friendly eyes,
  joyful and lively mood, bright jade-green and peach-pink palette, rounded soft
  shapes, no sharp fangs, no scary elements, character centered and large,
  misty mountains as simple background, empty cloud area at top for title overlay,
  no text, no words, no letters, no captions in the image, child-safe,
  no extra fingers, no deformed hands
```
> 对应 `coverFrom #2E7D32 → coverTo #66BB6A`。妖怪萌化原则（§5.3）在封面就立住。

#### #4 刻舟求剑（封面，river-boat）
```
江边寓言：一只小木船停在江心，船头站着一个憨厚的古代农人正弯腰看着江面，手中剑掉落处漂着一圈水花，远处两岸是青青芦苇和几只水鸟，江水用柔和的青绿色水彩晕染。
, children's picture book illustration for ages 3-8, soft watercolor with fine
  colored-pencil line texture, gentle river landscape in teal and fresh green,
  funny simple peasant character in traditional robes shown from behind and side,
  no hand close-up, calm rippling water, bird and reed details in background,
  large empty sky area at top for title overlay, no text, no words, no letters,
  no captions in the image, child-safe, humorous gentle mood, no extra fingers,
  no deformed hands
```
> 对应 `coverFrom #00838F → coverTo #4DD0E1`。「从背后/侧面」天然回避手部与表情风险（§5.2）。

#### #5 Alice in Wonderland（封面，alice-rabbit）
```
爱丽丝的奇遇：一个穿蓝色连衣裙的金发小女孩好奇地望着一只穿马甲、看怀表的白兔，白兔正从一棵大树下的小门洞里探出身子，周围开满巨大的彩色蘑菇和花朵。
, children's picture book illustration for ages 3-8, classic European storybook
  watercolor, soft lavender blue and candy-bright palette, curious little girl in
  blue pinafore dress, fluffy white rabbit in a tiny waistcoat holding a pocket
  watch, whimsical oversized mushrooms and flowers, gentle warm light, rounded
  friendly faces, characters in the lower two thirds, open whimsical sky at top
  for title overlay, no text, no words, no letters, no captions in the image,
  child-safe, no extra fingers, no deformed hands
```
> 对应 `coverFrom #7B5EA7 → coverTo #C9A6E8`。

#### #6 Peter Pan（封面，peter-pan）
```
永不长大的夜晚：一个穿绿色衣裳的男孩和一个小光点仙子飞过伦敦的屋顶，夜空是深蓝色的，月亮又大又黄，屋顶上有几个烟囱，星星闪着暖光，画面有飞翔的轻盈感。
, children's picture book illustration for ages 3-8, dreamy night-time storybook
  watercolor, deep indigo night sky matching a dark blue cover, big glowing
  moon-yellow moon and warm stars, small flying boy in green tights with a tiny
  glowing fairy, rooftops and chimneys in soft silhouette below, sense of gentle
  flight, cozy bedtime mood, large open night sky at top for title overlay,
  no text, no words, no letters, no captions in the image, child-safe,
  no extra fingers, no deformed hands
```
> 对应 `coverFrom #1565C0 → coverTo #64B5F6`；与桃阅读外壳 #0E1A38 同色系，是 8 张封面里与品牌最贴合的一张。

#### #7 Little Red Riding Hood（封面，red-riding-hood）
```
林间小路：一个戴红色兜帽披风的小女孩提着一个小篮子走在森林小路上，路边开着野花，远处树丛后有一只毛茸茸的大灰狼正探头张望（样子傻乎乎的不可怕），阳光透过树叶洒下光斑。
, children's picture book illustration for ages 3-8, warm European storybook
  watercolor and colored pencil, forest path dappled with soft golden light,
  small girl in red hooded cloak carrying a little basket, fluffy big wolf
  peeking from bushes drawn as a silly harmless dog-like creature with friendly
  eyes, no fangs, no scary expression, soft green and warm red palette, rounded
  cute shapes, character on the left third, open path and sky on the right for
  title overlay, no text, no words, no letters, no captions in the image,
  child-safe, no extra fingers, no deformed hands
```
> 对应 `coverFrom #C62828 → coverTo #EF9A9A`。狼的萌化在提示词里写死（§5.3 红线）。

#### #8 The Tale of Peter Rabbit（封面，mcgregor-garden）
```
比得兔的菜园：一只穿蓝色小外套的淘气小兔子蹲在菜园里，怀里抱着一根大胡萝卜，四周是巨大的卷心菜、南瓜和番茄，木栅栏上停着一只麻雀，画面是英国乡村花园的暖阳午后。
, children's picture book illustration for ages 3-8, classic Beatrix Potter style
  soft watercolor over light pencil sketch, warm sunlit English cottage vegetable
  garden, small mischievous rabbit in a tiny blue jacket holding a big carrot,
  oversized cabbages and pumpkins around a wooden fence, gentle afternoon light,
  soft sage green and warm ochre palette, charming vintage storybook feel,
  character centered low, open garden sky at top for title overlay, no text,
  no words, no letters, no captions in the image, child-safe, no extra fingers,
  no deformed hands
```
> 对应 `coverFrom #558B2F → coverTo #AED581`。比得兔原作就是水彩+铅笔速写，是本组里风格锚点最清晰、最不易跑偏的一本。

#### #9 章节题图通用模板（16:9，按书替换 {角色} 与 {场景}）
```
{章节核心动作的一句话中文描述，如：小猴子跃入瀑布水帘洞，水花四溅，洞里隐约有石桌石椅}，主角{角色外观固定描述}位于画面左三分之一，右侧留出风景。
, children's picture book illustration for ages 3-8, {该书风格词：soft watercolor /
  shui-mo ink wash / gouache}, horizontal 16:9 cinematic storybook scene, main
  character on the left third performing one clear simple action, open landscape
  on the right two thirds for caption overlay, consistent character design with
  reference sheet, warm gentle palette, soft diffused light, minimal uncluttered
  background, single focus of attention, no text, no words, no letters,
  no captions in the image, child-safe, no violence, no scary elements,
  no extra fingers, no deformed hands, simple rounded hands
```
> 用法：章节图按书成批生成，每批共用同一风格后缀 + 同一参考图（见 #10）；唐诗章节可换成「春晓：小鸟在枝头叫，落花满地」「咏鹅：白鹅在碧水上游」等单一直白画面（§1.3：图要能独立讲清这一章）。

#### #10 角色一致性设定表（Character Bible，先跑，1024x1024）
```
角色设定表：在一张图里以 3x4 网格画出同一角色的十二个角度与表情——正面、侧面、背面、抬头、低头、开心、惊讶、好奇、困倦、走路、奔跑、坐下。角色固定为：{如：一只圆脸大眼的小石猴，金棕色绒毛，穿红色小肚兜，脸颊有两团红晕，尾巴卷卷的}。背景纯色浅灰，无场景。
, character design reference sheet, 3x4 grid of twelve poses and expressions of
  the same character, consistent proportions and colors across all twelve panels,
  front view, side view, back view, looking up, looking down, happy, surprised,
  curious, sleepy, walking, running, sitting, flat light gray background,
  no scenery, children's picture book illustration style for ages 3-8,
  soft watercolor and colored pencil, rounded cute shapes, friendly expressions,
  no text, no words, no letters in the image, no extra fingers, no deformed hands
```
> §3.4 多宫格法的直接落地。产出后裁切单格，作为 `/images/edits` 的参考图逐张回传，是跨章节角色一致性的**最低成本兜底方案**。建议先给「桃子吉祥物」跑一张，再给每本书主角各跑一张（共 9 张）。

#### SCHEMA MEDIO 结构化模板（推荐用于高规格封面，7 标签）
```
Style: {soft watercolor and gouache children's picture book illustration, hand-painted feel}.
Composition: {centered vertical composition, eye-level view, subject on the lower
  middle third, generous negative space at the top}.
Subject: {{CHARACTER}} in {{SETTING}}, doing {{ACTION}}.
  Character description (fixed across this book): {{CHARACTER_SHEET}}.
Lighting: {soft moonlight from upper left, warm 2700K glow, low contrast}.
Mandatory: {calm curious mood, rounded soft forms, palette anchored on indigo
  #0E1A38 to #223465 with peach #FFB3A0 and moonlight #FFD97A accents}.
Prohibitions: {no text, no letters, no words, no realistic human faces,
  no close-up hands, no extra fingers, no oversaturated colors, no scary imagery}.
Output: {aspect ratio 3:4, vertical book cover format, high resolution}.
```

### 7.5 上线步骤与成本

1. 先跑 #10 得到 9 张角色设定表（桃子 + 8 书主角），人工过审（§5.3 红线）。
2. 用 #1-#8 的 medium 质量出封面草稿，人工选稿、锁定每本的风格参数。
3. 定稿后用 high 质量重出 8 张封面，替换 `coverArt` 对应的 SVG（`SceneArt` 需新增 raster 分支：同容器 + `object-cover`）。
4. 按 #9 模板批量出章节图（每书 3-6 张），带参考图走 `/images/edits`。
5. 所有图过自动卡口（亮度/饱和度/文字检测）+ 人工抽检，黑名单词表记入日志。
6. **合规三件套同步上线**：元数据隐式标识 + 用户协议条款 + 应用商店上架材料（§4.1）。
7. **成本预估**（按 gpt-image-1 公开价）：8 封面 high + 约 24 张章节 medium + 9 张设定表 ≈ 8×$0.19 + 24×$0.07 + 9×$0.07 ≈ **$4.2**，首批可忽略。**对照人工**：Kidillus 每页 $20 起，8 本 × 约 20 页 ≈ $3200+。AI 生图的成本优势是两个数量级。

### 7.6 与现有 SVG 资产的关系

**不要丢弃 SceneArt**。40 个 SVG 场景在三个场景仍有优势：
- **加载态 / 空态 / 情绪屏**（`loading-moon` / `star-sea` / `lamp-hint`）：需要确定性、即时渲染、零网络依赖
- **吉祥物微交互**：SVG 可程序化驱动动画，AI 图不行
- **降级方案**：AI 生图失败/离线时的兜底

正确关系：**AI 图 = 书籍内容插画（封面 + 章节题图），SVG = 产品 UI 图形（加载/空态/吉祥物）**。两者不互相替代。

---

## 第八部分：明确不要做的（反面清单）

| 不要做 | 理由 | 来源 |
|---|---|---|
| **不要把上一张生成图当参考图一路迭代做整本书** | Iterative Generative Drift：误差**乘性累积**，重图先被压缩再再解释 | SCHEMA §6.2 |
| **不要堆砌华丽描述词当 prompt** | Constraint-Over-Elaboration：约束（Mandatory/Prohibitions）优于 elaboration | SCHEMA §6.1.1 |
| **不要让 AI 生成文字（书名/章节名/诗句）** | 文字渲染是独立难点；与桃阅读已有前端文字层重复 | SCHEMA §6.6；华为云博客 |
| **不要用 Realistic / 真人面孔风格做儿童内容** | 恐怖谷；且第十七条"人物图像"显著标识触发风险 | HandCraft；深度合成规定第十七条（三） |
| **不要做手部特写** | "surprisingly inept ... anatomically incorrect or reside in the 'uncanny valley'" | HandCraft |
| **不要每张图重写角色描述** | 状态应落数据层（character sheet），prompt 派生；重写必然漂移 | StoryState / S2ED |
| **不要用中文写风格词** | 中文实操社区自己都用英文写 prompt；英文风格词对应更稳定 | §2.6 证据链 |
| **不要把"AI 生成"当营销卖点** | 高质量赛道（Vooks）卖的是 "real kids' picture books"；披露收益在透明度不在营销 | Vooks 官网；§4.5 |
| **不要不做标识** | 《标识办法》第五条元数据隐式标识是**义务**，第八条用户协议必须写明，第七条上架要交材料 | 《标识办法》第五/七/八条 |
| **不要让孩子端出现"AI"文字标识** | AADC transparency 要求 "suited to the age of the child"，6-9 岁要用卡通形式；且破坏睡前画面 | AADC Standard 4 |
| **不要链式编辑（多轮 in-paint）** | "current editing models exhibit degradation in character consistency and stability across multiple turns" | FLUX.1 Kontext |
| **不要给单角色方案套多角色场景** | self-attention-leakage 使多角色失效 | Storybooth |
| **不要让狼/妖怪走写实恐怖方向** | 儿童绘本"画风诡异化"是已被媒体点名、呼吁监管的红线 | 新浪财经/团结报 |
| **不要跟随白底高饱和的儿童 App 主流改外壳** | 桃阅读暗色外壳有护眼与定位依据，是差异化而非缺陷 | §6.5/§6.6 |

---

## 第九部分：优先级建议

| 优先级 | 项 | 理由 |
|---|---|---|
| P0 | 8 个封面（3:4）+ 9 张 character sheet | 视觉差距最大处；封面是书架第一印象；顺带立住桃子 IP |
| P0 | 合规三件套：元数据标识 + 用户协议条款 + 上架材料 | 《标识办法》已生效，第十三条有处理后果 |
| P1 | 高频章节题图（16:9）：西游记、爱丽丝两本 | 章节最多、角色最固定，一致性收益最大 |
| P2 | 其余章节题图 | 三字经/唐诗是短篇集，题图复用场景即可 |
| P2 | 家长端 AI 披露说明（用 TaoMascot 卡通形式） | AADC Standard 4 要求 "suited to the age"；实证显示不降低参与度 |
| P3 | 距离/姿势提醒（40cm 模糊） | 行业已有先例，合规友好 |

---

## 附录 A：全部来源 URL 清单

**法规（A 级一手全文）**
- 《生成式人工智能服务管理暂行办法》<https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm>
- 《互联网信息服务深度合成管理规定》（工信部转载全文）<https://www.miit.gov.cn/xwdt/gxdt/sjdt/art/2022/art_466dfb964d6646f38234ca8aadc056b1.html>
- 《人工智能生成合成内容标识办法》（山西网信网转载全文）<http://www.casx.gov.cn/content/2025-03/17/content_13404699.htm>

**合规解读（A/C 级）**
- FTC COPPA <https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy>
- ICO AADC 15 标准 <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/>
- ESRB 对 AADC Transparency 的解读 <https://www.esrb.org/privacy-certified-blog/the-icos-age-appropriate-design-code-transparency-and-fairness/>
- US Copyright Office AI 政策 <https://www.copyright.gov/ai/>

**学术（D 级）**
- SCHEMA 结构化 prompt 方法论 <https://arxiv.org/html/2602.18903v1> / <https://arxiv.org/abs/2602.18903>
- ConsiStory <https://arxiv.org/abs/2402.03286>
- Storynizor <https://arxiv.org/abs/2409.19624>
- CharCom <https://arxiv.org/abs/2510.10135>
- Storybooth <https://arxiv.org/abs/2504.05800>
- ReDiStory <https://arxiv.org/abs/2602.01303>
- IdentityStory <https://arxiv.org/abs/2512.23519>
- FLUX.1 Kontext <https://arxiv.org/abs/2506.15742>
- BookAgent（儿童安全叙事） <https://arxiv.org/abs/2604.16541>
- StoryState <https://arxiv.org/abs/2602.01305>
- S2ED <https://arxiv.org/abs/2605.22448>
- Make-A-Storyboard <https://arxiv.org/abs/2312.07549>
- 儿童故事书情绪识别 <https://arxiv.org/abs/2506.18201>
- HandCraft（手部修复） <https://arxiv.org/abs/2411.04332>
- ArtifactLens（合成痕迹检测） <https://arxiv.org/abs/2602.09475>
- Uncanny or Not（恐怖谷感知） <https://arxiv.org/abs/2507.08230>
- AI 标签透明度感知 <https://arxiv.org/abs/2510.19024>
- AI 标签与误信息 <https://arxiv.org/abs/2505.22845>
- AI 艺术版权公众意见 <https://arxiv.org/abs/2407.10546>
- HanDiffuser <https://arxiv.org/abs/2403.01693>

**竞品与行业（A 级）**
- Epic About <https://www.getepic.com/about>
- Epic Parents <https://www.getepic.com/parents>
- Vooks 官网 <https://www.vooks.com/>
- Vooks About <https://www.vooks.com/about>
- Kidillus（风格分类与价格基准） <https://kidillus.com/>
- 中研网绘本产业趋势 <https://m.chinairn.com/hyzx/20241211/140923418.shtml>

**选书与画风（B 级）**
- 什么值得买：0-3 岁语言爆发期选绘本 <https://post.smzdm.com/p/ag87oq36/>
- 什么值得买：低幼颜色认知绘本（2-5 岁色彩敏感期） <https://post.smzdm.com/p/awm02032/>
- 搜狐：水墨/泥塑/剪纸中国风绘本（适合 2-8 岁） <https://www.sohu.com/a/143494500_660922>
- 搜狐：5 本中国风绘本盘点 <https://www.sohu.com/a/437222229_661307>
- 网易：绘本阅读「图画是信息源」 <https://www.163.com/dy/article/J7D7TK7M051282RU.html>

**AI 生图实践（B/C 级）**
- CSDN：AI 生图缺陷与提示词技巧 <https://blog.csdn.net/2600_94959984/article/details/157280599>
- CSDN：负面提示词原理与避坑 <https://blog.csdn.net/2600_94959984/article/details/157302825>
- CSDN：AI 儿童绘本角色一致三方法 <https://blog.csdn.net/ice_99/article/details/140174750>
- CSDN：用 AI 生成绘本含大量 prompt <https://blog.csdn.net/2401_85955060/article/details/140104303>
- 腾讯云开发者社区：gpt-image-1 API 参数（转载二手） <https://cloud.tencent.com/developer/article/2516198>
- 华为云博客：AI 生图文字混乱原理 <https://bbs.huaweicloud.com/blogs/450200>
- 新浪财经/团结报：儿童绘本画风诡异化评论 <https://finance.sina.com.cn/jjxw/2024-03-23/doc-inapfxme4461466.shtml>
- 南都 24 款儿童 App 护眼测评（搜狐） <http://www.sohu.com/a/308455521_161795>

**桃阅读内部（自采）**
- `apps/web/src/components/art/SceneArt.tsx`（40 场景，75 色值，约 248 图元）
- `apps/server/src/content/packs/*.ts`（8 本书 coverArt 键名）
- `docs/design-system.md`（色彩 token，prompt 模板中直接引用 HEX）
- `research/palette.mjs` + `research/hue.mjs` + `research/montages/`（国产 App 配色统计、WCAG 对比度）
- `research/report-cn-apps.md`（吉祥物信息、护眼模式）

---

## 附录 B：本轮未能取证的事项（诚实清单）

| 事项 | 为什么没取到 | 替代证据 |
|---|---|---|
| DALL-E 3 / gpt-image 官方 prompt 指南 | openai.com / platform.openai.com / help.openai.com 全域 Cloudflare 403 | 用 SCHEMA（2026，850 次验证）替代，且更贴合"结构化 prompt"主题；gpt-image 参数用腾讯云转载（已标注二手） |
| Midjourney --cref / --cw 官方文档 | docs.midjourney.com 后续被 Cloudflare 拦截，首次只抓到 V8.2 Edit Model 页 | 用 arXiv ConsiStory/CharCom + CSDN 实操替代 |
| 2024-2026 流行画风趋势榜单一手文章 | illustrationx（JS 验证）、getillustrations（404）、skillshare（403）、printmag（404）全挂 | 用 Kidillus 商业分类（A 级事实）+ 搜狐中国风盘点 + 中研网产业报告替代；**画风趋势的 A 级榜单证据缺失，是本轮最大缺口** |
| 中英 prompt 效果直接对比实验 | 可用检索通道下未命中对照研究 | 用"中文实操社区也用英文写 prompt"这一事实 + 训练语料分布间接推断，明确标注为**工程判断而非实验结论** |
| OpenAI images 接口是否支持 `negative_prompt` / 自定义 `size` / `seed` | 官方文档 403 | 以腾讯云转载参数清单为准（C 级），已在 §2.4 标注为外推；**接入时需先做参数探测** |
| `gpt-image-2.5-sunburst` 的真实能力边界 | 供应商别名，无公开文档 | 按 gpt-image-1 行为做合理外推，已明确标注 |
| Epic / Vooks / 凯叔 / 洪恩的**实际插画像素级分析** | 本环境无图像输入能力（iter3 §6 已确认） | 全部转为官方文字描述的**结构化断言**（信息量/色彩/角色感/氛围感四维度），不含看图判断 |
| 各 App 单本封面的逐本画风 | 自有拼贴图是整屏 UI 级统计，非封面特写 | §6.2 明确标注为应用级配色而非封面级画风 |
| gen_id 在 OpenAI 兼容 API 下是否可用 | 该机制来自 ChatGPT 对话内，非公开 API 文档 | 已在 §3.4 标注"需实测" |
| 童书出版「黑名单/推荐目录」是否已有官方清单 | S11 呼吁设立，未查证已存在 | 仅作为舆情风险引用，不作为既有规则 |
| Google Play Families Policy 对 AI 内容的要求 | Google 全域连接超时（iter3 同一阻断点） | 本轮不依赖该政策；中国区上架走《标识办法》第七条 |
