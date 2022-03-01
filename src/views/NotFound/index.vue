<template>
  <div class="error_404">
    <MyContainer>
      <div class="img">
        <el-image src="https://cloud.bloniea.xyz/images/20220228210845.jpg"></el-image>

      </div>
      <div class="title">
        抱歉~没有此页面哦~
      </div>
      <el-button @click="$router.push('/home')">
        返回首页
      </el-button>
    </MyContainer>
  </div>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'

</script>

<style lang="stylus" scoped>
@import '../../Styles/variable.styl'
.my-container {
  text-align center
  .img {
    .el-image {
      width 20%
      box-shadow #c9ade7 0px 0px 4px 2px
    }
  }
  padding 30px 20px
  .title {
    font-size 20px
    color $baseColor
  }
  .el-button {
    color $baseColor
  }
}
</style>