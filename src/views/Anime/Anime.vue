<template>
  <Loading v-if="loading"></Loading>
  <div v-else>
    <router-view v-if="route.meta.anime"></router-view>
    <div class="anime" v-else>
      <MyContainer>
        <div class="tip gradient-title">可爱的女孩子可是无所不能的哦</div>
        <div class="container">
          <div
            class="list bg-shadow"
            v-for="list in anime.list"
            :key="list._id"
            @click="toDetail(list._id)"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div class="cover">
              <el-image fit="cover" :src="list.img_url"></el-image>
            </div>
            <div class="title">
              {{ list.name }}({{ list.content.length }}话)
            </div>
          </div>
        </div>
      </MyContainer>
      <Pagination
        :pagesize="anime.reqData.pagesize"
        :pagenum="anime.reqData.pagenum"
        :total="anime.total"
        @changePage="changePage"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import MyContainer from '@/components/MyContainer/index.vue'
import Loading from '@/components/Loading/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { getAboutAnimesApi } from '@/comm/fetch'
import { reactive, ref } from '@vue/reactivity'
import Pagination from '@/components/Pagination/index.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const anime = reactive({
  reqData: {
    pagenum: 1,
    pagesize: 6,
  },
  list: [],
  total: 0,
})
const getAnimes = async () => {
  loading.value = true
  const res = await getAboutAnimesApi(anime.reqData)

  if (res.status == 200 && res.ok) {
    anime.list = res.data.data
    anime.total = res.data.total
    loading.value = false
  }
}
getAnimes()
const toDetail = (id) => {
  router.push({ name: 'AnimeDetail', query: { id: id } })
}
const changePage = (page) => {
  anime.reqData.pagenum = page
  getAnimes()
}
</script>

<style lang="stylus" scoped>
@import './Anime.styl'
</style>
