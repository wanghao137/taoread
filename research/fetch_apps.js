const fs = require('fs');
const https = require('https');

const OUT = 'D:\\codesolo\\taoread\\research\\appdata.json';

const QUERIES = [
  ["vooks", "us", "intl_kids"],
  ["epic reading kids", "us", "intl_kids"],
  ["homer learning kids", "us", "intl_kids"],
  ["reading eggs", "us", "intl_kids"],
  ["abcmouse", "us", "intl_kids"],
  ["speakaboos", "us", "intl_kids"],
  ["bookful", "us", "intl_kids"],
  ["skybrary", "us", "intl_kids"],
  ["khan academy kids", "us", "intl_kids"],
  ["凯叔讲故事", "cn", "cn_kids"],
  ["喜马拉雅儿童", "cn", "cn_kids"],
  ["叽里呱啦", "cn", "cn_kids"],
  ["伴鱼绘本", "cn", "cn_kids"],
  ["洪恩识字", "cn", "cn_kids"],
  ["KaDa故事", "cn", "cn_kids"],
  ["口袋故事", "cn", "cn_kids"],
  ["宝宝巴士故事", "cn", "cn_kids"],
  ["微信读书", "cn", "adult"],
  ["多看阅读", "cn", "adult"],
  ["得到", "cn", "adult"],
  ["kindle", "us", "adult"],
  ["google play books", "us", "adult"],
  ["apple books", "us", "adult"],
];

function fetch(term, country) {
  const url = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) +
    '&entity=software&limit=8&country=' + country;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 25000 }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

(async () => {
  const results = {};
  for (const [term, country, grp] of QUERIES) {
    const key = term + '|' + country;
    let ok = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await fetch(term, country);
        results[key] = {
          group: grp, country, resultCount: data.resultCount,
          apps: (data.results || []).map(a => ({
            trackName: a.trackName, trackId: a.trackId, bundleId: a.bundleId,
            sellerName: a.sellerName, averageUserRating: a.averageUserRating,
            userRatingCount: a.userRatingCount, primaryGenreName: a.primaryGenreName,
            version: a.version, currentVersionReleaseDate: a.currentVersionReleaseDate,
            description: (a.description || '').slice(0, 300),
            trackViewUrl: a.trackViewUrl,
            screenshotUrls: (a.screenshotUrls || []).slice(0, 6),
          })),
        };
        ok = true;
        console.log('OK ', key, '->', results[key].resultCount);
        break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    if (!ok) console.log('FAIL', key);
    await new Promise(r => setTimeout(r, 1200));
  }
  fs.writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8');
  console.log('saved', OUT);
})();
