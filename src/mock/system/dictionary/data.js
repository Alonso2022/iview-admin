import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getDictionaryList = req => {
  const paras = JSON.parse(req.body)
  const total = 100
  const count = total > paras.pageSize ? paras.pageSize : total
  let list = []
  doCustomTimes(count, () => {
    list.push(Mock.mock({
      'ID': Random.guid(),
      'CODE': Random.string('upper', 5),
      'TITLE': Random.csentence(10, 13),
      'DESCRIPTION': Random.csentence(10, 13),
      'EX1': '',
      'EX2': '',
      'EX3': '',
      'EX4': '',
      'EX5': '',
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
    total: total,
    data: list
  }
  return res
}
