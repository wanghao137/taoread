import 'dotenv/config'
import { loadConfig, imageGenAvailable } from '../src/config'
import { ImageGenerator } from '../src/modules/media/imagegen'
import { join } from 'node:path'
async function main() {
  const config = loadConfig()
  if (!imageGenAvailable(config)) { console.error('未配置生图'); process.exit(1) }
  const gen = new ImageGenerator({
    base: config.TAO_IMAGE_BASE!, apiKey: config.TAO_IMAGE_KEY!, model: config.TAO_IMAGE_MODEL,
  }, join(process.cwd(), 'media'))
  const cases = [
    { scene: 'cmp-school-new', desc: '一幅古代学堂场景：木质书桌上摊开一卷三字经竹简，旁边放着毛笔和砚台，窗外是桃花和远山，温暖的自然光洒进来' },
    { scene: 'cmp-monkey-new', desc: '一只可爱的小石猴站在花果山顶的巨石上，身穿虎皮小裙，背后是云海和仙山瀑布，桃树开着粉色的花，天空是黄昏的暖橙色' },
  ]
  for (const c of cases) {
    console.log(`生成新版 ${c.scene} …`)
    const r = await gen.generate({ kind: 'cover', scene: c.scene, description: c.desc, label: '对比新版', lang: 'zh' })
    console.log('  →', r ? r.urlPath : '失败', '| prompt:', r ? r.prompt.slice(-120) : '')
  }
}
main().catch(e => { console.error(e); process.exit(1) })
