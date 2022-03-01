<template>
  <div class="comments">
    <div class="title">
      <span>{{comments.length}}条评论</span>
      <span>支持 <span class="special">markdown</span> 语法</span>
    </div>

    <div class="comments-box">
      <el-avatar
        :size="50"
        v-if="props.user"
        :src="props.user.avatar_url"
        class="user-avatar"
        @click="toUserDetail"
      ></el-avatar>
      <el-avatar
        v-else
        :size="50"
        :src="config.avatar_default"
        class="user-avatar"
      ></el-avatar>
      <div class="input">
        <div
          class="to-user"
          v-if="toUserName"
        >@{{toUserName}}</div>
        <div class="comments-input  ">
          <textarea
            rows="4"
            type="textarea"
            placeholder="请输入评论内容"
            v-model="data.commnetInput"
            :class="`shadow ${toUserName ? 'is-reply' :''}`"
            @keyup.delete="backSpace"
          >  </textarea>

        </div>

        <div
          placeholder="预览"
          class="shadow pre"
          v-if="isPreview"
        >
          <MdToHtml :html="data.previewContent"></MdToHtml>

        </div>
        <div class="submit vsubmit">
          <el-button
            round
            @click="showPreVuew"
          >预览</el-button>
          <el-button
            round
            @click="saveComment(ruleFormRef)"
          >提交</el-button>
        </div>
      </div>

    </div>
    <!-- 评论列表 -->
    <div
      class="list"
      v-for="comment in props.comments"
      :key="comment.id"
    >
      <div class="parent-comment">
        <el-avatar
          :size="50"
          :src="comment.user.avatar_url"
          @click="toUserHtml(comment.user.html_url)"
        ></el-avatar>
        <div class="comment-content  bg-shadow">
          <div class="title-info ">
            <span class="username">{{comment.user.name}}</span>
            <span class="created">{{formatDate(comment.created_at)}}</span>
            <span
              class="reply"
              title="回复"
              @click="reply(comment,2)"
            ><i class="iconfont iconreply"></i></span>
          </div>
          <div class="content">
            <MdToHtml :html="comment.content"></MdToHtml>
          </div>
        </div>
      </div>
      <!-- 回复列表 -->
      <div
        class="child-comment"
        v-for="childComment in comment.childComments"
        :key="childComment.id"
      >

        <el-avatar
          :size="50"
          :src="childComment.user.avatar_url"
          @click="toUserHtml(comment.user.html_url)"
        ></el-avatar>
        <div class="comment-content bg-shadow">
          <div class="title-info">
            <span class="username"> {{childComment.user.name}}</span>
            <span class="created">{{formatDate(childComment.created_at)}}</span>
            <span
              class="reply"
              title="回复"
              @click="reply(childComment,3)"
            ><i class="iconfont iconreply"></i></span>
          </div>
          <div
            class="to_user_info"
            v-if="childComment.show"
          >
            <div class="to_user_name">
              <span class="username">@{{childComment.to_user.name}}</span>
              <span class="created">{{formatDate(childComment.created_at)}}</span>
            </div>
            <div class="to_user_content">
              <MdToHtml :html="childComment.to_user_content"></MdToHtml>
            </div>
          </div>
          <div class="content">
            <MdToHtml :html="childComment.content"></MdToHtml>
          </div>
        </div>
      </div>
    </div>
    <div
      class="add"
      v-if="isShow"
    >
      <span @click="loadAdd">加载更多</span>
    </div>
  </div>
</template>

<script   setup>
import { getCurrentInstance, reactive, watch, computed, ref, onMounted } from "@vue/runtime-core"
import { formatDate } from '@/comm/function.js'
import { useStore } from "vuex"
import MdToHtml from '@/components/MdToHtml/index.vue'
import config from '@/config'
import { useRouter } from "vue-router"

const { proxy } = getCurrentInstance()
const data = reactive({
  comments: [],
  previewContent: '预览',
  commnetInput: '',
})

// 预览内容
watch(() => data.commnetInput,
  commnetInput => data.previewContent = commnetInput || '预览'
)
// 回复谁
const toUserName = ref('')
const props = defineProps({
  user: Object,
  comments: Array,
  total: Number
})
// 将内容传回给父组件
const req = reactive({
  content: '',
  to_user_id: null,
  level: 1,
  to_comment_id: null
})

const emit = defineEmits(['saveComment', 'loadAdd'])
const saveComment = () => {
  if (!toUserName) {
    req.level = 1
    req.to_comment_id = null
  }
  if (!data.commnetInput) return ElMessage.error('请输入评论内容')
  req.content = data.commnetInput
  store.commit('setCommentIsNull', false)
  emit('saveComment', req)
}


// 回复事件
const reply = (data, level) => {
  req.to_comment_id = data.id
  req.to_user_id = data.user.id
  req.level = level
  toUserName.value = data.user.name
}

// 如果为空退格清空@人的名字
const backSpace = (e) => {
  if (!e.target.selectionStart) toUserName.value = ''
}
// 个人仓库
const toUserHtml = (url) => {
  window.open(url)
}
const store = useStore()
watch(
  () => store.state.commentStatus,
  val => val ? data.commnetInput = '' : data.commnetInput
)

// 显示预览评论
const isPreview = ref(false)
const showPreVuew = () => {
  isPreview.value = !isPreview.value
}

// 加载更多
const isShow = computed(() => props.comments.length < props.total ? true : false)
// const addEmit = defineEmits(['loadAdd'])
const loadAdd = () => {

  emit('loadAdd')
}
// 个人中心
const router = useRouter()
const toUserDetail = () => {
  router.push('/me')
}

</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>