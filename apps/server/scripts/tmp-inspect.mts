import { PrismaClient } from '@prisma/client'
import { readdirSync } from 'node:fs'

const file = readdirSync('./prisma').find((f) => f.startsWith('e2e-run-'))
const db = new PrismaClient({ datasources: { db: { url: `file:./${file}` } } })

async function main(): Promise<void> {
  const fam = await db.family.findUnique({ where: { code: 'PEACH888' } })
  if (!fam) {
    console.log('演示家庭不存在于该库')
    return
  }
  const sessions = await db.cosession.findMany({
    where: { familyId: fam.id },
    select: { childId: true, startedAt: true, endedAt: true, bookId: true, paperTitle: true },
  })
  const active = sessions.filter((s) => s.endedAt === null)
  console.log(`总场次: ${sessions.length}，active: ${active.length}`)
  for (const a of active) console.log('ACTIVE:', JSON.stringify(a))
  const kids = await db.childProfile.findMany({ where: { familyId: fam.id } })
  console.log('孩子:', kids.map((k) => k.nickname).join(', '))
}

main()
  .then(() => db.$disconnect())
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
