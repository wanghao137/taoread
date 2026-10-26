/** 内容文件直改后的 contentHash 重算（docs/91 displayText 补丁等一次性修正） */
import { readFile, writeFile } from 'node:fs/promises'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const course = await loadCourse(candidateDirectory)
const manifest = JSON.parse(await readFile(candidateDirectory + 'manifest.json', 'utf8')) as Record<string, unknown>
manifest.contentHash = courseHash(course)
await writeFile(candidateDirectory + 'manifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(JSON.stringify({ contentHash: manifest.contentHash }))
