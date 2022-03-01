import config from '@/config.js'
import axios from '@/axios/index.js'

const formatparams = obj => {
  let str = '?'
  for (let i in obj) {
    str += i + '=' + obj[i] + '&'

  }
  str = str.substring(0, str.length - 1)
  return str
}

export const toAuth = type => {
  if (type) {
    let req = {}
    localStorage.setItem('urled', window.location.href)
    localStorage.setItem('type', type)
    let apiUrl = ''
    if (type == 'gitee') {
      req.client_id = config.auth[type].client_id
      req.redirect_uri = config.auth.redirect_uri
      req.response_type = 'code'
      req.scope = 'user_info'
      apiUrl = 'https://gitee.com/oauth/authorize/'
    }
    if (type == 'github') {
      req.client_id = config.auth[type].client_id
      req.redirect_uri = encodeURIComponent(window.location.href)
      req.scope = 'user'
      apiUrl = 'https://github.com/login/oauth/authorize/'
    }
    const params = formatparams(req)
    window.location.href = apiUrl + params
  }

}

// 获取网址code值
export const getCode = str => {
  const codeVal = 'code='
  const codeIndex = str.indexOf(codeVal)
  let code = ''
  if (codeIndex > -1) {
    code = str.substring(codeIndex + codeVal.length)
    // 寻找&
    const v = code.indexOf('&')
    if (v > -1) {
      code = code.substring(0, v)
    }
    return code
  }
}
// 获取参数
export const getParams = code => {
  const type = localStorage.getItem('type')
  const req = {
    code: code,
    client_id: config.auth[type].client_id,
    redirect_uri: encodeURIComponent(localStorage.getItem('urled')),
    client_secret: config.auth[type].client_secret
  }

  if (type == 'gitee') {
    req.grant_type = 'authorization_code'
  }
  return req
}
//获取用户信息
// export const getUser = () => {
//   const url = window.location.href
//   const code = getCode(url)
//   if (code) {
//     const params = getParams(code)
//     const type = localStorage.getItem('type')
//     let apiUrl = config.auth[type].oauth_api + config.auth[type].token
//     // if (type == 'github') apiUrl = '/github_api/' + config.auth[type].token

//     console.log(apiUrl)

//     const res = axios.post(apiUrl, params)
//       .then(async ({ data: res }) => {
//         //   //   localStorage.setItem('refresh_token', res.refresh_token)
//         const { data: user } = await axios.get(config.auth[type].api + 'user', { params: { access_token: res.access_token } })
//         // //   console.log(user)
//         localStorage.setItem('userinfo', JSON.stringify(user))
//         const url = localStorage.getItem('urled')
//         history.replaceState(history.state, '', url)

//         //   // getLofinInfo()
//         //   // saveUser(user)
//       })
//       .catch(() => {
//         const url = localStorage.getItem('urled')
//         history.replaceState(history.state, '', url)
//         ElMessage.error('网络超时')
//       })
//   } else {

//   }

//   // if (isBkurl > -1) {
//   //   const urlIndex = url.indexOf('&')
//   //   const code = url.substring(urlIndex + 1).replace('code=', '')
//   //   const apiUrl = 'https://gitee.com/oauth/token'
//   //   const req = {
//   //     grant_type: 'authorization_code',
//   //     code: code,
//   //     client_id: config.auth.client_id,
//   //     redirect_uri: localStorage.getItem('redirect_uri'),
//   //     client_secret: config.auth.client_secret
//   //   }
//   //   // const { proxy } = getCurrentInstance()
//   //   const res = proxy.$axios.post(apiUrl, req)
//   //     .then(async ({ data: res }) => {
//   //       localStorage.setItem('refresh_token', res.refresh_token)
//   //       const { data: user } = await proxy.$axios.get(config.gitee_api + '/user', { params: { access_token: res.access_token } })
//   //       localStorage.setItem('userinfo', JSON.stringify(user))
//   //       const url = localStorage.getItem('urled')
//   //       history.replaceState(history.state, '', url)
//   //       getLofinInfo()
//   //       saveUser(user)
//   //     })
//   // }
// }

