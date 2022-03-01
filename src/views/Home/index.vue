<template>
  <Loading v-if="loading" />
  <div
    class="home"
    v-else
  >

    <article
      class="article article-pc"
      v-for="(article,i) in articlesData.articles"
      :key="article.id"
      :ref="setItemRef"
      @click="toArticleDetail(article.id)"
    >
      <!-- 文字在左，图片在右 -->

      <div
        class="article-box bg-shadow"
        v-if="i % 2 !== 0"
      >
        <div class="article-message">
          <h3 class="article-title">
            {{article.title}}
          </h3>
          <div
            class="article-content"
            v-html="beforeArticle(article.content)"
          >

          </div>
          <div class="more">
            <i class="iconfont iconmore"></i>
          </div>
          <div class="article-info">

            <div class="date">
              <span class="iconfont icondate"></span>
              {{formatDate(article.created_at)}}
            </div>
            <!-- <div
              class="label"
              v-if="article.labels[0]"
            >
              <span class="iconfont iconlabel"></span>
              {{article.labels[0]}}
            </div> -->
            <div
              class="category"
              @click.stop="toCategory(article.category_id)"
            >
              <span class="iconfont iconfenlei"></span>
              {{article.category_name}}
            </div>

          </div>
        </div>
        <div class="article-img">
          <el-image
            :src="article.img_url"
            class="img"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <el-image
                  :src="config.defaultImgUrl"
                  fit="cover"
                ></el-image>
              </div>
            </template>
          </el-image>
          <!-- <img
            :src="article.img_url"
            @error="imgExists(article)"
          > -->
        </div>
      </div>
      <!-- 文字在右，图片在左 -->
      <div
        class="article-box  bg-shadow"
        v-else
      >
        <div class="article-img">
          <el-image
            :src="article.img_url"
            class="img"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <el-image
                  :src="config.defaultImgUrl"
                  fit="cover"
                ></el-image>
              </div>
            </template>
          </el-image>
        </div>
        <div class="article-message">
          <h3 class="article-title">
            {{article.title}}
          </h3>

          <div
            class="article-content"
            v-html="beforeArticle(article.content)"
          >

          </div>
          <div class="more">
            <i class="iconfont iconmore"></i>
          </div>
          <div class="article-info">

            <div class="date">
              <span class="iconfont icondate"></span>
              {{formatDate(article.created_at)}}
            </div>
            <!-- <div
              class="label"
              v-if="article.labels[0]"
            >
              <span class="iconfont iconlabel"></span>
              {{article.labels[0]}}
            </div> -->
            <div
              class="category"
              @click.stop="toCategory(article.category_id)"
            >
              <span class="iconfont iconfenlei"></span>
              {{article.category_name}}
            </div>

          </div>
        </div>

      </div>
    </article>

    <!-- 移动端 <=768 -->
    <article
      class="article article-app"
      v-for="(article,i) in articlesData.articles"
      :key="i"
      @click="toArticleDetail(article.id)"
    >
      <div class="article-box bg-shadow">

        <div class="article-img">
          <el-image
            :src="article.img_url"
            class="img"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <el-image
                  :src="config.defaultImgUrl"
                  fit="cover"
                ></el-image>
              </div>
            </template>
          </el-image>
        </div>
        <div class="article-message">
          <h3 class="article-title">
            {{article.title}}
          </h3>
          <div
            class="article-content"
            v-html="beforeArticle(article.content)"
          >

          </div>
          <div class="more">
            <i class="iconfont iconmore"></i>
          </div>
          <div class="article-info">
            <div class="date">
              <span class="iconfont icondate"></span>
              {{formatDate(article.created_at)}}
            </div>
            <!-- <div
              class="label"
              v-if="article.labels[0]"
            >
              <span class="iconfont iconlabel"></span>
              {{article.labels[0]}}
            </div> -->
            <div
              class="category"
              @click.stop="toCategory(article.category_id)"
            >
              <span class="iconfont iconfenlei"></span>
              {{article.category_name}}
            </div>

          </div>
        </div>

      </div>
    </article>
    <Pagination
      :pagesize="articlesData.req.pagesize"
      :pagenum="articlesData.req.pagenum"
      :total="articlesData.total"
      @changePage="changePage"
    ></Pagination>
  </div>

  <!-- <Loading></Loading> -->
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { ref } from 'vue'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { marked } from 'marked'
import { formatDate, beforeArticle } from '@/comm/function.js'
const { proxy } = getCurrentInstance()
import Loading from '@/components/loading/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import config from '@/config.js'
import { useRouter } from 'vue-router'
import MdToHtml from '@/components/MdToHtml/index.vue'

const loading = ref(true)

const data = reactive({
  divArr: []
})
const setItemRef = e => {
  if (e) {
    data.divArr.push(e)
  }
}
onMounted(() => {
  data.divArr.forEach(div => {
    // console.log(div.offsetTop)
  })
})

// 获取文章列表
const articlesData = reactive({
  articles: '',
  req: {
    pagesize: 10,
    pagenum: 1,
    query: ''
  },
  total: 0

})
// 获取文章
const getArticles = async () => {
  loading.value = true
  const { data: res } = await proxy.$axios('/api/articles', { params: articlesData.req })
  // console.log(res)
  if (res.meta.status != 200) return ElMessage.success(res.meta.msg)
  loading.value = false
  articlesData.articles = res.data.data
  articlesData.total = res.data.total
  // console.log(articlesData.articles)
}
getArticles()

// 页码改变的方法
const changePage = (val) => {
  articlesData.req.pagenum = val
  getArticles()
}

// 跳转到文章详情页面
const router = useRouter()
const toArticleDetail = (id) => {

  router.push({ name: 'ArticleDetail', params: { id: id } })
}

// 跳转到文章分类详情
const toCategory = (id) => {
  router.push({ name: 'CategoryDetail', params: { id: id } })
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
