import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

interface Chunk { file: string; name?: string; imports?: string[] }

/** Discover route chunks from this exact build, preserving normal loading on old builds/browsers. */
export async function routePreloads(staticDir: string): Promise<(pathname: string) => string | undefined> {
  try {
    const [html, text] = await Promise.all([
      readFile(join(staticDir, 'index.html'), 'utf8'),
      readFile(join(staticDir, '.vite/manifest.json'), 'utf8'),
    ])
    const manifest = JSON.parse(text) as Record<string, Chunk>
    const childEntry = manifest['src/pages/ChildHome.tsx'] ? 'src/pages/ChildHome.tsx'
      : Object.keys(manifest).find(key => manifest[key]?.name === 'ChildHome' && !manifest[key]!.file.includes('-legacy-'))
    return pathname => {
      const entries = (pathname.startsWith('/child/') || pathname === '/child') && childEntry ? [childEntry] : []
      if (/^\/child\/book\/[^/]+\/chapter\//.test(pathname)) entries.push('src/pages/child/ReaderPage.tsx')
      else if (/^\/child\/(family-books|family-book|phonics)(\/|$)/.test(pathname)) entries.push('src/pages/child/FamilyTrialPages.tsx')
      else if (pathname.startsWith('/child/listen/')) entries.push('src/pages/child/ListeningPage.tsx')
      if (!entries.length) return undefined
      const seen = new Set<string>(), files = new Set<string>()
      const visit = (key: string) => {
        if (seen.has(key) || seen.size >= 24) return
        seen.add(key)
        const chunk = manifest[key]
        if (!chunk || chunk.file.includes('-legacy-') || !/^assets\/[a-zA-Z0-9_.-]+\.js$/.test(chunk.file)) return
        files.add(chunk.file)
        for (const dependency of chunk.imports ?? []) visit(dependency)
      }
      entries.forEach(visit)
      if (!files.size) return undefined
      const links = [...files].map(file => `<link rel="modulepreload" crossorigin href="/${file}">`).join('')
      return html.replace('</head>', `${links}</head>`)
    }
  } catch { return () => undefined }
}
