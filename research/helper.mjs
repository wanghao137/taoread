import fs from 'fs';
const files = process.argv.slice(2);
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(f, 'utf8'));
    console.log('##### ' + f + ' (' + (d.length || 0) + ')');
    for (const it of (Array.isArray(d) ? d : [])) {
      console.log('- ' + (it.title || '').replace(/\s+/g, ' ').slice(0, 75) + ' | ' + (it.url || '').slice(0, 110));
    }
  } catch (e) { console.log('##### ' + f + ' ERR ' + e.message); }
}
