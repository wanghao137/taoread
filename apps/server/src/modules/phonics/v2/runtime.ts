import type { PrismaClient } from '@prisma/client'
import type { PhonicsCourse } from './contracts'
import { AppError } from '../../../lib/errors'
import { courseHash, selfUseReady, validateCourse } from './courseRegistry'
import { releaseAccessible } from './releasePolicy'

export interface PhonicsV2Options {
  rollout?: 'off' | 'pilot' | 'all'
  pilotFamilyIds?: string[]
  /** Exact single household and content hash; independent of public rollout. */
  selfUseFamilyId?: string
  selfUseHash?: string
  /** Dependency injection for isolated tests; production loads installed content. */
  courses?: PhonicsCourse[]
}

export class PhonicsRuntime {
  readonly courses = new Map<string, PhonicsCourse>()
  readonly ready = new Set<string>()
  readonly privateReady = new Set<string>()
  constructor(readonly db: PrismaClient, readonly options: PhonicsV2Options, readonly mediaRoot: string) {}

  async install(courses: PhonicsCourse[]): Promise<void> {
    for (const input of courses) {
      const course = structuredClone(input)
      if (this.courses.has(course.manifest.versionId)) throw new Error('Duplicate installed phonics version')
      this.courses.set(course.manifest.versionId, course)
      const result = await validateCourse(course, { mode: 'release', mediaRoot: this.mediaRoot })
      if (result.complete && result.releaseReady) this.ready.add(course.manifest.versionId)
      if (selfUseReady(result)) this.privateReady.add(course.manifest.versionId)
    }
  }

  inRollout(familyId: string): boolean {
    return this.options.rollout === 'all' || (this.options.rollout === 'pilot' && (this.options.pilotFamilyIds ?? []).includes(familyId))
  }

  selfUse(familyId: string, contentHash: string): boolean {
    return Boolean(contentHash && this.options.selfUseFamilyId === familyId && this.options.selfUseHash === contentHash)
  }

  releaseAllowed(familyId: string, release: { status: string; contentHash: string } | null, contentHash: string): boolean {
    if (release?.status === 'self_use') return release.contentHash === contentHash && this.selfUse(familyId, contentHash)
    return releaseAccessible(release, contentHash, this.options.rollout, (this.options.pilotFamilyIds ?? []).includes(familyId))
  }

  async available(familyId: string, versionId: string, db: Pick<PrismaClient, 'phonicsCourseRelease'> = this.db): Promise<boolean> {
    const course = this.courses.get(versionId)
    if (!course) return false
    const release = await db.phonicsCourseRelease.findUnique({ where: { versionId } })
    if (release?.status === 'self_use') return this.privateReady.has(versionId) && this.releaseAllowed(familyId, release, courseHash(course))
    if (!this.inRollout(familyId) || !this.ready.has(versionId)) return false
    return this.releaseAllowed(familyId, release, courseHash(course))
  }

  async requireCourse(familyId: string, versionId: string, db: Pick<PrismaClient, 'phonicsCourseRelease'> = this.db): Promise<PhonicsCourse> {
    if (!await this.available(familyId, versionId, db)) throw new AppError('这份英语内容暂时不能使用，请找家长看看', 'COURSE_UNAVAILABLE', 409)
    return this.courses.get(versionId)!
  }

  async authorizeMedia(familyId: string, resourcePath: string): Promise<void> {
    const match = /^phonics\/([a-zA-Z0-9_-]+)\/([a-f0-9]{64})\.(wav|mp3|webp|png)$/.exec(resourcePath)
    if (!match) throw new AppError('媒体不存在', 'NOT_FOUND', 404)
    const course = await this.requireCourse(familyId, match[1]!)
    if (!course.assets.some(a => a.sha256 === match[2] && a.extension === match[3] && (a.reviewStatus === 'approved' || this.selfUse(familyId, courseHash(course))) && !a.fixture)) throw new AppError('媒体不存在', 'NOT_FOUND', 404)
    const enrollment = await this.db.phonicsEnrollment.findFirst({ where: { courseVersionId: match[1], v2Enabled: true, child: { familyId } } })
    if (!enrollment) throw new AppError('请先让家长开启英语练习', 'PHONICS_DISABLED', 403)
  }
}
