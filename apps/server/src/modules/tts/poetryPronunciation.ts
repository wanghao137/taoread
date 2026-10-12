/** Context-bound homophones for provider errors and ambiguous poem readings.
 * Displayed editions and timelines retain the original characters. */
export function poetryPronunciation(text: string): string {
  return text
    .replace(/远草青青没烧痕/g, '远草青青墨烧痕')
    .replace(/鶗鴂鸣时春事空/g, '提决鸣时春事空')
    .replace(/已拚江草无情绿/g, '已盼江草无情绿')
    .replace(/失喜漫占鸦/g, '失喜漫瞻鸦')
    .replace(/着物春犹浅/g, '浊物春犹浅')
    .replace(/尽日重门不启关/g, '尽日崇门不启关')
    .replace(/澹磨明镜照檐楹/g, '淡磨明镜照檐楹')
    .replace(/何苦生厌薄/g, '何苦生厌博')
}
