import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
// 全局样式
import './Styles/base.styl'
// 引入iconfont
import './Styles/iconfont.styl'
import './plugins/nProgress.js'
// 点击显示文字动画
import showText from './plugins/showText.js'
// showText(['行也欢喜', '停也欢喜', '眉目带笑', '醉如春风', '浮生如梦', '岁月如舟'])
import { vLoading } from 'element-plus/es/components/loading/src/directive'
import store from './store'
import config from './config'
let title = config.title
const titleChange = () => {
  var keyList = title.split("");
  var firstChar = keyList.shift();
  keyList.push(firstChar);
  title = keyList.join("");
  document.title = title;
}
setInterval(titleChange, 500);

const app = createApp(App)
// 调用文字动画方法
// showText(['岛村和安达结婚吧', '布洛妮娅和希儿结婚吧'])

app.use(router).use(store).directive('load', vLoading).mount('#app')

