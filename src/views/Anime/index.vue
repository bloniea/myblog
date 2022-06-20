<template>
  <div class="anime">
    <MyContainer>
      <div class="tip">女孩子之间什么的，是不可能的啦</div>
      <div class="container">
        <div class="list bg-shadow" v-for="i in 7" :key="i">
          <div class="cover">
            <el-image
              fit="cover"
              src="https://cloud.bloniea.xyz/images/29381f30e924b8991d8d156861061d950a7bf629.jpg"
            ></el-image>
          </div>
          <div class="title">安达与岛村（全12话）</div>
        </div>
      </div>
    </MyContainer>
  </div>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
