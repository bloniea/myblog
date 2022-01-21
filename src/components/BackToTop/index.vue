<template>
  <div class="back-to-top">
    <div
      class="cat"
      :style="'transform:translateY(-'+data.height+'px)'"
      @click="toTop"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from '@vue/reactivity'
import { onMounted, onUnmounted } from '@vue/runtime-core'

const data = reactive({
  // back-top
  defaultBackTopHeight: 900,
  height: 900
})
const scroll = () => {
  // 获取可视化高度
  const windowHeight = document.documentElement.clientHeight
  // 获取滚动条距离顶部
  const scrollTop = document.documentElement.scrollTop
  if (scrollTop > 200) {
    // 如果滚动条距离顶部大于200则显示回到顶部猫
    data.height = data.defaultBackTopHeight - windowHeight + 50
  } else {
    data.height = data.defaultBackTopHeight
  }
}
onMounted(() => {
  document.addEventListener('scroll', scroll)
})
onUnmounted(() => {
  document.removeEventListener('scroll', scroll)
})
// 回到顶部方法
const toTop = () => {
  let top = document.documentElement.scrollTop || document.body.scrollTop
  let timer = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50
    if (top <= 0) {
      clearInterval(timer)
    }
  }, 10)


}

</script>

<style lang="stylus" scoped>
body {
  transition scrollTop 0.3s
}
.back-to-top {
  height 900px
  position fixed
  top 0
  right 20px
  width 70px
  .cat {
    background url('back-top.png')
    width 100%
    height 100%
    transition all 0.3s
    cursor pointer
  }
}
</style>
