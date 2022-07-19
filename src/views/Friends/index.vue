<template>
  <Loading v-if="loading"></Loading>
  <MyContainer v-else>
    <div>欢迎各位大佬交换友链</div>
    <div>title:<span class="special">bloniea</span></div>
    <div>Bio:<span class="special">百合爱好者</span></div>
    <div>
      URL:<a :href="config.url">{{ config.url }}</a>
    </div>
    <div>
      Avatar: <a :href="config.avatar">{{ config.avatar }}</a>
    </div>
    <div class="friends">
      <div
        class="friends-item"
        v-for="friend in friends.list"
        :key="friend.id"
        @click="to(friend.url)"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <el-image lazy fit="cover" :src="friend.img_url"></el-image>
        <div class="layer">
          <div class="layer-top"></div>
          <div class="layer-down"></div>
          <el-avatar :size="50" :src="friend.avatar"></el-avatar>
          <div class="title">
            {{ friend.title }}
          </div>
        </div>
      </div>
    </div>
  </MyContainer>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import { getCurrentInstance, reactive, ref } from 'vue'
import Loading from '@/components/Loading/index.vue'
import config from '@/config'
import { getFriendsApi } from '@/comm/fetch'
const { proxy } = getCurrentInstance()
const friends = reactive({
  list: [],
})
const loading = ref(false)
const getFriends = (async () => {
  loading.value = true
  const res = await getFriendsApi()
  if (res.status === 200 && res.ok) {
    friends.list = res.data.data
    loading.value = false
  }
})()

const to = (url) => {
  window.open(url)
}
</script>

<style lang="stylus" scoped>
.my-container {
  padding 20px
  a {
    &:hover {
      text-decoration underline
    }
  }
  .friends {
    margin-top 20px
    display flex
    // justify-content space-between
    flex-wrap wrap
    .friends-item {
      width 32%
      height 120px
      margin 0 (4% / 6) 20px (4% / 6)
      cursor $my-cursor-pointer
      position relative
      overflow hidden
      // margin-bottom 20px
      .el-image {
        width 100%
        height 100%
      }
      &:hover {
        .layer {
          transform translateY(-100%)
        }
      }
      .layer {
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        transition all 0.4s
        .layer-top {
          position absolute
          top 0
          bottom 50%
          left 0
          right 0
          background rgba(255, 255, 255, 0.3)
        }
        .layer-down {
          position absolute
          top 50%
          bottom 0
          left 0
          right 0
          background rgba(255, 255, 255, 0.8)
        }
        .el-avatar {
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
        }
        .title {
          position absolute
          bottom 10px
          text-align center
          width 100%
        }
      }
    }
  }
}
@media screen and (max-width 768px) {
  .my-container .friends .friends-item {
    width 47%
  }
}
@media screen and (max-width 300px) {
  .my-container .friends .friends-item {
    width 100%
  }
}
</style>
