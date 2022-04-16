<template>
  <div class="comments">
    <div class="title">
      <span>{{props.total}}条评论</span>
      <span>支持 <span class="special">markdown</span> 语法</span>
    </div>

    <div class="comments-box">
      <div class="tip_login">
        <el-button
          v-if="!loginStatus"
          @click="toAuth"
        >登录进行评论</el-button>
      </div>
      <div class="comment_form">
        <el-avatar
          :size="50"
          v-if="loginStatus"
          :src="user.avatar_url"
          class="user-avatar"
          @click="toUserDetail"
        ></el-avatar>
        <div
          class="input"
          v-if="loginStatus"
        >
          <div
            class="to-user"
            v-if="toUserName"
          >@{{toUserName}} <el-icon
              class="close"
              @click="clearToUser"
            >
              <close />
            </el-icon>
          </div>
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
              :loading="props.btnLoading"
            >提交</el-button>
          </div>
        </div>
      </div>

    </div>
    <!-- 评论列表 -->
    <div
      class="list_box"
      ref="commentsList"
    >
      <div
        class="list"
        v-for="comment in props.comments"
        :key="comment._id"
      >
        <div class="parent-comment">
          <div class="avatar">
            <el-avatar
              :size="50"
              :src="comment.user.avatar_url"
              @click="toUserHtml(comment.user.html_url)"
            ></el-avatar>
          </div>

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
          :key="childComment._id"
        >
          <div class="avatar">
            <el-avatar
              :size="50"
              :src="childComment.user.avatar_url"
              @click="toUserHtml(comment.user.html_url)"
            ></el-avatar>
          </div>

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
                <MdToHtml :html="childComment.to_content"></MdToHtml>
              </div>
            </div>
            <div class="content">
              <MdToHtml :html="childComment.content"></MdToHtml>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="add"
      v-if="isShow"
    >
      <el-button
        @click="loadAdd"
        :loading="props.addLoading"
      >加载更多</el-button>
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
import { Close } from '@element-plus/icons-vue'
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
  comments: Array,
  total: Number,
  btnLoading: false,
  addLoading: false
})
// 清空回复人
const clearToUser = () => {
  toUserName.value = ''
  toUserName.value = ''
}
// 将内容传回给父组件
const req = reactive({
  content: '',
  to_user_id: null,
  level: 1,
  to_comment_id: null
})

const emit = defineEmits(['saveComment', 'loadAdd'])
const saveComment = () => {
  if (!toUserName.value) {
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
  req.to_comment_id = data._id
  req.to_user_id = data.user_id
  req.level = level
  toUserName.value = data.user.name
}

// 如果为空退格清空@人的名字
const backSpace = (e) => {
  if (!e.target.selectionStart) toUserName.value = ''
  req.level = 1
}
// 个人仓库
const toUserHtml = (url) => {
  window.open(url)
}
const store = useStore()
const user = computed(() => store.state.userinfo)
const loginStatus = computed(() => store.state.status)
watch(
  () => store.state.commentStatus,
  val => val ? data.commnetInput = '' : data.commnetInput
)

// 显示预览评论
const isPreview = ref(false)
const showPreVuew = () => {
  isPreview.value = !isPreview.value
}
const getCommentsLength = (comments) => {

  let t = 0
  comments.forEach(comment => {
    t += comment.childComments.length

  })
  return t + comments.length
}
// 加载更多
const isShow = computed(() => getCommentsLength(props.comments) < props.total ? true : false)

// const addEmit = defineEmits(['loadAdd'])
const loadAdd = () => {

  emit('loadAdd')
}
const toAuth = () => {
  store.commit('setIsShowLogin', true)
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