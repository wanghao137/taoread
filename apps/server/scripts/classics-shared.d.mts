export type SourceParagraph = { id: string; text: string }
export type Translation = {
  title: string
  scene: string
  paragraphs: Array<{ id: string; zh: string }>
}
export type TranslationJob = {
  bookId: string
  bookTitle: string
  lang: string
  title: string
  chapter: number
  part: number
  paragraphs: SourceParagraph[]
  poem: boolean
}
export function sha(input: string | Buffer): string
export const willowsTitles: string[]
export const aliceTitles: string[]
export const ozTitles: string[]
export const gardenTitles: string[]
export const nilsTitles: string[]
export const princeTitles: string[]
export function completeTranslationTitle(job: TranslationJob, translation: Translation): Translation
export function splitChapter(
  book: { id: string; title: string; sourceLang: string },
  chapter: { order: number; title: string; paragraphs: SourceParagraph[] },
): TranslationJob[]
export function untranslatedLatinParagraphIds(translation: Pick<Translation, 'paragraphs'>): string[]
export function validateTranslation(job: Pick<TranslationJob, 'paragraphs'> & { poem?: boolean }, translation: Translation): void
