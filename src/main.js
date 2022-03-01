import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// 全局样式
import './Styles/base.styl'
// 引入iconfont
import './Styles/iconfont.styl'
import './plugins/nProgress.js'
// 引入axios
import axios from './axios'

import store from './store'
const app = createApp(App)
app.config.globalProperties.$axios = axios

app.use(router).use(store).mount('#app')

