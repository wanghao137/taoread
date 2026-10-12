import { createHash } from 'node:crypto'
import { songSpringPacks } from './packs/poetry-song-spring'
// Curated editions only. Publication and exact text/pinyin/translation are rechecked at request time.
export const DAILY_POEM_POOL = [
  {
    "bookId": "tangshi-300",
    "order": 1,
    "title": "静夜思 · 李白",
    "minStage": "3-5",
    "signature": "01d7a00207d43357cfc2d9e19619bbfafe86c8455024f869cb6371b8cc7b0877"
  },
  {
    "bookId": "tangshi-300",
    "order": 2,
    "title": "春晓 · 孟浩然",
    "minStage": "3-5",
    "signature": "3fdbe4d30c712f1eb9746cd8610aa8f6c308321cd6d4c8d8edb9a3b27f6beb81"
  },
  {
    "bookId": "tangshi-300",
    "order": 3,
    "title": "登鹳雀楼 · 王之涣",
    "minStage": "3-5",
    "signature": "cf9ac91db8ffbf63d461bbb611d21526f3a5f8187d029c783af155ca2c5ebf38"
  },
  {
    "bookId": "tangshi-300",
    "order": 20,
    "title": "江雪 · 柳宗元",
    "minStage": "6-8",
    "signature": "58a7980620967ef3e8f3ef4f68309c65c3e394e43e63b7ed5810884169769876"
  },
  {
    "bookId": "poetry-scenery",
    "order": 3,
    "title": "小池 · 杨万里",
    "minStage": "3-5",
    "signature": "225c595d97aa73a1b2b5d306cf8df2784ab206e2d5e246128f6538ad2e310395"
  },
  {
    "bookId": "poetry-scenery",
    "order": 5,
    "title": "山行 · 杜牧",
    "minStage": "6-8",
    "signature": "a2a17f2a466abf46de867c247473cece845b76ab9c7d0c4966c03d496ab74f0d"
  },
  {
    "bookId": "dufu-spring",
    "order": 1,
    "title": "绝句 · 杜甫",
    "minStage": "6-8",
    "signature": "cae6184e128e5616d571eb625455a85c1229028107b6ca60d57559707eaf7b03"
  },
  {
    "bookId": "tangshi-300",
    "order": 40,
    "title": "早发白帝城 · 李白",
    "minStage": "6-8",
    "signature": "1d2147a61ededc1bd6a5414eb008bb7a6a3cbeba67bb8da0bb263e28cd293e67"
  },
  {
    "bookId": "libai-moon",
    "order": 2,
    "title": "望天门山 · 李白",
    "minStage": "6-8",
    "signature": "e05c822b4d9a2dee3a6eff7f329a1e481b27417f8d1db8637c22313114ac99ae"
  },
  {
    "bookId": "tangshi-300",
    "order": 8,
    "title": "鹿柴 · 王维",
    "minStage": "6-8",
    "signature": "30565b08a88debf047bcaf38a63d94deef7bde42c9f0920e3b84c03ebfbff35a"
  },
  {
    "bookId": "tangshi-300",
    "order": 9,
    "title": "竹里馆 · 王维",
    "minStage": "6-8",
    "signature": "be117dc152e3b0589b0299b1bc0ad3425e5aa168f386799a06caa011c04cb63a"
  },
  {
    "bookId": "tangshi-300",
    "order": 6,
    "title": "相思 · 王维",
    "minStage": "6-8",
    "signature": "124196d939eb60a34cf166c3bcc77dca05b0ac75b6b4d3d0ec9d7ee31cd1f2c2"
  },
  {
    "bookId": "poetry-qianjia",
    "order": 147,
    "title": "送元二使安西 · 王维",
    "minStage": "6-8",
    "signature": "dd47757a2027e6b05cfb6237db9617876c3d81e3bad0d992cbe8c6b5f42963d3"
  },
  {
    "bookId": "tangshi-300",
    "order": 33,
    "title": "九月九日忆山东兄弟 · 王维",
    "minStage": "6-8",
    "signature": "347275706b90287f21fb14c04992935f30351408c01ee647b1abaeecf93d5fd1"
  },
  {
    "bookId": "tangshi-300",
    "order": 95,
    "title": "赋得古原草送别 · 白居易",
    "minStage": "6-8",
    "signature": "2aefc5f658c407513ec6f3aabf6a3345e22def167b939271e46007164d0e0335"
  },
  {
    "bookId": "tangshi-300",
    "order": 68,
    "title": "枫桥夜泊 · 张继",
    "minStage": "6-8",
    "signature": "dc5b1b06e1438a8263a0c73e620099b0351e4b3fee0a822fb7d2067c4b8d0b9f"
  },
  {
    "bookId": "tangshi-300",
    "order": 313,
    "title": "游子吟 · 孟郊",
    "minStage": "6-8",
    "signature": "beeea5e2187d1eea2cb2faacff8a2e654ab5eb973df09a6d74184a0237da7210"
  },
  {
    "bookId": "poetry-scenery",
    "order": 1,
    "title": "咏柳 · 贺知章",
    "minStage": "3-5",
    "signature": "42a24aa3aa0fa80133c6ba882d250d4dd0cfb7e390ece7ae767de201389f13af"
  },
  {
    "bookId": "poetry-scenery",
    "order": 4,
    "title": "晓出净慈寺送林子方 · 杨万里",
    "minStage": "6-8",
    "signature": "3898f0795ceafcf8371d6e35f1d017cf1c780449ef5b2dac1bd871240b074d7e"
  },
  {
    "bookId": "tongqu-animals",
    "order": 1,
    "title": "所见 · 袁枚",
    "minStage": "3-5",
    "signature": "5e3ddf7bd8d0f26566d628507838c48aac12380da18b82cab7a1a39f0e758c9d"
  },
  {
    "bookId": "tongqu-animals",
    "order": 2,
    "title": "池上 · 白居易",
    "minStage": "3-5",
    "signature": "c4fcba2142c88335f8d1d327039df06fe4f1a70ef012a41a0e9bc097f479667a"
  },
  {
    "bookId": "tongqu-animals",
    "order": 3,
    "title": "小儿垂钓 · 胡令能",
    "minStage": "6-8",
    "signature": "472eeb64d429186ddb0fb4cb32f99e8df9ae2d3f22cb0551d8f40a67a61bb501"
  },
  {
    "bookId": "tongqu-animals",
    "order": 4,
    "title": "舟过安仁 · 杨万里",
    "minStage": "6-8",
    "signature": "cd8fed94d9a5dfa252cd216a58827a609eb939d8e4fb06b551ddb8c865f892fa"
  },
  {
    "bookId": "tongqu-animals",
    "order": 5,
    "title": "宿新市徐公店 · 杨万里",
    "minStage": "6-8",
    "signature": "48d7308c51f6bcf3ee2562ecb03af20c69eaf8ab8e03e2877f8e9a6a9d95f090"
  },
  {
    "bookId": "tongqu-animals",
    "order": 6,
    "title": "村居 · 高鼎",
    "minStage": "3-5",
    "signature": "6af2b0267c7f58d2c082a18a52cebd4fc9a362477bd957b791ad5d24c7b40d0c"
  },
  {
    "bookId": "tangshi-300",
    "order": 24,
    "title": "寻隐者不遇 · 贾岛",
    "minStage": "3-5",
    "signature": "dd6d108d2a7f5471bf6ca05a68bdbf6bf2f5fa16ca60d06e3f68c223eeeef832"
  },
  {
    "bookId": "poetry-qianjia",
    "order": 30,
    "title": "秋浦歌 · 李白",
    "minStage": "6-8",
    "signature": "f2fc0d4c850592dd2019185851475a95ae438f0a7179d6ca08f020687696fb5d"
  },
  {
    "bookId": "tangshi-300",
    "order": 18,
    "title": "宿建德江 · 孟浩然",
    "minStage": "6-8",
    "signature": "ca8a2bdc3154c71daaa34119f300d11bddbcfa249de4a7f411bef091f99d6b95"
  },
  {
    "bookId": "poetry-qianjia",
    "order": 158,
    "title": "饮湖上初晴后雨 · 苏轼",
    "minStage": "6-8",
    "signature": "7b12df7a851251cfdce2df8e9dd88fdfd8bb94e5009854ebaf29760114e294f0"
  },
  ...songSpringPacks.flatMap(pack => pack.chapters.map((chapter, i) => ({
    bookId: pack.id, order: i + 1, title: chapter.title, minStage: pack.ageStage,
    signature: createHash('sha256').update(JSON.stringify(chapter.blocks.filter(b => b.kind === 'poem').map(b => ({
      text: b.text, pinyin: b.pinyin || '', translation: b.translation || '',
    })))).digest('hex'),
  })))
] as const
