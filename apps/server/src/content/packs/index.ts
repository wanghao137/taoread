import type { PackBook } from '../types'
import { sanziJing } from './primer-sanzi'
import { tangShi } from './poetry-tang'
import { xiYouJi } from './story-xiyou'
import { keZhouQiuJian } from './story-fable'
import { alice } from './tale-alice'
import { peterPan } from './tale-peterpan'
import { littleRedCap } from './tale-grimm'

/**
 * 全部内容包。新增书只需在此注册，seedAllPacks 幂等写入。
 * 每本书的 rights 字段是版权台账的入库凭据（docs/07 §2 修改三）。
 */
export const ALL_PACKS: PackBook[] = [
  sanziJing,
  tangShi,
  xiYouJi,
  keZhouQiuJian,
  alice,
  peterPan,
  littleRedCap,
]
