import { marked } from 'marked'
import config from '@/config.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
// 格式化日期
export const formatDate = (d) => {
  d = d.toString().length == 10 ? d * 1000 : d
  let date = new Date(d).toDateString()
  let dateArr = date.split(' ')
  return dateArr[1] + '. ' + dateArr[2] + '. ' + dateArr[3]
}
// mdrkdown 格式转 html格式
// 标题显示文章前面内容
export const beforeArticle = (md) => {
  let reg = /<\/?.+?>/g;
  let html = marked.parse(md).replace(reg, '')
  return html
}

// 获取参数
export const getParams = code => {
  const type = localStorage.getItem('type')
  const req = {
    type: type,
    code: code,
    client_id: config.auth[type].client_id,
    redirect_uri: config.auth.redirect_uri,
    client_secret: config.auth[type].client_secret
  }

  if (type == 'gitee') {
    req.grant_type = 'authorization_code'
  }
  return req
}
// 序列化参数
export const formatparams = obj => {
  let str = '?'
  for (let i in obj) {
    str += i + '=' + obj[i] + '&'

  }
  str = str.substring(0, str.length - 1)
  return str
}


// 获取网址code值
export const getVal = (str, val) => {
  // const val = 'state='
  const index = str.indexOf(val)
  const indexEnd = str.indexOf('&', index)
  let v = ''
  if (index > -1) {
    v = indexEnd > -1 ? str.substring(index + val.length, indexEnd) : str.substring(index + val.length)
    return v
  }
}
// 生成7位随机数
export const getRandom = () => {
  let str = ''
  for (let i = 0, len = 7; i < len; i++) {
    let num = Math.floor(Math.random() * 10)
    str += num.toString()
  }
  return str
}

// 获取路由路径
// 授权登录后跳转至首页，保存path为授权后能进入之前的页面
export const setRouterPath = () => {
  let path = window.location.pathname + window.location.search
  const index = path.indexOf('code=')
  if (index > -1) {
    path = path.substring(0, index - 1)
  }
  localStorage.setItem('path', path)
}
// 进入授权页面方法
export const toAuth = type => {
  if (type) {
    setRouterPath()
    let req = {}
    localStorage.setItem('type', type)
    if (type == 'gitee') {
      req.client_id = config.auth[type].client_id
      req.redirect_uri = config.auth.redirect_uri
      req.response_type = 'code'
      req.scope = 'user_info'
    }
    if (type == 'github') {
      req.client_id = config.auth[type].client_id
      req.redirect_uri = encodeURIComponent(window.location.href)
      req.state = getRandom()

    }
    const params = formatparams(req)
    const apiUrl = config.auth[type].oauth_api + '/authorize/'
    window.location.href = apiUrl + params
  }
}