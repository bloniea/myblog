<template>
  <!-- <div
    class="categories"
    v-if="isChildRoute"
  >
    <router-view></router-view>
  </div> -->
  <Loading v-if="loading"></Loading>
  <MyContainer v-else>

    <div class="categories">
      <div
        class="category"
        v-for="category in categoryData.categories"
        :key="category.id"
        @click="toDetail(category.id)"
        :style="`background-image:url(${category.img_url})`"
      >
        <!-- 半透明层 -->
        <div class="opacity">
          <div class="name">
            {{category.cat_name}}
          </div>
          <div class="date">
            {{formatDate(category.created_at)}}
          </div>
        </div>

      </div>
    </div>
    <Pagination
      :pagesize="categoryData.req.pagesize"
      :pagenum="categoryData.req.pagenum"
      :total="categoryData.total"
      @changePage="changePage"
    ></Pagination>
  </MyContainer>

</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Pagination from '@/components/Pagination/index.vue'
import MyContainer from '@/components/MyContainer/index.vue'
import { getCurrentInstance, reactive } from '@vue/runtime-core'
import { formatDate } from '@/comm/function.js'
import Loading from '@/components/loading/index.vue'
const route = useRoute()
const loading = ref(true)
// let isChildRoute = ref(false)
// // 判断是否存在参数id，如果存在显示该id的分类目录文章详情
// const isId = () => {
//   if (route.params.id) {
//     isChildRoute = ref(true)
//   } else {
//     isChildRoute = ref(false)
//   }
// }
// isId()
const router = useRouter()
// 路由跳转至该分类id详情页
const toDetail = id => {
  router.push({ name: 'CategoryDetail', params: { id: id } })
  // isId()
  // console.log(route.params)
}

const { proxy } = getCurrentInstance()
// 获取分类列表
const categoryData = reactive({
  categories: [],
  total: 0,
  req: {
    pagesize: 6,
    pagenum: 1
  }
})
const getCategories = async () => {
  loading.value = true
  const { data: res } = await proxy.$axios('/api/categories', { params: categoryData.req })
  if (res.meta.status != 200) return ElMessage.error(res.meta.msg)
  categoryData.categories = res.data.data
  categoryData.total = res.data.total
  loading.value = false
  // console.log(res)
}
getCategories()

const changePage = (page) => {
  categoryData.req.pagenum = page
  getCategories()
}

</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
