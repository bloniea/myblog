<script steup>
import TopProgress from '@/components/TopProgress/index.vue'
import Nav from '@/components/Nav/index.vue'
import BackToTop from '@/components/BackToTop/index.vue'
import Copyright from '@/components/Copyright/index.vue'
</script>
<template>
  <div class="container">
    <!--  顶部进度条 -->
    <TopProgress />
    <!-- 导航 -->
    <Nav></Nav>
    <!-- 主体 -->
    <main>
      <router-view />
    </main>
    <!-- 回到顶部 -->
    <BackToTop></BackToTop>
    <!-- 版权 -->
    <Copyright></Copyright>
  </div>
</template>
<style lang="stylus" scoped>
.container {
  display flex
  min-height 100vh
  flex-direction column
  justify-content space-between

}
main {
  width 800px
  margin 0px auto
  @media screen and (max-width 834px) {
    width 100%
  }
}
</style>
