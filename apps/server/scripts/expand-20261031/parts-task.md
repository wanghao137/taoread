# parts JSON 写作任务（找故事第四轮 2026-10-31）

## 输出位置
scripts/expand-20261031/<id>/parts/part-1.json（超过 10 章的大书可再写 part-2.json；章题顺序必须与 meta.json plan 一致）

## 章对象格式（逐字段照抄）
```json
{
  "title": "Chapter 6 · The Crow and the Pitcher",
  "art": "aes-crow-pitcher",
  "artPrompt": "a black crow standing beside a tall clay pitcher on a garden path, dropping a small pebble into it, warm summer light under a leafy fig tree, storybook illustration",
  "blocks": [
    {
      "kind": "text",
      "text": "One hot summer day, a crow was very thirsty. He flew from pond to stream to well, and found them all dried up in the heat. At last he came to a quiet garden and saw a tall clay pitcher under a fig tree. It looked cool and old, and the crow fluttered down and peeped inside. His throat was as dry as a stone, and his wings were tired with flying all day. The garden was very still, and the afternoon was burning hot."
    },
    {
      "kind": "note",
      "text": "New word: pitcher — a tall clay jar with a small mouth, for holding water or juice.…",
      "art": "lamp-hint"
    },
    {
      "kind": "text",
      "text": "There was water at the bottom, but only a little of it. The crow put his beak down as far as it would go, and still the water was out of reach. He tipped the pitcher this way and that, but it was far too heavy to lift. He pushed and he pulled, but the jar would not fall. He even tried to scoop the water out, but he had nothing to scoop it with. The poor crow sat down beside it in the shade, thirstier than ever."
    },
    {
      "kind": "image",
      "art": "aes-crow-pitcher",
      "text": "The thirsty crow peeps into the tall pitcher and sees the water far below."
    },
    {
      "kind": "text",
      "text": "Then he stopped flapping and began to think. All round the pitcher, little pebbles lay on the garden path, smooth and dry. The crow picked one up in his beak and dropped it into the pitcher. Plip! He picked up another, and another. Plip, plip, plip, all through the sunny afternoon, till his wings ached with working."
    },
    {
      "kind": "text",
      "text": "With every pebble, the water rose a little higher in the jar. The crow watched it climb, and he worked harder than ever, pebble after pebble. At last the water came right up to the top. Then the clever bird put in his beak and drank his fill, cool and sweet. He had saved himself by thinking, and nobody had helped him at all. And off he flew, feeling smarter than any crow in the whole wide garden."
    },
    {
      "kind": "note",
      "text": "Moral: Little by little does the trick. When one way fails, think of another.…",
      "art": "lamp-hint"
    }
  ]
}
```

## 硬契约（组装器逐章校验，不过不落盘）
1. 章题与 meta.json plan[i].title **逐字一致**（zh），en 书以 "Chapter N ·" 开头（en 章题自拟主题词）。
2. 每章 blocks 3-9 个：**恰 1 个 image**（art=本章场景键）、1-2 个 note（art=lamp-hint）、其余 text（≥2）。
3. text 块合计长度：zh ≥140 字（推荐 260-450）、en ≥180 words（推荐 300-500）。句长 zh≤20 字、en≤20 words，叙述匀称适合朗读。
4. image 块 text=图注一句话；note 块 text=给小读者的新词/小知识（40-90 字，不要剧透下章）。
5. 场景键 art：短横线小写英文（如 hailibu-saves-snake），每章一个；image 块 art 必须与章 art 相同。
6. zh 对话用「」；en 对话用直引号（JSON 内正确转义）。
7. 忠于流传情节/底本情节，不发明不拼凑；不出现 emoji、"作者按"、现代口语。
8. parts 文件顶层是 { "chapters": [...] }；多个 part 文件按文件名字典序拼接。

## 交付纪律（docs/86 口径）
- 逐本完成即落盘 parts，**落盘即成果有效**，不必等全部完成。
- 只写 JSON 文件，不做其他任何操作（不 seed、不 git、不装依赖、不改 meta.json）。
- 写完每本用 node JSON.parse 自检该文件，并核对章数与 meta.target 一致。
