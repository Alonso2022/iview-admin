
import axios from '@/libs/api.request'

// Read
export const getPlatformList = (paras) => {
  return axios.request({
    url: 'sys/get_platform_list',
    data: paras,
    method: 'post'
  })
}

// Delete
// Update
// Insert
