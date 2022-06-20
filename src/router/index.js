import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const Home = () => import('../views/Home/index.vue')
const Archive = () => import('../views/Archive/index.vue')
const Categories = () => import('../views/Categories/index.vue')
const CategoryDetail = () => import('../views/CategoryDetail/index.vue')
const ArticleDetail = () => import('../views/ArticleDetail/index.vue')
const SearchDetail = () => import('../views/SearchDetail/index.vue')
const ReloadSearch = () => import('../views/ReloadSearch/index.vue')
const Refresh = () => import('../views/Refresh/index.vue')
const Me = () => import('../views/Me/index.vue')
const About = () => import('../views/About/index.vue')
const Friends = () => import('../views/Friends/index.vue')
const NotFound = () => import('../views/NotFound/index.vue')
const Anime = () => import('../views/Anime/index.vue')
const Tool = () => import('../views/Tool/index.vue')
const Reg = () => import('../views/Tool/Reg/index.vue')
const Qrcode = () => import('../views/Tool/Qrcode/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/category/:id',
    name: 'CategoryDetail',
    component: CategoryDetail
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/search',
    name: 'SearchDetail',
    component: SearchDetail,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/reloadsearch',
    name: 'ReloadSearch',
    component: ReloadSearch
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: Refresh
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/anime',
    name: 'Anime',
    component: Anime
  },
  {
    path: "/tool",
    name: "Tool",
    component: Tool,
    children: [
      {
        path: "reg",
        name: "Reg",
        component: Reg,
        meta: { tool: true }
      },
      {
        path: "qrcode",
        name: "Qrcode",
        component: Qrcode,
        meta: { tool: true }
      }
    ]
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})

export default router
