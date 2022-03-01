import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    const token = localStorage.getItem('access_token')
    const userinfo = localStorage.getItem('userinfo')
    return {
      token: token || '',
      userinfo: JSON.parse(userinfo) || null,
      status: (token && userinfo) ? true : false,
      // 用于监听是不是清空评论内容
      commentStatus: false
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