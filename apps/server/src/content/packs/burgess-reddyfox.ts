import type { PackBook } from '../types'

/**
 * The Adventures of Reddy Fox — Thornton W. Burgess (1874–1965), first
 * published 1913. Retold for young readers in six chapters: Granny Fox teaches
 * Reddy the fox ways, Reddy grows too proud, is chased by Bowser the Hound and
 * rescued by Granny's clever trick, is tempted by the henhouse, and finally
 * learns that a wise fox keeps his wits sharper than his appetite.
 * Source: The Adventures of Reddy Fox (Thornton W. Burgess, 1913), public
 * domain in the US (published pre-1929).
 */
export const reddyFox: PackBook = {
  id: 'burgess-reddyfox',
  title: 'The Adventures of Reddy Fox',
  author: 'Thornton W. Burgess',
  lang: 'en',
  category: 'tale',
  ageStage: '6-8',
  intro:
    'In the Green Forest, old Granny Fox is teaching young Reddy everything a fox should know. Reddy learns so well that he begins to show off — and showing off nearly gets him into trouble. With Granny’s clever tricks and a few good lessons, Reddy grows into the smartest fox in the forest.',
  coverArt: 'reddy-brush',
  coverArtPrompt:
    'A handsome young red fox with a white-tipped brush tail stands alert on a mossy log at the edge of the Green Forest, head turned back toward an older, wiser fox in the ferns. Morning mist between the trunks, ferns and fallen leaves, shafts of golden light. Warm russet-and-green palette, classic storybook illustration.',
  coverFrom: '#FF8A65',
  coverTo: '#FFF3E0',
  source: 'The Adventures of Reddy Fox (Thornton W. Burgess, 1913), public domain',
  chapters: [
    {
      title: 'Chapter 1 · Granny Fox Teaches Reddy',
      art: 'reddy-lesson',
      artPrompt:
        'A wise older fox with a grizzled coat demonstrates walking silently along a fallen log, one paw lifted mid-step, while a bright young red fox copies her eagerly on the forest floor. Ferns and dappled morning light, a distant meadow beyond the trees. Warm amber tones, patient teaching mood, storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'In the Green Forest, in a snug den under an old stump, lived Granny Fox and her grandson Reddy.',
        },
        {
          kind: 'text',
          text: 'Granny Fox was the cleverest fox in all the countryside, and she was teaching Reddy everything she knew.',
        },
        {
          kind: 'image',
          art: 'reddy-lesson',
          text: 'Granny shows Reddy how to walk without a single sound.',
        },
        {
          kind: 'text',
          text: '"Step on the moss, not the twig," said Granny. "Keep your nose busy and your tail still. A fox who listens learns more than a fox who talks."',
        },
        {
          kind: 'note',
          text: 'New word: den — a fox’s home, dug under roots or a stump.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Reddy practiced all morning, and by supper he could pad through the leaves without a whisper.',
        },
      ],
    },
    {
      title: 'Chapter 2 · Reddy Shows Off',
      art: 'reddy-show',
      artPrompt:
        'A proud young red fox prances along the top rail of a pasture fence at midday, chin high, brush tail carried like a flag, showing off before a farmyard in the distance where a hound dozes by a barn. Sheep in a field, big summer clouds. Bright confident light with a hint of mischief, humorous storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Reddy learned so fast that he grew proud. "I am the smartest fox in the Green Forest!" he boasted to anyone who would listen.',
        },
        {
          kind: 'text',
          text: 'One day he trotted right up to Farmer Brown’s pasture fence, in broad daylight, just to show how brave he was.',
        },
        {
          kind: 'text',
          text: 'Bowser the Hound looked up from his nap by the barn. "Woof!" said Bowser. And off shot Reddy like a streak of fire.',
        },
        {
          kind: 'image',
          art: 'reddy-show',
          text: 'Reddy shows off on the fence — and Bowser wakes up.',
        },
        {
          kind: 'note',
          text: 'Ask your child: was Reddy being brave, or just showing off? What is the difference?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Granny Fox watched from the bushes and shook her head. "A wise fox keeps his cleverness for when he needs it," she said.',
        },
      ],
    },
    {
      title: 'Chapter 3 · The Long Chase',
      art: 'reddy-chase',
      artPrompt:
        'An exciting but safe chase across green fields: a young red fox doubles back along a stone wall, ears flat, while a baying brown hound follows the trail behind — but the trail loops back on itself in a neat figure-eight of pawprints. Puffing hound, leaping fox, wildflowers bending. Bright breezy daylight, playful motion, storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Bowser the Hound chased Reddy across the Green Meadows, nose down, voice up, "Woof, woof, woof!"',
        },
        {
          kind: 'text',
          text: 'Reddy remembered his lessons. He ran on the stones where his feet left no smell. He doubled back along the old stone wall.',
        },
        {
          kind: 'text',
          text: 'Then Granny Fox, who had been watching all along, crossed the path ahead of Bowser and laid a trail that looped in a great circle.',
        },
        {
          kind: 'image',
          art: 'reddy-chase',
          text: 'Granny lays a looping trail, and Bowser runs in circles.',
        },
        {
          kind: 'note',
          text: 'New word: trail — the track of smells an animal leaves behind.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Bowser followed the loop round and round, until he was dizzy and Reddy was far away, safe on the big pine, laughing quietly. "Thank you, Granny," he panted.',
        },
      ],
    },
    {
      title: 'Chapter 4 · The Henhouse Temptation',
      art: 'reddy-henhouse',
      artPrompt:
        'Moonlight on a red farm henhouse: a young red fox crouches in the shadows at the corner, one paw lifted, staring longingly at the warm golden crack of light under the door where hens murmur on their roost. A lantern hangs by the farmhouse door; a watchful wind stirs the straw. Deep blue night with amber highlights, quiet suspense but safe, storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'One night Reddy smelled the most wonderful smell in the world: warm hens, sleeping in Farmer Brown’s henhouse.',
        },
        {
          kind: 'text',
          text: 'His mouth watered. His feet began to walk all by themselves. But then he heard Granny’s voice in his head.',
        },
        {
          kind: 'text',
          text: '"A wise fox eats what the meadow gives, and never trusts a door that smells too easy," Granny always said.',
        },
        {
          kind: 'image',
          art: 'reddy-henhouse',
          text: 'Reddy stops at the corner of the henhouse and thinks.',
        },
        {
          kind: 'note',
          text: 'Ask your child: Reddy stopped just in time. What do you think he remembered?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'Reddy stood very still, counted to ten, and turned away. And that very night, he caught two plump meadow mice for supper, and slept the sleep of a fox with nothing on his mind.',
        },
      ],
    },
    {
      title: 'Chapter 5 · Granny’s Trick',
      art: 'reddy-granny',
      artPrompt:
        'A snowy night scene near the farm: a wise older fox leads a baying hound far away along a shiny frozen ditch, leaving neat prints, while the young red fox slips home unseen along the hedgerow, snowflakes falling. Farmhouse windows glowing far off. Soft lavender-blue snow light with warm window gold, cozy clever storybook style.',
      blocks: [
        {
          kind: 'text',
          text: 'Another night, Reddy’s hunting took him a little too near the farm, and Bowser the Hound picked up his trail again. Reddy ran for the frozen ditch, but his paws slipped on the ice, and Bowser came shouting behind.',
        },
        {
          kind: 'text',
          text: 'Then, out of nowhere, Granny Fox strolled across the meadow — right past Bowser’s nose, calm as Sunday.',
        },
        {
          kind: 'text',
          text: 'Bowser forgot Reddy at once and turned to chase the new fox. But Granny only laughed and led him on a long, pretty walk to the far side of the fields, then whisked away over a stile no hound could climb.',
        },
        {
          kind: 'image',
          art: 'reddy-granny',
          text: 'Granny leads Bowser on a long, pretty walk — while Reddy slips home.',
        },
        {
          kind: 'note',
          text: 'New word: hedgerow — a row of bushes along the edge of a field.',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'When Reddy reached the den, Granny was already there, shaking the snow off her coat. "Cleverness shared is cleverness doubled," she said.',
        },
      ],
    },
    {
      title: 'Chapter 6 · The Smartest Fox in the Forest',
      art: 'reddy-forest',
      artPrompt:
        'Autumn in the Green Forest at golden hour: a grown, self-possessed red fox sits on a mossy knoll beside his wise old grandmother, both gazing over the valley as maple leaves drift down. The farm is a tiny warm dot far below. Rich reds, russets and deep greens, mellow slanting light, proud and peaceful storybook finale.',
      blocks: [
        {
          kind: 'text',
          text: 'Seasons went by, and Reddy grew big and strong, with a beautiful brush tail and quick bright eyes.',
        },
        {
          kind: 'text',
          text: 'He no longer showed off on fences. He listened more than he talked, and his nose stayed busy, just as Granny taught him.',
        },
        {
          kind: 'text',
          text: 'The little people of the Green Forest said, "Reddy Fox is clever." And Granny Fox said nothing at all — but she smiled her quiet smile.',
        },
        {
          kind: 'image',
          art: 'reddy-forest',
          text: 'Reddy and Granny watch the autumn valley together.',
        },
        {
          kind: 'note',
          text: 'Ask your child: what made Reddy truly smart — his tricks, or his lessons?',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: 'For the smartest fox in the forest had learned the best trick of all: knowing when not to use one.',
        },
      ],
    },
  ],
  rights: {
    workTitle: 'The Adventures of Reddy Fox',
    author: 'Thornton W. Burgess',
    authorDeathYear: 1965,
    jurisdiction: 'US',
    basis: 'pd-us',
    note: 'Retold for young readers; peril softened to clever escapes. Published 1913; US public domain (pre-1929 publication). Burgess died in 1965, so EU protection has not expired — distribution outside the US should rely on the platform’s adapted-retelling basis.',
  },
}
