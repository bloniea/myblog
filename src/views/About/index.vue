<template>
  <div class="about">
    <MyContainer>
      <div class="top">
        <div class="avatar">
          <el-avatar :size="140" :src="config.avatar_img"></el-avatar>
        </div>
        <div class="info">
          <div
            class="info-list"
            v-for="title in config.aboutTitles"
            :key="title"
          >
            <i class="iconfont iconshandian"></i>
            <span v-html="title.title"></span>
          </div>
        </div>
      </div>
      <div class="contact">
        <el-avatar
          class="contact-list"
          v-for="contact in config.contacts"
          :key="contact"
          :src="contact.img_url"
          @click="toContact(contact.url)"
        >
          <img :src="config.avatar_error"
        /></el-avatar>
      </div>
    </MyContainer>
  </div>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import config from '@/config'

const toContact = (url) => {
  window.open(url)
}
</script>

<style lang="stylus" scoped>
@import '../../Styles/variable.styl'
.about {
  .my-container {
    padding 20px
    .top {
      display flex
      .avatar {
        width 8.75rem
        height 8.75rem
      }
      .info {
        margin-left 50px
        .info-list {
          margin 10px 0
        }
      }
    }
    .contact {
      margin-top 20px
      text-align center
      display flex
      justify-content center
      .el-avatar {
        margin 0 20px
      }
      .contact-list {
        // padding 0 20px
        cursor pointer
        // border 3px solid !important
        &:hover {
          // color $baseColor
        }
      }
    }
  }
}
</style>
