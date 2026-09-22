// Run from repo root: node --import tsx docs/audit-2026-09-22/evidence/probe.mjs
// Isolated SQLite; synthetic data; provider fetch is stubbed; no production writes.
import { mkdtempSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { buildApp } from '../../../apps/server/src/app.ts'
import { createDb } from '../../../apps/server/src/lib/db.ts'
import { deriveTokenSecret } from '../../../apps/server/src/lib/auth.ts'
import { seedAllPacks, seedPack } from '../../../apps/server/src/content/seed.ts'
import { ALL_PACKS } from '../../../apps/server/src/content/packs/index.ts'
import { seedDemoFamily } from '../../../apps/server/src/demo/seed.ts'
import { seedMediaLedger } from '../../../apps/server/src/demo/seed-media.ts'
import { createDemoGateway } from '../../../apps/server/src/demo/mock-gateway.ts'

const root = process.cwd()
const outDir = resolve(root, 'docs/audit-2026-09-22/evidence')
const temp = mkdtempSync(join(root, 'node_modules', '.taoread-audit-'))
const dbUrl = `file:${join(temp, 'audit.db').replaceAll('\\', '/')}`
writeFileSync(join(temp, 'audit.db'), '')
execFileSync(process.execPath, [resolve(root, 'node_modules/prisma/build/index.js'), 'migrate', 'deploy'], {
  cwd: resolve(root, 'apps/server'), env: { ...process.env, TAO_DATABASE_URL: dbUrl }, stdio: 'pipe',
})
const db = createDb(dbUrl)
const masterKey = randomBytes(32).toString('hex')
let providerCalls = 0
const app = await buildApp({
  db, masterKey, tokenSecret: deriveTokenSecret(masterKey),
  probeKey: async () => 'active', wereadCall: () => createDemoGateway(),
  mediaDir: resolve(root, 'apps/server/media'), bedTimeMin: null,
  imageDeps: { base: 'https://audit.invalid', apiKey: 'synthetic', model: 'audit', fetch: async () => { providerCalls++; return new Response('{}', { status: 500 }) } },
})
const results = []
const req = async (method, url, token, payload) => app.inject({ method, url, ...(token ? { headers: { authorization: `Bearer ${token}` } } : {}), ...(payload ? { payload } : {}) })
const family = (await req('POST', '/api/family', null, {})).json()
const parent = family.token
const childToken = (await req('POST', '/api/family/join', null, { familyCode: family.familyCode, role: 'child' })).json().token
const child = (await req('POST', `/api/family/${family.familyId}/children`, parent, { nickname: 'Audit', stage: '6-8' })).json()
const childId = child.id ?? child.child?.id
const escalated = await req('POST', '/api/family/join', null, { familyCode: family.familyCode, role: 'parent' })
results.push({ id: 'AUTH-01', status: escalated.statusCode, observation: 'Same family code can obtain parent token without additional proof' })
const pack = { id: 'audit-book', title: 'Audit book', lang: 'en', category: 'story', ageStage: '6-8', coverArt: 'audit', source: 'Synthetic audit fixture', rights: { workTitle: 'Audit', basis: 'original', jurisdiction: 'CN' }, chapters: [{ title: 'One', blocks: [{ kind: 'text', text: 'A cat sat.' }] }, { title: 'Two', blocks: [{ kind: 'text', text: 'A dog ran.' }] }] }
await seedPack(db, pack)
await req('PUT', '/api/content/books/audit-book/blocked', parent, { blocked: true })
const blockedList = await req('GET', `/api/content/books?childId=${childId}`, childToken)
const blockedRead = await req('GET', '/api/content/books/audit-book/chapters/1', childToken)
results.push({ id: 'AUTH-02', listIncludesBlocked: blockedList.json().books.some(b => b.id === 'audit-book'), directReadStatus: blockedRead.statusCode })
const progressUrl = '/api/content/books/audit-book/progress'
const malformed = await req('POST', progressUrl, childToken, { childId, chapterOrder: 2, completed: 'false' })
results.push({ id: 'DATA-01', status: malformed.statusCode, sentCompleted: 'false (string)', response: malformed.json() })
await req('POST', progressUrl, childToken, { childId, chapterOrder: 2, completed: true })
const reopened = await req('POST', progressUrl, childToken, { childId, chapterOrder: 1 })
results.push({ id: 'DATA-02', responseAfterReopen: reopened.json() })
await req('POST', progressUrl, childToken, { childId, chapterOrder: 2 })
await req('PUT', '/api/content/books/audit-book/blocked', parent, { blocked: false })
const pct = (await req('GET', `/api/content/books?childId=${childId}`, childToken)).json().books.find(b=>b.id==='audit-book')
results.push({ id: 'DATA-03', progress: pct.progress, finished: pct.finished })
// Missing required payload causes validation before any provider call, proving role gate absence.
const art = await req('POST', '/api/art/generate', childToken, {})
results.push({ id: 'AUTH-03', childArtStatus: art.statusCode, errorCode: art.json().code, providerCalls, expectedRoleGuardStatus: 403 })
await req('DELETE', `/api/family/${family.familyId}`, parent)
const afterDelete = await req('GET', '/api/content/books/audit-book/chapters/1', childToken)
results.push({ id: 'AUTH-04', deletedFamilyTokenContentStatus: afterDelete.statusCode })
const groups = (items, key) => items.reduce((acc, item) => { const k = item[key]; acc[k]=(acc[k]??0)+1; return acc }, {})
const chapters = ALL_PACKS.flatMap(p=>p.chapters)
const blocks = chapters.flatMap(c=>c.blocks)
const duplicates = ALL_PACKS.filter((p,i,a)=>a.findIndex(x=>x.id===p.id)!==i).map(p=>p.id)
const stats = { books: ALL_PACKS.length, chapters: chapters.length, blocks: blocks.length, languages: groups(ALL_PACKS,'lang'), ageStages: groups(ALL_PACKS,'ageStage'), categories: groups(ALL_PACKS,'category'), rights: groups(ALL_PACKS.map(p=>p.rights),'basis'), duplicateBookIds: duplicates, emptyChapters: chapters.filter(c=>!c.blocks.length).length, emptyBlocks: blocks.filter(b=>!b.text.trim()).length, rightsWithoutSource: ALL_PACKS.filter(p=>!p.rights.sourceUrl).map(p=>p.id), englishTextBlocks: ALL_PACKS.filter(p=>p.lang==='en').flatMap(p=>p.chapters.flatMap(c=>c.blocks)).filter(b=>b.kind==='text'||b.kind==='poem').length }
writeFileSync(join(outDir, 'probe-results.json'), JSON.stringify({ results, stats }, null, 2))
console.log(JSON.stringify({ results, stats: { ...stats, rightsWithoutSourceCount: stats.rightsWithoutSource.length, rightsWithoutSource: undefined } }, null, 2))
await seedAllPacks(db, ALL_PACKS)
await seedDemoFamily(db, masterKey)
await seedMediaLedger(db, resolve(root,'apps/server/media'))
await app.listen({port:8799,host:'127.0.0.1'})
console.log('Isolated audit API ready at 127.0.0.1:8799; provider requests are disabled/stubbed.')
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, async()=>{ await app.close(); await db.$disconnect(); process.exit(0) })
