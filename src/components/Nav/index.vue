<template>
  <nav>
    <div class="nav">
      <div class="title">
        <div
          class="logo"
          @click="$router.push('/home')"
        >
          <img src="https://cloud.bloniea.xyz/images/logo.png">
        </div>
        <!-- bloniea -->
      </div>
      <!-- pc导航菜单 -->
      <div class="nav-names">
        <ul>
          <li
            v-for="menu in menus"
            :key="menu.id"
            @click="toPage(menu.name)"
            :class="menu.class"
          >
            <i :class="'iconfont'+' '+menu.icon"></i>{{menu.label}}
          </li>

        </ul>
      </div>
      <!-- app导航菜单 -->
      <div
        class="nav-names-app"
        v-if="navNameShow"
      >
        <ul>
          <li
            v-for="menu in menus"
            :key="menu.id"
            @click.stop="toPage(menu.name)"
            :class="menu.class"
          >
            <i :class="'iconfont'+' '+menu.icon"></i>{{menu.label}}
          </li>
        </ul>
      </div>
      <!-- 菜单显示按钮和搜索按钮 -->
      <div class="option">

        <div class="search">
          <el-input
            v-model="keyword"
            placeholder="search"
            :suffix-icon="Search"
            @keyup.enter="getArticles"
          />
        </div>
        <div class="user">

          <el-dropdown>
            <el-avatar
              :size="40"
              :src="userinfo.avatar_url"
              v-if="loginStatus"
              @click="toMe"
            >
              <img :src="config.avatar_error" />
            </el-avatar>

            <el-avatar
              :size="50"
              :src="config.avatar_default"
              v-else
            >

              <img :src="config.avatar_error" />
            </el-avatar>

            <template #dropdown>
              <el-dropdown-menu v-if="loginStatus">
                <el-dropdown-item @click="toMe">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出 </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-else>
                <el-dropdown-item @click="isShowLoginDialog">登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
        <div
          class="app-nav"
          v-if="navShow"
        >
          <i
            class="iconfont iconcaidan"
            @click.stop="shouNav"
          ></i>
        </div>
        <!-- <i
            class="iconfont iconcustom-user"
            @click="loginDialogVisible=true"
          ></i> -->

        <!-- 登录表单 -->
        <div class="login-input">
          <div class="login-pc">
            <el-dialog
              v-model="loginDialogVisible"
              title="请登录"
              width="30%"
              center
              custom-class="login"
            >
              <div class="login-btns">
                <div class="gitee">
                  <el-button @click="gitee_github('gitee')">gitee</el-button>
                </div>
                <div class="github">
                  <el-button @click="gitee_github('github')">github</el-button>
                </div>

              </div>
              <template #footer>
                <span class="login-footer">
                  <el-button @click="isShowLoginDialog">Cancel</el-button>
                </span>
              </template>
            </el-dialog>
          </div>
          <div class="login-app">
            <el-dialog
              v-model="loginDialogVisible"
              title="请登录"
              width="70%"
              center
              custom-class="login"
            >
              <div class="login-btns">
                <div class="gitee">
                  <el-button>gitee</el-button>
                </div>
                <div class="github">
                  <el-button>github</el-button>
                </div>

              </div>
              <template #footer>
                <span class="login-footer">
                  <el-button @click="isShowLoginDialog">Cancel</el-button>
                </span>
              </template>
            </el-dialog>
          </div>

        </div>

      </div>
    </div>
  </nav>

</template>

<script setup>
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import config from '@/config.js'
import { isLogin, formatparams, getVal, getParams } from '@/comm/function.js'
import { useStore } from 'vuex'
import { ElLoading, ElMessageBox } from 'element-plus'
// import Login from '@/components/Login/index.vue'
const keyword = ref('')
const navShow = ref(true)
const { proxy } = getCurrentInstance()
const menus = reactive([
  { id: 1, label: '主页', name: 'home', icon: 'iconhome', class: 'home' },
  // { id: 2, label: '归档', icon: 'iconapple' },
  { id: 3, label: '分类', name: 'Categories', icon: 'icon14', class: 'categories' },
  // { id: 4, label: '标签', icon: 'iconpen' },
  { id: 5, label: '友链', name: 'Friends', icon: 'iconlove', class: 'friends' },
  { id: 6, label: '关于', name: 'About', icon: 'iconguanyu', class: 'about' }
])
const navNameShow = ref(false)


// 路由跳转
const router = useRouter()
const toPage = (name) => {
  navNameShow.value = !navNameShow.value
  router.push('/' + name)
}
// app 端显示隐藏菜单
const shouNav = () => {
  navNameShow.value = !navNameShow.value
}

// 如果app导航栏显示，app端监听touchstart事件将其隐藏，pc端则监听click
const listenEvent = (() => {
  const fun = () => {
    if (navNameShow.value) {
      navNameShow.value = !navNameShow
    }
  }
  document.addEventListener('touch', fun)
  document.removeEventListener('touch', fun, true)
  document.addEventListener('click', fun)
  document.removeEventListener('click', fun, true)
  document.addEventListener('scroll', fun)
  document.removeEventListener('scroll', fun, true)
})()
const clearLoaclstorage = () => {
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('code')
  localStorage.removeItem('access_token')
  localStorage.removeItem('type')
  localStorage.removeItem('userinfo')

}
const route = useRoute()
const getArticles = () => {
  const name = ref('')
  if (localStorage.getItem('searchName')) {
    name.value = route.name != 'SearchDetail' ? route.name : localStorage.getItem('searchName')

  } else {
    name.value = route.name != 'SearchDetail' ? route.name : 'Home'
  }
  localStorage.setItem('searchName', name.value)
  router.push({ name: 'ReloadSearch', query: { keyword: keyword.value } })
}

const store = new useStore()
// 登录
const loginDialogVisible = ref(false)
const gitee_github = type => {
  // 进入授权页面
  toAuth(type)
  console.log(type)
}
// 生成7位随机数
const getRandom = () => {
  let str = ''
  for (let i = 0, len = 7; i < len; i++) {
    let num = Math.floor(Math.random() * 10)
    str += num.toString()
  }
  return str
}

// 获取路由路径
const setRouterPath = () => {
  let path = window.location.pathname + window.location.search
  const index = path.indexOf('code=')
  if (index > -1) {
    path = path.substring(0, index - 1)
  }
  localStorage.setItem('path', path)
}
// 进入授权页面方法
const toAuth = type => {
  console.log(type)
  if (type) {
    setRouterPath()
    let req = {}
    localStorage.setItem('type', type)
    // let apiUrl = ''
    if (type == 'gitee') {
      req.client_id = config.auth[type].client_id
      req.redirect_uri = config.auth.redirect_uri
      req.response_type = 'code'
      req.scope = 'user_info'
      // apiUrl = config.auth['type'].oauth_api+'/authorize/'
    }
    if (type == 'github') {
      req.client_id = config.auth[type].client_id
      req.redirect_uri = encodeURIComponent(window.location.href)
      req.state = getRandom()
      // apiUrl = '/github_api/authorize/'
    }
    const params = formatparams(req)
    const apiUrl = config.auth[type].oauth_api + '/authorize/'
    // console.log(apiUrl + params)
    window.location.href = apiUrl + params
  }
}

// 授权后返回执行,保存code并刷新当前页面使url不显示code值
const saveCode = (() => {
  const url = window.location.href
  const code = getVal(url, 'code=')
  if (code) {
    localStorage.setItem('code', code)
    router.push({ name: 'Refresh' })
  }

})()

// 获取token
const getToken = (() => {
  const code = localStorage.getItem('code')
  if (code && code != null) {
    const params = getParams(code)
    const type = localStorage.getItem('type')
    let apiUrl = config.auth[type].oauth_api_p + config.auth[type].token
    ElMessage({
      message: '登录中',
      type: 'info',
      duration: 0
    })
    proxy.$axios({
      url: apiUrl,
      method: 'post',
      headers: { Accept: 'application/json' },
      data: params
    })
      .then(async ({ data: res }) => {
        localStorage.removeItem('code')
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('refresh_token', res.refresh_token)
        getUserInfo()

      })
      .catch(() => {
        ElMessage.closeAll()
        ElMessage.error('登录失败，网络超时')
      })
  }
})()


// 获取用户信息
const getUserInfo = () => {
  const token = localStorage.getItem('access_token')
  const type = localStorage.getItem('type')
  if (token && token != '' && type && type != '') {
    let data = null
    if (type == 'gitee') {
      data = { params: { access_token: token } }
    } else if (type == 'github') {
      data = { params: { access_token: token }, headers: { Authorization: 'bearer ' + token } }
    }
    proxy.$axios.get(config.auth[type].api + 'user', data)
      .then(({ data: user }) => {
        saveUser(user)

      })
      .catch(async () => {
        const refresh_token = localStorage.getItem('refresh_token')
        if (refresh_token && refresh_token != '') {
          const req = {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
          }
          const { data: res } = await proxy.$axios.post(config.auth[type].oauth_api + 'token', { params: req })
          localStorage.setItem('access_token', res.access_token)
          localStorage.setItem('refresh_token', res.refresh_token)
          getUserInfo()

        } else {
          ElMessage.error('登录失效,请重新登录')
          clearLoaclstorage()
        }
      })
  } else {
    ElMessage.error('登录失效,请重新登录')
    clearLoaclstorage()
  }


}
// 保存用户到数据库
const saveUser = async (user) => {
  const req = {
    id: user.id,
    name: user.name,
    avatar_url: user.avatar_url,
    html_url: user.html_url
  }
  const { data: res } = await proxy.$axios.post('/api/saveuser', req)
  if (res.meta.status != 200) {
    clearLoaclstorage()
    ElMessage.closeAll()
    ElMessage.error('网络超时')
  }
  localStorage.setItem('userinfo', JSON.stringify(user))
  store.commit('setStatus', true)
  store.commit('setUserinfo', user)

  ElMessage.closeAll()
  setTimeout(() => {
    ElMessage.success('登录成功')
  }, 1500)


}
// 显示登录表单
const isShowLoginDialog = () => {
  loginDialogVisible.value = !loginDialogVisible.value
}
const logout = () => {
  clearLoaclstorage()
  store.commit('setStatus', false)
  // data.login = false
}

// 获取登录状态
const loginStatus = computed(() => store.state.status)
// 获取用户信息
const userinfo = computed(() => store.state.userinfo)

const loginLoading = ref(true)

const toMe = () => {
  router.push({ name: 'Me' })
}
</script>

<style lang='styl' scoped>
@import './index.styl';
</style>
