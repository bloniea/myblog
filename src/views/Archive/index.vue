<template>
  <Loading v-if="loading"></Loading>

  <MyContainer v-else>
    <ArticleList
      :articles="article.list"
      @toArticleDetail="toArticleDetail"
    ></ArticleList>
    <Pagination
      :pagesize="article.req.pagesize"
      :pagenum="article.req.pagenum"
      :total="article.total"
      @changePage="changePage"
    ></Pagination>
  </MyContainer>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import Loading from '@/components/Loading/index.vue'
import ArticleList from '@/components/ArticleList/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { reactive, ref } from '@vue/reactivity'
import { getArticlesApi } from '../../comm/fetch'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)

const article = reactive({
  req: {
    pagesize: 10,
    pagenum: 1,
  },
  list: [],
  total: 0,
})
// 获取文章
const getArticles = async () => {
  loading.value = true
  const res = await getArticlesApi(article.req)
  if (res.status === 200 && res.ok) {
    loading.value = false
    article.list = res.data.data
    article.total = res.data.total
  }
}
getArticles()

const toArticleDetail = (id) => {
  router.push({ name: 'ArticleDetail', params: { id: id } })
}
const changePage = (page) => {
  article.req.pagenum = page
  getArticles()
}
</script>

<style lang="stylus" scoped>
.my-container {
  padding 10px
}
</style>
