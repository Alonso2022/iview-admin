import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

let list = []
let currentPage = 1
const total = 100

const getItems = (count) => {
  let items = []
  doCustomTimes(count, () => {
    items.push(Mock.mock({
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

  return items
}

// 查询
export const getConfigList = req => {
  const params = JSON.parse(req.body)

  const count = total > params.pageSize ? params.pageSize : total
  if (list.length === 0) {
    list = getItems(count)
  }
  let key = params.key
  // 执行关键字搜索
  if (key && key !== '') {
    key = key.toUpperCase()
    let data = list.filter(x =>
      x.DESCRIPTION.toUpperCase().indexOf(key) > -1 ||
      x.CODE.toUpperCase().indexOf(key) > -1 ||
      x.TARGET.toUpperCase().indexOf(key) > -1
    )
    let res = {
      code: '1',
      msg: 'success',
      total: data.length,
      data: data
    }
    return res
  }

  // 切换页码 重新生成数据
  if (params.currentPage !== currentPage) {
    list = getItems(count)
    currentPage = params.currentPage
  }
  let res = {
    code: '1',
    msg: 'success',
    total: total,
    data: list
  }
  return res
}

// 删除
export const delConfig = req => {
  const params = JSON.parse(req.body)
  let id = params.ID // 获取请求的id，将options.body转换为JSON对象
  list = list.filter(function (val) {
    return val.ID !== id // 过滤掉前台传过来的id对应的相应数据，并重新返回
  })

  let res = {
    code: '1',
    msg: 'success',
    data: list
  }
  return res
}

// 更新
export const updateConfig = req => {
  const params = JSON.parse(req.body)
  list = list.map(val => { // 将需要替换的数据替换掉
    return val.ID === params.item.ID ? params.item : val
  })
  return {
    code: '1',
    msg: 'success',
    data: list
  }
}

// 创建
export const addConfig = req => {
  const params = JSON.parse(req.body)
  let item = params.item
  item.ID = Random.guid()

  let vailList = list.filter(function (val) {
    return val.CODE === item.CODE &&
    val.CONFIG_TYPE === item.CONFIG_TYPE &&
    val.TARGET === item.TARGET
  })

  if (vailList.length > 0) {
    return {
      code: '2',
      msg: '相同配置类型、相同主体下只能有一个相同编码的配置',
      data: ''
    }
  }

  list = [item, ...list]

  if (list.length > params.pageSize) {
    list.splice(params.pageSize)
  }

  return {
    code: '1',
    msg: 'success',
    total: total,
    data: list
  }
}
