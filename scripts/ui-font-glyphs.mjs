import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'

const root = resolve(import.meta.dirname, '..')
const core = new Set(Array.from({ length: 95 }, (_, i) => i + 32))
for (const file of ['LoginPage.tsx', 'child/ChildPicker.tsx', 'child/DailyPoemCard.tsx', 'child/V8App.tsx']) {
  const source = await readFile(resolve(root, 'apps/web/src/pages', file), 'utf8')
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const visit = node => {
    if (ts.isFunctionDeclaration(node) && ['DiscoverPage', 'MyPage', 'BookDetailPage', 'ReaderRoute'].includes(node.name?.text)) return
    if (ts.isStringLiteralLike(node) || ts.isJsxText(node)) for (const char of node.text) if (char.codePointAt(0) > 127) core.add(char.codePointAt(0))
    ts.forEachChild(node, visit)
  }
  visit(tree)
}
const frequencies = new Map()
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name)
    if (entry.isDirectory()) await scan(path)
    else if (entry.name.endsWith('.ts')) for (const char of await readFile(path, 'utf8')) {
      const cp = char.codePointAt(0)
      if (cp > 127) frequencies.set(cp, (frequencies.get(cp) ?? 0) + 1)
    }
  }
}
await scan(resolve(root, 'apps/server/src/content/packs'))
process.stdout.write(JSON.stringify({ core: [...core].sort((a, b) => a - b), common: [...frequencies].sort((a, b) => b[1] - a[1] || a[0] - b[0]).map(([cp]) => cp) }))
