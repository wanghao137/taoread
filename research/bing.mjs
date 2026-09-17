import https from 'https';
import fs from 'fs';
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
function get(url){return new Promise((res,rej)=>{const req=https.get(url,{headers:{'User-Agent':UA,'Accept':'text/html'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res({status:r.statusCode,body:d}))});req.on('error',rej);req.setTimeout(25000,()=>{req.destroy();rej(new Error('timeout'))});})}
async function search(q,n){
  n=n||10;
  const r=await get("https://cn.bing.com/search?q="+encodeURIComponent(q)+"&setlang=en-US&cc=US");
  const items=[];
  const re=/<h2[^>]*><a [^>]*href="(https?:[^"]+)"[^>]*>([\s\S]*?)<\/a><\/h2>/g;
  let m;
  while((m=re.exec(r.body))){const t=m[2].replace(/<[^>]+>/g,'').trim();if(t&&t.length>8)items.push({title:t,url:m[1]})}
  const seen=new Set(),out=[];
  for(const it of items){if(seen.has(it.url))continue;seen.add(it.url);out.push(it);if(out.length>=n)break}
  return out;
}
const q=process.argv[2];const n=parseInt(process.argv[3]||'10');
(async()=>{
  const items=await search(q,n);
  console.log('['+q+'] '+items.length+' items');
  for(const it of items)console.log('- '+it.title.slice(0,80)+' | '+it.url.slice(0,130));
  const fn='b_'+q.replace(/[^\w\u4e00-\u9fa5]+/g,'_').slice(0,50)+'.json';
  fs.writeFileSync(fn,JSON.stringify(items,null,1));
  console.log('saved',fn);
})();
