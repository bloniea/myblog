import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// 全局样式
import './Styles/base.styl'
// 引入iconfont
import './Styles/iconfont.styl'
import './plugins/nProgress.js'
import { vLoading } from 'element-plus/es/components/loading/src/directive'


import store from './store'
const app = createApp(App)


app.use(router).use(store).directive('load', vLoading).mount('#app')

