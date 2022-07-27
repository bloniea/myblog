const config = {
  loading: 'https://cloud.bloniea.xyz/images/loading.gif',
  defaultImgUrl: 'https://cloud.bloniea.xyz/images/QQ202202112105073c3b326c7ae7c45a.png',
  avatar: 'https://cloud.bloniea.xyz/images/avatar.png',
  url: 'https://bloniea.ml/',
  title: 'bloniea|可愛くなりたい',
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
  avatar_error: 'https://cloud.bloniea.xyz/images/avatar_error.png',
  avatar_default: 'https://cloud.bloniea.xyz/images/default_avatar.png',
  avatar_img: 'https://cloud.bloniea.xyz/images/avatar.png',
  default_img: 'https://cloud.bloniea.xyz/images/QQ202202112105073c3b326c7ae7c45a.png',
  aboutTitles: [
    { title: 'bloniea <span style="text-decoration:line-through">一个全栈工程师</span>前端小白' },
    { title: 'ユリの騎士' },
    { title: '何以解忧,唯有百合' },
    { title: '你，去祭典了吧，私の知らない女の子と一緒に' },

  ],
  contacts: [
    { url: 'https://gitee.com/bloniea', img_url: 'https://cloud.bloniea.xyz/images/gitee.png' },
    { url: 'tencent://message/?uin=2032580075&Site=bloniea&Menu=yes', img_url: 'https://cloud.bloniea.xyz/images/QQ.png' },
    { url: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tdfZ2tvc0NT1xMSb1trY"', img_url: 'https://cloud.bloniea.xyz/images/Email.png' },
  ],
  tools: [
    { img_url: "https://cloud.bloniea.xyz/images/1000-1.jpg", router_name: "Reg", title: "正则表达式", subtitle: "在线测试正则表达式" },
    { img_url: "https://cloud.bloniea.xyz/images/1000-2.jpg", router_name: "Qrcode", title: "二维码生成", subtitle: "在线生成二维码" },
    { img_url: "https://cloud.bloniea.xyz/images/1000-6.jpg", router_name: "Ico", title: "图片转ico格式", subtitle: "在线图片转换ico格式" },
  ]

}
export default config
