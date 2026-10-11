import type { GenerateArtInput } from '../src/modules/media/imagegen'

/** Literal framing prevents verified child-age and warm-window scene drift. */
export function classicArtInput(input: GenerateArtInput): GenerateArtInput {
  return /^(?:(?:cover:)?zh-classic-(?:prince|nils)(?::ch\d+)?|zh-classic-andersen:ch(?:1|5|10)|zh-classic-grimm:ch11|zh-classic-aesop:ch(?:9|10|14|15)|zh-classic-oz:ch(?:3|15|18|19|23|24)|zh-classic-alice:ch(?:1|2|4|7|9)|zh-classic-garden:ch(?:9|31|36))$/.test(input.scene)
    ? { ...input, literalScene: true }
    : input
}
