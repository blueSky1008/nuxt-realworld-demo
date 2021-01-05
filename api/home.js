import { request } from '@/plugins/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const getArticlesFeed = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: '/api/articles/' + slug +'/favorite'
  })
}

// 取消点赞
export const unFavorite = slug => {
  return request({
    method: 'DELETE',
    url: '/api/articles/' + slug +'/favorite'
  })
}