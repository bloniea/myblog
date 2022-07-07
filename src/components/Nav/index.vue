<template>
  <nav>
    <div class="nav">
      <div class="title">
        <div class="logo" @click="$router.push('/home')">
          <img src="https://cloud.bloniea.xyz/images/logo.png" />
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
            <i :class="'iconfont' + ' ' + menu.icon"></i>{{ menu.label }}
          </li>
        </ul>
      </div>
      <!-- app导航菜单 -->
      <div class="nav-names-app" v-if="navNameShow">
        <ul>
          <li
            v-for="menu in menus"
            :key="menu.id"
            @click.stop="toPage(menu.name)"
            :class="menu.class"
          >
            <i :class="'iconfont' + ' ' + menu.icon"></i>{{ menu.label }}
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
              vLoading
              ref="avatarLoad"
            >
              <img :src="config.avatar_error" />
            </el-avatar>

            <template #dropdown>
              <el-dropdown-menu v-if="loginStatus">
                <el-dropdown-item @click="toMe">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出 </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-else>
                <el-dropdown-item @click="isShowLoginDialog"
                  >登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="app-nav" v-if="navShow">
          <i class="iconfont iconcaidan" @click.stop="shouNav"></i>
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
              @close="closeLogin"
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
                  <el-button @click="closeLogin">Cancel</el-button>
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
              @close="closeLogin"
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
                  <el-button @click="closeLogin">Cancel</el-button>
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
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import config from '@/config.js'
import { formatparams, getVal, getParams, toAuth } from '@/comm/function.js'
import { useStore } from 'vuex'
import { ElLoading } from 'element-plus'
import { getUserApi } from '@/comm/oauthFetch'

const keyword = ref('')
const navShow = ref(true)

const menus = reactive([
  { id: 1, label: '主页', name: 'Home', icon: 'iconhome', class: 'home' },
  { id: 2, label: '归档', name: 'Archive', icon: 'iconapple' },
  {
    id: 3,
    label: '分类',
    name: 'Categories',
    icon: 'icon14',
    class: 'categories',
  },
  { id: 4, label: '动漫', name: 'Anime', icon: 'iconpen', class: 'anime' },
  { id: 5, label: '友链', name: 'Friends', icon: 'iconlove', class: 'friends' },
  { id: 6, label: '工具', name: 'Tool', icon: 'iconguanyu', class: 'tool' },
  { id: 6, label: '关于', name: 'About', icon: 'iconguanyu', class: 'about' },
])
const navNameShow = ref(false)

// 路由跳转
const router = useRouter()
const toPage = (name) => {
  navNameShow.value = !navNameShow.value
  router.push({ name: name })
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

const route = useRoute()
const getArticles = () => {
  const name = ref('')
  if (localStorage.getItem('searchName')) {
    name.value =
      route.name != 'SearchDetail'
        ? route.name
        : localStorage.getItem('searchName')
  } else {
    name.value = route.name != 'SearchDetail' ? route.name : 'Home'
  }
  localStorage.setItem('searchName', name.value)
  router.push({ name: 'ReloadSearch', query: { keyword: keyword.value } })
}

const store = new useStore()
// 登录
const loginDialogVisible = computed({
  get() {
    return store.state.isShowLogin
  },
  set(v) {
    store.commit('setIsShowLogin', v)
  },
})

const gitee_github = (type) => {
  // 进入授权页面
  toAuth(type)
}
const closeLogin = () => {
  store.commit('setIsShowLogin', false)
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
// element 的需要v-loading的dom
const avatarLoad = ref(null)
// 获取token
const oauth = async () => {
  const code = localStorage.getItem('code')
  if (code && code != null) {
    const params = getParams(code)
    const avatar = ElLoading.service({
      target: avatarLoad.value.$el,
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
    })
    const res = await getUserApi(params)
    if (res.status === 200 && res.ok) {
      avatar.close()
      localStorage.removeItem('code')
      localStorage.setItem('front_token', res.data.token)
      localStorage.setItem('front_refresh_token', res.data.refresh_token)
      localStorage.setItem('front_userinfo', JSON.stringify(res.data.data))
      store.commit('setStatus', true)
      store.commit('setUserinfo', res.data.data)
    } else {
      avatar.close()
      localStorage.removeItem('code')
      ElMessage.error('登录超时,请刷新后再试')
    }
  }
}
onMounted(() => oauth())

// 显示登录表单
const isShowLoginDialog = () => {
  store.commit('setIsShowLogin', true)
  // loginDialogVisible.value = !loginDialogVisible.value
}
const logout = () => {
  localStorage.removeItem('front_token')
  localStorage.removeItem('front_refresh_token')
  localStorage.removeItem('front_userinfo')
  store.commit('setStatus', false)
}

// 获取登录状态
const loginStatus = computed(() => store.state.status)
// 获取用户信息
const userinfo = computed(() => store.state.userinfo)

const toMe = () => {
  router.push({ name: 'Me' })
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
