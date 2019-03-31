import axios from '@/libs/api.request'
// Read
export const getDictionaryList = (paras) => {
  console.log(1, paras)
  return axios.request({
    url: 'sys/get_dictionary_list',
    data: paras,
    method: 'post'
  })
}
// Delete
// Update
// Insert
