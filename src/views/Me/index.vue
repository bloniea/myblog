<template>
  <div class="me">
    <Loading v-if="loading"></Loading>
    <MyContainer v-else>
      <div class="title">我收藏的文章:</div>
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
    </MyContainer>

  </div>
</template>

<script setup>
import Pagination from '@/components/Pagination/index.vue'

import MyContainer from '@/components/MyContainer/index.vue'
import Loading from '@/components/Loading/index.vue'
import ArticleList from '@/components/ArticleList/index.vue'
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const loading = ref(true)
const store = new useStore()
const status = computed(() => store.state.status)
const user = computed(() => store.state.userinfo)
const router = useRouter()
const data = reactive({
  req: {
    pagenum: 1,
    pagesize: 10
  },
  articles: [],
  total: 0
})
// 获取收藏文章
const getStars = async () => {
  if (status.value) {
    loading.value = true
    const id = user.value.id
    const { data: res } = await proxy.$axios.get('/api/stars/' + id, { params: data.req })
    if (res.meta.status == 200) {
      data.articles = res.data.data
      data.total = res.data.total
      loading.value = false
    }
  } else {
    router.push('/home')
  }
}
getStars()

// 跳转到详情页
const toArticleDetail = id => {
  router.push({ name: 'ArticleDetail', params: { id: id } })
}
// 页码改变方法
const changePage = p => {
  data.req.pagenum = p
  getStars()
}

</script>

<style lang="stylus" scoped>
.my-container {
  padding 20px
}
.title {
  // padding 20px 0 0 20px
  font-weight bold
}
</style>