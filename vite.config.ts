import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vitePluginStylusAlias from 'vite-plugin-stylus-alias'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginStylusAlias(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve:{
    alias: {  
    "@": path.resolve(__dirname, "src"),
    }
  },
  // productionSourceMap: false,
  // publicPath: '/',

  server: {
    proxy: {
      '/api': {
        target: 'http://blogadmin.ccc/api/open/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },

  
})


// module.exports = {
//   plugins: [vue(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()],
//     }),
//   ],
//   resolve:{
//     alias: {  
//     "@": path.resolve(__dirname, "src"),
//     },
//   },
//   productionSourceMap: false,
//   publicPath: '/',

//   server: {
//     proxy: {
//       '/api': { // 这里最好有一个 /
//         target: 'http://blogadmin.ccc/api/open/v1/', // 后台接口域名
//         changeOrigin: true, // 是否跨域
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }
