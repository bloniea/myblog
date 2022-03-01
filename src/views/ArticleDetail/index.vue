<template>
  <Loading v-if="loading"></Loading>
  <div v-else>
    <MyContainer>
      <article>
        <div class="wraper">
          <el-image
            fit="cover"
            :src="data.article.img_url"
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
        <div class="article-header">

          <el-image
            fit="cover"
            :src="headbg"
          ></el-image>
          <div class="head-bg"></div>
          <div class="title-box">
            <div class="title">
              <div class="title-name">{{data.article.title}}</div>

            </div>
            <div class="info">
              <div class="article-info">
                <span><i class="iconfont icondate"></i> {{formatDate(data.article.created_at)}}</span>
                <span
                  @click="toCategory(data.article.category_id)"
                  class="category_name"
                ><i class="iconfont iconfenlei1"></i>{{data.article.category_name}}</span>
                <!-- <span v-if="data.article.labels.length"><i class="iconfont iconlabel"></i>{{getLabels(data.article.labels)}}</span> -->
              </div>
              <div class="source">source: <span class="source-name"> {{data.article.img_source}}</span> </div>
            </div>
          </div>

        </div>
        <div class="article-content">
          <MdToHtml :html="data.article.content"></MdToHtml>
        </div>
      </article>

    </MyContainer>
    <div class="star">
      <i
        class="iconfont iconstarton stared"
        title="取消收藏"
        v-if="isStar"
        @click="delStar"
      ></i>
      <i
        class="iconfont iconstaroff "
        title="收藏"
        v-else
        @click="star"
      ></i>
    </div>

    <Comment
      @saveComment="saveComment"
      :user="user"
      :comments="data.comments"
      :total="commentTatol"
      @loadAdd="loadAdd"
    ></Comment>
  </div>

</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import MdToHtml from '@/components/MdToHtml/index.vue'
import Comment from '@/components/Comment/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'
import Loading from '@/components/Loading/index.vue'
import { formatDate } from '@/comm/function.js'
import headbg from "@/assets/head-bg.png"
import { useStore } from 'vuex'
import config from '@/config'

const store = new useStore()
// 获取存在vuex的用户信息
const user = computed(() => store.state.userinfo)
const loginStatus = computed(() => store.state.status)
// 根据id获取文章详情
const route = useRoute()
const { proxy } = getCurrentInstance()
const loading = ref(true)

const data = reactive({
  article: {},
  comments: []
})
const getArticleDetail = async () => {
  const req = {
    user_id: loginStatus.value ? user.value.id : null
  }
  loading.value = true
  const id = route.params.id
  const { data: res } = await proxy.$axios.get('/api/article/' + id, { params: req })
  data.article = res.data
  isStar.value = data.article.star
  // console.log()
  loading.value = false
  getComments()
}
getArticleDetail()
// 获取评论
const commentReq = reactive({
  pagenum: 1,
  pagesize: 2,
})
// 评论的数量
const commentTatol = ref(0)

const getComments = async () => {
  const { data: res } = await proxy.$axios.get('/api/comments/' + data.article.id, { params: commentReq })
  data.comments = res.data.data
  commentTatol.value == 0 ? res.data.total : commentTatol.value + 1
}
// 加载评论的数量
const getAddComments = async () => {
  const { data: res } = await proxy.$axios.get('/api/comments/' + data.article.id, { params: commentReq })
  const resData = res.data.data
  data.comments = [...data.comments, ...res.data.data]
  commentTatol.value = res.data.total
}
const loadAdd = () => {
  commentReq.pagenum++
  getAddComments()
}



const getLabels = (labels) => {
  const newV = labels.slice(0, 2)
  const l = newV.join(' ')
  return l
}

// 提交评论
const saveComment = async val => {
  const req = {
    article_id: data.article.id,
    user_id: user.value.id,
    to_user_id: '',
    content: '',
    level: 1,
    to_comment_id: val.to_comment_id
  }
  req.content = val.content
  req.to_user_id = val.to_user_id
  req.level = val.level
  const { data: res } = await proxy.$axios.post('/api/comment', req)
  if (res.meta.status == 200) {
    store.commit('setCommentIsNull', true)
    getComments()
    return ElMessage.success('评论成功')
  }
}

// 收藏
const isStar = ref(false)
const star = async () => {
  if (loginStatus.value) {
    const req = {
      user_id: user.value.id,
      article_id: data.article.id
    }
    const { data: res } = await proxy.$axios.post('/api/star', req)
    if (res.meta.status != 200) return ElMessage.error(res.meta.msg)
    ElMessage.success('收藏成功')
    isStar.value = true
  } else {
    ElMessage.error('请先登录')
  }

}
// 取消收藏
const delStar = async () => {
  const { data: res } = await proxy.$axios.delete('/api/delStar' + data.article.star,)
  if (res.meta.status != 200) return ElMessage.error(res.meta.msg)
  ElMessage.success('取消收藏成功')
  isStar.value = false
}
const router = useRouter()
const toCategory = (id) => {
  router.push({ name: 'CategoryDetail', params: { id: id } })
}
watch(() => store.state.status,
  (u) => getArticleDetail())
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>