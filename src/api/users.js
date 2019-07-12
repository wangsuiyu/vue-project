import axios from '@/api/base.js'

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

export var adduser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data: data
  })
}

export var edituser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: data
  })
}

export var deluser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

export var updateuserstatus = (uId, type) => {
  return axios({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}

export var grantrole = (id, rid) => {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid: rid
    }
  })
}

export var getmenus = () => {
  return axios({
    url: 'menus'
  })
}
