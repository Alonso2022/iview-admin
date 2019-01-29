import axios from '@/libs/api.request'

export const getRoleList = () => {
  return axios.request({
    url: 'sys/get_role_list',
    method: 'post'
  })
}

export const getResouceList = () => {
  return axios.request({
    url: 'sys/get_resouce_list',
    method: 'post'
  })
}

export const getGroupList = () => {
  return axios.request({
    url: 'sys/get_group_list',
    method: 'post'
  })
}

export const getUserList = () => {
  return axios.request({
    url: 'sys/get_user_list',
    method: 'post'
  })
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}
