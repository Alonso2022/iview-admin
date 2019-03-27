import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getConfigList = req => {
  const paras = JSON.parse(req.body)
  const total = 10
  const count = total > paras.pageSize ? paras.pageSize : total
  let list = []
  doCustomTimes(count, () => {
    list.push(Mock.mock({
      'ID': Random.guid(),
      'CODE': Random.string('upper', 5),
      'DESCRIPTION': Random.csentence(10, 13),
      'TARGET': function () {
        if (this.CONFIG_TYPE === 'SYSTEM') {
          return 'SYSTEM'
        } else if (this.CONFIG_TYPE === 'POSITION') {
          return Random.first()
        } else if (this.CONFIG_TYPE === 'USER') {
          return Random.first()
        }
      },
      'VALUE': function () {
        if (this.DATA_TYPE === 'BOOLEAN') {
          return Random.boolean()
        } else if (this.DATA_TYPE === 'DATE') {
          return Random.date('yyyy-MM-dd hh:mm:ss')
        } else if (this.DATA_TYPE === 'NUMBER') {
          return Random.integer(1, 10)
        } else if (this.DATA_TYPE === 'TEXT') {
          return Random.string('upper', 5, 10)
        }
      },
      'CONFIG_TYPE|1': ['SYSTEM', 'POSITION', 'USER'],
      'DATA_TYPE|1': ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN'],
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
