import https from 'https';
import http from 'http';
import fs from 'fs';

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

function get(url, cookie){
  return new Promise((res,rej)=>{
    const u = new URL(url);
    const lib = u.protocol==='https:'?https:http;
    const req = lib.get(url, {headers:{'User-Agent':UA, 'Cookie':cookie||'', 'Accept':'text/html'}}, r=>{
      let d=''; r.on('data',c=>d+=c); r.on('end',()=>res({status:r.statusCode||0, body:d, headers:r.headers}));
    });
    req.on('error',rej); req.setTimeout(30000,()=>{req.destroy();rej(new Error('timeout'))});
  });
}

async function search(q){
  const url = "https://www.so.com/s?q=" + encodeURIComponent(q);
  const r = await get(url);
  const items=[];
  const re = /href="(https:\/\/www\.so\.com\/link\?m=[^"]+)"[^>]*>([\s\S]*?)<\/h3>/g;
  let m;
  while((m=re.exec(r.body))){
    const title = m[2].replace(/<[^>]+>/g,'').trim();
    if(title && title.length>=5 && !title.includes('其他人还搜') && !title.includes('相关搜索')) items.push({title, so_link:m[1]});
  }
  const seen=new Set(), out=[];
  for(const it of items){ if(seen.has(it.title)) continue; seen.add(it.title); out.push(it); }
  return out.slice(0,10);
}

async function resolve(link){
  try{
    const r = await get(link);
    let m = r.body.match(/window\.location\.replace\("([^"]+)"\)/) || r.body.match(/URL='([^']+)'/);
    if(m) return m[1];
    return null;
  }catch(e){ return null; }
}

const q = process.argv[2];
(async()=>{
  const items = await search(q);
  console.log(`[${q}] ${items.length} items`);
  for(const it of items){
    const real = await resolve(it.so_link);
    it.url = real || "UNRESOLVED";
    console.log("  -", it.title.slice(0,60), "=>", (it.url||"").slice(0,110));
  }
  const fn = "so_" + q.replace(/[^\w\u4e00-\u9fa5]+/g,'_').slice(0,40) + ".json";
  fs.writeFileSync(fn, JSON.stringify(items,null,1), 'utf8');
  console.log("saved", fn);
})();
