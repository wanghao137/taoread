// 批量并行搜索（iter4：音频播放器调研）
import { spawn } from 'child_process'
import fs from 'fs'

const queries = process.argv.slice(2)
const concurrency = 6
let done = 0

function runOne(q) {
  return new Promise((resolve) => {
    const p = spawn('node', ['sosearch.mjs', q], { cwd: process.cwd() })
    let out = ''
    p.stdout.on('data', (d) => (out += d))
    p.stderr.on('data', (d) => (out += d))
    p.on('close', () => {
      done++
      console.log(`[${done}/${queries.length}] ${q}`)
      console.log(out.split('\n').slice(0, 13).join('\n'))
      resolve()
    })
  })
}

;(async () => {
  const queue = [...queries]
  const workers = []
  for (let i = 0; i < concurrency; i++) {
    workers.push((async () => {
      while (queue.length) await runOne(queue.shift())
    })())
  }
  await Promise.all(workers)
  console.log('ALL_DONE')
})()
