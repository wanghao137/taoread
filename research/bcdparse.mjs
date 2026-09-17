import fs from 'fs';
function firstVer(v) {
  if (!v) return 'NO';
  if (typeof v === 'string') return 'mirror(' + v + ')';
  const arr = Array.isArray(v) ? v : [v];
  const e = arr.find(x => x.version_added) || arr[0];
  if (!e || !e.version_added) return 'NO';
  return 'v' + e.version_added + (e.partial_implementation ? ' PARTIAL' : '');
}
function flat(o, acc, path) {
  acc = acc || {}; path = path || [];
  for (const k of Object.keys(o)) {
    if (k === '__compat' && o[k].support) {
      const s = o[k].support;
      const row = {};
      for (const b of Object.keys(s)) row[b] = firstVer(s[b]);
      acc[path.join('.')] = row;
    } else if (typeof o[k] === 'object' && o[k] !== null) flat(o[k], acc, path.concat(k));
  }
  return acc;
}
for (const f of process.argv.slice(2)) {
  console.log('##### ' + f);
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  const rows = flat(d);
  for (const k of Object.keys(rows)) {
    const r = rows[k];
    console.log('  ' + k + ' :: chrome=' + (r.chrome || '-') + ' | chr_android=' + (r.chrome_android || '-') + ' | safari=' + (r.safari || '-') + ' | ios=' + (r.safari_ios || '-') + ' | ff=' + (r.firefox || '-'));
  }
}
