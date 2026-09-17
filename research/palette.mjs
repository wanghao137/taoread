import sharp from 'sharp';
import fs from 'fs';
const files = process.argv.slice(2);
const quant = (c)=>{ const r=(c[0]>>5)<<5, g=(c[1]>>5)<<5, b=(c[2]>>5)<<5; return `${r},${g},${b}`; };
(async()=>{
  for(const f of files){
    if(!fs.existsSync(f)){ console.log('MISS',f); continue; }
    const data = await sharp(f).resize(120,240,{fit:'fill'}).removeAlpha().raw().toBuffer();
    const counts={}; let n=0, bright=0, satsum=0;
    for(let i=0;i<data.length;i+=3){
      const r=data[i],g=data[i+1],b=data[i+2];
      const mx=Math.max(r,g,b), mn=Math.min(r,g,b);
      const sat = mx===0?0:(mx-mn)/mx;
      satsum+=sat; n++;
      if(mx>150) bright++;
      const k=quant([r,g,b]);
      counts[k]=(counts[k]||0)+1;
    }
    const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6)
      .map(([k,v])=>{const [r,g,b]=k.split(',').map(Number);return `#${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}(${(100*v/n).toFixed(1)}%)`});
    console.log(f.split('/').pop(), '| bright%', (100*bright/n).toFixed(0), '| avgSat', (satsum/n).toFixed(2), '|', top.join(' '));
  }
})();
