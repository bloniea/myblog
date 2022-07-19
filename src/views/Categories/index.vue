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
        class="category bg-shadow"
        v-for="category in categoryData.categories"
        :key="category._id"
        @click="toDetail(category._id, category.cat_name)"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <div class="img">
          <el-image :src="category.img_url" fit="cover"></el-image>
        </div>
        <!-- 半透明层 -->
        <div class="opacity">
          <div class="name categoty-item-name">
            {{ category.cat_name }}
          </div>
          <div class="date">
            {{ formatDate(category.created_at) }}
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
import Loading from '@/components/Loading/index.vue'
import { getCategoriesApi } from '@/comm/fetch'
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
const toDetail = (id, cat_name) => {
  router.push({
    name: 'CategoryDetail',
    params: { id: id },
    query: { name: cat_name },
  })
}

// 获取分类列表
const categoryData = reactive({
  categories: [],
  total: 0,
  req: {
    pagesize: 10,
    pagenum: 1,
  },
})
const getCategories = async () => {
  loading.value = true
  const res = await getCategoriesApi(categoryData.req)
  if (res.status === 200 && res.ok) {
    categoryData.categories = res.data.data
    categoryData.total = res.data.total
    loading.value = false
  }
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
