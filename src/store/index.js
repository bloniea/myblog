import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    const token = localStorage.getItem('front_token')
    const userinfo = localStorage.getItem('front_userinfo')
    const front_refresh_token = localStorage.getItem('front_refresh_token')
    return {
      token: token || '',
      refresh_token: front_refresh_token || '',
      userinfo: JSON.parse(userinfo) || null,
      status: (userinfo && userinfo != 'undefined') ? true : false,
      // 用于监听是不是清空评论内容
      commentStatus: false,
      // 登录表单
      isShowLogin: false
    }
  },
  mutations: {
    setStatus (state, val) {
      state.status = val
    },
    setUserinfo (state, val) {
      state.userinfo = val
    },
    setCommentIsNull (state, val) {
      state.commentStatus = val
    },
    setIsShowLogin (state, val) {
      state.isShowLogin = val
    }
  }
  // getters: {
  //   status (state) {
  //     if (state.token && state.token != '' && state.userinfo && state.userinfo != '') {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
})

export default store