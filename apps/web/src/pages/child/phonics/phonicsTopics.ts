export const PHONICS_TOPICS = [
  { id: 'animals', label: '动物', words: ['pig', 'dog', 'cat', 'pet', 'rat', 'hen', 'yak', 'fox', 'duck', 'fish', 'moth'] },
  { id: 'people', label: '人物和身体', words: ['man', 'sam', 'dad', 'kid', 'vet', 'fin', 'leg', 'lip', 'chin', 'wing'] },
  { id: 'actions', label: '动作', words: ['sat', 'pat', 'tap', 'sit', 'sip', 'nap', 'ran', 'dip', 'dig', 'run', 'hop', 'hid', 'jog', 'zap', 'quit', 'off', 'kick', 'chat', 'bath', 'sing'] },
  { id: 'daily', label: '生活', words: ['pin', 'pan', 'mat', 'map', 'tip', 'gap', 'dot', 'pot', 'top', 'cap', 'can', 'kit', 'pen', 'net', 'cup', 'hat', 'bag', 'bed', 'bus', 'fan', 'log', 'jam', 'jet', 'van', 'wig', 'zip', 'box', 'bell', 'doll', 'sock', 'ship', 'shop', 'chip', 'ring'] },
  { id: 'nature', label: '自然', words: ['sun', 'mud', 'web'] },
  { id: 'other', label: '其他', words: [] },
] as const

export type PhonicsTopicId = typeof PHONICS_TOPICS[number]['id']
const topicByWord = new Map<string, PhonicsTopicId>(PHONICS_TOPICS.flatMap(topic => topic.words.map(word => [`w-${word}`, topic.id] as const)))
export const phonicsTopic = (wordId: string): PhonicsTopicId => topicByWord.get(wordId) ?? 'other'
