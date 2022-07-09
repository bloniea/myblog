<template>
  <article
    class="bg-shadow"
    v-if="!articles.length"
    data-aos="flip-left"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000"
  >
    <div class="null">空空如也~</div>
  </article>
  <article
    v-else
    v-for="article in articles"
    :key="article._id"
    @click="toArticleDetail(article._id)"
    class="bg-shadow"
    data-aos="flip-left"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000"
  >
    <div class="article-img">
      <!-- <img
        :src="article.img_url"
        alt=""
      >-->
      <el-image lazy :src="article.img_url" fit="cover">
        <template #error>
          <div class="image-slot">
            <el-image lazy :src="config.defaultImgUrl" fit="cover"></el-image>
          </div>
        </template>
      </el-image>
    </div>

    <div class="article-message">
      <h3 class="article-title gradient-title">
        {{ article.title }}
      </h3>
      <div
        class="article-content"
        v-html="beforeArticle(article.content)"
      ></div>
      <div class="more">
        <i class="iconfont iconmore"></i>
      </div>
      <div class="article-info">
        <div class="date">
          <span class="iconfont icondate"></span>
          {{ formatDate(article.created_at) }}
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
          @click.stop="
            toCategory(article.category._id, article.category.cat_name)
          "
        >
          <span class="iconfont iconfenlei"></span>
          {{ article.category.cat_name }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { beforeArticle, formatDate } from '@/comm/function.js'
import { onMounted, ref } from '@vue/runtime-core'
import config from '@/config'
import { useRouter } from 'vue-router'

const props = defineProps({
  articles: Array,
})
onMounted(() => {
  const articles = props.articles
})
const emit = defineEmits(['toArticleDetail'])
const toArticleDetail = (id) => {
  emit('toArticleDetail', id)
}
const router = useRouter()
const toCategory = (id, name) => {
  router.push({
    name: 'CategoryDetail',
    params: { id: id },
    query: { name: name },
  })
}
</script>

<style lang="stylus" scoped>
@import 'index.styl'
</style>
