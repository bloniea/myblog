<template>
  <Loading v-if="loading"></Loading>
  <MyContainer v-else>
    <article>
      <div class="wraper">
        <el-image :src="data.article.img_url"></el-image>
      </div>
      <div class="article-header">

        <el-image
          fit="cover"
          src="https://cdn.jsdelivr.net/gh/bloniea/cover@master/blog/head-bk.png"
        ></el-image>
        <div class="head-bk"></div>
        <div class="title-box">
          <div class="title">
            <div class="title-name">{{data.article.title}}</div>
          </div>
          <div class="info">
            <div class="article-info">
              <span><i class="iconfont icondate"></i> 2020-01-02</span>
              <span><i class="iconfont iconfenlei1"></i>javascript</span>
              <span><i class="iconfont iconlabel"></i>label</span>
            </div>
            <div class="source">source: <span class="source-name"> pixiv-20203434</span> </div>
          </div>
        </div>

      </div>
      <div
        class="article-content"
        v-html="mdToHtml(data.article.content)"
      >

      </div>
    </article>

  </MyContainer>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import { useRoute } from 'vue-router'
import { getCurrentInstance, reactive, ref } from 'vue'
import Loading from '@/components/Loading/index.vue'
import { mdToHtml } from '@/comm/function.js'
// 根据id获取文章详情
const route = useRoute()
const { proxy } = getCurrentInstance()
const loading = ref(true)
const data = reactive({
  article: {}
})
const getArticleDetail = async () => {
  loading.value = true
  const id = route.params.id
  const { data: res } = await proxy.$axios.get('/api/article/' + id)
  data.article = res.data
  loading.value = false
}
getArticleDetail()

</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>