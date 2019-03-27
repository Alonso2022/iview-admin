import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getPlatformList = req => {
  let list = []
  const paras = JSON.parse(req.body)
  doCustomTimes(paras.pageSize, () => {
    list.push(Mock.mock({
      'ID': Random.guid(),
      'TITLE': Random.ctitle(5, 10),
      'DESCRIPTION': Random.csentence(10, 13),
      'DOMAIN': Random.domain(),
      'ORDER_INDEX|+1': 1,

      'CREATE_ON': Random.date('yyyy-MM-dd hh:mm:ss'),
      'CREATE_BY': Random.first(),
      'MODIFY_ON': Random.date('yyyy-MM-dd hh:mm:ss'),
      'MODIFY_BY': Random.first(),
      'IS_DELETE': Random.boolean(),
      'IS_DISABLE': Random.boolean()
    }))
  })

  let res = {
    code: '1',
    msg: 'success',
    total: 100,
    data: list
  }
  return res
}
