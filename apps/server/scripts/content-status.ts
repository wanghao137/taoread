import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

// Deployment-side operation only; never expose global catalog editing to a family token.
const [id, status] = process.argv.slice(2)
if (!id || !status || !['draft', 'validated', 'reviewed', 'published', 'withdrawn'].includes(status)) {
  throw new Error('Usage: tsx scripts/content-status.ts BOOK_ID STATUS')
}
const db = new PrismaClient()
try {
  const book = await db.book.findUniqueOrThrow({ where: { id } })
  const evidencePath = process.argv.find((s) => s.startsWith('--review-evidence='))?.slice(18)
  let reviewEvidence: string | undefined
  if (evidencePath) {
    const bytes = readFileSync(evidencePath)
    const evidence = JSON.parse(bytes.toString('utf8')) as { bookId?: string; contentVersion?: string; reviewer?: string; approved?: boolean }
    if (evidence.bookId !== id || evidence.contentVersion !== book.contentVersion || !evidence.reviewer || evidence.approved !== true) throw new Error('Review evidence must name this book, current version and human reviewer with explicit approval')
    reviewEvidence = createHash('sha256').update(bytes).digest('hex')
  }
  if ((status === 'reviewed' || status === 'published') && book.reviewStatus !== 'reviewed' && !reviewEvidence) {
    throw new Error('Publishing a new review requires an explicit recorded human review; use existing published legacy content without claiming review.')
  }
  const changed = await db.book.updateMany({ where: { id, contentVersion: book.contentVersion, reviewStatus: book.reviewStatus }, data: { publicationStatus: status, ...(reviewEvidence ? { reviewStatus: 'reviewed', reviewEvidence } : {}) } })
  if (changed.count !== 1) throw new Error('Content changed during review; reload and review the current version')
  console.log(`Updated ${id} to ${status}. Restart API to immediately invalidate catalog caches.`)
} finally { await db.$disconnect() }
