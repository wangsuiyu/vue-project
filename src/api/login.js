import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

export var userlogin = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data: data
  })
}
