
import axios from '@/libs/api.request'

// Read
export const getConfigList = (paras) => {
  return axios.request({
    url: 'sys/get_config_list',
    data: paras,
    method: 'post'
  })
}
// Delete
export const delConfig = (paras) => {
  return axios.request({
    url: 'sys/del_config',
    data: paras,
    method: 'post'
  })
}
// Insert
export const addConfig = (paras) => {
  return axios.request({
    url: 'sys/add_config',
    data: paras,
    method: 'post'
  })
}
// Update
export const updateConfig = (paras) => {
  return axios.request({
    url: 'sys/update_config',
    data: paras,
    method: 'post'
  })
}
