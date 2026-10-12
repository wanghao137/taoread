/** Bind prior full reads to unchanged immutable objects; bound each new quota batch. */
export function verificationBatch({ files, current, manifestSha256, target, previous, maxObjects = Number.MAX_SAFE_INTEGER, maxBytes = Number.MAX_SAFE_INTEGER }) {
  if (!Number.isSafeInteger(maxObjects) || maxObjects < 1 || !Number.isSafeInteger(maxBytes) || maxBytes < 1) {
    throw Error('Read batch limits must be positive safe integers')
  }
  const verified = []
  if (previous) {
    if (previous.manifestSha256 !== manifestSha256 || JSON.stringify(previous.target) !== JSON.stringify(target) ||
        !Array.isArray(previous.verified) || new Set(previous.verified.map(file => file.key)).size !== previous.verified.length) {
      throw Error('Resume receipt must match the frozen manifest and dedicated target')
    }
    const sources = new Map(files.map(file => [file.key, file]))
    const objects = new Map(current.map(file => [file.key, file]))
    for (const proof of previous.verified) {
      const source = sources.get(proof.key), remote = objects.get(proof.key)
      if (!source || proof.bytes !== source.bytes || proof.sha256 !== source.sha256 ||
          remote?.bytes !== source.bytes || remote.etag !== source.etag) throw Error('Previously verified immutable object changed')
      verified.push(proof)
    }
  }
  const verifiedKeys = new Set(verified.map(file => file.key))
  const remaining = files.filter(file => !verifiedKeys.has(file.key))
  const queue = []
  let bytes = 0
  for (const file of remaining) {
    if (queue.length >= maxObjects || bytes + file.bytes > maxBytes) break
    queue.push(file); bytes += file.bytes
  }
  if (remaining.length && !queue.length) throw Error('Read byte budget cannot fit the next complete audio')
  return { verified, queue, bytes }
}
