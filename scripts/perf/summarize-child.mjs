/** Preserve missing values and slow samples; these are lab summaries, never field percentiles. */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'

const input = resolve(process.argv[2] || 'output/playwright/ui-performance-20261014/final-comparison/results.json')
const result = JSON.parse(await readFile(input, 'utf8'))
const summarize = values => {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b)
  const n = sorted.length
  return { n, median: n ? (sorted[Math.floor((n - 1) / 2)] + sorted[Math.ceil((n - 1) / 2)]) / 2 : null, max: n ? sorted[n - 1] : null }
}
const groups = new Map()
for (const sample of result.samples) {
  const key = `${sample.profile}|${sample.case}|${sample.version}`
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(sample)
}
const rows = [...groups.entries()].map(([key, samples]) => {
  const [profile, scenario, version] = key.split('|')
  return {
    profile, scenario, version, samples: samples.length,
    readyMs: summarize(samples.map(s => s.readyMs)),
    LCP: summarize(samples.map(s => s.vitals.LCP?.value)),
    CLS: summarize(samples.map(s => s.vitals.CLS?.value)),
    INP: summarize(samples.map(s => s.vitals.INP?.value)),
    flipMs: summarize(samples.map(s => s.flipMs)),
    resumeMs: summarize(samples.map(s => s.resumeMs)),
    resumeMatches: samples.filter(s => s.resumeMatched).length,
    pageErrors: samples.reduce((n, s) => n + s.errors.length, 0),
    failedRequests: samples.reduce((n, s) => n + s.failedRequests.length, 0),
  }
})
const expected = result.profiles.length * (result.scenarios?.length || 7) * result.rounds * result.servers.length
const summary = { source: input, note: 'Lab median/max; three runs are not real-user p75/p95. Missing INP is not zero.', expected, completed: result.samples.length, failed: result.failures?.length || 0, failures: result.failures || [], browser: result.browser, rows }
summary.missing = expected - summary.completed - summary.failed
await writeFile(resolve(dirname(input), 'summary.json'), JSON.stringify(summary, null, 2))
const cell = (metric, decimals = 0) => metric.n ? `${metric.median.toFixed(decimals)} / ${metric.max.toFixed(decimals)}` : 'missing'
const markdown = [
  '# Child performance lab summary', '',
  `Browser: ${result.browser}. Successful ${result.samples.length}/${expected}; failed ${summary.failed}. Values are median / max, not field percentiles.`, '',
  '| Profile | Scenario | Version | n | Ready ms | LCP ms | CLS | INP ms | Flip ms | Resume ms |',
  '| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
  ...rows.map(r => `| ${r.profile} | ${r.scenario} | ${r.version} | ${r.samples} | ${cell(r.readyMs)} | ${cell(r.LCP)} | ${cell(r.CLS, 3)} | ${cell(r.INP)} | ${cell(r.flipMs, 1)} | ${cell(r.resumeMs)} |`), '',
]
await writeFile(resolve(dirname(input), 'summary.md'), markdown.join('\n'))
console.log(JSON.stringify({ completed: summary.completed, failed: summary.failed, missing: summary.missing, expected, groups: rows.length, pageErrors: rows.reduce((n, r) => n + r.pageErrors, 0), failedRequests: rows.reduce((n, r) => n + r.failedRequests, 0) }))
