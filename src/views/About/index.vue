<template>
  <div class="about">
    <MyContainer>
      <div class="top">
        <div class="avatar">
          <el-avatar
            :size="140"
            src="https://cloud.bloniea.xyz/images/avatar.png"
          ></el-avatar>
        </div>
        <div class="info">
          <div
            class="info-list"
            v-for="title in config.aboutTitles"
            :key="title"
          ><i class="iconfont iconshandian"></i> {{title.title}}</div>
          <!-- <div class="info-list"><i class="iconfont iconshandian"></i>百合控</div>
          <div class="info-list"><i class="iconfont iconshandian"></i>我思,故百合在,然而百合却不需要我的存在</div>
          <div class="info-list"><i class="iconfont iconshandian"></i>我只想说没文化真可怕</div> -->
        </div>
      </div>
      <div class="contact">
        <!-- <div class="contact-list">
          <i class="iconfont icongitee"></i>
        </div>
        <div class="contact-list">
           tencent://message/?uin=2032580075&Site=Bronya 粉丝后援会&Menu=yes
         <i class="iconfont iconQQ"></i>
        </div> -->
        <el-avatar
          class="contact-list"
          v-for="contact in config.contacts"
          :key="contact"
          :src="contact.img_url"
          @click="toContact(contact.url)"
        > <img :src="config.avatar_error" /></el-avatar>
        <!-- <el-avatar
          class="contact-list"
          src="https://cloud.bloniea.xyz/images/QQ.png"
          @click="toContact('tencent://message/?uin=2032580075&Site=bloniea&Menu=yes')"
        > <img :src="config.avatar_error" /></el-avatar>
        <el-avatar
          class="contact-list"
          src="https://cloud.bloniea.xyz/images/Email.png"
          @click="toContact('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tdHQ2dzG3dTZ2sPQ2czM2vXExJvW2tg')"
        > <img :src="config.avatar_error" /></el-avatar> -->

      </div>

    </MyContainer>
  </div>

</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import config from '@/config'
const toContact = (url) => {
  window.location.href = url
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