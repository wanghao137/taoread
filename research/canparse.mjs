import fs from 'fs';
const d = JSON.parse(fs.readFileSync('caniuse.json','utf8'));
const keys = Object.keys(d.data).filter(k => k.includes('mediasession') || k.includes('wake') || k.includes('mediasession'));
for (const k of keys) {
  const f = d.data[k];
  console.log('### ' + k + ' | ' + f.title + ' | status=' + f.status);
  const stats = f.stats;
  for (const b of ['ie','chrome','firefox','safari','ios_saf','and_chr','edge','and_ff']) {
    if (stats[b]) {
      const entries = Object.keys(stats[b]);
      const yes = entries.filter(x => stats[b][x].startsWith('y'));
      console.log('   ' + b + ': ' + (yes.length ? 'supported from ' + yes[0] : 'NOT SUPPORTED') + ' | all=' + JSON.stringify(stats[b]));
    }
  }
}
