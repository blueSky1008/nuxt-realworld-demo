import { request } from '@/plugins/request'

export const getUser = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}


export const updateUser = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}