<template>
  <Loading v-if="loading"></Loading>

  <MyContainer v-else>
    <div class="category-detail">
      <div class="title">
        <span> Category:</span>
        <span class="cate-name"
          >{{ data.cat_name }} <i class="iconfont iconclose" @click="last"></i>
        </span>
      </div>
      <ArticleList
        :articles="data.articles"
        @toArticleDetail="toArticleDetail"
      ></ArticleList>
      <Pagination
        :pagesize="data.req.pagesize"
        :pagenum="data.req.pagenum"
        :total="data.total"
        @changePage="changePage"
      ></Pagination>
    </div>
  </MyContainer>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import MyContainer from '@/components/MyContainer/index.vue'
import Loading from '@/components/Loading/index.vue'
import ArticleList from '@/components/ArticleList/index.vue'
import { getCurrentInstance, ref } from 'vue'
import { getArticlesApi } from '@/comm/fetch'
import Pagination from '@/components/Pagination/index.vue'
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const last = () => {
  router.push({ name: 'Categories' })
}

const data = reactive({
  articles: [],
  cat_name: '',
  req: {
    pagesize: 10,
    pagenum: 1,
    category_id: null,
  },
  total: 0,
})
// 根据分类id获取该分类发文章
const getCategoryDetail = async () => {
  loading.value = true
  data.cat_name = route.query.name
  const id = route.params.id
  data.req.category_id = id
  const res = await getArticlesApi(data.req)
  if (res.status === 200 && res.ok) {
    data.articles = res.data.data

    data.total = res.data.total
    loading.value = false
  } else {
    router.push({ name: 'NotFound' })
  }
}
getCategoryDetail()
// 页码改变
const changePage = (page) => {
  data.req.pagenum = page
  getCategoryDetail()
}

const toArticleDetail = (id) => {
  router.push({ name: 'ArticleDetail', params: { id: id } })
}
</script>

<style lang="styl" scoped>
@import './index.styl';
</style>
