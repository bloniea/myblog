const api = '/api'
import QS from 'qs'
export const fetchApi = async (url, options = {}) => {
  try {
    if ((!options.method || options.method == 'get') && options.params) url = url + '?' + QS.stringify(options.params)
    const data = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    const dataJson = await data.json()
    data.data = dataJson
    return data
  } catch (error) {
    console.log(error)
  }
}
// 获取所有标签
export const getLabelsApi = async (params) => {
  const url = api + '/labels'
  return await fetchApi(url, { params: params })
}
// 获取所有友链
export const getFriendsApi = async (params) => {
  const url = api + '/friends/'
  return await fetchApi(url, { params: params })
}
// 获取所有分类
export const getCategoriesApi = async (params) => {
  const url = api + '/categories'
  return await fetchApi(url, { params: params })
}
export const getCategoryApi = async (id, params) => {
  const url = api + '/category/' + id
  return await fetchApi(url, { params: params })
}
// 获取单篇文章
export const getArticleApi = async (id) => {
  const url = api + '/article/' + id
  return await fetchApi(url)
}
// 获取所有文章
export const getArticlesApi = async (params) => {
  const url = api + '/articles'
  return await fetchApi(url, { params: params })
}

// 获取评论
export const getCommentsApi = async (id, params) => {
  const url = api + '/comments/' + id
  return await fetchApi(url, { params: params })
}