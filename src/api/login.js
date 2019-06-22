import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.getItem('itcast_pro_token')
  config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export var userlogin = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data: data
  })
}

export var getuserdata = (params) => {
  return axios({
    url: 'users',
    method: 'get',
    params: params
  })
}
