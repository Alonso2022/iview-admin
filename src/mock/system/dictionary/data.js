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
      'TITLE': Random.csentence(10, 13),
      'DESCRIPTION': Random.csentence(10, 13),
      'EX1': 'EX1',
      'EX2': 'EX2',
      'EX3': 'EX3',
      'EX4': 'EX4',
      'EX5': 'EX5',
      'ORDER_INDEX|+1': 1,
      'CREATE_ON': Random.date('yyyy-MM-dd hh:mm:ss'),
      'CREATE_BY': Random.first(),
      'UPDATE_ON': Random.date('yyyy-MM-dd hh:mm:ss'),
      'UPDATE_BY': Random.first()
    }))
  })

  return items
}

export const query = req => {
  const params = JSON.parse(req.body)
  const count = total > params.pageSize ? params.pageSize : total
  if (list.length === 0) {
    list = getItems(count)
    console.log(list)
  }

  let key = params.key
  console.log(count, list.length)
  // 执行关键字搜索
  if (key && key !== '') {
    key = key.toUpperCase()
    let data = list.filter(x =>
      x.DESCRIPTION.toUpperCase().indexOf(key) > -1 ||
      x.CODE.toUpperCase().indexOf(key) > -1 ||
      x.TITLE.toUpperCase().indexOf(key) > -1
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

export const insert = req => {
  const params = JSON.parse(req.body)
  let item = params.item
  console.log(req)
  item.ID = Random.guid()

  let vailList = list.filter(function (val) {
    return val.CODE === item.CODE
  })

  if (vailList.length > 0) {
    return {
      code: '2',
      msg: '已存在相同编号数据',
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

// 更新
export const update = req => {
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

// 删除
export const deleteById = req => {
  const id = req.body
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
