import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [path.resolve(__dirname, "./src/Styles/variable.styl")],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    host: "0.0.0.0",
    proxy: {
<<<<<<< HEAD
      "/blogapi": {
        target: "https://blogapi.bloniea.com/api/open/",
=======
      '/blogapi': {
        target: 'http://121.37.40.51:6660/api/open/',
>>>>>>> bc0cb05b30fc052fdfcd96e238da9db5740eb5c3
        // target: 'https://api.bloniea.xyz/blogAdmin/api/open/12',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blogapi/, ""),
      },
      "/github_api": {
        target: "https://github.com/login/oauth/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github_api/, ""),
      },
      "/gitee_api": {
        target: "https://gitee.com/oauth/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gitee_api/, ""),
      },
      "/mycdn": {
        target: "https://cdn.bloniea.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mycdn/, ""),
      },
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
