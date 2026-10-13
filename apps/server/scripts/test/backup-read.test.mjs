import test from 'node:test'
import assert from 'node:assert/strict'
import { createBackupReader } from '../lib/backup-read.mjs'
const response = () => ({ ContentLength:3, Body:{ transformToByteArray:async()=>Buffer.from('abc') } })
test('连接中断后使用新客户端重读，记录两次实际尝试',async()=>{
  const destroyed=[]
  let factories=0
  const reader=createBackupReader(()=>{
    const id=++factories
    return { send:async()=>{ if(id===1) throw Object.assign(new Error('transport'),{code:'ECONNABORTED'}); return response() },destroy:()=>destroyed.push(id) }
  },'synthetic-backup')
  assert.equal((await reader.get('media-archive/synthetic')).toString(),'abc')
  assert.equal(reader.attemptedReads,2)
  assert.deepEqual(destroyed,[1])
  reader.destroy()
  assert.deepEqual(destroyed,[1,2])
})
test('额度或权限拒绝不重试，不重新创建客户端',async()=>{
  let factories=0,calls=0
  const denial=Object.assign(new Error('denied'),{$metadata:{httpStatusCode:403},code:'ECONNABORTED'})
  const reader=createBackupReader(()=>{ factories++;return {send:async()=>{calls++;throw denial},destroy:()=>{}} },'synthetic-backup')
  await assert.rejects(reader.get('synthetic'),e=>e===denial)
  assert.equal(calls,1)
  assert.equal(factories,1)
  reader.destroy()
})
test('连续连接失败最多两次尝试，非法响应不重试',async()=>{
  let calls=0
  const reader=createBackupReader(()=>({send:async()=>{calls++;throw Object.assign(new Error('reset'),{code:'ECONNRESET'})},destroy:()=>{}}),'synthetic-backup')
  await assert.rejects(reader.get('synthetic'))
  assert.equal(calls,2)
  reader.destroy()
  const invalid=createBackupReader(()=>({send:async()=>({ContentLength:101*1024*1024,Body:{}}),destroy:()=>{}}),'synthetic-backup')
  await assert.rejects(invalid.get('synthetic'),e=>e.restoreCode==='INVALID_BACKUP_RESPONSE')
  assert.equal(invalid.attemptedReads,1)
  invalid.destroy()
})
