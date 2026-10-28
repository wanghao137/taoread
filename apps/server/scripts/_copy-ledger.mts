import { createDb } from '../src/lib/db'
import { PrismaClient } from '@prisma/client'

const dev = createDb('file:D:/codesolo/taoread/apps/server/prisma/dev.db')
const prod = new PrismaClient({ datasources: { db: { url: 'file:D:/taoread-prod/apps/server/prod.db' } } })

const scenes = [
  'cover:liweng-yun', 'cover:idiom-stories',
  ...Array.from({ length: 30 }, (_, i) => `liweng-yun:ch${i + 1}`),
  ...Array.from({ length: 30 }, (_, i) => `idiom-stories:ch${i + 1}`),
]
let n = 0
for (const scene of scenes) {
  const row = await dev.artAsset.findUnique({ where: { scene } })
  if (!row) { console.log('dev missing:', scene); continue }
  await prod.artAsset.upsert({
    where: { scene },
    create: { scene: row.scene, kind: row.kind, urlPath: row.urlPath, width: row.width, height: row.height, bytes: row.bytes, prompt: row.prompt, model: row.model },
    update: { urlPath: row.urlPath, width: row.width, height: row.height, bytes: row.bytes, prompt: row.prompt, model: row.model },
  })
  n++
}
console.log(`ledger rows copied: ${n}/${scenes.length}`)
await dev.$disconnect()
await prod.$disconnect()
