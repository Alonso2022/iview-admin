import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getPositionList = req => {
  let list = []
  doCustomTimes(20, () => {
    list.push(Mock.mock({
      id: Random.increment(10),
      code: Random.first(),
      title: Random.ctitle(5, 10),
      description: Random.csentence(10, 13),
      group: 'G1901'
    }))
  })
  return list
}
