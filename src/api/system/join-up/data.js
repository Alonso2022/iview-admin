import axios from '@/libs/api.request'
// Read
export const getJoinAuthList = (paras) => {
  console.log(1, paras)
  return axios.request({
    url: 'sys/get_join_auth_list',
    data: paras,
    method: 'post'
  })
}
// Delete
// Update
// Insert
