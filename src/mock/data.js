import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
const Random = Mock.Random

export const getRoleList = req => {
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

export const getResouceList = req => {
  let list = []
  doCustomTimes(5, () => {
    let children = []
    doCustomTimes(3, () => {
      children.push(Mock.mock({
        id: Random.increment(10),
        title: '[功能] ' + Random.ctitle(2, 5),
        expand: true,
        selected: false,
        checked: false
      }))
    })

    list.push(Mock.mock({
      id: Random.increment(10),
      title: '[页面] ' + Random.ctitle(2, 5),
      expand: true,
      selected: false,
      checked: false,
      children: children
    }))
  })
  return list
}

export const getGroupList = req => {
  let list = [
    {
      label: '色谱室',
      value: 'G1901'
    }, {
      label: '营养室',
      value: 'G1902'
    }, {
      label: '光谱室',
      value: 'G1903'
    }]
  return list
}

export const getUserist = req => {
  let list = []
  doCustomTimes(20, () => {
    list.push(Mock.mock({
      id: Random.increment(10),
      userName: Random.word(8),
      realName: Random.cname(),
      nickName: '@name',
      'tel|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
      email: '@email',
      avatar: '',
      description: Random.csentence(10, 13),
      createTime: '@date',
      createBy: '@name',
      group: 'G1901'
    }))
  })
  return list
}

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}
