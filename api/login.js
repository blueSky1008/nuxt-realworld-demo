import { request } from '@/plugins/request'

export const Register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

export const Login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}