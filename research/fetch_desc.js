const fs = require('fs');
const https = require('https');

const OUT = 'D:\\codesolo\\taoread\\research\\appdesc.json';

// trackId -> label
const IDS = {
  1435813450: 'Vooks',
  719219382: 'Epic',
  601437586: 'HOMER',
  726696040: 'Reading Eggs',
  6460300848: 'ABCmouse',
  512350210: 'Skybrary',
  1378467217: 'Khan Academy Kids',
  998790080: '凯叔讲故事',
  1436675436: '喜马拉雅儿童',
  928864273: '叽里呱啦',
  1203189645: '伴鱼绘本',
  1139733348: '洪恩识字',
  990142347: 'KaDa阅读',
  560449213: '口袋故事',
  1444995576: '小布咕(宝宝巴士故事)',
  1031121586: '宝宝巴士',
  952059546: '微信读书',
  517850153: '多看',
  1016323413: '得到',
  302584613: 'Kindle',
  400989007: 'Google Play Books',
  364709193: 'Apple Books',
};

function lookup(id, country) {
  const url = `https://itunes.apple.com/lookup?id=${id}&country=${country}`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 25000 }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

(async () => {
  const out = {};
  for (const [id, label] of Object.entries(IDS)) {
    const country = label.match(/[一-龥]/) ? 'cn' : 'us';
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await lookup(id, country);
        const a = (data.results || [])[0];
        if (a) {
          out[label] = {
            trackName: a.trackName, sellerName: a.sellerName,
            averageUserRating: a.averageUserRating, userRatingCount: a.userRatingCount,
            version: a.version, currentVersionReleaseDate: a.currentVersionReleaseDate,
            fileSizeBytes: a.fileSizeBytes,
            description: a.description,
            releaseNotes: (a.releaseNotes || '').slice(0, 500),
            screenshotUrls: (a.screenshotUrls || []).slice(0, 3),
            ipadScreenshotUrls: (a.ipadScreenshotUrls || []).slice(0, 3),
            artworkUrl512: a.artworkUrl512,
            trackViewUrl: a.trackViewUrl,
          };
          console.log('OK ', label);
        } else {
          console.log('EMPTY', label);
        }
        break;
      } catch (e) { await new Promise(r => setTimeout(r, 3000)); }
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
  console.log('saved');
})();
