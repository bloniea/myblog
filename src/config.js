const config = {
  loading: 'https://cloud.bloniea.xyz/images/loading.gif',
  defaultImgUrl: 'https://cloud.bloniea.xyz/images/QQ202202112105073c3b326c7ae7c45a.png',
  avatar: 'https://cloud.bloniea.xyz/images/avatar.png',
  url: 'https://bloniea.xyz/',
  auth: {
    gitee: {
      client_id: '4a5503cddc755a561c01b98f87589d4373f23d2a29d36d4d2eaf6e65ad9f8b63',
      client_secret: 'be98a59cc0836f3cf23a72c83dd16a37f9b66000cfbb984ebd592a0a7e9931e8',
      oauth_api: 'https://gitee.com/oauth/',
      oauth_api_p: '/gitee_api/',
      token: 'token',
      api: 'https://gitee.com/api/v5/'
    },
    github: {
      client_id: '3cc3fe9a9b02c3c327ac',
      client_secret: '7e82548ab0ab1c17abf5cd9883850755dcc03c6f',
      oauth_api: 'https://github.com/login/oauth/',
      oauth_api_p: '/github_api/',
      token: 'access_token',
      api: 'https://api.github.com/'
    },
    redirect_uri: 'https://bloniea.xyz/',
  },
  avatar_error: 'https://cloud.bloniea.xyz/images/avatar_error.png',
  avatar_default: 'https://cloud.bloniea.xyz/images/default_avatar.png',
  aboutTitles: [
    { title: 'bloniea' },
    { title: '百合控' },
    { title: '我思,故百合在,然而百合却不需要我的存在' },
    { title: '我只想说没文化真可怕' },
  ],
  contacts: [
    { url: 'https://gitee.com/bloniea', img_url: 'https://cloud.bloniea.xyz/images/gitee.png' },
    { url: 'tencent://message/?uin=2032580075&Site=bloniea&Menu=yes', img_url: 'https://cloud.bloniea.xyz/images/QQ.png' },
    { url: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tdHQ2dzG3dTZ2sPQ2czM2vXExJvW2tg', img_url: 'https://cloud.bloniea.xyz/images/Email.png' },
  ]

}
export default config
