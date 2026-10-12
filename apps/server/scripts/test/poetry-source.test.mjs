import { test } from 'node:test'
import assert from 'node:assert/strict'
import { searchPoetry, normalizedPoem } from '../lib/poetry-source.mjs'
const { Response } = globalThis
test('uses exact online route, keeps raw edition and real line breaks; does not take first title match blindly', async () => {
  let request
  const result = await searchPoetry('静夜思', { fetcher: async url => {
    request = url
    return Response.json({ data: [{ id: 1, title: '静夜思', author: { name: '李白' }, content: ['床前看月光，疑是地上霜。', '举头望山月，低头思故乡。'] }] })
  } })
  assert.equal(request.pathname, '/api/search')
  assert.equal(request.searchParams.get('pageSize'), '50')
  assert.match(result.candidates[0].text, /。\n举/)
  assert.match(result.candidates[0].text, /看月光/)
  assert.equal(normalizedPoem('古诗。\\n诗句'), normalizedPoem('古诗\n诗句'))
  assert.equal(result.rawSha256.length, 64)
})
test('self-hosted route is explicit; malformed data and unavailable source fail closed', async () => {
  await searchPoetry('小池', { mode: 'self-hosted', origin: 'http://127.0.0.1:1279', fetcher: async url => { assert.equal(url.pathname, '/api/v1/poems/search'); assert.equal(url.searchParams.get('page_size'), '50'); return Response.json({ data: [] }) } })
  for (const response of [new Response('offline', { status: 503 }), Response.json({ data: [{ title: 'bad', content: 'text' }] }), Response.json({ wrong: [] })]) await assert.rejects(searchPoetry('静夜思', { fetcher: async () => response }))
})
