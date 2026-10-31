const names: Record<string, string> = {
  A: 'ay', B: 'bee', C: 'sea', D: 'dee', E: 'ee', F: 'eff', G: 'jee', H: 'aitch', I: 'eye',
  J: 'jay', K: 'kay', L: 'el', M: 'em', N: 'en', O: 'oh', P: 'pee', Q: 'cue', R: 'are',
  S: 'ess', T: 'tee', U: 'you', V: 'vee', W: 'double u', X: 'ex', Y: 'why', Z: 'zed',
}

export function letterNameText(letter: string): string {
  const result = names[letter]
  if (!result) throw new Error(`Unknown letter ${letter}`)
  return result
}
