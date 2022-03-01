<template>
  <Loading v-if="loading"></Loading>

  <MyContainer v-else>
    <div class="category-detail">
      <div class="title">
        <span> Category:</span>
        <span class="cate-name">{{data.cat_name}} <i
            class="iconfont iconclose"
            @click="last"
          ></i> </span>
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

import Pagination from '@/components/Pagination/index.vue'
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const last = () => {
  router.go(-1)
}
const { proxy } = getCurrentInstance()
const data = reactive({
  articles: [],
  cat_name: '',
  req: {
    pagesize: 2,
    pagenum: 1
  },
  total: 0
})
// 根据分类id获取该分类发文章
const getCategoryDetail = async () => {
  loading.value = true
  const id = route.params.id
  const { data: res } = await proxy.$axios.get('/api/category/' + id, { params: data.req })
  if (res.meta.status == 200) {
    data.articles = res.data.data
    data.cat_name = res.data.cat_name
    data.total = res.data.total
    // console.log(res)
    loading.value = false
  }
}
getCategoryDetail()
// 页码改变
const changePage = page => {
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
