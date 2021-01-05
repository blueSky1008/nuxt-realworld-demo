import { request } from '@/plugins/request'

export const createArticles = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

export const getArticles = slug => {
  return request({
    method: 'GET',
    url: '/api/articles/' + slug
  })
}

export const updateArticles = (data, slug) => {
  return request({
    method: 'PUT',
    url: '/api/articles/' + slug,
    data
  })
}