import 'dotenv/config'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PrismaClient } from '@prisma/client'
import { generateFamilyCode } from '../src/lib/auth'

/**
 * A1（交接文档 F01/F04）：旧家庭家长身份找回。
 *
 * 背景：家长码上线前的旧家庭 parentCode=null，且旧令牌（无 sid）已全部失效，
 * 仅凭家庭码只能以孩子身份加入——家长被锁在设置/周报/屏蔽等家长能力之外。
 * 服务端懒生成只在已有家长会话访问时触发，救不了已锁死的家庭。
 *
 * 本脚本由运营者（机器主人）在本地执行：为 parentCode=null 的家庭补生成家长码，
 * 并把「家庭码 → 家长码」对照表写入本地文件（含敏感凭据，已加入 .gitignore），
 * 由运营者线下把家长码交给对应家庭。默认 dry-run，--apply 才写库。
 *
 * 用法：
 *   npx tsx scripts/backfill-parent-codes.ts           # 只看不改
 *   npx tsx scripts/backfill-parent-codes.ts --apply   # 写库并输出对照表
 */
async function main(): Promise<void> {
  const apply = process.argv.includes('--apply')
  const db = new PrismaClient()
  try {
    const pending = await db.family.findMany({
      where: { parentCode: null },
      select: { id: true, code: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    })
    console.log(`发现 ${pending.length} 个没有家长码的旧家庭（${apply ? 'APPLY：将写库' : 'DRY-RUN：不写库'}）`)
    if (pending.length === 0) return
    const report: Array<{ familyId: string; familyCode: string; parentCode: string; createdAt: string }> = []
    for (const family of pending) {
      for (let attempt = 0; ; attempt++) {
        const parentCode = generateFamilyCode()
        try {
          if (apply) {
            await db.family.update({ where: { id: family.id }, data: { parentCode } })
          }
          report.push({ familyId: family.id, familyCode: family.code, parentCode, createdAt: family.createdAt.toISOString() })
          console.log(`  家庭 ${family.code} → 新家长码 ${parentCode}`)
          break
        } catch (err) {
          const isUniqueViolation =
            typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === 'P2002'
          if (!isUniqueViolation || attempt >= 4) throw err
        }
      }
    }
    const outPath = join(process.cwd(), 'prisma', 'parent-code-backfill.json')
    writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), applied: apply, families: report }, null, 2), 'utf8')
    console.log(`对照表已写入 ${outPath}（敏感，勿提交/勿外传）`)
    if (!apply) console.log('确认无误后加 --apply 重新执行以写库。')
  } finally {
    await db.$disconnect()
  }
}

main().catch((err) => {
  console.error('回填失败：', err)
  process.exit(1)
})
