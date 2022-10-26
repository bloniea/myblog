const config = {
  loading: 'https://image-cdn.bloniea.ml/images1/loading.gif',
  defaultImgUrl: 'https://image-cdn.bloniea.ml/images1/QQ截图20220211210130.png',
  avatar: 'https://image-cdn.bloniea.ml/images1/77265017_p0.jpg',
  url: 'https://bloniea.ml/',
  title: 'bloniea|可愛くなりたい',
  avatar_error: 'https://image-cdn.bloniea.ml/images1/avatar_error.png',
  avatar_default: 'https://image-cdn.bloniea.ml/images1/default_avatar.png',
  img_404: 'https://image-cdn.bloniea.ml/images1/404.jpg',
  logo_url: 'https://image-cdn.bloniea.ml/images1/logo.png',
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
    // redirect_uri: 'http://localhost:3000/',
    redirect_uri: 'https://bloniea.ml/',
  },
  aboutTitles: [
    { title: 'bloniea <span style="text-decoration:line-through">一个全栈工程师</span>前端小白' },
    { title: 'ユリの騎士' },
    { title: '何以解忧,唯有百合' },
    { title: '你，去祭典了吧，私の知らない女の子と一緒に' },

  ],
  contacts: [
    { url: 'https://gitee.com/bloniea', img_url: 'https://image-cdn.bloniea.ml/images1/gitee.png' },
    { url: 'https://github.com/bloniea', img_url: 'https://image-cdn.bloniea.ml/images1/GitHub.png' },
    { url: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tdfZ2tvc0NT1xMSb1trY"', img_url: 'https://image-cdn.bloniea.ml/images1/Email.png' },
  ],
  tools: [
    { img_url: "https://image-cdn.bloniea.ml/images1/1000-2.jpg", router_name: "Reg", title: "正则表达式", subtitle: "在线测试正则表达式" },
    { img_url: "https://image-cdn.bloniea.ml/images1/1000-4.jpg", router_name: "Qrcode", title: "二维码生成", subtitle: "在线生成二维码" },
    { img_url: "https://image-cdn.bloniea.ml/images1/1000-6.jpg", router_name: "Ico", title: "图片转ico格式", subtitle: "在线图片转换ico格式" },
  ]

}
export default config
