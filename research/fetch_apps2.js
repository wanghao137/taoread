const fs = require('fs');
const https = require('https');

const OUT = 'D:\\codesolo\\taoread\\research\\appdata2.json';

const QUERIES = [
  ["wurrly speakaboos", "us"],
  ["speakaboos kids books", "us"],
  ["bookful augmented reality books", "us"],
  ["bookful", "us"],
  ["abcmouse.com early learning academy", "us"],
  ["vooks", "cn"],
];

function fetch(term, country) {
  const url = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) +
    '&entity=software&limit=10&country=' + country;
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
  const results = {};
  for (const [term, country] of QUERIES) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await fetch(term, country);
        results[term + '|' + country] = {
          resultCount: data.resultCount,
          apps: (data.results || []).map(a => ({
            trackName: a.trackName, trackId: a.trackId, sellerName: a.sellerName,
            averageUserRating: a.averageUserRating, userRatingCount: a.userRatingCount,
            primaryGenreName: a.primaryGenreName, version: a.version,
            trackViewUrl: a.trackViewUrl,
            description: (a.description || '').slice(0, 200),
          })),
        };
        console.log('OK ', term);
        break;
      } catch (e) { await new Promise(r => setTimeout(r, 3000)); }
    }
    await new Promise(r => setTimeout(r, 1200));
  }
  fs.writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8');
  console.log('saved');
})();
