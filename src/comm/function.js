import { marked } from 'marked'
import config from '@/config.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
// 格式化日期
export const formatDate = (d) => {
  let date = new Date(d * 1000).toDateString()
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

// 图片链接无效显示为默认图
export const imgExists = (item) => {
  item.img_url = config.defaultArticleImgUrl
}


export const isLogin = () => {
  const userinfo = JSON.parse(localStorage.getItem('userinfo'))
  if (userinfo) {
    return true
  } else {
    return false
  }
}

// 获取参数
export const getParams = code => {
  const type = localStorage.getItem('type')
  const req = {
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