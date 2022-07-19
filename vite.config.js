import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [path.resolve(__dirname, './src/Styles/variable.styl')],
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://api.bloniea.xyz/blogAdmin/api/open/',
        // target: 'http://localhost:5555/api/open/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/github_api': {
        target: 'https://github.com/login/oauth/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github_api/, '')
      },
      '/gitee_api': {
        target: 'https://gitee.com/oauth/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gitee_api/, '')
      },
      '/blogLibrary': {
        target: 'https://cloud.bloniea.xyz/library/myblog/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blogLibrary/, '')
      },
      '/cloudVideo': {
        target: 'https://drive.bloniea.xyz/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cloudVideo/, '')
      }
    },

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


// "@vitejs/plugin-vue": "^2.0.1",
// "rollup-plugin-external-globals": "^0.6.1",
// "unplugin-auto-import": "^0.5.11",
// "unplugin-vue-components": "^0.17.11",
// "vite": "^2.7.2",
// "vite-aliases": "^0.8.7",
// "vite-plugin-stylus-alias": "^1.1.1",
// "vue-md-loader": "^2.0.1"