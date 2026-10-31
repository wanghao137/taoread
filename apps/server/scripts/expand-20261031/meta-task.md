# meta.json 批量创作任务（找故事第四轮）

为儿童阅读平台写 21 本新书的 meta.json。

## 规范
- 逐字模仿金样例：`scripts/expand-20261031/folktale-`mengjiangnu/meta.json（zh 故事书金样例）。字段结构与顺序完全一致。
- 输出到 `scripts/expand-20261031/<id>/meta.json`（每本一个目录）。
- JSON 必须严格有效：值内引号一律用「」，plan 数组最后一项后不加尾逗号。
- plan 每章 3 条 beats，每条 20-40 字，概括该章情节要点（不改流传情节）。
- 权利红线：民间口传故事无单一作者→author 写「中国民间故事 · 桃阅读 改写」。
- en 书 plan.title 用 "Chapter N" 前缀 + sourceRef 注明从底本选章。

## zh 书单（13 本；lang=zh，category=story；ageStage 除注明外 6-8）
| id | 章 | 说明 |
| folktale-hailibu | 5 | 蒙古族：猎人救小蛇得宝石（含嘴听懂鸟兽语，泄密变石），山崩洪水预警，说真话变石救全村，石名海力布 |
| folktale-mousebride | 4 | 鼠爸妈寻最强女婿：太阳→云→风→墙→(鼠怕猫)，敲锣打鼓嫁女给猫，猫一口吞新娘；诙谐+道理「找合适的，看本性」 |
| folktale-goldaxe | 4 | 诚实樵夫三斧头（金/银/铁只认铁斧），得三斧；邻居贪心汉故意丢斧谎报，两手空空 |
| folktale-matouqin | 5 | 蒙古族：少年苏和救小白马，赛马会夺魁被王爷抢马，白马带箭伤奔回死去，梦嘱做琴，马头琴诞生 |
| folktale-longfamei | 5 | 侗族：山寨缺水，长发妹发现泉眼，山神警告泄密受罚，为乡亲说出秘密，长发变白，乡亲得水，榕树以榕须为发相赠 |
| folktale-zhuangjin | 5 | 壮族：阿妈织壮锦被风卷走，两兄长怕苦半途而废，三子历火山大海寻回，仙女临锦，锦飞回愿望成真 |
| folktale-shixiongdi | 5 | 十个儿子各怀绝技（千里眼/顺风耳/长腿/铁骨/钢头/大脚/大嘴/大肚等），齐心救父斗官府，各显神通 |
| folktale-zaohe | 4 | 枣核大的孩子机智斗县官：衙役牵走牲口，枣核蹦进驴耳朵夜赶牲口回，戏弄衙役，蹦上官帽喊打 |
| sage-xuwenchang | 6 | 江南智者徐文长民间故事：少年妙对、智惩克扣工钱的财主、画虾济贫、戏势利眼、巧计还账、收束（智慧济贫笑对权贵） |
| sage-agudunba | 6 | 藏族智者：智取被领主克扣的青稞/工钱、找回被抢的牛马、戏弄贪心头人、帮穷人过冬、收束（护穷人的智慧） |
| sage-balagencang | 6 | 蒙古族智者：智取被王爷抢的白马、戏弄贪心王爷、帮牧民讨回公道、装傻充愣斗智、收束（草原的笑声与公道） |
| myth-civilization | 7 | 女娲造人（黄土捏人）→燧人钻木取火→有巢构木为巢→神农尝百草→仓颉造字（天雨粟）→伏羲画卦→共工怒触不周山 |
| food-legends | 6 | 饺子（张仲景娇耳驱寒）→汤圆（东方朔与元宵姑娘）→粽子（屈原）→月饼（中秋团圆）→年糕（伍子胥备荒）→腊八粥（腊八缘起） |

## en 书单（8 本；lang=en，category=tale，plan.title 用 "Chapter N" 前缀，sourceRef 注明选章依据）
| id | 章 | ageStage | 底本(PG#) | 选章指引 |
| tales-odin | 14 | 9-12 | 24737 Children of Odin (Colum 1920) | 按原书 Part I-IV 结构取 14 章覆盖主要神祇故事弧（火之获得/芙蕾雅/弗雷/萨迦等），章题 "Chapter N · <主题>" |
| tales-oldpeter | 12 | 6-8 | 16981 Old Peter's Russian Tales (Ransome 1916) | 从原书约 20 则中选 12 则最适合儿童的（含 Baba Yaga 相关、雪姑娘 The Little Daughter of the Snow 等），章题 "Chapter N · <Tale Name>" |
| tales-celtic | 12 | 6-8 | 7885 Celtic Fairy Tales (Jacobs 1892) | 从原书 20 则选 12 则最适合儿童的（含 Connla and the Fairy Maiden, Guleesh, The Field of Boliauns, The Horned Women, Hudden and Dudden and Donald O'Neary 等） |
| tales-jataka | 10 | 6-8 | 62514 Jataka Tales (Babbitt 1912) | 每章一则，选 10 则最适合儿童的 |
| tales-jataka2 | 10 | 6-8 | 7518 More Jataka Tales (1922) | 每章一则，选 10 则最适合儿童的 |
| potter-pie | 5 | 3-5 | 15234 The Tale of the Pie and the Patty-Pan (Potter 1905) | 按原书情节自然分 5 章 |
| arthur-pyle | 14 | 9-12 | 60184 The Story of King Arthur and His Knights (Pyle 1903) | 按原书四部（Arthur I-VIII? 按原书 Part the First~Fourth）取 14 章覆盖主要故事弧 |
| heroes-kingsley | 8 | 9-12 | 677 The Heroes (Kingsley 1856) | Perseus/Argonauts/Theseus 三部按原书结构取 8 章 |

## 收尾要求
- 13+8=21 本全部输出后结束；输出前对每本 JSON.parse 自检。
- 输出行数多不等于质量高：每本 meta.json 保持与金样例相同的紧凑度。
- coverArt: <id 前 16 字母>.<主题关键词>-<2-3 词>，全库唯一；coverArtPrompt 30-60 字中文画面描述（en 书也用中文 prompt）。
- coverFrom/coverTo: 每本不同的十六进制色对（参考金样例风格，深浅搭配）。
- plan beats 每条以动词开头概括该章要点；en 书 sourceRef 字符串注明"从底本选 X 则"。
