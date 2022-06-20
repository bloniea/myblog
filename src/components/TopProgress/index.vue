<template>
  <div class="progress-box">
    <div class="top-progress" :style="'width:' + data.width + '%;'"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

const data = reactive({
  width: 0,
})
const scroll = () => {
  // let width = ref(0)
  document.addEventListener('scroll', (e) => {
    // 滚动总高度
    const scrollHeight = document.documentElement.scrollHeight
    // 页面可视化高度
    const windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    // 滚动条距离顶部
    // 滚动条在最底部距离顶部出现了偏差，使用向上取整使它和在顶部距离底部的距离一致
    // 这样滚动条在最顶部距离底部 === 滚动条在最底部距离顶部
    const scrollTop = Math.ceil(
      document.documentElement.scrollTop || document.body.scrollTop
    )
    // 滚动条距离底部
    const scrollBottom = scrollHeight - scrollTop - windowHeight
    // 滚动条高度
    const scrollBtn = scrollHeight - scrollTop - scrollBottom

    data.width = Math.round((scrollTop / (scrollHeight - scrollBtn)) * 100)
  })
}
onMounted(() => {
  scroll()
})
</script>

<style lang="stylus" scoped>
.progress-box {
  position fixed
  top 0
  right 0
  left 0
  z-index 100
  // bottom 0
  // overflow scroll
  // height 100vh
}
.top-progress {
  // position absolute
  height 4px
  background rgba(184, 84, 212, 0.6)
  // top 0
  // left 0
  transition width 0.5s
}
</style>

<style lang="stylus"></style>
