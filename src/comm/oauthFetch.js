const api = '/myapi'
import QS from 'qs'
export const fetchApi = async (url, options = {}) => {
  try {

    if ((!options.method || options.method == 'get') && options.params) url = url + '?' + QS.stringify(options.params)
    const token = localStorage.getItem('front_token')
    const data = await fetch(url, {
      ...options,
      headers: {
        authorization: token || '',
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    // 401为用户名或密码错误和token失效
    if (data.status == 401) {
      // 将上一次请求失败的请求内容存储起来，刷新token后以便重新请求
      window.localStorage.setItem('url', url)
      window.localStorage.setItem('options', JSON.stringify(options))
      const refresh_token = window.localStorage.getItem('front_refresh_token')
      if (refresh_token && refresh_token != 'undefined') {
        const t = await fetchApi(api + '/oauth/refresh?refresh_token=' + refresh_token, { method: 'post' })
        if (t.status === 200 && t.ok) {
          window.localStorage.setItem('front_token', t.data.data.token)
          if (t.data.data.refresh_token && t.data.data.refresh_token != 'undefined') {
            window.localStorage.setItem('front_refresh_token', t.data.data.refresh_token)
          }
          // 获取上一次请求失败的内容，执行重新请求
          let Nurl = window.localStorage.getItem('url')
          let Noptions = window.localStorage.getItem('options')
          return await fetchApi(Nurl, JSON.parse(Noptions))
        } else if (t.status === 402) { //402为refresh_token已过期
          window.localStorage.removeItem('front_token')
          window.localStorage.removeItem('front_userinfo')
          window.localStorage.removeItem('front_refresh_token')
        }
      }
    }
    const dataJson = await data.json()
    data.data = dataJson
    return data
  } catch (error) {
    console.log(error)
  }
}

// 获取用户信息
export const getUserApi = async (params) => {
  const url = api + '/oauth'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
// 添加收藏
export const addStarApi = async (params) => {
  const url = api + '/oauth/star'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
// 获取文章是否收藏了
export const getIsStarApi = async (id) => {
  const url = api + '/oauth/star/' + id
  return await fetchApi(url, { method: 'get' })
}
// 取消收藏
export const cancelStarApi = async (id) => {
  const url = api + '/oauth/star/' + id
  return await fetchApi(url, { method: 'delete' })
}
// 获取收藏
export const getStarsApi = async () => {
  const url = api + '/oauth/stars'
  return await fetchApi(url)
}
// 添加评论
export const addCommentApi = async (params) => {
  const url = api + '/oauth/comment'
  return await fetchApi(url, { method: 'post', body: JSON.stringify(params) })
}
