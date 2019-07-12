import axios from '@/api/base.js'

export var getroles = () => {
  return axios({
    url: 'roles',
    method: 'get'
  })
}

export var getlimit = (type) => {
  return axios({
    url: `rights/${type}`,
    method: 'get'
  })
}

export var addrole = (data) => {
  return axios({
    url: 'roles',
    method: 'post',
    data: data
  })
}

export var delrole = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}

export var editrole = (data) => {
  return axios({
    url: `roles/${data.id}`,
    method: 'put',
    data: data
  })
}

export var delgrant = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export var updaterolegrant = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids: rids
    }
  })
}
