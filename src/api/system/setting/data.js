
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
// Update
// Insert
