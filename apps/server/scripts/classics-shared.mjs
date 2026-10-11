import { createHash } from 'node:crypto'

export const sha = s => createHash('sha256').update(s).digest('hex')


export const willowsTitles=['河岸','大路','野林','獾先生','甜蜜的家','蟾蜍先生','黎明门口的吹笛人','蟾蜍历险','四海游子','蟾蜍的进一步历险','泪如夏日暴雨','尤利西斯归来']
export const aliceTitles=['掉进兔子洞','泪池','一场会议式赛跑和一个长故事','白兔派来了小比尔','毛毛虫的忠告','猪和胡椒','疯狂的茶会','王后的槌球场','假海龟的故事','龙虾四对舞','谁偷了馅饼？','爱丽丝的证词']
export const ozTitles=['序言','龙卷风','与芒奇金人商谈','多萝西救了稻草人','穿过森林的大路','营救铁皮樵夫','胆小狮','前往伟大的奥兹','致命的罂粟花田','田鼠女王','城门守卫','奇妙的翡翠城','寻找邪恶女巫','救援','飞猴','揭开可怕的奥兹的面纱','大骗子的魔法技艺','气球升起了','去往南方','被会说话的树袭击','精致的瓷器国','狮子成为百兽之王','阔德林人的国度','善良女巫格琳达满足了多萝西的愿望','重回家乡']
export const gardenTitles=['献给艾莉森·坎宁安','夏日就寝','一个念头','在海边','小孩的夜间思绪','孩子的全部本分','雨','海盗的故事','异乡','风起的夜晚','旅行','歌唱','盼望长大','一场好游戏','小船漂向哪里？','姨妈的裙子','被单的国度','睡梦之国','我的影子','奖惩规矩','好孩子','睡前的逃跑','行进曲','奶牛','快乐的念头','风','纪念磨坊','好孩子和坏孩子','异国的孩子','太阳的旅程','点灯人','我的床是一条船','月亮','秋千','该起床了','镜子般的河流','仙子的面包','从火车车厢望出去','冬日','干草阁楼','告别农场','西北航道','看不见的玩伴','我的船和我','我的王国','冬日里的图画书','我的宝贝','积木城','故事书的国度','火中的军队','小小国度','白昼与黑夜','窝里的鸟蛋','花朵','夏日的太阳','沉默的士兵','秋日的篝火','园丁','历史的联想','献给威利和亨丽埃塔','献给我的母亲','献给姨妈','献给明妮','献给与我同名的孩子','献给所有读者']
export const nilsTitles=['男孩','来自凯布讷山的阿卡','野鸟的生活','格利明古堡','库拉山上的鹤群大会','雨天','三级阶梯','龙讷比河边','卡尔斯克鲁纳','前往厄兰岛','厄兰岛南端','大蝴蝶','小卡尔斯岛','两座城市','斯莫兰的故事','乌鸦','老农妇','从塔贝里到胡斯克瓦纳','大鸟湖','预言','粗呢布','卡尔和灰皮的故事','美丽的乐园','在奈尔克','冰雪消融','分割遗产','在贝里斯拉根','钢铁厂','达尔河','兄弟的那一份','瓦尔普吉斯之夜','教堂旁','洪水','乌普兰的故事','在乌普萨拉','邓芬','斯德哥尔摩','老鹰高尔果','飞越耶斯特里克兰','在海尔辛兰的一天','在梅德尔帕德','翁厄曼兰的清晨','西博滕和拉普兰','放鹅姑娘奥萨和小马茨','在拉普人那里','向南！向南！','海里耶达伦的传说','韦姆兰和达尔斯兰','小庄园','礁岛上的宝藏','海上的银子','大庄园','前往韦门赫格','在豪尔耶·尼尔松家','告别大雁']
export const princeTitles=['献词',...['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四','二十五','二十六','二十七'].map(n=>`第${n}章`)]

export function completeTranslationTitle(job,t) {
  // Curated original chapter titles are metadata, independent of full-body
  // coverage. Never discard intact translated paragraphs for a missing title.
  const titles={'zh-classic-willows':willowsTitles,'zh-classic-alice':aliceTitles,'zh-classic-oz':ozTitles,'zh-classic-garden':gardenTitles,'zh-classic-nils':nilsTitles,'zh-classic-prince':princeTitles}[job.bookId]
  if(titles && typeof t==='object' && t!==null) {
    t.title=titles[job.chapter-1]??t.title
  }
  return t
}

export function splitChapter(book, ch) {
  let current=[],size=0,part=0
  const jobs=[]
  const flush=()=>{
    if(!current.length)return
    jobs.push({bookId:book.id,bookTitle:book.title,lang:book.sourceLang,title:ch.title,chapter:ch.order,part:++part,paragraphs:current,poem:book.id.endsWith('garden')})
    current=[];size=0
  }
  for(const p of ch.paragraphs){if(size+p.text.length>6500)flush();current.push(p);size+=p.text.length}
  flush()
  return jobs
}

export function untranslatedLatinParagraphIds(t) {
  return (t?.paragraphs||[]).filter(p=>{
    const words=typeof p.zh==='string'?(p.zh.replace(/[（(][^()（）]*[）)]/g,'').match(/[A-Za-z]{3,}/g)||[]):[]
    return words.some(word=>!(/^[IVXLCDM]+$/.test(word)))
  }).map(p=>p.id)
}

export function validateTranslation(job,t) {
  if(!Array.isArray(t?.paragraphs)||t.paragraphs.length!==job.paragraphs.length)throw Error('Paragraph count mismatch')
  for(const [i,p] of t.paragraphs.entries()){
    if(p.id!==job.paragraphs[i].id||typeof p.zh!=='string'||!p.zh.trim())throw Error('Paragraph identity mismatch')
    const source=job.paragraphs[i].text
    const han=(p.zh.match(/\p{Script=Han}/gu)||[]).length
    // One-character answers, numbered stanzas and breaks are legitimate.
    const needsChinese=/\p{Letter}/u.test(source)
    if((needsChinese&&han<(source.length<10?1:2))||p.zh.length<source.length*0.12)throw Error('Suspiciously short translation')
    if(/作为(?:一[个名])?(?:AI|人工智能|语言模型)|以下是.*翻译|待补充|内容略|此处省略/.test(p.zh))throw Error('Translation contains placeholder')
    if(/```|[}\]]{3,}["']?\s*$|["'](?:paragraphs|correctedZh|problems|sourceSha256)["']\s*:/.test(p.zh))throw Error('Translation contains output markup')
    if(job.poem && source.includes('\n') && !p.zh.includes('\n'))throw Error('Poem stanza lost line breaks')
    // An original name/sign may accompany its Chinese translation in brackets.
    // Ordinary untranslated words in narration must not pass an AI review tag.
    if(untranslatedLatinParagraphIds({paragraphs:[p]}).length)throw Error('Untranslated Latin word in Chinese narration')
  }
  if(typeof t.title!=='string'||!t.title.trim())throw Error('Missing Chinese title')
  if(typeof t.scene!=='string'||t.scene.length<20)throw Error('Missing scene description')
}
