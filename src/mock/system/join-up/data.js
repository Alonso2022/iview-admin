import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getJoinAuthList = req => {
  let list = []
  const paras = JSON.parse(req.body)
  doCustomTimes(paras.pageSize, () => {
    list.push(Mock.mock({
      ID: Random.guid(),
      APP_ID: Random.first(),
      TITLE: Random.ctitle(5, 10),
      'DOMAIN|1': ['wwww.baidu.com', 'www.qq.com', 'www.163.com'],
      'IS_DISABLE|1': true,
      TOKEN: Random.id(),
      SECRET_KEY: Random.id(),
      DESCRIPTION: Random.csentence(10, 13)
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
