<template>
  <div class="tools">
    <MyContainer>
      <router-view v-if="$route.meta.tool" class="allTtool"></router-view>

      <div class="tool-main" v-else>
        <div class="tool">
          <div class="title">实用工具</div>
          <div class="tool-box">
            <div
              class="tool-list bg-shadow"
              v-for="list in config.tools"
              :key="list"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
              <div class="image">
                <el-image :src="list.img_url" alt="" fit="cover"></el-image>
              </div>
              <div class="content">
                <div class="content-title" @click="toPath(list.router_name)">
                  {{ list.title }}
                </div>
                <div class="content-subtitle">{{ list.subtitle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyContainer>
  </div>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import { useRouter } from 'vue-router'
import config from '@/config.js'

const router = useRouter()

const toPath = (n) => {
  router.push({ name: n })
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
