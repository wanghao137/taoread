/** Export editing/recording briefs. This never signs reviews or changes course content. */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { out: { type: 'string' } } })
if (!values.out) throw new Error('Specify an explicit --out directory')
const out = path.resolve(values.out), course = await loadCourse(candidateDirectory)
const md = (v: string) => v.replaceAll('|', '\\|').replaceAll('\n', ' ')
const refs = new Map<string, Array<{ source: string; use: string; brief: string }>>()
function ref(id: string, source: string, use: string, brief: string) {
  refs.set(id, [...(refs.get(id) ?? []), { source, use, brief }])
}
for (const task of course.tasks) {
  ref(task.instructionAssetId, task.id, 'instruction_zh', task.instructionZh)
  if (task.stimulusAssetId) ref(task.stimulusAssetId, task.id, 'stimulus', task.displayText ?? task.wordId ?? task.mappingId ?? 'Follow the task definition; never use letter names for phoneme recordings.')
  if (task.imageAssetId) ref(task.imageAssetId, task.id, 'meaning_image', course.words.find(w => w.id === task.wordId)?.meaningZh ?? task.instructionZh)
  task.hintAssetIds.forEach((id, i) => ref(id, task.id, `help_${i + 1}`, 'Record separately; assistance remains recorded even when the child retries.'))
}
for (const mapping of course.mappings) ref(`sound-${mapping.spelling}`, mapping.id, 'phoneme', `${mapping.spelling}: /${mapping.phonemes.map(p => p.ipa).join('')}/, GB. Pure sound; no letter name or added schwa. Speech reviewer must listen.`)
for (const word of course.words) for (const [kind, id] of Object.entries(word.audioIds)) ref(id, word.id, kind, `${word.text} (${word.meaningZh}); ${kind === 'word' ? 'natural GB word, unhurried' : kind === 'segment' ? 'separate phonemes in order; do not read letter names' : 'continuous blending into the natural word; separate reviewed recording, not mechanical slowdown'}`)
for (const reader of course.readers) reader.pages.forEach((page, i) => {
  ref(page.audioAssetId, `${reader.id}:page${i + 1}`, 'passage', page.text)
  if (page.imageAssetId) ref(page.imageAssetId, `${reader.id}:page${i + 1}`, 'reader_image', `${page.text}; clear scene, no baked-in words, keep character/action consistent.`)
})
const ledger = { schemaVersion: 1, versionId: course.manifest.versionId, contentHash: courseHash(course), status: 'production_brief_not_signoff',
  approvedProductDirection: 'User approved the proposed product scope and GB direction on 2026-10-19. This is not speech, teaching or rights signoff.',
  assets: course.assets.map(asset => ({ ...asset, references: refs.get(asset.id) ?? [],
    productionState: !asset.sha256 ? 'not_produced' : asset.reviewStatus === 'approved' ? 'approved' : asset.reviewStatus === 'rejected' ? 'rejected_candidate' : 'produced_pending_review', reviewer: null, reviewedAt: null,
    acceptance: asset.purpose === 'image' ? ['meaning and action unambiguous', 'age appropriate', 'rights/source documented', 'no generated English typography', 'no answer leak before independent attempt'] : ['correct purpose and GB/zh accent', 'no truncation clipping or intrusive noise', 'phoneme has no added vowel', 'natural blending/word prosody', 'duration and timeline checked by listening', 'speaker and rights recorded'],
  })) }
const scripts = ['# GB v1 逐屏教学与制作脚本', '', `候选版本：${course.manifest.versionId}。内容哈希：${courseHash(course)}。`, '',
  '这是待教学、语音和权利审校的制作稿。产品方向已获用户批准；不等同于专家审校。儿童中文指令按原文录制，英文音素不得交给普通字母名称 TTS 自动代替。', '',
  '通用操作：先听完当前中文指令与已授权示范，再点选/拼摆。错误不扣分；重听→提示→一起练过继续。任何屏幕可以暂停。口头活动记录自述，未观察不推断正确。', '']
for (const group of [...course.entryPlans.map(e => ({ id: e.id, titleZh: '声音游戏（不显示字母）', taskIds: e.taskIds, parentGuideZh: '先理解 sit、tap 的动作，跟着中文操作；不当入学测试。' })), ...course.lessons]) {
  scripts.push(`## ${group.id} ${group.titleZh}`, '', group.parentGuideZh, '', '| 屏幕 | 中文指令（录音原文） | 显示/动作 | 声音/图片 | 帮助与证据 |', '|---|---|---|---|---|')
  group.taskIds.forEach((id, i) => {
    const task = course.tasks.find(t => t.id === id)!
    scripts.push(`| ${i + 1} ${task.id} | ${md(task.instructionZh)} | ${task.kind}；${md(task.displayText ?? '无预读答案文字')}；${task.choices.map(c => c.label).join(' / ') || '无点选字母'} | 指令 ${task.instructionAssetId}；示范 ${task.stimulusAssetId ?? '不预放答案'}；图片 ${task.imageAssetId ?? '无'} | ${task.role}；提示 ${task.hintAssetIds.join(' → ')}；${task.canSkipWithHelp ? '求助后可一起练过继续' : '先尝试再继续'} |`)
    if (task.readerId) {
      const reader = course.readers.find(r => r.id === task.readerId)!
      reader.pages.forEach((page, index) => scripts.push(`| 阅读 ${index + 1} | ${md(reader.titleZh)} | ${md(page.text)} | 求助后 ${page.audioAssetId}；图 ${page.imageAssetId ?? '无'} | 每页单独自述；服务端保存页码 |`))
    }
  })
  scripts.push('', '录制/听审：核对纯音、分音、连续合成、自然词音的区别；确认每个情境已理解，才解释读出行为。空时间轴必须在正式音频定稿后补齐并复核，不能将当前空数组当成已完成音块对齐。', '')
}
await mkdir(out, { recursive: true })
await writeFile(path.join(out, 'gb-v1-asset-ledger.json'), JSON.stringify(ledger, null, 2) + '\n', 'utf8')
await writeFile(path.join(out, 'gb-v1-lesson-scripts.md'), scripts.join('\n').trimEnd() + '\n', 'utf8')
console.log(JSON.stringify({ complete: true, versionId: course.manifest.versionId, assets: ledger.assets.length, output: out, approvalsCreated: 0 }))
