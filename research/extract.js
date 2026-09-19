const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:\\codesolo\\taoread\\research\\appdata.json', 'utf8'));

const pick = {
  'vooks|us': ['vooks'],
  'epic reading kids|us': ['epic'],
  'homer learning kids|us': ['homer'],
  'reading eggs|us': ['eggs'],
  'abcmouse|us': ['abcmouse'],
  'speakaboos|us': ['speakaboos'],
  'bookful|us': ['bookful'],
  'skybrary|us': ['skybrary', 'rainbow'],
  'khan academy kids|us': ['khan'],
  '凯叔讲故事|cn': ['凯叔'],
  '喜马拉雅儿童|cn': ['喜马拉雅'],
  '叽里呱啦|cn': ['叽里呱啦'],
  '伴鱼绘本|cn': ['伴鱼'],
  '洪恩识字|cn': ['洪恩'],
  'KaDa故事|cn': ['kada'],
  '口袋故事|cn': ['口袋'],
  '宝宝巴士故事|cn': ['宝宝巴士'],
  '微信读书|cn': ['微信读书'],
  '多看阅读|cn': ['多看'],
  '得到|cn': ['得到'],
  'kindle|us': ['kindle'],
  'google play books|us': ['play books'],
  'apple books|us': ['apple books'],
};

for (const [key, needles] of Object.entries(pick)) {
  const entry = data[key];
  if (!entry) { console.log('MISSING', key); continue; }
  const found = entry.apps.filter(a =>
    needles.some(n => (a.trackName || '').toLowerCase().includes(n.toLowerCase())));
  const list = found.length ? found : entry.apps.slice(0, 3);
  console.log('\n=== ' + key + ' ===');
  for (const a of list.slice(0, 4)) {
    console.log(`  ${a.trackName} | id=${a.trackId} | ${a.sellerName}`);
    console.log(`    rating=${a.averageUserRating} count=${a.userRatingCount} genre=${a.primaryGenreName} ver=${a.version}`);
    console.log(`    url=${a.trackViewUrl}`);
  }
}
