import axios from '@/libs/api.request'
// Read
export const query = (paras) => {
  console.log(1, paras)
  return axios.request({
    url: 'sysdictionary/query',
    data: paras,
    method: 'post'
  })
}

// Insert
export const insert = (paras) => {
  return axios.request({
    url: 'sysdictionary/insert',
    data: paras,
    method: 'post'
  })
}

// Delete
export const deleteById = (paras) => {
  return axios.request({
    url: 'sysdictionary/deleteById',
    data: paras,
    method: 'post'
  })
}

// Update

export const update = (paras) => {
  return axios.request({
    url: 'sysdictionary/update',
    data: paras,
    method: 'post'
  })
}
