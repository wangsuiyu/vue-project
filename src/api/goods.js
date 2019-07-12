import axios from '@/api/base.js'

export var getproduct = (params) => {
  return axios({
    url: 'goods',
    params: params
  })
}
