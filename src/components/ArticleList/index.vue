<template>
  <article
    class="bg-shadow"
    v-if="!articles.length"
  >
    <div class="null">空空如也~</div>

  </article>
  <article
    v-else
    v-for="article in articles"
    :key="article.id"
    @click="toArticleDetail(article.id)"
    class="bg-shadow"
  >
    <div class="article-img">
      <!-- <img
        :src="article.img_url"
        alt=""
      >-->
      <el-image
        :src="article.img_url"
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
        <div class="category">
          <span class="iconfont iconfenlei"></span>
          {{article.category_name}}
        </div>
      </div>
    </div>

  </article>

</template>

<script setup>
import { beforeArticle, formatDate } from '@/comm/function.js'
import { onMounted, ref } from '@vue/runtime-core'
import config from '@/config'
const props = defineProps({
  articles: Array
})
onMounted(() => {
  const articles = props.articles
})
const emit = defineEmits(['toArticleDetail'])
const toArticleDetail = (id) => {
  emit('toArticleDetail', id)
}
</script>

<style lang="stylus" scoped>
@import 'index.styl'
</style>