import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('../views/Home/index.vue')
const Categories = () => import('../views/Categories/index.vue')
const CategoryDetail = () => import('../views/CategoryDetail/index.vue')
const ArticleDetail = () => import('../views/ArticleDetail/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
