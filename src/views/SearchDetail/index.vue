<template>
  <Loading v-if="loading"></Loading>
  <MyContainer v-else>
    <div class="serach-detail">
      <div class="title">
        <span
          >Search: <span class="special">{{ data.req.keyword }}</span>
        </span>
        <span class="keyword">{{ data.req.query }}</span>
      </div>
      <ArticleList
        :articles="data.articles"
        @toArticleDetail="toArticleDetail"
      ></ArticleList>
    </div>
    <Pagination
      :pagesize="data.req.pagesize"
      :pagenum="data.req.pagenum"
      :total="data.total"
      @changePage="changePage"
    ></Pagination>
  </MyContainer>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import ArticleList from '@/components/ArticleList/index.vue'
import Loading from '@/components/Loading/index.vue'
import { computed, reactive } from '@vue/reactivity'
import { getCurrentInstance, onActivated, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticlesApi } from '@/comm/fetch'
const route = useRoute()
const loading = ref(false)
const keyword = computed(() => route.query.keyword)
const data = reactive({
  articles: [],
  req: {
    pagenum: 1,
    pagesize: 10,
    keyword: keyword.value,
  },
  total: 0,
})

const getArticles = async () => {
  loading.value = true
  const res = await getArticlesApi(data.req)
  if (res.status === 200 && res.ok) {
    loading.value = false
    data.articles = res.data.data
    data.total = res.data.total
  }
}

onMounted(() => {
  getArticles()
})

// 页码改变
const changePage = (page) => {
  data.req.pagenum = page
  getArticles()
}
const router = useRouter()
const toBack = () => {
  const name = localStorage.getItem('searchName')
  if (name) {
    router.replace({ name: name })
  } else {
    router.replace({ name: 'Home' })
  }
}

const watchBack = (() => {
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL)
    history.replaceState({ ...history.state, ...null }, '')
    window.addEventListener('popstate', toBack, false)
  }
})()

const toArticleDetail = (id) => {
  router.push({ name: 'ArticleDetail', params: { id: id } })
}
</script>

<style lang="stylus" scoped>
.serach-detail {
  padding 10px
  .keyword {
    color $baseColor
    font-weight bold
  }
}
</style>
