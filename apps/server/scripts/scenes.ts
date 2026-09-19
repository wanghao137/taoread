import { createDb } from '../src/lib/db'
async function main() {
  const db = createDb('file:./demo.db')
  const arts = await db.artAsset.findMany({ take: 5, select: { scene: true, kind: true, urlPath: true } })
  console.log('art scenes:', JSON.stringify(arts, null, 1))
  const vids = await db.videoAsset.findMany({ take: 5, select: { scene: true, kind: true, urlPath: true, status: true } })
  console.log('video scenes:', JSON.stringify(vids, null, 1))
  await db.$disconnect()
}
main()
