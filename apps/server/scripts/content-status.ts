import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'
import { changeReview, reviewInput } from '../src/content/review'

// Explicit deployment-side operation; family tokens cannot edit the shared catalog.
const [id, status] = process.argv.slice(2)
const evidencePath = process.argv.find(s => s.startsWith('--review-evidence='))?.slice(18)
if (!id || !status || !evidencePath) throw new Error('Usage: tsx scripts/content-status.ts BOOK_ID STATUS --review-evidence=FILE')
const db = new PrismaClient()
try {
  const raw = JSON.parse(readFileSync(evidencePath, 'utf8'))
  if (raw.bookId !== id) throw new Error('Review evidence must identify this book')
  const input = reviewInput.parse({ version: raw.contentVersion, publicationStatus: status, reviewer: raw.reviewer, evidence: raw })
  await changeReview(db, id, input)
  console.log('State and version-bound review history saved; restart API to invalidate catalog cache.')
} finally { await db.$disconnect() }
