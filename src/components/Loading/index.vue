<template>
  <div class="loading">
    <div class="loading-box">
      <img
        class="loading-gif"
        :src="config.loading"
      >
    </div>

  </div>
</template>

<script setup>
import config from '@/config.js'
// console.log(config)
</script>

<style lang="stylus" scoped>
.loading {
  // background red
  width 100%
  height 80vh
  position relative
  .loading-box {
    width 200px
    height 200px
    position absolute
    left 50%
    margin-left -100px
    top 50%
    margin-top -100px
    .loading-gif {
      width 100%
      height auto
    }
  }
}
</style>